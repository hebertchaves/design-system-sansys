<script setup lang="ts">
import { ref } from 'vue'
import DssColorPicker from './DssColorPicker.vue'

const colorHex = ref('#3498DB')
const colorRgb = ref('rgb(52, 152, 219)')
const colorPalette = ref('#E65100')
const colorDisabled = ref('#2E7D32')
const colorReadonly = ref('#0277BD')
</script>

<template>
  <div class="q-pa-lg column q-gutter-lg">

    <!-- Cenário 1: Espectro padrão com formato HEX -->
    <section>
      <div class="text-subtitle1 q-mb-sm">Padrão — Espectro HEX</div>
      <DssColorPicker
        v-model="colorHex"
        format-model="hex"
      />
      <div class="q-mt-sm text-caption">Valor: {{ colorHex }}</div>
    </section>

    <!-- Cenário 2: View de ajuste (tune) com formato RGB -->
    <section>
      <div class="text-subtitle1 q-mb-sm">Tune — Formato RGB</div>
      <DssColorPicker
        v-model="colorRgb"
        format-model="rgb"
        default-view="tune"
      />
      <div class="q-mt-sm text-caption">Valor: {{ colorRgb }}</div>
    </section>

    <!-- Cenário 3: Paleta de cores da marca -->
    <section>
      <div class="text-subtitle1 q-mb-sm">Paleta de Cores da Marca</div>
      <DssColorPicker
        v-model="colorPalette"
        format-model="hex"
        default-view="palette"
        :palette="[
          '#E65100', '#F57C00', '#FB8C00',
          '#0277BD', '#01579B', '#1565C0',
          '#2E7D32', '#1B5E20', '#33691E'
        ]"
      />
      <div class="q-mt-sm text-caption">Cor selecionada: {{ colorPalette }}</div>
    </section>

    <!-- Cenário 4: Sem cabeçalho e sem abas -->
    <section>
      <div class="text-subtitle1 q-mb-sm">Sem Header e Sem Tabs</div>
      <DssColorPicker
        v-model="colorHex"
        format-model="hex"
        no-header
        no-header-tabs
      />
    </section>

    <!-- Cenário 5: Disabled -->
    <section>
      <div class="text-subtitle1 q-mb-sm">Disabled</div>
      <DssColorPicker
        v-model="colorDisabled"
        format-model="hex"
        disable
      />
    </section>

    <!-- Cenário 6: Readonly -->
    <section>
      <div class="text-subtitle1 q-mb-sm">Readonly</div>
      <DssColorPicker
        v-model="colorReadonly"
        format-model="hex"
        readonly
      />
    </section>

    <!-- Cenário 7: Bordered + Flat -->
    <section>
      <div class="text-subtitle1 q-mb-sm">Bordered + Flat</div>
      <DssColorPicker
        v-model="colorHex"
        format-model="hex"
        flat
        bordered
      />
    </section>

    <!-- Cenário 8: Brand Hub -->
    <section data-brand="hub">
      <div class="text-subtitle1 q-mb-sm">Brand Hub</div>
      <DssColorPicker
        v-model="colorHex"
        format-model="hex"
      />
    </section>

    <!-- Cenário 9: Brand Water -->
    <section data-brand="water">
      <div class="text-subtitle1 q-mb-sm">Brand Water</div>
      <DssColorPicker
        v-model="colorHex"
        format-model="hex"
      />
    </section>

    <!-- Cenário 10: Brand Waste -->
    <section data-brand="waste">
      <div class="text-subtitle1 q-mb-sm">Brand Waste</div>
      <DssColorPicker
        v-model="colorHex"
        format-model="hex"
      />
    </section>

  </div>
</template>
