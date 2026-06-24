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
