/**
 * ==========================================================================
 * DssMultiselectAutocomplete TypeScript Definitions
 * ==========================================================================
 *
 * Componente COMPOSTO (Fase 3) — orquestra DssSelect (base) + DssCheckbox
 * (glifo de estado por opção) + DssChip (token removível da seleção).
 *
 * PREMISSA DE COMPOSIÇÃO (Cartão Composto): NÃO reimplementa primitivos —
 * apenas aninha, cada peça consumindo sua base. A identidade do componente
 * (multiseleção + autocomplete) vem de presets sobre o QSelect que o DssSelect
 * já envelopa (multiple + use-input via passthrough de $attrs).
 *
 * INCREMENTO 1 (thin): multiseleção, autocomplete com filtro default, checkbox
 * por opção (decorativo — a fonte de verdade é aria-selected da option) e chips
 * removíveis. O comportamento "selecionado sobe ao topo" é do INCREMENTO 2.
 *
 * @see DssSelect - base envelopada
 * @see docs/governance/DSS_GUIA_COMPOSICAO_FASE3.md
 */

import type { Ref } from 'vue'

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/** Brands disponiveis (Sansys Hub/Water/Waste) */
export type MultiselectAutocompleteBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do DssMultiselectAutocomplete.
 *
 * O componente é sempre múltiplo (multiple=true) — modelValue é um array.
 * Props não declaradas aqui (ex.: use-input já é interno; hint, rules, dense…)
 * são repassadas ao DssSelect/QSelect via $attrs.
 */
export interface MultiselectAutocompleteProps {
  // ========================================
  // Model / Options
  // ========================================

  /**
   * Valores selecionados. Sempre um array (multiseleção).
   * @default []
   */
  modelValue?: any[]

  /** Lista de opções (objetos ou primitivos). */
  options?: any[]

  /** Campo/função que extrai o VALOR de cada opção (para emitValue/mapOptions). */
  optionValue?: string | ((option: any) => any)

  /** Campo/função que extrai o RÓTULO exibido de cada opção. */
  optionLabel?: string | ((option: any) => string)

  /** Emite apenas o valor (optionValue) em vez do objeto inteiro. */
  emitValue?: boolean

  /** Mapeia os valores emitidos de volta para objetos (requer emitValue). */
  mapOptions?: boolean

  // ========================================
  // Autocomplete
  // ========================================

  /** Debounce (ms) do filtro do autocomplete. @default 300 */
  inputDebounce?: number | string

  // ========================================
  // Content
  // ========================================

  /** Rótulo do campo. */
  label?: string

  /** Placeholder exibido no input de busca. */
  placeholder?: string

  // ========================================
  // States
  // ========================================

  /** Exibe indicador de carregamento. */
  loading?: boolean

  /** Desabilita o campo inteiro (propagado às peças internas via inject). */
  disable?: boolean

  /** Somente leitura. */
  readonly?: boolean

  /** Exibe botão de limpar toda a seleção. */
  clearable?: boolean

  // ========================================
  // Chips (tokens da seleção)
  // ========================================

  /**
   * Torna os chips de seleção removíveis (botão × + evento remove).
   * @default true
   */
  chipsRemovable?: boolean

  // ========================================
  // Brand
  // ========================================

  /**
   * Brand override. Propagado ao DssSelect (que já reinjeta o brand no menu
   * teleportado via popup-content-class — mitigação do risco 2.1 de Fase 3).
   */
  brand?: MultiselectAutocompleteBrand | null

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /** Label ARIA do campo (role=combobox, aria-multiselectable). */
  ariaLabel?: string
}

/**
 * Eventos emitidos pelo DssMultiselectAutocomplete.
 */
export interface MultiselectAutocompleteEmits {
  /** Emitido quando a seleção muda (array). */
  (e: 'update:modelValue', value: any[]): void

  /** Emitido quando um chip é removido (valor removido). */
  (e: 'remove', value: any): void

  /** Foco no campo. */
  (e: 'focus', event: FocusEvent): void

  /** Blur do campo. */
  (e: 'blur', event: FocusEvent): void

  /** Seleção inteira limpa (via clearable). */
  (e: 'clear'): void

  /** Dropdown aberto. */
  (e: 'popup-show'): void

  /** Dropdown fechado. */
  (e: 'popup-hide'): void
}

/**
 * Slots do DssMultiselectAutocomplete.
 *
 * option/selected-item têm default DSS (checkbox / chip). O consumidor pode
 * sobrescrever — o slot do consumidor tem precedência sobre o default interno.
 */
export interface MultiselectAutocompleteSlots {
  /**
   * Conteúdo de cada opção do dropdown.
   * Default: DssCheckbox (decorativo) + rótulo.
   */
  option?(scope: { opt: any; selected: boolean; toggleOption: (opt: any) => void; index: number }): any

  /**
   * Conteúdo de cada token selecionado no campo.
   * Default: DssChip removível.
   */
  'selected-item'?(scope: { opt: any; index: number; removeAtIndex: (i: number) => void }): any
}

/**
 * Refs/métodos expostos (paridade com a família de campos).
 */
export interface MultiselectAutocompleteExpose {
  /** Foca o campo. */
  focus: () => void
  /** Remove o foco do campo. */
  blur: () => void
  /** Abre o dropdown. */
  showPopup: () => void
  /** Fecha o dropdown. */
  hidePopup: () => void
  /** Referência ao DssSelect interno. */
  selectRef: Ref<any>
}
