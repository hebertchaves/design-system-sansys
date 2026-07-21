/**
 * ==========================================================================
 * useFileClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssFile
 * Gerencia classes de variante, estado e modificadores
 *
 * @example
 * ```ts
 * const { wrapperClasses, labelClasses } = useFileClasses(props, state)
 * ```
 */

import { computed, type Ref } from 'vue'
import type { FileProps } from '../types/file.types'

interface UseFileClassesOptions {
  isFocused: Ref<boolean>
  hasValue: Ref<boolean>
  isDragging: Ref<boolean>
}

/**
 * Composable para classes CSS do campo de arquivo
 */
export function useFileClasses(
  props: Readonly<FileProps>,
  { isFocused, hasValue, isDragging }: UseFileClassesOptions
) {
  /**
   * Classes CSS computadas do wrapper principal
   *
   * Estrutura de classes:
   * - dss-file: classe base
   * - dss-file--{variant}: variante visual
   * - dss-file--focused: quando focado
   * - dss-file--error: estado de erro
   * - dss-file--disabled: desabilitado
   * - dss-file--readonly: somente leitura
   * - dss-file--dense: versão compacta
   * - dss-file--has-value: tem arquivo selecionado (NÃO `--filled`: colidia com a
   *   VARIANTE filled — um outlined/standout COM arquivo herdava o visual do filled)
   * - dss-file--dragging: drag ativo sobre o campo
   * - dss-file--brand-{brand}: marca Sansys
   */
  const wrapperClasses = computed(() => {
    return [
      'dss-file',
      `dss-file--${props.variant ?? 'outlined'}`,
      {
        'dss-file--focused': isFocused.value,
        'dss-file--error': props.error,
        'dss-file--disabled': props.disabled,
        'dss-file--readonly': props.readonly,
        'dss-file--dense': props.dense,
        'dss-file--has-value': hasValue.value,
        'dss-file--dragging': isDragging.value,
        // há label → reserva espaço p/ a label flutuante (evita overlap no float)
        'dss-file--labeled': !!props.label,
        [`dss-file--brand-${props.brand}`]: props.brand
      }
    ]
  })

  /**
   * Classes CSS computadas da label
   *
   * Estrutura de classes:
   * - dss-file__label: classe base
   * - dss-file__label--stack: label sempre no topo
   * - dss-file__label--float: label flutua quando focado/preenchido, e também em
   *   repouso quando há label (padrão B da família): o drop-hint — sempre presente
   *   no DssFile — ocupa o papel de placeholder e apareceria sobreposto ao label
   *   centralizado. Flutuando o label, o hint fica visível sem colisão.
   */
  const labelClasses = computed(() => {
    return [
      'dss-file__label',
      {
        'dss-file__label--stack': props.stackLabel,
        'dss-file__label--float': hasValue.value || isFocused.value || !!props.label
      }
    ]
  })

  return {
    wrapperClasses,
    labelClasses
  }
}
