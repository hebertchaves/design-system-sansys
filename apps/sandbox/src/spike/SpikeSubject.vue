<!--
  SPIKE (descartável) — "sujeito sob teste" reutilizado nas 3 montagens:
  naked (controle), iframe e shadow DOM. São os 3 componentes já revisados
  (Input + Select + Textarea). O wrapper aplica data-brand + classe de dark
  a partir do estado compartilhado, para testar se o TEMA atravessa a barreira.
-->
<template>
  <div
    class="spike-subject"
    :data-brand="s.brand"
    :class="{ 'body--dark': s.dark }"
  >
    <DssInput
      v-model="s.inputModel"
      label="Input (texto)"
      placeholder="Digite aqui"
      hint="Campo de teste"
    />

    <DssSelect
      v-model="s.selectModel"
      :options="options"
      label="Select (overlay/teleport)"
      hint="Abra o dropdown — é o teste decisivo da barreira"
      clearable
    />

    <DssTextarea
      v-model="s.textareaModel"
      label="Textarea"
      placeholder="Várias linhas…"
      autogrow
    />
  </div>
</template>

<script setup>
import DssInput    from '@components/base/DssInput/DssInput.vue'
import DssSelect   from '@components/base/DssSelect/DssSelect.vue'
import DssTextarea from '@components/base/DssTextarea/DssTextarea.vue'
import { spikeState, SELECT_OPTIONS } from './spikeState.js'

const s = spikeState
const options = SELECT_OPTIONS
</script>

<style scoped>
.spike-subject {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
}
/* Fundo reativo ao dark só para tornar o vazamento de tema visível */
.spike-subject.body--dark {
  background: #1a1a1a;
}
</style>
