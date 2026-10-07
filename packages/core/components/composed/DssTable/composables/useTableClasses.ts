import { computed } from 'vue'
import type { DssTableProps } from '../types/table.types'

export function useTableClasses(props: Readonly<DssTableProps>) {
  const tableClasses = computed(() => [
    'dss-table',
    props.density === 'compact' && 'dss-table--compact',
    props.density === 'comfortable' && 'dss-table--comfortable',
    props.loading && 'dss-table--loading',
    // Marca quem REALMENTE precisa de rolagem interna. O CSS usa isto para
    // desligar o `overflow` do corpo nos demais casos — ver 2-composition.
    props.virtualScroll && 'dss-table--virtual-scroll'
  ].filter(Boolean))

  return { tableClasses }
}
