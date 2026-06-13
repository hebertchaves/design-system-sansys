<template>
  <div class="q-pa-lg">
    <!-- ── Controles do playground ──────────────────────────────────────────── -->
    <div class="row q-gutter-md q-mb-xl">
      <q-toggle v-model="loading"  label="Loading"  color="primary" />
      <q-toggle v-model="disabled" label="Disabled" color="negative" />
      <q-toggle v-model="darkMode" label="Dark mode" color="grey-8"
                @update:model-value="toggleDark" />

      <q-btn-toggle
        v-model="brand"
        :options="[
          { label: 'Sem brand', value: '' },
          { label: 'Hub',       value: 'hub' },
          { label: 'Water',     value: 'water' },
          { label: 'Waste',     value: 'waste' },
        ]"
        unelevated
        toggle-color="primary"
        size="sm"
      />
    </div>

    <!-- ── Cenário 1: Estado completo (default) ─────────────────────────────── -->
    <p class="text-overline text-grey-6 q-mb-sm">Cenário 1 — Estado completo</p>
    <DssTestPageComplexity
      :brand="brand || undefined"
      :loading="loading"
      :disabled="disabled"
      page-title="Ordens de Serviço"
      page-subtitle="Dashboard"
      :breadcrumbs="breadcrumbs"
      :status-counts="statusCounts"
      :table-rows="tableRows"
      :total-items="tableRows.length"
      :current-page="page1"
      :items-per-page="5"
      :active-view="activeView1"
      :active-filters="activeFilters"
      @update:current-page="page1 = $event"
      @update:active-view="activeView1 = $event"
      @filter:remove="removeFilter"
      @filter:search="onSearch"
      @row:view="onRowView"
    >
      <template #filter-actions>
        <q-btn flat dense label="Limpar filtros" color="negative" size="sm"
               @click="activeFilters = []" />
      </template>
      <template #table-footer>
        <q-btn outline dense label="Exportar CSV" icon="download" size="sm" />
      </template>
    </DssTestPageComplexity>

    <q-separator class="q-my-xl" />

    <!-- ── Cenário 2: Estado vazio ─────────────────────────────────────────── -->
    <p class="text-overline text-grey-6 q-mb-sm">Cenário 2 — Tabela vazia</p>
    <DssTestPageComplexity
      :brand="brand || undefined"
      page-title="Ordens de Serviço"
      page-subtitle="Sem resultados"
      :breadcrumbs="breadcrumbs"
      :status-counts="{ onTime: 0, expiring: 0, expired: 0 }"
      :table-rows="[]"
      :total-items="0"
      :current-page="1"
      :items-per-page="5"
      :active-view="'dashboard'"
    />

    <q-separator class="q-my-xl" />

    <!-- ── Cenário 3: Loading ─────────────────────────────────────────────── -->
    <p class="text-overline text-grey-6 q-mb-sm">Cenário 3 — Loading</p>
    <DssTestPageComplexity
      :brand="brand || undefined"
      :loading="true"
      page-title="Ordens de Serviço"
      page-subtitle="Carregando..."
      :breadcrumbs="breadcrumbs"
      :table-rows="[]"
      :total-items="0"
      :current-page="1"
      :items-per-page="5"
      :active-view="'dashboard'"
    />

    <q-separator class="q-my-xl" />

    <!-- ── Cenário 4: Disabled ────────────────────────────────────────────── -->
    <p class="text-overline text-grey-6 q-mb-sm">Cenário 4 — Disabled</p>
    <DssTestPageComplexity
      :brand="brand || undefined"
      :disabled="true"
      page-title="Ordens de Serviço"
      page-subtitle="Módulo desabilitado"
      :breadcrumbs="breadcrumbs"
      :status-counts="statusCounts"
      :table-rows="tableRows"
      :total-items="tableRows.length"
      :current-page="1"
      :items-per-page="5"
      :active-view="'dashboard'"
    />

    <!-- ── Log de eventos ─────────────────────────────────────────────────── -->
    <q-separator class="q-my-xl" />
    <p class="text-overline text-grey-6 q-mb-sm">Log de eventos</p>
    <q-card flat bordered>
      <q-card-section>
        <p v-if="eventLog.length === 0" class="text-grey-5 text-body2">
          Nenhum evento emitido ainda.
        </p>
        <p v-for="(entry, i) in eventLog" :key="i" class="text-body2 q-mb-xs">
          <span class="text-weight-bold">{{ entry.event }}</span>
          <span v-if="entry.payload" class="text-grey-6"> — {{ entry.payload }}</span>
        </p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import DssTestPageComplexity from './DssTestPageComplexity.vue'

const $q = useQuasar()

// ── Controles do playground ───────────────────────────────────────────────────
const loading  = ref(false)
const disabled = ref(false)
const darkMode = ref(false)
const brand    = ref('')

function toggleDark(val) {
  $q.dark.set(val)
}

// ── Estado dos cenários ───────────────────────────────────────────────────────
const page1       = ref(1)
const activeView1 = ref('dashboard')

const activeFilters = ref([
  { id: 'team-a',   label: 'Equipe A' },
  { id: 'expired',  label: 'Vencidas' },
])

// ── Dados de exemplo ──────────────────────────────────────────────────────────
const breadcrumbs = [
  { number: 1, label: 'Início' },
  { number: 2, label: 'Operações' },
  { number: 3, label: 'Ordens de Serviço' },
]

const statusCounts = {
  onTime:   42,
  expiring:  8,
  expired:   3,
}

const tableRows = [
  {
    id: '1',
    team: 'Equipe A',
    hasEquipment: true,
    code: 'OS-001',
    description: 'Manutenção preventiva',
    serviceNumber: 'SV-2024-001',
    hCode: 'H-100',
    address: 'Rua das Flores, 123',
    neighborhood: 'Centro',
  },
  {
    id: '2',
    team: 'Equipe B',
    hasEquipment: false,
    code: 'OS-002',
    description: 'Troca de hidrômetro',
    serviceNumber: 'SV-2024-002',
    hCode: 'H-200',
    address: 'Av. Brasil, 456',
    neighborhood: 'Jardim América',
  },
  {
    id: '3',
    team: 'Equipe A',
    hasEquipment: true,
    code: 'OS-003',
    description: 'Reparo de vazamento',
    serviceNumber: 'SV-2024-003',
    hCode: 'H-300',
    address: 'Rua Ipiranga, 789',
    neighborhood: 'Bela Vista',
  },
  {
    id: '4',
    team: 'Equipe C',
    hasEquipment: false,
    code: 'OS-004',
    description: 'Limpeza de caixa d\'água',
    serviceNumber: 'SV-2024-004',
    hCode: 'H-400',
    address: 'Alameda Santos, 321',
    neighborhood: 'Cerqueira César',
  },
  {
    id: '5',
    team: 'Equipe B',
    hasEquipment: true,
    code: 'OS-005',
    description: 'Inspeção de rede',
    serviceNumber: 'SV-2024-005',
    hCode: 'H-500',
    address: 'Rua Augusta, 654',
    neighborhood: 'Consolação',
  },
]

// ── Handlers de evento ────────────────────────────────────────────────────────
const eventLog = ref([])

function logEvent(event, payload) {
  eventLog.value.unshift({ event, payload: payload ? JSON.stringify(payload) : null })
  if (eventLog.value.length > 10) eventLog.value.pop()
}

function removeFilter(filterId) {
  activeFilters.value = activeFilters.value.filter(f => f.id !== filterId)
  logEvent('filter:remove', filterId)
}

function onSearch() {
  logEvent('filter:search')
}

function onRowView(row) {
  logEvent('row:view', { id: row.id, code: row.code })
}
</script>
