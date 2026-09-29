/**
 * ==========================================================================
 * DssMenu TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssMenu
 *
 * Golden Reference: DssTooltip
 * Golden Context: DssList
 * Classificação: Overlay de Navegação (Nível 2 — wrapper sobre QMenu)
 *
 * @version 1.0.0
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Posições de ancoragem disponíveis para o menu
 * Mapeadas diretamente da API oficial do QMenu
 */
export type MenuPosition =
  | 'top left'
  | 'top middle'
  | 'top right'
  | 'top start'
  | 'top end'
  | 'center left'
  | 'center middle'
  | 'center right'
  | 'center start'
  | 'center end'
  | 'bottom left'
  | 'bottom middle'
  | 'bottom right'
  | 'bottom start'
  | 'bottom end'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssMenu
 *
 * PROPS BLOQUEADAS (não repassadas ao QMenu):
 * - `dark`: Modo escuro governado globalmente via [data-theme="dark"]
 * - `square`: Cantos quadrados violam o token --dss-radius-md
 *
 * PROPS REPASSADAS VIA $attrs:
 * - `transition-show`, `transition-hide`: animações de abertura/fechamento
 * - `max-height`, `max-width`: restrições de dimensão
 * - `persistent`: evita fechamento ao clicar fora
 * - `no-focus`: não transfere foco ao abrir
 * - `touch-position`: posiciona menu no ponto de toque
 *
 * @example
 * ```vue
 * <DssButton label="Ações">
 *   <DssMenu v-model="menuAberto">
 *     <DssList>
 *       <DssItem label="Opção 1" clickable v-close-popup />
 *       <DssItem label="Opção 2" clickable v-close-popup />
 *     </DssList>
 *   </DssMenu>
 * </DssButton>
 * ```
 */
export interface MenuProps {
  /**
   * Controle de visibilidade do menu (v-model)
   * @default false
   */
  modelValue?: boolean

  /**
   * Faz o menu ter a mesma largura que o elemento disparador
   * @default false
   */
  fit?: boolean

  /**
   * O menu cobre o elemento disparador
   * @default false
   */
  cover?: boolean

  /**
   * Ponto de ancoragem do elemento disparador
   * Define qual ponto do trigger o menu se ancora
   * @example 'bottom left'
   */
  anchor?: MenuPosition

  /**
   * Ponto de alinhamento do próprio menu
   * Define qual ponto do menu se alinha ao anchor
   * @example 'top left'
   */
  self?: MenuPosition

  /**
   * Deslocamento [x, y] em pixels a partir do ponto de ancoragem
   * @example [0, 8]
   */
  offset?: [number, number]

  /**
   * Impede o QMenu de instalar os proprios tratadores no elemento ancora.
   *
   * Use quando o CONSUMIDOR ja dirige a abertura (v-model + handler proprio).
   * Sem isto, um unico clique real e tratado DUAS vezes — o QMenu abre e o
   * handler do consumidor alterna de volta —, e o menu abre e fecha no mesmo
   * gesto. Foi o defeito medido no DssActionMenu (set/2026), invisivel em
   * teste unitario: jsdom dispara o @click do Vue mas nao os tratadores de
   * ponteiro do QMenu, entao no teste so existia UM dos dois donos do gesto.
   *
   * Declarado na API de proposito: chegava ao QMenu por `$attrs` e funcionava
   * por acidente — o gate `validate:dss-props` reprovou, com razao. O que nao
   * aparece na API nao e escolhido por quem le a documentacao.
   */
  noParentEvent?: boolean
}

/**
 * Eventos emitidos pelo DssMenu
 */
export interface MenuEmits {
  /** Sincronização de v-model */
  (e: 'update:modelValue', value: boolean): void

  /** Emitido quando o menu termina de abrir */
  (e: 'show', evt: Event): void

  /** Emitido quando o menu termina de fechar */
  (e: 'hide', evt: Event): void
}

/**
 * Slots disponíveis no DssMenu
 */
export interface MenuSlots {
  /**
   * Conteúdo do menu
   * Deve conter exclusivamente DssList com DssItems
   */
  default(): void
}
