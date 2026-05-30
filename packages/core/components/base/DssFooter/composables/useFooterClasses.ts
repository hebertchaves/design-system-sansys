// ==========================================================================
// DssFooter — useFooterClasses
// ==========================================================================

import { computed } from 'vue'
import type { FooterProps } from '../types/footer.types'

export function useFooterClasses(props: Readonly<FooterProps>) {
  const footerClasses = computed(() => [
    'dss-footer',
    {
      'dss-footer--elevated': props.elevated,
      'dss-footer--bordered': props.bordered
    }
  ])

  return { footerClasses }
}
