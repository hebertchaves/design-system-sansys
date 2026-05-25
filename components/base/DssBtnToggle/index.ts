/**
 * DssBtnToggle - Component Exports
 *
 * Exporta o componente de alternância DSS, seus tipos TypeScript
 * e composables para uso externo.
 *
 * @example
 * import { DssBtnToggle } from '@/dss/components/base/DssBtnToggle'
 * import DssBtnToggle from '@/dss/components/base/DssBtnToggle'
 *
 * @example
 * import type { BtnToggleProps } from '@/dss/components/base/DssBtnToggle'
 * import { useBtnToggleClasses } from '@/dss/components/base/DssBtnToggle'
 */

// Importa direto da 1-structure para preservar o contexto <script setup>
// (via wrapper .vue causa $setup undefined no compilador Vite)
import DssBtnToggle from './1-structure/DssBtnToggle.ts.vue'

export { DssBtnToggle }
export default DssBtnToggle

// Types
export type { BtnToggleProps, BtnToggleBrand, BtnToggleVariant, BtnToggleOption, BtnToggleEmits, BtnToggleSlots } from './types/btn-toggle.types'

// Composables
export { useBtnToggleClasses } from './composables'
