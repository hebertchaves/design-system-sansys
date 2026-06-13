// DssColorPicker — TypeScript interfaces

export interface DssColorPickerProps {
  modelValue?: string
  defaultValue?: string
  formatModel?: 'rgb' | 'hex' | 'hexa' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva'
  noHeader?: boolean
  noHeaderTabs?: boolean
  noFooter?: boolean
  defaultView?: 'spectrum' | 'tune' | 'palette'
  palette?: string[]
  square?: boolean
  flat?: boolean
  bordered?: boolean
  disable?: boolean
  readonly?: boolean
  name?: string
  tabindex?: string | number
}

export interface DssColorPickerEmits {
  (e: 'update:modelValue', value: string | null): void
  (e: 'change', value: string | null): void
}

export interface DssColorPickerSlots {
  default?: () => unknown
}
