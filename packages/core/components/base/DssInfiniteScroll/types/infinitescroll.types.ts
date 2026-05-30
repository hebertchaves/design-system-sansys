// DssInfiniteScroll — TypeScript interfaces

export interface DssInfiniteScrollProps {
  /** Offset em pixels a partir do fundo do container para acionar o carregamento */
  offset?: number
  /** Debounce em milissegundos para o evento de scroll */
  debounce?: number
  /** Índice inicial de paginação passado para o primeiro evento @load */
  initialIndex?: number
  /** Seletor CSS ou referência DOM para o container de scroll pai */
  scrollTarget?: string | Element | null
  /** Modo reverso: carrega ao atingir o topo (ex: chats, feeds de mensagens) */
  reverse?: boolean
  /** Desabilita a detecção de scroll e o acionamento de @load */
  disable?: boolean
}

export interface DssInfiniteScrollEmits {
  /**
   * Disparado quando o componente precisa carregar mais conteúdo.
   * `done()` deve ser chamado ao concluir o carregamento.
   * `done(true)` sinaliza que não há mais itens — encerra o ciclo de scroll.
   */
  (e: 'load', index: number, done: (stop?: boolean) => void): void
}

export interface DssInfiniteScrollSlots {
  /** Conteúdo da lista que cresce a cada carregamento */
  default: () => unknown
  /** Indicador de carregamento customizado (padrão: DssSpinner) */
  loading: () => unknown
  /** Mensagem exibida quando done(true) é chamado — não há mais itens */
  'no-more': () => unknown
}

/** Referência exposta via defineExpose para controle programático */
export interface DssInfiniteScrollExpose {
  /** Verifica posição de scroll e carrega mais se necessário */
  poll: () => void
  /** Força carregamento independente da posição de scroll */
  trigger: () => void
  /** Reseta o índice para 0 e reativa o carregamento */
  reset: () => void
  /** Para o funcionamento do infinite scroll */
  stop: () => void
  /** Retoma o funcionamento e verifica posição */
  resume: () => void
  /** Define o índice de paginação manualmente */
  setIndex: (index: number) => void
  /** Estado reativo: carregamento em progresso */
  isLoading: Readonly<boolean>
  /** Estado reativo: sem mais itens para carregar */
  noMore: Readonly<boolean>
}
