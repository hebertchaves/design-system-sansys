// DssChatMessage — TypeScript interfaces

export type DssChatMessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error'

export interface DssChatMessageProps {
  /** Conteúdo textual da mensagem (usado quando nenhum slot default for fornecido) */
  message?: string
  /** Indica se a mensagem foi enviada pelo usuário atual (alinhamento à direita, cor de bolha distinta) */
  isMine?: boolean
  /** Carimbo de data/hora exibido na mensagem (formato legível pelo usuário, ex: "10:30") */
  timestamp?: string
  /** Valor legível por máquina para o atributo `datetime` do elemento `<time>` (ex: "2026-05-21T10:30:00") */
  datetimeValue?: string
  /** Nome do remetente (exibido acima da bolha em mensagens recebidas) */
  senderName?: string
  /** URL da imagem de avatar do remetente */
  avatarSrc?: string
  /** Status de entrega da mensagem */
  status?: DssChatMessageStatus
  /** Modo compacto — reduz espaçamento para alta densidade de mensagens */
  compact?: boolean
  /** Mensagem em estado de seleção (ex: para cópia ou exclusão) */
  selected?: boolean
  /** Controla exibição do avatar do remetente */
  showAvatar?: boolean
  /** Desabilita interações de clique e long-press */
  disable?: boolean
}

export interface DssChatMessageEmits {
  /** Emitido ao clicar na mensagem */
  (e: 'click', event: MouseEvent): void
  /** Emitido ao pressionar e segurar (~500ms) — útil para menus contextuais */
  (e: 'long-press', event: PointerEvent): void
}

export interface DssChatMessageSlots {
  /** Conteúdo principal da mensagem — substitui a prop `message` */
  default?: () => unknown
  /** Avatar customizado — substitui a renderização automática do DssAvatar */
  avatar?: () => unknown
  /** Ações contextuais (ex: responder, encaminhar, excluir) */
  actions?: () => unknown
  /** Nome do remetente customizado */
  'sender-name'?: () => unknown
}
