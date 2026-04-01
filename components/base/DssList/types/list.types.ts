/**
 * ==========================================================================
 * DssList - TypeScript Types
 * ==========================================================================
 *
 * Tipos, interfaces e enums do componente DssList.
 * Seguem o padrão DSS v2.2 de tipagem explícita e governada.
 */

// ==========================================================================
// ENUMS / UNION TYPES
// ==========================================================================

/**
 * Marcas disponíveis para o DssList
 */
export type ListBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssList
 *
 * Props BLOQUEADAS (não expostas por decisão arquitetural):
 * - dark: gerenciado globalmente via CSS e [data-theme="dark"]
 * - dense: densidade controlada individualmente nos DssItems
 */
export interface ListProps {
  /**
   * Aplica borda externa ao container da lista.
   * Inclui border-radius para delimitar visualmente o conjunto.
   *
   * @default false
   */
  bordered?: boolean

  /**
   * Aplica padding vertical (topo e base) no container da lista.
   * Cria espaçamento interno entre a borda e o primeiro/último item.
   *
   * @default false
   */
  padding?: boolean

  /**
   * Aplica divisores automáticos entre os itens filhos da lista.
   * Implementado via seletor descendente CSS (EXC-06).
   *
   * @default false
   */
  separator?: boolean

  /**
   * Marca (brand) do produto Sansys associada à lista.
   * Aplica acento de cor da marca à borda lateral (bordered).
   * null = sem marca (padrão semântico)
   *
   * @default null
   */
  brand?: ListBrand | null

  /**
   * Label acessível da lista para leitores de tela.
   * Recomendado quando o contexto visual não é suficiente.
   *
   * @default undefined
   */
  ariaLabel?: string

  /**
   * ID do elemento que rotula a lista (aria-labelledby).
   * Alternativa semântica ao ariaLabel.
   *
   * @default undefined
   */
  ariaLabelledby?: string
}

/**
 * Slots do componente DssList
 */
export interface ListSlots {
  /**
   * Slot default — conteúdo da lista.
   * Espera DssItem(s) e/ou DssSeparator(s) como filhos diretos.
   *
   * @example
   * ```vue
   * <DssList>
   *   <DssItem label="Primeiro item" />
   *   <DssItem label="Segundo item" />
   * </DssList>
   * ```
   */
  default(): any
}
