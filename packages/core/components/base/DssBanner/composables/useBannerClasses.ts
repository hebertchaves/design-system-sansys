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
  }))

  const ariaRole = computed(() => ARIA_ROLES[variant.value])
  const ariaLive = computed(() => ARIA_LIVE[variant.value])

  return { rootClasses, ariaRole, ariaLive }
}
