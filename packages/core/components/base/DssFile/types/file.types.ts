/**
 * ==========================================================================
 * DssFile TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssFile
 * Wrapper controlado do QFile (Quasar), governado pelo DSS v2.4
 *
 * @see https://quasar.dev/vue-components/file
 * @version 1.0.0
 */

import type { Ref } from 'vue'

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do campo de arquivo
 */
export type FileVariant = 'filled' | 'outlined' | 'standout' | 'borderless'

/**
 * Marcas do sistema Sansys
 */
export type FileBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssFile
 *
 * @example
 * ```vue
 * <DssFile
 *   v-model="selectedFile"
 *   label="Anexar documento"
 *   accept=".pdf,.doc,.docx"
 *   :max-file-size="5242880"
 *   clearable
 * />
 * ```
 */
export interface FileProps {
  // ========================================
  // Model
  // ========================================

  /**
   * Arquivo(s) selecionado(s) (v-model)
   * `null` quando nenhum arquivo selecionado
   */
  modelValue?: File | File[] | null

  // ========================================
  // File Selection
  // ========================================

  /**
   * Permite seleção de múltiplos arquivos
   * @default false
   */
  multiple?: boolean

  /**
   * Tipos de arquivo aceitos (MIME types ou extensões)
   * @example '.pdf,.doc' | 'image/*' | 'application/pdf'
   */
  accept?: string

  /**
   * Número máximo de arquivos (apenas quando `multiple=true`)
   * @default undefined (ilimitado)
   */
  maxFiles?: number

  /**
   * Tamanho máximo por arquivo em bytes
   * @default undefined (ilimitado)
   * @example 5242880 (5MB)
   */
  maxFileSize?: number

  // ========================================
  // Visual
  // ========================================

  /**
   * Variante visual do campo
   * @default 'outlined'
   */
  variant?: FileVariant

  /**
   * Versão compacta (menor altura)
   * @default false
   */
  dense?: boolean

  /**
   * Marca Sansys (Hub, Water, Waste)
   * @default null
   */
  brand?: FileBrand | null

  // ========================================
  // Content
  // ========================================

  /**
   * Label do campo (floating label)
   */
  label?: string

  /**
   * Label sempre visível no topo (não flutua)
   * @default false
   */
  stackLabel?: boolean

  /**
   * Placeholder exibido quando nenhum arquivo selecionado
   */
  placeholder?: string

  /**
   * Texto de ajuda exibido abaixo do campo
   */
  hint?: string

  /**
   * Mensagem de erro exibida abaixo do campo
   */
  errorMessage?: string

  // ========================================
  // State
  // ========================================

  /**
   * Estado de erro (muda cor para negativo)
   * @default false
   */
  error?: boolean

  /**
   * Campo desabilitado
   * @default false
   */
  disabled?: boolean

  /**
   * Campo somente leitura (não pode selecionar novos arquivos)
   * @default false
   */
  readonly?: boolean

  // ========================================
  // Features
  // ========================================

  /**
   * Mostra botão de limpar quando há arquivo selecionado
   * @default false
   */
  clearable?: boolean

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Label de acessibilidade customizado para screen readers
   */
  ariaLabel?: string

  /**
   * Label do botão de limpar para screen readers
   * @default 'Remover arquivo selecionado'
   */
  clearAriaLabel?: string

  /**
   * Tabindex customizado
   * @default null (usa 0 por padrão)
   */
  tabindex?: number | string | null
}

/**
 * Eventos emitidos pelo DssFile
 */
export interface FileEmits {
  /**
   * Emitido quando arquivo(s) selecionado(s) mudam (v-model)
   */
  (e: 'update:modelValue', value: File | File[] | null): void

  /**
   * Emitido quando arquivo(s) são adicionados
   */
  (e: 'add', files: { files: readonly File[]; index: number }[]): void

  /**
   * Emitido quando arquivo é removido
   */
  (e: 'remove', files: { files: readonly File[]; index: number }[]): void

  /**
   * Emitido quando arquivos são rejeitados (maxFileSize, accept, maxFiles)
   */
  (e: 'rejected', rejections: { failedPropValidation: string; file: File }[]): void

  /**
   * Emitido quando o campo recebe foco
   */
  (e: 'focus', event: FocusEvent): void

  /**
   * Emitido quando o campo perde foco
   */
  (e: 'blur', event: FocusEvent): void

  /**
   * Emitido quando a seleção é limpa via botão clear
   */
  (e: 'clear'): void
}

/**
 * Slots do DssFile
 */
export interface FileSlots {
  /**
   * Conteúdo dentro do campo, à esquerda (ex: ícone de anexo)
   */
  prepend?(): any

  /**
   * Conteúdo dentro do campo, à direita (ex: botão de upload)
   */
  append?(): any

  /**
   * Mensagem de erro customizada
   */
  error?(): any

  /**
   * Texto de ajuda customizado
   */
  hint?(): any
}

/**
 * Referências expostas pelo DssFile
 */
export interface FileExpose {
  /**
   * Abre o seletor de arquivos nativo
   */
  pickFiles: () => void

  /**
   * Remove arquivo por índice (modo múltiplo)
   */
  removeAtIndex: (index: number) => void

  /**
   * Remove arquivo específico
   */
  removeFile: (file: File) => void

  /**
   * Foca no campo
   */
  focus: () => void

  /**
   * Remove foco do campo
   */
  blur: () => void
}

// ==========================================================================
// TIPOS AUXILIARES
// ==========================================================================

/**
 * Estado interno do campo (para composables)
 */
export interface FileState {
  /** Campo está focado */
  isFocused: boolean
  /** Campo tem arquivo selecionado */
  hasValue: boolean
  /** Arrastar arquivo sobre o campo ativo */
  isDragging: boolean
  /** Deve mostrar área inferior (hint/error) */
  hasBottomSlot: boolean
}
