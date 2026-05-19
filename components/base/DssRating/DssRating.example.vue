<script setup lang="ts">
import { ref } from 'vue'
import { DssRating } from './index.js'

const avaliacao = ref(3)
const satisfacao = ref(4)
const meia = ref(3.5)
const readonly = ref(4)
const disabled = ref(2)
const contextVal = ref(3)
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 48px; padding: 32px; font-family: sans-serif;">

    <!-- Cenário 1: Hub — uso básico com v-model -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Brand hub — básico</p>
      <DssRating v-model="avaliacao" brand="hub" />
      <p style="margin: 0; font-size: 13px;">Valor: {{ avaliacao }}/5</p>
    </div>

    <!-- Cenário 2: Water — ícone customizado + max customizado -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Brand water — ícone favorite + max 10</p>
      <DssRating
        v-model="satisfacao"
        brand="water"
        :max="10"
        icon="favorite_border"
        icon-selected="favorite"
        size="28px"
      />
      <p style="margin: 0; font-size: 13px;">{{ satisfacao }}/10</p>
    </div>

    <!-- Cenário 3: Waste — meia avaliação -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Brand waste — meia avaliação</p>
      <DssRating
        v-model="meia"
        brand="waste"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
      />
      <p style="margin: 0; font-size: 13px;">{{ meia }}/5</p>
    </div>

    <!-- Cenário 4: Readonly -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Readonly (exibição)</p>
      <DssRating
        v-model="readonly"
        brand="hub"
        readonly
      />
    </div>

    <!-- Cenário 5: Disabled -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Disabled</p>
      <DssRating
        v-model="disabled"
        brand="water"
        disable
      />
    </div>

    <!-- Cenário 6: Brand via contexto ancestral [data-brand] -->
    <div data-brand="waste" style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 16px; border: 1px dashed #ccc; border-radius: 8px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Brand via [data-brand="waste"]</p>
      <DssRating v-model="contextVal" size="32px" />
      <p style="margin: 0; font-size: 11px; color: #888;">(sem prop brand)</p>
    </div>

  </div>
</template>
