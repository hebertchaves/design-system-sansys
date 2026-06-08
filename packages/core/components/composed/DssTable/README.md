# DssTable

Wrapper DSS governado sobre `QTable` do Quasar. Tabela interativa com ordenação, paginação, filtro, seleção de linhas e density.

## Quick Start

```vue
<template>
  <DssTable
    :rows="rows"
    :columns="columns"
    row-key="id"
  />
</template>

<script setup>
import { DssTable } from '@sansys/design-system'

const columns = [
  { name: 'name', label: 'Nome', field: 'name', sortable: true },
  { name: 'age',  label: 'Idade', field: 'age', sortable: true },
]
const rows = [
  { id: 1, name: 'Ana Silva', age: 30 },
  { id: 2, name: 'Bruno Costa', age: 25 },
]
</script>
```

## Quando usar

- Dados tabulares que precisam de ordenação, filtro ou paginação
- Seleção de uma ou múltiplas linhas com ação posterior
- Tabelas com ações por linha (via slot `body-cell`)
- Dados server-side paginados (via evento `@request`)

## Quando NÃO usar

- Tabelas estáticas simples sem interatividade → usar `DssMarkupTable`
- Layouts de grade/matriz → usar CSS Grid com tokens DSS

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `rows` | `object[]` | **(obrigatório)** | Array de objetos com os dados das linhas |
| `columns` | `DssTableColumn[]` | `undefined` | Definição das colunas (nome, label, field, sortable) |
| `row-key` | `string \| Function` | `'id'` | Campo que identifica cada linha unicamente |
| `title` | `string` | `undefined` | Título exibido no cabeçalho da tabela |
| `loading` | `boolean` | `undefined` | Exibe overlay de loading sobre a tabela |
| `filter` | `string \| object` | `undefined` | Filtro client-side |
| `selection` | `'single' \| 'multiple' \| 'none'` | `'none'` | Modo de seleção de linhas |
| `v-model` | `object[]` | `[]` | Linhas selecionadas (bind bidirecional) |
| `v-model:pagination` | `DssTablePagination` | `undefined` | Objeto de paginação (bind bidirecional) |
| `density` | `'compact' \| 'standard' \| 'comfortable'` | `'standard'` | Densidade visual |
| `bordered` | `boolean` | `undefined` | Adiciona borda ao redor da tabela |
| `flat` | `boolean` | `undefined` | Remove sombra |
| `wrap-cells` | `boolean` | `undefined` | Permite quebra de linha nas células |
| `separator` | `'horizontal' \| 'vertical' \| 'cell' \| 'none'` | `'horizontal'` | Tipo de separador |
| `virtual-scroll` | `boolean` | `undefined` | Renderização virtual para grandes datasets |
| `no-data-label` | `string` | `'Nenhum dado disponível'` | Mensagem para tabela vazia |
| `rows-per-page-options` | `number[]` | `[10, 25, 50]` | Opções de itens por página |

## Slots Principais

| Slot | Descrição |
|------|-----------|
| `top-right` | Área superior direita — ideal para campo de filtro/busca |
| `top-left` | Área superior esquerda — padrão: título |
| `body-cell` | Substituição de cada célula `<td>` — scoped: `{ row, col, value }` |
| `body-row` | Substituição do `<tr>` inteiro — scoped: `{ row, cols }` |
| `header-cell` | Substituição de cada `<th>` — scoped: `{ col }` |
| `no-data` | Conteúdo quando não há dados — scoped: `{ message }` |
| `loading` | Overlay de carregamento customizado |
| `pagination` | Área de paginação customizada |

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `object[]` | Seleção de linhas mudou |
| `update:pagination` | `DssTablePagination` | Paginação mudou |
| `request` | `{ pagination, filter }` | Server-side: sort/filtro/paginação solicitados |
| `selection` | `{ rows, added, keys }` | Linhas selecionadas/desmarcadas |
| `row-click` | `(evt, row, index)` | Clique em uma linha |
| `row-dblclick` | `(evt, row, index)` | Duplo clique em uma linha |

## Estados Visuais

| Estado | Comportamento |
|--------|---------------|
| **loading** | Overlay semitransparente com spinner sobre a tabela |
| **empty** | Exibe mensagem `no-data-label` centralizada |
| **selected row** | Fundo destacado via `--dss-surface-selected` |
| **hover row** | Fundo `--dss-surface-hover` na linha sob o cursor |
| **sorted column** | Ícone de ordenação visível no cabeçalho |
| **density: compact** | Altura de linha reduzida (`--dss-compact-control-height-sm`) |
| **density: comfortable** | Altura de linha aumentada com mais espaço interno |

## Exemplos

### Com seleção múltipla

```vue
<DssTable
  v-model="selectedRows"
  :rows="rows"
  :columns="columns"
  selection="multiple"
/>
```

### Paginação server-side

```vue
<DssTable
  v-model:pagination="pagination"
  :rows="rows"
  :columns="columns"
  @request="onRequest"
/>
```

### Filtro com slot

```vue
<DssTable :rows="rows" :columns="columns">
  <template #top-right>
    <DssInput v-model="filter" label="Buscar" dense />
  </template>
</DssTable>
```

### Ação por linha

```vue
<DssTable :rows="rows" :columns="columns">
  <template #body-cell-actions="{ row }">
    <q-td>
      <DssButton icon="edit" flat round dense @click="edit(row)" />
      <DssButton icon="delete" flat round dense @click="remove(row)" />
    </q-td>
  </template>
</DssTable>
```

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Background da tabela |
| `--dss-surface-hover` | Hover das linhas |
| `--dss-surface-selected` | Linha selecionada |
| `--dss-surface-header` | Background do cabeçalho |
| `--dss-border-default` | Bordas e separadores |
| `--dss-radius-md` | Border radius da tabela |
| `--dss-compact-control-height-sm` | Altura linha density compact |
| `--dss-compact-control-height-md` | Altura linha density standard |
| `--dss-compact-control-height-lg` | Altura linha density comfortable |
| `--dss-text-body` | Cor do texto das células |
| `--dss-text-label` | Cor do texto dos cabeçalhos |

## Acessibilidade

- Tabela usa elemento `<table>` nativo com `<thead>` e `<tbody>` corretos
- Cabeçalhos ordenáveis têm `aria-sort` atualizado automaticamente
- Linhas selecionáveis recebem `aria-selected`
- Loading comunica estado via `aria-busy`

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [DssTable.md](./DssTable.md) | Normativo — governança, exceções de gate, decisões |
| [DSSTABLE_API.md](./DSSTABLE_API.md) | API Reference — props completas, slots, eventos, API imperativa |
