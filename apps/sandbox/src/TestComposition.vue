<template>
  <div class="cp-test" :data-theme="theme" :data-brand="brand">
    <div class="cp-devbar" role="group" aria-label="Sandbox — estado das coleções">
      <div class="cp-devbar__states">
        <span class="cp-devbar__label">sandbox · estado</span>
        <DssButton
          v-for="item in cenarios"
          :key="item.value"
          :label="item.label"
          size="xs"
          :variant="cenario === item.value ? 'unelevated' : 'flat'"
          color="primary"
          :aria-pressed="cenario === item.value"
          @click="aplicarCenario(item.value)"
        />
      </div>
      <div class="cp-devbar__presentation" role="group" aria-label="Apresentação da demonstração">
        <DssButton
          variant="flat"
          round
          size="md"
          :icon="theme === 'dark' ? 'light_mode' : 'dark_mode'"
          :aria-label="theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
          @click="theme = theme === 'dark' ? 'light' : 'dark'"
        />
        <DssBtnToggle v-model="brand" :options="opcoesDeMarca" variant="flat" aria-label="Marca da demonstração" />
      </div>
    </div>

    <main class="cp-stage">
      <header class="cp-heading">
        <p class="cp-eyebrow">WebComps → DSS</p>
        <h1>DssComposition · DssCompositionGroup</h1>
        <p>
          Migração do <code>jtech-composition</code>. Cada coleção é um <strong>campo</strong> do
          formulário mestre: o "Salvar cadastro" abaixo valida as três abas, inclusive a que você
          nunca abriu.
        </p>
      </header>

      <!-- ── Cenário principal: cadastro mestre com três coleções em abas ── -->
      <section class="cp-section" aria-labelledby="cp-mestre">
        <h2 id="cp-mestre">Cadastro mestre</h2>
        <DssForm ref="mestre" class="cp-form" @submit="aoSalvarCadastro" @validation-error="aoReprovar">
          <DssInput
            v-model="cliente.nome"
            label="Nome do cliente"
            :rules="[(v) => !!v || 'Informe o nome do cliente']"
            :disabled="cenario === 'disabled'"
          />

          <DssCompositionGroup v-model="abaAtiva" :brand="brand" aria-label="Coleções do cliente">
            <DssComposition
              v-model="contatos"
              name="contatos"
              label="Contatos"
              row-key="id"
              :columns="colunasDeContato"
              :row-actions="acoesDeContato"
              :new-record="novoContato"
              v-bind="estadoComum"
              @inactivate="aoInativar"
              @activate="aoAtivar"
            >
              <template #form="{ record }">
                <DssInput v-model="record.nome" label="Nome" :rules="[(v) => !!v || 'Informe o nome']" />
                <DssInput v-model="record.telefone" label="Telefone" />
              </template>
            </DssComposition>

            <DssComposition
              v-model="enderecos"
              name="enderecos"
              label="Endereços"
              row-key="id"
              required
              required-message="Inclua ao menos um endereço."
              :columns="colunasDeEndereco"
              :new-record="novoEndereco"
              v-bind="estadoComum"
            >
              <template #form="{ record }">
                <DssInput v-model="record.logradouro" label="Logradouro" :rules="[(v) => !!v || 'Informe o logradouro']" />
                <DssInput v-model="record.bairro" label="Bairro" />
              </template>
            </DssComposition>

            <DssComposition
              v-model="medidores"
              name="medidores"
              label="Medidores"
              row-key="id"
              :columns="colunasDeMedidor"
              :new-record="novoMedidor"
              v-bind="estadoComum"
            >
              <template #form="{ record }">
                <DssInput v-model="record.numero" label="Número do medidor" :rules="[(v) => !!v || 'Informe o número']" />
              </template>
            </DssComposition>
          </DssCompositionGroup>

          <div class="cp-actions">
            <DssButton label="Salvar cadastro" color="primary" type="submit" :disabled="cenario === 'disabled'" />
            <DssButton label="Limpar validação" variant="flat" @click="mestre?.resetValidation()" />
          </div>
        </DssForm>
      </section>

      <!-- ── Coleção sozinha: um campo comum, sem o grupo ── -->
      <section class="cp-section" aria-labelledby="cp-sozinha">
        <h2 id="cp-sozinha">Coleção sozinha</h2>
        <p class="cp-nota">Sem o grupo, a coleção é um campo comum de formulário.</p>
        <DssComposition
          v-model="dependentes"
          label="Dependentes"
          row-key="id"
          :columns="colunasDeDependente"
          :new-record="novoDependente"
          :brand="brand"
        >
          <template #form="{ record }">
            <DssInput v-model="record.nome" label="Nome" :rules="[(v) => !!v || 'Informe o nome']" />
          </template>
        </DssComposition>
      </section>

      <DssBanner v-if="eco" :variant="ecoTom" rounded dense dismissible @dismiss="eco = ''">{{ eco }}</DssBanner>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DssComposition from '@components/composed/DssComposition/DssComposition.vue'
import DssCompositionGroup from '@components/composed/DssCompositionGroup/DssCompositionGroup.vue'
import DssForm from '@components/composed/DssForm/DssForm.vue'
import DssInput from '@components/base/DssInput/DssInput.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssBtnToggle from '@components/base/DssBtnToggle/DssBtnToggle.vue'
import DssBanner from '@components/base/DssBanner/DssBanner.vue'

type Linha = Record<string, unknown>

const cenario = ref('normal')
const theme = ref('light')
const brand = ref('water')
const abaAtiva = ref<string | null>(null)
const eco = ref('')
const ecoTom = ref<'info' | 'success' | 'error'>('info')
const mestre = ref<{ resetValidation: () => void } | null>(null)

const opcoesDeMarca = ['hub', 'water', 'waste'].map((value) => ({
  label: value[0].toUpperCase() + value.slice(1),
  value,
}))

const cenarios = [
  { value: 'normal', label: 'Normal' },
  { value: 'loading', label: 'Carregando' },
  { value: 'error', label: 'Erro de carga' },
  { value: 'disabled', label: 'Desabilitado' },
  { value: 'readonly', label: 'Somente leitura' },
]

/** O estado da barra do sandbox, aplicado às três coleções do cadastro. */
const estadoComum = computed(() => ({
  brand: brand.value,
  loading: cenario.value === 'loading',
  error: cenario.value === 'error' ? 'O serviço do cadastro não respondeu. Tente novamente.' : null,
  disabled: cenario.value === 'disabled',
  readonly: cenario.value === 'readonly',
}))

const cliente = ref({ nome: 'Condomínio Jardim das Águas' })

// ── Contatos: registros GRAVADOS se inativam; NOVOS se excluem (decisão C/D)
const contatos = ref<Linha[]>([
  { id: 1, nome: 'Ana Souza', telefone: '(11) 3333-1111', gravado: true, ativo: true },
  { id: 2, nome: 'Bruno Lima', telefone: '(11) 3333-2222', gravado: true, ativo: false },
])
const colunasDeContato = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left' as const },
  { name: 'telefone', label: 'Telefone', field: 'telefone', align: 'left' as const },
  { name: 'situacao', label: 'Situação', field: (l: Linha) => (l.gravado ? (l.ativo ? 'Ativo' : 'Inativo') : 'Novo'), align: 'left' as const },
]
const editar = { name: 'edit', label: 'Editar', icon: 'edit', intent: 'edit' as const }
const excluir = { name: 'remove', label: 'Excluir', icon: 'delete', intent: 'remove' as const, color: 'negative' as const }
const inativar = { name: 'inactivate', label: 'Inativar', icon: 'block', intent: 'inactivate' as const }
const ativar = { name: 'activate', label: 'Ativar', icon: 'check_circle', intent: 'activate' as const }
function acoesDeContato(linha: Linha) {
  if (!linha.gravado) return [editar, excluir]
  return linha.ativo ? [editar, inativar] : [ativar]
}
let proximoId = 100
const novoContato = () => ({ id: ++proximoId, nome: '', telefone: '', gravado: false, ativo: true })

function mudarSituacao(linha: Linha | undefined, ativo: boolean) {
  if (!linha) return
  contatos.value = contatos.value.map((c) => (c.id === linha.id ? { ...c, ativo } : c))
}
function aoInativar(payload: { row?: Linha }) {
  mudarSituacao(payload.row, false)
  avisar(`Contato ${String(payload.row?.nome)} inativado — quem mudou o registro foi a página.`, 'info')
}
function aoAtivar(payload: { row?: Linha }) {
  mudarSituacao(payload.row, true)
  avisar(`Contato ${String(payload.row?.nome)} ativado.`, 'info')
}

// ── Endereços: OBRIGATÓRIA e vazia — o caso do risco 5
const enderecos = ref<Linha[]>([])
const colunasDeEndereco = [
  { name: 'logradouro', label: 'Logradouro', field: 'logradouro', align: 'left' as const },
  { name: 'bairro', label: 'Bairro', field: 'bairro', align: 'left' as const },
]
const novoEndereco = () => ({ id: ++proximoId, logradouro: '', bairro: '' })

// ── Medidores
const medidores = ref<Linha[]>([{ id: 1, numero: 'A23-004512' }])
const colunasDeMedidor = [{ name: 'numero', label: 'Número', field: 'numero', align: 'left' as const }]
const novoMedidor = () => ({ id: ++proximoId, numero: '' })

// ── Coleção sozinha
const dependentes = ref<Linha[]>([])
const colunasDeDependente = [{ name: 'nome', label: 'Nome', field: 'nome', align: 'left' as const }]
const novoDependente = () => ({ id: ++proximoId, nome: '' })

function aplicarCenario(valor: string) {
  cenario.value = valor
  eco.value = ''
}

function avisar(texto: string, tom: 'info' | 'success' | 'error') {
  eco.value = texto
  ecoTom.value = tom
}

function aoSalvarCadastro() {
  avisar(`Cadastro válido: ${contatos.value.length} contato(s), ${enderecos.value.length} endereço(s), ${medidores.value.length} medidor(es).`, 'success')
}

function aoReprovar() {
  avisar('O cadastro tem pendências — veja as abas marcadas.', 'error')
}
</script>

<style scoped>
.cp-test{height:100%;overflow:auto;color:var(--dss-text-body);font-family:var(--dss-font-family-sans);background:var(--dss-surface-default)}
.cp-devbar{position:sticky;top:0;z-index:var(--dss-z-index-sticky);display:flex;align-items:center;flex-wrap:wrap;gap:var(--dss-spacing-2);padding:var(--dss-spacing-1) var(--dss-spacing-5);background:var(--dss-surface-subtle);border-bottom:var(--dss-border-width-thin) dashed var(--dss-border-default)}
.cp-devbar__states,.cp-devbar__presentation{display:flex;align-items:center;flex-wrap:wrap;gap:var(--dss-spacing-2)}
.cp-devbar__states{flex:1;min-width:0}
.cp-devbar__presentation{margin-inline-start:auto;flex-shrink:0}
.cp-devbar__label,.cp-eyebrow{font-size:var(--dss-font-size-xs);text-transform:uppercase;font-weight:var(--dss-font-weight-semibold)}
.cp-stage{display:flex;flex-direction:column;gap:var(--dss-spacing-6);padding:var(--dss-spacing-6);max-width:var(--dss-layout-content-max-width-wide);margin:0 auto}
.cp-heading{display:flex;flex-direction:column;gap:var(--dss-spacing-1)}
.cp-heading h1,.cp-heading p{margin:0}
.cp-heading h1{font-size:var(--dss-font-size-2xl);line-height:var(--dss-line-height-tight)}
.cp-heading>p:last-child{color:var(--dss-text-subtle)}
.cp-section{display:flex;flex-direction:column;gap:var(--dss-spacing-3)}
.cp-section h2{margin:0;font-size:var(--dss-font-size-lg)}
.cp-form{display:flex;flex-direction:column;gap:var(--dss-spacing-4)}
.cp-actions{display:flex;flex-wrap:wrap;gap:var(--dss-spacing-2)}
.cp-nota{margin:0;color:var(--dss-text-subtle)}
@media (max-width: 768px){.cp-stage{padding:var(--dss-spacing-3)}}
</style>
