import { computed } from 'vue'
import type { RatingProps } from '../types/rating.types'

export function useRatingClasses(props: RatingProps) {
  const rootClasses = computed(() => [
    'dss-rating',
    { [`dss-rating--brand-${props.brand}`]: !!props.brand },
  ])

  return { rootClasses }
}
