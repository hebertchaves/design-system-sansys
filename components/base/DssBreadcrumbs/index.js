/**
 * DssBreadcrumbs - Component Exports
 *
 * Exporta o componente de trilha de navegação DSS, seus tipos TypeScript
 * e composables para uso externo.
 *
 * @example
 * import { DssBreadcrumbs } from '@/dss/components/base/DssBreadcrumbs'
 * import { DssBreadcrumbsEl } from '@/dss/components/base/DssBreadcrumbsEl'
 *
 * @example
 * import type { BreadcrumbsProps } from '@/dss/components/base/DssBreadcrumbs'
 * import { useBreadcrumbsClasses } from '@/dss/components/base/DssBreadcrumbs'
 */

// Componente — via Entry Point Wrapper canônico (não via 1-structure diretamente)
import DssBreadcrumbs from './DssBreadcrumbs.vue'

export { DssBreadcrumbs }
export default DssBreadcrumbs

// Types
export type {
  BreadcrumbsProps,
  BreadcrumbsEmits,
  BreadcrumbsSlots,
  BreadcrumbsGutter,
  BreadcrumbsAlign,
  BreadcrumbsBrand,
} from './types/breadcrumbs.types'

// Composables
export { useBreadcrumbsClasses } from './composables'
