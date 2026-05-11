import { computed } from 'vue'
import type { DssDialogProps } from '../types/dialog.types'

export function useDialogClasses(props: DssDialogProps) {
  const dialogClasses = computed(() => ({
    'dss-dialog': true,
    'dss-dialog--maximized': props.maximized,
    'dss-dialog--full-width': props.fullWidth,
    'dss-dialog--full-height': props.fullHeight,
    'dss-dialog--seamless': props.seamless,
    [`dss-dialog--position-${props.position ?? 'standard'}`]: true
  }))

  return { dialogClasses }
}
