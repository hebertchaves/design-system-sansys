/**
 * ==========================================================================
 * useEmptyStateClasses Composable
 * ==========================================================================
 *
 * Classes CSS do DssEmptyState.
 *
 * O componente NÃO tem cor semântica: estado vazio é informação neutra, não
 * feedback. Por isso não há prop `color` nem classe de cor aqui — as cores vêm
 * dos tokens de texto (`--dss-text-*`) na camada 2.
 */

import { computed } from 'vue'
import type { EmptyStateProps } from '../types/empty-state.types'

export function useEmptyStateClasses(props: Readonly<EmptyStateProps>) {
  const rootClasses = computed(() => [
    'dss-empty-state',
    `dss-empty-state--${props.size ?? 'md'}`,
    `dss-empty-state--${props.variant ?? 'plain'}`,
  ])

  return { rootClasses }
}
