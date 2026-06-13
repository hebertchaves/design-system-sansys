import { computed } from 'vue'
import type { DssSplitterProps } from '../types/splitter.types'

export function useSplitterClasses(props: DssSplitterProps) {
  const rootClasses = computed(() => ({
    'dss-splitter--vertical': props.orientation === 'vertical',
    'dss-splitter--disabled': props.disabled,
    'dss-splitter--reversed': props.reverse,
  }))
  return { rootClasses }
}
