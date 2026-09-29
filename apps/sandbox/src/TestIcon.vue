<template>
  <PlaygroundLayout
    title="DssIcon — Playground"
    code="base/DssIcon"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Escala de tamanho ────────────────────────────────────────── -->
    <PgSection id="tamanhos" index="01" title="Escala de tamanho" :count="TAMANHOS.length"
      desc="Cinco degraus, de 16 a 48px. O que se mede é se o tamanho declarado é o tamanho RENDERIZADO — o DssIcon é um span envolvendo um q-icon, e são duas caixas que podem discordar.">
      <PgGrid>
        <PgTile v-for="t in TAMANHOS" :key="t.nome" :code="`size=&quot;${t.nome}&quot; · ${t.px}`" align="center">
          <DssIcon name="settings" :size="t.nome" decorative />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Alinhamento com texto ────────────────────────────────────── -->
    <PgSection id="alinhamento" index="02" title="Alinhamento com texto" :count="3"
      desc="O defeito clássico de ícone é desalinhar do texto vizinho. Medido aqui: NÃO desalinha — vertical-align: middle nos três, desvio de 1,6px do centro da linha. E a diferença real do inline não é alinhamento, é TAMANHO: ele faz o ícone seguir a font-size do host (1em) e as classes de size são ignoradas, por contrato (CCI §2.2). Compare: size=sm sem inline rende 20px; com inline, 16px.">
      <PgGrid>
        <PgTile code="inline — no meio da frase" align="start">
          <p class="ic-frase">
            Clique em <DssIcon name="settings" size="sm" inline decorative /> para abrir as
            configurações do registro.
          </p>
        </PgTile>
        <PgTile code="sem inline — mesma frase" align="start">
          <p class="ic-frase">
            Clique em <DssIcon name="settings" size="sm" decorative /> para abrir as
            configurações do registro.
          </p>
        </PgTile>
        <PgTile code="inline, ícone maior que a linha" align="start">
          <p class="ic-frase">
            Atenção <DssIcon name="warning" size="lg" inline decorative /> este registro tem
            pendências.
          </p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Semântica e acessibilidade ──────────────────────────────── -->
    <PgSection id="a11y" index="03" title="Semântica e acessibilidade" :count="4"
      desc="As quatro combinações. As duas do meio são legítimas; as outras duas eram contradições aceitas em silêncio e agora advertem no console. Medido: um role=img sem nome não é anunciado como imagem vazia — o Chrome PODA o nó, e o ícone informativo deixa de existir para a tecnologia assistiva.">
      <PgGrid>
        <PgTile code="decorative — some da árvore" align="center">
          <DssIcon name="star" size="md" decorative />
        </PgTile>
        <PgTile code="informativo + ariaLabel" align="center">
          <DssIcon name="star" size="md" aria-label="Favorito" />
        </PgTile>
        <PgTile code="decorative + ariaLabel (conflito)" align="center">
          <DssIcon name="star" size="md" decorative aria-label="Favorito" />
        </PgTile>
        <PgTile code="informativo SEM ariaLabel ⚠️" align="center">
          <DssIcon name="star" size="md" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Cor semântica ────────────────────────────────────────────── -->
    <PgSection id="cores" index="04" title="Cor semântica" :count="CORES.length"
      desc="As cores vêm de classe utilitária, não de SCSS do componente. O que se mede é o contraste de cada uma sobre a superfície — ícone informativo é conteúdo e precisa passar AA."
    >
      <PgGrid>
        <PgTile v-for="c in CORES" :key="c" :code="`color=&quot;${c}&quot;`" align="center">
          <DssIcon name="circle" size="lg" :color="c" decorative />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection id="brand" index="05" title="Brandabilidade" :count="6"
      desc="Duas rotas para a mesma marca: a prop brand no ícone, e o [data-brand] herdado de um ancestral. Precisam concordar — se divergirem, é o bug de família da prop brand.">
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="`p-${b}`" :code="`prop brand=&quot;${b}&quot;`" align="center">
          <DssIcon name="water_drop" size="lg" :brand="b" decorative />
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`a-${b}`" :code="`ancestral [data-brand=&quot;${b}&quot;]`" align="center">
          <div :data-brand="b">
            <DssIcon name="water_drop" size="lg" color="primary" decorative />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Animação e movimento reduzido ───────────────────────────── -->
    <PgSection id="animacao" index="06" title="Animação e movimento reduzido" :count="3"
      desc="spin e pulse são animações infinitas. A regra dura é WCAG 2.3.3: com prefers-reduced-motion elas têm de parar — verificado, a regra zera animation nos dois. O terceiro tile combina as duas: medido, só pulse aplica (mesma especificidade, a ordem decide), e isso agora adverte."
    >
      <PgGrid>
        <PgTile code="spin" align="center">
          <DssIcon name="autorenew" size="lg" spin decorative />
        </PgTile>
        <PgTile code="pulse" align="center">
          <DssIcon name="favorite" size="lg" pulse decorative />
        </PgTile>
        <PgTile code="spin + pulse juntos" align="center">
          <DssIcon name="sync" size="lg" spin pulse decorative />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection id="exemplos" index="07" title="Exemplos de uso" :count="3"
      desc="Contextos reais. O contrato de ícone manda que todo prop de ícone de outro componente renderize um DssIcon — aqui se confere se é o que acontece.">
      <PgGrid>
        <PgTile code="dentro de DssButton (via prop icon)" align="center">
          <DssButton label="Salvar" icon="save" variant="primary" size="sm" />
        </PgTile>
        <PgTile code="dentro de DssItem (via slot)" align="start">
          <DssList bordered>
            <DssItem>
              <DssItemSection avatar><DssIcon name="folder" decorative /></DssItemSection>
              <DssItemSection><DssItemLabel>Documentos</DssItemLabel></DssItemSection>
            </DssItem>
          </DssList>
        </PgTile>
        <PgTile code="estado de carga" align="center">
          <span class="ic-carga">
            <DssIcon name="autorenew" size="sm" spin decorative />
            Carregando registros…
          </span>
        </PgTile>
      </PgGrid>
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssIcon from '../../../packages/core/components/base/DssIcon/DssIcon.vue'
import DssButton from '../../../packages/core/components/base/DssButton/DssButton.vue'
import DssList from '../../../packages/core/components/base/DssList/DssList.vue'
import DssItem from '../../../packages/core/components/base/DssItem/DssItem.vue'
import DssItemSection from '../../../packages/core/components/base/DssItemSection/DssItemSection.vue'
import DssItemLabel from '../../../packages/core/components/base/DssItemLabel/DssItemLabel.vue'

const BRANDS = ['hub', 'water', 'waste'] as const

const TAMANHOS = [
  { nome: 'xs', px: '16px' },
  { nome: 'sm', px: '20px' },
  { nome: 'md', px: '24px' },
  { nome: 'lg', px: '32px' },
  { nome: 'xl', px: '48px' },
] as const

const CORES = [
  'primary', 'secondary', 'tertiary', 'accent',
  'positive', 'negative', 'warning', 'info',
] as const

const SECTIONS = [
  { id: 'tamanhos',    index: '01', title: 'Escala de tamanho' },
  { id: 'alinhamento', index: '02', title: 'Alinhamento com texto' },
  { id: 'a11y',        index: '03', title: 'Semântica e acessibilidade' },
  { id: 'cores',       index: '04', title: 'Cor semântica' },
  { id: 'brand',       index: '05', title: 'Brandabilidade' },
  { id: 'animacao',    index: '06', title: 'Animação e movimento reduzido' },
  { id: 'exemplos',    index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 9,                label: 'Props' },
  { value: TAMANHOS.length,  label: 'Tamanhos' },
  { value: CORES.length,     label: 'Cores' },
  { value: BRANDS.length,    label: 'Brands' },
]
</script>

<style scoped>
/* Andaimes. Sem `color` — o que deve herdar, herda do componente. */
.ic-frase {
  font-size: var(--dss-font-size-md);
  line-height: var(--dss-line-height-normal);
  max-width: 34ch;
  margin: 0;
}

.ic-carga {
  display: inline-flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  font-size: var(--dss-font-size-sm);
}
</style>
