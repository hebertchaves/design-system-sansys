<template>
  <div class="preview-page" :data-brand="activeBrand || undefined">

    <!-- HEADER FIXO -->
    <header class="preview-header">
      <DssToolbar>
        <DssToolbarTitle>Defaults Preview — DSS v2.2</DssToolbarTitle>
        <DssSpace />
        <nav class="brand-nav" aria-label="Seletor de brand">
          <span class="brand-nav__label">Brand</span>
          <DssChip
            v-for="b in brands"
            :key="b.value"
            :label="b.label"
            clickable
            :selected="activeBrand === b.value"
            :class="`brand-chip--${b.value || 'none'}`"
            @click="activeBrand = b.value"
          />
        </nav>
        <DssBadge style="margin-left: var(--dss-spacing-2)">{{ allMetas.length }}</DssBadge>
      </DssToolbar>
    </header>

    <!-- CONTEÚDO PRINCIPAL -->
    <main
      class="preview-main"
      id="preview-main"
      data-grid-debug="preview-main"
    >
      <!-- __body: controla max-width via inspector (sem container-type para não travar position:fixed) -->
      <div
        class="preview__body"
        id="preview-body"
        data-grid-debug="preview-body"
      >
        <!-- __sections: ponto de entrada do GridOverlay — filhos diretos são as rows -->
        <div
          class="preview__sections"
          id="preview-sections"
          data-grid-rows
          data-grid-debug="preview-sections"
        >

          <!-- ── Grupos data-driven ─────────────────────────────────────────── -->
          <DssCard
            v-for="group in GROUPS"
            :key="group.id"
            :id="`preview-s-${group.id}`"
            class="preview-group"
            :data-grid-debug="`s-${group.id}`"
          >
            <DssCardSection class="group-header">
              <span class="group-title">{{ group.title }}</span>
              <span class="group-desc">{{ group.desc }}</span>
            </DssCardSection>
            <DssSeparator />
            <DssCardSection>
              <div class="demo-grid">
                <div
                  v-for="meta in grouped[group.id]"
                  :key="meta.component"
                  class="demo-cell"
                >
                  <div class="demo-box">
                    <DemoRenderer :meta="meta" />
                  </div>
                  <code class="demo-label">{{ meta.component }}</code>
                </div>
                <!-- Placeholder quando o grupo não tem componentes com previewGroup -->
                <div
                  v-if="!grouped[group.id] || grouped[group.id].length === 0"
                  class="demo-cell"
                >
                  <div class="demo-box">
                    <span class="demo-note">Nenhum componente neste grupo</span>
                  </div>
                </div>
              </div>
            </DssCardSection>
          </DssCard>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DemoRenderer from './DemoRenderer.vue'

import DssToolbar      from '@dss/DssToolbar'
import DssToolbarTitle from '@dss/DssToolbarTitle'
import DssSpace        from '@dss/DssSpace'
import DssBadge        from '@dss/DssBadge'
import DssChip         from '@dss/DssChip'
import { DssCard, DssCardSection } from '@dss/DssCard'
import DssSeparator    from '@dss/DssSeparator'

// ── Carregar todos os dss.meta.json via import.meta.glob ──────────────────────
const rawMetas = import.meta.glob(
  '../../../packages/core/components/**/dss.meta.json',
  { eager: true }
)

// Normalizar (default export ou export direto) e filtrar componentes válidos
const allMetas = Object.values(rawMetas)
  .map((m: any) => m.default || m)
  .filter((m: any) => m.component && m.previewGroup)

// ── Definição dos 15 grupos ───────────────────────────────────────────────────
const GROUPS = [
  { id: 'acoes',          title: '1. Ações',                    desc: 'DssButton · DssChip · DssBtnGroup · DssBtnDropdown · DssBtnToggle · DssFab · DssFabAction' },
  { id: 'indicadores',    title: '2. Indicadores e Avatares',    desc: 'DssBadge · DssAvatar · DssIcon · DssSpinner · DssRating · DssKnob · DssTooltip' },
  { id: 'form-campos',    title: '3. Formulários — Campos',      desc: 'DssInput · DssSelect · DssTextarea · DssFile' },
  { id: 'form-controles', title: '4. Formulários — Controles',   desc: 'DssCheckbox · DssRadio · DssToggle · DssOptionGroup · DssSlider · DssRange' },
  { id: 'progresso',      title: '5. Progresso e Feedback',      desc: 'DssLinearProgress · DssCircularProgress · DssSkeleton · DssInnerLoading · DssAjaxBar' },
  { id: 'banners',        title: '6. Banners e Barras',          desc: 'DssBanner · DssBar' },
  { id: 'navegacao',      title: '7. Navegação',                 desc: 'DssTabs · DssTab · DssTabPanels · DssTabPanel · DssBreadcrumbs · DssBreadcrumbsEl · DssPagination · DssExpansionItem · DssMenu' },
  { id: 'stepper',        title: '8. Stepper',                   desc: 'DssStepper · DssStep' },
  { id: 'listas',         title: '9. Listas e Estrutura',        desc: 'DssList · DssItem · DssItemSection · DssItemLabel · DssSlideItem · DssSeparator · DssSpace' },
  { id: 'cartoes',        title: '10. Cartões e Superfícies',    desc: 'DssCard · DssToolbar · DssToolbarTitle · DssMarkupTable' },
  { id: 'timeline',       title: '11. Timeline',                 desc: 'DssTimeline · DssTimelineEntry' },
  { id: 'arvore',         title: '12. Árvore',                   desc: 'DssTree' },
  { id: 'midia',          title: '13. Mídia e Scroll',           desc: 'DssImg · DssScrollArea · DssSplitter' },
  { id: 'layout',         title: '14. Layout Estrutural',        desc: 'DssLayout · DssHeader · DssDrawer · DssPageContainer · DssPage · DssPageSticky · DssPageScroller · DssFooter' },
  { id: 'contextuais',    title: '15. Componentes Contextuais',  desc: 'Componentes que requerem interação, dados externos ou contexto específico' },
]

// ── Agrupar metas por previewGroup ────────────────────────────────────────────
const grouped = computed(() => {
  const map: Record<string, any[]> = {}
  for (const g of GROUPS) map[g.id] = []
  for (const meta of allMetas) {
    const group = (meta as any).previewGroup
    if (map[group]) {
      map[group].push(meta)
    }
  }
  return map
})

// ── Brand switcher ────────────────────────────────────────────────────────────
const brands = [
  { label: 'Neutro', value: '' },
  { label: 'Hub',    value: 'hub' },
  { label: 'Water',  value: 'water' },
  { label: 'Waste',  value: 'waste' },
]
const activeBrand = ref('')
</script>

<style scoped>
/* ── Estrutura da página ─────────────────────────────────────────────────── */
.preview-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: var(--dss-surface-subtle);
}

.preview-header {
  flex-shrink: 0;
}

/* ── Brand nav ───────────────────────────────────────────────────────────── */
.brand-nav {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-1);
}

.brand-nav__label {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-subtle);
  margin-right: var(--dss-spacing-1);
}

/* brand-chip: DssChip como seletor de brand — sobrescreve cor de seleção por brand */
.brand-chip--hub.dss-chip--selected    { --q-color-primary: var(--dss-hub-600); }
.brand-chip--water.dss-chip--selected  { --q-color-primary: var(--dss-water-500); }
.brand-chip--waste.dss-chip--selected  { --q-color-primary: var(--dss-waste-600); }
.brand-chip--none.dss-chip--selected   { --q-color-primary: var(--dss-gray-700); }

/* ── Conteúdo principal ──────────────────────────────────────────────────── */
.preview-main {
  flex: 1;
  overflow-y: auto;
  /* Dual-fallback: inspector var → DSS token. Em produção sempre usa o token. */
  padding: var(--dss-layout-padding-y, var(--dss-spacing-4)) var(--dss-layout-padding-x, var(--dss-spacing-4));
}

/* __body: controla max-width e centralização via inspector */
.preview__body {
  max-width: var(--dss-layout-max-width, 100%);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  /* SEM container-type: inline-size — evita travar DssAjaxBar (position:fixed) na seção 15 */
}

/* __sections: flex coluna com gap controlado pelo inspector */
.preview__sections {
  display: flex;
  flex-direction: column;
  gap: var(--dss-layout-gap-y, var(--dss-spacing-4));
  /* Margin lateral controlada pelo inspector */
  margin: 0 var(--dss-layout-margin-x, 0);
}

/* ── Grupo (card wrapper) ────────────────────────────────────────────────── */
.preview-group {
  width: 100%;
}

.group-header {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1);
}

.group-title {
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  line-height: var(--dss-line-height-tight);
}

.group-desc {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  line-height: var(--dss-line-height-normal);
}

/* ── Grid de demos ───────────────────────────────────────────────────────── */
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  /* Dual-fallback: var de elemento (inspector) → token DSS */
  gap: var(--dss-layout-gap-x, var(--dss-spacing-4));
}

.demo-grid--wide {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--dss-layout-gap-x, var(--dss-spacing-4));
}

/* ── Célula de demo ──────────────────────────────────────────────────────── */
.demo-cell {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  min-width: 0;
}

.demo-cell--full {
  grid-column: 1 / -1;
}

/* ── Demo box ────────────────────────────────────────────────────────────── */
.demo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 72px;
  /* Dual-fallback: var de elemento (inspector) → token DSS */
  padding: var(--dss-layout-padding-y, var(--dss-spacing-3)) var(--dss-layout-padding-x, var(--dss-spacing-3));
  background-color: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  box-sizing: border-box;
}

/* Filhos não são esticados pelo flex pai — respeita dimensões naturais */
.demo-box > * {
  min-width: 0;
  flex-shrink: 0;
}

/* Estira para ocupar largura total da célula */
.demo-box--stretch {
  width: 100%;
  justify-content: flex-start;
}

/* Organiza filhos em coluna */
.demo-box--col {
  flex-direction: column;
  align-items: stretch;
  gap: var(--dss-spacing-3);
}

.demo-box--col > * {
  flex-shrink: unset;
}

/* Exibe estados lado a lado com gap */
.demo-box--gap {
  gap: var(--dss-spacing-3);
}

/* Alinha filhos pelo topo (timeline, tree, skeleton) */
.demo-box--start {
  align-items: flex-start;
}

/* Row de estados: repouso + marcado / off + on */
.demo-box--states {
  flex-direction: column;
  align-items: flex-start;
  gap: var(--dss-spacing-3);
  justify-content: flex-start;
}

/* Inline (DssSpace demo) */
.demo-box--inline {
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0;
}

/* Relativo para overlays */
.demo-box--relative {
  position: relative;
  min-height: 88px;
}

/* Fab: precisa de espaço para o botão expandido */
.demo-box--fab {
  min-height: 88px;
  position: relative;
  align-items: flex-end;
  justify-content: flex-start;
}

/* Remove padding interno para componentes que tem borda própria (tabs, etc.) */
.demo-box--flush {
  padding: 0;
  overflow: hidden;
}

/* Campo de formulário ocupa toda a largura da caixa */
.demo-field {
  width: 100%;
}

/* ── Label do componente ─────────────────────────────────────────────────── */
.demo-label {
  display: inline-block;
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  font-family: monospace;
  color: var(--dss-text-subtle);
  background-color: var(--dss-gray-100);
  padding: 2px var(--dss-spacing-2);
  border-radius: var(--dss-radius-sm);
  line-height: var(--dss-line-height-normal);
}

/* ── Nota (componente sem estado visual) ─────────────────────────────────── */
.demo-note {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  font-style: italic;
  text-align: center;
  line-height: var(--dss-line-height-normal);
  padding: var(--dss-spacing-1) var(--dss-spacing-2);
}

/* ── Tab panel ───────────────────────────────────────────────────────────── */
.tab-panel-content {
  padding: var(--dss-spacing-3);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
}

/* ── Stepper controls ────────────────────────────────────────────────────── */
.stepper-controls {
  display: flex;
  gap: var(--dss-spacing-2);
  justify-content: flex-end;
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
}

/* ── Skeleton ────────────────────────────────────────────────────────────── */
.skeleton-group {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  width: 100%;
}

.skeleton-rect {
  width: 100%;
  height: 48px;
  border-radius: var(--dss-radius-sm);
}

/* ── InnerLoading host ───────────────────────────────────────────────────── */
.inner-loading-host {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dss-text-subtle);
  font-size: var(--dss-font-size-sm);
  user-select: none;
}

/* ── Lista ───────────────────────────────────────────────────────────────── */
.list-sample {
  width: 100%;
  border-radius: var(--dss-radius-md);
}

/* ── Card interno (no demo do DssCard) ───────────────────────────────────── */
.card-sample {
  min-width: 160px;
}

.card-desc {
  margin: var(--dss-spacing-1) 0 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  line-height: var(--dss-line-height-normal);
}

/* ── Img ─────────────────────────────────────────────────────────────────── */
.img-sample {
  width: 240px;
  height: 140px;
  border-radius: var(--dss-radius-md);
  object-fit: cover;
}

/* ── ScrollArea ──────────────────────────────────────────────────────────── */
.scroll-sample {
  width: 100%;
  height: 136px;
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}

.scroll-row {
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  border-bottom: 1px solid var(--dss-gray-100);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
  line-height: var(--dss-line-height-normal);
  white-space: nowrap;
}

/* ── Splitter ────────────────────────────────────────────────────────────── */
.splitter-sample {
  width: 100%;
  height: 80px;
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.splitter-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  padding: var(--dss-spacing-2);
}

/* ── Space demo ──────────────────────────────────────────────────────────── */
.space-label {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  white-space: nowrap;
}

/* ── Layout Estrutural — mini-app frame ─────────────────────────────────── */
.layout-section-intro {
  padding-bottom: 0;
}

.layout-section-frame {
  padding-top: var(--dss-spacing-3);
}

.layout-app-frame {
  width: 100%;
  height: 560px;
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
  position: relative;
  background: var(--dss-surface-default);
}

.layout-dss {
  width: 100% !important;
  height: 100% !important;
}

.layout-drawer-header {
  background: var(--dss-surface-muted);
  min-height: 49px;
}

.layout-drawer-title {
  font-size: var(--dss-font-size-sm) !important;
  font-weight: var(--dss-font-weight-semibold);
}

.layout-page-header {
  margin-bottom: var(--dss-spacing-4);
}

.layout-page-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--dss-spacing-3);
  margin-top: var(--dss-spacing-2);
}

.layout-page-title {
  margin: 0;
  font-size: var(--dss-font-size-xl);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  line-height: var(--dss-line-height-tight);
}

.layout-stats-row {
  display: flex;
  gap: var(--dss-spacing-3);
  margin-bottom: var(--dss-spacing-4);
  flex-wrap: wrap;
}

.layout-stat-card {
  flex: 1;
  min-width: 100px;
}

.layout-stat-content {
  display: flex !important;
  align-items: center;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-3) !important;
}

.layout-stat-value {
  font-size: var(--dss-font-size-xl);
  font-weight: var(--dss-font-weight-bold);
  color: var(--dss-text-body);
  line-height: 1;
}

.layout-stat-label {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  margin-top: var(--dss-spacing-1);
}

.layout-records-list {
  border-radius: var(--dss-radius-sm);
}

.layout-footer-text {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

/* ── Relatório de implementação ─────────────────────────────────────────── */
.layout-report {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

.layout-report__title {
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
}

.layout-report__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--dss-spacing-2);
}

.layout-report__item {
  display: flex;
  align-items: flex-start;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  border-radius: var(--dss-radius-sm);
  font-size: var(--dss-font-size-xs);
  line-height: var(--dss-line-height-normal);
  border-left: var(--dss-border-width-thick) solid transparent;
}

.layout-report__item strong {
  display: block;
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  margin-bottom: var(--dss-spacing-0_5);
}

.layout-report__item span {
  color: var(--dss-text-subtle);
}

.layout-report__item--ok {
  background: var(--dss-surface-muted);
  border-left-color: var(--dss-feedback-success);
}

.layout-report__item--warn {
  background: var(--dss-surface-muted);
  border-left-color: var(--dss-feedback-warning);
}

.report-icon--ok {
  color: var(--dss-feedback-success);
  flex-shrink: 0;
  margin-top: var(--dss-spacing-px);
}

.report-icon--warn {
  color: var(--dss-feedback-warning);
  flex-shrink: 0;
  margin-top: var(--dss-spacing-px);
}

/* ── Contextuais — espaço acima do relatório ──────────────────────────────── */
.ctx-report {
  margin-top: var(--dss-spacing-5);
}

/* ── DssVirtualScroll ────────────────────────────────────────────────────── */
.ctx-vs-box {
  padding: 0;
  overflow: hidden;
}
.ctx-vs-list {
  width: 100%;
  height: 220px;
}
.ctx-vs-item {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  padding: 0 var(--dss-spacing-3);
  border-bottom: 1px solid var(--dss-gray-100);
  height: 36px;
  box-sizing: border-box;
}
.ctx-vs-icon {
  color: var(--dss-text-subtle);
  font-size: var(--dss-icon-size-xs) !important;
  flex-shrink: 0;
}
.ctx-vs-text {
  flex: 1;
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-body);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── DssInfiniteScroll ───────────────────────────────────────────────────── */
.ctx-inf-box {
  padding: 0;
  overflow: hidden;
}
.ctx-inf-wrapper {
  width: 100%;
  height: 240px;
  overflow-y: auto;
}
.ctx-inf-end {
  text-align: center;
  padding: var(--dss-spacing-3);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

/* ── DssParallax ─────────────────────────────────────────────────────────── */
.ctx-parallax-box {
  padding: 0;
  overflow: hidden;
}
.ctx-parallax {
  width: 100%;
}
.ctx-parallax-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  background: var(--dss-overlay-dark-medium);
  gap: var(--dss-spacing-1);
  padding: var(--dss-spacing-4);
}
.ctx-parallax-title {
  font-size: var(--dss-font-size-xl);
  font-weight: var(--dss-font-weight-bold);
  color: white;
  line-height: var(--dss-line-height-tight);
}
.ctx-parallax-sub {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-overlay-text-on-dark);
  text-align: center;
}

/* ── DssVideo ────────────────────────────────────────────────────────────── */
.ctx-video-box {
  padding: 0;
  overflow: hidden;
}
.ctx-video {
  width: 100%;
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

/* ── DssPullToRefresh ────────────────────────────────────────────────────── */
.ctx-pull-box {
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  gap: 0;
}
.ctx-pull-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--dss-spacing-1);
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  background: var(--dss-surface-muted);
  border-bottom: 1px solid var(--dss-gray-200);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}
.ctx-pull-icon {
  font-size: var(--dss-icon-size-xs) !important;
  color: var(--dss-text-subtle);
  flex-shrink: 0;
}
.ctx-pull-list {
  width: 100%;
}

/* ── DssField ────────────────────────────────────────────────────────────── */
.ctx-field-row {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
  width: 100%;
}
.ctx-field {
  width: 100%;
}
.ctx-field-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  padding: var(--dss-spacing-2) 0;
  line-height: var(--dss-line-height-normal);
}
.ctx-field-input--error {
  color: var(--dss-feedback-error);
}

/* ── DssResponsive ───────────────────────────────────────────────────────── */
.ctx-responsive-row {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  flex-wrap: wrap;
}
.ctx-responsive-row + .ctx-responsive-row {
  margin-top: var(--dss-spacing-2);
}
.ctx-responsive-label {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  white-space: nowrap;
}

/* ── DssAjaxBar ──────────────────────────────────────────────────────────── */
.ctx-ajax-controls {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  flex-wrap: wrap;
}
.ctx-ajax-badge {
  margin-left: auto;
}
</style>
