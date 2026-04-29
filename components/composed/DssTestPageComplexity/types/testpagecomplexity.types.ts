// DssTestPageComplexity — TypeScript interfaces

export type TestPageBrand = 'hub' | 'water' | 'waste'
export type TestPageView  = 'dashboard' | 'map' | 'schedule'

export interface StatusCount {
  /** Ordens no prazo */
  onTime: number
  /** Ordens a vencer */
  expiring: number
  /** Ordens vencidas */
  expired: number
}

export interface FilterChip {
  id: string
  label: string
}

export interface ServiceOrderRow {
  id: string
  team: string
  hasEquipment: boolean
  code: string
  description: string
  serviceNumber: string
  hCode: string
  address: string
  neighborhood: string
}

export interface BreadcrumbItem {
  number: number
  label: string
}

export interface DssTestPageComplexityProps {
  /** Marca Sansys propagada via data-brand */
  brand?: TestPageBrand
  /** Desabilita todas as interações — propaga via provide/inject */
  disabled?: boolean
  /** Exibe skeletons de loading nas áreas de dados */
  loading?: boolean
  /** Título do módulo exibido no breadcrumb e no título da página */
  pageTitle?: string
  /** Subtítulo/view atual da página */
  pageSubtitle?: string
  /** Itens do breadcrumb */
  breadcrumbs?: BreadcrumbItem[]
  /** View ativa no toggle de visualização */
  activeView?: TestPageView
  /** Contadores de status das ordens */
  statusCounts?: StatusCount
  /** Linhas da tabela de dados */
  tableRows?: ServiceOrderRow[]
  /** Total de itens para paginação */
  totalItems?: number
  /** Página atual (v-model) */
  currentPage?: number
  /** Itens por página */
  itemsPerPage?: number
  /** Chips de filtros ativos */
  activeFilters?: FilterChip[]
}

export interface DssTestPageComplexityEmits {
  /** Emitido ao trocar de view (Dashboard/Mapa/Agenda) */
  (e: 'update:activeView', value: TestPageView): void
  /** Emitido ao trocar de página na tabela */
  (e: 'update:currentPage', value: number): void
  /** Emitido ao remover um chip de filtro */
  (e: 'filter:remove', filterId: string): void
  /** Emitido ao clicar em "Pesquisar" */
  (e: 'filter:search'): void
  /** Emitido ao clicar em uma linha da tabela */
  (e: 'row:view', row: ServiceOrderRow): void
}

export interface DssTestPageComplexitySlots {
  /** Ações extras no cabeçalho da seção de filtros */
  'filter-actions': () => unknown
  /** Ações extras no rodapé da tabela de dados */
  'table-footer': () => unknown
}

/** Symbol key para provide/inject do estado disabled */
export const PAGE_COMPLEXITY_DISABLED_KEY: InjectionKey<Readonly<Ref<boolean>>> =
  Symbol('DssTestPageComplexity:disabled')

// Evitar erro de tipo — declare globais vue
import type { InjectionKey, Ref } from 'vue'
