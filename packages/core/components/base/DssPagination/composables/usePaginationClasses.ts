import { computed } from 'vue'
import type { DssPaginationProps } from '../types/pagination.types'

export function usePaginationClasses(props: DssPaginationProps) {
  const rootClasses = computed(() => ({
    'dss-pagination': true,
    [`dss-pagination--${props.size ?? 'md'}`]: true,
    'dss-pagination--flat': props.flat,
    'dss-pagination--outline': props.outline,
    'dss-pagination--round': props.round,
    'dss-pagination--disabled': props.disable,
    'dss-pagination--readonly': props.readonly,
  }))

  return { rootClasses }
}
