// DssPullToRefresh — TypeScript interfaces

export type PullToRefreshSize = 'sm' | 'md' | 'lg'

export interface DssPullToRefreshProps {
  /** Desativa a funcionalidade de puxar para atualizar */
  disabled?: boolean

  /** Desativa interação via mouse (apenas toque habilitado) */
  noMouse?: boolean

  /** Ícone Material exibido no indicador de pull. Padrão: 'refresh' (Quasar) */
  icon?: string

  /** Tamanho visual do indicador de pull */
  size?: PullToRefreshSize
}

export interface DssPullToRefreshEmits {
  /**
   * Emitido quando a ação de puxar é concluída e a atualização deve iniciar.
   * A aplicação DEVE chamar `done()` quando a atualização for concluída.
   * Não chamar `done()` deixa o spinner girando indefinidamente.
   */
  (e: 'refresh', done: () => void): void
}

export interface DssPullToRefreshSlots {
  /** Conteúdo da área deslizável (lista, feed, grade, etc.) */
  default: () => unknown
}
