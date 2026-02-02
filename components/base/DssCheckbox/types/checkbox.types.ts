/**
 * ==========================================================================
 * DssCheckbox TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssCheckbox
 * Baseado na API do Quasar q-checkbox com extensoes DSS
 *
 * @see https://quasar.dev/vue-components/checkbox
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Cores semanticas DSS
 */
export type CheckboxColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

/**
 * Tamanhos disponiveis
 */
export type CheckboxSize =
  | 'xs'  // Extra Small
  | 'sm'  // Small
  | 'md'  // Medium (default)
  | 'lg'  // Large

/**
 * Brands disponiveis
 */
export type CheckboxBrand =
  | 'hub'
  | 'water'
  | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssCheckbox
 *
 * @example
 * ```vue
 * <DssCheckbox
 *   v-model="accepted"
 *   color="primary"
 *   label="Accept terms"
 * />
 * ```
 */
export interface CheckboxProps {
  // ========================================
  // Value / Model
  // ========================================

  /**
   * Valor atual do checkbox
   *
   * - boolean: toggle simples (true/false)
   * - null: estado indeterminate
   * - any[]: modo grupo (array de valores selecionados)
   */
  modelValue?: boolean | null | any[]

  /**
   * Valor que este checkbox representa no modo grupo (array model)
   * Apenas significativo quando modelValue e um array
   */
  val?: any

  /** Valor customizado para estado "marcado" */
  trueValue?: any

  /** Valor customizado para estado "desmarcado" */
  falseValue?: any

  /** Valor customizado para estado indeterminate */
  indeterminateValue?: any

  /** Habilita ciclo de 3 estados: unchecked -> checked -> indeterminate */
  toggleIndeterminate?: boolean

  // ========================================
  // Content
  // ========================================

  /** Texto do label (alternativa ao slot default) */
  label?: string

  /** Posiciona o label a esquerda do indicador */
  leftLabel?: boolean

  // ========================================
  // Visual
  // ========================================

  /** Cor semantica do checkbox */
  color?: CheckboxColor

  /** Tamanho do checkbox */
  size?: CheckboxSize

  // ========================================
  // States
  // ========================================

  /** Estado desabilitado */
  disable?: boolean

  /** Modo compacto (reduz espacamento) */
  dense?: boolean

  // ========================================
  // Brand
  // ========================================

  /** Brand override (Hub, Water, Waste) */
  brand?: CheckboxBrand | null

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Tabindex customizado para o input nativo
   * Default: 0 (sempre focavel)
   * Disabled: -1 (nao focavel)
   */
  tabindex?: number | string | null

  /**
   * Label de acessibilidade customizado para screen readers
   * Aplicado ao input nativo
   */
  ariaLabel?: string
}

/**
 * Eventos emitidos pelo DssCheckbox
 */
export interface CheckboxEmits {
  /**
   * Emitido quando o valor do checkbox muda
   * @param value Novo valor (boolean, null ou array)
   */
  (e: 'update:modelValue', value: boolean | null | any[]): void
}

/**
 * Slots disponiveis no DssCheckbox
 */
export interface CheckboxSlots {
  /**
   * Conteudo customizado do label
   * @default label prop
   */
  default(): any
}
