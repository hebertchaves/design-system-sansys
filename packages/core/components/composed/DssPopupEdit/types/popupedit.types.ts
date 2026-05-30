/**
 * DssPopupEdit — Types
 *
 * Golden Reference: DssChip (componente interativo)
 * Golden Context: DssMenu (overlay teleportado via QMenu interno)
 */

// ==========================================================================
// PROPS
// ==========================================================================

export interface DssPopupEditProps {
  /** Valor sendo editado (v-model — NÃO é visibilidade). O popup abre via clique no elemento pai. */
  modelValue?: unknown

  /** Texto exibido como cabeçalho do popup (via QItemLabel interno do QPopupEdit). */
  title?: string

  /** Exibe botões de salvar/cancelar. DSS padrão: true. */
  buttons?: boolean

  /** Rótulo do botão de confirmação. */
  labelSet?: string

  /** Rótulo do botão de cancelamento. */
  labelCancel?: string

  /** Impede fechamento por clique externo ou tecla ESC. */
  persistent?: boolean

  /** O popup ocupa a largura total do elemento pai. */
  fit?: boolean

  /** O popup cobre o elemento pai completamente. */
  cover?: boolean

  /** Ancora de alinhamento do popup em relação ao elemento pai. */
  anchor?: string

  /** Auto-alinhamento do popup. */
  self?: string

  /** Offset de posicionamento [horizontal, vertical] em pixels. */
  offset?: [number, number]

  /** Altura máxima do popup com scroll interno. */
  maxHeight?: string

  /** Largura máxima do popup. */
  maxWidth?: string

  /** Salva automaticamente ao perder foco (sem clicar em "Salvar"). */
  autoSave?: boolean

  /** Função de validação do valor atual. Retorna true para válido ou string de erro. */
  validate?: (value: unknown) => boolean | string

  /** Ancora o popup na posição do toque (mobile). */
  touchPosition?: boolean

  /** Desabilita a abertura do popup ao clicar no elemento pai. */
  disable?: boolean
}

// ==========================================================================
// EMITS
// ==========================================================================

export interface DssPopupEditEmits {
  /** Emitido ao confirmar a edição — carrega o novo valor. */
  'update:modelValue': [value: unknown]

  /** Emitido ao clicar em "Salvar" — carrega o valor confirmado. */
  save: [value: unknown, initialValue: unknown]

  /** Emitido ao clicar em "Cancelar" — o valor original é restaurado. */
  cancel: []

  /** Emitido após o popup terminar de aparecer. */
  show: []

  /** Emitido após o popup terminar de desaparecer. */
  hide: []

  /** Emitido antes do popup iniciar abertura. */
  'before-show': []

  /** Emitido antes do popup iniciar fechamento. */
  'before-hide': []
}

// ==========================================================================
// SLOTS
// ==========================================================================

export interface DssPopupEditSlots {
  /** Conteúdo do formulário de edição (DssInput, DssSelect, etc.). */
  default(): unknown
}

// ==========================================================================
// EXPOSE
// ==========================================================================

export interface DssPopupEditExpose {
  /** Confirma a edição programaticamente. */
  set(): void

  /** Cancela a edição programaticamente. */
  cancel(): void
}
