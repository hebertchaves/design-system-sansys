/**
 * ==========================================================================
 * useSelectClasses Composable
 * ==========================================================================
 *
 * Composable para classes CSS dinâmicas do DssSelect.
 * Gera o array de classes aplicado ao QSelect root via :class.
 *
 * @example
 * ```ts
 * const { wrapperClasses } = useSelectClasses(props, { isFocused, hasValue })
 * ```
 */

import { computed } from 'vue'
import type { Ref } from 'vue'
import type { SelectProps } from '../types/select.types'

interface SelectStateRefs {
  isFocused: Ref<boolean>
}

/**
 * Composable para classes CSS dinâmicas do select
 */
export function useSelectClasses(props: SelectProps, state: SelectStateRefs) {
  /**
   * Classes do wrapper raiz (aplicadas ao QSelect via :class).
   *
   * .dss-select              — hook principal para todos os estilos DSS
   * .dss-select--{variant}   — variante visual ativa
   * .dss-select--focused     — estado de foco (nosso controle)
   * .dss-select--error       — estado de erro
   * .dss-select--disabled    — estado desabilitado
   * .dss-select--readonly    — estado somente leitura
   * .dss-select--dense       — modo compacto
   * .dss-select--loading     — estado carregando
   * .dss-select--multiple    — modo seleção múltipla
   * .dss-select--brand-{x}   — marca ativa (hub, water, waste)
   */
  const wrapperClasses = computed(() => [
    'dss-select',
    `dss-select--${props.variant ?? 'outlined'}`,
    {
      'dss-select--focused': state.isFocused.value,
      'dss-select--error': props.error,
      'dss-select--disabled': props.disabled,
      'dss-select--readonly': props.readonly,
      'dss-select--dense': props.dense,
      'dss-select--loading': props.loading,
      'dss-select--multiple': props.multiple,
      ...(props.brand ? { [`dss-select--brand-${props.brand}`]: true } : {})
    }
  ])

  return { wrapperClasses }
}
