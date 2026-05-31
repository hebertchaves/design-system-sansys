import { computed } from 'vue'
import type { AjaxBarProps } from '../types/ajaxbar.types'

export function useAjaxBarClasses(props: AjaxBarProps) {
  const rootClasses = computed(() => [
    'dss-ajax-bar',
    `dss-ajax-bar--pos-${props.position ?? 'top'}`,
    {
      [`dss-ajax-bar--brand-${props.brand}`]: !!props.brand,
    },
  ])

  return { rootClasses }
}
