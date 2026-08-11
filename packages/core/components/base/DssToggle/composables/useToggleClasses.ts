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

    // Classes de cor no root - apenas para brand matching
    let colorClass = ''
    if (props.brand) {
      colorClass = `dss-toggle--${color}`
    }

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
   * Classes de cor para o track (.dss-toggle__track)
   *
   * SEM brand:
   *   - checked: bg-{color} text-white (pilula preenchida)
   *   - keepColor + DESLIGADO: text-{color} — colore SO A BORDA, porque o track
   *     declara `border: ... solid currentColor` e mantem
   *     `background-color: var(--dss-surface-muted)`. O fundo NAO e preenchido
   *     de proposito: track colorido no desligado tornaria ligado e desligado
   *     indistinguiveis, o que quebra a percepcao de estado. O thumb tambem
   *     segue cinza (gray-500 explicito), reforcando a distincao.
   * COM brand: cores vem via _brands.scss (inclusive o keepColor)
   *
   * Hierarquia de estados: error > color
   * (erro impede aplicacao de cor — padrao DssRadio selado)
   */
  const trackColorClasses = computed(() => {
    if (props.brand) return ''

    // Erro tem prioridade sobre qualquer cor, ligado ou nao — inclusive sobre
    // keepColor: um campo invalido nao pode exibir cor de acao no repouso.
    if (props.error) return ''

    const color = props.color || 'primary'

    if (options.isChecked.value) return `bg-${color} text-white`

    // keepColor: escape hatch opt-in — colore a borda tambem no DESLIGADO
    if (props.keepColor) return `text-${color}`

    return ''
  })

  return {
    toggleClasses,
    trackColorClasses
  }
}
