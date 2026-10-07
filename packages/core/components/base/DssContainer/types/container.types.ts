/**
 * ==========================================================================
 * DssContainer TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces do DssContainer — a caixa de conteúdo da página.
 *
 * Diferente da maior parte da base, este componente NÃO envolve um QComponent:
 * o Quasar não tem equivalente. `QPage` é a superfície da página inteira e
 * depende do QLayout; o que falta entre ele e o conteúdo é justamente o trilho
 * de largura — o que este componente é.
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Largura máxima do trilho de conteúdo.
 * Valores vêm de `--dss-container-*` (608 · 960 · 1280 · 1600px).
 * `fluid` não impõe teto — ocupa o que o pai der.
 * `responsive` acompanha o breakpoint (608 → 960 → 1280 → 1600), reproduzindo
 * a classe utilitária `.dss-container` de `utils/_layout-helpers.scss` — ver a
 * nota de colisão no `3-variants/_size.scss`.
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'fluid' | 'responsive'

/** Respiro horizontal e vertical. Valores de `--dss-gutter-*`. */
export type ContainerPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Ritmo vertical entre os filhos diretos. Valores de `--dss-grid-gap-*`.
 * Diferente de `none`, o container vira coluna flex — é o que torna o
 * empilhamento com respiro constante possível sem CSS na página.
 */
export type ContainerGap = 'none' | 'sm' | 'md' | 'lg' | 'xl'

/** Marcas do sistema Sansys. */
export type ContainerBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

export interface ContainerProps {
  /**
   * Largura máxima do trilho.
   * @default 'lg'
   */
  size?: ContainerSize

  /**
   * Respiro interno.
   * @default 'md'
   */
  padding?: ContainerPadding

  /**
   * Ritmo vertical entre filhos diretos. Acima de `none`, o container
   * passa a ser coluna flex.
   * @default 'none'
   */
  gap?: ContainerGap

  /**
   * Centraliza o trilho no eixo horizontal (`margin-inline: auto`).
   * @default true
   */
  centered?: boolean

  /**
   * Elemento renderizado. Existe para semântica: o trilho de conteúdo
   * principal de uma página costuma ser `main`; uma faixa dentro dela,
   * `section`. Container não decide semântica sozinho.
   * @default 'div'
   */
  tag?: string

  /**
   * Marca aplicada pela prop. A rota ancestral (`[data-brand]`) funciona
   * sozinha — os tokens de marca já descem por herança.
   * @default null
   */
  brand?: ContainerBrand | null
}

export interface ContainerSlots {
  /** Conteúdo do trilho. */
  default: () => unknown
}
