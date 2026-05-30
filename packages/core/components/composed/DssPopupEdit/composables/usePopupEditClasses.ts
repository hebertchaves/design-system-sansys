import { computed } from 'vue'
import type { DssPopupEditProps } from '../types/popupedit.types'

/**
 * Gera classes BEM para o DssPopupEdit.
 *
 * Nota: O QPopupEdit não expõe `popup-content-class` nem `content-class`.
 * As classes BEM do DSS são aplicadas no elemento via CSS global que
 * sobrescreve `.q-popup-edit` (EXC-Gate-01).
 * Este composable mantém a convenção DSS de centralizar lógica de classes.
 */
export function usePopupEditClasses(props: DssPopupEditProps) {
  const popupEditClasses = computed(() => ({
    'dss-popup-edit': true,
    'dss-popup-edit--with-title': !!props.title,
    'dss-popup-edit--with-buttons': props.buttons !== false,
    'dss-popup-edit--fit': props.fit === true,
    'dss-popup-edit--cover': props.cover === true,
    'dss-popup-edit--persistent': props.persistent === true,
    'dss-popup-edit--disabled': props.disable === true,
  }))

  return { popupEditClasses }
}
