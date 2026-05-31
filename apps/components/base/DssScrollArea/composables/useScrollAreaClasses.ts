import { computed } from 'vue'
import type { DssScrollAreaProps } from '../types/scrollarea.types'

export function useScrollAreaClasses(props: DssScrollAreaProps) {
  const rootClasses = computed(() => ({
    'dss-scroll-area--horizontal':      props.horizontal,
    'dss-scroll-area--always-visible':  props.visible === 'always',
    'dss-scroll-area--never-visible':   props.visible === 'never',
  }))

  return { rootClasses }
}
