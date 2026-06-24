<template>
  <!-- Showcase canônico do DssSelect — embeddable, Token First, padrões atuais.
       Consumido pelo sandbox (TestSelect.vue → seção "Exemplos do componente"). -->
  <div class="dss-examples">
    <div class="dss-examples__item">
      <span class="dss-examples__label">Básico (outlined)</span>
      <DssSelect v-model="cidade" :options="cidades" label="Cidade" hint="Cidade de entrega" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Múltipla + chips + clearable</span>
      <DssSelect v-model="categorias" :options="opcoesCategorias" label="Categorias"
        multiple use-chips clearable hint="Uma ou mais categorias" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Múltipla com DssChip (slot selected-item)</span>
      <DssSelect v-model="tags" :options="opcoesTags" label="Tags" multiple use-input>
        <template #selected-item="{ opt, index }">
          <DssChip :key="index" :label="opt" removable @remove="tags.splice(index, 1)" />
        </template>
      </DssSelect>
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Standout + brand</span>
      <DssSelect v-model="plano" :options="opcoesPlano" variant="standout" label="Plano" brand="water" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Erro</span>
      <DssSelect v-model="status" :options="opcoesStatus" label="Status" error
        error-message="Selecione um status" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Caso de uso: status com cor (#option + #selected-item)</span>
      <DssSelect v-model="statusCor" :options="opcoesStatus" label="Status">
        <template #option="{ itemProps, opt }">
          <q-item v-bind="itemProps">
            <q-item-section avatar><DssIcon name="circle" inline decorative :style="{ color: statusColor(opt) }" /></q-item-section>
            <q-item-section>{{ opt }}</q-item-section>
          </q-item>
        </template>
        <template #selected-item="{ opt }">
          <span><DssIcon name="circle" inline decorative :style="{ color: statusColor(opt) }" /> {{ opt }}</span>
        </template>
      </DssSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssSelect from './DssSelect.vue'
import DssChip from '../DssChip/DssChip.vue'
import DssIcon from '../DssIcon/DssIcon.vue'

const cidade = ref('')
const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre']

const categorias = ref<string[]>([])
const opcoesCategorias = ['Tecnologia', 'Saúde', 'Educação', 'Finanças']

const tags = ref<string[]>(['Vue.js', 'DSS'])
const opcoesTags = ['Vue.js', 'TypeScript', 'Figma', 'SCSS', 'A11Y', 'DSS']

const plano = ref(null)
const opcoesPlano = ['Básico', 'Pro', 'Enterprise']

const status = ref(null)
const statusCor = ref('Ativo')
const opcoesStatus = ['Ativo', 'Pendente', 'Inativo']
const statusColor = (s: string) => ({
  Ativo: 'var(--dss-positive)',
  Pendente: 'var(--dss-warning)',
  Inativo: 'var(--dss-text-disabled)',
}[s] || 'var(--dss-text-secondary)')
</script>

<style scoped>
.dss-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--dss-spacing-6);
}
.dss-examples__item {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
}
.dss-examples__label {
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-secondary);
}
</style>
