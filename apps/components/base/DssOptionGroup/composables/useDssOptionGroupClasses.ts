// =============================================================================
// DssOptionGroup — useDssOptionGroupClasses
// Design System Sansys v2.2 — Fase 2
// =============================================================================

import { computed } from 'vue'
import type { OptionGroupProps } from '../types/option-group.types'

/**
 * Composable responsável pela geração de classes CSS e role ARIA do DssOptionGroup.
 *
 * @param props - Props reativas do componente
 * @returns containerClasses e computedRole
 */
export function useDssOptionGroupClasses(props: OptionGroupProps) {
  /**
   * Classes CSS do container do grupo.
   * Refletem: type, inline, dense, disable, readonly.
   */
  const containerClasses = computed(() => [
    'dss-option-group',
    // Tipo do controle interno (determina CSS selector scope)
    `dss-option-group--${props.type ?? 'radio'}`,
    {
      // Layout
      'dss-option-group--inline': props.inline,
      // Densidade
      'dss-option-group--dense': props.dense,
      // Estados do container
      'dss-option-group--disable': props.disable,
      'dss-option-group--readonly': props.readonly,
    },
  ])

  /**
   * Role ARIA do container.
   * - "radiogroup" para type="radio" (semântica WAI-ARIA específica)
   * - "group" para checkbox e toggle
   */
  const computedRole = computed<'radiogroup' | 'group'>(() =>
    (props.type === 'radio' || !props.type) ? 'radiogroup' : 'group'
  )

  return { containerClasses, computedRole }
}
