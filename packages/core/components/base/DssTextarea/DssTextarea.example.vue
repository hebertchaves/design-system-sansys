<template>
  <!-- Exemplos REAIS de uso do DssTextarea (composições contextuais — não repete as
       variantes/estados das seções do playground). Embeddable, Token First, box
       estilizado como o PgTile do sandbox. Consumido por TestTextarea.vue. -->
  <div class="dss-ex">
    <div class="dss-ex__item">
      <div class="dss-ex__stage">
        <DssTextarea v-model="comentario" label="Comentário" autogrow max-height="140px">
          <template #after><DssIcon name="send" inline decorative /></template>
          <template #hint><span>{{ comentario.length }} caracteres</span></template>
        </DssTextarea>
      </div>
      <code class="dss-ex__code">caixa de comentário (autogrow + enviar)</code>
    </div>

    <div class="dss-ex__item">
      <div class="dss-ex__stage">
        <DssTextarea v-model="obs" label="Observações" :rows="4">
          <template #hint><span>{{ obs.length }}/240</span></template>
        </DssTextarea>
      </div>
      <code class="dss-ex__code">observações com limite</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssTextarea from './DssTextarea.vue'
import DssIcon from '../DssIcon/DssIcon.vue'

const comentario = ref('')
const obs = ref('')
</script>
