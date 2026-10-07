<template>
  <PlaygroundLayout
    title="DssCard — Playground"
    code="base/DssCard"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ────────────────────────────────────────────────── -->
    <PgSection
      id="variantes" index="01" title="Variantes visuais" :count="VARIANTES.length"
      desc="Quatro maneiras de separar a superfície do fundo: sombra (elevated), nada (flat), borda (bordered) e contorno (outlined). A escolha não é estética — card elevado dentro de card elevado é aninhamento proibido pelo ui-rules, porque duas sombras somadas não leem como hierarquia."
    >
      <PgGrid>
        <PgTile v-for="v in VARIANTES" :key="v" :code="`variant=&quot;${v}&quot;`" align="stretch">
          <DssCard :variant="v" class="cd-stage">
            <DssCardSection>
              <strong>{{ v }}</strong>
              <p class="cd-texto">Superfície de conteúdo.</p>
            </DssCardSection>
          </DssCard>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Anatomia ─────────────────────────────────────────────────── -->
    <PgSection
      id="anatomia" index="02" title="Anatomia — Section e Actions" :count="4"
      desc="O padding mora no DssCardSection, NÃO na raiz do card: a raiz não tem padding nenhum. Quem põe padding no card em vez de usar a seção acaba com espaçamento fora da escala — foi o que aconteceu na primeira versão do Grid Master desta onda. DssCardActions alinha a régua de botões."
    >
      <PgGrid>
        <PgTile code="uma seção" align="stretch">
          <DssCard variant="outlined" class="cd-stage">
            <DssCardSection>Conteúdo único.</DssCardSection>
          </DssCard>
        </PgTile>
        <PgTile code="seções empilhadas" align="stretch">
          <DssCard variant="outlined" class="cd-stage">
            <DssCardSection><strong>Cabeçalho</strong></DssCardSection>
            <DssSeparator />
            <DssCardSection><p class="cd-texto">Corpo do card, separado do cabeçalho.</p></DssCardSection>
          </DssCard>
        </PgTile>
        <PgTile code="DssCardActions" align="stretch">
          <DssCard variant="outlined" class="cd-stage">
            <DssCardSection>Confirmar a operação?</DssCardSection>
            <DssCardActions align="right">
              <DssButton variant="flat" color="primary" size="sm" label="Cancelar" />
              <DssButton variant="unelevated" color="primary" size="sm" label="Confirmar" />
            </DssCardActions>
          </DssCard>
        </PgTile>
        <PgTile code="horizontal" align="stretch">
          <DssCard variant="outlined" class="cd-stage">
            <DssCardSection horizontal>
              <DssIcon name="water_drop" size="lg" color="primary" decorative />
              <span class="cd-texto">Seção horizontal: o conteúdo corre na linha.</span>
            </DssCardSection>
          </DssCard>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Clicável ─────────────────────────────────────────────────── -->
    <PgSection
      id="clicavel" index="03" title="Clicável" :count="3"
      desc="clickable transforma o card em alvo interativo — e aí ele precisa do anel de foco e do alvo de toque, como qualquer botão. Percorra com Tab: o card clicável tem de receber foco visível; o não clicável, não."
    >
      <PgGrid>
        <PgTile code="não clicável" align="stretch">
          <DssCard variant="outlined" class="cd-stage">
            <DssCardSection>Só conteúdo.</DssCardSection>
          </DssCard>
        </PgTile>
        <PgTile code="clickable" align="stretch">
          <DssCard variant="outlined" clickable class="cd-stage">
            <DssCardSection>Clique ou foque com Tab.</DssCardSection>
          </DssCard>
        </PgTile>
        <PgTile code="clickable + elevated" align="stretch">
          <DssCard variant="elevated" clickable class="cd-stage">
            <DssCardSection>Hover levanta a sombra.</DssCardSection>
          </DssCard>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Cantos e superfície escura ───────────────────────────────── -->
    <PgSection
      id="superficie" index="04" title="Cantos e superfície escura" :count="3"
      desc="square tira o raio — é o que se usa quando o card encosta na borda do container. dark inverte a superfície do card independentemente do tema da página: é superfície deliberadamente escura, não modo escuro."
    >
      <PgGrid>
        <PgTile code="padrão" align="stretch">
          <DssCard variant="elevated" class="cd-stage"><DssCardSection>Cantos arredondados.</DssCardSection></DssCard>
        </PgTile>
        <PgTile code="square" align="stretch">
          <DssCard variant="elevated" square class="cd-stage"><DssCardSection>Cantos retos.</DssCardSection></DssCard>
        </PgTile>
        <PgTile code="dark" align="stretch">
          <DssCard variant="elevated" dark class="cd-stage"><DssCardSection>Superfície escura.</DssCardSection></DssCard>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection
      id="brand" index="05" title="Brandabilidade" :count="6"
      desc="Duas rotas: a prop brand e o [data-brand] ancestral. As duas precisam concordar — e o card é superfície, então a marca aparece como acento discreto, não pintando o fundo inteiro."
    >
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="`p-${b}`" :code="`prop brand=&quot;${b}&quot;`" align="stretch">
          <DssCard variant="bordered" :brand="b" class="cd-stage">
            <DssCardSection>Marca pela prop.</DssCardSection>
          </DssCard>
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`a-${b}`" :code="`ancestral [data-brand=&quot;${b}&quot;]`" align="stretch">
          <div :data-brand="b" class="cd-stage">
            <DssCard variant="bordered">
              <DssCardSection>Marca herdada.</DssCardSection>
            </DssCard>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Matriz variante × marca ──────────────────────────────────── -->
    <PgSection
      id="matriz" index="06" title="Matriz — variante × marca" :count="VARIANTES.length * BRANDS.length"
      desc="Todas as combinações, para achar a que não fecha. É onde aparecem os buracos que o tile isolado esconde: borda de marca que some no flat, contorno que fica igual ao bordered."
    >
      <PgGrid>
        <template v-for="v in VARIANTES" :key="`m-${v}`">
          <PgTile v-for="b in BRANDS" :key="`m-${v}-${b}`" :code="`${v} · ${b}`" align="stretch">
            <DssCard :variant="v" :brand="b" class="cd-stage cd-stage--mini">
              <DssCardSection>{{ v }}</DssCardSection>
            </DssCard>
          </PgTile>
        </template>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="07" title="Exemplos de uso" :count="1"
      desc="Cenários reais, vindos do DssCard.example.vue do próprio componente."
    >
      <DssCardExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssCard from '@components/base/DssCard/DssCard.vue'
import { DssCardSection, DssCardActions } from '@components/base/DssCard/index'
import DssCardExample from '@components/base/DssCard/DssCard.example.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssIcon from '@components/base/DssIcon/DssIcon.vue'
import DssSeparator from '@components/base/DssSeparator/DssSeparator.vue'

const BRANDS = ['hub', 'water', 'waste'] as const
const VARIANTES = ['elevated', 'flat', 'bordered', 'outlined'] as const

const SECTIONS = [
  { id: 'variantes',  index: '01', title: 'Variantes visuais' },
  { id: 'anatomia',   index: '02', title: 'Anatomia — Section e Actions' },
  { id: 'clicavel',   index: '03', title: 'Clicável' },
  { id: 'superficie', index: '04', title: 'Cantos e superfície escura' },
  { id: 'brand',      index: '05', title: 'Brandabilidade' },
  { id: 'matriz',     index: '06', title: 'Matriz — variante × marca' },
  { id: 'exemplos',   index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 5,                 label: 'Props' },
  { value: VARIANTES.length,  label: 'Variantes' },
  { value: 3,                 label: 'Subcomponentes' },
  { value: BRANDS.length,     label: 'Brands' },
]
</script>

<style scoped>
.cd-stage {
  width: 100%;
  min-width: var(--dss-spacing-52);
}

.cd-stage--mini {
  min-width: var(--dss-spacing-36);
}

.cd-texto {
  margin: var(--dss-spacing-1) var(--dss-spacing-0) var(--dss-spacing-0);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}
</style>
