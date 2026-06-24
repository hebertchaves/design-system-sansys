<template>
  <!-- Showcase canônico do DssTextarea — embeddable (sem chrome de página),
       Token First, refletindo os padrões atuais. Consumido pelo sandbox
       (apps/sandbox/src/TestTextarea.vue → seção "Exemplos do componente"). -->
  <div class="dss-examples">
    <div class="dss-examples__item">
      <span class="dss-examples__label">Básico (outlined, single-line)</span>
      <DssTextarea v-model="basico" label="Descrição" hint="Descreva em poucas palavras" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Autogrow + max-height</span>
      <DssTextarea v-model="autogrow" label="Comentário" variant="filled" autogrow max-height="160px"
        hint="Cresce com o conteúdo, para em 160px" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Standout (alto contraste)</span>
      <DssTextarea v-model="standout" label="Feedback" variant="standout" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Erro</span>
      <DssTextarea v-model="erro" label="Mensagem" error
        error-message="Mínimo de 20 caracteres" />
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Caso de uso: comentário (#after + contador)</span>
      <DssTextarea v-model="comentario" label="Comentário" autogrow max-height="120px">
        <template #after><DssIcon name="send" inline decorative /></template>
        <template #hint><span>{{ comentario.length }} caracteres</span></template>
      </DssTextarea>
    </div>

    <div class="dss-examples__item">
      <span class="dss-examples__label">Brandabilidade (accent de foco)</span>
      <DssTextarea v-model="brand" label="Textarea Water" brand="water" hint="Foque para ver o accent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssTextarea from './DssTextarea.vue'
import DssIcon from '../DssIcon/DssIcon.vue'

const basico = ref('')
const autogrow = ref('')
const standout = ref('')
const erro = ref('Curto')
const comentario = ref('')
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
