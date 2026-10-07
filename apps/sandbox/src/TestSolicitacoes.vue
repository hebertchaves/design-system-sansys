<template>
  <div class="sol-page" data-brand="water">
    <DssLayout view="hHh lpR fFf" container class="sol-layout">

      <DssAppBar
        brand="water"
        title="Solicitações"
        menu-aria-label="Abrir menu principal"
      >
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

            <DssSectionTitle :level="1" size="lg" label="Solicitações" />

            <!-- ==========================================================
                 O VÍNCULO REAL

                 `controls` aponta para a tabela (aria-controls) e `@search`
                 dispara a filtragem. O board NÃO recebe as linhas: quem filtra
                 é esta página. Dar `rows` ao componente o tornaria um
                 componente de DADOS e o amarraria ao DssTable para sempre.
                 ========================================================== -->
            <DssDataBoard
              v-model="filtros"
              v-model:collapsed="boardRetraido"
              :fields="campos"
              controls="tabela-solicitacoes"
              brand="water"
              @search="pesquisar"
              @remove-filter="pesquisar"
            >
              <template #actions>
                <DssButton
                  variant="unelevated" color="primary" size="md" dense
                  icon="save" aria-label="Salvar filtro"
                >
                  <DssTooltip label="Salvar este conjunto de filtros" />
                </DssButton>
                <DssButton
                  variant="unelevated" color="primary" size="md" dense
                  label="Opções filtro" icon-right="expand_more"
                />
              </template>
            </DssDataBoard>

            <DssCard variant="outlined" class="sol-card">
              <div class="sol-card__head">
                <DssSectionTitle label="Registros" />
                <span class="sol-contagem" aria-live="polite">
                  {{ linhasFiltradas.length }} de {{ registros.length }} registros
                </span>
              </div>

              <DssTable
                id="tabela-solicitacoes"
                :rows="linhasFiltradas"
                :columns="colunas"
                row-key="protocolo"
                density="compact"
                flat
                v-model:pagination="paginacao"
                :rows-per-page-options="[10, 25, 50]"
                aria-label="Solicitações"
              >
                <template #body-cell-equipe="{ value }">
                  <td class="text-left">
                    <DssChip
                      variant="outline" color="positive" size="sm" dense
                      icon="check_circle" :label="String(value)"
                    />
                  </td>
                </template>

                <template #body-cell-situacao="{ value }">
                  <td class="text-left">
                    <span class="sol-situacao">
                      <DssIcon
                        :name="value === 'Atrasada' ? 'notification_important' : 'schedule'"
                        size="xs"
                        :color="value === 'Atrasada' ? 'negative' : 'positive'"
                        decorative
                      />
                      {{ value }}
                    </span>
                  </td>
                </template>

                <template #no-data>
                  <div class="sol-vazio">
                    <DssEmptyState
                      icon="search_off"
                      title="Nenhum registro para este filtro"
                      description="Revise os critérios ou limpe os filtros aplicados."
                    />
                  </div>
                </template>
              </DssTable>
            </DssCard>

          </DssPageShell>
        </DssPage>
      </DssPageContainer>
    </DssLayout>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 *  TestSolicitacoes — pattern do DssDataBoard com vínculo REAL à tabela
 * ==========================================================================
 *
 *  POR QUE ESTA PÁGINA EXISTE, separada do grid master:
 *
 *  O `DssDataBoard` não existe sem a tabela — ele é um filtro avançado das
 *  informações contidas nela. O grid master é demonstrativo e não tem essa
 *  correlação; aqui o filtro de fato filtra, que é a única forma de provar que
 *  o componente serve ao caso de uso real.
 *
 *  O QUE O VÍNCULO É, E O QUE NÃO É:
 *
 *  O board declara `controls="tabela-solicitacoes"` (vira `aria-controls`) e
 *  emite `search`. Quem filtra as linhas é ESTA PÁGINA. O componente não
 *  recebe `rows` nem devolve `filtered-rows` — isso o tornaria um componente
 *  de DADOS e o amarraria ao `DssTable`, quando ele serve igualmente a uma
 *  lista ou a um conjunto de cartões.
 *
 *  ESCOPO DESTA PRIMEIRA VERSÃO:
 *
 *  Apenas o painel de FILTRO, que é o que está sempre presente. KPIs, gráficos
 *  e o menu "opções de filtro" (Mais Filtros / Filtros Salvos) entram
 *  incrementalmente — o slot `panels` e o `DssDataBoardPanel` já existem para
 *  recebê-los.
 */

import { computed, ref } from 'vue'

import DssAppBar from '@components/composed/DssAppBar/DssAppBar.vue'
import DssBreadcrumbs from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssCard from '@components/base/DssCard/DssCard.vue'
import DssChip from '@components/base/DssChip/DssChip.vue'
import DssDataBoard from '@components/composed/DssDataBoard/DssDataBoard.vue'
import DssEmptyState from '@components/base/DssEmptyState/DssEmptyState.vue'
import DssIcon from '@components/base/DssIcon/DssIcon.vue'
import DssLayout from '@components/base/DssLayout/DssLayout.vue'
import DssPage from '@components/base/DssPage/DssPage.vue'
import DssPageContainer from '@components/base/DssPageContainer/DssPageContainer.vue'
import DssPageShell from '@components/composed/DssPageShell/DssPageShell.vue'
import DssPageShellRailItem from '@components/composed/DssPageShell/DssPageShellRailItem.vue'
import DssSectionTitle from '@components/base/DssSectionTitle/DssSectionTitle.vue'
import DssTable from '@components/composed/DssTable/DssTable.vue'
import DssTooltip from '@components/base/DssTooltip/DssTooltip.vue'

const modulos = [
  { icone: 'public', label: 'Mapa', ativo: false },
  { icone: 'description', label: 'Solicitações', ativo: true },
  { icone: 'shopping_cart', label: 'Comercial', ativo: false },
  { icone: 'paid', label: 'Financeiro', ativo: false },
  { icone: 'bar_chart', label: 'Relatórios', ativo: false },
]

// ── O que o analista escolheu mostrar ────────────────────────────────────
// Os demais filtros viveriam atrás de "opções de filtro".
const campos = [
  { name: 'setor', label: 'Setor Execução' },
  { name: 'equipe', label: 'Equipe' },
  { name: 'servico', label: 'Código Serviço' },
]

const filtros = ref<Record<string, unknown>>({ setor: '', equipe: '', servico: '' })
const boardRetraido = ref(false)

// ── Dados ────────────────────────────────────────────────────────────────
interface Registro {
  protocolo: string
  equipe: string
  servico: string
  setor: string
  municipio: string
  situacao: string
}

const EQUIPES = ['CL250', 'CL310', 'CL480']
const SETORES = ['Norte', 'Sul', 'Centro']
const SERVICOS = ['3565', '4120', '8807']

const registros = ref<Registro[]>(
  Array.from({ length: 12 }, (_, i) => ({
    protocolo: String(65665200 + i),
    equipe: EQUIPES[i % 3],
    servico: SERVICOS[i % 3],
    setor: SETORES[i % 3],
    municipio: ['São José', 'Florianópolis', 'Palhoça'][i % 3],
    situacao: i % 4 === 0 ? 'Atrasada' : 'No prazo',
  })),
)

const colunas = [
  // Tudo à ESQUERDA. Alinhar número à direita serve para comparar MAGNITUDE
  // (valor, quantidade, total) — a vírgula fica no mesmo lugar e o olho
  // compara as ordens de grandeza. Protocolo e código de serviço são
  // IDENTIFICADORES: ninguém soma nem compara dois protocolos. Alinhá-los à
  // direita só quebrava a margem de leitura da tabela.
  { name: 'protocolo', label: 'Protocolo', field: 'protocolo', align: 'left' as const, sortable: true },
  { name: 'equipe', label: 'Equipe', field: 'equipe', align: 'left' as const, sortable: true },
  { name: 'servico', label: 'Cód. Serviço', field: 'servico', align: 'left' as const, sortable: true },
  { name: 'setor', label: 'Setor', field: 'setor', align: 'left' as const, sortable: true },
  { name: 'municipio', label: 'Município', field: 'municipio', align: 'left' as const },
  { name: 'situacao', label: 'Situação', field: 'situacao', align: 'left' as const },
]

// ── O FILTRO DE VERDADE ──────────────────────────────────────────────────
/**
 * Aplicado é o que está em `aplicados`, não o que está sendo digitado: a busca
 * acontece no `@search`, não a cada tecla. Digitar e não pesquisar não pode
 * mudar a tabela — senão o botão "Pesquisar" não significaria nada.
 */
/**
 * Paginação LIGADA, e isso resolve um problema de layout além de UX.
 *
 * Antes estava `{ rowsPerPage: 0 }` — mostrar TODAS as linhas — com
 * `hide-bottom`. A tabela crescia até o container limitá-la, e aí o
 * `.q-table__middle` ganhava rolagem própria. Pior: ela rolava 3px que não
 * existiam, porque `border-collapse: collapse` deixa cada linha com meio pixel
 * e o `scrollHeight` arredonda cada uma PARA CIMA enquanto o `clientHeight`
 * não. Barra de rolagem para 3px fantasmas.
 *
 * Com paginação a altura é previsível e a tabela nunca precisa rolar sozinha.
 * Rolagem interna fica para quem de fato precisa dela — scroll infinito,
 * virtual scroll —, não como efeito colateral de "mostrar tudo".
 */
const paginacao = ref({ sortBy: null as string | null, descending: false, page: 1, rowsPerPage: 10 })

const aplicados = ref<Record<string, unknown>>({})

function pesquisar() {
  aplicados.value = { ...filtros.value }
}

const linhasFiltradas = computed(() =>
  registros.value.filter((linha) =>
    campos.every((campo) => {
      const alvo = String(aplicados.value[campo.name] ?? '').trim().toLowerCase()
      if (!alvo) return true
      return String(linha[campo.name as keyof Registro] ?? '')
        .toLowerCase()
        .includes(alvo)
    }),
  ),
)
</script>

<style lang="scss" scoped>
// ==========================================================================
//  TestSolicitacoes — o CSS que sobra quando os compostos absorvem a estrutura
//
//  Barra, rail, trilha, board, títulos e tabela são componentes. O que resta
//  aqui é conteúdo desta tela.
// ==========================================================================

.sol-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-sm);
}

.sol-layout {
  flex: 1;
  min-height: 0;
}

.sol-card {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-2);
  background: var(--dss-surface-default);

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--dss-spacing-3);
    flex-wrap: wrap;
  }
}

.sol-contagem {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  font-variant-numeric: tabular-nums;
}

.sol-situacao {
  display: inline-flex;
  align-items: center;
  gap: var(--dss-spacing-1);
}

.sol-vazio {
  padding: var(--dss-spacing-6);
}
</style>
