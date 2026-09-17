/**
 * ==========================================================================
 * DssTab — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssTab.
 * Aba individual de navegação/seleção — wrapper DSS sobre QTab.
 *
 * @version 1.0.0
 */

// ==========================================================================
// PROPS
// ==========================================================================

/**
 * Props do DssTab.
 *
 * A API espelha seletivamente a do QTab, expondo apenas as props
 * semanticamente relevantes para o DSS.
 *
 * Props bloqueadas:
 * - ripple: desativado por padrão (:ripple="false") — DSS governa feedback visual
 * - no-caps: governado pelo CSS/tokens DSS, não por prop
 */
export interface TabProps {
  /**
   * Identificador único da aba.
   * Obrigatório para o v-model do DssTabs pai.
   */
  name: string | number

  /**
   * Texto principal exibido na aba.
   */
  label?: string

  /**
   * Nome do ícone Material Icons a exibir.
   * Quando fornecido sem label, a aba renderiza apenas o ícone.
   */
  icon?: string

  /**
   * Exibe um ponto de alerta na aba.
   * - Boolean (true): usa a cor padrão de alerta (negativo DSS via Quasar)
   * - String: usa a cor Quasar especificada (ex.: "red", "orange")
   */
  alert?: boolean | string

  /**
   * Desabilita a interação com a aba.
   * Aplica opacidade reduzida e cursor not-allowed.
   */
  disable?: boolean

  // ========================================================================
  // Expostas em set/2026 pelo de-para com o QTab
  // ========================================================================

  /**
   * Ícone no lugar do ponto de alerta.
   * Só tem efeito com `alert` ativo — um alerta sem marca não existe.
   *
   * @example 'priority_high'
   */
  alertIcon?: string

  /**
   * Posição na ordem de tabulação.
   * `-1` tira a aba da navegação por Tab sem desabilitá-la.
   */
  tabindex?: number | string
}

// ==========================================================================
// SLOTS
// ==========================================================================

/**
 * Slots disponíveis no DssTab.
 */
export interface TabSlots {
  /**
   * Conteúdo customizado da aba.
   * Quando fornecido, substitui o conteúdo padrão (icon + label).
   */
  default(): unknown
}
