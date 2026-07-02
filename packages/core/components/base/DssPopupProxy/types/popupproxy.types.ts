/**
 * ==========================================================================
 * DssPopupProxy — TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssPopupProxy.
 *
 * Golden Reference: DssChip
 * Golden Context: DssMenu
 * Classificação: Overlay Responsivo (Nível 2 — wrapper sobre QPopupProxy)
 *
 * @version 1.0.0
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Posições de ancoragem disponíveis.
 * Mapeadas diretamente da API oficial do QPopupProxy/QMenu.
 */
export type PopupProxyPosition =
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
 * Props do componente DssPopupProxy.
 *
 * PROPS BLOQUEADAS (não repassadas ao QPopupProxy):
 * - `dark`: Modo escuro governado globalmente via [data-theme="dark"]
 * - `square`: Cantos quadrados violam o token --dss-radius-md
 *
 * PROPS REPASSADAS VIA $attrs (via v-bind="$attrs"):
 * - `aria-label`, `aria-labelledby`, `data-*`: atributos HTML extras
 *
 * @example
 * ```vue
 * <DssButton label="Opções">
 *   <DssPopupProxy v-model:open="showMenu">
 *     <DssList>
 *       <DssItem label="Editar" clickable v-close-popup />
 *       <DssItem label="Excluir" clickable v-close-popup />
 *     </DssList>
 *   </DssPopupProxy>
 * </DssButton>
 * ```
 */
export interface PopupProxyProps {
  /**
   * Controla a visibilidade do popup (v-model:open).
   * @default false
   */
  open?: boolean

  /**
   * Breakpoint em pixels para alternar entre QMenu (≥) e QDialog (<).
   * Em viewports >= breakpoint: exibe como QMenu (menu flutuante).
   * Em viewports < breakpoint: exibe como QDialog (modal).
   * @default 450
   */
  breakpoint?: number | string

  /**
   * Elemento alvo para posicionamento. Pode ser seletor CSS string,
   * referência de elemento DOM, ou `false` para usar o elemento pai.
   */
  target?: string | Element | boolean | null

  /**
   * Impede o QPopupProxy de adicionar listener de evento no elemento pai.
   * Útil quando o controle de abertura é feito programaticamente.
   * @default false
   */
  noParentEvent?: boolean

  /**
   * Exibe o popup ao clique-direito do mouse (context menu).
   * @default false
   */
  contextMenu?: boolean

  /**
   * Impede o fechamento do popup ao clicar fora ou pressionar ESC.
   * @default false
   */
  persistent?: boolean

  /**
   * Impede que o popup capture o foco ao abrir.
   * ⚠️ Impacta acessibilidade — usar apenas para overlays não-interativos.
   * @default false
   */
  noFocus?: boolean

  /**
   * Impede que o foco retorne ao elemento trigger ao fechar.
   * @default false
   */
  noRefocus?: boolean

  /**
   * Fecha o popup automaticamente ao clicar em qualquer elemento interno.
   * @default false
   */
  autoClose?: boolean

  /**
   * Ponto de ancoragem no elemento trigger.
   * Define onde o popup "nasce" em relação ao trigger.
   * @example 'bottom left'
   */
  anchor?: PopupProxyPosition

  /**
   * Ponto de alinhamento do próprio popup.
   * Define qual parte do popup se alinha ao `anchor`.
   * @example 'top left'
   */
  self?: PopupProxyPosition

  /**
   * Deslocamento [x, y] em pixels a partir do ponto de ancoragem.
   * Valores positivos movem para direita/baixo.
   * @example [0, 8]
   */
  offset?: [number, number]

  /**
   * Ajusta a largura do popup para ser igual à largura do elemento trigger.
   * @default false
   */
  fit?: boolean

  /**
   * Cobre completamente o elemento trigger.
   * @default false
   */
  cover?: boolean

  /**
   * Altura máxima do popup. Aceita string CSS (ex: '300px', '50vh').
   */
  maxHeight?: string

  /**
   * Largura máxima do popup. Aceita string CSS (ex: '400px', '80vw').
   */
  maxWidth?: string

  /**
   * Nome da transição de entrada do popup.
   */
  transitionShow?: string

  /**
   * Nome da transição de saída do popup.
   */
  transitionHide?: string

  /**
   * Elemento para escutar eventos de scroll.
   * O popup reposiciona ao rolar este elemento.
   */
  scrollTarget?: string | Element
}

/**
 * Eventos emitidos pelo DssPopupProxy.
 */
export interface PopupProxyEmits {
  /** Sincronização bidirecional de v-model:open */
  (e: 'update:open', value: boolean): void
  /** Emitido antes do popup abrir (antes da transição de entrada) */
  (e: 'beforeShow', evt: Event): void
  /** Emitido quando o popup termina de abrir */
  (e: 'show', evt: Event): void
  /** Emitido antes do popup fechar (antes da transição de saída) */
  (e: 'beforeHide', evt: Event): void
  /** Emitido quando o popup termina de fechar */
  (e: 'hide', evt: Event): void
}

/**
 * Slots disponíveis no DssPopupProxy.
 */
export interface PopupProxySlots {
  /**
   * Conteúdo do popup.
   * Em modo menu: recomenda-se DssList > DssItem.
   * Em modo dialog: recomenda-se DssCard com conteúdo.
   */
  default(): void
}
