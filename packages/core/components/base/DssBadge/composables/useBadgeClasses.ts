/**
 * ==========================================================================
 * useBadgeClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssBadge
 * Segue o padrão Quasar de classes utilitárias (.bg-*, .text-*)
 *
 * @example
 * ```ts
 * const { badgeClasses } = useBadgeClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { BadgeProps } from '../types/badge.types'

/**
 * Composable para classes CSS do badge
 */
export function useBadgeClasses(props: Readonly<BadgeProps>) {
  /**
   * Classes CSS computadas do badge
   *
   * Lógica de cores seguindo padrão Quasar QBadge:
   * - outline/transparent: usa text-{color} (texto colorido, fundo transparente)
   * - normal: usa bg-{color} + text-white (fundo colorido, texto branco)
   * - textColor: sobrescreve cor do texto se fornecido
   */
  const badgeClasses = computed(() => {
    // Lógica de cores seguindo padrão Quasar QBadge:
    // - outline/transparent: usa text-{color} (texto colorido, fundo transparente)
    // - normal: usa bg-{color} + text-white (fundo colorido, texto branco)
    // - brand: utilitárias + data-brand no root (a marca vem do token)
    let colorClasses = ''

    if (props.brand) {
      // COM MARCA — a cor vem da camada de token, não de CSS próprio.
      //
      // O root emite `data-brand`, e `tokens/brand/*` remapeia ali mesmo
      // `--dss-action-primary` (e, via `scopes.$marcas`, a ponte `--q-primary`
      // que alimenta as utilitárias do Quasar). Então `bg-primary` já pinta a
      // cor da marca, sem o componente saber que marca é.
      //
      // Sempre `primary`, nunca `bg-${props.color}`: marca é instrução de
      // IDENTIDADE e vence a prop `color` — comportamento que já era o de antes,
      // quando o `_brands.scss` pintava por cima.
      //
      // `text-white` NÃO é emitido de propósito: sem ele, a regra da Layer 2
      // (`--dss-text-on-primary`) governa o texto da variante sólida. Importa
      // no `hcdark`, onde esse token vira texto ESCURO — `text-white` deixaria
      // branco sobre fundo claro.
      colorClasses = props.outline || props.transparent ? 'text-primary' : 'bg-primary'
    } else {
      if (props.outline || props.transparent) {
        // Variantes transparentes: apenas cor de texto
        colorClasses = `text-${props.color}`
      } else {
        // Variante sólida: fundo colorido + texto branco
        colorClasses = `bg-${props.color} text-white`
      }

      // Override de text color se especificado
      if (props.textColor) {
        colorClasses += ` text-${props.textColor}`
      }
    }

    return [
      // Classe base
      'dss-badge',

      // Classes de cor (utilitárias DSS)
      colorClasses,

      // Classes condicionais
      {
        'dss-badge--floating': props.floating,
        'dss-badge--transparent': props.transparent,
        'dss-badge--multi-line': props.multiLine,
        'dss-badge--outline': props.outline,
        'dss-badge--rounded': props.rounded,
      }
    ]
  })

  return {
    badgeClasses
  }
}
