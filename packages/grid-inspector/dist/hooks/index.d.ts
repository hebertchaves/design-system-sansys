/**
 * ==========================================================================
 * DSS React Hooks - Barrel Export
 * ==========================================================================
 *
 * Exportação central de todos os hooks DSS portados do Lovable
 * Equivalente a: composables/index.ts (DSS Lovable)
 *
 * @example
 * ```ts
 * import { useBrand, useColorClasses, useAccessibility } from '@/hooks'
 * ```
 */
export { useBrand, getBrandColor, BRAND_COLORS } from './useBrand';
export type { SansysBrand } from '../contexts/GridSystemContext';
export { useColorClasses } from './useColorClasses';
export type { DssColor, ColorClassesOptions } from './useColorClasses';
export { useAccessibility, generateA11yId } from './useAccessibility';
export type { AccessibilityOptions } from './useAccessibility';
export { useGridSystem, GridSystemProvider } from '../contexts/GridSystemContext';
export type { GridSystemState, Theme } from '../contexts/GridSystemContext';
export { useGridSync } from './useGridSync';
export { useAdvancedGridSettings } from './useAdvancedGridSettings';
//# sourceMappingURL=index.d.ts.map