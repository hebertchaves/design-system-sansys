import { computed } from 'vue'
import type { DssCarouselProps } from '../types/carousel.types'

export function useCarouselClasses(props: DssCarouselProps) {
  const rootClasses = computed(() => ({
    'dss-carousel--arrows': props.arrows,
    'dss-carousel--navigation': props.navigation,
    'dss-carousel--thumbnails': props.thumbnails,
    'dss-carousel--padding': props.padding,
    'dss-carousel--vertical': props.vertical,
    'dss-carousel--infinite': props.infinite,
    'dss-carousel--autoplay': !!props.autoplay,
    [`dss-carousel--navigation-${props.navigationPosition ?? 'bottom'}`]: props.navigation,
  }))

  return { rootClasses }
}
