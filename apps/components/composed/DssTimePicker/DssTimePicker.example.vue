<template>
  <div class="dss-time-picker-examples q-pa-lg">
    <h5 class="q-mb-md">DssTimePicker — Exemplos</h5>

    <!-- ─── Cenário 1: Default 24h ─────────────────────────────────────── -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">Cenário 1 — Default (formato 24h)</p>
      <DssTimePicker
        v-model="time1"
        :format24h="true"
      />
      <p class="text-caption q-mt-sm">Valor: {{ time1 }}</p>
    </section>

    <!-- ─── Cenário 2: Formato 12h (AM/PM) ────────────────────────────── -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">Cenário 2 — Formato 12h (AM/PM)</p>
      <DssTimePicker
        v-model="time2"
        :format24h="false"
        mask="hh:mm A"
      />
      <p class="text-caption q-mt-sm">Valor: {{ time2 }}</p>
    </section>

    <!-- ─── Cenário 3: Com segundos ───────────────────────────────────── -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">Cenário 3 — Com segundos</p>
      <DssTimePicker
        v-model="time3"
        :with-seconds="true"
        mask="HH:mm:ss"
      />
      <p class="text-caption q-mt-sm">Valor: {{ time3 }}</p>
    </section>

    <!-- ─── Cenário 4: Minimal (sem header) ──────────────────────────── -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">Cenário 4 — Minimal (sem header)</p>
      <DssTimePicker
        v-model="time4"
        :minimal="true"
      />
      <p class="text-caption q-mt-sm">Valor: {{ time4 }}</p>
    </section>

    <!-- ─── Cenário 5: Landscape ──────────────────────────────────────── -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">Cenário 5 — Layout horizontal (landscape)</p>
      <DssTimePicker
        v-model="time5"
        :landscape="true"
      />
      <p class="text-caption q-mt-sm">Valor: {{ time5 }}</p>
    </section>

    <!-- ─── Cenário 6: Readonly ───────────────────────────────────────── -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">Cenário 6 — Readonly</p>
      <DssTimePicker
        v-model="time6"
        :readonly="true"
      />
    </section>

    <!-- ─── Cenário 7: Disabled ───────────────────────────────────────── -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">Cenário 7 — Disabled</p>
      <DssTimePicker
        v-model="time7"
        :disable="true"
      />
    </section>

    <!-- ─── Cenário 8: Com restrição de opções ───────────────────────── -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">Cenário 8 — Horário comercial (8h–18h, minutos de 15 em 15)</p>
      <DssTimePicker
        v-model="time8"
        :options="businessHoursOptions"
      />
      <p class="text-caption q-mt-sm">Valor: {{ time8 }}</p>
    </section>

    <!-- ─── Cenário 9: Brands ──────────────────────────────────────────── -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">Cenário 9 — Brands (Hub / Water / Waste)</p>
      <div class="row q-gutter-md">
        <div data-brand="hub">
          <p class="text-caption q-mb-xs">Hub</p>
          <DssTimePicker v-model="time9" />
        </div>
        <div data-brand="water">
          <p class="text-caption q-mb-xs">Water</p>
          <DssTimePicker v-model="time9" />
        </div>
        <div data-brand="waste">
          <p class="text-caption q-mb-xs">Waste</p>
          <DssTimePicker v-model="time9" />
        </div>
      </div>
    </section>

    <!-- ─── Cenário 10: Com botão "Agora" ─────────────────────────────── -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">Cenário 10 — Com botão "Agora"</p>
      <DssTimePicker
        v-model="time10"
        :now-btn="true"
      />
      <p class="text-caption q-mt-sm">Valor: {{ time10 }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssTimePicker from './DssTimePicker.vue'

const time1 = ref('14:30')
const time2 = ref('02:30 PM')
const time3 = ref('14:30:00')
const time4 = ref('09:00')
const time5 = ref('16:45')
const time6 = ref('10:00')
const time7 = ref('08:00')
const time8 = ref('09:00')
const time9 = ref('10:30')
const time10 = ref('')

function businessHoursOptions(hr: number, min: number | null): boolean {
  if (min === null) {
    return hr >= 8 && hr <= 18
  }
  return min % 15 === 0
}
</script>
