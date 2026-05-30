// DssTimelineEntry — TypeScript interfaces

export type DssTimelineEntrySide = 'left' | 'right'

export interface DssTimelineEntryProps {
  /**
   * Quando true, renderiza como cabeçalho/separador visual dentro da timeline.
   * Ocupa toda a largura disponível sem ponto/conector.
   */
  heading?: boolean
  /**
   * Tag HTML raiz do item. Padrão: 'li'.
   */
  tag?: string
  /**
   * Sobrescreve o lado (left|right) definido no DssTimeline pai.
   */
  side?: DssTimelineEntrySide
  /**
   * Nome do ícone Material Icons exibido no marcador do item.
   * Não utilizado se o slot #icon estiver preenchido.
   */
  icon?: string
  /**
   * URL de imagem de avatar exibida no lugar do ícone.
   * Tem precedência sobre a prop `icon`.
   */
  avatar?: string
  /**
   * Título textual do evento.
   * Pode ser sobrescrito com o slot #title.
   */
  title?: string
  /**
   * Subtítulo textual — geralmente data/hora do evento.
   * Pode ser sobrescrito com o slot #subtitle.
   */
  subtitle?: string
}

export interface DssTimelineEntrySlots {
  /** Conteúdo principal do item (corpo do evento). */
  default: () => unknown
  /** Slot para customizar o título com badges, ícones ou markup rico. */
  title: () => unknown
  /** Slot para customizar o subtítulo com formatação especial de data/hora. */
  subtitle: () => unknown
  /** Slot para customizar o marcador/ícone com SVG ou componente customizado. */
  icon: () => unknown
}
