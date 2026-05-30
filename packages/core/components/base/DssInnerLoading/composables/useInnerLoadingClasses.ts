import { computed } from 'vue'
import type { InnerLoadingProps } from '../types/innerloading.types'

export function useInnerLoadingClasses(props: InnerLoadingProps) {
  const rootClasses = computed(() => [
    'dss-inner-loading',
    `dss-inner-loading--color-${props.color ?? 'primary'}`,
    `dss-inner-loading--size-${props.size ?? 'md'}`,
    {
      [`dss-inner-loading--brand-${props.brand}`]: !!props.brand,
      'dss-inner-loading--has-label': !!props.label,
    },
  ])

  return { rootClasses }
}
