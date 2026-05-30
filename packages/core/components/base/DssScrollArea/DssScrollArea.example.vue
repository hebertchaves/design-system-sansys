<script setup lang="ts">
import { ref } from 'vue'

const scrollAreaRef = ref(null)

const longText = Array.from({ length: 30 }, (_, i) =>
  `Item ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
).join('\n')

const wideContent = Array.from({ length: 8 }, (_, i) => `Coluna ${i + 1}`)

function scrollToTop() {
  scrollAreaRef.value?.scrollTo(0, 300)
}

function scrollToBottom() {
  scrollAreaRef.value?.scrollTo(9999, 300)
}
</script>

<template>
  <div class="q-pa-lg column q-gutter-xl">

    <!-- Cenário 1: Scroll vertical com altura fixa -->
    <section>
      <h3 class="q-mb-xs text-subtitle1">1. Scroll Vertical (auto-hide)</h3>
      <DssScrollArea
        ref="scrollAreaRef"
        class="scroll-demo-md"
        label="Lista de itens"
      >
        <div class="q-pa-md" style="white-space: pre-line;">{{ longText }}</div>
      </DssScrollArea>
      <div class="row q-gutter-sm q-mt-xs">
        <button @click="scrollToTop">Rolar ao topo</button>
        <button @click="scrollToBottom">Rolar ao fim</button>
      </div>
    </section>

    <!-- Cenário 2: Scrollbar sempre visível -->
    <section>
      <h3 class="q-mb-xs text-subtitle1">2. Scrollbar Always Visible</h3>
      <DssScrollArea
        visible="always"
        class="scroll-demo-sm"
        label="Área com scrollbar sempre visível"
      >
        <div class="q-pa-md" style="white-space: pre-line;">{{ longText }}</div>
      </DssScrollArea>
    </section>

    <!-- Cenário 3: Scrollbar oculta (never) -->
    <section>
      <h3 class="q-mb-xs text-subtitle1">3. Scroll Silencioso (never)</h3>
      <DssScrollArea
        visible="never"
        class="scroll-demo-xs"
        label="Área com rolagem sem barra visível"
      >
        <div class="q-pa-md">
          Este conteúdo é rolável mas a scrollbar fica oculta.
          Útil para áreas decorativas ou mobile-first.
          Adicione mais conteúdo para testar a rolagem via teclado ou touch.
        </div>
      </DssScrollArea>
    </section>

    <!-- Cenário 4: Scroll horizontal -->
    <section>
      <h3 class="q-mb-xs text-subtitle1">4. Scroll Horizontal</h3>
      <DssScrollArea
        horizontal
        class="scroll-demo-h"
        label="Conteúdo rolável horizontalmente"
      >
        <div class="row no-wrap q-gutter-md q-pa-md">
          <div
            v-for="col in wideContent"
            :key="col"
            class="scroll-demo-col bg-grey-2 flex flex-center text-body2 text-center"
          >
            {{ col }}
          </div>
        </div>
      </DssScrollArea>
    </section>

    <!-- Cenário 5: Brand Hub -->
    <section data-brand="hub">
      <h3 class="q-mb-xs text-subtitle1">5. Brand Hub</h3>
      <DssScrollArea
        visible="always"
        class="scroll-demo-sm"
        label="Área de scroll com tema Hub"
      >
        <div class="q-pa-md bg-orange-1" style="white-space: pre-line;">{{ longText }}</div>
      </DssScrollArea>
    </section>

    <!-- Cenário 6: Brand Water -->
    <section data-brand="water">
      <h3 class="q-mb-xs text-subtitle1">6. Brand Water</h3>
      <DssScrollArea
        visible="always"
        class="scroll-demo-sm"
        label="Área de scroll com tema Water"
      >
        <div class="q-pa-md bg-blue-1" style="white-space: pre-line;">{{ longText }}</div>
      </DssScrollArea>
    </section>

  </div>
</template>

<style>
/*
 * Example-only layout constraints.
 * Usam unidades viewport (vh/vw) para evitar px hardcoded.
 * Bordas e radii via tokens DSS.
 */
.scroll-demo-md {
  height: 25vh;
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-sm);
}

.scroll-demo-sm {
  height: 20vh;
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-sm);
}

.scroll-demo-xs {
  height: 15vh;
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-sm);
}

.scroll-demo-h {
  height: 15vh;
  max-width: 50%;
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-sm);
}

.scroll-demo-col {
  width: 8vw;
  height: 8vw;
  border-radius: var(--dss-radius-sm);
  flex-shrink: 0;
}
</style>
