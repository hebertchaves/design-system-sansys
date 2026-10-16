<template>
  <div class="exemplo">
    <!-- 1 — Cadastro com três coleções em abas; "Endereços" é obrigatória -->
    <DssForm class="exemplo__form" @submit="eco = 'Cadastro válido.'" @validation-error="eco = 'Veja as abas marcadas.'">
      <DssCompositionGroup v-model="aba" aria-label="Coleções do cliente">
        <DssComposition v-model="contatos" name="contatos" label="Contatos" row-key="id" :columns="colunas" :new-record="novo">
          <template #form="{ record }"><DssInput v-model="record.nome" label="Nome" /></template>
        </DssComposition>
        <DssComposition v-model="enderecos" name="enderecos" label="Endereços" row-key="id" required :columns="colunas" :new-record="novo">
          <template #form="{ record }"><DssInput v-model="record.nome" label="Logradouro" /></template>
        </DssComposition>
        <DssComposition v-model="medidores" name="medidores" label="Medidores" row-key="id" readonly :columns="colunas" />
      </DssCompositionGroup>
      <!-- 2 — Submeter sem abrir "Endereços": a aba acende com erro (risco 5) -->
      <DssButton type="submit" label="Salvar cadastro" color="primary" />
    </DssForm>

    <!-- 3 — Com marca: o indicador da aba ativa acompanha a marca -->
    <DssCompositionGroup brand="waste" aria-label="Coleções do contrato">
      <DssComposition v-model="contatos" name="c2" label="Responsáveis" row-key="id" :columns="colunas" readonly />
      <DssComposition v-model="medidores" name="m2" label="Pontos de coleta" row-key="id" :columns="colunas" readonly />
    </DssCompositionGroup>

    <p v-if="eco" class="exemplo__eco">{{ eco }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssCompositionGroup from './DssCompositionGroup.vue'
import DssComposition from '../DssComposition/DssComposition.vue'
import DssForm from '../DssForm/DssForm.vue'
import DssInput from '../../base/DssInput/DssInput.vue'
import DssButton from '../../base/DssButton/DssButton.vue'

type Linha = Record<string, unknown>

let proximoId = 100
const aba = ref<string | null>(null)
const eco = ref('')
const colunas = [{ name: 'nome', label: 'Nome', field: 'nome', align: 'left' as const }]
const novo = () => ({ id: ++proximoId, nome: '' })
const contatos = ref<Linha[]>([{ id: 1, nome: 'Ana Souza' }])
const enderecos = ref<Linha[]>([])
const medidores = ref<Linha[]>([{ id: 1, nome: 'A23-004512' }])
</script>

<style scoped>
.exemplo {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
}

.exemplo__form {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

.exemplo__eco {
  margin: 0;
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}
</style>
