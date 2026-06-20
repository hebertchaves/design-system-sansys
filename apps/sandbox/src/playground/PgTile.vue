<template>
  <div class="pg-tile">
    <div class="pg-tile__stage"><slot /></div>
    <code class="pg-tile__code">{{ code }}</code>
  </div>
</template>

<script setup lang="ts">
defineProps<{ code: string }>()
</script>

<!-- Tile de demonstração: stage listrado (slot) + rótulo de código.
     Sem gap entre stage e code (separador justaposto). Estilo em playground.scss. -->
