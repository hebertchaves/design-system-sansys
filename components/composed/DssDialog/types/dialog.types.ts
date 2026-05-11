// DssDialog — TypeScript interfaces
// Fase 2 — Nível 1 (Overlay/Dialog)
// Wrapper DSS governado sobre QDialog do Quasar

export type DssDialogPosition = 'standard' | 'top' | 'bottom' | 'left' | 'right'

export interface DssDialogProps {
  /** Controla visibilidade do diálogo (v-model:open) */
  open?: boolean

  /** Impede fechamento ao clicar fora do diálogo ou pressionar ESC */
  persistent?: boolean

  /** Remove o backdrop e permite interação com o conteúdo abaixo */
  seamless?: boolean

  /** Exibe o diálogo em tela cheia */
  maximized?: boolean

  /** Ocupa 100% da largura disponível */
  fullWidth?: boolean

  /** Ocupa 100% da altura disponível */
  fullHeight?: boolean

  /** Define a posição do diálogo na tela */
  position?: DssDialogPosition

  /** Nome da transição de entrada (ex: 'fade', 'slide-up') */
  transitionEnter?: string

  /** Nome da transição de saída (ex: 'fade', 'slide-down') */
  transitionLeave?: string

  /** Desabilita fechamento via tecla ESC */
  disableEsc?: boolean

  /** Desabilita fechamento via clique no backdrop */
  disableBackdropClick?: boolean
}

export interface DssDialogEmits {
  /** Emitido para atualizar o v-model:open */
  (e: 'update:open', value: boolean): void

  /** Emitido quando o diálogo é aberto */
  (e: 'open'): void

  /** Emitido quando o diálogo é fechado */
  (e: 'close'): void

  /** Emitido antes do diálogo ser aberto */
  (e: 'before-open'): void

  /** Emitido antes do diálogo ser fechado */
  (e: 'before-close'): void
}

export interface DssDialogSlots {
  /** Slot para o cabeçalho do diálogo (título, botão fechar) */
  header?: () => unknown

  /** Conteúdo principal do diálogo */
  default?: () => unknown

  /** Slot para o rodapé do diálogo (botões de ação) */
  footer?: () => unknown
}
