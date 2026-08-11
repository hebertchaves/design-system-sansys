/**
 * useRadioClasses — Composable de classes CSS
 * Design System Sansys v2.2
 *
 * Gera classes CSS dinamicas com base em props e estado.
 * Segue o mesmo padrao do useCheckboxClasses (Golden Context).
 */

import { computed, type Ref } from 'vue'
import type { RadioProps } from '../types/radio.types'

export interface UseRadioClassesOptions {
  isChecked: Ref<boolean>
  isFocused: Ref<boolean>
}

export function useRadioClasses(
  props: Readonly<RadioProps>,
  options: UseRadioClassesOptions
) {
  // -------------------------------------------------------------------------
  // Classes do elemento raiz (.dss-radio)
  // -------------------------------------------------------------------------
  const radioClasses = computed(() => {
    const color = props.color || 'primary'

    // Classe de cor SEMPRE (exceto em erro) — e o alvo do CSS de cor do DSS em
    // 2-composition/_base.scss. Antes so era emitida COM a prop `brand`, e sem
    // brand a cor vinha das utilities do Quasar, que nao sao brand-aware: sob
    // brand GLOBAL ([data-brand] num ancestral) o indicador ficava na cor errada.
    // Em erro a classe e suprimida: a cor de erro tem prioridade sobre `color`
    // e sobre `keepColor`.
    const colorClass = props.error ? '' : `dss-radio--${color}`

    return [
      'dss-radio',
      `dss-radio--${props.size || 'md'}`,
      colorClass,
      {
        'dss-radio--checked': options.isChecked.value,
        'dss-radio--disabled': props.disable,
        'dss-radio--dense': props.dense,
        'dss-radio--error': props.error,
        'dss-radio--left-label': props.leftLabel,
        'dss-radio--keep-color': props.keepColor,
      }
    ]
  })

  // -------------------------------------------------------------------------
  // Classes do controle visual (.dss-radio__control)
  // -------------------------------------------------------------------------
  const controlClasses = computed(() => {
    const classes = ['dss-radio__control']

    if (options.isChecked.value) {
      classes.push('dss-radio__control--checked')
    }

    if (options.isFocused.value) {
      classes.push('dss-radio__control--focused')
    }

    return classes
  })

  // -------------------------------------------------------------------------
  // Classes de cor do controle (.dss-radio__control)
  //
  // DESCONTINUADO como fonte de cor: hoje retorna sempre '' e existe apenas para
  // nao quebrar quem consome a assinatura do composable. As utilities do Quasar
  // (`text-{color}`) foram removidas porque nao sao brand-aware; toda a cor mora
  // no SCSS do DSS, keyed pela classe de cor do root. Ver o bloco
  // "CORES SEMANTICAS" em 2-composition/_base.scss.
  // -------------------------------------------------------------------------
  const controlColorClasses = computed(() => '')

  return { radioClasses, controlClasses, controlColorClasses }
}
