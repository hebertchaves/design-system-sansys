import type { VNode } from 'vue'

/**
 * Valores de gutter permitidos para DssBreadcrumbs.
 * Mapeiam para tokens de espaçamento DSS:
 *   sm → --dss-spacing-2 (8px)
 *   md → --dss-spacing-3 (12px)
 *   lg → --dss-spacing-4 (16px)
 */
export type BreadcrumbsGutter = 'sm' | 'md' | 'lg'

/**
 * Valores de alinhamento horizontal permitidos para DssBreadcrumbs.
 * Mapeiam para valores de justify-content do flexbox.
 */
export type BreadcrumbsAlign = 'left' | 'center' | 'right' | 'between' | 'around'

/**
 * Marcas do sistema Sansys.
 */
export type BreadcrumbsBrand = 'hub' | 'water' | 'waste'

/**
 * Props do DssBreadcrumbs.
 *
 * Props bloqueadas (não expostas):
 * - active-color       → A cor do item ativo é governada pelo DssBreadcrumbsEl filho.
 * - separator-class    → Os estilos do separador são governados pelo CSS DSS (EXC-01).
 * - gutter-color       → Quasar prop não exposta; cor do separador é controlada por separator-color.
 */
export interface BreadcrumbsProps {
  /**
   * Caractere separador exibido entre os itens da trilha.
   * Aceita texto (ex: '/', '>') ou nome de ícone Material Icons (ex: 'chevron_right').
   * O QBreadcrumbs gerencia a injeção dos separadores com aria-hidden="true" nativamente.
   * @default '/'
   */
  separator?: string

  /**
   * Cor do separador.
   * Aceita tokens DSS de cor de texto (ex: 'subtle', 'body', 'disabled').
   * Mapeado para classes utilitárias `text-{color}` via computed no template.
   * @default 'subtle'
   */
  separatorColor?: string

  /**
   * Espaçamento entre os itens da trilha.
   * sm → --dss-spacing-2 (8px)
   * md → --dss-spacing-3 (12px)
   * lg → --dss-spacing-4 (16px)
   * @default 'md'
   */
  gutter?: BreadcrumbsGutter

  /**
   * Alinhamento horizontal da trilha dentro do container.
   * left → justify-content: flex-start
   * center → justify-content: center
   * right → justify-content: flex-end
   * between → justify-content: space-between
   * around → justify-content: space-around
   * @default 'left'
   */
  align?: BreadcrumbsAlign

  /**
   * Marca Sansys (Hub, Water, Waste).
   * Sobrescreve a cor do separador com a cor primária da marca.
   * @default undefined
   */
  brand?: BreadcrumbsBrand
}

/** DssBreadcrumbs não emite eventos próprios. */
export interface BreadcrumbsEmits {}

export interface BreadcrumbsSlots {
  /**
   * Conteúdo da trilha.
   * Aceita apenas instâncias de DssBreadcrumbsEl.
   * O uso de HTML nativo ou outros componentes viola a governança da Fase 2.
   */
  default?: () => VNode[]
}
