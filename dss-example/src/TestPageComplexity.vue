<template>
  <DssTestPageComplexity
    :breadcrumbs="breadcrumbs"
    :status-counts="statusCounts"
    :table-rows="tableRows"
    :total-items="30"
    :current-page="currentPage"
    :items-per-page="5"
    :active-view="activeView"
    :active-filters="activeFilters"
    @update:active-view="activeView = $event"
    @update:current-page="currentPage = $event"
    @filter:remove="onFilterRemove"
    @filter:search="onSearch"
    @row:view="onRowView"
  />
</template>

<script setup>
import { ref } from 'vue'
import DssTestPageComplexity from '../../components/composed/DssTestPageComplexity/DssTestPageComplexity.vue'

const breadcrumbs = [
  { number: 1, label: 'Operacional' },
  { number: 2, label: 'Serviços' },
  { number: 3, label: 'Monitorar Ordem Serviço' },
]

const statusCounts = { onTime: 10, expiring: 10, expired: 10 }

const tableRows = [
  { id: '1', team: 'Equipe A', hasEquipment: true,  code: '12345', description: 'Troca de hidrômetro',    serviceNumber: '987654', hCode: 'H-12345', address: 'Rua das Flores, 123',    neighborhood: 'Centro' },
  { id: '2', team: 'Equipe B', hasEquipment: false, code: '12346', description: 'Reparo de vazamento',    serviceNumber: '987655', hCode: 'H-12346', address: 'Av. Brasil, 456',          neighborhood: 'Jardim América' },
  { id: '3', team: 'Equipe A', hasEquipment: true,  code: '12347', description: 'Inspeção de rede',       serviceNumber: '987656', hCode: 'H-12347', address: 'Rua dos Pinheiros, 789',  neighborhood: 'Vila Nova' },
  { id: '4', team: 'Equipe A', hasEquipment: true,  code: '12348', description: 'Manutenção preventiva',  serviceNumber: '987657', hCode: 'H-12348', address: 'Praça Central, 100',       neighborhood: 'Centro' },
  { id: '5', team: 'Equipe B', hasEquipment: false, code: '12349', description: 'Leitura',                serviceNumber: '987658', hCode: 'H-12349', address: 'Rua do Comércio, 250',    neighborhood: 'Centro' },
]

const activeView    = ref('dashboard')
const currentPage   = ref(1)
const activeFilters = ref([
  { id: 'situacao-aberta',  label: 'Situação: Aberta' },
  { id: 'prioridade-alta',  label: 'Prioridade: Alta' },
])

function onFilterRemove(filterId) {
  activeFilters.value = activeFilters.value.filter(f => f.id !== filterId)
}

function onSearch() {}

function onRowView(_row) {}
</script>
