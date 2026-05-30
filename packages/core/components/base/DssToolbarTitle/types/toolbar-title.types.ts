/**
 * ==========================================================================
 * DssToolbarTitle — Types
 * ==========================================================================
 */

export interface ToolbarTitleProps {
  /**
   * Impede que o título cresça para ocupar o espaço disponível (flex-shrink).
   * Útil quando há múltiplos elementos flexíveis na mesma DssToolbar.
   * @default false
   */
  shrink?: boolean
}

export interface ToolbarTitleSlots {
  /**
   * Conteúdo do título. Recomenda-se texto simples ou elementos inline.
   * Para título principal de página, utilize `<h1>` internamente.
   */
  default?: () => unknown

  /**
   * Subtítulo exibido abaixo do título principal.
   */
  subtitle?: () => unknown
}
