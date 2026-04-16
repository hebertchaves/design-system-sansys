/**
 * ==========================================================================
 * DssToolbar — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssToolbar.
 * Barra de ferramentas horizontal — wrapper DSS governado sobre QToolbar.
 *
 * @version 1.0.0
 */

// ==========================================================================
// TIPO: BRAND
// ==========================================================================

/**
 * Brands DSS disponíveis para o fundo da toolbar.
 * Cada brand aplica a cor primária do produto correspondente.
 */
export type ToolbarBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// PROPS
// ==========================================================================

/**
 * Props do DssToolbar.
 *
 * A API expõe seletivamente as props do QToolbar, bloqueando aquelas
 * governadas pelo sistema de tokens e brandabilidade DSS.
 *
 * Props bloqueadas:
 * - dark: modo escuro governado globalmente pelo DSS via [data-theme="dark"]
 * - glossy: efeito visual não utilizado no DSS
 * - color / text-color: cores governadas por tokens + prop brand
 */
export interface ToolbarProps {
  /**
   * Adiciona recuo extra à esquerda (padding-inline-start ampliado).
   * Útil quando alinhado com um menu lateral ou drawer.
   * Padrão: padding-inline 16px → inset: 24px
   */
  inset?: boolean

  /**
   * Aplica cor de fundo da brand selecionada.
   * Ativa automaticamente `data-brand` no elemento para herança de brand pelos filhos.
   *
   * - `hub`: fundo laranja (#ef7a11)
   * - `water`: fundo azul (#026cc7)
   * - `waste`: fundo verde (#0b8154)
   *
   * Quando definido, o texto muda para `--dss-text-inverse` (branco).
   */
  brand?: ToolbarBrand
}

// ==========================================================================
// SLOTS
// ==========================================================================

/**
 * Slots disponíveis no DssToolbar.
 */
export interface ToolbarSlots {
  /**
   * Conteúdo da barra de ferramentas.
   * Tipicamente: DssButton (variante flat/ghost), texto, DssIcon, DssSpace.
   * O DssToolbar NÃO instancia filhos automaticamente — composição é responsabilidade do consumidor.
   */
  default(): unknown
}
