/**
 * ==========================================================================
 * useFileActions Composable
 * ==========================================================================
 *
 * Composable para ações do DssFile
 * Gerencia interações: foco, blur, clear, drag-and-drop
 *
 * @example
 * ```ts
 * const { handleFocus, handleBlur, handleClear, handleDragOver, handleDrop } =
 *   useFileActions(emit, qFileRef, isFocused, isDragging)
 * ```
 */

import type { Ref, SetupContext } from 'vue'
import type { FileEmits } from '../types/file.types'

// NC-04 fix: SetupContext<FileEmits>['emit'] é o padrão correto para tipar emit
// em composables que recebem emit como parâmetro. InstanceType<{ new(): ... }>
// requer um construtor de classe — não um object literal — e falha em strict mode.
type EmitFn = SetupContext<FileEmits>['emit']

/**
 * Composable para ações do campo de arquivo
 */
export function useFileActions(
  emit: EmitFn,
  // NC-05 fix: QFile não expõe `nativeEl` na API pública. O acesso ao DOM
  // é feito via `$el` (elemento raiz do componente Vue). Removido `nativeEl`.
  qFileRef: Ref<{ pickFiles: () => void; removeAtIndex: (i: number) => void; removeFile: (f: File) => void; $el: HTMLElement | null } | null>,
  isFocused: Ref<boolean>,
  isDragging: Ref<boolean>
) {
  /**
   * Trata evento de foco no campo
   */
  const handleFocus = (event: FocusEvent) => {
    isFocused.value = true
    emit('focus', event)
  }

  /**
   * Trata evento de blur no campo
   */
  const handleBlur = (event: FocusEvent) => {
    isFocused.value = false
    isDragging.value = false
    emit('blur', event)
  }

  /**
   * Limpa arquivo(s) selecionado(s)
   */
  const handleClear = () => {
    emit('update:modelValue', null)
    emit('clear')
  }

  /**
   * Trata dragover — ativa estado visual de drag
   * Chamado no wrapper .dss-file para cobrir toda a área do componente
   */
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    if (!isDragging.value) {
      isDragging.value = true
    }
  }

  /**
   * Trata dragleave — desativa estado visual de drag
   * Usa relatedTarget para verificar se saiu do componente de fato
   */
  const handleDragLeave = (event: DragEvent) => {
    // relatedTarget null = saiu para fora do documento
    // verificar se saiu do container do componente
    const target = event.currentTarget as HTMLElement
    const related = event.relatedTarget as Node | null
    if (!related || !target.contains(related)) {
      isDragging.value = false
    }
  }

  /**
   * Abre o seletor de arquivos nativo via QFile
   */
  const pickFiles = () => {
    qFileRef.value?.pickFiles()
  }

  /**
   * Remove arquivo por índice (modo múltiplo)
   */
  const removeAtIndex = (index: number) => {
    qFileRef.value?.removeAtIndex(index)
  }

  /**
   * Remove arquivo específico
   */
  const removeFile = (file: File) => {
    qFileRef.value?.removeFile(file)
  }

  /**
   * Foca no campo
   */
  const focus = () => {
    qFileRef.value?.$el?.focus()
  }

  /**
   * Remove foco do campo
   */
  const blur = () => {
    qFileRef.value?.$el?.blur()
  }

  return {
    handleFocus,
    handleBlur,
    handleClear,
    handleDragOver,
    handleDragLeave,
    pickFiles,
    removeAtIndex,
    removeFile,
    focus,
    blur
  }
}
