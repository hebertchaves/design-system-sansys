/**
 * ==========================================================================
 * DssBrandLogo — TypeScript Definitions
 * ==========================================================================
 *
 * O desenho das três marcas vive em `assets/brand/logos.ts`; aqui está só o
 * contrato de quem o exibe.
 */

import type { BrandKey } from '../../../../assets/brand/logos'

/**
 * Tamanho do logo. Governa a ALTURA — a largura acompanha, porque os três
 * desenhos têm proporções diferentes (Water 154×42, Hub 120×42, Waste 156×42).
 */
export type BrandLogoSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * Recorte do desenho.
 *
 * - `full` — símbolo + marca nominativa; é o logo completo
 * - `icon` — só o símbolo, para espaço estreito (rail retraído, favicon)
 * - `wordmark` — só o nome, para quando o símbolo já aparece ao lado
 */
export type BrandLogoVariant = 'full' | 'icon' | 'wordmark'

export interface BrandLogoProps {
  /**
   * Marca a exibir.
   *
   * Ausente, o componente resolve pelo ancestral `[data-brand]` mais PRÓXIMO —
   * não pelo primeiro do documento. A diferença importa: um overlay teleportado
   * herda a marca do documento (ver `useTeleportedBrand`), mas um logo vive na
   * árvore e o ancestral mais próximo é quem tem autoridade sobre ele.
   */
  brand?: BrandKey

  /**
   * Altura do logo. A largura acompanha a proporção do desenho.
   * @default 'md'
   */
  size?: BrandLogoSize

  /**
   * Que parte do desenho exibir.
   * @default 'full'
   */
  variant?: BrandLogoVariant

  /**
   * Marca o logo como decoração: sai da árvore de acessibilidade.
   *
   * Use quando o nome do produto já aparece em texto ao lado — aí o logo é
   * redundante para quem usa leitor de tela. Sem isto, o logo é informativo e
   * anunciado com o nome da marca.
   * @default false
   */
  decorative?: boolean

  /**
   * Substitui o nome acessível natural (ex.: "Sansys Water").
   *
   * Raramente necessário: o nome já vem dos dados da marca. Serve para
   * contexto que pede outra coisa — "Página inicial do Sansys Water", num logo
   * que é link.
   */
  ariaLabel?: string
}

/**
 * Classes computadas do logo.
 */
export interface BrandLogoClasses {
  'dss-brand-logo': true
  [key: string]: boolean
}
