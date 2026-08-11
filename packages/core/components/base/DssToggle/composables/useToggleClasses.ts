/**
 * ==========================================================================
 * useToggleClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssToggle
 *
 * ESTRATEGIA DE CORES:
 * - Sem brand: usa classes utilitarias Quasar (.bg-*, .text-*)
 * - Com brand: usa classe DSS (.dss-toggle--{color}) para CSS de _brands.scss
 *
 * Golden Context: DssCheckbox (mesmo padrao de composable)
 *
 * @example
 * ```ts
 * const { toggleClasses, trackColorClasses } = useToggleClasses(
 *   props,
 *   { isChecked }
 * )
 * ```
 */

import { computed, type Ref } from 'vue'
import type { ToggleProps } from '../types/toggle.types'

interface UseToggleClassesOptions {
  /** Se o toggle esta ativo (on) */
  isChecked: Ref<boolean>
}

/**
 * Composable para classes CSS do toggle
 */
export function useToggleClasses(
  props: Readonly<ToggleProps>,
  options: UseToggleClassesOptions
) {
  /**
   * Classes CSS computadas do toggle (aplicadas ao ROOT <label>)
   *
   * Logica de cores:
   * - SEM brand: classes utilitarias Quasar nao vao no root
   * - COM brand: classe DSS (dss-toggle--{color}) para seletores em _brands.scss
   *
   * O CSS em _brands.scss usa seletores como:
   *   [data-brand='hub'] .dss-toggle.dss-toggle--primary
   */
  const toggleClasses = computed(() => {
    const color = props.color || 'primary'

    // Classe de cor SEMPRE (exceto em erro) — e o alvo do CSS de cor do DSS em
    // 2-composition/_base.scss. Antes so era emitida COM a prop `brand`, e sem
    // brand a cor vinha das utilities do Quasar, que nao sao brand-aware: sob
    // brand GLOBAL ([data-brand] num ancestral) o track ligado ficava na cor
    // errada. Em erro a classe e suprimida: a cor de erro tem prioridade sobre
    // `color` e sobre `keepColor`.
    const colorClass = props.error ? '' : `dss-toggle--${color}`

    return [
      // Classe base
      'dss-toggle',

      // Tamanho
      `dss-toggle--${props.size || 'md'}`,

      // Classe de cor (apenas com brand)
      colorClass,

      // Classes condicionais
      {
        'dss-toggle--checked': options.isChecked.value,
        'dss-toggle--disabled': props.disable,
        'dss-toggle--dense': props.dense,
        'dss-toggle--left-label': props.leftLabel,
        'dss-toggle--error': props.error,
        'dss-toggle--keep-color': props.keepColor,
      }
    ]
  })

  /**
   * Classes de cor do track (.dss-toggle__track)
   *
   * DESCONTINUADO como fonte de cor: hoje retorna sempre '' e existe apenas para
   * nao quebrar quem consome a assinatura do composable. As utilities do Quasar
   * (`bg-{color}`/`text-{color}`) foram removidas porque nao sao brand-aware;
   * toda a cor mora no SCSS do DSS, keyed pela classe de cor do root. Ver o bloco
   * "CORES SEMANTICAS" em 2-composition/_base.scss — inclusive a regra do
   * keepColor, que colore SO A BORDA no desligado (preencher o track apagaria a
   * distincao ligado x desligado).
   */
  const trackColorClasses = computed(() => '')

  return {
    toggleClasses,
    trackColorClasses
  }
}
