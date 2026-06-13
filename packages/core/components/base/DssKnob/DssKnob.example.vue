<script setup lang="ts">
import { ref } from 'vue'
import { DssKnob } from './index.js'

const volume = ref(50)
const temperature = ref(22)
const angle = ref(75)
const readonlyVal = ref(65)
const disabledVal = ref(40)
const contextVal = ref(30)
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 48px; padding: 32px; font-family: sans-serif;">

    <!-- Cenário 1: Hub — uso básico com v-model e slot padrão -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Brand hub — básico</p>
      <DssKnob v-model="volume" brand="hub" />
      <p style="margin: 0; font-size: 13px;">Valor: {{ volume }}</p>
    </div>

    <!-- Cenário 2: Water — range e step customizados, slot com unidade -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Brand water — range/step + slot</p>
      <DssKnob
        v-model="temperature"
        brand="water"
        :min="16"
        :max="30"
        :step="0.5"
        :thickness="0.3"
        size="72px"
      >
        {{ temperature }}°C
      </DssKnob>
    </div>

    <!-- Cenário 3: Waste — readonly -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Brand waste — readonly</p>
      <DssKnob
        v-model="readonlyVal"
        brand="waste"
        readonly
        :rounded="true"
      >
        {{ readonlyVal }}%
      </DssKnob>
    </div>

    <!-- Cenário 4: Disabled -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Disabled</p>
      <DssKnob
        v-model="disabledVal"
        brand="hub"
        disable
      >
        {{ disabledVal }}
      </DssKnob>
    </div>

    <!-- Cenário 5: Brand via contexto ancestral [data-brand] -->
    <div data-brand="water" style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 16px; border: 1px dashed #ccc; border-radius: 8px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Brand via [data-brand="water"]</p>
      <DssKnob v-model="contextVal" />
      <p style="margin: 0; font-size: 11px; color: #888;">(sem prop brand)</p>
    </div>

    <!-- Cenário 6: Slot customizado com ícone + reverse + feedback instantâneo -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Slot ícone + reverse + instant-feedback</p>
      <DssKnob
        v-model="angle"
        brand="waste"
        :min="0"
        :max="360"
        :step="5"
        :reverse="true"
        :instant-feedback="true"
        size="80px"
        :thickness="0.15"
      >
        <q-icon name="rotate_right" size="22px" />
      </DssKnob>
      <p style="margin: 0; font-size: 13px;">{{ angle }}°</p>
    </div>

  </div>
</template>
