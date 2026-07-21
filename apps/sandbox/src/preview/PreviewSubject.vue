<!--
  Preview Frame — SUJEITO (realm do iframe).  Item G da cadeia de fonte única.

  Carregado por App.vue quando a URL tem ?frame=<Componente>. Vive num iframe
  próprio (cross-realm): Teleport/overlays ficam CONTIDOS neste documento
  (veredito do spike). Monta o SFC REAL do componente — nunca reimplementação —
  e recebe props/tema/brand do parent via postMessage.
-->
<template>
  <div class="pv-stage" :data-theme="theme" :data-brand="brand || null">
    <component :is="Comp" v-if="Comp" ref="subjectRef" v-bind="allBindings">
      <!-- Slots ligados no parent recebem conteúdo de demo, para exercitar
           prepend/append/hint/error (que não são props e não apareciam). -->
      <template v-for="s in activeSlots" :key="s" #[s]>
        <DssIcon v-if="slotIcons[s]" :name="slotIcons[s]" inline decorative />
        <span v-else class="pv-slot-demo">{{ slotDemo(s) }}</span>
      </template>
    </component>
    <p v-else class="pv-missing">Componente "{{ name }}" não encontrado no registry de preview.</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, defineAsyncComponent, toHandlerKey } from 'vue'
import DssIcon from '../../../../packages/core/components/base/DssIcon/DssIcon.vue'

const name = new URLSearchParams(location.search).get('frame') || ''

// Registry de entry-wrappers reais: <Comp>/<Comp>.vue (re-export puro do 1-structure)
const modules = import.meta.glob('../../../../packages/core/components/{base,composed}/*/*.vue')
const key = Object.keys(modules).find(k => k.endsWith(`/${name}/${name}.vue`))
const Comp = key ? defineAsyncComponent(modules[key]) : null

const subjectRef = ref(null)  // ref do SFC real — permite chamar exposedRefs (métodos)
const props = reactive({})
const theme = ref('light')
const brand = ref('')
const model = ref(null) // null é o "vazio" universal (File/array/objeto aceitam; '' quebrava File)
const modelProp = ref(null)
const activeSlots = ref([]) // slots ligados no parent (nomes)
const slotIcons = ref({})   // nome do slot -> nome do ícone (prepend/append) escolhido no parent
const emitNames = ref([])   // api.emits do contrato — p/ logar TODOS os eventos

// Conteúdo de demonstração por slot: marca visível para o slot ser inspecionável.
function slotDemo(s) {
  const demo = { prepend: '📎', append: '⬆', hint: 'Texto de ajuda (demo)', error: 'Mensagem de erro (demo)' }
  return demo[s] ?? `«${s}»`
}

// Resume um argumento de evento para dado PLANO serializável (payloads carregam
// File/FocusEvent/etc. que o postMessage não clona).
function summarize(a) {
  if (a == null || typeof a !== 'object') return a
  if (a instanceof File) return `File(${a.name})`
  if (typeof Event !== 'undefined' && a instanceof Event) return `${a.constructor?.name || 'Event'}(${a.type})`
  if (Array.isArray(a)) return a.map(summarize)
  try { return JSON.parse(JSON.stringify(a)) } catch { return String(a) }
}
function forwardEvent(evName, args) {
  window.parent?.postMessage({ __frameEvent: true, name: evName, payload: args.map(summarize) }, '*')
}

// Handlers para TODOS os emits do contrato: reemite ao parent (log) e, no evento
// de vModel, atualiza o model local (assim o valor real dirige o componente).
const eventHandlers = computed(() => {
  const h = {}
  const vmEvent = modelProp.value ? `update:${modelProp.value}` : null
  for (const evName of emitNames.value) {
    h[toHandlerKey(evName)] = (...args) => {
      if (evName === vmEvent) model.value = args[0]
      forwardEvent(evName, args)
    }
  }
  if (vmEvent && !h[toHandlerKey(vmEvent)]) {
    h[toHandlerKey(vmEvent)] = (v) => { model.value = v; forwardEvent(vmEvent, [v]) }
  }
  return h
})

// Bindings finais: props + valor do vModel + handlers de eventos.
const allBindings = computed(() => {
  const value = modelProp.value ? { [modelProp.value]: model.value } : {}
  return { ...props, ...value, ...eventHandlers.value }
})

function onMsg(e) {
  const d = e.data
  if (!d) return
  // Chamada de método exposto (exposedRefs) disparada por um botão no parent.
  if (d.__frameCall) {
    const fn = subjectRef.value?.[d.method]
    if (typeof fn === 'function') {
      try { fn() } catch (err) { forwardEvent(`[erro: ${d.method}]`, [String(err)]) }
    } else {
      forwardEvent(`[método ausente: ${d.method}]`, [])
    }
    return
  }
  if (!d.__frame) return
  Object.keys(props).forEach((k) => delete props[k])
  Object.assign(props, d.props || {})
  if (d.theme != null) theme.value = d.theme
  if (d.brand != null) brand.value = d.brand
  if ('modelProp' in d) modelProp.value = d.modelProp
  if (Array.isArray(d.slots)) activeSlots.value = d.slots
  if (d.slotIcons && typeof d.slotIcons === 'object') slotIcons.value = d.slotIcons
  if (Array.isArray(d.emits)) emitNames.value = d.emits
}
onMounted(() => {
  window.addEventListener('message', onMsg)
  // avisa o parent que o realm está pronto para receber o estado inicial
  window.parent?.postMessage({ __frameReady: true, frame: name }, '*')
})
onUnmounted(() => window.removeEventListener('message', onMsg))
</script>

<style>
/* Superfície do stage = surface-default (a página real). Segue o tema (dark de
   verdade). NÃO usar surface-subtle: coincide com o fundo do variant `filled`
   (também surface-subtle) e o filled "sumia" contra o stage. Contra surface-
   default, TODOS os variants ficam distintos (filled=fundo sutil, standout=chip,
   outlined=borda) e o dark segue calibrável (standout gray-900 e filled gray-600
   distintos do stage gray-800). */
.pv-stage { padding: 32px; min-height: 100vh; box-sizing: border-box; background: var(--dss-surface-default); }
.pv-missing { color: #b00020; font-family: system-ui, sans-serif; }
</style>
