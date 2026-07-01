/**
 * ==========================================================================
 * useDataCard — Composable
 * ==========================================================================
 *
 * Lógica de estado do DssDataCard:
 * - Gerenciamento de aba ativa
 * - Cálculo de paginação
 * - Provide/Inject para estado disabled (evita prop drilling)
 *
 * @stress-test Demonstra o padrão provide/inject tipado para
 * propagar estado de contexto sem prop drilling manual.
 */

import { computed, provide, inject, type InjectionKey, type Ref } from 'vue'

// ==========================================================================
// INJECTION KEY — Contexto de disabled
// ==========================================================================

/**
 * Chave tipada para injeção do estado disabled.
 * Componentes filhos (ex: botões de paginação internos) usam esta chave
 * para saber se devem estar desabilitados, sem receber a prop diretamente.
 */
export const DATA_CARD_DISABLED_KEY: InjectionKey<Ref<boolean>> = Symbol('dss-data-card-disabled')

/**
 * Provê o estado disabled para toda a árvore do DssDataCard.
 * Chamado apenas no componente raiz.
 */
export function provideDataCardDisabled(disabled: Ref<boolean>): void {
  provide(DATA_CARD_DISABLED_KEY, disabled)
}

/**
 * Injeta o estado disabled do DssDataCard ancestral.
 * Retorna `false` como fallback seguro se não houver ancestral.
 */
export function injectDataCardDisabled(): Ref<boolean> {
  return inject(DATA_CARD_DISABLED_KEY, { value: false } as Ref<boolean>)
}

// ==========================================================================
// PAGINAÇÃO
// ==========================================================================

export interface UsePaginationOptions {
  totalItems: Ref<number>
  itemsPerPage: Ref<number>
  currentPage: Ref<number>
}

export interface UsePaginationReturn {
  totalPages: Ref<number>
  hasPrev: Ref<boolean>
  hasNext: Ref<boolean>
  pageLabel: Ref<string>
  goToPrev: () => void
  goToNext: () => void
  goToPage: (page: number) => void
  visiblePages: Ref<number[]>
}

export function usePagination(
  options: UsePaginationOptions,
  emit: (event: 'update:modelValue', page: number) => void
): UsePaginationReturn {
  const { totalItems, itemsPerPage, currentPage } = options

  const totalPages = computed(() =>
    itemsPerPage.value > 0 ? Math.ceil(totalItems.value / itemsPerPage.value) : 0
  )

  const hasPrev = computed(() => currentPage.value > 1)
  const hasNext = computed(() => currentPage.value < totalPages.value)

  const pageLabel = computed(
    () => `Página ${currentPage.value} de ${totalPages.value}`
  )

  /**
   * Páginas visíveis — janela deslizante de até 5 páginas.
   * Evita renderizar todos os botões quando totalPages é alto.
   */
  const visiblePages = computed<number[]>(() => {
    const total = totalPages.value
    const current = currentPage.value
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

    let start = Math.max(1, current - 2)
    const end = Math.min(total, start + 4)
    start = Math.max(1, end - 4)

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })

  function goToPrev(): void {
    if (hasPrev.value) emit('update:modelValue', currentPage.value - 1)
  }

  function goToNext(): void {
    if (hasNext.value) emit('update:modelValue', currentPage.value + 1)
  }

  function goToPage(page: number): void {
    if (page >= 1 && page <= totalPages.value) {
      emit('update:modelValue', page)
    }
  }

  return { totalPages, hasPrev, hasNext, pageLabel, goToPrev, goToNext, goToPage, visiblePages }
}
