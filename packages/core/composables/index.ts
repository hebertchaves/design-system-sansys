/**
 * ==========================================================================
 * DSS Global Composables - Index
 * ==========================================================================
 *
 * Exportação central de todos os composables globais do Design System Sansys
 *
 * Estes composables podem ser usados por qualquer componente do sistema
 * para funcionalidades comuns como cores, acessibilidade, estados, etc.
 *
 * @example
 * ```ts
 * import { useColorClasses, useAccessibility } from '@/composables'
 * ```
 */

// Input Modality — de onde veio o foco (teclado x ponteiro).
// Complementa `:focus-visible`, que não separa as duas em campo de TEXTO.
export { useInputModality } from './useInputModality'

// Altura que acompanha a retração — a sanfona medida, porque `auto → auto`
// não interpola e o arranjo do bloco muda junto com o estado.
export { useCollapseHeight } from './useCollapseHeight'
export type { CollapseHeightOptions } from './useCollapseHeight'

// Color Management
export { useColorClasses } from './useColorClasses'
export type { DssColor, ColorClassesOptions } from './useColorClasses'

// Accessibility
export { useAccessibility, generateA11yId } from './useAccessibility'
export type { AccessibilityOptions } from './useAccessibility'

// Component State
export { useComponentState } from './useComponentState'
export type { ComponentStateOptions } from './useComponentState'

// Brand Management
export { useBrand, getBrandColor, BRAND_COLORS } from './useBrand'
export type { SansysBrand } from './useBrand'

// Validação de campo — registro no motor do QForm (set/2026)
export { useFieldValidation } from './useFieldValidation'
export type {
  DssFieldRule,
  DssLazyRules,
  FieldValidationOptions,
  FieldValidationReturn,
} from './useFieldValidation'

// Brand para conteúdo teleportado (overlays — Onda P0/T4)
export { useTeleportedBrand } from './useTeleportedBrand'
export type { UseTeleportedBrandReturn } from './useTeleportedBrand'
