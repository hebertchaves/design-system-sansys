<!--
  Preview Frame — SUJEITO (realm do iframe).  Item G da cadeia de fonte única.

  Carregado por App.vue quando a URL tem ?frame=<Componente>. Vive num iframe
  próprio (cross-realm): Teleport/overlays ficam CONTIDOS neste documento
  (veredito do spike). Monta o SFC REAL do componente — nunca reimplementação —
  e recebe props/tema/brand do parent via postMessage.
-->
<template>
  <div class="pv-stage" :data-theme="theme" :data-brand="brand || null">
    <component :is="Comp" v-if="Comp" v-bind="boundProps" />
    <p v-else class="pv-missing">Componente "{{ name }}" não encontrado no registry de preview.</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'

const name = new URLSearchParams(location.search).get('frame') || ''

// Registry de entry-wrappers reais: <Comp>/<Comp>.vue (re-export puro do 1-structure)
const modules = import.meta.glob('../../../../packages/core/components/{base,composed}/*/*.vue')
const key = Object.keys(modules).find(k => k.endsWith(`/${name}/${name}.vue`))
const Comp = key ? defineAsyncComponent(modules[key]) : null

const props = reactive({})
const theme = ref('light')
const brand = ref('')
const model = ref(null) // null é o "vazio" universal (File/array/objeto aceitam; '' quebrava File)
const modelProp = ref(null)

// Liga v-model ao prop declarado no contrato (ex.: modelValue). Sem vModel no
// contrato (ex.: DssUploader), NÃO injeta modelValue — o sujeito recebe só as props.
const boundProps = computed(() => {
  if (!modelProp.value) return props
  const p = modelProp.value
  return { ...props, [p]: model.value, [`onUpdate:${p}`]: (v) => { model.value = v } }
})

function onMsg(e) {
  const d = e.data
  if (!d || !d.__frame) return
  Object.keys(props).forEach((k) => delete props[k])
  Object.assign(props, d.props || {})
  if (d.theme != null) theme.value = d.theme
  if (d.brand != null) brand.value = d.brand
  if ('modelProp' in d) modelProp.value = d.modelProp
}
onMounted(() => {
  window.addEventListener('message', onMsg)
  // avisa o parent que o realm está pronto para receber o estado inicial
  window.parent?.postMessage({ __frameReady: true, frame: name }, '*')
})
onUnmounted(() => window.removeEventListener('message', onMsg))
</script>

<style>
/* Superfície do stage segue o tema (surface-subtle = o fundo real "atrás do
   campo" que o checklist de adequação usa p/ calibrar dark). Sem isto o realm
   ficava claro mesmo em data-theme=dark, e a validação de dark era falsa. */
.pv-stage { padding: 32px; min-height: 100vh; box-sizing: border-box; background: var(--dss-surface-subtle); }
.pv-missing { color: #b00020; font-family: system-ui, sans-serif; }
</style>
