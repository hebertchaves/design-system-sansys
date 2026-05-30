import { computed } from 'vue'
import type { DssTimelineEntryProps } from '../types/timeline-entry.types'

export function useTimelineEntryClasses(props: DssTimelineEntryProps) {
  const rootClasses = computed(() => ({
    'dss-timeline-entry--heading': props.heading,
    'dss-timeline-entry--side-left': props.side === 'left',
    'dss-timeline-entry--side-right': props.side === 'right',
    'dss-timeline-entry--has-icon': !!props.icon,
    'dss-timeline-entry--has-avatar': !!props.avatar,
  }))

  return { rootClasses }
}
