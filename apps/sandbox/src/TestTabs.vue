<template>
  <PlaygroundLayout
    title="DssTabs — Playground"
    code="base/DssTabs · DssTab · DssRouteTab"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Anatomia ────────────────────────────────────────────────── -->
    <PgSection id="anatomia" index="01" title="Anatomia do trio" :count="1"
      desc="Os três componentes desta página não são independentes: o DssTabs é o container e aceita APENAS DssTab ou DssRouteTab no slot default — QTab cru é violação arquitetural. Por isso a adequação dos três mora numa página só; separá-los mostraria a mesma barra três vezes.">
      <div class="tt-caixa">
        <DssTabs v-model="aba" aria-label="Seções do cadastro">
          <DssTab name="dados" label="Dados" />
          <DssTab name="endereco" label="Endereço" />
          <DssTab name="contatos" label="Contatos" />
        </DssTabs>
        <div class="tt-painel">
          Painel de <strong>{{ aba }}</strong> — o v-model do container é quem diz qual aba está ativa.
        </div>
      </div>
    </PgSection>

    <!-- ── 02. Conteúdo da aba ─────────────────────────────────────────── -->
    <PgSection id="conteudo" index="02" title="Conteúdo da aba" :count="4"
      desc="label, icon e os dois. O slot default substitui ambos — porta para conteúdo arbitrário. alert marca a aba com um ponto, para pendência que o rótulo não comunica.">
      <PgGrid>
        <PgTile code="label" align="start">
          <DssTabs :model-value="'a'" aria-label="Só rótulo">
            <DssTab name="a" label="Resumo" />
            <DssTab name="b" label="Detalhes" />
          </DssTabs>
        </PgTile>
        <PgTile code="icon" align="start">
          <DssTabs :model-value="'a'" aria-label="Só ícone">
            <DssTab name="a" icon="list" />
            <DssTab name="b" icon="grid_view" />
          </DssTabs>
        </PgTile>
        <PgTile code="label + icon" align="start">
          <DssTabs :model-value="'a'" aria-label="Rótulo e ícone">
            <DssTab name="a" icon="description" label="Documentos" />
            <DssTab name="b" icon="payments" label="Faturas" />
          </DssTabs>
        </PgTile>
        <PgTile code="alert" align="start">
          <DssTabs :model-value="'a'" aria-label="Com alerta">
            <DssTab name="a" label="Aprovadas" />
            <DssTab name="b" label="Pendentes" alert />
          </DssTabs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Alinhamento ─────────────────────────────────────────────── -->
    <PgSection id="align" index="03" title="Alinhamento" :count="ALIGNS.length"
      desc="Prop align do container. justify distribui as abas pela largura toda — só é observável com largura fixa, por isso os tiles têm container.">
      <PgGrid>
        <PgTile v-for="a in ALIGNS" :key="a" :code="`align=&quot;${a}&quot;`" align="start">
          <div class="tt-w320">
            <DssTabs :model-value="'a'" :align="a" :aria-label="`Alinhamento ${a}`">
              <DssTab name="a" label="Um" />
              <DssTab name="b" label="Dois" />
            </DssTabs>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Orientação e densidade ──────────────────────────────────── -->
    <PgSection id="orientacao" index="04" title="Orientação & densidade" :count="3"
      desc="vertical empilha as abas — para navegação lateral, não para barra. dense reduz a altura da barra em telas densas.">
      <PgGrid>
        <PgTile code="padrão" align="start">
          <DssTabs :model-value="'a'" aria-label="Horizontal">
            <DssTab name="a" label="Horizontal" />
            <DssTab name="b" label="Padrão" />
          </DssTabs>
        </PgTile>
        <PgTile code="dense" align="start">
          <DssTabs :model-value="'a'" dense aria-label="Densa">
            <DssTab name="a" label="Densa" />
            <DssTab name="b" label="Compacta" />
          </DssTabs>
        </PgTile>
        <PgTile code="vertical" align="start">
          <DssTabs :model-value="'a'" vertical aria-label="Vertical">
            <DssTab name="a" icon="home" label="Início" />
            <DssTab name="b" icon="settings" label="Ajustes" />
          </DssTabs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="05" title="Estados" :count="2"
      desc="A aba ativa é definida pelo v-model do container, não por prop da aba. disable bloqueia uma aba individual — o teclado a pula.">
      <PgGrid>
        <PgTile code="ativa (v-model)" align="start">
          <DssTabs :model-value="'b'" aria-label="Segunda ativa">
            <DssTab name="a" label="Primeira" />
            <DssTab name="b" label="Ativa" />
            <DssTab name="c" label="Terceira" />
          </DssTabs>
        </PgTile>
        <PgTile code="disable" align="start">
          <DssTabs :model-value="'a'" aria-label="Com aba desabilitada">
            <DssTab name="a" label="Disponível" />
            <DssTab name="b" label="Bloqueada" disable />
          </DssTabs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="06" title="Brandabilidade" :count="BRANDS.length * 2"
      desc="A aba ativa e o indicador acompanham a marca. Os dois caminhos lado a lado: prop brand no container e [data-brand] herdado de um ancestral.">
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="b" :code="`brand=&quot;${b}&quot;`" align="start">
          <DssTabs :model-value="'a'" :brand="b" :aria-label="`Marca ${b}`">
            <DssTab name="a" :label="brandLabel(b)" />
            <DssTab name="b" label="Outra" />
          </DssTabs>
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`ctx-${b}`" :code="`[data-brand=&quot;${b}&quot;]`" align="start">
          <div :data-brand="b">
            <DssTabs :model-value="'a'" :aria-label="`Contexto ${b}`">
              <DssTab name="a" :label="brandLabel(b)" />
              <DssTab name="b" label="Outra" />
            </DssTabs>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. DssRouteTab ─────────────────────────────────────────────── -->
    <PgSection id="routetab" index="07" title="DssRouteTab — aba de rota" :count="2"
      desc="Superset do DssTab: acrescenta to/exact/replace/href/target e dispensa o v-model, porque quem decide a aba ativa é a ROTA. Usa a mesma classe .dss-tab, então herda a aparência inteira — é por isso que a correção de capitalização de set/2026 valeu para os dois de uma vez.">
      <PgGrid>
        <PgTile code="href + target" align="start">
          <DssTabs aria-label="Links externos">
            <DssRouteTab name="doc" label="Documentação" href="https://quasar.dev" target="_blank" />
            <DssRouteTab name="repo" label="Repositório" href="https://github.com" target="_blank" />
          </DssTabs>
        </PgTile>
        <PgTile code="com ícone" align="start">
          <DssTabs aria-label="Links com ícone">
            <DssRouteTab name="ext" icon="open_in_new" label="Abrir" href="https://quasar.dev" target="_blank" />
          </DssTabs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Acessibilidade ──────────────────────────────────────────── -->
    <PgSection id="a11y" index="08" title="Acessibilidade" :count="2"
      desc="O container exige ariaLabel: um leitor de tela precisa saber DE QUE a barra é o índice. A navegação por setas é do Quasar e foi preservada — foi o motivo de o slot de opção do QSelect não virar DssItem noutro componente. A capitalização é governada por --dss-text-transform-control; a prop no-caps é BLOQUEADA nos três.">
      <PgGrid>
        <PgTile code="aria-label" align="start">
          <DssTabs :model-value="'a'" aria-label="Abas do cadastro do cliente">
            <DssTab name="a" label="Cadastro" />
            <DssTab name="b" label="Histórico" />
          </DssTabs>
        </PgTile>
        <PgTile code="teclado (setas)" align="start">
          <DssTabs v-model="abaTeclado" aria-label="Navegue com as setas">
            <DssTab name="a" label="Foque" />
            <DssTab name="b" label="e use" />
            <DssTab name="c" label="as setas" />
          </DssTabs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Composição real ─────────────────────────────────────────── -->
    <PgSection id="composicao" index="09" title="Composição real" :count="1"
      desc="O trio no seu lugar: barra + painel, com ícone, alerta e troca viva. É o que um catálogo de tiles não mostra — a aba existe para governar um painel, não para ser vista sozinha.">
      <div class="tt-caixa">
        <DssTabs v-model="abaReal" align="left" aria-label="Detalhe da solicitação">
          <DssTab v-for="t in ABAS" :key="t.name" :name="t.name" :icon="t.icon" :label="t.label" :alert="t.alert" />
        </DssTabs>
        <div class="tt-painel">
          <strong>{{ ABAS.find(t => t.name === abaReal).label }}</strong>
          <p class="tt-painel__texto">{{ ABAS.find(t => t.name === abaReal).texto }}</p>
        </div>
      </div>
    </PgSection>

    <!-- ── 10. Exemplos (.example.vue como fonte) ──────────────────────── -->
    <PgSection id="exemplos" index="10" title="Exemplos de uso" :count="1"
      desc="Renderiza o DssTabs.example.vue — fonte única, também usável na documentação.">
      <DssTabsExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import { ref } from 'vue'
import DssTabs from '@components/base/DssTabs/DssTabs.vue'
import DssTab from '@components/base/DssTab/DssTab.vue'
import DssRouteTab from '@components/base/DssRouteTab/DssRouteTab.vue'
import DssTabsExample from '@components/base/DssTabs/DssTabs.example.vue'

// Template das páginas de teste — a página CONSOME o layout, não reimplementa casca.
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do trio (DssTabs/DssTab/DssRouteTab — vide types/*.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const ALIGNS = ['left', 'center', 'right', 'justify'] as const
const BRANDS = ['hub', 'water', 'waste'] as const

const ABAS = [
  { name: 'financeiro', icon: 'attach_money', label: 'Financeiro', alert: false,
    texto: 'Faturas, cobranças e histórico de pagamento do cliente.' },
  { name: 'cadastro', icon: 'person', label: 'Cadastro', alert: false,
    texto: 'Dados cadastrais, endereço de instalação e contatos.' },
  { name: 'ordem', icon: 'build', label: 'Ordem de serviço', alert: true,
    texto: 'Há ordens abertas — o ponto de alerta na aba comunica o que o rótulo sozinho não diz.' },
]

const SECTIONS = [
  { id: 'anatomia',   index: '01', title: 'Anatomia do trio' },
  { id: 'conteudo',   index: '02', title: 'Conteúdo da aba' },
  { id: 'align',      index: '03', title: 'Alinhamento' },
  { id: 'orientacao', index: '04', title: 'Orientação & densidade' },
  { id: 'estados',    index: '05', title: 'Estados' },
  { id: 'brand',      index: '06', title: 'Brandabilidade' },
  { id: 'routetab',   index: '07', title: 'DssRouteTab' },
  { id: 'a11y',       index: '08', title: 'Acessibilidade' },
  { id: 'composicao', index: '09', title: 'Composição real' },
  { id: 'exemplos',   index: '10', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 3,               label: 'Componentes' },
  { value: ALIGNS.length,   label: 'Alinhamentos' },
  { value: BRANDS.length,   label: 'Brands' },
]

const aba = ref('dados')
const abaTeclado = ref('a')
const abaReal = ref('financeiro')

const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>

<style scoped>
/* CONTEÚDO da demonstração, não casca de página.
   A aba existe para governar um PAINEL: sem a caixa com o painel embaixo, a
   seção 01 e a 09 mostrariam uma barra solta, que é justamente o que o
   checklist critica no catálogo. `justify` só é observável com largura fixa. */
.tt-caixa {
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.tt-painel {
  padding: var(--dss-spacing-4);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
}

.tt-painel__texto {
  margin: var(--dss-spacing-2) 0 0;
  color: var(--dss-text-subtle);
}

.tt-w320 { width: 320px; }
</style>
