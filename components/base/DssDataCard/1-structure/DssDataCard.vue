<script setup lang="ts">
/**
 * ==========================================================================
 * DssDataCard — 1-structure/DssDataCard.vue (Implementação Canônica)
 * ==========================================================================
 *
 * Componente stress test da Fase 3 do DSS.
 * Composição profunda: DssCard > DssToolbar + DssTabs + DssTabPanels + Paginação
 *
 * STRESS TEST — Padrões validados:
 * 1. inheritAttrs: false → atributos aplicados no DssCard raiz via v-bind="$attrs"
 * 2. provide/inject tipado → disabled propaga sem prop drilling
 * 3. CSS Variables → brand propaga via [data-brand] sem prop drilling
 * 4. Sem :deep() para layout → separação de responsabilidades preservada
 * 5. Slots dinâmicos → tab-{name} para conteúdo de cada aba
 *
 * @version 1.0.0
 */

import { computed, ref, toRef, useAttrs } from 'vue'
import type { DataCardProps, DataCardEmits, DataCardTab } from '../types/datacard.types'
import { provideDataCardDisabled, usePagination } from '../composables/useDataCard'

// Componentes DSS consumidos
import DssCard from '../../DssCard/DssCard.vue'
import DssCardSection from '../../DssCard/1-structure/DssCardSection.ts.vue'
import DssToolbar from '../../DssToolbar/DssToolbar.vue'
import DssTabs from '../../DssTabs/DssTabs.vue'
import DssTab from '../../DssTab/DssTab.vue'
import DssTabPanels from '../../DssTabPanels/DssTabPanels.vue'
import DssTabPanel from '../../DssTabPanel/DssTabPanel.vue'
import DssButton from '../../DssButton/DssButton.vue'

// --------------------------------------------------------------------------
// Configuração
// --------------------------------------------------------------------------

defineOptions({
  name: 'DssDataCard',
  inheritAttrs: false, // ⚠️ Atributos aplicados manualmente no DssCard raiz
})

const props = withDefaults(defineProps<DataCardProps>(), {
  title: undefined,
  subtitle: undefined,
  variant: 'elevated',
  brand: null,
  tabs: () => [],
  totalItems: 0,
  itemsPerPage: 10,
  modelValue: 1,
  disabled: false,
  loading: false,
  tabsAriaLabel: undefined,
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
    STRESS TEST — inheritAttrs: false
    v-bind="attrs" aplicado aqui no DssCard raiz, não no elemento raiz do template.
    Garante que class, style e outros atributos do consumidor cheguem ao lugar certo.
  -->
  <DssCard
    v-bind="attrs"
    :variant="variant"
    :class="rootClasses"
    :data-brand="brand ?? undefined"
  >
    <!-- ====================================================================
         TOOLBAR INTERNA
         Recebe brand via [data-brand] no ancestral — sem prop drilling.
         ==================================================================== -->
    <div class="dss-data-card__toolbar">
      <DssToolbar :brand="brand ?? undefined">
        <!-- Título e subtítulo -->
        <div class="dss-data-card__title-group">
          <span v-if="title" class="dss-data-card__title">{{ title }}</span>
          <span v-if="subtitle" class="dss-data-card__subtitle">{{ subtitle }}</span>
        </div>

        <!-- Espaçador flexbox -->
        <q-space />

        <!-- Botão de refresh -->
        <DssButton
          variant="flat"
          icon="refresh"
          :disabled="disabled || loading"
          aria-label="Atualizar dados"
          @click="emit('refresh')"
        />

        <!-- Slot de ações adicionais -->
        <slot name="toolbar-actions" />
      </DssToolbar>
    </div>

    <!-- ====================================================================
         ABAS (quando configuradas)
         ==================================================================== -->
    <div v-if="hasTabs" class="dss-data-card__tabs">
      <DssTabs
        v-model="activeTab"
        :brand="brand ?? undefined"
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
    <div v-if="loading" class="dss-data-card__skeleton">
      <div class="dss-data-card__skeleton-line dss-data-card__skeleton-line--short" />
      <div class="dss-data-card__skeleton-line dss-data-card__skeleton-line--full" />
      <div class="dss-data-card__skeleton-line dss-data-card__skeleton-line--medium" />
      <div class="dss-data-card__skeleton-line dss-data-card__skeleton-line--full" />
      <div class="dss-data-card__skeleton-line dss-data-card__skeleton-line--short" />
    </div>

    <!-- Conteúdo real: painéis de abas ou slot default -->
    <template v-else>
      <!-- Com abas: DssTabPanels -->
      <DssTabPanels v-if="hasTabs" v-model="activeTab" class="dss-data-card__content">
        <DssTabPanel
          v-for="tab in tabs"
          :key="tab.name"
          :name="tab.name"
        >
          <!--
            STRESS TEST — Slots dinâmicos
            Cada aba expõe um slot nomeado `tab-{name}`.
            O consumidor usa: <template #tab-resumo>...</template>
          -->
          <slot :name="`tab-${tab.name}`" />
        </DssTabPanel>
      </DssTabPanels>

      <!-- Sem abas: slot default direto no DssCardSection -->
      <DssCardSection v-else class="dss-data-card__content">
        <slot />
      </DssCardSection>
    </template>

    <!-- ====================================================================
         PAGINAÇÃO INTERNA
         Botões de paginação recebem disabled via provide/inject — sem prop drilling.
         ==================================================================== -->
    <div v-if="showPagination" class="dss-data-card__pagination">
      <span class="dss-data-card__pagination-label">
        {{ pagination.pageLabel.value }}
      </span>

      <!-- Primeira página -->
      <DssButton
        variant="flat"
        icon="first_page"
        size="sm"
        :disabled="!pagination.hasPrev.value || disabled"
        aria-label="Primeira página"
        @click="pagination.goToPage(1)"
      />

      <!-- Página anterior -->
      <DssButton
        variant="flat"
        icon="chevron_left"
        size="sm"
        :disabled="!pagination.hasPrev.value || disabled"
        aria-label="Página anterior"
        @click="pagination.goToPrev()"
      />

      <!-- Páginas visíveis -->
      <DssButton
        v-for="page in pagination.visiblePages.value"
        :key="page"
        variant="flat"
        size="sm"
        :label="String(page)"
        :color="page === currentPageRef ? 'primary' : undefined"
        :disabled="disabled"
        :aria-label="`Ir para página ${page}`"
        :aria-current="page === currentPageRef ? 'page' : undefined"
        @click="pagination.goToPage(page)"
      />

      <!-- Próxima página -->
      <DssButton
        variant="flat"
        icon="chevron_right"
        size="sm"
        :disabled="!pagination.hasNext.value || disabled"
        aria-label="Próxima página"
        @click="pagination.goToNext()"
      />

      <!-- Última página -->
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
