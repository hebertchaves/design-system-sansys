<template>
  <DssDataTable
    v-model="selected"
    v-model:filter="filter"
    v-model:pagination="pagination"
    v-model:expanded-keys="expanded"
    :rows="rows"
    :columns="columns"
    :actions="actions"
    :row-actions="rowActions"
    title="Solicitações"
    aria-label="Solicitações operacionais"
    selection="multiple"
    expandable
    density="compact"
    brand="water"
    @action="lastAction = $event.action.label"
  >
    <template #expanded-row="{ row }">
      <strong>{{ row.protocolo }}</strong> · {{ row.descricao }}
    </template>
  </DssDataTable>
  <p v-if="lastAction">Última ação: {{ lastAction }}</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DssDataTable from './DssDataTable.vue'
const filter = ref('')
const selected = ref<Record<string, unknown>[]>([])
const expanded = ref<Array<string | number>>([])
const pagination = ref({ page: 1, rowsPerPage: 10 })
const lastAction = ref('')
const columns = [
  { name: 'protocolo', label: 'Protocolo', field: 'protocolo', align: 'left' as const, sortable: true },
  { name: 'servico', label: 'Serviço', field: 'servico', align: 'left' as const },
  { name: 'situacao', label: 'Situação', field: 'situacao', align: 'left' as const },
]
const rows = [
  { id: 1, protocolo: '65665262', servico: 'Religação de água', situacao: 'Pendente', descricao: 'Visita técnica aguardando agendamento.' },
  { id: 2, protocolo: '65665263', servico: 'Aferição de hidrômetro', situacao: 'Em análise', descricao: 'Documentação recebida.' },
]
const actions = [{ name: 'archive', label: 'Arquivar', icon: 'archive', requiresSelection: true, multiple: true }]
const rowActions = [{ name: 'view', label: 'Abrir', icon: 'visibility' }]
</script>
