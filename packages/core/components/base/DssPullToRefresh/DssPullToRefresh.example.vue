<script setup lang="ts">
import { ref } from 'vue'
import DssPullToRefresh from './DssPullToRefresh.vue'

// Cenário 1 e 2 — lista de dados reativa
const items = ref([
  { id: 1, label: 'Leitura inicial #1' },
  { id: 2, label: 'Leitura inicial #2' },
  { id: 3, label: 'Leitura inicial #3' },
])
let nextId = 4

function onRefresh(done: () => void) {
  // Simula chamada de API assíncrona (2 s)
  setTimeout(() => {
    items.value.unshift({ id: nextId++, label: `Item atualizado #${nextId - 1}` })
    done()
  }, 2000)
}

// Cenário 3 — brand water com ícone personalizado
const waterItems = ref([
  { id: 1, label: 'Medição #1' },
  { id: 2, label: 'Medição #2' },
])
let waterNextId = 3

function onRefreshWater(done: () => void) {
  setTimeout(() => {
    waterItems.value.unshift({ id: waterNextId++, label: `Medição #${waterNextId - 1}` })
    done()
  }, 1500)
}

// Cenário 4 — disabled
function onRefreshDisabled(_done: () => void) {
  // Nunca chamado quando disabled=true
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-gap-6); padding: var(--dss-padding-4);">

    <!-- Cenário 1: Padrão (Hub, tamanho md) -->
    <section>
      <h3 style="margin-bottom: var(--dss-padding-2); font-size: var(--dss-font-size-md);">
        1. Padrão — Hub, tamanho md
      </h3>
      <p style="color: var(--dss-text-subtle); margin-bottom: var(--dss-padding-2); font-size: var(--dss-font-size-sm);">
        Puxe para baixo para atualizar
      </p>
      <div
        data-brand="hub"
        style="height: 55vh; overflow-y: auto; border: var(--dss-border-width-thin) solid var(--dss-gray-200); border-radius: var(--dss-radius-md);"
      >
        <DssPullToRefresh @refresh="onRefresh">
          <div
            v-for="item in items"
            :key="item.id"
            style="padding: var(--dss-padding-4); border-bottom: var(--dss-border-width-thin) solid var(--dss-gray-100); color: var(--dss-text-body);"
          >
            {{ item.label }}
          </div>
        </DssPullToRefresh>
      </div>
    </section>

    <!-- Cenário 2: Tamanho sm -->
    <section>
      <h3 style="margin-bottom: var(--dss-padding-2); font-size: var(--dss-font-size-md);">
        2. Tamanho sm — indicador compacto
      </h3>
      <div
        data-brand="hub"
        style="height: 45vh; overflow-y: auto; border: var(--dss-border-width-thin) solid var(--dss-gray-200); border-radius: var(--dss-radius-md);"
      >
        <DssPullToRefresh size="sm" @refresh="onRefresh">
          <div
            v-for="item in items"
            :key="item.id"
            style="padding: var(--dss-padding-3); border-bottom: var(--dss-border-width-thin) solid var(--dss-gray-100); color: var(--dss-text-body); font-size: var(--dss-font-size-sm);"
          >
            {{ item.label }}
          </div>
        </DssPullToRefresh>
      </div>
    </section>

    <!-- Cenário 3: Brand Water com ícone personalizado -->
    <section>
      <h3 style="margin-bottom: var(--dss-padding-2); font-size: var(--dss-font-size-md);">
        3. Brand Water — ícone sync
      </h3>
      <div
        data-brand="water"
        style="height: 45vh; overflow-y: auto; border: var(--dss-border-width-thin) solid var(--dss-water-200); border-radius: var(--dss-radius-md);"
      >
        <DssPullToRefresh icon="sync" size="lg" @refresh="onRefreshWater">
          <div
            v-for="item in waterItems"
            :key="item.id"
            style="padding: var(--dss-padding-4); border-bottom: var(--dss-border-width-thin) solid var(--dss-water-100); color: var(--dss-text-body);"
          >
            {{ item.label }}
          </div>
        </DssPullToRefresh>
      </div>
    </section>

    <!-- Cenário 4: Disabled -->
    <section>
      <h3 style="margin-bottom: var(--dss-padding-2); font-size: var(--dss-font-size-md);">
        4. Disabled — gesto desabilitado
      </h3>
      <div
        data-brand="hub"
        style="height: 35vh; overflow-y: auto; border: var(--dss-border-width-thin) solid var(--dss-gray-200); border-radius: var(--dss-radius-md);"
      >
        <DssPullToRefresh :disabled="true" @refresh="onRefreshDisabled">
          <div style="padding: var(--dss-padding-4); color: var(--dss-text-subtle);">
            Pull-to-refresh desabilitado neste contexto.
          </div>
        </DssPullToRefresh>
      </div>
    </section>

    <!-- Cenário 5: Brand Waste, no-mouse (apenas touch) -->
    <section>
      <h3 style="margin-bottom: var(--dss-padding-2); font-size: var(--dss-font-size-md);">
        5. Brand Waste — somente touch (no-mouse)
      </h3>
      <div
        data-brand="waste"
        style="height: 40vh; overflow-y: auto; border: var(--dss-border-width-thin) solid var(--dss-waste-200); border-radius: var(--dss-radius-md);"
      >
        <DssPullToRefresh :no-mouse="true" @refresh="onRefreshWater">
          <div
            v-for="item in waterItems"
            :key="item.id"
            style="padding: var(--dss-padding-4); border-bottom: var(--dss-border-width-thin) solid var(--dss-waste-100); color: var(--dss-text-body);"
          >
            {{ item.label }}
          </div>
        </DssPullToRefresh>
      </div>
    </section>

  </div>
</template>
