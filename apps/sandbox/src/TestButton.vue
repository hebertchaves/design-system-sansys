<template>
  <div
    class="tb-page"
    :data-brand="activeBrand || undefined"
    :data-theme="isDark ? 'dark' : undefined"
  >
    <!-- ══════════════════════════════════════════════════════════════════
         HERO HEADER (sticky)
    ══════════════════════════════════════════════════════════════════ -->
    <header class="tb-hero">
      <div class="tb-hero__inner">
        <div class="tb-hero__top">
          <div class="tb-hero__brand">
            <span class="tb-hero__logo" aria-hidden="true">◉</span>
            <div>
              <h1 class="tb-hero__title">DssButton — Playground</h1>
              <p class="tb-hero__subtitle">
                Componente <code>DssButton</code> renderizado a partir do contrato canônico
                — <code>packages/core/components/base/DssButton</code>
              </p>
            </div>
          </div>

          <div class="tb-hero__actions">
            <button
              type="button"
              class="tb-icon-btn"
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
              class="tb-icon-btn"
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

        <!-- Stats -->
        <div class="tb-stats">
          <div class="tb-stat">
            <span class="tb-stat__value">{{ SECTIONS.length }}</span>
            <span class="tb-stat__label">Seções</span>
          </div>
          <div class="tb-stat">
            <span class="tb-stat__value">{{ VARIANTS.length }}</span>
            <span class="tb-stat__label">Variantes</span>
          </div>
          <div class="tb-stat">
            <span class="tb-stat__value">{{ COLORS.length }}</span>
            <span class="tb-stat__label">Cores semânticas</span>
          </div>
          <div class="tb-stat">
            <span class="tb-stat__value">{{ SIZES.length }}</span>
            <span class="tb-stat__label">Tamanhos</span>
          </div>
          <div class="tb-stat tb-stat--brand">
            <span class="tb-stat__value">{{ activeBrandLabel }}</span>
            <span class="tb-stat__label">Brand ativa</span>
          </div>
        </div>

        <!-- Controls -->
        <div class="tb-controls">
          <div class="tb-search">
            <span class="material-icons tb-search__icon">search</span>
            <input
              v-model="query"
              type="search"
              placeholder="Buscar seção (ex: variantes, brand, ícones…)"
              class="tb-search__input"
              aria-label="Filtrar seções"
            />
            <button
              v-if="query"
              class="tb-search__clear"
              type="button"
              aria-label="Limpar busca"
              @click="query = ''"
            >
              <span class="material-icons">close</span>
            </button>
          </div>

          <div class="tb-brand-pills" role="radiogroup" aria-label="Selecionar brand">
            <button
              v-for="b in brands"
              :key="b.value || 'neutral'"
              type="button"
              role="radio"
              :aria-checked="activeBrand === b.value"
              :class="['tb-pill', `tb-pill--${b.value || 'neutral'}`, { 'is-active': activeBrand === b.value }]"
              @click="activeBrand = b.value"
            >
              <span class="tb-pill__dot" aria-hidden="true"></span>
              {{ b.label }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- ══════════════════════════════════════════════════════════════════
         BODY: SIDEBAR + MAIN
    ══════════════════════════════════════════════════════════════════ -->
    <div class="tb-body">

      <!-- Sticky sidebar -->
      <aside class="tb-nav" aria-label="Navegação por seção">
        <div class="tb-nav__title">Seções</div>
        <ul class="tb-nav__list">
          <li v-for="s in SECTIONS" :key="s.id">
            <a
              :href="`#tb-${s.id}`"
              :class="['tb-nav__link', {
                'is-hidden': !visibleIds.has(s.id),
                'is-active': activeSection === s.id
              }]"
              @click.prevent="scrollTo(s.id)"
            >
              <span class="tb-nav__index">{{ s.index }}</span>
              <span class="tb-nav__name">{{ s.title }}</span>
            </a>
          </li>
        </ul>
      </aside>

      <main class="tb-main test-content" :data-density="density">

        <!-- ── 01. Variantes ───────────────────────────────────────────── -->
        <section v-if="visibleIds.has('variantes')" id="tb-variantes" class="tb-section">
          <SectionHead index="01" title="Variantes Visuais" :count="VARIANTS.length"
            desc="6 variantes (elevated, flat, outline, unelevated, push, glossy) controladas pela prop variant." />
          <div class="tb-grid">
            <DemoTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`">
              <DssButton :variant="v" color="primary" :label="capitalize(v)" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 02. Cores ───────────────────────────────────────────────── -->
        <section v-if="visibleIds.has('cores')" id="tb-cores" class="tb-section">
          <SectionHead index="02" title="Cores Semânticas" :count="COLORS.length"
            desc="Aplicação via prop color — tokens semânticos DSS, não hex." />
          <div class="tb-grid">
            <DemoTile v-for="c in COLORS" :key="c" :code="`color=&quot;${c}&quot;`">
              <DssButton :color="c" :label="capitalize(c)" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 03. Tamanhos ────────────────────────────────────────────── -->
        <section v-if="visibleIds.has('tamanhos')" id="tb-tamanhos" class="tb-section">
          <SectionHead index="03" title="Tamanhos" :count="SIZES.length"
            desc="Touch-target ≥ 44px (WCAG 2.5.5) via tokens --dss-touch-target-*." />
          <div class="tb-grid tb-grid--align-center">
            <DemoTile v-for="s in SIZES" :key="s" :code="`size=&quot;${s}&quot;`">
              <DssButton :size="s" :label="`Size ${s.toUpperCase()}`" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 04. Ícones ──────────────────────────────────────────────── -->
        <section v-if="visibleIds.has('icones')" id="tb-icones" class="tb-section">
          <SectionHead index="04" title="Ícones Material" :count="5"
            desc="Props icon e iconRight aceitam qualquer Material Icon." />
          <div class="tb-grid">
            <DemoTile code='icon="favorite"'>
              <DssButton icon="favorite" label="Curtir" />
            </DemoTile>
            <DemoTile code='icon-right="send"'>
              <DssButton icon-right="send" label="Enviar" />
            </DemoTile>
            <DemoTile code="icon + icon-right">
              <DssButton icon="arrow_back" icon-right="arrow_forward" label="Navegar" />
            </DemoTile>
            <DemoTile code="icon only">
              <DssButton icon="star" aria-label="Favoritar" />
            </DemoTile>
            <DemoTile code="icon only negative">
              <DssButton icon="delete" color="negative" aria-label="Excluir" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 05. Estados ─────────────────────────────────────────────── -->
        <section v-if="visibleIds.has('estados')" id="tb-estados" class="tb-section">
          <SectionHead index="05" title="Estados" :count="4"
            desc="loading, disabled, hover/focus visíveis — tabindex computado." />
          <div class="tb-grid">
            <DemoTile code=":loading=&quot;true&quot;">
              <DssButton :loading="true" label="Carregando" />
            </DemoTile>
            <DemoTile code=":disabled=&quot;true&quot;">
              <DssButton :disabled="true" label="Desabilitado" />
            </DemoTile>
            <DemoTile code="loading + icon">
              <DssButton :loading="true" icon="cloud_upload" label="Enviando" />
            </DemoTile>
            <DemoTile code="disabled + icon">
              <DssButton :disabled="true" icon="lock" label="Bloqueado" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 06. Loading com percentage ──────────────────────────────── -->
        <section v-if="visibleIds.has('progresso')" id="tb-progresso" class="tb-section">
          <SectionHead index="06" title="Loading com Progress Bar" :count="5"
            desc="percentage (0-100) renderiza barra de progresso interna." />
          <div class="tb-grid">
            <DemoTile code='percentage="25"'>
              <DssButton :loading="true" :percentage="25" label="25%" />
            </DemoTile>
            <DemoTile code='percentage="50"'>
              <DssButton :loading="true" :percentage="50" color="info" label="50%" />
            </DemoTile>
            <DemoTile code='percentage="75"'>
              <DssButton :loading="true" :percentage="75" color="positive" label="75%" />
            </DemoTile>
            <DemoTile code='percentage="100"'>
              <DssButton :loading="true" :percentage="100" color="positive" label="100%" />
            </DemoTile>
            <DemoTile code="dark-percentage">
              <DssButton :loading="true" :percentage="65" dark-percentage label="65% dark" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 07. Layout: align ───────────────────────────────────────── -->
        <section v-if="visibleIds.has('align')" id="tb-align" class="tb-section">
          <SectionHead index="07" title="Layout — Align" :count="ALIGNS.length"
            desc="Alinhamento horizontal do conteúdo (largura fixa para evidenciar)." />
          <div class="tb-grid">
            <DemoTile v-for="a in ALIGNS" :key="a" :code="`align=&quot;${a}&quot;`">
              <DssButton
                :align="a"
                icon="save"
                icon-right="cloud"
                :label="capitalize(a)"
                style="width: 240px;"
              />
            </DemoTile>
          </div>
        </section>

        <!-- ── 08. Layout: stack / stretch / no-wrap ───────────────────── -->
        <section v-if="visibleIds.has('layout')" id="tb-layout" class="tb-section">
          <SectionHead index="08" title="Layout — Stack, Stretch & No-Wrap" :count="4"
            desc="Modificadores estruturais para layouts verticais e full-width." />
          <div class="tb-grid">
            <DemoTile code="stack icon">
              <DssButton stack icon="cloud_upload" label="Upload" />
            </DemoTile>
            <DemoTile code="stack + color">
              <DssButton stack icon="download" label="Download" color="info" />
            </DemoTile>
            <DemoTile code="no-wrap (ellipsis)">
              <DssButton no-wrap label="Texto longo demais para caber" style="max-width: 160px;" />
            </DemoTile>
          </div>
          <div class="tb-grid tb-grid--one">
            <DemoTile code="stretch (full-width)">
              <DssButton stretch label="Botão full-width" />
            </DemoTile>
            <DemoTile code="stretch + align + icons">
              <DssButton stretch align="between" icon="save" icon-right="cloud" label="Salvar na nuvem" color="primary" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 09. Formas e modificadores ──────────────────────────────── -->
        <section v-if="visibleIds.has('formas')" id="tb-formas" class="tb-section">
          <SectionHead index="09" title="Formas & Modificadores" :count="6"
            desc="round, square, dense, no-caps e padding custom." />
          <div class="tb-grid">
            <DemoTile code="round">
              <DssButton round label="Round" />
            </DemoTile>
            <DemoTile code="square">
              <DssButton square label="Square" />
            </DemoTile>
            <DemoTile code="round icon">
              <DssButton round icon="favorite" aria-label="Curtir" />
            </DemoTile>
            <DemoTile code="dense">
              <DssButton dense label="Compact" />
            </DemoTile>
            <DemoTile code="no-caps">
              <DssButton no-caps label="Texto Normal" />
            </DemoTile>
            <DemoTile code='padding="20px 40px"'>
              <DssButton padding="20px 40px" label="Padding custom" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 10. Ripple & tabindex ───────────────────────────────────── -->
        <section v-if="visibleIds.has('interacao')" id="tb-interacao" class="tb-section">
          <SectionHead index="10" title="Interação & Acessibilidade" :count="4"
            desc="ripple effect + tabindex computado para navegação por teclado." />
          <div class="tb-grid">
            <DemoTile code=':ripple="true"'>
              <DssButton :ripple="true" label="Com Ripple ✨" />
            </DemoTile>
            <DemoTile code="ripple default (false)">
              <DssButton label="Sem Ripple" />
            </DemoTile>
            <DemoTile code=':tabindex="1"'>
              <DssButton :tabindex="1" label="Tab 1" />
            </DemoTile>
            <DemoTile code=':tabindex="-1"'>
              <DssButton :tabindex="-1" label="Não focável" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 11. Brandabilidade ──────────────────────────────────────── -->
        <section v-if="visibleIds.has('brand')" id="tb-brand" class="tb-section">
          <SectionHead index="11" title="Brandabilidade" :count="BRAND_KEYS.length * VARIANTS.length"
            desc="Prop brand sobrescreve tokens semânticos. Reage também a [data-brand] global." />
          <div v-for="brand in BRAND_KEYS" :key="brand" class="tb-brand-block">
            <div class="tb-brand-block__head">
              <span :class="['tb-brand-block__dot', `is-${brand}`]" aria-hidden="true"></span>
              <h3 class="tb-brand-block__title">{{ brandLabel(brand) }}</h3>
              <code class="tb-brand-block__code">brand="{{ brand }}"</code>
            </div>
            <div class="tb-grid">
              <DemoTile v-for="v in VARIANTS" :key="brand + v" :code="`variant=&quot;${v}&quot;`">
                <DssButton :brand="brand" :variant="v" :label="capitalize(v)" />
              </DemoTile>
            </div>
          </div>
        </section>

        <!-- ── 12. Botões com Badges ───────────────────────────────────── -->
        <section v-if="visibleIds.has('badges')" id="tb-badges" class="tb-section">
          <SectionHead index="12" title="Botões com Badges" :count="3"
            desc="Composição DssButton + DssBadge floating para notificações." />
          <div class="tb-grid tb-grid--gap-lg">
            <DemoTile code="badge floating primary">
              <DssButton icon="mail" label="Email">
                <DssBadge floating color="primary" label="5" />
              </DssButton>
            </DemoTile>
            <DemoTile code="outline + badge negative">
              <DssButton icon="notifications" variant="outline" label="Alertas">
                <DssBadge floating color="negative" label="12" />
              </DssButton>
            </DemoTile>
            <DemoTile code="flat + badge accent">
              <DssButton icon="shopping_cart" variant="flat" color="accent" label="Carrinho">
                <DssBadge floating color="accent" label="3" />
              </DssButton>
            </DemoTile>
          </div>
        </section>

        <!-- ── 13. Matriz variante × cor ───────────────────────────────── -->
        <section v-if="visibleIds.has('matriz')" id="tb-matriz" class="tb-section">
          <SectionHead index="13" title="Matriz Variante × Cor" :count="VARIANTS.length * COLORS.length"
            desc="Cobertura combinatória completa para inspeção visual rápida." />
          <div v-for="v in VARIANTS" :key="v" class="tb-matrix-row">
            <div class="tb-matrix-row__label">
              <code>{{ v }}</code>
            </div>
            <div class="tb-matrix-row__items">
              <DssButton
                v-for="c in COLORS"
                :key="v + c"
                :variant="v"
                :color="c"
                size="sm"
                :label="c"
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, h } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
// Caminho oficial: packages/core/components/base/DssXxx/DssXxx.vue
// Alias Vite: @components → packages/core/components
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssBadge  from '@components/base/DssBadge/DssBadge.vue'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssButton (vide types/button.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['elevated', 'flat', 'outline', 'unelevated', 'push', 'glossy'] as const
const COLORS = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const ALIGNS = ['left', 'center', 'right', 'between', 'around', 'evenly'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

const SECTIONS = [
  { id: 'variantes',  index: '01', title: 'Variantes' },
  { id: 'cores',      index: '02', title: 'Cores' },
  { id: 'tamanhos',   index: '03', title: 'Tamanhos' },
  { id: 'icones',     index: '04', title: 'Ícones' },
  { id: 'estados',    index: '05', title: 'Estados' },
  { id: 'progresso',  index: '06', title: 'Progresso' },
  { id: 'align',      index: '07', title: 'Align' },
  { id: 'layout',     index: '08', title: 'Layout' },
  { id: 'formas',     index: '09', title: 'Formas' },
  { id: 'interacao',  index: '10', title: 'Interação' },
  { id: 'brand',      index: '11', title: 'Brandabilidade' },
  { id: 'badges',     index: '12', title: 'Com Badges' },
  { id: 'matriz',     index: '13', title: 'Matriz V × C' },
]

const brands = [
  { label: 'Neutro', value: '' },
  { label: 'Hub',    value: 'hub' },
  { label: 'Water',  value: 'water' },
  { label: 'Waste',  value: 'waste' },
]

const activeBrand = ref('')
const activeBrandLabel = computed(() => brands.find(b => b.value === activeBrand.value)?.label || 'Neutro')

const isDark = ref(false)
const density = ref<'comfortable' | 'compact'>('comfortable')
const query = ref('')
const activeSection = ref<string>('variantes')

function toggleDensity() {
  density.value = density.value === 'compact' ? 'comfortable' : 'compact'
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)

// Filtro por busca (procura em title + id)
const visibleIds = computed<Set<string>>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return new Set(SECTIONS.map(s => s.id))
  return new Set(
    SECTIONS.filter(s =>
      s.title.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    ).map(s => s.id)
  )
})

function scrollTo(id: string) {
  const el = document.getElementById(`tb-${id}`)
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
        const id = (visible.target as HTMLElement).id.replace('tb-', '')
        if (id) activeSection.value = id
      }
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
  )
  SECTIONS.forEach(s => {
    const el = document.getElementById(`tb-${s.id}`)
    if (el) observer!.observe(el)
  })
})
onBeforeUnmount(() => observer?.disconnect())

// ──────────────────────────────────────────────────────────────────────────
// Helpers funcionais (sub-componentes locais via render functions)
// ──────────────────────────────────────────────────────────────────────────
const SectionHead = (props: { index: string; title: string; desc: string; count: number }) => h(
  'div', { class: 'tb-section__head' }, [
    h('div', { class: 'tb-section__heading' }, [
      h('span', { class: 'tb-section__index' }, props.index),
      h('div', null, [
        h('h2', { class: 'tb-section__title' }, props.title),
        h('p', { class: 'tb-section__desc' }, props.desc),
      ]),
    ]),
    h('div', { class: 'tb-section__badge' }, [
      String(props.count),
      h('span', null, ' items'),
    ]),
  ]
)
SectionHead.props = ['index', 'title', 'desc', 'count']

const DemoTile = (_props: { code: string }, { slots }: any) => h(
  'div', { class: 'tb-tile' }, [
    h('div', { class: 'tb-tile__stage' }, slots.default?.()),
    h('code', { class: 'tb-tile__code' }, _props.code),
  ]
)
DemoTile.props = ['code']
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════════
   ESTRUTURA RAIZ — DSS tokens only
═══════════════════════════════════════════════════════════════════════ */
.tb-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: var(--dss-surface-subtle);
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  transition: background-color .25s ease, color .25s ease;
  scroll-behavior: smooth;
}

/* ── HERO ──────────────────────────────────────────────────────────────── */
.tb-hero {
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
.tb-hero__inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--dss-spacing-5) var(--dss-spacing-6) var(--dss-spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
}
.tb-hero__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--dss-spacing-4);
  flex-wrap: wrap;
}
.tb-hero__brand { display: flex; align-items: center; gap: var(--dss-spacing-3); }
.tb-hero__logo {
  font-size: 2.25rem;
  line-height: 1;
  background: linear-gradient(135deg, var(--dss-hub-600), var(--dss-water-500));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px color-mix(in srgb, var(--dss-hub-600) 30%, transparent));
}
.tb-hero__title {
  font-size: var(--dss-font-size-2xl, 1.5rem);
  font-weight: var(--dss-font-weight-bold);
  margin: 0;
  line-height: var(--dss-line-height-tight);
  letter-spacing: -0.01em;
}
.tb-hero__subtitle { margin: 2px 0 0; font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); }
.tb-hero__subtitle code {
  font-family: var(--dss-font-family-mono, monospace);
  font-size: 0.85em;
  background: var(--dss-surface-muted);
  padding: 1px 6px;
  border-radius: var(--dss-radius-sm);
}
.tb-hero__actions { display: flex; gap: var(--dss-spacing-2); }
.tb-icon-btn {
  width: 40px; height: 40px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--dss-radius-md);
  border: 1px solid var(--dss-gray-200);
  background: var(--dss-surface-default);
  color: var(--dss-text-body);
  cursor: pointer;
  transition: all .18s ease;
}
.tb-icon-btn:hover { background: var(--dss-surface-muted); border-color: var(--dss-gray-300); transform: translateY(-1px); }
.tb-icon-btn:active { transform: translateY(0); }
.tb-icon-btn[aria-pressed="true"] { background: var(--dss-surface-muted); border-color: var(--dss-gray-400); }
.tb-icon-btn .material-icons { font-size: 20px; }

/* Stats */
.tb-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--dss-spacing-3);
}
.tb-stat {
  display: flex; flex-direction: column; gap: 2px;
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  background: var(--dss-surface-muted);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  transition: transform .2s ease, box-shadow .2s ease;
}
.tb-stat:hover { transform: translateY(-2px); box-shadow: 0 4px 16px color-mix(in srgb, var(--dss-gray-900) 8%, transparent); }
.tb-stat__value {
  font-size: 1.5rem; font-weight: var(--dss-font-weight-bold); line-height: 1;
  color: var(--dss-text-body);
}
.tb-stat__label {
  font-size: var(--dss-font-size-xs); color: var(--dss-text-subtle);
  text-transform: uppercase; letter-spacing: 0.06em;
}
.tb-stat--brand .tb-stat__value { font-size: 1.125rem; padding-top: 4px; }

/* Controls */
.tb-controls { display: flex; gap: var(--dss-spacing-3); align-items: center; flex-wrap: wrap; }
.tb-search { position: relative; flex: 1 1 280px; min-width: 240px; }
.tb-search__icon {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  color: var(--dss-text-subtle); font-size: 20px !important; pointer-events: none;
}
.tb-search__input {
  width: 100%; height: 40px; padding: 0 40px 0 40px;
  border-radius: var(--dss-radius-md);
  border: 1px solid var(--dss-gray-300);
  background: var(--dss-surface-default);
  color: var(--dss-text-body);
  font-size: var(--dss-font-size-sm); font-family: inherit;
  transition: border-color .18s ease, box-shadow .18s ease;
}
.tb-search__input::placeholder { color: var(--dss-text-subtle); }
.tb-search__input:focus {
  outline: none;
  border-color: var(--dss-hub-600);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dss-hub-600) 18%, transparent);
}
.tb-search__clear {
  position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
  width: 28px; height: 28px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--dss-radius-sm); border: none; background: transparent;
  color: var(--dss-text-subtle); cursor: pointer;
}
.tb-search__clear:hover { background: var(--dss-surface-muted); color: var(--dss-text-body); }
.tb-search__clear .material-icons { font-size: 18px; }

.tb-brand-pills {
  display: inline-flex; gap: 4px; padding: 4px;
  background: var(--dss-surface-muted);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}
.tb-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border: none; background: transparent;
  border-radius: var(--dss-radius-sm);
  font-size: var(--dss-font-size-sm); font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-subtle); cursor: pointer;
  transition: all .18s ease;
}
.tb-pill:hover { color: var(--dss-text-body); }
.tb-pill.is-active {
  background: var(--dss-surface-default); color: var(--dss-text-body);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--dss-gray-900) 12%, transparent);
}
.tb-pill__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--dss-gray-400); }
.tb-pill--hub   .tb-pill__dot { background: var(--dss-hub-600); }
.tb-pill--water .tb-pill__dot { background: var(--dss-water-500); }
.tb-pill--waste .tb-pill__dot { background: var(--dss-waste-600); }

/* ── BODY ──────────────────────────────────────────────────────────────── */
.tb-body {
  max-width: 1440px; width: 100%; margin: 0 auto;
  padding: var(--dss-spacing-5) var(--dss-spacing-6) var(--dss-spacing-8);
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: var(--dss-spacing-5);
  align-items: flex-start;
}
@media (max-width: 960px) {
  .tb-body { grid-template-columns: 1fr; }
  .tb-nav { display: none; }
}

/* Sidebar */
.tb-nav {
  position: sticky; top: 260px; align-self: start;
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-lg, var(--dss-radius-md));
  padding: var(--dss-spacing-3);
  max-height: calc(100vh - 280px);
  overflow-y: auto;
}
.tb-nav__title {
  font-size: var(--dss-font-size-xs); font-weight: var(--dss-font-weight-bold);
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--dss-text-subtle);
  padding: var(--dss-spacing-2); margin-bottom: 4px;
}
.tb-nav__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; }
.tb-nav__link {
  display: grid; grid-template-columns: 24px 1fr;
  align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: var(--dss-radius-sm);
  text-decoration: none; color: var(--dss-text-body);
  font-size: var(--dss-font-size-sm);
  transition: background-color .15s ease, color .15s ease;
  cursor: pointer; position: relative;
}
.tb-nav__link:hover { background: var(--dss-surface-muted); }
.tb-nav__link.is-active {
  background: color-mix(in srgb, var(--dss-hub-600) 10%, transparent);
  font-weight: var(--dss-font-weight-semibold);
}
.tb-nav__link.is-active::before {
  content: ""; position: absolute;
  left: -3px; top: 8px; bottom: 8px;
  width: 3px; border-radius: 3px;
  background: var(--dss-hub-600);
}
.tb-nav__link.is-hidden { opacity: 0.35; }
.tb-nav__index {
  font-size: 10px; font-weight: var(--dss-font-weight-bold);
  color: var(--dss-text-subtle);
  font-family: var(--dss-font-family-mono, monospace);
}
.tb-nav__name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Main */
.tb-main { display: flex; flex-direction: column; gap: var(--dss-spacing-6); min-width: 0; }

.tb-section {
  scroll-margin-top: 280px;
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-lg, 14px);
  padding: var(--dss-spacing-5);
  animation: tb-fade-up .35s ease both;
}
@keyframes tb-fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.tb-section__head {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: var(--dss-spacing-4);
  margin-bottom: var(--dss-spacing-4);
  padding-bottom: var(--dss-spacing-3);
  border-bottom: 1px dashed var(--dss-gray-200);
}
.tb-section__heading { display: flex; gap: var(--dss-spacing-3); align-items: flex-start; }
.tb-section__index {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px;
  border-radius: var(--dss-radius-sm);
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--dss-hub-600) 18%, transparent),
    color-mix(in srgb, var(--dss-water-500) 18%, transparent));
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-mono, monospace);
  font-weight: var(--dss-font-weight-bold);
  font-size: var(--dss-font-size-sm);
}
.tb-section__title {
  margin: 0; font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold); line-height: 1.2;
}
.tb-section__desc {
  margin: 4px 0 0; font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle); max-width: 64ch;
}
.tb-section__badge {
  font-size: var(--dss-font-size-sm); font-weight: var(--dss-font-weight-semibold);
  padding: 4px 12px; border-radius: 999px;
  background: var(--dss-surface-muted); color: var(--dss-text-body);
  white-space: nowrap;
}
.tb-section__badge span { font-weight: var(--dss-font-weight-regular); color: var(--dss-text-subtle); }

/* Grid de tiles */
.tb-grid {
  display: grid;
  gap: var(--dss-spacing-3);
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
.tb-main[data-density="comfortable"] .tb-grid {
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--dss-spacing-4);
}
.tb-grid--one { grid-template-columns: 1fr !important; margin-top: var(--dss-spacing-3); }
.tb-grid--gap-lg { gap: var(--dss-spacing-5); }
.tb-grid--align-center { align-items: center; }

.tb-tile {
  display: flex; flex-direction: column; gap: var(--dss-spacing-2);
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
  transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.tb-tile:hover {
  transform: translateY(-2px);
  border-color: var(--dss-gray-300);
  box-shadow:
    0 1px 2px color-mix(in srgb, var(--dss-gray-900) 6%, transparent),
    0 8px 24px color-mix(in srgb, var(--dss-gray-900) 8%, transparent);
}
.tb-tile__stage {
  flex: 1;
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
  gap: var(--dss-spacing-2);
  min-height: 88px;
  padding: var(--dss-spacing-4);
  background:
    linear-gradient(var(--dss-surface-subtle), var(--dss-surface-subtle)),
    repeating-linear-gradient(45deg,
      transparent 0 8px,
      color-mix(in srgb, var(--dss-gray-300) 8%, transparent) 8px 9px);
  transform: translateZ(0);
}
.tb-main[data-density="compact"] .tb-tile__stage { min-height: 64px; padding: var(--dss-spacing-3); }
.tb-tile__code {
  display: block;
  font-family: var(--dss-font-family-mono, monospace);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  background: var(--dss-surface-default);
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  border-top: 1px solid var(--dss-gray-200);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* Brand blocks (seção 11) */
.tb-brand-block { margin-bottom: var(--dss-spacing-5); }
.tb-brand-block:last-child { margin-bottom: 0; }
.tb-brand-block__head {
  display: flex; align-items: center; gap: var(--dss-spacing-2);
  margin-bottom: var(--dss-spacing-3);
  padding-bottom: var(--dss-spacing-2);
  border-bottom: 1px solid var(--dss-gray-200);
}
.tb-brand-block__dot { width: 12px; height: 12px; border-radius: 50%; }
.tb-brand-block__dot.is-hub   { background: var(--dss-hub-600); }
.tb-brand-block__dot.is-water { background: var(--dss-water-500); }
.tb-brand-block__dot.is-waste { background: var(--dss-waste-600); }
.tb-brand-block__title {
  margin: 0; font-size: var(--dss-font-size-md);
  font-weight: var(--dss-font-weight-semibold);
}
.tb-brand-block__code {
  margin-left: auto;
  font-family: var(--dss-font-family-mono, monospace);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  background: var(--dss-surface-muted);
  padding: 2px 8px; border-radius: var(--dss-radius-sm);
}

/* Matriz */
.tb-matrix-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--dss-spacing-3);
  align-items: center;
  padding: var(--dss-spacing-3) 0;
  border-bottom: 1px dashed var(--dss-gray-200);
}
.tb-matrix-row:last-child { border-bottom: none; }
.tb-matrix-row__label code {
  font-family: var(--dss-font-family-mono, monospace);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
  background: var(--dss-surface-muted);
  padding: 4px 10px;
  border-radius: var(--dss-radius-sm);
}
.tb-matrix-row__items {
  display: flex; flex-wrap: wrap;
  gap: var(--dss-spacing-2);
}

/* Dark mode polish */
.tb-page[data-theme="dark"] { background: var(--dss-surface-subtle, #0f1115); }
.tb-page[data-theme="dark"] .tb-tile__stage {
  background:
    linear-gradient(var(--dss-surface-subtle), var(--dss-surface-subtle)),
    repeating-linear-gradient(45deg,
      transparent 0 8px,
      color-mix(in srgb, var(--dss-gray-100) 14%, transparent) 8px 9px);
}

/* Responsivo */
@media (max-width: 640px) {
  .tb-hero__inner { padding: var(--dss-spacing-4) var(--dss-spacing-3); }
  .tb-body { padding: var(--dss-spacing-3); }
  .tb-section { padding: var(--dss-spacing-3); }
  .tb-stat__value { font-size: 1.25rem; }
  .tb-section__index { width: 32px; height: 32px; }
  .tb-grid { grid-template-columns: 1fr 1fr !important; gap: var(--dss-spacing-2) !important; }
  .tb-matrix-row { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .tb-page, .tb-section, .tb-tile, .tb-stat, .tb-icon-btn { animation: none !important; transition: none !important; }
}
</style>
