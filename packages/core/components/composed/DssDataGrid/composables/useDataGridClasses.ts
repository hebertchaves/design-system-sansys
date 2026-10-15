import { computed, inject, provide, toRef, type Ref } from 'vue'
import type { DssDataGridContext, DssDataGridProps } from '../types/data-grid.types'
import { DSS_DATA_GRID_KEY } from '../types/data-grid.types'

/**
 * Classes da raiz. A marca NÃO entra por classe — entra pelo atributo
 * `data-brand` no nó raiz, que é o único mecanismo que remapeia os tokens da
 * subárvore (regra B3 do `validate:brand-form`).
 */
export function useDataGridClasses(props: Readonly<DssDataGridProps>) {
  const rootClasses = computed(() => [
    'dss-data-grid',
    `dss-data-grid--cols-${props.columnsPerRow ?? 3}`,
    props.loading && 'dss-data-grid--loading',
    props.error && 'dss-data-grid--error',
    props.disabled && 'dss-data-grid--disabled',
  ].filter(Boolean))
  return { rootClasses }
}

export function provideDataGridContext(
  props: Readonly<DssDataGridProps>,
  selected: Ref<DssDataGridProps['modelValue']>,
) {
  const context: DssDataGridContext = {
    disabled: toRef(props, 'disabled') as Ref<boolean>,
    loading: toRef(props, 'loading') as Ref<boolean>,
    selected: selected as Ref<NonNullable<DssDataGridProps['modelValue']>>,
  }
  provide(DSS_DATA_GRID_KEY, context)
  return context
}

export function useDataGridContext() {
  return inject(DSS_DATA_GRID_KEY)
}
