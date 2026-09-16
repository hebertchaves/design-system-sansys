<template>
  <PlaygroundLayout
    title="DssBtnToggle — Playground"
    code="base/DssBtnToggle"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ───────────────────────────────────────────────── -->
    <PgSection id="variantes" index="01" title="Variantes Visuais" :count="VARIANTS.length"
      desc="Prop variant — as mesmas 5 do DssButton (elevated, flat, outline, unelevated, push). O grupo inteiro adota a variante; não há mistura por opção.">
      <PgGrid>
        <PgTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`" align="start">
          <DssBtnToggle :model-value="'b'" :variant="v" :options="ALINHAR" aria-label="Alinhamento" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Conteúdo das opções ─────────────────────────────────────── -->
    <PgSection id="opcoes" index="02" title="Conteúdo das opções" :count="4"
      desc="Cada opção aceita label, icon ou os dois. A API exige pelo menos um: um botão sem rótulo e sem ícone não tem o que anunciar.">
      <PgGrid>
        <PgTile code="label" align="start">
          <DssBtnToggle :model-value="'m'" :options="PERIODO" aria-label="Período" />
        </PgTile>
        <PgTile code="icon" align="start">
          <DssBtnToggle :model-value="'b'" :options="ALINHAR" aria-label="Alinhamento" />
        </PgTile>
        <PgTile code="label + icon" align="start">
          <DssBtnToggle :model-value="'lista'" :options="VISAO" aria-label="Modo de visualização" />
        </PgTile>
        <PgTile code="disable por opção" align="start">
          <DssBtnToggle :model-value="'a'" :options="COM_DESABILITADA" aria-label="Com opção desabilitada" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Forma ───────────────────────────────────────────────────── -->
    <PgSection id="forma" index="03" title="Forma" :count="3"
      desc="rounded arredonda as extremidades do GRUPO (não de cada botão); square zera o raio. As faces internas continuam retas nos dois casos — é o que faz o conjunto ler como um controle só.">
      <PgGrid>
        <PgTile code="padrão" align="start">
          <DssBtnToggle :model-value="'m'" :options="PERIODO" aria-label="Período" />
        </PgTile>
        <PgTile code="rounded" align="start">
          <DssBtnToggle :model-value="'m'" rounded :options="PERIODO" aria-label="Período" />
        </PgTile>
        <PgTile code="square" align="start">
          <DssBtnToggle :model-value="'m'" square :options="PERIODO" aria-label="Período" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Largura ─────────────────────────────────────────────────── -->
    <PgSection id="largura" index="04" title="Largura" :count="2"
      desc="spread distribui as opções no espaço disponível; stretch estica o grupo na altura do container. Os dois tiles usam largura fixa — sem restringir, ambos viram no-op visual.">
      <PgGrid>
        <PgTile code="padrão (conteúdo)" align="start">
          <div class="bt-w320"><DssBtnToggle :model-value="'m'" :options="PERIODO" aria-label="Período" /></div>
        </PgTile>
        <PgTile code="spread" align="start">
          <div class="bt-w320"><DssBtnToggle :model-value="'m'" spread :options="PERIODO" aria-label="Período" /></div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="05" title="Estados" :count="3"
      desc="disable bloqueia o grupo inteiro; readonly mantém a leitura mas ignora interação; clearable permite desmarcar a opção ativa (o v-model volta a null).">
      <PgGrid>
        <PgTile code="disable" align="start">
          <DssBtnToggle :model-value="'m'" disable :options="PERIODO" aria-label="Desabilitado" />
        </PgTile>
        <PgTile code="readonly" align="start">
          <DssBtnToggle :model-value="'m'" readonly :options="PERIODO" aria-label="Somente leitura" />
        </PgTile>
        <PgTile code="clearable" align="start">
          <DssBtnToggle v-model="limpavel" clearable :options="PERIODO" aria-label="Limpável" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Cores ───────────────────────────────────────────────────── -->
    <PgSection id="cores" index="06" title="Cores" :count="4"
      desc="São QUATRO eixos independentes: color/textColor pintam as opções em repouso; toggleColor/toggleTextColor pintam a SELECIONADA. Separá-los é o que garante contraste no estado ativo.">
      <PgGrid>
        <PgTile code="padrão" align="start">
          <DssBtnToggle :model-value="'m'" :options="PERIODO" aria-label="Período" />
        </PgTile>
        <PgTile code="toggle-color" align="start">
          <DssBtnToggle :model-value="'m'" toggle-color="positive" :options="PERIODO" aria-label="Período" />
        </PgTile>
        <PgTile code="color + text-color" align="start">
          <DssBtnToggle :model-value="'m'" color="grey-3" text-color="dark" :options="PERIODO" aria-label="Período" />
        </PgTile>
        <PgTile code="toggle-text-color" align="start">
          <DssBtnToggle :model-value="'m'" toggle-color="warning" toggle-text-color="dark" :options="PERIODO" aria-label="Período" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="07" title="Brandabilidade" :count="BRANDS.length * 2"
      desc="A opção selecionada acompanha a marca. Os dois caminhos lado a lado: prop brand e [data-brand] herdado de um ancestral.">
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="b" :code="`brand=&quot;${b}&quot;`" align="start">
          <DssBtnToggle :model-value="'m'" :brand="b" :options="PERIODO" :aria-label="`Período ${b}`" />
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`ctx-${b}`" :code="`[data-brand=&quot;${b}&quot;]`" align="start">
          <div :data-brand="b">
            <DssBtnToggle :model-value="'m'" :options="PERIODO" :aria-label="`Período ${b} contexto`" />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Acessibilidade ──────────────────────────────────────────── -->
    <PgSection id="a11y" index="08" title="Acessibilidade" :count="2"
      desc="O grupo declara role=group e exige ariaLabel — sem ele, um leitor de tela anuncia botões soltos sem dizer do que são alternativas. A capitalização é governada por token, não por prop (no-caps é bloqueada).">
      <PgGrid>
        <PgTile code="aria-label" align="start">
          <DssBtnToggle :model-value="'b'" :options="ALINHAR" aria-label="Alinhamento do parágrafo" />
        </PgTile>
        <PgTile code="attrs por opção" align="start">
          <DssBtnToggle :model-value="'a'" :options="COM_ATTRS" aria-label="Com rótulo por opção" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Composição real ─────────────────────────────────────────── -->
    <PgSection id="composicao" index="09" title="Composição real" :count="1"
      desc="O controle no seu lugar: uma barra de filtro com estado vivo. É onde se vê que o grupo é UM controle, e não três botões.">
      <div class="bt-barra">
        <span class="bt-barra__rotulo">Consumo por</span>
        <DssBtnToggle v-model="periodo" :options="PERIODO" aria-label="Agrupar consumo por período" />
        <span class="bt-barra__sep"></span>
        <DssBtnToggle v-model="visao" :options="VISAO" variant="outline" aria-label="Modo de visualização" />
      </div>
      <p class="bt-nota">
        Agrupado por <code>{{ periodo ?? '—' }}</code> · visão <code>{{ visao }}</code>
      </p>
    </PgSection>

    <!-- ── 10. Exemplos (.example.vue como fonte) ──────────────────────── -->
    <PgSection id="exemplos" index="10" title="Exemplos de uso" :count="1"
      desc="Renderiza o DssBtnToggle.example.vue — fonte única, também usável na documentação.">
      <DssBtnToggleExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import { ref } from 'vue'
import DssBtnToggle from '@components/base/DssBtnToggle/DssBtnToggle.vue'
import DssBtnToggleExample from '@components/base/DssBtnToggle/DssBtnToggle.example.vue'

// Template das páginas de teste — a página CONSOME o layout, não reimplementa casca.
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssBtnToggle (vide types/btn-toggle.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['elevated', 'flat', 'outline', 'unelevated', 'push'] as const
const BRANDS = ['hub', 'water', 'waste'] as const

const PERIODO = [
  { label: 'Dia', value: 'd' },
  { label: 'Mês', value: 'm' },
  { label: 'Ano', value: 'a' },
]

const ALINHAR = [
  { icon: 'format_align_left', value: 'e', attrs: { 'aria-label': 'Alinhar à esquerda' } },
  { icon: 'format_align_center', value: 'b', attrs: { 'aria-label': 'Centralizar' } },
  { icon: 'format_align_right', value: 'd', attrs: { 'aria-label': 'Alinhar à direita' } },
]

const VISAO = [
  { label: 'Lista', icon: 'view_list', value: 'lista' },
  { label: 'Grade', icon: 'grid_view', value: 'grade' },
]

const COM_DESABILITADA = [
  { label: 'Ativa', value: 'a' },
  { label: 'Indisponível', value: 'b', disable: true },
  { label: 'Ativa', value: 'c' },
]

const COM_ATTRS = [
  { label: 'A', value: 'a', attrs: { 'aria-label': 'Opção A, resumo anual' } },
  { label: 'B', value: 'b', attrs: { 'aria-label': 'Opção B, resumo mensal' } },
]

const SECTIONS = [
  { id: 'variantes',  index: '01', title: 'Variantes' },
  { id: 'opcoes',     index: '02', title: 'Conteúdo das opções' },
  { id: 'forma',      index: '03', title: 'Forma' },
  { id: 'largura',    index: '04', title: 'Largura' },
  { id: 'estados',    index: '05', title: 'Estados' },
  { id: 'cores',      index: '06', title: 'Cores' },
  { id: 'brand',      index: '07', title: 'Brandabilidade' },
  { id: 'a11y',       index: '08', title: 'Acessibilidade' },
  { id: 'composicao', index: '09', title: 'Composição real' },
  { id: 'exemplos',   index: '10', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: VARIANTS.length, label: 'Variantes' },
  { value: BRANDS.length,   label: 'Brands' },
  { value: 4,               label: 'Eixos de cor' },
]

const periodo = ref<string | null>('m')
const visao = ref('lista')
const limpavel = ref<string | null>('m')
</script>

<style scoped>
/* CONTEÚDO da demonstração, não casca de página.
   `spread` só é observável com largura fixa: sem restringir, o grupo encolhe até
   o conteúdo e a prop vira no-op visual — mesmo motivo das larguras do TestButton. */
.bt-w320 { width: 320px; }

/* A barra da seção 09 é o CONTEXTO REAL do controle: sem um container com rótulo
   ao lado, não se vê que o grupo é um controle único dentro de um formulário. */
.bt-barra {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  flex-wrap: wrap;
}

.bt-barra__rotulo {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}

.bt-barra__sep {
  width: var(--dss-border-width-thin);
  align-self: stretch;
  background: var(--dss-border-default);
}

.bt-nota {
  margin: var(--dss-spacing-3) 0 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}
</style>
