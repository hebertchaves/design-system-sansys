// DssTimeline — TypeScript interfaces

export type DssTimelineLayout = 'dense' | 'comfortable' | 'loose'
export type DssTimelineSide = 'left' | 'right'

/**
 * Cor SEMÂNTICA padrão dos marcadores da linha.
 *
 * Mesmo vocabulário do DssTimelineEntry — e a entrada continua podendo
 * sobrescrever a sua. Existe porque a escolha costuma ser da LINHA inteira
 * ("esta é a trilha de erros"), e porque o Preview Frame só consegue exercitar
 * props do container: sem ela, a variação de cor não tinha como ser testada ali.
 */
export type DssTimelineColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

export interface DssTimelineProps {
  /**
   * Controla o espaçamento entre os itens da linha do tempo.
   * - 'dense': espaçamento mínimo, compacto
   * - 'comfortable': espaçamento equilibrado (padrão)
   * - 'loose': espaçamento generoso
   */
  /**
   * Cor semântica PADRÃO dos marcadores. Cada DssTimelineEntry pode sobrescrever
   * com a própria prop `color`. Sem valor, o marcador usa o neutro — ou a marca,
   * quando há `[data-brand]` num ancestral.
   */
  color?: DssTimelineColor
  layout?: DssTimelineLayout
  /**
   * Define de qual lado os itens aparecem em relação à linha central.
   * Sobrescrito individualmente por cada DssTimelineEntry.
   */
  side?: DssTimelineSide
}

/**
 * PROPS DO QTimeline BLOQUEADAS PELO DSS
 * ---------------------------------------
 *
 * `dark` — REMOVIDA em set/2026. Não é preferência de estilo: a prop era
 * ESTRUTURALMENTE INERTE aqui. Tudo que `.q-timeline--dark` faz é
 * `color: #fff` na raiz e `opacity: .7` no subtítulo (conferido no
 * `quasar.css`), e o DSS declara essas duas propriedades com regras unlayered,
 * que vencem as do `@layer quasar`. Marcar o toggle não mudava um pixel — e uma
 * prop que não faz nada é pior que uma prop ausente, porque promete controle.
 *
 * O tema é governado GLOBALMENTE por `[data-theme="dark"]`, como em todo o DSS.
 * Nenhum consumidor passava `dark` (conferido por grep no repo).
 */

export interface DssTimelineSlots {
  /** Slot principal — aceita componentes DssTimelineEntry */
  default: () => unknown
}
