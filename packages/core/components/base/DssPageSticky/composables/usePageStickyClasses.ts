// ==========================================================================
// DssPageSticky — usePageStickyClasses
// ==========================================================================

import { computed } from 'vue'
import type { PageStickyProps } from '../types/pagesticky.types'

export function usePageStickyClasses(props: Readonly<PageStickyProps>) {
  const stickyClasses = computed(() => [
    'dss-page-sticky',
    {
      'dss-page-sticky--elevated': props.elevated
    }
  ])

  return { stickyClasses }
}
