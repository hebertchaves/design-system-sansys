<script setup lang="ts">
import { ref } from 'vue'
import { DssAjaxBar } from './index.js'

const ajaxBarTop = ref<InstanceType<typeof DssAjaxBar> | null>(null)
const ajaxBarBottom = ref<InstanceType<typeof DssAjaxBar> | null>(null)
const ajaxBarWater = ref<InstanceType<typeof DssAjaxBar> | null>(null)
const ajaxBarWaste = ref<InstanceType<typeof DssAjaxBar> | null>(null)

const statusTop = ref('Aguardando...')
const statusBottom = ref('Aguardando...')

function simulateRequest(barRef: typeof ajaxBarTop, statusRef: typeof statusTop) {
  barRef.value?.start()
  statusRef.value = 'Carregando...'
  setTimeout(() => {
    barRef.value?.stop()
    statusRef.value = 'Concluído!'
    setTimeout(() => { statusRef.value = 'Aguardando...' }, 1500)
  }, 2500)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-8); padding: var(--dss-spacing-6);">

    <!-- Cenário 1: Hub (padrão), posição topo — controle manual com skipHijack -->
    <section>
      <h3>Cenário 1 — Hub (topo), controle manual</h3>
      <p style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); margin-bottom: var(--dss-spacing-3);">
        Status: {{ statusTop }}
      </p>
      <DssAjaxBar ref="ajaxBarTop" position="top" brand="hub" :skip-hijack="true" />
      <button
        style="padding: var(--dss-spacing-2) var(--dss-spacing-4); border: 1px solid var(--dss-gray-200); border-radius: var(--dss-radius-md); cursor: pointer;"
        @click="simulateRequest(ajaxBarTop, statusTop)"
      >
        Simular Requisição (2.5s)
      </button>
    </section>

    <!-- Cenário 2: Water, posição inferior -->
    <section>
      <h3>Cenário 2 — Water (inferior), controle manual</h3>
      <p style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); margin-bottom: var(--dss-spacing-3);">
        Status: {{ statusBottom }}
      </p>
      <DssAjaxBar ref="ajaxBarBottom" position="bottom" brand="water" :skip-hijack="true" />
      <button
        style="padding: var(--dss-spacing-2) var(--dss-spacing-4); border: 1px solid var(--dss-gray-200); border-radius: var(--dss-radius-md); cursor: pointer;"
        @click="simulateRequest(ajaxBarBottom, statusBottom)"
      >
        Simular Requisição (2.5s)
      </button>
    </section>

    <!-- Cenário 3: Waste, topo, reverse -->
    <section>
      <h3>Cenário 3 — Waste (topo), animação reverse</h3>
      <DssAjaxBar ref="ajaxBarWaste" position="top" brand="waste" :reverse="true" :skip-hijack="true" />
      <button
        style="padding: var(--dss-spacing-2) var(--dss-spacing-4); border: 1px solid var(--dss-gray-200); border-radius: var(--dss-radius-md); cursor: pointer;"
        @click="() => { ajaxBarWaste?.start(); setTimeout(() => ajaxBarWaste?.stop(), 2000) }"
      >
        Simular com reverse (2s)
      </button>
    </section>

    <!-- Cenário 4: Brand via contexto ancestral [data-brand] -->
    <section data-brand="water">
      <h3>Cenário 4 — Brand via [data-brand="water"] ancestral</h3>
      <p style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); margin-bottom: var(--dss-spacing-3);">
        Sem prop brand — herda cor water do ancestral
      </p>
      <DssAjaxBar ref="ajaxBarWater" position="top" :skip-hijack="true" />
      <button
        style="padding: var(--dss-spacing-2) var(--dss-spacing-4); border: 1px solid var(--dss-gray-200); border-radius: var(--dss-radius-md); cursor: pointer;"
        @click="() => { ajaxBarWater?.start(); setTimeout(() => ajaxBarWater?.stop(), 1500) }"
      >
        Simular (1.5s)
      </button>
    </section>

    <!-- Cenário 5: Hijack automático (sem skipHijack) -->
    <section>
      <h3>Cenário 5 — Hijack automático de XHR/Fetch</h3>
      <p style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle);">
        DssAjaxBar sem <code>:skip-hijack="true"</code> intercepta automaticamente todas as requisições XHR e Fetch.
        A barra aparece quando qualquer requisição é iniciada e desaparece quando todas completam.
      </p>
      <DssAjaxBar position="top" brand="hub" />
    </section>

    <!-- Cenário 6: API imperativa — increment e setProgress -->
    <section>
      <h3>Cenário 6 — API imperativa (increment / setProgress)</h3>
      <DssAjaxBar ref="ajaxBarTop" position="top" brand="hub" :skip-hijack="true" />
      <div style="display: flex; gap: var(--dss-spacing-3); flex-wrap: wrap;">
        <button
          style="padding: var(--dss-spacing-2) var(--dss-spacing-3); border: 1px solid var(--dss-gray-200); border-radius: var(--dss-radius-sm); cursor: pointer;"
          @click="() => ajaxBarTop?.start()"
        >start()</button>
        <button
          style="padding: var(--dss-spacing-2) var(--dss-spacing-3); border: 1px solid var(--dss-gray-200); border-radius: var(--dss-radius-sm); cursor: pointer;"
          @click="() => ajaxBarTop?.increment(10)"
        >increment(10)</button>
        <button
          style="padding: var(--dss-spacing-2) var(--dss-spacing-3); border: 1px solid var(--dss-gray-200); border-radius: var(--dss-radius-sm); cursor: pointer;"
          @click="() => ajaxBarTop?.setProgress(75)"
        >setProgress(75)</button>
        <button
          style="padding: var(--dss-spacing-2) var(--dss-spacing-3); border: 1px solid var(--dss-gray-200); border-radius: var(--dss-radius-sm); cursor: pointer;"
          @click="() => ajaxBarTop?.stop()"
        >stop()</button>
      </div>
    </section>

  </div>
</template>
