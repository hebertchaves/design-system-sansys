import { computed } from 'vue'
import type { DssFormProps } from '../types/form.types'

/**
 * Retorna as classes CSS computadas para o DssForm.
 *
 * DssForm é um container estrutural sem variantes visuais próprias —
 * a classe `dss-form` é aplicada para escopamento CSS global via
 * compound selector `.q-form.dss-form` em `2-composition/_base.scss`.
 */
export function useFormClasses(_props: DssFormProps) {
  const formClasses = computed(() => ({
    'dss-form': true
  }))

  return { formClasses }
}
