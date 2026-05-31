# DSSTESTPAGECOMPLEXITY_API.md

> API Reference — DssTestPageComplexity v1.0.0  
> DSS v2.2 | Fase 3 | Composed

---

## Props

### `brand`
- **Tipo:** `'hub' | 'water' | 'waste' | undefined`
- **Default:** `undefined`
- **Comportamento:** Propaga via atributo `data-brand` no elemento raiz. Todos os componentes DSS filhos recebem automaticamente a identidade visual da marca.

### `disabled`
- **Tipo:** `boolean`
- **Default:** `false`
- **Comportamento:** Desabilita todas as interações da página. Propagado via `provide/inject` com a chave `PAGE_COMPLEXITY_DISABLED_KEY` (`InjectionKey<Readonly<Ref<boolean>>>`). Aplica `opacity: var(--dss-opacity-disabled)` e `pointer-events: none` na raiz.

### `loading`
- **Tipo:** `boolean`
- **Default:** `false`
- **Comportamento:** Quando `true`, exibe skeletons com animação shimmer nas áreas de dados (contadores de status, linhas da tabela). Skeletons usam tokens `--dss-surface-muted` e `--dss-surface-subtle`.

### `pageTitle`
- **Tipo:** `string | undefined`
- **Default:** `undefined`
- **Comportamento:** Título principal da página, exibido na área de header e no breadcrumb.

### `pageSubtitle`
- **Tipo:** `string | undefined`
- **Default:** `undefined`
- **Comportamento:** Subtítulo exibido abaixo do título, indicando a view ou contexto atual.

### `breadcrumbs`
- **Tipo:** `BreadcrumbItem[]`
- **Default:** `[]`
- **Comportamento:** Lista de itens `{ number: number, label: string }` exibidos no breadcrumb usando `QBreadcrumbs` + `QBreadcrumbsEl`.

### `activeView`
- **Tipo:** `'dashboard' | 'map' | 'schedule'`
- **Default:** `'dashboard'`
- **Comportamento:** Controla qual tab/view está ativa. Usado com `v-model:activeView`. Ao mudar, emite `update:activeView`.

### `statusCounts`
- **Tipo:** `StatusCount | undefined`
- **Interface:**
  ```typescript
  interface StatusCount {
    onTime: number     // Ordens no prazo
    expiring: number   // Ordens a vencer
    expired: number    // Ordens vencidas
  }
  ```
- **Comportamento:** Alimenta os 3 cards de status (sucesso/aviso/erro) com contadores numéricos.

### `tableRows`
- **Tipo:** `ServiceOrderRow[]`
- **Default:** `[]`
- **Interface:**
  ```typescript
  interface ServiceOrderRow {
    id: string
    team: string
    hasEquipment: boolean
    code: string
    description: string
    serviceNumber: string
    hCode: string
    address: string
    neighborhood: string
  }
  ```
- **Comportamento:** Linhas exibidas na tabela. Array vazio exibe o estado `__empty`.

### `totalItems`
- **Tipo:** `number`
- **Default:** `0`
- **Comportamento:** Total de registros para cálculo da paginação via `QPagination`.

### `currentPage`
- **Tipo:** `number`
- **Default:** `1`
- **Comportamento:** Página atual. Usado com `v-model:currentPage`. Ao mudar, emite `update:currentPage`.

### `itemsPerPage`
- **Tipo:** `number`
- **Default:** `10`
- **Comportamento:** Quantidade de itens por página (informativo — filtro real é responsabilidade do consumidor).

### `activeFilters`
- **Tipo:** `FilterChip[]`
- **Default:** `[]`
- **Interface:**
  ```typescript
  interface FilterChip {
    id: string
    label: string
  }
  ```
- **Comportamento:** Chips de filtros ativos exibidos na seção de filtros. Cada chip tem botão X que emite `filter:remove`.

---

## Emits

### `update:activeView`
- **Payload:** `TestPageView` (`'dashboard' | 'map' | 'schedule'`)
- **Quando:** Usuário clica em botão de troca de visualização no toggle de views.
- **Uso com v-model:** `v-model:activeView="currentView"`

### `update:currentPage`
- **Payload:** `number`
- **Quando:** Usuário navega para outra página via `QPagination`.
- **Uso com v-model:** `v-model:currentPage="page"`

### `filter:remove`
- **Payload:** `string` (o `id` do `FilterChip` removido)
- **Quando:** Usuário clica no X de um chip de filtro ativo.

### `filter:search`
- **Payload:** nenhum
- **Quando:** Usuário clica no botão "Pesquisar" na seção de filtros.
- **Nota (NC-08):** Os valores dos filtros internos (setor, equipe, código) não são emitidos no payload. Os filtros são estado interno não controlado (`filterStrategy: "uncontrolled"`). Para uso controlado, aguarde v1.1.0 ou crie uma especialização com props `v-model` para cada filtro.

### `row:view`
- **Payload:** `ServiceOrderRow` (linha completa)
- **Quando:** Usuário clica no link de visualização de uma linha da tabela.

---

## Slots

### `filter-actions`
- **Escopo:** nenhum
- **Descrição:** Ações extras exibidas no cabeçalho da seção de filtros (à direita do título "Filtros"). Útil para botão "Limpar filtros" ou ações secundárias.
- **Exemplo:**
  ```html
  <template #filter-actions>
    <q-btn flat label="Limpar todos" @click="clearFilters" />
  </template>
  ```

### `table-footer`
- **Escopo:** nenhum
- **Descrição:** Conteúdo extra no rodapé da tabela de dados, após a paginação. Útil para exportação, totais ou ações em massa.
- **Exemplo:**
  ```html
  <template #table-footer>
    <q-btn outline label="Exportar CSV" icon="download" />
  </template>
  ```

> **NC-07 corrigida:** O slot `tab-orders` **não é exposto** por `DssTestPageComplexity`. Ele é um slot interno do `DssDataCard` consumido internamente. Tentativas de `<template #tab-orders>` neste componente não serão respondidas. As views "Mapa" e "Agenda" são renderizadas via slot interno do `DssDataCard` — para customizá-las, use o slot `table-footer` ou crie uma especialização do componente.

---

## provide/inject

### `PAGE_COMPLEXITY_DISABLED_KEY`
- **Tipo:** `InjectionKey<Readonly<Ref<boolean>>>`
- **Symbol:** `Symbol('DssTestPageComplexity:disabled')`
- **Fornecido por:** `DssTestPageComplexity` via `provide()`
- **Consumido por:** Componentes filhos que precisam reagir ao estado disabled da página
- **Uso em filhos:**
  ```typescript
  import { inject } from 'vue'
  import { PAGE_COMPLEXITY_DISABLED_KEY } from '@/components/composed/DssTestPageComplexity'
  
  const isDisabled = inject(PAGE_COMPLEXITY_DISABLED_KEY)
  ```

---

## Tokens utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-muted` | Background da página e skeleton |
| `--dss-surface-default` | Card de filtros |
| `--dss-surface-subtle` | Header e footer da tabela |
| `--dss-surface-hover` | Hover em linha da tabela |
| `--dss-surface-selected` | Linha selecionada |
| `--dss-text-primary` | Título, números de status |
| `--dss-text-secondary` | Subtítulos, labels, resultados |
| `--dss-text-on-primary` | Texto em botão ativo |
| `--dss-action-primary` | Botão de view ativo, links |
| `--dss-border-gray-300` | Borda do toggle de view |
| `--dss-gray-200` | Bordas de linhas da tabela |
| `--dss-feedback-success` | Cor texto/ícone sucesso |
| `--dss-feedback-success-surface` | Background card sucesso |
| `--dss-feedback-success-light` | Borda card sucesso |
| `--dss-feedback-warning` | Cor texto/ícone aviso |
| `--dss-feedback-warning-surface` | Background card aviso |
| `--dss-feedback-warning-light` | Borda card aviso |
| `--dss-feedback-error` | Cor texto/ícone erro |
| `--dss-feedback-error-surface` | Background card erro |
| `--dss-feedback-error-light` | Borda card erro |
| `--dss-font-size-4xl` | Título e números grandes |
| `--dss-font-size-lg` | Título de seção |
| `--dss-font-size-sm` | Labels, TH da tabela |
| `--dss-font-size-base` | Texto de estado vazio |
| `--dss-font-weight-bold` | Títulos, números |
| `--dss-font-weight-semibold` | TH da tabela, título de filtros |
| `--dss-font-weight-medium` | Links |
| `--dss-font-weight-normal` | Subtítulo |
| `--dss-radius-lg` | Cards de status |
| `--dss-radius-md` | Toggle de view, botões |
| `--dss-radius-sm` | Skeleton, focus ring |
| `--dss-spacing-1` | Margem inferior de número |
| `--dss-spacing-3` | Padding footer tabela |
| `--dss-spacing-4` | Padding header filtros |
| `--dss-spacing-6` | Padding horizontal header filtros |
| `--dss-spacing-8` | Altura skeleton de row |
| `--dss-spacing-10` | Largura/altura skeleton de número |
| `--dss-spacing-32` | Altura mínima estado vazio |
| `--dss-spacing-40` | Largura máxima chip de filtro |
| `--dss-opacity-disabled` | Opacidade no estado disabled |
| `--dss-duration-150` | Transição hover linha |
| `--dss-duration-1000` | Animação skeleton shimmer |
| `--dss-easing-standard` | Curva de easing |
| `--dss-hub-primary` | Cor de ação brand Hub |
| `--dss-water-primary` | Cor de ação brand Water |
| `--dss-waste-primary` | Cor de ação brand Waste |

---

## Estados

| Estado | Implementação | Notas |
|--------|---------------|-------|
| `default` | Estrutura completa visível | — |
| `loading` | Skeletons nas áreas de dados | Controlado por prop `loading` |
| `disabled` | `opacity: var(--dss-opacity-disabled)` + `pointer-events: none` | Propagado via provide/inject |
| `empty` | Estado `__empty` com texto | Quando `tableRows` é vazio |
| `hover` (linha tabela) | `background: var(--dss-surface-hover)` | Via CSS |
| `focus` (link) | `outline: 2px solid var(--dss-action-primary)` | WCAG 2.1 AA |

**Estados NÃO aplicáveis:**
- `active` (estado de clique): gerenciado pelos componentes filhos (QBtn, etc.)
- `indeterminate`: não aplicável a página
- `error`: estado de erro de dados é responsabilidade do consumidor

---

## Exceções declaradas

Nenhuma exceção a Token First neste componente.

---

## Dependências DSS internas

- `DssCard` — Cards de status, card de filtros e card de dados
- `DssCardSection` — Seções internas dos cards
- `DssCardActions` — Área de ações do card de filtros
- `DssChip` — Chips de filtro ativos
- `DssIcon` — Ícones de status (check_circle, warning, error)
- `DssSeparator` — Separação visual na seção de filtros
