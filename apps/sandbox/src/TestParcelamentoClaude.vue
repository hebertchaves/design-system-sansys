<template>
  <div class="pc-page" data-brand="water">

    <!-- ================================================================
         1. APP BAR
         ================================================================ -->
    <header class="pc-appbar" role="banner">
      <div class="pc-appbar__left">
        <DssButton
          variant="flat" round size="sm" icon="menu" color="white"
          aria-label="Menu principal" class="pc-appbar__icon-btn"
        />
        <div class="pc-appbar__logo" aria-label="Sansys Water">
          <DssIcon name="water_drop" size="xs" color="white" />
          <span class="pc-appbar__logo-text">
            <strong>sansys</strong><em>water</em>
          </span>
        </div>
        <div class="pc-appbar__pipe" aria-hidden="true" />
        <h1 class="pc-appbar__title">Atendimento</h1>
      </div>

      <div class="pc-appbar__right" role="toolbar" aria-label="Ações globais">
        <DssButton
          variant="flat" round size="sm" icon="help_outline" color="white"
          aria-label="Central de ajuda" class="pc-appbar__icon-btn"
        >
          <DssTooltip anchor="bottom middle" self="top middle">Central de ajuda</DssTooltip>
        </DssButton>

        <div class="pc-appbar__notif-wrap">
          <DssButton
            variant="flat" round size="sm" icon="notifications" color="white"
            aria-label="2 novas notificações" class="pc-appbar__icon-btn"
          >
            <DssTooltip anchor="bottom middle" self="top middle">Notificações</DssTooltip>
          </DssButton>
          <DssBadge
            floating color="negative"
            style="top:4px; right:4px;"
            aria-label="2 notificações não lidas"
          >2</DssBadge>
        </div>

        <DssButton
          variant="flat" round size="sm" icon="apps" color="white"
          aria-label="Aplicativos Sansys" class="pc-appbar__icon-btn"
        >
          <DssTooltip anchor="bottom middle" self="top middle">Aplicativos Sansys</DssTooltip>
        </DssButton>

        <DssButton
          variant="flat" round size="sm" icon="account_circle" color="white"
          aria-label="Conta do usuário" class="pc-appbar__icon-btn"
        >
          <DssTooltip anchor="bottom middle" self="top middle">Minha conta</DssTooltip>
        </DssButton>
      </div>
    </header>

    <!-- ================================================================
         2. SIDE NAV (ícones)
         ================================================================ -->
    <div class="pc-layout">
      <nav class="pc-sidenav" aria-label="Navegação do módulo">
        <DssButton v-for="nav in sideNav" :key="nav.icon"
          variant="flat" round size="sm" :icon="nav.icon" color="white"
          :aria-label="nav.label" class="pc-sidenav__btn"
          :class="{ 'pc-sidenav__btn--active': nav.active }"
        >
          <DssTooltip anchor="center right" self="center left">{{ nav.label }}</DssTooltip>
        </DssButton>
      </nav>

      <!-- ============================================================
           3. MAIN CONTENT
           ============================================================ -->
      <main class="pc-main" id="main-content">

        <!-- 3a. BREADCRUMB -->
        <nav class="pc-breadcrumb" aria-label="Trilha de navegação">
          <DssBreadcrumbs separator="›" active-color="primary">
            <DssBreadcrumbsEl label="Atendimento" icon="filter_1" />
            <DssBreadcrumbsEl label="Matrícula"   icon="filter_2" />
            <DssBreadcrumbsEl label="Financeiro"  icon="filter_3" />
            <DssBreadcrumbsEl label="Parcelamento" icon="filter_4" />
          </DssBreadcrumbs>
        </nav>

        <!-- 3b. CLIENT HEADER CARD -->
        <DssCard class="pc-client-card" role="region" aria-label="Dados do cliente">
          <div class="pc-client-card__grid">

            <!-- Col 1 — Identificação -->
            <div class="pc-client-id" aria-label="Código da matrícula">
              <div class="pc-client-id__avatar-wrap">
                <DssAvatar size="lg" icon="apartment" color="primary" />
                <DssBadge floating color="negative" style="top:0;right:0">!</DssBadge>
              </div>
              <span class="pc-client-id__code">652701-9</span>
              <DssButton
                variant="outlined" size="xs" color="primary"
                icon="add" label="DETALHES"
                class="pc-client-id__details-btn"
              >
                <DssTooltip>Ver detalhes da matrícula</DssTooltip>
              </DssButton>
            </div>

            <!-- Col 2 — Cadastro -->
            <dl class="pc-kv-group" aria-label="Dados de cadastro">
              <div class="pc-kv">
                <dt>Proprietário:</dt>
                <dd>
                  (CPF: 000.000.000-00) - Nome e Sobrenome Proprietário
                  <DssButton variant="flat" round size="xs" icon="badge" color="primary"
                    aria-label="Ver documento do proprietário" class="pc-kv__icon-link">
                    <DssTooltip>Ver CPF/documento</DssTooltip>
                  </DssButton>
                </dd>
              </div>
              <div class="pc-kv">
                <dt>Morador:</dt>
                <dd>
                  (CPF: 000.000.000-00) - Nome e Sobrenome Proprietário
                  <DssButton variant="flat" round size="xs" icon="badge" color="primary"
                    aria-label="Ver documento do morador" class="pc-kv__icon-link">
                    <DssTooltip>Ver CPF/documento</DssTooltip>
                  </DssButton>
                </dd>
              </div>
              <div class="pc-kv">
                <dt>Endereço:</dt>
                <dd>Rua logradouro do Usuário, 123 - 00000-000 - Bairro, Cidade - UF - Complemento</dd>
              </div>
              <div class="pc-kv pc-kv--muted">
                <dt>Label:</dt>
                <dd>Content</dd>
              </div>
            </dl>

            <!-- Col 3 — Dados técnicos -->
            <dl class="pc-kv-group" aria-label="Dados técnicos">
              <div class="pc-kv">
                <dt>Rota Leitura:</dt>
                <dd>0000.000.00</dd>
              </div>
              <div class="pc-kv">
                <dt>Localização:</dt>
                <dd>00.00.0000.0000.0000.0000</dd>
              </div>
              <div class="pc-kv">
                <dt>Tipo de Cobrança / Tipo Unidade:</dt>
                <dd>Pagamento Caixa / Norma</dd>
              </div>
              <div class="pc-kv pc-kv--muted">
                <dt>Label:</dt>
                <dd>Content</dd>
              </div>
            </dl>

            <!-- Col 4 — Status de ligações -->
            <dl class="pc-kv-group" aria-label="Status de ligações">
              <div class="pc-kv pc-kv--inline">
                <dt>Ligação água:</dt>
                <dd>
                  <span class="pc-status pc-status--active" role="status">Ativa</span>
                </dd>
              </div>
              <div class="pc-kv pc-kv--inline">
                <dt>Ligação esgoto:</dt>
                <dd>
                  <span class="pc-status pc-status--inactive" role="status">Inativa</span>
                </dd>
              </div>
              <div class="pc-kv pc-kv--inline">
                <dt>Situação Lixo:</dt>
                <dd>
                  <span class="pc-status pc-status--neutral" role="status">
                    Ativa (Cobrança na Fatura)
                  </span>
                </dd>
              </div>
              <div class="pc-kv pc-kv--muted">
                <dt>Label:</dt>
                <dd>Content</dd>
              </div>
            </dl>

            <!-- Col 5 — Rail de ações -->
            <div class="pc-client-rail" role="group" aria-label="Ações rápidas">
              <div class="pc-client-rail__item">
                <DssButton
                  variant="elevated" size="sm" icon="shopping_cart"
                  color="primary" round aria-label="Carrinho de serviços (2)"
                  class="pc-client-rail__btn"
                >
                  <DssBadge floating color="negative" style="top:0;right:0">2</DssBadge>
                  <DssTooltip anchor="center left" self="center right">Carrinho (2 itens)</DssTooltip>
                </DssButton>
              </div>
              <div class="pc-client-rail__item">
                <DssButton
                  variant="outlined" size="sm" icon="add"
                  color="primary" round aria-label="Novo atendimento"
                  class="pc-client-rail__btn"
                >
                  <DssTooltip anchor="center left" self="center right">Novo atendimento</DssTooltip>
                </DssButton>
              </div>
              <div class="pc-client-rail__item">
                <DssButton
                  variant="flat" size="sm" icon="remove"
                  color="primary" round aria-label="Recolher cabeçalho"
                  class="pc-client-rail__btn"
                >
                  <DssTooltip anchor="center left" self="center right">Recolher cabeçalho</DssTooltip>
                </DssButton>
              </div>
            </div>

          </div>
        </DssCard>

        <!-- 3c. MODULE TABS BAR -->
        <div class="pc-tabs-bar" role="navigation" aria-label="Módulos do atendimento">
          <DssTabs
            v-model="activeModule"
            align="justify"
            active-color="white"
            indicator-color="white"
            class="pc-tabs"
          >
            <DssTab
              v-for="tab in moduleTabs"
              :key="tab.value"
              :name="tab.value"
              :icon="tab.icon"
              :label="tab.label"
              :aria-label="tab.label"
              class="pc-tab"
              :class="{ 'pc-tab--active': activeModule === tab.value }"
            >
              <DssTooltip v-if="tab.hasDropdown" anchor="bottom middle" self="top middle">
                Expandir {{ tab.label }}
              </DssTooltip>
            </DssTab>
          </DssTabs>
        </div>

        <!-- 3d. PAGE CONTENT -->
        <div class="pc-content">

          <!-- Section title -->
          <div class="pc-section-header">
            <h2 class="pc-section-title">Parcelamento</h2>
          </div>

          <!-- Action Toolbar -->
          <div class="pc-toolbar" role="toolbar" aria-label="Ações de parcelamento">
            <DssButton
              v-for="action in toolbarActions"
              :key="action.id"
              variant="outlined"
              size="sm"
              :icon="action.icon"
              :label="action.label"
              :color="action.color || 'primary'"
              :aria-label="action.ariaLabel"
              class="pc-toolbar__btn"
              @click="handleToolbarAction(action.id)"
            >
              <DssTooltip anchor="bottom middle" self="top middle">{{ action.ariaLabel }}</DssTooltip>
            </DssButton>
          </div>

          <!-- Data Table -->
          <div class="pc-table-wrap" role="region" aria-label="Lista de parcelamentos">
            <DssMarkupTable
              separator="horizontal"
              flat
              class="pc-table"
              aria-label="Negociações de parcelamento"
            >
              <thead>
                <tr>
                  <th class="pc-col-check" scope="col">
                    <DssCheckbox
                      v-model="allSelected"
                      :indeterminate="isIndeterminate"
                      color="primary"
                      size="sm"
                      aria-label="Selecionar todos"
                      @update:model-value="toggleAll"
                    />
                  </th>
                  <th scope="col">Código</th>
                  <th scope="col">Valor total</th>
                  <th scope="col">Parcela à Vista</th>
                  <th scope="col">Valor Parcela</th>
                  <th scope="col">Situação</th>
                  <th scope="col">Tipo Negociação</th>
                  <th class="pc-col-center" scope="col">Controle Corte</th>
                  <th class="pc-col-actions" scope="col" aria-label="Ações da linha"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in rows"
                  :key="row.id"
                  :class="{
                    'pc-row--selected': isSelected(row.id),
                    'pc-row--expanded': expandedRow === row.id,
                  }"
                  :aria-selected="isSelected(row.id)"
                >
                  <!-- Checkbox -->
                  <td class="pc-col-check">
                    <DssCheckbox
                      :model-value="isSelected(row.id)"
                      color="primary"
                      size="sm"
                      :aria-label="`Selecionar parcelamento ${row.codigo}`"
                      @update:model-value="toggleRow(row.id)"
                    />
                  </td>

                  <!-- Código -->
                  <td class="pc-cell-code">{{ row.codigo }}</td>

                  <!-- Valor total + data emissão -->
                  <td>
                    <div class="pc-cell-primary">R$ {{ row.valorTotal }}</div>
                    <div class="pc-cell-secondary">
                      Emissão: <strong>{{ row.emissao }}</strong>
                    </div>
                  </td>

                  <!-- Parcela à Vista -->
                  <td>
                    <div class="pc-cell-primary">R$ {{ row.parcelaVista }}</div>
                  </td>

                  <!-- Valor Parcela + nº parcelas -->
                  <td>
                    <div class="pc-cell-primary">R$ {{ row.valorParcela }}</div>
                    <div class="pc-cell-secondary">
                      Nº de parcela: <strong>{{ row.numParcelas }}</strong>
                    </div>
                  </td>

                  <!-- Situação — texto colorido, sem chip -->
                  <td>
                    <span
                      class="pc-status-text"
                      :class="`pc-status-text--${statusClass(row.situacao)}`"
                      :aria-label="`Situação: ${row.situacao}`"
                    >{{ row.situacao }}</span>
                  </td>

                  <!-- Tipo Negociação — texto puro -->
                  <td class="pc-cell-tipo">{{ row.tipo }}</td>

                  <!-- Controle Corte — ícone variante por estado -->
                  <td class="pc-col-center">
                    <DssButton
                      variant="flat" round size="xs"
                      :icon="row.controleCorte ? 'content_cut' : 'content_cut'"
                      :color="row.controleCorte ? 'primary' : 'grey-4'"
                      :aria-label="row.controleCorte ? 'Sob controle de corte' : 'Sem controle de corte'"
                      :aria-pressed="row.controleCorte"
                      class="pc-action-btn"
                      @click="toggleCorte(row)"
                    >
                      <DssTooltip anchor="top middle" self="bottom middle">
                        {{ row.controleCorte ? 'Sob controle de corte' : 'Sem controle de corte' }}
                      </DssTooltip>
                    </DssButton>
                  </td>

                  <!-- Ações inline: visibility + expand -->
                  <td class="pc-col-actions">
                    <DssButton
                      variant="flat" round size="xs" icon="visibility"
                      color="primary" aria-label="Visualizar detalhes"
                      class="pc-action-btn"
                      @click="openDetail(row)"
                    >
                      <DssTooltip anchor="top middle" self="bottom middle">
                        Visualizar parcelamento
                      </DssTooltip>
                    </DssButton>

                    <DssButton
                      variant="flat" round size="xs"
                      :icon="expandedRow === row.id ? 'expand_less' : 'expand_more'"
                      color="primary"
                      :aria-expanded="expandedRow === row.id"
                      :aria-label="expandedRow === row.id ? 'Recolher linha' : 'Expandir linha'"
                      class="pc-action-btn"
                      @click="toggleExpand(row.id)"
                    />
                  </td>
                </tr>

                <!-- Linha expandida inline -->
                <template v-if="expandedRow">
                  <tr
                    v-for="row in rows.filter(r => r.id === expandedRow)"
                    :key="`exp-${row.id}`"
                    class="pc-row--detail"
                    aria-live="polite"
                  >
                    <td colspan="9">
                      <div class="pc-detail-panel">
                        <div class="pc-detail-grid">
                          <div class="pc-detail-item">
                            <span class="pc-detail-label">Código</span>
                            <span class="pc-detail-value">{{ row.codigo }}</span>
                          </div>
                          <div class="pc-detail-item">
                            <span class="pc-detail-label">Valor total</span>
                            <span class="pc-detail-value">R$ {{ row.valorTotal }}</span>
                          </div>
                          <div class="pc-detail-item">
                            <span class="pc-detail-label">Emissão</span>
                            <span class="pc-detail-value">{{ row.emissao }}</span>
                          </div>
                          <div class="pc-detail-item">
                            <span class="pc-detail-label">Parcela à Vista</span>
                            <span class="pc-detail-value">R$ {{ row.parcelaVista }}</span>
                          </div>
                          <div class="pc-detail-item">
                            <span class="pc-detail-label">Valor Parcela</span>
                            <span class="pc-detail-value">R$ {{ row.valorParcela }}</span>
                          </div>
                          <div class="pc-detail-item">
                            <span class="pc-detail-label">Nº Parcelas</span>
                            <span class="pc-detail-value">{{ row.numParcelas }}x</span>
                          </div>
                          <div class="pc-detail-item">
                            <span class="pc-detail-label">Situação</span>
                            <span
                              class="pc-status-text"
                              :class="`pc-status-text--${statusClass(row.situacao)}`"
                            >{{ row.situacao }}</span>
                          </div>
                          <div class="pc-detail-item">
                            <span class="pc-detail-label">Tipo</span>
                            <span class="pc-detail-value">{{ row.tipo }}</span>
                          </div>
                        </div>
                        <div class="pc-detail-actions">
                          <DssButton variant="flat" size="xs" color="primary"
                            label="Fechar" icon="close" @click="expandedRow = null" />
                          <DssButton variant="outlined" size="xs" color="primary"
                            icon="print" label="Imprimir boleto" />
                          <DssButton variant="outlined" size="xs" color="primary"
                            icon="history" label="Histórico" />
                          <DssButton variant="outlined" size="xs" color="negative"
                            icon="cancel" label="Cancelar" />
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </DssMarkupTable>
          </div>

          <!-- Selection floating bar -->
          <Transition name="pc-slide-up">
            <div v-if="selected.length" class="pc-selection-bar" role="status" aria-live="polite">
              <DssIcon name="check_circle" size="sm" color="primary" />
              <span class="pc-selection-bar__count">
                {{ selected.length }}
                {{ selected.length === 1 ? 'item selecionado' : 'itens selecionados' }}
              </span>
              <div class="pc-selection-bar__spacer" />
              <DssButton variant="flat" size="xs" color="primary"
                label="Limpar seleção" @click="selected = []" />
              <DssButton variant="outlined" size="xs" color="primary"
                icon="download" label="Exportar" />
              <DssButton variant="elevated" size="xs" color="primary"
                icon="print" label="Imprimir selecionados" />
            </div>
          </Transition>

        </div><!-- /pc-content -->
      </main>
    </div><!-- /pc-layout -->

    <!-- ================================================================
         MODAL DE DETALHE
         ================================================================ -->
    <DssDialog v-model:open="detailOpen" :maximized="false">
      <DssCard class="pc-modal">
        <header class="pc-modal__header">
          <div>
            <p class="pc-modal__eyebrow">Negociação · {{ detailRow?.codigo }}</p>
            <h3 class="pc-modal__title">Parcelamento</h3>
          </div>
          <DssButton variant="flat" round size="sm" icon="close"
            aria-label="Fechar modal" @click="detailOpen = false" />
        </header>

        <DssSeparator />

        <div class="pc-modal__body">
          <dl class="pc-modal__grid">
            <div class="pc-modal__row">
              <dt>Situação</dt>
              <dd>
                <span
                  class="pc-status-text"
                  :class="`pc-status-text--${statusClass(detailRow?.situacao)}`"
                >{{ detailRow?.situacao }}</span>
              </dd>
            </div>
            <div class="pc-modal__row">
              <dt>Valor total</dt>
              <dd><strong>R$ {{ detailRow?.valorTotal }}</strong></dd>
            </div>
            <div class="pc-modal__row">
              <dt>Parcela</dt>
              <dd>R$ {{ detailRow?.valorParcela }} × {{ detailRow?.numParcelas }}x</dd>
            </div>
            <div class="pc-modal__row">
              <dt>Parcela à Vista</dt>
              <dd>R$ {{ detailRow?.parcelaVista }}</dd>
            </div>
            <div class="pc-modal__row">
              <dt>Emissão</dt>
              <dd>{{ detailRow?.emissao }}</dd>
            </div>
            <div class="pc-modal__row">
              <dt>Tipo</dt>
              <dd>{{ detailRow?.tipo }}</dd>
            </div>
            <div class="pc-modal__row">
              <dt>Controle Corte</dt>
              <dd>
                <span :class="detailRow?.controleCorte ? 'pc-status-text--inactive' : 'pc-status-text--active'" class="pc-status-text">
                  {{ detailRow?.controleCorte ? 'Sob controle' : 'Sem controle' }}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <DssSeparator />

        <DssCardActions align="right">
          <DssButton variant="flat" label="Fechar" @click="detailOpen = false" />
          <DssButton variant="outlined" color="primary" icon="history" label="Histórico" />
          <DssButton variant="elevated" color="primary" icon="print" label="Imprimir boleto" />
        </DssCardActions>
      </DssCard>
    </DssDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// DSS imports
import DssIcon            from '@components/base/DssIcon/DssIcon.vue'
import DssAvatar          from '@components/base/DssAvatar/DssAvatar.vue'
import DssBadge           from '@components/base/DssBadge/DssBadge.vue'
import DssButton          from '@components/base/DssButton/DssButton.vue'
import DssBreadcrumbs     from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl   from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssCard            from '@components/base/DssCard/DssCard.vue'
import { DssCardActions } from '@components/base/DssCard/index.js'
import DssCheckbox        from '@components/base/DssCheckbox/DssCheckbox.vue'
import DssMarkupTable     from '@components/base/DssMarkupTable/DssMarkupTable.vue'
import DssSeparator       from '@components/base/DssSeparator/DssSeparator.vue'
import DssTabs            from '@components/base/DssTabs/DssTabs.vue'
import DssTab             from '@components/base/DssTab/DssTab.vue'
import DssTooltip         from '@components/base/DssTooltip/DssTooltip.vue'
import DssDialog          from '@components/composed/DssDialog/DssDialog.vue'

// ── Side Nav ──────────────────────────────────────────────────────────
const sideNav = [
  { icon: 'home',         label: 'Início',           active: false },
  { icon: 'business',     label: 'Matrículas',        active: true  },
  { icon: 'speed',        label: 'Leituras',          active: false },
  { icon: 'bar_chart',    label: 'Relatórios',        active: false },
  { icon: 'login',        label: 'Atendimento',       active: false },
  { icon: 'settings',     label: 'Configurações',     active: false },
  { icon: 'supervised_user_circle', label: 'Usuários', active: false },
]

// ── Module Tabs ───────────────────────────────────────────────────────
const moduleTabs = [
  { value: 'financeiro',  label: 'Financeiro',             icon: 'attach_money',    hasDropdown: true  },
  { value: 'cadastro',    label: 'Informações de Cadastro',icon: 'badge',           hasDropdown: true  },
  { value: 'os',          label: 'Ordem de Serviço',       icon: 'build',           hasDropdown: false },
  { value: 'leituras',    label: 'Leituras e Consumo',     icon: 'speed',           hasDropdown: true  },
  { value: 'cobrancas',   label: 'Cobranças',              icon: 'request_quote',   hasDropdown: true  },
  { value: 'atendimentos',label: 'Atendimentos',           icon: 'support_agent',   hasDropdown: true  },
]
const activeModule = ref('financeiro')

// ── Toolbar Actions ───────────────────────────────────────────────────
const toolbarActions = [
  { id: 'parcelar',    label: 'Parcelar',    icon: 'note_add',      color: 'primary', ariaLabel: 'Criar novo parcelamento' },
  { id: 'simular',     label: 'Simular',     icon: 'calculate',     color: 'primary', ariaLabel: 'Simular parcelamento'    },
  { id: 'reparcelar',  label: 'Reparcelar',  icon: 'event_repeat',  color: 'primary', ariaLabel: 'Reparcelar negociação'   },
  { id: 'antecipar',   label: 'Antecipar',   icon: 'fast_forward',  color: 'primary', ariaLabel: 'Antecipar parcelas'      },
  { id: 'cancelar',    label: 'Cancelar',    icon: 'block',         color: 'negative',ariaLabel: 'Cancelar negociação'     },
  { id: 'imprimir',    label: 'Imprimir',    icon: 'print',         color: 'primary', ariaLabel: 'Imprimir extrato'        },
  { id: 'campanhas',   label: 'Campanhas',   icon: 'campaign',      color: 'primary', ariaLabel: 'Ver campanhas vigentes'  },
]
function handleToolbarAction(id: string) {
  console.log('[PC] toolbar:', id)
}

// ── Row Data ──────────────────────────────────────────────────────────
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
  { id: 1, codigo: '28235', valorTotal: '16.051,02', emissao: '05/11/2024', parcelaVista: '0,00',     valorParcela: '267,25', numParcelas: 60, situacao: 'Pendente',  tipo: 'Parcelamento (Normal)',      controleCorte: true  },
  { id: 2, codigo: '28235', valorTotal: '16.051,02', emissao: '05/11/2024', parcelaVista: '0,00',     valorParcela: '267,25', numParcelas: 60, situacao: 'Pendente',  tipo: 'Parcelamento (Normal)',      controleCorte: false },
  { id: 3, codigo: '28235', valorTotal: '16.051,02', emissao: '05/11/2024', parcelaVista: '0,00',     valorParcela: '267,25', numParcelas: 60, situacao: 'Pendente',  tipo: 'Parcelamento (Normal)',      controleCorte: false },
  { id: 4, codigo: '28235', valorTotal: '16.051,02', emissao: '05/11/2024', parcelaVista: '0,00',     valorParcela: '267,25', numParcelas: 60, situacao: 'Pendente',  tipo: 'Parcelamento (Normal)',      controleCorte: false },
  { id: 5, codigo: '28235', valorTotal: '16.051,02', emissao: '05/11/2024', parcelaVista: '0,00',     valorParcela: '267,25', numParcelas: 60, situacao: 'Pendente',  tipo: 'Parcelamento (Normal)',      controleCorte: true  },
  { id: 6, codigo: '28235', valorTotal: '16.051,02', emissao: '05/11/2024', parcelaVista: '0,00',     valorParcela: '267,25', numParcelas: 60, situacao: 'Pendente',  tipo: 'Parcelamento (Normal)',      controleCorte: false },
  { id: 7, codigo: '28235', valorTotal: '16.051,02', emissao: '05/11/2024', parcelaVista: '0,00',     valorParcela: '267,25', numParcelas: 60, situacao: 'Pendente',  tipo: 'Parcelamento (Normal)',      controleCorte: false },
  { id: 8, codigo: '28235', valorTotal: '16.051,02', emissao: '05/11/2024', parcelaVista: '0,00',     valorParcela: '267,25', numParcelas: 60, situacao: 'Pendente',  tipo: 'Parcelamento (Normal)',      controleCorte: false },
])

// Classe de status para cor semântica via token
function statusClass(s?: Situacao | string): string {
  switch (s) {
    case 'Pago':      return 'active'    // success/positive
    case 'Pendente':  return 'pending'   // warning
    case 'Em atraso': return 'overdue'   // negative
    case 'Cancelado': return 'cancelled' // muted
    default:          return 'neutral'
  }
}

// ── Seleção ───────────────────────────────────────────────────────────
const selected = ref<number[]>([])

const allSelected = computed({
  get: () => selected.value.length === rows.value.length && rows.value.length > 0,
  set: (v: boolean) => { selected.value = v ? rows.value.map(r => r.id) : [] },
})

const isIndeterminate = computed(
  () => selected.value.length > 0 && selected.value.length < rows.value.length
)

function isSelected(id: number): boolean {
  return selected.value.includes(id)
}
function toggleAll(v: boolean) {
  selected.value = v ? rows.value.map(r => r.id) : []
}
function toggleRow(id: number) {
  const i = selected.value.indexOf(id)
  if (i === -1) selected.value.push(id)
  else selected.value.splice(i, 1)
}

// ── Expand row ────────────────────────────────────────────────────────
const expandedRow = ref<number | null>(null)
function toggleExpand(id: number) {
  expandedRow.value = expandedRow.value === id ? null : id
}

// ── Controle de corte ─────────────────────────────────────────────────
function toggleCorte(row: Row) {
  row.controleCorte = !row.controleCorte
}

// ── Detail modal ──────────────────────────────────────────────────────
const detailOpen = ref(false)
const detailRow  = ref<Row | null>(null)
function openDetail(row: Row) {
  detailRow.value = row
  detailOpen.value = true
}
</script>

<style lang="scss" scoped>
// ============================================================
//  TestParcelamentoClaude — Pixel-love fidelity
//  Todos os espaçamentos, cores e dimensões via tokens DSS.
//  data-brand="water" ativo na raiz.
// ============================================================

// ── Raiz da página ───────────────────────────────────────────
.pc-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--dss-surface-muted, #f5f6f8);
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-sm);
}

// ── App Bar ──────────────────────────────────────────────────
.pc-appbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 var(--dss-spacing-4);
  background: var(--dss-action-primary);
  box-shadow: var(--dss-shadow-md);
  position: sticky;
  top: 0;
  z-index: var(--dss-z-sticky, 100);

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
    font-size: 0.9375rem;
    font-weight: 400;
    color: var(--dss-text-inverse);
    letter-spacing: 0.3px;
    strong { font-weight: 700; }
    em     { font-style: normal; font-weight: 300; opacity: 0.9; }
  }

  &__pipe {
    width: 1px;
    height: 24px;
    background: rgba(255, 255, 255, 0.3);
    margin: 0 var(--dss-spacing-2);
  }

  &__title {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--dss-text-inverse);
    margin: 0;
    letter-spacing: 0.2px;
  }

  &__icon-btn {
    color: var(--dss-text-inverse) !important;
    transition: background var(--dss-duration-200) var(--dss-easing-standard);

    &:hover {
      background: rgba(255, 255, 255, 0.15) !important;
    }
  }

  &__notif-wrap {
    position: relative;
    display: inline-flex;
  }
}

// ── Layout (sidenav + main) ──────────────────────────────────
.pc-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

// ── Side Nav ─────────────────────────────────────────────────
.pc-sidenav {
  width: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--dss-spacing-3) 0;
  gap: var(--dss-spacing-1);
  background: var(--dss-action-primary);
  flex-shrink: 0;

  &__btn {
    color: rgba(255, 255, 255, 0.7) !important;
    transition: color var(--dss-duration-200),
                background var(--dss-duration-200);

    &:hover {
      color: var(--dss-text-inverse) !important;
      background: rgba(255, 255, 255, 0.15) !important;
    }

    &--active {
      color: var(--dss-text-inverse) !important;
      background: rgba(255, 255, 255, 0.2) !important;
    }
  }
}

// ── Main Content ─────────────────────────────────────────────
.pc-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

// ── Breadcrumb ───────────────────────────────────────────────
.pc-breadcrumb {
  padding: var(--dss-spacing-2) var(--dss-spacing-5);
  background: var(--dss-surface-default, #fff);
  border-bottom: 1px solid var(--dss-border-default);

  :deep(.q-breadcrumbs__el) {
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-subtle);
    font-weight: 500;
  }

  :deep(.q-breadcrumbs__el--last) {
    color: var(--dss-text-body);
    font-weight: 600;
  }
}

// ── Client Card ──────────────────────────────────────────────
.pc-client-card {
  margin: var(--dss-spacing-4) var(--dss-spacing-5) 0;
  padding: var(--dss-spacing-4);
  box-shadow: var(--dss-shadow-sm);
  border: 1px solid var(--dss-border-default);

  &__grid {
    display: grid;
    grid-template-columns: 130px 1fr 1fr 1fr auto;
    gap: var(--dss-spacing-5);
    align-items: start;
  }
}

// ── Client ID column ─────────────────────────────────────────
.pc-client-id {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dss-spacing-2);
  text-align: center;

  &__avatar-wrap {
    position: relative;
    display: inline-flex;
  }

  &__code {
    font-size: var(--dss-font-size-lg);
    font-weight: 700;
    color: var(--dss-text-body);
    letter-spacing: 0.5px;
  }

  &__details-btn {
    font-size: var(--dss-font-size-xs) !important;
    padding: 0 var(--dss-spacing-3) !important;
    height: 26px !important;
    min-height: 26px !important;
  }
}

// ── KV pairs ─────────────────────────────────────────────────
.pc-kv-group {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1_5);
  margin: 0;
}

.pc-kv {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--dss-spacing-1);
  font-size: var(--dss-font-size-xs);
  line-height: 1.5;

  dt {
    color: var(--dss-text-subtle);
    font-weight: 500;
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

  &__icon-link {
    // Botão minúsculo para badge inline
    width: 20px  !important;
    height: 20px !important;
    min-width: 20px !important;
    min-height: 20px !important;
    padding: 0 !important;

    :deep(.dss-button__icon) { font-size: 0.875rem; }
  }
}

// ── Status text (inline, sem chip) ───────────────────────────
.pc-status {
  font-size: var(--dss-font-size-xs);
  font-weight: 600;

  &--active   { color: var(--dss-feedback-success, #22c55e); }
  &--inactive { color: var(--dss-feedback-error, #ef4444); }
  &--neutral  { color: var(--dss-text-body); }
}

// ── Client Rail ───────────────────────────────────────────────
.pc-client-rail {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  padding-left: var(--dss-spacing-4);
  border-left: 1px solid var(--dss-border-default);
  align-items: center;

  &__item { position: relative; }
  &__btn  { min-width: 40px !important; }
}

// ── Tabs bar ─────────────────────────────────────────────────
.pc-tabs-bar {
  margin: var(--dss-spacing-4) var(--dss-spacing-5) 0;
  background: var(--dss-action-primary);
  border-radius: var(--dss-radius-sm, 4px);
  overflow: hidden;
  box-shadow: var(--dss-shadow-sm);
}

.pc-tabs {
  // Forçar texto branco nos tabs
  :deep(.q-tab) {
    color: rgba(255, 255, 255, 0.75) !important;
    font-size: var(--dss-font-size-xs);
    font-weight: 500;
    min-height: 48px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: background var(--dss-duration-200), color var(--dss-duration-200);

    &:hover:not(.q-tab--active) {
      background: rgba(255, 255, 255, 0.1);
      color: var(--dss-text-inverse) !important;
    }
  }

  :deep(.q-tab--active) {
    color: var(--dss-text-inverse) !important;
    font-weight: 600;
  }

  :deep(.q-tab__indicator) {
    background: var(--dss-text-inverse);
    height: 3px;
  }

  :deep(.q-tab__icon) {
    font-size: 1.125rem;
  }
}

// ── Page Content ─────────────────────────────────────────────
.pc-content {
  margin: var(--dss-spacing-4) var(--dss-spacing-5) var(--dss-spacing-10);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

// ── Section Header ────────────────────────────────────────────
.pc-section-header {
  padding-bottom: var(--dss-spacing-2);
  border-bottom: 1px solid var(--dss-border-default);
}

.pc-section-title {
  font-size: var(--dss-font-size-base);
  font-weight: 600;
  color: var(--dss-text-body);
  margin: 0;
  letter-spacing: 0.1px;

  // Underline estilizado referenciando o print
  position: relative;
  display: inline-block;
  padding-bottom: var(--dss-spacing-2);

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 2px;
    background: var(--dss-action-primary);
    border-radius: 1px;
  }
}

// ── Toolbar ───────────────────────────────────────────────────
.pc-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--dss-spacing-1_5);
  padding: var(--dss-spacing-2_5) var(--dss-spacing-3);
  background: var(--dss-surface-default, #fff);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-sm, 4px);

  &__btn {
    // Botões compactos, tipografia uniforme
    font-size: var(--dss-font-size-xs) !important;
    height: 32px !important;
    min-height: 32px !important;

    :deep(.dss-button__label) { font-size: var(--dss-font-size-xs); }
    :deep(.dss-button__icon)  { font-size: 1rem; }
  }
}

// ── Table wrapper ─────────────────────────────────────────────
.pc-table-wrap {
  background: var(--dss-surface-default, #fff);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-sm, 4px);
  overflow: hidden;
  box-shadow: var(--dss-shadow-xs);
}

.pc-table {
  // Sobrescritas finas de DssMarkupTable
  :deep(table) {
    width: 100%;
    border-collapse: collapse;
  }

  :deep(thead th) {
    background: var(--dss-surface-subtle, #f8f9fb);
    color: var(--dss-text-subtle);
    font-size: var(--dss-font-size-xs);
    font-weight: 600;
    text-transform: none;
    letter-spacing: 0.2px;
    padding: var(--dss-spacing-2_5) var(--dss-spacing-3);
    border-bottom: 1px solid var(--dss-border-default);
    text-align: left;
    white-space: nowrap;
  }

  :deep(tbody td) {
    padding: var(--dss-spacing-2_5) var(--dss-spacing-3);
    border-bottom: 1px solid var(--dss-border-subtle, #f0f1f3);
    vertical-align: middle;
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-body);
    transition: background var(--dss-duration-200) var(--dss-easing-standard);
  }

  :deep(tbody tr) {
    transition: background var(--dss-duration-200);

    &:hover td {
      background: var(--dss-surface-hover, rgba(0,0,0,0.025));
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  :deep(tbody tr.pc-row--selected td) {
    background: var(--dss-surface-selected, rgba(59,130,246,0.06));
  }

  :deep(tbody tr.pc-row--detail td) {
    background: var(--dss-surface-subtle, #f8f9fb);
    padding: 0;
    border-bottom: 2px solid var(--dss-action-primary);
  }
}

// Colunas da tabela
.pc-col-check   { width: 36px; padding-left: var(--dss-spacing-3) !important; }
.pc-col-center  { text-align: center; width: 96px; }
.pc-col-actions { width: 80px; text-align: right; white-space: nowrap; }
.pc-cell-code   { font-weight: 600; width: 72px; }
.pc-cell-tipo   { font-size: var(--dss-font-size-xs); color: var(--dss-text-subtle); }

.pc-cell-primary {
  font-weight: 600;
  color: var(--dss-text-body);
  line-height: 1.3;
}

.pc-cell-secondary {
  font-size: 0.6875rem;
  color: var(--dss-text-subtle);
  margin-top: 2px;
  line-height: 1.3;

  strong { font-weight: 600; }
}

// Botões de ação (ícones tiny)
.pc-action-btn {
  width: 28px  !important;
  height: 28px !important;
  min-width: 28px !important;
  min-height: 28px !important;

  :deep(.dss-button__icon) { font-size: 1rem; }
}

// Status text na tabela (sem chip)
.pc-status-text {
  font-size: var(--dss-font-size-xs);
  font-weight: 600;

  &--active    { color: var(--dss-feedback-success, #16a34a); }
  &--pending   { color: var(--dss-feedback-warning, #d97706); }
  &--overdue   { color: var(--dss-feedback-error,   #dc2626); }
  &--cancelled { color: var(--dss-text-muted); }
  &--inactive  { color: var(--dss-feedback-error,   #dc2626); }
  &--neutral   { color: var(--dss-text-subtle); }
}

// Detail panel (dentro de linha expandida)
.pc-detail-panel {
  padding: var(--dss-spacing-4) var(--dss-spacing-5);
  animation: pc-slide-in var(--dss-duration-200) var(--dss-easing-standard) both;
}

.pc-detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--dss-spacing-3);
  margin-bottom: var(--dss-spacing-4);
}

.pc-detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1);
}

.pc-detail-label {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.pc-detail-value {
  font-size: var(--dss-font-size-sm);
  font-weight: 600;
  color: var(--dss-text-body);
}

.pc-detail-actions {
  display: flex;
  gap: var(--dss-spacing-2);
  justify-content: flex-end;
}

@keyframes pc-slide-in {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

// Selection bar floating ─────────────────────────────────────
.pc-selection-bar {
  position: sticky;
  bottom: var(--dss-spacing-4);
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  background: var(--dss-surface-default, #fff);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-md, 8px);
  box-shadow: var(--dss-shadow-lg);

  &__count { font-size: var(--dss-font-size-sm); font-weight: 600; color: var(--dss-text-body); }
  &__spacer { flex: 1; }
}

.pc-slide-up-enter-active, .pc-slide-up-leave-active {
  transition: opacity var(--dss-duration-200) var(--dss-easing-standard),
              transform var(--dss-duration-200) var(--dss-easing-standard);
}
.pc-slide-up-enter-from, .pc-slide-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

// Detail Modal ───────────────────────────────────────────────
.pc-modal {
  width: min(520px, 95vw);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--dss-spacing-4) var(--dss-spacing-5);
  }

  &__eyebrow {
    font-size: var(--dss-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--dss-text-subtle);
    font-weight: 600;
    margin-bottom: var(--dss-spacing-1);
  }

  &__title {
    font-size: var(--dss-font-size-lg);
    font-weight: 700;
    color: var(--dss-text-body);
    margin: 0;
  }

  &__body {
    padding: var(--dss-spacing-4) var(--dss-spacing-5);
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: var(--dss-spacing-3);
    margin: 0;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--dss-font-size-sm);
    padding-bottom: var(--dss-spacing-3);
    border-bottom: 1px solid var(--dss-border-subtle, #f0f1f3);

    &:last-child { border-bottom: none; padding-bottom: 0; }

    dt {
      color: var(--dss-text-subtle);
      font-weight: 500;
    }

    dd {
      color: var(--dss-text-body);
      font-weight: 500;
      margin: 0;
    }
  }
}
</style>
