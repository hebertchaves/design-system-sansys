import { computed, inject, provide, toRef, type Ref } from 'vue'
import type { DssDataTableContext, DssDataTableProps } from '../types/data-table.types'
import { DSS_DATA_TABLE_KEY } from '../types/data-table.types'

export function useDataTableClasses(props: Readonly<DssDataTableProps>) {
  const rootClasses = computed(() => [
    'dss-data-table',
    `dss-data-table--${props.mode ?? 'local'}`,
    props.loading && 'dss-data-table--loading',
    props.error && 'dss-data-table--error',
    props.disabled && 'dss-data-table--disabled',
  ].filter(Boolean))
  return { rootClasses }
}

export function provideDataTableContext(props: Readonly<DssDataTableProps>) {
  const context: DssDataTableContext = {
    disabled: toRef(props, 'disabled') as Ref<boolean>,
    loading: toRef(props, 'loading') as Ref<boolean>,
  }
  provide(DSS_DATA_TABLE_KEY, context)
  return context
}

export function useDataTableContext() {
  return inject(DSS_DATA_TABLE_KEY)
}
