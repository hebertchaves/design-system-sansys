<template>
  <PlaygroundLayout
    title="DssTimeline — Playground"
    code="base/DssTimeline"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Layout ──────────────────────────────────────────────────── -->
    <PgSection id="layout" index="01" title="Layout" :count="LAYOUTS.length"
      desc="Prop layout do DssTimeline. Governa o espaçamento vertical entre entradas — dense para listas longas, loose quando cada evento carrega conteúdo próprio.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="l in LAYOUTS" :key="l" :code="`layout=&quot;${l}&quot;`" align="start">
          <DssTimeline :layout="l" class="tt-largura">
            <DssTimelineEntry
              v-for="e in EVENTOS"
              :key="e.title"
              :title="e.title"
              :subtitle="e.subtitle"
              :icon="e.icon"
            >
              {{ e.body }}
            </DssTimelineEntry>
          </DssTimeline>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Lado das entradas ───────────────────────────────────────── -->
    <PgSection id="lado" index="02" title="Lado das entradas" :count="3"
      desc="side no container define o lado padrão; side na entrada sobrescreve o do pai. O Quasar só alterna os lados no layout loose — nos demais a prop é aceita mas não muda o desenho.">
      <PgGrid class="pg-grid--full">
        <PgTile code="loose + side=&quot;right&quot; (padrão)" align="start">
          <DssTimeline layout="loose" side="right" class="tt-largura">
            <DssTimelineEntry title="Abertura" subtitle="08:12" icon="play_arrow">Chamado registrado.</DssTimelineEntry>
            <DssTimelineEntry title="Triagem" subtitle="08:40" icon="filter_alt">Encaminhado à equipe.</DssTimelineEntry>
          </DssTimeline>
        </PgTile>
        <PgTile code="loose + side=&quot;left&quot;" align="start">
          <DssTimeline layout="loose" side="left" class="tt-largura">
            <DssTimelineEntry title="Abertura" subtitle="08:12" icon="play_arrow">Chamado registrado.</DssTimelineEntry>
            <DssTimelineEntry title="Triagem" subtitle="08:40" icon="filter_alt">Encaminhado à equipe.</DssTimelineEntry>
          </DssTimeline>
        </PgTile>
        <PgTile code="loose + side por ENTRADA (alternado)" align="start">
          <DssTimeline layout="loose" class="tt-largura">
            <DssTimelineEntry title="Abertura" subtitle="08:12" icon="play_arrow" side="left">Chamado registrado.</DssTimelineEntry>
            <DssTimelineEntry title="Triagem" subtitle="08:40" icon="filter_alt" side="right">Encaminhado à equipe.</DssTimelineEntry>
            <DssTimelineEntry title="Execução" subtitle="10:05" icon="build" side="left">Equipe em campo.</DssTimelineEntry>
          </DssTimeline>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Marcador ────────────────────────────────────────────────── -->
    <PgSection id="marcador" index="03" title="Marcador da entrada" :count="4"
      desc="O ponto da entrada aceita ícone ou avatar; sem nenhum dos dois, fica o ponto sólido. O slot #icon tem precedência sobre as props.">
      <PgGrid class="pg-grid--full">
        <PgTile code="ponto sólido (padrão)" align="start">
          <DssTimeline class="tt-largura">
            <DssTimelineEntry title="Sem ícone" subtitle="Ponto padrão">Marcador sólido.</DssTimelineEntry>
          </DssTimeline>
        </PgTile>
        <PgTile code="icon" align="start">
          <DssTimeline class="tt-largura">
            <DssTimelineEntry title="Com ícone" subtitle="icon=&quot;done&quot;" icon="done">Marcador com glifo.</DssTimelineEntry>
          </DssTimeline>
        </PgTile>
        <PgTile code="avatar" align="start">
          <DssTimeline class="tt-largura">
            <DssTimelineEntry title="Com avatar" subtitle="avatar=&quot;…&quot;"
              :avatar="AVATAR_DEMO">
              Marcador com imagem.
            </DssTimelineEntry>
          </DssTimeline>
        </PgTile>
        <PgTile code="#icon (slot)" align="start">
          <DssTimeline class="tt-largura">
            <DssTimelineEntry title="Slot de ícone" subtitle="precede a prop">
              <template #icon><DssIcon name="bolt" decorative /></template>
              Marcador vindo do slot.
            </DssTimelineEntry>
          </DssTimeline>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Heading ─────────────────────────────────────────────────── -->
    <PgSection id="heading" index="04" title="Entrada de cabeçalho" :count="1"
      desc="heading transforma a entrada em separador de período — não é um evento, é um rótulo de agrupamento. A prop tag escolhe o elemento semântico do título.">
      <PgGrid class="pg-grid--full">
        <PgTile code="heading + tag=&quot;h3&quot;" align="start">
          <DssTimeline class="tt-largura">
            <DssTimelineEntry heading tag="h3" title="Setembro de 2026" />
            <DssTimelineEntry title="Abertura" subtitle="02/09" icon="play_arrow">Chamado registrado.</DssTimelineEntry>
            <DssTimelineEntry heading tag="h3" title="Agosto de 2026" />
            <DssTimelineEntry title="Encerramento" subtitle="28/08" icon="flag">Chamado anterior concluído.</DssTimelineEntry>
          </DssTimeline>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Título, subtítulo e corpo ───────────────────────────────── -->
    <PgSection id="conteudo" index="05" title="Título, subtítulo e corpo" :count="2"
      desc="title e subtitle são as props; os slots #title e #subtitle substituem cada um quando o conteúdo precisa de marcação. O slot default é o corpo do evento.">
      <PgGrid class="pg-grid--full">
        <PgTile code="props" align="start">
          <DssTimeline class="tt-largura">
            <DssTimelineEntry title="Solicitação aprovada" subtitle="Hoje, 14:22" icon="check_circle">
              Aprovada pelo supervisor da regional.
            </DssTimelineEntry>
          </DssTimeline>
        </PgTile>
        <PgTile code="#title e #subtitle (slots)" align="start">
          <DssTimeline class="tt-largura">
            <DssTimelineEntry icon="edit">
              <template #title><strong>Alteração de cadastro</strong></template>
              <template #subtitle><em>Ontem, 09:40</em></template>
              Endereço de cobrança atualizado.
            </DssTimelineEntry>
          </DssTimeline>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="06" title="Brandabilidade" :count="BRANDS.length"
      desc="A marca colore a linha conectora e o marcador. O DssTimeline não tem prop brand — a cor vem do [data-brand] de um ancestral.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="b in BRANDS" :key="b" :code="`[data-brand=&quot;${b}&quot;]`" align="start">
          <div :data-brand="b">
            <DssTimeline class="tt-largura">
              <DssTimelineEntry :title="brandLabel(b)" subtitle="linha e marcador" icon="water_drop">
                A marca pinta o conector e o ponto.
              </DssTimelineEntry>
              <DssTimelineEntry title="Segundo evento" subtitle="para ver a linha" icon="done">
                O conector liga os dois pontos.
              </DssTimelineEntry>
            </DssTimeline>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Matriz ──────────────────────────────────────────────────── -->
    <PgSection id="matriz" index="07" title="Matriz layout × marcador" :count="LAYOUTS.length"
      desc="Cobertura combinatória: cada layout com entrada de ícone, entrada sem ícone e heading.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="l in LAYOUTS" :key="l" :code="`layout=&quot;${l}&quot;`" align="start">
          <DssTimeline :layout="l" class="tt-largura">
            <DssTimelineEntry heading tag="h4" title="Grupo" />
            <DssTimelineEntry title="Com ícone" subtitle="icon" icon="done">Corpo.</DssTimelineEntry>
            <DssTimelineEntry title="Sem ícone" subtitle="ponto sólido">Corpo.</DssTimelineEntry>
          </DssTimeline>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Exemplos ────────────────────────────────────────────────── -->
    <PgSection id="exemplos" index="08" title="Exemplos de uso" :count="1"
      desc="Renderiza o DssTimeline.example.vue — fonte única, também usável na documentação.">
      <DssTimelineExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssTimeline from '@components/base/DssTimeline/DssTimeline.vue'
import DssTimelineEntry from '@components/base/DssTimelineEntry/DssTimelineEntry.vue'
import DssIcon from '@components/base/DssIcon/DssIcon.vue'
import DssTimelineExample from '@components/base/DssTimeline/DssTimeline.example.vue'

// Template das páginas de teste. A página CONSOME o layout; não reimplementa
// casca, nav ou scroll-spy (premissa do DSS_DEFAULT_PREVIEW_WORKFLOW).
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica (vide DssTimeline/types/timeline.types.ts e
// DssTimelineEntry/types/timeline-entry.types.ts)
// ──────────────────────────────────────────────────────────────────────────
// Avatar de demonstração embutido: uma URL externa deixaria a página dependente
// de rede (e de CSP) para mostrar um marcador.
const AVATAR_DEMO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
    '<circle cx="16" cy="16" r="16" fill="%23525252"/>' +
    '<circle cx="16" cy="12" r="5" fill="%23f5f5f5"/>' +
    '<path d="M6 30a10 10 0 0 1 20 0z" fill="%23f5f5f5"/></svg>'
  )

const LAYOUTS = ['dense', 'comfortable', 'loose'] as const
const BRANDS = ['hub', 'water', 'waste'] as const

const EVENTOS = [
  { title: 'Chamado aberto',   subtitle: '02/09, 08:12', icon: 'play_arrow', body: 'Registrado pelo atendimento.' },
  { title: 'Equipe acionada',  subtitle: '02/09, 09:30', icon: 'engineering', body: 'Ordem de serviço emitida.' },
  { title: 'Serviço concluído', subtitle: '02/09, 15:47', icon: 'flag',       body: 'Encerrado com vistoria.' },
]

const SECTIONS = [
  { id: 'layout',    index: '01', title: 'Layout' },
  { id: 'lado',      index: '02', title: 'Lado das entradas' },
  { id: 'marcador',  index: '03', title: 'Marcador' },
  { id: 'heading',   index: '04', title: 'Cabeçalho' },
  { id: 'conteudo',  index: '05', title: 'Título e corpo' },
  { id: 'brand',     index: '06', title: 'Brandabilidade' },
  { id: 'matriz',    index: '07', title: 'Matriz' },
  { id: 'exemplos',  index: '08', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: LAYOUTS.length, label: 'Layouts' },
  { value: 2,              label: 'Lados' },
  { value: BRANDS.length,  label: 'Brands' },
  { value: 4,              label: 'Slots' },
]

const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>

<style scoped>
/* CONTEÚDO da demonstração, não casca de página. A timeline é um bloco de
   largura total: solta num tile ela encolhe e o conector some do enquadramento. */
.tt-largura {
  width: 100%;
}
</style>
