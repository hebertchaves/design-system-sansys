/**
 * ==========================================================================
 * DESIGN SYSTEM SANSYS (DSS) v2.0
 * Sistema de Design profissional com componentes Vue 3
 * ==========================================================================
 *
 * @author Hebert Daniel Oliveira Chaves
 * @license MIT
 * @version 2.0.0
 *
 * @description
 * Design System completo baseado em tokens semânticos, com componentes
 * Vue 3, acessibilidade WCAG 2.1 AA e brandabilidade (Hub, Water, Waste).
 *
 * @features
 * - ✅ Componentes Vue 3 (Composition API + Options API)
 * - ✅ Tokens DSS (cores, spacing, typography, etc.)
 * - ✅ Acessibilidade WCAG 2.1 AA
 * - ✅ Brandabilidade (Hub 🟠, Water 🔵, Waste 🟢)
 * - ✅ Dark Mode Support
 * - ✅ TypeScript ready
 * - ✅ Tree-shakeable
 *
 * @usage
 *
 * // 1. Instalação global (todos os componentes)
 * import DesignSystemSansys from '@sansys/design-system'
 * import '@sansys/design-system/css'
 *
 * app.use(DesignSystemSansys, {
 *   brand: 'hub' // opcional
 * })
 *
 * // 2. Importação individual (tree-shaking)
 * import { DssButton, DssCard, DssInput } from '@sansys/design-system'
 * import '@sansys/design-system/css'
 *
 * ==========================================================================
 */

// ============================================================================
// EXPORTAR TODOS OS COMPONENTES
// ============================================================================

export * from './components/index.js'

// ============================================================================
// EXPORTAR PLUGIN COMO DEFAULT
// ============================================================================

export { default } from './components/index.js'

// ============================================================================
// VERSÃO DA BIBLIOTECA
// ============================================================================

export const version = '2.2.0'

// ============================================================================
// METADADOS
// ============================================================================

export const metadata = {
  name: 'Design System Sansys',
  version: '2.2.0',
  description: 'Sistema de Design profissional com componentes Vue 3 e tokens DSS',
  author: 'Hebert Daniel Oliveira Chaves',
  license: 'MIT',
  components: [
    'DssButton',
    'DssBadge',
    'DssAvatar',
    'DssCard',
    'DssCardSection',
    'DssCardActions',
    'DssInput'
  ],
  brands: ['hub', 'water', 'waste'],
  accessibility: 'WCAG 2.1 AA',
  frameworks: ['Vue 3']
}
