import { computed } from 'vue'
import type { DssTableProps } from '../types/table.types'

export function useTableClasses(props: Readonly<DssTableProps>) {
  const tableClasses = computed(() => [
    'dss-table',
    props.density === 'compact' && 'dss-table--compact',
    props.density === 'comfortable' && 'dss-table--comfortable',
    props.loading && 'dss-table--loading'
  ].filter(Boolean))

  return { tableClasses }
}
