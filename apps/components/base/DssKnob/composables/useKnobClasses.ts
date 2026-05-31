import { computed } from 'vue'
import type { KnobProps } from '../types/knob.types'

export function useKnobClasses(props: KnobProps) {
  const rootClasses = computed(() => [
    'dss-knob',
    {
      [`dss-knob--brand-${props.brand}`]: !!props.brand,
    },
  ])

  return { rootClasses }
}
