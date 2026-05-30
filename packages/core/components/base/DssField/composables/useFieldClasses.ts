import { computed } from 'vue'
import type { Ref } from 'vue'
import type { FieldProps } from '../types/field.types'

export function useFieldClasses(props: FieldProps, isFocused: Ref<boolean>) {
  const rootClasses = computed(() => [
    'dss-field',
    `dss-field--${props.variant ?? 'outlined'}`,
    {
      'dss-field--dense': props.size === 'sm',
      'dss-field--focused': isFocused.value,
      'dss-field--error': props.error,
      'dss-field--disabled': props.disable,
      'dss-field--readonly': props.readonly,
      'dss-field--loading': props.loading,
      'dss-field--stack-label': props.stackLabel,
      [`dss-field--brand-${props.brand}`]: !!props.brand,
    },
  ])

  const labelClasses = computed(() => [
    'dss-field__label',
    {
      // Flutua quando focado OU quando o controle interno tem valor (sinalizado externamente)
      'dss-field__label--float': !props.stackLabel && (isFocused.value || props.hasValue),
      'dss-field__label--stack': props.stackLabel,
    },
  ])

  return { rootClasses, labelClasses }
}
