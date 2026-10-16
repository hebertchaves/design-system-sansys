<template>
  <div class="exemplo">
    <!-- 1 — Coleção obrigatória dentro de um DssForm: o submit valida a lista -->
    <DssForm class="exemplo__form" @submit="eco = 'Cadastro válido.'" @validation-error="eco = 'Inclua ao menos um endereço.'">
      <DssComposition
        v-model="enderecos"
        label="Endereços"
        row-key="id"
        required
        :columns="colunasDeEndereco"
        :new-record="novoEndereco"
      >
        <template #form="{ record }">
          <DssInput v-model="record.logradouro" label="Logradouro" :rules="[(v) => !!v || 'Informe o logradouro']" />
          <DssInput v-model="record.bairro" label="Bairro" />
        </template>
      </DssComposition>
      <DssButton type="submit" label="Salvar cadastro" color="primary" />
    </DssForm>

    <!-- 2 — Ações por linha: registro novo se exclui; gravado se inativa -->
    <DssComposition
      v-model="contatos"
      label="Contatos"
      row-key="id"
      brand="water"
      :columns="colunasDeContato"
      :row-actions="acoesDeContato"
      :new-record="novoContato"
      @inactivate="({ row }) => mudar(row, false)"
      @activate="({ row }) => mudar(row, true)"
    >
      <template #form="{ record }">
        <DssInput v-model="record.nome" label="Nome" :rules="[(v) => !!v || 'Informe o nome']" />
      </template>
    </DssComposition>

    <!-- 3 — Somente leitura: a lista sem ações, fora da validação -->
    <DssComposition
      v-model="medidores"
      label="Medidores"
      row-key="id"
      readonly
      :columns="colunasDeMedidor"
    />

    <p v-if="eco" class="exemplo__eco">{{ eco }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssComposition from './DssComposition.vue'
import DssForm from '../DssForm/DssForm.vue'
import DssInput from '../../base/DssInput/DssInput.vue'
import DssButton from '../../base/DssButton/DssButton.vue'

type Linha = Record<string, unknown>

let proximoId = 100
const eco = ref('')

const enderecos = ref<Linha[]>([])
const colunasDeEndereco = [
  { name: 'logradouro', label: 'Logradouro', field: 'logradouro', align: 'left' as const },
  { name: 'bairro', label: 'Bairro', field: 'bairro', align: 'left' as const },
]
const novoEndereco = () => ({ id: ++proximoId, logradouro: '', bairro: '' })

const contatos = ref<Linha[]>([
  { id: 1, nome: 'Ana Souza', gravado: true, ativo: true },
  { id: 2, nome: 'Bruno Lima', gravado: true, ativo: false },
])
const colunasDeContato = [{ name: 'nome', label: 'Nome', field: 'nome', align: 'left' as const }]
const editar = { name: 'edit', label: 'Editar', icon: 'edit', intent: 'edit' as const }
const excluir = { name: 'remove', label: 'Excluir', icon: 'delete', intent: 'remove' as const, color: 'negative' as const }
const inativar = { name: 'inactivate', label: 'Inativar', icon: 'block', intent: 'inactivate' as const }
const ativar = { name: 'activate', label: 'Ativar', icon: 'check_circle', intent: 'activate' as const }
const acoesDeContato = (linha: Linha) =>
  !linha.gravado ? [editar, excluir] : linha.ativo ? [editar, inativar] : [ativar]
const novoContato = () => ({ id: ++proximoId, nome: '', gravado: false, ativo: true })
function mudar(linha: Linha | undefined, ativo: boolean) {
  if (!linha) return
  contatos.value = contatos.value.map((c) => (c.id === linha.id ? { ...c, ativo } : c))
}

const medidores = ref<Linha[]>([{ id: 1, numero: 'A23-004512' }])
const colunasDeMedidor = [{ name: 'numero', label: 'Número', field: 'numero', align: 'left' as const }]
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
