<script setup lang="ts">
import { ref } from 'vue'
import DssDatePicker from './DssDatePicker.vue'

const singleDate = ref('2026/05/22')
const rangeDate = ref({ from: '2026/05/10', to: '2026/05/22' })
const multipleDates = ref(['2026/05/10', '2026/05/15', '2026/05/22'])
const emptyDate = ref(undefined)

function isWeekday(date: string): boolean {
  const d = new Date(date.replace(/\//g, '-'))
  const day = d.getDay()
  return day !== 0 && day !== 6
}
</script>

<template>
  <div class="example-wrapper q-pa-lg q-gutter-lg">

    <!-- Cenário 1: Data única -->
    <section>
      <h3 class="text-h6 q-mb-sm">Data única</h3>
      <DssDatePicker v-model="singleDate" />
      <p class="text-caption q-mt-sm">Selecionado: {{ singleDate }}</p>
    </section>

    <!-- Cenário 2: Intervalo de datas (range) -->
    <section>
      <h3 class="text-h6 q-mb-sm">Intervalo (range)</h3>
      <DssDatePicker v-model="rangeDate" range />
      <p class="text-caption q-mt-sm">Selecionado: {{ JSON.stringify(rangeDate) }}</p>
    </section>

    <!-- Cenário 3: Múltiplas datas -->
    <section>
      <h3 class="text-h6 q-mb-sm">Múltiplas datas</h3>
      <DssDatePicker v-model="multipleDates" multiple />
      <p class="text-caption q-mt-sm">Selecionadas: {{ multipleDates }}</p>
    </section>

    <!-- Cenário 4: Com restrição de datas (apenas dias úteis) -->
    <section>
      <h3 class="text-h6 q-mb-sm">Somente dias úteis</h3>
      <DssDatePicker v-model="emptyDate" :options="isWeekday" today-btn />
    </section>

    <!-- Cenário 5: Modo minimal (sem header) -->
    <section>
      <h3 class="text-h6 q-mb-sm">Modo minimal</h3>
      <DssDatePicker v-model="singleDate" minimal />
    </section>

    <!-- Cenário 6: Desabilitado -->
    <section>
      <h3 class="text-h6 q-mb-sm">Desabilitado</h3>
      <DssDatePicker v-model="singleDate" disable />
    </section>

    <!-- Cenário 7: Somente leitura -->
    <section>
      <h3 class="text-h6 q-mb-sm">Somente leitura</h3>
      <DssDatePicker v-model="singleDate" readonly />
    </section>

    <!-- Cenário 8: Brand Hub -->
    <section data-brand="hub">
      <h3 class="text-h6 q-mb-sm">Brand Hub</h3>
      <DssDatePicker v-model="singleDate" />
    </section>

    <!-- Cenário 9: Brand Water -->
    <section data-brand="water">
      <h3 class="text-h6 q-mb-sm">Brand Water</h3>
      <DssDatePicker v-model="singleDate" />
    </section>

    <!-- Cenário 10: Brand Waste -->
    <section data-brand="waste">
      <h3 class="text-h6 q-mb-sm">Brand Waste</h3>
      <DssDatePicker v-model="singleDate" />
    </section>

  </div>
</template>
