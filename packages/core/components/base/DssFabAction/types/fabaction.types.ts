/**
 * ==========================================================================
 * DssFabAction TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para DssFabAction
 * Componente DSS baseado em QFabAction com API governada pelo Design System Sansys.
 *
 * @see https://quasar.dev/vue-components/floating-action-button
 *
 * ARQUITETURA: Este componente ENVOLVE QFabAction.
 * Props bloqueadas: glossy, push, flat, outline, unelevated, padding.
 * O FabAction no DSS é sempre elevado — variantes sem elevação não fazem
 * sentido semântico para uma ação flutuante secundária.
 *
 * RESPONSABILIDADE:
 * - Executa uma ação específica quando ativado.
 * - NÃO gerencia estado de expansão (responsabilidade do DssFab pai).
 * - Fornece navegação via `to` (Vue Router) ou `href` (link externo).
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Marcas do sistema Sansys.
 */
export type FabActionBrand = 'hub' | 'water' | 'waste'

/**
 * Posição do label externo em relação ao botão circular.
 */
export type FabActionLabelPosition = 'top' | 'right' | 'bottom' | 'left'

// ==========================================================================
// INTERFACES — DssFabAction
// ==========================================================================

/**
 * Props do componente DssFabAction
 *
 * @example
 * ```vue
 * <DssFab v-model="open" icon="add">
 *   <DssFabAction color="primary" icon="mail" label="E-mail" />
 *   <DssFabAction color="secondary" icon="alarm" label="Alarme" />
 * </DssFab>
 * ```
 */
export interface FabActionProps {
  // ========================================
  // Conteúdo Visual
  // ========================================

  /**
   * Cor do botão de ação (compatível com paleta Quasar e DSS).
   * @example 'primary' | 'secondary' | 'positive' | 'negative' | 'warning' | 'info'
   * @default 'primary'
   */
  color?: string

  /**
   * Cor do ícone/texto (sobrescreve o contraste automático).
   */
  textColor?: string

  /**
   * Ícone exibido no centro do botão de ação.
   * @example 'mail' | 'alarm' | 'delete'
   */
  icon?: string

  /**
   * Texto exibido ao lado do ícone (dentro do botão).
   * Quando preenchido, transforma o FabAction em Extended (formato pill).
   * @example 'Enviar e-mail'
   */
  label?: string

  /**
   * Texto do label exibido FORA do botão circular (ao lado), via
   * `external-label` nativo do QFabAction. Quando preenchido, tem precedência
   * sobre `label` (o QFabAction suporta um único texto por vez) e é renderizado
   * externamente na posição definida por `labelPosition`.
   * @example 'Nova tarefa'
   */
  externalLabel?: string

  /**
   * Posição do label externo em relação ao botão circular.
   * Ignorado se `externalLabel` não estiver preenchido.
   * @default 'left'
   */
  labelPosition?: FabActionLabelPosition

  // ========================================
  // Navegação
  // ========================================

  /**
   * Rota Vue Router para navegação ao clicar.
   * Transforma o botão em um link de roteamento interno.
   * @example { name: 'Home' } | '/sobre'
   */
  to?: string | object

  /**
   * URL externa para navegação ao clicar.
   * Transforma o botão em um link (`<a>`).
   * @example 'https://sansys.com.br'
   */
  href?: string

  /**
   * Alvo do link quando `href` é fornecido.
   * @example '_blank' | '_self'
   * @default '_self'
   */
  target?: string

  // ========================================
  // Estado
  // ========================================

  /**
   * Desabilita o botão de ação.
   * @default false
   */
  disable?: boolean

  // ========================================
  // Brandabilidade
  // ========================================

  /**
   * Marca Sansys (Hub, Water, Waste).
   * Aplica acento visual de marca na borda inferior do botão.
   * @default null
   */
  brand?: FabActionBrand | null

  // ========================================
  // Acessibilidade
  // ========================================

  /**
   * Label acessível para o botão (aria-label).
   * Use quando o ícone sozinho não é suficientemente descritivo.
   * @example 'Enviar e-mail'
   */
  ariaLabel?: string
}

/**
 * Eventos emitidos pelo DssFabAction
 */
export interface FabActionEmits {
  /**
   * Emitido ao clicar no botão de ação.
   */
  (e: 'click', event: MouseEvent): void
}

/**
 * Slots disponíveis no DssFabAction
 */
export interface FabActionSlots {
  /**
   * Slot de ícone customizado.
   * Use para substituir o ícone padrão por conteúdo personalizado.
   *
   * @example
   * ```vue
   * <DssFabAction color="primary" label="Upload">
   *   <template #icon>
   *     <DssIcon name="upload" />
   *   </template>
   * </DssFabAction>
   * ```
   */
  icon?(): any
}
