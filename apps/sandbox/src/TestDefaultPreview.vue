<template>
  <div
    class="dp-page"
    :data-brand="activeBrand || undefined"
    :data-theme="isDark ? 'dark' : undefined"
  >
    <!-- ═══════════════════════════════════════════════════════════════════
         HERO HEADER
    ═══════════════════════════════════════════════════════════════════ -->
    <header class="dp-hero">
      <div class="dp-hero__inner">
        <div class="dp-hero__top">
          <div class="dp-hero__brand">
            <span class="dp-hero__logo" aria-hidden="true">◈</span>
            <div>
              <h1 class="dp-hero__title">Defaults Preview</h1>
              <p class="dp-hero__subtitle">
                Componentes DSS renderizados a partir da governança —
                <code>dss.meta.json → defaultPreview</code>
              </p>
            </div>
          </div>

          <div class="dp-hero__actions">
            <button
              type="button"
              class="dp-icon-btn"
              :aria-pressed="density === 'compact'"
              :title="density === 'compact' ? 'Modo confortável' : 'Modo compacto'"
              @click="toggleDensity"
            >
              <span class="material-icons">
                {{ density === 'compact' ? 'view_comfy' : 'view_compact' }}
              </span>
            </button>
            <button
              type="button"
              class="dp-icon-btn"
              :aria-pressed="isDark"
              :title="isDark ? 'Modo claro' : 'Modo escuro'"
              @click="isDark = !isDark"
            >
              <span class="material-icons">
                {{ isDark ? 'light_mode' : 'dark_mode' }}
              </span>
            </button>
          </div>
        </div>

        <!-- Stats row -->
        <div class="dp-stats">
          <div class="dp-stat">
            <span class="dp-stat__value">{{ allMetas.length }}</span>
            <span class="dp-stat__label">Componentes</span>
          </div>
          <div class="dp-stat">
            <span class="dp-stat__value">{{ activeGroupsCount }}</span>
            <span class="dp-stat__label">Grupos ativos</span>
          </div>
          <div class="dp-stat">
            <span class="dp-stat__value">{{ visibleCount }}</span>
            <span class="dp-stat__label">Visíveis</span>
          </div>
          <div class="dp-stat dp-stat--brand">
            <span class="dp-stat__value">{{ activeBrandLabel }}</span>
            <span class="dp-stat__label">Brand ativa</span>
          </div>
        </div>

        <!-- Controls -->
        <div class="dp-controls">
          <div class="dp-search">
            <span class="material-icons dp-search__icon">search</span>
            <input
              v-model="query"
              type="search"
              placeholder="Buscar componente (ex: DssButton, Avatar, Chip…)"
              class="dp-search__input"
              aria-label="Filtrar componentes"
            />
            <button
              v-if="query"
              class="dp-search__clear"
              type="button"
              aria-label="Limpar busca"
              @click="query = ''"
            >
              <span class="material-icons">close</span>
            </button>
          </div>

          <div class="dp-brand-pills" role="radiogroup" aria-label="Selecionar brand">
            <button
              v-for="b in brands"
              :key="b.value || 'neutral'"
              type="button"
              role="radio"
              :aria-checked="activeBrand === b.value"
              :class="['dp-pill', `dp-pill--${b.value || 'neutral'}`, { 'is-active': activeBrand === b.value }]"
              @click="activeBrand = b.value"
            >
              <span class="dp-pill__dot" aria-hidden="true"></span>
              {{ b.label }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- ═══════════════════════════════════════════════════════════════════
         BODY: NAV LATERAL + GRID DE GRUPOS
    ═══════════════════════════════════════════════════════════════════ -->
    <div class="dp-body">

      <!-- Sticky section navigation -->
      <aside class="dp-nav" aria-label="Navegação por seção">
        <div class="dp-nav__title">Seções</div>
        <ul class="dp-nav__list">
          <li v-for="g in GROUPS" :key="g.id">
            <a
              :href="`#dp-${g.id}`"
              :class="['dp-nav__link', { 'is-empty': !grouped[g.id]?.length, 'is-active': activeSection === g.id }]"
              @click.prevent="scrollTo(g.id)"
            >
              <span class="dp-nav__index">{{ g.index }}</span>
              <span class="dp-nav__name">{{ g.shortTitle }}</span>
              <span class="dp-nav__count">{{ grouped[g.id]?.length || 0 }}</span>
            </a>
          </li>
        </ul>
      </aside>

      <!-- Sections -->
      <main class="dp-main" :data-density="density">
        <template v-for="group in GROUPS" :key="group.id">
          <section
            v-if="visibleGrouped[group.id]?.length || !query"
            :id="`dp-${group.id}`"
            class="dp-section"
          >
            <div class="dp-section__head">
              <div class="dp-section__heading">
                <span class="dp-section__index">{{ group.index }}</span>
                <div>
                  <h2 class="dp-section__title">{{ group.shortTitle }}</h2>
                  <p class="dp-section__desc">{{ group.desc }}</p>
                </div>
              </div>
              <div class="dp-section__badge">
                {{ visibleGrouped[group.id]?.length || 0 }}
                <span>/ {{ grouped[group.id]?.length || 0 }}</span>
              </div>
            </div>

            <div class="dp-grid">
              <article
                v-for="meta in visibleGrouped[group.id]"
                :key="meta.component"
                class="dp-card"
                :title="meta.component"
              >
                <div class="dp-card__stage">
                  <DemoRenderer :meta="meta" />
                </div>
                <footer class="dp-card__footer">
                  <code class="dp-card__name">{{ meta.component }}</code>
                  <span
                    v-if="meta.status"
                    :class="['dp-card__status', `is-${meta.status}`]"
                  >{{ meta.status }}</span>
                </footer>
              </article>

              <div
                v-if="!visibleGrouped[group.id] || visibleGrouped[group.id].length === 0"
                class="dp-empty"
              >
                <span class="material-icons">inbox</span>
                <p v-if="query">Nenhum componente corresponde a "<strong>{{ query }}</strong>"</p>
                <p v-else>Nenhum componente neste grupo ainda</p>
              </div>
            </div>
          </section>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import DemoRenderer from './DemoRenderer.vue'

// ── Carregar todos os dss.meta.json via import.meta.glob ──────────────────
const rawMetas = import.meta.glob(
  '../../../packages/core/components/**/dss.meta.json',
  { eager: true }
)

const allMetas = Object.values(rawMetas)
  .map((m: any) => m.default || m)
  .filter((m: any) => m.component && m.previewGroup)

// ── 15 grupos canônicos ───────────────────────────────────────────────────
const GROUPS = [
  { id: 'acoes',          index: '01', shortTitle: 'Ações',                     desc: 'Botões, chips, FAB e disparadores de comandos.' },
  { id: 'indicadores',    index: '02', shortTitle: 'Indicadores e Avatares',    desc: 'Status, avatares, ícones, ratings e tooltips.' },
  { id: 'form-campos',    index: '03', shortTitle: 'Formulários — Campos',      desc: 'Entrada de dados textuais e seleção.' },
  { id: 'form-controles', index: '04', shortTitle: 'Formulários — Controles',   desc: 'Checkbox, radio, toggle, sliders e range.' },
  { id: 'progresso',      index: '05', shortTitle: 'Progresso e Feedback',      desc: 'Progress bars, skeletons e loaders.' },
  { id: 'banners',        index: '06', shortTitle: 'Banners e Barras',          desc: 'Mensagens persistentes e barras de aviso.' },
  { id: 'navegacao',      index: '07', shortTitle: 'Navegação',                 desc: 'Tabs, breadcrumbs, paginação, expansion e menus.' },
  { id: 'stepper',        index: '08', shortTitle: 'Stepper',                   desc: 'Fluxos passo a passo.' },
  { id: 'listas',         index: '09', shortTitle: 'Listas e Estrutura',        desc: 'Listas, itens, separadores e espaçadores.' },
  { id: 'cartoes',        index: '10', shortTitle: 'Cartões e Superfícies',     desc: 'Cards, toolbars e tabelas de marcação.' },
  { id: 'timeline',       index: '11', shortTitle: 'Timeline',                  desc: 'Linhas do tempo e eventos cronológicos.' },
  { id: 'arvore',         index: '12', shortTitle: 'Árvore',                    desc: 'Estruturas hierárquicas expansíveis.' },
  { id: 'midia',          index: '13', shortTitle: 'Mídia e Scroll',            desc: 'Imagens, áreas de scroll e splitters.' },
  { id: 'layout',         index: '14', shortTitle: 'Layout Estrutural',         desc: 'Layout, header, drawer, page e footer.' },
  { id: 'contextuais',    index: '15', shortTitle: 'Componentes Contextuais',   desc: 'Componentes que requerem interação ou dados externos.' },
]

// ── Brand switcher ───────────────────────────────────────────────────────
const brands = [
  { label: 'Neutro', value: '' },
  { label: 'Hub',    value: 'hub' },
  { label: 'Water',  value: 'water' },
  { label: 'Waste',  value: 'waste' },
]
const activeBrand = ref('')
const activeBrandLabel = computed(() =>
  brands.find(b => b.value === activeBrand.value)?.label || 'Neutro'
)

// ── Estado da UI ─────────────────────────────────────────────────────────
const isDark = ref(false)
const density = ref<'comfortable' | 'compact'>('comfortable')
const query = ref('')
const activeSection = ref<string>('acoes')

function toggleDensity() {
  density.value = density.value === 'compact' ? 'comfortable' : 'compact'
}

// ── Agrupar e filtrar ────────────────────────────────────────────────────
const grouped = computed(() => {
  const map: Record<string, any[]> = {}
  for (const g of GROUPS) map[g.id] = []
  for (const meta of allMetas) {
    const g = (meta as any).previewGroup
    if (map[g]) map[g].push(meta)
  }
  // ordena alfabeticamente dentro do grupo
  for (const k in map) map[k].sort((a, b) => a.component.localeCompare(b.component))
  return map
})

const visibleGrouped = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return grouped.value
  const map: Record<string, any[]> = {}
  for (const g of GROUPS) {
    map[g.id] = grouped.value[g.id].filter(m =>
      m.component.toLowerCase().includes(q)
    )
  }
  return map
})

const visibleCount = computed(() =>
  Object.values(visibleGrouped.value).reduce((sum, arr) => sum + arr.length, 0)
)

const activeGroupsCount = computed(() =>
  GROUPS.filter(g => (grouped.value[g.id]?.length || 0) > 0).length
)

// ── Scroll suave + observar seção ativa ──────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(`dp-${id}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  activeSection.value = id
}

let observer: IntersectionObserver | null = null
onMounted(async () => {
  await nextTick()
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) {
        const id = (visible.target as HTMLElement).id.replace('dp-', '')
        if (id) activeSection.value = id
      }
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
  )
  GROUPS.forEach(g => {
    const el = document.getElementById(`dp-${g.id}`)
    if (el) observer!.observe(el)
  })
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════════
   ESTRUTURA RAIZ
═══════════════════════════════════════════════════════════════════════ */
.dp-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background: var(--dss-surface-subtle);
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  transition: background-color .25s ease, color .25s ease;
  scroll-behavior: smooth;
}

/* ═══════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════ */
.dp-hero {
  position: sticky;
  top: 0;
  z-index: 20;
  background: linear-gradient(180deg,
    var(--dss-surface-default) 0%,
    var(--dss-surface-default) 60%,
    color-mix(in srgb, var(--dss-surface-default) 92%, transparent) 100%);
  border-bottom: 1px solid var(--dss-gray-200);
  backdrop-filter: saturate(140%) blur(8px);
}

.dp-hero__inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--dss-spacing-5) var(--dss-spacing-6) var(--dss-spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
}

.dp-hero__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--dss-spacing-4);
  flex-wrap: wrap;
}

.dp-hero__brand {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
}

.dp-hero__logo {
  font-size: 2.25rem;
  line-height: 1;
  background: linear-gradient(135deg,
    var(--dss-brand-primary, var(--dss-hub-600)),
    var(--dss-water-500));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px color-mix(in srgb, var(--dss-hub-600) 30%, transparent));
}

.dp-hero__title {
  font-size: var(--dss-font-size-2xl, 1.5rem);
  font-weight: var(--dss-font-weight-bold);
  margin: 0;
  line-height: var(--dss-line-height-tight);
  letter-spacing: -0.01em;
}

.dp-hero__subtitle {
  margin: 2px 0 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}
.dp-hero__subtitle code {
  font-family: var(--dss-font-family-mono, monospace);
  font-size: 0.85em;
  background: var(--dss-surface-muted);
  padding: 1px 6px;
  border-radius: var(--dss-radius-sm);
}

.dp-hero__actions {
  display: flex;
  gap: var(--dss-spacing-2);
}

.dp-icon-btn {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--dss-radius-md);
  border: 1px solid var(--dss-gray-200);
  background: var(--dss-surface-default);
  color: var(--dss-text-body);
  cursor: pointer;
  transition: all .18s ease;
}
.dp-icon-btn:hover {
  background: var(--dss-surface-muted);
  border-color: var(--dss-gray-300);
  transform: translateY(-1px);
}
.dp-icon-btn:active { transform: translateY(0); }
.dp-icon-btn[aria-pressed="true"] {
  background: var(--dss-surface-muted);
  border-color: var(--dss-gray-400);
}
.dp-icon-btn .material-icons { font-size: 20px; }

/* ── Stats ─────────────────────────────────────────────────────────────── */
.dp-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--dss-spacing-3);
}
.dp-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  background: var(--dss-surface-muted);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  transition: transform .2s ease, box-shadow .2s ease;
}
.dp-stat:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px color-mix(in srgb, var(--dss-gray-900) 8%, transparent);
}
.dp-stat__value {
  font-size: 1.5rem;
  font-weight: var(--dss-font-weight-bold);
  line-height: 1;
  color: var(--dss-text-body);
}
.dp-stat__label {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.dp-stat--brand .dp-stat__value { font-size: 1.125rem; padding-top: 4px; }

/* ── Controls ──────────────────────────────────────────────────────────── */
.dp-controls {
  display: flex;
  gap: var(--dss-spacing-3);
  align-items: center;
  flex-wrap: wrap;
}

.dp-search {
  position: relative;
  flex: 1 1 280px;
  min-width: 240px;
}
.dp-search__icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--dss-text-subtle);
  font-size: 20px !important;
  pointer-events: none;
}
.dp-search__input {
  width: 100%;
  height: 40px;
  padding: 0 40px 0 40px;
  border-radius: var(--dss-radius-md);
  border: 1px solid var(--dss-gray-300);
  background: var(--dss-surface-default);
  color: var(--dss-text-body);
  font-size: var(--dss-font-size-sm);
  font-family: inherit;
  transition: border-color .18s ease, box-shadow .18s ease;
}
.dp-search__input::placeholder { color: var(--dss-text-subtle); }
.dp-search__input:focus {
  outline: none;
  border-color: var(--dss-hub-600);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dss-hub-600) 18%, transparent);
}
.dp-search__clear {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--dss-radius-sm);
  border: none;
  background: transparent;
  color: var(--dss-text-subtle);
  cursor: pointer;
}
.dp-search__clear:hover { background: var(--dss-surface-muted); color: var(--dss-text-body); }
.dp-search__clear .material-icons { font-size: 18px; }

/* Brand pills */
.dp-brand-pills {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: var(--dss-surface-muted);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}
.dp-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  background: transparent;
  border-radius: var(--dss-radius-sm);
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-subtle);
  cursor: pointer;
  transition: all .18s ease;
}
.dp-pill:hover { color: var(--dss-text-body); }
.dp-pill.is-active {
  background: var(--dss-surface-default);
  color: var(--dss-text-body);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--dss-gray-900) 12%, transparent);
}
.dp-pill__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dss-gray-400);
}
.dp-pill--hub   .dp-pill__dot { background: var(--dss-hub-600); }
.dp-pill--water .dp-pill__dot { background: var(--dss-water-500); }
.dp-pill--waste .dp-pill__dot { background: var(--dss-waste-600); }

/* ═══════════════════════════════════════════════════════════════════════
   BODY: NAV + MAIN
═══════════════════════════════════════════════════════════════════════ */
.dp-body {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: var(--dss-spacing-5) var(--dss-spacing-6) var(--dss-spacing-8);
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: var(--dss-spacing-5);
  align-items: flex-start;
}

@media (max-width: 960px) {
  .dp-body { grid-template-columns: 1fr; }
  .dp-nav { display: none; }
}

/* ── NAV LATERAL ───────────────────────────────────────────────────────── */
.dp-nav {
  position: sticky;
  top: 240px; /* abaixo do hero */
  align-self: start;
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-lg, var(--dss-radius-md));
  padding: var(--dss-spacing-3);
  max-height: calc(100vh - 260px);
  overflow-y: auto;
}
.dp-nav__title {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--dss-text-subtle);
  padding: var(--dss-spacing-2);
  margin-bottom: 4px;
}
.dp-nav__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.dp-nav__link {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: var(--dss-radius-sm);
  text-decoration: none;
  color: var(--dss-text-body);
  font-size: var(--dss-font-size-sm);
  transition: background-color .15s ease, color .15s ease;
  cursor: pointer;
  position: relative;
}
.dp-nav__link:hover { background: var(--dss-surface-muted); }
.dp-nav__link.is-active {
  background: color-mix(in srgb, var(--dss-hub-600) 10%, transparent);
  color: var(--dss-text-body);
  font-weight: var(--dss-font-weight-semibold);
}
.dp-nav__link.is-active::before {
  content: "";
  position: absolute;
  left: -3px; top: 8px; bottom: 8px;
  width: 3px;
  border-radius: 3px;
  background: var(--dss-hub-600);
}
.dp-nav__link.is-empty { opacity: 0.4; }
.dp-nav__index {
  font-size: 10px;
  font-weight: var(--dss-font-weight-bold);
  color: var(--dss-text-subtle);
  font-family: var(--dss-font-family-mono, monospace);
}
.dp-nav__name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dp-nav__count {
  font-size: 10px;
  background: var(--dss-surface-muted);
  color: var(--dss-text-subtle);
  padding: 2px 7px;
  border-radius: 999px;
  min-width: 22px;
  text-align: center;
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN — SECTIONS
═══════════════════════════════════════════════════════════════════════ */
.dp-main {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
  min-width: 0;
}

.dp-section {
  scroll-margin-top: 260px;
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-lg, 14px);
  padding: var(--dss-spacing-5);
  animation: dp-fade-up .35s ease both;
}

@keyframes dp-fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.dp-section__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--dss-spacing-4);
  margin-bottom: var(--dss-spacing-4);
  padding-bottom: var(--dss-spacing-3);
  border-bottom: 1px dashed var(--dss-gray-200);
}
.dp-section__heading {
  display: flex;
  gap: var(--dss-spacing-3);
  align-items: flex-start;
}
.dp-section__index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--dss-radius-sm);
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--dss-hub-600) 18%, transparent),
    color-mix(in srgb, var(--dss-water-500) 18%, transparent));
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-mono, monospace);
  font-weight: var(--dss-font-weight-bold);
  font-size: var(--dss-font-size-sm);
}
.dp-section__title {
  margin: 0;
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold);
  line-height: 1.2;
}
.dp-section__desc {
  margin: 4px 0 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  max-width: 64ch;
}
.dp-section__badge {
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-semibold);
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--dss-surface-muted);
  color: var(--dss-text-body);
  white-space: nowrap;
}
.dp-section__badge span {
  font-weight: var(--dss-font-weight-regular);
  color: var(--dss-text-subtle);
}

/* ── GRID DE CARDS ─────────────────────────────────────────────────────── */
.dp-grid {
  display: grid;
  gap: var(--dss-spacing-3);
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
.dp-main[data-density="comfortable"] .dp-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--dss-spacing-4);
}

.dp-card {
  display: flex;
  flex-direction: column;
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
  transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.dp-card:hover {
  transform: translateY(-2px);
  border-color: var(--dss-gray-300);
  box-shadow:
    0 1px 2px color-mix(in srgb, var(--dss-gray-900) 6%, transparent),
    0 8px 24px color-mix(in srgb, var(--dss-gray-900) 8%, transparent);
}

.dp-card__stage {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 96px;
  padding: var(--dss-spacing-4);
  background:
    linear-gradient(var(--dss-surface-subtle), var(--dss-surface-subtle)),
    repeating-linear-gradient(45deg,
      transparent 0 8px,
      color-mix(in srgb, var(--dss-gray-300) 8%, transparent) 8px 9px);
  transform: translateZ(0); /* containing block para position:fixed */
  overflow: hidden;
}
.dp-main[data-density="compact"] .dp-card__stage {
  min-height: 72px;
  padding: var(--dss-spacing-3);
}
.dp-card__stage > * { flex-shrink: 0; }

.dp-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  border-top: 1px solid var(--dss-gray-200);
  background: var(--dss-surface-default);
}
.dp-card__name {
  font-family: var(--dss-font-family-mono, monospace);
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-body);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dp-card__status {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  border-radius: var(--dss-radius-sm);
  background: var(--dss-surface-muted);
  color: var(--dss-text-subtle);
}
.dp-card__status.is-approved {
  background: color-mix(in srgb, var(--dss-feedback-success) 15%, transparent);
  color: var(--dss-feedback-success);
}

/* Empty state */
.dp-empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-6);
  border: 1px dashed var(--dss-gray-300);
  border-radius: var(--dss-radius-md);
  color: var(--dss-text-subtle);
  font-size: var(--dss-font-size-sm);
}
.dp-empty .material-icons { font-size: 32px; opacity: 0.5; }
.dp-empty strong { color: var(--dss-text-body); }

/* ═══════════════════════════════════════════════════════════════════════
   DARK MODE — overrides explícitos onde tokens não cobrem totalmente
═══════════════════════════════════════════════════════════════════════ */
.dp-page[data-theme="dark"] {
  background: var(--dss-surface-subtle, #0f1115);
}
.dp-page[data-theme="dark"] .dp-card__stage {
  background:
    linear-gradient(var(--dss-surface-subtle), var(--dss-surface-subtle)),
    repeating-linear-gradient(45deg,
      transparent 0 8px,
      color-mix(in srgb, var(--dss-gray-100) 14%, transparent) 8px 9px);
}

/* ═══════════════════════════════════════════════════════════════════════
   RESPONSIVO
═══════════════════════════════════════════════════════════════════════ */
@media (max-width: 640px) {
  .dp-hero__inner { padding: var(--dss-spacing-4) var(--dss-spacing-3); }
  .dp-body { padding: var(--dss-spacing-3); }
  .dp-section { padding: var(--dss-spacing-3); }
  .dp-stat__value { font-size: 1.25rem; }
  .dp-section__index { width: 32px; height: 32px; }
  .dp-grid { grid-template-columns: 1fr 1fr !important; gap: var(--dss-spacing-2) !important; }
}

@media (prefers-reduced-motion: reduce) {
  .dp-page, .dp-section, .dp-card, .dp-stat, .dp-icon-btn { animation: none !important; transition: none !important; }
}
</style>
