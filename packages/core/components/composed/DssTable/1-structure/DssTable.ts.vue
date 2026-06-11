<template>
  <q-table
    ref="qTableRef"
    v-bind="$attrs"
    :class="tableClasses"
    :rows="props.rows"
    :columns="props.columns"
    :row-key="props.rowKey"
    :title="props.title"
    :loading="props.loading"
    :filter="props.filter"
    :selection="props.selection !== 'none' ? props.selection : undefined"
    :selected="props.modelValue"
    :pagination="props.pagination"
    :dense="isDense"
    :bordered="props.bordered"
    :flat="props.flat"
    :wrap-cells="props.wrapCells"
    :separator="props.separator"
    :virtual-scroll="props.virtualScroll"
    :no-data-label="props.noDataLabel"
    :no-results-label="props.noResultsLabel"
    :hide-bottom="props.hideBottom"
    :hide-header="props.hideHeader"
    :rows-per-page-options="props.rowsPerPageOptions"
    @update:selected="emit('update:modelValue', $event)"
    @update:pagination="emit('update:pagination', $event)"
    @request="emit('request', $event)"
    @selection="emit('selection', $event)"
    @row-click="(evt, row, index) => emit('row-click', evt, row, index)"
    @row-dblclick="(evt, row, index) => emit('row-dblclick', evt, row, index)"
    @row-contextmenu="(evt, row, index) => emit('row-contextmenu', evt, row, index)"
  >
    <!--
      Forwarding DINÂMICO de todos os slots do QTable (padrão DssTree).

      Substitui a lista fixa anterior, que silenciosamente descartava os
      slots dinâmicos do contrato Quasar — body-cell-[name],
      header-cell-[name] e body-selection — quebrando o caminho documentado
      de ações por linha (NC-A9-01, bloqueante da Auditoria Final Jun/2026).
    -->
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </q-table>
</template>

<script lang="ts">
export default {
  name: 'DssTable',
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DssTableProps, DssTableEmits, DssTableSlots } from '../types/table.types'
import { useTableClasses } from '../composables'

// ============================================================================
// PROPS
// ============================================================================

const props = withDefaults(defineProps<DssTableProps>(), {
  rowKey: 'id',
  selection: 'none',
  density: 'standard',
  separator: 'horizontal',
  modelValue: () => [],
  rowsPerPageOptions: () => [10, 25, 50],
  noDataLabel: 'Nenhum dado disponível',
  noResultsLabel: 'Nenhum resultado encontrado para o filtro aplicado'
})

// ============================================================================
// EMITS + SLOTS
// ============================================================================

const emit = defineEmits<DssTableEmits>()
defineSlots<DssTableSlots>()

// ============================================================================
// COMPOSABLES
// ============================================================================

const { tableClasses } = useTableClasses(props)

// ============================================================================
// COMPUTED
// ============================================================================

/** Mapeia density='compact' para o prop dense=true do QTable */
const isDense = computed(() => props.density === 'compact')

// ============================================================================
// REF + EXPOSE
// ============================================================================

const qTableRef = ref()

// EXC-Expose-01: API imperativa delegada ao QTable interno
defineExpose({
  /** Dispara requisição server-side manualmente */
  requestServerInteraction: (reqProps?: Record<string, unknown>) =>
    qTableRef.value?.requestServerInteraction(reqProps),
  /** Reinicia o virtual-scroll para o início */
  resetVirtualScroll: () => qTableRef.value?.resetVirtualScroll(),
  /** Scrolla para o índice especificado (modo virtual-scroll) */
  scrollTo: (index: number, edge?: 'start' | 'center' | 'end' | 'start-force' | 'center-force' | 'end-force') =>
    qTableRef.value?.scrollTo(index, edge),
  /** Limpa toda a seleção atual */
  clearSelection: () => qTableRef.value?.clearSelection(),
  /** Ordena por uma coluna específica */
  sort: (col: string | { name: string }) => qTableRef.value?.sort(col)
})
</script>
