<template>
  <div class="dss-slider-examples" style="display: flex; flex-direction: column; gap: 32px; padding: 24px; max-width: 480px;">

    <!-- ====================================================================
         CENÁRIO 1 — Default (outlined, sem marcadores)
         ==================================================================== -->
    <section>
      <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 600;">1. Default</h3>

      <DssSlider
        v-model="volume"
        :min="0"
        :max="100"
        :step="1"
        aria-label="Volume"
      />
      <p style="margin: 8px 0 0; font-size: 12px; color: #666;">Valor: {{ volume }}</p>
    </section>

    <!-- ====================================================================
         CENÁRIO 2 — Com label tooltip + markers + snap
         ==================================================================== -->
    <section>
      <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 600;">2. Label + Markers + Snap</h3>

      <DssSlider
        v-model="rating"
        :min="0"
        :max="10"
        :step="1"
        :snap="true"
        :markers="true"
        :label="true"
        :label-always="labelAlwaysMode"
        aria-label="Avaliação de 0 a 10"
      />
      <label style="display: flex; align-items: center; gap: 8px; margin-top: 12px; font-size: 12px;">
        <input v-model="labelAlwaysMode" type="checkbox" />
        Label sempre visível
      </label>
      <p style="margin: 8px 0 0; font-size: 12px; color: #666;">Avaliação: {{ rating }}/10</p>
    </section>

    <!-- ====================================================================
         CENÁRIO 3 — Estados: hint, error, disabled, readonly
         ==================================================================== -->
    <section>
      <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 600;">3. Estados</h3>

      <div style="display: flex; flex-direction: column; gap: 20px;">
        <!-- Hint -->
        <DssSlider
          v-model="brightness"
          :min="0"
          :max="100"
          hint="Ajuste o brilho da tela entre 0% e 100%"
          aria-label="Brilho da tela"
        />

        <!-- Error -->
        <DssSlider
          v-model="errorValue"
          :min="0"
          :max="100"
          :error="true"
          error-message="Valor não permitido neste contexto"
          aria-label="Slider com erro"
        />

        <!-- Disabled -->
        <DssSlider
          :model-value="50"
          :min="0"
          :max="100"
          :disabled="true"
          aria-label="Slider desabilitado"
        />

        <!-- Readonly -->
        <DssSlider
          :model-value="75"
          :min="0"
          :max="100"
          :readonly="true"
          hint="Somente leitura"
          aria-label="Slider somente leitura"
        />
      </div>
    </section>

    <!-- ====================================================================
         CENÁRIO 4 — Brandabilidade (Hub, Water, Waste)
         ==================================================================== -->
    <section>
      <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 600;">4. Brandabilidade</h3>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <p style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Hub (Laranja)</p>
          <DssSlider v-model="brandValue" brand="hub" aria-label="Slider Hub" :label="true" />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Water (Azul)</p>
          <DssSlider v-model="brandValue" brand="water" aria-label="Slider Water" :label="true" />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Waste (Verde)</p>
          <DssSlider v-model="brandValue" brand="waste" aria-label="Slider Waste" :label="true" />
        </div>
      </div>
    </section>

    <!-- ====================================================================
         CENÁRIO 5 — Dense + labelValue customizado
         ==================================================================== -->
    <section>
      <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 600;">5. Dense + Label customizado</h3>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Dense -->
        <DssSlider
          v-model="denseValue"
          :dense="true"
          :min="0"
          :max="100"
          aria-label="Slider denso"
        />

        <!-- Label value customizado (porcentagem) -->
        <DssSlider
          v-model="percentValue"
          :min="0"
          :max="100"
          :label="true"
          :label-always="true"
          :label-value="`${percentValue}%`"
          aria-label="Opacidade"
          hint="Opacidade do elemento selecionado"
        />
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssSlider from './DssSlider.vue'

// Cenário 1
const volume = ref(60)

// Cenário 2
const rating = ref(7)
const labelAlwaysMode = ref(false)

// Cenário 3
const brightness = ref(70)
const errorValue = ref(30)

// Cenário 4
const brandValue = ref(50)

// Cenário 5
const denseValue = ref(40)
const percentValue = ref(80)
</script>
