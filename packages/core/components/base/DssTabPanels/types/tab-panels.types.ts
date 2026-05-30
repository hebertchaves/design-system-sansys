/**
 * TypeScript types para DssTabPanels.
 *
 * Container pai dos DssTabPanel. Wrapper DSS governado sobre QTabPanels.
 * Gerencia qual painel está ativo via v-model e coordena transições.
 *
 * Props bloqueadas (governança DSS):
 * - dark: DSS governa dark mode globalmente via [data-theme="dark"]
 * - transition-prev: DSS governa transições internamente quando animated=true
 * - transition-next: DSS governa transições internamente quando animated=true
 *
 * @see https://quasar.dev/vue-components/tab-panels
 */

/**
 * Props expostas pelo DssTabPanels.
 */
export interface TabPanelsProps {
  /**
   * Identificador do painel ativo.
   * Deve corresponder à prop `name` de um DssTabPanel filho.
   * Usado em conjunto com v-model.
   */
  modelValue: string | number

  /**
   * Habilita transição animada (fade governado pelo DSS) ao trocar de painel.
   * Quando true, DssTabPanels governa internamente a transição com tokens
   * --dss-duration-200 e --dss-easing-standard.
   * Respeitado por @media (prefers-reduced-motion: reduce).
   * @default false
   */
  animated?: boolean

  /**
   * Habilita navegação por gesto de swipe (útil em dispositivos touch/mobile).
   * @default false
   */
  swipeable?: boolean

  /**
   * Ao chegar no último painel, retorna ao primeiro (e vice-versa).
   * @default false
   */
  infinite?: boolean

  /**
   * Mantém o estado dos painéis inativos em memória via Vue KeepAlive.
   * Útil quando painéis contêm formulários ou outros estados que devem
   * ser preservados ao alternar entre abas.
   * @default false
   */
  keepAlive?: boolean
}

/**
 * Eventos emitidos pelo DssTabPanels.
 */
export interface TabPanelsEmits {
  /**
   * Emitido quando o painel ativo muda.
   * Suporta v-model via update:modelValue.
   */
  (e: 'update:modelValue', value: string | number): void
}

/**
 * Slots do DssTabPanels.
 */
export interface TabPanelsSlots {
  /**
   * Slot para componentes DssTabPanel filhos.
   *
   * Gate de Composição v2.4:
   * Este slot aceita EXCLUSIVAMENTE componentes DssTabPanel.
   * Uso de QTabPanel diretamente ou HTML nativo viola a governança DSS.
   *
   * Anti-patterns:
   * - ❌ <q-tab-panel> no slot (usar DssTabPanel)
   * - ❌ <div> com conteúdo diretamente no slot (usar DssTabPanel como wrapper)
   * - ❌ Aninhar DssTabPanels dentro de outro DssTabPanels
   */
  default(): any
}
