<template>
  <div
    :class="rootClasses"
    :data-brand="brand || undefined"
    :aria-invalid="invalid ? 'true' : undefined"
    v-bind="$attrs"
  >
    <DssDataTable
      :rows="modelValue"
      :columns="effectiveColumns"
      :row-key="rowKey"
      :title="title"
      :aria-label="ariaLabel || title"
      :loading="loading"
      :disabled="disabled"
      :density="density"
      :brand="brand"
      :no-data-label="noDataLabel"
      :row-actions="hasRowActions ? [{ name: '__row', label: '' }] : []"
    >
      <template #top-left>
        <DssButton
          v-if="can('add')"
          label="Adicionar"
          icon="add"
          variant="flat"
          size="sm"
          :disabled="disabled || loading"
          @click="openAdd"
        />
      </template>
      <template v-if="$slots['top-right']" #top-right>
        <slot name="top-right" />
      </template>
      <template #row-actions="{ row, disabled: rowDisabled }">
        <div class="dss-composition__row-actions" role="group" :aria-label="`Ações do registro ${String(row[rowKey])}`">
          <DssButton v-if="can('detail')" icon="visibility" variant="flat" size="sm" round
            :aria-label="`Detalhar registro ${String(row[rowKey])}`" :disabled="rowDisabled" @click="openDetail(row)" />
          <DssButton v-if="can('edit')" icon="edit" variant="flat" size="sm" round
            :aria-label="`Editar registro ${String(row[rowKey])}`" :disabled="rowDisabled || !isActive(row)" @click="openEdit(row)" />
          <DssButton v-if="can('toggle')" :icon="isActive(row) ? 'block' : 'check_circle'" variant="flat" size="sm" round
            :color="isActive(row) ? 'warning' : 'positive'"
            :aria-label="`${isActive(row) ? 'Inativar' : 'Ativar'} registro ${String(row[rowKey])}`" :disabled="rowDisabled"
            @click="askConfirm(isActive(row) ? 'inactivate' : 'activate', row)" />
          <DssButton v-if="can('remove')" icon="delete" variant="flat" size="sm" round color="negative"
            :aria-label="`Excluir registro ${String(row[rowKey])}`" :disabled="rowDisabled" @click="askConfirm('remove', row)" />
        </div>
      </template>
    </DssDataTable>

    <DssBanner v-if="invalid" class="dss-composition__message" variant="error" icon="error_outline" dense rounded role="alert">
      {{ requiredMessage }}
    </DssBanner>

    <DssDialog :open="dialogMode !== null" :aria-label="dialogTitle" :data-brand="brand || undefined" @update:open="v => { if (!v) closeDialog() }">
      <template #header>{{ dialogTitle }}</template>
      <div class="dss-composition__dialog-body">
        <DssBanner v-if="draftError" variant="error" icon="error_outline" dense rounded role="alert">{{ draftError }}</DssBanner>
        <slot v-if="dialogMode === 'detail' && detailRow" name="detail" :row="detailRow">
          <dl class="dss-composition__detail">
            <div v-for="col in columns" :key="col.name"><dt>{{ col.label }}</dt><dd>{{ cellValue(col, detailRow) }}</dd></div>
          </dl>
        </slot>
        <slot v-else-if="dialogMode" name="form" :draft="draft" :mode="dialogMode" :error="draftError" />
      </div>
      <template #footer>
        <DssButton :label="dialogMode === 'detail' ? 'Fechar' : 'Cancelar'" variant="flat" @click="closeDialog" />
        <DssButton v-if="dialogMode !== 'detail'" label="Salvar" icon="check" variant="unelevated" color="primary" @click="saveDraft" />
      </template>
    </DssDialog>

    <DssDialog :open="confirm !== null" :aria-label="confirmTitle" :data-brand="brand || undefined" @update:open="v => { if (!v) confirm = null }">
      <template #header>{{ confirmTitle }}</template>
      <p class="dss-composition__confirm">{{ confirmMessage }}</p>
      <template #footer>
        <DssButton label="Não" variant="flat" @click="confirm = null" />
        <DssButton label="Sim" variant="unelevated" :color="confirm?.type === 'remove' ? 'negative' : 'primary'" @click="applyConfirm" />
      </template>
    </DssDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DssDataTable from '../../DssDataTable/DssDataTable.vue'
import DssDialog from '../../DssDialog/DssDialog.vue'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssBanner from '../../../base/DssBanner/DssBanner.vue'
import type { DssTableColumn } from '../../DssTable/types/table.types'
import type {
  DssCompositionChangeType, DssCompositionDialogMode, DssCompositionEmits, DssCompositionOperation,
  DssCompositionProps, DssCompositionRow, DssCompositionSlots,
} from '../types/composition.types'
import { provideCompositionContext, useCompositionClasses } from '../composables'

defineOptions({ name: 'DssComposition', inheritAttrs: false })

const props = withDefaults(defineProps<DssCompositionProps>(), {
  rowKey: 'id',
  title: '',
  ariaLabel: '',
  required: false,
  requiredMessage: 'Adicione ao menos um registro ativo.',
  operations: () => ['add', 'edit', 'remove'],
  activeField: 'available',
  createDraft: undefined,
  validateDraft: undefined,
  disabled: false,
  loading: false,
  density: 'compact',
  brand: null,
  noDataLabel: 'Nenhum registro adicionado',
})
const emit = defineEmits<DssCompositionEmits>()
defineSlots<DssCompositionSlots>()
provideCompositionContext(props)

const pristine = ref(true)
const dialogMode = ref<DssCompositionDialogMode | null>(null)
const draft = ref<DssCompositionRow>({})
const draftError = ref<string | null>(null)
const editingKey = ref<unknown>(null)
const detailRow = ref<DssCompositionRow | null>(null)
const confirm = ref<{ type: 'remove' | 'activate' | 'inactivate'; row: DssCompositionRow } | null>(null)
let keySeed = 0

const isValid = computed(() => !props.required || props.modelValue.some(isActive))
const invalid = computed(() => !pristine.value && !isValid.value)
const { rootClasses } = useCompositionClasses(props, invalid)

const hasRowActions = computed(() => props.operations.some(op => op !== 'add'))
const effectiveColumns = computed<DssTableColumn[]>(() => props.operations.includes('toggle')
  ? [...props.columns, { name: '__active', label: 'Situação', field: (row: DssCompositionRow) => isActive(row) ? 'Ativo' : 'Inativo', align: 'left' }]
  : props.columns)
const dialogTitle = computed(() => ({ add: 'Adicionar registro', edit: 'Editar registro', detail: 'Detalhes do registro' })[dialogMode.value ?? 'add'])
const confirmTitle = computed(() => ({ remove: 'Excluir registro', activate: 'Ativar registro', inactivate: 'Inativar registro' })[confirm.value?.type ?? 'remove'])
const confirmMessage = computed(() => ({
  remove: 'Deseja excluir este registro da composição?',
  activate: 'Deseja ativar este registro?',
  inactivate: 'Deseja inativar este registro? Ele permanece na lista, mas deixa de contar como ativo.',
})[confirm.value?.type ?? 'remove'])

function can(op: DssCompositionOperation) { return props.operations.includes(op) }
function isActive(row: DssCompositionRow) { return row[props.activeField] !== false }
function keyOf(row: DssCompositionRow) { return row[props.rowKey] }
function indexOf(row: DssCompositionRow) { return props.modelValue.findIndex(item => keyOf(item) === keyOf(row)) }
function cellValue(col: DssTableColumn, row: DssCompositionRow) {
  const raw = typeof col.field === 'function' ? col.field(row) : row[col.field]
  return col.format ? col.format(raw, row) : String(raw ?? '')
}
function commit(next: DssCompositionRow[], type: DssCompositionChangeType, row: DssCompositionRow, index: number) {
  pristine.value = false
  emit('update:modelValue', next)
  emit('change', { type, row, index })
}

function openAdd() {
  if (props.disabled) return
  draft.value = { ...(props.createDraft ? props.createDraft() : {}) }
  editingKey.value = null
  draftError.value = null
  dialogMode.value = 'add'
}
function openEdit(row: DssCompositionRow) {
  draft.value = { ...row }
  editingKey.value = keyOf(row)
  draftError.value = null
  dialogMode.value = 'edit'
}
function openDetail(row: DssCompositionRow) {
  detailRow.value = row
  dialogMode.value = 'detail'
}
function closeDialog() {
  dialogMode.value = null
  detailRow.value = null
  draftError.value = null
}
function saveDraft() {
  const mode = dialogMode.value
  if (!mode || mode === 'detail') return
  const error = props.validateDraft ? props.validateDraft(draft.value, mode) : null
  if (error) { draftError.value = error; return }
  if (mode === 'add') {
    const row = { ...draft.value }
    if (row[props.rowKey] === undefined || row[props.rowKey] === null || row[props.rowKey] === '') row[props.rowKey] = `new-${Date.now()}-${++keySeed}`
    commit([...props.modelValue, row], 'add', row, props.modelValue.length)
  } else {
    const index = props.modelValue.findIndex(item => keyOf(item) === editingKey.value)
    if (index < 0) return closeDialog()
    const row = { ...props.modelValue[index], ...draft.value }
    commit(props.modelValue.map((item, i) => i === index ? row : item), 'edit', row, index)
  }
  closeDialog()
}
function askConfirm(type: 'remove' | 'activate' | 'inactivate', row: DssCompositionRow) { confirm.value = { type, row } }
function applyConfirm() {
  const current = confirm.value
  confirm.value = null
  if (!current) return
  const index = indexOf(current.row)
  if (index < 0) return
  if (current.type === 'remove') {
    commit(props.modelValue.filter((_, i) => i !== index), 'remove', current.row, index)
  } else {
    const row = { ...current.row, [props.activeField]: current.type === 'activate' }
    commit(props.modelValue.map((item, i) => i === index ? row : item), current.type, row, index)
  }
}

function validate() {
  pristine.value = false
  emit('validate', isValid.value)
  return isValid.value
}
function resetValidation() { pristine.value = true }

defineExpose({ validate, resetValidation, openAdd })
</script>

<style lang="scss" scoped>
@use '../DssComposition.module.scss';
</style>
