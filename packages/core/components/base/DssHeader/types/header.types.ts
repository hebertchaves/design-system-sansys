// ==========================================================================
// DssHeader — Types
// ==========================================================================

export type HeaderProps = {
  /** Aplica sombra de elevação (--dss-elevation-2) para destacar o header. */
  elevated?: boolean
  /** Aplica borda inferior sutil em vez de sombra. Alternativa flat ao elevated. */
  bordered?: boolean
}

export type HeaderSlots = {
  /** Conteúdo do header. Deve conter exclusivamente componentes DssToolbar. */
  default(): void
}
