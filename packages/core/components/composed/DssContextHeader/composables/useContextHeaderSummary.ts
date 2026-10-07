/**
 * ==========================================================================
 * useContextHeaderSummary — o que sobrevive à retração
 * ==========================================================================
 *
 * Retrair o cabeçalho NÃO é "mostrar o mesmo conteúdo menor". Medido no
 * protótipo: a faixa retraída mantém a identidade, o botão de detalhes e DUAS
 * informações — as demais somem inteiras. Encolher todas produziria texto
 * ilegível e uma faixa que continua roubando a altura que a retração existe
 * para devolver.
 *
 * Quais duas é decisão de quem monta a tela (`summary`), porque muda por
 * filial. Sem a declaração, caem as duas primeiras na ordem do documento: é um
 * default honesto — nunca vazio, nunca arbitrário — mas raramente o certo.
 */

import { computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type {
  ContextHeaderGroup,
  ContextHeaderItem,
} from '../types/context-header.types'

/** Quantas informações o default mantém quando `summary` não é declarado. */
const PADRAO_DE_RESUMO = 2

export function useContextHeaderSummary(
  groups: Ref<ContextHeaderGroup[]>,
  summary: Ref<string[]>,
): {
  /** Todas as informações, achatadas, na ordem do documento. */
  todasAsInformacoes: ComputedRef<ContextHeaderItem[]>
  /** As informações que o estado retraído mantém. */
  informacoesDoResumo: ComputedRef<ContextHeaderItem[]>
} {
  const todasAsInformacoes = computed(() =>
    groups.value.flatMap((grupo) => grupo.items ?? []),
  )

  const informacoesDoResumo = computed(() => {
    if (!summary.value.length) {
      return todasAsInformacoes.value.slice(0, PADRAO_DE_RESUMO)
    }

    // A ordem é a de `summary`, não a do documento: quem declarou o resumo
    // declarou também a prioridade. Um `name` que não existe é ignorado em
    // silêncio — dado incompleto é o caso NORMAL aqui, não um erro.
    return summary.value
      .map((nome) => todasAsInformacoes.value.find((i) => i.name === nome))
      .filter((i): i is ContextHeaderItem => i !== undefined)
  })

  return { todasAsInformacoes, informacoesDoResumo }
}
