<!--
  DssActionMenuSubItem — uma sub-ação dentro do painel.

  POR QUE ESTE COMPONENTE EXISTE, medido no Preview Frame:
  sem ele, as sub-ações eram `DssItem` crus e o consumidor precisava lembrar de
  escrever `role="menuitem"` e `tabindex` em CADA uma. Quem esquecesse ganhava um
  menu que abre, parece certo, e não é anunciado como menu — e o foco ao abrir
  caía no contêiner do QMenu em vez da primeira opção.

  Acessibilidade que depende de o consumidor lembrar não é acessibilidade: é
  sorte. O papel vem daqui.
-->
<template>
  <DssItem
    class="dss-action-menu__subitem"
    role="menuitem"
    :tabindex="disabled ? -1 : 0"
    :label="label"
    :caption="caption"
    :clickable="!disabled"
    :disabled="disabled"
    :aria-disabled="disabled ? 'true' : undefined"
    v-bind="$attrs"
    @click="onClick"
    @keydown.enter.prevent="onClick"
    @keydown.space.prevent="onClick"
  >
    <slot />
  </DssItem>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { inject } from 'vue'
import DssItem from '../../../base/DssItem/DssItem.vue'
import type { ActionMenuSubItemProps } from '../types/action-menu.types'

const props = withDefaults(defineProps<ActionMenuSubItemProps>(), {
  label: '',
  caption: '',
  disabled: false,
})

const emit = defineEmits<{ (e: 'action', name: string): void }>()

defineSlots<{
  /** Conteúdo customizado da sub-ação. Substitui `label`. */
  default?: () => unknown
}>()

/** Fecha o menu do item-pai depois de acionar. Injetado pelo DssActionMenuItem. */
const fecharMenu = inject<() => void>('dss-action-menu-fechar', () => {})
const emitirAcao = inject<(name: string) => void>('dss-action-menu-emit', () => {})

function onClick() {
  if (props.disabled) return
  emit('action', props.name)
  emitirAcao(props.name)
  // Fechar DEPOIS de emitir: o consumidor pode querer reagir antes do painel sumir.
  fecharMenu()
}
</script>

<style lang="scss">
@use '../DssActionMenu.module.scss';
</style>
