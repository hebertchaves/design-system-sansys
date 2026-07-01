<!-- POC (descartável) — instancia a página derivada do DssInput. -->
<template>
  <PocComponentPage :model="model" :diagnostics="diagnostics" />
</template>

<script setup>
import PocComponentPage from './PocComponentPage.vue'
import { model, diagnostics } from './derive.js'
</script>
