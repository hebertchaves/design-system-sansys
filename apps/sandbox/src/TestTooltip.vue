<template>
  <PlaygroundLayout
    title="DssTooltip — Playground"
    code="base/DssTooltip"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. A visibilidade é do consumidor ───────────────────────────── -->
    <PgSection
      id="visibilidade" index="01" title="A visibilidade é do consumidor" :count="3"
      desc="O DssTooltip NÃO governa a própria visibilidade nem se posiciona — é decisão de governança registrada na doc do componente. Consequência prática que precisa ficar visível: sem ligar visible, ele renderiza markup que nunca aparece. Quem monta a tela é que liga o gatilho."
    >
      <PgGrid>
        <PgTile code="sem `visible` — nunca aparece" align="center">
          <DssButton label="Passe o mouse" variant="outline" size="sm" />
          <DssTooltip>Esta dica nunca aparece</DssTooltip>
        </PgTile>
        <PgTile code="visible fixo em true" align="center">
          <DssTooltip visible>Sempre visível</DssTooltip>
        </PgTile>
        <PgTile code="gatilho ligado pelo consumidor" align="center">
          <span
            class="tt-ancora"
            @mouseenter="dica = true"
            @mouseleave="dica = false"
            @focusin="dica = true"
            @focusout="dica = false"
          >
            <DssButton label="Passe o mouse" variant="outline" size="sm" />
            <DssTooltip :visible="dica">Dica ligada por hover e foco</DssTooltip>
          </span>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Cor semântica ────────────────────────────────────────────── -->
    <PgSection
      id="cores" index="02" title="Cor semântica" :count="CORES.length"
      desc="Seis cores, todas com visible fixo para inspeção. O que se mede é o contraste do texto sobre o fundo de cada cor, nos DOIS temas — dica é conteúdo e precisa passar AA, e o tema escuro é onde as claras falham."
    >
      <PgGrid>
        <PgTile v-for="c in CORES" :key="c" :code="`color=&quot;${c}&quot;`" align="center">
          <DssTooltip visible :color="c">Dica em {{ c }}</DssTooltip>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Texto longo e quebra ─────────────────────────────────────── -->
    <PgSection
      id="texto" index="03" title="Texto longo e quebra" :count="3"
      desc="Por padrão a dica é de uma linha e não quebra. multiLine libera a quebra e impõe largura máxima. Dica que quebra sem multiLine estica a linha indefinidamente — é o defeito que aparece quando o texto vem de dado, não de literal."
    >
      <PgGrid>
        <PgTile code="curta, padrão" align="center">
          <DssTooltip visible>Formato: 00.000-000</DssTooltip>
        </PgTile>
        <PgTile code="longa SEM multiLine" align="center">
          <DssTooltip visible>{{ TEXTO_LONGO }}</DssTooltip>
        </PgTile>
        <PgTile code="longa COM multiLine" align="center">
          <DssTooltip visible multi-line>{{ TEXTO_LONGO }}</DssTooltip>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Conteúdo: prop label × slot ──────────────────────────────── -->
    <PgSection
      id="conteudo" index="04" title="Conteúdo — prop label × slot" :count="2"
      desc="A prop label cobre o caso de texto simples; o slot default cobre conteúdo composto. Dica não é lugar de ação: ela não recebe foco, então botão dentro de tooltip é inalcançável por teclado."
    >
      <PgGrid>
        <PgTile code='prop label="…"' align="center">
          <DssTooltip visible label="Texto pela prop" />
        </PgTile>
        <PgTile code="slot default" align="center">
          <DssTooltip visible>Texto pelo <strong>slot</strong></DssTooltip>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection
      id="brand" index="05" title="Brandabilidade" :count="6"
      desc="A prop brand e o ancestral [data-brand] precisam concordar quando a cor é a de ação. Cor semântica (negative, warning) não brandeia — significado não muda com a marca."
    >
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="`p-${b}`" :code="`prop brand=&quot;${b}&quot;`" align="center">
          <DssTooltip visible color="primary" :brand="b">Dica {{ b }}</DssTooltip>
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`a-${b}`" :code="`ancestral [data-brand=&quot;${b}&quot;]`" align="center">
          <div :data-brand="b">
            <DssTooltip visible color="primary">Dica {{ b }}</DssTooltip>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="06" title="Exemplos de uso" :count="2"
      desc="O caso que mais aparece: ícone sem rótulo visível. A dica NÃO substitui o nome acessível — o botão continua precisando de aria-label, porque a dica não é anunciada ao navegar por teclado sem hover."
    >
      <PgGrid>
        <PgTile code="dica em ícone sem rótulo" align="center">
          <span
            class="tt-ancora"
            @mouseenter="dica2 = true"
            @mouseleave="dica2 = false"
            @focusin="dica2 = true"
            @focusout="dica2 = false"
          >
            <DssButton variant="flat" size="sm" icon="info" aria-label="Sobre este campo" />
            <DssTooltip :visible="dica2">Formato aceito: 00.000-000</DssTooltip>
          </span>
        </PgTile>
      </PgGrid>
      <DssTooltipExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssTooltip from '@components/base/DssTooltip/DssTooltip.vue'
import DssTooltipExample from '@components/base/DssTooltip/DssTooltip.example.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

const dica = ref(false)
const dica2 = ref(false)

const BRANDS = ['hub', 'water', 'waste'] as const
const CORES = ['dark', 'primary', 'positive', 'negative', 'warning', 'info'] as const

const TEXTO_LONGO =
  'Texto longo o bastante para quebrar em mais de uma linha e mostrar o comportamento do modo multilinha.'

const SECTIONS = [
  { id: 'visibilidade', index: '01', title: 'A visibilidade é do consumidor' },
  { id: 'cores',        index: '02', title: 'Cor semântica' },
  { id: 'texto',        index: '03', title: 'Texto longo e quebra' },
  { id: 'conteudo',     index: '04', title: 'Conteúdo — prop label × slot' },
  { id: 'brand',        index: '05', title: 'Brandabilidade' },
  { id: 'exemplos',     index: '06', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 7,             label: 'Props' },
  { value: CORES.length,  label: 'Cores' },
  { value: BRANDS.length, label: 'Brands' },
  { value: 1,             label: 'Slot' },
]
</script>

<style scoped>
/* O posicionamento da dica é do CONSUMIDOR — o DssTooltip declara
   posicionamento fora de escopo. Este é o mínimo para a dica não empurrar o
   layout ao aparecer. */
.tt-ancora {
  position: relative;
  display: inline-flex;
}

.tt-ancora :deep(.dss-tooltip) {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--dss-spacing-1);
  white-space: nowrap;
  z-index: 1;
}
</style>
