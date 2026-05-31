export type DssPaginationSize = 'xs' | 'sm' | 'md' | 'lg'
export type DssBrand = 'hub' | 'water' | 'waste'

export interface DssPaginationProps {
  modelValue: number
  max: number
  maxPages?: number
  disable?: boolean
  readonly?: boolean
  size?: DssPaginationSize
  ellipses?: boolean
  boundaryLinks?: boolean
  directionLinks?: boolean
  flat?: boolean
  outline?: boolean
  round?: boolean
  brand?: DssBrand
  ariaLabel?: string
}

export interface DssPaginationEmits {
  (e: 'update:modelValue', value: number): void
}
