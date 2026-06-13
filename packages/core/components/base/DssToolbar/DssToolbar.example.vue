<script setup lang="ts">
/**
 * DssToolbar — Exemplos interativos
 *
 * Nota: Exemplos usam DssButton e DssSpace para composição.
 * q-space é usado como espaçador flexbox (aguardando DssSpace para toolbars).
 */
import DssToolbar from './DssToolbar.vue'
</script>

<template>
  <div class="dss-toolbar-examples q-pa-md q-gutter-y-lg">

    <!-- =================================================================
         Exemplo 1: Básico — texto e botão de ação
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">1. Básico — título e ação</p>
      <div style="border: 1px solid var(--dss-gray-200);">
        <DssToolbar>
          <span class="text-subtitle1">Título da Página</span>
          <q-space />
          <q-btn flat icon="more_vert" round aria-label="Mais opções" />
        </DssToolbar>
      </div>
    </section>

    <!-- =================================================================
         Exemplo 2: Brand Hub — fundo laranja, texto invertido
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">2. Brand Hub (laranja)</p>
      <DssToolbar brand="hub">
        <q-btn flat round icon="menu" aria-label="Menu" />
        <span class="text-subtitle1 q-ml-sm">Sansys Hub</span>
        <q-space />
        <q-btn flat round icon="notifications" aria-label="Notificações" />
        <q-btn flat round icon="account_circle" aria-label="Conta" />
      </DssToolbar>
    </section>

    <!-- =================================================================
         Exemplo 3: Brand Water — fundo azul
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">3. Brand Water (azul)</p>
      <DssToolbar brand="water">
        <q-btn flat round icon="menu" aria-label="Menu" />
        <span class="text-subtitle1 q-ml-sm">Sansys Water</span>
        <q-space />
        <q-btn flat round icon="search" aria-label="Buscar" />
        <q-btn flat round icon="account_circle" aria-label="Conta" />
      </DssToolbar>
    </section>

    <!-- =================================================================
         Exemplo 4: Com Inset — padding-inline-start ampliado
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">4. Com Inset (espaçamento à esquerda)</p>
      <div style="border: 1px solid var(--dss-gray-200);">
        <DssToolbar inset>
          <span class="text-subtitle1">Seção Indentada</span>
          <q-space />
          <q-btn flat label="Salvar" />
          <q-btn flat label="Cancelar" />
        </DssToolbar>
      </div>
    </section>

    <!-- =================================================================
         Exemplo 5: Composição completa
         Menu à esquerda + título + ações à direita
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">5. Composição completa (Brand Waste)</p>
      <DssToolbar brand="waste" aria-label="Barra principal de navegação">
        <q-btn
          flat
          round
          dense
          icon="menu"
          aria-label="Abrir menu lateral"
        />
        <span class="text-h6 q-ml-md">Sansys Waste</span>
        <q-space />
        <q-btn
          flat
          round
          dense
          icon="search"
          aria-label="Buscar"
        />
        <q-btn
          flat
          round
          dense
          icon="help_outline"
          aria-label="Ajuda"
        />
        <q-btn
          flat
          round
          dense
          icon="account_circle"
          aria-label="Perfil do usuário"
        />
      </DssToolbar>
    </section>

    <!-- =================================================================
         Exemplo 6: Dense
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">6. Dense (altura reduzida)</p>
      <div style="border: 1px solid var(--dss-gray-200);">
        <DssToolbar :dense="true" aria-label="Barra compacta">
          <q-btn flat dense round icon="arrow_back" aria-label="Voltar" />
          <span class="text-body2 q-ml-sm">Contexto compacto</span>
          <q-space />
          <q-btn flat dense round icon="close" aria-label="Fechar" />
        </DssToolbar>
      </div>
    </section>

  </div>
</template>
