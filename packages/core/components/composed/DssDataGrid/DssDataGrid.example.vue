<template>
  <div class="exemplo">
    <!-- 1 — Ficha mínima, com contagem viva -->
    <DssDataGrid
      :rows="registros"
      :fields="camposSimples"
      :total="registros.length"
      title="Clientes"
      aria-label="Clientes cadastrados"
    />

    <!-- 2 — Campos secundários atrás do revelador (visibility: 'hidden') -->
    <DssDataGrid
      :rows="registros"
      :fields="camposComOcultos"
      :total="registros.length"
      title="Solicitações"
      brand="water"
    />

    <!-- 3 — Seleção múltipla com ações no cabeçalho -->
    <DssDataGrid
      v-model="selecionados"
      :rows="registros"
      :fields="camposSimples"
      :total="registros.length"
      title="Seleção em lote"
      selection="multiple"
      :columns-per-row="2"
    >
      <template #head-actions="{ selected, disabled }">
        <DssButton
          label="Exportar seleção"
          icon="download"
          variant="outline"
          size="sm"
          :disabled="disabled || !selected.length"
          @click="eco = `Exportando ${selected.length} registro(s)`"
        />
      </template>
    </DssDataGrid>
    <p v-if="eco" class="exemplo__eco">{{ eco }}</p>

    <!-- 4 — Falha, com nova tentativa -->
    <DssDataGrid
      :rows="[]"
      :fields="camposSimples"
      title="Indisponível"
      error="Não foi possível carregar os registros."
      @retry="eco = 'Nova tentativa solicitada'"
    />

    <!-- 5 — Vazio com saída -->
    <DssDataGrid
      :rows="[]"
      :fields="camposSimples"
      :total="registros.length"
      title="Sem resultados"
      filter-label="Bairro: Centro"
      @clear-filter="eco = 'Filtro limpo'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssDataGrid from './DssDataGrid.vue'
import DssButton from '../../base/DssButton/DssButton.vue'
import type { DssDataGridField } from './types/data-grid.types'

const registros = [
  { id: 1, nome: 'Ana Souza', protocolo: '65665262', situacao: 'Pendente', bairro: 'Centro', abertura: '12/03/2026' },
  { id: 2, nome: 'Bruno Lima', protocolo: '65665263', situacao: 'Em análise', bairro: 'Norte', abertura: '04/07/2026' },
  { id: 3, nome: 'Carla Dias', protocolo: '65665264', situacao: 'Concluída', bairro: 'Sul', abertura: '22/08/2026' },
]

const camposSimples: DssDataGridField[] = [
  { name: 'nome', label: 'Solicitante' },
  { name: 'protocolo', label: 'Protocolo' },
  { name: 'situacao', label: 'Situação' },
]

// `hidden` = atrás do botão "Mais", não ausente.
const camposComOcultos: DssDataGridField[] = [
  ...camposSimples,
  { name: 'bairro', label: 'Bairro', visibility: 'hidden' },
  { name: 'abertura', label: 'Abertura', visibility: 'hidden' },
]

const selecionados = ref<Record<string, unknown>[]>([])
const eco = ref('')
</script>

<style scoped>
.exemplo {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
}

.exemplo__eco {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}
</style>
