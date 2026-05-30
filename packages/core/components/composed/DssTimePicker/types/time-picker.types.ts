export interface DssTimePickerProps {
  modelValue?: string
  landscape?: boolean
  mask?: string
  locale?: Record<string, unknown>
  format24h?: boolean
  defaultView?: 'Hours' | 'Minutes' | 'Seconds'
  options?: (hr: number, min: number | null, sec: number | null) => boolean
  hourOptions?: number[]
  minuteOptions?: number[]
  secondOptions?: number[]
  withSeconds?: boolean
  nowBtn?: boolean
  minimal?: boolean
  readonly?: boolean
  disable?: boolean
  name?: string
  tabindex?: string | number
}

export interface DssTimePickerEmits {
  (e: 'update:modelValue', value: string): void
}

export interface DssTimePickerSlots {
  default?: () => unknown
}
