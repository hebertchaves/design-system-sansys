<script setup lang="ts">
/**
 * DssCadrisCard — Playground de Exemplos
 *
 * Demonstra:
 * 1. Fluxo principal com dados mockados (5+ linhas)
 * 2. Interatividade: loading ao clicar em Pesquisar (2 segundos)
 * 3. Dark mode: toggle manual
 * 4. Estado vazio: toggle de dados
 * 5. Slot toolbar-actions
 * 6. Estado disabled
 */
import { ref, computed } from 'vue'
import DssCadrisCard from './DssCadrisCard.vue'
import type { CadrisRow, CadrisPagination, CadrisFilters, SelectOption } from './types/cadriscard.types'

// --------------------------------------------------------------------------
// Dark mode toggle
// --------------------------------------------------------------------------

const isDark = ref(false)

// --------------------------------------------------------------------------
// Dados mockados
// --------------------------------------------------------------------------

const mockRows: CadrisRow[] = [
  { id: 1, numeroCadri: 'CADRI-2024-001', gerador: 'Empresa Alpha Ltda', aterro: 'Aterro Beta S.A.', documento: 'CTF', situacao: 'ativo', validade: '31/12/2024' },
  { id: 2, numeroCadri: 'CADRI-2024-002', gerador: 'Indústria Gamma', aterro: 'Aterro Delta', documento: 'MTR', situacao: 'ativo', validade: '30/06/2025' },
  { id: 3, numeroCadri: 'CADRI-2024-003', gerador: 'Construtora Epsilon', aterro: 'Aterro Zeta', documento: 'CTF', situacao: 'inativo', validade: '15/03/2024' },
  { id: 4, numeroCadri: 'CADRI-2024-004', gerador: 'Petroquímica Eta', aterro: 'Aterro Theta', documento: 'MTR', situacao: 'ativo', validade: '28/02/2026' },
  { id: 5, numeroCadri: 'CADRI-2024-005', gerador: 'Logística Iota', aterro: 'Aterro Kappa', documento: 'CTF', situacao: 'ativo', validade: '31/10/2025' },
  { id: 6, numeroCadri: 'CADRI-2024-006', gerador: 'Metalúrgica Lambda', aterro: 'Aterro Mu', documento: 'MTR', situacao: 'inativo', validade: '01/01/2024' },
  { id: 7, numeroCadri: 'CADRI-2024-007', gerador: 'Fábrica Nu', aterro: 'Aterro Xi', documento: 'CTF', situacao: 'ativo', validade: '30/09/2025' },
]

// --------------------------------------------------------------------------
// Opções de select
// --------------------------------------------------------------------------

const documentoOptions: SelectOption[] = [
  { label: 'CTF', value: 'CTF' },
  { label: 'MTR', value: 'MTR' },
  { label: 'CADRI', value: 'CADRI' },
]

const aterroOptions: SelectOption[] = [
  { label: 'Aterro Beta S.A.', value: 'Aterro Beta S.A.' },
  { label: 'Aterro Delta', value: 'Aterro Delta' },
  { label: 'Aterro Zeta', value: 'Aterro Zeta' },
  { label: 'Aterro Theta', value: 'Aterro Theta' },
]

// --------------------------------------------------------------------------
// Cenário 1: Fluxo principal com paginação
// --------------------------------------------------------------------------

const isLoading = ref(false)
const isEmpty = ref(false)
const isDisabled = ref(false)
const hasToolbarSlot = ref(true)

const currentRows = computed(() => isEmpty.value ? [] : mockRows)

const pagination = ref<CadrisPagination>({
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 28,
})

function handleSearch(filters: CadrisFilters) {
  console.log('[DssCadrisCard.example] @search:', filters)
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

function handleClose() {
  console.log('[DssCadrisCard.example] @close')
}

function handlePagination(p: CadrisPagination) {
  pagination.value = p
  console.log('[DssCadrisCard.example] @update:pagination:', p)
}

// --------------------------------------------------------------------------
// Cenário 2: Sem paginação (dados inline)
// --------------------------------------------------------------------------

const smallRows: CadrisRow[] = mockRows.slice(0, 3)
</script>

<template>
  <!-- eslint-disable -->
  <div
    :data-theme="isDark ? 'dark' : 'light'"
    style="min-height: 100vh; padding: 24px; background: var(--dss-surface-default, #f5f5f5); font-family: Roboto, sans-serif;"
  >
    <!-- ====================================================================
         CONTROLES DO PLAYGROUND
         ==================================================================== -->
    <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; align-items: center;">
      <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600;">DssCadrisCard — Playground</h2>

      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <input type="checkbox" v-model="isDark" />
        🌙 Dark Mode
      </label>

      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <input type="checkbox" v-model="isEmpty" />
        Estado Vazio
      </label>

      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <input type="checkbox" v-model="isDisabled" />
        Disabled
      </label>

      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <input type="checkbox" v-model="hasToolbarSlot" />
        Slot toolbar-actions
      </label>
    </div>

    <!-- ====================================================================
         CENÁRIO 1: Fluxo principal — dados + paginação + interatividade
         ==================================================================== -->
    <section style="margin-bottom: 32px;">
      <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 12px; color: var(--dss-text-secondary, #666);">
        Cenário 1 — Fluxo Principal (com paginação)
      </h3>

      <DssCadrisCard
        :rows="currentRows"
        :loading="isLoading"
        :pagination="pagination"
        :disable="isDisabled"
        :documento-options="documentoOptions"
        :aterro-options="aterroOptions"
        @search="handleSearch"
        @close="handleClose"
        @update:pagination="handlePagination"
      >
        <template v-if="hasToolbarSlot" #toolbar-actions>
          <button
            style="
              padding: 6px 12px;
              border: 1px solid var(--dss-gray-300, #d1d5db);
              border-radius: 4px;
              background: transparent;
              cursor: pointer;
              font-size: 0.875rem;
            "
            title="Exportar dados"
          >
            ↓ Exportar
          </button>
        </template>
      </DssCadrisCard>
    </section>

    <!-- ====================================================================
         CENÁRIO 2: Sem paginação — dados inline
         ==================================================================== -->
    <section style="margin-bottom: 32px;">
      <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 12px; color: var(--dss-text-secondary, #666);">
        Cenário 2 — Sem Paginação
      </h3>

      <DssCadrisCard
        :rows="smallRows"
        :documento-options="documentoOptions"
        :aterro-options="aterroOptions"
        @search="handleSearch"
        @close="handleClose"
      />
    </section>

    <!-- ====================================================================
         CENÁRIO 3: Estado de loading direto
         ==================================================================== -->
    <section>
      <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 12px; color: var(--dss-text-secondary, #666);">
        Cenário 3 — Estado Loading (fixo)
      </h3>

      <DssCadrisCard
        :rows="[]"
        :loading="true"
        :documento-options="documentoOptions"
        :aterro-options="aterroOptions"
        @search="handleSearch"
        @close="handleClose"
      />
    </section>
  </div>
</template>
