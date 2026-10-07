/**
 * ==========================================================================
 * useContextHeaderContext — a retração em cascata
 * ==========================================================================
 *
 * §1.2 do guia de Fase 3: estado global do bloco via `provide/inject` TIPADO,
 * não prop drilling.
 *
 * O cabeçalho provê; qualquer descendente injeta — inclusive conteúdo que
 * chegou por slot e que o cabeçalho não conhece. Nenhum nível intermediário
 * precisa saber que existe retração.
 *
 * O valor é `Readonly`: quem recolhe é o cabeçalho. Um filho que pudesse
 * escrever criaria dois donos para o mesmo estado.
 */

import { computed, inject, provide, readonly, ref } from 'vue'
import type { Ref } from 'vue'
import { DSS_CONTEXT_HEADER } from '../types/context-header.types'
import type { ContextHeaderContext } from '../types/context-header.types'

/** Chamado pelo `DssContextHeader`. */
export function provideContextHeader(collapsed: Ref<boolean>): void {
  provide(DSS_CONTEXT_HEADER, {
    collapsed: readonly(collapsed),
    expanded: computed(() => !collapsed.value),
  })
}

/**
 * Chamado por qualquer descendente que precise reagir à retração.
 *
 * O default (`collapsed: false`) é deliberado: conteúdo usado FORA de um
 * cabeçalho renderiza expandido, que é o comportamento útil. Lançar erro aqui
 * tornaria o descendente inutilizável isolado — inclusive no Preview Frame.
 */
export function useContextHeader(): ContextHeaderContext {
  const semCabecalho = ref(false)
  return inject(DSS_CONTEXT_HEADER, {
    collapsed: readonly(semCabecalho),
    expanded: computed(() => true),
  })
}
