<script lang="ts">
export default { name: 'DssTestPageComplexity', inheritAttrs: false }
</script>

<script setup lang="ts">
import { computed, provide, readonly, ref, useAttrs } from 'vue'
import DssBreadcrumbs from '../../base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '../../base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssCard from '../../base/DssCard/DssCard.vue'
import { DssCardSection } from '../../base/DssCard'
import DssButton from '../../base/DssButton/DssButton.vue'
import DssChip from '../../base/DssChip/DssChip.vue'
import DssIcon from '../../base/DssIcon/DssIcon.vue'
import DssCheckbox from '../../base/DssCheckbox/DssCheckbox.vue'
import DssInput from '../../base/DssInput/DssInput.vue'
import DssSelect from '../../base/DssSelect/DssSelect.vue'
import DssDataCard from '../../base/DssDataCard/DssDataCard.vue'
import DssSeparator from '../../base/DssSeparator/DssSeparator.vue'
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

// Estado local dos filtros (valores controlados internamente, mas expõe para o pai via emits)
const filterSetor    = ref<string | null>(null)
const filterEquipe   = ref('')
const filterCodigo   = ref('')

// Opções de exemplo para o select (em produção, viriam via prop)
const setorOptions = [
  { label: 'Setor A', value: 'a' },
  { label: 'Setor B', value: 'b' },
  { label: 'Setor C', value: 'c' },
]

// Controle do painel de filtros
const filterPanelOpen = ref(true)

// Config das tabs do DssDataCard
const dataTabs = computed(() => [
  { name: 'orders', label: 'Ordens de Serviço' },
])

// Colunas da tabela de dados (usadas como slots nomeados no DssDataCard)
const TABLE_COLUMNS = [
  { key: 'team',        label: 'Equipe' },
  { key: 'equipment',  label: 'Equip.' },
  { key: 'code',       label: 'Código' },
  { key: 'description', label: 'Descrição' },
  { key: 'serviceNum', label: 'Nº Serviço' },
  { key: 'hCode',      label: 'Cód. H' },
  { key: 'address',    label: 'Endereço' },
  { key: 'neighborhood', label: 'Bairro' },
]

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

const resultsLabel = computed(() => {
  const from = ((props.currentPage - 1) * props.itemsPerPage) + 1
  const to   = Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
  return `Mostrando ${from}-${to} de ${props.totalItems} resultados`
})
</script>

<template>
  <div
    v-bind="attrs"
    :class="rootClasses"
    :data-brand="brand || undefined"
    class="dss-test-page-complexity q-pa-md"
    :aria-busy="loading || undefined"
    :aria-disabled="disabled || undefined"
  >

    <!-- ── Breadcrumbs ── -->
    <DssBreadcrumbs class="q-mb-sm" :aria-label="'Navegação estrutural'">
      <DssBreadcrumbsEl
        v-for="(crumb, i) in breadcrumbs"
        :key="crumb.label"
        :label="`${crumb.number} ${crumb.label}`"
        :to="i < breadcrumbs.length - 1 ? '#' : undefined"
      />
    </DssBreadcrumbs>

    <!-- ── Page title row ── -->
    <div class="dss-test-page-complexity__title-row row items-center q-mb-md">
      <div class="col">
        <h1 class="dss-test-page-complexity__page-title">
          {{ pageTitle }}
          <span class="dss-test-page-complexity__page-subtitle" aria-hidden="true"> › </span>
          <span class="dss-test-page-complexity__page-subtitle">{{ pageSubtitle }}</span>
        </h1>
      </div>
      <div class="col-auto row no-wrap q-gutter-x-sm" role="group" :aria-label="'Selecionar modo de visualização'">
        <DssButton
          :outline="activeView !== 'dashboard'"
          :unelevated="activeView === 'dashboard'"
          :color="activeView === 'dashboard' ? 'primary' : 'grey-6'"
          icon="dashboard"
          label="DASHBOARD"
          size="sm"
          :disable="disabled"
          @click="handleViewChange('dashboard')"
          :aria-pressed="activeView === 'dashboard'"
        />
        <DssButton
          :outline="activeView !== 'map'"
          :unelevated="activeView === 'map'"
          :color="activeView === 'map' ? 'primary' : 'grey-6'"
          icon="map"
          label="MAPA EQUIPE"
          size="sm"
          :disable="disabled"
          @click="handleViewChange('map')"
          :aria-pressed="activeView === 'map'"
        />
        <DssButton
          :outline="activeView !== 'schedule'"
          :unelevated="activeView === 'schedule'"
          :color="activeView === 'schedule' ? 'primary' : 'grey-6'"
          icon="event"
          label="AGENDA EQUIPE"
          size="sm"
          :disable="disabled"
          @click="handleViewChange('schedule')"
          :aria-pressed="activeView === 'schedule'"
        />
      </div>
    </div>

    <!-- ── Status cards row ── -->
    <div
      class="dss-test-page-complexity__status-row row q-col-gutter-md q-mb-md"
      role="region"
      aria-label="Resumo de status das ordens"
    >
      <!-- No prazo -->
      <div class="col-12 col-sm-4">
        <DssCard flat class="dss-test-page-complexity__status-card dss-test-page-complexity__status-card--success">
          <DssCardSection class="row items-center q-pa-md" horizontal>
            <DssIcon
              name="schedule"
              class="dss-test-page-complexity__status-icon dss-test-page-complexity__status-icon--success"
              size="xl"
              aria-hidden="true"
            />
            <div class="q-ml-md">
              <div
                v-if="loading"
                class="dss-test-page-complexity__skeleton dss-test-page-complexity__skeleton--number"
                aria-hidden="true"
              />
              <p
                v-else
                class="dss-test-page-complexity__status-number dss-test-page-complexity__status-number--success"
                :aria-label="`${statusCounts.onTime} ordens no prazo`"
              >
                {{ statusCounts.onTime }}
              </p>
              <p class="dss-test-page-complexity__status-label">No prazo</p>
            </div>
          </DssCardSection>
        </DssCard>
      </div>

      <!-- A vencer -->
      <div class="col-12 col-sm-4">
        <DssCard flat class="dss-test-page-complexity__status-card dss-test-page-complexity__status-card--warning">
          <DssCardSection class="row items-center q-pa-md" horizontal>
            <DssIcon
              name="schedule"
              class="dss-test-page-complexity__status-icon dss-test-page-complexity__status-icon--warning"
              size="xl"
              aria-hidden="true"
            />
            <div class="q-ml-md">
              <div
                v-if="loading"
                class="dss-test-page-complexity__skeleton dss-test-page-complexity__skeleton--number"
                aria-hidden="true"
              />
              <p
                v-else
                class="dss-test-page-complexity__status-number dss-test-page-complexity__status-number--warning"
                :aria-label="`${statusCounts.expiring} ordens a vencer`"
              >
                {{ statusCounts.expiring }}
              </p>
              <p class="dss-test-page-complexity__status-label">A vencer</p>
            </div>
          </DssCardSection>
        </DssCard>
      </div>

      <!-- Vencidas -->
      <div class="col-12 col-sm-4">
        <DssCard flat class="dss-test-page-complexity__status-card dss-test-page-complexity__status-card--error">
          <DssCardSection class="row items-center q-pa-md" horizontal>
            <DssIcon
              name="schedule"
              class="dss-test-page-complexity__status-icon dss-test-page-complexity__status-icon--error"
              size="xl"
              aria-hidden="true"
            />
            <div class="q-ml-md">
              <div
                v-if="loading"
                class="dss-test-page-complexity__skeleton dss-test-page-complexity__skeleton--number"
                aria-hidden="true"
              />
              <p
                v-else
                class="dss-test-page-complexity__status-number dss-test-page-complexity__status-number--error"
                :aria-label="`${statusCounts.expired} ordens vencidas`"
              >
                {{ statusCounts.expired }}
              </p>
              <p class="dss-test-page-complexity__status-label">Vencidas</p>
            </div>
          </DssCardSection>
        </DssCard>
      </div>
    </div>

    <!-- ── Seção Filtros ── -->
    <!-- Regra Matryoshka: DssCard bordered em nível de página (não aninhado em elevated) ✅ -->
    <DssCard
      bordered
      flat
      class="dss-test-page-complexity__filters-card q-mb-md"
      tag="section"
      :aria-label="'Filtros de pesquisa'"
    >
      <DssCardSection class="dss-test-page-complexity__filters-header row items-center">
        <h2 class="dss-test-page-complexity__filters-title col">Filtros</h2>
        <div class="col-auto row no-wrap q-gutter-x-sm">
          <slot name="filter-actions">
            <DssButton
              flat
              round
              icon="content_copy"
              size="sm"
              :disable="disabled"
              aria-label="Exportar filtros"
            />
          </slot>
          <DssButton
            :outline="!filterPanelOpen"
            :unelevated="filterPanelOpen"
            color="primary"
            :icon-right="filterPanelOpen ? 'expand_less' : 'expand_more'"
            label="OPÇÕES FILTRO"
            size="sm"
            :disable="disabled"
            @click="filterPanelOpen = !filterPanelOpen"
            :aria-expanded="filterPanelOpen"
            aria-controls="dss-filters-panel"
          />
        </div>
      </DssCardSection>

      <template v-if="filterPanelOpen">
        <DssSeparator />
        <DssCardSection id="dss-filters-panel" class="q-pt-md">
          <!-- Inputs linha 1 — Quasar q-col-gutter para gutter de 24px via token -->
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-4">
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
            <div class="col-12 col-sm-4">
              <DssInput
                v-model="filterEquipe"
                label="Equipe"
                outlined
                placeholder="Digite para buscar..."
                :disable="disabled"
              >
                <template #append>
                  <DssIcon name="search" aria-hidden="true" />
                </template>
              </DssInput>
            </div>
            <div class="col-12 col-sm-4">
              <DssInput
                v-model="filterCodigo"
                label="Código Serviço"
                outlined
                placeholder="Digite para buscar..."
                :disable="disabled"
              >
                <template #append>
                  <DssIcon name="search" aria-hidden="true" />
                </template>
              </DssInput>
            </div>
          </div>

          <!-- Chips de filtros ativos -->
          <div
            v-if="activeFilters.length"
            class="dss-test-page-complexity__active-chips row q-gutter-sm q-mb-md"
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

          <!-- Botão de busca centralizado -->
          <div class="row justify-center q-mt-sm">
            <DssButton
              color="primary"
              icon="search"
              label="Pesquisar"
              :disable="disabled"
              :loading="loading"
              @click="handleSearch"
            />
          </div>
        </DssCardSection>
      </template>
    </DssCard>

    <!-- ── Tabela de dados (DssDataCard) ── -->
    <!-- Regra Matryoshka: DssDataCard ao nível de página (não aninhado em elevated) ✅ -->
    <DssDataCard
      title="Ordens de Serviço"
      :tabs="dataTabs"
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      :model-value="currentPage"
      :disabled="disabled"
      :loading="loading"
      @update:model-value="handlePageChange"
    >
      <!-- Slot dinâmico da aba "orders" — Regra 2.5: slots tipados -->
      <template #tab-orders>
        <!-- Skeleton de loading -->
        <template v-if="loading">
          <div
            v-for="n in itemsPerPage"
            :key="n"
            class="dss-test-page-complexity__skeleton dss-test-page-complexity__skeleton--row q-pa-sm"
            aria-hidden="true"
          />
        </template>

        <!-- Tabela real -->
        <template v-else>
          <!-- Cabeçalho da tabela (acessível via role=row) -->
          <div class="dss-test-page-complexity__table-header row items-center q-px-sm q-py-xs" role="row" aria-hidden="true">
            <div class="col-auto dss-test-page-complexity__table-col-action" />
            <div
              v-for="col in TABLE_COLUMNS"
              :key="col.key"
              class="col dss-test-page-complexity__table-th"
            >
              {{ col.label }}
            </div>
            <div class="col-auto dss-test-page-complexity__table-col-action" />
          </div>

          <DssSeparator />

          <!-- Linhas da tabela -->
          <div
            v-for="row in tableRows"
            :key="row.id"
            class="dss-test-page-complexity__table-row row items-center q-px-sm q-py-xs"
            role="row"
          >
            <div class="col-auto dss-test-page-complexity__table-col-action">
              <DssCheckbox :disable="disabled" :aria-label="`Selecionar ordem ${row.code}`" />
            </div>
            <div class="col">{{ row.team }}</div>
            <div class="col">{{ row.hasEquipment ? 'Sim' : 'Não' }}</div>
            <div class="col">
              <a
                href="#"
                class="dss-test-page-complexity__link"
                @click.prevent="handleRowView(row)"
              >{{ row.code }}</a>
            </div>
            <div class="col">{{ row.description }}</div>
            <div class="col">{{ row.serviceNumber }}</div>
            <div class="col">{{ row.hCode }}</div>
            <div class="col">{{ row.address }}</div>
            <div class="col">{{ row.neighborhood }}</div>
            <div class="col-auto dss-test-page-complexity__table-col-action">
              <DssButton
                flat
                round
                icon="visibility"
                size="sm"
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

        <!-- Rodapé: total de resultados -->
        <div class="dss-test-page-complexity__table-footer row items-center q-pa-sm">
          <span class="dss-test-page-complexity__results-label col" role="status" aria-live="polite">
            {{ resultsLabel }}
          </span>
          <slot name="table-footer" />
        </div>
      </template>
    </DssDataCard>

  </div>
</template>
