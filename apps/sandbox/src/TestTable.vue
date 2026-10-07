<template>
  <PlaygroundLayout
    title="DssTable — Playground"
    code="composed/DssTable"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Densidade ────────────────────────────────────────────────── -->
    <PgSection
      id="densidade" index="01" title="Densidade" :count="DENSIDADES.length"
      desc="Três degraus de altura de linha. É a primeira decisão de uma tabela de operação: o grid master do Sansys Water pede linha de 36 px, que é o que compact entrega. Meça a altura do <tr>, não o padding declarado — o line-height do texto entra na conta."
    >
      <PgGrid>
        <PgTile v-for="d in DENSIDADES" :key="d" :code="`density=&quot;${d}&quot;`" align="start">
          <DssTable
            :rows="LINHAS.slice(0, 3)" :columns="COLUNAS" row-key="protocolo"
            :density="d" flat hide-bottom class="tb-stage"
          />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Estados de dado ──────────────────────────────────────────── -->
    <PgSection
      id="estados" index="02" title="Estados de dado" :count="4"
      desc="Os três estados que o portão de prontidão cobra de toda lista — vazio, carregando e filtro sem resultado — mais o caminho feliz. O DssTable os tem embutidos: noDataLabel e noResultsLabel são props, não algo que a tela precise montar. Tabela que só implementa o caminho feliz é o defeito mais comum de lista."
    >
      <PgGrid>
        <PgTile code="com dados" align="start">
          <DssTable :rows="LINHAS" :columns="COLUNAS" row-key="protocolo" density="compact" flat hide-bottom class="tb-stage" />
        </PgTile>
        <PgTile code="vazio — noDataLabel" align="start">
          <DssTable
            :rows="[]" :columns="COLUNAS" row-key="protocolo" density="compact" flat hide-bottom
            no-data-label="Nenhuma solicitação para os filtros informados." class="tb-stage"
          />
        </PgTile>
        <PgTile code="carregando" align="start">
          <DssTable :rows="LINHAS.slice(0,2)" :columns="COLUNAS" row-key="protocolo" density="compact" flat hide-bottom loading class="tb-stage" />
        </PgTile>
        <PgTile code="filtro sem resultado — noResultsLabel" align="start">
          <DssTable
            :rows="LINHAS" :columns="COLUNAS" row-key="protocolo" density="compact" flat hide-bottom
            filter="zzz-inexistente" no-results-label="Nenhuma linha casa com o filtro." class="tb-stage"
          />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Seleção ──────────────────────────────────────────────────── -->
    <PgSection
      id="selecao" index="03" title="Seleção" :count="3"
      desc="none, single e multiple. Em multiple a tabela ganha a coluna de caixas e o seletor do cabeçalho, que é o ponto de acessibilidade: cada caixa precisa de nome próprio, senão o leitor de tela anuncia N caixas idênticas. Selecionadas aqui: {{ selecionadas.length }}."
    >
      <PgGrid>
        <PgTile v-for="s in SELECOES" :key="s" :code="`selection=&quot;${s}&quot;`" align="start">
          <DssTable
            v-model="selecionadas"
            :rows="LINHAS.slice(0, 3)" :columns="COLUNAS" row-key="protocolo"
            :selection="s" density="compact" flat hide-bottom class="tb-stage"
          />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Ordenação e coluna ───────────────────────────────────────── -->
    <PgSection
      id="colunas" index="04" title="Ordenação e definição de coluna" :count="2"
      desc="A coluna é objeto, não markup: name, label, field, align, sortable e format. field aceita função, e é por aí que se formata sem sujar o dado. Só as colunas com sortable ganham o controle de ordenação — marcar tudo como ordenável é ruído."
    >
      <PgGrid>
        <PgTile code="sortable nas colunas de dado" align="start">
          <DssTable :rows="LINHAS" :columns="COLUNAS" row-key="protocolo" density="compact" flat hide-bottom class="tb-stage" />
        </PgTile>
        <PgTile code="align e format (field como função)" align="start">
          <DssTable :rows="LINHAS" :columns="COLUNAS_FORMATADAS" row-key="protocolo" density="compact" flat hide-bottom class="tb-stage" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Moldura e separadores ────────────────────────────────────── -->
    <PgSection
      id="moldura" index="05" title="Moldura e separadores" :count="4"
      desc="Dentro de um DssCard a combinação correta é flat: a superfície e a sombra já são do card, e sobrepor as duas cria a moldura dupla que aparece nas telas quando ninguém confere. separator governa a grade interna."
    >
      <PgGrid>
        <PgTile v-for="m in MOLDURAS" :key="m.code" :code="m.code" align="start">
          <DssTable v-bind="m.props" :rows="LINHAS.slice(0,2)" :columns="COLUNAS" row-key="protocolo" density="compact" hide-bottom class="tb-stage" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Paginação ────────────────────────────────────────────────── -->
    <PgSection
      id="paginacao" index="06" title="Paginação" :count="2"
      desc="hideBottom esconde a régua inteira — só serve quando o volume cabe na tela, e o volume é justamente o que a spec costuma não dizer. Com rowsPerPageOptions a régua aparece e o consumidor escolhe o passo."
    >
      <PgGrid>
        <PgTile code="hideBottom (volume pequeno)" align="start">
          <DssTable :rows="LINHAS" :columns="COLUNAS" row-key="protocolo" density="compact" flat hide-bottom class="tb-stage" />
        </PgTile>
        <PgTile code="com régua e rowsPerPageOptions" align="start">
          <DssTable
            :rows="LINHAS" :columns="COLUNAS" row-key="protocolo" density="compact" flat
            :rows-per-page-options="[3, 5, 0]" class="tb-stage"
          />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Os quatro slots estruturais ──────────────────────────────── -->
    <PgSection
      id="slots" index="07" title="Os quatro slots estruturais" :count="4"
      desc="top, header, body e bottom. O DssTable repassa DINAMICAMENTE todos os slots do QTable — inclusive os de nome derivado, como body-cell-[coluna] —, e é por eles que componente DSS entra na tabela. Repare no que cada um substitui: `header` troca a linha inteira do cabeçalho (e aí a ordenação vira sua responsabilidade), enquanto `body-cell-[coluna]` troca só uma célula e preserva o resto."
    >
      <PgGrid>
        <PgTile code="slot top — barra de ferramentas" align="start">
          <DssTable :rows="LINHAS.slice(0,3)" :columns="COLUNAS" row-key="protocolo" density="compact" flat hide-bottom class="tb-stage">
            <template #top>
              <DssToolbar class="tb-barra">
                <DssButton label="Exportar" variant="outline" size="xs" icon="download" />
                <DssButton label="Nova" color="primary" size="xs" icon="add" />
              </DssToolbar>
            </template>
          </DssTable>
        </PgTile>

        <PgTile code="slot header — a linha inteira do cabeçalho" align="start">
          <DssTable :rows="LINHAS.slice(0,3)" :columns="COLUNAS" row-key="protocolo" density="compact" flat hide-bottom class="tb-stage">
            <template #header="props">
              <tr>
                <th v-for="col in props.cols" :key="col.name" class="tb-th">
                  {{ col.label }}
                </th>
              </tr>
            </template>
          </DssTable>
        </PgTile>

        <PgTile code="slot body-cell-[coluna] — só uma célula" align="start">
          <DssTable :rows="LINHAS.slice(0,3)" :columns="COLUNAS" row-key="protocolo" density="compact" flat hide-bottom class="tb-stage">
            <template #body-cell-prazo="props">
              <td class="tb-td">
                <DssChip
                  :color="props.row.prazo === 'Atrasada' ? 'negative' : 'positive'"
                  size="xs" dense
                  :icon="props.row.prazo === 'Atrasada' ? 'cancel' : 'check_circle'"
                  :label="String(props.row.prazo)"
                />
              </td>
            </template>
          </DssTable>
        </PgTile>

        <PgTile code="slot bottom — a régua é sua" align="start">
          <DssTable :rows="LINHAS.slice(0,3)" :columns="COLUNAS" row-key="protocolo" density="compact" flat class="tb-stage">
            <template #bottom>
              <div class="tb-rodape">
                <span>3 de {{ LINHAS.length }} solicitações</span>
                <DssButton label="Ver todas" variant="flat" size="xs" />
              </div>
            </template>
          </DssTable>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. A linha estica — e quanto ────────────────────────────────── -->
    <PgSection
      id="altura" index="08" title="A linha estica — e quanto" :count="6"
      desc="A altura da linha sai do PADDING da célula somado ao que for mais alto dentro dela — não existe `height` declarada em `td` nenhum. Medido no compact, só texto: 6px de padding + 24px de line-height + 6px + 1px de borda = 37,5px de &lt;tr&gt;. Ponha um DssButton na célula e o line-height de 24px dá lugar aos 32px do botão — a linha vai a 45,5px. O custo é +8px, e é o MESMO nas três densidades: o que muda entre elas é o padding, não o teto do conteúdo. Não é defeito. Encolher o botão quebraria o alvo de toque da WCAG 2.5.5, e a linha crescer é o certo. Mas é decisão, não descoberta: uma coluna de ações custa 8px por linha, e o grid master do Sansys Water pede 36px."
    >
      <PgGrid>
        <template v-for="d in DENSIDADES" :key="`alt-${d}`">
          <PgTile :code="`${d} — só texto`" align="start">
            <DssTable
              :data-medida="`${d}-texto`"
              :rows="LINHAS.slice(0,3)" :columns="COLUNAS_ALTURA" row-key="protocolo"
              :density="d" flat hide-bottom class="tb-stage tb-stage--estreito"
            />
            <p class="tb-nota">
              &lt;tr&gt;: <strong>{{ alturas[`${d}-texto`] ?? '—' }}</strong>
              <span v-if="conteudos[`${d}-texto`]"> · célula: {{ conteudos[`${d}-texto`] }}</span>
            </p>
          </PgTile>
          <PgTile :code="`${d} — com DssChip e DssButton`" align="start">
            <DssTable
              :data-medida="`${d}-componentes`"
              :rows="LINHAS.slice(0,3)" :columns="COLUNAS_ALTURA_COM_ACOES" row-key="protocolo"
              :density="d" flat hide-bottom class="tb-stage tb-stage--estreito"
            >
              <template #body-cell-prazo="props">
                <td class="tb-td">
                  <DssChip
                    :color="props.row.prazo === 'Atrasada' ? 'negative' : 'positive'"
                    size="xs" dense
                    :icon="props.row.prazo === 'Atrasada' ? 'cancel' : 'check_circle'"
                    :label="String(props.row.prazo)"
                  />
                </td>
              </template>
              <template #body-cell-acoes="props">
                <td class="tb-td tb-td--direita">
                  <DssButton variant="flat" color="primary" size="xs" icon="edit" :aria-label="`Editar ${props.row.protocolo}`" />
                </td>
              </template>
            </DssTable>
            <p class="tb-nota">
              &lt;tr&gt;: <strong>{{ alturas[`${d}-componentes`] ?? '—' }}</strong>
              <span v-if="conteudos[`${d}-componentes`]"> · célula: {{ conteudos[`${d}-componentes`] }}</span>
              <span v-if="delta(d)" :class="['tb-delta', delta(d)! > 0 ? 'tb-delta--cresceu' : 'tb-delta--igual']">
                · {{ delta(d)! > 0 ? `cresceu ${delta(d)}px` : 'sem crescimento' }}
              </span>
            </p>
          </PgTile>
        </template>
      </PgGrid>
      <p class="tb-nota tb-nota--bloco">
        <DssButton label="Medir alturas" variant="outline" size="sm" @click="medirAlturas" />
      </p>
    </PgSection>

    <!-- ── 09. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="09" title="Exemplos de uso" :count="6"
      desc="Cenários reais, vindos do DssTable.example.vue do próprio componente."
    >
      <DssTableExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssTable from '@components/composed/DssTable/DssTable.vue'
import DssTableExample from '@components/composed/DssTable/DssTable.example.vue'
import DssToolbar from '@components/base/DssToolbar/DssToolbar.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssChip from '@components/base/DssChip/DssChip.vue'

const DENSIDADES = ['compact', 'standard', 'comfortable'] as const
const SELECOES = ['none', 'single', 'multiple'] as const

const selecionadas = ref<Record<string, unknown>[]>([])

const LINHAS = [
  { protocolo: '65665262', servico: 'Religação de água',      equipe: 'CL250', prazo: 'Atrasada', valor: 184.5 },
  { protocolo: '65665263', servico: 'Aferição de hidrômetro', equipe: 'CL251', prazo: 'No prazo', valor: 92 },
  { protocolo: '65665264', servico: 'Taxa de vistoria',       equipe: 'CL250', prazo: 'A vencer', valor: 45.9 },
  { protocolo: '65665265', servico: 'Corte a pedido',         equipe: 'CL252', prazo: 'No prazo', valor: 0 },
  { protocolo: '65665266', servico: 'Troca de hidrômetro',    equipe: 'CL251', prazo: 'Atrasada', valor: 310.75 },
]

const COLUNAS = [
  { name: 'protocolo', label: 'Protocolo', field: 'protocolo', align: 'left' as const, sortable: true },
  { name: 'servico',   label: 'Serviço',   field: 'servico',   align: 'left' as const, sortable: true },
  { name: 'equipe',    label: 'Equipe',    field: 'equipe',    align: 'left' as const, sortable: true },
  { name: 'prazo',     label: 'Situação',  field: 'prazo',     align: 'left' as const },
]

const COLUNAS_FORMATADAS = [
  { name: 'protocolo', label: 'Protocolo', field: 'protocolo', align: 'left' as const },
  { name: 'servico',   label: 'Serviço',   field: 'servico',   align: 'left' as const },
  {
    name: 'valor', label: 'Valor', align: 'right' as const, sortable: true,
    field: (row: Record<string, unknown>) => row.valor as number,
    format: (val: unknown) => (val as number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
]

/**
 * A seção 08 vive num tile estreito, e o ponto dela é VER o chip e o botão que
 * esticam a linha. Com as 4 colunas do resto da página, as duas que importam
 * saem do campo de visão — a medição continuaria certa e a demonstração,
 * invisível. Por isso um recorte de duas colunas, igual dos dois lados do par.
 */
const COLUNAS_ALTURA = [
  { name: 'protocolo', label: 'Protocolo', field: 'protocolo', align: 'left' as const },
  { name: 'prazo', label: 'Situação', field: 'prazo', align: 'left' as const },
]

const COLUNAS_ALTURA_COM_ACOES = [
  ...COLUNAS_ALTURA,
  { name: 'acoes', label: 'Ações', field: 'protocolo', align: 'right' as const },
]

// ── Medição da altura de linha ──────────────────────────────────────────────
//
// A altura NÃO é lida de um token: é medida do <tr> renderizado. É a única
// forma de responder "quanto custa pôr um chip na célula", porque o custo vem
// da altura mínima do FILHO (alvo de toque), não de nada que a tabela declare.

const alturas = reactive<Record<string, string>>({})
const conteudos = reactive<Record<string, string>>({})

/**
 * As tabelas são encontradas pelo `data-medida` no momento da medição, e não
 * guardadas em refs.
 *
 * Por quê: um `:ref` de função guarda o elemento do MOMENTO da montagem. Depois
 * de um HMR — ou de qualquer re-render que troque o nó — a referência aponta
 * para um elemento destacado do documento, e `getBoundingClientRect()` devolve
 * zero. Foi o que aconteceu aqui: `<tr>: 0px` e altura de conteúdo negativa.
 * Consultar o DOM na hora não tem esse problema.
 */
function medirAlturas() {
  const palcos = [...document.querySelectorAll<HTMLElement>('[data-medida]')]
    .map((el) => [el.dataset.medida as string, el] as const)

  for (const [chave, el] of palcos) {
    const linha = el.querySelector('tbody tr')
    const celula = linha?.querySelector('td')
    // `offsetParent` nulo = a seção está com display:none — é o caso quando a
    // casca está na vista "Preview Frame", que mantém as seções MONTADAS por
    // v-show. Medir ali devolve zero em tudo. Melhor não escrever nada do que
    // escrever 0px.
    if (!linha || !celula || el.offsetParent === null) continue
    const cs = getComputedStyle(celula)
    alturas[chave] = `${Math.round(linha.getBoundingClientRect().height)}px`
    // Só o padding é reportado como número: ele é declarado pela densidade e
    // não tem ambiguidade. O resto da caixa (line-height ou altura do
    // componente, mais a borda) está decomposto na descrição da seção, com os
    // valores medidos — repetir aqui uma subtração sujeita a subpixel só
    // produziria um número que não fecha com a prosa.
    conteudos[chave] = `padding ${parseFloat(cs.paddingTop)} + ${parseFloat(cs.paddingBottom)}`
  }
}

/** Quanto a linha cresceu ao receber os componentes, na mesma densidade. */
function delta(d: string): number | null {
  const texto = parseInt(alturas[`${d}-texto`] ?? '')
  const comps = parseInt(alturas[`${d}-componentes`] ?? '')
  if (Number.isNaN(texto) || Number.isNaN(comps)) return null
  return comps - texto
}

const MOLDURAS = [
  { code: 'flat (dentro de card)', props: { flat: true } },
  { code: 'bordered',              props: { bordered: true } },
  { code: 'separator="cell"',      props: { flat: true, separator: 'cell' } },
  { code: 'separator="none"',      props: { flat: true, separator: 'none' } },
]

const SECTIONS = [
  { id: 'densidade',  index: '01', title: 'Densidade' },
  { id: 'estados',    index: '02', title: 'Estados de dado' },
  { id: 'selecao',    index: '03', title: 'Seleção' },
  { id: 'colunas',    index: '04', title: 'Ordenação e definição de coluna' },
  { id: 'moldura',    index: '05', title: 'Moldura e separadores' },
  { id: 'paginacao',  index: '06', title: 'Paginação' },
  { id: 'slots',      index: '07', title: 'Os quatro slots estruturais' },
  { id: 'altura',     index: '08', title: 'A linha estica — e quanto' },
  { id: 'exemplos',   index: '09', title: 'Exemplos de uso' },
]

onMounted(async () => {
  await nextTick()
  medirAlturas()
})

const KPIS = [
  { value: 18,                 label: 'Props' },
  { value: DENSIDADES.length,  label: 'Densidades' },
  { value: SELECOES.length,    label: 'Seleções' },
  { value: 3,                  label: 'Emits' },
]
</script>

<style scoped>
.tb-stage {
  width: 100%;
  min-width: var(--dss-spacing-64);
}

/* A seção 08 precisa caber no tile: sem isto a coluna do chip e a do botão —
   justamente as que esticam a linha — saem do campo de visão. */
.tb-stage--estreito {
  min-width: 0;
}

.tb-barra {
  display: flex;
  gap: var(--dss-spacing-2);
  justify-content: flex-end;
}

.tb-th {
  text-align: left;
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-semibold);
  padding: var(--dss-spacing-1_5) var(--dss-spacing-3);
}

.tb-td {
  padding: var(--dss-spacing-1_5) var(--dss-spacing-3);
}

.tb-td--direita {
  text-align: right;
}

.tb-rodape {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}

.tb-nota {
  margin: var(--dss-spacing-2) 0 0;
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

.tb-nota--bloco {
  margin-top: var(--dss-spacing-4);
}

.tb-delta {
  margin-left: var(--dss-spacing-2);
  font-weight: var(--dss-font-weight-semibold);
}

.tb-delta--cresceu {
  color: var(--dss-feedback-warning);
}

.tb-delta--igual {
  color: var(--dss-feedback-success);
}
</style>
