import { computed } from 'vue'
import type { DssTimePickerProps } from '../types/time-picker.types'

export function useTimePickerClasses(_props: DssTimePickerProps) {
  const timePickerClasses = computed(() => ({
    'dss-time-picker': true,
  }))

  return { timePickerClasses }
}
