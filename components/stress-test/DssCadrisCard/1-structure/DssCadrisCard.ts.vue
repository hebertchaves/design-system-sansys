<script setup lang="ts">
/**
 * ==========================================================================
 * DssCadrisCard — 1-structure/DssCadrisCard.ts.vue (Implementação Canônica)
 * ==========================================================================
 *
 * Componente composto Fase 3 — interface de pesquisa e listagem de Cadris.
 * Orquestra: DssCard + DssToolbar + DssToolbarTitle + DssInput + DssSelect
 *             + DssButton + DssIcon + DssSpace + tabela nativa ARIA.
 *
 * FASE 3 — Padrões implementados:
 * 1. inheritAttrs: false → $attrs aplicado no DssCard raiz via v-bind="$attrs"
 * 2. provide/inject tipado → disabled propaga via CADRIS_CARD_DISABLED_KEY
 * 3. CSS Variables → brand via [data-brand] no elemento raiz
 * 4. Sem :deep() para layout → classes wrapper controlam layout interno
 * 5. Slots tipados → toolbar-actions (extensão da toolbar)
 *
 * @version 1.0.0
 * @phase 3
 */

import { computed, toRef, useAttrs } from 'vue'
import type { DssCadrisCardProps, DssCadrisCardEmits } from '../types/cadriscard.types'
import {
  useCadrisCardClasses,
  useCadrisFilters,
  useCadrisPagination,
  provideCadrisCardDisabled,
} from '../composables/useCadrisCard'

// Componentes DSS — Entry Point Wrappers (NUNCA 1-structure dos filhos)
import DssCard from '../../DssCard/DssCard.vue'
import DssToolbar from '../../DssToolbar/DssToolbar.vue'
import DssToolbarTitle from '../../DssToolbarTitle/DssToolbarTitle.vue'
import DssInput from '../../DssInput/DssInput.vue'
import DssSelect from '../../DssSelect/DssSelect.vue'
import DssButton from '../../DssButton/DssButton.vue'
import DssIcon from '../../DssIcon/DssIcon.vue'
import DssSpace from '../../DssSpace/DssSpace.vue'

// --------------------------------------------------------------------------
// Configuração
// --------------------------------------------------------------------------

defineOptions({
  name: 'DssCadrisCard',
  inheritAttrs: false, // ⚠️ Atributos aplicados manualmente no DssCard raiz
})

const props = withDefaults(defineProps<DssCadrisCardProps>(), {
  rows: () => [],
  loading: false,
  pagination: undefined,
  disable: false,
  documentoOptions: () => [],
  aterroOptions: () => [],
})

const emit = defineEmits<DssCadrisCardEmits>()

const attrs = useAttrs()

// --------------------------------------------------------------------------
// Classes reativas do componente raiz
// --------------------------------------------------------------------------

const { rootClasses } = useCadrisCardClasses(props)

// --------------------------------------------------------------------------
// Provide: disabled para toda a árvore interna (sem prop drilling)
// --------------------------------------------------------------------------

const disabledRef = toRef(props, 'disable')
provideCadrisCardDisabled(disabledRef)

// --------------------------------------------------------------------------
// Filtros reativos
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

const {
  hasPrev,
  hasNext,
  pageLabel,
  visiblePages,
  goToPage,
  goToPrev,
  goToNext,
  totalPages,
} = useCadrisPagination(paginationRef, (_, value) =>
  emit('update:pagination', value)
)

const showPagination = computed(
  () => totalPages.value > 0 && !props.loading
)

// --------------------------------------------------------------------------
// Estado vazio / tabela
// --------------------------------------------------------------------------

const hasRows = computed(() => (props.rows?.length ?? 0) > 0)
</script>

<template>
  <!--
    STRESS TEST — inheritAttrs: false
    v-bind="attrs" aplicado no DssCard raiz. class/style/atributos do consumidor
    chegam ao lugar correto.
  -->
  <DssCard
    v-bind="attrs"
    :class="rootClasses"
    variant="elevated"
  >
    <!-- ====================================================================
         TOOLBAR — Cabeçalho "Cadris" com ações e botão fechar
         ==================================================================== -->
    <DssToolbar class="dss-cadris-card__toolbar">
      <DssToolbarTitle class="dss-cadris-card__title">
        Cadris
      </DssToolbarTitle>

      <DssSpace />

      <!-- Slot para ações adicionais (lado direito, antes do fechar) -->
      <slot name="toolbar-actions" />

      <DssButton
        variant="flat"
        icon="close"
        :disable="disable"
        aria-label="Fechar painel de Cadris"
        @click="handleClose"
      />
    </DssToolbar>

    <!-- ====================================================================
         FILTROS — Campos de pesquisa em grid responsivo
         ==================================================================== -->
    <div class="dss-cadris-card__filters row q-pa-md q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-3">
        <DssInput
          v-model="filters.cadri"
          label="Cadri"
          :disable="disable || loading"
          clearable
        />
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <DssInput
          v-model="filters.gerador"
          label="Gerador"
          :disable="disable || loading"
          clearable
        />
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <DssSelect
          v-model="filters.documento"
          :options="documentoOptions"
          label="Documento"
          :disable="disable || loading"
          clearable
          emit-value
          map-options
        />
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <DssSelect
          v-model="filters.aterro"
          :options="aterroOptions"
          label="Aterro"
          :disable="disable || loading"
          clearable
          emit-value
          map-options
        />
      </div>
    </div>

    <!-- ====================================================================
         AÇÕES — Botões de pesquisa e fechar
         ==================================================================== -->
    <div class="dss-cadris-card__actions row q-px-md q-pb-md q-gutter-sm">
      <DssButton
        color="warning"
        label="Pesquisar"
        :loading="loading"
        :disable="disable"
        @click="handleSearch"
      />

      <DssButton
        variant="flat"
        label="FECHAR"
        :disable="disable"
        @click="handleClose"
      />
    </div>

    <!-- ====================================================================
         ÁREA DE TABELA — Loading | Vazio | Dados
         ==================================================================== -->
    <div class="dss-cadris-card__table-area">

      <!-- Estado de carregamento (skeleton) -->
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
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--md" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--lg" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--lg" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--md" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--sm" />
          <div class="dss-cadris-card__skeleton-cell dss-cadris-card__skeleton-cell--md" />
        </div>
      </div>

      <!-- Estado vazio -->
      <div
        v-else-if="!hasRows"
        class="dss-cadris-card__empty"
        role="status"
        aria-label="Nenhum resultado encontrado"
      >
        <DssIcon
          name="search_off"
          size="2.5rem"
          class="dss-cadris-card__empty-icon"
          aria-hidden="true"
        />
        <p class="dss-cadris-card__empty-message">
          Nenhum resultado encontrado
        </p>
        <p class="dss-cadris-card__empty-hint">
          Tente ajustar os filtros da pesquisa
        </p>
      </div>

      <!-- Tabela de dados -->
      <div
        v-else
        class="dss-cadris-card__table-wrapper"
      >
        <table
          class="dss-cadris-card__table"
          role="table"
          aria-label="Lista de Cadris"
        >
          <thead class="dss-cadris-card__thead">
            <tr role="row">
              <th role="columnheader" scope="col">Nº Cadri</th>
              <th role="columnheader" scope="col">Gerador</th>
              <th role="columnheader" scope="col">Aterro</th>
              <th role="columnheader" scope="col">Documento</th>
              <th role="columnheader" scope="col">Situação</th>
              <th role="columnheader" scope="col">Validade</th>
            </tr>
          </thead>

          <tbody class="dss-cadris-card__tbody">
            <tr
              v-for="row in rows"
              :key="row.id"
              class="dss-cadris-card__row"
              role="row"
            >
              <td role="cell" class="dss-cadris-card__cell">
                {{ row.numeroCadri }}
              </td>
              <td role="cell" class="dss-cadris-card__cell">
                {{ row.gerador }}
              </td>
              <td role="cell" class="dss-cadris-card__cell">
                {{ row.aterro }}
              </td>
              <td role="cell" class="dss-cadris-card__cell">
                {{ row.documento }}
              </td>
              <td role="cell" class="dss-cadris-card__cell">
                <span
                  class="dss-cadris-card__status"
                  :class="row.situacao === 'ativo'
                    ? 'dss-cadris-card__status--ativo text-positive'
                    : 'dss-cadris-card__status--inativo text-negative'"
                >
                  <DssIcon
                    :name="row.situacao === 'ativo' ? 'check_circle' : 'cancel'"
                    size="1rem"
                    aria-hidden="true"
                  />
                  {{ row.situacao === 'ativo' ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td role="cell" class="dss-cadris-card__cell">
                {{ row.validade }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ====================================================================
         PAGINAÇÃO — Botões com janela deslizante
         Botões recebem disabled via provide/inject — sem prop drilling
         ==================================================================== -->
    <div
      v-if="showPagination"
      class="dss-cadris-card__pagination row items-center justify-end q-pa-sm"
      role="navigation"
      aria-label="Paginação de Cadris"
    >
      <span class="dss-cadris-card__page-label">
        {{ pageLabel }}
      </span>

      <DssButton
        variant="flat"
        icon="chevron_left"
        size="sm"
        :disable="!hasPrev || disable"
        aria-label="Página anterior"
        @click="goToPrev"
      />

      <DssButton
        v-for="page in visiblePages"
        :key="page"
        variant="flat"
        size="sm"
        :label="String(page)"
        :color="page === pagination?.page ? 'primary' : undefined"
        :disable="disable"
        :aria-label="`Ir para página ${page}`"
        :aria-current="page === pagination?.page ? 'page' : undefined"
        @click="goToPage(page)"
      />

      <DssButton
        variant="flat"
        icon="chevron_right"
        size="sm"
        :disable="!hasNext || disable"
        aria-label="Próxima página"
        @click="goToNext"
      />
    </div>
  </DssCard>
</template>

<style lang="scss">
@use '../DssCadrisCard.module.scss';
</style>
