<!--
  DssActionMenuItem — uma ação da barra.

  Duas formas, decididas pela presença do slot `default`:
    sem slot  → ação simples, aciona e emite
    com slot  → gatilho de sub-ações, abre um DssMenu com DssList/DssItem

  O botão é SEMPRE DssButton — variante, tamanho, marca, foco, alvo de toque e
  rampa de hover vêm de lá. Este componente não pinta nada.
-->
<template>
  <!--
    O DssMenu é IRMÃO do botão, dentro de um wrapper — não filho dele.
    Medido: com o menu no slot `default` do DssButton, o `label` sumia (o slot
    vence a prop) e `!!slots.default` ficava verdadeiro em TODA ação, fazendo
    as quatro declararem `aria-haspopup="menu"`. O QMenu ancora no elemento pai,
    então o wrapper é âncora suficiente.
  -->
  <span class="dss-action-menu__slot">
    <DssButton
      ref="btnRef"
      data-action-menu-item
      class="dss-action-menu__item"
      :label="label"
      :icon="icon"
      :variant="ctx.variant"
      :color="ctx.color"
      :size="ctx.size"
      :brand="ctx.brand || undefined"
      :disabled="desabilitado"
      :tabindex="0"
      :aria-haspopup="temSubAcoes ? 'menu' : undefined"
      :aria-expanded="temSubAcoes ? String(aberto) : undefined"
      :aria-label="!label ? name : undefined"
      @click="onClick"
    />

    <DssTooltip v-if="tooltip">{{ tooltip }}</DssTooltip>

    <DssMenu
      v-if="temSubAcoes"
      v-model="aberto"
      anchor="bottom left"
      self="top left"
      @hide="onHide"
    >
      <DssList
        role="menu"
        :aria-label="label || name"
        class="dss-action-menu__sub"
        @keydown="onKeydownMenu"
      >
        <slot />
      </DssList>
    </DssMenu>
  </span>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { ref, computed, inject, provide, watch, nextTick, Comment, Text } from 'vue'
import type { VNode } from 'vue'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssMenu from '../../../base/DssMenu/DssMenu.vue'
import DssList from '../../../base/DssList/DssList.vue'
import DssTooltip from '../../../base/DssTooltip/DssTooltip.vue'
import { ACTION_MENU_KEY } from '../types/action-menu.types'
import type { ActionMenuItemProps, ActionMenuContext } from '../types/action-menu.types'

const props = withDefaults(defineProps<ActionMenuItemProps>(), {
  label: '',
  icon: '',
  disabled: false,
  tooltip: '',
})

const slots = defineSlots<{
  /** Sub-ações. Com CONTEÚDO, este item vira gatilho de menu. Espera `DssActionMenuSubItem`. */
  default?: () => VNode[]
}>()

/**
 * Fallback do contexto: o item PRECISA de uma barra em volta, mas falhar ao
 * montar isolado tornaria o teste unitário impossível e o erro ilegível. O
 * fallback é inerte e explícito.
 */
const ctx = inject<ActionMenuContext>(ACTION_MENU_KEY, {
  variant: 'flat', color: 'primary', size: 'md', brand: null,
  disabled: false, abertoId: null, abrir: () => {},
})
const emitirAcao = inject<(name: string) => void>('dss-action-menu-emit', () => {})

/**
 * Fechamento do painel, fornecido às sub-ações. Fica no item (não na barra)
 * porque é ESTE menu que fecha — a barra não sabe qual está aberto além do id.
 */
provide('dss-action-menu-fechar', () => { ctx.abrir(null) })

const btnRef = ref<InstanceType<typeof DssButton> | null>(null)
/**
 * Presença de slot NÃO basta: quando o componente é montado por uma semente ou
 * por `v-if` falso, o slot existe e vem VAZIO — e aí toda ação anunciava
 * `aria-haspopup="menu"` mentindo para o leitor de tela. A checagem é de
 * CONTEÚDO: comentário e texto em branco não contam como sub-ação.
 */
const temSubAcoes = computed(() => {
  const nos = slots.default?.()
  if (!nos?.length) return false
  return nos.some((n) => {
    if (n.type === Comment) return false
    if (n.type === Text) return String(n.children ?? '').trim() !== ''
    return true
  })
})

/** Desabilitado = o da barra OU o próprio. A barra vence sempre. */
const desabilitado = computed(() => ctx.disabled || props.disabled)

/**
 * Aberto é derivado do CONTEXTO, não de estado local — é o que garante "um
 * sub-menu por vez" sem os itens conversarem entre si.
 */
const aberto = computed({
  get: () => ctx.abertoId === props.name,
  set: (v: boolean) => ctx.abrir(v ? props.name : null),
})

function onClick() {
  if (desabilitado.value) return
  if (temSubAcoes.value) {
    ctx.abrir(aberto.value ? null : props.name)
    return
  }
  emitirAcao(props.name)
}

/**
 * Ao fechar por QUALQUER via (Esc, clique fora, seleção), o foco volta ao
 * gatilho. Sem isto o foco cai no <body> e a navegação por teclado se perde —
 * é a falha clássica de menu, e o pré-prompt §6 a nomeia.
 */
function onHide() {
  if (ctx.abertoId === props.name) ctx.abrir(null)
  nextTick(() => {
    const el = (btnRef.value as unknown as { $el?: HTMLElement })?.$el
    el?.focus?.()
  })
}

/** Setas movem entre sub-ações; Esc fecha (o DssMenu já emite hide). */
function onKeydownMenu(ev: KeyboardEvent) {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(ev.key)) return
  const lista = (ev.currentTarget as HTMLElement)
  const itens = Array.from(lista.querySelectorAll<HTMLElement>('[role="menuitem"]'))
  if (!itens.length) return
  const atual = itens.findIndex((i) => i === document.activeElement || i.contains(document.activeElement))
  let alvo = atual
  if (ev.key === 'ArrowDown') alvo = atual < 0 ? 0 : (atual + 1) % itens.length
  else if (ev.key === 'ArrowUp') alvo = atual < 0 ? itens.length - 1 : (atual - 1 + itens.length) % itens.length
  else if (ev.key === 'Home') alvo = 0
  else if (ev.key === 'End') alvo = itens.length - 1
  ev.preventDefault()
  itens[alvo]?.focus()
}

/** Ao abrir, o foco vai para a primeira sub-ação (pré-prompt §6). */
watch(aberto, async (v) => {
  if (!v) return
  await nextTick()
  const primeiro = document.querySelector<HTMLElement>('.dss-action-menu__sub [role="menuitem"]')
  primeiro?.focus()
})
</script>

<style lang="scss">
@use '../DssActionMenu.module.scss';
</style>
