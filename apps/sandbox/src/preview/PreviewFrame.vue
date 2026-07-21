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

        <template v-if="slotDefs.length">
          <h4 class="pv__slots-h">Slots <small>— do contrato ({{ slotDefs.length }})</small></h4>
          <div v-for="s in slotDefs" :key="s.name" class="pv__slot">
            <label :for="'s-' + s.name" :title="s.description || ''">
              <input :id="'s-' + s.name" type="checkbox" v-model="activeSlots[s.name]" />
              {{ s.name }} <small>slot</small>
            </label>
            <input
              v-if="activeSlots[s.name] && ICON_SLOTS.includes(s.name)"
              v-model="slotIcons[s.name]"
              type="text"
              list="pv-icon-suggestions"
              class="pv__slot-icon"
              placeholder="ícone (ex.: attach_file, mdi-account)"
              :aria-label="'Ícone do slot ' + s.name"
            />
          </div>
          <datalist id="pv-icon-suggestions">
            <option v-for="ic in iconSuggestions" :key="ic" :value="ic" />
          </datalist>
        </template>

        <template v-if="methodDefs.length">
          <h4 class="pv__slots-h">Métodos <small>— exposedRefs ({{ methodDefs.length }})</small></h4>
          <button
            v-for="m in methodDefs" :key="m.name" class="pv__method"
            :title="(m.description || '') + '  ' + (m.type || '')"
            @click="callMethod(m.name)"
          >{{ m.name }}()</button>
        </template>
      </aside>
    </div>

    <div class="pv__events">
      <div class="pv__events-h">
        Eventos <small>— emits do contrato ({{ emitDefs.length }})</small>
        <button v-if="eventLog.length" class="pv__events-clear" @click="eventLog = []">limpar</button>
      </div>
      <div class="pv__events-body">
        <p v-if="!eventLog.length" class="pv__events-empty">
          Interaja com o componente (ou chame um método) — os eventos aparecem aqui.
          <span v-if="emitDefs.length"> Disponíveis: {{ emitDefs.map(e => e.name).join(', ') }}.</span>
        </p>
        <div v-for="(ev, i) in eventLog" :key="i" class="pv__event">
          <span class="pv__event-t">{{ ev.t }}</span>
          <strong>{{ ev.name }}</strong>
          <code>{{ JSON.stringify(ev.payload) }}</code>
        </div>
      </div>
    </div>

    <pre class="pv__snippet">{{ snippet }}</pre>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({ component: { type: String, default: 'DssInput' } })

// eager: o contrato é JSON pequeno; carregar sincronamente elimina o flash
// "Sem dss.contract.json" (antes o import assíncrono deixava `contract` null por
// alguns segundos no dev do /mnt/c) e o round-trip extra ao dev server.
const contracts = import.meta.glob('../../../../packages/core/components/{base,composed}/*/dss.contract.json', { eager: true, import: 'default' })
const contract = ref(null)
const knobs = ref([])
const slotDefs = ref([])          // api.slots do contrato
const activeSlots = reactive({})  // nome do slot -> ligado?
// Slots de ícone (prepend/append de campos): quando ligados, o sujeito renderiza
// <DssIcon :name> com o ícone escolhido aqui — em vez do marcador de demo.
const ICON_SLOTS = ['prepend', 'append']
const slotIcons = reactive({})    // nome do slot -> nome do ícone escolhido

// Sugestões de ícone extraídas dos EXEMPLOS reais do DS (não uma lista hardcoded):
// varre os *.example.vue em build-time e coleta os nomes usados em <DssIcon name="…">
// e em atributos *icon="…". Alimenta apenas o autocomplete (datalist) — o input é
// LIVRE, aceitando qualquer ícone que o Quasar resolva (Material, mdi-*, img:*).
const iconSuggestions = (() => {
  const files = import.meta.glob(
    '../../../../packages/core/components/{base,composed}/*/*.example.vue',
    { query: '?raw', import: 'default', eager: true }
  )
  const ok = (v) => /^(?:mdi-)?[a-z][a-z0-9_]*(?:-[a-z0-9]+)*$/.test(v)
  const set = new Set()
  for (const src of Object.values(files)) {
    const s = String(src)
    for (const m of s.matchAll(/<DssIcon\b[^>]*?\bname="([^"]+)"/g)) if (ok(m[1])) set.add(m[1])
    for (const m of s.matchAll(/\b[\w-]*icon="([^"]+)"/g)) if (ok(m[1])) set.add(m[1])
  }
  return [...set].sort()
})()
const emitDefs = ref([])          // api.emits do contrato
const methodDefs = ref([])        // api.exposedRefs do contrato
const eventLog = ref([])          // eventos recebidos do sujeito (ao vivo)
const state = reactive({})
const theme = ref('light')
const brand = ref('')
const frameEl = ref(null)

const frameSrc = computed(() => `${location.pathname}?frame=${props.component}`)

function load() {
  const key = Object.keys(contracts).find((k) => k.endsWith(`/${props.component}/dss.contract.json`))
  if (!key) { contract.value = null; knobs.value = []; return }
  contract.value = contracts[key]
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
    // @default sem valor chega do contrato como STRING descritiva (quirk do
    // emitter): "null", "undefined", "undefined (ilimitado)"… Tratar como ausente,
    // senão vira valor truthy semeado (brand="null" → classe --brand-null; ou
    // maxFiles="undefined (ilimitado)" → prop numérica recebe string → Vue warn).
    let def = k.default
    if (typeof def === 'string' && /^(null|undefined)\b/.test(def)) def = undefined
    // stepper (numérico): default não-parseável = ausente
    if (k.controlHint === 'stepper' && def != null && Number.isNaN(Number(def))) def = undefined
    state[k.name] = (k.name in dpp) ? dpp[k.name] : (def ?? (k.controlHint === 'toggle' ? false : ''))
  }
  // Slots: 1 toggle por slot do contrato (o Preview injeta conteúdo de demo no
  // sujeito). Sem isto, slots como prepend/append nunca apareciam no Preview
  // (o v-if="slots.x" ficava falso — só props eram exercitadas).
  slotDefs.value = contract.value.api?.slots || []
  Object.keys(activeSlots).forEach((k) => delete activeSlots[k])
  for (const s of slotDefs.value) activeSlots[s.name] = false
  Object.keys(slotIcons).forEach((k) => delete slotIcons[k])
  // Default sensato p/ o slot de ícone (o input é livre; 'attach_file' é Material Icons
  // válido mesmo não estando nas sugestões extraídas dos exemplos).
  for (const s of slotDefs.value) if (ICON_SLOTS.includes(s.name)) slotIcons[s.name] = 'attach_file'
  // Eventos (log) e métodos expostos (botões) — completam a superfície da API.
  emitDefs.value = contract.value.api?.emits || []
  methodDefs.value = contract.value.api?.exposedRefs || []
  eventLog.value = []
}

function postState() {
  const el = frameEl.value
  if (!el || !el.contentWindow) return
  const clean = {}
  for (const [k, v] of Object.entries(state)) if (v !== '' && v != null && v !== false) clean[k] = v
  // Serializa para dado PLANO: state pode conter arrays/objetos reativos (Proxy)
  // que o structured-clone do postMessage não consegue clonar (ex.: options do Select).
  // modelProp: o sujeito só liga v-model quando o contrato declara vModel
  // (componentes sem model — ex.: DssUploader — não recebem modelValue órfão).
  const modelProp = contract.value?.api?.vModel?.prop ?? null
  const slots = Object.keys(activeSlots).filter((n) => activeSlots[n])
  const activeSlotIcons = {}
  for (const n of slots) if (ICON_SLOTS.includes(n) && slotIcons[n]) activeSlotIcons[n] = slotIcons[n]
  const emits = emitDefs.value.map((ev) => ev.name)
  const payload = JSON.parse(JSON.stringify({ __frame: true, props: clean, theme: theme.value, brand: brand.value, modelProp, slots, slotIcons: activeSlotIcons, emits }))
  el.contentWindow.postMessage(payload, '*')
}
// Chama um método exposto (exposedRefs) no sujeito, via postMessage.
function callMethod(methodName) {
  frameEl.value?.contentWindow?.postMessage({ __frameCall: true, method: methodName }, '*')
}
function onMsg(e) {
  const d = e.data
  if (!d) return
  if (d.__frameReady) { postState(); return }
  if (d.__frameEvent) {
    eventLog.value.unshift({ t: new Date().toLocaleTimeString(), name: d.name, payload: d.payload })
    if (eventLog.value.length > 50) eventLog.value.pop()
  }
}

const snippet = computed(() => {
  const parts = []
  for (const k of knobs.value) {
    const v = state[k.name]
    if (v === k.default || v === '' || v == null || v === false) continue
    if (v === true) parts.push(k.name)
    else if (typeof v === 'string') parts.push(`${k.name}="${v}"`)
    else parts.push(`:${k.name}="${v}"`)
  }
  const attrs = parts.length ? ' ' + parts.join(' ') : ''
  const slots = Object.keys(activeSlots).filter((n) => activeSlots[n])
  if (!slots.length) return `<${props.component}${attrs} />`
  const inner = slots.map((s) => `  <template #${s}>…</template>`).join('\n')
  return `<${props.component}${attrs}>\n${inner}\n</${props.component}>`
})

watch(() => JSON.stringify({ s: state, t: theme.value, b: brand.value, sl: activeSlots, si: slotIcons }), postState)
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
.pv__slots-h { margin: 16px 0 8px; padding-top: 12px; border-top: 1px solid #e5e5e5; }
.pv__slot { font-size: 13px; margin-bottom: 6px; }
.pv__slot label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
.pv__slot small { color: #999; }
.pv__slot-icon { margin: 4px 0 2px 22px; width: calc(100% - 22px); font-size: 12px; padding: 2px 4px; }
.pv__method { display: block; width: 100%; text-align: left; margin-bottom: 6px; padding: 6px 10px; font-size: 13px; font-family: ui-monospace, monospace; background: #fff; border: 1px solid #d4d4d4; border-radius: 6px; cursor: pointer; }
.pv__method:hover { background: #eef2ff; border-color: #a5b4fc; }
.pv__empty { color: #b00020; font-size: 13px; }
.pv__events { border-top: 1px solid #e5e5e5; background: #fafafa; max-height: 140px; display: flex; flex-direction: column; }
.pv__events-h { display: flex; align-items: center; gap: 8px; padding: 6px 14px; font-size: 13px; font-weight: 600; border-bottom: 1px solid #eee; }
.pv__events-h small { color: #999; font-weight: normal; }
.pv__events-clear { margin-left: auto; font-size: 12px; background: none; border: 1px solid #d4d4d4; border-radius: 4px; padding: 2px 8px; cursor: pointer; }
.pv__events-body { overflow: auto; padding: 6px 14px; }
.pv__events-empty { color: #999; font-size: 12px; margin: 4px 0; }
.pv__event { display: flex; gap: 8px; align-items: baseline; font-size: 12px; padding: 2px 0; font-family: ui-monospace, monospace; }
.pv__event-t { color: #999; flex-shrink: 0; }
.pv__event strong { color: #4338ca; flex-shrink: 0; }
.pv__event code { color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pv__snippet { margin: 0; padding: 12px 14px; background: #0f172a; color: #e2e8f0; font-size: 13px; border-top: 1px solid #e5e5e5; overflow: auto; }
h4 { margin: 0 0 10px; }
h4 small { color: #999; font-weight: normal; }
</style>
