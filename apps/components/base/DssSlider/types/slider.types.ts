/**
 * ==========================================================================
 * DssSlider - TypeScript Type Definitions
 * ==========================================================================
 *
 * Interfaces para props, emits e expose do DssSlider.
 *
 * Golden Reference: DssToggle (track + thumb mechanic, motion tokens)
 * Golden Context: DssInput (form states, error/hint pattern)
 *
 * DssSlider é um wrapper do QSlider do Quasar.
 * Diferença principal: não é um QField — slider não possui label flutuante,
 * placeholder nem variantes visuais. Hint e errorMessage são adicionados
 * pelo wrapper externo (outer div) abaixo do controle.
 *
 * @version 1.0.0
 */

/**
 * Props do DssSlider
 *
 * Subset controlado baseado no Quasar QSlider.
 * DssSlider não expõe prop `color` — a cor do controle é governada
 * exclusivamente por tokens DSS via SCSS (--dss-action-primary).
 */
export interface SliderProps {
  // =========================================================================
  // Value / Model
  // =========================================================================

  /**
   * Valor reativo do slider (v-model)
   *
   * Número entre min e max.
   */
  modelValue: number

  /**
   * Valor mínimo do slider
   * @default 0
   */
  min?: number

  /**
   * Valor máximo do slider
   * @default 100
   */
  max?: number

  /**
   * Incremento por passo
   *
   * Define o granularity do slider.
   * Use 0 para valor contínuo (sem snapping).
   *
   * @default 1
   */
  step?: number

  /**
   * Fixar valor ao passo mais próximo durante arrasto
   *
   * Quando true, o slider salta entre valores de step.
   * Requer step > 0.
   *
   * @default false
   */
  snap?: boolean

  // =========================================================================
  // Display
  // =========================================================================

  /**
   * Exibir marcadores de passo na trilha
   *
   * - true: marcadores em cada step
   * - number: marcadores a cada N unidades
   * - false: sem marcadores
   *
   * @default false
   */
  markers?: boolean | number

  /**
   * Exibir tooltip com o valor atual durante arrasto
   *
   * Quando true, tooltip aparece ao pressionar o thumb.
   * Para exibição permanente use labelAlways.
   *
   * @default false
   */
  label?: boolean

  /**
   * Exibir tooltip com o valor atual sempre visível
   *
   * Quando true, tooltip fica sempre visível (não apenas no arrasto).
   *
   * @default false
   */
  labelAlways?: boolean

  /**
   * Valor customizado exibido no tooltip
   *
   * Quando null, exibe o valor numérico atual.
   * Útil para formatar unidades: "50%" ou "$50".
   *
   * @default null
   */
  labelValue?: string | number | null

  // =========================================================================
  // Form Integration
  // =========================================================================

  /**
   * Texto de ajuda exibido abaixo do slider
   *
   * Oculto quando error=true (errorMessage toma precedência).
   */
  hint?: string

  /**
   * Mensagem de erro exibida abaixo do slider quando error=true
   *
   * Associada ao slider via aria-describedby.
   */
  errorMessage?: string

  /**
   * Ativa estado de erro
   *
   * Aplica cor --dss-feedback-error na trilha e thumb.
   * Exibe errorMessage se fornecida.
   *
   * @default false
   */
  error?: boolean

  // =========================================================================
  // States
  // =========================================================================

  /**
   * Desabilita o slider
   *
   * Aplica opacity: var(--dss-opacity-disabled) e pointer-events: none.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * Slider somente leitura
   *
   * Exibe o valor mas não permite interação do usuário.
   *
   * @default false
   */
  readonly?: boolean

  /**
   * Modo denso — reduz a área vertical do controle
   *
   * Efeitos:
   * - Reduz min-height do track-container
   * - Thumb reduzido para --dss-spacing-4 (16px)
   * - Remove touch target via track-container min-height reduzida
   *
   * @default false
   */
  dense?: boolean

  // =========================================================================
  // Orientation
  // =========================================================================

  /**
   * Orientação vertical do slider
   *
   * Quando true, o slider renderiza na vertical.
   * Requer altura definida explicitamente no container pai.
   *
   * @default false
   */
  vertical?: boolean

  /**
   * Inverte a direção do slider
   *
   * Horizontal: valor mínimo à direita, máximo à esquerda.
   * Vertical: valor mínimo no topo, máximo na base.
   *
   * @default false
   */
  reverse?: boolean

  // =========================================================================
  // Brand
  // =========================================================================

  /**
   * Marca do produto (Hub, Water, Waste)
   *
   * Aplica data-brand no elemento raiz para ativar
   * tokens de brand via _brands.scss.
   *
   * Hub: --dss-hub-600 / Water: --dss-water-500 / Waste: --dss-waste-600
   *
   * @default null
   */
  brand?: 'hub' | 'water' | 'waste' | null

  // =========================================================================
  // Accessibility
  // =========================================================================

  /**
   * Tabindex customizado para o QSlider
   *
   * Padrão: 0 (sempre focável)
   * Desabilitado: -1 (não focável, gerenciado automaticamente)
   */
  tabindex?: number | string | null

  /**
   * Label de acessibilidade para screen readers
   *
   * Fortemente recomendado quando o slider não possui label visual associado.
   * Omitir sem label visual viola WCAG 1.3.1 (Informação e Relações).
   * Repassado ao QSlider como aria-label.
   * Um aviso de desenvolvimento é emitido quando ausente.
   */
  ariaLabel?: string
}

/**
 * Eventos emitidos pelo DssSlider
 */
export interface SliderEmits {
  /**
   * Emitido durante arrasto (tempo real)
   * @param value Valor atual (número entre min e max)
   */
  (e: 'update:modelValue', value: number): void

  /**
   * Emitido ao soltar o thumb (mouse-up / touch-end)
   *
   * Use para atualizar o backend somente após a interação completar.
   * @param value Valor final confirmado
   */
  (e: 'change', value: number): void
}

/**
 * API pública exposta via defineExpose
 */
export interface SliderExpose {
  /**
   * Foca o slider
   */
  focus: () => void

  /**
   * Remove o foco do slider
   */
  blur: () => void
}
