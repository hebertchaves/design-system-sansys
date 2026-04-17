# DssHeader — Documentação Normativa DSS v2.2

> **Status:** Pendente de Auditoria
> **Versão DSS:** 2.2
> **Fase:** 2 — Container Estrutural / Superfície e Layout
> **Golden Reference:** DssCard
> **Golden Context:** DssToolbar

---

## 1. Identidade do Componente

### 1.1 Nome e Classificação

- **Nome:** `DssHeader`
- **Família:** Superfícies e Layout
- **Nível de Composição:** Nível 3 (Composição de Segundo Grau)
- **Componente Quasar Base:** `QHeader`
- **Dependência Direta:** `DssToolbar` (Nível 1)

### 1.2 Papel Semântico

DssHeader é o container superior de layout de página. Encapsula o `QHeader` do Quasar com governança DSS, bloqueando props de cor e aplicando `--dss-surface-default` como fundo padrão.

Como componente de Nível 3, ele **orquestra** DssToolbar (Nível 1) via slot, sem instanciar filhos automaticamente. A composição é responsabilidade do consumidor.

### 1.3 O Que Faz

- Fornece o container `<header role="banner">` fixo ao topo da página
- Aplica `--dss-surface-default` como cor de fundo (sobrescreve `bg-primary` do QHeader)
- Gerencia variantes de elevação visual (`elevated`, `bordered`)
- Repassa atributos extras (`reveal`, `aria-label`, etc.) via `$attrs` ao QHeader
- Propaga contexto de layout para DssToolbar e outros filhos

### 1.4 O Que NÃO Faz

- Não define brand/cor — responsabilidade do `DssToolbar` interno
- Não instancia filhos automaticamente
- Não estiliza componentes filhos internamente
- Não possui estados de interação (hover, focus, active)
- Não gerencia z-index (delegado ao Quasar)
- Não expõe prop `color` ou `height-hint` (bloqueadas)

---

## 2. Modelo Arquitetural

### 2.1 Quasar × DSS

- **Quasar** = camada de execução (layout engine, posicionamento fixo, z-index)
- **DSS** = camada de governança (tokens, visual, API controlada)

DssHeader **diverge da API QHeader** intencionalmente:
- Bloqueia `color` e `height-hint`
- Adiciona variantes semânticas (`elevated`, `bordered`)
- Remove comportamentos não utilizados no DSS (`dark`, etc.)

### 2.2 Hierarquia de Composição

```
DssLayout (Nível 4 — futuro)
└── DssHeader (Nível 3 — este componente)
    └── DssToolbar (Nível 1 — dependência direta)
        └── DssButton, DssIcon, DssSpace, DssSeparator (Nível 1)
```

---

## 3. API

### 3.1 Props Expostas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `elevated` | `Boolean` | `false` | Sombra de elevação (`--dss-elevation-2`) |
| `bordered` | `Boolean` | `false` | Borda inferior sutil |

### 3.2 Props Bloqueadas

| Prop QHeader | Motivo do Bloqueio |
|--------------|-------------------|
| `color` | Fundo governado por `--dss-surface-default` |
| `height-hint` | Calculado automaticamente |
| `dark` | Modo escuro via `[data-theme="dark"]` global |

### 3.3 Props Repassadas via $attrs

| Prop QHeader | Tipo | Descrição |
|--------------|------|-----------|
| `reveal` | `Boolean` | Auto-hide/show ao rolar |
| `reveal-offset` | `Number` | Offset do reveal em pixels |
| qualquer atributo HTML | — | Forwarded ao `<q-header>` |

### 3.4 Slots

| Slot | Tipo esperado | Descrição |
|------|---------------|-----------|
| `default` | `DssToolbar` | Conteúdo do header |

### 3.5 Events

DssHeader não emite eventos. É um container não-interativo.

---

## 4. Visual e Variantes

### 4.1 Variante Padrão (sem decoração)

Header com fundo `--dss-surface-default`, sem sombra, sem borda. Para layouts onde o header se integra ao restante da página sem destaque visual.

### 4.2 Variante Elevated

```vue
<DssHeader elevated>
```

Aplica `box-shadow: var(--dss-elevation-2)`. Indicado para layouts onde o conteúdo rola sob o header e a separação visual é necessária.

### 4.3 Variante Bordered

```vue
<DssHeader bordered>
```

Aplica `border-bottom: var(--dss-border-width-thin) solid var(--dss-gray-200)`. Alternativa flat para layouts com design minimal.

### 4.4 Elevated + Bordered

Tecnicamente possível mas raramente recomendado. Em designs bem executados, usa-se uma ou outra variante, nunca ambas simultaneamente.

---

## 5. Comportamentos Implícitos

### 5.1 Forwarding via $attrs

`inheritAttrs: false` + `v-bind="$attrs"` no template garante que todos os atributos não declarados como props DSS são repassados ao `<q-header>` nativo. Isso inclui `reveal`, `aria-label`, `id`, e quaisquer outros atributos HTML.

### 5.2 Override de Background via !important

QHeader do Quasar aplica `bg-primary !important` por padrão. DssHeader usa `background-color: var(--dss-surface-default) !important` para sobrescrever. Documentado como EXC-02.

### 5.3 role="banner"

O QHeader nativo aplica `role="banner"` ao elemento `<header>`. DssHeader preserva essa semântica, que identifica este elemento como o **landmark de cabeçalho de página** (ARIA). Deve haver apenas **um** elemento com `role="banner"` por página.

### 5.4 Z-index e Posicionamento

DssHeader **não altera** o z-index ou `position` aplicados pelo QHeader (que usa `position: fixed; top: 0`). O Quasar gerencia a matemática de layout (offset de conteúdo) via variáveis CSS injetadas no QLayout pai.

---

## 6. Acessibilidade

### 6.1 Role e Landmark

- `role="banner"` aplicado nativamente pelo QHeader
- Identifica o header como landmark de cabeçalho de página
- Screen readers anunciam como "banner" ou "cabeçalho"
- **Regra:** Apenas um `role="banner"` por página

### 6.2 aria-label

Recomendado quando há ambiguidade:
```vue
<DssHeader aria-label="Cabeçalho principal">
```

### 6.3 Touch Target

Opção B — não implementado. DssHeader é container não-interativo. Touch targets são responsabilidade dos filhos (DssButton dentro de DssToolbar).

### 6.4 WCAG 2.1 AA

- Contraste de conteúdo: responsabilidade dos filhos
- Navegação por teclado: responsabilidade dos filhos
- DssHeader garante apenas o container semântico correto

---

## 7. Tokens Utilizados

| Token | Valor de Referência | Camada | Uso |
|-------|---------------------|--------|-----|
| `--dss-surface-default` | branco/escuro (tema) | L2 | Cor de fundo padrão |
| `--dss-text-body` | cinza escuro / claro (tema) | L2 | Cor de texto padrão |
| `--dss-elevation-2` | `var(--dss-shadow-md)` | L3 | Sombra `elevated` |
| `--dss-border-width-thin` | `1px` | L3 | Espessura borda `bordered` |
| `--dss-gray-200` | `#f5f5f5` | L3 | Cor borda `bordered` |
| `--dss-border-width-md` | `2px` | L4 | Borda reforçada high contrast |

---

## 8. Exceções aos Gates v2.4

### EXC-01 — Uso de QLayout no Arquivo de Exemplo

- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (Proibição de componentes Quasar no template)
- **Arquivo:** `DssHeader.example.vue`
- **Justificativa:** DssHeader requer contexto QLayout para renderizar corretamente (posicionamento fixo, cálculo de offset). Como DssLayout (Nível 4) ainda não existe, usa-se `<q-layout>` nativo temporariamente apenas no exemplo. O código fonte do componente permanece 100% aderente.
- **Isenção:** Política DSS_IMPLEMENTATION_GUIDE.md — `.example.vue` tem contexto de scaffolding.

### EXC-02 — `!important` em background-color

- **Regra Violada:** Token First — preferência por não usar `!important`
- **Arquivo:** `2-composition/_base.scss`, `4-output/_states.scss`
- **Valor:** `background-color: var(--dss-surface-default) !important`
- **Justificativa:** QHeader aplica `bg-primary !important` via Quasar. Para que o token DSS governe o fundo, é obrigatório usar `!important`. Estritamente contido no escopo `.dss-header`.

### EXC-03 — System color keywords em forced-colors

- **Arquivo:** `4-output/_states.scss`
- **Valor:** `Canvas`, `CanvasText`, `ButtonFace`
- **Justificativa:** Padrão canônico DSS para forced-colors mode. Precedente: DssToolbar, DssCard, DssStep.

### EXC-04 — Valores hardcoded em @media print

- **Arquivo:** `4-output/_states.scss`
- **Valor:** `#fff`, `#000`, `1px solid #000`
- **Justificativa:** Impressão monocromática. Tokens CSS podem não ser resolvidos neste contexto. Precedente: DssToolbar, DssTab, DssStep.

---

## 9. Matriz de Composição DSS

### 9.1 Papel Estrutural

DssHeader é o **ponto de ancoragem do topo do layout de página**. Define a área visual superior e fornece slot para DssToolbar.

### 9.2 Componentes DSS Recomendados

| Componente | Nível | Papel no DssHeader |
|------------|-------|-------------------|
| `DssToolbar` | 1 | Conteúdo primário — ações, título, navegação |
| `DssTabs` | 2 | Navegação global em cenários específicos |

### 9.3 Padrões de Composição

**Padrão básico:**
```vue
<DssHeader>
  <DssToolbar>
    <DssButton flat round icon="menu" aria-label="Menu" />
    <span class="text-subtitle1">Título</span>
    <DssSpace />
    <DssButton flat round icon="account_circle" aria-label="Perfil" />
  </DssToolbar>
</DssHeader>
```

**Com brand (cor vem do DssToolbar):**
```vue
<DssHeader elevated>
  <DssToolbar brand="water">
    ...
  </DssToolbar>
</DssHeader>
```

**Múltiplos toolbars:**
```vue
<DssHeader elevated>
  <DssToolbar>
    <!-- Ações globais -->
  </DssToolbar>
  <DssToolbar dense>
    <!-- Navegação de seção -->
  </DssToolbar>
</DssHeader>
```

### 9.4 Limites de Responsabilidade

- DssHeader **não estiliza filhos**
- Cor de fundo dos filhos é responsabilidade dos próprios filhos (DssToolbar via brand)
- DssHeader garante apenas: container semântico, fundo neutro, variante de elevação

### 9.5 Governança de Extensão

Extensões futuras devem ser feitas via:
1. Novos props expostos explicitamente
2. Novas variantes em `3-variants/`
3. Nunca via `::v-deep` sobrescrevendo filhos

### 9.6 Anti-Patterns

| Anti-Pattern | Impacto |
|--------------|---------|
| HTML nativo diretamente no slot | Viola Gate de Composição v2.4 |
| `color` ou `dark` prop | Props bloqueadas — sem efeito ou erro |
| Sobrescrever `z-index` | Quebra matemática de layout do Quasar |
| Múltiplos DssHeader por página | Viola semântica `role="banner"` |
| `brand` prop no DssHeader | Prop inexistente — use no DssToolbar |

---

## 10. Paridade com Golden Reference (DssCard)

| Aspecto | DssCard | DssHeader | Status |
|---------|---------|-----------|--------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Igual |
| `withDefaults(defineProps<T>())` | ✅ | ✅ | Igual |
| `v-bind="$attrs"` forwarding | ✅ | ✅ | Igual |
| Composables para classes | ✅ useCardClasses | ✅ useHeaderClasses | Igual |
| Types separados em `/types/` | ✅ | ✅ | Igual |
| 4 camadas SCSS completas | ✅ | ✅ | Igual |
| Entry Point Wrapper puro | ✅ | ✅ | Igual |
| Container não-interativo | Parcial (clickable) | Total | Intencional |
| Brand via prop | ✅ | ❌ | Intencional — DssHeader delega ao DssToolbar |
| Background override com !important | ❌ | ✅ EXC-02 | Intencional — QHeader injeta bg-primary !important |

---

## 11. Paridade com Golden Context (DssToolbar)

| Aspecto | DssToolbar | DssHeader | Status |
|---------|------------|-----------|--------|
| `inheritAttrs: false` + forwarding | ✅ | ✅ | Igual |
| Container 100% não-interativo | ✅ | ✅ | Igual |
| Props bloqueadas de cor | ✅ color, dark | ✅ color, height-hint | Leve diferença — contexto QHeader |
| brand prop | ✅ | ❌ | Intencional — DssHeader delega brand |
| Background override | transparent | surface-default !important | EXC-02 — QHeader aplica bg-primary !important |
| definição de min-height | ✅ via spacing token | ❌ gerenciado pelo Quasar | Intencional — QHeader calcula via conteúdo |

---

## 12. Mapeamento Estrutural — Componentes DSS de Composição

### Classificação por Disponibilidade

**🟢 A) Existentes DSS**
- DssToolbar ✅ (Nível 1 — dependência direta)
- DssButton ✅ (Nível 1 — conteúdo do DssToolbar)
- DssIcon ✅ (Nível 1 — conteúdo do DssToolbar)
- DssSpace ✅ (Nível 1 — espaçamento)
- DssSeparator ✅ (Nível 1 — divisor)
- DssTabs ✅ (Nível 2 — navegação global)

**🟡 B) Planejados / Roadmap**
- DssLayout (Nível 4 — container pai natural)
- DssFooter (Nível 3 — par simétrico do DssHeader)
- DssDrawer (Nível 3 — sidebar, interage com DssHeader)

**⚪ C) Estruturalmente Esperados mas Inexistentes**
- DssToolbarTitle (Nível 1 — texto de título padronizado para toolbar)
- DssAppBar (Nível 3 — abstração de alto nível sobre DssHeader + DssToolbar)

### Avaliação de Lacunas

- **Lacuna crítica:** DssLayout (Nível 4) — EXC-01 mitiga para fins de exemplo
- **Lacuna não-crítica:** DssFooter — documentada como evolução futura
- **Lacuna decorativa:** DssAppBar — DssHeader + DssToolbar são suficientes

---

## 13. Histórico de Implementação

| Data | Versão | Descrição |
|------|--------|-----------|
| 2026-04-17 | 1.0.0 | Criação inicial — pendente auditoria DSS v2.2 |

---

> **Componente PRONTO PARA AUDITORIA DSS v2.2**
>
> ⚠️ Selo DSS v2.2 não emitido — aguarda processo formal de auditoria.
