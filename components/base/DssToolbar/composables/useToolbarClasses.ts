/**
 * ==========================================================================
 * DssToolbar — Composable: useToolbarClasses
 * ==========================================================================
 *
 * Computa as classes CSS do DssToolbar com base nas props recebidas.
 *
 * @version 1.0.0
 */

import { computed } from 'vue'
import type { ToolbarProps } from '../types/toolbar.types'

/**
 * Retorna as classes computadas para o elemento raiz do DssToolbar.
 *
 * Classes geradas:
 * - `dss-toolbar`               — classe base (sempre presente)
 * - `dss-toolbar--inset`        — padding-inline-start ampliado
 * - `dss-toolbar--brand-hub`    — fundo laranja (Hub)
 * - `dss-toolbar--brand-water`  — fundo azul (Water)
 * - `dss-toolbar--brand-waste`  — fundo verde (Waste)
 */
export function useToolbarClasses(props: Readonly<ToolbarProps>) {
  const toolbarClasses = computed(() => [
    'dss-toolbar',
    {
      'dss-toolbar--inset': props.inset,
      [`dss-toolbar--brand-${props.brand}`]: !!props.brand
    }
  ])

  return { toolbarClasses }
}
