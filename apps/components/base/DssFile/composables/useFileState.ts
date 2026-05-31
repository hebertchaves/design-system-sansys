/**
 * ==========================================================================
 * useFileState Composable
 * ==========================================================================
 *
 * Composable para gerenciar estado interno do DssFile
 * Gerencia foco, valor, drag-and-drop e visibilidade de slots
 *
 * @example
 * ```ts
 * const { isFocused, hasValue, isDragging, hasBottomSlot } = useFileState(props, slots)
 * ```
 */

import { ref, computed, type Slots } from 'vue'
import type { FileProps } from '../types/file.types'

/**
 * Composable para estado do campo de arquivo
 */
export function useFileState(props: Readonly<FileProps>, slots: Slots) {
  /**
   * Estado de foco do campo
   */
  const isFocused = ref(false)

  /**
   * Estado de drag ativo sobre o componente
   */
  const isDragging = ref(false)

  /**
   * Verifica se o campo tem arquivo(s) selecionado(s)
   *
   * Considera valor presente quando:
   * - É um File
   * - É um array de File com pelo menos 1 elemento
   * - Não é null/undefined
   */
  const hasValue = computed(() => {
    const val = props.modelValue
    if (!val) return false
    if (Array.isArray(val)) return val.length > 0
    return val instanceof File
  })

  /**
   * Verifica se deve exibir área inferior (hint/error)
   *
   * Exibe quando:
   * - Tem errorMessage e está em estado de erro
   * - Tem hint
   * - Tem slot error customizado
   * - Tem slot hint customizado
   */
  const hasBottomSlot = computed(() => {
    return (
      (props.error && props.errorMessage) ||
      !!props.hint ||
      !!slots.error ||
      !!slots.hint
    )
  })

  return {
    isFocused,
    isDragging,
    hasValue,
    hasBottomSlot
  }
}
