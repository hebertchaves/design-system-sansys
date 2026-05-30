// ==========================================================================
// DssFooter — Types
// ==========================================================================

export type FooterProps = {
  /** Aplica sombra de elevação projetada para cima (EXC-05) para destacar o footer. */
  elevated?: boolean
  /** Aplica borda superior sutil em vez de sombra. Alternativa flat ao elevated. */
  bordered?: boolean
}

export type FooterSlots = {
  /** Conteúdo do footer. Deve conter exclusivamente componentes DssToolbar. */
  default(): void
}
