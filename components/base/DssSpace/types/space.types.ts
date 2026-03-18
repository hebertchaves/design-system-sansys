/**
 * ==========================================================================
 * DssSpace — TypeScript Types
 * ==========================================================================
 */

/**
 * Sufixos numéricos dos tokens --dss-spacing-* suportados como tamanho fixo.
 *
 * Cada valor mapeia diretamente para o token correspondente:
 * @example 'px'  → var(--dss-spacing-px)  = 1px
 * @example '0_5' → var(--dss-spacing-0_5) = 2px
 * @example '4'   → var(--dss-spacing-4)   = 16px
 *
 * ⚠️ Apenas valores existentes no catálogo DSS são aceitos.
 * Valores arbitrários (ex.: '23', '15') são inválidos.
 */
export type SpaceSize =
  | 'px'
  | '0_5'
  | '1'
  | '1_5'
  | '2'
  | '2_5'
  | '3'
  | '3_5'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '14'
  | '16'
  | '20'
  | '24'

/**
 * Props públicas do DssSpace.
 */
export interface SpaceProps {
  /**
   * Tamanho fixo do espaço, mapeado diretamente para tokens --dss-spacing-*.
   *
   * - Quando ausente (padrão): modo flex-grow — ocupa TODO o espaço disponível
   *   restante no flex container (`flex: 1 1 auto`).
   * - Quando presente: modo tamanho fixo — ocupa exatamente o valor do token
   *   correspondente (`flex: 0 0 auto` + dimensão via var(--dss-spacing-{size})).
   *
   * Use apenas valores do tipo SpaceSize. Valores fora do catálogo DSS são
   * inválidos e não produzirão nenhum estilo.
   */
  size?: SpaceSize
}
