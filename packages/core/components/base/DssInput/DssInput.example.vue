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

<style scoped>
.dss-ex {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--dss-spacing-5);
}
.dss-ex__item {
  display: flex;
  flex-direction: column;
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}
.dss-ex__stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--dss-spacing-4);
  min-height: 104px;
  padding: var(--dss-spacing-4);
  background:
    linear-gradient(var(--dss-surface-subtle), var(--dss-surface-subtle)),
    repeating-linear-gradient(45deg, transparent 0 8px,
      color-mix(in srgb, var(--dss-gray-400) 8%, transparent) 8px 9px);
}
.dss-ex__code {
  font-family: var(--dss-font-family-mono, monospace);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  background: var(--dss-surface-default);
  padding: var(--dss-spacing-1) var(--dss-spacing-3);
  border-top: var(--dss-border-width-thin) solid var(--dss-gray-200);
}
</style>
