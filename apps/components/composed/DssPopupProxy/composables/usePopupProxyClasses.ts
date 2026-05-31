import type { DssPopupProxyProps } from '../types/popupproxy.types'

/**
 * usePopupProxyClasses — Composable de classes do DssPopupProxy
 *
 * Retorna a classe base `dss-popup-proxy` que é passada via v-bind ao QPopupProxy.
 * QPopupProxy repassa esta classe (via attrs) ao QMenu ou QDialog interno, permitindo
 * que o CSS DSS os estilos corretos no elemento renderizado no DOM.
 *
 * EXC-Gate-01: QPopupProxy é o root — não há wrapper de elemento DOM próprio.
 * A classe `dss-popup-proxy` não aparece em um elemento próprio; ela é forwarded
 * ao QMenu (`.q-menu.dss-popup-proxy`) ou ao QDialog (`.q-dialog.dss-popup-proxy`).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function usePopupProxyClasses(_props: DssPopupProxyProps) {
  return {
    classes: 'dss-popup-proxy' as const
  }
}
