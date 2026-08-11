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
   * Logica de cores: a classe `dss-checkbox--{color}` vai SEMPRE no root, e todo
   * o pintado vem do SCSS do DSS (2-composition/_base.scss) via tokens
   * `--dss-action-*`/`--dss-feedback-*`.
   *
   * Antes ela so era emitida COM a prop `brand`, e sem brand o fill vinha das
   * utilities do Quasar (`bg-{color}`). Isso quebrava sob brand GLOBAL
   * (`[data-brand]` num ancestral, sem prop): as utilities nao sao brand-aware,
   * entao o fundo ficava azul fixo enquanto a regra global `[data-brand]
   * .dss-icon` pintava o icone da cor da marca — sem contraste. Com a classe
   * sempre presente, o MESMO CSS serve os dois caminhos.
   *
   * Excecao: em `error` a classe de cor NAO e emitida — a cor de erro tem
   * prioridade sobre `color` e sobre `keepColor` (um campo invalido nao exibe
   * cor de acao em repouso). Mesma regra do DssRadio/DssToggle.
   */
  const checkboxClasses = computed(() => {
    const color = props.color || 'primary'
    const colorClass = props.error ? '' : `dss-checkbox--${color}`

    return [
      // Classe base
      'dss-checkbox',

      // Tamanho
      `dss-checkbox--${props.size || 'md'}`,

      // Classe de cor (sempre, exceto em erro) — alvo do CSS de cor do DSS
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
   * Classes de cor do indicador visual (.dss-checkbox__control)
   *
   * DESCONTINUADO como fonte de cor: hoje retorna sempre '' e existe apenas
   * para nao quebrar quem consome a assinatura do composable. As utilities do
   * Quasar (`bg-{color}`/`text-white`) foram removidas porque nao sao
   * brand-aware; toda a cor mora no SCSS do DSS, keyed pela classe de cor do
   * root. Ver o bloco "CORES SEMANTICAS" em 2-composition/_base.scss.
   */
  const controlColorClasses = computed(() => '')

  return {
    checkboxClasses,
    controlColorClasses
  }
}
