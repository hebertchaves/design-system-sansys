/**
 * DssFile — Barrel Export
 *
 * Exporta o componente, tipos e composables para consumo externo.
 */

// Componente (entry point wrapper)
export { default as DssFile } from './DssFile.vue'

// TypeScript types (GAP-03: exportação explícita de contratos públicos)
export type { FileProps, FileEmits, FileSlots, FileExpose, FileVariant, FileBrand, FileState } from './types/file.types'

// Composables
export { useFileState } from './composables/useFileState'
export { useFileClasses } from './composables/useFileClasses'
export { useFileActions } from './composables/useFileActions'
