import { computed } from 'vue'
import type { ItemSectionProps } from '../types/item-section.types'

/**
 * Composable responsável pelo cálculo das classes CSS do DssItemSection.
 *
 * Segue o padrão DSS v2.2 de separação de concerns:
 * - Template: estrutura e bindings
 * - Composable: lógica de classes (computed reativo)
 * - SCSS: estilos visuais
 */
export function useItemSectionClasses(props: ItemSectionProps) {
  const itemSectionClasses = computed(() => [
    'dss-item-section',
    {
      'dss-item-section--avatar': props.avatar,
      'dss-item-section--thumbnail': props.thumbnail,
      'dss-item-section--side': props.side,
      'dss-item-section--top': props.top,
      'dss-item-section--nowrap': props.noWrap,
    }
  ])

  return { itemSectionClasses }
}
