/**
 * ==========================================================================
 * DssStep — Composable: useStepClasses
 * ==========================================================================
 *
 * Computa as classes CSS do DssStep com base nas props recebidas.
 *
 * @version 1.0.0
 */

import { computed } from 'vue'
import type { StepProps } from '../types/step.types'

/**
 * Retorna as classes computadas para o elemento raiz do DssStep.
 *
 * Classes geradas:
 * - `dss-step`              — classe base (sempre presente)
 * - `dss-step--done`        — passo concluído (done=true)
 * - `dss-step--error`       — passo com erro (error=true)
 * - `dss-step--disable`     — passo desabilitado
 * - `dss-step--has-icon`    — passo com ícone customizado
 * - `dss-step--has-caption` — passo com subtítulo
 * - `dss-step--header-nav`  — cabeçalho clicável para navegação
 */
export function useStepClasses(props: Readonly<StepProps>) {
  const stepClasses = computed(() => [
    'dss-step',
    {
      'dss-step--done': props.done,
      'dss-step--error': props.error,
      'dss-step--disable': props.disable,
      'dss-step--has-icon': !!props.icon,
      'dss-step--has-caption': !!props.caption,
      'dss-step--header-nav': props.headerNav
    }
  ])

  return { stepClasses }
}
