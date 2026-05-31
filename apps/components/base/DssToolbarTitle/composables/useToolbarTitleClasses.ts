/**
 * ==========================================================================
 * DssToolbarTitle — Composable de Classes
 * ==========================================================================
 */

import { computed } from 'vue'
import type { ToolbarTitleProps } from '../types/toolbar-title.types'

export function useToolbarTitleClasses(props: ToolbarTitleProps) {
  const toolbarTitleClasses = computed(() => ({
    'dss-toolbar-title': true,
    'dss-toolbar-title--shrink': !!props.shrink
  }))

  return { toolbarTitleClasses }
}
