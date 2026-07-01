/**
 * ==========================================================================
 * useTextareaActions Composable
 * ==========================================================================
 *
 * Composable para event handlers e métodos expostos do DssTextarea.
 * Gerencia interações e delega operações ao QInput subjacente.
 *
 * @example
 * ```ts
 * const { handleFocus, handleBlur, focus, blur, getNativeEl } =
 *   useTextareaActions(emit, qInputRef, isFocused)
 * ```
 */

import type { Ref } from 'vue'
import type { TextareaEmits } from '../types/textarea.types'

/**
 * Composable para ações do textarea
 */
export function useTextareaActions(
  emit: TextareaEmits,
  qInputRef: Ref<any | null>,
  isFocused: Ref<boolean>
) {
  /**
   * Handler de foco — atualiza estado e emite evento
   */
  function handleFocus(event: Event): void {
    isFocused.value = true
    emit('focus', event as FocusEvent)
  }

  /**
   * Handler de blur — atualiza estado e emite evento
   */
  function handleBlur(event: Event): void {
    isFocused.value = false
    emit('blur', event as FocusEvent)
  }

  /**
   * Foca programaticamente no textarea.
   * Delega para o método focus() do QInput.
   */
  function focus(): void {
    qInputRef.value?.focus()
  }

  /**
   * Remove o foco do textarea.
   * Delega para o método blur() do QInput.
   */
  function blur(): void {
    qInputRef.value?.blur()
  }

  /**
   * Retorna a referência ao elemento textarea nativo.
   * QInput expõe getNativeElement() para acesso ao DOM.
   */
  function getNativeEl(): HTMLTextAreaElement | null {
    return (qInputRef.value?.getNativeElement?.() as HTMLTextAreaElement) ?? null
  }

  return { handleFocus, handleBlur, focus, blur, getNativeEl }
}
