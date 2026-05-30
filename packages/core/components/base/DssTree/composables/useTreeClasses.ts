import { computed } from 'vue'
import type { DssTreeProps } from '../types/tree.types'

export function useTreeClasses (props: Readonly<DssTreeProps>) {
  const treeClasses = computed(() => [
    'dss-tree',
    props.dense && 'dss-tree--dense'
  ].filter(Boolean))

  return { treeClasses }
}
