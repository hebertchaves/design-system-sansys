<template>
  <!-- Showcase canônico do DssInput — embeddable, Token First, padrões atuais.
       Consumido pelo sandbox (TestInput.vue → seção "Exemplos do componente"). -->
  <div class="dss-examples">
    <div class="dss-examples__item">
      <span class="dss-examples__label">Básico (outlined)</span>
      <DssInput v-model="basico" label="Nome" hint="Como devemos te chamar" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Standout (alto contraste)</span>
      <DssInput v-model="standout" label="Busca" variant="standout" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Com ícone (#prepend)</span>
      <DssInput v-model="telefone" label="Telefone" placeholder="(00) 00000-0000">
        <template #prepend><DssIcon name="call" inline decorative /></template>
      </DssInput>
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Caso de uso: senha (toggle no #append)</span>
      <DssInput v-model="senha" label="Senha" :type="showPassword ? 'text' : 'password'">
        <template #append>
          <DssButton variant="flat" color="secondary" size="sm"
            :icon="showPassword ? 'visibility_off' : 'visibility'"
            :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
            @click="showPassword = !showPassword" />
        </template>
      </DssInput>
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Clearable</span>
      <DssInput v-model="busca" variant="filled" label="Pesquisar" clearable />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Erro</span>
      <DssInput v-model="email" label="E-mail" error error-message="Formato inválido" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Brandabilidade (accent de foco)</span>
      <DssInput v-model="brand" label="Input Hub" brand="hub" hint="Foque para ver o accent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssInput from './DssInput.vue'
import DssIcon from '../DssIcon/DssIcon.vue'
import DssButton from '../DssButton/DssButton.vue'

const basico = ref('')
const standout = ref('')
const telefone = ref('')
const senha = ref('')
const showPassword = ref(false)
const busca = ref('Texto inicial')
const email = ref('invalido@')
const brand = ref('')
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
