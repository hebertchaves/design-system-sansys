import { computed } from 'vue'
import type { DssTimelineProps } from '../types/timeline.types'

export function useTimelineClasses(props: DssTimelineProps) {
  const rootClasses = computed(() => ({
    'dss-timeline--dense': props.layout === 'dense',
    'dss-timeline--comfortable': props.layout === 'comfortable' || !props.layout,
    'dss-timeline--loose': props.layout === 'loose',
    'dss-timeline--side-left': props.side === 'left',
    'dss-timeline--side-right': props.side === 'right',
  }))

  return { rootClasses }
}
