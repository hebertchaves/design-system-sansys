<!--
  Preview Frame — PARENT (host do playground).  Item G da cadeia de fonte única.

  Consumidor PURO do contrato: lê dss.contract.json do componente e deriva os
  controles de api.props (widget = controlHint, §4.1.1). Monta o SFC real dentro
  de um <iframe> (barreira que contém overlays) e dirige props/tema/brand via
  postMessage. O snippet vem do estado dos knobs (API real exercida), não de um
  exemplo curado (D4). A casca (esta view) NÃO reimplementa o componente.
-->
<template>
  <div class="pv">
    <header class="pv__bar">
      <strong>{{ component }}</strong>
      <span class="pv__tag">{{ contract?.identity?.tagline }}</span>
      <span class="pv__spacer" />
      <label class="pv__ctl">Tema
        <select v-model="theme"><option value="light">light</option><option value="dark">dark</option></select>
      </label>
      <label class="pv__ctl">Brand
        <select v-model="brand">
          <option value="">—</option><option value="hub">hub</option>
          <option value="water">water</option><option value="waste">waste</option>
        </select>
      </label>
    </header>

    <div class="pv__body">
      <iframe ref="frameEl" class="pv__frame" :src="frameSrc" @load="postState" />
      <aside class="pv__knobs">
        <h4>Controles <small>— derivados do contrato ({{ knobs.length }})</small></h4>
        <p v-if="!contract" class="pv__empty">Sem <code>dss.contract.json</code> para {{ component }}.</p>
        <div v-for="k in knobs" :key="k.name" class="pv__knob">
          <label :for="'k-' + k.name">{{ k.name }} <small>{{ k.controlHint }}</small></label>
          <input v-if="k.controlHint === 'toggle'" :id="'k-' + k.name" type="checkbox" v-model="state[k.name]" />
          <select v-else-if="k.options" :id="'k-' + k.name" v-model="state[k.name]">
            <option v-for="o in k.options" :key="String(o)" :value="o">{{ o === null ? '—' : o }}</option>
          </select>
          <input v-else-if="k.controlHint === 'stepper'" :id="'k-' + k.name" type="number" v-model.number="state[k.name]" />
          <input v-else :id="'k-' + k.name" type="text" v-model="state[k.name]" :placeholder="String(k.default ?? '')" />
        </div>
      </aside>
    </div>

    <pre class="pv__snippet">{{ snippet }}</pre>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({ component: { type: String, default: 'DssInput' } })

const contracts = import.meta.glob('../../../../packages/core/components/base/*/dss.contract.json')
const contract = ref(null)
const knobs = ref([])
const state = reactive({})
const theme = ref('light')
const brand = ref('')
const frameEl = ref(null)

const frameSrc = computed(() => `${location.pathname}?frame=${props.component}`)

async function load() {
  const key = Object.keys(contracts).find((k) => k.endsWith(`/${props.component}/dss.contract.json`))
  if (!key) { contract.value = null; knobs.value = []; return }
  const mod = await contracts[key]()
  contract.value = mod.default || mod
  const vmodel = contract.value.api?.vModel?.prop
  knobs.value = (contract.value.api?.props || [])
    .filter((p) => p.name !== vmodel)
    .map((p) => ({
      name: p.name,
      controlHint: p.controlHint,
      default: p.default,
      options: p.validValues ? (/\bnull\b/.test(p.type) ? [null, ...p.validValues] : p.validValues) : null,
    }))
  // Semeia o estado inicial pelo defaultPreview do contrato (view significativa),
  // com fallback no @default da prop; assim o campo abre com label/placeholder.
  const dpp = contract.value.visual?.defaultPreview?.props || {}
  Object.keys(state).forEach((k) => delete state[k])
  for (const k of knobs.value) {
    state[k.name] = (k.name in dpp) ? dpp[k.name] : (k.default ?? (k.controlHint === 'toggle' ? false : ''))
  }
}

function postState() {
  const el = frameEl.value
  if (!el || !el.contentWindow) return
  const clean = {}
  for (const [k, v] of Object.entries(state)) if (v !== '' && v != null && v !== false) clean[k] = v
  el.contentWindow.postMessage({ __frame: true, props: clean, theme: theme.value, brand: brand.value }, '*')
}
function onMsg(e) { if (e.data && e.data.__frameReady) postState() }

const snippet = computed(() => {
  const parts = []
  for (const k of knobs.value) {
    const v = state[k.name]
    if (v === k.default || v === '' || v == null || v === false) continue
    if (v === true) parts.push(k.name)
    else if (typeof v === 'string') parts.push(`${k.name}="${v}"`)
    else parts.push(`:${k.name}="${v}"`)
  }
  return `<${props.component}${parts.length ? ' ' + parts.join(' ') : ''} />`
})

watch(() => JSON.stringify({ s: state, t: theme.value, b: brand.value }), postState)
watch(() => props.component, load)
onMounted(() => { window.addEventListener('message', onMsg); load() })
onUnmounted(() => window.removeEventListener('message', onMsg))
</script>

<style scoped>
.pv { display: flex; flex-direction: column; height: 100%; min-height: 520px; font-family: system-ui, sans-serif; }
.pv__bar { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-bottom: 1px solid #e5e5e5; }
.pv__tag { color: #666; font-size: 13px; }
.pv__spacer { flex: 1; }
.pv__ctl { font-size: 13px; display: flex; gap: 4px; align-items: center; }
.pv__body { display: flex; flex: 1; min-height: 380px; }
.pv__frame { flex: 1; border: 0; border-right: 1px solid #e5e5e5; background: #fff; }
.pv__knobs { width: 300px; padding: 12px 14px; overflow: auto; background: #fafafa; }
.pv__knob { display: flex; flex-direction: column; margin-bottom: 8px; font-size: 13px; gap: 2px; }
.pv__knob > label { font-weight: 600; }
.pv__knob small { color: #999; font-weight: normal; }
.pv__empty { color: #b00020; font-size: 13px; }
.pv__snippet { margin: 0; padding: 12px 14px; background: #0f172a; color: #e2e8f0; font-size: 13px; border-top: 1px solid #e5e5e5; overflow: auto; }
h4 { margin: 0 0 10px; }
h4 small { color: #999; font-weight: normal; }
</style>
