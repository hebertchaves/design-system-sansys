<script setup lang="ts">
/**
 * DssDataCard — Exemplos interativos (Stress Test)
 *
 * 5 cenários que exercitam os padrões críticos da Fase 3:
 * 1. Composição básica — sem abas
 * 2. Composição com abas — DssTabs + DssTabPanels aninhados
 * 3. Paginação interna — provide/inject de disabled
 * 4. Brand propagation — sem prop drilling
 * 5. Estado loading — skeleton
 */

import { ref } from 'vue'
import DssDataCard from './DssDataCard.vue'

// Cenário 2: abas
const activeTab2 = ref(1)
const tabs2 = [
  { name: 1, label: 'Resumo', icon: 'dashboard' },
  { name: 2, label: 'Detalhes', icon: 'list' },
  { name: 3, label: 'Histórico', icon: 'history', disabled: false },
]

// Cenário 3: paginação
const currentPage3 = ref(1)
const tabs3 = [
  { name: 'dados', label: 'Dados' },
  { name: 'grafico', label: 'Gráfico' },
]

// Cenário 4: brand
const currentPage4 = ref(1)
const tabs4 = [
  { name: 'hub', label: 'Hub' },
  { name: 'water', label: 'Water' },
]

// Cenário 5: loading
const isLoading5 = ref(true)
setTimeout(() => { isLoading5.value = false }, 3000)
</script>

<template>
  <div class="q-pa-md q-gutter-y-xl">

    <!-- ====================================================================
         CENÁRIO 1 — Composição básica (sem abas)
         Valida: inheritAttrs, toolbar, slot default
         ==================================================================== -->
    <section>
      <p class="text-subtitle2 q-mb-sm">1. Composição básica — sem abas</p>
      <DssDataCard
        title="Indicadores Gerais"
        subtitle="Atualizado há 5 minutos"
        variant="elevated"
        style="max-width: 480px"
      >
        <p>Conteúdo direto no slot default. Sem abas.</p>
        <p>Valida: <code>inheritAttrs: false</code>, toolbar, slot default.</p>
      </DssDataCard>
    </section>

    <!-- ====================================================================
         CENÁRIO 2 — Composição com abas
         Valida: DssTabs + DssTabPanels aninhados, slots dinâmicos tab-{name}
         ==================================================================== -->
    <section>
      <p class="text-subtitle2 q-mb-sm">2. Composição com abas — slots dinâmicos</p>
      <DssDataCard
        v-model="activeTab2"
        title="Painel de Dados"
        subtitle="3 seções disponíveis"
        :tabs="tabs2"
        tabs-aria-label="Seções do painel de dados"
        style="max-width: 560px"
      >
        <template #tab-1>
          <p><strong>Resumo:</strong> Visão geral dos indicadores.</p>
          <p>Aba ativa: {{ activeTab2 }}</p>
        </template>
        <template #tab-2>
          <p><strong>Detalhes:</strong> Informações completas linha a linha.</p>
        </template>
        <template #tab-3>
          <p><strong>Histórico:</strong> Registro de alterações.</p>
        </template>
      </DssDataCard>
    </section>

    <!-- ====================================================================
         CENÁRIO 3 — Paginação + provide/inject de disabled
         Valida: paginação interna, disabled via provide/inject (sem prop drilling)
         ==================================================================== -->
    <section>
      <p class="text-subtitle2 q-mb-sm">3. Paginação + disabled via provide/inject</p>
      <DssDataCard
        v-model="currentPage3"
        title="Lista de Registros"
        :tabs="tabs3"
        :total-items="87"
        :items-per-page="10"
        style="max-width: 560px"
      >
        <template #tab-dados>
          <p>Página atual: <strong>{{ currentPage3 }}</strong></p>
          <p>Exibindo 10 de 87 registros.</p>
        </template>
        <template #tab-grafico>
          <p>Visualização em gráfico — página {{ currentPage3 }}.</p>
        </template>
      </DssDataCard>
    </section>

    <!-- ====================================================================
         CENÁRIO 4 — Brand propagation (sem prop drilling)
         Valida: [data-brand] no raiz propaga para DssToolbar e DssTabs
         ==================================================================== -->
    <section>
      <p class="text-subtitle2 q-mb-sm">4. Brand Hub — propagação via CSS Variable</p>
      <DssDataCard
        v-model="currentPage4"
        title="Sansys Hub"
        subtitle="Dados operacionais"
        brand="hub"
        :tabs="tabs4"
        :total-items="25"
        :items-per-page="10"
        style="max-width: 480px"
      >
        <template #tab-hub>
          <p>Conteúdo Hub. A brand <code>hub</code> foi propagada para DssToolbar e DssTabs sem prop drilling.</p>
        </template>
        <template #tab-water>
          <p>Conteúdo Water.</p>
        </template>
      </DssDataCard>
    </section>

    <!-- ====================================================================
         CENÁRIO 5 — Estado loading (skeleton)
         Valida: skeleton loader, ocultação de conteúdo e paginação
         ==================================================================== -->
    <section>
      <p class="text-subtitle2 q-mb-sm">5. Estado loading — skeleton (desaparece em 3s)</p>
      <DssDataCard
        title="Carregando dados..."
        :loading="isLoading5"
        :tabs="[{ name: 'a', label: 'Aba A' }, { name: 'b', label: 'Aba B' }]"
        :total-items="50"
        style="max-width: 480px"
      >
        <template #tab-a>
          <p>Conteúdo visível após carregamento.</p>
        </template>
        <template #tab-b>
          <p>Conteúdo da aba B.</p>
        </template>
      </DssDataCard>
    </section>

  </div>
</template>
