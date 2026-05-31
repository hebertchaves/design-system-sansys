import { computed } from 'vue'
import type { CircularProgressProps } from '../types/circularprogress.types'

export function useCircularProgressClasses(props: CircularProgressProps) {
  const rootClasses = computed(() => [
    'dss-circular-progress',
    `dss-circular-progress--size-${props.size ?? 'md'}`,
    `dss-circular-progress--color-${props.color ?? 'primary'}`,
    {
      [`dss-circular-progress--brand-${props.brand}`]: !!props.brand,
      'dss-circular-progress--indeterminate': props.indeterminate,
      'dss-circular-progress--disabled':      props.disable,
    },
  ])

  return { rootClasses }
}
