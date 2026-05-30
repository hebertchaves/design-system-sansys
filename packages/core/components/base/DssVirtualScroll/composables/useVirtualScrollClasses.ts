import { computed } from 'vue'
import type { DssVirtualScrollProps } from '../types/virtualscroll.types'

export function useVirtualScrollClasses(props: DssVirtualScrollProps) {
  const rootClasses = computed(() => ({
    'dss-virtual-scroll': true,
    'dss-virtual-scroll--horizontal': props.horizontal === true,
    'dss-virtual-scroll--loading': props.loading === true,
    'dss-virtual-scroll--disabled': props.disable === true,
    'dss-virtual-scroll--table': props.type === 'table',
  }))

  return { rootClasses }
}
