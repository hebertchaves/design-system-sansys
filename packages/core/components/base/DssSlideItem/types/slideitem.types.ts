// DssSlideItem — TypeScript interfaces

export type DssSlideItemActionColor = 'error' | 'success' | 'warning' | 'info'

export interface DssSlideItemProps {
  /** Desabilita o gesto de swipe */
  disable?: boolean
  /** Cor semântica DSS da área revelada ao deslizar para a direita (slot left) */
  leftColor?: DssSlideItemActionColor
  /** Cor semântica DSS da área revelada ao deslizar para a esquerda (slot right) */
  rightColor?: DssSlideItemActionColor
}

export interface DssSlideItemActionDetails {
  /** Lado que foi ativado */
  side: 'left' | 'right' | 'top' | 'bottom'
  /** Reseta o item para a posição original */
  reset: () => void
}

export interface DssSlideItemSlideDetails {
  /** Lado sendo deslizado */
  side: 'left' | 'right' | 'top' | 'bottom'
  /** Razão (0–1) de quanto foi deslizado */
  ratio: number
  /** Se está voltando para a posição original */
  isReset: boolean
}

export interface DssSlideItemEmits {
  (e: 'action', details: DssSlideItemActionDetails): void
  (e: 'slide', details: DssSlideItemSlideDetails): void
}

export interface DssSlideItemSlots {
  /** Conteúdo principal do item (sempre visível) */
  default: () => unknown
  /** Ações reveladas ao deslizar para a direita */
  left?: (scope: { reset: () => void }) => unknown
  /** Ações reveladas ao deslizar para a esquerda */
  right?: (scope: { reset: () => void }) => unknown
}
