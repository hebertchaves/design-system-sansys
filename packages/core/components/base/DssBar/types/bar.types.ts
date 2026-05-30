// DssBar — TypeScript interfaces

export interface DssBarProps {
  /** Modo compacto — reduz a altura e o padding interno (delegado ao QBar) */
  dense?: boolean
  /** Adiciona sombra de elevação à barra */
  elevated?: boolean
}

export interface DssBarSlots {
  /** Conteúdo da barra — DssButton, DssIcon, títulos, espaçadores, etc. */
  default: () => unknown
}
