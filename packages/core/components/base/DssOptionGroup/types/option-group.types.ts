// =============================================================================
// DssOptionGroup — Types
// Design System Sansys v2.2 — Fase 2
// =============================================================================

/** Tipo de controle renderizado internamente pelo grupo */
export type OptionGroupType = 'radio' | 'checkbox' | 'toggle'

/**
 * Estrutura de cada item do grupo.
 * Alimenta o componente DSS filho correspondente (DssRadio, DssCheckbox, DssToggle).
 */
export interface OptionGroupItem {
  /** Texto do label do controle */
  label: string
  /** Valor único desta opção */
  value: any
  /** Desabilita apenas este item (não afeta os demais) */
  disable?: boolean
  /** Cor do controle (sobrescreve a prop `color` global do grupo) */
  color?: string
  /** Mantém a cor quando não selecionado/checado */
  keepColor?: boolean
}

/** Props públicas do DssOptionGroup */
export interface OptionGroupProps {
  /**
   * Valor selecionado (v-model).
   * - type="radio": qualquer valor escalar correspondente ao `value` de uma opção
   * - type="checkbox" ou "toggle": array de valores das opções marcadas
   */
  modelValue: any | any[]
  /** Array de opções que define os controles renderizados */
  options: OptionGroupItem[]
  /** Tipo de controle a renderizar. Padrão: 'radio' */
  type?: OptionGroupType
  /** Cor aplicada a todos os controles do grupo */
  color?: string
  /** Mantém a cor quando o controle não está ativo */
  keepColor?: boolean
  /** Layout horizontal (side-by-side). Padrão: false (vertical) */
  inline?: boolean
  /** Desabilita todo o grupo */
  disable?: boolean
  /** Somente leitura — exibe estado atual sem permitir interação */
  readonly?: boolean
  /** Modo compacto — reduz o gap entre os controles */
  dense?: boolean
  /** Label acessível para o grupo (aria-label) */
  ariaLabel?: string
  /** ID de elemento externo que serve como label (aria-labelledby) */
  ariaLabelledby?: string
}

/** Emits do DssOptionGroup */
export interface OptionGroupEmits {
  /**
   * Emitido quando a seleção muda.
   * - type="radio": emite o `value` da opção selecionada
   * - type="checkbox" ou "toggle": emite array de valores selecionados
   */
  (event: 'update:modelValue', value: any | any[]): void
}
