import { computed } from 'vue'
import type { SectionTitleProps } from '../types/section-title.types'

export function useSectionTitleClasses(props: Readonly<SectionTitleProps>) {
  const titleClasses = computed(() => ({
    'dss-section-title': true,
    [`dss-section-title--${props.size ?? 'md'}`]: true,
    [`dss-section-title--accent-${props.accent ?? 'brand'}`]: true,
    [`dss-section-title--brand-${props.brand}`]: Boolean(props.brand),
  }))

  return { titleClasses }
}
