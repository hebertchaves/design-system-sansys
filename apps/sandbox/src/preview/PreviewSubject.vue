<!--
  Preview Frame — SUJEITO (realm do iframe).  Item G da cadeia de fonte única.

  Carregado por App.vue quando a URL tem ?frame=<Componente>. Vive num iframe
  próprio (cross-realm): Teleport/overlays ficam CONTIDOS neste documento
  (veredito do spike). Monta o SFC REAL do componente — nunca reimplementação —
  e recebe props/tema/brand do parent via postMessage.
-->
<template>
  <!--
    `data-theme`/`data-brand` NÃO ficam aqui — vão para <html> (ver watcher).
    O DSS governa o tema GLOBALMENTE (é o que todo componente teleportado
    declara: "modo escuro governado globalmente via [data-theme=dark]"). Preso a
    esta div, o atributo não alcançava o conteúdo TELEPORTADO para o <body> —
    dropdowns, menus, dialogs ficavam claros dentro de uma página escura.
  -->
  <div class="pv-stage">
    <component :is="Comp" v-if="Comp" ref="subjectRef" v-bind="allBindings">
      <!-- Slots ligados no parent recebem conteúdo de demo, para exercitar
           prepend/append/hint/error (que não são props e não apareciam). -->
      <template v-for="s in renderedSlots" :key="s" #[s]="scope">
        <!--
          SEMENTE primeiro: quando o contrato declara filhos para este slot, eles
          vencem o marcador genérico. O marcador prova que o slot EXISTE; a
          semente prova que o componente FUNCIONA — que é o que o fechamento
          ("renderiza fiel no Preview Frame") afirma.
        -->
        <!--
          Os filhos de TOPO vão como <component :is> no próprio template, não
          embrulhados num componente de render. QStepper/QTabPanels/QCarousel
          INTROSPECTAM os vnodes do slot para montar o cabeçalho; com um wrapper
          no meio, o pai enxerga UM filho (o wrapper) e monta header vazio — foi
          o que eu medi. O aninhamento abaixo do topo pode usar o render, porque
          aí quem lê os filhos é o próprio componente semeado.
        -->
        <template v-if="seedFor(s)">
          <component
            v-for="(n, i) in seedTopo(s)"
            :key="i"
            :is="n.comp"
            v-bind="n.props"
          >
            <SeedSlot v-if="n.children != null" :node="n.children" />
          </component>
        </template>
        <DssIcon v-else-if="slotIcons[s]" :name="slotIcons[s]" inline decorative />
        <!--
          Slot ESCOPADO que entrega `fieldId`: o componente é uma MOLDURA e está
          pedindo que o consumidor monte o controle (DssField). Renderizar o
          `<span>` de demo aqui fazia o Preview mostrar um campo VAZIO — a
          divergência contra a página de teste, que monta um <input> real.
          Usamos o próprio `fieldId` para a associação ARIA, exercitando o
          contrato em vez de ilustrá-lo.
        -->
        <input
          v-else-if="scope && scope.fieldId"
          :id="scope.fieldId"
          :aria-describedby="scope.ariaDescribedby"
          class="pv-slot-control"
          type="text"
          v-model="slotControl"
        />
        <span v-else class="pv-slot-demo">{{ slotDemo(s) }}</span>
      </template>
    </component>
    <p v-else class="pv-missing">Componente "{{ name }}" não encontrado no registry de preview.</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted, defineAsyncComponent, toHandlerKey, h } from 'vue'
import DssIcon from '../../../../packages/core/components/base/DssIcon/DssIcon.vue'

const name = new URLSearchParams(location.search).get('frame') || ''

// Registry de entry-wrappers reais: <Comp>/<Comp>.vue (re-export puro do 1-structure).
// Glob lazy: novos componentes exigem re-transform deste módulo (HMR) p/ entrar no registry.
const modules = import.meta.glob('../../../../packages/core/components/{base,composed}/*/*.vue')
const key = Object.keys(modules).find(k => k.endsWith(`/${name}/${name}.vue`))
const Comp = key ? defineAsyncComponent(modules[key]) : null

// ── SEMENTE DE FILHOS (visual.defaultPreview.slots do contrato) ──────────────
// Um container montado VAZIO não prova nada: nenhum knob de layout tem efeito
// observável sem filhos, e o frame passava a atestar casca (medido em
// DssStepper e DssTimeline — 1 container, 0 filhos). A semente já existia no
// meta e já viajava no contrato; faltava o último consumidor lê-la.
//
// Subcomponentes (DssCardSection, DssCardActions) NÃO têm wrapper na raiz do
// componente — são named exports do barrel do pai e moram em 1-structure/.
// Por isso o segundo glob: sem ele a semente do DssCard renderiza o aviso de
// "não encontrado" em vez do cartão.
const subModules = import.meta.glob('../../../../packages/core/components/{base,composed}/*/1-structure/*.vue')

// RESOLUÇÃO ANTECIPADA E SÍNCRONA — e não é otimização, é correção.
//
// Duas tentativas falharam antes desta, e as duas por causa do assíncrono:
//
// 1. `defineAsyncComponent` DENTRO do render cria um wrapper novo a cada
//    passagem. A identidade muda, o Vue descarta a resolução anterior e
//    recomeça: nunca assenta, slot vazio para sempre.
// 2. Cachear o wrapper conserta (1) e ainda falha em container de PAINÉIS.
//    QStepper/QTabPanels/QCarousel leem os filhos do slot para montar o
//    cabeçalho — introspecção sobre o vnode. Um wrapper assíncrono não casa
//    com o que eles procuram. Medido: QStepper montava header e content
//    VAZIOS, sem erro no console.
//
// Por isso a semente é resolvida ANTES de renderizar: quando o demoSlots chega,
// varremos a árvore, aguardamos os módulos e guardamos o componente RESOLVIDO.
// O render passa a ser síncrono e o pai enxerga filhos de verdade. A lazy
// continua de pé — carrega só o que a semente cita, não o catálogo.
const seedCompCache = new Map()   // nome -> componente resolvido (ou null)
const seedReady = ref(false)

function seedCompNames(node, acc = new Set()) {
  if (Array.isArray(node)) { for (const n of node) seedCompNames(n, acc); return acc }
  if (!node || typeof node !== 'object') return acc
  if (node.component) {
    acc.add(node.component)
    if (node.children != null) seedCompNames(node.children, acc)
    return acc
  }
  // Não é um NÓ — é o MAPA de slots (`{ default: [...], header: ... }`) ou um
  // objeto container. Desce pelos valores. Sem isto a varredura recebia o mapa,
  // não achava `.component` no topo e devolvia lista VAZIA: nada era pré-carregado
  // e todo slot semeado renderizava vazio, sem erro nenhum.
  for (const v of Object.values(node)) seedCompNames(v, acc)
  return acc
}

async function loadSeedComps(tree) {
  seedReady.value = false
  const nomes = [...seedCompNames(tree)]
  await Promise.all(nomes.map(async (nome) => {
    if (seedCompCache.has(nome)) return
    // Subcomponentes (DssCardSection/DssCardActions) não têm wrapper na raiz —
    // são named exports do barrel do pai e moram em 1-structure/. Sem o segundo
    // glob a semente do DssCard cairia no aviso de "não encontrado".
    const k = Object.keys(modules).find((m) => m.endsWith(`/${nome}/${nome}.vue`))
      || Object.keys(subModules).find((m) => m.endsWith(`/1-structure/${nome}.vue`))
    const loader = k ? (modules[k] || subModules[k]) : null
    if (!loader) { seedCompCache.set(nome, null); return }
    try { const mod = await loader(); seedCompCache.set(nome, mod.default ?? mod) }
    catch { seedCompCache.set(nome, null) }
  }))
  seedReady.value = true
}

// Mesmo formato do demoSlots consumido pelo DemoRenderer: string | {component,
// props, children} | {html} | Array. Mantido compatível de propósito — os dois
// leem a MESMA declaração do meta, e formatos diferentes reabririam a divergência
// entre consumidores que esta correção existe para fechar.
function renderSeed(node) {
  if (node == null) return null
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(renderSeed)
  if (typeof node !== 'object') return String(node)
  if (node.html != null) return h('div', { innerHTML: node.html })
  if (!node.component) return null
  const comp = seedCompCache.get(node.component)
  // Falha VISÍVEL: semente que cita componente inexistente vira aviso no palco,
  // não silêncio. É o único lugar onde esse erro aparece — nenhum gate lê o
  // conteúdo do demoSlots.
  if (!comp) return h('span', { class: 'pv-seed-missing' }, `\u26a0 ${node.component}`)
  return node.children != null
    ? h(comp, node.props || {}, { default: () => renderSeed(node.children) })
    : h(comp, node.props || {})
}

const SeedSlot = (p) => renderSeed(p.node)
SeedSlot.props = ['node']

const subjectRef = ref(null)  // ref do SFC real — permite chamar exposedRefs (métodos)
const props = reactive({})
const theme = ref('light')
const brand = ref('')
const contextTokens = reactive({})   // --token -> valor vindo do palco
const model = ref(null) // null é o "vazio" universal (File/array/objeto aceitam; '' quebrava File)
// Valor do controle que o Preview monta dentro de slot escopado com `fieldId`
// (componentes-moldura, ex.: DssField). Separado do `model` porque não é o
// v-model do componente — é o estado do controle que o CONSUMIDOR forneceria.
const slotControl = ref('')
const modelProp = ref(null)
let modelSeeded = false  // semeia o model com o default do vModel só na 1ª mensagem
const activeSlots = ref([]) // slots ligados no parent (nomes)
const demoSlots = ref(null)  // semente vinda do contrato, via postMessage
const slotIcons = ref({})   // nome do slot -> nome do ícone (prepend/append) escolhido no parent
const emitNames = ref([])   // api.emits do contrato — p/ logar TODOS os eventos

// Conteúdo de demonstração por slot: marca visível para o slot ser inspecionável.
function slotDemo(s) {
  const demo = { prepend: '📎', append: '⬆', hint: 'Texto de ajuda (demo)', error: 'Mensagem de erro (demo)' }
  return demo[s] ?? `«${s}»`
}

// Slot semeado pelo contrato para este nome (null = sem semente).
function seedFor(s) {
  const d = demoSlots.value
  return d && typeof d === 'object' ? (d[s] ?? null) : null
}

// Normaliza o TOPO da semente para o template: cada item vira {comp, props,
// children}. Texto puro no topo não tem componente — vira nó de texto pelo
// caminho do render, que o `v-else` abaixo cobre.
function seedTopo(s) {
  const raw = seedFor(s)
  const arr = Array.isArray(raw) ? raw : [raw]
  return arr
    .filter((n) => n && typeof n === 'object' && n.component)
    .map((n) => ({ comp: seedCompCache.get(n.component) || null, props: n.props || {}, children: n.children }))
    .filter((n) => n.comp)
}

// Slots a renderizar = os ligados no palco UNIDOS aos semeados.
// A união (em vez de só `activeSlots`) é o ponto: a semente é o estado DEFAULT
// declarado pelo componente, não algo que o inspetor precise ligar. Exigir o
// toque preservaria a casca vazia na primeira pintura — exatamente o que o
// fechamento passava a atestar sem querer.
const renderedSlots = computed(() => {
  const semeados = seedReady.value && demoSlots.value && typeof demoSlots.value === 'object' ? Object.keys(demoSlots.value) : []
  return [...new Set([...activeSlots.value, ...semeados])]
})

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
  if (d.contextTokens && typeof d.contextTokens === 'object') {
    Object.keys(contextTokens).forEach((k) => delete contextTokens[k])
    Object.assign(contextTokens, d.contextTokens)
  }
  if ('modelProp' in d) modelProp.value = d.modelProp
  // Semeia o model com o default do vModel (@default do contrato) — só na 1ª
  // mensagem, para não sobrescrever a interação do usuário depois. Sem semente,
  // um checkbox nasceria indeterminate (model=null === indeterminateValue:null).
  if (!modelSeeded) {
    if ('modelDefault' in d && d.modelDefault != null) model.value = d.modelDefault
    modelSeeded = true
  }
  if (Array.isArray(d.slots)) activeSlots.value = d.slots
  if ('demoSlots' in d) { demoSlots.value = d.demoSlots; loadSeedComps(d.demoSlots) }
  if (d.slotIcons && typeof d.slotIcons === 'object') slotIcons.value = d.slotIcons
  if (Array.isArray(d.emits)) emitNames.value = d.emits
}
/**
 * Tema e brand vão para <html> deste realm, não para a div do palco.
 *
 * QMenu/QDialog/QTooltip teleportam para o <body>. Um atributo preso a uma div
 * INTERNA não é ancestral do conteúdo teleportado, então dropdowns e overlays
 * resolviam os tokens do tema CLARO dentro de uma página escura. Em <html> o
 * atributo cobre o documento inteiro — que é como o DSS declara governar o tema
 * ("globalmente via [data-theme]") e como um app real o aplica.
 *
 * O iframe é um realm próprio (um documento por sujeito), então mexer no <html>
 * daqui não vaza para a casca do playground.
 */
watch([theme, brand], ([t, b]) => {
  const html = document.documentElement
  html.setAttribute('data-theme', t)
  if (b) html.setAttribute('data-brand', b)
  else html.removeAttribute('data-brand')
}, { immediate: true })

/**
 * Tokens de CONTEXTO: mesma decisão do tema e do brand, pelo mesmo motivo.
 *
 * Vão para <html> deste realm, não para a div do palco, porque custom property
 * é HERDADA e overlay teleportado para o <body> não é descendente do palco —
 * preso à div, um menu ou diálogo resolveria o valor padrão enquanto o sujeito
 * usa outro. Em <html> cobre o documento, que é como um app real redefine um
 * token de ambiente.
 */
watch(contextTokens, (map) => {
  const html = document.documentElement
  for (const [nome, valor] of Object.entries(map)) {
    if (valor == null || valor === '') html.style.removeProperty(nome)
    else html.style.setProperty(nome, valor)
  }
}, { deep: true, immediate: true })

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
/* Semente citando componente que não resolve. Visível de propósito: é o único
   lugar onde esse erro aparece — nenhum gate lê o conteúdo do demoSlots. */
.pv-seed-missing { color: #b26a00; font: 11px/1.4 ui-monospace, monospace; padding: 2px 4px; }
/* Controle montado pelo Preview dentro de slot escopado com `fieldId`
   (componente-moldura). Deliberadamente CRU — sem borda, fundo ou padding
   próprios: quem desenha a moldura é o componente sob teste, e um controle
   estilizado aqui mascararia o que se quer inspecionar. Herda cor e fonte para
   acompanhar tema e brand. */
.pv-slot-control {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  padding: 0;
}
</style>
