/**
 * ==========================================================================
 * DssIcon TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssIcon
 * Componente base estrutural do DSS para exibicao de icones
 *
 * Dependencia interna: QIcon (Quasar Framework)
 * Golden Context: DssBadge (nao interativo)
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Tamanhos disponiveis para o icone
 * Mapeados para tokens --dss-icon-size-{size}
 */
export type IconSize =
  | 'xs'   // 16px - Inline icons, textos auxiliares
  | 'sm'   // 20px - Icones secundarios
  | 'md'   // 24px - Default, icones interativos
  | 'lg'   // 32px - Icones de destaque
  | 'xl'   // 48px - Icones grandes, avatares

/**
 * Cores semanticas DSS
 * Aplicadas via classes utilitarias (.text-*)
 */
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

/**
 * Brands disponiveis
 */
export type IconBrand =
  | 'hub'
  | 'water'
  | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssIcon
 *
 * @example
 * ```vue
 * <!-- Standalone -->
 * <DssIcon name="home" size="md" color="primary" />
 *
 * <!-- Decorativo (sem leitura por screen reader) -->
 * <DssIcon name="star" :decorative="true" />
 *
 * <!-- Com animacao -->
 * <DssIcon name="sync" :spin="true" />
 *
 * <!-- Com brand -->
 * <DssIcon name="business" brand="hub" />
 * ```
 */
export interface IconProps {
  // ========================================
  // Content (OBRIGATORIO)
  // ========================================

  /**
   * Nome do icone Material Icons
   * Segue a convencao do Quasar Framework
   *
   * @example 'home', 'settings', 'mdi-account', 'img:path/to/icon.svg'
   */
  name: string

  // ========================================
  // Visual
  // ========================================

  /**
   * Tamanho do icone via tokens DSS
   * Mapeado para --dss-icon-size-{size}
   *
   * 24px.
   *
   * NAO tem efeito quando `inline` esta ativo: o CCI §2.2 manda o sizing ser
   * dirigido pelo host (1em da font-size ao redor) e as classes de tamanho serem
   * ignoradas. Medido no Preview Frame: com `inline`, `size="sm"` e `size="xl"`
   * rendem os dois 14x14 — a font-size do palco. Antes disto nada dizia isso, e
   * girar o knob de tamanho sem reacao nenhuma parecia defeito.
   *
   * @default 'md'
   * @inertWhen inline=true
   */
  size?: IconSize

  /**
   * Cor semantica do icone
   * Aplicada via classe utilitaria .text-{color}
   * Quando nulo, herda cor do contexto (currentColor)
   *
   * Herda do contexto.
   * @default null
   */
  color?: IconColor | null

  /**
   * Modo inline (sizing dirigido pelo host)
   * Quando true: width/height = 1em e font-size = inherit — o icone
   * escala com a font-size do componente host. As classes de tamanho
   * (--xs..xl) sao ignoradas.
   *
   * Uso OBRIGATORIO ao embutir DssIcon dentro de outro componente DSS
   * (DssButton, DssChip, DssAvatar, DssCheckbox...).
   *
   * @see docs/governance/DSS_ICON_COMPOSITION_CONTRACT.md (§2.2)
   * Standalone usa o token de size; ver `inline` no README.
   * @default false
   */
  inline?: boolean

  // ========================================
  // Brand
  // ========================================

  /**
   * Brand override (Hub, Water, Waste)
   * Aplica cor especifica da marca via CSS
   * Quando ativo, sobrescreve a prop color
   */
  brand?: IconBrand | null

  // ========================================
  // Animation
  // ========================================

  /**
   * Ativa animacao de rotacao continua
   * Util para indicar carregamento ou sincronizacao
   *
   * @default false
   */
  spin?: boolean

  /**
   * Ativa animacao de pulso
   * Util para chamar atencao para notificacoes
   *
   * @default false
   */
  pulse?: boolean

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Marca o icone como decorativo (aria-hidden="true")
   * Icones decorativos sao ignorados por screen readers
   *
   * Quando false, o icone DEVE ter ariaLabel definido
   *
   * @default false
   */
  decorative?: boolean

  /**
   * Label de acessibilidade para screen readers
   * OBRIGATORIO quando decorative=false
   *
   * @example 'Home', 'Settings', 'Loading...'
   */
  ariaLabel?: string
}

/**
 * Slots disponiveis no DssIcon
 */
export interface IconSlots {
  /**
   * Slot default - Permite conteudo customizado dentro do wrapper do icone
   * Uso avancado: SVG inline, imagens, etc.
   *
   * OPCIONAL (`?`), corrigido em set/2026. Sem a interrogação, o emissor de
   * contrato deriva `required: !questionToken` → `required: true`, e o Preview
   * Frame honra isso injetando um placeholder visivel «default» no palco. O
   * resultado media assim: o preview do DssIcon mostrava o texto «default»
   * dominando o quadro e o icone de 24px sumia ao lado dele.
   *
   * O slot nunca foi obrigatorio — o icone vem da prop `name`; isto aqui e uma
   * escotilha para SVG inline. A assinatura e que estava mentindo.
   */
  default?(): any
}
