/**
 * ==========================================================================
 * DssInput TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssInput
 * Subset controlado da API do Quasar q-input, governado pelo DSS v2.2
 *
 * @see https://quasar.dev/vue-components/input
 * @version 2.3.0
 */

import type { Ref } from 'vue'
import type { DssFieldRule, DssLazyRules } from '../../../../composables/useFieldValidation'

// ==========================================================================
// TIPOS DE VALIDAÇÃO — declarados ESTRUTURALMENTE de propósito
// ==========================================================================
//
// O compilador de `<script setup>` deriva os props de RUNTIME do tipo passado a
// `defineProps<InputProps>()`. Ele resolve o tipo importado `InputProps`, mas
// NÃO resolveu os aliases importados de outro arquivo usados DENTRO dele:
// `rules` e `lazyRules` simplesmente sumiam da lista de props compilada —
// medido no módulo servido pelo Vite. O sintoma era mudo: o campo montava, o
// consumidor passava `:rules`, e o valor caía em `$attrs` como atributo de DOM.
//
// Por isso a forma abaixo é estrutural (sem alias): é o que o compilador
// consegue converter em `Array` e `[Boolean, String]`.
//
// A trava contra divergência vem logo em seguida — se estes tipos deixarem de
// casar com os canônicos do composable, o `validate:type-check` reprova.

/** Regra de validação do DssInput. Forma canônica: `DssFieldRule` do `useFieldValidation`. */
export type InputRule = (
  val: string | number | undefined,
) => boolean | string | void | Promise<boolean | string | void>

/** Momento em que as regras rodam sozinhas. Forma canônica: `DssLazyRules`. */
export type InputLazyRules = boolean | 'ondemand'

// Trava de paridade com os tipos canônicos do composable global. Não é
// documentação: é erro de compilação se um lado mudar sem o outro.
type _ParidadeRegra = InputRule extends DssFieldRule<string | number | undefined> ? true : never
type _ParidadeLazy = InputLazyRules extends DssLazyRules ? true : never
const _paridade: [_ParidadeRegra, _ParidadeLazy] = [true, true]
void _paridade

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do input
 */
export type InputVariant = 'filled' | 'outlined' | 'standout' | 'borderless'

/**
 * Tipos HTML de input suportados
 */
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'

/**
 * Marcas do sistema Sansys
 */
export type InputBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssInput
 *
 * @example
 * ```vue
 * <DssInput
 *   v-model="email"
 *   type="email"
 *   label="Email"
 *   hint="Enter your email address"
 *   clearable
 * />
 * ```
 */
export interface InputProps {
  // ========================================
  // Model
  // ========================================

  /**
   * Valor do input (v-model)
   */
  modelValue?: string | number

  // ========================================
  // Visual
  // ========================================

  /**
   * Variante visual do input
   * @default 'outlined'
   */
  variant?: InputVariant

  /**
   * Tipo HTML do input
   * @default 'text'
   */
  type?: InputType

  /**
   * Versão compacta (menor altura)
   * @default false
   */
  dense?: boolean

  /**
   * Marca Sansys (Hub, Water, Waste)
   * @default null
   */
  brand?: InputBrand | null

  // ========================================
  // Content
  // ========================================

  /**
   * Label do input (floating label)
   */
  label?: string

  /**
   * Label sempre visível no topo (não flutua)
   * @default false
   */
  stackLabel?: boolean

  /**
   * Placeholder do input
   */
  placeholder?: string

  /**
   * Texto de ajuda exibido abaixo do input
   */
  hint?: string

  /**
   * Mensagem de erro exibida abaixo do input
   */
  errorMessage?: string

  // ========================================
  // Validação
  // ========================================

  /**
   * Regras de validação do campo.
   *
   * Cada regra recebe o valor e devolve `true`/`undefined` (aprovado),
   * `false` (reprovado sem mensagem), uma `string` (reprovado, e a string é a
   * mensagem) ou uma `Promise` dessas (validação assíncrona).
   *
   * Declarar `rules` REGISTRA o campo no `DssForm` ancestral: a partir daí ele
   * entra no `validate()` e no `submit()` do formulário. Sem `rules`, o campo
   * continua fora — é o comportamento do QField e vale igual aqui.
   *
   * @example
   * ```vue
   * <DssInput v-model="email" :rules="[v => !!v || 'Obrigatório']" />
   * ```
   */
  rules?: InputRule[]

  /**
   * Quando as regras rodam sozinhas, sem ninguém chamar `validate()`.
   *
   * - `false` (padrão) — a cada mudança do valor, depois da primeira interação
   * - `true` — apenas ao perder o foco
   * - `'ondemand'` — nunca sozinhas; só via `validate()` do campo ou do form
   *
   * @default false
   */
  lazyRules?: InputLazyRules

  // ========================================
  // State
  // ========================================

  /**
   * Estado de erro imposto de FORA (muda cor para negativo).
   *
   * Soma-se ao erro apurado pelas `rules` — não o substitui: o campo fica em
   * erro se QUALQUER um dos dois for verdadeiro.
   * @default false
   */
  error?: boolean

  /**
   * Input desabilitado
   * @default false
   */
  disabled?: boolean

  /**
   * Input somente leitura
   * @default false
   */
  readonly?: boolean

  /**
   * Mostra indicador de loading (spinner)
   * @default false
   */
  loading?: boolean

  /**
   * Input obrigatório (adiciona aria-required)
   * @default false
   */
  required?: boolean

  // ========================================
  // Features
  // ========================================

  /**
   * Mostra botão de limpar (×) quando há valor
   * @default false
   */
  clearable?: boolean

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Label de acessibilidade customizado para screen readers
   * Sobrescreve o label visual quando fornecido
   *
   * @example
   * ```vue
   * <DssInput ariaLabel="Search products" type="search" />
   * ```
   */
  ariaLabel?: string

  /**
   * Label de acessibilidade para o botão de limpar
   * @default 'Clear input'
   */
  clearAriaLabel?: string

  /**
   * Tabindex customizado
   * Usa 0 por padrão.
   * @default null
   */
  tabindex?: number | string | null
}

/**
 * Eventos emitidos pelo DssInput
 */
export interface InputEmits {
  /**
   * Emitido quando o valor do input muda (v-model)
   */
  (e: 'update:modelValue', value: string): void

  /**
   * Emitido quando o input recebe foco
   */
  (e: 'focus', event: FocusEvent): void

  /**
   * Emitido quando o input perde foco
   */
  (e: 'blur', event: FocusEvent): void

  /**
   * Emitido quando o input é limpo via botão clear
   */
  (e: 'clear'): void
}

/**
 * Slots do DssInput
 */
export interface InputSlots {
  /**
   * Label customizado
   */
  label?(): any

  /**
   * Conteúdo antes do campo wrapper
   */
  before?(): any

  /**
   * Conteúdo dentro do campo, à esquerda
   */
  prepend?(): any

  /**
   * Conteúdo dentro do campo, à direita
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
 * Referências expostas pelo DssInput
 */
export interface InputExpose {
  /**
   * Foca no input
   */
  focus: () => void

  /**
   * Remove foco do input
   */
  blur: () => void

  /**
   * Referência direta ao elemento input nativo
   */
  inputRef: Ref<HTMLInputElement | null>

  /**
   * Roda as regras do campo. É o método que o `DssForm` chama.
   * @returns `true` se aprovado — ou a `Promise` do veredito, se alguma regra for assíncrona
   */
  validate: (val?: unknown) => boolean | Promise<boolean>

  /**
   * Limpa o estado de validação (o valor do campo NÃO é alterado).
   */
  resetValidation: () => void
}

// ==========================================================================
// TIPOS AUXILIARES
// ==========================================================================

/**
 * Estado interno do input (para composables)
 */
export interface InputState {
  /** Input está focado */
  isFocused: boolean
  /** Input tem valor */
  hasValue: boolean
  /** Deve mostrar área inferior (hint/error) */
  hasBottomSlot: boolean
}

/**
 * Classes CSS do wrapper principal
 */
export interface InputWrapperClasses {
  'dss-input': boolean
  'dss-input--focused': boolean
  'dss-input--error': boolean
  'dss-input--disabled': boolean
  'dss-input--readonly': boolean
  'dss-input--dense': boolean
  'dss-input--loading': boolean
  'dss-input--has-value': boolean
  [key: `dss-input--${string}`]: boolean
}

/**
 * Classes CSS da label
 */
export interface InputLabelClasses {
  'dss-input__label': boolean
  'dss-input__label--stack': boolean
  'dss-input__label--float': boolean
}

/**
 * IDs gerados para acessibilidade
 */
export interface InputAccessibilityIds {
  /** ID do input nativo */
  inputId: string
  /** ID da label */
  labelId: string
  /** ID do hint */
  hintId: string
  /** ID do error */
  errorId: string
}

/**
 * Dados computados do input (para composables)
 */
export interface InputComputedData {
  /** Classes CSS do wrapper */
  wrapperClasses: (string | Record<string, boolean>)[]
  /** Classes CSS da label */
  labelClasses: (string | Record<string, boolean>)[]
  /** Classes CSS do input nativo */
  inputClasses: string
  /** Placeholder computado */
  computedPlaceholder: string
  /** Tabindex computado */
  computedTabindex: number
  /** IDs para aria-describedby */
  ariaDescribedBy: string | undefined
}
