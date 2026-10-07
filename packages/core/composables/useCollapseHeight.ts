/**
 * ==========================================================================
 * useCollapseHeight — a altura que acompanha a retração
 * ==========================================================================
 *
 * O PROBLEMA
 *
 * Retrair um bloco do DSS não é esconder conteúdo: é TROCAR de arranjo. O
 * `DssDataBoard` deixa de ser coluna e vira linha; o `DssContextHeader` troca
 * a lista inteira de informações pelo resumo. A troca é instantânea — classe
 * entra, layout muda — e o resultado é o salto seco que se vê na tela.
 *
 * POR QUE NÃO DÁ PARA FAZER SÓ EM CSS
 *
 * A altura é `auto` nos dois estados, e `auto → auto` não interpola. As saídas
 * conhecidas não servem a este caso:
 *
 *   `grid-template-rows: 1fr → 0fr`  funciona quando o conteúdo SOME. Aqui ele
 *                                    muda de lugar: durante a transição o
 *                                    campo saltaria para o lado do título
 *                                    antes de desaparecer.
 *   `max-block-size`                 exige um teto chutado; alto demais faz a
 *                                    animação "esperar", baixo demais recorta.
 *   `interpolate-size: allow-keywords` resolve de verdade, mas só em Chromium.
 *
 * Sobra medir. É o que este composable faz, e é a receita clássica de sanfona:
 * trava a altura ANTERIOR, deixa o navegador recalcular a NOVA, e transita
 * entre as duas em pixels. O conteúdo já trocou no instante zero e fica
 * RECORTADO pelo `overflow: hidden` do bloco enquanto a caixa se move — que é
 * exatamente a leitura de uma gaveta abrindo ou fechando.
 *
 * O QUE ELE NÃO FAZ
 *
 * Não anima o conteúdo. A troca de arranjo continua instantânea; quem a
 * suaviza é o esmaecimento declarado no CSS de cada componente, disparado pelo
 * atributo `data-dss-collapsing` que este composable liga durante a transição.
 * Separar as duas coisas é deliberado: altura é medida (JS), estilo é CSS.
 *
 * ACESSIBILIDADE
 *
 * `prefers-reduced-motion: reduce` desliga tudo — sem trava de altura, sem
 * atributo, sem transição. A troca volta a ser instantânea, que é o que a
 * preferência pede.
 */

import { nextTick, onBeforeUnmount, watch } from 'vue'
import type { Ref } from 'vue'

export interface CollapseHeightOptions {
  /**
   * Nome da custom property com a duração.
   *
   * O token mora no `:root` (tokens/semantic/_motion.scss), NÃO no root do
   * componente — uma custom property declarada no próprio elemento vence a que
   * vem do ancestral, e o componente deixaria de ser afinável de fora. Medido:
   * com a declaração local, um contêiner que pedia 500ms continuava em 250ms.
   * @default '--dss-collapse-duration'
   */
  durationVar?: string
  /**
   * Nome da custom property com a curva.
   * @default '--dss-collapse-easing'
   */
  easingVar?: string
  /**
   * Folga da rede de segurança, em ms, somada à duração efetiva.
   *
   * Não é a rede inteira: cravar um valor fixo quebraria quem afina o canal
   * para mais lento — uma rede de 600ms cortaria uma transição de 700ms pela
   * metade. A rede é `duração + folga`.
   * @default 200
   */
  timeoutMarginMs?: number
}

/** Diferença abaixo da qual não vale animar — evita tremor de subpixel. */
const LIMIAR_EM_PX = 1

/** Converte `250ms` / `0.3s` em número. Devolve 0 para o que não reconhece. */
function emMilissegundos(valor: string): number {
  const n = Number.parseFloat(valor)
  if (!Number.isFinite(n)) return 0
  return valor.trim().endsWith('ms') ? n : n * 1000
}

export function useCollapseHeight(
  elemento: Ref<HTMLElement | null>,
  retraido: Ref<boolean>,
  opcoes: CollapseHeightOptions = {},
): void {
  const {
    durationVar = '--dss-collapse-duration',
    easingVar = '--dss-collapse-easing',
    timeoutMarginMs = 200,
  } = opcoes

  let limpar: (() => void) | null = null

  function prefereMenosMovimento(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  watch(retraido, async () => {
    const el = elemento.value
    if (!el || typeof window === 'undefined') return

    // Uma troca em cima da outra: encerra a anterior ANTES de medir, ou a
    // medida sairia da altura travada no meio do caminho, não da real.
    limpar?.()

    if (prefereMenosMovimento()) return

    const antes = el.getBoundingClientRect().height

    // O DOM só reflete o novo arranjo depois do próximo flush.
    await nextTick()
    if (elemento.value !== el) return

    const depois = el.getBoundingClientRect().height
    if (Math.abs(antes - depois) < LIMIAR_EM_PX) return

    // Cascata de recuo: o canal; o token de duração que ele aponta; e só então
    // um literal. O literal é a última linha de defesa — se o CSS do DSS não
    // tiver carregado, uma transição com duração vazia simplesmente não
    // acontece, e a retração voltaria a ser seca sem ninguém notar.
    const estilo = getComputedStyle(el)
    const ler = (...nomes: string[]) => {
      for (const nome of nomes) {
        const v = estilo.getPropertyValue(nome).trim()
        if (v) return v
      }
      return ''
    }
    const duracao = ler(durationVar, '--dss-duration-base') || '250ms'
    const curva = ler(easingVar, '--dss-easing-standard') || 'ease'

    el.setAttribute('data-dss-collapsing', '')
    el.style.blockSize = `${antes}px`

    // Leitura forçada: sem ela o navegador agrupa as duas escritas de altura e
    // não há transição nenhuma — o valor inicial nunca chega a ser pintado.
    void el.offsetHeight

    el.style.transition = `block-size ${duracao} ${curva}`
    el.style.blockSize = `${depois}px`

    const encerrar = () => {
      el.style.transition = ''
      el.style.blockSize = ''
      el.removeAttribute('data-dss-collapsing')
      el.removeEventListener('transitionend', aoTerminar)
      window.clearTimeout(rede)
      limpar = null
    }

    const aoTerminar = (evento: TransitionEvent) => {
      // Só a transição DESTE elemento encerra o ciclo: um filho que também
      // transita (o botão, a dica) borbulha `transitionend` até aqui.
      if (evento.target !== el) return
      // Chromium relata `height` para uma transição de `block-size`; Firefox
      // relata o nome lógico. Aceitar os dois é o que faz a limpeza acontecer
      // nos dois navegadores.
      if (evento.propertyName !== 'block-size' && evento.propertyName !== 'height') return
      encerrar()
    }

    const rede = window.setTimeout(
      encerrar,
      emMilissegundos(duracao) + timeoutMarginMs,
    )
    el.addEventListener('transitionend', aoTerminar)
    limpar = encerrar
  })

  // Desmontar no meio da transição deixaria o timeout de pé.
  onBeforeUnmount(() => limpar?.())
}
