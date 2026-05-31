# DssTable

> **Fase:** 2 — Nível 4 (Dependente)
> **Família:** Tabelas e Dados
> **Motor:** QTable (Quasar)
> **Golden Reference:** DssChip
> **Golden Context:** DssMarkupTable
> **Status:** in-progress

---

## 1. Visão Geral

`DssTable` é o componente de tabela interativa do Design System Sansys. Encapsula o `QTable` do Quasar e adiciona:

- Governança visual via tokens DSS
- Prop `density` com três níveis: `compact`, `standard`, `comfortable`
- Suporte a todos os três brands (Hub, Water, Waste)
- Dark mode via `[data-theme="dark"]` global
- Acessibilidade WCAG 2.1 AA
- API imperativa via `defineExpose` (EXC-Expose-01)

### Quando usar

- Exibição de dados tabulares com ordenação, filtro ou paginação
- Tabelas com seleção de uma ou múltiplas linhas
- Tabelas com ações por linha (slots `body-cell`, `body-row`)
- Server-side (paginação/ordenação no backend via `@request`)
- Grandes volumes de dados com `virtual-scroll`

### Quando NÃO usar

- Tabelas estáticas sem interatividade → usar `DssMarkupTable`
- Tabelas HTML com estrutura manual → usar `DssMarkupTable`
- Comparação simples de atributos → usar `DssMarkupTable`

---

## 2. Instalação

```js
import { DssTable } from '@dss/components'
```

---

## 3. Uso Básico

```vue
<DssTable
  :rows="rows"
  :columns="columns"
  row-key="id"
/>
```

---

## 4. Props

Consultar [DSSTABLE_API.md](./DSSTABLE_API.md) para documentação completa.

### Props obrigatórias

| Prop | Tipo | Descrição |
|---|---|---|
| `rows` | `object[]` | Array de dados das linhas |

### Props principais

| Prop | Padrão | Descrição |
|---|---|---|
| `columns` | `undefined` | Definição das colunas |
| `row-key` | `'id'` | Campo identificador único de cada linha |
| `density` | `'standard'` | Densidade visual: `compact`, `standard`, `comfortable` |
| `selection` | `'none'` | Modo de seleção: `single`, `multiple`, `none` |
| `loading` | `undefined` | Overlay de loading sobre a tabela |
| `filter` | `undefined` | Filtro client-side |
| `bordered` | `undefined` | Borda ao redor da tabela |
| `flat` | `undefined` | Remove sombra |
| `separator` | `'horizontal'` | Tipo de separador |
| `virtual-scroll` | `undefined` | Virtualização para grandes datasets |

### Props bloqueadas

- `dark` → usar `[data-theme='dark']` global
- `color` → governado via `--q-color-primary` override
- `square` → DssTable sempre usa `--dss-radius-md`

---

## 5. Emits

| Evento | Descrição |
|---|---|
| `update:modelValue` | Mudança na seleção |
| `update:pagination` | Mudança na paginação |
| `request` | Evento server-side (sort/filter/paginate) |
| `selection` | Seleção/desmarcação de linhas |
| `row-click` | Clique em linha |
| `row-dblclick` | Duplo clique em linha |
| `row-contextmenu` | Menu de contexto em linha |

---

## 6. Slots

DssTable projeta todos os 14 slots do QTable. Slots são ativados condicionalmente (`v-if="$slots.slotName"`).

Principais:

- `#top-right` — Área para filtro/busca (recomendado: DssInput)
- `#body-cell-[nome]` — Célula customizada por coluna
- `#body-row` — Linha inteira customizada
- `#no-data` — Conteúdo quando sem dados
- `#loading` — Conteúdo do overlay de loading
- `#pagination` — Paginação customizada

---

## 7. API Imperativa (EXC-Expose-01)

```vue
<DssTable ref="tableRef" :rows="rows" :columns="columns" />

<script setup>
const tableRef = ref()

// Limpar seleção
tableRef.value.clearSelection()

// Ordenar por coluna
tableRef.value.sort('nome')

// Scroll para índice (virtual-scroll)
tableRef.value.scrollTo(50, 'end')

// Disparar request server-side manualmente
tableRef.value.requestServerInteraction()

// Reiniciar virtual scroll
tableRef.value.resetVirtualScroll()
</script>
```

---

## 8. Modos de Uso

### Seleção Múltipla

```vue
<DssTable
  v-model="selected"
  :rows="rows"
  :columns="columns"
  selection="multiple"
/>
```

### Server-side

```vue
<DssTable
  v-model:pagination="pagination"
  :rows="rows"
  :columns="columns"
  :loading="loading"
  @request="onRequest"
/>

<script setup>
async function onRequest ({ pagination, filter }) {
  loading.value = true
  const result = await fetchData(pagination)
  rows.value = result.data
  pagination.value.rowsNumber = result.total
  loading.value = false
}
</script>
```

### Com filtro no slot top-right

```vue
<DssTable :rows="rows" :columns="columns">
  <template #top-right>
    <DssInput v-model="filter" label="Buscar" />
  </template>
</DssTable>
```

### Density

```vue
<!-- Compacta: usa QTable dense=true -->
<DssTable :rows="rows" :columns="columns" density="compact" />

<!-- Padrão (default) -->
<DssTable :rows="rows" :columns="columns" density="standard" />

<!-- Confortável: padding aumentado via CSS DSS -->
<DssTable :rows="rows" :columns="columns" density="comfortable" />
```

### Célula customizada

```vue
<DssTable :rows="rows" :columns="columns">
  <template #body-cell-status="{ row }">
    <td>
      <DssBadge :label="row.status" :color="row.status === 'Ativo' ? 'positive' : 'grey'" />
    </td>
  </template>
</DssTable>
```

---

## 9. Densidade

| Valor | Comportamento | QTable |
|---|---|---|
| `compact` | Padding reduzido (`spacing-1_5` / `spacing-3`) | `dense=true` |
| `standard` | Padding padrão (`spacing-3` / `spacing-4`) | `dense=false` |
| `comfortable` | Padding aumentado (`spacing-4` / `spacing-6`) | `dense=false` + CSS DSS |

---

## 10. Estados

### Hover
Linhas do corpo da tabela exibem `background-color: var(--dss-gray-50)` no hover (exceto linhas selecionadas).

### Focus
Cabeçalhos clicáveis (colunas ordenáveis) recebem `outline: var(--dss-border-width-md) solid var(--dss-action-primary)` em `:focus-visible`.

### Active
N/A — interatividade pertence às linhas e controles internos.

### Disabled
N/A — tabelas não têm estado disabled. Linhas individuais podem ter classes `disabled` via slot `#body-row`.

### Loading
Gerenciado pelo QTable via prop `loading`. Exibe overlay interno com spinner. O container também recebe a classe `dss-table--loading`.

### Selecionado
Linhas selecionadas recebem `background-color: var(--dss-gray-100)`.

---

## 11. Brandabilidade

DssTable reage ao atributo `data-brand` no ancestral:

```html
<div data-brand="hub">
  <DssTable :rows="rows" :columns="columns" />
</div>
```

| Brand | Cabeçalho | Texto th | Borda th | Selecionado |
|---|---|---|---|---|
| `hub` | `--dss-hub-50` | `--dss-hub-700` | `--dss-hub-200` | `--dss-hub-50` |
| `water` | `--dss-water-50` | `--dss-water-700` | `--dss-water-200` | `--dss-water-50` |
| `waste` | `--dss-waste-50` | `--dss-waste-700` | `--dss-waste-200` | `--dss-waste-50` |

Em dark mode + brand, os fundos alternam para os tokens `-900` de cada brand.

---

## 12. Dark Mode

Gerenciado via `[data-theme='dark']` no ancestral:

```html
<html data-theme="dark">
  <DssTable :rows="rows" :columns="columns" />
</html>
```

Mudanças em dark mode:
- Fundo do cabeçalho: `--dss-gray-800`
- Texto do cabeçalho: `--dss-gray-200`
- Borda do cabeçalho: `rgba(255, 255, 255, 0.15)` (EXC-01)
- Borda das células: `rgba(255, 255, 255, 0.06)` (EXC-01)
- Hover: `--dss-gray-800`
- Selecionado: `--dss-gray-700`

---

## 13. Acessibilidade

- Estrutura HTML semântica: `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<th scope="col">`, `<td>`
- Colunas ordenáveis: `th[tabindex=0]` — navegáveis por teclado
- Focus visible: `th[tabindex]:focus-visible` com outline DSS
- Linhas selecionadas: `role="checkbox"` gerenciado pelo QTable (QCheckbox interno)
- `[data-theme="dark"]` não requer prop — governança global
- `prefers-contrast: more`: bordas mais espessas (`--dss-border-width-md`)
- `forced-colors: active`: compatível com Windows High Contrast Mode (EXC-02)
- `prefers-reduced-motion: reduce`: `transition: none` em th e tbody tr

---

## 14. Anti-Padrões

```vue
<!-- ❌ Não usar props bloqueadas -->
<DssTable dark color="primary" square ... />

<!-- ❌ Não usar QMarkupTable para dados interativos -->
<DssMarkupTable v-for="row in rows" /> <!-- sem ordenação, seleção, paginação -->

<!-- ❌ Não aplicar estilos inline hardcoded nas células -->
<template #body-cell-nome="{ value }">
  <td style="font-weight: bold; color: #333;">{{ value }}</td>
</template>

<!-- ✅ Usar tokens DSS nas customizações de slots -->
<template #body-cell-nome="{ value }">
  <td style="font-weight: var(--dss-font-weight-semibold); color: var(--dss-text-body);">
    {{ value }}
  </td>
</template>
```

---

## 15. Tokens Utilizados

| Token | Uso |
|---|---|
| `--dss-action-primary` | Checkboxes e sort ativos (via `--q-color-primary`) |
| `--dss-font-family-sans` | Tipografia da tabela |
| `--dss-font-size-md` | Texto das células |
| `--dss-font-size-sm` | Rótulos do cabeçalho e rodapé |
| `--dss-font-weight-semibold` | Peso dos cabeçalhos |
| `--dss-text-body` | Cor do texto das células |
| `--dss-gray-50` | Hover de linha |
| `--dss-gray-100` | Linha selecionada + separador do rodapé |
| `--dss-gray-200` | Borda do cabeçalho (light mode) |
| `--dss-gray-700` | Texto do cabeçalho (light mode) |
| `--dss-gray-800` | Fundo do cabeçalho (dark mode) |
| `--dss-radius-md` | Border radius do container |
| `--dss-spacing-1_5` | Padding compact (vertical) |
| `--dss-spacing-3` | Padding padrão (vertical) |
| `--dss-spacing-4` | Padding padrão (horizontal) |
| `--dss-spacing-6` | Padding comfortable (horizontal) |
| `--dss-border-width-thin` | Separadores entre linhas |
| `--dss-border-width-md` | Borda do cabeçalho + focus outline |
| `--dss-touch-target-md` | Altura mínima das áreas top e bottom |
| `--dss-duration-250` | Duração das transições de hover e seleção |
| `--dss-hub-50/200/600/700/900` | Brand Hub |
| `--dss-water-50/200/500/700/900` | Brand Water |
| `--dss-waste-50/200/600/700/900` | Brand Waste |

---

## 16. Exceções Formais

| ID | Descrição |
|---|---|
| `EXC-Gate-01` | Seletores descendentes para DOM interno do QTable |
| `EXC-Gate-02` | `--q-color-primary` override para checkboxes e sort icons |
| `EXC-01` | `rgba()` em dark mode (sem token DSS equivalente) |
| `EXC-02` | System color keywords em `forced-colors` |
| `EXC-03` | `display: block` em `@media print` |
| `EXC-04` | `1px solid currentColor` em células no `@media print` |
| `EXC-Expose-01` | `defineExpose` com API imperativa (5 métodos) |

---

## 17. Links

- [README.md](./README.md) — Quick start
- [DSSTABLE_API.md](./DSSTABLE_API.md) — API Reference completa
- [DssTable.example.vue](./DssTable.example.vue) — Exemplos interativos
