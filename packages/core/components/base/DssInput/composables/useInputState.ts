/**
 * ==========================================================================
 * useInputState Composable
 * ==========================================================================
 *
 * Composable para gerenciar estado interno do DssInput
 * Gerencia foco, valor, e visibilidade de slots
 *
 * @example
 * ```ts
 * const { isFocused, hasValue, hasBottomSlot } = useInputState(props, slots)
 * ```
 */

import { ref, computed, type ComputedRef, type Slots } from 'vue'
import type { InputProps } from '../types/input.types'

/**
 * Estado de validação vindo do `useFieldValidation` global.
 *
 * É opcional para o composable continuar utilizável isoladamente (testes), mas
 * o SFC SEMPRE passa: sem ele o rodapé consultaria apenas `props.error` e a
 * mensagem apurada por uma regra nunca abriria a área de erro.
 */
export interface InputValidationState {
  temErro: ComputedRef<boolean>
  mensagemDeErro: ComputedRef<string | undefined>
}

/**
 * Composable para estado do input
 */
export function useInputState(
  props: Readonly<InputProps>,
  slots: Slots,
  validacao?: InputValidationState
) {
  /**
   * Estado de foco do input
   */
  const isFocused = ref(false)

  /**
   * Verifica se o input tem valor
   *
   * Considera valor presente quando:
   * - Não é string vazia
   * - Não é null
   * - Não é undefined
   */
  const hasValue = computed(() => {
    return (
      props.modelValue !== '' &&
      props.modelValue !== null &&
      props.modelValue !== undefined
    )
  })

  /**
   * Verifica se deve exibir área inferior (hint/error)
   *
   * Exibe quando:
   * - Tem errorMessage e está em estado de erro
   * - Tem hint
   * - Tem slot error customizado
   * - Tem slot hint customizado
   */
  const hasBottomSlot = computed(() => {
    // O erro e a mensagem vêm do estado de validação quando ele existe: ali já
    // está resolvida a soma "prop error + erro de regra" e a precedência
    // "errorMessage da prop vence a mensagem da regra".
    const emErro = validacao ? validacao.temErro.value : props.error
    const mensagem = validacao ? validacao.mensagemDeErro.value : props.errorMessage

    return (
      // Área de erro (paridade Quasar getBottom): em erro, com mensagem OU slot.
      (emErro && (mensagem || !!slots.error)) ||
      props.hint ||
      !!slots.hint
    )
  })

  return {
    isFocused,
    hasValue,
    hasBottomSlot
  }
}
