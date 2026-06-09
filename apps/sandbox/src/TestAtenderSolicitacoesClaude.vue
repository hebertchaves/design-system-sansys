<template>
  <div class="as-page" data-brand="water">

    <!-- ================================================================
         APP BAR
         ================================================================ -->
    <header class="as-appbar" role="banner">
      <div class="as-appbar__left">
        <DssButton
          variant="flat" round size="sm" icon="menu" color="white"
          aria-label="Menu principal" class="as-appbar__icon-btn"
        />
        <div class="as-appbar__logo" aria-label="Sansys Water">
          <DssIcon name="water_drop" size="xs" color="white" />
          <span class="as-appbar__logo-text">
            <strong>sansys</strong><em>water</em>
          </span>
        </div>
        <div class="as-appbar__pipe" aria-hidden="true" />
        <h1 class="as-appbar__title">Atendimento</h1>
      </div>

      <div class="as-appbar__right" role="toolbar" aria-label="Ações globais">
        <DssButton
          variant="flat" round size="sm" icon="help_outline" color="white"
          aria-label="Ajuda" class="as-appbar__icon-btn"
        >
          <DssTooltip anchor="bottom middle" self="top middle">Central de ajuda</DssTooltip>
        </DssButton>

        <div class="as-appbar__notif-wrap">
          <DssButton
            variant="flat" round size="sm" icon="notifications" color="white"
            aria-label="2 notificações não lidas" class="as-appbar__icon-btn"
          >
            <DssTooltip anchor="bottom middle" self="top middle">Notificações</DssTooltip>
          </DssButton>
          <DssBadge floating color="negative" class="as-appbar__notif-badge">2</DssBadge>
        </div>

        <DssButton
          variant="flat" round size="sm" icon="apps" color="white"
          aria-label="Aplicativos Sansys" class="as-appbar__icon-btn"
        >
          <DssTooltip anchor="bottom middle" self="top middle">Aplicativos Sansys</DssTooltip>
        </DssButton>

        <DssButton
          variant="flat" round size="sm" icon="account_circle" color="white"
          aria-label="Conta" class="as-appbar__icon-btn"
        >
          <DssTooltip anchor="bottom middle" self="top middle">Minha conta</DssTooltip>
        </DssButton>
      </div>
    </header>

    <!-- ================================================================
         LAYOUT: SIDENAV + MAIN
         ================================================================ -->
    <div class="as-layout">

      <!-- SIDE NAV -->
      <nav class="as-sidenav" aria-label="Módulos de navegação">
        <DssButton
          v-for="item in sideNav" :key="item.icon"
          variant="flat" round size="sm" :icon="item.icon" color="white"
          :aria-label="item.label" class="as-sidenav__btn"
          :class="{ 'as-sidenav__btn--active': item.active }"
          :aria-current="item.active ? 'page' : undefined"
        >
          <DssTooltip anchor="center right" self="center left">{{ item.label }}</DssTooltip>
        </DssButton>
      </nav>

      <!-- MAIN CONTENT -->
      <main class="as-main" id="main-content">

        <!-- BREADCRUMB -->
        <nav class="as-breadcrumb" aria-label="Etapas do atendimento">
          <DssBreadcrumbs separator="›" active-color="primary">
            <DssBreadcrumbsEl label="Iniciar Atendimento" icon="filter_1" />
            <DssBreadcrumbsEl label="Pesquisar Registro"  icon="filter_2" />
            <DssBreadcrumbsEl label="Atender Solicitações" icon="filter_3" />
            <DssBreadcrumbsEl label="Registrar e Finalizar" icon="filter_4" />
          </DssBreadcrumbs>
        </nav>

        <!-- CLIENT HEADER CARD -->
        <div class="as-client-card" role="region" aria-label="Dados do cliente">
          <div class="as-client-card__grid">

            <!-- Col 1: Identificação -->
            <div class="as-client-id" aria-label="Código da matrícula">
              <div class="as-client-id__avatar-wrap">
                <DssAvatar size="lg" icon="location_city" color="primary" />
                <DssBadge floating color="negative" class="as-client-id__avatar-badge">!</DssBadge>
              </div>
              <span class="as-client-id__code">1-9</span>
              <DssButton
                variant="outline" size="xs" color="primary"
                icon="add" label="DETALHES"
                class="as-client-id__details-btn"
              >
                <DssTooltip>Ver detalhes da matrícula</DssTooltip>
              </DssButton>
            </div>

            <!-- Col 2: Cadastro -->
            <dl class="as-kv-group" aria-label="Dados de cadastro">
              <div class="as-kv">
                <dt>Proprietário:</dt>
                <dd>
                  (CPF: 000.000.000-00) - ROGERIO ONIESKO
                  <DssButton
                    variant="flat" round size="xs" icon="badge" color="primary"
                    aria-label="Ver CPF" class="as-kv__icon-link"
                  >
                    <DssTooltip>Ver CPF/documento</DssTooltip>
                  </DssButton>
                </dd>
              </div>
              <div class="as-kv">
                <dt>Morador:</dt>
                <dd>
                  (CPF: 000.000.000-00) - ROGERIO ONIESKO
                  <DssButton
                    variant="flat" round size="xs" icon="badge" color="primary"
                    aria-label="Ver CPF do morador" class="as-kv__icon-link"
                  >
                    <DssTooltip>Ver CPF/documento</DssTooltip>
                  </DssButton>
                </dd>
              </div>
              <div class="as-kv">
                <dt>Endereço:</dt>
                <dd>Acesso ENTRADA DO MANANCIAL ETA - AC SN, ALEXANDRA - Paranaguá</dd>
              </div>
              <div class="as-kv as-kv--muted">
                <dt>Label:</dt><dd>Content</dd>
              </div>
            </dl>

            <!-- Col 3: Dados técnicos -->
            <dl class="as-kv-group" aria-label="Dados técnicos">
              <div class="as-kv"><dt>Rota Leitura:</dt><dd>2213.000960</dd></div>
              <div class="as-kv"><dt>Localização:</dt><dd>01.02.0025.0045.0080.0010</dd></div>
              <div class="as-kv"><dt>Tipo de Cobrança / Tipo Unidade:</dt><dd>Pagamento Caixa / Norma</dd></div>
              <div class="as-kv as-kv--muted"><dt>Label:</dt><dd>Content</dd></div>
            </dl>

            <!-- Col 4: Status de ligações -->
            <dl class="as-kv-group" aria-label="Status de ligações">
              <div class="as-kv as-kv--inline">
                <dt>Ligação água:</dt>
                <dd><span class="as-status as-status--active">Ativa</span></dd>
              </div>
              <div class="as-kv as-kv--inline">
                <dt>Ligação esgoto:</dt>
                <dd><span class="as-status as-status--inactive">Inativa</span></dd>
              </div>
              <div class="as-kv as-kv--inline">
                <dt>Situação Lixo:</dt>
                <dd><span class="as-status as-status--neutral">Ativa (Cobrança na Fatura)</span></dd>
              </div>
              <div class="as-kv as-kv--muted"><dt>Label:</dt><dd>Content</dd></div>
            </dl>

            <!-- Col 5: Rail de ações -->
            <div class="as-client-rail" role="group" aria-label="Ações rápidas">
              <div class="as-client-rail__item">
                <div class="as-badge-wrap">
                  <DssButton
                    variant="elevated" size="sm" icon="shopping_cart"
                    color="primary" round aria-label="Carrinho (3 itens)"
                    class="as-client-rail__btn"
                  >
                    <DssTooltip anchor="center left" self="center right">Carrinho (3 itens)</DssTooltip>
                  </DssButton>
                  <DssBadge floating color="negative" class="as-rail__cart-badge">3</DssBadge>
                </div>
              </div>
              <div class="as-client-rail__item">
                <DssButton
                  variant="outline" size="sm" icon="add"
                  color="primary" round aria-label="Nova solicitação"
                  class="as-client-rail__btn"
                >
                  <DssTooltip anchor="center left" self="center right">Nova solicitação</DssTooltip>
                </DssButton>
              </div>
              <div class="as-client-rail__item">
                <DssButton
                  variant="flat" size="sm" icon="close"
                  color="primary" round aria-label="Encerrar atendimento"
                  class="as-client-rail__btn"
                >
                  <DssTooltip anchor="center left" self="center right">Encerrar atendimento</DssTooltip>
                </DssButton>
              </div>
            </div>

          </div>
        </div>

        <!-- MODULE TABS BAR -->
        <div class="as-tabs-bar" role="navigation" aria-label="Módulos do atendimento">
          <DssTabs
            v-model="activeTab"
            dense
            active-color="white"
            indicator-color="white"
            class="as-tabs"
          >
            <DssTab name="financeiro"    icon="attach_money"   label="FINANCEIRO"           class="as-tab" />
            <DssTab name="cadastro"      icon="person"          label="INFORMAÇÕES DE CADASTRO" class="as-tab" />
            <DssTab name="ordemservico"  icon="build"           label="ORDEM DE SERVIÇO"     class="as-tab" />
            <DssTab name="leituras"      icon="speed"           label="LEITURAS E CONSUMO"   class="as-tab" />
            <DssTab name="cobranças"     icon="receipt_long"    label="COBRANÇAS"            class="as-tab" />
            <DssTab name="atendimentos"  icon="support_agent"   label="ATENDIMENTOS"         class="as-tab" />
          </DssTabs>
        </div>

        <!-- PAGE CONTENT -->
        <div class="as-content">

          <!-- Section Header -->
          <div class="as-section-header">
            <h2 class="as-section-title">Atender Solicitações</h2>
          </div>

          <!-- Action Toolbar -->
          <div class="as-toolbar" role="toolbar" aria-label="Ações da seção">
            <DssButton variant="outline" color="primary" icon="print"         label="Imprimir 2ª via"  size="sm" class="as-toolbar__btn" />
            <DssButton variant="outline" color="primary" icon="file_download" label="Exportar"         size="sm" class="as-toolbar__btn" />
            <DssButton variant="outline" color="primary" icon="filter_list"   label="Filtrar"          size="sm" class="as-toolbar__btn" />
            <DssButton variant="outline" color="primary" icon="add_circle"    label="Nova Solicitação" size="sm" class="as-toolbar__btn" />
            <DssButton variant="outline" color="negative" icon="cancel"       label="Cancelar"         size="sm" class="as-toolbar__btn" />
            <DssButton variant="outline" color="primary" icon="mail"          label="Enviar por e-mail" size="sm" class="as-toolbar__btn" />
            <DssButton variant="outline" color="primary" icon="campaign"      label="Campanhas"        size="sm" class="as-toolbar__btn" />
          </div>

          <!-- Table Wrapper -->
          <div class="as-table-wrap">

            <!-- Table Header -->
            <div class="as-tgrid as-tgrid--header" role="row">
              <div class="as-tcell as-tcell--check" role="columnheader">
                <DssCheckbox
                  v-model="allSelected"
                  :indeterminate="indeterminate"
                  color="primary"
                  @update:model-value="toggleAll"
                />
              </div>
              <div class="as-tcell as-tcell--ref"    role="columnheader">Ref.</div>
              <div class="as-tcell"                  role="columnheader">Valor / Vencimento</div>
              <div class="as-tcell"                  role="columnheader">Situação</div>
              <div class="as-tcell"                  role="columnheader">Leitura</div>
              <div class="as-tcell as-tcell--center" role="columnheader">Consumo</div>
              <div class="as-tcell as-tcell--center" role="columnheader">Foto</div>
              <div class="as-tcell"                  role="columnheader">Data Pagamento</div>
              <div class="as-tcell as-tcell--actions" role="columnheader">Ações</div>
            </div>

            <!-- Table Rows -->
            <DssExpansionItem
              v-for="row in filteredRows"
              :key="row.id"
              class="as-trow"
              :class="{ 'as-trow--selected': selected.includes(row.id) }"
              expand-icon="keyboard_arrow_down"
              header-class="as-trow__header"
            >
              <template #header>
                <div class="as-tgrid" role="row">

                  <div class="as-tcell as-tcell--check" @click.stop role="cell">
                    <DssCheckbox
                      :model-value="selected.includes(row.id)"
                      color="primary"
                      @update:model-value="toggleRow(row.id)"
                    />
                  </div>

                  <div class="as-tcell as-tcell--ref" role="cell">
                    <span class="as-ref-month">{{ row.refMes }}</span>
                    <span class="as-ref-year">{{ row.refAno }}</span>
                  </div>

                  <div class="as-tcell" role="cell">
                    <span class="as-cell-primary">R$ {{ row.valor }}</span>
                    <span class="as-cell-secondary"><strong>Vencimento</strong> {{ row.vencimento }}</span>
                  </div>

                  <div class="as-tcell" role="cell">
                    <span
                      class="as-status-text"
                      :class="'as-status-text--' + row.situacaoTone"
                    >{{ row.situacao }}</span>
                    <span v-if="row.situacaoData" class="as-cell-secondary">
                      <strong>Em:</strong> {{ row.situacaoData }}
                    </span>
                  </div>

                  <div class="as-tcell" role="cell">
                    <span class="as-cell-primary">{{ row.leitura ?? '—' }}</span>
                    <span class="as-cell-secondary">{{ row.leituraData }}</span>
                  </div>

                  <div class="as-tcell as-tcell--center" role="cell">{{ row.consumo }}</div>

                  <div class="as-tcell as-tcell--center" @click.stop role="cell">
                    <DssButton
                      variant="flat" round size="sm"
                      :icon="row.foto ? 'photo_camera' : 'no_photography'"
                      :color="row.foto ? 'primary' : 'grey-5'"
                      :disable="!row.foto"
                      class="as-action-btn"
                    >
                      <DssTooltip v-if="row.foto">Ver foto da leitura</DssTooltip>
                    </DssButton>
                  </div>

                  <div class="as-tcell" role="cell">
                    <span v-if="row.pagamento">{{ row.pagamento }}</span>
                    <span v-else class="as-muted">—</span>
                  </div>

                  <div class="as-tcell as-tcell--actions" @click.stop role="cell">
                    <DssButton
                      variant="flat" round size="sm"
                      icon="visibility" color="secondary"
                      class="as-action-btn"
                      @click="openDetail(row)"
                    >
                      <DssTooltip>Visualizar fatura</DssTooltip>
                    </DssButton>
                    <DssBtnDropdown
                      variant="flat" size="sm" color="primary"
                      dropdown-icon="more_vert" no-icon-animation
                      class="as-action-btn"
                    >
                      <DssList>
                        <DssItem clickable v-close-popup @click="rowAction('boleto', row)">
                          <DssItemSection avatar><DssIcon name="receipt"  size="xs" /></DssItemSection>
                          <DssItemSection>2ª via boleto</DssItemSection>
                        </DssItem>
                        <DssItem clickable v-close-popup @click="rowAction('email', row)">
                          <DssItemSection avatar><DssIcon name="mail"     size="xs" /></DssItemSection>
                          <DssItemSection>Enviar por e-mail</DssItemSection>
                        </DssItem>
                        <DssItem clickable v-close-popup @click="rowAction('history', row)">
                          <DssItemSection avatar><DssIcon name="history"  size="xs" /></DssItemSection>
                          <DssItemSection>Histórico</DssItemSection>
                        </DssItem>
                        <DssSeparator />
                        <DssItem clickable v-close-popup @click="rowAction('cancel', row)">
                          <DssItemSection avatar><DssIcon name="cancel" size="xs" color="negative" /></DssItemSection>
                          <DssItemSection class="text-negative">Cancelar fatura</DssItemSection>
                        </DssItem>
                      </DssList>
                    </DssBtnDropdown>
                  </div>

                </div>
              </template>

              <!-- Detail panel -->
              <div class="as-detail-panel">
                <div class="as-detail-grid">
                  <div class="as-detail-kv"><dt>Tipo de Fatura</dt><dd>{{ row.tipoFatura }}</dd></div>
                  <div class="as-detail-kv"><dt>Tipo de Emissão</dt><dd>{{ row.tipoEmissao }}</dd></div>
                  <div class="as-detail-kv">
                    <dt>SPC / SERASA</dt>
                    <dd>
                      <span
                        class="as-status-text"
                        :class="row.spc === 'Nada Consta' ? 'as-status-text--active' : 'as-status-text--overdue'"
                      >{{ row.spc }}</span>
                    </dd>
                  </div>
                  <div class="as-detail-kv"><dt>Tipo de Entrega</dt><dd>{{ row.entrega || '—' }}</dd></div>
                  <div class="as-detail-kv"><dt>E-Mail</dt><dd>{{ row.email || '—' }}</dd></div>
                  <div class="as-detail-kv"><dt>Cliente / Morador</dt><dd>{{ row.cliente || '—' }}</dd></div>
                  <div class="as-detail-kv"><dt>Data de Emissão</dt><dd>{{ row.emissao }}</dd></div>
                  <div class="as-detail-kv as-detail-kv--full">
                    <dt>Cód. de Barras</dt><dd class="as-mono">{{ row.codBarras }}</dd>
                  </div>
                </div>
              </div>

            </DssExpansionItem>

          </div>

          <!-- Selection bar -->
          <transition name="as-float">
            <div v-if="selected.length" class="as-selection-bar" role="status" aria-live="polite">
              <DssChip dense color="primary" text-color="white" icon="check_circle">
                {{ selected.length }} {{ selected.length === 1 ? 'fatura selecionada' : 'faturas selecionadas' }}
              </DssChip>
              <DssSpace />
              <DssButton variant="flat"     color="primary"  label="Limpar seleção"  @click="selected = []" />
              <DssButton variant="outline"  color="primary"  icon="download" label="Baixar PDFs" />
              <DssButton variant="elevated" color="primary"  icon="print"    label="Imprimir 2ª via" />
            </div>
          </transition>

        </div>
      </main>
    </div>

    <!-- DETAIL DIALOG -->
    <DssDialog v-model:open="detailOpen" maximized-width="600px">
      <DssCard class="as-modal">
        <header class="as-modal__header">
          <div>
            <span class="as-modal__eyebrow">Fatura</span>
            <h3 class="as-modal__title">
              Ref. {{ detailRow?.refMes }}/{{ detailRow?.refAno }} · R$ {{ detailRow?.valor }}
            </h3>
          </div>
          <DssButton variant="flat" round size="sm" icon="close" @click="detailOpen = false" />
        </header>
        <DssSeparator />
        <div class="as-modal__body">
          <div class="as-modal__row">
            <span class="as-modal__label">Situação</span>
            <span
              class="as-status-text"
              :class="'as-status-text--' + detailRow?.situacaoTone"
            >{{ detailRow?.situacao }}</span>
          </div>
          <div class="as-modal__row">
            <span class="as-modal__label">Vencimento</span>
            <span>{{ detailRow?.vencimento }}</span>
          </div>
          <div class="as-modal__row">
            <span class="as-modal__label">Pagamento</span>
            <span>{{ detailRow?.pagamento || '—' }}</span>
          </div>
          <div class="as-modal__row">
            <span class="as-modal__label">Leitura</span>
            <span>{{ detailRow?.leitura ?? '—' }} ({{ detailRow?.leituraData }})</span>
          </div>
          <div class="as-modal__row">
            <span class="as-modal__label">Consumo</span>
            <span>{{ detailRow?.consumo }} m³</span>
          </div>
        </div>
        <DssSeparator />
        <DssCardActions align="right">
          <DssButton variant="flat"     label="Fechar"   @click="detailOpen = false" />
          <DssButton variant="outline"  color="primary"  icon="download" label="Boleto" />
          <DssButton variant="elevated" color="primary"  icon="print"    label="Imprimir" />
        </DssCardActions>
      </DssCard>
    </DssDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import DssIcon          from '@components/base/DssIcon/DssIcon.vue'
import DssAvatar        from '@components/base/DssAvatar/DssAvatar.vue'
import DssBadge         from '@components/base/DssBadge/DssBadge.vue'
import DssButton        from '@components/base/DssButton/DssButton.vue'
import DssBtnDropdown   from '@components/base/DssBtnDropdown/DssBtnDropdown.vue'
import DssBreadcrumbs   from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssCard          from '@components/base/DssCard/DssCard.vue'
import { DssCardActions } from '@components/base/DssCard/index.js'
import DssCheckbox      from '@components/base/DssCheckbox/DssCheckbox.vue'
import DssChip          from '@components/base/DssChip/DssChip.vue'
import DssExpansionItem from '@components/base/DssExpansionItem/DssExpansionItem.vue'
import DssList          from '@components/base/DssList/DssList.vue'
import DssItem          from '@components/base/DssItem/DssItem.vue'
import DssItemSection   from '@components/base/DssItemSection/DssItemSection.vue'
import DssSeparator     from '@components/base/DssSeparator/DssSeparator.vue'
import DssSpace         from '@components/base/DssSpace/DssSpace.vue'
import DssTabs          from '@components/base/DssTabs/DssTabs.vue'
import DssTab           from '@components/base/DssTab/DssTab.vue'
import DssTooltip       from '@components/base/DssTooltip/DssTooltip.vue'
import DssDialog        from '@components/composed/DssDialog/DssDialog.vue'

// ── Side nav ──────────────────────────────────────────────────
const sideNav = [
  { icon: 'map',           label: 'Mapa',           active: false },
  { icon: 'person',        label: 'Cadastro',        active: false },
  { icon: 'bar_chart',     label: 'Financeiro',      active: true  },
  { icon: 'receipt',       label: 'Cobranças',       active: false },
  { icon: 'build',         label: 'Ordem de Serviço',active: false },
  { icon: 'login',         label: 'Atendimentos',    active: false },
  { icon: 'settings',      label: 'Configurações',   active: false },
]

// ── Tabs ──────────────────────────────────────────────────────
const activeTab = ref('financeiro')

// ── Tipos ────────────────────────────────────────────────────
type SituacaoTone = 'active' | 'pending' | 'overdue' | 'cancelled' | 'neutral'
type Situacao     = 'Quitada' | 'Em aberto' | 'Em atraso' | 'Cancelada'

interface Row {
  id: number
  refMes: string; refAno: string
  valor: string; vencimento: string
  situacao: Situacao; situacaoTone: SituacaoTone; situacaoData?: string
  leitura: number | null; leituraData: string
  consumo: number
  foto: boolean
  pagamento: string | null
  tipoFatura: string; tipoEmissao: string
  spc: string; entrega: string; email: string; cliente: string
  emissao: string; codBarras: string
}

// ── Dados ────────────────────────────────────────────────────
const rows = ref<Row[]>([
  { id: 12923939, refMes: '02', refAno: '2026', valor: '58,37',  vencimento: '09/03/2026', situacao: 'Quitada',   situacaoTone: 'active',    situacaoData: '27/02', leitura: 571,  leituraData: '26/02', consumo: 10, foto: true,  pagamento: '27/02/2026', tipoFatura: 'Normal',    tipoEmissao: 'Automático Coletor', spc: 'Nada Consta', entrega: '',          email: '',                    cliente: '',              emissao: '26/02/2026', codBarras: '83660000000-1 91290060037-2 80012026030-9 09000058377' },
  { id: 12852054, refMes: '01', refAno: '2026', valor: '57,52',  vencimento: '09/02/2026', situacao: 'Quitada',   situacaoTone: 'active',    situacaoData: '03/02', leitura: 561,  leituraData: '26/01', consumo: 9,  foto: true,  pagamento: '03/02/2026', tipoFatura: 'Normal',    tipoEmissao: 'Automático Coletor', spc: 'Nada Consta', entrega: 'E-mail',    email: 'rogerio@example.com', cliente: 'ROGERIO ONIESKO', emissao: '26/01/2026', codBarras: '83660000000-1 91290060037-2 80012026020-9 09000057527' },
  { id: 12780041, refMes: '12', refAno: '2025', valor: '60,18',  vencimento: '09/01/2026', situacao: 'Em atraso', situacaoTone: 'overdue',   situacaoData: '15/01', leitura: 552,  leituraData: '23/12', consumo: 11, foto: true,  pagamento: null,         tipoFatura: 'Normal',    tipoEmissao: 'Automático Coletor', spc: 'Nada Consta', entrega: '',          email: '',                    cliente: '',              emissao: '23/12/2025', codBarras: '83660000000-1 91290060037-2 80012025120-9 09000060187' },
  { id: 12710885, refMes: '11', refAno: '2025', valor: '57,52',  vencimento: '09/12/2025', situacao: 'Em aberto', situacaoTone: 'pending',   situacaoData: '',      leitura: 541,  leituraData: '25/11', consumo: 9,  foto: false, pagamento: null,         tipoFatura: 'Normal',    tipoEmissao: 'Manual',             spc: 'Nada Consta', entrega: 'Correios',  email: '',                    cliente: '',              emissao: '25/11/2025', codBarras: '83660000000-1 91290060037-2 80012025110-9 09000057527' },
  { id: 12640228, refMes: '10', refAno: '2025', valor: '24,08',  vencimento: '09/11/2025', situacao: 'Cancelada', situacaoTone: 'cancelled', situacaoData: '01/11', leitura: null, leituraData: '—',     consumo: 0,  foto: false, pagamento: null,         tipoFatura: 'Reemissão', tipoEmissao: 'Manual',             spc: 'Nada Consta', entrega: '',          email: '',                    cliente: '',              emissao: '24/10/2025', codBarras: '83660000000-1 91290060037-2 80012025100-9 09000024087' },
  { id: 12570077, refMes: '09', refAno: '2025', valor: '62,01',  vencimento: '09/10/2025', situacao: 'Quitada',   situacaoTone: 'active',    situacaoData: '08/10', leitura: 532,  leituraData: '24/09', consumo: 11, foto: true,  pagamento: '08/10/2025', tipoFatura: 'Normal',    tipoEmissao: 'Automático Coletor', spc: 'Nada Consta', entrega: 'E-mail',    email: 'rogerio@example.com', cliente: 'ROGERIO ONIESKO', emissao: '24/09/2025', codBarras: '83660000000-1 91290060037-2 80012025090-9 09000062017' },
  { id: 12499051, refMes: '08', refAno: '2025', valor: '55,19',  vencimento: '09/09/2025', situacao: 'Quitada',   situacaoTone: 'active',    situacaoData: '06/09', leitura: 521,  leituraData: '22/08', consumo: 8,  foto: true,  pagamento: '06/09/2025', tipoFatura: 'Normal',    tipoEmissao: 'Automático Coletor', spc: 'Nada Consta', entrega: '',          email: '',                    cliente: '',              emissao: '22/08/2025', codBarras: '83660000000-1 91290060037-2 80012025080-9 09000055197' },
  { id: 12428503, refMes: '07', refAno: '2025', valor: '59,44',  vencimento: '09/08/2025', situacao: 'Em aberto', situacaoTone: 'pending',   situacaoData: '',      leitura: 513,  leituraData: '24/07', consumo: 10, foto: false, pagamento: null,         tipoFatura: 'Normal',    tipoEmissao: 'Manual',             spc: 'Pendente',    entrega: 'Correios',  email: '',                    cliente: '',              emissao: '24/07/2025', codBarras: '83660000000-1 91290060037-2 80012025070-9 09000059447' },
])

const filteredRows = computed(() => rows.value)

// ── Seleção ───────────────────────────────────────────────────
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

// ── Detalhe ───────────────────────────────────────────────────
const detailOpen = ref(false)
const detailRow  = ref<Row | null>(null)

function openDetail(row: Row) { detailRow.value = row; detailOpen.value = true }
function rowAction(action: string, row: Row) { console.log('[AtenderClaude]', action, row.id) }
</script>

<style lang="scss" scoped>
// ================================================================
//  TestAtenderSolicitacoesClaude
//  Layout fiel ao Sansys Water — apenas tokens DSS, zero hardcoded.
//
//  Convenção de opacidade sobre superfícies escuras (appbar/sidenav):
//  background: var(--dss-text-inverse) + opacity: var(--dss-opacity-*)
//  via ::after (Princípio #8) — efeitos visuais sempre em ::after.
// ================================================================

// ── Raiz ─────────────────────────────────────────────────────────
.as-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: var(--dss-surface-muted);
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-sm);
}

// ── App Bar ───────────────────────────────────────────────────────
// 52px → --dss-form-control-height-lg
.as-appbar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--dss-form-control-height-lg);
  padding: 0 var(--dss-spacing-4);
  background: var(--dss-action-primary);
  box-shadow: var(--dss-shadow-md);
  z-index: var(--dss-z-index-fixed);

  &__left, &__right {
    display: flex;
    align-items: center;
    gap: var(--dss-spacing-2);
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: var(--dss-spacing-1);
  }

  &__logo-text {
    font-size: var(--dss-font-size-sm);
    font-weight: var(--dss-font-weight-normal);
    color: var(--dss-text-inverse);
    letter-spacing: 0.3px;
    strong { font-weight: var(--dss-font-weight-bold); }
    em     { font-style: normal; font-weight: var(--dss-font-weight-light); opacity: var(--dss-opacity-90); }
  }

  // 1px × 24px — separador decorativo pipe
  &__pipe {
    width: var(--dss-border-width-thin);
    height: var(--dss-compact-control-height-sm);
    background: var(--dss-text-inverse);
    opacity: var(--dss-opacity-30);
    margin: 0 var(--dss-spacing-2);
  }

  &__title {
    font-size: var(--dss-font-size-sm);
    font-weight: var(--dss-font-weight-medium);
    color: var(--dss-text-inverse);
    margin: 0;
    letter-spacing: 0.2px;
  }

  &__notif-wrap {
    position: relative;
    display: inline-flex;
  }

  // Badge posicionada via token — sem inline style
  &__notif-badge {
    top: var(--dss-spacing-1) !important;
    right: var(--dss-spacing-1) !important;
  }

  // Hover via ::after (Princípio #8 — efeitos visuais em ::after)
  &__icon-btn {
    position: relative;
    overflow: hidden;
    color: var(--dss-text-inverse) !important;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--dss-text-inverse);
      opacity: 0;
      pointer-events: none;
      border-radius: inherit;
      transition: opacity var(--dss-duration-200) var(--dss-easing-standard);
    }

    &:hover::after { opacity: var(--dss-opacity-15); }
  }
}

// ── Layout: sidenav + main ───────────────────────────────────────
.as-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

// ── Side Nav ─────────────────────────────────────────────────────
// 52px → --dss-form-control-height-lg (mesma largura que a altura do appbar)
.as-sidenav {
  width: var(--dss-form-control-height-lg);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--dss-spacing-3) 0;
  gap: var(--dss-spacing-1);
  background: var(--dss-action-primary);
  overflow-y: auto;
  overflow-x: hidden;

  &__btn {
    position: relative;
    overflow: hidden;
    color: var(--dss-text-inverse) !important;
    opacity: var(--dss-opacity-70);
    transition: opacity var(--dss-duration-200) var(--dss-easing-standard);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--dss-text-inverse);
      opacity: 0;
      pointer-events: none;
      border-radius: inherit;
      transition: opacity var(--dss-duration-200) var(--dss-easing-standard);
    }

    &:hover {
      opacity: 1;
      &::after { opacity: var(--dss-opacity-15); }
    }

    // Item ativo: opacidade total + overlay persistente
    &--active {
      opacity: 1;
      &::after { opacity: var(--dss-opacity-20); }
    }
  }
}

// ── Main Content ─────────────────────────────────────────────────
.as-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

// ── Breadcrumb ───────────────────────────────────────────────────
.as-breadcrumb {
  flex-shrink: 0;
  padding: var(--dss-spacing-2) var(--dss-spacing-5);
  background: var(--dss-surface-default);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-border-default);

  :deep(.q-breadcrumbs__el) {
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-subtle);
    font-weight: var(--dss-font-weight-medium);
  }

  :deep(.q-breadcrumbs__el--last) {
    color: var(--dss-text-body);
    font-weight: var(--dss-font-weight-semibold);
  }
}

// ── Client Card ──────────────────────────────────────────────────
.as-client-card {
  flex-shrink: 0;
  background: var(--dss-surface-default);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-border-default);
  padding: var(--dss-spacing-3) var(--dss-spacing-5);

  &__grid {
    display: grid;
    grid-template-columns: auto 1fr 1fr 1fr auto;
    gap: var(--dss-spacing-5);
    align-items: start;
  }
}

// Coluna de identificação (esquerda)
.as-client-id {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dss-spacing-2);
  text-align: center;
  padding-right: var(--dss-spacing-4);
  border-right: var(--dss-border-width-thin) solid var(--dss-border-default);

  &__avatar-wrap { position: relative; display: inline-flex; }

  &__avatar-badge {
    top: 0 !important;
    right: 0 !important;
  }

  &__code {
    font-size: var(--dss-font-size-lg);
    font-weight: var(--dss-font-weight-bold);
    color: var(--dss-text-body);
    letter-spacing: 0.5px;
    line-height: var(--dss-line-height-snug);
  }

  // 32px → compact-control-height-lg
  &__details-btn {
    font-size: var(--dss-font-size-xs) !important;
    padding: 0 var(--dss-spacing-3) !important;
  }
}

// ── KV pairs ─────────────────────────────────────────────────────
.as-kv-group {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1_5);
  margin: 0;
}

.as-kv {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--dss-spacing-1);
  font-size: var(--dss-font-size-xs);
  line-height: var(--dss-line-height-normal);

  dt {
    color: var(--dss-text-subtle);
    font-weight: var(--dss-font-weight-medium);
    white-space: nowrap;
    flex-shrink: 0;
  }

  dd {
    color: var(--dss-text-body);
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: var(--dss-spacing-1);
  }

  &--inline { align-items: center; }
  &--muted  { dt, dd { color: var(--dss-text-muted); } }

  // 20px → --dss-compact-control-height-xs
  &__icon-link {
    width:     var(--dss-compact-control-height-xs) !important;
    height:    var(--dss-compact-control-height-xs) !important;
    min-width: var(--dss-compact-control-height-xs) !important;
    padding: 0 !important;

    :deep(.dss-button__icon) { font-size: var(--dss-font-size-sm); }
  }
}

// Status inline (sem chip — conforme referência visual)
.as-status {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-semibold);

  &--active   { color: var(--dss-feedback-success); }
  &--inactive { color: var(--dss-feedback-error); }
  &--neutral  { color: var(--dss-text-body); }
}

// ── Client Rail ──────────────────────────────────────────────────
.as-client-rail {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  padding-left: var(--dss-spacing-4);
  border-left: var(--dss-border-width-thin) solid var(--dss-border-default);
  align-items: center;

  &__item { position: relative; }
  // 40px → --dss-spacing-10
  &__btn  { min-width: var(--dss-spacing-10) !important; }
}

.as-badge-wrap { position: relative; display: inline-flex; }

.as-rail__cart-badge {
  top:   var(--dss-spacing-0_5) !important;
  right: var(--dss-spacing-0_5) !important;
}

// ── Tabs Bar ─────────────────────────────────────────────────────
.as-tabs-bar {
  flex-shrink: 0;
  background: var(--dss-action-primary);
  overflow: hidden;
}

.as-tabs {
  // Tab inativo: opacidade reduzida
  :deep(.q-tab) {
    color: var(--dss-text-inverse) !important;
    opacity: var(--dss-opacity-75);
    // 44px → --dss-spacing-11
    min-height: var(--dss-spacing-11);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: opacity var(--dss-duration-200) var(--dss-easing-standard),
                background var(--dss-duration-200) var(--dss-easing-standard);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--dss-text-inverse);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--dss-duration-200) var(--dss-easing-standard);
    }

    &:hover:not(.q-tab--active) {
      opacity: 1;
      &::after { opacity: var(--dss-opacity-10); }
    }
  }

  // Tab ativo: opacidade total
  :deep(.q-tab--active) {
    opacity: 1;
    font-weight: var(--dss-font-weight-semibold);
  }

  // Indicador branco 3px na base — border-width-thick: 3px
  :deep(.q-tab__indicator) {
    background: var(--dss-text-inverse);
    height: var(--dss-border-width-thick);
  }

  // Ícone e label lado a lado (igual à imagem de referência)
  :deep(.q-tab__content) {
    flex-direction: row;
    align-items: center;
    gap: var(--dss-spacing-1_5);
  }

  :deep(.q-tab__icon) {
    margin-bottom: 0;
    font-size: var(--dss-font-size-lg);
  }

  :deep(.q-tab__label) {
    padding-top: 0;
    font-size: var(--dss-font-size-xs);
  }
}

// ── Page Content ─────────────────────────────────────────────────
.as-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-4) var(--dss-spacing-5) var(--dss-spacing-10);
}

// ── Section Header ────────────────────────────────────────────────
.as-section-header {
  padding-bottom: var(--dss-spacing-2);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-border-default);
}

.as-section-title {
  font-size: var(--dss-font-size-base);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  margin: 0;
  letter-spacing: 0.1px;
  position: relative;
  display: inline-block;
  padding-bottom: var(--dss-spacing-2);

  // Underline decorativo (Princípio #8 — ::after para efeitos visuais)
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: calc(var(--dss-border-width-thin) * -1);
    width: 100%;
    height: var(--dss-border-width-md);
    background: var(--dss-action-primary);
    border-radius: var(--dss-border-width-thin);
  }
}

// ── Toolbar ───────────────────────────────────────────────────────
.as-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--dss-spacing-1_5);
  padding: var(--dss-spacing-2_5) var(--dss-spacing-3);
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-sm);

  // 32px → compact-control-height-lg
  &__btn {
    font-size: var(--dss-font-size-xs) !important;
    height: var(--dss-compact-control-height-lg) !important;
    min-height: var(--dss-compact-control-height-lg) !important;

    :deep(.dss-button__label) { font-size: var(--dss-font-size-xs); }
    :deep(.dss-button__icon)  { font-size: var(--dss-font-size-md); }
  }
}

// ── Table ────────────────────────────────────────────────────────
.as-table-wrap {
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-sm);
  overflow: hidden;
  box-shadow: var(--dss-shadow-xs);
}

// Grid de colunas da tabela
.as-tgrid {
  display: grid;
  grid-template-columns:
    var(--dss-spacing-9)    // checkbox 36px
    var(--dss-spacing-20)   // ref 80px
    1.4fr                   // valor / vencimento
    1.2fr                   // situação
    1fr                     // leitura
    var(--dss-spacing-20)   // consumo 80px
    var(--dss-spacing-20)   // foto 80px
    1.2fr                   // data pagamento
    var(--dss-spacing-24);  // ações 96px
  align-items: center;
  gap: var(--dss-spacing-3);

  // 10px → spacing-2_5
  padding: var(--dss-spacing-2_5) var(--dss-spacing-3);

  &--header {
    background: var(--dss-surface-subtle);
    color: var(--dss-text-subtle);
    font-size: var(--dss-font-size-xs);
    font-weight: var(--dss-font-weight-semibold);
    letter-spacing: 0.2px;
    border-bottom: var(--dss-border-width-thin) solid var(--dss-border-default);
    // 36px → spacing-9
    min-height: var(--dss-spacing-9);
  }
}

.as-tcell {
  min-width: 0;
  overflow: hidden;

  &--check   { display: flex; align-items: center; padding-left: var(--dss-spacing-3); }
  &--ref     { display: flex; flex-direction: column; align-items: center; text-align: center; }
  &--center  { text-align: center; justify-self: center; }
  &--actions { display: flex; align-items: center; justify-content: flex-end; gap: var(--dss-spacing-1); }
}

// Ref da fatura (mês/ano empilhados)
.as-ref-month {
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-bold);
  color: var(--dss-text-body);
  line-height: 1;
}
.as-ref-year {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  line-height: var(--dss-line-height-snug);
}

// Valor/texto primário e secundário da célula
.as-cell-primary {
  display: block;
  font-weight: var(--dss-font-weight-semibold);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-body);
  line-height: var(--dss-line-height-snug);
}

.as-cell-secondary {
  // 11px sem token → --dss-font-size-xs (12px), menor disponível
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  margin-top: var(--dss-spacing-0_5);
  line-height: var(--dss-line-height-snug);
  display: block;

  strong { font-weight: var(--dss-font-weight-semibold); }
}

// Status colorido na tabela (sem chip — padrão do sistema legado)
.as-status-text {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-semibold);
  display: block;
  line-height: var(--dss-line-height-snug);

  &--active    { color: var(--dss-feedback-success); }
  &--pending   { color: var(--dss-feedback-warning); }
  &--overdue   { color: var(--dss-feedback-error); }
  &--cancelled { color: var(--dss-text-muted); }
  &--neutral   { color: var(--dss-text-subtle); }
}

.as-muted { color: var(--dss-text-subtle); font-size: var(--dss-font-size-xs); }
.as-mono  {
  font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
  font-size: var(--dss-font-size-xs);
  letter-spacing: 0.3px;
}

// Linhas da tabela (DssExpansionItem)
.as-trow {
  border-top: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  background: var(--dss-surface-default);
  transition: background var(--dss-duration-200) var(--dss-easing-standard);

  &:hover { background: var(--dss-surface-hover); }
  &--selected { background: var(--dss-surface-selected); }

  // 52px → spacing-13 (altura da linha de dados)
  :deep(.q-expansion-item__container > .q-item) {
    padding: 0;
    min-height: var(--dss-spacing-13);
  }
  :deep(.q-item__section--side) { padding-right: var(--dss-spacing-2); }
}

// Botões de ação inline compactos: 28px → compact-control-height-md
.as-action-btn {
  width:     var(--dss-compact-control-height-md) !important;
  height:    var(--dss-compact-control-height-md) !important;
  min-width: var(--dss-compact-control-height-md) !important;

  :deep(.dss-button__icon) { font-size: var(--dss-font-size-md); }
}

// Detail panel (linha expandida)
.as-detail-panel {
  background: var(--dss-surface-subtle);
  border-top: var(--dss-border-width-thin) solid var(--dss-border-default);
  padding: var(--dss-spacing-4) var(--dss-spacing-5);
  animation: as-slide-in var(--dss-duration-200) var(--dss-easing-standard) both;
}

@keyframes as-slide-in {
  from { opacity: 0; transform: translateY(calc(var(--dss-spacing-2) * -1)); }
  to   { opacity: 1; transform: translateY(0); }
}

.as-detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--dss-spacing-3) var(--dss-spacing-5);
}

.as-detail-kv {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-0_5);

  &--full { grid-column: 1 / -1; }

  dt {
    font-size: var(--dss-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: var(--dss-text-subtle);
    font-weight: var(--dss-font-weight-semibold);
    margin: 0;
  }

  dd {
    font-size: var(--dss-font-size-xs);
    font-weight: var(--dss-font-weight-medium);
    color: var(--dss-text-body);
    margin: 0;
    line-height: var(--dss-line-height-normal);
  }
}

// ── Selection Bar (sticky) ────────────────────────────────────────
.as-selection-bar {
  position: sticky;
  bottom: var(--dss-spacing-3);
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-md);
  box-shadow: var(--dss-shadow-lg);
}

.as-float-enter-active,
.as-float-leave-active {
  transition: opacity  var(--dss-duration-200) var(--dss-easing-standard),
              transform var(--dss-duration-200) var(--dss-easing-standard);
}
.as-float-enter-from,
.as-float-leave-to {
  opacity: 0;
  transform: translateY(var(--dss-spacing-2));
}

// ── Detail Dialog ────────────────────────────────────────────────
.as-modal {
  width: 100%;
  max-width: min(560px, 95vw);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--dss-spacing-4) var(--dss-spacing-5);
  }

  &__eyebrow {
    display: block;
    font-size: var(--dss-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--dss-text-subtle);
    font-weight: var(--dss-font-weight-semibold);
  }

  &__title {
    margin: var(--dss-spacing-1) 0 0;
    font-size: var(--dss-font-size-lg);
    font-weight: var(--dss-font-weight-semibold);
    color: var(--dss-text-body);
  }

  &__body {
    display: flex;
    flex-direction: column;
    padding: var(--dss-spacing-4) var(--dss-spacing-5);
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--dss-spacing-3);
    font-size: var(--dss-font-size-sm);
    padding: var(--dss-spacing-2_5) 0;
    border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);

    &:last-child { border-bottom: none; }
  }

  &__label {
    color: var(--dss-text-subtle);
    font-weight: var(--dss-font-weight-medium);
    white-space: nowrap;
  }
}
</style>
