<script setup lang="ts">
/**
 * ==========================================================================
 * DssTable — Exemplos de uso
 * ==========================================================================
 *
 * Seis cenários reais.
 *
 * Reescrito em set/2026. A versão anterior montava o filtro com `<q-input>`, a
 * troca de densidade com `<q-btn-toggle>` e o ícone com `<q-icon>` — Quasar CRU
 * dentro de um componente DSS, que é o anti-padrão que o Cartão Composto
 * proíbe nominalmente. Carregava também um `style="width: var(--dss-spacing-6)"`
 * no campo de filtro: 24px de largura para digitar.
 *
 * Os slots do QTable (`top-right`, `body-cell-*`) são repassados pelo
 * forwarding dinâmico do DssTable, e é por eles que os componentes DSS entram
 * na tabela.
 */
import { ref, computed } from 'vue'
import DssTable from './DssTable.vue'
import DssInput from '../../base/DssInput/DssInput.vue'
import DssButton from '../../base/DssButton/DssButton.vue'
import DssChip from '../../base/DssChip/DssChip.vue'
import DssBtnToggle from '../../base/DssBtnToggle/DssBtnToggle.vue'

// ─── Dados compartilhados ────────────────────────────────────────────────────

const columns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left' as const, sortable: true },
  { name: 'cargo', label: 'Cargo', field: 'cargo', align: 'left' as const, sortable: true },
  { name: 'departamento', label: 'Departamento', field: 'departamento', align: 'left' as const, sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'center' as const, sortable: false },
]

const rows = [
  { id: 1, nome: 'Ana Souza', cargo: 'Engenheira', departamento: 'TI', status: 'Ativo' },
  { id: 2, nome: 'Bruno Lima', cargo: 'Designer', departamento: 'UX', status: 'Ativo' },
  { id: 3, nome: 'Carla Melo', cargo: 'Analista', departamento: 'Dados', status: 'Inativo' },
  { id: 4, nome: 'Diego Rocha', cargo: 'Gerente', departamento: 'TI', status: 'Ativo' },
  { id: 5, nome: 'Elena Costa', cargo: 'Arquiteta', departamento: 'TI', status: 'Ativo' },
]

// ─── Cenário 2: Seleção múltipla ────────────────────────────────────────────

const selecionadas = ref<Record<string, unknown>[]>([])

// ─── Cenário 3: Filtro no slot `top-right` ──────────────────────────────────

const filtro = ref('')

// ─── Cenário 4: Densidade ───────────────────────────────────────────────────

const densidade = ref<'compact' | 'standard' | 'comfortable'>('standard')
const OPCOES_DENSIDADE = [
  { label: 'Compact', value: 'compact' },
  { label: 'Standard', value: 'standard' },
  { label: 'Comfortable', value: 'comfortable' },
]

// ─── Cenário 5: Componentes DSS dentro das células ──────────────────────────

const corDoStatus = computed(() => (status: unknown) =>
  status === 'Ativo' ? 'positive' : 'negative',
)
</script>

<template>
  <div class="dss-table-examples">

    <!-- Cenário 1 -->
    <section>
      <h3>1. Tabela básica com ordenação</h3>
      <p class="ex-nota">
        As colunas com <code>sortable</code> ganham o controle de ordenação. Marcar tudo
        como ordenável é ruído: só é ordenável o que alguém ordena de verdade.
      </p>
      <DssTable :rows="rows" :columns="columns" row-key="id" title="Colaboradores" />
    </section>

    <!-- Cenário 2 -->
    <section>
      <h3>2. Seleção múltipla</h3>
      <p class="ex-nota">
        Selecionadas: <strong>{{ selecionadas.length }}</strong>. Em
        <code>multiple</code> a tabela ganha a coluna de caixas e o seletor do cabeçalho —
        e é aí que mora a acessibilidade: cada caixa precisa de nome próprio, senão o
        leitor de tela anuncia N caixas idênticas.
      </p>
      <DssTable
        v-model="selecionadas"
        :rows="rows"
        :columns="columns"
        row-key="id"
        selection="multiple"
      />
    </section>

    <!-- Cenário 3: slot top-right -->
    <section>
      <h3>3. Filtro no slot <code>top-right</code></h3>
      <p class="ex-nota">
        A barra superior é slot, não prop: quem decide o que fica ali é quem monta a tela.
        O campo é um <code>DssInput</code> — não um <code>q-input</code> —, e entra pelo
        repasse dinâmico de slots do <code>DssTable</code>.
      </p>
      <DssTable
        :rows="rows"
        :columns="columns"
        row-key="id"
        :filter="filtro"
        title="Colaboradores"
        no-results-label="Nenhuma linha casa com o filtro."
      >
        <template #top-right>
          <DssInput
            v-model="filtro"
            dense
            label="Filtrar"
            clearable
            class="ex-filtro"
          />
        </template>
      </DssTable>
    </section>

    <!-- Cenário 4 -->
    <section>
      <h3>4. Densidade</h3>
      <p class="ex-nota">
        Três degraus de altura de linha. A altura sai do <strong>padding</strong> da célula,
        não de uma altura declarada — por isso conteúdo com altura própria dentro da célula
        estica a linha. Ver o cenário 5.
      </p>
      <DssBtnToggle v-model="densidade" :options="OPCOES_DENSIDADE" class="ex-densidade" />
      <DssTable :rows="rows" :columns="columns" row-key="id" :density="densidade" />
    </section>

    <!-- Cenário 5: componentes DSS nas células -->
    <section>
      <h3>5. Componentes DSS dentro das células</h3>
      <p class="ex-nota">
        O slot <code>body-cell-[nome]</code> troca o conteúdo de UMA coluna. Aqui o status
        vira <code>DssChip</code> e a última coluna ganha um <code>DssButton</code>.
        <strong>Meça a altura da linha contra o cenário 1:</strong> chip e botão têm altura
        mínima própria (alvo de toque), e a linha cresce para caber — é o comportamento
        correto, não um defeito, mas precisa ser decidido e não descoberto.
      </p>
      <DssTable
        :rows="rows"
        :columns="[...columns, { name: 'acoes', label: 'Ações', field: 'id', align: 'right' as const }]"
        row-key="id"
        density="compact"
      >
        <template #body-cell-status="props">
          <td class="text-center">
            <DssChip
              :color="corDoStatus(props.row.status)"
              size="xs"
              dense
              :icon="props.row.status === 'Ativo' ? 'check_circle' : 'cancel'"
              :label="String(props.row.status)"
            />
          </td>
        </template>
        <template #body-cell-acoes="props">
          <td class="text-right">
            <DssButton
              variant="flat"
              color="primary"
              size="xs"
              icon="edit"
              :aria-label="`Editar ${props.row.nome}`"
            />
          </td>
        </template>
      </DssTable>
    </section>

    <!-- Cenário 6: marca -->
    <section data-brand="hub">
      <h3>6. Marca</h3>
      <p class="ex-nota">
        A tabela é superfície: ela não vira colorida dentro de uma página com marca. O que
        acompanha a marca são os componentes de ação que moram dentro dela.
      </p>
      <DssTable :rows="rows" :columns="columns" row-key="id" title="Colaboradores — Hub" selection="single" />
    </section>

  </div>
</template>

<style scoped>
.dss-table-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
}

.dss-table-examples h3 {
  margin: 0 0 var(--dss-spacing-2);
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold);
  line-height: var(--dss-line-height-snug);
  color: var(--dss-text-primary);
}

.ex-nota {
  margin: 0 0 var(--dss-spacing-3);
  max-width: 76ch;
  font-size: var(--dss-font-size-sm);
  line-height: var(--dss-line-height-relaxed);
  color: var(--dss-text-subtle);
}

/* O campo de filtro da barra superior precisa de largura útil. A versão
   anterior declarava `width: var(--dss-spacing-6)` — 24px para digitar. */
.ex-filtro {
  min-width: var(--dss-spacing-56);
}

.ex-densidade {
  margin-bottom: var(--dss-spacing-3);
}
</style>
