export interface DssSplitterProps {
  modelValue?: number
  orientation?: 'horizontal' | 'vertical'
  limits?: [number, number]
  reverse?: boolean
  disabled?: boolean
  emitImmediately?: boolean
  unit?: '%' | 'px'
}

export interface DssSplitterEmits {
  (e: 'update:modelValue', value: number): void
}

export interface DssSplitterSlots {
  before?: () => unknown
  after?: () => unknown
  separator?: () => unknown
}
