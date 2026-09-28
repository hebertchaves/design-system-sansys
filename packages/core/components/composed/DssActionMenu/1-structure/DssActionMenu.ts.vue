<!--
  DssActionMenu — barra de ações (Fase 3).

  COMPÕE, não reimplementa: DssToolbar dá a faixa, DssButton dá cada ação
  (variante, tamanho, marca, foco e rampa de hover já resolvidos lá).

  A barra é `role="toolbar"` com ROVING TABINDEX: o conjunto inteiro é UMA parada
  de tabulação, e as setas movem entre ações. É o padrão WAI-ARIA para toolbar, e
  o motivo é prático — uma barra com 6 ações não deve custar 6 Tabs para ser
  atravessada.
-->
<template>
  <DssToolbar
    ref="rootRef"
    class="dss-action-menu"
    :class="rootClasses"
    :data-brand="brand || undefined"
    role="toolbar"
    :aria-label="ariaLabel"
    :aria-disabled="disabled ? 'true' : undefined"
    v-bind="$attrs"
    @keydown="onKeydown"
  >
    <slot />
  </DssToolbar>
</template>

<script setup lang="ts">
/**
 * `inheritAttrs: false` é OBRIGATÓRIO no Cartão Composto: sem ele, um atributo
 * solto no consumidor cairia no nó raiz por acidente, duplicando o que o
 * `v-bind="$attrs"` já coloca no lugar certo.
 */
defineOptions({ inheritAttrs: false })

import { ref, provide } from 'vue'
import DssToolbar from '../../../base/DssToolbar/DssToolbar.vue'
import { useActionMenuClasses } from '../composables'
import { ACTION_MENU_KEY } from '../types/action-menu.types'
import type { ActionMenuProps, ActionMenuEmits } from '../types/action-menu.types'

const props = withDefaults(defineProps<ActionMenuProps>(), {
  variant: 'flat',
  color: 'primary',
  size: 'md',
  brand: null,
  disabled: false,
})

const emit = defineEmits<ActionMenuEmits>()

defineSlots<{
  /** As ações. Espera `DssActionMenuItem`. */
  default?: () => unknown
}>()

const { rootClasses } = useActionMenuClasses(props)
const rootRef = ref<InstanceType<typeof DssToolbar> | null>(null)

/** Nome da ação cujo sub-menu está aberto. Um por vez, por construção. */
const abertoId = ref<string | null>(null)

/**
 * Contexto do bloco. `provide/inject` TIPADO, não prop drilling — é o que o
 * Cartão Composto exige e o que faz `disabled` da barra alcançar tanto a ação
 * quanto a ABERTURA do sub-menu. Com drilling, o defeito típico é o menu abrir
 * com itens inertes.
 */
provide(ACTION_MENU_KEY, {
  get variant() { return props.variant },
  get color() { return props.color },
  get size() { return props.size },
  get brand() { return props.brand },
  get disabled() { return props.disabled },
  get abertoId() { return abertoId.value },
  abrir: (name: string | null) => { abertoId.value = name },
})

/** Repassa o acionamento da ação para quem usa a barra. */
provide('dss-action-menu-emit', (name: string) => emit('action', name))

/**
 * Navegação por seta dentro da toolbar.
 *
 * Opera sobre os botões REAIS no DOM, não sobre uma lista interna: as ações
 * chegam por slot e o componente não as conhece de antemão. Ação desabilitada
 * permanece na roda — continua focável para ser anunciada, conforme o
 * pré-prompt §6.
 */
function onKeydown(ev: KeyboardEvent) {
  const teclas = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
  if (!teclas.includes(ev.key)) return

  const raiz = (rootRef.value as unknown as { $el?: HTMLElement })?.$el
  if (!raiz) return
  // Só entram na roda os botões FOCÁVEIS.
  //
  // O pré-prompt §6 dizia que a ação desabilitada permaneceria focável, para ser
  // anunciada. Medido no navegador: não permanece — o DssButton rende
  // `<button disabled>`, e botão desabilitado nativo é inalcançável por foco.
  // O resultado era o foco TRAVAR ao esbarrar numa ação desabilitada.
  //
  // Contornar exigiria trocar `disabled` por `aria-disabled` e reimplementar o
  // bloqueio de acionamento — ou seja, brigar com o primitivo, que é justamente
  // o que o Cartão Composto proíbe. A roda pular o inalcançável é a resolução
  // honesta; a divergência com o pré-prompt está registrada no README.
  const botoes = Array.from(raiz.querySelectorAll<HTMLElement>('[data-action-menu-item]'))
    .filter((b) => !(b as HTMLButtonElement).disabled && b.getAttribute('aria-disabled') !== 'true')
  if (!botoes.length) return

  const atual = botoes.findIndex((b) => b === document.activeElement || b.contains(document.activeElement))
  let alvo = atual
  if (ev.key === 'ArrowRight') alvo = atual < 0 ? 0 : (atual + 1) % botoes.length
  else if (ev.key === 'ArrowLeft') alvo = atual < 0 ? botoes.length - 1 : (atual - 1 + botoes.length) % botoes.length
  else if (ev.key === 'Home') alvo = 0
  else if (ev.key === 'End') alvo = botoes.length - 1

  ev.preventDefault()
  botoes[alvo]?.focus()
}

defineExpose({
  /** Fecha qualquer sub-menu aberto. Útil ao navegar para fora da tela. */
  fechar: () => { abertoId.value = null },
})
</script>

<style lang="scss">
@use '../DssActionMenu.module.scss';
</style>
