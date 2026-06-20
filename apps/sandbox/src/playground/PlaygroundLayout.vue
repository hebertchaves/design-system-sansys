<template>
  <div
    class="pg-page"
    :data-brand="activeBrand || undefined"
    :data-theme="isDark ? 'dark' : undefined"
  >
    <!-- ══════════════════════════════════════════════════════════════════
         HERO HEADER (sticky) — linha única compacta
    ══════════════════════════════════════════════════════════════════ -->
    <header class="pg-hero">
      <div class="pg-hero__inner">
        <div class="pg-hero__brand">
          <span class="pg-hero__logo" aria-hidden="true">◉</span>
          <div class="pg-hero__titles">
            <h1 class="pg-hero__title">{{ title }}</h1>
            <p class="pg-hero__subtitle">
              {{ subtitle }} <code v-if="code">{{ code }}</code>
            </p>
          </div>
        </div>

        <!-- KPIs (valor + label na mesma linha; altura = bloco do título) -->
        <div class="pg-kpis">
          <div v-for="(kpi, i) in kpis" :key="i" class="pg-kpi">
            <span class="pg-kpi__value">{{ kpi.value }}</span>
            <span class="pg-kpi__label">{{ kpi.label }}</span>
          </div>
        </div>

        <!-- Controles: brand pills + ações -->
        <div class="pg-hero__controls">
          <div class="pg-brand-pills" role="radiogroup" aria-label="Selecionar brand">
            <button
              v-for="b in BRANDS"
              :key="b.value || 'neutral'"
              type="button"
              role="radio"
              :aria-checked="activeBrand === b.value"
              :class="['pg-pill', `pg-pill--${b.value || 'neutral'}`, { 'is-active': activeBrand === b.value }]"
              @click="activeBrand = b.value"
            >
              <span class="pg-pill__dot" aria-hidden="true"></span>
              {{ b.label }}
            </button>
          </div>

          <div class="pg-hero__actions">
            <button
              type="button"
              class="pg-icon-btn"
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
              class="pg-icon-btn"
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
      </div>
    </header>

    <!-- ══════════════════════════════════════════════════════════════════
         BODY: SIDEBAR + MAIN
    ══════════════════════════════════════════════════════════════════ -->
    <div class="pg-body" :class="{ 'is-nav-collapsed': navCollapsed }">

      <!-- Menu interno com busca e retração -->
      <aside
        class="pg-nav"
        :class="{ 'is-collapsed': navCollapsed }"
        aria-label="Navegação por seção"
      >
        <div class="pg-nav__head">
          <span class="pg-nav__title">Seções</span>
          <button
            type="button"
            class="pg-nav__toggle"
            :title="navCollapsed ? 'Expandir navegação' : 'Retrair navegação'"
            :aria-label="navCollapsed ? 'Expandir navegação' : 'Retrair navegação'"
            :aria-expanded="!navCollapsed"
            @click="navCollapsed = !navCollapsed"
          >
            <span class="material-icons">{{ navCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
          </button>
        </div>

        <div v-show="!navCollapsed" class="pg-nav__search">
          <span class="material-icons pg-nav__search-icon">search</span>
          <input
            v-model="query"
            type="search"
            placeholder="Buscar seção…"
            class="pg-nav__search-input"
            aria-label="Filtrar seções"
          />
          <button
            v-if="query"
            class="pg-nav__search-clear"
            type="button"
            aria-label="Limpar busca"
            @click="query = ''"
          >
            <span class="material-icons">close</span>
          </button>
        </div>

        <ul class="pg-nav__list" @mouseover="onNavOver" @mouseout="onNavOut">
          <li v-for="s in sections" :key="s.id">
            <a
              :href="`#pg-${s.id}`"
              :aria-label="s.title"
              :class="['pg-nav__link', {
                'is-hidden': !visibleIds.has(s.id),
                'is-active': activeSection === s.id
              }]"
              @click.prevent="scrollTo(s.id)"
            >
              <span class="pg-nav__index">{{ s.index }}</span>
              <span class="pg-nav__name">{{ s.title }}</span>
            </a>
          </li>
        </ul>
      </aside>

      <main class="pg-main" :data-density="density">
        <slot />
      </main>
    </div>

    <!-- Tooltip dos itens (modo retraído) — balão fixo à direita, mesma UI do menu principal -->
    <div
      v-if="navTip.show"
      class="pg-navtip"
      :style="{ top: navTip.y + 'px', left: navTip.x + 'px' }"
    >{{ navTip.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import './playground.scss'

interface SectionMeta { id: string; index: string; title: string }
interface Kpi { value: string | number; label: string }

const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  code?: string
  sections: SectionMeta[]
  kpis?: Kpi[]
}>(), {
  subtitle: 'Contrato canônico ·',
  code: '',
  kpis: () => [],
})

// ── Estado universal da casca ──────────────────────────────────────────────
const BRANDS = [
  { label: 'Neutro', value: '' },
  { label: 'Hub',    value: 'hub' },
  { label: 'Water',  value: 'water' },
  { label: 'Waste',  value: 'waste' },
]

const activeBrand = ref('')
const isDark = ref(false)
const density = ref<'comfortable' | 'compact'>('comfortable')
const query = ref('')
const navCollapsed = ref(false)
const activeSection = ref<string>(props.sections[0]?.id ?? '')

// Tooltip estilizado (à direita) dos itens quando o menu está retraído. Usa um
// <div> próprio (não QTooltip) para fugir dos estilos default do Quasar
// (preto/grande, com !important em @layer) e garantir a MESMA UI do menu principal.
const navTip = ref({ show: false, text: '', x: 0, y: 0 })
function onNavOver(e: MouseEvent) {
  if (!navCollapsed.value) return
  const link = (e.target as HTMLElement).closest?.('.pg-nav__link')
  if (!link) return
  const text = link.querySelector('.pg-nav__name')?.textContent?.trim()
  if (!text) return
  const r = link.getBoundingClientRect()
  navTip.value = { show: true, text, x: r.right + 10, y: r.top + r.height / 2 }
}
function onNavOut(e: MouseEvent) {
  if (!(e.relatedTarget as HTMLElement)?.closest?.('.pg-nav__link')) navTip.value.show = false
}

function toggleDensity() {
  density.value = density.value === 'compact' ? 'comfortable' : 'compact'
}

// Filtro por busca (procura em title + id) — provido às PgSection (v-if).
const visibleIds = computed<Set<string>>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return new Set(props.sections.map(s => s.id))
  return new Set(
    props.sections
      .filter(s => s.title.toLowerCase().includes(q) || s.id.toLowerCase().includes(q))
      .map(s => s.id)
  )
})
provide('pg-visibleIds', visibleIds)

function scrollTo(id: string) {
  const el = document.getElementById(`pg-${id}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  activeSection.value = id
}

// ── Scroll spy (active section) ────────────────────────────────────────────
let observer: IntersectionObserver | null = null

function observeSections() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) {
        const id = (visible.target as HTMLElement).id.replace('pg-', '')
        if (id) activeSection.value = id
      }
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
  )
  props.sections.forEach(s => {
    const el = document.getElementById(`pg-${s.id}`)
    if (el) observer!.observe(el)
  })
}

onMounted(async () => {
  await nextTick()
  observeSections()
})

// Re-observa quando a lista visível muda (filtro de busca cria/remove seções).
watch(visibleIds, async () => {
  await nextTick()
  observeSections()
})

onBeforeUnmount(() => observer?.disconnect())
</script>
