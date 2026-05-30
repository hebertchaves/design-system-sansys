/**
 * ==========================================================================
 * DssSpace — Composable: useSpaceClasses
 *
 * RESPONSABILIDADE: Gerar o array de classes CSS do componente DssSpace
 * a partir das props recebidas.
 *
 * LÓGICA:
 * - Sem prop `size` → apenas classe base (modo flex-grow, sem modificador)
 * - Com prop `size` → adiciona `.dss-space--size-{value}` (modo tamanho fixo)
 *
 * Este é intencionalmente o composable mais simples do DSS.
 * ==========================================================================
 */

import { computed } from 'vue'
import type { SpaceProps } from '../types/space.types'

export function useSpaceClasses(props: SpaceProps) {
  const spaceClasses = computed<string[]>(() => {
    const classes: string[] = ['dss-space']

    if (props.size !== undefined) {
      classes.push(`dss-space--size-${props.size}`)
    }

    return classes
  })

  return { spaceClasses }
}
