// DssBottomSheet — TypeScript interfaces
// Fase 2 — Nível 2 (Overlay composto)
// Wrapper DSS governado sobre QDialog do Quasar com position="bottom"

export interface DssBottomSheetProps {
  /** Controla visibilidade do bottom sheet (v-model:open) */
  open?: boolean

  /** Impede fechamento ao clicar fora ou pressionar ESC */
  persistent?: boolean

  /** Exibe o bottom sheet em altura total da tela */
  maximized?: boolean

  /** Cantos superiores quadrados em vez de arredondados */
  square?: boolean

  /** Desabilita fechamento via tecla ESC */
  noEscDismiss?: boolean

  /** Desabilita fechamento via clique no backdrop */
  noBackdropDismiss?: boolean

  /** Nome da transição de entrada */
  transitionEnter?: string

  /** Nome da transição de saída */
  transitionLeave?: string

  /** Exibe o handle visual de arrasto no topo do sheet */
  showHandle?: boolean
}

export interface DssBottomSheetEmits {
  /** Emitido para atualizar o v-model:open */
  (e: 'update:open', value: boolean): void

  /** Emitido quando o bottom sheet é aberto */
  (e: 'open'): void

  /** Emitido quando o bottom sheet é fechado */
  (e: 'close'): void

  /** Emitido antes do bottom sheet ser aberto */
  (e: 'before-open'): void

  /** Emitido antes do bottom sheet ser fechado */
  (e: 'before-close'): void
}

export interface DssBottomSheetSlots {
  /** Slot para o handle personalizado (padrão: handle visual automático via showHandle) */
  handle?: () => unknown

  /** Slot para o cabeçalho do sheet (título, botão fechar) */
  header?: () => unknown

  /** Conteúdo principal do bottom sheet */
  default?: () => unknown
}
