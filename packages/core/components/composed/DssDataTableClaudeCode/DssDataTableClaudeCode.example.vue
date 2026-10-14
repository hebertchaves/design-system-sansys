<template>
  <div class="exemplo">
    <!-- 1 — Pattern "Solicitações": situação como chip, filtro aplicado, contagem -->
    <DssDataTableClaudeCode
      :rows="linhasFiltradas"
      :columns="colunas"
      :total="registros.length"
      :filter-label="filtroAplicado"
      title="Solicitações"
      aria-label="Solicitações operacionais"
      status-column="situacao"
      :status-map="mapaDeSituacao"
      brand="water"
      @clear-filter="filtroAplicado = null"
    />

    <!-- 2 — Ações em lote com o `mode` herdado do Jtech -->
    <DssDataTableClaudeCode
      v-model="selecionadas"
      :rows="registros"
      :columns="colunas"
      :total="registros.length"
      title="Ações em lote"
      selection="multiple"
      :actions="acoes"
      :row-actions="acoesDeLinha"
      status-column="situacao"
      :status-map="mapaDeSituacao"
      @action="ultimaAcao = $event.action.label"
    />
    <p v-if="ultimaAcao" class="exemplo__eco">Última ação: {{ ultimaAcao }}</p>

    <!-- 3 — Pattern "Check-in NFAg": detalhe expansível -->
    <DssDataTableClaudeCode
      v-model:expanded-keys="expandidas"
      :rows="registros"
      :columns="colunas"
      :total="registros.length"
      title="Verificações de configuração"
      expandable
    >
      <template #expanded-row="{ row }">
        <strong>{{ row.protocolo }}</strong> · {{ row.detalhe }}
      </template>
    </DssDataTableClaudeCode>

    <!-- 4 — Falha, com nova tentativa -->
    <DssDataTableClaudeCode
      :rows="[]"
      :columns="colunas"
      title="Indisponível"
      mode="remote"
      error="Não foi possível carregar os dados."
      @retry="ultimaAcao = 'Nova tentativa solicitada'"
    />

    <!-- 5 — Vazio com saída -->
    <DssDataTableClaudeCode
      :rows="[]"
      :columns="colunas"
      :total="registros.length"
      title="Sem resultados"
      filter-label="Setor Norte"
      @clear-filter="ultimaAcao = 'Filtro limpo'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DssDataTableClaudeCode from './DssDataTableClaudeCode.vue'
import type { DssDataTableCcAction, DssDataTableCcStatus } from './types/data-table-claude-code.types'

const colunas = [
  { name: 'protocolo', label: 'Protocolo', field: 'protocolo', align: 'left' as const, sortable: true },
  { name: 'servico', label: 'Serviço', field: 'servico', align: 'left' as const },
  { name: 'situacao', label: 'Situação', field: 'situacao', align: 'left' as const },
]

const registros = [
  { id: 1, protocolo: '65665262', servico: 'Religação de água', situacao: 'Atrasada', detalhe: 'Visita técnica aguardando agendamento.' },
  { id: 2, protocolo: '65665263', servico: 'Aferição de hidrômetro', situacao: 'No prazo', detalhe: 'Documentação recebida.' },
  { id: 3, protocolo: '65665264', servico: 'Corte a pedido', situacao: 'Em análise', detalhe: 'Aguardando parecer comercial.' },
]

const mapaDeSituacao: Record<string, DssDataTableCcStatus> = {
  Atrasada: { tone: 'error', icon: 'notification_important' },
  'No prazo': { tone: 'success', icon: 'schedule' },
  'Em análise': { tone: 'warning', icon: 'hourglass_top' },
}

const acoes: DssDataTableCcAction[] = [
  { name: 'novo', label: 'Novo', icon: 'add', mode: 'none' },
  { name: 'editar', label: 'Editar', icon: 'edit', mode: 'single' },
  { name: 'exportar', label: 'Exportar', icon: 'download', mode: 'any' },
]
const acoesDeLinha: DssDataTableCcAction[] = [{ name: 'abrir', label: 'Abrir', icon: 'visibility' }]

const selecionadas = ref<Record<string, unknown>[]>([])
const expandidas = ref<Array<string | number>>([])
const ultimaAcao = ref('')

// A PÁGINA filtra — o bloco só apresenta. Ver o contrato normativo.
const filtroAplicado = ref<string | null>('Situação: Atrasada')
const linhasFiltradas = computed(() =>
  filtroAplicado.value ? registros.filter((linha) => linha.situacao === 'Atrasada') : registros,
)
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
