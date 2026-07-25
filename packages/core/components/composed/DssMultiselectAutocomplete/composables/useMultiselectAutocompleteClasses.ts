import { computed } from 'vue'
import type { MultiselectAutocompleteProps } from '../types/multiselect-autocomplete.types'

/**
 * Classes da raiz do DssMultiselectAutocomplete.
 *
 * Composto THIN: o brand é propagado ao DssSelect via prop (não via classe
 * própria), então a raiz carrega apenas a classe base. Mantido como composable
 * (paridade estrutural + ponto de extensão para variantes futuras do Incremento 2).
 */
export function useMultiselectAutocompleteClasses(_props: MultiselectAutocompleteProps) {
  const rootClasses = computed(() => ({
    'dss-multiselect-autocomplete': true,
  }))

  return { rootClasses }
}
