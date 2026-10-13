/**
 * ==========================================================================
 * useButtonClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssButton
 * Segue o padrão Quasar de classes utilitárias (.bg-*, .text-*)
 *
 * @example
 * ```ts
 * const { buttonClasses } = useButtonClasses(props, { hasDefaultSlot })
 * ```
 */

import { computed, type Ref } from 'vue'
import type { ButtonProps } from '../types/button.types'

interface UseButtonClassesOptions {
  /** Se o slot default tem conteúdo */
  hasDefaultSlot: Ref<boolean>
}

/**
 * Composable para classes CSS do botão
 */
export function useButtonClasses(
  props: Readonly<ButtonProps>,
  options: UseButtonClassesOptions
) {
  /**
   * Classes CSS computadas do botão
   *
   * Lógica de cores seguindo padrão Quasar:
   * - flat/outline: usa text-{color} (texto colorido, fundo transparente)
   * - outros: usa bg-{color} + text-white (fundo colorido, texto branco)
   * - brand: utilitárias + data-brand no root (a marca vem do token)
   */
  const buttonClasses = computed(() => {
    // Classes de cor (utilitárias do DSS)
    let colorClasses = ''

    if (props.brand) {
      // COM MARCA — a cor vem da camada de token, não de CSS próprio.
      //
      // O root emite `data-brand`; `tokens/brand/*` remapeia a rampa
      // `--dss-action-primary*` ali mesmo e, por `scopes.$marcas`, a ponte
      // `--q-primary` recomputa junto. Então `bg-primary` já pinta a marca, e o
      // hover de `4-output/_states.scss` (que redefine `--q-primary`) passa a
      // valer também neste caminho — antes não valia, e era por isso que o
      // `_brands.scss` precisava reimplementar hover e active.
      //
      // Sempre `primary`: marca é instrução de IDENTIDADE e vence a prop
      // `color`, como já era quando o `_brands.scss` pintava por cima.
      //
      // `text-white` NÃO é emitido de propósito — ver o bloco de cor sólida em
      // `2-composition/_base.scss`.
      colorClasses = props.variant === 'flat' || props.variant === 'outline'
        ? 'text-primary'
        : 'bg-primary'
    } else {
      if (props.variant === 'flat' || props.variant === 'outline') {
        // Variantes transparentes: apenas cor de texto
        colorClasses = `text-${props.color}`
      } else {
        // Variantes sólidas: fundo colorido + texto branco
        colorClasses = `bg-${props.color} text-white`
      }
    }

    // Detecta se é botão apenas ícone (sem label)
    const hasLabel = !!(props.label || options.hasDefaultSlot.value)
    const hasIcon = !!(props.icon || props.iconRight)
    const isIconOnly = hasIcon && !hasLabel

    return [
      // Classe base
      'dss-button',

      // Variante visual
      `dss-button--${props.variant}`,

      // Classes de cor (utilitárias DSS)
      colorClasses,

      // Tamanho
      `dss-button--${props.size}`,

      // Classes condicionais
      {
        'dss-button--round': props.round,
        'dss-button--square': props.square,
        'dss-button--loading': props.loading,
        'dss-button--disabled': props.disabled,
        'dss-button--dense': props.dense,
        'dss-button--no-caps': props.noCaps,
        'dss-button--icon-only': isIconOnly,

        // Brand

        // Layout
        [`dss-button--align-${props.align}`]: props.align !== 'center',
        'dss-button--stack': props.stack,
        'dss-button--stretch': props.stretch,
        'dss-button--no-wrap': props.noWrap
      }
    ]
  })

  return {
    buttonClasses
  }
}
