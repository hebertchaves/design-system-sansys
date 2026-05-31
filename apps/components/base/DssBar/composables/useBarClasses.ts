import { computed } from 'vue'
import type { DssBarProps } from '../types/bar.types'

export function useBarClasses(props: DssBarProps) {
  const rootClasses = computed(() => ({
    'dss-bar--elevated': props.elevated,
  }))

  return { rootClasses }
}
