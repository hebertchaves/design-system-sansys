<template>
  <PlaygroundLayout
    title="DssChip — Playground"
    code="base/DssChip"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ───────────────────────────────────────────────── -->
    <PgSection id="variantes" index="01" title="Variantes" :count="VARIANTS.length"
      desc="Prop variant — filled (default), outline e flat. Grafia `outline` espelha o QBtn do Quasar (não `outlined`, que é do QField); o gate validate:variant-naming trava isso.">
      <PgGrid>
        <PgTile align="start" v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`">
          <DssChip :variant="v" :label="capitalize(v)" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Tamanhos ────────────────────────────────────────────────── -->
    <PgSection id="tamanhos" index="02" title="Tamanhos" :count="SIZES.length"
      desc="Prop size — xs, sm, md (default), lg. Altura vem de --dss-compact-control-height-*, a escala compartilhada com badge/checkbox/radio/toggle.">
      <PgGrid>
        <PgTile align="start" v-for="s in SIZES" :key="s" :code="`size=&quot;${s}&quot;`">
          <DssChip :size="s" :label="s.toUpperCase()" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Cores semânticas ────────────────────────────────────────── -->
    <PgSection id="cores" index="03" title="Cores Semânticas" :count="COLORS.length"
      desc="União literal com 8 cores semânticas + `neutral`. A neutral é token de VALOR (dado escolhido, filtro, tag) e a única agnóstica de brand — não muda com Hub/Water/Waste.">
      <PgGrid>
        <PgTile align="start" v-for="c in COLORS" :key="c" :code="`color=&quot;${c}&quot;`">
          <DssChip :color="c" :label="capitalize(c)" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="04" title="Estados" :count="4"
      desc="Repouso, selecionado, disabled e clicável. `clickable` é o que habilita hover/active e o papel interativo — sem ele o chip é apresentação.">
      <PgGrid>
        <PgTile align="start" code="repouso">
          <DssChip label="Repouso" />
        </PgTile>
        <PgTile align="start" code=":selected=&quot;true&quot;">
          <DssChip label="Selecionado" selected />
        </PgTile>
        <PgTile align="start" code=":disable=&quot;true&quot;">
          <DssChip label="Desabilitado" disable />
        </PgTile>
        <PgTile align="start" code=":clickable=&quot;true&quot;">
          <DssChip label="Clicável" clickable @click="cliques++" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Ícones ──────────────────────────────────────────────────── -->
    <PgSection id="icones" index="05" title="Ícones" :count="4"
      desc="icon (esquerda), iconRight, iconSelected (troca o glifo quando selected) e iconRemove. Todos compostos via DssIcon — o CCI proíbe font-family de ícone no SCSS do componente.">
      <PgGrid>
        <PgTile align="start" code="icon=&quot;label&quot;">
          <DssChip label="Com ícone" icon="label" />
        </PgTile>
        <PgTile align="start" code="icon-right=&quot;expand_more&quot;">
          <DssChip label="À direita" icon-right="expand_more" />
        </PgTile>
        <PgTile align="start" code="selected + icon-selected">
          <DssChip label="Selecionado" selected icon-selected="check_circle" />
        </PgTile>
        <PgTile align="start" code="removable + icon-remove">
          <DssChip label="Removível" removable icon-remove="close" @remove="removidos++" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Forma ───────────────────────────────────────────────────── -->
    <PgSection id="forma" index="06" title="Forma & Densidade" :count="4"
      desc="round arredonda por completo (pílula), square deixa reto; dense reduz a densidade visual. Sem prop, o chip usa o raio padrão do DSS.">
      <PgGrid>
        <PgTile align="start" code="padrão">
          <DssChip label="Padrão" />
        </PgTile>
        <PgTile align="start" code=":round=&quot;true&quot;">
          <DssChip label="Round" round />
        </PgTile>
        <PgTile align="start" code=":square=&quot;true&quot;">
          <DssChip label="Square" square />
        </PgTile>
        <PgTile align="start" code=":dense=&quot;true&quot;">
          <DssChip label="Dense" dense />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Remoção ─────────────────────────────────────────────────── -->
    <PgSection id="remocao" index="07" title="Remoção" :count="1"
      desc="removable expõe um botão próprio com aria-label dedicado (removeAriaLabel). O evento `remove` é separado do `click` — remover não é clicar no chip.">
      <PgGrid>
        <PgTile align="start" :code="`removidos: ${removidos}`">
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            <DssChip
              v-for="t in tags"
              :key="t"
              :label="t"
              removable
              color="neutral"
              @remove="removerTag(t)"
            />
            <em v-if="!tags.length" style="font-size:12px; opacity:.7">todas removidas</em>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="08" title="Brandabilidade" :count="BRAND_KEYS.length"
      desc="Prop brand sobrescreve a cor de ação. Reage também a [data-brand] global — use as pílulas do topo para comparar os dois caminhos. A cor `neutral` não muda com brand, de propósito.">
      <PgGrid>
        <PgTile align="start" v-for="b in BRAND_KEYS" :key="b" :code="`brand=&quot;${b}&quot;`">
          <DssChip :brand="b" :label="brandLabel(b)" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Matriz ──────────────────────────────────────────────────── -->
    <PgSection id="matriz" index="09" title="Matriz Variante × Estado" :count="VARIANTS.length * 4"
      desc="Cobertura combinatória para inspeção visual rápida: cada variante em repouso, selecionado, disabled e removível.">
      <div class="pg-matrix">
        <div v-for="v in VARIANTS" :key="v" class="pg-matrix-row">
          <div class="pg-matrix-row__label">{{ v }}</div>
          <div class="pg-matrix-row__items">
            <DssChip :variant="v" label="Repouso" />
            <DssChip :variant="v" label="Selecionado" selected />
            <DssChip :variant="v" label="Disabled" disable />
            <DssChip :variant="v" label="Removível" removable />
          </div>
        </div>
      </div>
    </PgSection>

    <!-- ── 10. Exemplos de uso (.example.vue como fonte) ───────────────── -->
    <PgSection id="exemplos" index="10" title="Exemplos de uso" :count="1"
      desc="Composições reais do DssChip.example.vue — fonte única, também usável na documentação.">
      <DssChipExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssChip from '@components/base/DssChip/DssChip.vue'
import DssChipExample from '@components/base/DssChip/DssChip.example.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssChip (vide types/chip.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['filled', 'outline', 'flat'] as const
const SIZES = ['xs', 'sm', 'md', 'lg'] as const
const COLORS = [
  'primary', 'secondary', 'tertiary', 'accent',
  'positive', 'negative', 'warning', 'info', 'neutral',
] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

const SECTIONS = [
  { id: 'variantes', index: '01', title: 'Variantes' },
  { id: 'tamanhos',  index: '02', title: 'Tamanhos' },
  { id: 'cores',     index: '03', title: 'Cores Semânticas' },
  { id: 'estados',   index: '04', title: 'Estados' },
  { id: 'icones',    index: '05', title: 'Ícones' },
  { id: 'forma',     index: '06', title: 'Forma & Densidade' },
  { id: 'remocao',   index: '07', title: 'Remoção' },
  { id: 'brand',     index: '08', title: 'Brandabilidade' },
  { id: 'matriz',    index: '09', title: 'Matriz Variante × Estado' },
  { id: 'exemplos',  index: '10', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: VARIANTS.length,   label: 'Variantes' },
  { value: SIZES.length,      label: 'Tamanhos' },
  { value: COLORS.length,     label: 'Cores' },
  { value: BRAND_KEYS.length, label: 'Brands' },
]

const cliques = ref(0)
const removidos = ref(0)
const tags = ref(['Ativo', 'Pendente', 'Arquivado'])
const removerTag = (t: string) => {
  tags.value = tags.value.filter(x => x !== t)
  removidos.value++
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>
