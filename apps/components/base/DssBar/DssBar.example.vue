<script setup lang="ts">
// DssBar — Exemplos interativos
import DssBar from './DssBar.vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-gap-3); padding: var(--dss-padding-4);">

    <!-- Cenário 1: Padrão — barra simples com título -->
    <section>
      <h3>Padrão</h3>
      <DssBar>
        <span>Sistema Sansys</span>
        <q-space />
        <span style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle);">v1.0.0</span>
      </DssBar>
    </section>

    <!-- Cenário 2: Elevada -->
    <section>
      <h3>Elevada (elevated)</h3>
      <DssBar :elevated="true">
        <span>Barra com sombra</span>
        <q-space />
      </DssBar>
    </section>

    <!-- Cenário 3: Compacta (dense) -->
    <section>
      <h3>Compacta (dense)</h3>
      <DssBar :dense="true">
        <span>Barra compacta</span>
        <q-space />
      </DssBar>
    </section>

    <!-- Cenário 4: Brand Hub -->
    <section data-brand="hub">
      <h3>Brand Hub</h3>
      <DssBar :elevated="true">
        <span>Sansys Hub</span>
        <q-space />
      </DssBar>
    </section>

    <!-- Cenário 5: Brand Water -->
    <section data-brand="water">
      <h3>Brand Water</h3>
      <DssBar>
        <span>Sansys Water</span>
        <q-space />
      </DssBar>
    </section>

    <!-- Cenário 6: Brand Waste -->
    <section data-brand="waste">
      <h3>Brand Waste</h3>
      <DssBar>
        <span>Sansys Waste</span>
        <q-space />
      </DssBar>
    </section>

  </div>
</template>
