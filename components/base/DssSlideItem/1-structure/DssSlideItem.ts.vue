<script lang="ts">
export default { name: 'DssSlideItem', inheritAttrs: false }
</script>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { QSlideItem } from 'quasar'
import type { DssSlideItemProps, DssSlideItemEmits, DssSlideItemActionColor } from '../types/slideitem.types'
import { useSlideItemClasses } from '../composables/useSlideItemClasses'

const props = defineProps<DssSlideItemProps>()
const emit = defineEmits<DssSlideItemEmits>()
const $slots = useSlots()

const { rootClasses } = useSlideItemClasses(props)
const qSlideItemRef = ref<InstanceType<typeof QSlideItem> | null>(null)

// Mapeamento DSS → Quasar para ativar as áreas de ação (slots left/right)
// A cor real é governada por CSS via tokens DSS (EXC-Gate-02)
const COLOR_QUASAR_MAP: Record<DssSlideItemActionColor, string> = {
  error: 'negative',
  success: 'positive',
  warning: 'warning',
  info: 'info',
}

// Variáveis CSS injetadas inline para governar a cor das áreas de ação
// O CSS base usa essas variáveis para sobrescrever as classes bg-* do Quasar
const TOKEN_MAP: Record<DssSlideItemActionColor, string> = {
  error: 'var(--dss-feedback-error)',
  success: 'var(--dss-feedback-success)',
  warning: 'var(--dss-feedback-warning)',
  info: 'var(--dss-feedback-info)',
}

const leftColorQuasar = computed(() =>
  props.leftColor ? COLOR_QUASAR_MAP[props.leftColor] : ($slots.left ? 'negative' : undefined)
)

const rightColorQuasar = computed(() =>
  props.rightColor ? COLOR_QUASAR_MAP[props.rightColor] : ($slots.right ? 'info' : undefined)
)

const actionAreaStyle = computed(() => ({
  '--dss-slide-item-left-bg': props.leftColor
    ? TOKEN_MAP[props.leftColor]
    : 'var(--dss-feedback-error)',
  '--dss-slide-item-right-bg': props.rightColor
    ? TOKEN_MAP[props.rightColor]
    : 'var(--dss-feedback-info)',
}))

defineExpose({
  /** Reseta o item para a posição original programaticamente */
  // QSlideItem.reset() não é tipado publicamente na versão atual do Quasar — cast necessário
  reset: () => (qSlideItemRef.value as any)?.reset?.(),
})
</script>

<template>
  <QSlideItem
    ref="qSlideItemRef"
    v-bind="$attrs"
    :class="rootClasses"
    :style="actionAreaStyle"
    class="dss-slide-item"
    :left-color="leftColorQuasar"
    :right-color="rightColorQuasar"
    :disable="disable"
    @action="emit('action', $event)"
    @slide="emit('slide', $event)"
  >
    <template v-if="$slots.left" #left="scope">
      <slot name="left" v-bind="scope" />
    </template>
    <template v-if="$slots.right" #right="scope">
      <slot name="right" v-bind="scope" />
    </template>
    <slot />
  </QSlideItem>
</template>
