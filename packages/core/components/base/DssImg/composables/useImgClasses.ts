import { computed } from 'vue'
import type { DssImgProps } from '../types/img.types'

export function useImgClasses(props: DssImgProps) {
  const rootClasses = computed(() => [
    'dss-img',
    {
      [`dss-img--radius-${props.radius}`]: props.radius && props.radius !== 'none',
    },
  ])

  return { rootClasses }
}
