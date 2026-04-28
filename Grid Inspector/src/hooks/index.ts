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

// Brand Management
export { useBrand, getBrandColor, BRAND_COLORS } from './useBrand';
export type { SansysBrand } from '@/contexts/GridSystemContext';

// Color Classes (Padrão Quasar)
export { useColorClasses } from './useColorClasses';
export type { DssColor, ColorClassesOptions } from './useColorClasses';

// Accessibility (WCAG 2.1 AA)
export { useAccessibility, generateA11yId } from './useAccessibility';
export type { AccessibilityOptions } from './useAccessibility';

// Grid System Context
export { useGridSystem, GridSystemProvider } from '@/contexts/GridSystemContext';
export type { GridSystemState, Theme } from '@/contexts/GridSystemContext';

// Grid Sync Observer (Observability)
export { useGridSync } from './useGridSync';

// Advanced Grid Settings (Container Type, Auto Column Width, Breakpoint)
export { useAdvancedGridSettings } from './useAdvancedGridSettings';