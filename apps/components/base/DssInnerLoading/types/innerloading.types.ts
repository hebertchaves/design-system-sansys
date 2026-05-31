/**
 * DssInnerLoading — TypeScript Types
 *
 * Golden Reference: DssBadge (não interativo)
 * Golden Context: DssCircularProgress (família Progresso e Feedback)
 */

// ─── Cores Semânticas ────────────────────────────────────────────────────────

/**
 * Cores semânticas DSS para o spinner e label do DssInnerLoading.
 * Mapeiam para tokens DSS — nunca para valores Quasar ou valores hardcoded.
 *
 * - primary:   var(--dss-action-primary)
 * - secondary: var(--dss-action-secondary)
 * - error:     var(--dss-feedback-error)
 * - success:   var(--dss-feedback-success)
 * - warning:   var(--dss-feedback-warning)
 * - info:      var(--dss-feedback-info)
 */
export type InnerLoadingColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'

/**
 * Tamanhos do spinner interno.
 * Repassados diretamente ao DssSpinner via prop `size`.
 *
 * Dimensões baseadas em tokens --dss-icon-size-* (Golden Context DssSpinner):
 * - xs: 16px
 * - sm: 20px
 * - md: 24px (padrão)
 * - lg: 32px
 * - xl: 48px
 */
export type InnerLoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/** Contextos de brand Sansys. */
export type InnerLoadingBrand = 'hub' | 'water' | 'waste'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface InnerLoadingProps {
  /**
   * Controla a visibilidade do overlay de loading.
   * REQUERIDO — o componente pai é responsável por gerenciar este estado.
   */
  showing: boolean

  /**
   * Cor semântica DSS do spinner e do texto de label.
   * Controla a propriedade CSS `color` no overlay, herdada via `currentColor`
   * pelo DssSpinner interno e pelo .dss-inner-loading__label.
   * @default 'primary'
   */
  color?: InnerLoadingColor

  /**
   * Tamanho do spinner interno (DssSpinner).
   * Repassado diretamente como prop `size` ao DssSpinner no slot default.
   * @default 'md'
   */
  size?: InnerLoadingSize

  /**
   * Texto opcional exibido abaixo do spinner.
   * Visível para o usuário — NÃO substitui o ariaLabel do DssSpinner.
   */
  label?: string

  /**
   * Atraso em milissegundos antes da exibição do overlay.
   * Previne flashes de loading em operações muito rápidas.
   * Repassado ao QInnerLoading via prop `delay`.
   */
  delay?: number

  /**
   * Contexto de brand Sansys.
   * Define `data-brand` no root e aplica o token de cor da marca ao spinner.
   * undefined = usa a cor semântica definida por `color`.
   */
  brand?: InnerLoadingBrand
}

// ─── Slots ────────────────────────────────────────────────────────────────────

export interface InnerLoadingSlots {
  /**
   * Slot para substituir o conteúdo padrão (DssSpinner + label).
   * Use para casos avançados: barras de progresso customizadas, ícones animados, etc.
   * Ao usar este slot, o consumer é responsável pela acessibilidade do conteúdo.
   */
  default?: () => unknown
}
