/**
 * ==========================================================================
 * useDataBoardChips — a lista de filtros aplicados em UMA linha
 * ==========================================================================
 *
 * O que este composable resolve: a lista de chips ocupa uma linha só, e o que
 * não couber vive atrás de um gatilho "+N filtros" que a revela.
 *
 * POR QUE MEDIR O LAYOUT, e não somar larguras em cache:
 *
 * A primeira versão disto (escrita direto na página do grid master) media os
 * chips UMA vez e reaproveitava os números. Medido, o defeito apareceu na hora:
 * estreitar o container recalculava, ALARGAR não — a conta usava larguras
 * velhas e o gatilho ficava preso em "+9 filtros" num espaço que já comportava
 * sete chips.
 *
 * Aqui cada recálculo renderiza tudo com `wrap` por um tick e pergunta ao
 * NAVEGADOR quem ficou na primeira linha. Quem encaixa é o motor de layout; o
 * código só lê o resultado.
 *
 * POR QUE `hidden` E NÃO SÓ `overflow: hidden`:
 *
 * Recorte de CSS esconde da VISTA, não do DOM — o chip recortado continua
 * tabulável e continua sendo lido pelo leitor de tela, que é uma armadilha de
 * teclado em cima de algo invisível. O excedente sai da árvore de
 * acessibilidade.
 */

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { DataBoardAppliedFilter } from '../types/data-board.types'

/** `--dss-spacing-2`, o gap entre chips. */
const GAP_CHIPS = 8

export function useDataBoardChips(
  filtros: Ref<DataBoardAppliedFilter[]>,
  lista: Ref<HTMLElement | null>,
) {
  const expandidos = ref(false)
  const medindo = ref(true)
  const visiveis = ref(0)

  const ocultos = computed(() =>
    Math.max(0, filtros.value.length - visiveis.value),
  )

  function chipVisivel(i: number) {
    return medindo.value || expandidos.value || i < visiveis.value
  }

  // Uma execução por vez. O `ResizeObserver` dispara DURANTE o passo de
  // medição (ele mexe no DOM), e duas execuções concorrentes se corrompem: a
  // primeira desliga `medindo` enquanto a segunda ainda mede, e a segunda passa
  // a medir uma lista JÁ RECOLHIDA. Medido: o número caía um degrau a cada
  // redimensionamento até chegar a 1.
  let emAndamento = false
  let pendente = false

  async function recalcular(): Promise<void> {
    if (emAndamento) {
      pendente = true
      return
    }
    emAndamento = true
    try {
      await medir()
    } finally {
      emAndamento = false
      if (pendente) {
        pendente = false
        await recalcular()
      }
    }
  }

  async function medir() {
    const total = filtros.value.length
    if (!total) {
      visiveis.value = 0
      return
    }

    // 1º tick: tudo visível e com quebra de linha, para o navegador encaixar.
    medindo.value = true
    await nextTick()

    const el = lista.value
    if (!el) {
      medindo.value = false
      return
    }

    // Consulta o DOM na hora de medir, em vez de guardar `ref` de `v-for`: esse
    // array mantém nós DEFASADOS entre renderizações (e depois de HMR), e medir
    // nó solto devolve zero sem avisar.
    const todosLi = [...el.querySelectorAll<HTMLElement>(':scope > li')]
    const liGatilho = todosLi.find((li) => li.querySelector('[aria-expanded]')) ?? null
    const itens = todosLi.filter((li) => li !== liGatilho)
    if (!itens.length) {
      medindo.value = false
      return
    }

    // `offsetTop` só identifica a linha porque o modo de medição alinha os
    // itens pelo TOPO. Com `align-items: center` cada item da MESMA linha fica
    // num topo diferente (alturas diferentes), e o teste seria falso.
    const topo = itens[0].offsetTop
    const naPrimeiraLinha = itens.filter((li) => li.offsetTop === topo)

    if (naPrimeiraLinha.length === total) {
      // Coube tudo — nenhum gatilho a desenhar, nenhum chip a esconder.
      visiveis.value = total
    } else {
      const larguraLista = el.clientWidth
      const larguraGatilho = liGatilho?.getBoundingClientRect().width ?? 0
      const larguras = naPrimeiraLinha.map((li) => li.getBoundingClientRect().width)
      let n = larguras.length
      let usado = larguras.reduce((a, w) => a + w, 0) + GAP_CHIPS * (n - 1)

      // Cede chips até o gatilho caber.
      while (n > 1 && usado + GAP_CHIPS + larguraGatilho > larguraLista) {
        usado -= larguras[n - 1] + GAP_CHIPS
        n--
      }

      // Largura extrema: nem UM chip mais o gatilho cabem. Aqui o chip cede,
      // não o gatilho — medido a 202px, manter um chip fazia a linha
      // transbordar e o recorte comia justamente o "+N filtros", que é o único
      // caminho até os escondidos.
      if (n === 1 && usado + GAP_CHIPS + larguraGatilho > larguraLista) n = 0

      visiveis.value = n
    }

    medindo.value = false
  }

  let observador: ResizeObserver | null = null
  let agendado = 0

  function agendarRecalculo() {
    // O recálculo mexe no DOM, e mexer no DOM dentro do callback do
    // ResizeObserver dispara o aviso de loop. Um frame de folga resolve.
    cancelAnimationFrame(agendado)
    agendado = requestAnimationFrame(() => {
      recalcular()
    })
  }

  onMounted(async () => {
    await recalcular()
    if (lista.value && typeof ResizeObserver !== 'undefined') {
      observador = new ResizeObserver(agendarRecalculo)
      observador.observe(lista.value)
    }
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(agendado)
    observador?.disconnect()
  })

  // A lista mudou — o encaixe precisa ser refeito.
  watch(() => filtros.value.length, () => {
    recalcular()
  })

  return { expandidos, medindo, visiveis, ocultos, chipVisivel, recalcular }
}
