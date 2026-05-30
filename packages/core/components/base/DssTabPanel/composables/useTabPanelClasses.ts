/**
 * ==========================================================================
 * DssTabPanel — Composable: useTabPanelClasses
 * ==========================================================================
 *
 * Gerencia as classes CSS do DssTabPanel de forma reativa.
 * Segue o padrão de composables do DSS (DssCard, DssTabs).
 *
 * @version 1.0.0
 */

import { computed } from 'vue'
import type { TabPanelProps } from '../types/tab-panel.types'

/**
 * Composable que retorna as classes reativas para o DssTabPanel.
 *
 * @param props - Props do DssTabPanel (readonly)
 * @returns { tabPanelClasses } - Classes computadas para o elemento raiz
 */
export function useTabPanelClasses(props: Readonly<TabPanelProps>) {
  /**
   * Classes do painel de aba.
   *
   * Classe base: `dss-tab-panel`
   * Modificador de estado: `dss-tab-panel--disabled` quando `disable` é true
   */
  const tabPanelClasses = computed(() => [
    'dss-tab-panel',
    {
      'dss-tab-panel--disabled': props.disable,
    },
  ])

  return { tabPanelClasses }
}
