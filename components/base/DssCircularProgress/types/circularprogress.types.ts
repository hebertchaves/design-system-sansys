// DssCircularProgress — TypeScript interfaces

export type CircularProgressColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
export type CircularProgressSize  = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type CircularProgressBrand = 'hub' | 'water' | 'waste'

export interface CircularProgressProps {
  /** Valor atual do progresso (min..max). Omitir + indeterminate ativa animação contínua. */
  value?: number
  /** Valor mínimo. Padrão: 0. */
  min?: number
  /** Valor máximo. Padrão: 100. */
  max?: number
  /** Cor semântica DSS do arco de progresso. Padrão: 'primary'. */
  color?: CircularProgressColor
  /** Tamanho do componente via tokens DSS. Padrão: 'md'. */
  size?: CircularProgressSize
  /** Contexto de brand Sansys. */
  brand?: CircularProgressBrand
  /** Força estado indeterminado (animação contínua). */
  indeterminate?: boolean
  /** Espessura do traço (0–1, relativo ao raio). Padrão: 0.2. */
  thickness?: number
  /** Ângulo de início do arco em graus. Padrão: 0. */
  angle?: number
  /** Inverte a direção do preenchimento/animação. */
  reverse?: boolean
  /** Remove transição de valor (feedback imediato, sem animação de fill). */
  instantFeedback?: boolean
  /** Reduz opacidade ao nível desabilitado (não interativo). */
  disable?: boolean
}

export interface CircularProgressSlots {
  /** Conteúdo renderizado no centro do círculo (ex: rótulo de percentual, ícone). */
  default?: () => unknown
}

// Sem eventos — componente visual puro não interativo (padrão DssBadge / DssLinearProgress)
// defineEmits omitido completamente na implementação (CLAUDE.md)
