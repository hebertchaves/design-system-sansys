import { computed } from 'vue'
import type { DssBottomSheetProps } from '../types/bottomsheet.types'

export function useBottomSheetClasses(props: DssBottomSheetProps) {
  const sheetClasses = computed(() => ({
    'dss-bottom-sheet': true,
    'dss-bottom-sheet--maximized': props.maximized,
    'dss-bottom-sheet--square': props.square
  }))

  return { sheetClasses }
}
