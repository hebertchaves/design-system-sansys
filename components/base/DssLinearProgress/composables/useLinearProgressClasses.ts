import { computed } from 'vue'
import type { LinearProgressProps } from '../types/linearprogress.types'

export function useLinearProgressClasses(props: LinearProgressProps) {
  const rootClasses = computed(() => [
    'dss-linear-progress',
    `dss-linear-progress--size-${props.size ?? 'md'}`,
    `dss-linear-progress--color-${props.color ?? 'primary'}`,
    {
      [`dss-linear-progress--brand-${props.brand}`]: !!props.brand,
      'dss-linear-progress--indeterminate': props.indeterminate,
      'dss-linear-progress--stripe':        props.stripe,
      'dss-linear-progress--disabled':      props.disable,
    },
  ])

  return { rootClasses }
}
