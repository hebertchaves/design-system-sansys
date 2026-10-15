# DssDataGrid — API Reference

Tipos em `types/data-grid.types.ts` — **a fonte**; esta página é derivada.

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `rows` | `DssDataGridRow[]` | — | Registros a exibir, já filtrados pela página |
| `fields` | `DssDataGridField[]` | — | Campos da ficha: `{ name, label, field?, format?, visibility? }` |
| `rowKey` | `string` | `'id'` | Chave única do registro |
| `title` | `string` | `''` | Título da seção |
| `ariaLabel` | `string` | `''` | Nome acessível da região |
| `titleField` | `string \| null` | `null` | Campo que dá nome à ficha; omitido, usa o primeiro visível |
| `total` | `number \| null` | `null` | Denominador da contagem viva |
| `countNoun` | `string` | `'registros'` | Substantivo contado |
| `selection` | `'none' \| 'single' \| 'multiple'` | `'none'` | Tipo de seleção |
| `modelValue` | `DssDataGridRow[]` | `[]` | Registros selecionados (v-model) |
| `filterLabel` | `string \| null` | `null` | Filtro aplicado; presente, vira chip removível |
| `paginated` | `boolean` | `true` | Liga a paginação |
| `page` | `number` | `1` | Página atual (v-model:page) |
| `rowsPerPage` | `number` | `12` | Fichas por página |
| `rowsNumber` | `number \| null` | `null` | Total no servidor — informado, a paginação é REMOTA |
| `columnsPerRow` | `1 \| 2 \| 3 \| 4` | `3` | Teto de colunas da grade |
| `loading` | `boolean` | `false` | Carregando |
| `error` | `string \| null` | `null` | Mensagem de falha |
| `disabled` | `boolean` | `false` | Desabilita o bloco |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca do bloco |
| `emptyTitle` | `string` | `'Nenhum registro encontrado'` | Título do vazio |
| `emptyDescription` | `string` | `'Revise os critérios ou limpe os filtros aplicados.'` | Descrição do vazio |
| `moreLabel` | `string` | `'Mais'` | Rótulo do revelador fechado |
| `lessLabel` | `string` | `'Menos'` | Rótulo do revelador aberto |

## Eventos

| Evento | Payload | Quando |
|---|---|---|
| `update:modelValue` | `DssDataGridRow[]` | Seleção mudou |
| `update:page` | `number` | Página mudou |
| `request` | `{ page, rowsPerPage }` | Paginação remota precisa de dados |
| `item-click` | `(row, index)` | Ficha clicada |
| `clear-filter` | — | Chip removido, ou "Limpar filtro" no vazio |
| `retry` | — | "Tentar novamente" após falha |

## Slots

| Slot | Escopo | Descrição |
|---|---|---|
| `head-start` | `{ selected }` | Entre o título e o chip de filtro |
| `head-actions` | `{ selected, disabled }` | Barra de ações do cabeçalho |
| `item` | `{ row, selected, index }` | Substitui o corpo da ficha inteira |
| `item-actions` | `{ row, disabled }` | Acrescenta ao cabeçalho da ficha |
| `empty` | `{ filtered }` | Substitui o estado vazio |

## Métodos expostos

| Método | Assinatura | Descrição |
|---|---|---|
| `request` | `() => void` | Reemite `request` com a página atual |
| `clearSelection` | `() => void` | Emite `update:modelValue` com lista vazia |
| `revealAll` | `() => void` | Abre os campos secundários de todas as fichas |
| `collapseAll` | `() => void` | Fecha os campos secundários de todas as fichas |

## Tipos

| Tipo | Valores |
|---|---|
| `DssDataGridSelection` | `'none' \| 'single' \| 'multiple'` |
| `DssDataGridFieldVisibility` | `'visible' \| 'hidden'` |
| `DssDataGridBrand` | `'hub' \| 'water' \| 'waste'` |
| `DssDataGridField` | `{ name, label, field?, format?, visibility? }` |
| `DssDataGridRequest` | `{ page, rowsPerPage }` |

## Classes CSS

| Classe | Descrição |
|---|---|
| `.dss-data-grid` | Raiz da região |
| `.dss-data-grid--cols-{1,2,3,4}` | Teto de colunas da grade |
| `.dss-data-grid--loading` · `--error` · `--disabled` | Estados na raiz |
| `.dss-data-grid__items` | A grade (`<ul>`) |
| `.dss-data-grid__card` | Ficha de um registro |
| `.dss-data-grid__card--selected` | Ficha selecionada |
| `.dss-data-grid__fields` | Lista de definições da ficha |
| `.dss-data-grid__fields--extra` | Bloco de campos secundários (revelado) |
