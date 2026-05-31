// DssKnob — TypeScript interfaces

export type KnobBrand = 'hub' | 'water' | 'waste'

export interface KnobProps {
  /** Valor atual do knob (obrigatório, bidireccional via v-model) */
  modelValue: number
  /** Valor mínimo permitido */
  min?: number
  /** Valor máximo permitido */
  max?: number
  /** Mínimo interno (restringe o modelo dentro do intervalo da trilha) */
  innerMin?: number
  /** Máximo interno (restringe o modelo dentro do intervalo da trilha) */
  innerMax?: number
  /** Incremento de valor por interação */
  step?: number
  /** Inverte a direção do progresso */
  reverse?: boolean
  /** Desativa animação ao mudar o valor (sem transição de arco) */
  instantFeedback?: boolean
  /** Apenas leitura — não editável, sem feedback visual de desabilitado */
  readonly?: boolean
  /** Desabilitado — não interativo, com opacidade reduzida */
  disable?: boolean
  /** Espessura do arco (razão 0–1 do raio) */
  thickness?: number
  /** Ângulo inicial do arco em graus */
  angle?: number
  /** Terminações arredondadas no arco de progresso */
  rounded?: boolean
  /** Índice de tabulação para navegação por teclado */
  tabindex?: number | string
  /** Tamanho visual do knob como string CSS (ex: '48px', '4rem') */
  size?: string
  /** Nome do campo para formulários nativos */
  name?: string
  /** Exibe o conteúdo do slot default no centro do knob */
  showValue?: boolean
  /** Contexto de brand DSS */
  brand?: KnobBrand
}

export interface KnobEmits {
  /** Emitido quando o valor muda durante interação (para v-model) */
  (e: 'update:modelValue', value: number): void
  /** Emitido quando a interação finaliza (mouse/touch release) */
  (e: 'change', value: number): void
  /** Emitido continuamente durante drag com o valor em tempo real */
  (e: 'drag-value', value: number): void
}

export interface KnobSlots {
  /**
   * Conteúdo exibido no centro do knob.
   * Default: valor numérico atual (modelValue).
   * Consumer pode customizar: ícone, unidade, texto contextual.
   */
  default?: () => unknown
}
