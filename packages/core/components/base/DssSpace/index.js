/**
 * ==========================================================================
 * DssSpace - BARREL EXPORT
 *
 * RESPONSABILIDADE: Exportar todos os artefatos públicos do componente
 *
 * EXPORTS:
 * - DssSpace: Componente Vue principal (via Entry Point Wrapper)
 * - useSpaceClasses: Composable para geração de classes
 * - Types: Interfaces TypeScript
 * ==========================================================================
 */

// Componente Vue principal (via Entry Point Wrapper)
export { default as DssSpace } from './DssSpace.vue'

// Composables
export { useSpaceClasses } from './composables'

// Types (re-export para consumidores TypeScript)
export * from './types/space.types'
