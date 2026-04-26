<script setup lang="ts">
/**
 * ==========================================================================
 * DssCadrisCard — 1-structure/DssCadrisCard.ts.vue (Implementação Canônica)
 * ==========================================================================
 * Layout visual baseado no protótipo Sansys:
 * - Header escuro (bg-dark) com título "Cadris" e botão X
 * - Label "Pesquisa" + 4 filtros em linha
 * - Botão "Pesquisar" centralizado (laranja + ícone search)
 * - Label "Total Cadris" + tabela com header azul primário
 * - Paginação estilo "Linhas por página: [v] X-Y de Z [<][>]"
 * - Botão "FECHAR" no rodapé centralizado
 */

import { computed, toRef, useAttrs } from 'vue'
import type { DssCadrisCardProps, DssCadrisCardEmits } from '../types/cadriscard.types'
import {
  useCadrisCardClasses,
  useCadrisFilters,
  useCadrisPagination,
  provideCadrisCardDisabled,
} from '../composables/useCadrisCard'

// Componentes DSS — Entry Point Wrappers
// stress-test/DssCadrisCard/1-structure/ → ../../../base/<Component>/
import DssCard from '../../../base/DssCard/DssCard.vue'
import DssInput from '../../../base/DssInput/DssInput.vue'
import DssSelect from '../../../base/DssSelect/DssSelect.vue'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssIcon from '../../../base/DssIcon/DssIcon.vue'

defineOptions({
  name: 'DssCadrisCard',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DssCadrisCardProps>(), {
  rows: () => [],
  loading: false,
  pagination: undefined,
  disable: false,
  documentoOptions: () => [],
  aterroOptions: () => [],
  rowsPerPageOptions: () => [10, 25, 50],
})

const emit = defineEmits<DssCadrisCardEmits>()
const attrs = useAttrs()

// --------------------------------------------------------------------------
// Classes reativas
// --------------------------------------------------------------------------

const { rootClasses } = useCadrisCardClasses(props)

// --------------------------------------------------------------------------
// Provide: disabled para a árvore interna
// --------------------------------------------------------------------------

const disabledRef = toRef(props, 'disable')
provideCadrisCardDisabled(disabledRef)

// --------------------------------------------------------------------------
// Filtros
// --------------------------------------------------------------------------

const { filters, resetFilters } = useCadrisFilters()

function handleSearch(): void {
  emit('search', { ...filters })
}

function handleClose(): void {
  resetFilters()
  emit('close')
}

// --------------------------------------------------------------------------
// Paginação
// --------------------------------------------------------------------------

const paginationRef = computed(() => props.pagination)

const { hasPrev, hasNext, goToPrev, goToNext, totalPages } =
  useCadrisPagination(paginationRef, (_, value) => emit('update:pagination', value))

const showPagination = computed(() => totalPages.value > 0 && !props.loading)

/** Intervalo exibido: "1-12 de 65" */
const pageRange = computed(() => {
  if (!props.pagination) return ''
  const { page, rowsPerPage, rowsNumber } = props.pagination
  const start = (page - 1) * rowsPerPage + 1
  const end = Math.min(page * rowsPerPage, rowsNumber)
  return `${start}-${end} de ${rowsNumber}`
})

/** Opções de "Linhas por página" formatadas para DssSelect */
const rowsPerPageSelectOptions = computed(() =>
  props.rowsPerPageOptions.map((n) => ({ label: String(n), value: n }))
)

function handleRowsPerPageChange(newVal: number): void {
  if (!props.pagination) return
  emit('update:pagination', { ...props.pagination, rowsPerPage: newVal, page: 1 })
}

// --------------------------------------------------------------------------
// Estado da tabela
// --------------------------------------------------------------------------

const hasRows = computed(() => (props.rows?.length ?? 0) > 0)
</script>

<template>
  <DssCard
    v-bind="attrs"
    :class="rootClasses"
    variant="bordered"
    class="dss-cadris-card"
  >
    <!-- ====================================================================
         HEADER ESCURO — "Cadris" + X
         bg-dark / text-white via Quasar utility classes (Token First)
         ==================================================================== -->
    <div class="dss-cadris-card__header">
      <span class="dss-cadris-card__header-title">Cadris</span>

      <slot name="toolbar-actions" />

      <DssButton
        variant="outlined"
        icon="close"
        round
        dense
        :disable="disable"
        class="dss-cadris-card__header-close"
        aria-label="Fechar painel de Cadris"
        @click="handleClose"
      />
    </div>

    <!-- ====================================================================
         FILTROS — Label "Pesquisa" + 4 campos em linha
         ==================================================================== -->
    <div class="dss-cadris-card__pesquisa-section">
      <span class="dss-cadris-card__pesquisa-label">Pesquisa</span>
    </div>

    <div class="dss-cadris-card__filters">
      <DssInput
        v-model="filters.cadri"
        label="Cadri"
        :disable="disable || loading"
        clearable
        dense
      />
      <DssInput
        v-model="filters.gerador"
        label="Gerador"
        :disable="disable || loading"
        clearable
        dense
      />
      <DssSelect
        v-model="filters.documento"
        :options="documentoOptions"
        label="Documento"
        :disable="disable || loading"
        clearable
        emit-value
        map-options
        dense
      />
      <DssSelect
        v-model="filters.aterro"
        :options="aterroOptions"
        label="Aterro"
        :disable="disable || loading"
        clearable
        emit-value
        map-options
        dense
      />
    </div>

    <!-- ====================================================================
         ÚLTIMA LINHA DO FORM — Linhas por página
         ==================================================================== -->
    <div
      v-if="pagination"
      class="dss-cadris-card__form-pagination"
    >
      <span class="dss-cadris-card__pagination-label">Linhas por página:</span>
      <DssSelect
        :model-value="pagination.rowsPerPage"
        :options="rowsPerPageSelectOptions"
        dense
        borderless
        emit-value
        map-options
        class="dss-cadris-card__rows-select"
        :disable="disable"
        @update:model-value="handleRowsPerPageChange"
      />
    </div>

    <!-- ====================================================================
         AÇÃO DE BUSCA — Botão Pesquisar centralizado
         ==================================================================== -->
    <div class="dss-cadris-card__search-action">
      <DssButton
        unelevated
        icon="search"
        label="Pesquisar"
        class="bg-tertiary text-white"
        :loading="loading"
        :disable="disable"
        @click="handleSearch"
      />
    </div>

    <!-- ====================================================================
         LABEL "Total Cadris"
         ==================================================================== -->
    <div class="dss-cadris-card__total-label">
      Total Cadris
    </div>

    <!-- ====================================================================
         ÁREA DA TABELA — Loading | Vazio | Dados
         ==================================================================== -->
    <div class="dss-cadris-card__table-area">

      <!-- Loading skeleton -->
      <div
        v-if="loading"
        class="dss-cadris-card__skeleton"
        role="status"
        aria-busy="true"
        aria-label="Carregando dados"
      >
        <div
          v-for="i in 5"
          :key="i"
          class="dss-cadris-card__skeleton-row"
          aria-hidden="true"
        >
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--sm" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--lg" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--md" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--sm" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--sm" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--sm" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--sm" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--lg" />
        </div>
      </div>

      <!-- Estado vazio -->
      <div
        v-else-if="!hasRows"
        class="dss-cadris-card__empty"
        role="status"
        aria-label="Nenhum resultado encontrado"
      >
        <DssIcon name="search_off" size="2.5rem" class="dss-cadris-card__empty-icon" aria-hidden="true" />
        <p class="dss-cadris-card__empty-message">Nenhum resultado encontrado</p>
        <p class="dss-cadris-card__empty-hint">Tente ajustar os filtros da pesquisa</p>
      </div>

      <!-- Tabela de dados -->
      <div v-else class="dss-cadris-card__table-wrapper">
        <table class="dss-cadris-card__table" role="table" aria-label="Lista de Cadris">

          <!-- Header azul (bg-primary text-white via Quasar classes) -->
          <thead class="dss-cadris-card__thead bg-primary text-white">
            <tr role="row">
              <th role="columnheader" scope="col">Cadri</th>
              <th role="columnheader" scope="col">Gerador</th>
              <th role="columnheader" scope="col">Aterro</th>
              <th role="columnheader" scope="col">Data vencimento</th>
              <th role="columnheader" scope="col">Dias Faltantes</th>
              <th role="columnheader" scope="col">Média mensal</th>
              <th role="columnheader" scope="col">Ativo</th>
              <th role="columnheader" scope="col">Resíduos</th>
            </tr>
          </thead>

          <tbody class="dss-cadris-card__tbody">
            <tr
              v-for="row in rows"
              :key="row.id"
              class="dss-cadris-card__row"
              role="row"
            >
              <td role="cell" class="dss-cadris-card__cell">{{ row.numeroCadri }}</td>
              <td role="cell" class="dss-cadris-card__cell">{{ row.gerador }}</td>
              <td role="cell" class="dss-cadris-card__cell">{{ row.aterro }}</td>
              <td role="cell" class="dss-cadris-card__cell">{{ row.dataVencimento }}</td>
              <td role="cell" class="dss-cadris-card__cell dss-cadris-card__cell--center">
                {{ row.diasFaltantes }}
              </td>
              <td role="cell" class="dss-cadris-card__cell">{{ row.mediaMonsal }}</td>

              <!-- Ativo: ponto colorido + Sim/Não -->
              <td role="cell" class="dss-cadris-card__cell">
                <span class="dss-cadris-card__ativo" :class="row.ativo ? 'dss-cadris-card__ativo--sim' : 'dss-cadris-card__ativo--nao'">
                  <DssIcon
                    name="circle"
                    size="0.625rem"
                    :class="row.ativo ? 'text-positive' : 'text-negative'"
                    aria-hidden="true"
                  />
                  {{ row.ativo ? 'Sim' : 'Não' }}
                </span>
              </td>

              <!-- Resíduos: texto truncado + chevron de expansão -->
              <td role="cell" class="dss-cadris-card__cell">
                <span class="dss-cadris-card__residuos">
                  <span class="dss-cadris-card__residuos-text">{{ row.residuos }}</span>
                  <DssIcon name="expand_more" size="1rem" class="dss-cadris-card__residuos-chevron" aria-hidden="true" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ====================================================================
         PAGINAÇÃO — "Linhas por página: [v] X-Y de Z [<] [>]"
         ==================================================================== -->
    <!-- Navegação de páginas: range + setas (Linhas por página está no form) -->
    <div
      v-if="showPagination"
      class="dss-cadris-card__pagination row items-center justify-end"
      role="navigation"
      aria-label="Paginação de Cadris"
    >
      <span class="dss-cadris-card__pagination-range">{{ pageRange }}</span>

      <DssButton
        variant="flat"
        icon="chevron_left"
        round
        dense
        size="sm"
        :disable="!hasPrev || disable"
        aria-label="Página anterior"
        @click="goToPrev"
      />

      <DssButton
        variant="flat"
        icon="chevron_right"
        round
        dense
        size="sm"
        :disable="!hasNext || disable"
        aria-label="Próxima página"
        @click="goToNext"
      />
    </div>

    <!-- ====================================================================
         RODAPÉ — Botão FECHAR centralizado
         ==================================================================== -->
    <div class="dss-cadris-card__footer">
      <DssButton
        color="dark"
        label="FECHAR"
        :disable="disable"
        class="dss-cadris-card__fechar-btn"
        @click="handleClose"
      />
    </div>
  </DssCard>
</template>

<style lang="scss">
@use '../DssCadrisCard.module.scss';
</style>
