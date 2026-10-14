import type { InjectionKey, Ref } from 'vue'
import type { DssTableColumn, DssTableDensity, DssTablePagination, DssTableSelection } from '../../DssTable/types/table.types'
import type { ButtonColor } from '../../../base/DssButton/types/button.types'

export type DssDataTableMode = 'local' | 'remote'
export type DssDataTableBrand = 'hub' | 'water' | 'waste'
export type DssDataTableRow = Record<string, unknown>

export interface DssDataTableAction {
  name: string
  label: string
  icon?: string
  color?: ButtonColor
  requiresSelection?: boolean
  multiple?: boolean
  disabled?: boolean
}

export interface DssDataTableProps {
  rows: DssDataTableRow[]
  columns: DssTableColumn[]
  rowKey?: string
  title?: string
  ariaLabel?: string
  mode?: DssDataTableMode
  selection?: DssTableSelection
  modelValue?: DssDataTableRow[]
  filter?: string
  pagination?: DssTablePagination
  loading?: boolean
  error?: string | null
  density?: DssTableDensity
  rowsPerPageOptions?: number[]
  actions?: DssDataTableAction[]
  rowActions?: DssDataTableAction[]
  expandable?: boolean
  expandedKeys?: Array<string | number>
  disabled?: boolean
  brand?: DssDataTableBrand | null
  noDataLabel?: string
  noResultsLabel?: string
}

export interface DssDataTableRequest {
  pagination: DssTablePagination
  filter?: string
  getCellValue?: (col: DssTableColumn, row: DssDataTableRow) => unknown
}

export interface DssDataTableActionPayload {
  action: DssDataTableAction
  rows: DssDataTableRow[]
  row?: DssDataTableRow
}

export interface DssDataTableEmits {
  (e: 'update:modelValue', value: DssDataTableRow[]): void
  (e: 'update:filter', value: string): void
  (e: 'update:pagination', value: DssTablePagination): void
  (e: 'update:expandedKeys', value: Array<string | number>): void
  (e: 'request', value: DssDataTableRequest): void
  (e: 'action', value: DssDataTableActionPayload): void
  (e: 'expand-request', value: { row: DssDataTableRow; key: string | number; expanded: boolean }): void
  (e: 'row-click', evt: Event, row: DssDataTableRow, index: number): void
}

export interface DssDataTableSlots {
  'top-left'?: (props: { selected: DssDataTableRow[] }) => unknown
  'top-right'?: (props: { filter: string }) => unknown
  'row-actions'?: (props: { row: DssDataTableRow; disabled: boolean }) => unknown
  'expanded-row'?: (props: { row: DssDataTableRow; key: string | number }) => unknown
  'no-data'?: (props: { filtered: boolean }) => unknown
}

export interface DssDataTableContext {
  disabled: Ref<boolean>
  loading: Ref<boolean>
}

export const DSS_DATA_TABLE_KEY = Symbol('dss-data-table') as InjectionKey<DssDataTableContext>
