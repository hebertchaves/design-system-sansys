/**
 * ==========================================================================
 * useCheckboxClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssCheckbox
 *
 * ESTRATEGIA DE CORES:
 * - Sem brand: usa classes utilitarias Quasar (.bg-*, .text-*)
 * - Com brand: usa classe DSS (.dss-checkbox--{color}) para CSS de _brands.scss
 *
 * @example
 * ```ts
 * const { checkboxClasses, controlColorClasses } = useCheckboxClasses(
 *   props,
 *   { isChecked, isIndeterminate }
 * )
 * ```
 */

import { computed, type Ref } from 'vue'
import type { CheckboxProps } from '../types/checkbox.types'

interface UseCheckboxClassesOptions {
  /** Se o checkbox esta marcado */
  isChecked: Ref<boolean>
  /** Se o checkbox esta em estado indeterminate */
  isIndeterminate: Ref<boolean>
}

/**
 * Composable para classes CSS do checkbox
 */
export function useCheckboxClasses(
  props: Readonly<CheckboxProps>,
  options: UseCheckboxClassesOptions
) {
  /**
   * Classes CSS computadas do checkbox (aplicadas ao ROOT <label>)
   *
   * Logica de cores:
   * - SEM brand: classes utilitarias Quasar nao vao no root
   * - COM brand: classe DSS (dss-checkbox--{color}) para seletores em _brands.scss
   *
   * O CSS em _brands.scss usa seletores como:
   *   [data-brand='hub'] .dss-checkbox.dss-checkbox--primary
   */
  const checkboxClasses = computed(() => {
    const color = props.color || 'primary'

    // Classes de cor no root - apenas para brand matching
    let colorClass = ''
    if (props.brand) {
      colorClass = `dss-checkbox--${color}`
    }

    return [
      // Classe base
      'dss-checkbox',

      // Tamanho
      `dss-checkbox--${props.size || 'md'}`,

      // Classe de cor (apenas com brand)
      colorClass,

      // Classes condicionais
      {
        'dss-checkbox--checked': options.isChecked.value,
        'dss-checkbox--indeterminate': options.isIndeterminate.value,
        'dss-checkbox--disabled': props.disable,
        'dss-checkbox--dense': props.dense,
        'dss-checkbox--left-label': props.leftLabel,
        'dss-checkbox--keep-color': props.keepColor,
        'dss-checkbox--error': props.error,
      }
    ]
  })

  /**
   * Classes de cor para o indicador visual (.dss-checkbox__control)
   *
   * SEM brand:
   *   - checked/indeterminate: bg-{color} text-white (fundo preenchido)
   *   - keepColor + desmarcado: text-{color} (colore só o stroke via currentColor,
   *     sem preencher o fundo) — escape hatch de cor no repouso
   * COM brand: cores vem via _brands.scss (inclusive o keepColor), nao precisa
   *   de utility classes aqui
   */
  const controlColorClasses = computed(() => {
    if (props.brand) return ''

    // Erro tem prioridade sobre qualquer cor, marcado ou nao — inclusive sobre
    // keepColor: um campo invalido nao pode exibir a cor de acao no repouso.
    // Mesma regra do DssRadio/DssToggle (paridade da familia).
    if (props.error) return ''

    const color = props.color || 'primary'
    const isActive = options.isChecked.value || options.isIndeterminate.value

    if (isActive) return `bg-${color} text-white`
    if (props.keepColor) return `text-${color}`
    return ''
  })

  return {
    checkboxClasses,
    controlColorClasses
  }
}
