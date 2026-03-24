<template>
  <div class="dss-spinner-examples q-pa-md" style="max-width: 720px">
    <h2 class="text-h6 q-mb-lg">DssSpinner — Exemplos</h2>

    <!-- Cenário 1: Padrão e tipos -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">1. Tipos de spinner</p>
      <div class="row q-gutter-md items-center">
        <DssSpinner type="standard" aria-label="Carregando standard" />
        <DssSpinner type="dots"     aria-label="Carregando dots" />
        <DssSpinner type="ios"      aria-label="Carregando iOS" />
        <DssSpinner type="oval"     aria-label="Carregando oval" />
        <DssSpinner type="tail"     aria-label="Carregando tail" />
        <DssSpinner type="rings"    aria-label="Carregando rings" />
        <DssSpinner type="pie"      aria-label="Carregando pie" />
        <DssSpinner type="bars"     aria-label="Carregando bars" />
      </div>
      <p class="text-caption text-secondary q-mt-sm">
        standard · dots · ios · oval · tail · rings · pie · bars
      </p>
    </section>

    <!-- Cenário 2: Tamanhos via tokens --dss-icon-size-* -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">2. Tamanhos (tokens --dss-icon-size-*)</p>
      <div class="row q-gutter-md items-center">
        <DssSpinner size="xs" aria-label="Carregando xs (16px)" />
        <DssSpinner size="sm" aria-label="Carregando sm (20px)" />
        <DssSpinner size="md" aria-label="Carregando md (24px)" />
        <DssSpinner size="lg" aria-label="Carregando lg (32px)" />
        <DssSpinner size="xl" aria-label="Carregando xl (48px)" />
      </div>
      <p class="text-caption text-secondary q-mt-sm">
        xs (16px) · sm (20px) · md (24px) · lg (32px) · xl (48px)
      </p>
    </section>

    <!-- Cenário 3: Cores semânticas DSS -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">3. Cores semânticas</p>
      <div class="row q-gutter-md items-center">
        <DssSpinner color="primary"   size="lg" aria-label="Carregando primary" />
        <DssSpinner color="secondary" size="lg" aria-label="Carregando secondary" />
        <DssSpinner color="neutral"   size="lg" aria-label="Carregando neutral" />
        <DssSpinner color="error"     size="lg" aria-label="Carregando error" />
        <DssSpinner color="success"   size="lg" aria-label="Carregando success" />
        <DssSpinner color="warning"   size="lg" aria-label="Carregando warning" />
        <DssSpinner color="info"      size="lg" aria-label="Carregando info" />
      </div>
      <p class="text-caption text-secondary q-mt-sm">
        primary · secondary · neutral · error · success · warning · info
      </p>
    </section>

    <!-- Cenário 4: Herança de cor do contexto (currentColor) -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">4. Herança de cor do contexto</p>
      <div class="row q-gutter-md items-center">
        <!-- O spinner herda a cor do texto do container pai -->
        <span class="text-primary">
          <DssSpinner size="lg" aria-label="Carregando dentro de texto primary" />
        </span>
        <span style="color: #e91e63">
          <DssSpinner size="lg" aria-label="Carregando dentro de cor customizada" />
        </span>
        <!-- Dentro de DssButton simulado com fundo escuro -->
        <span
          style="background: var(--dss-action-primary); color: white; padding: 8px; border-radius: 4px; display: inline-flex; gap: 8px; align-items: center"
        >
          <DssSpinner size="sm" aria-label="Carregando botão" />
          Salvando...
        </span>
      </div>
      <p class="text-caption text-secondary q-mt-sm">
        Sem prop color → herda currentColor do container pai
      </p>
    </section>

    <!-- Cenário 5: Thickness (apenas type='standard') + Brandabilidade -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">5. Thickness e Brands</p>
      <div class="row q-gutter-md items-center">
        <DssSpinner type="standard" size="lg" :thickness="2" aria-label="Carregando espessura 2" />
        <DssSpinner type="standard" size="lg" :thickness="5" aria-label="Carregando espessura 5 (default)" />
        <DssSpinner type="standard" size="lg" :thickness="10" aria-label="Carregando espessura 10" />
        <DssSpinner brand="hub"   size="lg" aria-label="Carregando Hub" />
        <DssSpinner brand="water" size="lg" aria-label="Carregando Water" />
        <DssSpinner brand="waste" size="lg" aria-label="Carregando Waste" />
      </div>
      <p class="text-caption text-secondary q-mt-sm">
        thickness: 2 · 5 (default) · 10 · brand: hub · water · waste
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import DssSpinner from './DssSpinner.vue'
</script>
