/**
 * ==========================================================================
 * useDataBoardContext — a retração em cascata
 * ==========================================================================
 *
 * §1.2 do guia de Fase 3: estado global do bloco via `provide/inject` TIPADO,
 * não prop drilling.
 *
 * É o que faz a retração alcançar TODOS os aninhamentos. O board provê; o
 * painel injeta; um KPI dentro do painel também pode injetar. Nenhum deles
 * precisa receber prop de ninguém, e nenhum nível intermediário precisa saber
 * que existe retração.
 *
 * O valor é `Readonly`: quem recolhe é o board. Um filho que pudesse escrever
 * criaria dois donos para o mesmo estado — e o segundo venceria por ordem de
 * montagem, não por decisão.
 */

import { computed, inject, provide, readonly, ref } from 'vue'
import type { Ref } from 'vue'
import { DSS_DATA_BOARD } from '../types/data-board.types'
import type { DataBoardContext } from '../types/data-board.types'

/** Chamado pelo `DssDataBoard`. */
export function provideDataBoard(collapsed: Ref<boolean>): void {
  provide(DSS_DATA_BOARD, {
    collapsed: readonly(collapsed),
    expanded: computed(() => !collapsed.value),
  })
}

/**
 * Chamado por qualquer descendente que precise reagir à retração.
 *
 * O default (`collapsed: false`) é deliberado: um painel usado FORA de um board
 * renderiza expandido, que é o comportamento útil. Lançar erro aqui tornaria o
 * subcomponente inutilizável isolado — inclusive no próprio Preview Frame.
 */
export function useDataBoard(): DataBoardContext {
  const semBoard = ref(false)
  return inject(DSS_DATA_BOARD, {
    collapsed: readonly(semBoard),
    expanded: computed(() => true),
  })
}
