<!--
  POC (descartável) — conteúdo carregado DENTRO do iframe (realm próprio,
  Teleport contido — veredito do spike). Dois modos por query:
    ?poc=playground  → 1 DssInput dirigido por props via postMessage (knobs)
    ?poc=examples    → o DssInput.example.vue (casos de uso reais, curados)
-->
<template>
  <div class="poc-standalone">
    <template v-if="mode === 'examples'">
      <DssInputExample />
    </template>
    <template v-else>
      <DssInput v-bind="props" v-model="model" />
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import DssInput from '@components/base/DssInput/DssInput.vue'
import DssInputExample from '@components/base/DssInput/DssInput.example.vue'

const mode = new URLSearchParams(window.location.search).get('poc') || 'playground'
const props = reactive({ variant: 'outlined', label: 'Campo', placeholder: 'Digite aqui' })
const model = ref('')

function onMsg(e) {
  const d = e.data
  if (!d || !d.__poc) return
  // limpa e reaplica
  Object.keys(props).forEach((k) => delete props[k])
  Object.assign(props, d.props || {})
}
onMounted(() => {
  window.addEventListener('message', onMsg)
  window.parent?.postMessage({ __pocReady: true }, '*')
})
onUnmounted(() => window.removeEventListener('message', onMsg))
</script>

<style>
.poc-standalone { padding: 28px; box-sizing: border-box; min-height: 100vh; }
</style>
