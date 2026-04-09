/**
 * DssTabPanel — Component Exports
 *
 * Exporta o componente painel de aba DSS, seus tipos TypeScript
 * e composables para uso externo.
 *
 * @example
 * import { DssTabPanel } from '@/dss/components/base/DssTabPanel'
 * import DssTabPanel from '@/dss/components/base/DssTabPanel'
 *
 * @example
 * import type { TabPanelProps } from '@/dss/components/base/DssTabPanel'
 * import { useTabPanelClasses } from '@/dss/components/base/DssTabPanel'
 */

// Componente — via Entry Point Wrapper canônico (não via 1-structure diretamente)
import DssTabPanel from './DssTabPanel.vue'

export { DssTabPanel }
export default DssTabPanel

// Types
export type { TabPanelProps, TabPanelSlots } from './types/tab-panel.types'

// Composables
export { useTabPanelClasses } from './composables'
