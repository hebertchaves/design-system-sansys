/**
 * ==========================================================================
 * usePopupProxyClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssPopupProxy.
 *
 * Golden Reference: DssChip
 * Golden Context: DssMenu (useMenuClasses)
 *
 * NOTA ARQUITETURAL:
 * DssPopupProxy não possui variantes CSS próprias. A classe dss-popup-proxy
 * é o hook de escopo CSS para os estilos globais do overlay (menu e dialog).
 * O composable existe para consistência arquitetural DSS e extensibilidade futura.
 *
 * @example
 * ```ts
 * const { popupProxyClasses } = usePopupProxyClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { PopupProxyProps } from '../types/popupproxy.types'

/**
 * Composable para classes CSS do DssPopupProxy.
 */
export function usePopupProxyClasses(props: Readonly<PopupProxyProps>) {
  /**
   * Classes CSS computadas aplicadas ao q-popup-proxy.
   *
   * `.dss-popup-proxy` é o hook de escopo DSS — QPopupProxy repassa esta
   * classe para o elemento raiz do QMenu (modo desktop) ou QDialog (modo mobile).
   * Os estilos são globais e aplicados via components/index.scss.
   */
  const popupProxyClasses = computed(() => ['dss-popup-proxy'])

  return {
    popupProxyClasses
  }
}
