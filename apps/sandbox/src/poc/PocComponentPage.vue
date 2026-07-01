<!--
  POC (descartável) — TEMPLATE GENÉRICO da página de componente, consumindo o
  modelo DERIVADO (derive.js). Renderiza as 11 seções do contrato v2.4 e, onde
  o artefato não tem o dado, mostra um BANNER DE GAP (em vez de esconder).
  Preview = iframe sobre o componente real (playground knob-driven + exemplos).
-->
<template>
  <div class="poc">
    <!-- Cabeçalho POC + resumo de gaps -->
    <div class="poc-head">
      <div>
        <h1>POC · Página derivada — <code>{{ model.component }}</code></h1>
        <p class="poc-sub">Cada seção deriva de um artefato canônico (contrato v2.4). Buracos aparecem em vermelho.</p>
      </div>
      <div class="poc-score" :class="{ bad: gapCount > 0 }">
        <span class="n">{{ gapCount }}</span><span class="l">GAPS / RUÍDOS</span>
      </div>
    </div>

    <div v-if="diagnostics" class="poc-diag">
      ⚠️ <strong>Diagnóstico:</strong> README declara <code>{{ diagnostics.readmeClaimsExamples }}</code> exemplos;
      <code>example.vue</code> real tem <strong>3</strong>. README com {{ diagnostics.sectionCount }} seções H2/H3.
    </div>

    <!-- 1. Badges -->
    <section class="poc-sec">
      <h2>1 · Badges / Selos <em>← meta</em></h2>
      <div class="poc-badges">
        <span class="bdg">v{{ model.badges.data.version }}</span>
        <span class="bdg ok">{{ model.badges.data.status }}</span>
        <span class="bdg">{{ model.badges.data.category }}</span>
        <span class="bdg">golden: {{ model.badges.data.golden }}</span>
        <span class="bdg" :class="model.badges.data.sealFound ? 'ok' : 'bad'">selo {{ model.badges.data.sealFound ? '✓' : '✗' }}</span>
      </div>
      <GapNote :node="model.badges" />
    </section>

    <!-- 2. Descrição -->
    <section class="poc-sec">
      <h2>2 · Descrição <em>← README/meta</em></h2>
      <p class="poc-desc">{{ model.description.data }}</p>
      <GapNote :node="model.description" />
    </section>

    <!-- 3. Quando usar / não -->
    <section class="poc-sec">
      <h2>3 · Quando usar / NÃO usar <em>← README</em></h2>
      <div class="poc-2col">
        <div><h3>✅ Quando usar</h3><Derived :node="model.whenUse" /></div>
        <div><h3>❌ Quando NÃO usar</h3><Derived :node="model.whenNotUse" /></div>
      </div>
    </section>

    <!-- 4. Playground -->
    <section class="poc-sec">
      <h2>4 · Playground <em>← controles: API · preview: iframe(example.vue)</em></h2>
      <div class="poc-pg">
        <div class="poc-knobs">
          <h3>Controles ({{ model.playground.controls.length }} derivados)</h3>
          <div v-for="c in model.playground.controls" :key="c.name" class="knob">
            <label>{{ c.name }} <small>{{ c.type }}</small></label>
            <input v-if="c.control === 'boolean'" type="checkbox" v-model="knobs[c.name]" />
            <select v-else-if="c.control === 'enum'" v-model="knobs[c.name]">
              <option :value="undefined">—</option>
              <option v-for="o in c.options" :key="o" :value="o">{{ o }}</option>
            </select>
            <input v-else type="text" v-model="knobs[c.name]" :placeholder="c.def" />
          </div>
        </div>
        <div class="poc-preview">
          <h3>Preview <small>iframe · componente real</small></h3>
          <iframe ref="pgFrame" class="poc-frame" src="/?poc=playground" @load="pushKnobs" title="poc-playground"></iframe>
          <pre class="poc-code">{{ codeSnippet }}</pre>
        </div>
      </div>
      <h3 style="margin-top:16px">Casos de uso reais <small>iframe · example.vue</small></h3>
      <iframe class="poc-frame tall" src="/?poc=examples" title="poc-examples"></iframe>
    </section>

    <!-- 5. Estados -->
    <section class="poc-sec">
      <h2>5 · Estados interativos <em>← meta.visualProperties</em></h2>
      <table class="poc-table">
        <thead><tr><th>Estado</th><th>Propriedades (token → valor)</th></tr></thead>
        <tbody>
          <tr v-for="(props, st) in model.states.data" :key="st">
            <td><strong>{{ st }}</strong></td>
            <td>
              <span v-for="p in props" :key="p.property" class="tok">{{ p.property }}: <code>{{ p.token || p.value }}</code></span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 6. Anatomia -->
    <section class="poc-sec">
      <h2>6 · Anatomia 4 camadas <em>← README + SCSS</em></h2>
      <Derived :node="model.anatomy" collapsed />
    </section>

    <!-- 7.1 Props -->
    <section class="poc-sec">
      <h2>7.1 · Props & Eventos <em>← API.md ({{ model.props.count }} props)</em></h2>
      <table v-for="(t, i) in model.props.tables" :key="i" class="poc-table">
        <thead><tr><th v-for="h in t.headers" :key="h">{{ h }}</th></tr></thead>
        <tbody><tr v-for="(r, ri) in t.rows" :key="ri"><td v-for="(c, ci) in r" :key="ci" v-html="inline(c)" /></tr></tbody>
      </table>
      <h3>Eventos</h3>
      <Table :node="model.events" />
    </section>

    <!-- 7.2 Slots -->
    <section class="poc-sec">
      <h2>7.2 · Slots <em>← README/API</em></h2>
      <Table :node="model.slots" />
    </section>

    <!-- 7.3 Tokens -->
    <section class="poc-sec">
      <h2>7.3 · Tokens <em>← meta.visualProperties</em></h2>
      <table class="poc-table">
        <thead><tr><th>Propriedade</th><th>Token</th><th>Valor</th><th>Origem</th></tr></thead>
        <tbody>
          <tr v-for="(p, i) in model.tokens.data" :key="i">
            <td>{{ p.property }}</td><td><code>{{ p.token || '—' }}</code></td><td>{{ p.value || '—' }}</td><td><small>{{ p.source }}</small></td>
          </tr>
        </tbody>
      </table>
      <GapNote :node="model.tokens" />
    </section>

    <!-- 7.4 A11y -->
    <section class="poc-sec">
      <h2>7.4 · Acessibilidade <em>← README</em></h2>
      <Derived :node="model.a11y" collapsed />
    </section>

    <!-- 8. Anti-patterns -->
    <section class="poc-sec">
      <h2>8 · Anti-patterns <em>← README</em></h2>
      <Derived :node="model.antiPatterns" />
    </section>

    <!-- 9. Vinculantes -->
    <section class="poc-sec">
      <h2>9 · Vinculantes DSS v2.2 <em>← meta</em></h2>
      <ul class="poc-ul">
        <li>Classificação: <code>{{ model.vinculantes.data.category }}</code></li>
        <li>Pseudo-elementos: <code>{{ model.vinculantes.data.pseudo ?? 'ausente no meta' }}</code></li>
        <li>brightness(): <code>{{ model.vinculantes.data.brightness ?? 'ausente no meta' }}</code></li>
      </ul>
      <GapNote :node="model.vinculantes" />
    </section>

    <!-- 10. Referências -->
    <section class="poc-sec">
      <h2>10 · Referências <em>← estático</em></h2>
      <ul class="poc-ul"><li v-for="r in model.references.data" :key="r"><code>{{ r }}</code></li></ul>
    </section>
  </div>
</template>

<script setup>
import { reactive, computed, ref, watch, h } from 'vue'
import { renderInline } from './mdUtil.js'

const props = defineProps({ model: { type: Object, required: true }, diagnostics: { type: Object, default: null } })
const model = props.model
const diagnostics = props.diagnostics

const inline = (s) => renderInline(s || '')

// componentes auxiliares de render (functional)
const GapNote = (p) => p.node.gap
  ? h('div', { class: ['poc-amber', { 'poc-red': !p.node.present }] }, [h('strong', p.node.present ? '⚠ ruído: ' : '✗ gap: '), p.node.gap])
  : null
const Derived = (p) => p.node.present
  ? [h('div', { class: ['poc-md', { collapsed: p.collapsed }], innerHTML: p.node.data }), GapNote(p)]
  : h('div', { class: 'poc-red' }, [h('strong', '✗ gap: '), p.node.gap])
const Table = (p) => {
  if (!p.node.present || !p.node.data) return h('div', { class: 'poc-red' }, [h('strong', '✗ gap: '), p.node.gap])
  const t = p.node.data
  return h('table', { class: 'poc-table' }, [
    h('thead', [h('tr', t.headers.map((x) => h('th', x)))]),
    h('tbody', t.rows.map((r) => h('tr', r.map((c) => h('td', { innerHTML: renderInline(c) }))))),
  ])
}

const gapCount = computed(() =>
  Object.values(model).filter((n) => n && typeof n === 'object' && (n.present === false || n.gap)).length)

// ── Playground knobs → iframe ────────────────────────────────────────────────
const knobs = reactive({ ...model.playground.defaultProps })
const pgFrame = ref(null)
function pushKnobs() {
  const clean = Object.fromEntries(Object.entries(knobs).filter(([, v]) => v !== '' && v !== undefined))
  pgFrame.value?.contentWindow?.postMessage({ __poc: true, props: clean }, '*')
}
watch(knobs, pushKnobs, { deep: true })

const codeSnippet = computed(() => {
  const lines = Object.entries(knobs)
    .filter(([, v]) => v !== '' && v !== undefined && v !== false)
    .map(([k, v]) => (v === true ? `  ${k}` : `  ${k}="${v}"`))
  return `<DssInput\n${lines.join('\n')}\n/>`
})
</script>

<style scoped>
.poc { padding: 20px; font-family: system-ui, sans-serif; color: #1f2430; max-width: 1100px; }
.poc-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.poc-head h1 { font-size: 20px; margin: 0 0 4px; }
.poc-sub { margin: 0; color: #667; font-size: 13px; }
.poc-score { text-align: center; border: 2px solid #cbd5e1; border-radius: 10px; padding: 8px 14px; }
.poc-score.bad { border-color: #e11; background: #fff1f1; }
.poc-score .n { display: block; font-size: 28px; font-weight: 800; color: #e11; }
.poc-score .l { font-size: 9px; letter-spacing: 1px; color: #889; }
.poc-diag { margin: 12px 0; padding: 8px 12px; background: #fff7e6; border: 1px solid #ffd591; border-radius: 8px; font-size: 13px; }
.poc-sec { margin: 22px 0; padding-top: 14px; border-top: 1px solid #eef; }
.poc-sec h2 { font-size: 15px; margin: 0 0 10px; }
.poc-sec h2 em { font-weight: 400; color: #98a; font-size: 12px; font-style: normal; }
.poc-sec h3 { font-size: 13px; margin: 12px 0 6px; color: #445; }
.poc-sec h3 small { color: #9aa; font-weight: 400; }
.poc-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.poc-badges { display: flex; gap: 8px; flex-wrap: wrap; }
.bdg { font-size: 11px; padding: 3px 8px; border-radius: 5px; background: #eef2ff; color: #3a4; border: 1px solid #dde; color: #445; }
.bdg.ok { background: #e7f8ec; color: #0a7a2a; border-color: #b6e6c4; }
.bdg.bad { background: #fdeaea; color: #b00; border-color: #f3c2c2; }
.poc-desc { font-size: 14px; line-height: 1.5; background: #f8f9fc; padding: 10px 12px; border-radius: 8px; }
.poc-pg { display: grid; grid-template-columns: 280px 1fr; gap: 16px; }
.poc-knobs { background: #f8f9fc; border-radius: 8px; padding: 12px; }
.knob { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin: 6px 0; font-size: 12px; }
.knob label { color: #445; } .knob small { color: #aab; }
.knob input[type=text], .knob select { width: 130px; font-size: 12px; padding: 2px 4px; }
.poc-frame { width: 100%; height: 220px; border: 1px dashed #cbd5e1; border-radius: 8px; background: #fff; }
.poc-frame.tall { height: 420px; }
.tok { display: inline-block; margin: 0 8px 4px 0; font-size: 11px; color: #556; }
</style>

<style>
/* não-scoped: estiliza o HTML injetado por v-html / innerHTML */
.poc-md { font-size: 13px; line-height: 1.55; }
.poc-md.collapsed { max-height: 220px; overflow: auto; border: 1px solid #eef; border-radius: 8px; padding: 8px 12px; }
.poc-table { border-collapse: collapse; width: 100%; font-size: 12px; margin: 6px 0; }
.poc-table th, .poc-table td { border: 1px solid #e5e7eb; padding: 4px 8px; text-align: left; vertical-align: top; }
.poc-table th { background: #f6f7fb; }
.poc-ul { margin: 6px 0; padding-left: 20px; font-size: 13px; }
.poc-code { background: #1f2430; color: #d6e0ff; padding: 10px 12px; border-radius: 8px; font-size: 12px; overflow: auto; margin: 8px 0 0; }
.poc-amber { margin: 8px 0; padding: 6px 10px; background: #fff7e6; border-left: 3px solid #f0a; border-color: #ffb84d; border-radius: 4px; font-size: 12px; color: #7a5a00; }
.poc-red { margin: 8px 0; padding: 6px 10px; background: #fdeaea; border-left: 3px solid #e11; border-radius: 4px; font-size: 12px; color: #a00; }
</style>
