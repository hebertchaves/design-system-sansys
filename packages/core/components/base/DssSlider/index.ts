/**
 * DssSlider — Barrel Export
 *
 * Exporta o componente canônico, types e composables.
 */

// Componente
export { default as DssSlider } from './DssSlider.vue'

// Composables
export { useSliderClasses, useSliderActions, useSliderState } from './composables'

// Types e composables (Gate Estrutural do CLAUDE.md — completado na Onda P0/T7.4)
export type * from './types/slider.types'
