import { computed } from 'vue'
import type { ExpansionItemProps } from '../types/expansionitem.types'

export function useExpansionItemClasses(props: ExpansionItemProps) {
  const expansionItemClasses = computed(() =>
    [
      'dss-expansion-item',
      props.dense && 'dss-expansion-item--dense',
      props.disable && 'dss-expansion-item--disabled',
    ].filter(Boolean)
  )

  return { expansionItemClasses }
}
