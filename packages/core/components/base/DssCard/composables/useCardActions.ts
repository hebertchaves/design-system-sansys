/**
 * ==========================================================================
 * useCardActions Composable
 * ==========================================================================
 *
 * Composable para gerenciar interações do DssCard
 * Lida com eventos de click e navegação por teclado
 * Conforme WCAG 2.1 AA (Enter e Space)
 *
 * @example
 * ```ts
 * const { handleClick, handleKeydown } = useCardActions(props, emit)
 * ```
 */

import type { CardProps } from '../types/card.types'

/**
 * Composable para ações do card
 */
export function useCardActions(
  props: Readonly<CardProps>,
  emit: (event: 'click', ...args: any[]) => void
) {
  /**
   * Handler para eventos de click
   *
   * Emite evento 'click' apenas se o card for clicável
   */
  const handleClick = (event: MouseEvent) => {
    if (props.clickable) {
      emit('click', event)
    }
  }

  /**
   * Teclado: Enter e Space ativam o contêiner — mas SÓ quando ele é o alvo.
   *
   * CORREÇÃO (set/2026) de um defeito de WCAG 2.1.1. O template usava
   * `@keydown.space.prevent`, e o modificador `.prevent` do Vue chama
   * `preventDefault()` INCONDICIONALMENTE, antes de o handler rodar. O handler
   * checava `clickable`, mas o bloqueio já tinha acontecido — então o
   * contêiner ENGOLIA o Space de qualquer descendente, mesmo quando não era
   * clicável.
   *
   * Medido: um DssCheckbox dentro de um DssCard não alternava por teclado. A
   * sequência de eventos do nativo é keydown → keypress → keyup → click →
   * input → change; dentro do card parava em keydown → keyup, porque sem a
   * ação default o navegador não gera o clique sintético. Nenhum erro, nenhum
   * aviso: o controle recebia foco e simplesmente não respondia.
   *
   * Duas guardas, nesta ordem:
   *
   * 1. `target !== currentTarget` — o Space digitado num checkbox, botão ou
   *    campo DENTRO do contêiner pertence a ELE, não ao contêiner. Esta é a
   *    guarda que conserta o defeito, e vale mesmo para contêiner clicável.
   * 2. `clickable` — sem ação, não há o que ativar nem o que previnir.
   *
   * O `preventDefault` passa a ser condicional e só no Space, onde serve para
   * impedir a rolagem da página. O Enter não rola, então não precisa.
   */
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.target !== event.currentTarget) return
    if (!props.clickable) return
    if (event.key === ' ') event.preventDefault()
    emit('click', event)
  }

  return {
    handleClick,
    handleKeydown
  }
}
