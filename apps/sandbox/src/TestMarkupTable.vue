<template>
  <PlaygroundLayout
    title="DssMarkupTable — Playground"
    code="base/DssMarkupTable"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Densidade ────────────────────────────────────────────────── -->
    <PgSection
      id="densidade" index="01" title="Densidade" :count="DENSIDADES.length"
      desc="Três degraus de altura de linha. O grid master do Sansys Water pede linha de 36 px, que é o que compact entrega — meça a altura do <tr>, não o padding declarado: o line-height do texto também entra na conta."
    >
      <PgGrid>
        <PgTile v-for="d in DENSIDADES" :key="d" :code="`density=&quot;${d}&quot;`" align="start">
          <DssMarkupTable :density="d" class="mt-stage">
            <table>
              <thead><tr><th>Protocolo</th><th>Serviço</th><th>Situação</th></tr></thead>
              <tbody>
                <tr v-for="r in LINHAS" :key="r.protocolo">
                  <td>{{ r.protocolo }}</td><td>{{ r.servico }}</td><td>{{ r.situacao }}</td>
                </tr>
              </tbody>
            </table>
          </DssMarkupTable>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Separadores ──────────────────────────────────────────────── -->
    <PgSection
      id="separadores" index="02" title="Separadores" :count="SEPARADORES.length"
      desc="Quatro modos de grade interna. horizontal é o padrão de leitura em lista; cell é planilha; none é para tabela de layout, onde a grade seria ruído. O separador do thead é do cabeçalho e não muda com esta prop."
    >
      <PgGrid>
        <PgTile v-for="s in SEPARADORES" :key="s" :code="`separator=&quot;${s}&quot;`" align="start">
          <DssMarkupTable :separator="s" density="compact" class="mt-stage">
            <table>
              <thead><tr><th>Protocolo</th><th>Serviço</th><th>Situação</th></tr></thead>
              <tbody>
                <tr v-for="r in LINHAS" :key="r.protocolo">
                  <td>{{ r.protocolo }}</td><td>{{ r.servico }}</td><td>{{ r.situacao }}</td>
                </tr>
              </tbody>
            </table>
          </DssMarkupTable>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Moldura ──────────────────────────────────────────────────── -->
    <PgSection
      id="moldura" index="03" title="Moldura — flat, bordered, square" :count="4"
      desc="flat tira a elevação; bordered acrescenta a borda externa; square tira o raio. Dentro de um DssCard a combinação correta é flat + square: a superfície e o raio já são do card, e sobrepor os dois cria a moldura dupla que aparece nas telas quando ninguém confere."
    >
      <PgGrid>
        <PgTile v-for="m in MOLDURAS" :key="m.code" :code="m.code" align="start">
          <DssMarkupTable v-bind="m.props" density="compact" class="mt-stage">
            <table>
              <thead><tr><th>Protocolo</th><th>Situação</th></tr></thead>
              <tbody>
                <tr v-for="r in LINHAS.slice(0, 2)" :key="r.protocolo">
                  <td>{{ r.protocolo }}</td><td>{{ r.situacao }}</td>
                </tr>
              </tbody>
            </table>
          </DssMarkupTable>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Brandabilidade — a prop funciona, o ancestral NÃO ────────── -->
    <PgSection
      id="brand" index="04" title="Brandabilidade — prop × ancestral" :count="6"
      desc="Este par existe para tornar visível uma diferença que o comentário do 4-output/_brands.scss nega. Ele afirma suportar as duas rotas, mas AS DUAS alternativas do seletor exigem a classe .dss-markup-table--brand-*: [data-brand] sozinho não pinta nada. A fila de cima brandeia, a de baixo não — e isso é o comportamento correto para componente de superfície (mesmo padrão do DssToolbar, já adequado): tabela dentro de página brandeada não deve virar colorida sozinha. O que está errado é o comentário."
    >
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="`p-${b}`" :code="`prop brand=&quot;${b}&quot; → pinta`" align="start">
          <DssMarkupTable :brand="b" density="compact" class="mt-stage">
            <table>
              <thead><tr><th>Protocolo</th><th>Situação</th></tr></thead>
              <tbody><tr><td>65665262</td><td>Atrasada</td></tr></tbody>
            </table>
          </DssMarkupTable>
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`a-${b}`" :code="`ancestral [data-brand=&quot;${b}&quot;] → NÃO pinta`" align="start">
          <div :data-brand="b" class="mt-stage">
            <DssMarkupTable density="compact">
              <table>
                <thead><tr><th>Protocolo</th><th>Situação</th></tr></thead>
                <tbody><tr><td>65665262</td><td>Atrasada</td></tr></tbody>
              </table>
            </DssMarkupTable>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Conteúdo composto ────────────────────────────────────────── -->
    <PgSection
      id="conteudo" index="05" title="Conteúdo composto nas células" :count="2"
      desc="A tabela não governa o conteúdo das células — quem entra ali são componentes DSS. O que se verifica é o alinhamento vertical: chip e botão têm altura maior que o texto e é aqui que a linha estica sem ninguém notar. Compare a altura das duas tabelas."
    >
      <PgGrid>
        <PgTile code="só texto" align="start">
          <DssMarkupTable density="compact" flat class="mt-stage">
            <table>
              <thead><tr><th>Equipe</th><th>Situação</th><th class="mt-right">Ações</th></tr></thead>
              <tbody>
                <tr><td>CL250</td><td>Atrasada</td><td class="mt-right">PDF</td></tr>
                <tr><td>CL251</td><td>No prazo</td><td class="mt-right">PDF</td></tr>
              </tbody>
            </table>
          </DssMarkupTable>
        </PgTile>
        <PgTile code="com DssChip e DssButton" align="start">
          <DssMarkupTable density="compact" flat class="mt-stage">
            <table>
              <thead><tr><th>Equipe</th><th>Situação</th><th class="mt-right">Ações</th></tr></thead>
              <tbody>
                <tr>
                  <td><DssChip variant="outline" color="positive" size="xs" dense icon="check_circle" label="CL250" /></td>
                  <td><DssChip color="negative" size="xs" dense icon="cancel" label="Atrasada" /></td>
                  <td class="mt-right"><DssButton variant="flat" color="primary" size="xs" icon="description" label="PDF" /></td>
                </tr>
                <tr>
                  <td><DssChip variant="outline" color="positive" size="xs" dense icon="check_circle" label="CL251" /></td>
                  <td><DssChip color="positive" size="xs" dense icon="check_circle" label="No prazo" /></td>
                  <td class="mt-right"><DssButton variant="flat" color="primary" size="xs" icon="description" label="PDF" /></td>
                </tr>
              </tbody>
            </table>
          </DssMarkupTable>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="06" title="Exemplos de uso" :count="1"
      desc="Cenários reais, vindos do DssMarkupTable.example.vue do próprio componente."
    >
      <DssMarkupTableExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssMarkupTable from '@components/base/DssMarkupTable/DssMarkupTable.vue'
import DssMarkupTableExample from '@components/base/DssMarkupTable/DssMarkupTable.example.vue'
import DssChip from '@components/base/DssChip/DssChip.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

const BRANDS = ['hub', 'water', 'waste'] as const
const DENSIDADES = ['compact', 'standard', 'comfortable'] as const
const SEPARADORES = ['horizontal', 'vertical', 'cell', 'none'] as const

const MOLDURAS = [
  { code: 'padrão',            props: {} },
  { code: 'flat',              props: { flat: true } },
  { code: 'bordered',          props: { bordered: true } },
  { code: 'flat + square (dentro de card)', props: { flat: true, square: true } },
]

const LINHAS = [
  { protocolo: '65665262', servico: 'Religação de água',     situacao: 'Atrasada' },
  { protocolo: '65665263', servico: 'Aferição de hidrômetro', situacao: 'No prazo' },
  { protocolo: '65665264', servico: 'Taxa de vistoria',       situacao: 'A vencer' },
]

const SECTIONS = [
  { id: 'densidade',   index: '01', title: 'Densidade' },
  { id: 'separadores', index: '02', title: 'Separadores' },
  { id: 'moldura',     index: '03', title: 'Moldura — flat, bordered, square' },
  { id: 'brand',       index: '04', title: 'Brandabilidade — prop × ancestral' },
  { id: 'conteudo',    index: '05', title: 'Conteúdo composto nas células' },
  { id: 'exemplos',    index: '06', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 7,                  label: 'Props' },
  { value: DENSIDADES.length,  label: 'Densidades' },
  { value: SEPARADORES.length, label: 'Separadores' },
  { value: BRANDS.length,      label: 'Brands' },
]
</script>

<style scoped>
.mt-stage {
  width: 100%;
  min-width: var(--dss-spacing-64);
}

.mt-right {
  text-align: right;
}
</style>
