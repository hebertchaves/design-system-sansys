# DssDataTable — API

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `rows` | `DssDataTableRow[]` | obrigatório | Linhas apresentadas. |
| `columns` | `DssTableColumn[]` | obrigatório | Colunas governadas pelo DssTable. |
| `rowKey` | `string` | `'id'` | Campo identificador. |
| `title` | `string` | `''` | Título da tabela. |
| `ariaLabel` | `string` | `''` | Nome acessível da região. |
| `mode` | `'local' \| 'remote'` | `'local'` | Define quem processa filtro e paginação. |
| `selection` | `'none' \| 'single' \| 'multiple'` | `'none'` | Regime de seleção. |
| `modelValue` | `DssDataTableRow[]` | `[]` | Linhas selecionadas. |
| `filter` | `string` | `''` | Filtro controlado. |
| `pagination` | `DssTablePagination` | página 1 | Paginação controlada. |
| `loading` | `boolean` | `false` | Estado de leitura. |
| `error` | `string \| null` | `null` | Mensagem da falha de leitura. |
| `density` | `DssTableDensity` | `'standard'` | Densidade do motor tabular. |
| `rowsPerPageOptions` | `number[]` | `[10, 25, 50]` | Passos da paginação. |
| `actions` | `DssDataTableAction[]` | `[]` | Ações de topo ou lote. |
| `rowActions` | `DssDataTableAction[]` | `[]` | Ações repetidas por linha. |
| `expandable` | `boolean` | `false` | Habilita detalhes expansíveis. |
| `expandedKeys` | `(string \| number)[]` | `[]` | Chaves expandidas. |
| `disabled` | `boolean` | `false` | Interrompe as interações do bloco. |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Contexto opcional de marca. |
| `noDataLabel` | `string` | localizado | Rótulo do vazio. |
| `noResultsLabel` | `string` | localizado | Rótulo do filtro sem resultado. |

## Eventos

| Evento | Payload | Descrição |
|---|---|---|
| `update:modelValue` | `DssDataTableRow[]` | Atualiza seleção. |
| `update:filter` | `string` | Atualiza filtro. |
| `update:pagination` | `DssTablePagination` | Atualiza paginação. |
| `update:expandedKeys` | `(string \| number)[]` | Atualiza expansão. |
| `request` | `DssDataTableRequest` | Solicita dados ao consumidor. |
| `action` | `DssDataTableActionPayload` | Comunica ação. |
| `expand-request` | `{ row, key, expanded }` | Solicita ou recolhe detalhes. |
| `row-click` | `(event, row, index)` | Comunica clique na linha. |

## Slots

| Slot | Escopo | Descrição |
|---|---|---|
| `top-left` | `{ selected }` | Substitui ações do topo. |
| `top-right` | `{ filter }` | Substitui filtro. |
| `row-actions` | `{ row, disabled }` | Substitui ações da linha. |
| `expanded-row` | `{ row, key }` | Conteúdo dos detalhes. |
| `no-data` | `{ filtered }` | Estado vazio customizado. |

## API imperativa

`request()`, `clearSelection()` e `sort(column)`.
