<template>
  <div class="dss-form-examples q-pa-lg">
    <h2 class="text-h5 q-mb-lg">DssForm — Exemplos</h2>

    <!-- ================================================================
         EXEMPLO 1 — Formulário de Login Básico
         Demonstra: autofocus, submit, validação de campos obrigatórios
         ================================================================ -->
    <section class="q-mb-xl">
      <h3 class="text-subtitle1 q-mb-md">1. Formulário de Login</h3>

      <DssForm
        ref="loginFormRef"
        aria-label="Formulário de login"
        @submit.prevent="handleLoginSubmit"
        @validation-error="handleValidationError"
        @validation-success="handleValidationSuccess"
        autofocus
        style="max-width: 400px"
      >
        <DssInput
          v-model="loginForm.email"
          label="E-mail"
          type="email"
          :rules="[val => !!val || 'E-mail obrigatório', val => /.+@.+\..+/.test(val) || 'E-mail inválido']"
          lazy-rules
        />

        <DssInput
          v-model="loginForm.password"
          label="Senha"
          type="password"
          :rules="[val => !!val || 'Senha obrigatória', val => val.length >= 8 || 'Mínimo 8 caracteres']"
          lazy-rules
        />

        <div class="row q-gutter-sm">
          <DssButton
            type="submit"
            label="Entrar"
            color="primary"
            :loading="loginLoading"
          />
          <DssButton
            type="reset"
            label="Limpar"
            flat
          />
        </div>
      </DssForm>

      <div v-if="loginStatus" class="q-mt-md text-body2">
        Status: <span :class="loginStatus === 'success' ? 'text-positive' : 'text-negative'">{{ loginMessage }}</span>
      </div>
    </section>

    <!-- ================================================================
         EXEMPLO 2 — Formulário Multi-campo com Greedy Validation
         Demonstra: greedy, validação simultânea de todos os campos
         ================================================================ -->
    <section class="q-mb-xl">
      <h3 class="text-subtitle1 q-mb-md">2. Cadastro Completo (validação greedy)</h3>

      <DssForm
        ref="registrationFormRef"
        greedy
        aria-label="Formulário de cadastro completo"
        @submit.prevent="handleRegistrationSubmit"
        style="max-width: 480px"
      >
        <DssInput
          v-model="registrationForm.name"
          label="Nome completo"
          :rules="[val => !!val || 'Nome obrigatório']"
          lazy-rules
        />

        <DssInput
          v-model="registrationForm.email"
          label="E-mail"
          type="email"
          :rules="[val => !!val || 'E-mail obrigatório', val => /.+@.+\..+/.test(val) || 'E-mail inválido']"
          lazy-rules
        />

        <DssSelect
          v-model="registrationForm.role"
          label="Perfil"
          :options="roleOptions"
          :rules="[val => !!val || 'Selecione um perfil']"
        />

        <DssCheckbox
          v-model="registrationForm.acceptTerms"
          label="Aceito os termos de uso"
          :rules="[val => val === true || 'Aceite os termos para continuar']"
        />

        <div class="row q-gutter-sm">
          <DssButton
            type="submit"
            label="Cadastrar"
            color="primary"
          />
          <DssButton
            label="Validar"
            outline
            @click="validateRegistration"
          />
          <DssButton
            label="Resetar"
            flat
            @click="resetRegistration"
          />
        </div>
      </DssForm>
    </section>

    <!-- ================================================================
         EXEMPLO 3 — Formulário de Contato com API Imperativa
         Demonstra: validate(), resetValidation(), submit() via ref
         ================================================================ -->
    <section class="q-mb-xl">
      <h3 class="text-subtitle1 q-mb-md">3. Controle Imperativo via Ref</h3>

      <DssForm
        ref="contactFormRef"
        no-error-focus
        aria-label="Formulário de contato"
        @submit.prevent="handleContactSubmit"
        style="max-width: 440px"
      >
        <DssInput
          v-model="contactForm.subject"
          label="Assunto"
          :rules="[val => !!val || 'Assunto obrigatório']"
        />

        <DssTextarea
          v-model="contactForm.message"
          label="Mensagem"
          :rules="[val => !!val || 'Mensagem obrigatória', val => val.length >= 20 || 'Mínimo 20 caracteres']"
          rows="4"
        />
      </DssForm>

      <!-- Botões FORA do DssForm — controle via API imperativa -->
      <div class="row q-gutter-sm q-mt-md">
        <DssButton label="Validar (ref)" outline @click="imperativeValidate" />
        <DssButton label="Enviar (ref)" color="primary" @click="imperativeSubmit" />
        <DssButton label="Resetar (ref)" flat @click="imperativeReset" />
      </div>

      <div v-if="imperativeResult" class="q-mt-sm text-body2 text-italic">
        {{ imperativeResult }}
      </div>
    </section>

    <!-- ================================================================
         EXEMPLO 4 — Formulário em DssDialog (Formulário Aninhado)
         Demonstra: DssForm dentro de overlay, brand context
         ================================================================ -->
    <section class="q-mb-xl">
      <h3 class="text-subtitle1 q-mb-md">4. Formulário em Modal</h3>

      <div data-brand="hub">
        <DssButton
          label="Abrir Formulário Modal"
          color="primary"
          @click="showModal = true"
        />
      </div>

      <DssDialog v-model:open="showModal" :persistent="modalFormDirty">
        <template #header>
          <div class="row items-center justify-between full-width q-pa-md">
            <span class="text-subtitle1">Editar Perfil</span>
            <DssButton icon="close" flat round dense @click="closeModal" />
          </div>
        </template>

        <div class="q-pa-md">
          <DssForm
            ref="modalFormRef"
            aria-label="Formulário de edição de perfil"
            @submit.prevent="handleModalSubmit"
            @reset="modalFormDirty = false"
          >
            <DssInput
              v-model="modalForm.displayName"
              label="Nome de exibição"
              :rules="[val => !!val || 'Nome obrigatório']"
              @update:model-value="modalFormDirty = true"
            />

            <DssInput
              v-model="modalForm.bio"
              label="Bio"
              @update:model-value="modalFormDirty = true"
            />

            <DssToggle
              v-model="modalForm.notifications"
              label="Receber notificações"
              @update:model-value="modalFormDirty = true"
            />
          </DssForm>
        </div>

        <template #footer>
          <div class="row q-gutter-sm q-pa-md justify-end">
            <DssButton label="Cancelar" flat @click="closeModal" />
            <DssButton label="Salvar" color="primary" @click="saveModal" />
          </div>
        </template>
      </DssDialog>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// ============================================================
// EXEMPLO 1 — Login
// ============================================================

const loginFormRef = ref()
const loginLoading = ref(false)
const loginStatus = ref<'success' | 'error' | null>(null)
const loginMessage = ref('')

const loginForm = reactive({
  email: '',
  password: ''
})

async function handleLoginSubmit() {
  loginLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1200))
  loginLoading.value = false
  loginStatus.value = 'success'
  loginMessage.value = 'Login efetuado com sucesso!'
}

function handleValidationError() {
  loginStatus.value = 'error'
  loginMessage.value = 'Corrija os campos com erro antes de continuar.'
}

function handleValidationSuccess() {
  loginStatus.value = null
}

// ============================================================
// EXEMPLO 2 — Cadastro com Greedy
// ============================================================

const registrationFormRef = ref()

const registrationForm = reactive({
  name: '',
  email: '',
  role: null as string | null,
  acceptTerms: false
})

const roleOptions = ['Administrador', 'Editor', 'Visualizador']

async function handleRegistrationSubmit() {
  console.log('Formulário enviado:', registrationForm)
}

async function validateRegistration() {
  const isValid = await registrationFormRef.value?.validate()
  console.log('Válido:', isValid)
}

function resetRegistration() {
  registrationFormRef.value?.reset()
  Object.assign(registrationForm, { name: '', email: '', role: null, acceptTerms: false })
}

// ============================================================
// EXEMPLO 3 — Controle Imperativo
// ============================================================

const contactFormRef = ref()
const imperativeResult = ref('')

const contactForm = reactive({
  subject: '',
  message: ''
})

async function handleContactSubmit() {
  imperativeResult.value = 'Formulário enviado via evento @submit!'
}

async function imperativeValidate() {
  const isValid = await contactFormRef.value?.validate()
  imperativeResult.value = isValid ? 'Formulário válido ✓' : 'Formulário inválido — corrija os erros'
}

function imperativeSubmit() {
  contactFormRef.value?.submit()
}

function imperativeReset() {
  contactFormRef.value?.reset()
  Object.assign(contactForm, { subject: '', message: '' })
  imperativeResult.value = ''
}

// ============================================================
// EXEMPLO 4 — Modal
// ============================================================

const showModal = ref(false)
const modalFormDirty = ref(false)
const modalFormRef = ref()

const modalForm = reactive({
  displayName: 'Hebert Chaves',
  bio: '',
  notifications: true
})

function closeModal() {
  showModal.value = false
  modalFormDirty.value = false
  modalFormRef.value?.resetValidation()
}

async function saveModal() {
  const isValid = await modalFormRef.value?.validate()
  if (isValid) {
    showModal.value = false
    modalFormDirty.value = false
  }
}

async function handleModalSubmit() {
  await saveModal()
}
</script>
