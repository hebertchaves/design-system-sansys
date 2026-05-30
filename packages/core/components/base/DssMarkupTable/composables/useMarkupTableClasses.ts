/**
 * ==========================================================================
 * useMarkupTableClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssMarkupTable.
 * Segue o padrão DSS de classes computadas via Composition API.
 *
 * @example
 * ```ts
 * const { rootClasses } = useMarkupTableClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { DssMarkupTableProps } from '../types/markuptable.types'

/**
 * Composable para classes CSS da tabela markup
 *
 * Nota: DssMarkupTable é não-interativo. Não possui classes de estado interativo
 * (hover, focus, active, disabled). A semântica de interação pertence ao
 * conteúdo de slot (consumer responsibility).
 */
export function useMarkupTableClasses(props: Readonly<DssMarkupTableProps>) {
  /**
   * Classes CSS computadas da tabela
   *
   * Lógica de density:
   * - standard: nenhuma classe extra (estilos base)
   * - compact: adiciona .dss-markup-table--compact
   * - comfortable: adiciona .dss-markup-table--comfortable
   *
   * Lógica de brand:
   * - brand prop: usa .dss-markup-table--brand-{brand} (CSS em 4-output/_brands.scss)
   * - sem brand: herda do contexto visual
   */
  const rootClasses = computed(() => [
    'dss-markup-table',
    {
      // Density variants
      'dss-markup-table--compact': props.density === 'compact',
      'dss-markup-table--comfortable': props.density === 'comfortable',

      // Brand
      [`dss-markup-table--brand-${props.brand}`]: !!props.brand
    }
  ])

  return {
    rootClasses
  }
}
