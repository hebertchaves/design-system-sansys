/**
 * ==========================================================================
 * useContainerClasses — classes do DssContainer
 * ==========================================================================
 *
 * O componente emite SÓ as classes que o SCSS consome. Regra de estado em
 * classe não emitida é código morto — o DssButton carregou regras de dark para
 * `.dss-button--primary` que o composable nunca emitiu (checklist §M6).
 */
import { computed, type ComputedRef } from 'vue'
import type { ContainerProps } from '../types/container.types'

export function useContainerClasses(props: ContainerProps): {
  containerClasses: ComputedRef<(string | Record<string, boolean>)[]>
} {
  const containerClasses = computed(() => [
    'dss-container',
    `dss-container--size-${props.size ?? 'lg'}`,
    `dss-container--padding-${props.padding ?? 'md'}`,
    `dss-container--gap-${props.gap ?? 'none'}`,
    {
      'dss-container--centered': props.centered !== false,
      [`dss-container--brand-${props.brand}`]: !!props.brand,
    },
  ])

  return { containerClasses }
}
