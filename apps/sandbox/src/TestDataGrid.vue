<template>
  <div class="dg-page" data-brand="water">
    <DssLayout view="hHh lpR fFf" container class="dg-layout">

      <DssAppBar brand="water" title="Solicitações" menu-aria-label="Abrir menu principal">
        <template #actions>
          <DssButton variant="flat" round size="md" icon="help_outline" aria-label="Ajuda" />
          <DssButton variant="flat" round size="md" icon="account_circle" aria-label="Minha conta" />
        </template>
      </DssAppBar>

      <DssPageContainer>
        <DssPage>
          <DssPageShell rail-aria-label="Módulos do sistema">

            <template #rail>
              <DssPageShellRailItem
                v-for="m in modulos"
                :key="m.label"
                :icon="m.icone"
                :label="m.label"
                :active="m.ativo"
              />
            </template>

            <template #breadcrumb>
              <DssBreadcrumbs separator="›" gutter="sm">
                <DssBreadcrumbsEl label="Operação" icon="looks_one" />
                <DssBreadcrumbsEl label="Solicitações" icon="looks_two" />
              </DssBreadcrumbs>
            </template>

            <div class="dg-head">
              <DssSectionTitle :level="1" size="lg" label="Solicitações" />
              <DssBtnToggle v-model="apresentacao" :options="opcoesDeApresentacao" variant="flat" aria-label="Forma de apresentação" />
            </div>

            <!-- Mesmo vínculo do pattern: o board aponta para o bloco por
                 aria-controls e dispara a busca. Quem filtra é ESTA PÁGINA. -->
            <DssDataBoard
              v-model="filtros"
              v-model:collapsed="boardRetraido"
              :fields="campos"
              controls="grid-solicitacoes"
              brand="water"
              @search="pesquisar"
              @remove-filter="pesquisar"
            />

            <!-- Container da página: UI comum (`outlined`), como no pattern
                 "Solicitações". A borda redundante não era esta — era a do
                 cartão INTERNO do bloco de dados, que envolve a tabela e já
                 ganha divisórias do DssTable. Esse foi para `flat`; este aqui
                 é o enquadramento da página e mantém a moldura. -->
            <DssCard variant="outlined" class="dg-bloco">
            <DssDataGrid
              v-if="apresentacao === 'ficha'"
              id="grid-solicitacoes"
              v-model="selecionados"
              v-model:page="pagina"
              :rows="linhasFiltradas"
              :fields="camposDaFicha"
              :total="registros.length"
              :filter-label="rotuloDoFiltro"
              :rows-per-page="6"
              :columns-per-row="3"
              title="Registros"
              aria-label="Solicitações em fichas"
              selection="multiple"
              brand="water"
              title-field="protocolo"
              @clear-filter="limparFiltro"
            >
              <template #head-actions="{ selected, disabled }">
                <DssButton
                  label="Atribuir equipe"
                  icon="person_add"
                  variant="outline"
                  size="sm"
                  :disabled="disabled || !selected.length"
                  @click="atribuirAberto = true"
                />
              </template>

              <template #item-actions="{ row, disabled }">
                <DssButton
                  variant="flat"
                  size="md"
                  round
                  icon="visibility"
                  :aria-label="`Abrir solicitação ${row.protocolo}`"
                  :disabled="disabled"
                  @click.stop="abrir(row)"
                />
              </template>
            </DssDataGrid>

            <!-- A MESMA informação, na outra apresentação.

                 Ficha e grade servem a leituras diferentes do mesmo conjunto:
                 a ficha é para ler um registro, a grade é para comparar entre
                 registros. Por isso o alternador troca o BLOCO e preserva o
                 estado — seleção, página e filtro atravessam a troca. -->
            <DssDataTableClaudeCode
              v-else
              id="grade-solicitacoes"
              v-model="selecionados"
              :rows="linhasFiltradas"
              :columns="colunasDaGrade"
              :total="registros.length"
              :filter-label="rotuloDoFiltro"
              title="Registros"
              aria-label="Solicitações em grade"
              selection="multiple"
              status-column="situacao"
              :status-map="mapaDeSituacao"
              brand="water"
              :row-actions="acoesDeLinha"
              @clear-filter="limparFiltro"
            >
              <template #head-actions="{ selected, disabled }">
                <DssButton
                  label="Atribuir equipe"
                  icon="person_add"
                  variant="outline"
                  size="sm"
                  :disabled="disabled || !selected.length"
                  @click="atribuirAberto = true"
                />
              </template>

              <!-- A MESMA ação da ficha, agora como última coluna.
                   Sem o slot, a ação sumia ao trocar de apresentação: o
                   `item-actions` é do grid e não atravessa para a tabela. -->
              <template #row-actions="{ row, disabled }">
                <DssButton
                  variant="flat"
                  size="md"
                  round
                  icon="visibility"
                  :aria-label="`Abrir solicitação ${row.protocolo}`"
                  :disabled="disabled"
                  @click.stop="abrir(row)"
                />
              </template>
            </DssDataTableClaudeCode>
            </DssCard>

            <DssBanner
              v-if="eco"
              variant="info"
              rounded
              dense
              inline-actions
              dismissible
              @dismiss="eco = ''"
            >
              {{ eco }}
            </DssBanner>

          </DssPageShell>
        </DssPage>
      </DssPageContainer>

      <!-- O destino REAL da ação de linha em produção: abrir o registro.
           Mora dentro do DssLayout e recebe data-brand/data-theme explícitos
           porque o conteúdo é teleportado para fora da árvore da página — sem
           isso o diálogo sai do escopo da marca. -->
      <DssDialog
        :open="Boolean(aberto)"
        data-brand="water"
        aria-label="Detalhes da solicitação"
        @update:open="v => { if (!v) aberto = null }"
      >
        <template #header>Solicitação {{ aberto?.protocolo }}</template>

        <dl class="dg-detalhe">
          <template v-for="campo in camposDaFicha" :key="campo.name">
            <dt>{{ campo.label }}</dt>
            <dd>{{ aberto?.[campo.name] }}</dd>
          </template>
        </dl>

        <template #footer>
          <DssButton label="Fechar" variant="flat" @click="aberto = null" />
          <DssButton
            label="Atender"
            color="primary"
            variant="unelevated"
            @click="eco = `Atendimento iniciado — ${aberto?.protocolo}`; aberto = null"
          />
        </template>
      </DssDialog>

      <!-- Ação em LOTE: o destino real também é um diálogo, porque atribuir
           equipe exige escolher a equipe. O diálogo nomeia quantos registros
           serão afetados — é a última chance de conferir o escopo. -->
      <DssDialog
        v-model:open="atribuirAberto"
        data-brand="water"
        aria-label="Atribuir equipe"
      >
        <template #header>Atribuir equipe</template>

        <p class="dg-escopo">
          {{ selecionados.length }} registro(s) selecionado(s):
          <strong>{{ selecionados.map(r => r.protocolo).join(', ') }}</strong>
        </p>
        <DssSelect
          v-model="equipeEscolhida"
          :options="EQUIPES"
          label="Equipe"
          aria-label="Equipe de destino"
        />

        <template #footer>
          <DssButton label="Cancelar" variant="flat" @click="atribuirAberto = false" />
          <DssButton
            label="Confirmar"
            color="primary"
            variant="unelevated"
            :disabled="!equipeEscolhida"
            @click="confirmarAtribuicao"
          />
        </template>
      </DssDialog>
    </DssLayout>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 *  TestDataGrid — o `jtech-data-grid` portado, dentro da base "Solicitações"
 * ==========================================================================
 *
 *  A base é a mesma do `TestSolicitacoes.vue`: AppBar, PageShell com rail,
 *  trilha, título e `DssDataBoard`. O que muda é o bloco de dados — ficha em
 *  vez de grade — e o que isso obriga a mudar na base:
 *
 *  1. O cartão continua sendo o primeiro container sob o PageShell; a ficha
 *     de cada registro é um segundo nível de card, e isso é deliberado.
 *  2. O alternador grade/ficha entra no cabeçalho: as duas apresentações
 *     servem ao mesmo conjunto, e a escolha é de quem lê.
 *
 *  O filtro continua sendo da página — o board emite `search`, esta página
 *  filtra e entrega `rows` pronta, com `total` para a contagem.
 */
import { computed, ref } from 'vue'

import DssAppBar from '@components/composed/DssAppBar/DssAppBar.vue'
import DssBanner from '@components/base/DssBanner/DssBanner.vue'
import DssBreadcrumbs from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssBtnToggle from '@components/base/DssBtnToggle/DssBtnToggle.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssCard from '@components/base/DssCard/DssCard.vue'
import DssDataBoard from '@components/composed/DssDataBoard/DssDataBoard.vue'
import DssDataGrid from '@components/composed/DssDataGrid/DssDataGrid.vue'
import DssDialog from '@components/composed/DssDialog/DssDialog.vue'
import DssSelect from '@components/base/DssSelect/DssSelect.vue'
import DssDataTableClaudeCode from '@components/composed/DssDataTableClaudeCode/DssDataTableClaudeCode.vue'
import DssLayout from '@components/base/DssLayout/DssLayout.vue'
import DssPage from '@components/base/DssPage/DssPage.vue'
import DssPageContainer from '@components/base/DssPageContainer/DssPageContainer.vue'
import DssPageShell from '@components/composed/DssPageShell/DssPageShell.vue'
import DssPageShellRailItem from '@components/composed/DssPageShell/DssPageShellRailItem.vue'
import DssSectionTitle from '@components/base/DssSectionTitle/DssSectionTitle.vue'
import type { DssDataGridField } from '@components/composed/DssDataGrid/types/data-grid.types'

const modulos = [
  { icone: 'public', label: 'Mapa', ativo: false },
  { icone: 'description', label: 'Solicitações', ativo: true },
  { icone: 'shopping_cart', label: 'Comercial', ativo: false },
  { icone: 'paid', label: 'Financeiro', ativo: false },
  { icone: 'bar_chart', label: 'Relatórios', ativo: false },
]

// Ficha ↔ grade: a mesma informação, duas leituras. O estado (seleção,
// filtro, página) é da PÁGINA, então atravessa a troca sem se perder.
const apresentacao = ref('ficha')
const opcoesDeApresentacao = [
  { label: 'Ficha', value: 'ficha', icon: 'grid_view' },
  { label: 'Grade', value: 'grade', icon: 'table_rows' },
]

// A grade mostra os mesmos campos da ficha, inclusive os que lá ficam atrás
// do "Mais": numa tabela não existe o problema de altura que justifica
// esconder campo — as colunas são comparáveis lado a lado.
const colunasDaGrade = [
  { name: 'protocolo', label: 'Protocolo', field: 'protocolo', align: 'left' as const, sortable: true },
  { name: 'equipe', label: 'Equipe', field: 'equipe', align: 'left' as const, sortable: true },
  { name: 'servico', label: 'Cód. Serviço', field: 'servico', align: 'left' as const, sortable: true },
  { name: 'situacao', label: 'Situação', field: 'situacao', align: 'left' as const },
  { name: 'setor', label: 'Setor', field: 'setor', align: 'left' as const },
  { name: 'municipio', label: 'Município', field: 'municipio', align: 'left' as const },
  { name: 'abertura', label: 'Abertura', field: 'abertura', align: 'left' as const },
]

const mapaDeSituacao = {
  Atrasada: { tone: 'error' as const, icon: 'notification_important' },
  'No prazo': { tone: 'success' as const, icon: 'schedule' },
}

const campos = [
  { name: 'setor', label: 'Setor Execução' },
  { name: 'equipe', label: 'Equipe' },
  { name: 'servico', label: 'Código Serviço' },
]

const filtros = ref<Record<string, unknown>>({ setor: '', equipe: '', servico: '' })
const boardRetraido = ref(false)
const aplicados = ref<Record<string, unknown>>({})
const selecionados = ref<Record<string, unknown>[]>([])
const pagina = ref(1)
const eco = ref('')
const aberto = ref<Registro | null>(null)

// Ação de linha (ficha e grade) — a mesma em ambas as apresentações.
const acoesDeLinha = [{ name: 'abrir', label: 'Abrir', icon: 'visibility' }]

const atribuirAberto = ref(false)
const equipeEscolhida = ref<string | null>(null)

function confirmarAtribuicao() {
  eco.value = `${selecionados.value.length} registro(s) atribuídos a ${equipeEscolhida.value}`
  atribuirAberto.value = false
  equipeEscolhida.value = null
}

function abrir(linha: Record<string, unknown>) {
  aberto.value = linha as unknown as Registro
}

interface Registro {
  id: number
  protocolo: string
  equipe: string
  servico: string
  setor: string
  municipio: string
  situacao: string
  abertura: string
}

const EQUIPES = ['CL250', 'CL310', 'CL480']
const SETORES = ['Norte', 'Sul', 'Centro']
const SERVICOS = ['3565', '4120', '8807']

const registros = ref<Registro[]>(
  Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    protocolo: String(65665200 + i),
    equipe: EQUIPES[i % 3],
    servico: SERVICOS[i % 3],
    setor: SETORES[i % 3],
    municipio: ['São José', 'Florianópolis', 'Palhoça'][i % 3],
    situacao: i % 4 === 0 ? 'Atrasada' : 'No prazo',
    abertura: `${String((i % 28) + 1).padStart(2, '0')}/09/2026`,
  })),
)

// Município e abertura são contexto: entram atrás do "Mais".
const camposDaFicha: DssDataGridField[] = [
  { name: 'protocolo', label: 'Protocolo' },
  { name: 'equipe', label: 'Equipe' },
  { name: 'servico', label: 'Cód. Serviço' },
  { name: 'situacao', label: 'Situação' },
  { name: 'setor', label: 'Setor', visibility: 'hidden' },
  { name: 'municipio', label: 'Município', visibility: 'hidden' },
  { name: 'abertura', label: 'Abertura', visibility: 'hidden' },
]

function pesquisar() {
  aplicados.value = { ...filtros.value }
  pagina.value = 1
}

function limparFiltro() {
  filtros.value = { setor: '', equipe: '', servico: '' }
  aplicados.value = {}
  pagina.value = 1
}

const rotuloDoFiltro = computed(() => {
  const ativos = campos
    .filter((campo) => String(aplicados.value[campo.name] ?? '').trim())
    .map((campo) => `${campo.label}: ${aplicados.value[campo.name]}`)
  return ativos.length ? ativos.join(' · ') : null
})

const linhasFiltradas = computed(() =>
  registros.value.filter((linha) =>
    campos.every((campo) => {
      const alvo = String(aplicados.value[campo.name] ?? '').trim().toLowerCase()
      if (!alvo) return true
      return String(linha[campo.name as keyof Registro] ?? '').toLowerCase().includes(alvo)
    }),
  ),
)
</script>

<style lang="scss" scoped>
// O que sobra de CSS quando os compostos absorvem a estrutura: só o
// cabeçalho desta tela. A grade, a ficha e a paginação vivem no componente.
.dg-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-sm);
}

.dg-layout {
  flex: 1;
  min-height: 0;
}

.dg-bloco {
  display: flex;
  flex-direction: column;
  padding: var(--dss-spacing-3);
  background: var(--dss-surface-default);
}

.dg-escopo {
  margin: 0 0 var(--dss-spacing-3);
  font-size: var(--dss-font-size-sm);
}

.dg-detalhe {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  margin: 0;

  dt,
  dd {
    padding: var(--dss-spacing-1) var(--dss-spacing-2);
  }

  dt {
    font-weight: var(--dss-font-weight-semibold);
  }

  dd {
    margin: 0;
    text-align: end;
  }

  dt:not(:first-of-type),
  dt:not(:first-of-type) + dd {
    border-block-start: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  }
}

.dg-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--dss-spacing-3);
}
</style>
