<script lang="ts">
export default { name: 'DssTestPageComplexity', inheritAttrs: false }
</script>

<script setup lang="ts">
import { computed, provide, readonly, ref, useAttrs } from 'vue'
import DssBreadcrumbs from '../../../base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '../../../base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssCard from '../../../base/DssCard/DssCard.vue'
import { DssCardSection } from '../../../base/DssCard'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssChip from '../../../base/DssChip/DssChip.vue'
import DssIcon from '../../../base/DssIcon/DssIcon.vue'
import DssCheckbox from '../../../base/DssCheckbox/DssCheckbox.vue'
import DssInput from '../../../base/DssInput/DssInput.vue'
import DssSelect from '../../../base/DssSelect/DssSelect.vue'
import DssSeparator from '../../../base/DssSeparator/DssSeparator.vue'
import { useTestPageComplexityClasses } from '../composables/useTestPageComplexityClasses'
import type {
  DssTestPageComplexityProps,
  DssTestPageComplexityEmits,
  TestPageView,
  ServiceOrderRow,
} from '../types/testpagecomplexity.types'
import { PAGE_COMPLEXITY_DISABLED_KEY } from '../types/testpagecomplexity.types'

const props = withDefaults(defineProps<DssTestPageComplexityProps>(), {
  brand:        undefined,
  disabled:     false,
  loading:      false,
  pageTitle:    'Ordem Serviço',
  pageSubtitle: 'Dashboard',
  activeView:   'dashboard',
  totalItems:   0,
  currentPage:  1,
  itemsPerPage: 10,
  breadcrumbs:  () => [
    { number: 1, label: 'Operacional' },
    { number: 2, label: 'Serviços' },
    { number: 3, label: 'Monitorar Ordem Serviço' },
  ],
  statusCounts: () => ({ onTime: 0, expiring: 0, expired: 0 }),
  tableRows:    () => [],
  activeFilters: () => [],
})

const emit = defineEmits<DssTestPageComplexityEmits>()
const attrs = useAttrs()

const { rootClasses } = useTestPageComplexityClasses(props)

// Padrão 2.2: provide/inject tipado para disabled
const disabledRef = computed(() => props.disabled)
provide(PAGE_COMPLEXITY_DISABLED_KEY, readonly(disabledRef))

// Estado local dos filtros
const filterSetor    = ref<string | null>(null)
const filterEquipe   = ref('')
const filterCodigo   = ref('')

// Opções de exemplo para o select
const setorOptions = [
  { label: 'Setor A', value: 'a' },
  { label: 'Setor B', value: 'b' },
  { label: 'Setor C', value: 'c' },
]

const filterPanelOpen = ref(true)

// Colunas conforme design Figma
const TABLE_COLUMNS = [
  { key: 'team',          label: 'Equipe' },
  { key: 'equipment',     label: 'Mobile' },
  { key: 'code',          label: 'Protocolo' },
  { key: 'description',   label: 'Serviço' },
  { key: 'serviceNumber', label: 'Matrícula' },
  { key: 'hCode',         label: 'Nr. Hidrômetro' },
  { key: 'address',       label: 'Endereço' },
  { key: 'neighborhood',  label: 'Bairro' },
]

// Paginação
const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.itemsPerPage)))

const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = props.currentPage
  if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 2) return [1, 2, 3]
  if (current >= total - 1) return [total - 2, total - 1, total]
  return [current - 1, current, current + 1]
})

const resultsLabel = computed(() => {
  const from = Math.min(((props.currentPage - 1) * props.itemsPerPage) + 1, props.totalItems)
  const to   = Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
  return `Mostrando ${from}-${to} de ${props.totalItems} resultados`
})

function handleViewChange(view: string) {
  emit('update:activeView', view as TestPageView)
}

function handlePageChange(page: number) {
  emit('update:currentPage', page)
}

function handleFilterRemove(filterId: string) {
  emit('filter:remove', filterId)
}

function handleSearch() {
  emit('filter:search')
}

function handleRowView(row: ServiceOrderRow) {
  emit('row:view', row)
}
</script>

<template>
  <div
    v-bind="attrs"
    :class="rootClasses"
    :data-brand="brand || undefined"
    class="dss-test-page-complexity"
    :aria-busy="loading || undefined"
    :aria-disabled="disabled || undefined"
  >

    <!-- ── Header bar ─────────────────────────────────────────────────────── -->
    <header class="dss-test-page-complexity__header" role="banner">
      <div class="dss-test-page-complexity__header-left">
        <DssButton
          flat
          round
          icon="menu"
          size="sm"
          class="dss-test-page-complexity__header-btn"
          aria-label="Menu de navegação"
          :disable="disabled"
        />
        <div class="dss-test-page-complexity__header-logo-area" aria-hidden="true">
          <DssIcon name="water_drop" size="sm" class="dss-test-page-complexity__header-logo-icon" />
        </div>
        <div class="dss-test-page-complexity__header-divider" aria-hidden="true" />
        <span class="dss-test-page-complexity__header-title">{{ pageTitle }}</span>
      </div>
      <div class="dss-test-page-complexity__header-right">
        <DssButton flat round icon="search"         size="sm" class="dss-test-page-complexity__header-btn" aria-label="Buscar"          :disable="disabled" />
        <DssButton flat round icon="notifications"  size="sm" class="dss-test-page-complexity__header-btn" aria-label="Notificações"    :disable="disabled" />
        <DssButton flat round icon="settings"       size="sm" class="dss-test-page-complexity__header-btn" aria-label="Configurações"   :disable="disabled" />
        <DssButton flat round icon="account_circle" size="sm" class="dss-test-page-complexity__header-btn" aria-label="Perfil"          :disable="disabled" />
      </div>
    </header>

    <!-- ── Body (white bg, sections with border-bottom) ─────────────────── -->
    <!-- data-grid-body: ponto de referência do GridOverlay para medir layoutBounds -->
    <!-- (respeita max-width + margin:auto do breakpoint selecionado)              -->
    <div
      id="dss-tpc-body"
      class="dss-test-page-complexity__body"
      data-grid-debug="body"
      data-grid-body
    >

      <!-- ── Grid-inspector row container — firstChild de __body ── -->
      <!-- data-grid-rows: ponto de entrada explícito para o GridOverlay detectar as 4 seções como rows -->
      <div
        id="dss-tpc-sections"
        class="dss-test-page-complexity__sections"
        data-grid-debug="sections"
        data-grid-rows
      >

      <!-- ── Seção 1: Breadcrumbs + Título + Tabs ── -->
      <div
        id="dss-tpc-title-section"
        class="dss-test-page-complexity__title-section"
        data-grid-debug="title-section"
      >

        <!-- Breadcrumbs -->
        <DssBreadcrumbs class="dss-test-page-complexity__breadcrumbs" :aria-label="'Navegação estrutural'">
          <DssBreadcrumbsEl
            v-for="(crumb, i) in breadcrumbs"
            :key="crumb.label"
            :label="`${crumb.number} ${crumb.label}`"
            :to="i < breadcrumbs.length - 1 ? '#' : undefined"
          />
        </DssBreadcrumbs>

        <!-- Título + toggle de views -->
        <div class="dss-test-page-complexity__title-row">

          <!-- Título com borda inferior laranja + subtítulo -->
          <div class="dss-test-page-complexity__title-left">
            <div class="row items-center no-wrap q-gutter-x-md">
              <h1 class="dss-test-page-complexity__page-title">{{ pageTitle }}</h1>
              <div class="dss-test-page-complexity__subtitle-group row items-center no-wrap q-gutter-x-xs" aria-hidden="true">
                <DssIcon name="dashboard" size="sm" class="dss-test-page-complexity__subtitle-icon" />
                <span class="dss-test-page-complexity__page-subtitle">{{ pageSubtitle }}</span>
              </div>
            </div>
          </div>

          <!-- Pill toggle de views (fiel ao Figma: container #ececf0, aba ativa branca) -->
          <div role="group" :aria-label="'Selecionar modo de visualização'">
            <div
              id="dss-tpc-tab-list"
              class="dss-test-page-complexity__tab-list"
            >
              <button
                type="button"
                class="dss-test-page-complexity__tab-btn"
                :class="{ 'dss-test-page-complexity__tab-btn--active': activeView === 'dashboard' }"
                :aria-pressed="String(activeView === 'dashboard')"
                :disabled="disabled || undefined"
                @click="handleViewChange('dashboard')"
              >
                <DssIcon name="dashboard" size="xs" aria-hidden="true" />
                DASHBOARD
              </button>
              <button
                type="button"
                class="dss-test-page-complexity__tab-btn"
                :class="{ 'dss-test-page-complexity__tab-btn--active': activeView === 'map' }"
                :aria-pressed="String(activeView === 'map')"
                :disabled="disabled || undefined"
                @click="handleViewChange('map')"
              >
                <DssIcon name="map" size="xs" aria-hidden="true" />
                MAPA EQUIPE
              </button>
              <button
                type="button"
                class="dss-test-page-complexity__tab-btn"
                :class="{ 'dss-test-page-complexity__tab-btn--active': activeView === 'schedule' }"
                :aria-pressed="String(activeView === 'schedule')"
                :disabled="disabled || undefined"
                @click="handleViewChange('schedule')"
              >
                <DssIcon name="event" size="xs" aria-hidden="true" />
                AGENDA EQUIPE
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- ── Seção 2: Cards de status ── -->
      <div
        id="dss-tpc-status-section"
        class="dss-test-page-complexity__status-section"
        role="region"
        aria-label="Resumo de status das ordens"
        data-grid-debug="status-section"
      >
        <div
          id="dss-tpc-status-row"
          class="dss-test-page-complexity__status-row"
        >

          <!-- No prazo -->
          <div class="dss-test-page-complexity__status-col">
            <DssCard class="dss-test-page-complexity__status-card dss-test-page-complexity__status-card--success">
              <DssCardSection class="row items-center q-pa-md" horizontal>
                <DssIcon name="task_alt" class="dss-test-page-complexity__status-icon dss-test-page-complexity__status-icon--success" size="xl" aria-hidden="true" />
                <div class="q-ml-md">
                  <div v-if="loading" class="dss-test-page-complexity__skeleton dss-test-page-complexity__skeleton--number" aria-hidden="true" />
                  <p v-else class="dss-test-page-complexity__status-number" :aria-label="`${statusCounts.onTime} ordens no prazo`">
                    {{ statusCounts.onTime }}
                  </p>
                  <p class="dss-test-page-complexity__status-label">No prazo</p>
                </div>
              </DssCardSection>
            </DssCard>
          </div>

          <!-- A vencer -->
          <div class="dss-test-page-complexity__status-col">
            <DssCard class="dss-test-page-complexity__status-card dss-test-page-complexity__status-card--warning">
              <DssCardSection class="row items-center q-pa-md" horizontal>
                <DssIcon name="schedule" class="dss-test-page-complexity__status-icon dss-test-page-complexity__status-icon--warning" size="xl" aria-hidden="true" />
                <div class="q-ml-md">
                  <div v-if="loading" class="dss-test-page-complexity__skeleton dss-test-page-complexity__skeleton--number" aria-hidden="true" />
                  <p v-else class="dss-test-page-complexity__status-number" :aria-label="`${statusCounts.expiring} ordens a vencer`">
                    {{ statusCounts.expiring }}
                  </p>
                  <p class="dss-test-page-complexity__status-label">A vencer</p>
                </div>
              </DssCardSection>
            </DssCard>
          </div>

          <!-- Vencidas -->
          <div class="dss-test-page-complexity__status-col">
            <DssCard class="dss-test-page-complexity__status-card dss-test-page-complexity__status-card--error">
              <DssCardSection class="row items-center q-pa-md" horizontal>
                <DssIcon name="cancel" class="dss-test-page-complexity__status-icon dss-test-page-complexity__status-icon--error" size="xl" aria-hidden="true" />
                <div class="q-ml-md">
                  <div v-if="loading" class="dss-test-page-complexity__skeleton dss-test-page-complexity__skeleton--number" aria-hidden="true" />
                  <p v-else class="dss-test-page-complexity__status-number" :aria-label="`${statusCounts.expired} ordens vencidas`">
                    {{ statusCounts.expired }}
                  </p>
                  <p class="dss-test-page-complexity__status-label">Vencidas</p>
                </div>
              </DssCardSection>
            </DssCard>
          </div>

        </div>
      </div>

      <!-- ── Seção 3: Filtros (sem DssCard — seção plana com border-bottom) ── -->
      <div
        id="dss-tpc-filters-section"
        class="dss-test-page-complexity__filters-section"
        role="region"
        :aria-label="'Filtros de pesquisa'"
        data-grid-debug="filters-section"
      >

        <!-- Cabeçalho dos filtros -->
        <div class="dss-test-page-complexity__filters-header">
          <h2 class="dss-test-page-complexity__filters-title">Filtros</h2>
          <div class="row no-wrap q-gutter-x-sm">
            <slot name="filter-actions">
              <DssButton unelevated color="primary" icon="content_copy" size="sm" :disable="disabled" aria-label="Exportar filtros" />
            </slot>
            <DssButton
              unelevated
              color="primary"
              icon-right="expand_more"
              label="OPÇÕES FILTRO"
              size="sm"
              :disable="disabled"
              :aria-expanded="String(filterPanelOpen)"
              aria-controls="dss-tpc-filters-body"
              @click="filterPanelOpen = !filterPanelOpen"
            />
          </div>
        </div>

        <!-- Painel de filtros (expansível) -->
        <template v-if="filterPanelOpen">
          <div
            id="dss-tpc-filters-body"
            class="dss-test-page-complexity__filters-body"
          >

            <!-- Inputs linha 1 -->
            <div class="dss-test-page-complexity__filters-row">
              <div class="dss-test-page-complexity__filters-col">
                <DssSelect
                  v-model="filterSetor"
                  label="Setor Execução"
                  :options="setorOptions"
                  option-label="label"
                  option-value="value"
                  emit-value
                  map-options
                  outlined
                  :disable="disabled"
                  clearable
                  placeholder="Selecione..."
                />
              </div>
              <div class="dss-test-page-complexity__filters-col">
                <div class="dss-test-page-complexity__input-search-group">
                  <DssInput
                    v-model="filterEquipe"
                    label="Equipe"
                    outlined
                    placeholder="Digite para buscar..."
                    :disable="disabled"
                    class="dss-test-page-complexity__input-search-field"
                    aria-label="Filtrar por equipe"
                  />
                  <DssButton
                    outlined
                    icon="search"
                    :disable="disabled"
                    class="dss-test-page-complexity__input-search-btn"
                    aria-label="Buscar por equipe"
                    @click="handleSearch"
                  />
                </div>
              </div>
              <div class="dss-test-page-complexity__filters-col">
                <div class="dss-test-page-complexity__input-search-group">
                  <DssInput
                    v-model="filterCodigo"
                    label="Código Serviço"
                    outlined
                    placeholder="Digite para buscar..."
                    :disable="disabled"
                    class="dss-test-page-complexity__input-search-field"
                    aria-label="Filtrar por código de serviço"
                  />
                  <DssButton
                    outlined
                    icon="search"
                    :disable="disabled"
                    class="dss-test-page-complexity__input-search-btn"
                    aria-label="Buscar por código de serviço"
                    @click="handleSearch"
                  />
                </div>
              </div>
            </div>

            <!-- Chips de filtros ativos -->
            <div
              v-if="activeFilters.length"
              class="dss-test-page-complexity__active-chips"
              role="list"
              aria-label="Filtros ativos"
            >
              <DssChip
                v-for="chip in activeFilters"
                :key="chip.id"
                :label="chip.label"
                removable
                :disable="disabled"
                role="listitem"
                @remove="handleFilterRemove(chip.id)"
              />
            </div>

            <!-- Botão Pesquisar — laranja, centralizado (EXC-04: --dss-hub-primary) -->
            <div class="dss-test-page-complexity__pesquisar-row">
              <DssButton
                unelevated
                icon="search"
                label="Pesquisar"
                :disable="disabled"
                class="dss-test-page-complexity__pesquisar-btn"
                @click="handleSearch"
              />
            </div>

          </div>
        </template>

      </div>

      <!-- ── Seção 4: Tabela de dados (DssCard plano, sem tabs) ── -->
      <div
        id="dss-tpc-table-section"
        class="dss-test-page-complexity__table-section"
        data-grid-debug="table-section"
      >
        <DssCard id="dss-tpc-table-card" class="dss-test-page-complexity__table-card">

          <!-- Skeleton de loading -->
          <template v-if="loading">
            <div
              v-for="n in itemsPerPage"
              :key="n"
              class="dss-test-page-complexity__skeleton dss-test-page-complexity__skeleton--row q-pa-sm"
              aria-hidden="true"
            />
          </template>

          <template v-else>

            <!-- Cabeçalho da tabela — azul conforme Figma -->
            <div class="dss-test-page-complexity__table-header row items-center" role="row" aria-hidden="true">
              <div class="col-auto dss-test-page-complexity__table-col-check">
                <DssCheckbox :disable="true" aria-label="Selecionar todos" />
              </div>
              <div
                v-for="col in TABLE_COLUMNS"
                :key="col.key"
                class="col dss-test-page-complexity__table-th"
              >
                {{ col.label }}
              </div>
              <div class="col-auto dss-test-page-complexity__table-col-action" />
            </div>

            <!-- Linhas da tabela -->
            <div
              v-for="row in tableRows"
              :key="row.id"
              class="dss-test-page-complexity__table-row row items-center"
              role="row"
            >
              <div class="col-auto dss-test-page-complexity__table-col-check">
                <DssCheckbox :disable="disabled" :aria-label="`Selecionar ordem ${row.code}`" />
              </div>
              <div class="col">{{ row.team }}</div>
              <div class="col">{{ row.hasEquipment ? 'Sim' : 'Não' }}</div>
              <div class="col">
                <a href="#" class="dss-test-page-complexity__link" @click.prevent="handleRowView(row)">
                  {{ row.code }}
                </a>
              </div>
              <div class="col">{{ row.description }}</div>
              <div class="col">{{ row.serviceNumber }}</div>
              <div class="col">{{ row.hCode }}</div>
              <div class="col">{{ row.address }}</div>
              <div class="col">{{ row.neighborhood }}</div>
              <div class="col-auto dss-test-page-complexity__table-col-action">
                <DssButton
                  flat round icon="visibility" size="sm"
                  :disable="disabled"
                  :aria-label="`Ver detalhes da ordem ${row.code}`"
                  @click="handleRowView(row)"
                />
              </div>
            </div>

            <!-- Estado vazio -->
            <div
              v-if="!tableRows.length"
              class="dss-test-page-complexity__empty column items-center justify-center q-pa-xl"
              role="status"
            >
              <DssIcon name="inbox" size="xl" class="text-grey-4 q-mb-sm" aria-hidden="true" />
              <p class="dss-test-page-complexity__empty-text">Nenhuma ordem de serviço encontrada</p>
            </div>

          </template>

          <!-- Rodapé: resultados + paginação inline -->
          <div class="dss-test-page-complexity__table-footer row items-center">
            <span class="dss-test-page-complexity__results-label col" role="status" aria-live="polite">
              {{ resultsLabel }}
            </span>
            <slot name="table-footer" />
            <nav id="dss-tpc-pagination" class="dss-test-page-complexity__pagination row no-wrap q-gutter-x-xs" aria-label="Paginação">
              <button
                type="button"
                class="dss-test-page-complexity__page-btn"
                :disabled="currentPage <= 1 || undefined"
                :aria-label="'Página anterior'"
                @click="handlePageChange(currentPage - 1)"
              >Anterior</button>
              <button
                v-for="p in pageNumbers"
                :key="p"
                type="button"
                class="dss-test-page-complexity__page-btn dss-test-page-complexity__page-btn--num"
                :class="{ 'dss-test-page-complexity__page-btn--active': p === currentPage }"
                :aria-current="p === currentPage ? 'page' : undefined"
                @click="handlePageChange(p)"
              >{{ p }}</button>
              <button
                type="button"
                class="dss-test-page-complexity__page-btn"
                :disabled="currentPage >= totalPages || undefined"
                :aria-label="'Próxima página'"
                @click="handlePageChange(currentPage + 1)"
              >Próximo</button>
            </nav>
          </div>

        </DssCard>
      </div>

      </div><!-- /__sections -->
    </div><!-- /__body -->
  </div>
</template>

<style lang="scss">
@import '../DssTestPageComplexity.module.scss';
</style>
