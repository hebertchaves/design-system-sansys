<template>
  <PlaygroundLayout
    title="DssPagination — Playground"
    code="base/DssPagination"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Escala de tamanho ────────────────────────────────────────── -->
    <PgSection
      id="tamanhos" index="01" title="Escala de tamanho" :count="TAMANHOS.length"
      desc="A altura vem de --dss-compact-control-height-{xs,sm,md,lg} e precisa de !important: o QPagination escreve min-height: 0px INLINE em cada botão, e contra estilo inline não existe especificidade. O ícone das setas também é escalado — com o 24px fixo do QIcon a seta estourava o xs e passava a definir a altura no lugar do token."
    >
      <PgGrid>
        <PgTile v-for="t in TAMANHOS" :key="t" :code="`size=&quot;${t}&quot;`" align="center">
          <DssPagination v-model="pagina" :max="9" :size="t" :aria-label="`Paginação ${t}`" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Respiro e largura da caixa ───────────────────────────────── -->
    <PgSection
      id="respiro" index="02" title="Respiro e largura da caixa" :count="2"
      desc="Quem garante a caixa é o min-width do token; o padding horizontal é respiro. Os 16px herdados do QBtn davam 32px de padding para 4px de dígito — medido, 36px de largura para o número 1. Compare o dígito único com 3 dígitos: a caixa cresce sozinha, que era o motivo original de manter padding."
    >
      <PgGrid>
        <PgTile code="poucas páginas (1 dígito)" align="center">
          <DssPagination v-model="pagina" :max="5" size="sm" aria-label="Paginação curta" />
        </PgTile>
        <PgTile code="muitas páginas (3 dígitos)" align="center">
          <DssPagination v-model="paginaLonga" :max="250" :max-pages="5" size="sm" ellipses aria-label="Paginação longa" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Setas, limites e reticências ─────────────────────────────── -->
    <PgSection
      id="navegacao" index="03" title="Setas, limites e reticências" :count="4"
      desc="directionLinks dá anterior/próxima; boundaryLinks dá primeira/última; ellipses resume o meio. As setas NÃO ficam dentro do .q-pagination__middle — são irmãs dele dentro do __content, e por isso o espaçamento entre os três grupos mora no gap do __content, não no do middle."
    >
      <PgGrid>
        <PgTile code="só numerais" align="center">
          <DssPagination v-model="pagina" :max="9" size="sm" aria-label="Somente numerais" />
        </PgTile>
        <PgTile code="directionLinks" align="center">
          <DssPagination v-model="pagina" :max="9" size="sm" direction-links aria-label="Com setas" />
        </PgTile>
        <PgTile code="boundaryLinks" align="center">
          <DssPagination v-model="pagina" :max="9" size="sm" direction-links boundary-links aria-label="Com limites" />
        </PgTile>
        <PgTile code="ellipses + maxPages" align="center">
          <DssPagination v-model="paginaLonga" :max="120" :max-pages="7" size="sm" ellipses direction-links aria-label="Com reticências" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Aparência ────────────────────────────────────────────────── -->
    <PgSection
      id="aparencia" index="04" title="Aparência" :count="4"
      desc="flat, outline e round mudam a pele dos botões sem mexer na caixa. A página ativa usa --q-color-primary, que o componente remapeia para --dss-action-primary — é o único caminho de ligar a marca ao QPagination sem :deep() nem !important."
    >
      <PgGrid>
        <PgTile code="padrão" align="center">
          <DssPagination v-model="pagina" :max="7" size="sm" aria-label="Padrão" />
        </PgTile>
        <PgTile code="flat" align="center">
          <DssPagination v-model="pagina" :max="7" size="sm" flat aria-label="Flat" />
        </PgTile>
        <PgTile code="outline" align="center">
          <DssPagination v-model="pagina" :max="7" size="sm" outline aria-label="Outline" />
        </PgTile>
        <PgTile code="round" align="center">
          <DssPagination v-model="pagina" :max="7" size="sm" round aria-label="Round" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Estados ──────────────────────────────────────────────────── -->
    <PgSection
      id="estados" index="05" title="Estados" :count="3"
      desc="disable aplica --dss-opacity-disabled e corta o ponteiro; readonly só corta o ponteiro, preservando a leitura do número da página. O foco de teclado usa o anel próprio (dss-focus-ring) no botão visível — navegue com Tab para conferir."
    >
      <PgGrid>
        <PgTile code="padrão" align="center">
          <DssPagination v-model="pagina" :max="7" size="sm" direction-links aria-label="Estado padrão" />
        </PgTile>
        <PgTile code="disable" align="center">
          <DssPagination v-model="pagina" :max="7" size="sm" direction-links disable aria-label="Desabilitada" />
        </PgTile>
        <PgTile code="readonly" align="center">
          <DssPagination v-model="pagina" :max="7" size="sm" direction-links readonly aria-label="Somente leitura" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection
      id="brand" index="06" title="Brandabilidade" :count="6"
      desc="A prop brand emite data-brand no nó raiz e o [data-brand] ancestral alcança o mesmo bloco — os dois caminhos remapeiam --q-color-primary, que é o que pinta a página ativa. Os três blocos por marca foram colapsados num só porque --dss-action-primary já é brand-aware."
    >
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="`p-${b}`" :code="`prop brand=&quot;${b}&quot;`" align="center">
          <DssPagination v-model="pagina" :max="5" size="sm" :brand="b" :aria-label="`Marca ${b} por prop`" />
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`a-${b}`" :code="`ancestral [data-brand=&quot;${b}&quot;]`" align="center">
          <div :data-brand="b">
            <DssPagination v-model="pagina" :max="5" size="sm" :aria-label="`Marca ${b} por ancestral`" />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="07" title="Exemplos de uso" :count="1"
      desc="Cenários reais, vindos do DssPagination.example.vue do próprio componente."
    >
      <DssPaginationExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssPagination from '@components/base/DssPagination/DssPagination.vue'
import DssPaginationExample from '@components/base/DssPagination/DssPagination.example.vue'

const pagina = ref(3)
const paginaLonga = ref(42)

const BRANDS = ['hub', 'water', 'waste'] as const
const TAMANHOS = ['xs', 'sm', 'md', 'lg'] as const

const SECTIONS = [
  { id: 'tamanhos',  index: '01', title: 'Escala de tamanho' },
  { id: 'respiro',   index: '02', title: 'Respiro e largura da caixa' },
  { id: 'navegacao', index: '03', title: 'Setas, limites e reticências' },
  { id: 'aparencia', index: '04', title: 'Aparência' },
  { id: 'estados',   index: '05', title: 'Estados' },
  { id: 'brand',     index: '06', title: 'Brandabilidade' },
  { id: 'exemplos',  index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 14,               label: 'Props' },
  { value: TAMANHOS.length,  label: 'Tamanhos' },
  { value: BRANDS.length,    label: 'Brands' },
  { value: 1,                label: 'Evento' },
]
</script>
