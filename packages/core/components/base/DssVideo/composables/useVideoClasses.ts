import { computed } from 'vue'
import type { DssVideoProps } from '../types/video.types'

export function useVideoClasses(props: DssVideoProps) {
  const rootClasses = computed(() => [
    'dss-video',
    { [`dss-video--radius-${props.radius}`]: props.radius && props.radius !== 'none' },
  ])

  return { rootClasses }
}
