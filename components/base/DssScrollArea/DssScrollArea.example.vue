<script setup lang="ts">
import { ref } from 'vue'
import { DssScrollArea } from './index.js'

const scrollAreaRef = ref(null)

const longText = Array.from({ length: 30 }, (_, i) =>
  `Item ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
).join('\n')

const wideContent = Array.from({ length: 8 }, (_, i) =>
  `Coluna ${i + 1}`
)

function scrollToTop() {
  scrollAreaRef.value?.scrollTo(0, 300)
}

function scrollToBottom() {
  scrollAreaRef.value?.scrollTo(9999, 300)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">

    <!-- Cenário 1: Scroll vertical com altura fixa -->
    <section>
      <h3 style="margin-bottom: 8px;">Scroll Vertical (auto-hide)</h3>
      <DssScrollArea
        ref="scrollAreaRef"
        style="height: 200px; border: 1px solid #e5e5e5; border-radius: 8px;"
        label="Lista de itens"
      >
        <div style="padding: 16px; white-space: pre-line;">{{ longText }}</div>
      </DssScrollArea>
      <div style="display: flex; gap: 8px; margin-top: 8px;">
        <button @click="scrollToTop">Rolar ao topo</button>
        <button @click="scrollToBottom">Rolar ao fim</button>
      </div>
    </section>

    <!-- Cenário 2: Scrollbar sempre visível -->
    <section>
      <h3 style="margin-bottom: 8px;">Scrollbar Always Visible</h3>
      <DssScrollArea
        visible="always"
        style="height: 160px; border: 1px solid #e5e5e5; border-radius: 8px;"
        label="Área com scrollbar sempre visível"
      >
        <div style="padding: 16px; white-space: pre-line;">{{ longText }}</div>
      </DssScrollArea>
    </section>

    <!-- Cenário 3: Scrollbar oculta (never) -->
    <section>
      <h3 style="margin-bottom: 8px;">Scroll Silencioso (never)</h3>
      <DssScrollArea
        visible="never"
        style="height: 120px; border: 1px solid #e5e5e5; border-radius: 8px;"
        label="Área com rolagem sem barra visível"
      >
        <div style="padding: 16px;">
          Este conteúdo é rolável mas a scrollbar fica oculta.
          Útil para áreas decorativas ou mobile-first.
          Adicione mais conteúdo para testar a rolagem via teclado ou touch.
        </div>
      </DssScrollArea>
    </section>

    <!-- Cenário 4: Scroll horizontal -->
    <section>
      <h3 style="margin-bottom: 8px;">Scroll Horizontal</h3>
      <DssScrollArea
        horizontal
        style="width: 100%; max-width: 400px; border: 1px solid #e5e5e5; border-radius: 8px;"
        label="Conteúdo rolável horizontalmente"
      >
        <div style="display: flex; gap: 16px; padding: 16px; width: max-content;">
          <div
            v-for="col in wideContent"
            :key="col"
            style="width: 120px; height: 80px; background: #f5f5f5; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
          >
            {{ col }}
          </div>
        </div>
      </DssScrollArea>
    </section>

    <!-- Cenário 5: Brand Hub -->
    <section data-brand="hub">
      <h3 style="margin-bottom: 8px;">Brand Hub</h3>
      <DssScrollArea
        visible="always"
        style="height: 160px; border: 1px solid #e5e5e5; border-radius: 8px;"
        label="Área de scroll com tema Hub"
      >
        <div style="padding: 16px; white-space: pre-line;">{{ longText }}</div>
      </DssScrollArea>
    </section>

    <!-- Cenário 6: Brand Water -->
    <section data-brand="water">
      <h3 style="margin-bottom: 8px;">Brand Water</h3>
      <DssScrollArea
        visible="always"
        style="height: 160px; border: 1px solid #e5e5e5; border-radius: 8px;"
        label="Área de scroll com tema Water"
      >
        <div style="padding: 16px; white-space: pre-line;">{{ longText }}</div>
      </DssScrollArea>
    </section>

  </div>
</template>
