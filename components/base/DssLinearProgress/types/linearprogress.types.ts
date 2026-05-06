// DssLinearProgress — TypeScript interfaces

export type LinearProgressColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
export type LinearProgressSize  = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type LinearProgressBrand = 'hub' | 'water' | 'waste'

export interface LinearProgressProps {
  /** Progresso (0.0–1.0). Omitir ativa estado indeterminado automaticamente. */
  value?: number
  /** Força estado indeterminado independente de value. */
  indeterminate?: boolean
  /** Inverte a direção do preenchimento/animação. */
  reverse?: boolean
  /** Cor semântica DSS da barra de progresso. Padrão: 'primary'. */
  color?: LinearProgressColor
  /** Altura da barra via tokens DSS. Padrão: 'md'. */
  size?: LinearProgressSize
  /** Contexto de brand Sansys. */
  brand?: LinearProgressBrand
  /** Aplica padrão listrado à barra de progresso. */
  stripe?: boolean
  /** Reduz opacidade ao nível desabilitado (não interativo). */
  disable?: boolean
}

// Sem eventos e sem slots: componente visual puro não interativo — DssBadge (Golden Reference)
// defineEmits e defineSlots omitidos completamente na implementação (CLAUDE.md)
