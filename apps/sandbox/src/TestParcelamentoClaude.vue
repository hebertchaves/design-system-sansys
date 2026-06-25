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
            class="pc-appbar__notif-badge"
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
                <DssBadge floating color="negative" class="pc-client-id__avatar-badge">!</DssBadge>
              </div>
              <span class="pc-client-id__code">652701-9</span>
              <DssButton
                variant="outline" size="xs" color="primary"
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
                <div class="pc-badge-wrap">
                  <DssButton
                    variant="elevated" size="sm" icon="shopping_cart"
                    color="primary" round aria-label="Carrinho de serviços (2)"
                    class="pc-client-rail__btn"
                  >
                    <DssTooltip anchor="center left" self="center right">Carrinho (2 itens)</DssTooltip>
                  </DssButton>
                  <DssBadge floating color="negative" class="pc-rail__cart-badge">2</DssBadge>
                </div>
              </div>
              <div class="pc-client-rail__item">
                <DssButton
                  variant="outline" size="sm" icon="add"
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
              variant="outline"
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
                          <DssButton variant="outline" size="xs" color="primary"
                            icon="print" label="Imprimir boleto" />
                          <DssButton variant="outline" size="xs" color="primary"
                            icon="history" label="Histórico" />
                          <DssButton variant="outline" size="xs" color="negative"
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
              <DssButton variant="outline" size="xs" color="primary"
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
          <DssButton variant="outline" color="primary" icon="history" label="Histórico" />
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
import { DssCardActions } from '@components/base/DssCard/index'
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
//  TestParcelamentoClaude — apenas tokens DSS, zero hardcoded
//  data-brand="water" ativo na raiz.
//
//  Convenção de opacidade sobre superfícies escuras (appbar/sidenav):
//  rgba(branco, X%) → background: var(--dss-text-inverse) em ::after
//  com opacity: var(--dss-opacity-X).  Conforme Princípio #8 (::after
//  para efeitos visuais) e Princípio #1 (token-first).
// ============================================================

// ── Raiz da página ───────────────────────────────────────────
.pc-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--dss-surface-muted);
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-sm);
}

// ── App Bar ──────────────────────────────────────────────────
.pc-appbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // 52px → --dss-form-control-height-lg: 52px
  height: var(--dss-form-control-height-lg);
  padding: 0 var(--dss-spacing-4);
  background: var(--dss-action-primary);
  box-shadow: var(--dss-shadow-md);
  position: sticky;
  top: 0;
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
    // 0.9375rem sem token → --dss-font-size-sm (14px, mais próximo disponível)
    font-size: var(--dss-font-size-sm);
    font-weight: var(--dss-font-weight-normal);
    color: var(--dss-text-inverse);
    letter-spacing: 0.3px;
    strong { font-weight: var(--dss-font-weight-bold); }
    em     { font-style: normal; font-weight: var(--dss-font-weight-light); opacity: var(--dss-opacity-90); }
  }

  // Separador pipe: elemento puramente decorativo
  &__pipe {
    // 1px × 24px — width via border-width, height via compact-control-height-sm
    width: var(--dss-border-width-thin);
    height: var(--dss-compact-control-height-sm);
    // rgba(white, 0.3) → background branco com opacity token
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

  // Botões ícone sobre fundo primário escuro.
  // Hover via ::after (Princípio #8 — efeitos visuais em ::after).
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

  &__notif-wrap {
    position: relative;
    display: inline-flex;
  }

  // Badge de notificação — posicionada via CSS, sem inline style
  &__notif-badge {
    top: var(--dss-spacing-1) !important;
    right: var(--dss-spacing-1) !important;
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
  // 52px → --dss-form-control-height-lg
  width: var(--dss-form-control-height-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--dss-spacing-3) 0;
  gap: var(--dss-spacing-1);
  background: var(--dss-action-primary);
  flex-shrink: 0;

  // Inativo: ícones com opacidade reduzida (rgba branco 70% → opacity-70)
  &__btn {
    position: relative;
    overflow: hidden;
    color: var(--dss-text-inverse) !important;
    opacity: var(--dss-opacity-70);
    transition: opacity var(--dss-duration-200) var(--dss-easing-standard);

    // Hover: restaura opacidade + overlay claro via ::after
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

    // Ativo: opacidade total + overlay persistente
    &--active {
      opacity: 1;
      &::after { opacity: var(--dss-opacity-20); }
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

// ── Client Card ──────────────────────────────────────────────
.pc-client-card {
  margin: var(--dss-spacing-4) var(--dss-spacing-5) 0;
  padding: var(--dss-spacing-4);
  box-shadow: var(--dss-shadow-sm);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);

  &__grid {
    display: grid;
    // 130px sem token exato → auto (ID column shrink-wraps ao conteúdo)
    grid-template-columns: auto 1fr 1fr 1fr auto;
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

  // Badge de alerta sobre avatar — sem inline style
  &__avatar-badge {
    top: 0 !important;
    right: 0 !important;
  }

  &__code {
    font-size: var(--dss-font-size-lg);
    font-weight: var(--dss-font-weight-bold);
    color: var(--dss-text-body);
    letter-spacing: 0.5px;
  }

  // Botão compacto: sem override de altura (DssButton size="xs" gerencia internamente)
  &__details-btn {
    font-size: var(--dss-font-size-xs) !important;
    padding: 0 var(--dss-spacing-3) !important;
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

  &__icon-link {
    // 20px → --dss-compact-control-height-xs: 20px
    width: var(--dss-compact-control-height-xs) !important;
    height: var(--dss-compact-control-height-xs) !important;
    min-width: var(--dss-compact-control-height-xs) !important;
    min-height: var(--dss-compact-control-height-xs) !important;
    padding: 0 !important;

    // 0.875rem → --dss-font-size-sm: 14px
    :deep(.dss-button__icon) { font-size: var(--dss-font-size-sm); }
  }
}

// ── Status text (inline, sem chip) ───────────────────────────
.pc-status {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-semibold);

  &--active   { color: var(--dss-feedback-success); }
  &--inactive { color: var(--dss-feedback-error); }
  &--neutral  { color: var(--dss-text-body); }
}

// ── Client Rail ───────────────────────────────────────────────
.pc-client-rail {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  padding-left: var(--dss-spacing-4);
  border-left: var(--dss-border-width-thin) solid var(--dss-border-default);
  align-items: center;

  &__item { position: relative; }
  // 40px → --dss-spacing-10: 40px
  &__btn  { min-width: var(--dss-spacing-10) !important; }
}

.pc-badge-wrap {
  position: relative;
  display: inline-flex;
}

// Badge do carrinho — sem inline style
.pc-rail__cart-badge {
  top: var(--dss-spacing-0_5) !important;
  right: var(--dss-spacing-0_5) !important;
}

// ── Tabs bar ─────────────────────────────────────────────────
.pc-tabs-bar {
  margin: var(--dss-spacing-4) var(--dss-spacing-5) 0;
  background: var(--dss-action-primary);
  border-radius: var(--dss-radius-sm);
  overflow: hidden;
  box-shadow: var(--dss-shadow-sm);
}

.pc-tabs {
  // Tabs inativos: opacidade reduzida (rgba branco 75% → opacity-75 no elemento)
  :deep(.q-tab) {
    color: var(--dss-text-inverse) !important;
    opacity: var(--dss-opacity-75);
    font-size: var(--dss-font-size-xs);
    font-weight: var(--dss-font-weight-medium);
    // 48px → --dss-spacing-12: 48px
    min-height: var(--dss-spacing-12);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: opacity var(--dss-duration-200) var(--dss-easing-standard),
                background var(--dss-duration-200) var(--dss-easing-standard);

    // Hover: opacidade total + overlay via ::after
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

  // Tab ativo: opacidade total, sem overlay
  :deep(.q-tab--active) {
    opacity: 1;
    font-weight: var(--dss-font-weight-semibold);
  }

  :deep(.q-tab__indicator) {
    background: var(--dss-text-inverse);
    // 3px → --dss-border-width-thick: 3px
    height: var(--dss-border-width-thick);
  }

  // Ícone e texto lado a lado — DssTabs não expõe inline-label ao q-tabs interno
  :deep(.q-tab__content) {
    flex-direction: row;
    align-items: center;
    gap: var(--dss-spacing-1_5);
  }

  :deep(.q-tab__icon) {
    margin-bottom: 0;
    // 1.125rem → --dss-font-size-lg: 18px
    font-size: var(--dss-font-size-lg);
  }

  :deep(.q-tab__label) {
    padding-top: 0;
    font-size: var(--dss-font-size-xs);
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
  border-bottom: var(--dss-border-width-thin) solid var(--dss-border-default);
}

.pc-section-title {
  font-size: var(--dss-font-size-base);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  margin: 0;
  letter-spacing: 0.1px;
  position: relative;
  display: inline-block;
  padding-bottom: var(--dss-spacing-2);

  // Underline decorativo: Princípio #8 — ::after para efeitos visuais
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: calc(var(--dss-border-width-thin) * -1);
    width: 100%;
    // 2px → --dss-border-width-md: 2px
    height: var(--dss-border-width-md);
    background: var(--dss-action-primary);
    border-radius: var(--dss-border-width-thin);
  }
}

// ── Toolbar ───────────────────────────────────────────────────
.pc-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--dss-spacing-1_5);
  padding: var(--dss-spacing-2_5) var(--dss-spacing-3);
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-sm);

  &__btn {
    font-size: var(--dss-font-size-xs) !important;
    // 32px → --dss-compact-control-height-lg: 32px
    height: var(--dss-compact-control-height-lg) !important;
    min-height: var(--dss-compact-control-height-lg) !important;

    :deep(.dss-button__label) { font-size: var(--dss-font-size-xs); }
    // 1rem → --dss-font-size-md: 16px
    :deep(.dss-button__icon)  { font-size: var(--dss-font-size-md); }
  }
}

// ── Table wrapper ─────────────────────────────────────────────
.pc-table-wrap {
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-sm);
  overflow: hidden;
  box-shadow: var(--dss-shadow-xs);
}

.pc-table {
  :deep(table) {
    width: 100%;
    border-collapse: collapse;
  }

  :deep(thead th) {
    background: var(--dss-surface-subtle);
    color: var(--dss-text-subtle);
    font-size: var(--dss-font-size-xs);
    font-weight: var(--dss-font-weight-semibold);
    text-transform: none;
    letter-spacing: 0.2px;
    padding: var(--dss-spacing-2_5) var(--dss-spacing-3);
    border-bottom: var(--dss-border-width-thin) solid var(--dss-border-default);
    text-align: left;
    white-space: nowrap;
  }

  :deep(tbody td) {
    padding: var(--dss-spacing-2_5) var(--dss-spacing-3);
    border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);
    vertical-align: middle;
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-body);
    transition: background var(--dss-duration-200) var(--dss-easing-standard);
  }

  :deep(tbody tr) {
    transition: background var(--dss-duration-200);

    &:hover td { background: var(--dss-surface-hover); }
    &:last-child td { border-bottom: none; }
  }

  :deep(tbody tr.pc-row--selected td) {
    background: var(--dss-surface-selected);
  }

  :deep(tbody tr.pc-row--detail td) {
    background: var(--dss-surface-subtle);
    padding: 0;
    // 2px → --dss-border-width-md: 2px
    border-bottom: var(--dss-border-width-md) solid var(--dss-action-primary);
  }
}

// Colunas da tabela — larguras via spacing tokens onde disponível
// 36px → --dss-spacing-9: 36px
.pc-col-check   { width: var(--dss-spacing-9); padding-left: var(--dss-spacing-3) !important; }
// 96px → --dss-spacing-24: 6rem = 96px
.pc-col-center  { text-align: center; width: var(--dss-spacing-24); }
// 80px → --dss-spacing-20: 5rem = 80px
.pc-col-actions { width: var(--dss-spacing-20); text-align: right; white-space: nowrap; }
// 72px sem token exato → largura automática pelo conteúdo
.pc-cell-code   { font-weight: var(--dss-font-weight-semibold); }
.pc-cell-tipo   { font-size: var(--dss-font-size-xs); color: var(--dss-text-subtle); }

.pc-cell-primary {
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  line-height: var(--dss-line-height-snug);
}

.pc-cell-secondary {
  // 0.6875rem (11px) sem token → --dss-font-size-xs (12px), menor disponível
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  // 2px → --dss-spacing-0_5: 2px
  margin-top: var(--dss-spacing-0_5);
  line-height: var(--dss-line-height-snug);

  strong { font-weight: var(--dss-font-weight-semibold); }
}

// Botões de ação inline (ícone puro, dimensão compacta)
.pc-action-btn {
  // 28px → --dss-compact-control-height-md: 28px
  width: var(--dss-compact-control-height-md) !important;
  height: var(--dss-compact-control-height-md) !important;
  min-width: var(--dss-compact-control-height-md) !important;
  min-height: var(--dss-compact-control-height-md) !important;

  :deep(.dss-button__icon) { font-size: var(--dss-font-size-md); }
}

// Status text na tabela (sem chip — referência ao print)
.pc-status-text {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-semibold);

  &--active    { color: var(--dss-feedback-success); }
  &--pending   { color: var(--dss-feedback-warning); }
  &--overdue   { color: var(--dss-feedback-error); }
  &--cancelled { color: var(--dss-text-muted); }
  &--inactive  { color: var(--dss-feedback-error); }
  &--neutral   { color: var(--dss-text-subtle); }
}

// Detail panel (linha expandida)
.pc-detail-panel {
  padding: var(--dss-spacing-4) var(--dss-spacing-5);
  animation: pc-slide-in var(--dss-duration-200) var(--dss-easing-standard) both;
}

.pc-detail-grid {
  display: grid;
  // 160px → --dss-spacing-40: 10rem = 160px
  grid-template-columns: repeat(auto-fill, minmax(var(--dss-spacing-40), 1fr));
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
  font-weight: var(--dss-font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.pc-detail-value {
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
}

.pc-detail-actions {
  display: flex;
  gap: var(--dss-spacing-2);
  justify-content: flex-end;
}

@keyframes pc-slide-in {
  from { opacity: 0; transform: translateY(calc(var(--dss-spacing-1_5) * -1)); }
  to   { opacity: 1; transform: translateY(0); }
}

// Selection bar flutuante
.pc-selection-bar {
  position: sticky;
  bottom: var(--dss-spacing-4);
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-md);
  box-shadow: var(--dss-shadow-lg);

  &__count { font-size: var(--dss-font-size-sm); font-weight: var(--dss-font-weight-semibold); color: var(--dss-text-body); }
  &__spacer { flex: 1; }
}

.pc-slide-up-enter-active, .pc-slide-up-leave-active {
  transition: opacity var(--dss-duration-200) var(--dss-easing-standard),
              transform var(--dss-duration-200) var(--dss-easing-standard);
}
.pc-slide-up-enter-from, .pc-slide-up-leave-to {
  opacity: 0;
  // 8px → --dss-spacing-2: 8px
  transform: translateY(var(--dss-spacing-2));
}

// Modal de detalhe
.pc-modal {
  // 520px sem token exato — dimensão de layout aceita (sem token de modal-width no DSS)
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
    font-weight: var(--dss-font-weight-semibold);
    margin-bottom: var(--dss-spacing-1);
  }

  &__title {
    font-size: var(--dss-font-size-lg);
    font-weight: var(--dss-font-weight-bold);
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
    border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);

    &:last-child { border-bottom: none; padding-bottom: 0; }

    dt {
      color: var(--dss-text-subtle);
      font-weight: var(--dss-font-weight-medium);
    }

    dd {
      color: var(--dss-text-body);
      font-weight: var(--dss-font-weight-medium);
      margin: 0;
    }
  }
}
</style>
