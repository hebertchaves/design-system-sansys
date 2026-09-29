<template>
  <PlaygroundLayout
    title="DssList, DssItemSection e DssItemLabel — Playground"
    code="base/DssList"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Estrutura e ARIA ─────────────────────────────────────────── -->
    <PgSection id="aria" index="01" title="Estrutura e ARIA" :count="3"
      desc="O DssList fixa role=&quot;list&quot;, que pela ARIA exige filhos listitem. O DssItem trocava para role=button quando clicável — e o caso clicável é o mais usado —, então a lista ficava com ZERO item para o leitor de tela. Corrigido em set/2026 espelhando o QItem: listitem SEMPRE, com tabindex quando clicável. Os três casos abaixo devem ter 3 listitem cada.">
      <PgGrid>
        <PgTile code="itens estáticos → listitem" align="start">
          <DssList bordered>
            <DssItem v-for="i in TRES" :key="i" :label="`Registro ${i}`" />
          </DssList>
        </PgTile>
        <PgTile code="itens clicáveis → listitem + tabindex" align="start">
          <DssList bordered>
            <DssItem v-for="i in TRES" :key="i" clickable :label="`Registro ${i}`" />
          </DssList>
        </PgTile>
        <PgTile code="misto — 1 clicável, 2 estáticos" align="start">
          <DssList bordered>
            <DssItem clickable label="Registro 1 (clicável)" />
            <DssItem label="Registro 2" />
            <DssItem label="Registro 3" />
          </DssList>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Moldura do container ─────────────────────────────────────── -->
    <PgSection id="moldura" index="02" title="Moldura do container" :count="4"
      desc="As três props visuais do DssList e a combinação de todas. O que se mede é se separator não duplica com bordered, e se padding não briga com a borda.">
      <PgGrid>
        <PgTile code="cru" align="start">
          <DssList>
            <DssItem v-for="i in TRES" :key="i" :label="`Item ${i}`" />
          </DssList>
        </PgTile>
        <PgTile code="bordered" align="start">
          <DssList bordered>
            <DssItem v-for="i in TRES" :key="i" :label="`Item ${i}`" />
          </DssList>
        </PgTile>
        <PgTile code="separator" align="start">
          <DssList separator>
            <DssItem v-for="i in TRES" :key="i" :label="`Item ${i}`" />
          </DssList>
        </PgTile>
        <PgTile code="bordered + separator + padding" align="start">
          <DssList bordered separator padding>
            <DssItem v-for="i in TRES" :key="i" :label="`Item ${i}`" />
          </DssList>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. DssItemSection ───────────────────────────────────────────── -->
    <PgSection id="secoes" index="03" title="DssItemSection — regiões do item" :count="5"
      desc="As props de section escolhem QUAL região do item o conteúdo ocupa. avatar e thumbnail reservam largura fixa; side alinha à direita; top ancora no topo quando o item tem várias linhas.">
      <PgGrid>
        <PgTile code="padrão (conteúdo principal)" align="start">
          <DssList bordered>
            <DssItem>
              <DssItemSection><DssItemLabel>Só conteúdo</DssItemLabel></DssItemSection>
            </DssItem>
          </DssList>
        </PgTile>
        <PgTile code="avatar" align="start">
          <DssList bordered>
            <DssItem>
              <DssItemSection avatar><DssIcon name="person" /></DssItemSection>
              <DssItemSection><DssItemLabel>Com avatar</DssItemLabel></DssItemSection>
            </DssItem>
          </DssList>
        </PgTile>
        <PgTile code="thumbnail" align="start">
          <DssList bordered>
            <DssItem>
              <DssItemSection thumbnail><div class="ls-thumb" /></DssItemSection>
              <DssItemSection><DssItemLabel>Com thumbnail</DssItemLabel></DssItemSection>
            </DssItem>
          </DssList>
        </PgTile>
        <PgTile code="side" align="start">
          <DssList bordered>
            <DssItem>
              <DssItemSection><DssItemLabel>Conteúdo</DssItemLabel></DssItemSection>
              <DssItemSection side><DssIcon name="chevron_right" /></DssItemSection>
            </DssItem>
          </DssList>
        </PgTile>
        <PgTile code="top — item de várias linhas" align="start">
          <DssList bordered>
            <DssItem>
              <DssItemSection avatar top><DssIcon name="person" /></DssItemSection>
              <DssItemSection>
                <DssItemLabel>Título do registro</DssItemLabel>
                <DssItemLabel caption>{{ TEXTO_LONGO }}</DssItemLabel>
              </DssItemSection>
            </DssItem>
          </DssList>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. DssItemLabel ─────────────────────────────────────────────── -->
    <PgSection id="rotulos" index="04" title="DssItemLabel — hierarquia e truncamento" :count="4"
      desc="header, overline e caption são os três níveis tipográficos do rótulo. lines trunca — e é aqui que se mede se o truncamento realmente corta em N linhas ou só promete.">
      <PgGrid>
        <PgTile code="hierarquia completa" align="start">
          <DssList bordered>
            <DssItem>
              <DssItemSection>
                <DssItemLabel overline>Categoria</DssItemLabel>
                <DssItemLabel>Título principal</DssItemLabel>
                <DssItemLabel caption>Legenda de apoio</DssItemLabel>
              </DssItemSection>
            </DssItem>
          </DssList>
        </PgTile>
        <PgTile code="header" align="start">
          <DssList bordered>
            <DssItemLabel header>Cabeçalho de grupo</DssItemLabel>
            <DssItem v-for="i in 2" :key="i" :label="`Item ${i}`" />
          </DssList>
        </PgTile>
        <PgTile code="lines=1" align="start">
          <DssList bordered>
            <DssItem>
              <DssItemSection><DssItemLabel :lines="1">{{ TEXTO_LONGO }}</DssItemLabel></DssItemSection>
            </DssItem>
          </DssList>
        </PgTile>
        <PgTile code="lines=2" align="start">
          <DssList bordered>
            <DssItem>
              <DssItemSection><DssItemLabel :lines="2">{{ TEXTO_LONGO }}</DssItemLabel></DssItemSection>
            </DssItem>
          </DssList>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Superfície nos dois temas ────────────────────────────────── -->
    <PgSection id="superficie" index="05" title="Superfície nos dois temas" :count="2"
      desc="A lista bordered é uma superfície com moldura: borda e separadores precisam existir nos DOIS temas. Troque o tema no cabeçalho — atenção à borda sobre superfície sutil."
    >
      <PgGrid>
        <PgTile code="sobre superfície padrão" align="start">
          <div class="ls-fundo-padrao">
            <DssList bordered separator>
              <DssItem v-for="i in TRES" :key="i" :label="`Registro ${i}`" />
            </DssList>
          </div>
        </PgTile>
        <PgTile code="sobre superfície sutil" align="start">
          <div class="ls-fundo-sutil">
            <DssList bordered separator>
              <DssItem v-for="i in TRES" :key="i" :label="`Registro ${i}`" />
            </DssList>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection id="brand" index="06" title="Brandabilidade" :count="3"
      desc="O DssList também põe [data-brand] no root (mesmo padrão correto do DssToolbar). Aqui se mede se a marca alcança os itens sem apagar o texto deles.">
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="b" :code="`brand=&quot;${b}&quot;`" align="start">
          <DssList bordered :brand="b">
            <DssItem v-for="i in 2" :key="i" clickable :label="`${b} — item ${i}`" />
          </DssList>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection id="exemplos" index="07" title="Exemplos de uso" :count="2"
      desc="Contextos reais em que a lista aparece no sistema.">
      <PgGrid>
        <PgTile code="lista de registros com ação" align="start">
          <DssList bordered separator>
            <DssItem v-for="r in REGISTROS" :key="r.nome" clickable>
              <DssItemSection avatar><DssIcon name="description" /></DssItemSection>
              <DssItemSection>
                <DssItemLabel>{{ r.nome }}</DssItemLabel>
                <DssItemLabel caption>{{ r.detalhe }}</DssItemLabel>
              </DssItemSection>
              <DssItemSection side><DssIcon name="chevron_right" /></DssItemSection>
            </DssItem>
          </DssList>
        </PgTile>
        <PgTile code="lista agrupada com cabeçalho" align="start">
          <DssList bordered>
            <DssItemLabel header>Pendentes</DssItemLabel>
            <DssItem v-for="i in 2" :key="`p${i}`" clickable :label="`Solicitação ${i}`" />
            <DssItemLabel header>Concluídas</DssItemLabel>
            <DssItem clickable label="Solicitação 3" />
          </DssList>
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
import DssList from '../../../packages/core/components/base/DssList/DssList.vue'
import DssItem from '../../../packages/core/components/base/DssItem/DssItem.vue'
import DssItemSection from '../../../packages/core/components/base/DssItemSection/DssItemSection.vue'
import DssItemLabel from '../../../packages/core/components/base/DssItemLabel/DssItemLabel.vue'
import DssIcon from '../../../packages/core/components/base/DssIcon/DssIcon.vue'

const BRANDS = ['hub', 'water', 'waste'] as const
const TRES = [1, 2, 3]

const TEXTO_LONGO =
  'Texto deliberadamente longo para forçar o truncamento e revelar em quantas linhas o rótulo realmente corta, em vez de confiar na promessa da prop.'

const REGISTROS = [
  { nome: 'Solicitação 4821', detalhe: 'Aberta em 12/09 · aguardando vistoria' },
  { nome: 'Solicitação 4822', detalhe: 'Aberta em 13/09 · em análise' },
]

const SECTIONS = [
  { id: 'aria',       index: '01', title: 'Estrutura e ARIA' },
  { id: 'moldura',    index: '02', title: 'Moldura do container' },
  { id: 'secoes',     index: '03', title: 'DssItemSection' },
  { id: 'rotulos',    index: '04', title: 'DssItemLabel' },
  { id: 'superficie', index: '05', title: 'Superfície nos dois temas' },
  { id: 'brand',      index: '06', title: 'Brandabilidade' },
  { id: 'exemplos',   index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 6,             label: 'Props (List)' },
  { value: 5,             label: 'Props (Section)' },
  { value: 4,             label: 'Props (Label)' },
  { value: BRANDS.length, label: 'Brands' },
]
</script>

<style scoped>
/* Andaimes da página. Sem `color` em nada que deva herdar do componente. */
.ls-thumb {
  width: var(--dss-spacing-12);
  height: var(--dss-spacing-12);
  background-color: var(--dss-surface-muted);
  border-radius: var(--dss-radius-sm);
}

.ls-fundo-padrao {
  background-color: var(--dss-surface-default);
  padding: var(--dss-spacing-4);
}

.ls-fundo-sutil {
  background-color: var(--dss-surface-subtle);
  padding: var(--dss-spacing-4);
}
</style>
