<script setup lang="ts">
import { ref } from 'vue'
import DssCircularProgress from './DssCircularProgress.vue'

const dynamicValue = ref(65)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-8); padding: var(--dss-spacing-6);">

    <!-- Cenário 1: Estados de progresso determinado -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-4);">Progresso Determinado</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); align-items: center; flex-wrap: wrap;">
        <DssCircularProgress :value="0" />
        <DssCircularProgress :value="25" />
        <DssCircularProgress :value="50" />
        <DssCircularProgress :value="75" />
        <DssCircularProgress :value="100" color="success" />
      </div>
    </section>

    <!-- Cenário 2: Com rótulo central (slot) -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-4);">Com Rótulo Central</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); align-items: center;">
        <DssCircularProgress :value="dynamicValue" size="lg">
          {{ dynamicValue }}%
        </DssCircularProgress>
        <DssCircularProgress :value="100" color="success" size="lg">
          ✓
        </DssCircularProgress>
        <DssCircularProgress :value="0" color="error" size="lg">
          !
        </DssCircularProgress>
      </div>
    </section>

    <!-- Cenário 3: Indeterminado -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-4);">Indeterminado (Loading)</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); align-items: center;">
        <DssCircularProgress indeterminate />
        <DssCircularProgress indeterminate size="sm" color="secondary" />
        <DssCircularProgress indeterminate size="lg" color="info" />
      </div>
    </section>

    <!-- Cenário 4: Tamanhos -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-4);">Tamanhos</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); align-items: center;">
        <DssCircularProgress :value="60" size="xs" />
        <DssCircularProgress :value="60" size="sm" />
        <DssCircularProgress :value="60" size="md" />
        <DssCircularProgress :value="60" size="lg" />
        <DssCircularProgress :value="60" size="xl" />
      </div>
    </section>

    <!-- Cenário 5: Cores semânticas -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-4);">Cores Semânticas</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); align-items: center;">
        <DssCircularProgress :value="70" color="primary" />
        <DssCircularProgress :value="70" color="secondary" />
        <DssCircularProgress :value="70" color="success" />
        <DssCircularProgress :value="70" color="error" />
        <DssCircularProgress :value="70" color="warning" />
        <DssCircularProgress :value="70" color="info" />
      </div>
    </section>

    <!-- Cenário 6: Brands -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-4);">Brands</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); align-items: center;">
        <DssCircularProgress :value="65" brand="hub" />
        <DssCircularProgress :value="65" brand="water" />
        <DssCircularProgress :value="65" brand="waste" />
        <!-- Via herança contextual -->
        <div data-brand="hub">
          <DssCircularProgress :value="80" />
        </div>
      </div>
    </section>

    <!-- Cenário 7: Estados especiais -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-4);">Disabled e Espessura</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); align-items: center;">
        <DssCircularProgress :value="50" disable />
        <DssCircularProgress :value="50" :thickness="0.05" />
        <DssCircularProgress :value="50" :thickness="0.4" />
        <DssCircularProgress :value="50" :angle="180" />
        <DssCircularProgress :value="50" reverse />
      </div>
    </section>

  </div>
</template>
