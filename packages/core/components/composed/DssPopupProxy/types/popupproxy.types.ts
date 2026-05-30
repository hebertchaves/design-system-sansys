// DssPopupProxy — TypeScript interfaces

export interface DssPopupProxyProps {
  /** Visibilidade do popup (v-model) */
  modelValue?: boolean
  /** Largura de tela (px) abaixo da qual o popup renderiza como QDialog. Padrão: 450 */
  breakpoint?: number
  /** Elemento-alvo para ancoragem e acionamento. `false` desativa ancoragem no pai */
  target?: string | Element | boolean
  /** Não escuta eventos do elemento pai para abrir/fechar */
  noParentEvent?: boolean
  /** Abre o popup ao click com botão direito (context menu) */
  contextMenu?: boolean
  /** Não fecha ao clicar fora nem ao pressionar ESC (modo QDialog) */
  persistent?: boolean
  /** Não move o foco para o conteúdo do popup ao abrir */
  noFocus?: boolean
  /** Não retorna o foco ao elemento acionador ao fechar */
  noRefocus?: boolean
  /** Fecha o popup automaticamente ao clicar em qualquer item interno */
  autoClose?: boolean
  /** Ponto de ancoragem no elemento-alvo (ex: "bottom start") — modo QMenu */
  anchor?: string
  /** Ponto de ancoragem no próprio popup (ex: "top start") — modo QMenu */
  self?: string
  /** Deslocamento [x, y] em pixels — modo QMenu */
  offset?: [number, number]
  /** Popup assume a largura do elemento-alvo — modo QMenu */
  fit?: boolean
  /** Popup cobre completamente o elemento-alvo — modo QMenu */
  cover?: boolean
  /** Altura máxima do painel (ex: "300px", "50vh") */
  maxHeight?: string
  /** Largura máxima do painel (ex: "400px", "80vw") */
  maxWidth?: string
  /** Transição de entrada (nome de transição Vue/Quasar) */
  transitionShow?: string
  /** Transição de saída (nome de transição Vue/Quasar) */
  transitionHide?: string
  /** Container de scroll a ser monitorado para reposicionamento */
  scrollTarget?: Element | string
}

export interface DssPopupProxyEmits {
  /** Emitido ao abrir/fechar o popup (suporte a v-model) */
  (e: 'update:modelValue', value: boolean): void
  /** Emitido antes da transição de abertura */
  (e: 'beforeShow', event: Event): void
  /** Emitido após o popup estar completamente visível */
  (e: 'show', event: Event): void
  /** Emitido antes da transição de fechamento */
  (e: 'beforeHide', event: Event): void
  /** Emitido após o popup estar completamente oculto */
  (e: 'hide', event: Event): void
}

export interface DssPopupProxySlots {
  /** Conteúdo exibido dentro do popup (DssMenu, DssList, DssCard, etc.) */
  default: () => unknown
}
