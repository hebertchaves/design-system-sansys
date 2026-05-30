// ==========================================================================
// DssPageSticky — TypeScript Interfaces
// ==========================================================================

/** Posições válidas de ancoragem na viewport. Mapeadas diretamente ao QPageSticky. */
export type PageStickyPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'

export type PageStickyProps = {
  /**
   * Posição na viewport onde o elemento fixo será ancorado.
   * Repassada diretamente ao QPageSticky.
   * @default 'bottom-right'
   */
  position?: PageStickyPosition

  /**
   * Deslocamento [x, y] em pixels a partir da posição definida.
   * Repassada diretamente ao QPageSticky.
   * @default [18, 18]
   */
  offset?: [number, number]

  /**
   * Quando true, expande o elemento para ocupar toda a largura ou
   * altura da borda definida por `position`.
   * Repassada diretamente ao QPageSticky.
   * @default false
   */
  expand?: boolean

  /**
   * Prop DSS exclusiva. Aplica sombra de elevação governada pelo token
   * `--dss-elevation-2` ao container fixo, destacando-o visualmente
   * do conteúdo da página.
   * @default false
   */
  elevated?: boolean
}

export type PageStickySlots = {
  /**
   * Conteúdo fixo. Aceita qualquer elemento DSS: DssButton (FAB),
   * banners, CTAs persistentes, etc.
   */
  default(): void
}
