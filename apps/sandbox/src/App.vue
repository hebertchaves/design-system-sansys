<template>
  <!-- PREVIEW FRAME (durável): /?frame=<Componente> monta o SFC real dentro do iframe -->
  <PreviewSubject v-if="isFrame" />
  <TestSuite v-else />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const sp = new URLSearchParams(window.location.search)
const isFrame = sp.has('frame')
// TestSuite é lazy: ele importa TODAS as Test*.vue (grafo de ~200 módulos do
// core). Sem lazy, o realm do iframe (isFrame=true) baixava esse grafo inteiro
// só para renderizar UM componente — era a causa dos ~4s de primeira pintura.
// Com lazy, o iframe carrega só PreviewSubject + o SFC alvo.
const TestSuite = defineAsyncComponent(() => import('./TestSuite.vue'))
// PREVIEW FRAME (durável) — realm do iframe do playground
import PreviewSubject from './preview/PreviewSubject.vue'
</script>

<style>
/* Reset global para garantir layout correto */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI',
               'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
