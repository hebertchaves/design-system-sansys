export type AjaxBarPosition = 'top' | 'bottom' | 'left' | 'right'
export type AjaxBarBrand = 'hub' | 'water' | 'waste'

export interface AjaxBarProps {
  position?: AjaxBarPosition
  size?: string
  skipHijack?: boolean
  reverse?: boolean
  hijackFilter?: (url: string) => boolean
  brand?: AjaxBarBrand
}

export interface AjaxBarEmits {
  (e: 'start'): void
  (e: 'stop'): void
}

export interface AjaxBarSlots {
  // DssAjaxBar does not expose slots — it is a single-element fixed bar.
}
