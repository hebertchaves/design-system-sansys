import { computed } from 'vue'
import type { TabPanelsProps } from '../types/tab-panels.types'

/**
 * Composable que gera as classes reativas do DssTabPanels.
 *
 * Classes geradas:
 * - `dss-tab-panels`: Sempre presente — classe raiz do componente
 * - `dss-tab-panels--animated`: Quando animated=true — sinaliza transição ativa
 *   (permite override CSS futuro de duração/easing por variante)
 */
export function useTabPanelsClasses(props: Readonly<TabPanelsProps>) {
  const tabPanelsClasses = computed(() => [
    'dss-tab-panels',
    {
      'dss-tab-panels--animated': props.animated,
    },
  ])

  return { tabPanelsClasses }
}
