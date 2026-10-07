<template>
  <PlaygroundLayout
    title="DssBreadcrumbsEl — Playground"
    code="base/DssBreadcrumbsEl"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Navegável × terminal ─────────────────────────────────────── -->
    <PgSection
      id="natureza" index="01" title="Navegável × terminal" :count="4"
      desc="O elemento muda de TAG conforme o destino: com to ou href o Quasar renderiza <a>; sem nenhum dos dois, um <div>. Isso não é cosmético — o último item da trilha é a página atual e não deve ser um link. Inspecione a tag renderizada, não só a cor."
    >
      <PgGrid>
        <PgTile v-for="n in NATUREZAS" :key="n.code" :code="n.code" align="center">
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl label="Faturamento" href="#" />
            <DssBreadcrumbsEl v-bind="n.props" :label="n.label" />
          </DssBreadcrumbs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Ícone ────────────────────────────────────────────────────── -->
    <PgSection
      id="icone" index="02" title="Ícone" :count="3"
      desc="O ícone é composto via DssIcon com decorative — o label é que carrega a alternativa textual. Era aqui que o componente violava o próprio contrato de ícone: passava aria-hidden solto em vez da prop, e o DssIcon advertia no console a cada renderização. Numa trilha de três itens com ícone, eram três avisos por página."
    >
      <PgGrid>
        <PgTile code="sem ícone" align="center">
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl label="Faturamento" href="#" />
            <DssBreadcrumbsEl label="NFAg" href="#" />
            <DssBreadcrumbsEl label="Check-in" />
          </DssBreadcrumbs>
        </PgTile>
        <PgTile code="prop icon em todos" align="center">
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl label="Faturamento" icon="receipt_long" href="#" />
            <DssBreadcrumbsEl label="NFAg" icon="description" href="#" />
            <DssBreadcrumbsEl label="Check-in" icon="fact_check" />
          </DssBreadcrumbs>
        </PgTile>
        <PgTile code="só ícone — exige aria-label próprio" align="center">
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl icon="home" href="#" aria-label="Início" />
            <DssBreadcrumbsEl label="Check-in" />
          </DssBreadcrumbs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Slot × prop label ────────────────────────────────────────── -->
    <PgSection
      id="conteudo" index="03" title="Slot × prop label" :count="3"
      desc="O slot default sobrepõe a prop label. Serve para conteúdo que não é texto simples — um chip de contagem, um trecho enfatizado. Se os dois forem fornecidos, o slot vence e o label é descartado em silêncio."
    >
      <PgGrid>
        <PgTile code="prop label" align="center">
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl label="Relatórios" href="#" />
            <DssBreadcrumbsEl label="Emissões" />
          </DssBreadcrumbs>
        </PgTile>
        <PgTile code="slot default" align="center">
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl href="#">Relatórios</DssBreadcrumbsEl>
            <DssBreadcrumbsEl>
              Emissões <DssBadge color="primary" outline label="12" />
            </DssBreadcrumbsEl>
          </DssBreadcrumbs>
        </PgTile>
        <PgTile code="slot vence a prop" align="center">
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl label="ignorado" href="#">Vem do slot</DssBreadcrumbsEl>
            <DssBreadcrumbsEl label="Atual" />
          </DssBreadcrumbs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Estados ──────────────────────────────────────────────────── -->
    <PgSection
      id="estados" index="04" title="Estados" :count="3"
      desc="disable remove a interação do item navegável. O anel de foco de teclado é o item de a11y que mais some em trilha — percorra com Tab e confira que o :focus-visible aparece no elemento visível, não numa caixa invisível (checklist §J)."
    >
      <PgGrid>
        <PgTile code="repouso" align="center">
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl label="Ativo" href="#" />
            <DssBreadcrumbsEl label="Atual" />
          </DssBreadcrumbs>
        </PgTile>
        <PgTile code="disable" align="center">
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl label="Desabilitado" href="#" disable />
            <DssBreadcrumbsEl label="Atual" />
          </DssBreadcrumbs>
        </PgTile>
        <PgTile code="foco de teclado (Tab até aqui)" align="center">
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl label="Foque em mim" href="#" />
            <DssBreadcrumbsEl label="Atual" />
          </DssBreadcrumbs>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection
      id="brand" index="05" title="Brandabilidade" :count="3"
      desc="A trilha herda a marca do ancestral [data-brand]: o item navegável usa a cor de ação da marca; o item terminal permanece neutro, porque não é ação. Se os dois mudarem de cor, o terminal está sendo tratado como link."
    >
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="b" :code="`[data-brand=&quot;${b}&quot;]`" align="center">
          <div :data-brand="b">
            <DssBreadcrumbs separator="›" gutter="sm">
              <DssBreadcrumbsEl label="Faturamento" icon="receipt_long" href="#" />
              <DssBreadcrumbsEl label="NFAg" href="#" />
              <DssBreadcrumbsEl label="Check-in" />
            </DssBreadcrumbs>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="06" title="Exemplos de uso" :count="1"
      desc="Cenários reais, vindos do DssBreadcrumbsEl.example.vue do próprio componente."
    >
      <DssBreadcrumbsElExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssBreadcrumbs from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssBreadcrumbsElExample from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.example.vue'
import DssBadge from '@components/base/DssBadge/DssBadge.vue'

const BRANDS = ['hub', 'water', 'waste'] as const

const NATUREZAS = [
  { code: 'href — renderiza <a>',        label: 'Com href',  props: { href: '#' } },
  { code: 'to — renderiza <a> (router)', label: 'Com to',    props: { to: '/nfag' } },
  { code: 'sem destino — renderiza <div>', label: 'Terminal', props: {} },
  { code: 'tag="span" — tag forçada',    label: 'Tag span',  props: { tag: 'span' } },
]

const SECTIONS = [
  { id: 'natureza', index: '01', title: 'Navegável × terminal' },
  { id: 'icone',    index: '02', title: 'Ícone' },
  { id: 'conteudo', index: '03', title: 'Slot × prop label' },
  { id: 'estados',  index: '04', title: 'Estados' },
  { id: 'brand',    index: '05', title: 'Brandabilidade' },
  { id: 'exemplos', index: '06', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 6,               label: 'Props' },
  { value: 1,               label: 'Slot' },
  { value: BRANDS.length,   label: 'Brands' },
  { value: 2,               label: 'Tags possíveis' },
]
</script>
