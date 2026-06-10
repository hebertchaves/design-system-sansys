<template>
  <div class="atender-page" data-brand="water">

    <!-- 1. APP BAR — fora de data-grid-body (não é linha de conteúdo) -->
    <header class="app-bar" data-grid-debug>
      <div class="app-bar__brand">
        <DssButton variant="flat" round size="md" icon="menu" aria-label="Menu" class="app-bar__btn" />
        <div class="app-bar__logo">
          <DssIcon name="water_drop" size="sm" />
          <span class="app-bar__logo-text"><strong>sansys</strong><em>water</em></span>
        </div>
        <div class="app-bar__divider" />
        <DssButton variant="flat" size="sm" icon="cached" label="Atualizar CFG" class="app-bar__btn" />
        <DssChip dense size="sm" color="warning" text-color="white" class="app-bar__env">HOMOLOGAÇÃO</DssChip>
        <DssButton variant="flat" size="sm" icon="cached" label="Atualizador" class="app-bar__btn" />
      </div>

      <div class="app-bar__actions">
        <DssButton variant="flat" round size="md" icon="help" aria-label="Ajuda" class="app-bar__btn">
          <DssTooltip>Ajuda</DssTooltip>
        </DssButton>
        <DssButton variant="flat" round size="md" icon="dashboard" aria-label="Alternar função" class="app-bar__btn">
          <DssTooltip>Alternar função ativa</DssTooltip>
        </DssButton>
        <DssAvatar size="md" icon="person" color="secondary" />
      </div>
    </header>

    <!-- CONTAINER DE REFERÊNCIA DO GRID INSPECTOR (colunas X) -->
    <main class="page-body" data-grid-body>

      <div class="page-rows" data-grid-rows>

        <!-- ROW 2: Breadcrumb + ações superiores -->
        <div class="page-top" data-grid-debug>
          <nav class="page-breadcrumb" aria-label="Trilha de atendimento">
            <DssBreadcrumbs separator="›" active-color="primary">
              <DssBreadcrumbsEl label="Iniciar Atendimento" icon="looks_one" />
              <DssBreadcrumbsEl label="Pesquisar Registro" icon="looks_two" />
              <DssBreadcrumbsEl label="Atender Solicitações" icon="looks_3" />
              <DssBreadcrumbsEl label="Registrar e Finalizar" icon="looks_4" />
            </DssBreadcrumbs>
          </nav>

          <div class="page-top__actions">
            <DssChip dense size="sm" color="negative" text-color="white" icon="phonelink_erase">
              Telefonia inativa
            </DssChip>
            <DssButton
              variant="elevated"
              color="primary"
              icon="open_in_new"
              label="Nova Aba"
              size="sm"
            >
              <DssTooltip>Abrir atendimento em nova aba</DssTooltip>
            </DssButton>
          </div>
        </div>

        <!-- ROW 3: Card de identificação do cliente -->
        <DssCard class="client-header" data-grid-debug>
          <div class="client-header__grid">
            <!-- Identificação -->
            <div class="client-header__id">
              <div class="client-header__id-icon">
                <DssIcon name="location_city" size="lg" color="primary" />
              </div>
              <span class="client-header__code">1-9</span>
              <DssButton variant="flat" size="xs" color="secondary" label="+ DETALHES" />
            </div>

            <!-- Coluna 2 — pessoas/endereço -->
            <dl class="client-header__group">
              <div class="kv">
                <dt>Morador:</dt>
                <dd>ROGERIO ONIESKO</dd>
              </div>
              <div class="kv">
                <dt>Titular:</dt>
                <dd>
                  ROGERIO ONIESKO
                  <DssIcon name="portrait" size="xs" color="primary" />
                </dd>
              </div>
              <div class="kv">
                <dt>Endereço:</dt>
                <dd>Acesso ENTRADA DO MANANCIAL ETA - AC SN, ALEXANDRA - Paranaguá</dd>
              </div>
            </dl>

            <!-- Coluna 3 — técnicos -->
            <dl class="client-header__group">
              <div class="kv"><dt>Rota Leitura:</dt><dd>2213.000960</dd></div>
              <div class="kv"><dt>Localização:</dt><dd>01.02.0025.0045.0080.0010</dd></div>
              <div class="kv"><dt>Hidrômetro:</dt><dd>Y18S289669</dd></div>
            </dl>

            <!-- Coluna 4 — situações (chips) -->
            <dl class="client-header__group">
              <div class="kv kv--inline">
                <dt>Ligação Água:</dt>
                <dd>
                  <DssChip dense size="sm" color="positive" text-color="white" icon="check_circle">Ativa</DssChip>
                </dd>
              </div>
              <div class="kv kv--inline">
                <dt>Ligação Esgoto:</dt>
                <dd>
                  <DssChip dense size="sm" outline color="secondary" icon="remove">Sem informação</DssChip>
                </dd>
              </div>
              <div class="kv kv--inline">
                <dt>Situação Lixo:</dt>
                <dd>
                  <DssChip dense size="sm" outline color="warning" icon="schedule">Pendente</DssChip>
                </dd>
              </div>
            </dl>

            <!-- Coluna 5 — action rail -->
            <div class="client-header__rail">
              <div class="rail-btn-wrap">
                <DssButton variant="elevated" color="primary" icon="shopping_cart" round size="md">
                  <DssTooltip>Carrinho de atendimento</DssTooltip>
                </DssButton>
                <DssBadge color="negative" floating>3</DssBadge>
              </div>
              <DssButton variant="outline" color="primary" icon="add" round size="md">
                <DssTooltip>Nova solicitação</DssTooltip>
              </DssButton>
              <DssButton variant="flat" color="primary" icon="close" round size="md">
                <DssTooltip>Encerrar atendimento</DssTooltip>
              </DssButton>
            </div>
          </div>
        </DssCard>

        <!-- ROW 4: Status summary (filtro por situação) -->
        <section class="status-strip" aria-label="Resumo por situação de fatura" data-grid-debug>
          <button
            v-for="s in statusSummary"
            :key="s.key"
            class="status-pill"
            :class="['status-pill--' + s.tone, { 'status-pill--active': activeStatus === s.key }]"
            @click="activeStatus = s.key"
          >
            <div class="status-pill__label">{{ s.label }} <span>({{ s.count }})</span></div>
            <div class="status-pill__value">R$ {{ s.value }}</div>
          </button>
        </section>

        <!-- ROW 5: Cabeçalho da seção de faturas -->
        <header class="section-header" data-grid-debug>
          <div class="section-header__title-group">
            <div class="section-header__title">Faturas / Consumo</div>
            <DssBadge color="primary" outline>{{ filteredRows.length }} faturas</DssBadge>
          </div>
          <div class="section-header__tools">
            <DssButton variant="outline" color="primary" icon="filter_list" label="Filtrar" size="sm" />
            <DssButton variant="outline" color="primary" icon="file_download" label="Exportar" size="sm" />
            <DssButton variant="elevated" color="primary" icon="print" label="Imprimir 2ª via" size="sm" />
          </div>
        </header>

        <!-- TABELA: container selecionável + rows do overlay Y -->
        <div class="faturas-table" data-grid-debug data-grid-rows>

        <!-- Cabeçalho de colunas da tabela -->
        <div class="faturas-grid faturas-grid--header" data-grid-debug>
          <div class="cell cell--check">
            <DssCheckbox
              v-model="allSelected"
              :indeterminate="indeterminate"
              color="primary"
              @update:model-value="toggleAll"
            />
          </div>
          <div class="cell cell--ref">Ref.</div>
          <div class="cell">Valor / Vencimento</div>
          <div class="cell">Situação</div>
          <div class="cell">Leitura</div>
          <div class="cell cell--center">Consumo</div>
          <div class="cell cell--center">Foto</div>
          <div class="cell">Data Pagamento</div>
          <div class="cell cell--actions">Ações</div>
        </div>

        <!-- ROWS 7..N: Linhas de dados (filhos diretos de [data-grid-rows]) -->
        <DssExpansionItem
          v-for="row in filteredRows"
          :key="row.id"
          :id="`gi-trow-${row.id}`"
          data-grid-debug
          class="fatura-row"
          :class="{ 'fatura-row--selected': selected.includes(row.id) }"
          expand-icon="keyboard_arrow_down"
          header-class="fatura-row__header"
        >
          <template #header>
            <div class="faturas-grid">
              <div class="cell cell--check" @click.stop>
                <DssCheckbox
                  :model-value="selected.includes(row.id)"
                  color="primary"
                  @update:model-value="toggleRow(row.id)"
                />
              </div>

              <div class="cell cell--ref">
                <div class="ref__month">{{ row.refMes }}</div>
                <div class="ref__year">{{ row.refAno }}</div>
              </div>

              <div class="cell">
                <div class="strong">R$ {{ row.valor }}</div>
                <div class="sub"><span>Vencimento</span> {{ row.vencimento }}</div>
              </div>

              <div class="cell">
                <DssChip
                  dense size="sm"
                  :color="chipColor(row.situacao)"
                  :text-color="chipText(row.situacao)"
                  :icon="chipIcon(row.situacao)"
                  :outline="row.situacao === 'Cancelada'"
                >
                  {{ row.situacao }}
                </DssChip>
                <div class="sub" v-if="row.situacaoData"><span>Em:</span> {{ row.situacaoData }}</div>
              </div>

              <div class="cell">
                <div class="strong">{{ row.leitura ?? '—' }}</div>
                <div class="sub">{{ row.leituraData }}</div>
              </div>

              <div class="cell cell--center">{{ row.consumo }}</div>

              <div class="cell cell--center" @click.stop>
                <DssButton
                  variant="flat" round size="md"
                  :icon="row.foto ? 'photo_camera' : 'no_photography'"
                  :color="row.foto ? 'primary' : 'dark'"
                  :disable="!row.foto"
                  @click="openFoto(row)"
                >
                  <DssTooltip v-if="row.foto">Ver foto da leitura</DssTooltip>
                </DssButton>
              </div>

              <div class="cell">
                <span v-if="row.pagamento">{{ row.pagamento }}</span>
                <span v-else class="muted">—</span>
              </div>

              <div class="cell cell--actions" @click.stop>
                <DssButton variant="flat" round size="sm" icon="visibility" color="primary" @click="openDetail(row)">
                  <DssTooltip>Visualizar fatura</DssTooltip>
                </DssButton>
                <DssBtnDropdown
                  variant="flat" size="sm" color="primary"
                  dropdown-icon="more_vert" no-icon-animation
                >
                  <DssList>
                    <DssItem clickable v-close-popup @click="rowAction('boleto', row)">
                      <DssItemSection avatar><DssIcon name="receipt" size="xs" /></DssItemSection>
                      <DssItemSection>2ª via boleto</DssItemSection>
                    </DssItem>
                    <DssItem clickable v-close-popup @click="rowAction('email', row)">
                      <DssItemSection avatar><DssIcon name="mail" size="xs" /></DssItemSection>
                      <DssItemSection>Enviar por e-mail</DssItemSection>
                    </DssItem>
                    <DssItem clickable v-close-popup @click="rowAction('history', row)">
                      <DssItemSection avatar><DssIcon name="history" size="xs" /></DssItemSection>
                      <DssItemSection>Histórico</DssItemSection>
                    </DssItem>
                    <DssSeparator />
                    <DssItem clickable v-close-popup @click="rowAction('cancel', row)">
                      <DssItemSection avatar><DssIcon name="cancel" size="xs" color="negative" /></DssItemSection>
                      <DssItemSection class="text-danger">Cancelar fatura</DssItemSection>
                    </DssItem>
                  </DssList>
                </DssBtnDropdown>
              </div>
            </div>
          </template>

          <!-- Conteúdo expandido -->
          <DssCard flat class="fatura-row__detail">
            <div class="detail-grid">
              <div class="detail-kv"><dt>Tipo de Fatura</dt><dd>{{ row.tipoFatura }}</dd></div>
              <div class="detail-kv"><dt>Tipo de Emissão</dt><dd>{{ row.tipoEmissao }}</dd></div>
              <div class="detail-kv"><dt>SPC / SERASA</dt>
                <dd>
                  <DssChip dense size="sm" :color="row.spc === 'Nada Consta' ? 'positive' : 'negative'"
                           text-color="white" :icon="row.spc === 'Nada Consta' ? 'verified' : 'gpp_bad'">
                    {{ row.spc }}
                  </DssChip>
                </dd>
              </div>
              <div class="detail-kv"><dt>Tipo de Entrega</dt><dd>{{ row.entrega || '—' }}</dd></div>
              <div class="detail-kv"><dt>E-Mail</dt><dd>{{ row.email || '—' }}</dd></div>
              <div class="detail-kv"><dt>Cliente / Morador</dt><dd>{{ row.cliente || '—' }}</dd></div>
              <div class="detail-kv"><dt>Data de Emissão</dt><dd>{{ row.emissao }}</dd></div>
              <div class="detail-kv"><dt>Cód. Barras</dt><dd class="mono">{{ row.codBarras }}</dd></div>
            </div>
          </DssCard>
        </DssExpansionItem>

        </div><!-- /faturas-table -->

        <!-- Barra de seleção (fora da tabela) -->
        <transition name="fade">
          <div v-if="selected.length" class="selection-bar" data-grid-debug>
            <DssChip dense color="primary" text-color="white" icon="check_circle">
              {{ selected.length }} {{ selected.length === 1 ? 'fatura selecionada' : 'faturas selecionadas' }}
            </DssChip>
            <DssSpace />
            <DssButton variant="flat" color="primary" label="Limpar" @click="selected = []" />
            <DssButton variant="outline" color="primary" icon="download" label="Baixar PDFs" />
            <DssButton variant="elevated" color="primary" icon="print" label="Imprimir 2ª via" />
          </div>
        </transition>

      </div><!-- /page-rows -->
    </main><!-- /page-body -->

    <!-- MODAL DETALHE — fora de [data-grid-rows] e [data-grid-body] -->
    <DssDialog v-model:open="detailOpen" maximized-width="640px">
      <DssCard class="detail-modal">
        <header class="detail-modal__header">
          <div>
            <span class="detail-modal__eyebrow">Fatura</span>
            <h3 class="detail-modal__title">
              Ref. {{ detailRow?.refMes }}/{{ detailRow?.refAno }} · R$ {{ detailRow?.valor }}
            </h3>
          </div>
          <DssButton variant="flat" round size="sm" icon="close" @click="detailOpen = false" />
        </header>
        <DssSeparator />
        <div class="detail-modal__body">
          <div class="detail-modal__row">
            <span class="detail-modal__label">Situação</span>
            <DssChip dense size="sm"
              :color="chipColor(detailRow?.situacao)"
              :text-color="chipText(detailRow?.situacao)"
              :icon="chipIcon(detailRow?.situacao)"
            >{{ detailRow?.situacao }}</DssChip>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__label">Vencimento</span><span>{{ detailRow?.vencimento }}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__label">Pagamento</span><span>{{ detailRow?.pagamento || '—' }}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__label">Leitura</span>
            <span>{{ detailRow?.leitura ?? '—' }} ({{ detailRow?.leituraData }})</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__label">Consumo</span><span>{{ detailRow?.consumo }} m³</span>
          </div>
        </div>
        <DssSeparator />
        <DssCardActions align="right">
          <DssButton variant="flat" label="Fechar" @click="detailOpen = false" />
          <DssButton variant="outline" color="primary" icon="download" label="Boleto" />
          <DssButton variant="elevated" color="primary" icon="print" label="Imprimir" />
        </DssCardActions>
      </DssCard>
    </DssDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import DssIcon from '@components/base/DssIcon/DssIcon.vue'
import DssAvatar from '@components/base/DssAvatar/DssAvatar.vue'
import DssBadge from '@components/base/DssBadge/DssBadge.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssBtnDropdown from '@components/base/DssBtnDropdown/DssBtnDropdown.vue'
import DssBreadcrumbs from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssCard from '@components/base/DssCard/DssCard.vue'
import { DssCardActions } from '@components/base/DssCard/index.js'
import DssCheckbox from '@components/base/DssCheckbox/DssCheckbox.vue'
import DssChip from '@components/base/DssChip/DssChip.vue'
import DssList from '@components/base/DssList/DssList.vue'
import DssItem from '@components/base/DssItem/DssItem.vue'
import DssItemSection from '@components/base/DssItemSection/DssItemSection.vue'
import DssSeparator from '@components/base/DssSeparator/DssSeparator.vue'
import DssSpace from '@components/base/DssSpace/DssSpace.vue'
import DssTooltip from '@components/base/DssTooltip/DssTooltip.vue'
import DssDialog from '@components/composed/DssDialog/DssDialog.vue'
import DssExpansionItem from '@components/base/DssExpansionItem/DssExpansionItem.vue'

// ---- Status summary (replica chips do print: Cancelada / Quitada) ----
type Tone = 'negative' | 'positive' | 'warning' | 'neutral'
const statusSummary = [
  { key: 'all',       label: 'Todas',     count: 83, value: '4.549,60', tone: 'neutral'  as Tone },
  { key: 'aberto',    label: 'Em aberto', count: 3,  value: '174,21',   tone: 'warning'  as Tone },
  { key: 'atraso',    label: 'Em atraso', count: 1,  value: '58,37',    tone: 'negative' as Tone },
  { key: 'cancelada', label: 'Cancelada', count: 4,  value: '24,08',    tone: 'negative' as Tone },
  { key: 'quitada',   label: 'Quitada',   count: 75, value: '4.525,52', tone: 'positive' as Tone },
]
const activeStatus = ref('all')

// ---- Dados ----
type Situacao = 'Quitada' | 'Em aberto' | 'Em atraso' | 'Cancelada'
interface Row {
  id: number
  refMes: string; refAno: string
  valor: string; vencimento: string
  situacao: Situacao; situacaoData?: string
  leitura: number | null; leituraData: string
  consumo: number
  foto: boolean
  pagamento: string | null
  tipoFatura: string; tipoEmissao: string
  spc: string; entrega: string; email: string; cliente: string
  emissao: string; codBarras: string
}

const rows = ref<Row[]>([
  { id: 12923939, refMes: '02', refAno: '2026', valor: '58,37',  vencimento: '09/03/2026', situacao: 'Quitada',   situacaoData: '27/02', leitura: 571, leituraData: '26/02', consumo: 10, foto: true,  pagamento: '27/02/2026', tipoFatura: 'Normal',     tipoEmissao: 'Automático Coletor', spc: 'Nada Consta', entrega: '', email: '', cliente: '', emissao: '26/02/2026', codBarras: '83660000000-1 91290060037-2 80012026030-9 09000058377' },
  { id: 12852054, refMes: '01', refAno: '2026', valor: '57,52',  vencimento: '09/02/2026', situacao: 'Quitada',   situacaoData: '03/02', leitura: 561, leituraData: '26/01', consumo: 9,  foto: true,  pagamento: '03/02/2026', tipoFatura: 'Normal',     tipoEmissao: 'Automático Coletor', spc: 'Nada Consta', entrega: 'E-mail', email: 'rogerio@example.com', cliente: 'ROGERIO ONIESKO', emissao: '26/01/2026', codBarras: '83660000000-1 91290060037-2 80012026020-9 09000057527' },
  { id: 12780041, refMes: '12', refAno: '2025', valor: '60,18',  vencimento: '09/01/2026', situacao: 'Em atraso', situacaoData: '15/01', leitura: 552, leituraData: '23/12', consumo: 11, foto: true,  pagamento: null,         tipoFatura: 'Normal',     tipoEmissao: 'Automático Coletor', spc: 'Nada Consta', entrega: '', email: '', cliente: '', emissao: '23/12/2025', codBarras: '83660000000-1 91290060037-2 80012025120-9 09000060187' },
  { id: 12710885, refMes: '11', refAno: '2025', valor: '57,52',  vencimento: '09/12/2025', situacao: 'Em aberto', situacaoData: '',      leitura: 541, leituraData: '25/11', consumo: 9,  foto: false, pagamento: null,         tipoFatura: 'Normal',     tipoEmissao: 'Manual',             spc: 'Nada Consta', entrega: 'Correios', email: '', cliente: '', emissao: '25/11/2025', codBarras: '83660000000-1 91290060037-2 80012025110-9 09000057527' },
  { id: 12640228, refMes: '10', refAno: '2025', valor: '24,08',  vencimento: '09/11/2025', situacao: 'Cancelada', situacaoData: '01/11', leitura: null, leituraData: '—',    consumo: 0,  foto: false, pagamento: null,         tipoFatura: 'Reemissão',  tipoEmissao: 'Manual',             spc: 'Nada Consta', entrega: '', email: '', cliente: '', emissao: '24/10/2025', codBarras: '83660000000-1 91290060037-2 80012025100-9 09000024087' },
  { id: 12570077, refMes: '09', refAno: '2025', valor: '62,01',  vencimento: '09/10/2025', situacao: 'Quitada',   situacaoData: '08/10', leitura: 532, leituraData: '24/09', consumo: 11, foto: true,  pagamento: '08/10/2025', tipoFatura: 'Normal',     tipoEmissao: 'Automático Coletor', spc: 'Nada Consta', entrega: 'E-mail', email: 'rogerio@example.com', cliente: 'ROGERIO ONIESKO', emissao: '24/09/2025', codBarras: '83660000000-1 91290060037-2 80012025090-9 09000062017' },
])

const filteredRows = computed(() => {
  if (activeStatus.value === 'all') return rows.value
  const map: Record<string, Situacao> = {
    aberto:    'Em aberto',
    atraso:    'Em atraso',
    cancelada: 'Cancelada',
    quitada:   'Quitada',
  }
  return rows.value.filter(r => r.situacao === map[activeStatus.value])
})

// chips de situação
function chipColor(s?: Situacao) {
  switch (s) {
    case 'Quitada':   return 'positive'
    case 'Em aberto': return 'warning'
    case 'Em atraso': return 'negative'
    case 'Cancelada': return 'secondary'
    default:          return 'secondary'
  }
}
function chipText(s?: Situacao) {
  return s === 'Cancelada' ? 'grey-8' : 'white'
}
function chipIcon(s?: Situacao) {
  switch (s) {
    case 'Quitada':   return 'check_circle'
    case 'Em aberto': return 'schedule'
    case 'Em atraso': return 'error'
    case 'Cancelada': return 'block'
    default:          return ''
  }
}

// seleção
const selected = ref<number[]>([])
const allSelected = computed({
  get: () => selected.value.length === filteredRows.value.length && filteredRows.value.length > 0,
  set: (v: boolean) => { selected.value = v ? filteredRows.value.map(r => r.id) : [] },
})
const indeterminate = computed(() =>
  selected.value.length > 0 && selected.value.length < filteredRows.value.length
)
function toggleAll(v: boolean) {
  selected.value = v ? filteredRows.value.map(r => r.id) : []
}
function toggleRow(id: number) {
  const i = selected.value.indexOf(id)
  if (i === -1) selected.value.push(id)
  else selected.value.splice(i, 1)
}

// detalhe
const detailOpen = ref(false)
const detailRow = ref<Row | null>(null)
function openDetail(row: Row) { detailRow.value = row; detailOpen.value = true }
function openFoto(row: Row)   { console.log('[Atender] foto', row.id) }
function rowAction(a: string, r: Row) { console.log('[Atender] row action', a, r.id) }
</script>

<style lang="scss" scoped>
.atender-page {
  display: flex;
  flex-direction: column;
  background: var(--dss-surface-muted);
  min-height: 100%;
  color: var(--dss-text-body);
  font-size: var(--dss-font-size-sm);
}

/* ── App bar ──────────────────────────────────────────────────────────── */
.app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--dss-spacing-2) var(--dss-spacing-5);
  min-height: var(--dss-spacing-14);
  background: var(--dss-action-primary);
  color: var(--dss-text-inverse);
  box-shadow: var(--dss-shadow-md);

  &__brand   { display: flex; align-items: center; gap: var(--dss-spacing-3); }
  &__logo    { display: flex; align-items: center; gap: var(--dss-spacing-1_5); }
  &__logo-text {
    font-size: var(--dss-font-size-md);
    letter-spacing: 0.5px;
    strong { font-weight: var(--dss-font-weight-bold); }
    em { font-style: normal; font-weight: var(--dss-font-weight-light); opacity: var(--dss-opacity-90); }
  }
  &__divider {
    width: var(--dss-border-width-thin);
    height: var(--dss-spacing-7);
    background: var(--dss-text-inverse);
    opacity: var(--dss-opacity-35);
  }
  &__actions { display: flex; align-items: center; gap: var(--dss-spacing-2); }
  &__env     { letter-spacing: 0.5px; font-weight: var(--dss-font-weight-bold); }

  /* Botões em fundo escuro: cor forçada via :deep para ignorar color prop interna do Quasar */
  &__btn {
    color: var(--dss-text-inverse) !important;

    :deep(.dss-button__icon),
    :deep(.q-icon),
    :deep(.q-btn__content) {
      color: var(--dss-text-inverse) !important;
    }

    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--dss-text-inverse);
      opacity: 0;
      pointer-events: none;
      border-radius: inherit;
      transition: opacity var(--dss-duration-fast) var(--dss-easing-ease-out);
    }
    &:hover::after { opacity: var(--dss-opacity-10); }
  }
}

/* ── Page body (referência Grid Inspector) ────────────────────────────── */
.page-body {
  flex: 1;
  overflow: hidden;
}

/* ── Page rows (container de linhas do overlay Y) ────────────────────── */
.page-rows {
  display: flex;
  flex-direction: column;
  row-gap: var(--dss-layout-gap-y, 0px);
  max-width: var(--dss-layout-max-width, 100%);
  padding-bottom: var(--dss-spacing-12);
}

/* ── Container da tabela (selecionável no Select Mode + rows do overlay Y) ── */
.faturas-table {
  display: flex;
  flex-direction: column;
  row-gap: var(--dss-layout-gap-y, 0px);
}

/* ── Faixa de aviso de ambiente ───────────────────────────────────────── */
.env-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--dss-spacing-3);
  min-height: var(--dss-spacing-8);
  background: var(--dss-feedback-error);
  color: var(--dss-text-inverse);
  font-weight: var(--dss-font-weight-medium);
  font-size: var(--dss-font-size-sm);
  padding: var(--dss-spacing-1_5) var(--dss-layout-padding-x, var(--dss-spacing-4));
}

/* ── Breadcrumb + ações superiores ────────────────────────────────────── */
.page-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Margem horizontal via token de layout — fallback = var(--dss-spacing-5) */
  padding: var(--dss-spacing-3) var(--dss-layout-margin-x, var(--dss-spacing-5)) 0;
  margin-top: var(--dss-layout-margin-y, var(--dss-spacing-4));
  gap: var(--dss-spacing-4);
  flex-wrap: wrap;

  &__actions { display: flex; align-items: center; gap: var(--dss-spacing-2); }
}

/* ── Card de identificação do cliente ────────────────────────────────── */
.client-header {
  /* Margem horizontal via token de layout — atualiza com o slider */
  margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
  padding: var(--dss-layout-padding-y, var(--dss-spacing-5)) var(--dss-layout-padding-x, var(--dss-spacing-5));
  box-shadow: var(--dss-shadow-sm);
  border-radius: var(--dss-radius-md);

  &__grid {
    display: grid;
    grid-template-columns: auto 1.6fr 1.3fr 1.2fr auto;
    gap: var(--dss-layout-gap-y, var(--dss-spacing-5)) var(--dss-layout-gap-x, var(--dss-spacing-5));
    align-items: start;
  }
  &__id {
    display: flex; flex-direction: column; align-items: center;
    gap: var(--dss-spacing-2);
  }
  &__id-icon {
    width: var(--dss-spacing-14); height: var(--dss-spacing-14);
    border-radius: var(--dss-radius-circle);
    display: flex; align-items: center; justify-content: center;
    background: var(--dss-surface-subtle);
    border: var(--dss-border-gray-200);
  }
  &__code { font-size: var(--dss-font-size-2xl); font-weight: var(--dss-font-weight-bold); letter-spacing: 0.5px; }
  &__group { display: flex; flex-direction: column; gap: var(--dss-spacing-2); margin: 0; }
  &__rail {
    display: flex; flex-direction: column; gap: var(--dss-spacing-2);
    padding-left: var(--dss-spacing-3);
    border-left: var(--dss-border-gray-200);
  }
}
.rail-btn-wrap { position: relative; }

.kv {
  display: flex; flex-wrap: wrap; gap: var(--dss-spacing-1_5);
  font-size: var(--dss-font-size-xs);
  line-height: var(--dss-line-height-xs);
  dt { color: var(--dss-text-subtle); font-weight: var(--dss-font-weight-medium); }
  dd { color: var(--dss-text-body); margin: 0;
       display: inline-flex; align-items: center; gap: var(--dss-spacing-1); }
  &--inline { align-items: center; }
}

/* ── Status strip ─────────────────────────────────────────────────────── */
.status-strip {
  /* Margem horizontal via token de layout */
  margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--dss-layout-gap-x, var(--dss-spacing-2));
}
.status-pill {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: var(--dss-spacing-1);
  padding: var(--dss-layout-padding-y, var(--dss-spacing-3)) var(--dss-layout-padding-x, var(--dss-spacing-2));
  background: var(--dss-surface-default);
  border: var(--dss-border-gray-200);
  border-radius: var(--dss-radius-md);
  box-shadow: var(--dss-shadow-xs);
  cursor: pointer;
  transition: var(--dss-transition-fast);
  font-family: inherit;
  &:hover { background: var(--dss-surface-hover); transform: translateY(calc(var(--dss-spacing-px) * -1)); }

  &__label {
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-subtle);
    font-weight: var(--dss-font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    span { font-weight: var(--dss-font-weight-medium); opacity: var(--dss-opacity-70); }
  }
  &__value { font-size: var(--dss-font-size-lg); font-weight: var(--dss-font-weight-bold); }

  &--positive { .status-pill__value { color: var(--dss-feedback-success); } }
  &--negative { .status-pill__value { color: var(--dss-feedback-error); } }
  &--warning  { .status-pill__value { color: var(--dss-feedback-warning); } }
  &--neutral  { .status-pill__value { color: var(--dss-text-body); } }

  &--active {
    border-color: var(--dss-action-primary);
    box-shadow: 0 0 0 var(--dss-border-width-md) var(--dss-action-primary-surface);
  }
}

/* ── Cabeçalho da seção de faturas ────────────────────────────────────── */
.section-header {
  /* Margem horizontal via token de layout */
  margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--dss-layout-padding-y, var(--dss-spacing-2)) 0;
  border-bottom: var(--dss-border-width-md) solid var(--dss-action-primary);

  &__title-group { display: flex; align-items: center; gap: var(--dss-spacing-3); }
  &__title { margin: 0; font-size: var(--dss-font-size-lg); font-weight: var(--dss-font-weight-semibold); }
  &__tools { display: flex; gap: var(--dss-spacing-2); }
}

/* ── Grade de colunas (header e linhas de dados) ─────────────────────── */
.faturas-grid {
  display: grid;
  grid-template-columns:
    var(--dss-spacing-10)
    var(--dss-spacing-20)
    1.4fr
    1.3fr
    1fr
    var(--dss-spacing-20)
    var(--dss-spacing-20)
    1.2fr
    var(--dss-spacing-28);
  align-items: center;
  row-gap: var(--dss-spacing-2);
  column-gap: var(--dss-layout-gap-x, var(--dss-spacing-3));
  padding: var(--dss-layout-padding-y, var(--dss-spacing-2)) var(--dss-layout-padding-x, var(--dss-spacing-3));
  width: 100%;

  /* Margem horizontal via token de layout — atualiza com o slider */
  &--header {
    margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
    background: var(--dss-surface-subtle);
    color: var(--dss-text-subtle);
    font-size: var(--dss-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: var(--dss-font-weight-semibold);
    border-bottom: var(--dss-border-width-md) solid var(--dss-gray-200);
    border-radius: var(--dss-radius-sm) var(--dss-radius-sm) 0 0;
  }
}
.cell {
  min-width: 0;
  &--center { text-align: center; justify-self: center; }
  &--actions { display: flex; gap: var(--dss-spacing-1); justify-content: flex-end; }
  &--check { display: flex; }
  &--ref { text-align: center; }
}
.ref__month { font-size: var(--dss-font-size-xl); font-weight: var(--dss-font-weight-bold); line-height: 1; }
.ref__year  { font-size: var(--dss-font-size-xs); color: var(--dss-text-subtle); }
.strong { font-weight: var(--dss-font-weight-semibold); }
.sub {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  margin-top: var(--dss-spacing-0_5);
  span { text-transform: uppercase; letter-spacing: 0.3px; font-weight: var(--dss-font-weight-semibold); }
}
.muted  { color: var(--dss-text-subtle); }
.mono   { font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; font-size: var(--dss-font-size-xs); }

/* ── Linha de fatura (filho direto de [data-grid-rows]) ──────────────── */
.fatura-row {
  /* Margem horizontal via token de layout — fallback = var(--dss-spacing-5) */
  margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
  border: var(--dss-border-gray-200);
  border-radius: var(--dss-radius-md);
  transition: var(--dss-transition-fast);
  background: var(--dss-surface-default);

  &:hover { border-color: var(--dss-action-primary); background: var(--dss-surface-hover); }
  &--selected { background: var(--dss-surface-selected); border-color: var(--dss-action-primary); }

  :deep(.q-expansion-item__container > .q-item) { padding: 0; }
  :deep(.q-item__section--side) { padding-right: var(--dss-spacing-2); }

  &__detail {
    background: var(--dss-surface-subtle);
    padding: var(--dss-layout-padding-y, var(--dss-spacing-4)) var(--dss-layout-padding-x, var(--dss-spacing-5));
    border-top: var(--dss-border-gray-200);
  }
}
.detail-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--dss-layout-gap-y, var(--dss-spacing-3)) var(--dss-layout-gap-x, var(--dss-spacing-5));
}
.detail-kv {
  display: flex; flex-direction: column; gap: var(--dss-spacing-0_5);
  dt {
    font-size: var(--dss-font-size-xs);
    text-transform: uppercase; letter-spacing: 0.4px;
    color: var(--dss-text-subtle);
    font-weight: var(--dss-font-weight-semibold);
    margin: 0;
  }
  dd {
    font-size: var(--dss-font-size-sm);
    font-weight: var(--dss-font-weight-semibold);
    color: var(--dss-text-body);
    margin: 0;
  }
}

/* ── Barra de seleção ─────────────────────────────────────────────────── */
.selection-bar {
  position: sticky; bottom: var(--dss-spacing-3);
  margin: 0 var(--dss-layout-margin-x, var(--dss-spacing-5));
  display: flex; align-items: center; gap: var(--dss-spacing-3);
  padding: var(--dss-layout-padding-y, var(--dss-spacing-3)) var(--dss-layout-padding-x, var(--dss-spacing-4));
  background: var(--dss-surface-default);
  border: var(--dss-border-gray-200);
  border-radius: var(--dss-radius-md);
  box-shadow: var(--dss-shadow-lg);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity var(--dss-duration-fast) var(--dss-easing-ease),
              transform var(--dss-duration-fast) var(--dss-easing-ease);
}
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(var(--dss-spacing-1_5)); }

.text-danger { color: var(--dss-feedback-error); }

/* ── Modal de detalhe ─────────────────────────────────────────────────── */
.detail-modal {
  width: 100%; max-width: min(560px, 95vw);
  &__header {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: var(--dss-spacing-4) var(--dss-spacing-5);
  }
  &__eyebrow {
    font-size: var(--dss-font-size-xs);
    text-transform: uppercase; letter-spacing: 0.6px;
    color: var(--dss-text-subtle);
    font-weight: var(--dss-font-weight-semibold);
  }
  &__title { margin: var(--dss-spacing-1) 0 0; font-size: var(--dss-font-size-lg); }
  &__body {
    display: flex; flex-direction: column; gap: var(--dss-spacing-3);
    padding: var(--dss-spacing-4) var(--dss-spacing-5);
  }
  &__row {
    display: flex; justify-content: space-between; align-items: center;
    gap: var(--dss-spacing-3); font-size: var(--dss-font-size-sm);
  }
  &__label { color: var(--dss-text-subtle); font-weight: var(--dss-font-weight-medium); }
}
</style>
