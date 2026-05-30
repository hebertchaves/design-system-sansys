// ==========================================================================
// DssHeader — useHeaderClasses
// ==========================================================================

import { computed } from 'vue'
import type { HeaderProps } from '../types/header.types'

export function useHeaderClasses(props: Readonly<HeaderProps>) {
  const headerClasses = computed(() => [
    'dss-header',
    {
      'dss-header--elevated': props.elevated,
      'dss-header--bordered': props.bordered
    }
  ])

  return { headerClasses }
}
