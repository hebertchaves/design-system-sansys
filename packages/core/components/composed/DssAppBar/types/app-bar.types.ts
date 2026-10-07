/**
 * ==========================================================================
 * DssAppBar — TypeScript Definitions
 * ==========================================================================
 */

import type { BrandKey } from '../../../../assets/brand/logos'

/**
 * Altura da barra.
 *
 * - `compact` — 40px. É a app bar do Sansys em produção (grid master).
 * - `standard` — 64px. O degrau do `--dss-layout-header-height`, para contexto
 *   que pede mais respiro.
 */
export type AppBarDensity = 'compact' | 'standard'

export interface AppBarProps {
  /**
   * Marca do produto. Uma prop, dois efeitos — e é de propósito:
   *
   * 1. vai ao `DssToolbar`, que pinta o fundo e remapeia `--dss-action-primary`
   *    para os filhos;
   * 2. o `DssToolbar` propaga `[data-brand]` no próprio root, e o
   *    `DssBrandLogo` lá dentro resolve a marca pelo ancestral mais próximo.
   *
   * Ou seja: o logo certo aparece sem ninguém repassar nada. É o padrão §1.3 do
   * guia de Fase 3 — contexto visual por `data-*`, não por `provide/inject`.
   */
  brand?: BrandKey

  /** Nome do módulo, à direita do divisor. */
  title?: string

  /**
   * Altura da barra.
   * @default 'compact'
   */
  density?: AppBarDensity

  /**
   * Mostra o botão de menu à esquerda.
   * @default true
   */
  menu?: boolean

  /**
   * Nome acessível do botão de menu. Obrigatório quando `menu` está ligado:
   * botão só de ícone sem nome não existe para quem usa leitor de tela.
   * @default 'Abrir menu principal'
   */
  menuAriaLabel?: string

  /**
   * Sombra sob a barra.
   * @default true
   */
  elevated?: boolean
}

export interface AppBarEmits {
  /** Clique no botão de menu. A barra não sabe o que abrir — quem monta a tela sabe. */
  (e: 'menu'): void
}

export interface AppBarSlots {
  /** Substitui o logo. Raro — serve a marca que não está nos dados do DSS. */
  brand?: () => unknown
  /** Substitui o título. Para título que não é texto simples. */
  title?: () => unknown
  /** Ações da direita. Na prática, 4 `DssButton` de ícone. */
  actions?: () => unknown
}
