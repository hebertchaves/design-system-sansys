<template>
  <DssComposition v-model="contatos" :columns="columns" title="Contatos" required
    :operations="['add', 'edit', 'remove', 'toggle']"
    :create-draft="() => ({ nome: '', papel: '', available: true })"
    :validate-draft="d => (d.nome ? null : 'Informe o nome do contato.')">
    <template #form="{ draft }">
      <DssInput v-model="draft.nome" label="Nome" />
      <DssInput v-model="draft.papel" label="Papel" />
    </template>
  </DssComposition>
</template>

<script setup>
import { ref } from 'vue'
import DssComposition from './DssComposition.vue'
import DssInput from '../../base/DssInput/DssInput.vue'

const columns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
  { name: 'papel', label: 'Papel', field: 'papel', align: 'left' },
]
const contatos = ref([{ id: 1, nome: 'Ana Souza', papel: 'Responsável', available: true }])
</script>
