# DssEmptyState

> Documentação normativa · DSS v2.5 · Template 13.1
> **Status:** `draft` — componente novo, ainda não selado.
> **Golden Reference:** DssBadge (não interativo) · **Golden Context:** DssBanner

---

## 1. Visão Geral

### Nome do Componente

`DssEmptyState` · classe raiz `.dss-empty-state`

### Descrição

Bloco que comunica a **ausência de dados** e, quando existe uma, oferece a saída. Não é
interativo: é conteúdo, não controle.

### Tipo do Componente

Componente **base**, Fase 1. `classification: "Visual"`. Não envolve componente Quasar —
é HTML próprio do DSS, composto apenas com `DssIcon`.

### Características principais

1. **Não interativo** — sem hover, focus, active ou disabled próprios.
2. **Neutro por decisão** — não se colore por marca nem por cor semântica.
3. **Anuncia-se por padrão** — `role="status"` + `aria-live="polite"`, desligável.
4. **Ícone decorativo** — a informação vive no texto, sempre.
5. **Três tamanhos** ligados a contextos de uso reais, não a uma escala tipográfica livre.

### Classificação de recursos

| recurso | estado |
|---|---|
| Props | 7 |
| Slots | 5 |
| Eventos | **0** (declarado, não omitido) |
| Variantes | 2 (`plain`, `bordered`) |
| Tamanhos | 3 (`sm`, `md`, `lg`) |
| Cores semânticas | **não se aplica** — ver §7 |
| Brandabilidade | **não se aplica** — ver §7 |

---

## 2. Quando usar / Quando NÃO usar

### Quando usar

- Busca ou filtro retornou **zero** resultados.
- Área onde o usuário **ainda não criou** nada (primeiro acesso).
- Lista, tabela ou painel que ficou vazio **após** uma exclusão.
- Área de anexos ou itens aguardando o primeiro conteúdo.

### Quando NÃO usar

| situação | componente correto | por quê |
|---|---|---|
| A operação **falhou** | `error` no componente de campo/lista | vazio ≠ erro; tratar falha como vazio esconde a quebra do usuário |
| Ainda **carregando** | `DssSkeleton` · `DssInnerLoading` | "resultado é zero" ≠ "ainda não sei" |
| Aviso pontual num fluxo | `DssBanner` | banner interrompe; estado vazio ocupa o lugar do conteúdo |
| Contagem zero num elemento | `DssBadge` | badge adere a outro elemento; este é bloco |

> **Regra normativa.** Estado vazio significa que **a operação funcionou e o resultado é zero**.
> Nenhuma outra semântica pode ser transportada por este componente.

---

## 3. Anatomia do Componente

### Estrutura visual

```
┌─────────────────────────────────┐
│              ◻ ícone            │  .dss-empty-state__icon      (decorativo)
│      Nenhuma solicitação        │  .dss-empty-state__title
│   Ajuste os filtros ou limpe    │  .dss-empty-state__description
│           a busca.              │
│         [ Limpar filtros ]      │  .dss-empty-state__action    (slot)
└─────────────────────────────────┘
   .dss-empty-state--md --plain
```

### Partes internas

| classe | papel | condicional |
|---|---|---|
| `.dss-empty-state` | raiz: flex column centrada | sempre |
| `.dss-empty-state__icon` | ilustração decorativa | prop `icon` ou slot `icon` |
| `.dss-empty-state__title` | frase principal | prop `title` ou slot `title` |
| `.dss-empty-state__description` | explicação secundária | prop `description` ou slot `description` |
| `.dss-empty-state__action` | ação de saída | slot `action` |

### Slots disponíveis

`icon` · `title` · `description` · `action` · `default` — ver §5.

> **Precedência (CCI §3.2):** o slot nomeado **vence** a prop equivalente. Vale para
> `icon`, `title` e `description`.

### Subcomponentes DSS utilizados

| subcomponente | uso |
|---|---|
| `DssIcon` | única forma de renderizar o ícone da prop: `<DssIcon :name inline decorative />` |

Nenhum outro. O `DssButton` do slot `action` é fornecido pelo **consumidor** — o componente
não o importa nem o presume.

---

## 4. Tokens Utilizados

Tabela completa em [`README.md`](./README.md#tokens-consumidos). Categorias consumidas:

| categoria | tokens |
|---|---|
| Espaçamento | `--dss-spacing-{2,3,4,6,8,12,96,120}` |
| Tipografia | `--dss-font-family-sans` · `--dss-font-size-{sm,md,lg,xl}` · `--dss-font-weight-{normal,semibold}` · `--dss-line-height-{normal,relaxed}` |
| Texto | `--dss-text-primary` · `--dss-text-secondary` |
| Ícone | `--dss-icon-size-{md,lg,xl}` |
| Borda | `--dss-border-width-thin` · `--dss-border-default` · `--dss-radius-lg` |

### Altura visual vs touch target

**Não se aplica.** O bloco não é um alvo clicável — WCAG 2.5.5 governa o `DssButton` do slot
`action`, que traz o próprio touch target de 44px.

Nenhuma altura fixa é definida: o bloco tem a altura do seu conteúdo mais o padding do
`size`. Centralizar verticalmente numa área maior é responsabilidade do **pai**.

### Exceções documentadas (valores sem token)

**Nenhuma.** Todo valor dimensional vem de `var(--dss-*)`.

> **Nota sobre a medida de leitura.** `max-width` da descrição usa `--dss-spacing-120` (480px).
> Usar um token de espaçamento como largura é deliberado: a escala de spacing do DSS vai até
> 768px e é a única escala dimensional genérica disponível. Criar um token `--dss-measure-*`
> exigiria decisão de tipografia que ainda não foi tomada — registrado como ponto a revisitar
> quando a escala tipográfica for revista.

---

## 5. API Pública

### Props de conteúdo

| prop | tipo | padrão | descrição |
|---|---|---|---|
| `icon` | `string` | `''` | Nome Material Icons; renderizado como **decorativo** |
| `title` | `string` | `''` | Frase principal — o que não há, na linguagem do domínio |
| `description` | `string` | `''` | Por que está vazio e o que fazer |

### Props visuais

| prop | tipo | padrão | descrição |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Densidade — ver §6 |
| `variant` | `'plain' \| 'bordered'` | `'plain'` | Tratamento do contêiner |

### Props de acessibilidade

| prop | tipo | padrão | descrição |
|---|---|---|---|
| `announce` | `boolean` | `true` | Emite `role="status"` + `aria-live="polite"` |
| `ariaLabel` | `string` | `''` | Rótulo acessível quando o `title` não basta |

### Props de brand

**Nenhuma.** Ver §7 — é decisão, não omissão.

### Eventos

**Nenhum.** Declarado explicitamente: o componente não é interativo.

---

## 6. Escala de tamanho

| size | padding | ícone | título | descrição | medida | contexto |
|---|---|---|---|---|---|---|
| `sm` | 16 / 12px | 24px | 16px | 14px | 384px | tabela, painel, lista curta |
| `md` | 32 / 16px | 32px | 18px | 16px | 480px | **padrão** — área de conteúdo |
| `lg` | 48 / 24px | 48px | 20px | 16px | 480px | página inteira vazia |

---

## 7. Decisões de design registradas

### 7.1 — O componente não tem cor semântica

Não há prop `color`. Estado vazio é **informação neutra**, não feedback: pintá-lo de
`positive`/`negative` transportaria uma semântica que ele não tem.

### 7.2 — O componente não se colore por marca

`4-output/_brands.scss` existe e está **deliberadamente sem regras**, com a justificativa no
próprio arquivo. Pintar o ícone ou o título com a cor do produto competiria com a **ação**, que é
o lugar legítimo da marca.

> ⚠️ **Ressalva medida (ago/2026):** hoje a ação **não** segue a marca — `.bg-primary` usa o
> primitivo `--dss-primary` em vez do semântico `--dss-action-primary` (`utils/_colors.scss`).
> É defeito do sistema, registrado no `DEBITO_ABERTO`; a neutralidade do bloco não depende dele.

### 7.3 — O ícone usa `--dss-text-secondary`, não `--dss-text-muted`

Baixa ênfase é intencional: o ícone acompanha, não compete com o título. Mas `--dss-text-muted`
não serve — apesar do nome, ele aponta para `--dss-dark-disable` (#D7D7D7), a cor de
**desabilitado**. Medido no Preview Frame, um ícone nesse tom lê como componente quebrado.
A distinção de ênfase fica por conta do **tamanho**, não de um cinza mais claro.

### 7.4 — `announce` é `true` por padrão

O caso dominante é o vazio **substituir** um resultado após busca, filtro ou exclusão, e essa
troca precisa ser anunciada. O padrão serve ao caso dominante; o caso estático desliga.

### 7.5 — A borda de `bordered` é tracejada

Borda sólida lê como componente ativo (campo, card). O estado vazio não é interativo, e o
tracejado comunica "área que aguarda conteúdo".

---

## 8. Acessibilidade

| critério | nível | implementação | verificado por |
|---|---|---|---|
| **4.1.3** Mensagens de status | AA | `role="status"` + `aria-live="polite"` quando `announce` | `aria` |
| **1.4.1** Uso de cor | A | informação sempre no texto do título; ícone decorativo | `aria` |
| **1.4.3** Contraste mínimo | AA | título `--dss-text-primary`, descrição e ícone `--dss-text-secondary` | `css` |
| **2.5.5** Tamanho do alvo | — | **não se aplica** — sem alvo clicável | — |

### Alto contraste (`prefers-contrast: more`)

A hierarquia por tom de cinza colapsa: descrição e ícone sobem para `--dss-text-primary`, e a
moldura de `bordered` vira sólida.

### Forced colors

A moldura recebe `CanvasText` — bordas transparentes desaparecem em forced-colors.

### Reduced motion

**Não se aplica** — o componente não anima.

---

## 9. Conteúdo — regra editorial

O componente é uma casca; o que resolve o problema do usuário é a frase.

- O `title` diz **o assunto**, não o mecanismo: "Nenhuma solicitação encontrada", nunca
  "Lista vazia" ou "0 registros".
- A `description` diz **por que** e **o que fazer**.
- A ação **desfaz a causa** do vazio (limpar filtro) ou **cria** o que falta.
- Se não há ação possível, o `title` sozinho basta. Estado vazio sem saída é legítimo;
  inventar um botão que não resolve nada, não.

---

## 10. Rastreabilidade

| artefato | caminho |
|---|---|
| Implementação | `1-structure/DssEmptyState.ts.vue` |
| Contrato derivado | `dss.contract.json` |
| Metadados | `dss.meta.json` |
| Exemplos (7 cenários) | `DssEmptyState.example.vue` |
| Testes (22) | `DssEmptyState.test.js` |
| Origem da decisão | [`DSS_JOIN_SPEC_CONTRATO.md`](../../../../../docs/governance/DSS_JOIN_SPEC_CONTRATO.md) §5 |
