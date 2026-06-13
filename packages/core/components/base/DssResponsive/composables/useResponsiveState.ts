import { computed } from 'vue'
import { useQuasar } from 'quasar'
import type { DssBreakpoint } from '../types/responsive.types'

/**
 * Exposes reactive Quasar screen breakpoint state as DSS-normalized helpers.
 * Can be used standalone in consumer components that need breakpoint awareness
 * without rendering a DssResponsive wrapper.
 */
export function useResponsiveState() {
  const $q = useQuasar()

  const currentBreakpoint = computed<DssBreakpoint>(() => {
    if ($q.screen.xs) return 'xs'
    if ($q.screen.sm) return 'sm'
    if ($q.screen.md) return 'md'
    if ($q.screen.lg) return 'lg'
    return 'xl'
  })

  const isXs = computed(() => currentBreakpoint.value === 'xs')
  const isSm = computed(() => currentBreakpoint.value === 'sm')
  const isMd = computed(() => currentBreakpoint.value === 'md')
  const isLg = computed(() => currentBreakpoint.value === 'lg')
  const isXl = computed(() => currentBreakpoint.value === 'xl')
  const isMobile = computed(() => isXs.value || isSm.value)
  const isDesktop = computed(() => isMd.value || isLg.value || isXl.value)

  return {
    currentBreakpoint,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isDesktop,
  }
}
