import { computed } from 'vue'
import type { DssPullToRefreshProps } from '../types/pulltorefresh.types'

export function usePullToRefreshClasses(props: DssPullToRefreshProps) {
  const rootClasses = computed(() => ({
    [`dss-pull-to-refresh--${props.size ?? 'md'}`]: true,
    'dss-pull-to-refresh--disabled': props.disabled,
  }))

  return { rootClasses }
}
