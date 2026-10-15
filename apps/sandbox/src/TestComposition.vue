<template>
  <div class="cp-test" :data-theme="theme" :data-brand="brand">
    <div class="cp-devbar" role="group" aria-label="Sandbox — estado da composição">
      <div class="cp-devbar__states">
        <span class="cp-devbar__label">sandbox · estado</span>
        <DssButton v-for="item in scenarios" :key="item.value" :label="item.label" size="xs"
          :variant="scenario === item.value ? 'unelevated' : 'flat'" color="primary"
          :aria-pressed="scenario === item.value" @click="applyScenario(item.value)" />
      </div>
      <div class="cp-devbar__presentation" role="group" aria-label="Apresentação da demonstração">
        <DssButton variant="flat" round size="md" :icon="theme === 'dark' ? 'light_mode' : 'dark_mode'"
          :aria-label="theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'" @click="theme = theme === 'dark' ? 'light' : 'dark'" />
        <DssBtnToggle v-model="brand" :options="brandOptions" variant="flat" aria-label="Marca da demonstração" />
      </div>
    </div>

    <main class="cp-stage">
      <header class="cp-heading">
        <div>
          <p class="cp-eyebrow">WebComps → DSS</p>
          <h1>DssComposition</h1>
        </div>
        <DssButton label="Validar cadastro" icon="task_alt" variant="unelevated" color="primary" @click="validateAll" />
      </header>

      <DssCard variant="outlined" class="cp-card">
        <DssCompositions v-model="tab" :items="items" :brand="brand" aria-label="Composições do cliente">
          <template #contatos>
            <DssComposition ref="contatosRef" v-model="contatos" :columns="contatoColumns" title="Contatos" required
              :brand="brand" :loading="scenario === 'loading'" :disabled="scenario === 'readonly'"
              :operations="scenario === 'readonly' ? ['detail'] : ['add', 'edit', 'remove', 'toggle', 'detail']"
              :create-draft="() => ({ nome: '', papel: '', telefone: '', available: true })"
              :validate-draft="validateContato" @change="onChange">
              <template #form="{ draft }">
                <DssInput v-model="draft.nome" label="Nome *" />
                <DssInput v-model="draft.papel" label="Papel" />
                <DssInput v-model="draft.telefone" label="Telefone" />
              </template>
            </DssComposition>
          </template>
          <template #ligacoes>
            <DssComposition ref="ligacoesRef" v-model="ligacoes" :columns="ligacaoColumns" title="Ligações"
              :brand="brand" :disabled="scenario === 'readonly'" :operations="['add', 'edit', 'remove']"
              :create-draft="() => ({ matricula: '', endereco: '' })"
              :validate-draft="d => (d.matricula ? null : 'Informe a matrícula.')" @change="onChange">
              <template #form="{ draft }">
                <DssInput v-model="draft.matricula" label="Matrícula *" />
                <DssInput v-model="draft.endereco" label="Endereço" />
              </template>
            </DssComposition>
          </template>
        </DssCompositions>
      </DssCard>

      <DssBanner v-if="feedback" :variant="feedbackVariant" rounded dense dismissible @dismiss="feedback = ''">{{ feedback }}</DssBanner>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DssComposition from '@components/composed/DssComposition/DssComposition.vue'
import DssCompositions from '@components/composed/DssComposition/DssCompositions.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssBtnToggle from '@components/base/DssBtnToggle/DssBtnToggle.vue'
import DssBanner from '@components/base/DssBanner/DssBanner.vue'
import DssCard from '@components/base/DssCard/DssCard.vue'
import DssInput from '@components/base/DssInput/DssInput.vue'

type Row = Record<string, unknown>
const seedContatos = (): Row[] => [
  { id: 1, nome: 'Ana Souza', papel: 'Responsável financeiro', telefone: '(11) 98888-1020', available: true },
  { id: 2, nome: 'Carlos Lima', papel: 'Síndico', telefone: '(11) 97777-3344', available: false },
]
const seedLigacoes = (): Row[] => [{ id: 10, matricula: '0045821-7', endereco: 'Rua das Acácias, 120' }]

const scenario = ref('filled')
const theme = ref('light')
const brand = ref('water')
const tab = ref('contatos')
const contatos = ref<Row[]>(seedContatos())
const ligacoes = ref<Row[]>(seedLigacoes())
const feedback = ref('')
const feedbackVariant = ref<'info' | 'success' | 'error'>('info')
const contatosValid = ref(true)
const contatosRef = ref<{ validate: () => boolean; resetValidation: () => void } | null>(null)
const ligacoesRef = ref<{ validate: () => boolean } | null>(null)

const brandOptions = ['hub', 'water', 'waste'].map(value => ({ label: value[0].toUpperCase() + value.slice(1), value }))
const scenarios = [
  { value: 'filled', label: 'Preenchido' }, { value: 'empty', label: 'Vazio' },
  { value: 'invalid', label: 'Obrigatório pendente' }, { value: 'loading', label: 'Carregando' },
  { value: 'readonly', label: 'Somente leitura' },
]
const contatoColumns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left' as const },
  { name: 'papel', label: 'Papel', field: 'papel', align: 'left' as const },
  { name: 'telefone', label: 'Telefone', field: 'telefone', align: 'left' as const },
]
const ligacaoColumns = [
  { name: 'matricula', label: 'Matrícula', field: 'matricula', align: 'left' as const },
  { name: 'endereco', label: 'Endereço', field: 'endereco', align: 'left' as const },
]
const items = computed(() => [
  { name: 'contatos', label: 'Contatos', icon: 'contacts', required: true, count: contatos.value.length, invalid: !contatosValid.value },
  { name: 'ligacoes', label: 'Ligações', icon: 'water_drop', count: ligacoes.value.length },
])

function validateContato(d: Row) { return d.nome ? null : 'Informe o nome do contato.' }
function onChange(c: { type: string; row: Row }) {
  const labels: Record<string, string> = { add: 'incluído', edit: 'alterado', remove: 'excluído', activate: 'ativado', inactivate: 'inativado' }
  feedbackVariant.value = 'info'
  feedback.value = `Registro ${labels[c.type]} em memória. Salve o cadastro para persistir.`
  contatosValid.value = contatos.value.some(r => r.available !== false) || true
}
function applyScenario(value: string) {
  scenario.value = value
  feedback.value = ''
  contatosValid.value = true
  contatos.value = value === 'empty' ? [] : value === 'invalid' ? [{ ...seedContatos()[1] }] : seedContatos()
  ligacoes.value = value === 'empty' ? [] : seedLigacoes()
  contatosRef.value?.resetValidation()
  if (value === 'invalid') { tab.value = 'contatos'; setTimeout(validateAll) }
}
function validateAll() {
  const ok = contatosRef.value ? contatosRef.value.validate() : contatos.value.some(r => r.available !== false)
  ligacoesRef.value?.validate()
  contatosValid.value = ok
  if (!ok) tab.value = 'contatos'
  feedbackVariant.value = ok ? 'success' : 'error'
  feedback.value = ok ? 'Cadastro válido: composições prontas para envio.' : 'Contatos exige ao menos um registro ativo.'
}
</script>

<style scoped>
.cp-test{height:100%;overflow:auto;color:var(--dss-text-body);font-family:var(--dss-font-family-sans);background:var(--dss-surface-default)}
.cp-devbar{position:sticky;top:0;z-index:var(--dss-z-index-sticky);display:flex;align-items:center;flex-wrap:wrap;gap:var(--dss-spacing-2);padding:var(--dss-spacing-1) var(--dss-spacing-5);background:var(--dss-surface-subtle);border-bottom:var(--dss-border-width-thin) dashed var(--dss-border-default)}
.cp-devbar__states,.cp-devbar__presentation{display:flex;align-items:center;flex-wrap:wrap;gap:var(--dss-spacing-2)}
.cp-devbar__states{flex:1;min-width:0}.cp-devbar__presentation{margin-inline-start:auto;flex-shrink:0}
.cp-devbar__label,.cp-eyebrow{font-size:var(--dss-font-size-xs);text-transform:uppercase;font-weight:var(--dss-font-weight-semibold)}
.cp-stage{display:flex;flex-direction:column;gap:var(--dss-spacing-4);padding:var(--dss-spacing-6);max-width:var(--dss-layout-content-max-width-wide);margin:0 auto}
.cp-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--dss-spacing-4)}
.cp-heading h1,.cp-heading p{margin:0}.cp-heading h1{font-size:var(--dss-font-size-2xl);line-height:var(--dss-line-height-tight)}
.cp-card{padding:var(--dss-spacing-2)}
@media (max-width: 768px){.cp-stage{padding:var(--dss-spacing-3)}.cp-heading{flex-direction:column;align-items:flex-start}}
</style>
