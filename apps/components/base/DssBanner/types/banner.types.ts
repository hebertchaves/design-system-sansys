// DssBanner — TypeScript interfaces

export type BannerVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

export interface DssBannerProps {
  /** Variante semântica do banner */
  variant?: BannerVariant

  /** Nome do ícone Material Icons (opcional; se omitido, usa ícone padrão da variante) */
  icon?: string

  /** Exibe botão de fechar */
  dismissible?: boolean

  /** Rótulo acessível do botão fechar */
  dismissLabel?: string

  /** Modo compacto (reduz padding) */
  dense?: boolean

  /** Aplica bordas arredondadas */
  rounded?: boolean

  /** Ações exibidas inline com o conteúdo (ao invés de abaixo) */
  inlineActions?: boolean
}

export interface DssBannerEmits {
  /** Emitido quando o usuário clica no botão fechar */
  (e: 'dismiss'): void
}

export interface DssBannerSlots {
  /** Conteúdo principal (mensagem do banner) */
  default: () => unknown

  /** Área de avatar/ícone — sobrescreve a prop `icon` */
  avatar: () => unknown

  /** Ações personalizadas — sobrescreve o botão de fechar padrão do `dismissible` */
  actions: () => unknown
}
