<template>
  <div class="nf-test" :data-theme="theme" :data-brand="brand">
    <div class="nf-devbar" role="group" aria-label="Sandbox — estado de dados">
      <div class="nf-devbar__states">
      <span class="nf-devbar__label">sandbox · estado</span>
      <DssButton v-for="s in scenarios" :key="s.value" :label="s.label" size="xs"
        :variant="scenario === s.value ? 'unelevated' : 'flat'" color="primary"
        :aria-pressed="scenario === s.value" @click="scenario = s.value" />
      </div>
      <div class="nf-devbar__presentation" role="group" aria-label="Apresentação da demonstração">
        <DssButton variant="flat" round size="md" :icon="theme==='dark'?'light_mode':'dark_mode'" :aria-label="theme==='dark'?'Ativar modo claro':'Ativar modo escuro'" :title="theme==='dark'?'Ativar modo claro':'Ativar modo escuro'" @click="theme=theme==='dark'?'light':'dark'" />
        <DssBtnToggle v-model="brand" :options="brandOptions" variant="flat" size="md" aria-label="Marca da demonstração" />
      </div>
    </div>
    <NfagCheckinPage :scenario="scenario" :theme="theme" :brand="brand" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import DssBtnToggle from '@dss/DssBtnToggle/DssBtnToggle.vue'
import DssButton from '@dss/DssButton/DssButton.vue'
import NfagCheckinPage from './patterns/nfag/NfagCheckinPage.vue'
const scenario = ref('empty')
const theme = ref('light'), brand = ref('water')
const brandOptions = ['hub','water','waste'].map(value=>({label:value[0].toUpperCase()+value.slice(1),value,attrs:{'aria-label':`Marca ${value[0].toUpperCase()+value.slice(1)}`}}))
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
.nf-devbar__states{display:flex;align-items:center;flex-wrap:wrap;gap:var(--dss-spacing-2);flex:1;min-width:0}
.nf-devbar__presentation{display:flex;align-items:center;gap:var(--dss-spacing-2);margin-inline-start:auto;flex-shrink:0}
</style>
