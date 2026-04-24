<script setup lang="ts">
/**
 * ==========================================================================
 * DssDataCard — 1-structure
 * ==========================================================================
 *
 * Camada de estrutura: define props, emits, slots e lógica de estado.
 * Não contém markup — apenas o contrato de API do componente.
 *
 * @stress-test Demonstra:
 * 1. inheritAttrs: false — atributos aplicados no nó correto (DssCard raiz)
 * 2. provide/inject tipado — disabled propaga sem prop drilling
 * 3. Composição de múltiplos componentes DSS em profundidade
 */

import { computed, ref, toRef, useAttrs } from 'vue'
import type {
  DataCardProps,
  DataCardEmits,
  DataCardSlots,
  DataCardTab,
} from '../types/datacard.types'
import { provideDataCardDisabled, usePagination } from '../composables/useDataCard'

// --------------------------------------------------------------------------
// Configuração do componente
// --------------------------------------------------------------------------

defineOptions({
  name: 'DssDataCard',
  inheritAttrs: false, // ⚠️ STRESS TEST: atributos aplicados manualmente no DssCard raiz
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

defineSlots<DataCardSlots>()

// --------------------------------------------------------------------------
// Atributos passados ao DssCard raiz (inheritAttrs: false)
// --------------------------------------------------------------------------

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
// Provide: disabled para toda a árvore
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
  {
    totalItems: totalItemsRef,
    itemsPerPage: itemsPerPageRef,
    currentPage: currentPageRef,
  },
  (_, page) => emit('update:modelValue', page)
)

// --------------------------------------------------------------------------
// Computed helpers
// --------------------------------------------------------------------------

const hasTabs = computed(() => (props.tabs?.length ?? 0) > 0)
const hasPagination = computed(() => pagination.totalPages.value > 0)
const showPagination = computed(() => hasPagination.value && !props.loading)

// --------------------------------------------------------------------------
// Expõe para a camada de composição
// --------------------------------------------------------------------------

defineExpose({
  activeTab,
  onTabChange,
  hasTabs,
  hasPagination,
  showPagination,
  pagination,
  attrs,
})
</script>

<template>
  <slot />
</template>
