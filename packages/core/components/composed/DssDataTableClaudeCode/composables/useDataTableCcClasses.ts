import { computed, inject, provide, toRef, type Ref } from 'vue'
import type { DssDataTableCcContext, DssDataTableCcProps } from '../types/data-table-claude-code.types'
import { DSS_DATA_TABLE_CC_KEY } from '../types/data-table-claude-code.types'

/**
 * Classes da raiz.
 *
 * Nenhum modificador de MARCA aqui: a marca chega pelo atributo `data-brand`
 * no nó raiz, que é o único mecanismo que remapeia os tokens da subárvore.
 * Classe `--brand-x` só pinta o que o `_brands.scss` listar à mão e sai de
 * sincronia em silêncio — é o defeito que o gate `validate:brand-form`
 * persegue (regra B3).
 */
export function useDataTableCcClasses(props: Readonly<DssDataTableCcProps>) {
  const rootClasses = computed(() => [
    'dss-data-table-cc',
    `dss-data-table-cc--${props.mode ?? 'local'}`,
    props.loading && 'dss-data-table-cc--loading',
    props.error && 'dss-data-table-cc--error',
    props.disabled && 'dss-data-table-cc--disabled',
  ].filter(Boolean))
  return { rootClasses }
}

export function provideDataTableCcContext(
  props: Readonly<DssDataTableCcProps>,
  selected: Ref<DssDataTableCcProps['modelValue']>,
) {
  const context: DssDataTableCcContext = {
    disabled: toRef(props, 'disabled') as Ref<boolean>,
    loading: toRef(props, 'loading') as Ref<boolean>,
    selected: selected as Ref<NonNullable<DssDataTableCcProps['modelValue']>>,
  }
  provide(DSS_DATA_TABLE_CC_KEY, context)
  return context
}

export function useDataTableCcContext() {
  return inject(DSS_DATA_TABLE_CC_KEY)
}
