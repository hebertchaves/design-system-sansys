/**
 * ==========================================================================
 * useCadrisCard — Composable
 * ==========================================================================
 *
 * Lógica de estado do DssCadrisCard:
 * - Classes reativas do componente raiz
 * - Provide/Inject para disabled (OBJ-03 Fase 3)
 * - Paginação com janela deslizante
 */

import { computed, provide, inject, reactive, type InjectionKey, type Ref } from 'vue'
import type {
  DssCadrisCardProps,
  CadrisPagination,
  CadrisFilters,
} from '../types/cadriscard.types'

// ==========================================================================
// INJECTION KEY — Contexto de disabled (OBJ-03)
// ==========================================================================

export const CADRIS_CARD_DISABLED_KEY: InjectionKey<Ref<boolean>> =
  Symbol('dss-cadris-card-disabled')

export function provideCadrisCardDisabled(disabled: Ref<boolean>): void {
  provide(CADRIS_CARD_DISABLED_KEY, disabled)
}

export function injectCadrisCardDisabled(): Ref<boolean> {
  return inject(CADRIS_CARD_DISABLED_KEY, { value: false } as Ref<boolean>)
}

// ==========================================================================
// CLASSES REATIVAS
// ==========================================================================

export function useCadrisCardClasses(props: DssCadrisCardProps) {
  const rootClasses = computed(() => ({
    'dss-cadris-card': true,
    'dss-cadris-card--disabled': props.disable,
    'dss-cadris-card--loading': props.loading,
  }))

  return { rootClasses }
}

// ==========================================================================
// FILTROS REATIVOS
// ==========================================================================

export function useCadrisFilters() {
  const filters = reactive<CadrisFilters>({
    cadri: '',
    gerador: '',
    documento: null,
    aterro: null,
  })

  function resetFilters(): void {
    filters.cadri = ''
    filters.gerador = ''
    filters.documento = null
    filters.aterro = null
  }

  return { filters, resetFilters }
}

// ==========================================================================
// PAGINAÇÃO
// ==========================================================================

export interface UseCadrisPaginationReturn {
  totalPages: Ref<number>
  hasPrev: Ref<boolean>
  hasNext: Ref<boolean>
  pageLabel: Ref<string>
  visiblePages: Ref<number[]>
  goToPage: (page: number) => void
  goToPrev: () => void
  goToNext: () => void
}

export function useCadrisPagination(
  pagination: Ref<CadrisPagination | undefined>,
  emit: (event: 'update:pagination', value: CadrisPagination) => void
): UseCadrisPaginationReturn {
  const totalPages = computed(() => {
    if (!pagination.value || pagination.value.rowsPerPage <= 0) return 0
    return Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage)
  })

  const hasPrev = computed(() =>
    pagination.value ? pagination.value.page > 1 : false
  )

  const hasNext = computed(() =>
    pagination.value ? pagination.value.page < totalPages.value : false
  )

  const pageLabel = computed(() => {
    if (!pagination.value) return ''
    return `Página ${pagination.value.page} de ${totalPages.value}`
  })

  const visiblePages = computed<number[]>(() => {
    const total = totalPages.value
    const current = pagination.value?.page ?? 1
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

    let start = Math.max(1, current - 2)
    const end = Math.min(total, start + 4)
    start = Math.max(1, end - 4)

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })

  function goToPage(page: number): void {
    if (!pagination.value) return
    if (page < 1 || page > totalPages.value) return
    emit('update:pagination', { ...pagination.value, page })
  }

  function goToPrev(): void {
    if (hasPrev.value && pagination.value) goToPage(pagination.value.page - 1)
  }

  function goToNext(): void {
    if (hasNext.value && pagination.value) goToPage(pagination.value.page + 1)
  }

  return { totalPages, hasPrev, hasNext, pageLabel, visiblePages, goToPage, goToPrev, goToNext }
}
