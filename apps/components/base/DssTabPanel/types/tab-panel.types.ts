/**
 * ==========================================================================
 * DssTabPanel — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssTabPanel.
 * Painel de conteúdo de aba — wrapper DSS sobre QTabPanel.
 *
 * Nível de Composição: Nível 1 (Independente)
 * Golden Reference: DssCard
 * Golden Context: DssTabPanels (container pai obrigatório, Nível 2)
 *
 * @version 1.0.0
 */

// ==========================================================================
// INTERFACES — DssTabPanel
// ==========================================================================

/**
 * Props do componente DssTabPanel.
 *
 * A API expõe seletivamente as props do QTabPanel,
 * mantendo apenas as semanticamente relevantes para o DSS.
 *
 * Props bloqueadas:
 * - dark: modo escuro é governado globalmente via [data-theme="dark"] no DSS.
 */
export interface TabPanelProps {
  /**
   * Identificador único do painel.
   * Deve corresponder ao `name` do DssTab associado no DssTabs.
   *
   * Obrigatório: o v-model do DssTabPanels (container pai)
   * usa este valor para exibir o painel correto.
   *
   * @example 'perfil'
   * @example 'configuracoes'
   * @example 1
   */
  name: string | number

  /**
   * Desabilita o painel, bloqueando interações com seu conteúdo.
   *
   * Nota: O QTabPanel gerencia a visibilidade — `disable` impede
   * a seleção do painel pelo DssTabs/DssTabPanels mas não oculta
   * o conteúdo quando já exibido. Para controle de visibilidade,
   * use o v-model do DssTabPanels.
   *
   * @default false
   */
  disable?: boolean
}

// ==========================================================================
// SLOTS
// ==========================================================================

/**
 * Slots disponíveis no DssTabPanel.
 */
export interface TabPanelSlots {
  /**
   * Conteúdo do painel de aba.
   *
   * Aceita qualquer componente DSS ou conteúdo HTML.
   * O DssTabPanel é um container estrutural não-interativo —
   * a interatividade pertence exclusivamente aos filhos.
   *
   * Exemplos de uso recomendado:
   * - DssCard (superfície de conteúdo)
   * - Formulários com DssInput, DssSelect, DssCheckbox
   * - DssList com DssItem
   * - Conteúdo editorial (texto, imagens)
   *
   * ⚠️ Regra de Composição v2.4:
   * O DssTabPanel fornece container e layout — não estiliza filhos internamente.
   * Composição é responsabilidade do consumidor.
   */
  default(): any
}
