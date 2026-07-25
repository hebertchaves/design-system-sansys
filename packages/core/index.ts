/**
 * ==========================================================================
 * DESIGN SYSTEM SANSYS (DSS) v2.0
 * Sistema de Design profissional com componentes Vue 3
 * ==========================================================================
 *
 * @author Hebert Daniel Oliveira Chaves
 * @license UNLICENSED
 * @version 2.4.0
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
// CSS DA BIBLIOTECA (tokens + themes + componentes)
// ============================================================================
// Sem esta importação o bundle da lib (vite.config.lib.js) emite um
// dist/style.css sem nenhum token :root — consumidores receberiam
// var(--dss-*) indefinidas (bloqueante #2 da Auditoria Final Jun/2026).

import './index.scss'

// ============================================================================
// EXPORTAR TODOS OS COMPONENTES
// ============================================================================

export * from './components/index'

// ============================================================================
// EXPORTAR PLUGIN COMO DEFAULT
// ============================================================================

export { default } from './components/index'

// ============================================================================
// VERSÃO DA BIBLIOTECA
// ============================================================================

export const version = '2.4.0'

// ============================================================================
// METADADOS
// ============================================================================

export const metadata = {
  name: 'Design System Sansys',
  version: '2.4.0',
  description: 'Sistema de Design profissional com componentes Vue 3 e tokens DSS',
  author: 'Hebert Daniel Oliveira Chaves',
  license: 'UNLICENSED',
  componentCount: 89,
  components: [
    // Controles interativos
    'DssButton', 'DssCheckbox', 'DssRadio', 'DssToggle', 'DssRange', 'DssSlider',
    'DssRating', 'DssKnob', 'DssSelect', 'DssOptionGroup', 'DssBtnGroup',
    'DssBtnToggle', 'DssBtnDropdown', 'DssFab', 'DssFabAction', 'DssPagination',
    // Inputs e formulários
    'DssInput', 'DssTextarea', 'DssField', 'DssFile',
    // Exibição de dados
    'DssChip', 'DssBadge', 'DssAvatar', 'DssIcon', 'DssImg',
    'DssCard', 'DssCardSection', 'DssCardActions',
    'DssList', 'DssItem', 'DssItemLabel', 'DssItemSection',
    'DssMarkupTable', 'DssTree',
    // Feedback e progresso
    'DssLinearProgress', 'DssCircularProgress', 'DssSpinner', 'DssSkeleton',
    'DssInnerLoading', 'DssAjaxBar', 'DssTooltip', 'DssMenu', 'DssPopupProxy',
    // Layout e estrutura
    'DssLayout', 'DssPage', 'DssPageContainer', 'DssHeader', 'DssFooter',
    'DssDrawer', 'DssToolbar', 'DssToolbarTitle', 'DssSeparator', 'DssSpace',
    'DssScrollArea', 'DssSplitter', 'DssResponsive', 'DssPageScroller', 'DssPageSticky',
    // Navegação
    'DssTabs', 'DssTab', 'DssTabPanel', 'DssTabPanels', 'DssRouteTab',
    'DssBreadcrumbs', 'DssBreadcrumbsEl', 'DssBar', 'DssExpansionItem',
    // Stepper
    'DssStepper', 'DssStep',
    // Timeline
    'DssTimeline', 'DssTimelineEntry',
    // Avançados
    'DssVirtualScroll', 'DssInfiniteScroll', 'DssPullToRefresh', 'DssSlideItem',
    'DssParallax', 'DssVideo', 'DssBanner',
    // Compostos
    'DssDialog', 'DssTable', 'DssCarousel', 'DssCarouselSlide',
    'DssBottomSheet', 'DssChatMessage', 'DssColorPicker', 'DssDatePicker',
    'DssMultiselectAutocomplete',
    'DssTimePicker', 'DssForm', 'DssPopupEdit', 'DssUploader',
  ],
  brands: ['hub', 'water', 'waste'],
  accessibility: 'WCAG 2.1 AA',
  frameworks: ['Vue 3']
}
