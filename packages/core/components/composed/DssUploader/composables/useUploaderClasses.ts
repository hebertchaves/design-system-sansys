import { computed } from 'vue'
import type { DssUploaderProps } from '../types/uploader.types'

export function useUploaderClasses(props: DssUploaderProps) {
  const rootClasses = computed(() => [
    'dss-uploader',
    `dss-uploader--${props.variant ?? 'elevated'}`,
    {
      [`dss-uploader--brand-${props.brand}`]: !!props.brand,
      'dss-uploader--disabled':               props.disable,
      'dss-uploader--readonly':               props.readonly,
    },
  ])

  return { rootClasses }
}
