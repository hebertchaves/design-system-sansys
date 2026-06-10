# Grid Inspector — Guia de Implementação

Guia normativo para instrumentar páginas de teste do sandbox DSS com o `@sansys/grid-inspector`.
Destinado a ser consumido pelos guias de criação de componentes da Fase 3.

---

## 1. Arquitetura do pacote

```
packages/grid-inspector/
├── src/          ← código-fonte (TypeScript + TSX)
└── dist/         ← artefato gerado (o sandbox lê daqui)
```

> **CRÍTICO**: Todo arquivo em `src/` exige rebuild após alteração.
> Arquivos em `apps/sandbox/src/` são servidos direto pelo Vite (HMR — não exigem build).

```bash
# Rebuild obrigatório após qualquer mudança em packages/grid-inspector/src/
cd packages/grid-inspector && npm run build
```

---

## 2. Inicialização em `main.js`

```js
// apps/sandbox/src/main.js
if (import.meta.env.DEV) {
  Promise.all([
    import('@sansys/grid-inspector'),
    import('@sansys/grid-inspector/styles').catch(() => {}),
  ]).then(([{ injectGridInspector }]) => {
    injectGridInspector({
      config: {
        // Seletor do container de conteúdo (usado pelo ResizeObserver e detectPageLayout)
        contentSelector: '.test-content',

        // Valores iniciais do Layout Tab.
        // CRÍTICO: detectPageLayout() lê computed styles do contentSelector (.test-content),
        // que normalmente tem padding 0 → retorna marginX = 0 → colapsa as margens da página.
        // Por isso, forneça valores explícitos que correspondam ao spacing real da página.
        layout: {
          margin: { x: 20, y: 0 },   // 20px = var(--dss-spacing-5)
          gutter: { x: 16, y: 0 },   // 16px = var(--dss-spacing-4)
          padding: { x: 0, y: 0 },
        },
      },
    });
  });
}
```

**Por que fornecer `layout` explícito?**
O Grid Inspector chama `detectPageLayout()` na inicialização, que tenta ler as margens do
`contentSelector` via `getComputedStyle`. O `.test-content` é um container flexbox neutro
(sem padding próprio), então a detecção retorna `0` e sobrescreve `--dss-layout-margin-x: 0px`
na `:root`, colapsando toda margem horizontal da página imediatamente ao carregar.

---

## 3. Contrato de Data Attributes

| Atributo | Aplicado em | Efeito no Grid Inspector |
|---|---|---|
| `data-grid-body` | Container principal de conteúdo | Referência para overlay de colunas (X) |
| `data-grid-rows` | Container cujos filhos diretos são as linhas | Cada filho = 1 row no overlay Y |
| `data-grid-debug` | Qualquer elemento selecionável | Habilitado no Select Mode (inspeção individual) |

### Regras críticas

- **`data-grid-body`**: Apenas **um por página**. Deve envolver a área de conteúdo (não incluir header fixo/sidenav).
- **`data-grid-rows`**: **Múltiplos por página são permitidos e independentes.** Cada container com esse atributo gera seu próprio overlay Y para os seus filhos diretos. Use um container por hierarquia de linhas que precisar de sobreposição distinta (ex.: seções da página + linhas de tabela).
- **`data-grid-debug`**: Múltiplos por página. Aplique em todos os elementos que o usuário precisa inspecionar via Select Mode.

> ⚠️ **ATENÇÃO**: Remover `data-grid-rows` de um container desativa o overlay horizontal de **todos** os filhos `[data-grid-debug]` dentro dele, mesmo que esses filhos continuem com o atributo. O atributo precisa estar presente no **ancestral imediato** que envolve as linhas.

---

## 4. Estrutura de Layout da Página

### Padrão obrigatório (sem sidenav)

```html
<div class="page-root" data-brand="...">

  <!-- Header fica FORA do data-grid-body -->
  <header class="app-bar" data-grid-debug>...</header>

  <!-- Container de referência das colunas -->
  <main class="page-body" data-grid-body>

    <!-- Container cujos filhos são as linhas do overlay Y -->
    <div class="page-rows" data-grid-rows>

      <!-- Cada elemento aqui = 1 row no overlay Y -->
      <div class="env-banner"     data-grid-debug>...</div>
      <div class="breadcrumb-bar" data-grid-debug>...</div>
      <div class="client-card"    data-grid-debug>...</div>
      <section class="filters"    data-grid-debug>...</section>

      <!-- Section header da tabela -->
      <header class="section-header" data-grid-debug>...</header>

      <!-- Header de colunas da tabela (linha independente) -->
      <div class="table-col-header" data-grid-debug>...</div>

      <!-- Cada linha de dados = filho direto de [data-grid-rows] -->
      <SomExpansionItem
        v-for="(row, idx) in rows"
        :key="row.id"
        :id="`gi-row-${row.id}`"
        data-grid-debug
        class="data-row"
      />

      <!-- Seleção (condicional) também dentro de [data-grid-rows] -->
      <div v-if="selected.length" class="selection-bar" data-grid-debug>...</div>

    </div><!-- /data-grid-rows -->
  </main>

  <!-- Modal FORA de [data-grid-rows] e de [data-grid-body] -->
  <SomeDialog />
</div>
```

### Padrão com sidenav

```html
<div class="page-shell">
  <header class="app-bar"  data-grid-debug>...</header>
  <aside  class="side-nav" data-grid-debug>...</aside>

  <main class="page-main" data-grid-body>
    <div class="page-rows" data-grid-rows>
      <!-- filhos diretos = linhas -->
    </div>
  </main>
</div>
```

---

## 5. Padrão: Container de Tabela Selecionável

Quando uma tabela precisa ser **selecionável como unidade no Selection Mode** (ex.: para aplicar `gap-y` exclusivamente nas suas linhas) **e** suas linhas individuais também precisam de overlay Y, use o padrão de container duplo:

```html
<!-- ✅ Container da tabela: selecionável E define seu próprio [data-grid-rows] -->
<div class="faturas-table" data-grid-debug data-grid-rows>

  <!-- Header da tabela (linha independente dentro do container) -->
  <div class="table-col-header" data-grid-debug>...</div>

  <!-- Linhas: filhos diretos do container [data-grid-rows] da TABELA -->
  <DssExpansionItem
    v-for="row in rows"
    :key="row.id"
    data-grid-debug
    class="fatura-row"
  />

</div><!-- /faturas-table -->
```

```scss
/* Container da tabela: gap-y aplicado SÓ nas suas linhas */
.faturas-table {
  display: flex;
  flex-direction: column;
  row-gap: var(--dss-layout-gap-y, 0px);
}

/* Linhas sem margin-top — o row-gap do container já espaça */
.fatura-row {
  margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
}
```

O container pai (`.page-rows`) mantém seu próprio `data-grid-rows` e `row-gap` para espaçar as **seções acima da tabela**. Os dois containers são independentes — `row-gap` em flex containers aninhados não causa dupla contagem porque cada `row-gap` atua apenas sobre os filhos diretos do seu próprio container.

```scss
/* .page-rows: gap-y entre seções (breadcrumb, client-card, section-header, tabela) */
.page-rows {
  display: flex;
  flex-direction: column;
  row-gap: var(--dss-layout-gap-y, 0px);
  data-grid-rows: present; /* marcação conceitual */
}
```

> **Regra**: Cada nível hierárquico que precise de overlay Y independente recebe seu próprio `[data-grid-rows]`. Não é necessário consolidar tudo em um único container.

---

## 6. Problema do "Table Card Wrapper"

Quando os dados de uma tabela estão dentro de um `DssCard` único:

```html
<!-- ❌ PROBLEMA: DssCard = 1 linha só no overlay Y, linhas internas não são detectadas -->
<DssCard class="table-wrapper">
  <div class="table-col-header">...</div>
  <ExpansionItem v-for="row in rows" />  <!-- NÃO são filhos de [data-grid-rows] -->
</DssCard>
```

### Solução: distribuir o visual do card pelas linhas individuais

```html
<!-- ✅ CORRETO: cada linha é filho direto de [data-grid-rows] -->
<div class="table-col-header" data-grid-debug>...</div>

<ExpansionItem
  v-for="(row, idx) in rows"
  :key="row.id"
  :id="`gi-row-${row.id}`"
  data-grid-debug
  class="data-row"
/>
```

```scss
// Header recebe o visual de "topo do card"
.table-col-header {
  margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
  background: var(--dss-surface-subtle);
  border-radius: var(--dss-radius-sm) var(--dss-radius-sm) 0 0;
}

// ✅ CORRETO: data-row sem margin-top — o espaçamento vertical vem do row-gap do container
.data-row {
  margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
  border: var(--dss-border-gray-200);
  border-radius: var(--dss-radius-md);
  background: var(--dss-surface-default);
}
```

> **Por que `margin-top: 0` nas linhas de dados?**
> O container `.page-rows` usa `row-gap: var(--dss-layout-gap-y)` para espaçar todos os
> filhos diretos. Se a `.data-row` também tiver `margin-top`, o espaço entre linhas
> se torna `row-gap + margin-top` — dupla contagem. Quando `gap-y = 0`, o usuário espera
> que as linhas fiquem justapostas; com margin-top hardcoded isso não acontece.

---

## 6. CSS Variables: integração com o Layout Tab

O Layout Tab do Grid Inspector escreve estas CSS vars em `:root`:

| Var DSS | Controlada por | Semântica |
|---|---|---|
| `--dss-layout-margin-x` | Slider Margin X | Recuo horizontal das seções em relação à borda da tela |
| `--dss-layout-margin-y` | Slider Margin Y | Margem das **extremidades** da página (topo e base) |
| `--dss-layout-gap-x` | Slider Gutter X | Espaçamento entre **colunas** de grids internos |
| `--dss-layout-gap-y` | Slider Gutter Y | Espaçamento **entre linhas/seções** (via `row-gap`) |
| `--dss-layout-padding-x` | Slider Padding X | Padding horizontal interno de cards e superfícies |
| `--dss-layout-padding-y` | Slider Padding Y | Padding vertical interno de cards e superfícies |
| `--dss-layout-max-width` | Breakpoint selector | Largura máxima do conteúdo |
| `--dss-layout-columns` | Column count | Número de colunas da grade X |

### Semântica obrigatória de cada var

#### `--dss-layout-margin-x` — recuo horizontal de seção
Aplicar como `margin-left`/`margin-right` (ou shorthand) em todos os elementos de nível
de seção que devem respeitar a margem horizontal da página:

```scss
.client-card,
.section-header,
.table-col-header,
.data-row {
  margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
}
```

#### `--dss-layout-margin-y` — extremidades verticais da página
Aplicar **apenas** no **primeiro elemento de conteúdo** (logo após banners fullwidth)
para criar a margem superior da área de conteúdo. Não usar em elementos intermediários.

```scss
// ✅ Único uso correto: primeiro elemento de conteúdo após o banner
.page-top {
  margin-top: var(--dss-layout-margin-y, var(--dss-spacing-4));
}

// ❌ ERRADO: margin-y em elementos intermediários duplica o espaçamento
// .client-header { margin-top: var(--dss-layout-margin-y); }  // NÃO FAZER
// .status-strip  { margin-top: var(--dss-layout-margin-y); }  // NÃO FAZER
```

> O espaçamento entre seções intermediárias é responsabilidade do `gap-y`, não do `margin-y`.

#### `--dss-layout-gap-y` — espaçamento entre linhas/seções
Aplicar como `row-gap` no container flex `[data-grid-rows]`. **Não** adicionar
`margin-top` nas linhas filhas — isso causaria dupla contagem.

```scss
// ✅ Único lugar onde gap-y deve atuar como espaçador de seções
.page-rows {
  display: flex;
  flex-direction: column;
  row-gap: var(--dss-layout-gap-y, 0px);
  max-width: var(--dss-layout-max-width, 100%);
}

// ✅ Linhas de dados: sem margin-top (gap-y do container já espaça)
.data-row {
  margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
}
```

Quando `gap-y = 0`, todas as linhas — incluindo linhas de tabela — ficam justapostas.
Isso é o comportamento correto e esperado.

#### `--dss-layout-gap-x` — gutter de colunas internas
Aplicar como `column-gap` em grids internos de seção (tabelas, cards com grid de campos):

```scss
.table-grid   { column-gap: var(--dss-layout-gap-x, var(--dss-spacing-3)); }
.detail-grid  { column-gap: var(--dss-layout-gap-x, var(--dss-spacing-5)); }
.status-strip { gap: var(--dss-layout-gap-x, var(--dss-spacing-2)); }
```

#### `--dss-layout-padding-x` e `--dss-layout-padding-y` — padding interno de superfícies
Aplicar em cards, células de tabela e containers que têm padding interno:

```scss
.client-card  { padding: var(--dss-layout-padding-y, var(--dss-spacing-5))
                         var(--dss-layout-padding-x, var(--dss-spacing-5)); }
.status-pill  { padding: var(--dss-layout-padding-y, var(--dss-spacing-3))
                         var(--dss-layout-padding-x, var(--dss-spacing-2)); }
.table-row    { padding: var(--dss-layout-padding-y, var(--dss-spacing-2))
                         var(--dss-layout-padding-x, var(--dss-spacing-3)); }
```

### Anti-pattern: dupla contagem de gap-y

```scss
// ❌ PROBLEMA: row-gap E margin-top ambos controlados por gap-y
.page-rows { row-gap: var(--dss-layout-gap-y, 0px); }
.data-row  { margin-top: var(--dss-layout-gap-y, var(--dss-spacing-2)); } // DUPLICA

// ✅ CORRETO: somente o container usa gap-y
.page-rows { row-gap: var(--dss-layout-gap-y, 0px); }
.data-row  { margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5)); }
```

> **Fallback obrigatório**: Use sempre fallback com token DSS.
> Quando o Grid Inspector não está rodando, a var não é definida e o fallback mantém
> o espaçamento correto em produção.

---

## 7. DssButton em fundos escuros (App Bar / Sidenav)

### Problema
`color="white"` **não está** no tipo `ButtonColor` do DSS:
```typescript
type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'accent'
                 | 'positive' | 'negative' | 'warning' | 'info'
```
Usar `color="white"` gera Vue warn e pode causar falhas visuais silenciosas.

### Solução

```html
<!-- ❌ Gera Vue warn: Invalid prop: custom validator check failed -->
<DssButton variant="flat" icon="menu" color="white" />

<!-- ✅ Remove color prop, usa CSS :deep() para forçar a cor -->
<DssButton variant="flat" icon="menu" class="app-bar__btn" />
```

```scss
.app-bar__btn {
  // Cor do ícone via :deep com !important para vencer specificity do Quasar
  color: var(--dss-text-inverse) !important;

  :deep(.dss-button__icon),
  :deep(.q-icon),
  :deep(.q-btn__content) {
    color: var(--dss-text-inverse) !important;
  }

  // Hover com overlay claro (sem depender de color prop)
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--dss-text-inverse);
    opacity: 0;
    pointer-events: none;
    border-radius: inherit;
    transition: opacity var(--dss-duration-fast) var(--dss-easing-ease-out);
  }
  &:hover::after { opacity: var(--dss-opacity-10); }
}
```

### Outros valores inválidos de color

| ❌ Inválido | ✅ Alternativa |
|---|---|
| `color="white"` | Remover prop + CSS `:deep()` |
| `color="grey-5"` | `color="dark"` ou CSS class |
| Qualquer hex/rgb | Nunca — usar token semântico |

---

## 8. Comportamento do Overlay Y: fatos importantes

1. **Detecção de rows**: o overlay lê `container.querySelector('[data-grid-rows]')` e mede cada filho direto via `getBoundingClientRect()`.
2. **Posição relativa**: as linhas são posicionadas relativas ao topo do `[data-grid-body]` — não ao viewport.
3. **Re-medição automática**: ocorre em:
   - Scroll (listener com `{ capture: true }` para capturar eventos de containers `overflow-y: auto`)
   - Resize (via `ResizeObserver` no `contentSelector`)
   - Troca de view SPA (via `MutationObserver` com debounce de 400ms)
   - Intervalos: 300ms e 900ms após inicialização
4. **`showGrid` padrão = false** (lido do localStorage). O overlay de linhas Y só aparece quando o usuário habilita "Show Grid" no painel.

### Por que `capture: true` é necessário

O container scrollável real é `.component-view` (com `overflow-y: auto`), não `window`.
Scroll events em elementos com `overflow-y` não borbulham para `window`, portanto
`window.addEventListener('scroll', ...)` nunca dispara. O `document.addEventListener('scroll', ..., { capture: true })`
captura o evento na fase de captura (antes de chegar ao target), funcionando para qualquer scroller.

---

## 9. Troca de Views SPA (v-else-if)

Quando o sandbox usa `v-else-if` para alternar entre views de teste, o `ResizeObserver`
no `.test-content` não dispara (o container mantém seu tamanho — apenas o filho muda).

O Grid Inspector usa um `MutationObserver` com `{ childList: true, subtree: false }` e
debounce de 400ms no `contentSelector` para detectar essas trocas e re-medir as linhas.

---

## 10. IDs nas linhas de dados

Para facilitar depuração e inspeção no Select Mode, cada linha de dados deve ter um `id` único:

```html
<DssExpansionItem
  v-for="(row, idx) in rows"
  :key="row.id"
  :id="`gi-row-${row.id}`"
  data-grid-debug
>
```

O prefixo `gi-` (Grid Inspector) evita conflitos com IDs de outros propósitos.

---

## 11. Checklist de implementação

Antes de marcar uma página como "instrumentada para Grid Inspector":

**Estrutura**
- [ ] `data-grid-body` aplicado no container de conteúdo principal
- [ ] `data-grid-rows` no container de seções da página (`.page-rows`) — garante overlay Y nas seções superiores
- [ ] `data-grid-rows` também em qualquer sub-container que precise de overlay Y próprio (ex.: `.faturas-table`) — múltiplos são permitidos e independentes
- [ ] Nenhum `data-grid-rows` foi removido sem verificar se ainda há elementos `data-grid-debug` dependentes dele
- [ ] `data-grid-debug` em todos os elementos relevantes (incluindo cada linha de dados)
- [ ] `:id="'gi-row-' + row.id"` em cada linha de dado dentro de `v-for`
- [ ] Modais e dialogs ficam FORA de `[data-grid-rows]`
- [ ] Header fixo / sidenav ficam FORA de `[data-grid-body]`

**CSS Variables — semântica**
- [ ] `--dss-layout-margin-x` consumido (com fallback) em todos os elementos com margem horizontal
- [ ] `--dss-layout-margin-y` consumido **somente** no primeiro elemento de conteúdo (`margin-top`) — não em seções intermediárias
- [ ] `--dss-layout-gap-y` consumido como `row-gap` no `.page-rows` — **não** como `margin-top` nas linhas filhas
- [ ] Linhas de dados (`data-row`) com `margin: 0 var(--dss-layout-margin-x, ...)` — sem `margin-top`
- [ ] `--dss-layout-gap-x` consumido como `column-gap` em grids internos
- [ ] `--dss-layout-padding-x` e `--dss-layout-padding-y` consumidos em cards e superfícies com padding interno

**Inicialização**
- [ ] `main.js` tem `layout` explícito com `margin`, `gutter` e `padding` calibrados para o estado visual inicial da página
- [ ] Valores iniciais de `gutter.y` batem com o espaçamento natural entre linhas de dados

**Componentes DSS**
- [ ] Nenhum `DssButton` com `color="white"` ou `color="grey-5"` — usar CSS `:deep()` em fundos escuros
- [ ] Nenhum `DssIcon` com `color="white"` — `IconColor` não inclui esse valor; herdar cor via CSS do container
- [ ] Nenhum `DssChip` com `color="grey-5"` ou `color="grey-7"` — `ChipColor` só aceita os 8 valores semânticos

---

## 12. Tipos de color dos componentes DSS

Todos os componentes DSS possuem tipos TypeScript restritos para a prop `color`. Usar valores fora do tipo gera erros de TS e Vue warns silenciosos.

### Valores válidos (comum a `ButtonColor`, `IconColor`, `ChipColor`)

```typescript
type SemanticColor = 'primary' | 'secondary' | 'tertiary' | 'accent'
                   | 'positive' | 'negative' | 'warning' | 'info'
```

### Valores inválidos frequentes em páginas de teste

| ❌ Inválido | Componente | ✅ Alternativa |
|---|---|---|
| `color="white"` | `DssButton` | Remover prop + CSS `:deep()` (ver Seção 7) |
| `color="white"` | `DssIcon` | Remover prop — herda cor CSS do container |
| `color="grey-5"` | `DssButton`, `DssChip` | `color="secondary"` para neutro/inativo |
| `color="grey-7"` | `DssChip` | `color="secondary"` para neutro/inativo |

### DssIcon em fundos escuros: herança de cor

O `DssIcon` sem `color` prop herda a `color` CSS do elemento pai. Em containers com
`color: var(--dss-text-inverse)` (ex.: app-bar), o ícone fica branco automaticamente:

```html
<!-- ❌ Prop inválida -->
<DssIcon name="water_drop" color="white" />

<!-- ✅ Herda color do container pai -->
<DssIcon name="water_drop" />
```

```scss
.app-bar {
  color: var(--dss-text-inverse); // cascateia para DssIcon filhos
}
```

---

## 13. Neutralização das CSS vars dentro do painel

O painel flutuante do Grid Inspector envolve seu HTML em `#grid-inspector-root` com CSS inline
que neutraliza `--dss-layout-*` para `0px`. Isso evita que as vars do Layout Tab cascateiem para
dentro do próprio painel e distorçam sua UI.

Você **não precisa** fazer nada para isso — é comportamento interno do pacote.
