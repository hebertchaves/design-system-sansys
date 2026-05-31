import { computed } from 'vue'
import type { DssColorPickerProps } from '../types/color-picker.types'

export function useColorPickerClasses(_props: DssColorPickerProps) {
  const colorPickerClasses = computed(() => ({
    'dss-color-picker': true,
  }))

  return { colorPickerClasses }
}
