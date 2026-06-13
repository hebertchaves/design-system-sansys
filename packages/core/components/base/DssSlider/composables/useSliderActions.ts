/**
 * ==========================================================================
 * useSliderActions Composable
 * ==========================================================================
 *
 * Composable para métodos de controle programático do DssSlider.
 * Encapsula as referências ao QSlider e expõe focus/blur para defineExpose.
 *
 * @example
 * ```ts
 * const { focus, blur } = useSliderActions(qSliderRef)
 * ```
 */

import type { Ref } from 'vue'

/**
 * Composable para métodos de controle do slider
 *
 * @param qSliderRef - Referência reativa ao componente QSlider
 */
export function useSliderActions(qSliderRef: Ref<{ $el: Element } | null>) {
  /**
   * Foca o slider programaticamente.
   * Delega para o elemento nativo do QSlider via $el.
   */
  function focus() {
    const el = qSliderRef.value?.$el as HTMLElement | undefined
    el?.focus?.()
  }

  /**
   * Remove o foco do slider programaticamente.
   */
  function blur() {
    const el = qSliderRef.value?.$el as HTMLElement | undefined
    el?.blur?.()
  }

  return { focus, blur }
}
