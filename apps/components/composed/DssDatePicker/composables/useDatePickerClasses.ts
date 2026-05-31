import { computed } from 'vue'
import type { DssDatePickerProps } from '../types/date-picker.types'

export function useDatePickerClasses(_props: DssDatePickerProps) {
  const datePickerClasses = computed(() => ({
    'dss-date-picker': true,
  }))

  return { datePickerClasses }
}
