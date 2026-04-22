<template>
  <q-toolbar-title
    :class="toolbarTitleClasses"
    :shrink="props.shrink"
    v-bind="$attrs"
  >
    <slot />
    <template v-if="$slots.subtitle" #subtitle>
      <slot name="subtitle" />
    </template>
  </q-toolbar-title>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssToolbarTitle — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QToolbarTitle. Título tipográfico para DssToolbar.
 *
 * Responsabilidades:
 * - Encapsula <q-toolbar-title> expondo apenas props semanticamente relevantes
 * - Sobrescreve a tipografia nativa hardcoded do Quasar com tokens DSS (EXC-01)
 * - Gerencia truncamento (ellipsis) quando o espaço na toolbar for insuficiente
 * - Fornece container flexível (flex: 1 1 0%) dentro do DssToolbar
 *
 * NÃO responsabilidades:
 * - Cor do texto: herdada do DssToolbar pai via [data-brand] e cascata de tokens
 * - Interatividade: componente estritamente não-interativo (Option B)
 * - Alinhamento vertical: gerenciado pelo DssToolbar pai
 *
 * Props bloqueadas:
 * - color: governado pelos tokens do DssToolbar pai (--dss-text-body/--dss-text-inverse)
 * - active: DssToolbarTitle não possui estado ativo
 *
 * Gate de Responsabilidade v2.4:
 * - DssToolbarTitle é container tipográfico puro — sem hover, focus, active próprios
 *
 * EXC-01: Sobrescrita de tipografia nativa QToolbarTitle
 * - QToolbarTitle aplica font-size: 21px, font-weight: normal, letter-spacing: 0.01em
 * - Sobrescrevemos via seletor composto .dss-toolbar-title.q-toolbar__title
 * - Precedente canônico: DssItemLabel (EXC-01)
 *
 * @version 1.0.0
 */

import type { ToolbarTitleProps, ToolbarTitleSlots } from '../types/toolbar-title.types'
import { useToolbarTitleClasses } from '../composables'

defineOptions({
  name: 'DssToolbarTitle',
  inheritAttrs: false
})

const props = withDefaults(defineProps<ToolbarTitleProps>(), {
  shrink: false
})

defineSlots<ToolbarTitleSlots>()

const { toolbarTitleClasses } = useToolbarTitleClasses(props)
</script>
