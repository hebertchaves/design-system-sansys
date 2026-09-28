import { computed } from 'vue'
import type { ActionMenuProps } from '../types/action-menu.types'

/**
 * Classes da raiz do DssActionMenu.
 *
 * Composto THIN: variante e cor são repassadas ao DssButton por PROP, não viram
 * classe própria da barra. O que a raiz carrega é o estado do conjunto — o único
 * fato que é da barra e não das peças.
 */
export function useActionMenuClasses(props: ActionMenuProps) {
  const rootClasses = computed(() => ({
    'dss-action-menu--disabled': props.disabled,
  }))

  return { rootClasses }
}
