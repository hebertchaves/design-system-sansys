import { computed, provide, ref, useId, type ComputedRef, type Ref } from 'vue'
import type {
  DssCompositionGroupContext,
  DssCompositionGroupItem,
} from '../types/composition-group.types'
import { DSS_COMPOSITION_GROUP_KEY } from '../types/composition-group.types'

/**
 * Classes da raiz. A marca NÃO entra por classe — entra pelo atributo
 * `data-brand` no nó raiz (regra B3 do `validate:brand-form`).
 */
export function useCompositionGroupClasses() {
  const rootClasses = computed(() => ['dss-composition-group'])
  return { rootClasses }
}

/**
 * Fornece o contexto às `DssComposition` filhas (provide/inject tipado).
 *
 * As coleções se REGISTRAM — o grupo não varre o slot. Isso mantém a ordem
 * de montagem como ordem das abas e não depende da forma dos VNodes.
 */
export function provideCompositionGroup(ativa: Ref<string | null>) {
  const itens = ref<ComputedRef<DssCompositionGroupItem>[]>([])
  const base = `dss-composition-group-${useId()}`

  const context: DssCompositionGroupContext = {
    register(item) {
      itens.value.push(item)
      return () => {
        itens.value = itens.value.filter((registrado) => registrado !== item)
      }
    },
    active: ativa,
    tabId: (name) => `${base}-tab-${name}`,
    panelId: (name) => `${base}-panel-${name}`,
  }
  provide(DSS_COMPOSITION_GROUP_KEY, context)

  const colecoes = computed(() => itens.value.map((item) => item.value))
  return { context, colecoes }
}
