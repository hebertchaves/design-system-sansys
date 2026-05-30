/**
 * ==========================================================================
 * useFabActionClasses — Composable de Classes DSS
 * ==========================================================================
 *
 * Gera o array de classes CSS do DssFabAction baseado nas props.
 * Segue a hierarquia de estados DSS: disabled > label > brand > default.
 *
 * ARQUITETURA:
 * - Este composable APENAS gera classes (não aplica estilos).
 * - Estilos são definidos em 2-composition, 3-variants e 4-output.
 * - Sem lógica de negócio de produto.
 */

import { computed } from 'vue'
import type { FabActionProps } from '../types/fabaction.types'

/**
 * Composable principal: gera as classes do elemento raiz .dss-fab-action
 */
export function useFabActionClasses(props: FabActionProps) {
  const fabActionClasses = computed<string[]>(() => {
    const classes: string[] = ['dss-fab-action']

    // Extended FabAction (label inline presente)
    if (props.label) {
      classes.push('dss-fab-action--extended')
    }

    // FabAction com label externo
    if (props.externalLabel) {
      classes.push('dss-fab-action--has-external-label')
      if (props.labelPosition) {
        classes.push(`dss-fab-action--label-${props.labelPosition}`)
      }
    }

    // Estado disabled — hierarquia DSS
    if (props.disable) {
      classes.push('dss-fab-action--disabled')
    }

    // Brand
    if (props.brand) {
      classes.push(`dss-fab-action--brand-${props.brand}`)
    }

    return classes
  })

  return { fabActionClasses }
}
