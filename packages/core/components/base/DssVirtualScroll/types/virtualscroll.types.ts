// DssVirtualScroll — TypeScript interfaces

export type VirtualScrollType = 'list' | 'table'

export interface VirtualScrollPayload {
  index: number
  from: number
  to: number
  direction: 'increase' | 'decrease'
}

export interface VirtualScrollItemScope<T = unknown> {
  item: T
  index: number
  ariaSetsize: number
  ariaPosinset: number
}

export interface DssVirtualScrollProps<T = unknown> {
  /** Array de dados a serem virtualizados */
  items: T[]
  /** Tamanho estimado de cada item em pixels (height para vertical, width para horizontal) */
  itemSize?: number
  /** Tipo semântico da lista — afeta role ARIA e renderização interna */
  type?: VirtualScrollType
  /** Seletor CSS ou referência DOM para o container de scroll pai */
  scrollTarget?: string | Element | null
  /** Número de itens renderizados simultaneamente no DOM */
  sliceSize?: number
  /** Habilita rolagem horizontal */
  horizontal?: boolean
  /** Estado de carregamento inicial ou incremental */
  loading?: boolean
  /** Desabilita o componente */
  disable?: boolean
}

export interface DssVirtualScrollEmits {
  (e: 'scroll', payload: VirtualScrollPayload): void
  (e: 'native-scroll', event: Event): void
}

export interface DssVirtualScrollSlots<T = unknown> {
  default: (scope: VirtualScrollItemScope<T>) => unknown
  prepend: () => unknown
  append: () => unknown
  loading: () => unknown
  empty: () => unknown
}
