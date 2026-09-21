<!--
  Preview Frame — PARENT (host do playground).  Item G da cadeia de fonte única.

  Consumidor PURO do contrato: lê dss.contract.json do componente e deriva os
  controles de api.props (widget = controlHint, §4.1.1). Monta o SFC real dentro
  de um <iframe> (barreira que contém overlays) e dirige props/tema/brand via
  postMessage. O snippet vem do estado dos knobs (API real exercida), não de um
  exemplo curado (D4). A casca (esta view) NÃO reimplementa o componente.
-->
<template>
  <div class="pv" :class="{ 'pv--embedded': embedded }">
    <!--
      Cabeçalho de SEÇÃO — só no modo embutido. A página de teste tem cenários
      abaixo; abrir com um palco de viewport inteira obrigaria a rolar tudo antes
      de chegar neles. Recolhível e com altura limitada.
    -->
    <button
      v-if="embedded"
      class="pv__section-h"
      :aria-expanded="String(secaoAberta)"
      @click="secaoAberta = !secaoAberta"
    >
      <span class="pv__section-caret">{{ secaoAberta ? '▾' : '▸' }}</span>
      Preview Frame
      <small>— SFC real em iframe, knobs derivados do contrato</small>
    </button>

    <template v-if="!embedded || secaoAberta">
    <header class="pv__bar">
      <strong>{{ component }}</strong>
      <span class="pv__tag">{{ contract?.identity?.tagline }}</span>
      <span class="pv__spacer" />
      <!--
        Tema e Brand só aparecem no uso AVULSO. Dentro do PlaygroundLayout eles
        já estão no header da página, e duplicá-los aqui criava dois controles
        para o mesmo eixo — com o de baixo sempre pronto a contradizer o de cima.
      -->
      <template v-if="!dirigidoDeFora">
        <label class="pv__ctl">Tema
          <select v-model="temaLocal"><option value="light">light</option><option value="dark">dark</option></select>
        </label>
        <label class="pv__ctl">Brand
          <select v-model="brandLocal">
            <option value="">—</option><option value="hub">hub</option>
            <option value="water">water</option><option value="waste">waste</option>
          </select>
        </label>
      </template>
      <!-- Largura do PALCO (não do componente): o sujeito é responsivo e, ocupando
           todo o palco, esconde os problemas de layout apertado (chips que quebram
           em muitas linhas, rótulos truncados). Larguras típicas de coluna de
           formulário / card lateral. -->
      <!-- Tokens de CONTEXTO (contrato → visual.contextTokens). Mesma categoria de
           Tema e Brand: ambiente que o sujeito herda, não prop que ele recebe.
           Sem isto, uma prop que só ESCAPA de um token (no-caps) aparece como
           interruptor sem lâmpada — o palco sempre no valor padrão, o knob sem
           efeito visível. A lista vem do CSS compilado do componente: quem não
           consome o token não ganha o controle. -->
      <label v-for="ct in contextTokens" :key="ct.name" class="pv__ctl">{{ ct.label }}
        <select v-model="contextState[ct.name]">
          <option v-for="v in ct.values" :key="v" :value="v">{{ v }}</option>
        </select>
      </label>
      <label class="pv__ctl">Largura
        <select v-model="stageWidth">
          <option value="">cheia</option>
          <option value="480">480px</option>
          <option value="360">360px</option>
          <option value="260">260px</option>
        </select>
      </label>
    </header>

    <div class="pv__body">
      <div class="pv__stage">
        <iframe ref="frameEl" class="pv__frame" :style="stageStyle" :src="frameSrc" @load="postState" />
      </div>
      <aside class="pv__knobs" :class="{ 'is-collapsed': knobsCollapsed }">
        <button
          class="pv__knobs-toggle"
          :aria-expanded="String(!knobsCollapsed)"
          :title="knobsCollapsed ? 'Abrir controles' : 'Recolher controles'"
          @click="knobsCollapsed = !knobsCollapsed"
        >{{ knobsCollapsed ? '‹' : '›' }}</button>

        <div v-show="!knobsCollapsed" class="pv__knobs-inner">
        <h4>Controles <small>— derivados do contrato ({{ knobs.length }})</small></h4>
        <p v-if="!contract" class="pv__empty">Sem <code>dss.contract.json</code> para {{ component }}.</p>

        <template v-for="grupo in gruposDeKnobs" :key="grupo.id">
          <!--
            ESSENCIAIS abertos, DEMAIS recolhidos. O corte vem do
            `defaultPreview.props` do contrato — média de 1,9 props contra até 26
            disponíveis. Sem o corte o painel nasce rolando no DssSelect (24
            props) e o scroll aninhado vira armadilha dentro da página de teste.
          -->
          <button
            v-if="grupo.colapsavel"
            class="pv__group"
            :aria-expanded="String(restantesAbertos)"
            @click="restantesAbertos = !restantesAbertos"
          >
            {{ restantesAbertos ? '▾' : '▸' }} Demais props
            <small>({{ knobsRestantes.length }})</small>
          </button>
        <div v-for="k in grupo.itens" :key="k.name" class="pv__knob">
          <label :for="'k-' + k.name">{{ k.name }} <small>{{ k.controlHint }}</small></label>
          <!-- A descrição vem do contrato (@default/JSDoc do types.ts) e até aqui era
               DESCARTADA: o painel mostrava só nome e widget. Para prop que pinta algo o
               nome basta; para prop que só ESCAPA de um token de ambiente, não —
               `noCaps` foi lido como quebrado três vezes porque nada no painel dizia de
               que ele escapa, nem que o controle está no cabeçalho. -->
          <p v-if="k.description" class="pv__hint">{{ k.description }}</p>
          <p v-if="inerte(k)" class="pv__inert">
            sem efeito agora — {{ inerte(k).label }} está em <code>{{ inerte(k).valor }}</code>
          </p>
          <input v-if="k.controlHint === 'toggle'" :id="'k-' + k.name" type="checkbox" v-model="state[k.name]" />
          <select v-else-if="k.options" :id="'k-' + k.name" v-model="state[k.name]">
            <option v-for="o in k.options" :key="String(o)" :value="o">{{ o === null ? '—' : o }}</option>
          </select>
          <input v-else-if="k.controlHint === 'stepper'" :id="'k-' + k.name" type="number" v-model.number="state[k.name]" />
          <input
            v-else-if="isIconKnob(k)"
            :id="'k-' + k.name"
            type="text"
            list="pv-icon-suggestions"
            v-model="state[k.name]"
            :placeholder="String(k.default ?? 'ícone (ex.: check, mdi-account)')"
          />
          <input v-else :id="'k-' + k.name" type="text" v-model="state[k.name]" :placeholder="String(k.default ?? '')" />
        </div>
        </template>

        <!-- Autocomplete de ícone compartilhado (knobs *icon + slots prepend/append).
             Fora do bloco de slots p/ existir mesmo em componentes sem slot. -->
        <datalist id="pv-icon-suggestions">
          <option v-for="ic in iconSuggestions" :key="ic" :value="ic" />
        </datalist>

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
        </template>

        <template v-if="methodDefs.length">
          <h4 class="pv__slots-h">Métodos <small>— exposedRefs ({{ methodDefs.length }})</small></h4>
          <button
            v-for="m in methodDefs" :key="m.name" class="pv__method"
            :title="(m.description || '') + '  ' + (m.type || '')"
            @click="callMethod(m.name)"
          >{{ m.name }}()</button>
        </template>
        </div>
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
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  component: { type: String, default: 'DssInput' },
  // Embutido como PRIMEIRA SEÇÃO da página de teste (em vez de página própria).
  // Muda duas coisas: a altura deixa de ser de viewport (senão o leitor rola um
  // palco inteiro antes de chegar aos cenários) e a seção ganha cabeçalho
  // recolhível.
  embedded: { type: Boolean, default: false },
  // Tema e brand DIRIGIDOS DE FORA. Dentro do PlaygroundLayout quem manda é o
  // header da página — os mesmos seletores que pintam as seções. Ter um segundo
  // par aqui era redundância que só podia divergir: o leitor mudava a marca no
  // topo e o palco continuava no valor antigo.
  //
  // `null` = ninguém dirige (uso avulso, como o frame do multiselect no menu
  // principal). Aí os seletores internos continuam existindo — remover sem
  // substituto deixaria esse caso preso em claro/sem marca.
  theme: { type: String, default: null },
  brand: { type: String, default: null },
})

const dirigidoDeFora = computed(() => props.theme != null || props.brand != null)

// Painel de controles recolhido — mesmo padrão do aside do PlaygroundLayout
// (200px → 44px). Ancorado, NÃO flutuante: vários componentes do DS SÃO overlays
// (Select, Menu, Tooltip, Dialog, PopupProxy, BtnDropdown) e um painel sobre o
// palco cobriria justamente o que se quer inspecionar.
const knobsCollapsed = ref(false)
// Seção inteira recolhida (só no modo embutido).
const secaoAberta = ref(true)
// Grupo "completos" começa fechado: o defaultPreview declara em média 1,9 props
// essenciais contra até 26 disponíveis. Abrir tudo faz o painel nascer rolando.
const restantesAbertos = ref(false)

/**
 * O tipo declarado no contrato é uma prop de ARRAY?
 *
 * Cuidado com dois enganos comuns na string do tipo:
 *  - `(query: string) => any[]` CONTÉM "[]" mas é FUNÇÃO (o `loadOptions` do
 *    multiselect) — converter viraria uma lista de caracteres do código-fonte;
 *  - `Array<{ name: string }>` não tem "[]" e mesmo assim é array.
 */
function isArrayType(type) {
  const t = String(type || '')
  if (!t || t.includes('=>')) return false
  return /\[\]/.test(t) || /\bArray</.test(t)
}

// Largura do palco ('' = cheia). String em px vinda do <select>; o iframe deixa de
// ser flex:1 e passa a ter largura fixa, centralizado — simula coluna estreita.
const stageWidth = ref('')
const stageStyle = computed(() =>
  stageWidth.value ? { flex: '0 0 auto', width: stageWidth.value + 'px' } : null
)

// eager: o contrato é JSON pequeno; carregar sincronamente elimina o flash
// "Sem dss.contract.json" (antes o import assíncrono deixava `contract` null por
// alguns segundos no dev do /mnt/c) e o round-trip extra ao dev server.
// Glob eager: novos dss.contract.json exigem re-transform deste módulo (HMR) p/ entrar.
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

// Knob cujo VALOR é um nome de ícone (checkedIcon, indeterminateIcon, prependIcon…):
// recebe o autocomplete (datalist) em vez do texto livre. Só é avaliado para knobs
// de texto livre — toggle/stepper e enums (k.options → <select>) têm precedência no
// template. Evita nomes fora do icon-set carregado (o glifo renderiza em branco).
const isIconKnob = (k) => /icon/i.test(k.name)
const emitDefs = ref([])          // api.emits do contrato
const methodDefs = ref([])        // api.exposedRefs do contrato
const eventLog = ref([])          // eventos recebidos do sujeito (ao vivo)
const state = reactive({})
// Refs LOCAIS — só valem no uso avulso. Nome distinto da prop de propósito:
// com os dois chamados `theme`, o binding do template fica ambíguo e o leitor
// não consegue dizer qual dos dois está vendo.
const temaLocal = ref('light')
const brandLocal = ref('')
// Valor EFETIVO: o de fora quando existe, o interno quando não. Tudo o que vai
// para o iframe lê daqui — nunca dos refs internos direto —, senão o palco
// obedeceria a um controle que o leitor não está vendo.
const temaEfetivo = computed(() => props.theme ?? temaLocal.value)
const brandEfetivo = computed(() => props.brand ?? brandLocal.value)

const contextTokens = ref([])      // visual.contextTokens do contrato

// ESSENCIAIS vêm do `defaultPreview.props` do contrato — a mesma declaração que
// define a vista canônica do componente. Não é lista curada à mão: é derivada,
// e acompanha o meta sem manutenção paralela.
const nomesEssenciais = computed(() => Object.keys(contract.value?.visual?.defaultPreview?.props || {}))
const knobsEssenciais = computed(() => knobs.value.filter((k) => nomesEssenciais.value.includes(k.name)))
const knobsRestantes = computed(() => knobs.value.filter((k) => !nomesEssenciais.value.includes(k.name)))

// Um único v-for sobre GRUPOS, para o corpo do knob (que tem 6 variantes de
// widget) existir uma vez só. Duplicá-lo por grupo garantiria divergência.
const gruposDeKnobs = computed(() => {
  const gs = [{ id: 'essenciais', itens: knobsEssenciais.value, colapsavel: false }]
  if (knobsRestantes.value.length) {
    gs.push({ id: 'restantes', itens: restantesAbertos.value ? knobsRestantes.value : [], colapsavel: true })
  }
  return gs
})
// Semente de FILHOS do contrato (visual.defaultPreview.slots, vindo do
// defaultPreview.demoSlots do meta). Sem ela o container monta como casca
// vazia e nenhum knob de layout tem efeito observável — o frame não prova
// nada para Timeline, Stepper, Tabs, List, BtnToggle e afins.
const demoSlots = ref(null)
const contextState = reactive({})  // --token -> valor escolhido no palco
const frameEl = ref(null)

/**
 * Knob que depende de CONTEXTO e está inerte no valor atual do palco.
 *
 * Genérico, sem lista por componente: a descrição da prop (vinda do contrato)
 * CITA o token do qual ela escapa; se esse token está no valor NEUTRO, a prop
 * não tem o que fazer. É o caso do `noCaps` com Capitalização `none` — mexer no
 * knob não muda nada, e sem este aviso o palco parece quebrado.
 *
 * O valor neutro é `inertWhen`, do contrato — NÃO o `default`. Os dois eram o
 * mesmo `none` até set/2026, e tratá-los como sinônimo passava despercebido;
 * quando o padrão virou `uppercase`, comparar com o default inverteria o aviso:
 * "sem efeito" apareceria justamente no estado em que a prop funciona.
 *
 * Diz só o que sabe: "sem efeito agora", não "sem efeito".
 */
function inerte(k) {
  if (!k.description) return null
  for (const ct of contextTokens.value) {
    if (!k.description.includes(ct.name)) continue
    const neutro = ct.inertWhen
    if (neutro != null && contextState[ct.name] === neutro) return { label: ct.label, valor: neutro }
  }
  return null
}

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
      description: p.description || '',
      default: p.default,
      options: p.validValues ? (/\bnull\b/.test(p.type) ? [null, ...p.validValues] : p.validValues) : null,
      isArray: isArrayType(p.type),
      // União com escalar (`string | string[]`, `File | File[] | null`): sem vírgula,
      // o valor continua escalar — converter sempre quebraria o uso de valor único.
      scalarOk: /^(?![^=]*=>)/.test(String(p.type || '')) &&
        /\b(string|number|boolean|File)\s*\|/.test(String(p.type || '')),
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
  contextTokens.value = contract.value.visual?.contextTokens || []
  demoSlots.value = contract.value.visual?.defaultPreview?.slots || null
  Object.keys(contextState).forEach((k) => delete contextState[k])
  for (const ct of contextTokens.value) contextState[ct.name] = ct.default

  slotDefs.value = contract.value.api?.slots || []
  Object.keys(activeSlots).forEach((k) => delete activeSlots[k])
  // Slot OBRIGATÓRIO (`required` do contrato, derivado da ausência de `?` na
  // assinatura TS) nasce LIGADO: ele é estrutural, não enfeite. O `default` do
  // DssField é o caso — sem ele o componente renderiza uma moldura vazia, que
  // era a divergência entre o Preview Frame e a página de teste.
  for (const s of slotDefs.value) activeSlots[s.name] = !!s.required
  Object.keys(slotIcons).forEach((k) => delete slotIcons[k])
  // Default sensato p/ o slot de ícone (o input é livre; 'attach_file' é Material Icons
  // válido mesmo não estando nas sugestões extraídas dos exemplos).
  for (const s of slotDefs.value) if (ICON_SLOTS.includes(s.name)) slotIcons[s.name] = 'attach_file'
  // Eventos (log) e métodos expostos (botões) — completam a superfície da API.
  emitDefs.value = contract.value.api?.emits || []
  methodDefs.value = contract.value.api?.exposedRefs || []
  eventLog.value = []
}

/**
 * Props de ARRAY editadas no knob voltam como STRING (o widget é <input type=text>).
 * Sem converter, "Maçã,Banana" chega ao componente como string e quem itera a prop
 * — QSelect, QOptionGroup… — percorre CARACTERES: a lista vira "M","a","ç","ã",",".
 * O default não sofria porque vem do defaultPreview já como array de verdade, o que
 * fazia o defeito aparecer só ao EDITAR (e "voltar" só com reload).
 *
 * Aceita JSON (`["a","b"]`) ou lista separada por vírgula.
 */
function coerceKnobValue(k, v) {
  if (!k?.isArray || typeof v !== 'string') return v
  const s = v.trim()
  if (!s) return undefined
  if (s.startsWith('[')) {
    try { return JSON.parse(s) } catch { /* não era JSON — cai no split */ }
  }
  // União com escalar (ex.: `string | string[]`): um valor só continua escalar.
  if (k.scalarOk && !s.includes(',')) return v
  return s.split(',').map((x) => x.trim()).filter((x) => x !== '')
}

function postState() {
  const el = frameEl.value
  if (!el || !el.contentWindow) return
  const clean = {}
  for (const [kName, raw] of Object.entries(state)) {
    const knob = knobs.value.find((kn) => kn.name === kName)
    const k = kName
    const v = coerceKnobValue(knob, raw)
    if (v === '' || v == null) continue
    if (v === false) {
      // `false` só é omitido quando também é o DEFAULT da prop (toggle default-false
      // no repouso → snippet limpo). Se o default é `true` (ex.: chipsRemovable), o
      // `false` é um override SIGNIFICATIVO e PRECISA ser enviado — senão o toggle
      // nunca sai de true (o componente cai no default).
      const def = knobs.value.find((kn) => kn.name === k)?.default
      if (def === true || def === 'true') clean[k] = v
      continue
    }
    clean[k] = v
  }
  // Serializa para dado PLANO: state pode conter arrays/objetos reativos (Proxy)
  // que o structured-clone do postMessage não consegue clonar (ex.: options do Select).
  // modelProp: o sujeito só liga v-model quando o contrato declara vModel
  // (componentes sem model — ex.: DssUploader — não recebem modelValue órfão).
  const modelProp = contract.value?.api?.vModel?.prop ?? null
  // Default do vModel (do @default no contrato): o sujeito semeia o model com
  // isto em vez de null. Sem isto, um checkbox nasce indeterminate (model=null
  // colide com indeterminateValue:null → mostra dash + confunde checked/indet).
  let modelDefault = (contract.value?.api?.props || []).find((p) => p.name === modelProp)?.default
  if (typeof modelDefault === 'string' && /^(null|undefined)\b/.test(modelDefault)) modelDefault = undefined
  // @default de array/objeto literal chega como string ("[]"/"{}"/"[a,b]") — parseia p/ o
  // valor real, senão um vModel de array (ex.: DssSelect multiple, DssMultiselectAutocomplete)
  // é semeado com a STRING "[]" e o QSelect multiple mostra um chip fantasma.
  else if (typeof modelDefault === 'string' && /^\s*[[{]/.test(modelDefault)) {
    try { modelDefault = JSON.parse(modelDefault) } catch { /* mantém string se não for JSON válido */ }
  }
  const slots = Object.keys(activeSlots).filter((n) => activeSlots[n])
  const activeSlotIcons = {}
  for (const n of slots) if (ICON_SLOTS.includes(n) && slotIcons[n]) activeSlotIcons[n] = slotIcons[n]
  const emits = emitDefs.value.map((ev) => ev.name)
  const payload = JSON.parse(JSON.stringify({ __frame: true, props: clean, theme: temaEfetivo.value, brand: brandEfetivo.value, contextTokens: { ...contextState }, modelProp, modelDefault, slots, slotIcons: activeSlotIcons, emits, demoSlots: demoSlots.value }))
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
    // Mesma coerção enviada ao sujeito: o snippet existe para ser COPIADO, então
    // precisa mostrar a prop de array como binding (`:options="['a','b']"`) e não
    // como atributo string — colar `options="a,b"` reproduziria o bug de iterar
    // caracteres no código do consumidor.
    const v = coerceKnobValue(k, state[k.name])
    // `k.default ?? false`: booleano SEM @default no tipo chega com default
    // `undefined`, e `false === undefined` é falso — sem o coalescing, todo boolean
    // em repouso vazava para o snippet (`:square="false" :dense="false" …` no
    // DssChip sem tocar em knob). Foi a REGRESSÃO que a correção do R-01
    // introduziu: 6 componentes hoje, 35 latentes, contra os 3 do bug original.
    if (v === (k.default ?? false) || v === '' || v == null) continue
    // `false` NÃO pode ser descartado em bloco: quando o default da prop é `true`
    // (announce, chipsRemovable…), o `false` é um override SIGNIFICATIVO e some do
    // snippet — quem COPIA leva um componente diferente do que está na tela. Mesmo
    // raciocínio já aplicado no postState() acima (v === false → só omite se o
    // default também for false); a divergência entre os dois caminhos era o bug.
    // Encontrado na revisão independente do DssEmptyState (R-01), medido byte a
    // byte contra o DOM. O caso `v === k.default` acima já cobre o false-default-false.
    if (v === false) parts.push(`:${k.name}="false"`)
    else if (v === true) parts.push(k.name)
    // Aspas simples DENTRO do binding: `:options="["a"]"` fecharia o atributo no
    // primeiro `"` e o snippet colado não compilaria.
    else if (Array.isArray(v)) parts.push(`:${k.name}="${JSON.stringify(v).replace(/"/g, "'")}"`)
    else if (typeof v === 'string') parts.push(`${k.name}="${v}"`)
    else parts.push(`:${k.name}="${v}"`)
  }
  const attrs = parts.length ? ' ' + parts.join(' ') : ''
  const slots = Object.keys(activeSlots).filter((n) => activeSlots[n])
  if (!slots.length) return `<${props.component}${attrs} />`
  // Slot escopado sai no snippet COM o destructuring — é o que o consumidor
  // precisa copiar (`#default="{ fieldId }"`), e sem isso o exemplo não compila
  // o caso que mais importa.
  const inner = slots.map((n) => {
    const def = slotDefs.value.find((s) => s.name === n)
    const bind = def?.scope ? `="{ ${def.scope} }"` : ''
    return `  <template #${n}${bind}>…</template>`
  }).join('\n')
  return `<${props.component}${attrs}>\n${inner}\n</${props.component}>`
})

watch(() => JSON.stringify({ s: state, t: temaEfetivo.value, b: brandEfetivo.value, ct: contextState, sl: activeSlots, si: slotIcons }), postState)
watch(() => props.component, load)
onMounted(() => { window.addEventListener('message', onMsg); load() })
onUnmounted(() => window.removeEventListener('message', onMsg))
</script>

<style scoped>
/* ══════════════════════════════════════════════════════════════════════════
   UI do Preview Frame — mesmo vocabulário do PlaygroundLayout.

   Antes daqui eram 57 valores crus (hex e px) e controles de formulário com a
   aparência nativa do browser. Agora o painel usa os tokens que o template já
   usa: as famílias surface, text e border, a escala de spacing e a de tipografia.

   ⚠️ REGRA QUE VALE PARA TODO ESTE ARQUIVO: o Preview Frame é CASCA, não
   componente. Nada aqui pode usar token remapeado por [data-brand]
   (--dss-action-*, --dss-brand-*, --dss-surface-brand-*). Um instrumento que
   muda de cor com o seletor de marca mascara o que ele existe para medir — foi
   o defeito corrigido no menu do Playground. Aqui só entram tokens NEUTROS.
   ══════════════════════════════════════════════════════════════════════════ */

.pv {
  display: flex; flex-direction: column;
  height: 100%; min-height: 520px;
  font-family: var(--dss-font-family-sans, system-ui, sans-serif);
  color: var(--dss-text-body);
  background: var(--dss-surface-default);
}

/* ── Barra de contexto ────────────────────────────────────────────────────── */
.pv__bar {
  display: flex; align-items: center; flex-wrap: wrap;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-2_5) var(--dss-spacing-4);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  background: var(--dss-surface-subtle);
}
.pv__bar > strong { font-size: var(--dss-font-size-sm); font-weight: var(--dss-font-weight-semibold); }
.pv__tag { color: var(--dss-text-subtle); font-size: var(--dss-font-size-xs); }
.pv__spacer { flex: 1; }
.pv__ctl {
  display: flex; align-items: center; gap: var(--dss-spacing-1_5);
  font-size: var(--dss-font-size-xs); color: var(--dss-text-subtle);
}

/* ── Controles de formulário ──────────────────────────────────────────────────
   O que mais datava a tela: <select> e <input> com o desenho nativo. Aqui eles
   ganham a mesma caixa dos campos do DS (sem VIRAR DssInput — o painel é casca
   e não deve depender do componente que está inspecionando). */
.pv select,
.pv input[type='text'],
.pv input[type='number'] {
  font-family: inherit;
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-body);
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-sm);
  padding: var(--dss-spacing-1) var(--dss-spacing-2);
  min-height: var(--dss-touch-target-xs);
  transition: border-color var(--dss-duration-200) var(--dss-easing-standard);
}
.pv select:hover,
.pv input[type='text']:hover,
.pv input[type='number']:hover { border-color: var(--dss-border-strong); }
.pv select:focus-visible,
.pv input[type='text']:focus-visible,
.pv input[type='number']:focus-visible {
  /* Anel NEUTRO de propósito: `--dss-focus-primary` seguiria a marca, e casca não
     brandeia. `--dss-focus-ring` (sem sufixo) NÃO existe no catálogo — é fantasma
     conhecido, no baseline, com 1 uso em utils/_example-showcase.scss. */
  outline: var(--dss-focus-ring-width) var(--dss-focus-ring-style) var(--dss-text-primary);
  outline-offset: var(--dss-focus-ring-offset);
  border-color: var(--dss-border-strong);
}
.pv input[type='checkbox'] { width: var(--dss-spacing-4); height: var(--dss-spacing-4); cursor: pointer; accent-color: var(--dss-gray-700); }

/* ── Corpo: palco + painel ────────────────────────────────────────────────── */
.pv__body { display: flex; flex: 1; min-height: 380px; }
/* Palco: hospeda o iframe e o centraliza quando a largura é restrita. O fundo
   demarca a área FORA do sujeito (deixa a largura escolhida evidente). */
.pv__stage {
  flex: 1; display: flex; justify-content: center; min-width: 0;
  border-right: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  background: var(--dss-surface-muted);
}
.pv__frame { flex: 1; min-width: 0; border: 0; background: var(--dss-surface-default); }

.pv__knobs {
  width: 300px; overflow: auto; position: relative;
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  background: var(--dss-surface-subtle);
  /* Mesma transição do aside do PlaygroundLayout — o sandbox já tem esse
     vocabulário de "recolher lateral"; inventar um segundo criaria duas
     gramáticas para a mesma função. */
  transition: width var(--dss-duration-200) var(--dss-easing-standard);
}
.pv__knobs.is-collapsed { width: 34px; padding: var(--dss-spacing-3) var(--dss-spacing-1); overflow: visible; }
.pv__knobs-toggle {
  position: absolute; top: var(--dss-spacing-2); right: var(--dss-spacing-1_5);
  display: grid; place-items: center;
  width: var(--dss-spacing-6); height: var(--dss-spacing-6);
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  border-radius: var(--dss-radius-sm);
  background: var(--dss-surface-default);
  color: var(--dss-text-subtle);
  font-size: var(--dss-font-size-sm);
  cursor: pointer;
}
.pv__knobs-toggle:hover { background: var(--dss-surface-hover); color: var(--dss-text-body); }
.pv__knobs-inner { padding-top: var(--dss-spacing-1); }

/* Grupo "Demais props": cabeçalho clicável com o mesmo peso dos <h4> do painel. */
.pv__group {
  display: block; width: 100%; text-align: left;
  margin: var(--dss-spacing-3) 0 var(--dss-spacing-1_5);
  padding: var(--dss-spacing-1) var(--dss-spacing-1_5);
  border: 0; border-top: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  background: transparent; cursor: pointer;
  font-size: var(--dss-font-size-xs); font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
}
.pv__group:hover { background: var(--dss-surface-hover); }
.pv__group small { font-weight: var(--dss-font-weight-normal); color: var(--dss-text-subtle); }

/* ── Modo embutido ────────────────────────────────────────────────────────── */
.pv__section-h {
  display: flex; align-items: center; gap: var(--dss-spacing-2); width: 100%;
  padding: var(--dss-spacing-2_5) var(--dss-spacing-4);
  border: 0; border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  background: var(--dss-surface-subtle); cursor: pointer; text-align: left;
  font-size: var(--dss-font-size-sm); font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
}
.pv__section-h:hover { background: var(--dss-surface-hover); }
.pv__section-h small { font-weight: var(--dss-font-weight-normal); color: var(--dss-text-subtle); }
.pv__section-caret { width: var(--dss-spacing-3); }
/* Altura LIMITADA, não de viewport: embutido, o palco divide a página com os
   cenários. Altura de viewport obrigaria a rolar o palco inteiro antes de
   chegar neles — e criaria o terceiro nível de scroll (página + palco + painel). */
.pv--embedded {
  height: auto; min-height: 0; overflow: hidden;
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  border-radius: var(--dss-radius-sm);
}
/* `flex: 0 0 auto` é obrigatório aqui, não estilo: o `.pv__body` é item flex com
   `flex: 1 1 0%`, e no eixo principal o flex VENCE a altura declarada. Medido:
   com `height: 420px` sozinho, o computado saía 665px. */
.pv--embedded .pv__body { flex: 0 0 auto; min-height: 0; height: 440px; }
.pv--embedded .pv__snippet { max-height: 120px; }

/* ── Knobs ────────────────────────────────────────────────────────────────── */
.pv__knob {
  display: flex; flex-direction: column; gap: var(--dss-spacing-0_5);
  margin-bottom: var(--dss-spacing-2_5);
  font-size: var(--dss-font-size-xs);
}
.pv__knob > label { font-weight: var(--dss-font-weight-semibold); color: var(--dss-text-body); }
.pv__knob small { color: var(--dss-text-subtle); font-weight: var(--dss-font-weight-normal); }
.pv__hint { margin: 0; font-size: var(--dss-font-size-xs); line-height: var(--dss-line-height-normal); color: var(--dss-text-subtle); }
.pv__hint code, .pv__inert code { font-family: var(--dss-font-family-mono, monospace); }
/* Aviso de knob inerte: cor de FEEDBACK (warning), que não é remapeada por marca. */
.pv__inert {
  margin: var(--dss-spacing-0_5) 0 0;
  padding: var(--dss-spacing-1) var(--dss-spacing-1_5);
  font-size: var(--dss-font-size-xs); line-height: var(--dss-line-height-normal);
  color: var(--dss-feedback-warning-deep, var(--dss-text-body));
  background: var(--dss-feedback-warning-light);
  border-left: var(--dss-border-width-md) solid var(--dss-feedback-warning);
  border-radius: var(--dss-radius-sm);
}

.pv__slots-h {
  margin: var(--dss-spacing-4) 0 var(--dss-spacing-2);
  padding-top: var(--dss-spacing-3);
  border-top: var(--dss-border-width-thin) solid var(--dss-border-subtle);
}
.pv__slot { font-size: var(--dss-font-size-xs); margin-bottom: var(--dss-spacing-1_5); }
.pv__slot label { display: flex; align-items: center; gap: var(--dss-spacing-1_5); cursor: pointer; }
.pv__slot small { color: var(--dss-text-subtle); }
.pv__slot-icon { margin: var(--dss-spacing-1) 0 var(--dss-spacing-0_5) var(--dss-spacing-6); width: calc(100% - var(--dss-spacing-6)); }

.pv__method {
  display: block; width: 100%; text-align: left;
  margin-bottom: var(--dss-spacing-1_5);
  padding: var(--dss-spacing-1_5) var(--dss-spacing-2_5);
  font-family: var(--dss-font-family-mono, monospace); font-size: var(--dss-font-size-xs);
  color: var(--dss-text-body);
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-sm); cursor: pointer;
}
.pv__method:hover { background: var(--dss-surface-hover); border-color: var(--dss-border-strong); }
.pv__empty { color: var(--dss-feedback-error); font-size: var(--dss-font-size-xs); }

/* ── Eventos ──────────────────────────────────────────────────────────────── */
.pv__events {
  display: flex; flex-direction: column; max-height: 140px;
  border-top: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  background: var(--dss-surface-subtle);
}
.pv__events-h {
  display: flex; align-items: center; gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-1_5) var(--dss-spacing-4);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  font-size: var(--dss-font-size-xs); font-weight: var(--dss-font-weight-semibold);
}
.pv__events-h small { color: var(--dss-text-subtle); font-weight: var(--dss-font-weight-normal); }
.pv__events-clear {
  margin-left: auto; padding: var(--dss-spacing-0_5) var(--dss-spacing-2);
  font-size: var(--dss-font-size-xs); color: var(--dss-text-subtle);
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-sm); cursor: pointer;
}
.pv__events-clear:hover { background: var(--dss-surface-hover); color: var(--dss-text-body); }
.pv__events-body { overflow: auto; padding: var(--dss-spacing-1_5) var(--dss-spacing-4); }
.pv__events-empty { margin: var(--dss-spacing-1) 0; font-size: var(--dss-font-size-xs); color: var(--dss-text-subtle); }
.pv__event {
  display: flex; gap: var(--dss-spacing-2); align-items: baseline;
  padding: var(--dss-spacing-0_5) 0;
  font-family: var(--dss-font-family-mono, monospace); font-size: var(--dss-font-size-xs);
}
.pv__event-t { color: var(--dss-text-subtle); flex-shrink: 0; }
.pv__event strong { color: var(--dss-text-primary); flex-shrink: 0; }
.pv__event code { color: var(--dss-text-subtle); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Snippet: superfície escura por ser BLOCO DE CÓDIGO, não por tema. Usa o degrau
   mais escuro da escala neutra, que existe nos dois temas. */
.pv__snippet {
  margin: 0; padding: var(--dss-spacing-3) var(--dss-spacing-4);
  background: var(--dss-gray-900); color: var(--dss-gray-100);
  font-family: var(--dss-font-family-mono, monospace); font-size: var(--dss-font-size-xs);
  border-top: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  overflow: auto;
}

h4 { margin: 0 0 var(--dss-spacing-2_5); font-size: var(--dss-font-size-sm); font-weight: var(--dss-font-weight-semibold); }
h4 small { color: var(--dss-text-subtle); font-weight: var(--dss-font-weight-normal); }
</style>
