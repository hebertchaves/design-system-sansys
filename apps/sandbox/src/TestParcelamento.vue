<template>
  <div class="parcelamento-page" data-brand="water">

    <!-- =============================================================
         1. APP BAR — botões round REAIS (variant flat, size md, sem dense)
         ============================================================= -->
    <header class="app-bar">
      <div class="app-bar__brand">
        <DssButton
          variant="flat"
          round
          size="md"
          icon="menu"
          color="white"
          aria-label="Menu"
          class="app-bar__btn"
        />
        <div class="app-bar__logo">
          <DssIcon name="water_drop" size="sm" />
          <span class="app-bar__logo-text">
            <strong>sansys</strong><em>water</em>
          </span>
        </div>
        <div class="app-bar__divider" />
        <h1 class="app-bar__title">Atendimento</h1>
      </div>

      <div class="app-bar__actions">
        <DssButton
          variant="flat" round size="md" icon="help_outline"
          color="white" aria-label="Ajuda" class="app-bar__btn"
        >
          <DssTooltip>Ajuda</DssTooltip>
        </DssButton>
        <DssButton
          variant="flat" round size="md" icon="notifications"
          color="white" aria-label="Notificações" class="app-bar__btn"
        >
          <DssBadge color="negative" floating>4</DssBadge>
          <DssTooltip>3 novas notificações</DssTooltip>
        </DssButton>
        <DssButton
          variant="flat" round size="md" icon="apps"
          color="white" aria-label="Apps" class="app-bar__btn"
        >
          <DssTooltip>Aplicativos Sansys</DssTooltip>
        </DssButton>
        <DssAvatar size="md" icon="person" color="secondary" />
      </div>
    </header>

    <!-- =============================================================
         2. BREADCRUMB
         ============================================================= -->
    <nav class="page-breadcrumb" aria-label="Trilha de navegação">
      <DssBreadcrumbs separator="›" active-color="primary">
        <DssBreadcrumbsEl label="Atendimento" icon="filter_1" />
        <DssBreadcrumbsEl label="Matrícula" icon="filter_2" />
        <DssBreadcrumbsEl label="Financeiro" icon="filter_3" />
        <DssBreadcrumbsEl label="Parcelamento" icon="filter_4" />
      </DssBreadcrumbs>
    </nav>

    <!-- =============================================================
         3. CLIENT HEADER CARD
         ============================================================= -->
    <DssCard class="client-header">
      <div class="client-header__grid">

        <!-- Coluna 1 — Identificador -->
        <div class="client-header__id">
          <DssAvatar size="lg" icon="apartment" color="primary" />
          <div class="client-header__id-info">
            <span class="client-header__code">652701-9</span>
            <DssButton
              variant="outlined"
              size="sm"
              color="primary"
              icon="info"
              label="DETALHES"
            />
          </div>
        </div>

        <!-- Coluna 2 — Dados de cadastro -->
        <dl class="client-header__group">
          <div class="kv">
            <dt>Proprietário:</dt>
            <dd>
              (CPF: 000.000.000-00) - Nome e Sobrenome Proprietário
              <DssIcon name="badge" size="xs" color="primary" />
            </dd>
          </div>
          <div class="kv">
            <dt>Morador:</dt>
            <dd>
              (CPF: 000.000.000-00) - Nome e Sobrenome Proprietário
              <DssIcon name="badge" size="xs" color="primary" />
            </dd>
          </div>
          <div class="kv">
            <dt>Endereço:</dt>
            <dd>Rua logradouro do Usuário, 123 - 00000-000 - Bairro, Cidade - UF</dd>
          </div>
        </dl>

        <!-- Coluna 3 — Dados técnicos -->
        <dl class="client-header__group">
          <div class="kv">
            <dt>Rota Leitura:</dt>
            <dd>0000.000.00</dd>
          </div>
          <div class="kv">
            <dt>Localização:</dt>
            <dd>00.00.0000.0000.0000.0000</dd>
          </div>
          <div class="kv">
            <dt>Tipo de Cobrança:</dt>
            <dd>Pagamento Caixa / Norma</dd>
          </div>
        </dl>

        <!-- Coluna 4 — Status com DssChip (variedade visual) -->
        <dl class="client-header__group">
          <div class="kv kv--inline">
            <dt>Ligação água:</dt>
            <dd>
              <DssChip dense size="sm" color="positive" text-color="white" icon="check_circle">
                Ativa
              </DssChip>
            </dd>
          </div>
          <div class="kv kv--inline">
            <dt>Ligação esgoto:</dt>
            <dd>
              <DssChip dense size="sm" color="negative" text-color="white" icon="cancel">
                Inativa
              </DssChip>
            </dd>
          </div>
          <div class="kv kv--inline">
            <dt>Situação Lixo:</dt>
            <dd>
              <DssChip dense size="sm" outline color="primary" icon="recycling">
                Ativa (Fatura)
              </DssChip>
            </dd>
          </div>
        </dl>

        <!-- Coluna 5 — Action rail (round REAIS, variant elevated) -->
        <div class="client-header__rail">
          <DssButton
            variant="elevated"
            color="primary"
            icon="shopping_cart"
            round
            size="md"
            class="rail-btn"
          >
            <DssBadge color="negative" floating>2</DssBadge>
            <DssTooltip>Carrinho de serviços (2)</DssTooltip>
          </DssButton>
          <DssButton
            variant="outlined"
            color="primary"
            icon="add"
            round
            size="md"
          >
            <DssTooltip>Adicionar atendimento</DssTooltip>
          </DssButton>
          <DssButton
            variant="flat"
            color="primary"
            icon="unfold_less"
            round
            size="md"
          >
            <DssTooltip>Recolher cabeçalho</DssTooltip>
          </DssButton>
        </div>
      </div>
    </DssCard>

    <!-- =============================================================
         4. TAB NAVIGATION — proporção dos playgrounds
         ============================================================= -->
    <DssCard class="module-tabs" flat>
      <DssTabs
        v-model="activeModule"
        align="justify"
        active-color="primary"
        indicator-color="primary"
        class="module-tabs__bar"
      >
        <DssTab
          v-for="tab in moduleTabs"
          :key="tab.value"
          :name="tab.value"
          :icon="tab.icon"
          :label="tab.label"
        />
      </DssTabs>
    </DssCard>

    <!-- =============================================================
         5. SUBHEADER + ACTION TOOLBAR — variantes diversas
         ============================================================= -->
    <section class="page-section">
      <header class="page-section__header">
        <div class="page-section__title-group">
          <h2 class="page-section__title">Parcelamento</h2>
          <DssBadge color="primary" outline>{{ rows.length }} negociações</DssBadge>
        </div>
      </header>

      <div class="action-toolbar">
        <!-- Ação primária: elevated, com label -->
        <DssButton
          variant="elevated"
          color="primary"
          icon="add_box"
          label="Parcelar"
          @click="handleToolbarAction('parcelar')"
        >
          <DssTooltip>Criar novo parcelamento</DssTooltip>
        </DssButton>

        <!-- Ações secundárias: outlined -->
        <DssButton
          variant="outlined" color="primary" icon="calculate" label="Simular"
          @click="handleToolbarAction('simular')"
        />
        <DssButton
          variant="outlined" color="primary" icon="autorenew" label="Reparcelar"
          @click="handleToolbarAction('reparcelar')"
        />
        <DssButton
          variant="outlined" color="primary" icon="fast_forward" label="Antecipar"
          @click="handleToolbarAction('antecipar')"
        />

        <div class="action-toolbar__spacer" />

        <!-- Ações terciárias: flat round REAIS -->
        <DssButton
          variant="flat" round size="md" icon="print" color="primary"
          @click="handleToolbarAction('imprimir')"
        >
          <DssTooltip>Imprimir extrato</DssTooltip>
        </DssButton>
        <DssButton
          variant="flat" round size="md" icon="campaign" color="primary"
          @click="handleToolbarAction('campanhas')"
        >
          <DssTooltip>Campanhas vigentes</DssTooltip>
        </DssButton>
        <DssButton
          variant="flat" round size="md" icon="block" color="negative"
          @click="handleToolbarAction('cancelar')"
        >
          <DssTooltip>Cancelar negociação</DssTooltip>
        </DssButton>
      </div>

      <!-- =============================================================
           6. DATA TABLE
           ============================================================= -->
      <DssCard class="parcel-table" flat>
        <DssMarkupTable separator="horizontal" flat>
          <thead>
            <tr>
              <th class="col-check">
                <DssCheckbox
                  v-model="allSelected"
                  :indeterminate="indeterminate"
                  color="primary"
                  @update:model-value="toggleAll"
                />
              </th>
              <th class="col-code">Código</th>
              <th class="col-num">Valor total</th>
              <th class="col-num">Parcela à Vista</th>
              <th class="col-num">Valor Parcela</th>
              <th>Situação</th>
              <th>Tipo Negociação</th>
              <th class="col-center">Controle Corte</th>
              <th class="col-actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in rows"
              :key="row.id"
              :class="{ 'row--selected': selected.includes(row.id) }"
            >
              <td class="col-check">
                <DssCheckbox
                  :model-value="selected.includes(row.id)"
                  color="primary"
                  @update:model-value="toggleRow(row.id)"
                />
              </td>
              <td class="col-code">{{ row.codigo }}</td>
              <td class="col-num">
                <div class="cell-strong">R$ {{ row.valorTotal }}</div>
                <div class="cell-sub">Emissão: <strong>{{ row.emissao }}</strong></div>
              </td>
              <td class="col-num">R$ {{ row.parcelaVista }}</td>
              <td class="col-num">
                <div class="cell-strong">R$ {{ row.valorParcela }}</div>
                <div class="cell-sub">Nº de parcela: <strong>{{ row.numParcelas }}</strong></div>
              </td>
              <td>
                <DssChip
                  dense
                  size="sm"
                  :color="chipColor(row.situacao)"
                  :text-color="chipTextColor(row.situacao)"
                  :icon="chipIcon(row.situacao)"
                  :outline="row.situacao === 'Cancelado'"
                >
                  {{ row.situacao }}
                </DssChip>
              </td>
              <td>
                <DssChip dense size="sm" outline color="primary">
                  {{ row.tipo.replace('Parcelamento ', '') }}
                </DssChip>
              </td>
              <td class="col-center">
                <DssButton
                  variant="flat"
                  round
                  size="sm"
                  :icon="row.controleCorte ? 'gpp_bad' : 'gpp_good'"
                  :color="row.controleCorte ? 'negative' : 'positive'"
                >
                  <DssTooltip>
                    {{ row.controleCorte ? 'Sob controle de corte' : 'Sem controle de corte' }}
                  </DssTooltip>
                </DssButton>
              </td>
              <td class="col-actions">
                <DssButton
                  variant="flat"
                  round
                  size="sm"
                  icon="visibility"
                  color="primary"
                  @click="openDetail(row)"
                >
                  <DssTooltip>Visualizar parcelamento</DssTooltip>
                </DssButton>

                <DssBtnDropdown
                  variant="flat"
                  size="sm"
                  color="primary"
                  dropdown-icon="more_vert"
                  no-icon-animation
                >
                  <DssList>
                    <DssItem clickable v-close-popup @click="rowAction('edit', row)">
                      <DssItemSection avatar><DssIcon name="edit" size="xs" /></DssItemSection>
                      <DssItemSection>Editar negociação</DssItemSection>
                    </DssItem>
                    <DssItem clickable v-close-popup @click="rowAction('print', row)">
                      <DssItemSection avatar><DssIcon name="print" size="xs" /></DssItemSection>
                      <DssItemSection>Imprimir boleto</DssItemSection>
                    </DssItem>
                    <DssItem clickable v-close-popup @click="rowAction('history', row)">
                      <DssItemSection avatar><DssIcon name="history" size="xs" /></DssItemSection>
                      <DssItemSection>Histórico</DssItemSection>
                    </DssItem>
                    <DssSeparator />
                    <DssItem clickable v-close-popup @click="rowAction('cancel', row)">
                      <DssItemSection avatar>
                        <DssIcon name="cancel" size="xs" color="negative" />
                      </DssItemSection>
                      <DssItemSection class="text-danger">Cancelar</DssItemSection>
                    </DssItem>
                  </DssList>
                </DssBtnDropdown>
              </td>
            </tr>
          </tbody>
        </DssMarkupTable>
      </DssCard>

      <!-- Selection bar -->
      <transition name="fade">
        <div v-if="selected.length" class="selection-bar">
          <DssChip dense color="primary" text-color="white" icon="check_circle">
            {{ selected.length }} {{ selected.length === 1 ? 'item selecionado' : 'itens selecionados' }}
          </DssChip>
          <DssSpace />
          <DssButton variant="flat" color="primary" label="Limpar" @click="selected = []" />
          <DssButton variant="outlined" color="primary" icon="download" label="Exportar" />
          <DssButton variant="elevated" color="primary" icon="receipt_long" label="Imprimir selecionados" />
        </div>
      </transition>
    </section>

    <!-- =============================================================
         7. MODAL DE VISUALIZAÇÃO
         ============================================================= -->
    <DssDialog v-model:open="detailOpen" maximized-width="640px">
      <DssCard class="detail-modal">
        <header class="detail-modal__header">
          <div>
            <span class="detail-modal__eyebrow">Negociação</span>
            <h3 class="detail-modal__title">Parcelamento {{ detailRow?.codigo }}</h3>
          </div>
          <DssButton variant="flat" round size="sm" icon="close" @click="detailOpen = false" />
        </header>

        <DssSeparator />

        <div class="detail-modal__body">
          <div class="detail-modal__row">
            <span class="detail-modal__label">Situação</span>
            <DssChip
              dense size="sm"
              :color="chipColor(detailRow?.situacao)"
              :text-color="chipTextColor(detailRow?.situacao)"
              :icon="chipIcon(detailRow?.situacao)"
            >
              {{ detailRow?.situacao }}
            </DssChip>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__label">Valor total</span>
            <strong>R$ {{ detailRow?.valorTotal }}</strong>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__label">Parcela</span>
            <span>R$ {{ detailRow?.valorParcela }} × {{ detailRow?.numParcelas }}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__label">Emissão</span>
            <span>{{ detailRow?.emissao }}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__label">Tipo</span>
            <span>{{ detailRow?.tipo }}</span>
          </div>
        </div>

        <DssSeparator />

        <DssCardActions align="right">
          <DssButton variant="flat" label="Fechar" @click="detailOpen = false" />
          <DssButton variant="outlined" color="primary" icon="download" label="Boleto" />
          <DssButton variant="elevated" color="primary" icon="print" label="Imprimir" />
        </DssCardActions>
      </DssCard>
    </DssDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ClosePopup as vClosePopup } from 'quasar'

// === DSS imports ===
import DssIcon from '@components/base/DssIcon/DssIcon.vue'
import DssAvatar from '@components/base/DssAvatar/DssAvatar.vue'
import DssBadge from '@components/base/DssBadge/DssBadge.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssBtnDropdown from '@components/base/DssBtnDropdown/DssBtnDropdown.vue'
import DssBreadcrumbs from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssCard from '@components/base/DssCard/DssCard.vue'
import { DssCardActions } from '@components/base/DssCard/index'
import DssCheckbox from '@components/base/DssCheckbox/DssCheckbox.vue'
import DssChip from '@components/base/DssChip/DssChip.vue'
import DssList from '@components/base/DssList/DssList.vue'
import DssItem from '@components/base/DssItem/DssItem.vue'
import DssItemSection from '@components/base/DssItemSection/DssItemSection.vue'
import DssMarkupTable from '@components/base/DssMarkupTable/DssMarkupTable.vue'
import DssSeparator from '@components/base/DssSeparator/DssSeparator.vue'
import DssSpace from '@components/base/DssSpace/DssSpace.vue'
import DssTabs from '@components/base/DssTabs/DssTabs.vue'
import DssTab from '@components/base/DssTab/DssTab.vue'
import DssTooltip from '@components/base/DssTooltip/DssTooltip.vue'
import DssDialog from '@components/composed/DssDialog/DssDialog.vue'

// ----- Tabs -----
const moduleTabs = [
  { value: 'financeiro', label: 'Financeiro',              icon: 'attach_money' },
  { value: 'cadastro',   label: 'Inf. de Cadastro',        icon: 'badge'        },
  { value: 'os',         label: 'Ordem de Serviço',        icon: 'build'        },
  { value: 'leituras',   label: 'Leituras e Consumo',      icon: 'speed'        },
  { value: 'cobrancas',  label: 'Cobranças',               icon: 'request_quote'},
  { value: 'atend',      label: 'Atendimentos',            icon: 'support_agent'},
]
const activeModule = ref('financeiro')

function handleToolbarAction(id: string) {
  console.log('[Parcelamento] toolbar:', id)
}

// ----- Dados (mock variado) -----
type Situacao = 'Pendente' | 'Pago' | 'Cancelado' | 'Em atraso'
interface Row {
  id: number
  codigo: string
  valorTotal: string
  emissao: string
  parcelaVista: string
  valorParcela: string
  numParcelas: number
  situacao: Situacao
  tipo: string
  controleCorte: boolean
}

const rows = ref<Row[]>([
  { id: 1, codigo: '28235', valorTotal: '16.051,02', emissao: '05/11/2024', parcelaVista: '0,00',    valorParcela: '267,25', numParcelas: 60, situacao: 'Pendente',  tipo: 'Parcelamento (Normal)',     controleCorte: false },
  { id: 2, codigo: '28236', valorTotal: '8.420,80',  emissao: '12/10/2024', parcelaVista: '1.200,00',valorParcela: '180,40', numParcelas: 40, situacao: 'Pago',      tipo: 'Parcelamento (Promocional)',controleCorte: false },
  { id: 3, codigo: '28237', valorTotal: '24.110,90', emissao: '01/09/2024', parcelaVista: '0,00',    valorParcela: '402,00', numParcelas: 60, situacao: 'Em atraso', tipo: 'Parcelamento (Judicial)',   controleCorte: true  },
  { id: 4, codigo: '28238', valorTotal: '3.200,00',  emissao: '20/08/2024', parcelaVista: '500,00',  valorParcela: '225,00', numParcelas: 12, situacao: 'Pendente',  tipo: 'Parcelamento (Normal)',     controleCorte: false },
  { id: 5, codigo: '28239', valorTotal: '12.760,55', emissao: '15/07/2024', parcelaVista: '0,00',    valorParcela: '212,67', numParcelas: 60, situacao: 'Cancelado', tipo: 'Parcelamento (Normal)',     controleCorte: false },
  { id: 6, codigo: '28240', valorTotal: '5.980,00',  emissao: '03/06/2024', parcelaVista: '0,00',    valorParcela: '149,50', numParcelas: 40, situacao: 'Pendente',  tipo: 'Parcelamento (Promocional)',controleCorte: true  },
  { id: 7, codigo: '28241', valorTotal: '18.300,00', emissao: '22/04/2024', parcelaVista: '2.000,00',valorParcela: '271,67', numParcelas: 60, situacao: 'Em atraso', tipo: 'Parcelamento (Judicial)',   controleCorte: true  },
  { id: 8, codigo: '28242', valorTotal: '7.420,30',  emissao: '10/03/2024', parcelaVista: '0,00',    valorParcela: '185,50', numParcelas: 40, situacao: 'Pago',      tipo: 'Parcelamento (Normal)',     controleCorte: false },
])

// Mapeamento Situação → tokens semânticos DSS
function chipColor(s?: Situacao) {
  switch (s) {
    case 'Pago':      return 'positive'
    case 'Pendente':  return 'warning'
    case 'Em atraso': return 'negative'
    case 'Cancelado': return 'grey'
    default:          return 'grey'
  }
}
function chipTextColor(s?: Situacao) {
  return s === 'Cancelado' ? 'grey-7' : 'white'
}
function chipIcon(s?: Situacao) {
  switch (s) {
    case 'Pago':      return 'check_circle'
    case 'Pendente':  return 'schedule'
    case 'Em atraso': return 'error'
    case 'Cancelado': return 'block'
    default:          return ''
  }
}

// ----- Seleção -----
const selected = ref<number[]>([])

const allSelected = computed({
  get: () => selected.value.length === rows.value.length,
  set: (v: boolean) => { selected.value = v ? rows.value.map(r => r.id) : [] },
})
const indeterminate = computed(() =>
  selected.value.length > 0 && selected.value.length < rows.value.length
)
function toggleAll(v: boolean) {
  selected.value = v ? rows.value.map(r => r.id) : []
}
function toggleRow(id: number) {
  const i = selected.value.indexOf(id)
  if (i === -1) selected.value.push(id)
  else selected.value.splice(i, 1)
}

// ----- Detalhe modal -----
const detailOpen = ref(false)
const detailRow = ref<Row | null>(null)
function openDetail(row: Row) {
  detailRow.value = row
  detailOpen.value = true
}

function rowAction(action: string, row: Row) {
  console.log('[Parcelamento] row action:', action, row.codigo)
}
</script>

<style lang="scss" scoped>
/* ============================================================
   Página inteira: tokens DSS exclusivamente.
   Componentes mostram variedade visual (elevated/outlined/flat,
   round REAL, chips coloridos, hover refinado).
   ============================================================ */

.parcelamento-page {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
  padding: 0 0 var(--dss-spacing-12);
  background: var(--dss-surface-muted);
  min-height: 100%;
  color: var(--dss-text-body);
  font-size: 0.875rem;
}

/* ---------- App bar (altura proporcional dos playgrounds) ---------- */
.app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--dss-spacing-2) var(--dss-spacing-5);
  min-height: 56px;
  background: var(--dss-action-primary);
  color: var(--dss-text-inverse);
  box-shadow: var(--dss-shadow-md);

  &__brand     { display: flex; align-items: center; gap: var(--dss-spacing-3); }
  &__logo      { display: flex; align-items: center; gap: var(--dss-spacing-1_5); }
  &__logo-text { font-size: 1.0625rem; letter-spacing: 0.5px;
    strong { font-weight: 700; } em { font-style: normal; font-weight: 300; opacity: 0.92; }
  }
  &__divider   { width: 1px; height: 28px; background: rgba(255,255,255,0.35); }
  &__title     { font-size: 1.0625rem; font-weight: 500; margin: 0; }
  &__actions   { display: flex; align-items: center; gap: var(--dss-spacing-2); }

  /* Force white text/icon for flat buttons on colored bar */
  &__btn :deep(.dss-button__icon),
  &__btn :deep(.q-btn__content) { color: var(--dss-text-inverse); }
  &__btn:hover  { background: rgba(255,255,255,0.12); border-radius: 50%; }
}

/* ---------- Breadcrumb ---------- */
.page-breadcrumb {
  padding: var(--dss-spacing-3) var(--dss-spacing-5) 0;
}

/* ---------- Client header card ---------- */
.client-header {
  margin: 0 var(--dss-spacing-5);
  padding: var(--dss-spacing-5) var(--dss-spacing-5);
  box-shadow: var(--dss-shadow-sm);
  border-radius: var(--dss-radius-md, 8px);

  &__grid {
    display: grid;
    grid-template-columns: auto 1.6fr 1.4fr 1.2fr auto;
    gap: var(--dss-spacing-5);
    align-items: start;
  }

  &__id {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--dss-spacing-2);
    min-width: 140px;
  }
  &__id-info { display: flex; flex-direction: column; align-items: center; gap: var(--dss-spacing-2); }
  &__code {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dss-text-body);
    letter-spacing: 0.5px;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: var(--dss-spacing-2);
    margin: 0;
  }

  &__rail {
    display: flex;
    flex-direction: column;
    gap: var(--dss-spacing-2);
    padding-left: var(--dss-spacing-3);
    border-left: 1px solid var(--dss-gray-200);
  }
}

.rail-btn { position: relative; }

.kv {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-1_5);
  font-size: 0.8125rem;
  line-height: 1.4;

  dt { color: var(--dss-text-subtle); font-weight: 500; }
  dd { color: var(--dss-text-body); margin: 0;
       display: inline-flex; align-items: center; gap: var(--dss-spacing-1); }

  &--inline { align-items: center; }
  &--muted dt, &--muted dd { color: var(--dss-text-muted); }
}

/* ---------- Module tabs (proporção dos playgrounds) ---------- */
.module-tabs {
  margin: 0 var(--dss-spacing-5);
  box-shadow: var(--dss-shadow-sm);
  border-radius: var(--dss-radius-md, 8px);
  overflow: hidden;

  &__bar :deep(.q-tab) {
    min-height: 56px;
    font-weight: 500;
    font-size: 0.875rem;
    letter-spacing: 0.3px;
    text-transform: none;
    transition: background 150ms ease;
  }
  &__bar :deep(.q-tab:hover):not(.q-tab--active) {
    background: var(--dss-surface-hover);
  }
  &__bar :deep(.q-tab--active) {
    color: var(--dss-action-primary);
    font-weight: 600;
  }
}

/* ---------- Page section ---------- */
.page-section {
  margin: 0 var(--dss-spacing-5);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--dss-spacing-2) 0;
    border-bottom: 2px solid var(--dss-action-primary);
  }
  &__title-group { display: flex; align-items: center; gap: var(--dss-spacing-3); }
  &__title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--dss-text-body);
  }
}

/* ---------- Action toolbar (variantes diversas) ---------- */
.action-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-3);
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md, 8px);
  box-shadow: var(--dss-shadow-xs);

  &__spacer { flex: 1; }
}

/* ---------- Data table ---------- */
.parcel-table {
  padding: 0;
  background: var(--dss-surface-default);
  box-shadow: var(--dss-shadow-sm);
  border-radius: var(--dss-radius-md, 8px);
  overflow: hidden;

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
  }

  :deep(thead th) {
    background: var(--dss-surface-subtle);
    color: var(--dss-text-subtle);
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: var(--dss-spacing-3);
    border-bottom: 2px solid var(--dss-gray-200);
    text-align: left;
  }

  :deep(tbody td) {
    padding: var(--dss-spacing-3);
    border-bottom: 1px solid var(--dss-gray-200);
    vertical-align: middle;
    font-size: 0.8125rem;
    color: var(--dss-text-body);
    transition: background 150ms ease;
  }

  :deep(tbody tr) {
    transition: background 150ms ease;
  }
  :deep(tbody tr:hover td) {
    background: var(--dss-surface-hover);
  }

  :deep(tr.row--selected td) {
    background: var(--dss-surface-selected);
  }
}

.col-check   { width: 40px; }
.col-code    { width: 80px; font-weight: 600; }
.col-num     { text-align: left; }
.col-center  { text-align: center; width: 110px; }
.col-actions { width: 110px; text-align: right; white-space: nowrap; }

.cell-strong { font-weight: 600; color: var(--dss-text-body); }
.cell-sub    { font-size: 0.6875rem; color: var(--dss-text-subtle); margin-top: 2px; }

.text-danger { color: var(--dss-feedback-error); }

/* ---------- Selection bottom bar ---------- */
.selection-bar {
  position: sticky;
  bottom: var(--dss-spacing-3);
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md, 8px);
  box-shadow: var(--dss-shadow-lg);
}

.fade-enter-active, .fade-leave-active { transition: opacity 160ms ease, transform 160ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(6px); }

/* ---------- Detail modal ---------- */
.detail-modal {
  width: 100%;
  max-width: 520px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--dss-spacing-4) var(--dss-spacing-5);
  }
  &__eyebrow {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--dss-text-subtle);
    font-weight: 600;
  }
  &__title { margin: 4px 0 0; font-size: 1.125rem; color: var(--dss-text-body); }
  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--dss-spacing-3);
    padding: var(--dss-spacing-4) var(--dss-spacing-5);
  }
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--dss-spacing-3);
    font-size: 0.875rem;
  }
  &__label {
    color: var(--dss-text-subtle);
    font-weight: 500;
  }
}
</style>
