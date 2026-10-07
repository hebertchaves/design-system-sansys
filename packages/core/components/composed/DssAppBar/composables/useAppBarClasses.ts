import { computed } from 'vue'
import type { AppBarProps } from '../types/app-bar.types'

export function useAppBarClasses(props: Readonly<AppBarProps>) {
  const appBarClasses = computed(() => ({
    'dss-app-bar': true,
    [`dss-app-bar--${props.density ?? 'compact'}`]: true,
  }))

  return { appBarClasses }
}
