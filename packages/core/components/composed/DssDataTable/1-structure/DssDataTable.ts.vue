<template>
  <section
    :class="rootClasses"
    :data-brand="brand || undefined"
    :aria-label="ariaLabel || title"
    :aria-busy="loading ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    v-bind="$attrs"
  >
    <DssBanner v-if="error" class="dss-data-table__error" variant="error" icon="error_outline" rounded>
      {{ error }}
      <template #actions>
        <DssButton label="Tentar novamente" variant="outline" size="sm" :disabled="disabled" @click="requestCurrentPage" />
      </template>
    </DssBanner>

    <DssTable
      ref="tableRef"
      :rows="error ? [] : rows"
      :columns="effectiveColumns"
      :row-key="rowKey"
      :title="title"
      :loading="loading"
      :filter="mode === 'local' ? internalFilter : undefined"
      :selection="hasCustomBody ? 'none' : selection"
      :model-value="modelValue"
      :pagination="pagination"
      :density="density"
      :rows-per-page-options="rowsPerPageOptions"
      :no-data-label="noDataLabel"
      :no-results-label="noResultsLabel"
      flat
      @update:model-value="emit('update:modelValue', $event)"
      @update:pagination="emit('update:pagination', $event)"
      @request="handleRequest"
      @row-click="handleRowClick"
    >
      <template #top>
        <div class="dss-data-table__toolbar">
          <div class="dss-data-table__toolbar-start">
            <slot name="top-left" :selected="modelValue">
              <div v-if="visibleActions.length" class="dss-data-table__actions" role="toolbar" aria-label="Ações da tabela">
                <DssButton
                  v-for="action in visibleActions"
                  :key="action.name"
                  :label="action.label"
                  :icon="action.icon"
                  :color="action.color || 'primary'"
                  variant="flat"
                  size="sm"
                  :disabled="isActionDisabled(action)"
                  @click="emitAction(action)"
                />
              </div>
            </slot>
          </div>
          <div class="dss-data-table__toolbar-end">
            <slot name="top-right" :filter="internalFilter">
              <DssInput
                :model-value="internalFilter"
                class="dss-data-table__filter"
                label="Filtrar"
                clearable
                dense
                :disabled="disabled"
                @update:model-value="updateFilter"
              />
            </slot>
          </div>
        </div>
      </template>

      <template v-if="hasCustomBody" #body="scope">
        <tr :class="{ selected: isSelected(scope.row) }">
          <td v-if="selection !== 'none'" class="dss-data-table__select-cell">
            <DssCheckbox
              :model-value="isSelected(scope.row)"
              :aria-label="`Selecionar linha ${String(rowIdentifier(scope.row))}`"
              :disable="disabled || loading"
              @update:model-value="toggleSelection(scope.row)"
            />
          </td>
          <td v-if="expandable" class="dss-data-table__expand-cell">
            <DssButton
              variant="flat"
              size="sm"
              round
              :icon="isExpanded(scope.row) ? 'expand_less' : 'expand_more'"
              :aria-label="`${isExpanded(scope.row) ? 'Recolher' : 'Expandir'} linha ${String(rowIdentifier(scope.row))}`"
              :disabled="disabled || loading"
              @click="toggleExpanded(scope.row)"
            />
          </td>
          <td v-for="col in columns" :key="col.name" :class="alignmentClass(col.align)">
            {{ cellValue(col, scope.row) }}
          </td>
          <td v-if="rowActions.length || $slots['row-actions']" class="dss-data-table__actions-cell">
            <slot name="row-actions" :row="scope.row" :disabled="disabled || loading">
              <div class="dss-data-table__row-actions" role="group" :aria-label="`Ações da linha ${String(rowIdentifier(scope.row))}`">
                <DssButton
                  v-for="action in rowActions"
                  :key="action.name"
                  :icon="action.icon"
                  :label="action.label"
                  variant="flat"
                  size="sm"
                  :color="action.color || 'primary'"
                  :disabled="disabled || loading || action.disabled"
                  @click="emitAction(action, scope.row)"
                />
              </div>
            </slot>
          </td>
        </tr>
        <tr v-if="expandable && isExpanded(scope.row)" class="dss-data-table__expanded-row">
          <td :colspan="effectiveColumns.length + (selection !== 'none' ? 1 : 0)">
            <div class="dss-data-table__expanded-content">
              <slot name="expanded-row" :row="scope.row" :key="rowIdentifier(scope.row)" />
            </div>
          </td>
        </tr>
      </template>

      <template v-if="$slots['no-data']" #no-data>
        <slot name="no-data" :filtered="Boolean(internalFilter)" />
      </template>
      <template v-else-if="error" #no-data>
        <DssEmptyState class="dss-data-table__empty" icon="cloud_off" title="Não foi possível carregar os dados" :description="error" size="sm" />
      </template>
    </DssTable>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DssTable from '../../DssTable/DssTable.vue'
import DssInput from '../../../base/DssInput/DssInput.vue'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssCheckbox from '../../../base/DssCheckbox/DssCheckbox.vue'
import DssBanner from '../../../base/DssBanner/DssBanner.vue'
import DssEmptyState from '../../../base/DssEmptyState/DssEmptyState.vue'
import type { DssTableColumn, DssTablePagination } from '../../DssTable/types/table.types'
import type { DssDataTableAction, DssDataTableEmits, DssDataTableProps, DssDataTableRow, DssDataTableSlots } from '../types/data-table.types'
import { provideDataTableContext, useDataTableClasses } from '../composables'

defineOptions({ name: 'DssDataTable', inheritAttrs: false })

const props = withDefaults(defineProps<DssDataTableProps>(), {
  rowKey: 'id',
  title: '',
  ariaLabel: '',
  mode: 'local',
  selection: 'none',
  modelValue: () => [],
  filter: '',
  pagination: () => ({ page: 1, rowsPerPage: 10 }),
  loading: false,
  error: null,
  density: 'standard',
  rowsPerPageOptions: () => [10, 25, 50],
  actions: () => [],
  rowActions: () => [],
  expandable: false,
  expandedKeys: () => [],
  disabled: false,
  brand: null,
  noDataLabel: 'Nenhum dado disponível',
  noResultsLabel: 'Nenhum resultado encontrado para o filtro aplicado',
})
const emit = defineEmits<DssDataTableEmits>()
defineSlots<DssDataTableSlots>()
provideDataTableContext(props)
const { rootClasses } = useDataTableClasses(props)
const tableRef = ref<{ sort?: (col: string | { name: string }) => void } | null>(null)
const internalFilter = computed(() => props.filter)
const hasCustomBody = computed(() => props.expandable || props.rowActions.length > 0 || props.selection !== 'none')
const visibleActions = computed(() => props.actions)
const effectiveColumns = computed<DssTableColumn[]>(() => {
  const result = [...props.columns]
  if (props.expandable) result.unshift({ name: '__expand', label: '', field: props.rowKey, align: 'center' })
  if (hasCustomBody.value && props.selection !== 'none') result.unshift({ name: '__select', label: '', field: props.rowKey, align: 'center' })
  if (props.rowActions.length) result.push({ name: '__actions', label: 'Ações', field: props.rowKey, align: 'right' })
  return result
})

function rowIdentifier(row: DssDataTableRow): string | number {
  const value = row[props.rowKey]
  return typeof value === 'number' || typeof value === 'string' ? value : String(value ?? '')
}
function isSelected(row: DssDataTableRow) { return props.modelValue.some(item => rowIdentifier(item) === rowIdentifier(row)) }
function isExpanded(row: DssDataTableRow) { return props.expandedKeys.includes(rowIdentifier(row)) }
function toggleSelection(row: DssDataTableRow) {
  if (props.disabled || props.loading) return
  const selected = isSelected(row)
  const next = props.selection === 'single'
    ? (selected ? [] : [row])
    : (selected ? props.modelValue.filter(item => rowIdentifier(item) !== rowIdentifier(row)) : [...props.modelValue, row])
  emit('update:modelValue', next)
}
function toggleExpanded(row: DssDataTableRow) {
  if (props.disabled || props.loading) return
  const key = rowIdentifier(row)
  const expanded = !props.expandedKeys.includes(key)
  const next = expanded ? [...props.expandedKeys, key] : props.expandedKeys.filter(item => item !== key)
  emit('update:expandedKeys', next)
  emit('expand-request', { row, key, expanded })
}
function updateFilter(value: string | number | null) {
  const next = String(value ?? '')
  emit('update:filter', next)
  if (props.mode === 'remote') emit('request', { pagination: { ...props.pagination, page: 1 }, filter: next })
}
function handleRequest(value: { pagination: DssTablePagination; filter?: string; getCellValue?: (col: DssTableColumn, row: DssDataTableRow) => unknown }) {
  emit('request', { ...value, filter: props.filter })
}
function handleRowClick(evt: Event, row: DssDataTableRow, index: number) {
  emit('row-click', evt, row, index)
}
function requestCurrentPage() { emit('request', { pagination: props.pagination, filter: props.filter }) }
function isActionDisabled(action: DssDataTableAction) {
  if (props.disabled || props.loading || action.disabled) return true
  if (action.requiresSelection && props.modelValue.length === 0) return true
  if (!action.multiple && props.modelValue.length > 1) return true
  return false
}
function emitAction(action: DssDataTableAction, row?: DssDataTableRow) {
  if (isActionDisabled(action) && !row) return
  emit('action', { action, rows: row ? [row] : props.modelValue, row })
}
function cellValue(col: DssTableColumn, row: DssDataTableRow) {
  const raw = typeof col.field === 'function' ? col.field(row) : row[col.field]
  return col.format ? col.format(raw, row) : String(raw ?? '')
}
function alignmentClass(align?: 'left' | 'right' | 'center') { return `dss-data-table__cell--${align ?? 'left'}` }

defineExpose({ request: requestCurrentPage, clearSelection: () => emit('update:modelValue', []), sort: (col: string | { name: string }) => tableRef.value?.sort?.(col) })
</script>

<style lang="scss" scoped>
@use '../DssDataTable.module.scss';
</style>
