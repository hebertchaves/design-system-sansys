/**
 * DssCard - Component Exports
 *
 * Exporta todos os subcomponentes do card
 *
 * ✅ MIGRADO: TypeScript + Composition API (Jan 2026)
 * Usando versões .ts.vue com type safety completo
 */

import DssCard from './1-structure/DssCard.ts.vue'
import DssCardSection from './1-structure/DssCardSection.ts.vue'
import DssCardActions from './1-structure/DssCardActions.ts.vue'

export {
  DssCard,
  DssCardSection,
  DssCardActions
}

export default DssCard

// Types e composables (Gate Estrutural do CLAUDE.md — completado na Onda P0/T7.4)
export type * from './types/card.types'
export * from './composables'
