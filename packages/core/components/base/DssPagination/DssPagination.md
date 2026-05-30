# DssPagination — Documentação Normativa DSS v2.2

> **Fase:** 2 — Nível 1 (Independente)
> **Quasar Base:** QPagination
> **Golden Reference:** DssChip
> **Golden Context:** DssBtnGroup
> **Status:** Pendente de auditoria

---

## 1. Descrição e Propósito

O `DssPagination` é o componente de paginação do Design System Sansys. Encapsula o `QPagination` do Quasar como motor de navegação, expondo uma API curada com suporte a tokens DSS, brandabilidade e acessibilidade WCAG 2.1 AA.

O componente é adequado para navegação em conjuntos de dados paginados: listas, tabelas, resultados de busca e coleções de conteúdo.

### Responsabilidades
- Exibir botões de página numerados conforme a janela de visualização configurada.
- Gerenciar navegação para páginas anterior/próxima e primeira/última (configurável).
- Aplicar tokens DSS de cor, forma, tamanho e movimento aos botões internos do QPagination.
- Propagar contexto de marca via `data-brand`.

### Não é responsabilidade deste componente
- Carregar dados das páginas (responsabilidade do consumidor).
- Controlar número de itens por página (responsabilidade do consumidor).
- Renderizar conteúdo paginado (responsabilidade do consumidor).

---

## 2. Arquitetura

### Motor
O `QPagination` é utilizado como motor. A lógica de cálculo de elipses, janela de páginas, boundary links e direction links é inteiramente gerenciada pelo Quasar. O DSS aplica theming via sobreescrita da propriedade CSS customizada `--q-color-primary` e de seletores internos estáveis.

### Exceções Arquiteturais (Gate de Composição v2.4)

**EXC-01 — Motor QPagination**
QPagination não fornece API de slot para botões individuais. A substituição interna por `DssButton` é arquiteturalmente inviável. O motor é preservado intacto. Registrado em `gateExceptions` do `dss.meta.json`.

**EXC-Gate-01 — Seletores Quasar internos**
Os seletores `.q-pagination__middle` e `.q-pagination .q-btn` são sobrescritos em `2-composition/_base.scss`. A propriedade `--q-color-primary` é sobreescrita para conectar tokens de marca.

### Estrutura de arquivos
```
DssPagination/
├── 1-structure/DssPagination.ts.vue   ← Motor + template
├── 2-composition/_base.scss           ← Estilos base + EXC-Gate-01
├── 3-variants/_variant.scss           ← flat / outline / round
├── 4-output/_states.scss              ← dark / prefers-contrast / forced / print
├── 4-output/_brands.scss              ← hub / water / waste
├── composables/usePaginationClasses.ts
├── types/pagination.types.ts
└── dss.meta.json                      ← gateExceptions registradas
```

---

## 3. Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|---|---|---|---|---|
| `model-value` | `Number` | — | **Sim** | Página atual. Usar com `v-model`. |
| `max` | `Number` | — | **Sim** | Total de páginas. |
| `max-pages` | `Number` | `5` | Não | Botões de página visíveis. |
| `disable` | `Boolean` | `false` | Não | Desabilita toda interação. |
| `readonly` | `Boolean` | `false` | Não | Bloqueia interação sem alterar aparência. |
| `size` | `'xs'\|'sm'\|'md'\|'lg'` | `'md'` | Não | Tamanho dos botões. |
| `ellipses` | `Boolean` | `true` | Não | Exibe `…` para páginas fora da janela. |
| `boundary-links` | `Boolean` | `false` | Não | Botões para primeira/última página. |
| `direction-links` | `Boolean` | `true` | Não | Botões anterior/próximo. |
| `flat` | `Boolean` | `false` | Não | Variante sem fundo no botão ativo. |
| `outline` | `Boolean` | `false` | Não | Variante com borda no botão ativo. |
| `round` | `Boolean` | `false` | Não | Botões circulares. |
| `brand` | `'hub'\|'water'\|'waste'` | — | Não | Contexto de marca. |
| `aria-label` | `String` | `'Navegação por páginas'` | Não | Rótulo do `role="navigation"`. |

---

## 4. Eventos

| Evento | Payload | Descrição |
|---|---|---|
| `update:modelValue` | `number` | Emitido ao selecionar uma página. |

---

## 5. Slots

Nenhum. Motor QPagination não expõe slot para botões individuais (EXC-01).

---

## 6. Estados

| Estado | Condição | Comportamento visual |
|---|---|---|
| Default | — | Botão ativo com `--dss-action-primary` (via `--q-color-primary`). |
| Hover | Cursor sobre botão inativo | Overlay leve sobre o botão (gerenciado por QPagination/QBtn). |
| Focus | Foco via teclado | `dss-focus-ring` mixin em `:focus-visible`. |
| Active (clique) | Botão pressionado | Overlay de pressed (gerenciado por QPagination/QBtn). |
| Página ativa | `model-value === N` | Botão N com `--q-color-primary` (mapeado para `--dss-action-primary`). |
| Disabled | `disable=true` | `opacity: --dss-opacity-disabled` + `pointer-events: none`. |
| Readonly | `readonly=true` | `pointer-events: none`, aparência normal. |
| Direction disabled | Na primeira/última página | Botões anterior/próximo desabilitados internamente pelo QPagination. |
| Loading | — | **Não aplicável.** Paginação não possui estado loading próprio. Se o conteúdo da página está carregando, o estado de loading deve ser gerenciado pelo componente consumidor (ex: `DssInnerLoading` sobre a lista/tabela). |

---

## 7. Acessibilidade

- **role="navigation"**: Container raiz recebe `role="navigation"` e `aria-label` configurável. Permite que leitores de tela identifiquem o widget de paginação como região de navegação.
- **aria-current="page"**: Gerenciado pelo QPagination no botão da página ativa (valor correto per ARIA spec para paginação).
- **Foco visível**: `:focus-visible` com `dss-focus-ring` mixin em todos os botões.
- **Teclado**: `Tab` para navegar entre botões, `Enter`/`Space` para ativar.
- **Touch target**: Delegado ao QPagination/QBtn. Os botões internos atendem ao tamanho mínimo via `--dss-compact-control-height-md` (≥ 44px em `md`).
- **Contraste**: Mínimo 4.5:1 entre texto e fundo nos botões, garantido pelos tokens `--dss-action-primary` e `--dss-text-on-primary`.

---

## 8. Brandabilidade

O componente reage a `[data-brand]` no próprio elemento ou em qualquer ancestor, sobrescrevendo `--q-color-primary` com o token de marca correspondente:

| Brand | Token | Produto |
|---|---|---|
| `hub` | `--dss-hub-primary` | Sansys Hub (laranja) |
| `water` | `--dss-water-primary` | Sansys Water (azul) |
| `waste` | `--dss-waste-primary` | Sansys Waste (verde) |

---

## 9. Tokens

Veja lista completa em [DSSPAGINATION_API.md — Tokens Utilizados](./DSSPAGINATION_API.md#tokens-utilizados).

---

## 10. Exceções aos Gates v2.4

| ID | Gate | Justificativa |
|---|---|---|
| EXC-01 | Gate de Composição v2.4 — Rule 1 | QPagination sem slot API para botões individuais — motor preservado intacto. |
| EXC-Gate-01 | Gate de CSS | Seletores internos `.q-pagination__middle` e `.q-pagination .q-btn` sobrescritos. `--q-color-primary` sobreescrita para theming de marca. |

---

## 11. Não implementado / Fora de escopo

- **Paginação infinita**: Use `DssInfiniteScroll`.
- **Carregamento sob demanda**: Responsabilidade do consumidor.
- **Seleção de itens por página**: Compor com `DssSelect` externamente.
- **Customização de ícones**: Ícones de direção/boundary são os padrões do QPagination. Substituição exigiria reconstrução via slots (indisponível — EXC-01).

---

## 12. Exemplos

### Básico
```vue
<DssPagination v-model="page" :max="10" />
```

### Navegação completa
```vue
<DssPagination
  v-model="page"
  :max="50"
  direction-links
  boundary-links
  :max-pages="7"
/>
```

### Circular com marca Hub
```vue
<DssPagination v-model="page" :max="8" round brand="hub" />
```

### Outline, size sm
```vue
<DssPagination v-model="page" :max="15" outline size="sm" />
```

### Flat com aria-label customizado
```vue
<DssPagination
  v-model="page"
  :max="20"
  flat
  aria-label="Paginação de resultados de busca"
/>
```

---

**Design System Sansys — Governança DSS v2.2**
