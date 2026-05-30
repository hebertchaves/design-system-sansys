<script setup lang="ts">
import { ref } from 'vue'

const sizeH = ref(50)
const sizeV = ref(40)
const sizeFixed = ref(200)
const sizeLimited = ref(50)
const sizeBrand = ref(50)
</script>

<template>
  <div class="q-pa-lg column q-gutter-lg">

    <!-- Cenário 1: Horizontal (padrão) -->
    <section>
      <h3 class="q-mb-sm text-subtitle1">1. Horizontal (padrão) — painéis lado a lado</h3>
      <p class="q-mb-sm text-body2">v-model: {{ sizeH }}%</p>
      <DssSplitter v-model="sizeH" class="splitter-demo-sm">
        <template #before>
          <div class="q-pa-md bg-grey-2 full-height">
            Painel Esquerdo
          </div>
        </template>
        <template #after>
          <div class="q-pa-md bg-grey-1 full-height">
            Painel Direito
          </div>
        </template>
      </DssSplitter>
    </section>

    <!-- Cenário 2: Vertical — painéis empilhados -->
    <section>
      <h3 class="q-mb-sm text-subtitle1">2. Vertical — painéis empilhados</h3>
      <p class="q-mb-sm text-body2">v-model: {{ sizeV }}%</p>
      <DssSplitter v-model="sizeV" orientation="vertical" class="splitter-demo-lg">
        <template #before>
          <div class="q-pa-md bg-blue-1 full-height">
            Painel Superior
          </div>
        </template>
        <template #after>
          <div class="q-pa-md bg-green-1 full-height">
            Painel Inferior
          </div>
        </template>
      </DssSplitter>
    </section>

    <!-- Cenário 3: Com limites -->
    <section>
      <h3 class="q-mb-sm text-subtitle1">3. Com limites [20, 80]</h3>
      <p class="q-mb-sm text-body2">v-model: {{ sizeLimited }}% (restrito a 20–80%)</p>
      <DssSplitter v-model="sizeLimited" :limits="[20, 80]" class="splitter-demo-sm">
        <template #before>
          <div class="q-pa-md bg-yellow-1 full-height">
            Mínimo 20%
          </div>
        </template>
        <template #after>
          <div class="q-pa-md bg-green-1 full-height">
            Mínimo 20%
          </div>
        </template>
      </DssSplitter>
    </section>

    <!-- Cenário 4: Tamanho fixo em pixels (sidebar) -->
    <section>
      <h3 class="q-mb-sm text-subtitle1">4. unit="px" — sidebar de tamanho fixo</h3>
      <p class="q-mb-sm text-body2">v-model: {{ sizeFixed }}px</p>
      <DssSplitter
        v-model="sizeFixed"
        unit="px"
        :limits="[120, 400]"
        class="splitter-demo-sm"
      >
        <template #before>
          <nav class="q-pa-md bg-blue-2 full-height">
            Sidebar ({{ sizeFixed }}px)
          </nav>
        </template>
        <template #after>
          <main class="q-pa-md full-height">
            Conteúdo Principal
          </main>
        </template>
      </DssSplitter>
    </section>

    <!-- Cenário 5: Desabilitado -->
    <section>
      <h3 class="q-mb-sm text-subtitle1">5. Disabled</h3>
      <DssSplitter v-model="sizeH" disabled class="splitter-demo-sm">
        <template #before>
          <div class="q-pa-md bg-grey-2 full-height">
            Separador fixo (disabled)
          </div>
        </template>
        <template #after>
          <div class="q-pa-md bg-grey-1 full-height">
            Não redimensionável
          </div>
        </template>
      </DssSplitter>
    </section>

    <!-- Cenário 6: Brand Hub -->
    <section data-brand="hub">
      <h3 class="q-mb-sm text-subtitle1">6. Brand Hub — separador com cor da marca em hover</h3>
      <DssSplitter v-model="sizeBrand" class="splitter-demo-sm">
        <template #before>
          <div class="q-pa-md bg-orange-1 full-height">
            Painel Hub A
          </div>
        </template>
        <template #after>
          <div class="q-pa-md bg-orange-2 full-height">
            Painel Hub B
          </div>
        </template>
      </DssSplitter>
    </section>

  </div>
</template>

<style>
/*
 * Example-only layout constraints.
 * Usam unidades viewport (vh) para evitar px hardcoded.
 * Cores de borda via token DSS (--dss-gray-200).
 */
.splitter-demo-sm {
  height: 30vh;
  border: 1px solid var(--dss-gray-200);
}

.splitter-demo-lg {
  height: 40vh;
  border: 1px solid var(--dss-gray-200);
}
</style>
