<script setup lang="ts">
import { ref } from 'vue'
import { DssSkeleton } from './index.js'

const loading = ref(true)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-8); padding: var(--dss-spacing-6);">

    <!-- Cenário 1: Tipos e formas -->
    <section>
      <h3>Cenário 1 — Tipos disponíveis</h3>
      <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-4); max-width: 400px;">
        <DssSkeleton type="rect" height="48px" />
        <DssSkeleton type="text" />
        <DssSkeleton type="heading" width="60%" />
        <DssSkeleton type="circle" width="48px" height="48px" />
        <DssSkeleton type="avatar" />
      </div>
    </section>

    <!-- Cenário 2: Texto multilinha -->
    <section>
      <h3>Cenário 2 — Texto multilinha (lines)</h3>
      <div style="max-width: 400px;">
        <DssSkeleton type="text" :lines="4" />
      </div>
    </section>

    <!-- Cenário 3: Animações -->
    <section>
      <h3>Cenário 3 — Animações</h3>
      <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-3); max-width: 300px;">
        <div>
          <small>wave (padrão)</small>
          <DssSkeleton animation="wave" height="32px" />
        </div>
        <div>
          <small>pulse</small>
          <DssSkeleton animation="pulse" height="32px" />
        </div>
        <div>
          <small>none (estático)</small>
          <DssSkeleton animation="none" height="32px" />
        </div>
      </div>
    </section>

    <!-- Cenário 4: Bordered + radius -->
    <section>
      <h3>Cenário 4 — Bordas e raio</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); flex-wrap: wrap;">
        <DssSkeleton :bordered="true" width="100px" height="60px" />
        <DssSkeleton :bordered="true" radius="--dss-radius-lg" width="100px" height="60px" />
        <DssSkeleton :bordered="true" radius="--dss-radius-full" width="100px" height="60px" />
      </div>
    </section>

    <!-- Cenário 5: Composição de card skeleton -->
    <section>
      <h3>Cenário 5 — Composição (card skeleton)</h3>
      <div style="padding: var(--dss-spacing-4); border: 1px solid var(--dss-gray-200); border-radius: var(--dss-radius-lg); max-width: 320px; display: flex; flex-direction: column; gap: var(--dss-spacing-3);">
        <div style="display: flex; align-items: center; gap: var(--dss-spacing-3);">
          <DssSkeleton type="avatar" />
          <div style="flex: 1; display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
            <DssSkeleton type="heading" width="70%" />
            <DssSkeleton type="text" width="50%" />
          </div>
        </div>
        <DssSkeleton height="160px" radius="--dss-radius-md" />
        <DssSkeleton type="text" :lines="3" />
      </div>
    </section>

    <!-- Cenário 6: Brand Hub -->
    <section data-brand="hub">
      <h3>Cenário 6 — Brand Hub (contexto ancestral)</h3>
      <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-3); max-width: 300px;">
        <DssSkeleton type="avatar" />
        <DssSkeleton type="heading" width="80%" />
        <DssSkeleton type="text" :lines="2" />
        <DssSkeleton :bordered="true" height="40px" />
      </div>
    </section>

    <!-- Cenário 7: Brand prop explícita (water e waste) -->
    <section>
      <h3>Cenário 7 — Brand prop explícita (water / waste)</h3>
      <div style="display: flex; gap: var(--dss-spacing-6);">
        <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
          <small>water</small>
          <DssSkeleton brand="water" type="avatar" />
          <DssSkeleton brand="water" type="heading" width="120px" />
          <DssSkeleton brand="water" type="text" width="120px" />
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
          <small>waste</small>
          <DssSkeleton brand="waste" type="avatar" />
          <DssSkeleton brand="waste" type="heading" width="120px" />
          <DssSkeleton brand="waste" type="text" width="120px" />
        </div>
      </div>
    </section>

  </div>
</template>
