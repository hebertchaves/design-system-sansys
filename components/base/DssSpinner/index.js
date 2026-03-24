// DssSpinner — Barrel Export
//
// Exporta o wrapper canônico como entry point principal.
// Consumidores devem sempre importar de 'DssSpinner', nunca de '1-structure'.

export { default as DssSpinner } from './DssSpinner.vue'

// Types
export * from './types/spinner.types'

// Composables
export { useSpinnerClasses } from './composables'
