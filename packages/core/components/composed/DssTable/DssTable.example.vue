<script setup lang="ts">
// DssTable — Exemplos interativos
import { ref } from 'vue'
import DssTable from './DssTable.vue'

// ─── Dados compartilhados ────────────────────────────────────────────────────

const columns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
  { name: 'cargo', label: 'Cargo', field: 'cargo', align: 'left', sortable: true },
  { name: 'departamento', label: 'Departamento', field: 'departamento', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'center', sortable: false }
]

const rows = [
  { id: 1, nome: 'Ana Souza', cargo: 'Engenheira', departamento: 'TI', status: 'Ativo' },
  { id: 2, nome: 'Bruno Lima', cargo: 'Designer', departamento: 'UX', status: 'Ativo' },
  { id: 3, nome: 'Carla Melo', cargo: 'Analista', departamento: 'Dados', status: 'Inativo' },
  { id: 4, nome: 'Diego Rocha', cargo: 'Gerente', departamento: 'TI', status: 'Ativo' },
  { id: 5, nome: 'Elena Costa', cargo: 'Arquiteta', departamento: 'TI', status: 'Ativo' }
]

// ─── Cenário 2: Seleção múltipla ────────────────────────────────────────────

const selected = ref([])

// ─── Cenário 3: Server-side com filtro ──────────────────────────────────────

const filter = ref('')
const serverRows = ref([...rows])
const serverPagination = ref({ page: 1, rowsPerPage: 3, rowsNumber: rows.length })
const serverLoading = ref(false)

function onRequest (reqProps) {
  serverLoading.value = true
  setTimeout(() => {
    const { page, rowsPerPage } = reqProps.pagination
    const start = (page - 1) * rowsPerPage
    serverRows.value = rows.slice(start, start + rowsPerPage)
    serverPagination.value = { ...reqProps.pagination, rowsNumber: rows.length }
    serverLoading.value = false
  }, 600)
}

// ─── Cenário 4: Density ─────────────────────────────────────────────────────

const density = ref('standard')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-gap-6); padding: var(--dss-padding-4);">

    <!-- Cenário 1: Tabela básica com ordenação -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">Tabela básica com ordenação</h3>
      <DssTable
        :rows="rows"
        :columns="columns"
        row-key="id"
        title="Colaboradores"
      />
    </section>

    <!-- Cenário 2: Seleção múltipla -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">Seleção múltipla</h3>
      <p style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); margin-bottom: var(--dss-spacing-3);">
        {{ selected.length }} linha(s) selecionada(s)
      </p>
      <DssTable
        v-model="selected"
        :rows="rows"
        :columns="columns"
        row-key="id"
        selection="multiple"
      />
    </section>

    <!-- Cenário 3: Server-side com filtro -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">Server-side com filtro e paginação</h3>
      <DssTable
        v-model:pagination="serverPagination"
        :rows="serverRows"
        :columns="columns"
        row-key="id"
        :loading="serverLoading"
        :rows-per-page-options="[3, 5]"
        @request="onRequest"
      >
        <template #top-right>
          <q-input
            v-model="filter"
            dense
            outlined
            debounce="300"
            placeholder="Filtrar..."
            style="width: var(--dss-spacing-6);"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </DssTable>
    </section>

    <!-- Cenário 4: Variantes de densidade -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">Densidade</h3>
      <div style="display: flex; gap: var(--dss-gap-3); margin-bottom: var(--dss-spacing-3);">
        <q-btn-toggle
          v-model="density"
          :options="[
            { label: 'Compact', value: 'compact' },
            { label: 'Standard', value: 'standard' },
            { label: 'Comfortable', value: 'comfortable' }
          ]"
          flat
          no-caps
        />
      </div>
      <DssTable
        :rows="rows"
        :columns="columns"
        row-key="id"
        :density="density"
      />
    </section>

    <!-- Cenário 5: Brand Hub -->
    <section data-brand="hub">
      <h3 style="margin-bottom: var(--dss-spacing-3);">Brand Hub</h3>
      <DssTable
        :rows="rows"
        :columns="columns"
        row-key="id"
        title="Colaboradores — Hub"
      />
    </section>

    <!-- Cenário 6: Brand Water -->
    <section data-brand="water">
      <h3 style="margin-bottom: var(--dss-spacing-3);">Brand Water</h3>
      <DssTable
        :rows="rows"
        :columns="columns"
        row-key="id"
        selection="single"
      />
    </section>

  </div>
</template>
