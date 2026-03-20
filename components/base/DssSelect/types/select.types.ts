/**
 * ==========================================================================
 * DssSelect TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssSelect.
 * Wrapper governado do QSelect do Quasar pelo DSS v2.2.
 *
 * @see https://quasar.dev/vue-components/select
 * @version 1.0.0
 */

import type { Ref } from 'vue'

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do select
 */
export type SelectVariant = 'filled' | 'outlined' | 'standout' | 'borderless'

/**
 * Marcas do sistema Sansys
 */
export type SelectBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssSelect
 *
 * @example
 * ```vue
 * <DssSelect
 *   v-model="cidade"
 *   :options="cidades"
 *   label="Cidade"
 *   hint="Selecione a cidade de entrega"
 * />
 * ```
 */
export interface SelectProps {
  // ========================================
  // Model
  // ========================================

  /**
   * Valor selecionado (v-model).
   * Pode ser string, número, objeto, ou array (quando multiple=true).
   */
  modelValue?: any

  // ========================================
  // Options
  // ========================================

  /**
   * Lista de opções disponíveis para seleção.
   * Aceita array de strings ou array de objetos.
   * @default []
   */
  options?: any[]

  /**
   * Chave do objeto usada como valor da opção.
   * Suporta string (path) ou função extratora.
   * Requer emitValue=true para funcionar com objetos.
   * @default 'value'
   */
  optionValue?: string | ((option: any) => any)

  /**
   * Chave do objeto usada como label exibido da opção.
   * Suporta string (path) ou função extratora.
   * @default 'label'
   */
  optionLabel?: string | ((option: any) => string)

  /**
   * Emite apenas o valor extraído da opção (não o objeto inteiro).
   * Deve ser usado em conjunto com mapOptions=true para exibir corretamente.
   * @default false
   */
  emitValue?: boolean

  /**
   * Mapeia os valores emitidos de volta para objetos ao usar emitValue=true.
   * Necessário para o QSelect encontrar e exibir o label correto.
   * @default false
   */
  mapOptions?: boolean

  // ========================================
  // Visual
  // ========================================

  /**
   * Variante visual do select
   * @default 'outlined'
   */
  variant?: SelectVariant

  /**
   * Versão compacta (menor altura)
   * @default false
   */
  dense?: boolean

  /**
   * Marca Sansys (Hub, Water, Waste)
   * @default null
   */
  brand?: SelectBrand | null

  // ========================================
  // Content
  // ========================================

  /**
   * Label do select (floating label)
   */
  label?: string

  /**
   * Label sempre visível no topo (não flutua)
   * @default false
   */
  stackLabel?: boolean

  /**
   * Placeholder do select quando não há valor selecionado
   */
  placeholder?: string

  /**
   * Texto de ajuda exibido abaixo do select
   */
  hint?: string

  /**
   * Mensagem de erro exibida abaixo do select
   */
  errorMessage?: string

  // ========================================
  // State
  // ========================================

  /**
   * Estado de erro (muda cor para --dss-error-600)
   * @default false
   */
  error?: boolean

  /**
   * Select desabilitado
   * @default false
   */
  disabled?: boolean

  /**
   * Select somente leitura
   * @default false
   */
  readonly?: boolean

  /**
   * Mostra indicador de loading (spinner do QSelect)
   * @default false
   */
  loading?: boolean

  /**
   * Select obrigatório (adiciona aria-required="true")
   * @default false
   */
  required?: boolean

  // ========================================
  // Features
  // ========================================

  /**
   * Permite seleção de múltiplas opções.
   * modelValue deve ser Array quando true.
   * @default false
   */
  multiple?: boolean

  /**
   * Exibe seleções múltiplas como chips dentro do campo.
   * Para chips totalmente governados pelo DSS, use o slot selected-item com DssChip.
   * @default false
   */
  useChips?: boolean

  /**
   * Mostra botão de limpar (×) quando há valor selecionado
   * @default false
   */
  clearable?: boolean

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Label de acessibilidade customizado para screen readers.
   * Sobrescreve o label visual quando fornecido.
   *
   * @example
   * ```vue
   * <DssSelect ariaLabel="Selecionar idioma" :options="idiomas" />
   * ```
   */
  ariaLabel?: string

  /**
   * Tabindex customizado
   * @default null (usa 0 por padrão)
   */
  tabindex?: number | string | null
}

/**
 * Eventos emitidos pelo DssSelect
 */
export interface SelectEmits {
  /**
   * Emitido quando o valor selecionado muda (v-model)
   */
  (e: 'update:modelValue', value: any): void

  /**
   * Emitido quando o select recebe foco
   */
  (e: 'focus', event: FocusEvent): void

  /**
   * Emitido quando o select perde foco
   */
  (e: 'blur', event: FocusEvent): void

  /**
   * Emitido quando a seleção é limpa via botão clear
   */
  (e: 'clear'): void

  /**
   * Emitido quando o painel dropdown é aberto
   */
  (e: 'popup-show'): void

  /**
   * Emitido quando o painel dropdown é fechado
   */
  (e: 'popup-hide'): void
}

/**
 * Slots do DssSelect
 */
export interface SelectSlots {
  /**
   * Label customizado
   */
  label?(): any

  /**
   * Customização de como a seleção atual é exibida no campo.
   * Recebe: { opt, index } — útil para renderizar DssChip governado.
   */
  'selected-item'?(props: { opt: any; index: number }): any

  /**
   * Customização de como cada opção é exibida no dropdown.
   * Recebe: { opt, index, selected, focused }
   */
  option?(props: { opt: any; index: number; selected: boolean; focused: boolean }): any

  /**
   * Conteúdo antes do campo wrapper
   */
  before?(): any

  /**
   * Conteúdo dentro do campo, à esquerda
   */
  prepend?(): any

  /**
   * Conteúdo dentro do campo, à direita (além da seta dropdown)
   */
  append?(): any

  /**
   * Conteúdo depois do campo wrapper
   */
  after?(): any

  /**
   * Mensagem de erro customizada
   */
  error?(): any

  /**
   * Texto de ajuda customizado
   */
  hint?(): any
}

/**
 * Referências expostas pelo DssSelect
 */
export interface SelectExpose {
  /**
   * Foca no select
   */
  focus: () => void

  /**
   * Remove foco do select
   */
  blur: () => void

  /**
   * Abre o painel dropdown programaticamente
   */
  showPopup: () => void

  /**
   * Fecha o painel dropdown programaticamente
   */
  hidePopup: () => void

  /**
   * Referência ao elemento nativo do QSelect
   */
  nativeEl: HTMLElement | null
}
