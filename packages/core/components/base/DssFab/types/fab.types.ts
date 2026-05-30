/**
 * ==========================================================================
 * DssFab TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para DssFab
 * Componente DSS baseado em QFab com API governada pelo Design System Sansys.
 *
 * @see https://quasar.dev/vue-components/floating-action-button
 *
 * ARQUITETURA: Este componente ENVOLVE QFab.
 * Props bloqueadas: glossy, push, flat, outline, unelevated, padding.
 * O FAB no DSS é sempre elevado — variantes sem elevação não fazem sentido
 * semântico para uma ação flutuante primária.
 *
 * RESPONSABILIDADE:
 * - Gerencia estado de expansão (aberto/fechado) via v-model.
 * - Orquestra direção de expansão das ações filhas.
 * - NÃO gerencia posicionamento fixo na tela (responsabilidade do DssPageSticky).
 * - NÃO executa ações finais (responsabilidade dos DssFabAction filhos).
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Direção de expansão das ações filhas.
 */
export type FabDirection = 'up' | 'down' | 'left' | 'right'

/**
 * Alinhamento vertical das ações filhas (quando direction é up/down).
 */
export type FabVerticalActionsAlign = 'left' | 'center' | 'right'

/**
 * Marcas do sistema Sansys.
 */
export type FabBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES — DssFab
// ==========================================================================

/**
 * Props do componente DssFab
 *
 * @example
 * ```vue
 * <DssFab
 *   v-model="fabOpen"
 *   icon="add"
 *   active-icon="close"
 *   color="primary"
 *   direction="up"
 * >
 *   <q-fab-action color="primary" icon="mail" />
 *   <q-fab-action color="secondary" icon="alarm" />
 * </DssFab>
 * ```
 */
export interface FabProps {
  // ========================================
  // Estado (v-model)
  // ========================================

  /**
   * Estado aberto/fechado do FAB (v-model).
   * Controla a visibilidade das ações filhas.
   * @default false
   */
  modelValue?: boolean

  // ========================================
  // Conteúdo Visual
  // ========================================

  /**
   * Cor do FAB (compatível com paleta Quasar e DSS).
   * @example 'primary' | 'secondary' | 'positive' | 'negative' | 'warning' | 'info'
   * @default 'primary'
   */
  color?: string

  /**
   * Cor do ícone/texto (sobrescreve o contraste automático).
   */
  textColor?: string

  /**
   * Texto exibido ao lado do ícone.
   * Quando preenchido, transforma o FAB em Extended FAB (formato pill).
   * @example 'Nova Ação'
   */
  label?: string

  /**
   * Ícone exibido quando o FAB está fechado.
   * @example 'add' | 'edit' | 'create'
   * @default 'add'
   */
  icon?: string

  /**
   * Ícone exibido quando o FAB está aberto.
   * @example 'close' | 'expand_less'
   * @default 'close'
   */
  activeIcon?: string

  /**
   * Oculta o ícone do FAB.
   * Útil para FABs que exibem apenas label.
   * @default false
   */
  hideIcon?: boolean

  /**
   * Oculta o label do FAB.
   * Útil para FABs que alternam entre ícone e label.
   * @default false
   */
  hideLabel?: boolean

  // ========================================
  // Comportamento de Expansão
  // ========================================

  /**
   * Direção de expansão das ações filhas.
   * @default 'up'
   */
  direction?: FabDirection

  /**
   * Alinhamento das ações filhas no eixo vertical.
   * Aplicável quando direction é 'up' ou 'down'.
   * @default 'center'
   */
  verticalActionsAlign?: FabVerticalActionsAlign

  /**
   * Não fecha o FAB ao clicar fora da área de ações.
   * @default false
   */
  persistent?: boolean

  // ========================================
  // Estado
  // ========================================

  /**
   * Desabilita o FAB (trigger e ações).
   * @default false
   */
  disable?: boolean

  // ========================================
  // Brandabilidade
  // ========================================

  /**
   * Marca Sansys (Hub, Water, Waste).
   * Aplica acento visual de marca na borda inferior do trigger.
   * @default null
   */
  brand?: FabBrand | null

  // ========================================
  // Acessibilidade
  // ========================================

  /**
   * Label acessível para o trigger (aria-label).
   * Use quando o ícone sozinho não é suficientemente descritivo.
   * @example 'Criar novo item'
   */
  ariaLabel?: string
}

/**
 * Eventos emitidos pelo DssFab
 */
export interface FabEmits {
  /**
   * Emitido quando o estado aberto/fechado muda.
   */
  'update:modelValue': [value: boolean]

  /**
   * Emitido ao clicar no trigger do FAB.
   */
  click: [event: MouseEvent]

  /**
   * Emitido quando as ações são exibidas.
   */
  show: []

  /**
   * Emitido quando as ações são ocultadas.
   */
  hide: []

  /**
   * Emitido antes das ações serem exibidas.
   */
  'before-show': []

  /**
   * Emitido antes das ações serem ocultadas.
   */
  'before-hide': []
}

/**
 * Slots disponíveis no DssFab
 */
export interface FabSlots {
  /**
   * Slot padrão — reservado para DssFabAction (Nível 3).
   * Temporariamente aceita q-fab-action nativo até DssFabAction ser selado.
   *
   * @example
   * ```vue
   * <DssFab icon="add">
   *   <!-- Fase atual: q-fab-action temporário (EXC-01) -->
   *   <q-fab-action color="primary" icon="mail" label="E-mail" />
   *   <!-- Fase futura (após DssFabAction ser selado): -->
   *   <DssFabAction color="primary" icon="mail" label="E-mail" />
   * </DssFab>
   * ```
   */
  default(): any
}
