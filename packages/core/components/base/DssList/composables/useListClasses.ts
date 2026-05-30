/**
 * ==========================================================================
 * useListClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssList.
 * Segue o padrão DSS de classes computadas via Composition API.
 *
 * @example
 * ```ts
 * const { listClasses } = useListClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { ListProps } from '../types/list.types'

/**
 * Composable para classes CSS da lista
 */
export function useListClasses(props: Readonly<ListProps>) {
  /**
   * Classes CSS computadas da lista
   *
   * Lógica de brand:
   * - brand prop: usa .dss-list--brand-{brand} (CSS próprio em 4-output/_brands.scss)
   * - sem brand: sem classes de cor (herda do contexto)
   *
   * Nota: DssList é não-interativo. Não possui classes de estado interativo
   * (hover, focus, active, disabled). Toda interatividade pertence aos
   * filhos (DssItem).
   */
  const listClasses = computed(() => [
    // Classe base
    'dss-list',

    // Variantes visuais
    {
      'dss-list--bordered': props.bordered,
      'dss-list--padding': props.padding,
      'dss-list--separator': props.separator,

      // Brand
      [`dss-list--brand-${props.brand}`]: !!props.brand
    }
  ])

  return {
    listClasses
  }
}
