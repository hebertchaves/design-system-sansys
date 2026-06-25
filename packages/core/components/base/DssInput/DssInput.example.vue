<template>
  <!-- Exemplos REAIS de uso do DssInput (composições contextuais — não repete as
       variantes/estados que já estão nas seções do playground). Embeddable, Token
       First, box estilizado como o PgTile do sandbox. Consumido por TestInput.vue. -->
  <div class="dss-ex">
    <div class="dss-ex__item">
      <div class="dss-ex__stage">
        <DssInput v-model="email" label="E-mail" placeholder="voce@exemplo.com">
          <template #prepend><DssIcon name="mail" inline decorative /></template>
        </DssInput>
        <DssInput v-model="senha" label="Senha" :type="showPassword ? 'text' : 'password'">
          <template #append>
            <DssButton variant="flat" color="secondary" size="sm"
              :icon="showPassword ? 'visibility_off' : 'visibility'"
              :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
              @click="showPassword = !showPassword" />
          </template>
        </DssInput>
      </div>
      <code class="dss-ex__code">formulário de login</code>
    </div>

    <div class="dss-ex__item">
      <div class="dss-ex__stage">
        <DssInput v-model="busca" variant="filled" label="Buscar" clearable placeholder="Termo…">
          <template #prepend><DssIcon name="search" inline decorative /></template>
        </DssInput>
      </div>
      <code class="dss-ex__code">campo de busca (ícone + clearable)</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssInput from './DssInput.vue'
import DssIcon from '../DssIcon/DssIcon.vue'
import DssButton from '../DssButton/DssButton.vue'

const email = ref('')
const senha = ref('')
const showPassword = ref(false)
const busca = ref('')
</script>
