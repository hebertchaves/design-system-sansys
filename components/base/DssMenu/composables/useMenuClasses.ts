/**
 * ==========================================================================
 * useMenuClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssMenu.
 *
 * Golden Reference: DssTooltip (useTooltipClasses)
 * Golden Context: DssList (useListClasses)
 *
 * NOTA ARQUITETURAL:
 * DssMenu não possui variantes CSS próprias (elevated, bordered, etc.).
 * O QMenu gerencia posicionamento, fit e cover internamente.
 * O composable existe para manutenção da arquitetura consistente com DSS
 * e para facilitar extensão futura.
 *
 * @example
 * ```ts
 * const { menuClasses } = useMenuClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { MenuProps } from '../types/menu.types'

/**
 * Composable para classes CSS do menu
 */
export function useMenuClasses(props: Readonly<MenuProps>) {
  /**
   * Classes CSS computadas do menu
   *
   * `.dss-menu` é a classe de hook DSS aplicada ao QMenu.
   * Como QMenu teleporta para o body, os estilos são globais
   * e requerem que `.dss-menu` seja o seletor de escopo.
   */
  const menuClasses = computed(() => [
    'dss-menu'
  ])

  return {
    menuClasses
  }
}
