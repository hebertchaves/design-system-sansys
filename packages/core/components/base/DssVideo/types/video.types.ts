export interface DssVideoProps {
  src?: string
  title?: string
  decorative?: boolean
  ratio?: number | string
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

export interface DssVideoSlots {
  default: () => unknown
}
