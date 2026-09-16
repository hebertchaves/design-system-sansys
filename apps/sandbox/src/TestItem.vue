<template>
  <PlaygroundLayout
    title="DssItem — Playground"
    code="base/DssItem"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Conteúdo ────────────────────────────────────────────────── -->
    <PgSection id="conteudo" index="01" title="Conteúdo" :count="3"
      desc="label e caption montam o conteúdo padrão. O slot default SUBSTITUI os dois — é a porta para conteúdo arbitrário, não um acréscimo.">
      <PgGrid>
        <PgTile code="label" align="start">
          <DssItem label="Item simples" />
        </PgTile>
        <PgTile code="label + caption" align="start">
          <DssItem label="Item com caption" caption="Descrição secundária" />
        </PgTile>
        <PgTile code="slot default" align="start">
          <DssItem>
            <strong>Conteúdo livre</strong>
          </DssItem>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Seções ──────────────────────────────────────────────────── -->
    <PgSection id="secoes" index="02" title="Seções laterais" :count="3"
      desc="Slots leading e trailing. leadingDecorative/trailingDecorative marcam a seção como aria-hidden — use quando o conteúdo é ornamento e o label já diz tudo.">
      <PgGrid>
        <PgTile code="#leading" align="start">
          <DssItem label="Início" caption="Ícone à esquerda" leading-decorative>
            <template #leading><DssIcon name="home" decorative /></template>
          </DssItem>
        </PgTile>
        <PgTile code="#trailing" align="start">
          <DssItem label="Notificações" caption="Contador à direita" trailing-decorative>
            <template #trailing><DssBadge color="negative" label="3" /></template>
          </DssItem>
        </PgTile>
        <PgTile code="ambos" align="start">
          <DssItem label="Configurações" leading-decorative trailing-decorative>
            <template #leading><DssIcon name="settings" decorative /></template>
            <template #trailing><DssIcon name="chevron_right" decorative /></template>
          </DssItem>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Densidade ───────────────────────────────────────────────── -->
    <PgSection id="densidade" index="03" title="Densidade" :count="DENSITIES.length"
      desc="Prop density. compact reduz o padding vertical para listas longas; o alvo de toque continua garantido pelo ::before (WCAG 2.5.5).">
      <PgGrid>
        <PgTile v-for="d in DENSITIES" :key="d" :code="`density=&quot;${d}&quot;`" align="start">
          <DssItem :density="d" :label="capitalize(d)" caption="Duas linhas para comparar" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="04" title="Estados" :count="4"
      desc="clickable é o que torna o item interativo — sem ele não há hover, foco nem role=button. active marca seleção; disabled bloqueia e é anunciado por aria-disabled.">
      <PgGrid>
        <PgTile code="padrão (não interativo)" align="start">
          <DssItem label="Só leitura" caption="role=listitem" />
        </PgTile>
        <PgTile code="clickable" align="start">
          <DssItem clickable label="Clicável" caption="role=button, hover e foco" />
        </PgTile>
        <PgTile code="clickable + active" align="start">
          <DssItem clickable active label="Ativo" caption="Item selecionado" />
        </PgTile>
        <PgTile code="clickable + disabled" align="start">
          <DssItem clickable disabled label="Desabilitado" caption="aria-disabled=true" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Cores ───────────────────────────────────────────────────── -->
    <PgSection id="cores" index="05" title="Cores semânticas" :count="COLORS.length"
      desc="Prop color pinta o estado ATIVO — é indicação de seleção, não decoração do item em repouso.">
      <PgGrid>
        <PgTile v-for="c in COLORS" :key="c" :code="`color=&quot;${c}&quot;`" align="start">
          <DssItem clickable active :color="c" :label="capitalize(c)" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Divisor e recuo ─────────────────────────────────────────── -->
    <PgSection id="divisor" index="06" title="Divisor & recuo" :count="3"
      desc="divider desenha a borda inferior (--dss-border-default: #e5e5e5 no claro, #737373 no escuro — verificado nos dois temas). inset recua o conteúdo para alinhar com itens que têm seção leading.">
      <PgGrid>
        <PgTile code="divider" align="start">
          <div class="ti-lista">
            <DssItem divider label="Primeiro" />
            <DssItem divider label="Segundo" />
            <DssItem label="Terceiro (sem divisor)" />
          </div>
        </PgTile>
        <PgTile code="inset" align="start">
          <DssItem inset label="Recuado" caption="Alinha com itens que têm ícone" />
        </PgTile>
        <PgTile code="divider + inset" align="start">
          <div class="ti-lista">
            <DssItem divider label="Com ícone" leading-decorative>
              <template #leading><DssIcon name="folder" decorative /></template>
            </DssItem>
            <DssItem inset label="Filho recuado" />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="07" title="Brandabilidade" :count="BRANDS.length"
      desc="A cor do estado ativo acompanha a marca. Funciona pela prop brand e por [data-brand] herdado de um ancestral — os dois caminhos estão lado a lado abaixo.">
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="b" :code="`brand=&quot;${b}&quot;`" align="start">
          <DssItem clickable active :brand="b" :label="brandLabel(b)" caption="via prop" />
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`ctx-${b}`" :code="`[data-brand=&quot;${b}&quot;]`" align="start">
          <div :data-brand="b">
            <DssItem clickable active :label="brandLabel(b)" caption="via contexto" />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Acessibilidade ──────────────────────────────────────────── -->
    <PgSection id="a11y" index="08" title="Acessibilidade" :count="3"
      desc="O role é DERIVADO: listitem em repouso, button com clickable. ariaLabel cobre o item cujo conteúdo visual não basta; tabindex=-1 tira da ordem de tabulação sem desabilitar.">
      <PgGrid>
        <PgTile code="aria-label" align="start">
          <DssItem clickable aria-label="Abrir configurações da conta" leading-decorative>
            <template #leading><DssIcon name="settings" decorative /></template>
          </DssItem>
        </PgTile>
        <PgTile code="tabindex=&quot;-1&quot;" align="start">
          <DssItem clickable tabindex="-1" label="Fora da tabulação" caption="Ainda clicável" />
        </PgTile>
        <PgTile code="teclado" align="start">
          <DssItem clickable label="Enter e Espaço" caption="Acionam o click" @click="cliques++" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Composição real ─────────────────────────────────────────── -->
    <PgSection id="composicao" index="09" title="Composição real" :count="1"
      desc="O que o checklist pede e um catálogo não mostra: os modificadores juntos, numa lista de verdade, com um item selecionado.">
      <div class="ti-lista ti-lista--cartao">
        <DssItem
          v-for="(n, i) in NAV"
          :key="n.label"
          clickable
          :active="i === navAtivo"
          :divider="i < NAV.length - 1"
          :label="n.label"
          :caption="n.caption"
          leading-decorative
          trailing-decorative
          @click="navAtivo = i"
        >
          <template #leading><DssIcon :name="n.icon" decorative /></template>
          <template #trailing>
            <DssBadge v-if="n.badge" color="negative" :label="String(n.badge)" />
          </template>
        </DssItem>
      </div>
      <p class="ti-nota">Cliques registrados: <strong>{{ cliques }}</strong> · item ativo: <code>{{ NAV[navAtivo].label }}</code></p>
    </PgSection>

    <!-- ── 10. Exemplos (.example.vue como fonte) ──────────────────────── -->
    <PgSection id="exemplos" index="10" title="Exemplos de uso" :count="1"
      desc="Renderiza o DssItem.example.vue — fonte única, também usável na documentação.">
      <DssItemExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import { ref } from 'vue'
import DssItem from '@components/base/DssItem/DssItem.vue'
import DssIcon from '@components/base/DssIcon/DssIcon.vue'
import DssBadge from '@components/base/DssBadge/DssBadge.vue'
import DssItemExample from '@components/base/DssItem/DssItem.example.vue'

// Template das páginas de teste. A página CONSOME o layout; não reimplementa
// casca, nav ou scroll-spy (premissa do DSS_DEFAULT_PREVIEW_WORKFLOW).
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssItem (vide types/item.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const DENSITIES = ['default', 'compact'] as const
const COLORS = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info'] as const
const BRANDS = ['hub', 'water', 'waste'] as const

const SECTIONS = [
  { id: 'conteudo',   index: '01', title: 'Conteúdo' },
  { id: 'secoes',     index: '02', title: 'Seções laterais' },
  { id: 'densidade',  index: '03', title: 'Densidade' },
  { id: 'estados',    index: '04', title: 'Estados' },
  { id: 'cores',      index: '05', title: 'Cores' },
  { id: 'divisor',    index: '06', title: 'Divisor & recuo' },
  { id: 'brand',      index: '07', title: 'Brandabilidade' },
  { id: 'a11y',       index: '08', title: 'Acessibilidade' },
  { id: 'composicao', index: '09', title: 'Composição real' },
  { id: 'exemplos',   index: '10', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: COLORS.length,    label: 'Cores' },
  { value: DENSITIES.length, label: 'Densidades' },
  { value: BRANDS.length,    label: 'Brands' },
  { value: 3,                label: 'Slots' },
]

const NAV = [
  { label: 'Início',        caption: 'Painel geral',        icon: 'home',          badge: 0 },
  { label: 'Solicitações',  caption: '3 aguardando',        icon: 'inbox',         badge: 3 },
  { label: 'Relatórios',    caption: 'Consumo e cobrança',  icon: 'insert_chart',  badge: 0 },
  { label: 'Configurações', caption: 'Conta e preferências', icon: 'settings',     badge: 0 },
]

const navAtivo = ref(1)
const cliques = ref(0)

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>

<style scoped>
/* CONTEÚDO da demonstração, não casca de página.
   O DssItem é uma linha de largura total: solto num tile ele não mostra nem o
   divisor nem o empilhamento. Estes wrappers só dão a ele um contexto de lista —
   é o mínimo para os modificadores serem observáveis. */
.ti-lista {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.ti-lista--cartao {
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.ti-nota {
  margin: var(--dss-spacing-3) 0 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}
</style>
