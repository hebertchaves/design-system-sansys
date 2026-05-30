<script setup lang="ts">
import { ref } from 'vue'
import DssPagination from './DssPagination.vue'

const page1 = ref(1)
const page2 = ref(3)
const page3 = ref(1)
const page4 = ref(2)
const page5 = ref(1)
const page6 = ref(5)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">

    <!-- Exemplo 1: Padrão -->
    <section>
      <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Padrão — max=10, direction-links</p>
      <DssPagination v-model="page1" :max="10" />
      <p style="margin-top: 4px; font-size: 12px; color: #999;">Página atual: {{ page1 }}</p>
    </section>

    <!-- Exemplo 2: Navegação completa com boundary-links -->
    <section>
      <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Navegação completa — boundary-links, max-pages=7</p>
      <DssPagination
        v-model="page2"
        :max="50"
        direction-links
        boundary-links
        :max-pages="7"
      />
      <p style="margin-top: 4px; font-size: 12px; color: #999;">Página atual: {{ page2 }}</p>
    </section>

    <!-- Exemplo 3: Variante round com marca Hub -->
    <section>
      <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Round + brand="hub"</p>
      <DssPagination v-model="page3" :max="8" round brand="hub" />
    </section>

    <!-- Exemplo 4: Variante outline, size sm, marca Water -->
    <section>
      <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Outline + size="sm" + brand="water"</p>
      <DssPagination v-model="page4" :max="15" outline size="sm" brand="water" />
    </section>

    <!-- Exemplo 5: Variante flat, size lg, marca Waste -->
    <section>
      <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Flat + size="lg" + brand="waste"</p>
      <DssPagination v-model="page5" :max="12" flat size="lg" brand="waste" />
    </section>

    <!-- Exemplo 6: Estado disabled -->
    <section>
      <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Desabilitado</p>
      <DssPagination v-model="page6" :max="10" disable />
    </section>

  </div>
</template>
