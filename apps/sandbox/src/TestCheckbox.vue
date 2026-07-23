<template>
  <PlaygroundLayout
    title="DssCheckbox — Playground"
    code="base/DssCheckbox"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="01" title="Estados" :count="4"
      desc="unchecked (false), checked (true), indeterminate (modelValue null) e disabled. O ciclo de 3 estados vem da prop toggle-indeterminate.">
      <PgGrid>
        <PgTile code="unchecked (false)">
          <DssCheckbox label="Não marcado" v-model="m.stUnchecked" />
        </PgTile>
        <PgTile code="checked (true)">
          <DssCheckbox label="Marcado" v-model="m.stChecked" />
        </PgTile>
        <PgTile code="indeterminate (null)">
          <DssCheckbox label="Indeterminado" v-model="m.stIndeterminate" />
        </PgTile>
        <PgTile code=":disabled=&quot;true&quot;">
          <DssCheckbox label="Desabilitado" disabled v-model="m.stDisabled" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Tamanhos ────────────────────────────────────────────────── -->
    <PgSection id="tamanhos" index="02" title="Tamanhos" :count="SIZES.length"
      desc="Prop size — xs, sm, md (default), lg. O touch target (≥48px) é preservado em todos via ::before.">
      <PgGrid>
        <PgTile v-for="s in SIZES" :key="s" :code="`size=&quot;${s}&quot;`">
          <DssCheckbox :size="s" :label="s.toUpperCase()" v-model="m[`size-${s}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Cores semânticas ────────────────────────────────────────── -->
    <PgSection id="cores" index="03" title="Cores Semânticas" :count="COLORS.length"
      desc="Prop color — 8 tokens semânticos de ação/feedback. Marcado para exibir a cor de preenchimento.">
      <PgGrid>
        <PgTile v-for="c in COLORS" :key="c" :code="`color=&quot;${c}&quot;`">
          <DssCheckbox :color="c" :label="capitalize(c)" v-model="m[`color-${c}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Label & Posição ─────────────────────────────────────────── -->
    <PgSection id="label" index="04" title="Label & Posição" :count="3"
      desc="label à direita (padrão), left-label à esquerda e sem label (só o controle, com aria-label).">
      <PgGrid>
        <PgTile code="label (direita)">
          <DssCheckbox label="Aceito os termos" v-model="m.lblRight" />
        </PgTile>
        <PgTile code="left-label">
          <DssCheckbox label="Rótulo à esquerda" left-label v-model="m.lblLeft" />
        </PgTile>
        <PgTile code="sem label (aria-label)">
          <DssCheckbox aria-label="Sem rótulo visível" v-model="m.lblNone" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="05" title="Brandabilidade" :count="BRAND_KEYS.length"
      desc="Prop brand sobrescreve o accent (preenchimento + anel de foco). Reage também a [data-brand] global — use as pílulas do topo.">
      <PgGrid>
        <PgTile v-for="b in BRAND_KEYS" :key="b" :code="`brand=&quot;${b}&quot;`">
          <DssCheckbox :brand="b" :label="brandLabel(b)" v-model="m[`brand-${b}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Matriz Tamanho × Estado ─────────────────────────────────── -->
    <PgSection id="matriz" index="06" title="Matriz Tamanho × Estado" :count="SIZES.length * MATRIX_STATES.length"
      desc="Cobertura combinatória para inspeção visual rápida: cada tamanho em unchecked, checked, indeterminate e disabled.">
      <div v-for="s in SIZES" :key="s" class="pg-matrix-row">
        <div class="pg-matrix-row__label"><code>{{ s }}</code></div>
        <div class="pg-matrix-row__items">
          <DssCheckbox
            v-for="st in MATRIX_STATES"
            :key="s + st.key"
            :size="s"
            :label="st.label"
            :disabled="st.key === 'disabled'"
            v-model="m[`mx-${s}-${st.key}`]"
          />
        </div>
      </div>
    </PgSection>

    <!-- ── 07. Exemplos de uso (.example.vue como fonte) — última seção ──── -->
    <PgSection id="exemplos" index="07" title="Exemplos de uso" :count="1"
      desc="Composições reais do DssCheckbox.example.vue — fonte única, também usável na documentação.">
      <DssCheckboxExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssCheckbox from '@components/base/DssCheckbox/DssCheckbox.vue'
import DssCheckboxExample from '@components/base/DssCheckbox/DssCheckbox.example.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssCheckbox (vide types/checkbox.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const COLORS = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

const MATRIX_STATES = [
  { key: 'unchecked',     label: 'Off',      value: false as boolean | null },
  { key: 'checked',       label: 'On',       value: true  as boolean | null },
  { key: 'indeterminate', label: 'Ind.',     value: null  as boolean | null },
  { key: 'disabled',      label: 'Disabled', value: true  as boolean | null },
] as const

const SECTIONS = [
  { id: 'estados',  index: '01', title: 'Estados' },
  { id: 'tamanhos', index: '02', title: 'Tamanhos' },
  { id: 'cores',    index: '03', title: 'Cores Semânticas' },
  { id: 'label',    index: '04', title: 'Label & Posição' },
  { id: 'brand',    index: '05', title: 'Brandabilidade' },
  { id: 'matriz',   index: '06', title: 'Matriz Tam × Estado' },
  { id: 'exemplos', index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: SIZES.length,      label: 'Tamanhos' },
  { value: COLORS.length,     label: 'Cores' },
  { value: BRAND_KEYS.length, label: 'Brands' },
]

// Estado dos v-model — checkbox aceita boolean | null (null = indeterminate).
const m = reactive<Record<string, boolean | null>>({
  stUnchecked: false, stChecked: true, stIndeterminate: null, stDisabled: true,
  lblRight: true, lblLeft: true, lblNone: true,
})
// Semear as chaves geradas: checked p/ exibir cor/tamanho/brand; matriz por estado.
SIZES.forEach(s => { m[`size-${s}`] = true })
COLORS.forEach(c => { m[`color-${c}`] = true })
BRAND_KEYS.forEach(b => { m[`brand-${b}`] = true })
SIZES.forEach(s => MATRIX_STATES.forEach(st => { m[`mx-${s}-${st.key}`] = st.value }))

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>
