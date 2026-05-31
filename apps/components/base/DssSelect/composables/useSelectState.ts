/**
 * ==========================================================================
 * useSelectState Composable
 * ==========================================================================
 *
 * Composable para estado reativo do DssSelect.
 * Gerencia isFocused e hasValue derivados das props.
 *
 * @example
 * ```ts
 * const { isFocused, hasValue } = useSelectState(props)
 * ```
 */

import { ref } from 'vue'
import type { Ref } from 'vue'
import type { SelectProps } from '../types/select.types'

/**
 * Composable para estado reativo do select
 */
export function useSelectState(_props: SelectProps) {
  /**
   * Indica se o select está com foco ativo.
   * Atualizado pelos handlers handleFocus e handleBlur.
   */
  const isFocused: Ref<boolean> = ref(false)

  return { isFocused }
}
