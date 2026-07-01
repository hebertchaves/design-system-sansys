<!--
  SPIKE (descartável) — entrada standalone do sujeito, carregada DENTRO do
  iframe via `/?spikeSubject=1`. Por carregar o bundle inteiro num realm
  próprio, o Quasar é instalado pelo main.js do iframe e o Teleport do QMenu
  resolve para o document.body DO IFRAME (contido). Sincroniza brand/dark com
  o pai via postMessage (custo de comunicação do braço iframe — medição 4).
-->
<template>
  <div class="spike-standalone">
    <SpikeSubject />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import SpikeSubject from './SpikeSubject.vue'
import { spikeState } from './spikeState.js'

function onMsg(e) {
  const d = e.data
  if (!d || !d.__spike) return
  if ('brand' in d) spikeState.brand = d.brand
  if ('dark' in d) spikeState.dark = d.dark
}

onMounted(() => {
  window.addEventListener('message', onMsg)
  // avisa o pai que está pronto para receber o estado inicial
  window.parent?.postMessage({ __spikeReady: true }, '*')
})
onUnmounted(() => window.removeEventListener('message', onMsg))
</script>

<style>
.spike-standalone {
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
}
</style>
