// DssTimeline — TypeScript interfaces

export type DssTimelineLayout = 'dense' | 'comfortable' | 'loose'
export type DssTimelineSide = 'left' | 'right'

export interface DssTimelineProps {
  /**
   * Controla o espaçamento entre os itens da linha do tempo.
   * - 'dense': espaçamento mínimo, compacto
   * - 'comfortable': espaçamento equilibrado (padrão)
   * - 'loose': espaçamento generoso
   */
  layout?: DssTimelineLayout
  /**
   * Define de qual lado os itens aparecem em relação à linha central.
   * Sobrescrito individualmente por cada DssTimelineEntry.
   */
  side?: DssTimelineSide
  /**
   * Ativa o modo escuro no QTimeline.
   * Prefira usar [data-theme="dark"] via cascade global de tokens DSS.
   */
  dark?: boolean
}

export interface DssTimelineSlots {
  /** Slot principal — aceita componentes DssTimelineEntry */
  default: () => unknown
}
