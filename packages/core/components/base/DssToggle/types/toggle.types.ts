/**
 * ==========================================================================
 * DssToggle - TypeScript Type Definitions
 * ==========================================================================
 *
 * Interfaces para props, emits e slots do DssToggle.
 *
 * Golden Context: DssCheckbox
 * Diferenca principal: Toggle nao suporta indeterminate (binario puro).
 * Toggle usa role="switch" ao inves de checkbox puro.
 *
 * @version 1.0.0
 */

// ==========================================================================
// ENUMS E LITERAIS
//
// Aliases nomeados e exportados, como no DssCheckbox e no DssRadio. O toggle
// era o unico da familia sem eles: `color` era `string` aberto e `size` uma
// uniao inline. Nomear fecha a uniao (px/cor arbitraria passa a ser rejeitada
// POR TIPO) e torna os tipos consumiveis pelo barrel.
// ==========================================================================

/**
 * Cores semanticas DSS
 */
export type ToggleColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

/**
 * Tamanhos disponiveis
 */
export type ToggleSize =
  | 'xs'  // Extra Small
  | 'sm'  // Small
  | 'md'  // Medium (default)
  | 'lg'  // Large
  | 'xl'  // Extra Large

/**
 * Brands disponiveis
 */
export type ToggleBrand =
  | 'hub'
  | 'water'
  | 'waste'

/**
 * Props do DssToggle
 *
 * Subset controlado baseado no Quasar QToggle.
 * Toggle e um controle binario (on/off) sem estado indeterminate.
 */
export interface ToggleProps {
  // =========================================================================
  // Value / Model
  // =========================================================================

  /**
   * Valor reativo do toggle (v-model)
   *
   * - Boolean mode: true/false
   * - Custom values mode: trueValue/falseValue
   * - Array mode: adiciona/remove val do array
   */
  modelValue?: boolean | null | any[]

  /**
   * Valor quando toggle esta ativo (on)
   * @default true
   */
  trueValue?: any

  /**
   * Valor quando toggle esta inativo (off)
   * @default false
   */
  falseValue?: any

  /**
   * Valor para uso em array mode (grupo de toggles)
   * Quando modelValue e um array, val e adicionado/removido
   */
  val?: any

  // =========================================================================
  // Content
  // =========================================================================

  /**
   * Texto do label (alternativa ao slot default)
   * @default ''
   */
  label?: string

  /**
   * Posiciona o label a esquerda do toggle
   * @default false
   */
  leftLabel?: boolean

  // =========================================================================
  // Visual
  // =========================================================================

  /**
   * Cor do toggle quando ativo
   *
   * Sem brand: classes utilitarias Quasar (bg-{color})
   * Com brand: tokens semanticos via _brands.scss
   *
   * @default 'primary'
   */
  color?: ToggleColor

  /**
   * Tamanho do toggle
   *
   * Usa tokens de compact control:
   * - xs: --dss-compact-control-height-xs (20px)
   * - sm: --dss-compact-control-height-sm (24px)
   * - md: --dss-compact-control-height-md (28px)
   * - lg: --dss-compact-control-height-lg (32px)
   * - xl: reusa a altura -lg (nao ha -xl na escala compacta compartilhada)
   *
   * @default 'md'
   */
  size?: ToggleSize

  /**
   * Escape hatch de cor: mantem a cor (semantica/brand) no track tambem no
   * estado DESLIGADO. Por padrao (false) o track em repouso e cinza e a cor
   * so aparece quando ligado (convencao M3/Carbon/Lightning). Opt-in, espelha
   * o `keep-color` do q-toggle. A cor como fundo de track DEVE bater 3:1
   * (WCAG 1.4.11) por brand x tema.
   *
   * @default false
   */
  keepColor?: boolean

  // =========================================================================
  // Icon (glifo no thumb — CCI §7, mudanca aditiva)
  // =========================================================================

  /**
   * Nome do glifo exibido DENTRO do thumb quando LIGADO, composto via DssIcon.
   *
   * SEM default de proposito: o thumb liso e o padrao do toggle. Informar
   * `checkedIcon` adiciona o glifo; omitir preserva o thumb como esta.
   *
   * Nao existe `uncheckedIcon` — o estado desligado permanece sem glifo, mesma
   * decisao do DssCheckbox e do DssRadio. Nao existe `indeterminateIcon`
   * porque o toggle e binario puro (ver nota do cabecalho).
   */
  checkedIcon?: string

  // =========================================================================
  // States
  // =========================================================================

  /**
   * Desabilita o toggle
   *
   * Aplica opacity: var(--dss-opacity-disabled) e pointer-events: none
   * Input nativo recebe disabled e tabindex=-1
   *
   * @default false
   */
  disable?: boolean

  /**
   * Modo denso - reduz densidade visual
   *
   * Efeitos:
   * - Reduz gap (--dss-spacing-1)
   * - Reduz min-height (--dss-compact-control-height-sm)
   * - Reduz font-size (--dss-font-size-xs)
   * - Remove touch target (::before { display: none })
   *
   * @default false
   */
  dense?: boolean

  /**
   * Estado de erro
   *
   * Aplica cor de erro no track e label.
   * Quando errorMessage fornecida, exibe mensagem com role="alert".
   *
   * @default false
   */
  error?: boolean

  /**
   * Mensagem de erro exibida quando error=true
   * Associada ao input via aria-describedby
   */
  errorMessage?: string

  // =========================================================================
  // Brand
  // =========================================================================

  /**
   * Marca do produto (Hub, Water, Waste)
   *
   * Aplica data-brand no elemento raiz para ativar
   * tokens semanticos de brand via _brands.scss
   *
   * @default null
   */
  brand?: ToggleBrand | null

  // =========================================================================
  // Accessibility
  // =========================================================================

  /**
   * Tabindex customizado para o input nativo
   *
   * Desabilitado: -1 (nao focavel)
   * Padrao: 0 (sempre focavel)
   */
  tabindex?: number | string | null

  /**
   * Label de acessibilidade customizado para screen readers
   * Aplicado ao input nativo
   */
  ariaLabel?: string
}

/**
 * Eventos emitidos pelo DssToggle
 */
export interface ToggleEmits {
  /**
   * Emitido quando o valor do toggle muda
   * @param value Novo valor (boolean ou array)
   */
  (e: 'update:modelValue', value: boolean | any[]): void
}

/**
 * Slots disponiveis no DssToggle
 */
export interface ToggleSlots {
  /**
   * Conteudo customizado do label
   * @default label prop
   */
  default(): any
}
