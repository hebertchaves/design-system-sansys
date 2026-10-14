# DssDataTable - Claude Code — API Reference

Identificador em código: `DssDataTableClaudeCode`. Tipos em `types/data-table-claude-code.types.ts` — **a fonte**; esta página é derivada.

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `rows` | `DssDataTableCcRow[]` | — | Linhas a exibir, já filtradas pela página |
| `columns` | `DssTableColumn[]` | — | Definição das colunas |
| `rowKey` | `string` | `'id'` | Chave única da linha |
| `title` | `string` | `''` | Título da seção, no cabeçalho do bloco |
| `ariaLabel` | `string` | `''` | Nome acessível da região |
| `total` | `number \| null` | `null` | Denominador da contagem viva |
| `countNoun` | `string` | `'registros'` | Substantivo contado no cabeçalho |
| `mode` | `'local' \| 'remote'` | `'local'` | Origem dos dados |
| `selection` | `DssTableSelection` | `'none'` | Tipo de seleção |
| `modelValue` | `DssDataTableCcRow[]` | `[]` | Linhas selecionadas (v-model) |
| `filterLabel` | `string \| null` | `null` | Rótulo do filtro aplicado; presente, vira chip removível |
| `pagination` | `DssTablePagination` | `{ page: 1, rowsPerPage: 10 }` | Estado de paginação |
| `rowsPerPageOptions` | `number[]` | `[10, 25, 50]` | Opções de linhas por página |
| `loading` | `boolean` | `false` | Carregando |
| `error` | `string \| null` | `null` | Mensagem de falha |
| `density` | `DssTableDensity` | `'compact'` | Densidade da grade |
| `actions` | `DssDataTableCcAction[]` | `[]` | Ações da barra do cabeçalho |
| `rowActions` | `DssDataTableCcAction[]` | `[]` | Ações por linha |
| `expandable` | `boolean` | `false` | Habilita detalhe expansível |
| `expandedKeys` | `Array<string \| number>` | `[]` | Chaves expandidas (v-model) |
| `statusColumn` | `string \| null` | `null` | Coluna cujo valor é situação |
| `statusMap` | `Record<string, DssDataTableCcStatus>` | `{}` | Valor → tom e ícone do chip |
| `disabled` | `boolean` | `false` | Desabilita o bloco inteiro |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca do bloco |
| `emptyTitle` | `string` | `'Nenhum registro para este filtro'` | Título do vazio |
| `emptyDescription` | `string` | `'Revise os critérios ou limpe os filtros aplicados.'` | Descrição do vazio |

## Eventos

| Evento | Payload | Quando |
|---|---|---|
| `update:modelValue` | `DssDataTableCcRow[]` | Seleção mudou |
| `update:pagination` | `DssTablePagination` | Paginação mudou |
| `update:expandedKeys` | `Array<string \| number>` | Expansão mudou |
| `request` | `{ pagination }` | Modo remoto precisa de dados |
| `action` | `{ action, rows, row? }` | Ação acionada |
| `expand-request` | `{ row, key, expanded }` | Detalhe pedido |
| `row-click` | `(evt, row, index)` | Linha clicada |
| `clear-filter` | — | Chip do filtro removido, ou "Limpar filtro" no vazio |
| `retry` | — | "Tentar novamente" após falha |

## Slots

| Slot | Escopo | Descrição |
|---|---|---|
| `head-start` | `{ selected }` | Entre o título e o chip de filtro |
| `head-actions` | `{ selected, disabled }` | Substitui a barra derivada de `actions` |
| `row-actions` | `{ row, disabled }` | Substitui as ações da linha |
| `expanded-row` | `{ row, key }` | Conteúdo do detalhe |
| `empty` | `{ filtered }` | Substitui o estado vazio |

## Métodos expostos

| Método | Assinatura | Descrição |
|---|---|---|
| `request` | `() => void` | Reemite `request` com a paginação atual |
| `clearSelection` | `() => void` | Emite `update:modelValue` com lista vazia |
| `sort` | `(col: string \| { name: string }) => void` | Delega a ordenação ao `DssTable` |

## Tipos

| Tipo | Valores |
|---|---|
| `DssDataTableCcMode` | `'local' \| 'remote'` |
| `DssDataTableCcActionMode` | `'single' \| 'multi' \| 'any' \| 'none'` |
| `DssDataTableCcTone` | `'info' \| 'success' \| 'warning' \| 'error' \| 'neutral'` |
| `DssDataTableCcBrand` | `'hub' \| 'water' \| 'waste'` |
| `DssDataTableCcAction` | `{ name, label, icon?, color?, mode?, disabled? }` |
| `DssDataTableCcStatus` | `{ tone, icon?, label? }` |
