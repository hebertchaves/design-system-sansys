/**
 * ==========================================================================
 * useSliderState Composable
 * ==========================================================================
 *
 * Composable para estado de foco do DssSlider.
 * Gerencia o estado `isFocused` que ativa a classe `dss-slider--focused`
 * no wrapper externo, permitindo que outros componentes DSS e testes
 * detectem quando o slider está com foco via hook CSS.
 *
 * Padrão idêntico a DssInput, DssSelect, DssTextarea.
 *
 * @example
 * ```ts
 * const { isFocused, handleFocusIn, handleFocusOut } = useSliderState()
 * // Template: @focusin="handleFocusIn" @focusout="handleFocusOut"
 * ```
 */

import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Composable para estado de foco do slider
 */
export function useSliderState() {
  /**
   * Indica se o slider (ou qualquer descendente) está com foco.
   * Usa focusin/focusout para capturar foco em elementos filhos (QSlider).
   */
  const isFocused: Ref<boolean> = ref(false)

  /**
   * Handler para evento focusin no wrapper.
   * Define isFocused = true quando o slider ou qualquer filho recebe foco.
   */
  function handleFocusIn(): void {
    isFocused.value = true
  }

  /**
   * Handler para evento focusout no wrapper.
   * Define isFocused = false quando o foco sai do slider e de todos os filhos.
   */
  function handleFocusOut(): void {
    isFocused.value = false
  }

  return { isFocused, handleFocusIn, handleFocusOut }
}
