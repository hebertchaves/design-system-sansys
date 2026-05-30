<template>
  <div class="q-pa-lg">
    <h5 class="q-mb-md">DssPopupEdit — Exemplos</h5>

    <!-- =====================================================================
      Cenário 1: Edição simples de texto em célula de tabela
      Demonstra uso básico com DssInput e autofocus.
    ===================================================================== -->
    <section class="q-mb-xl">
      <h6 class="q-mb-sm">1. Edição de célula em tabela</h6>
      <p class="text-caption q-mb-md">Clique na célula "Nome" para editar inline.</p>
      <table class="dss-example-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome (clique para editar)</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tableData" :key="row.id">
            <td>{{ row.id }}</td>
            <td class="dss-example-table__cell--editable">
              {{ row.nome }}
              <!-- DssPopupEdit: v-model = valor sendo editado (não visibilidade) -->
              <DssPopupEdit
                v-model="row.nome"
                title="Editar Nome"
                @save="onSave('nome', $event)"
              >
                <q-input
                  v-model="row.nome"
                  dense
                  autofocus
                  label="Nome"
                  outlined
                />
              </DssPopupEdit>
            </td>
            <td>{{ row.email }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="lastSaved" class="text-caption q-mt-sm text-positive">
        ✓ Salvo: {{ lastSaved }}
      </p>
    </section>

    <!-- =====================================================================
      Cenário 2: Seleção inline (DssSelect)
      Demonstra edição com campo de seleção.
    ===================================================================== -->
    <section class="q-mb-xl">
      <h6 class="q-mb-sm">2. Seleção inline de status</h6>
      <p class="text-caption q-mb-md">Clique no badge de status para alterar.</p>
      <div class="row items-center gap-md">
        <span>Status do projeto:</span>
        <span class="dss-example-badge dss-example-badge--editable">
          {{ statusAtual }}
          <DssPopupEdit
            v-model="statusAtual"
            title="Alterar Status"
            @save="onStatusSave"
          >
            <q-select
              v-model="statusAtual"
              :options="statusOptions"
              dense
              autofocus
              outlined
              label="Status"
            />
          </DssPopupEdit>
        </span>
      </div>
    </section>

    <!-- =====================================================================
      Cenário 3: Persistente (não fecha com clique externo)
      Demonstra persistent: true para edições críticas.
    ===================================================================== -->
    <section class="q-mb-xl">
      <h6 class="q-mb-sm">3. Popup persistente</h6>
      <p class="text-caption q-mb-md">
        Este popup não fecha ao clicar fora ou pressionar ESC. Use para edições críticas.
      </p>
      <div class="dss-example-field">
        <span class="text-caption text-grey">Limite de crédito:</span>
        <span class="dss-example-field__value">
          {{ credito | currency }}
          <DssPopupEdit
            v-model="credito"
            title="Limite de Crédito"
            persistent
            :validate="validateCredito"
            @save="onCreditoSave"
          >
            <q-input
              v-model.number="credito"
              type="number"
              dense
              autofocus
              outlined
              label="Valor (R$)"
              prefix="R$"
            />
          </DssPopupEdit>
        </span>
      </div>
    </section>

    <!-- =====================================================================
      Cenário 4: Com brand Hub
      Demonstra acento de brand na área de botões.
    ===================================================================== -->
    <section class="q-mb-xl" data-brand="hub">
      <h6 class="q-mb-sm">4. Com brand Hub</h6>
      <p class="text-caption q-mb-md">Popup com acento de cor Hub nos botões.</p>
      <div class="dss-example-card">
        <span class="text-caption text-grey">Descrição do projeto:</span>
        <p class="q-mt-xs">
          {{ descricao || '(sem descrição)' }}
          <DssPopupEdit
            v-model="descricao"
            title="Descrição"
            :max-width="'400px'"
            @save="onDescricaoSave"
          >
            <q-input
              v-model="descricao"
              type="textarea"
              autofocus
              dense
              outlined
              label="Descrição"
              rows="3"
            />
          </DssPopupEdit>
        </p>
      </div>
    </section>

    <!-- =====================================================================
      Cenário 5: Com validação e auto-save desabilitado
      Demonstra validate prop com função de validação.
    ===================================================================== -->
    <section class="q-mb-xl">
      <h6 class="q-mb-sm">5. Com validação de e-mail</h6>
      <p class="text-caption q-mb-md">O botão "Salvar" é bloqueado se o e-mail for inválido.</p>
      <div class="row items-center gap-md">
        <span>E-mail de contato:</span>
        <span class="dss-example-editable-field">
          {{ email || '(não definido)' }}
          <DssPopupEdit
            v-model="email"
            title="E-mail"
            :validate="validateEmail"
            @save="onEmailSave"
          >
            <q-input
              v-model="email"
              type="email"
              dense
              autofocus
              outlined
              label="E-mail"
            />
          </DssPopupEdit>
        </span>
      </div>
      <p v-if="emailSalvo" class="text-caption q-mt-sm text-positive">
        ✓ E-mail atualizado: {{ emailSalvo }}
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DssPopupEdit from './DssPopupEdit.vue'

// Cenário 1 — Tabela
const tableData = ref([
  { id: 1, nome: 'Maria Silva', email: 'maria@sansys.com' },
  { id: 2, nome: 'João Pereira', email: 'joao@sansys.com' },
  { id: 3, nome: 'Ana Costa', email: 'ana@sansys.com' },
])
const lastSaved = ref('')

function onSave(campo, novoValor) {
  lastSaved.value = `${campo}: "${novoValor[0]}"`
}

// Cenário 2 — Seleção
const statusAtual = ref('Em andamento')
const statusOptions = ['Planejado', 'Em andamento', 'Concluído', 'Suspenso', 'Cancelado']

function onStatusSave([valor]) {
  console.log('Status salvo:', valor)
}

// Cenário 3 — Persistente com validação
const credito = ref(5000)

function validateCredito(valor) {
  if (!valor || valor <= 0) return 'Valor deve ser positivo'
  if (valor > 100000) return 'Limite máximo: R$ 100.000'
  return true
}

function onCreditoSave([valor]) {
  console.log('Crédito salvo:', valor)
}

// Cenário 4 — Brand Hub
const descricao = ref('Sistema de gestão de ativos hídricos e saneamento.')

function onDescricaoSave([valor]) {
  console.log('Descrição salva:', valor)
}

// Cenário 5 — Validação de e-mail
const email = ref('contato@sansys.com')
const emailSalvo = ref('')

function validateEmail(valor) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(valor) || 'E-mail inválido'
}

function onEmailSave([valor]) {
  emailSalvo.value = valor
}
</script>

<style>
/* Estilos de chrome do exemplo — tokens DSS e Quasar utility classes */
.dss-example-table {
  width: 100%;
  border-collapse: collapse;
}

.dss-example-table th,
.dss-example-table td {
  padding: var(--dss-spacing-2) var(--dss-padding-3);
  border: var(--dss-border-width-thin) solid var(--dss-gray-300);
  text-align: left;
}

.dss-example-table__cell--editable {
  cursor: pointer;
  position: relative;
}

.dss-example-table__cell--editable:hover {
  background-color: var(--dss-gray-100);
}

.dss-example-badge {
  display: inline-block;
  padding: var(--dss-spacing-1) var(--dss-padding-3);
  border-radius: var(--dss-radius-full);
  background-color: var(--dss-water-50);
  cursor: pointer;
  position: relative;
}

.dss-example-badge--editable:hover {
  background-color: var(--dss-water-100);
}

.dss-example-field {
  display: inline-flex;
  flex-direction: column;
  gap: var(--dss-spacing-1);
}

.dss-example-field__value {
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
}

.dss-example-card {
  padding: var(--dss-padding-3);
  border: var(--dss-border-width-thin) solid var(--dss-gray-300);
  border-radius: var(--dss-radius-md);
}

.dss-example-editable-field {
  cursor: pointer;
  position: relative;
  text-decoration: underline dotted;
}
</style>
