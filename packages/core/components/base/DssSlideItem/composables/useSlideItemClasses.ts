import { computed } from 'vue'
import type { DssSlideItemProps } from '../types/slideitem.types'

export function useSlideItemClasses(props: DssSlideItemProps) {
  const rootClasses = computed(() => ({
    'dss-slide-item--disabled': props.disable,
  }))

  return { rootClasses }
}
