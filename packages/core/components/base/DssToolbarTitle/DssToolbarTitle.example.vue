<template>
  <div class="dss-toolbar-title-examples">

    <!-- Cenário 1: Básico -->
    <section>
      <h2>1. Básico</h2>
      <dss-toolbar>
        <q-btn flat round dense icon="menu" aria-label="Menu de navegação" />
        <dss-toolbar-title>Sansys Hub</dss-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="more_vert" aria-label="Mais opções" />
      </dss-toolbar>
    </section>

    <!-- Cenário 2: Truncamento (Ellipsis) com título longo -->
    <section>
      <h2>2. Truncamento automático</h2>
      <div :style="{ maxWidth: containerWidth }">
        <dss-toolbar>
          <dss-toolbar-title>
            Relatório Consolidado de Operações e Manutenção de Ativos — Exercício 2025
          </dss-toolbar-title>
          <q-btn flat round dense icon="search" aria-label="Pesquisar" />
        </dss-toolbar>
      </div>
      <div style="margin-top: var(--dss-spacing-2)">
        Largura do container:
        <select v-model="containerWidth">
          <option value="100%">100%</option>
          <option value="400px">400px</option>
          <option value="280px">280px</option>
        </select>
      </div>
    </section>

    <!-- Cenário 3: Com prop shrink -->
    <section>
      <h2>3. Com prop shrink</h2>
      <dss-toolbar>
        <dss-toolbar-title :shrink="true">Filtros</dss-toolbar-title>
        <q-space />
        <dss-toolbar-title>Resultados da pesquisa (342 itens)</dss-toolbar-title>
      </dss-toolbar>
    </section>

    <!-- Cenário 4: Com Brand (herança de cor) -->
    <section>
      <h2>4. Com Brand — herança de cor do DssToolbar pai</h2>
      <dss-toolbar brand="hub">
        <q-btn flat round dense icon="arrow_back" aria-label="Voltar" />
        <dss-toolbar-title>Sansys Hub — Painel Principal</dss-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="notifications" aria-label="Notificações" />
      </dss-toolbar>

      <dss-toolbar brand="water" style="margin-top: var(--dss-spacing-2)">
        <q-btn flat round dense icon="arrow_back" aria-label="Voltar" />
        <dss-toolbar-title>Sansys Water — Monitoramento</dss-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="notifications" aria-label="Notificações" />
      </dss-toolbar>

      <dss-toolbar brand="waste" style="margin-top: var(--dss-spacing-2)">
        <q-btn flat round dense icon="arrow_back" aria-label="Voltar" />
        <dss-toolbar-title>Sansys Waste — Coleta</dss-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="notifications" aria-label="Notificações" />
      </dss-toolbar>
    </section>

    <!-- Cenário 5: Playground interativo -->
    <section>
      <h2>5. Playground</h2>
      <div style="margin-bottom: var(--dss-spacing-2)">
        <label>
          Texto do título:
          <input v-model="playgroundTitle" type="text" style="width: 100%" />
        </label>
        <label style="display:block; margin-top: var(--dss-spacing-1)">
          <input v-model="playgroundShrink" type="checkbox" /> Shrink
        </label>
        <label style="display:block; margin-top: var(--dss-spacing-1)">
          Brand do DssToolbar pai:
          <select v-model="playgroundBrand">
            <option value="">Sem brand (padrão)</option>
            <option value="hub">Hub</option>
            <option value="water">Water</option>
            <option value="waste">Waste</option>
          </select>
        </label>
        <label style="display:block; margin-top: var(--dss-spacing-1)">
          Largura do container:
          <select v-model="playgroundWidth">
            <option value="100%">100%</option>
            <option value="400px">400px</option>
            <option value="250px">250px</option>
          </select>
        </label>
      </div>
      <div :style="{ maxWidth: playgroundWidth }">
        <dss-toolbar :brand="playgroundBrand || undefined">
          <dss-toolbar-title :shrink="playgroundShrink">
            {{ playgroundTitle }}
          </dss-toolbar-title>
        </dss-toolbar>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssToolbar from '../DssToolbar/DssToolbar.vue'
import DssToolbarTitle from './DssToolbarTitle.vue'

const containerWidth = ref('400px')
const playgroundTitle = ref('Título da Página')
const playgroundShrink = ref(false)
const playgroundBrand = ref('')
const playgroundWidth = ref('100%')
</script>
