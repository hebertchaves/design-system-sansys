/**
 * ==========================================================================
 * DssCheckbox - BARREL EXPORT
 *
 * RESPONSABILIDADE: Exportar todos os artefatos publicos do componente
 *
 * EXPORTS:
 * - DssCheckbox: Componente Vue principal
 * - useCheckboxClasses: Composable para geracao de classes
 * - Types: Interfaces TypeScript
 * ==========================================================================
 */

// Componente Vue principal
export { default as DssCheckbox } from './1-structure/DssCheckbox.ts.vue'

// Composables
export { useCheckboxClasses } from './composables'

// Types (re-export para consumidores TypeScript)
export * from './types/checkbox.types'
