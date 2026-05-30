/**
 * ==========================================================================
 * useSliderClasses Composable
 * ==========================================================================
 *
 * Composable para classes CSS dinâmicas do DssSlider.
 * Gera o array de classes aplicado ao wrapper externo via :class.
 *
 * @example
 * ```ts
 * const { wrapperClasses } = useSliderClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { Ref } from 'vue'
import type { SliderProps } from '../types/slider.types'

/**
 * Refs de estado reativos passadas externamente ao composable.
 */
interface SliderStateRefs {
  isFocused: Ref<boolean>
}

/**
 * Composable para classes CSS dinâmicas do slider
 */
export function useSliderClasses(props: SliderProps, state: SliderStateRefs) {
  /**
   * Classes do wrapper raiz (.dss-slider).
   *
   * .dss-slider              — hook principal para todos os estilos DSS
   * .dss-slider--focused     — slider (ou filho) está com foco
   * .dss-slider--error       — estado de erro
   * .dss-slider--disabled    — estado desabilitado
   * .dss-slider--readonly    — estado somente leitura
   * .dss-slider--dense       — modo compacto
   * .dss-slider--vertical    — orientação vertical
   * .dss-slider--brand-{x}   — marca ativa (hub, water, waste)
   */
  const wrapperClasses = computed(() => [
    'dss-slider',
    {
      'dss-slider--focused': state.isFocused.value,
      'dss-slider--error': props.error,
      'dss-slider--disabled': props.disabled,
      'dss-slider--readonly': props.readonly,
      'dss-slider--dense': props.dense,
      'dss-slider--vertical': props.vertical,
      ...(props.brand ? { [`dss-slider--brand-${props.brand}`]: true } : {})
    }
  ])

  return { wrapperClasses }
}
