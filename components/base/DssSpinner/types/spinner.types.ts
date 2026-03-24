/**
 * DssSpinner — TypeScript Types
 *
 * Golden Reference: DssIcon
 * Touch Target: Opção B — não interativo
 */

// ─── Tipos de Spinner ─────────────────────────────────────────────────────────

/**
 * Variantes de spinner disponíveis.
 * Cada valor mapeia para um componente QSpinner* do Quasar.
 *
 * - standard: QSpinner       (circular com stroke — suporta `thickness`)
 * - dots:     QSpinnerDots   (três pontos pulsantes)
 * - ios:      QSpinnerIos    (arco rotativo estilo iOS)
 * - oval:     QSpinnerOval   (oval com traço)
 * - tail:     QSpinnerTail   (círculo com cauda)
 * - rings:    QSpinnerRings  (anéis concêntricos)
 * - pie:      QSpinnerPie    (segmento de torta)
 * - bars:     QSpinnerBars   (barras verticais pulsantes)
 */
export type SpinnerType =
  | 'standard'
  | 'dots'
  | 'ios'
  | 'oval'
  | 'tail'
  | 'rings'
  | 'pie'
  | 'bars'

/**
 * Cores semânticas DSS para o spinner.
 * Mapeiam exclusivamente para tokens DSS — nunca para valores Quasar diretos.
 *
 * - null / inherit: herda `currentColor` do contexto pai (padrão)
 * - primary:        var(--dss-action-primary)
 * - secondary:      var(--dss-action-secondary)
 * - neutral:        var(--dss-text-secondary)
 * - error:          var(--dss-feedback-error)
 * - success:        var(--dss-feedback-success)
 * - warning:        var(--dss-feedback-warning)
 * - info:           var(--dss-feedback-info)
 */
export type SpinnerColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'

/**
 * Tamanhos via tokens --dss-icon-size-* (Golden Reference DssIcon).
 *
 * - xs: 16px
 * - sm: 20px
 * - md: 24px (padrão)
 * - lg: 32px
 * - xl: 48px
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/** Contextos de brand Sansys. */
export type SpinnerBrand = 'hub' | 'water' | 'waste' | null

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SpinnerProps {
  /**
   * Variante gráfica do spinner.
   * Mapeia internamente para o componente QSpinner* correspondente.
   * @default 'standard'
   */
  type?: SpinnerType

  /**
   * Cor semântica DSS.
   * null = herda currentColor do contexto pai.
   * @default null
   */
  color?: SpinnerColor | null

  /**
   * Tamanho do spinner via tokens --dss-icon-size-* (seção 7.11 do catálogo).
   * @default 'md'
   */
  size?: SpinnerSize

  /**
   * Espessura do traço circular. Aplicável APENAS ao tipo 'standard' (QSpinner).
   * Ignorado para os demais tipos.
   * @default 5
   */
  thickness?: number

  /**
   * Contexto de brand Sansys.
   * null = herda do [data-brand] ancestral via cascade.
   * @default null
   */
  brand?: SpinnerBrand

  /**
   * Texto acessível para screen readers (conteúdo do .dss-spinner__label sr-only).
   * Fortemente recomendado quando múltiplos spinners coexistem na página
   * para diferenciar contextos de carregamento.
   * @default 'Carregando'
   */
  ariaLabel?: string
}
