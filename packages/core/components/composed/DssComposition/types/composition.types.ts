import type { InjectionKey, Ref } from 'vue'
import type { DssTableColumn, DssTableDensity } from '../../DssTable/types/table.types'

export type DssCompositionBrand = 'hub' | 'water' | 'waste'
export type DssCompositionRow = Record<string, unknown>
export type DssCompositionOperation = 'add' | 'edit' | 'remove' | 'toggle' | 'detail'
export type DssCompositionDialogMode = 'add' | 'edit' | 'detail'
export type DssCompositionChangeType = 'add' | 'edit' | 'remove' | 'activate' | 'inactivate'

export interface DssCompositionProps {
  /** Registros filhos (v-model). Nunca mutados: cada alteração emite um novo array. */
  modelValue: DssCompositionRow[]
  columns: DssTableColumn[]
  rowKey?: string
  title?: string
  ariaLabel?: string
  /** Exige ao menos um registro ativo quando validado. */
  required?: boolean
  requiredMessage?: string
  operations?: DssCompositionOperation[]
  /** Campo booleano que indica registro ativo (operação toggle). */
  activeField?: string
  /** Fábrica do rascunho de inclusão. */
  createDraft?: () => DssCompositionRow
  /** Retorna mensagem de erro ou null quando o rascunho é válido. */
  validateDraft?: (draft: DssCompositionRow, mode: DssCompositionDialogMode) => string | null
  disabled?: boolean
  loading?: boolean
  density?: DssTableDensity
  brand?: DssCompositionBrand | null
  noDataLabel?: string
}

export interface DssCompositionChange {
  type: DssCompositionChangeType
  row: DssCompositionRow
  index: number
}

export interface DssCompositionEmits {
  (e: 'update:modelValue', value: DssCompositionRow[]): void
  (e: 'change', value: DssCompositionChange): void
  (e: 'validate', valid: boolean): void
}

export interface DssCompositionSlots {
  form?: (props: { draft: DssCompositionRow; mode: DssCompositionDialogMode; error: string | null }) => unknown
  detail?: (props: { row: DssCompositionRow }) => unknown
  'top-right'?: () => unknown
}

export interface DssCompositionsItem {
  name: string
  label: string
  icon?: string
  required?: boolean
  count?: number
  invalid?: boolean
}

export interface DssCompositionsProps {
  items: DssCompositionsItem[]
  modelValue?: string
  ariaLabel?: string
  brand?: DssCompositionBrand | null
}

export interface DssCompositionContext {
  disabled: Ref<boolean>
}

export const DSS_COMPOSITION_KEY = Symbol('dss-composition') as InjectionKey<DssCompositionContext>
