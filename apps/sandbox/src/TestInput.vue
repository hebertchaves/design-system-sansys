<template>
  <div
    class="ti-page"
    :data-brand="activeBrand || undefined"
    :data-theme="isDark ? 'dark' : undefined"
  >
    <!-- ══════════════════════════════════════════════════════════════════
         HERO HEADER (sticky)
    ══════════════════════════════════════════════════════════════════ -->
    <header class="ti-hero">
      <div class="ti-hero__inner">
        <div class="ti-hero__top">
          <div class="ti-hero__brand">
            <span class="ti-hero__logo" aria-hidden="true">◉</span>
            <div>
              <h1 class="ti-hero__title">DssInput — Playground</h1>
              <p class="ti-hero__subtitle">
                Componente <code>DssInput</code> renderizado a partir do contrato canônico
                — <code>packages/core/components/base/DssInput</code>
              </p>
            </div>
          </div>

          <div class="ti-hero__actions">
            <button
              type="button"
              class="ti-icon-btn"
              :aria-pressed="density === 'compact'"
              :title="density === 'compact' ? 'Grid confortável' : 'Grid compacto'"
              @click="toggleDensity"
            >
              <span class="material-icons">
                {{ density === 'compact' ? 'view_comfy' : 'view_compact' }}
              </span>
            </button>
            <button
              type="button"
              class="ti-icon-btn"
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
        <div class="ti-stats">
          <div class="ti-stat">
            <span class="ti-stat__value">{{ SECTIONS.length }}</span>
            <span class="ti-stat__label">Seções</span>
          </div>
          <div class="ti-stat">
            <span class="ti-stat__value">{{ VARIANTS.length }}</span>
            <span class="ti-stat__label">Variantes</span>
          </div>
          <div class="ti-stat">
            <span class="ti-stat__value">{{ TYPES.length }}</span>
            <span class="ti-stat__label">Tipos HTML</span>
          </div>
          <div class="ti-stat">
            <span class="ti-stat__value">{{ SLOTS.length }}</span>
            <span class="ti-stat__label">Slots</span>
          </div>
          <div class="ti-stat ti-stat--brand">
            <span class="ti-stat__value">{{ activeBrandLabel }}</span>
            <span class="ti-stat__label">Brand ativa</span>
          </div>
        </div>

        <!-- Controls -->
        <div class="ti-controls">
          <div class="ti-search">
            <span class="material-icons ti-search__icon">search</span>
            <input
              v-model="query"
              type="search"
              placeholder="Buscar seção (ex: variantes, estados, slots…)"
              class="ti-search__input"
              aria-label="Filtrar seções"
            />
            <button
              v-if="query"
              class="ti-search__clear"
              type="button"
              aria-label="Limpar busca"
              @click="query = ''"
            >
              <span class="material-icons">close</span>
            </button>
          </div>

          <div class="ti-brand-pills" role="radiogroup" aria-label="Selecionar brand">
            <button
              v-for="b in brands"
              :key="b.value || 'neutral'"
              type="button"
              role="radio"
              :aria-checked="activeBrand === b.value"
              :class="['ti-pill', `ti-pill--${b.value || 'neutral'}`, { 'is-active': activeBrand === b.value }]"
              @click="activeBrand = b.value"
            >
              <span class="ti-pill__dot" aria-hidden="true"></span>
              {{ b.label }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- ══════════════════════════════════════════════════════════════════
         BODY: SIDEBAR + MAIN
    ══════════════════════════════════════════════════════════════════ -->
    <div class="ti-body">

      <!-- Sticky sidebar -->
      <aside class="ti-nav" aria-label="Navegação por seção">
        <div class="ti-nav__title">Seções</div>
        <ul class="ti-nav__list">
          <li v-for="s in SECTIONS" :key="s.id">
            <a
              :href="`#ti-${s.id}`"
              :class="['ti-nav__link', {
                'is-hidden': !visibleIds.has(s.id),
                'is-active': activeSection === s.id
              }]"
              @click.prevent="scrollTo(s.id)"
            >
              <span class="ti-nav__index">{{ s.index }}</span>
              <span class="ti-nav__name">{{ s.title }}</span>
            </a>
          </li>
        </ul>
      </aside>

      <main class="ti-main test-content" :data-density="density">

        <!-- ── 01. Variantes ───────────────────────────────────────────── -->
        <section v-if="visibleIds.has('variantes')" id="ti-variantes" class="ti-section">
          <SectionHead index="01" title="Variantes Visuais" :count="VARIANTS.length"
            desc="4 variantes (outlined, filled, standout, borderless) controladas pela prop variant. Default: outlined." />
          <div class="ti-grid">
            <DemoTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`">
              <DssInput :variant="v" :label="capitalize(v)" placeholder="Digite aqui" v-model="m[`var-${v}`]" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 02. Tipos HTML ──────────────────────────────────────────── -->
        <section v-if="visibleIds.has('tipos')" id="ti-tipos" class="ti-section">
          <SectionHead index="02" title="Tipos HTML" :count="TYPES.length"
            desc="Prop type — mapeia o atributo nativo do input (text, email, password, number, search, tel, url, date, time, datetime-local)." />
          <div class="ti-grid">
            <DemoTile v-for="t in TYPES" :key="t" :code="`type=&quot;${t}&quot;`">
              <DssInput :type="t" :label="capitalize(t)" :placeholder="typePlaceholder(t)" v-model="m[`type-${t}`]" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 03. Densidade ───────────────────────────────────────────── -->
        <section v-if="visibleIds.has('densidade')" id="ti-densidade" class="ti-section">
          <SectionHead index="03" title="Densidade" :count="2"
            desc="Prop dense reduz a altura do controle. Altura padrão 44px (touch-target WCAG 2.5.5)." />
          <div class="ti-grid">
            <DemoTile code="default (44px)">
              <DssInput label="Confortável" placeholder="Altura padrão" v-model="m.denseOff" />
            </DemoTile>
            <DemoTile code="dense">
              <DssInput dense label="Compacto" placeholder="Altura reduzida" v-model="m.denseOn" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 04. Label & Placeholder ─────────────────────────────────── -->
        <section v-if="visibleIds.has('label')" id="ti-label" class="ti-section">
          <SectionHead index="04" title="Label & Placeholder" :count="4"
            desc="Floating label (padrão), stack-label fixo no topo, placeholder isolado e a combinação dos dois." />
          <div class="ti-grid">
            <DemoTile code="label (floating)">
              <DssInput label="Nome completo" v-model="m.lblFloat" />
            </DemoTile>
            <DemoTile code="stack-label">
              <DssInput label="Endereço" stack-label placeholder="Rua, número, bairro" v-model="m.lblStack" />
            </DemoTile>
            <DemoTile code="placeholder only">
              <DssInput placeholder="Sem label, só placeholder" v-model="m.lblPh" />
            </DemoTile>
            <DemoTile code="label + placeholder">
              <DssInput label="E-mail" placeholder="voce@exemplo.com" v-model="m.lblBoth" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 05. Hint & Mensagens ────────────────────────────────────── -->
        <section v-if="visibleIds.has('hint')" id="ti-hint" class="ti-section">
          <SectionHead index="05" title="Hint & Mensagens" :count="3"
            desc="hint (texto de ajuda), required (aria-required + asterisco) e a área inferior reservada para mensagens." />
          <div class="ti-grid">
            <DemoTile code="hint">
              <DssInput label="Username" hint="Mínimo de 6 caracteres" v-model="m.hint1" />
            </DemoTile>
            <DemoTile code="required">
              <DssInput label="Campo obrigatório" required hint="Preenchimento obrigatório" v-model="m.hint2" />
            </DemoTile>
            <DemoTile code="hint + clearable">
              <DssInput label="Pesquisa" hint="Pressione Esc para limpar" clearable v-model="m.hint3" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 06. Estados ─────────────────────────────────────────────── -->
        <section v-if="visibleIds.has('estados')" id="ti-estados" class="ti-section">
          <SectionHead index="06" title="Estados" :count="5"
            desc="error (+ error-message), disabled, readonly, loading e o estado base focável. A área inferior é reservada para evitar layout-shift." />
          <div class="ti-grid">
            <DemoTile code=":error=&quot;true&quot;">
              <DssInput label="CPF" :error="true" error-message="CPF deve ter 11 dígitos" v-model="m.stError" />
            </DemoTile>
            <DemoTile code=":disabled=&quot;true&quot;">
              <DssInput label="Desabilitado" disabled placeholder="Não editável" v-model="m.stDisabled" />
            </DemoTile>
            <DemoTile code=":readonly=&quot;true&quot;">
              <DssInput label="Somente leitura" readonly v-model="m.stReadonly" />
            </DemoTile>
            <DemoTile code=":loading=&quot;true&quot;">
              <DssInput label="Verificando…" loading placeholder="Aguarde" v-model="m.stLoading" />
            </DemoTile>
            <DemoTile code="base (focável)">
              <DssInput label="Estado base" placeholder="Clique para focar" v-model="m.stBase" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 07. Clearable ───────────────────────────────────────────── -->
        <section v-if="visibleIds.has('clearable')" id="ti-clearable" class="ti-section">
          <SectionHead index="07" title="Clearable" :count="2"
            desc="Prop clearable exibe o botão × (com clear-aria-label) quando há valor. Emite o evento clear." />
          <div class="ti-grid">
            <DemoTile code="clearable (com valor)">
              <DssInput label="Busca" clearable v-model="m.clear1" />
            </DemoTile>
            <DemoTile code="clearable + filled">
              <DssInput variant="filled" label="Filtro" clearable v-model="m.clear2" />
            </DemoTile>
          </div>
        </section>

        <!-- ── 08. Slots ───────────────────────────────────────────────── -->
        <section v-if="visibleIds.has('slots')" id="ti-slots" class="ti-section">
          <SectionHead index="08" title="Slots" :count="SLOTS.length"
            desc="prepend e append (dentro do campo), before e after (fora), além de label/hint/error customizados." />
          <div class="ti-grid">
            <DemoTile code="#prepend (ícone)">
              <DssInput label="Telefone" placeholder="(00) 00000-0000" v-model="m.slotPrepend">
                <template #prepend><span class="material-icons ti-slot-icon">call</span></template>
              </DssInput>
            </DemoTile>
            <DemoTile code="#append (ícone)">
              <DssInput label="Valor" placeholder="0,00" v-model="m.slotAppend">
                <template #append><span class="material-icons ti-slot-icon">attach_money</span></template>
              </DssInput>
            </DemoTile>
            <DemoTile code="#append (toggle senha)">
              <DssInput
                label="Senha"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Digite sua senha"
                v-model="m.slotPassword"
              >
                <template #append>
                  <DssButton
                    variant="flat"
                    color="secondary"
                    size="sm"
                    :icon="showPassword ? 'visibility_off' : 'visibility'"
                    :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </DssInput>
            </DemoTile>
            <DemoTile code="#prepend + #append">
              <DssInput label="Buscar" placeholder="Termo…" v-model="m.slotBoth">
                <template #prepend><span class="material-icons ti-slot-icon">search</span></template>
                <template #append><span class="ti-char-count">{{ (m.slotBoth || '').length }}/40</span></template>
              </DssInput>
            </DemoTile>
          </div>
        </section>

        <!-- ── 09. Brandabilidade ──────────────────────────────────────── -->
        <section v-if="visibleIds.has('brand')" id="ti-brand" class="ti-section">
          <SectionHead index="09" title="Brandabilidade" :count="BRAND_KEYS.length * 2"
            desc="Prop brand sobrescreve o accent de foco. Reage também a [data-brand] global (use as pílulas do topo)." />
          <div v-for="brand in BRAND_KEYS" :key="brand" class="ti-brand-block">
            <div class="ti-brand-block__head">
              <span :class="['ti-brand-block__dot', `is-${brand}`]" aria-hidden="true"></span>
              <h3 class="ti-brand-block__title">{{ brandLabel(brand) }}</h3>
              <code class="ti-brand-block__code">brand="{{ brand }}"</code>
            </div>
            <div class="ti-grid">
              <DemoTile code="outlined + focus accent">
                <DssInput :brand="brand" variant="outlined" :label="`${capitalize(brand)} input`"
                  hint="Foque para ver o accent" v-model="m[`brand-${brand}-o`]" />
              </DemoTile>
              <DemoTile code="filled + focus accent">
                <DssInput :brand="brand" variant="filled" :label="`${capitalize(brand)} input`"
                  hint="Foque para ver o accent" v-model="m[`brand-${brand}-f`]" />
              </DemoTile>
            </div>
          </div>
        </section>

        <!-- ── 10. Matriz Variante × Estado ────────────────────────────── -->
        <section v-if="visibleIds.has('matriz')" id="ti-matriz" class="ti-section">
          <SectionHead index="10" title="Matriz Variante × Estado" :count="VARIANTS.length * MATRIX_STATES.length"
            desc="Cobertura combinatória para inspeção visual rápida: cada variante em base, erro, desabilitado e readonly." />
          <div v-for="v in VARIANTS" :key="v" class="ti-matrix-row">
            <div class="ti-matrix-row__label"><code>{{ v }}</code></div>
            <div class="ti-matrix-row__items">
              <DssInput
                v-for="st in MATRIX_STATES"
                :key="v + st.key"
                :variant="v"
                :label="st.label"
                :error="st.key === 'error'"
                :error-message="st.key === 'error' ? 'Inválido' : undefined"
                :disabled="st.key === 'disabled'"
                :readonly="st.key === 'readonly'"
                v-model="m[`mx-${v}-${st.key}`]"
                class="ti-matrix-field"
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick, h } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
// Alias Vite: @components → packages/core/components
import DssInput  from '@components/base/DssInput/DssInput.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssInput (vide types/input.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['outlined', 'filled', 'standout', 'borderless'] as const
const TYPES = ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'date', 'time', 'datetime-local'] as const
const SLOTS = ['prepend', 'append', 'before', 'after', 'label', 'hint', 'error'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

const MATRIX_STATES = [
  { key: 'base',     label: 'Base' },
  { key: 'error',    label: 'Erro' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'readonly', label: 'Readonly' },
] as const

const SECTIONS = [
  { id: 'variantes', index: '01', title: 'Variantes' },
  { id: 'tipos',     index: '02', title: 'Tipos HTML' },
  { id: 'densidade', index: '03', title: 'Densidade' },
  { id: 'label',     index: '04', title: 'Label & Placeholder' },
  { id: 'hint',      index: '05', title: 'Hint & Mensagens' },
  { id: 'estados',   index: '06', title: 'Estados' },
  { id: 'clearable', index: '07', title: 'Clearable' },
  { id: 'slots',     index: '08', title: 'Slots' },
  { id: 'brand',     index: '09', title: 'Brandabilidade' },
  { id: 'matriz',    index: '10', title: 'Matriz V × Estado' },
]

const brands = [
  { label: 'Neutro', value: '' },
  { label: 'Hub',    value: 'hub' },
  { label: 'Water',  value: 'water' },
  { label: 'Waste',  value: 'waste' },
]

// Estado dos v-model — mapa reativo único (chaves criadas sob demanda).
const m = reactive<Record<string, string>>({
  denseOff: '', denseOn: '',
  lblFloat: '', lblStack: '', lblPh: '', lblBoth: '',
  hint1: '', hint2: '', hint3: '',
  stError: '123', stDisabled: 'Não editável', stReadonly: 'Somente leitura', stLoading: '', stBase: '',
  clear1: 'Texto inicial', clear2: 'Filtro ativo',
  slotPrepend: '', slotAppend: '', slotPassword: '', slotBoth: '',
})

const showPassword = ref(false)

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

const typePlaceholder = (t: string) => ({
  text: 'Texto livre',
  email: 'voce@exemplo.com',
  password: '••••••••',
  number: '0',
  search: 'Buscar…',
  tel: '(00) 00000-0000',
  url: 'https://exemplo.com',
  date: '',
  time: '',
  'datetime-local': '',
}[t] || '')

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
  const el = document.getElementById(`ti-${id}`)
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
        const id = (visible.target as HTMLElement).id.replace('ti-', '')
        if (id) activeSection.value = id
      }
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
  )
  SECTIONS.forEach(s => {
    const el = document.getElementById(`ti-${s.id}`)
    if (el) observer!.observe(el)
  })
})
onBeforeUnmount(() => observer?.disconnect())

// ──────────────────────────────────────────────────────────────────────────
// Helpers funcionais (sub-componentes locais via render functions)
// ──────────────────────────────────────────────────────────────────────────
const SectionHead = (props: { index: string; title: string; desc: string; count: number }) => h(
  'div', { class: 'ti-section__head' }, [
    h('div', { class: 'ti-section__heading' }, [
      h('span', { class: 'ti-section__index' }, props.index),
      h('div', null, [
        h('h2', { class: 'ti-section__title' }, props.title),
        h('p', { class: 'ti-section__desc' }, props.desc),
      ]),
    ]),
    h('div', { class: 'ti-section__badge' }, [
      String(props.count),
      h('span', null, ' items'),
    ]),
  ]
)
SectionHead.props = ['index', 'title', 'desc', 'count']

const DemoTile = (_props: { code: string }, { slots }: any) => h(
  'div', { class: 'ti-tile' }, [
    h('div', { class: 'ti-tile__stage' }, slots.default?.()),
    h('code', { class: 'ti-tile__code' }, _props.code),
  ]
)
DemoTile.props = ['code']
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════════
   ESTRUTURA RAIZ — DSS tokens only
═══════════════════════════════════════════════════════════════════════ */
.ti-page {
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
.ti-hero {
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
.ti-hero__inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--dss-spacing-5) var(--dss-spacing-6) var(--dss-spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
}
.ti-hero__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--dss-spacing-4);
  flex-wrap: wrap;
}
.ti-hero__brand { display: flex; align-items: center; gap: var(--dss-spacing-3); }
.ti-hero__logo {
  font-size: 2.25rem;
  line-height: 1;
  background: linear-gradient(135deg, var(--dss-hub-600), var(--dss-water-500));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px color-mix(in srgb, var(--dss-hub-600) 30%, transparent));
}
.ti-hero__title {
  font-size: var(--dss-font-size-2xl, 1.5rem);
  font-weight: var(--dss-font-weight-bold);
  margin: 0;
  line-height: var(--dss-line-height-tight);
  letter-spacing: -0.01em;
}
.ti-hero__subtitle { margin: 2px 0 0; font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); }
.ti-hero__subtitle code {
  font-family: var(--dss-font-family-mono, monospace);
  font-size: 0.85em;
  background: var(--dss-surface-muted);
  padding: 1px 6px;
  border-radius: var(--dss-radius-sm);
}
.ti-hero__actions { display: flex; gap: var(--dss-spacing-2); }
.ti-icon-btn {
  width: 40px; height: 40px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--dss-radius-md);
  border: 1px solid var(--dss-gray-200);
  background: var(--dss-surface-default);
  color: var(--dss-text-body);
  cursor: pointer;
  transition: all .18s ease;
}
.ti-icon-btn:hover { background: var(--dss-surface-muted); border-color: var(--dss-gray-300); transform: translateY(-1px); }
.ti-icon-btn:active { transform: translateY(0); }
.ti-icon-btn[aria-pressed="true"] { background: var(--dss-surface-muted); border-color: var(--dss-gray-400); }
.ti-icon-btn .material-icons { font-size: 20px; }

/* Stats */
.ti-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--dss-spacing-3);
}
.ti-stat {
  display: flex; flex-direction: column; gap: 2px;
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  background: var(--dss-surface-muted);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  transition: transform .2s ease, box-shadow .2s ease;
}
.ti-stat:hover { transform: translateY(-2px); box-shadow: 0 4px 16px color-mix(in srgb, var(--dss-gray-900) 8%, transparent); }
.ti-stat__value {
  font-size: 1.5rem; font-weight: var(--dss-font-weight-bold); line-height: 1;
  color: var(--dss-text-body);
}
.ti-stat__label {
  font-size: var(--dss-font-size-xs); color: var(--dss-text-subtle);
  text-transform: uppercase; letter-spacing: 0.06em;
}
.ti-stat--brand .ti-stat__value { font-size: 1.125rem; padding-top: 4px; }

/* Controls */
.ti-controls { display: flex; gap: var(--dss-spacing-3); align-items: center; flex-wrap: wrap; }
.ti-search { position: relative; flex: 1 1 280px; min-width: 240px; }
.ti-search__icon {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  color: var(--dss-text-subtle); font-size: 20px !important; pointer-events: none;
}
.ti-search__input {
  width: 100%; height: 40px; padding: 0 40px 0 40px;
  border-radius: var(--dss-radius-md);
  border: 1px solid var(--dss-gray-300);
  background: var(--dss-surface-default);
  color: var(--dss-text-body);
  font-size: var(--dss-font-size-sm); font-family: inherit;
  transition: border-color .18s ease, box-shadow .18s ease;
}
.ti-search__input::placeholder { color: var(--dss-text-subtle); }
.ti-search__input:focus {
  outline: none;
  border-color: var(--dss-hub-600);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dss-hub-600) 18%, transparent);
}
.ti-search__clear {
  position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
  width: 28px; height: 28px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--dss-radius-sm); border: none; background: transparent;
  color: var(--dss-text-subtle); cursor: pointer;
}
.ti-search__clear:hover { background: var(--dss-surface-muted); color: var(--dss-text-body); }
.ti-search__clear .material-icons { font-size: 18px; }

.ti-brand-pills {
  display: inline-flex; gap: 4px; padding: 4px;
  background: var(--dss-surface-muted);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}
.ti-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border: none; background: transparent;
  border-radius: var(--dss-radius-sm);
  font-size: var(--dss-font-size-sm); font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-subtle); cursor: pointer;
  transition: all .18s ease;
}
.ti-pill:hover { color: var(--dss-text-body); }
.ti-pill.is-active {
  background: var(--dss-surface-default); color: var(--dss-text-body);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--dss-gray-900) 12%, transparent);
}
.ti-pill__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--dss-gray-400); }
.ti-pill--hub   .ti-pill__dot { background: var(--dss-hub-600); }
.ti-pill--water .ti-pill__dot { background: var(--dss-water-500); }
.ti-pill--waste .ti-pill__dot { background: var(--dss-waste-600); }

/* ── BODY ──────────────────────────────────────────────────────────────── */
.ti-body {
  max-width: 1440px; width: 100%; margin: 0 auto;
  padding: var(--dss-spacing-5) var(--dss-spacing-6) var(--dss-spacing-8);
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: var(--dss-spacing-5);
  align-items: flex-start;
}
@media (max-width: 960px) {
  .ti-body { grid-template-columns: 1fr; }
  .ti-nav { display: none; }
}

/* Sidebar */
.ti-nav {
  position: sticky; top: 240px; align-self: start;
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-lg, var(--dss-radius-md));
  padding: var(--dss-spacing-3);
  max-height: calc(100vh - 260px);
  overflow-y: auto;
}
.ti-nav__title {
  font-size: var(--dss-font-size-xs); font-weight: var(--dss-font-weight-bold);
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--dss-text-subtle);
  padding: var(--dss-spacing-2); margin-bottom: 4px;
}
.ti-nav__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; }
.ti-nav__link {
  display: grid; grid-template-columns: 24px 1fr;
  align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: var(--dss-radius-sm);
  text-decoration: none; color: var(--dss-text-body);
  font-size: var(--dss-font-size-sm);
  transition: background-color .15s ease, color .15s ease;
  cursor: pointer; position: relative;
}
.ti-nav__link:hover { background: var(--dss-surface-muted); }
.ti-nav__link.is-active {
  background: color-mix(in srgb, var(--dss-hub-600) 10%, transparent);
  font-weight: var(--dss-font-weight-semibold);
}
.ti-nav__link.is-active::before {
  content: ""; position: absolute;
  left: -3px; top: 8px; bottom: 8px;
  width: 3px; border-radius: 3px;
  background: var(--dss-hub-600);
}
.ti-nav__link.is-hidden { opacity: 0.35; }
.ti-nav__index {
  font-size: 10px; font-weight: var(--dss-font-weight-bold);
  color: var(--dss-text-subtle);
  font-family: var(--dss-font-family-mono, monospace);
}
.ti-nav__name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Main */
.ti-main { display: flex; flex-direction: column; gap: var(--dss-spacing-6); min-width: 0; }

.ti-section {
  scroll-margin-top: 240px;
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-lg, 14px);
  padding: var(--dss-spacing-5);
  animation: ti-fade-up .35s ease both;
}
@keyframes ti-fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.ti-section__head {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: var(--dss-spacing-4);
  margin-bottom: var(--dss-spacing-4);
  padding-bottom: var(--dss-spacing-3);
  border-bottom: 1px dashed var(--dss-gray-200);
}
.ti-section__heading { display: flex; gap: var(--dss-spacing-3); align-items: flex-start; }
.ti-section__index {
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
.ti-section__title {
  margin: 0; font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold); line-height: 1.2;
}
.ti-section__desc {
  margin: 4px 0 0; font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle); max-width: 64ch;
}
.ti-section__badge {
  font-size: var(--dss-font-size-sm); font-weight: var(--dss-font-weight-semibold);
  padding: 4px 12px; border-radius: 999px;
  background: var(--dss-surface-muted); color: var(--dss-text-body);
  white-space: nowrap;
}
.ti-section__badge span { font-weight: var(--dss-font-weight-regular); color: var(--dss-text-subtle); }

/* Grid de tiles */
.ti-grid {
  display: grid;
  gap: var(--dss-spacing-3);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
.ti-main[data-density="comfortable"] .ti-grid {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--dss-spacing-4);
}

.ti-tile {
  display: flex; flex-direction: column; gap: var(--dss-spacing-2);
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
  transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.ti-tile:hover {
  transform: translateY(-2px);
  border-color: var(--dss-gray-300);
  box-shadow:
    0 1px 2px color-mix(in srgb, var(--dss-gray-900) 6%, transparent),
    0 8px 24px color-mix(in srgb, var(--dss-gray-900) 8%, transparent);
}
/* Stage: coluna esticada para o campo ocupar a largura total do tile */
.ti-tile__stage {
  flex: 1;
  display: flex; flex-direction: column; align-items: stretch; justify-content: center;
  gap: var(--dss-spacing-2);
  min-height: 104px;
  padding: var(--dss-spacing-4);
  background:
    linear-gradient(var(--dss-surface-subtle), var(--dss-surface-subtle)),
    repeating-linear-gradient(45deg,
      transparent 0 8px,
      color-mix(in srgb, var(--dss-gray-300) 8%, transparent) 8px 9px);
  transform: translateZ(0);
}
.ti-main[data-density="compact"] .ti-tile__stage { min-height: 88px; padding: var(--dss-spacing-3); }
.ti-tile__code {
  display: block;
  font-family: var(--dss-font-family-mono, monospace);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  background: var(--dss-surface-default);
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  border-top: 1px solid var(--dss-gray-200);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* Ícones / utilidades dentro de slots */
.ti-slot-icon { font-size: 20px; color: var(--dss-text-subtle); }
.ti-char-count { font-size: var(--dss-font-size-xs); color: var(--dss-text-subtle); white-space: nowrap; }

/* Brand blocks (seção 09) */
.ti-brand-block { margin-bottom: var(--dss-spacing-5); }
.ti-brand-block:last-child { margin-bottom: 0; }
.ti-brand-block__head {
  display: flex; align-items: center; gap: var(--dss-spacing-2);
  margin-bottom: var(--dss-spacing-3);
  padding-bottom: var(--dss-spacing-2);
  border-bottom: 1px solid var(--dss-gray-200);
}
.ti-brand-block__dot { width: 12px; height: 12px; border-radius: 50%; }
.ti-brand-block__dot.is-hub   { background: var(--dss-hub-600); }
.ti-brand-block__dot.is-water { background: var(--dss-water-500); }
.ti-brand-block__dot.is-waste { background: var(--dss-waste-600); }
.ti-brand-block__title {
  margin: 0; font-size: var(--dss-font-size-md);
  font-weight: var(--dss-font-weight-semibold);
}
.ti-brand-block__code {
  margin-left: auto;
  font-family: var(--dss-font-family-mono, monospace);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  background: var(--dss-surface-muted);
  padding: 2px 8px; border-radius: var(--dss-radius-sm);
}

/* Matriz */
.ti-matrix-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--dss-spacing-3);
  align-items: start;
  padding: var(--dss-spacing-4) 0;
  border-bottom: 1px dashed var(--dss-gray-200);
}
.ti-matrix-row:last-child { border-bottom: none; }
.ti-matrix-row__label code {
  font-family: var(--dss-font-family-mono, monospace);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
  background: var(--dss-surface-muted);
  padding: 4px 10px;
  border-radius: var(--dss-radius-sm);
}
.ti-matrix-row__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--dss-spacing-3);
}

/* Dark mode polish */
.ti-page[data-theme="dark"] { background: var(--dss-surface-subtle, #0f1115); }
.ti-page[data-theme="dark"] .ti-tile__stage {
  background:
    linear-gradient(var(--dss-surface-subtle), var(--dss-surface-subtle)),
    repeating-linear-gradient(45deg,
      transparent 0 8px,
      color-mix(in srgb, var(--dss-gray-100) 14%, transparent) 8px 9px);
}

/* Responsivo */
@media (max-width: 640px) {
  .ti-hero__inner { padding: var(--dss-spacing-4) var(--dss-spacing-3); }
  .ti-body { padding: var(--dss-spacing-3); }
  .ti-section { padding: var(--dss-spacing-3); }
  .ti-stat__value { font-size: 1.25rem; }
  .ti-section__index { width: 32px; height: 32px; }
  .ti-grid { grid-template-columns: 1fr !important; gap: var(--dss-spacing-3) !important; }
  .ti-matrix-row { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .ti-page, .ti-section, .ti-tile, .ti-stat, .ti-icon-btn { animation: none !important; transition: none !important; }
}
</style>
