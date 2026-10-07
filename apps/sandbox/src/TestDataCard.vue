<template>
  <PlaygroundLayout
    title="DssDataCard — Playground"
    code="stress-test/DssDataCard"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. A anatomia ──────────────────────────────────────────────── -->
    <PgSection
      id="anatomia" index="01" title="A anatomia: cartão + abas + painéis + rodapé" :count="1"
      desc="O componente é descrito no próprio código como `DssCard › DssToolbar + DssTabs + DssTabPanels + paginação`. O que está aqui é isso montado: um cabeçalho com título e subtítulo, uma faixa de abas, o painel da aba ativa e um rodapé de paginação. É esta anatomia que decide se ele serve de base para a tela de atendimento — compare com o protótipo: lá as abas são FINANCEIRO, CADASTRO, ORDEM DE SERVIÇO, LEITURAS E CONSUMO, COBRANÇAS e ATENDIMENTOS."
    >
      <PgGrid :cols="1">
        <PgTile code="title + subtitle + tabs + totalItems" align="stretch">
          <DssDataCard
            v-model="abaAtendimento"
            title="652701-9"
            subtitle="Contexto do atendimento"
            :tabs="ABAS_ATENDIMENTO"
            tabs-aria-label="Categorias do atendimento"
            :total-items="128"
            :items-per-page="10"
            data-medida="anatomia"
          >
            <template #tab-financeiro>
              <div class="dc-painel">
                <strong>Financeiro</strong>
                <p>Faturas, pagamentos e negociações do cliente.</p>
              </div>
            </template>
            <template #tab-cadastro>
              <div class="dc-painel">
                <strong>Informações de cadastro</strong>
                <p>Proprietário, morador, endereço e ligações.</p>
              </div>
            </template>
            <template #tab-ordem>
              <div class="dc-painel">
                <strong>Ordem de serviço</strong>
                <p>Serviços abertos, em execução e concluídos.</p>
              </div>
            </template>
            <template #tab-leituras>
              <div class="dc-painel">
                <strong>Leituras e consumo</strong>
                <p>Histórico de leitura, consumo e fotos do hidrômetro.</p>
              </div>
            </template>
          </DssDataCard>
          <p v-if="medidas.anatomia" class="dc-nota">{{ medidas.anatomia }}</p>
        </PgTile>
      </PgGrid>
      <p class="dc-nota dc-nota--bloco">
        <DssButton label="Medir a anatomia" variant="outline" size="sm" @click="medir" />
        A medição conta as peças reais no DOM — não o que a documentação afirma.
      </p>
    </PgSection>

    <!-- ── 02. Slots dinâmicos ─────────────────────────────────────────── -->
    <PgSection
      id="slots" index="02" title="Slots dinâmicos: uma aba, um slot" :count="1"
      desc="Cada aba declarada em `tabs` expõe um slot `tab-{name}`. É o mesmo padrão que o DssTable usa com `body-cell-[coluna]` e que o DssDataBoard adotou com `field-[name]`: config declara QUAIS, slot decide O QUE. Troque de aba e observe que só o painel correspondente renderiza — os demais saem do DOM, não ficam escondidos."
    >
      <PgGrid :cols="1">
        <PgTile code="#tab-resumo · #tab-detalhes · #tab-historico" align="stretch">
          <DssDataCard
            v-model="abaSlots"
            title="Painel com abas"
            subtitle="Três slots nomeados"
            :tabs="ABAS_SLOTS"
            tabs-aria-label="Seções do painel"
          >
            <template #tab-resumo>
              <div class="dc-painel">
                <strong>#tab-resumo</strong>
                <p>Aba ativa: <code>{{ abaSlots }}</code></p>
              </div>
            </template>
            <template #tab-detalhes>
              <div class="dc-painel">
                <strong>#tab-detalhes</strong>
                <p>Só aparece na aba Detalhes.</p>
              </div>
            </template>
            <template #tab-historico>
              <div class="dc-painel">
                <strong>#tab-historico</strong>
                <p>Só aparece na aba Histórico.</p>
              </div>
            </template>
          </DssDataCard>
          <p v-if="medidas.slots" class="dc-nota">{{ medidas.slots }}</p>
        </PgTile>
      </PgGrid>
      <p class="dc-nota dc-nota--bloco">
        <DssButton label="Medir os painéis" variant="outline" size="sm" @click="medirSlots" />
        Conta quantos painéis existem no DOM a cada aba — se os três coexistissem,
        o conteúdo inativo seria tabulável.
      </p>
    </PgSection>

    <!-- ── 03. O estado desce sem prop drilling ────────────────────────── -->
    <PgSection
      id="cascata" index="03" title="O estado desce sem prop drilling" :count="2"
      desc="`disabled` é provido pelo cartão e injetado pelos descendentes — é o §1.2 do guia de Fase 3, o mesmo mecanismo que o DssDataBoard usa para a retração em cascata. Nenhum nível intermediário repassa prop nenhuma. Compare os dois cartões: no desabilitado, os controles internos respondem sem terem recebido `disabled`."
    >
      <PgGrid :cols="2">
        <PgTile code=":disabled='false'" align="stretch">
          <DssDataCard
            v-model="abaCascata"
            title="Ativo"
            :tabs="ABAS_SLOTS"
            :total-items="42"
            :items-per-page="10"
          >
            <template #tab-resumo><div class="dc-painel">Controles ativos.</div></template>
            <template #tab-detalhes><div class="dc-painel">—</div></template>
            <template #tab-historico><div class="dc-painel">—</div></template>
          </DssDataCard>
        </PgTile>
        <PgTile code=":disabled='true'" align="stretch">
          <DssDataCard
            v-model="abaCascataOff"
            title="Desabilitado"
            :tabs="ABAS_SLOTS"
            :total-items="42"
            :items-per-page="10"
            disabled
            data-medida="cascata"
          >
            <template #tab-resumo><div class="dc-painel">Controles inertes.</div></template>
            <template #tab-detalhes><div class="dc-painel">—</div></template>
            <template #tab-historico><div class="dc-painel">—</div></template>
          </DssDataCard>
          <p v-if="medidas.cascata" class="dc-nota">{{ medidas.cascata }}</p>
        </PgTile>
      </PgGrid>
      <p class="dc-nota dc-nota--bloco">
        <DssButton label="Medir a cascata" variant="outline" size="sm" @click="medirCascata" />
        Conta quantos controles internos ficaram desabilitados sem receber a prop.
      </p>
    </PgSection>

    <!-- ── 04. A marca chega por cascata de CSS ────────────────────────── -->
    <PgSection
      id="marca" index="04" title="A marca chega por cascata, não por prop" :count="3"
      desc="`brand` emite `data-brand` no root e REMAPEIA o token — não pinta elemento nenhum. É o §1.3 do guia e o §K5 do checklist. Os três cartões abaixo não passam cor para filho algum: as abas, o indicador ativo e a paginação acompanham sozinhos."
    >
      <PgGrid :cols="3">
        <PgTile v-for="m in MARCAS" :key="m" :code="`brand='${m}'`" align="stretch">
          <DssDataCard
            :model-value="0"
            :title="m"
            :tabs="ABAS_SLOTS"
            :brand="m"
            :data-medida="`marca-${m}`"
          >
            <template #tab-resumo><div class="dc-painel">Marca {{ m }}.</div></template>
            <template #tab-detalhes><div class="dc-painel">—</div></template>
            <template #tab-historico><div class="dc-painel">—</div></template>
          </DssDataCard>
          <p v-if="medidas[`marca-${m}`]" class="dc-nota">{{ medidas[`marca-${m}`] }}</p>
        </PgTile>
      </PgGrid>
      <p class="dc-nota dc-nota--bloco">
        <DssButton label="Medir as marcas" variant="outline" size="sm" @click="medirMarcas" />
        Lê a cor computada do indicador da aba ativa em cada cartão.
      </p>
    </PgSection>

    <!-- ── 05. Variantes ──────────────────────────────────────────────── -->
    <PgSection
      id="variantes" index="05" title="Variantes de superfície" :count="3"
      desc="A superfície do cartão vem do DssCard, não de CSS próprio — o composto não reimplementa o primitivo."
    >
      <PgGrid :cols="3">
        <PgTile v-for="v in VARIANTES" :key="v" :code="`variant='${v}'`" align="stretch">
          <DssDataCard :title="v" :variant="v" subtitle="Superfície do DssCard">
            <p class="dc-painel">Conteúdo sem abas.</p>
          </DssDataCard>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. O que ele NÃO é ────────────────────────────────────────── -->
    <PgSection
      id="fronteira" index="06" title="A fronteira: o que ele não entrega" :count="1"
      desc="Esta seção existe para a comparação com o protótipo da tela de atendimento. O DssDataCard entrega a espinha (cartão + abas + painéis + paginação) e NÃO entrega: a faixa de dados do cliente em colunas, a barra de ações secundárias (Gerar/Emitir/Programar/Encerrar), os botões circulares laterais, nem retração do cartão inteiro. Nada disso é defeito — são responsabilidades que o componente nunca prometeu."
    >
      <PgGrid :cols="1">
        <PgTile code="o que falta para a tela de atendimento" align="start">
          <ul class="dc-lista">
            <li v-for="f in FRONTEIRA" :key="f.item">
              <strong>{{ f.item }}</strong> — {{ f.nota }}
            </li>
          </ul>
        </PgTile>
      </PgGrid>
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 *  TestDataCard — Playground do DssDataCard
 * ==========================================================================
 *
 *  POR QUE ESTA PÁGINA VOLTOU (set/2026)
 *
 *  Ela tinha sido removida junto com as demais páginas de resíduo, e voltou
 *  por um motivo específico: decidir se o `DssDataCard` serve de base para o
 *  componente da tela de ATENDIMENTO (Figma 1888:2034).
 *
 *  Foi reescrita, não restaurada. A versão anterior era um "stress test" com
 *  seções OBJ-01..05 que AFIRMAVAM o cumprimento dos cinco padrões de Fase 3;
 *  esta MEDE cada um no DOM e mostra o número. A seção 06 é nova e existe só
 *  para a comparação com o protótipo: ela diz o que o componente NÃO entrega.
 *
 *  SOBRE O COMPONENTE ESTAR EM `stress-test/`
 *
 *  O `DssDataCard` é `status: sealed`, tem contrato, testes e documentação
 *  completa, e é o `goldenContext` declarado da Fase 3 — mas mora na pasta de
 *  fixtures, que o CLAUDE.md declara fora do escopo de governança. As duas
 *  coisas se contradizem, e a contradição está registrada em DEBITO_ABERTO.md.
 */

import { ref } from 'vue'

import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'

import DssButton from '@components/base/DssButton/DssButton.vue'
import DssDataCard from '@components/stress-test/DssDataCard/DssDataCard.vue'

// ── Abas ─────────────────────────────────────────────────────────────────
// Espelham as categorias do protótipo da tela de atendimento, para a
// comparação ser direta.
const ABAS_ATENDIMENTO = [
  { name: 'financeiro', label: 'Financeiro', icon: 'attach_money' },
  { name: 'cadastro', label: 'Informações de cadastro', icon: 'person' },
  { name: 'ordem', label: 'Ordem de serviço', icon: 'build' },
  { name: 'leituras', label: 'Leituras e consumo', icon: 'speed' },
]

const ABAS_SLOTS = [
  { name: 'resumo', label: 'Resumo' },
  { name: 'detalhes', label: 'Detalhes' },
  { name: 'historico', label: 'Histórico' },
]

const MARCAS = ['hub', 'water', 'waste'] as const
const VARIANTES = ['elevated', 'outlined', 'flat'] as const

const abaAtendimento = ref(0)
const abaSlots = ref(0)
const abaCascata = ref(0)
const abaCascataOff = ref(0)

const FRONTEIRA = [
  { item: 'Faixa de dados do cliente', nota: 'o protótipo mostra proprietário, morador, endereço, rota e ligações em três colunas acima das abas. O cartão tem apenas título e subtítulo.' },
  { item: 'Barra de ações secundárias', nota: 'Gerar · Emitir · Programar · Encerrar · Cancelar · Notificar · Imprimir, abaixo das abas. Não existe slot para isso.' },
  { item: 'Botões circulares laterais', nota: 'três controles flutuantes à direita do cabeçalho.' },
  { item: 'Retração do cartão inteiro', nota: 'o "+ DETALHES" do protótipo sugere colapsar o bloco de dados. O DssDataCard não retrai.' },
  { item: 'Abas com menu suspenso', nota: 'cada categoria do protótipo tem um chevron próprio — são disparadores de menu, não só abas.' },
]

// ── Medição ──────────────────────────────────────────────────────────────
const medidas = ref<Record<string, string>>({})

/** Mede no DOM, em vez de confiar no que a documentação afirma. */
function medir() {
  const el = document.querySelector('[data-medida="anatomia"]')
  if (!el) return
  const abas = el.querySelectorAll('[role="tab"]').length
  const paineis = el.querySelectorAll('[role="tabpanel"]').length
  const temCard = !!el.closest('.dss-card') || !!el.querySelector('.dss-card') || el.classList.contains('dss-card')
  const rodape = el.querySelector('.dss-data-card__footer, [class*="footer"], [class*="pagination"]')
  medidas.value.anatomia =
    `${abas} abas · ${paineis} painel(éis) no DOM · cartão: ${temCard ? 'sim' : 'não'} · rodapé: ${rodape ? 'presente' : 'ausente'}`
}

function medirSlots() {
  const cartoes = [...document.querySelectorAll('.dss-data-card')]
  const alvo = cartoes.find((c) => c.querySelector('[role="tab"]'))
  if (!alvo) return
  const paineis = alvo.querySelectorAll('[role="tabpanel"]').length
  const visiveis = [...alvo.querySelectorAll('[role="tabpanel"]')]
    .filter((p) => (p as HTMLElement).offsetParent !== null).length
  medidas.value.slots =
    `${paineis} painel(éis) no DOM, ${visiveis} visível(eis) — os inativos ${paineis > visiveis ? 'permanecem no DOM' : 'saem do DOM'}`
}

function medirCascata() {
  const el = document.querySelector('[data-medida="cascata"]')
  if (!el) return
  const controles = [...el.querySelectorAll('button, [role="tab"]')]
  const inertes = controles.filter(
    (c) => (c as HTMLButtonElement).disabled || c.getAttribute('aria-disabled') === 'true',
  ).length
  medidas.value.cascata =
    `${inertes} de ${controles.length} controles inertes — nenhum recebeu a prop \`disabled\``
}

function medirMarcas() {
  for (const m of MARCAS) {
    const el = document.querySelector(`[data-medida="marca-${m}"]`)
    if (!el) continue
    const ativa = el.querySelector('[role="tab"][aria-selected="true"]') || el.querySelector('[role="tab"]')
    if (!ativa) continue
    const cor = getComputedStyle(ativa).color
    medidas.value[`marca-${m}`] = `cor da aba ativa: ${cor}`
  }
}

const SECTIONS = [
  { id: 'anatomia',  index: '01', title: 'A anatomia: cartão + abas + painéis + rodapé' },
  { id: 'slots',     index: '02', title: 'Slots dinâmicos: uma aba, um slot' },
  { id: 'cascata',   index: '03', title: 'O estado desce sem prop drilling' },
  { id: 'marca',     index: '04', title: 'A marca chega por cascata, não por prop' },
  { id: 'variantes', index: '05', title: 'Variantes de superfície' },
  { id: 'fronteira', index: '06', title: 'A fronteira: o que ele não entrega' },
]

const KPIS = [
  { value: 8, label: 'Props' },
  { value: 3, label: 'Variantes' },
  { value: 3, label: 'Marcas' },
  { value: 5, label: 'Lacunas p/ atendimento' },
]
</script>

<style scoped>
.dc-painel {
  padding: var(--dss-spacing-3);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
}

.dc-painel strong {
  display: block;
  margin-bottom: var(--dss-spacing-1);
}

.dc-nota {
  margin: var(--dss-spacing-2) 0 0;
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

.dc-nota--bloco {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  flex-wrap: wrap;
  margin-top: var(--dss-spacing-3);
}

.dc-lista {
  margin: 0;
  padding-left: var(--dss-spacing-5);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
}
</style>
