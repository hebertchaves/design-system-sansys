import { computed } from 'vue'
import type { DssBannerProps, BannerVariant } from '../types/banner.types'

const ARIA_ROLES: Record<BannerVariant, string> = {
  default: 'status',
  info: 'status',
  success: 'status',
  warning: 'alert',
  error: 'alert',
}

const ARIA_LIVE: Record<BannerVariant, string> = {
  default: 'polite',
  info: 'polite',
  success: 'polite',
  warning: 'assertive',
  error: 'assertive',
}

export function useBannerClasses(props: DssBannerProps) {
  const variant = computed(() => props.variant ?? 'default')

  const rootClasses = computed(() => ({
    [`dss-banner--${variant.value}`]: true,
    'dss-banner--dismissible': props.dismissible,
    // `inlineActions` só era repassada ao QBanner — sem classe, não havia
    // como o CSS distinguir "ações na mesma linha" de "ações empilhadas".
    'dss-banner--inline-actions': props.inlineActions,
    // `dense` e `rounded` também vinham do QBanner (`.q-banner--dense`).
    // Sem o motor de terceiro, as classes são do próprio componente.
    'dss-banner--dense': props.dense,
    'dss-banner--rounded': props.rounded,
  }))

  const ariaRole = computed(() => ARIA_ROLES[variant.value])
  const ariaLive = computed(() => ARIA_LIVE[variant.value])

  return { rootClasses, ariaRole, ariaLive }
}
