import { computed, inject, onBeforeUnmount, type ComputedRef } from 'vue'
import type { DssCompositionProps } from '../types/composition.types'
import {
  DSS_COMPOSITION_GROUP_KEY,
  type DssCompositionGroupItem,
} from '../../DssCompositionGroup/types/composition-group.types'

/**
 * Classes da raiz. A marca NÃO entra por classe — entra pelo atributo
 * `data-brand` no nó raiz (regra B3 do `validate:brand-form`).
 */
export function useCompositionClasses(
  props: Readonly<DssCompositionProps>,
  invalida: ComputedRef<boolean>,
) {
  const rootClasses = computed(() => [
    'dss-composition',
    invalida.value && 'dss-composition--invalid',
    props.disabled && 'dss-composition--disabled',
    props.readonly && 'dss-composition--readonly',
  ].filter(Boolean))
  return { rootClasses }
}

/**
 * Liga a composição ao `DssCompositionGroup`, se houver um acima dela.
 *
 * Fora do grupo devolve `null` e a composição é um campo comum. Dentro dele,
 * a composição informa nome, rótulo, contagem, obrigatoriedade e erro — e
 * passa a ser o PAINEL da própria aba. Ela continua montada mesmo com a aba
 * inativa (`v-show`, não `v-if`): desmontada, sairia do `DssForm` (risco 5).
 */
export function useCompositionGroup(item: ComputedRef<DssCompositionGroupItem>) {
  const grupo = inject(DSS_COMPOSITION_GROUP_KEY, null)
  if (!grupo) return null

  if (import.meta.env?.DEV && !item.value.name) {
    console.warn('[DSS] DssComposition dentro de DssCompositionGroup precisa de `name`.')
  }

  const remover = grupo.register(item)
  onBeforeUnmount(remover)

  const ativa = computed(() => grupo.active.value === item.value.name)
  const tabId = computed(() => grupo.tabId(item.value.name))
  const panelId = computed(() => grupo.panelId(item.value.name))

  return { ativa, tabId, panelId }
}
