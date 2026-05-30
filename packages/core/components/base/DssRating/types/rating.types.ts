export type RatingBrand = 'hub' | 'water' | 'waste'

export interface RatingProps {
  modelValue: number
  max?: number
  size?: string
  icon?: string | string[]
  iconSelected?: string | string[]
  iconHalf?: string | string[]
  noReset?: boolean
  readonly?: boolean
  disable?: boolean
  tabindex?: number | string
  name?: string
  brand?: RatingBrand
}

export interface RatingEmits {
  (e: 'update:modelValue', value: number): void
}

export interface RatingSlots {
  // QRating não expõe slots públicos — conteúdo dos ícones é text-based (Material Icons)
}
