<!--
  ╔══════════════════════════════════════════════════════════════════════╗
  ║  SPIKE DE ISOLAMENTO (DESCARTÁVEL)                                     ║
  ║  Compara 3 montagens do MESMO sujeito (Input + Select + Textarea):    ║
  ║   • NAKED  — sem barreira (controle: deve VAZAR)                       ║
  ║   • IFRAME — cross-realm via /?spikeSubject=1 (deve ISOLAR tudo)      ║
  ║   • SHADOW — shadow DOM, mesmo realm (isola campos, VAZA overlay)     ║
  ║  Uma "casca agressiva" é injetada no document.head para tentar vazar. ║
  ║  Remover a pasta spike/ + os hooks marcados SPIKE quando concluído.   ║
  ╚══════════════════════════════════════════════════════════════════════╝
-->
<template>
  <div class="spike-page">
    <header class="spike-head">
      <h1>Spike · Barreira de Isolamento</h1>
      <p class="spike-sub">
        Casca agressiva ativa (Comic Sans + botões vermelhos + <code>.q-menu</code> magenta).
        Abra o <strong>Select</strong> de cada coluna e compare.
      </p>
      <div class="spike-controls">
        <div class="ctrl">
          <span class="ctrl-label">Brand:</span>
          <button v-for="b in BRANDS" :key="b" :class="['pill', { on: s.brand === b }]"
            @click="s.brand = b">{{ b }}</button>
        </div>
        <label class="ctrl">
          <input type="checkbox" v-model="s.dark" />
          <span class="ctrl-label">Dark (deve atravessar a barreira)</span>
        </label>
      </div>
    </header>

    <div class="spike-grid">
      <!-- ── NAKED (controle) ─────────────────────────────────────────── -->
      <section class="col">
        <h2 class="col-title">① NAKED <span class="tag bad">deve vazar</span></h2>
        <p class="col-note">Sem barreira. Vive dentro de <code>.spike-chrome</code>.</p>
        <div class="spike-chrome col-stage">
          <SpikeSubject />
        </div>
      </section>

      <!-- ── IFRAME (cross-realm) ─────────────────────────────────────── -->
      <section class="col">
        <h2 class="col-title">② IFRAME <span class="tag good">deve isolar</span></h2>
        <p class="col-note">Realm próprio via <code>/?spikeSubject=1</code>. Teleport contido.</p>
        <div class="spike-chrome col-stage">
          <iframe ref="iframeEl" class="spike-iframe" src="/?spikeSubject=1"
            @load="syncIframe" title="spike-iframe-subject"></iframe>
        </div>
      </section>

      <!-- ── SHADOW DOM (mesmo realm) ─────────────────────────────────── -->
      <section class="col">
        <h2 class="col-title">③ SHADOW <span class="tag warn">campo ok / overlay vaza</span></h2>
        <p class="col-note">Shadow root no mesmo realm. QMenu teleporta p/ light DOM.</p>
        <div class="spike-chrome col-stage">
          <div ref="shadowHost"></div>
        </div>
      </section>
    </div>

    <!-- ── Painel de observação (as 5 medições) ───────────────────────── -->
    <footer class="spike-obs">
      <h3>O que observar (5 medições)</h3>
      <ol>
        <li><strong>Chrome→sujeito:</strong> campos em Comic Sans / botão vermelho? NAKED sim · IFRAME não · SHADOW não.</li>
        <li><strong>Sujeito→chrome:</strong> algum sujeito desloca o layout da coluna? (não deve).</li>
        <li><strong>Tema atravessa?</strong> brand/dark mudam os 3? SHADOW direto (mesmo módulo) · IFRAME via postMessage · NAKED direto.</li>
        <li><strong>Overlay (decisivo):</strong> abra o Select. Dropdown com <em>outline magenta + fonte gigante</em> = vazou. IFRAME limpo · SHADOW vazado (escapou p/ light DOM) · NAKED vazado.</li>
        <li><strong>Ergonomia:</strong> custo de CSS/tema para dentro (IFRAME: links no doc + postMessage · SHADOW: link no root, estado direto · escape de overlay).</li>
      </ol>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { createApp } from 'vue'
import SpikeSubject from './SpikeSubject.vue'
import { spikeState } from './spikeState.js'
import { installQuasar } from './installQuasar.js'

const s = spikeState
const BRANDS = ['hub', 'water', 'waste']

const iframeEl = ref(null)
const shadowHost = ref(null)
let shadowApp = null
let chromeStyleEl = null

// ── Casca agressiva: injetada no document.head, removida no unmount ──────────
const CHROME_CSS = `
/* alvos GLOBAIS (atingem qualquer coisa no documento principal — inclusive
   overlays que escapam do shadow para o light DOM) */
.q-menu { outline: 4px dashed magenta !important; }
.q-menu .q-item { font-size: 26px !important; letter-spacing: 2px !important; }
/* alvos de chrome sobre o que estiver dentro de .spike-chrome (NAKED) */
.spike-chrome * { font-family: 'Comic Sans MS', cursive !important; }
.spike-chrome button { background: #c00 !important; color: #fff !important; }
`

function syncIframe() {
  // empurra brand/dark para o realm do iframe (custo de comunicação)
  iframeEl.value?.contentWindow?.postMessage(
    { __spike: true, brand: s.brand, dark: s.dark }, '*',
  )
}

watch(() => [s.brand, s.dark], syncIframe)

onMounted(async () => {
  // 1) injeta casca agressiva
  chromeStyleEl = document.createElement('style')
  chromeStyleEl.setAttribute('data-spike-chrome', '')
  chromeStyleEl.textContent = CHROME_CSS
  document.head.appendChild(chromeStyleEl)

  // 2) monta o braço SHADOW (mesmo realm)
  await nextTick()
  if (shadowHost.value) {
    const root = shadowHost.value.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons">
      <link rel="stylesheet" href="/quasar-layered.css">
      <link rel="stylesheet" href="/dss-full.css">
      <div id="shadow-mount"></div>`
    shadowApp = createApp(SpikeSubject)
    installQuasar(shadowApp)
    shadowApp.mount(root.getElementById('shadow-mount'))
  }
})

onUnmounted(() => {
  chromeStyleEl?.remove()
  shadowApp?.unmount()
})
</script>

<style scoped>
.spike-page { padding: 20px; font-family: system-ui, sans-serif; color: #222; }
.spike-head h1 { margin: 0 0 4px; font-size: 22px; }
.spike-sub { margin: 0 0 12px; color: #555; font-size: 14px; }
.spike-controls { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; margin-bottom: 16px; }
.ctrl { display: flex; gap: 8px; align-items: center; }
.ctrl-label { font-size: 13px; color: #444; }
.pill { border: 1px solid #ccc; background: #fff; border-radius: 999px; padding: 4px 12px; cursor: pointer; font-size: 13px; }
.pill.on { background: #222; color: #fff; border-color: #222; }

.spike-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.col { border: 1px solid #e3e3e3; border-radius: 10px; padding: 12px; background: #fafafa; min-width: 0; }
.col-title { font-size: 15px; margin: 0 0 2px; display: flex; gap: 8px; align-items: center; }
.col-note { font-size: 12px; color: #666; margin: 0 0 10px; }
.col-stage { background: #fff; border: 1px dashed #ddd; border-radius: 8px; min-height: 320px; }
.spike-iframe { width: 100%; height: 360px; border: 0; display: block; }

.tag { font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
.tag.bad { background: #fde2e2; color: #b00; }
.tag.good { background: #e2f7e6; color: #0a7a2a; }
.tag.warn { background: #fff3da; color: #9a6a00; }

.spike-obs { margin-top: 20px; padding: 14px 16px; background: #f3f6ff; border: 1px solid #d9e2ff; border-radius: 10px; }
.spike-obs h3 { margin: 0 0 8px; font-size: 14px; }
.spike-obs ol { margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.6; color: #333; }
.spike-obs code { background: #fff; padding: 1px 4px; border-radius: 3px; }
</style>
