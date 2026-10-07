import { computed } from 'vue'
import type { BrandLogoProps } from '../types/brand-logo.types'

/**
 * Classes do logo. O `--brand-*` NÃO pinta nada: a cor vem de `currentColor`.
 * Ele existe como gancho de contexto — para o consumidor mirar uma marca
 * específica quando precisar, sem o componente decidir cor por ele.
 */
export function useBrandLogoClasses(props: Readonly<BrandLogoProps>) {
  const logoClasses = computed(() => ({
    'dss-brand-logo': true,
    [`dss-brand-logo--${props.size ?? 'md'}`]: true,
    [`dss-brand-logo--${props.variant ?? 'full'}`]: true,
  }))

  return { logoClasses }
}
