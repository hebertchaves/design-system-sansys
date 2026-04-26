// ==========================================================================
// DssPageScroller — TypeScript Interfaces
// ==========================================================================

/** Posições válidas de ancoragem na viewport. Mapeadas diretamente ao QPageScroller. */
export type PageScrollerPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'

export type PageScrollerProps = {
  /**
   * Posição na tela onde o componente flutuante será ancorado.
   * Repassada diretamente ao QPageScroller.
   * @default 'bottom-right'
   */
  position?: PageScrollerPosition

  /**
   * Deslocamento [x, y] em pixels a partir da posição definida.
   * Repassada diretamente ao QPageScroller.
   * @default [18, 18]
   */
  offset?: [number, number]

  /**
   * Quantidade de pixels que a página deve rolar antes do componente
   * se tornar visível. Repassada diretamente ao QPageScroller.
   * @default 1000
   */
  scrollOffset?: number

  /**
   * Duração da animação de scroll suave ao clicar no componente,
   * em milissegundos.
   *
   * Prop DSS: o padrão 250ms corresponde ao token --dss-duration-base (250ms).
   * Quasar usa 300ms por padrão — o DSS governa esse valor para alinhar
   * ao sistema de motion.
   *
   * ⚠️ Redução de movimento: quando prefers-reduced-motion: reduce está ativo,
   * este valor é forçado a 0ms pelo componente, garantindo conformidade WCAG 2.3.3.
   * @default 250
   */
  duration?: number

  /**
   * Quando true, o componente aparece ao rolar na direção oposta (para cima),
   * em vez de aparecer ao rolar para baixo.
   * Repassada diretamente ao QPageScroller.
   * @default false
   */
  reverse?: boolean
}

export type PageScrollerSlots = {
  /**
   * Conteúdo do scroller. Aceita qualquer elemento DSS.
   * Padrão recomendado: DssButton (round, color="primary") com ícone de seta.
   * O aria-label deve ser definido no botão interno.
   */
  default(): void
}
