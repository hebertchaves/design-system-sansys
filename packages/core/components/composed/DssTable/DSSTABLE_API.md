# DssTable — API Reference

Motor: **QTable** (Quasar). CSS global (sem scoped) — DOM do QTable pode ser renderizado em contexto diferente.

---

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `rows` | `object[]` | _obrigatório_ | Array de objetos com os dados das linhas |
| `columns` | `DssTableColumn[]` | `undefined` | Definição das colunas |
| `row-key` | `string \| ((row) => any)` | `'id'` | Campo ou função que identifica cada linha unicamente |
| `title` | `string` | `undefined` | Título exibido no cabeçalho da tabela |
| `loading` | `boolean` | `undefined` | Exibe overlay de loading sobre a tabela |
| `filter` | `string \| object` | `undefined` | Valor usado para filtro client-side |
| `selection` | `'single' \| 'multiple' \| 'none'` | `'none'` | Modo de seleção de linhas. `'none'` desabilita seleção |
| `v-model` | `object[]` | `[]` | Linhas selecionadas (bind bidirecional) |
| `v-model:pagination` | `DssTablePagination` | `undefined` | Objeto de paginação (bind bidirecional) |
| `density` | `'compact' \| 'standard' \| 'comfortable'` | `'standard'` | Densidade visual da tabela |
| `bordered` | `boolean` | `undefined` | Adiciona borda ao redor da tabela |
| `flat` | `boolean` | `undefined` | Remove sombra da tabela |
| `wrap-cells` | `boolean` | `undefined` | Permite quebra de linha no conteúdo das células |
| `separator` | `'horizontal' \| 'vertical' \| 'cell' \| 'none'` | `'horizontal'` | Tipo de separador entre células |
| `virtual-scroll` | `boolean` | `undefined` | Ativa renderização virtual para grandes datasets |
| `no-data-label` | `string` | `'Nenhum dado disponível'` | Mensagem quando rows está vazio |
| `no-results-label` | `string` | `'Nenhum resultado encontrado...'` | Mensagem quando o filtro não retorna resultados |
| `hide-bottom` | `boolean` | `undefined` | Oculta a barra inferior (paginação) |
| `hide-header` | `boolean` | `undefined` | Oculta o cabeçalho da tabela |
| `rows-per-page-options` | `number[]` | `[10, 25, 50]` | Opções de quantidade de linhas por página |

### Props bloqueadas (não usar)

| Prop QTable | Motivo |
|---|---|
| `dark` | Tema escuro via `[data-theme='dark']` global — nunca por prop de componente |
| `color` | Cor governada via `--q-color-primary` override com tokens DSS |
| `square` | DssTable sempre usa `--dss-radius-md` |

---

## Emits

| Evento | Assinatura | Descrição |
|---|---|---|
| `update:modelValue` | `(rows: object[]) => void` | Emitido quando a seleção muda |
| `update:pagination` | `(pagination: DssTablePagination) => void` | Emitido quando a paginação muda |
| `request` | `(details: { pagination, filter, getCellValue }) => void` | Emitido em modo server-side (sort/filter/paginate) |
| `selection` | `(details: { rows, added, keys }) => void` | Emitido quando linhas são selecionadas/desmarcadas |
| `row-click` | `(evt: Event, row: object, index: number) => void` | Clique em uma linha |
| `row-dblclick` | `(evt: Event, row: object, index: number) => void` | Duplo clique em uma linha |
| `row-contextmenu` | `(evt: Event, row: object, index: number) => void` | Menu de contexto em uma linha |

---

## Slots

| Slot | Escopo | Descrição |
|---|---|---|
| `top` | `{ pagination, pagesNumber, isFirstPage, isLastPage, prevPage, nextPage, inFullscreenMode, toggleFullscreen }` | Substituição completa da área superior |
| `top-left` | `{ pagination, pagesNumber }` | Área superior esquerda (padrão: título) |
| `top-right` | `{ pagination, pagesNumber }` | Área superior direita (ideal para filtro/busca) |
| `top-row` | `{ cols }` | Linha adicional acima das linhas de dados |
| `top-selection` | `{ rowsNumber, selected }` | Conteúdo da área superior quando há seleção |
| `header` | `{ cols, colsMap, sort, sortMethod, color, dark, dense }` | Substituição do `<tr>` de cabeçalho inteiro |
| `header-cell` | `{ col, cols, colIndex, sort, sortMethod, color, dark, dense }` | Substituição de cada `<th>` do cabeçalho |
| `body` | `{ key, row, rowIndex, cols, colsMap, expand, selected, color, dark, dense }` | Substituição do `<tr>` de cada linha |
| `body-row` | `{ key, row, rowIndex, cols, colsMap, expand, selected, color, dark, dense }` | Substituição do `<tr>` de cada linha (sem checkbox de seleção) |
| `body-cell` | `{ key, row, rowIndex, col, cols, colsMap, value, expand, selected, color, dark, dense }` | Substituição de cada `<td>` |
| `no-data` | `{ message, icon, filter }` | Conteúdo quando não há dados |
| `loading` | — | Conteúdo do overlay de loading |
| `pagination` | `{ scope }` | Substituição da área de paginação |
| `bottom` | `{ pagination, pagesNumber, isFirstPage, isLastPage, prevPage, nextPage }` | Substituição completa da área inferior |
| `bottom-row` | `{ cols }` | Linha adicional abaixo das linhas de dados |

---

## API Imperativa (defineExpose)

Acessível via `ref` no componente pai (EXC-Expose-01):

| Método | Assinatura | Descrição |
|---|---|---|
| `requestServerInteraction` | `(reqProps?: object) => void` | Dispara evento `@request` manualmente |
| `resetVirtualScroll` | `() => void` | Reinicia virtual scroll para o índice 0 |
| `scrollTo` | `(index: number, edge?: string) => void` | Scrolla para o índice no virtual scroll |
| `clearSelection` | `() => void` | Limpa toda a seleção atual |
| `sort` | `(col: string \| { name: string }) => void` | Ordena por uma coluna específica |

---

## Tipos TypeScript

```typescript
type DssTableDensity = 'compact' | 'standard' | 'comfortable'
type DssTableSeparator = 'horizontal' | 'vertical' | 'cell' | 'none'
type DssTableSelection = 'single' | 'multiple' | 'none'

interface DssTableColumn {
  name: string
  label: string
  field: string | ((row: object) => unknown)
  required?: boolean
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  sort?: (a: unknown, b: unknown, rowA: object, rowB: object) => number
  format?: (val: unknown, row: object) => unknown
  style?: string
  classes?: string
  headerStyle?: string
  headerClasses?: string
}

interface DssTablePagination {
  sortBy?: string
  descending?: boolean
  page?: number
  rowsPerPage?: number
  rowsNumber?: number
}
```

---

## Tokens CSS

| Token | Uso |
|---|---|
| `--dss-action-primary` | Cor de ação para checkboxes internos e ícones de sort ativos (via `--q-color-primary`) |
| `--dss-font-family-sans` | Família tipográfica da tabela |
| `--dss-font-size-md` | Tamanho do texto das células |
| `--dss-font-size-sm` | Tamanho dos rótulos de cabeçalho e rodapé |
| `--dss-font-weight-semibold` | Peso das células de cabeçalho (`<th>`) |
| `--dss-text-body` | Cor do texto das células |
| `--dss-gray-50` | Fundo de linha em hover |
| `--dss-gray-100` | Fundo de linha selecionada; separador de rodapé |
| `--dss-gray-200` | Borda inferior do cabeçalho |
| `--dss-gray-700` | Cor do texto do cabeçalho |
| `--dss-gray-800` | Fundo do cabeçalho em dark mode |
| `--dss-radius-md` | Border radius do container da tabela |
| `--dss-spacing-1_5` | Padding das células em density="compact" |
| `--dss-spacing-3` | Padding padrão das células (vertical) |
| `--dss-spacing-4` | Padding padrão das células (horizontal) |
| `--dss-spacing-6` | Padding das células em density="comfortable" |
| `--dss-border-width-thin` | Espessura do separador entre linhas |
| `--dss-border-width-md` | Espessura da borda do cabeçalho |
| `--dss-touch-target-md` | Altura mínima das áreas de topo e rodapé (acessibilidade) |
| `--dss-duration-250` | Duração das transições de hover e background |
| `--dss-hub-*` | Tokens de brand Hub (50/200/600/700/900) |
| `--dss-water-*` | Tokens de brand Water (50/200/500/700/900) |
| `--dss-waste-*` | Tokens de brand Waste (50/200/600/700/900) |

---

## Exceções aos Gates v2.4

| ID | Tipo | Justificativa |
|---|---|---|
| `EXC-Gate-01` | Seletores descendentes `.dss-table .q-table`, `.q-table th`, `.q-table td` | QTable renderiza DOM interno que não pode ser estilizado por escopo de componente |
| `EXC-Gate-02` | `--q-color-primary: var(--dss-action-primary)` no escopo `.dss-table` | QTable usa internamente `--q-color-primary` para checkboxes e ícones — necessário para governança DSS |
| `EXC-01` | `rgba(255,255,255,0.15)` e `rgba(255,255,255,0.06)` em dark mode | Sem token DSS equivalente para separadores com opacidade |
| `EXC-02` | Palavras-chave de cor do sistema em `forced-colors` | User agent ignora custom properties CSS em Windows High Contrast Mode |
| `EXC-03` | `display: block` em `@media print` | Token não aplicável em contexto de impressão |
| `EXC-04` | `1px solid currentColor` em `@media print` para células | Token não aplicável em contexto de impressão |
| `EXC-Expose-01` | `defineExpose` com 5 métodos da API QTable | API imperativa necessária para controle server-side e programático |
