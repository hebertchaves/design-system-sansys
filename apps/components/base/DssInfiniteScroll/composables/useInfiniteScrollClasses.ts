import { computed, type Ref } from 'vue'
import type { DssInfiniteScrollProps } from '../types/infinitescroll.types'

export function useInfiniteScrollClasses(
  props: DssInfiniteScrollProps,
  state: { isLoading: Ref<boolean>; noMore: Ref<boolean> },
) {
  const rootClasses = computed(() => [
    'dss-infinite-scroll',
    {
      'dss-infinite-scroll--disabled':  props.disable === true,
      'dss-infinite-scroll--loading':   state.isLoading.value,
      'dss-infinite-scroll--no-more':   state.noMore.value,
      'dss-infinite-scroll--reverse':   props.reverse === true,
    },
  ])

  return { rootClasses }
}
