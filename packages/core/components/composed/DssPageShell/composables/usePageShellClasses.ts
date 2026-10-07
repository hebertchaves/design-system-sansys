import { computed } from 'vue'
import type { PageShellProps, PageShellRailItemProps } from '../types/page-shell.types'

export function usePageShellClasses(props: Readonly<PageShellProps>) {
  const shellClasses = computed(() => ({
    'dss-page-shell': true,
    'dss-page-shell--board': props.board !== false,
  }))

  return { shellClasses }
}

export function useRailItemClasses(props: Readonly<PageShellRailItemProps>) {
  const railItemClasses = computed(() => ({
    'dss-page-shell__rail-item': true,
    'dss-page-shell__rail-item--active': Boolean(props.active),
  }))

  return { railItemClasses }
}
