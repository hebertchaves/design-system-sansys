/**
 * ==========================================================================
 * DssTabs — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssTabs.
 * Container de navegação por abas — wrapper DSS sobre QTabs.
 *
 * @version 1.0.0
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Marcas do sistema Sansys
 */
export type TabsBrand = 'hub' | 'water' | 'waste'

/**
 * Alinhamento das abas dentro do container.
 * Equivale à prop `align` do QTabs.
 */
export type TabsAlign = 'left' | 'center' | 'right' | 'justify'

// ==========================================================================
// INTERFACES — DssTabs
// ==========================================================================

/**
 * Props do componente DssTabs.
 *
 * A API espelha seletivamente a do QTabs, expondo apenas as props
 * semanticamente relevantes para o DSS.
 *
 * Props bloqueadas:
 * - active-color: cor da aba ativa governada por tokens no DssTab
 * - active-bg-color: cor de fundo da aba ativa governada por tokens no DssTab
 * - indicator-color: cor do indicador governada por tokens no DssTab
 * - ripple: desativado permanentemente (:ripple="false") — DSS governa feedback visual
 * - no-caps: governado por CSS/tokens DSS, não por prop
 */
export interface TabsProps {
  /**
   * Identificador da aba atualmente selecionada (v-model).
   * Deve corresponder ao `name` de um DssTab filho.
   */
  modelValue?: string | number

  /**
   * Alinhamento das abas no container.
   * - `left`: abas à esquerda (padrão)
   * - `center`: abas centralizadas
   * - `right`: abas à direita
   * - `justify`: abas distribuídas ocupando toda a largura
   *
   * @default 'left'
   */
  align?: TabsAlign

  /**
   * Largura (px) abaixo da qual o alinhamento é FORÇADO a `justify`.
   *
   * NÃO controla as setas de navegação — elas aparecem por transbordo, não por
   * largura. A documentação anterior desta prop dizia o contrário; conferido na
   * fonte do Quasar (`QTabs.js`: `justify.value = size < breakpoint`).
   *
   * Default `0` (o Quasar usa 600): em 0 a condição nunca é satisfeita e a prop
   * `align` é respeitada em qualquer largura. Declare um valor para reativar o
   * justify responsivo.
   *
   * @default 0
   */
  breakpoint?: number

  /**
   * Exibe as abas em layout vertical (coluna).
   * O indicador é exibido na lateral em vez de abaixo.
   *
   * @default false
   */
  vertical?: boolean

  /**
   * Modo compacto: reduz o padding interno do container de abas.
   * Não afeta o padding das abas individuais (DssTab).
   *
   * @default false
   */
  dense?: boolean

  /**
   * Marca Sansys (Hub, Water, Waste).
   * Aplica acento visual de marca nas setas de navegação e
   * propaga [data-brand] para coloração dos filhos DssTab.
   *
   * @default null
   */
  brand?: TabsBrand | null

  /**
   * Label acessível para o grupo de abas (aria-label).
   * Recomendado quando o grupo não possui label visual visível.
   *
   * @example 'Configurações da conta'
   * @example 'Seções do painel'
   */
  ariaLabel?: string

  // ========================================================================
  // APRESENTAÇÃO — expostas em set/2026 pelo de-para com o QTabs
  //
  // Sete props do QTabs não estavam expostas nem bloqueadas: simplesmente não
  // tinham chegado ao wrapper. O efeito prático era um componente sem variação
  // visual — toda barra saía igual, com ícone empilhado sobre o rótulo.
  // Bloqueio é decisão; ausência silenciosa não é.
  // ========================================================================

  /**
   * Coloca ícone e rótulo LADO A LADO, em vez de empilhados.
   *
   * O empilhado é o padrão Material e ocupa mais altura; inline é o formato de
   * barra de navegação densa. Sem esta prop, só existia o empilhado.
   *
   * @default false
   */
  inlineLabel?: boolean

  /**
   * Indicador com a largura do RÓTULO, em vez da aba inteira.
   * @default false
   */
  narrowIndicator?: boolean

  /**
   * Inverte o lado do indicador (topo em barra horizontal).
   * @default false
   */
  switchIndicator?: boolean

  /**
   * O grupo ocupa apenas a largura do conteúdo, em vez de esticar.
   * @default false
   */
  shrink?: boolean

  /**
   * Estica o grupo na altura do container pai.
   *
   * ⚠️ PRÉ-CONDIÇÃO: só surte efeito quando o pai é FLEX e tem altura própria —
   * é o contrato do Quasar ("when used on flexbox parent"). Num pai `display:
   * block` a classe é aplicada e nada muda; conferido no Preview Frame, cuja
   * moldura dimensiona pelo conteúdo.
   *
   * @default false
   */
  stretch?: boolean

  /**
   * Setas de navegação FORA da área das abas.
   *
   * ⚠️ PRÉ-CONDIÇÃO: as setas só existem quando as abas TRANSBORDAM o container.
   * Sem transbordo o Quasar marca `q-tabs--not-scrollable` e o DSS as esconde —
   * esta prop troca a classe e nada aparece. Para observá-la, estreite o
   * container ou aumente o número/tamanho das abas.
   *
   * @default false
   */
  outsideArrows?: boolean

  /**
   * Mantém as setas em dispositivos móveis (onde o Quasar as esconde por
   * padrão, assumindo gesto de arrastar).
   *
   * ⚠️ PRÉ-CONDIÇÃO: dupla — viewport móvel E transbordo. Num desktop sem
   * transbordo a prop não tem como se manifestar.
   *
   * @default false
   */
  mobileArrows?: boolean
}

// ==========================================================================
// EMITS
// ==========================================================================

/**
 * Emits do componente DssTabs.
 */
export interface TabsEmits {
  /**
   * Emitido quando o usuário seleciona uma aba.
   * Compatível com v-model.
   */
  (e: 'update:modelValue', value: string | number): void
}

// ==========================================================================
// SLOTS
// ==========================================================================

/**
 * Slots disponíveis no DssTabs.
 */
export interface TabsSlots {
  /**
   * Conteúdo do grupo de abas.
   * Aceita: DssTab (principal).
   *
   * ⚠️ Regra de Composição v2.4:
   * Somente DssTab (ou DssRouteTab quando implementado) deve ser usado
   * dentro do DssTabs. O uso de <q-tab> diretamente é uma violação
   * arquitetural documentada no gate de composição.
   *
   * Nota: Elementos não-DSS dentro do slot não receberão
   * os estilos de indicador e navegação do DssTabs automaticamente.
   */
  default(): any
}
