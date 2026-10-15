import { computed, inject, provide, toRef, type Ref } from 'vue'
import type { DssCompositionContext, DssCompositionProps } from '../types/composition.types'
import { DSS_COMPOSITION_KEY } from '../types/composition.types'

export function useCompositionClasses(props: Readonly<DssCompositionProps>, invalid: Ref<boolean>) {
  const rootClasses = computed(() => [
    'dss-composition',
    invalid.value && 'dss-composition--invalid',
    props.disabled && 'dss-composition--disabled',
  ].filter(Boolean))
  return { rootClasses }
}

export function provideCompositionContext(props: Readonly<DssCompositionProps>) {
  const context: DssCompositionContext = { disabled: toRef(props, 'disabled') as Ref<boolean> }
  provide(DSS_COMPOSITION_KEY, context)
  return context
}

export function useCompositionContext() {
  return inject(DSS_COMPOSITION_KEY, undefined)
}
