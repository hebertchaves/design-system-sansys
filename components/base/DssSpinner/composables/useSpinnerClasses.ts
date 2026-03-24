import { computed } from 'vue'
import type { SpinnerProps } from '../types/spinner.types'

/**
 * Gera as classes CSS do DssSpinner.
 *
 * Classes geradas:
 *   dss-spinner                   — sempre presente
 *   dss-spinner--type-{type}      — variante gráfica
 *   dss-spinner--size-{size}      — dimensão via --dss-icon-size-*
 *   dss-spinner--color-{color}    — cor semântica (ausente quando color=null/inherit)
 *   dss-spinner--brand-{brand}    — brand (ausente quando brand=null)
 */
export function useSpinnerClasses(props: SpinnerProps) {
  const spinnerClasses = computed(() => {
    const classes: Record<string, boolean> = {
      'dss-spinner': true,
      [`dss-spinner--type-${props.type ?? 'standard'}`]: true,
      [`dss-spinner--size-${props.size ?? 'md'}`]: true,
    }

    // Cor só é adicionada quando explicitamente definida
    // null = herda currentColor do contexto (padrão)
    if (props.color) {
      classes[`dss-spinner--color-${props.color}`] = true
    }

    // Brand class para CSS scoping
    if (props.brand) {
      classes[`dss-spinner--brand-${props.brand}`] = true
    }

    return classes
  })

  return { spinnerClasses }
}
