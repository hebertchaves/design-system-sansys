<template>
  <q-tree
    ref="qTreeRef"
    v-bind="$attrs"
    :class="treeClasses"
    :nodes="props.nodes"
    :node-key="props.nodeKey"
    :label-key="props.labelKey"
    :children-key="props.childrenKey"
    :selected="props.selected"
    :expanded="props.expanded"
    :ticked="props.ticked"
    :accordion="props.accordion"
    :no-connectors="props.noConnectors"
    :default-expand-all="props.defaultExpandAll"
    :filter="props.filter"
    :filter-method="(props.filterMethod as QTreeProps['filterMethod'])"
    :tick-strategy="props.tickStrategy !== 'none' ? props.tickStrategy : undefined"
    :no-nodes-label="props.noNodesLabel"
    :no-results-label="props.noResultsLabel"
    :icon-size="props.iconSize"
    :dense="props.dense"
    @update:selected="emit('update:selected', $event)"
    @update:expanded="emit('update:expanded', $event as string[])"
    @update:ticked="emit('update:ticked', $event as string[])"
    @lazy-load="emit('lazy-load', $event)"
    @after-show="emit('after-show')"
    @after-hide="emit('after-hide')"
  >
    <!-- Forwarding dinâmico de todos os slots do QTree (header/body por nó) -->
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </q-tree>
</template>

<script lang="ts">
export default {
  name: 'DssTree',
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import type { QTreeProps } from 'quasar'
import type { DssTreeProps, DssTreeEmits } from '../types/tree.types'
import { useTreeClasses } from '../composables'

// ============================================================================
// PROPS
// ============================================================================

const props = withDefaults(defineProps<DssTreeProps>(), {
  nodeKey: 'id',
  labelKey: 'label',
  childrenKey: 'children',
  tickStrategy: 'none',
  noNodesLabel: 'Nenhum nó disponível',
  noResultsLabel: 'Nenhum resultado para o filtro aplicado'
})

// ============================================================================
// EMITS
// ============================================================================

const emit = defineEmits<DssTreeEmits>()

// ============================================================================
// COMPOSABLES
// ============================================================================

const { treeClasses } = useTreeClasses(props)

// ============================================================================
// REF + EXPOSE
// ============================================================================

const qTreeRef = ref()

// EXC-Expose-01: API imperativa delegada ao QTree interno
defineExpose({
  /** Retorna um nó pelo seu valor de chave */
  getNodeByKey: (key: string) => qTreeRef.value?.getNodeByKey(key),
  /** Retorna todos os nós atualmente marcados (ticked) */
  getTickedNodes: () => qTreeRef.value?.getTickedNodes(),
  /** Retorna todos os nós atualmente expandidos */
  getExpandedNodes: () => qTreeRef.value?.getExpandedNodes(),
  /** Verifica se um nó está expandido */
  isExpanded: (key: string) => qTreeRef.value?.isExpanded(key),
  /** Verifica se um nó está marcado */
  isTicked: (key: string) => qTreeRef.value?.isTicked(key),
  /** Expande todos os nós */
  expandAll: () => qTreeRef.value?.expandAll(),
  /** Colapsa todos os nós */
  collapseAll: () => qTreeRef.value?.collapseAll(),
  /** Define programaticamente o estado de expansão de um nó */
  setExpanded: (key: string, state: boolean) => qTreeRef.value?.setExpanded(key, state),
  /** Define programaticamente o estado de marcação de um nó */
  setTicked: (key: string, state: boolean) => qTreeRef.value?.setTicked(key, state)
})
</script>
