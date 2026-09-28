/**
 * ==========================================================================
 * DssActionMenu — TypeScript Definitions
 * ==========================================================================
 *
 * Componente COMPOSTO (Fase 3) — barra de ações em que uma ação pode abrir
 * sub-ações. Orquestra DssToolbar (faixa) + DssButton (cada ação) + DssMenu
 * (painel) + DssList/DssItem (sub-ações).
 *
 * PREMISSA DE COMPOSIÇÃO (Cartão Composto): não reimplementa primitivo. Variante,
 * tamanho, marca, foco e rampa de hover são do DssButton; o arranjo é do
 * DssToolbar; o overlay é do DssMenu.
 *
 * FRONTEIRA COM O DssBtnDropdown: aquele é UM botão com menu. Este é uma BARRA
 * em que ALGUMAS ações abrem sub-ações. Uso com gatilho único deve usar o outro.
 *
 * DECISÃO DE ESCOPO (pré-prompt §2.1): sem overflow automático ("mais ações"
 * quando não cabe) e sem aninhamento além de um nível. Declarado como ausente,
 * não omitido.
 *
 * @see docs/governance/pre-prompts/pre_prompt_dss_action_menu.md
 * @see docs/governance/DSS_GUIA_COMPOSICAO_FASE3.md
 */

import type { InjectionKey } from 'vue'

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/** Brands Sansys. */
export type ActionMenuBrand = 'hub' | 'water' | 'waste'

/**
 * Variante visual das ações. Espelha o DssButton, mas o conjunto é REDUZIDO de
 * propósito: barra de comando com ações `elevated` vira uma fileira de blocos
 * concorrendo entre si. `flat` é o default por ser o que a barra pede.
 */
export type ActionMenuVariant = 'flat' | 'outline' | 'unelevated'

/** Cor semântica, decidida UMA vez na barra e herdada por todas as ações. */
export type ActionMenuColor =
  | 'primary' | 'secondary' | 'tertiary' | 'accent'
  | 'positive' | 'negative' | 'warning' | 'info'

/** Tamanho compartilhado por todas as ações. */
export type ActionMenuSize = 'xs' | 'sm' | 'md' | 'lg'

// ==========================================================================
// CONTEXTO COMPARTILHADO (provide/inject)
// ==========================================================================

/**
 * Contexto que a barra fornece às ações.
 *
 * POR QUE provide/inject E NÃO PROPS: o Cartão Composto exige estado do bloco
 * por injeção tipada. Aqui o motivo é concreto — `disabled` da barra precisa
 * alcançar a ação E impedir a abertura do sub-menu. Com prop drilling, o defeito
 * típico é um menu que abre com itens inertes.
 */
export interface ActionMenuContext {
  variant: ActionMenuVariant
  color: ActionMenuColor
  size: ActionMenuSize
  brand: ActionMenuBrand | null
  /** `true` quando a BARRA está desabilitada. A ação soma com o próprio `disabled`. */
  disabled: boolean
  /** Nome da ação com sub-menu aberto no momento (`null` = nenhum). */
  abertoId: string | null
  /** Registra qual sub-menu está aberto. Garante um por vez. */
  abrir: (name: string | null) => void
}

/** Chave de injeção. Exportada para teste e para composição em produto. */
export const ACTION_MENU_KEY = Symbol('dss-action-menu') as InjectionKey<ActionMenuContext>

// ==========================================================================
// PROPS
// ==========================================================================

export interface ActionMenuProps {
  /**
   * Nome acessível da barra (`aria-label` do `role="toolbar"`).
   * OBRIGATÓRIO: uma toolbar sem nome não é anunciável, e o gate de a11y cobra.
   */
  ariaLabel: string
  /** @default 'flat' */
  variant?: ActionMenuVariant
  /** @default 'primary' */
  color?: ActionMenuColor
  /** @default 'md' */
  size?: ActionMenuSize
  /** @default null */
  brand?: ActionMenuBrand | null
  /** Desabilita a barra INTEIRA — cada ação e a abertura dos sub-menus. @default false */
  disabled?: boolean
}

/*
 * NÃO existe prop `dense`, e a ausência é decisão medida.
 * Ela chegou a ser declarada e repassada ao DssToolbar — que NÃO a tem na API
 * (só `inset` e `brand`). O gate `validate-dss-attrs` pegou: a prop prometia
 * densidade que a composição não entrega. Expor algo que só funcionaria por
 * $attrs chegando ao Quasar é API por acidente.
 * Reabrir isto é decisão do DssToolbar, não deste composto.
 */

/**
 * Sub-ação do painel.
 *
 * Existe como componente próprio para que `role="menuitem"` e `tabindex` venham
 * do DSS, não da memória de quem usa. Medido no Preview Frame: com `DssItem`
 * cru, o menu abria sem ser anunciado como menu e o foco não alcançava a
 * primeira opção.
 */
export interface ActionMenuSubItemProps {
  /** Identificador da sub-ação. Vai no payload de `@action`. */
  name: string
  /** Rótulo visível. */
  label?: string
  /** Texto secundário abaixo do rótulo. */
  caption?: string
  /** @default false */
  disabled?: boolean
}

export interface ActionMenuItemProps {
  /** Identificador da ação. Vai no payload de `@action` e controla o menu aberto. */
  name: string
  /** Rótulo visível. */
  label?: string
  /** Ícone à esquerda (nome do glifo). */
  icon?: string
  /** Desabilita SOMENTE esta ação. Soma com o `disabled` da barra. @default false */
  disabled?: boolean
  /** Texto da dica contextual. Ausente = sem tooltip. */
  tooltip?: string
}

// ==========================================================================
// SLOTS
// ==========================================================================

export interface ActionMenuSlots {
  /**
   * As ações da barra. Espera `DssActionMenuItem`.
   * ESTRUTURAL: sem ele a barra não renderiza — toolbar vazia é ruído visual.
   */
  default?: () => unknown
}

export interface ActionMenuItemSlots {
  /**
   * Sub-ações. A PRESENÇA deste slot é o que transforma a ação em gatilho de
   * menu — sem ele, o item aciona direto. Espera `DssItem` com `clickable`.
   */
  default?: () => unknown
}

// ==========================================================================
// EVENTOS
// ==========================================================================

export interface ActionMenuEmits {
  /** Ação acionada. Payload PLANO (só o nome) — evento serializável. */
  (e: 'action', name: string): void
}

export interface ActionMenuItemEmits {
  (e: 'action', name: string): void
}
