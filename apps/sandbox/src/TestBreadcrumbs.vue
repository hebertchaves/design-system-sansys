<template>
  <PlaygroundLayout
    title="DssBreadcrumbs — Playground"
    code="base/DssBreadcrumbs"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Anatomia ────────────────────────────────────────────────── -->
    <PgSection id="anatomia" index="01" title="Anatomia" :count="3"
      desc="A trilha é o container; cada degrau é um DssBreadcrumbsEl. O último item é a página atual — sem to nem href, ele não é link e recebe peso semibold.">
      <PgGrid class="pg-grid--full">
        <PgTile code="trilha completa" align="start">
          <DssBreadcrumbs>
            <DssBreadcrumbsEl label="Início" href="#" />
            <DssBreadcrumbsEl label="Solicitações" href="#" />
            <DssBreadcrumbsEl label="Detalhe" />
          </DssBreadcrumbs>
        </PgTile>
        <PgTile code="com ícones" align="start">
          <DssBreadcrumbs>
            <DssBreadcrumbsEl label="Início" icon="home" href="#" />
            <DssBreadcrumbsEl label="Relatórios" icon="insert_chart" href="#" />
            <DssBreadcrumbsEl label="Consumo" icon="water_drop" />
          </DssBreadcrumbs>
        </PgTile>
        <PgTile code="só ícone (sem label)" align="start">
          <DssBreadcrumbs>
            <DssBreadcrumbsEl icon="home" href="#" />
            <DssBreadcrumbsEl label="Conta" href="#" />
            <DssBreadcrumbsEl label="Preferências" />
          </DssBreadcrumbs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Separador ───────────────────────────────────────────────── -->
    <PgSection id="separador" index="02" title="Separador" :count="4"
      desc="Prop separator troca o caractere entre os degraus. O separador é decorativo — o QBreadcrumbs já o marca com aria-hidden.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="s in SEPARADORES" :key="s.code" :code="s.code" align="start">
          <DssBreadcrumbs :separator="s.valor">
            <DssBreadcrumbsEl label="Início" href="#" />
            <DssBreadcrumbsEl label="Nível 2" href="#" />
            <DssBreadcrumbsEl label="Atual" />
          </DssBreadcrumbs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Espaçamento ─────────────────────────────────────────────── -->
    <PgSection id="gutter" index="03" title="Espaçamento (gutter)" :count="GUTTERS.length"
      desc="Prop gutter governa a distância entre degrau e separador: sm 8px, md 12px (padrão), lg 16px.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="g in GUTTERS" :key="g" :code="`gutter=&quot;${g}&quot;`" align="start">
          <DssBreadcrumbs :gutter="g">
            <DssBreadcrumbsEl label="Início" href="#" />
            <DssBreadcrumbsEl label="Nível 2" href="#" />
            <DssBreadcrumbsEl label="Atual" />
          </DssBreadcrumbs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Alinhamento ─────────────────────────────────────────────── -->
    <PgSection id="alinhamento" index="04" title="Alinhamento" :count="ALINHAMENTOS.length"
      desc="Prop align posiciona a trilha na largura disponível. Só é observável quando o container é mais largo que a trilha — por isso os tiles abaixo têm largura cheia.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="a in ALINHAMENTOS" :key="a" :code="`align=&quot;${a}&quot;`" align="start">
          <DssBreadcrumbs :align="a" class="tb-largura">
            <DssBreadcrumbsEl label="Início" href="#" />
            <DssBreadcrumbsEl label="Nível 2" href="#" />
            <DssBreadcrumbsEl label="Atual" />
          </DssBreadcrumbs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Estados do degrau ───────────────────────────────────────── -->
    <PgSection id="estados" index="05" title="Estados do degrau" :count="3"
      desc="Clicável (com to ou href) é link e reage a hover e foco; atual é o último degrau, sem link; disable bloqueia a navegação e esmaece.">
      <PgGrid class="pg-grid--full">
        <PgTile code="clicável · atual · disable" align="start">
          <DssBreadcrumbs>
            <DssBreadcrumbsEl label="Clicável" href="#" />
            <DssBreadcrumbsEl label="Desabilitado" href="#" disable />
            <DssBreadcrumbsEl label="Atual (sem href)" />
          </DssBreadcrumbs>
        </PgTile>
      </PgGrid>
      <p class="tb-nota">Navegue por Tab para ver o anel de foco no degrau clicável.</p>
    </PgSection>

    <!-- ── 06. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="06" title="Brandabilidade" :count="BRANDS.length * 2"
      desc="A marca colore o degrau clicável e o separador. Duas vias: a prop brand e o [data-brand] herdado — e o hover precisa continuar mudando de cor em ambas.">
      <template v-for="b in BRANDS" :key="b">
        <h3 class="tb-brand-titulo">{{ brandLabel(b) }}</h3>
        <PgGrid class="pg-grid--full">
          <PgTile :code="`prop brand=&quot;${b}&quot;`" align="start">
            <DssBreadcrumbs :brand="b">
              <DssBreadcrumbsEl label="Início" href="#" />
              <DssBreadcrumbsEl label="Nível 2" href="#" />
              <DssBreadcrumbsEl label="Atual" />
            </DssBreadcrumbs>
          </PgTile>
          <PgTile :code="`[data-brand=&quot;${b}&quot;] ancestral`" align="start">
            <div :data-brand="b">
              <DssBreadcrumbs>
                <DssBreadcrumbsEl label="Início" href="#" />
                <DssBreadcrumbsEl label="Nível 2" href="#" />
                <DssBreadcrumbsEl label="Atual" />
              </DssBreadcrumbs>
            </div>
          </PgTile>
        </PgGrid>
      </template>
    </PgSection>

    <!-- ── 07. Matriz ──────────────────────────────────────────────────── -->
    <PgSection id="matriz" index="07" title="Matriz gutter × separador" :count="GUTTERS.length"
      desc="Cobertura combinatória para inspeção rápida: cada gutter com um separador diferente.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="(g, i) in GUTTERS" :key="g" :code="`gutter=&quot;${g}&quot; · separator=&quot;${SEPARADORES[i].valor}&quot;`" align="start">
          <DssBreadcrumbs :gutter="g" :separator="SEPARADORES[i].valor">
            <DssBreadcrumbsEl label="Início" icon="home" href="#" />
            <DssBreadcrumbsEl label="Nível 2" href="#" />
            <DssBreadcrumbsEl label="Atual" />
          </DssBreadcrumbs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Exemplos ────────────────────────────────────────────────── -->
    <PgSection id="exemplos" index="08" title="Exemplos de uso" :count="1"
      desc="Renderiza o DssBreadcrumbs.example.vue — fonte única, também usável na documentação.">
      <DssBreadcrumbsExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssBreadcrumbs from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssBreadcrumbsExample from '@components/base/DssBreadcrumbs/DssBreadcrumbs.example.vue'

// Template das páginas de teste. A página CONSOME o layout; não reimplementa
// casca, nav ou scroll-spy (premissa do DSS_DEFAULT_PREVIEW_WORKFLOW).
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica (vide DssBreadcrumbs/types/breadcrumbs.types.ts e
// DssBreadcrumbsEl/types/breadcrumbs-el.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const GUTTERS = ['sm', 'md', 'lg'] as const
const ALINHAMENTOS = ['left', 'center', 'right', 'between', 'around'] as const
const BRANDS = ['hub', 'water', 'waste'] as const

const SEPARADORES = [
  { code: 'padrão (/)', valor: '/' },
  { code: 'seta', valor: '›' },
  { code: 'traço', valor: '—' },
  { code: 'ponto', valor: '·' },
]

const SECTIONS = [
  { id: 'anatomia',    index: '01', title: 'Anatomia' },
  { id: 'separador',   index: '02', title: 'Separador' },
  { id: 'gutter',      index: '03', title: 'Espaçamento' },
  { id: 'alinhamento', index: '04', title: 'Alinhamento' },
  { id: 'estados',     index: '05', title: 'Estados do degrau' },
  { id: 'brand',       index: '06', title: 'Brandabilidade' },
  { id: 'matriz',      index: '07', title: 'Matriz' },
  { id: 'exemplos',    index: '08', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: GUTTERS.length,      label: 'Gutters' },
  { value: ALINHAMENTOS.length, label: 'Alinhamentos' },
  { value: BRANDS.length,       label: 'Brands' },
  { value: 3,                   label: 'Estados' },
]

const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>

<style scoped>
/* CONTEÚDO da demonstração, não casca de página. O alinhamento só é observável
   se a trilha tiver espaço sobrando — solta, ela encolhe até o conteúdo e os
   cinco valores de `align` ficam idênticos. */
.tb-largura {
  width: 100%;
}

.tb-brand-titulo {
  margin: var(--dss-spacing-4) 0 var(--dss-spacing-2);
  font-size: var(--dss-font-size-md);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
}

.tb-nota {
  margin: var(--dss-spacing-3) 0 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}
</style>
