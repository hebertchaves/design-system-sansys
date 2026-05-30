import { computed } from 'vue'
import type { DssTestPageComplexityProps } from '../types/testpagecomplexity.types'

export function useTestPageComplexityClasses(props: DssTestPageComplexityProps) {
  const rootClasses = computed(() => ({
    'dss-test-page-complexity--disabled': props.disabled,
    'dss-test-page-complexity--loading':  props.loading,
  }))

  return { rootClasses }
}
