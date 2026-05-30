/**
 * ==========================================================================
 * useSelectActions Composable
 * ==========================================================================
 *
 * Composable para event handlers e métodos expostos do DssSelect.
 * Gerencia interações e delega operações ao QSelect subjacente.
 *
 * @example
 * ```ts
 * const { handleFocus, handleBlur, focus, blur, showPopup, hidePopup, getNativeEl } =
 *   useSelectActions(emit, qSelectRef, isFocused)
 * ```
 */

import type { Ref } from 'vue'
import type { SelectEmits } from '../types/select.types'

/**
 * Composable para ações do select
 */
export function useSelectActions(
  emit: (event: keyof SelectEmits, ...args: any[]) => void,
  qSelectRef: Ref<any | null>,
  isFocused: Ref<boolean>
) {
  /**
   * Handler de foco — atualiza estado e emite evento
   */
  function handleFocus(event: FocusEvent): void {
    isFocused.value = true
    emit('focus', event)
  }

  /**
   * Handler de blur — atualiza estado e emite evento
   */
  function handleBlur(event: FocusEvent): void {
    isFocused.value = false
    emit('blur', event)
  }

  /**
   * Foca programaticamente no select.
   * Delega para o método focus() do QSelect.
   */
  function focus(): void {
    qSelectRef.value?.focus()
  }

  /**
   * Remove o foco do select.
   * Delega para o método blur() do QSelect.
   */
  function blur(): void {
    qSelectRef.value?.blur()
  }

  /**
   * Abre o painel dropdown programaticamente.
   * Delega para showPopup() do QSelect.
   */
  function showPopup(): void {
    qSelectRef.value?.showPopup()
  }

  /**
   * Fecha o painel dropdown programaticamente.
   * Delega para hidePopup() do QSelect.
   */
  function hidePopup(): void {
    qSelectRef.value?.hidePopup()
  }

  /**
   * Retorna referência ao elemento nativo do QSelect.
   * Delega para getNativeElement() do QSelect.
   */
  function getNativeEl(): HTMLElement | null {
    return (qSelectRef.value?.getNativeElement?.() as HTMLElement) ?? null
  }

  return { handleFocus, handleBlur, focus, blur, showPopup, hidePopup, getNativeEl }
}
