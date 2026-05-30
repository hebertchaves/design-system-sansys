// DssTable — TypeScript interfaces
// Motor: QTable (Quasar Framework)
// Golden Reference: DssChip | Golden Context: DssMarkupTable

// ============================================================================
// TYPES
// ============================================================================

export type DssTableDensity = 'compact' | 'standard' | 'comfortable'
export type DssTableSeparator = 'horizontal' | 'vertical' | 'cell' | 'none'
export type DssTableSelection = 'single' | 'multiple' | 'none'

export interface DssTableColumn {
  name: string
  label: string
  field: string | ((row: Record<string, unknown>) => unknown)
  required?: boolean
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  sort?: (
    a: unknown,
    b: unknown,
    rowA: Record<string, unknown>,
    rowB: Record<string, unknown>
  ) => number
  format?: (val: unknown, row: Record<string, unknown>) => string
  style?: string
  classes?: string
  headerStyle?: string
  headerClasses?: string
}

export interface DssTablePagination {
  sortBy?: string | null
  descending?: boolean
  page?: number
  rowsPerPage?: number
  rowsNumber?: number
}

// ============================================================================
// PROPS
// ============================================================================

export interface DssTableProps {
  /** Linhas de dados da tabela (obrigatório) */
  rows: Record<string, unknown>[]
  /** Definição das colunas (obrigatório) */
  columns: DssTableColumn[]
  /** Chave única de cada linha */
  rowKey?: string
  /** Título exibido na área top da tabela */
  title?: string
  /** Estado de carregamento — exibe DssSpinner interno do QTable */
  loading?: boolean
  /** Texto de filtro global (case-insensitive) */
  filter?: string
  /** Tipo de seleção de linhas */
  selection?: DssTableSelection
  /** Linhas selecionadas (v-model) */
  modelValue?: Record<string, unknown>[]
  /** Estado de paginação (v-model:pagination) */
  pagination?: DssTablePagination
  /** Densidade da tabela — compact: menor espaçamento, comfortable: maior */
  density?: DssTableDensity
  /** Borda ao redor da tabela */
  bordered?: boolean
  /** Remove a elevação (flat = sem sombra) */
  flat?: boolean
  /** Permite quebra de linha nas células */
  wrapCells?: boolean
  /** Tipo de separador entre células */
  separator?: DssTableSeparator
  /** Ativa virtualização de linhas para grandes conjuntos de dados */
  virtualScroll?: boolean
  /** Texto exibido quando rows está vazio */
  noDataLabel?: string
  /** Texto exibido quando filter não encontra resultados */
  noResultsLabel?: string
  /** Oculta a área bottom (paginação + itens por página) */
  hideBottom?: boolean
  /** Oculta o cabeçalho da tabela */
  hideHeader?: boolean
  /** Opções de linhas por página na paginação */
  rowsPerPageOptions?: number[]

  // PROPS BLOQUEADAS (não expostas):
  // dark  → governado globalmente por [data-theme="dark"]
  // color → governado por tokens de brand DSS
  // square → viola --dss-radius-md (identidade visual DSS)
}

// ============================================================================
// EMITS
// ============================================================================

export interface DssTableEmits {
  /** Sincronização de linhas selecionadas (v-model) */
  (e: 'update:modelValue', value: Record<string, unknown>[]): void
  /** Sincronização do estado de paginação */
  (e: 'update:pagination', value: DssTablePagination): void
  /** Evento de requisição server-side (quando @request é necessário) */
  (
    e: 'request',
    props: {
      pagination: DssTablePagination
      filter?: string
      getCellValue: (col: DssTableColumn, row: Record<string, unknown>) => unknown
    }
  ): void
  /** Evento de mudança de seleção */
  (
    e: 'selection',
    details: {
      rows: Record<string, unknown>[]
      keys: unknown[]
      added: boolean
      evt: Event
    }
  ): void
  /** Clique em linha */
  (e: 'row-click', evt: Event, row: Record<string, unknown>, index: number): void
  /** Duplo-clique em linha */
  (e: 'row-dblclick', evt: Event, row: Record<string, unknown>, index: number): void
  /** Clique-direito em linha */
  (e: 'row-contextmenu', evt: Event, row: Record<string, unknown>, index: number): void
}

// ============================================================================
// SLOTS
// ============================================================================

export interface DssTableSlots {
  /** Área top completa (quando usado, substitui top-left e top-right) */
  top?: () => unknown
  /** Lado esquerdo da área top (título, ações em massa) */
  'top-left'?: () => unknown
  /** Lado direito da área top (campo de filtro, configurações) */
  'top-right'?: () => unknown
  /** Linha adicional na área top */
  'top-row'?: () => unknown
  /** Ações exibidas quando linhas estão selecionadas */
  'top-selection'?: (props: { selected: Record<string, unknown>[] }) => unknown
  /** Cabeçalho completo (substitui renderização padrão do thead) */
  header?: (props: { cols: DssTableColumn[]; colsMap: Record<string, DssTableColumn> }) => unknown
  /** Célula de cabeçalho individual */
  'header-cell'?: (props: { col: DssTableColumn; colIndex: number }) => unknown
  /** Body completo (substitui renderização padrão do tbody) */
  body?: (props: {
    key: unknown
    row: Record<string, unknown>
    rowIndex: number
    cols: DssTableColumn[]
    selected: boolean
    pageIndex: number
  }) => unknown
  /** Linha de body individual */
  'body-row'?: (props: {
    key: unknown
    row: Record<string, unknown>
    rowIndex: number
    cols: DssTableColumn[]
    selected: boolean
    pageIndex: number
  }) => unknown
  /** Célula de body individual */
  'body-cell'?: (props: {
    key: unknown
    row: Record<string, unknown>
    col: DssTableColumn
    value: unknown
    selected: boolean
    rowIndex: number
    pageIndex: number
  }) => unknown
  /** Estado vazio — sem dados ou sem resultados de filtro */
  'no-data'?: (props: { icon: string; message: string; filter: string }) => unknown
  /** Overlay de carregamento customizado */
  loading?: () => unknown
  /** Área de paginação customizada */
  pagination?: (props: { scope: unknown }) => unknown
  /** Área bottom completa (quando usado, substitui paginação padrão) */
  bottom?: () => unknown
  /** Linha adicional no rodapé da tabela */
  'bottom-row'?: () => unknown
}
