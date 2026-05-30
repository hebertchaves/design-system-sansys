<template>
  <div class="dss-select-examples">
    <h2>DssSelect — Exemplos</h2>

    <!-- ================================================================
         CENÁRIO 1: Select simples (outlined padrão)
         ================================================================ -->
    <section>
      <h3>1. Select básico — outlined (padrão)</h3>
      <DssSelect
        v-model="cidade"
        :options="cidades"
        label="Cidade"
        hint="Selecione a cidade de entrega"
      />
      <p>Selecionado: {{ cidade }}</p>
    </section>

    <!-- ================================================================
         CENÁRIO 2: Seleção múltipla com chips nativos
         ================================================================ -->
    <section>
      <h3>2. Seleção múltipla com chips (useChips)</h3>
      <DssSelect
        v-model="categorias"
        :options="opcoesCategorias"
        label="Categorias"
        multiple
        use-chips
        clearable
        hint="Selecione uma ou mais categorias"
      />
      <p>Selecionados: {{ categorias }}</p>
    </section>

    <!-- ================================================================
         CENÁRIO 3: Seleção múltipla com DssChip via slot selected-item
         (chips 100% governados pelo DSS)
         ================================================================ -->
    <section>
      <h3>3. Seleção múltipla com DssChip (slot selected-item)</h3>
      <DssSelect
        v-model="tags"
        :options="opcoesTags"
        label="Tags"
        multiple
        use-input
        hint="Chips governados pelo DssChip"
      >
        <template #selected-item="{ opt, index }">
          <!-- DssChip integrado via slot para governança DSS total -->
          <DssChip
            :key="index"
            :label="opt.label ?? opt"
            removable
            @remove="tags.splice(index, 1)"
          />
        </template>
      </DssSelect>
    </section>

    <!-- ================================================================
         CENÁRIO 4: Variantes visuais e brandabilidade
         ================================================================ -->
    <section>
      <h3>4. Variantes e brandabilidade</h3>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <DssSelect
          v-model="plano"
          :options="opcoesPlano"
          variant="filled"
          label="Plano (filled)"
          brand="hub"
        />
        <DssSelect
          v-model="plano"
          :options="opcoesPlano"
          variant="standout"
          label="Plano (standout)"
          brand="water"
        />
        <DssSelect
          v-model="plano"
          :options="opcoesPlano"
          variant="borderless"
          label="Plano (borderless)"
          brand="waste"
        />
      </div>
    </section>

    <!-- ================================================================
         CENÁRIO 5: Estados de formulário
         ================================================================ -->
    <section>
      <h3>5. Estados — disabled, readonly, error, loading</h3>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <DssSelect
          v-model="statusSelect"
          :options="opcoesStatus"
          label="Status (disabled)"
          disabled
        />
        <DssSelect
          v-model="statusSelect"
          :options="opcoesStatus"
          label="Status (readonly)"
          readonly
        />
        <DssSelect
          v-model="statusSelect"
          :options="opcoesStatus"
          label="Status (error)"
          error
          error-message="Campo obrigatório. Selecione um status."
        />
        <DssSelect
          v-model="statusSelect"
          :options="opcoesStatus"
          label="Status (loading)"
          loading
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DssSelect } from './index.js'
// Importar DssChip do barrel quando disponível:
// import { DssChip } from '../DssChip/index.js'

const cidade = ref('')
const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre']

const categorias = ref([])
const opcoesCategorias = [
  { label: 'Tecnologia', value: 'tech' },
  { label: 'Saúde', value: 'health' },
  { label: 'Educação', value: 'edu' },
  { label: 'Finanças', value: 'finance' }
]

const tags = ref([])
const opcoesTags = ['Vue.js', 'TypeScript', 'Figma', 'SCSS', 'A11Y', 'DSS']

const plano = ref(null)
const opcoesPlano = [
  { label: 'Plano Básico', value: 'basic' },
  { label: 'Plano Pro', value: 'pro' },
  { label: 'Plano Enterprise', value: 'enterprise' }
]

const statusSelect = ref({ label: 'Ativo', value: 'active' })
const opcoesStatus = [
  { label: 'Ativo', value: 'active' },
  { label: 'Inativo', value: 'inactive' },
  { label: 'Pendente', value: 'pending' }
]
</script>
