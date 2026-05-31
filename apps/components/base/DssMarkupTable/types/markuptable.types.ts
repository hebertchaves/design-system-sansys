/**
 * ==========================================================================
 * DssMarkupTable — TypeScript Types
 * ==========================================================================
 *
 * Tipos, interfaces e enums do componente DssMarkupTable.
 * Seguem o padrão DSS v2.2 de tipagem explícita e governada.
 */

// ==========================================================================
// UNION TYPES
// ==========================================================================

/** Densidade visual da tabela */
export type MarkupTableDensity = 'compact' | 'standard' | 'comfortable'

/** Separador de células */
export type MarkupTableSeparator = 'horizontal' | 'vertical' | 'cell' | 'none'

/** Marcas de produto disponíveis */
export type MarkupTableBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssMarkupTable
 *
 * Props BLOQUEADAS (não expostas por decisão arquitetural):
 * - `dark`: gerenciado globalmente via [data-theme="dark"] no DSS
 * - `dense`: substituído por `density` com três níveis semânticos
 */
export interface DssMarkupTableProps {
  /**
   * Densidade visual da tabela.
   * Controla o padding interno das células.
   *
   * - `compact`: padding reduzido (uso em espaços com muitos dados)
   * - `standard`: padding padrão DSS (default)
   * - `comfortable`: padding generoso (uso em dashboards visuais)
   *
   * @default 'standard'
   */
  density?: MarkupTableDensity

  /**
   * Remove sombra e bordas do container (superfície plana).
   *
   * @default false
   */
  flat?: boolean

  /**
   * Aplica borda externa ao container da tabela.
   *
   * @default false
   */
  bordered?: boolean

  /**
   * Tipo de separador entre células.
   *
   * - `horizontal`: borda inferior em linhas (default Quasar)
   * - `vertical`: borda direita em colunas
   * - `cell`: borda em todas as direções
   * - `none`: sem separadores
   *
   * @default 'horizontal'
   */
  separator?: MarkupTableSeparator

  /**
   * Remove o border-radius do container (cantos quadrados).
   *
   * @default false
   */
  square?: boolean

  /**
   * Permite que o conteúdo das células quebre em múltiplas linhas.
   * Por padrão, o conteúdo não quebra (overflow com elipsis).
   *
   * @default false
   */
  wrapCells?: boolean

  /**
   * Aplicar identidade visual de marca ao cabeçalho da tabela.
   * Utiliza tokens semânticos de brand via [data-brand] CSS.
   *
   * @default null
   */
  brand?: MarkupTableBrand | null
}

// DssMarkupTable é não-interativo — sem emits
// Nenhum defineEmits declarado no componente

/**
 * Slots do componente DssMarkupTable
 */
export interface DssMarkupTableSlots {
  /**
   * Conteúdo da tabela.
   * Deve conter elementos semânticos HTML: <thead>, <tbody>, <tfoot>, <tr>, <th>, <td>.
   *
   * @example
   * ```html
   * <thead>
   *   <tr>
   *     <th scope="col">Nome</th>
   *     <th scope="col">Idade</th>
   *   </tr>
   * </thead>
   * <tbody>
   *   <tr>
   *     <td>João</td>
   *     <td>30</td>
   *   </tr>
   * </tbody>
   * ```
   */
  default: () => unknown
}
