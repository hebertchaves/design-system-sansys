<script setup lang="ts">
/**
 * ==========================================================================
 * DssDataCard — 1-structure/DssDataCard.ts.vue (Implementação Canônica)
 * ==========================================================================
 *
 * Componente Fase 3 do DSS — Golden Context para composição profunda.
 * Composição: DssCard › DssToolbar + DssTabs + DssTabPanels + Paginação interna
 *
 * 5 PADRÕES OBRIGATÓRIOS DA FASE 3:
 * 1. inheritAttrs: false → v-bind="$attrs" aplicado no DssCard raiz
 * 2. provide/inject tipado → disabled propaga sem prop drilling (DATA_CARD_DISABLED_KEY)
 * 3. CSS Variables → brand propaga via [data-brand] sem prop drilling
 * 4. Sem :deep() para layout → layout controlado por classes próprias
 * 5. Slots dinâmicos → tab-{name} para conteúdo de cada aba
 *
 * @version 1.0.0
 * @phase 3
 */

import { computed, ref, toRef, useAttrs } from 'vue'
import type { DataCardProps, DataCardEmits } from '../types/datacard.types'
import { provideDataCardDisabled, usePagination } from '../composables/useDataCard'

// Componentes DSS — Entry Point Wrappers (via barrel ou wrapper raiz)
import DssCard from '../../../base/DssCard/DssCard.vue'
import { DssCardSection } from '../../../base/DssCard'
import DssToolbar from '../../../base/DssToolbar/DssToolbar.vue'
import DssTabs from '../../../base/DssTabs/DssTabs.vue'
import DssTab from '../../../base/DssTab/DssTab.vue'
import DssTabPanels from '../../../base/DssTabPanels/DssTabPanels.vue'
import DssTabPanel from '../../../base/DssTabPanel/DssTabPanel.vue'
import DssButton from '../../../base/DssButton/DssButton.vue'

// --------------------------------------------------------------------------
// Configuração
// --------------------------------------------------------------------------

defineOptions({
  name: 'DssDataCard',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DataCardProps>(), {
  variant: 'elevated',
  brand: null,
  tabs: () => [],
  totalItems: 0,
  itemsPerPage: 10,
  modelValue: 1,
  disabled: false,
  loading: false,
})

const emit = defineEmits<DataCardEmits>()
const attrs = useAttrs()

// --------------------------------------------------------------------------
// Estado de aba ativa
// --------------------------------------------------------------------------

const activeTab = ref<string | number>(props.tabs?.[0]?.name ?? '')

function onTabChange(tabName: string | number): void {
  activeTab.value = tabName
  emit('tab-change', tabName)
}

// --------------------------------------------------------------------------
// Provide: disabled para toda a árvore (sem prop drilling)
// --------------------------------------------------------------------------

const disabledRef = toRef(props, 'disabled')
provideDataCardDisabled(disabledRef)

// --------------------------------------------------------------------------
// Paginação
// --------------------------------------------------------------------------

const totalItemsRef = toRef(props, 'totalItems')
const itemsPerPageRef = toRef(props, 'itemsPerPage')
const currentPageRef = computed(() => props.modelValue ?? 1)

const pagination = usePagination(
  { totalItems: totalItemsRef, itemsPerPage: itemsPerPageRef, currentPage: currentPageRef },
  (_event, page) => emit('update:modelValue', page)
)

// --------------------------------------------------------------------------
// Computed helpers
// --------------------------------------------------------------------------

const hasTabs = computed(() => (props.tabs?.length ?? 0) > 0)
const showPagination = computed(
  () => pagination.totalPages.value > 0 && !props.loading
)

const rootClasses = computed(() => ({
  'dss-data-card': true,
  'dss-data-card--disabled': props.disabled,
  'dss-data-card--loading': props.loading,
}))

</script>

<template>
  <!--
    PADRÃO 1 — inheritAttrs: false
    v-bind="attrs" aplicado no DssCard raiz, não no elemento raiz do template.
    Garante que class, style e atributos do consumidor cheguem ao lugar correto.

    PADRÃO 3 — CSS Variables como canal visual
    :data-brand propaga brand para DssToolbar e DssTabs via cascata CSS —
    sem necessidade de passar a prop brand manualmente para cada filho.
  -->
  <DssCard
    v-bind="attrs"
    :variant="variant"
    :class="rootClasses"
    :data-brand="brand ?? undefined"
    :aria-busy="loading || undefined"
    :aria-disabled="disabled || undefined"
  >
    <!-- ====================================================================
         TOOLBAR INTERNA
         Brand recebida via [data-brand] no ancestral — sem prop drilling.
         ==================================================================== -->
    <div class="dss-data-card__toolbar">
      <DssToolbar>
        <div class="dss-data-card__title-group">
          <span v-if="title" class="dss-data-card__title">{{ title }}</span>
          <span v-if="subtitle" class="dss-data-card__subtitle">{{ subtitle }}</span>
        </div>

        <q-space />

        <DssButton
          variant="flat"
          icon="refresh"
          :disabled="disabled || loading"
          aria-label="Atualizar dados"
          @click="emit('refresh')"
        />

        <slot name="toolbar-actions" />
      </DssToolbar>
    </div>

    <!-- ====================================================================
         ABAS (quando configuradas)
         ==================================================================== -->
    <div v-if="hasTabs" class="dss-data-card__tabs">
      <DssTabs
        v-model="activeTab"
        :aria-label="tabsAriaLabel"
        @update:model-value="onTabChange"
      >
        <DssTab
          v-for="tab in tabs"
          :key="tab.name"
          :name="tab.name"
          :label="tab.label"
          :icon="tab.icon"
          :disable="tab.disabled || disabled"
        />
      </DssTabs>
    </div>

    <!-- ====================================================================
         CONTEÚDO — Skeleton ou Painéis
         ==================================================================== -->

    <!-- Estado de loading: skeleton -->
    <div v-if="loading" class="dss-data-card__skeleton" role="status" aria-label="Carregando conteúdo">
      <div class="dss-data-card__skeleton-line dss-data-card__skeleton-line--short" />
      <div class="dss-data-card__skeleton-line dss-data-card__skeleton-line--full" />
      <div class="dss-data-card__skeleton-line dss-data-card__skeleton-line--medium" />
      <div class="dss-data-card__skeleton-line dss-data-card__skeleton-line--full" />
      <div class="dss-data-card__skeleton-line dss-data-card__skeleton-line--short" />
    </div>

    <!-- Conteúdo real: painéis de abas ou slot default -->
    <template v-else>
      <!--
        PADRÃO 5 — Slots dinâmicos
        Cada aba expõe slot `tab-{name}`.
        Consumidor usa: <template #tab-resumo>...</template>
      -->
      <DssTabPanels v-if="hasTabs" v-model="activeTab" class="dss-data-card__content">
        <DssTabPanel
          v-for="tab in tabs"
          :key="tab.name"
          :name="tab.name"
        >
          <slot :name="`tab-${tab.name}`" />
        </DssTabPanel>
      </DssTabPanels>

      <DssCardSection v-else class="dss-data-card__content">
        <slot />
      </DssCardSection>
    </template>

    <!-- ====================================================================
         PAGINAÇÃO INTERNA
         PADRÃO 2 — provide/inject de disabled: botões de paginação recebem
         disabled via injeção (DATA_CARD_DISABLED_KEY) — sem prop drilling.
         ==================================================================== -->
    <div v-if="showPagination" class="dss-data-card__pagination">
      <span class="dss-data-card__pagination-label" aria-live="polite" role="status">
        {{ pagination.pageLabel.value }}
      </span>

      <DssButton
        variant="flat"
        icon="first_page"
        size="sm"
        :disabled="!pagination.hasPrev.value || disabled"
        aria-label="Primeira página"
        @click="pagination.goToPage(1)"
      />

      <DssButton
        variant="flat"
        icon="chevron_left"
        size="sm"
        :disabled="!pagination.hasPrev.value || disabled"
        aria-label="Página anterior"
        @click="pagination.goToPrev()"
      />

      <DssButton
        v-for="page in pagination.visiblePages.value"
        :key="page"
        variant="flat"
        size="sm"
        :label="String(page)"
        :disabled="disabled"
        :aria-label="`Ir para página ${page}`"
        :aria-current="page === currentPageRef ? 'page' : undefined"
        @click="pagination.goToPage(page)"
      />

      <DssButton
        variant="flat"
        icon="chevron_right"
        size="sm"
        :disabled="!pagination.hasNext.value || disabled"
        aria-label="Próxima página"
        @click="pagination.goToNext()"
      />

      <DssButton
        variant="flat"
        icon="last_page"
        size="sm"
        :disabled="!pagination.hasNext.value || disabled"
        aria-label="Última página"
        @click="pagination.goToPage(pagination.totalPages.value)"
      />
    </div>

    <!-- ====================================================================
         RODAPÉ
         ==================================================================== -->
    <div v-if="$slots.footer" class="dss-data-card__footer">
      <slot name="footer" />
    </div>
  </DssCard>
</template>

<style lang="scss">
@use '../DssDataCard.module.scss';
</style>
