<template>
  <div class="nf-test" data-brand="water" data-theme="light">
    <div class="nf-devbar" role="group" aria-label="Sandbox — estado de dados">
      <span class="nf-devbar__label">sandbox · estado</span>
      <DssButton v-for="s in scenarios" :key="s.value" :label="s.label" size="xs"
        :variant="scenario === s.value ? 'unelevated' : 'flat'" color="primary"
        :aria-pressed="scenario === s.value" @click="scenario = s.value" />
    </div>
    <NfagCheckinPage :scenario="scenario" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import DssButton from '@dss/DssButton/DssButton.vue'
import NfagCheckinPage from './patterns/nfag/NfagCheckinPage.vue'
const scenario = ref('mixed')
const scenarios = [
  { value: 'empty', label: 'Sem execução' }, { value: 'loading', label: 'Carregando' },
  { value: 'error', label: 'Erro de leitura' }, { value: 'apt', label: 'Apto' },
  { value: 'alerts', label: 'Apto com alertas' }, { value: 'mixed', label: 'Falhas bloqueantes' },
  { value: 'timeout', label: 'Tempo excedido' }, { value: 'stale', label: 'Resultado desatualizado' },
]
</script>
<style scoped>
.nf-test{height:100%;display:flex;flex-direction:column;color:var(--dss-text-body);font-family:var(--dss-font-family-sans);font-size:var(--dss-font-size-sm)}
.nf-devbar{display:flex;align-items:center;flex-wrap:wrap;gap:var(--dss-spacing-2);padding:var(--dss-spacing-1) var(--dss-spacing-5);background:var(--dss-surface-subtle);border-bottom:var(--dss-border-width-thin) dashed var(--dss-border-default)}
.nf-devbar__label{font-size:var(--dss-font-size-xs);text-transform:uppercase;font-weight:var(--dss-font-weight-semibold)}
</style>
