/**
 * ==========================================================================
 * useFabClasses — Composable de Classes DSS
 * ==========================================================================
 *
 * Gera o array de classes CSS do DssFab baseado nas props.
 * Segue a hierarquia de estados DSS: disabled > loading > color > brand > default.
 *
 * ARQUITETURA:
 * - Este composable APENAS gera classes (não aplica estilos).
 * - Estilos são definidos em 2-composition, 3-variants e 4-output.
 * - Sem lógica de negócio de produto.
 */

import { computed } from 'vue'
import type { FabProps } from '../types/fab.types'

/**
 * Composable principal: gera as classes do elemento raiz .dss-fab
 */
export function useFabClasses(props: FabProps) {
  const fabClasses = computed<string[]>(() => {
    const classes: string[] = ['dss-fab']

    // Extended FAB (label presente)
    if (props.label) {
      classes.push('dss-fab--extended')
    }

    // Direção de expansão
    if (props.direction && props.direction !== 'up') {
      classes.push(`dss-fab--direction-${props.direction}`)
    }

    // Estado disabled — hierarquia DSS
    if (props.disable) {
      classes.push('dss-fab--disabled')
    }

    // Brand
    if (props.brand) {
      classes.push(`dss-fab--brand-${props.brand}`)
    }

    return classes
  })

  return { fabClasses }
}
