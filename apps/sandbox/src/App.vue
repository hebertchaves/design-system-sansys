<template>
  <!-- PREVIEW FRAME (durável): /?frame=<Componente> monta o SFC real dentro do iframe -->
  <PreviewSubject v-if="isFrame" />
  <TestSuite v-else />
</template>

<script setup>
import TestSuite from './TestSuite.vue'
// PREVIEW FRAME (durável) — realm do iframe do playground
import PreviewSubject from './preview/PreviewSubject.vue'
const sp = new URLSearchParams(window.location.search)
const isFrame = sp.has('frame')
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
