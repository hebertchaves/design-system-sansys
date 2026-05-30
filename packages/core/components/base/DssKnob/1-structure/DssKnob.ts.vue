<script setup lang="ts">
import { QKnob } from 'quasar'
import type { KnobProps, KnobEmits } from '../types/knob.types'
import { useKnobClasses } from '../composables/useKnobClasses'

defineOptions({ name: 'DssKnob', inheritAttrs: false })

const props = withDefaults(defineProps<KnobProps>(), {
  min: 0,
  max: 100,
  step: 1,
  thickness: 0.2,
  showValue: true,
})

const emit = defineEmits<KnobEmits>()

const { rootClasses } = useKnobClasses(props)
</script>

<template>
  <!--
    EXC-Gate-01: QKnob como root element — sem wrapper div.
    QKnob gerencia internamente: navegação por teclado (ArrowUp/Down/Left/Right,
    PageUp/Down, Home/End), drag por touch e mouse, ARIA (role="slider",
    aria-valuemin/max/now/valuetext), e representação SVG circular via QCircularProgress.
    Os seletores CSS descendentes (.q-circular-progress__circle, __track, __center)
    são o único ponto de override das cores dos arcos SVG — sem root wrapper, sem encapsulamento.
    Padrão: DssInfiniteScroll (QInfiniteScroll root), DssAjaxBar (QAjaxBar root).

    EXC-Gate-02: color, track-color, center-color FIXOS + override via CSS DSS.
    QKnob usa QCircularProgress internamente. Os círculos SVG só são renderizados se
    as props correspondentes NÃO forem undefined/transparent. Passamos valores fixos:
      color="primary"     → .q-circular-progress__circle renderizado → stroke sobrescrito por DSS
      track-color="grey-3" → .q-circular-progress__track renderizado → stroke sobrescrito por DSS
      center-color="white" → .q-circular-progress__center renderizado → fill sobrescrito por DSS
    CSS `stroke` e `fill` têm precedência sobre SVG attributes (stroke="currentColor", fill="currentColor").
    Consumer não consegue sobrescrever via prop (bloqueadas). Padrão DssCircularProgress.

    EXC-Focus-01: QKnob usa ::before + box-shadow para focus visual (Quasar pattern).
    DSS reserva ::before para touch target (WCAG 2.5.5). Como QKnob IS o root element,
    o ::before é gerenciado pelo Quasar — impossível separar. Resolução:
      1. ::before box-shadow neutralizado via box-shadow: none !important (em _base.scss)
      2. outline DSS aplicado em :focus-visible com border-radius:50% (padrão DssChip)

    v-bind="$attrs" antes dos atributos explícitos: em Vue 3, bindings explícitos
    declarados APÓS v-bind têm precedência para a mesma prop. Garante que
    color/track-color/center-color sempre prevaleçam sobre qualquer $attrs do consumer.
  -->
  <QKnob
    v-bind="$attrs"
    :class="rootClasses"
    :model-value="modelValue"
    :min="min"
    :max="max"
    :inner-min="innerMin"
    :inner-max="innerMax"
    :step="step"
    :reverse="reverse"
    :instant-feedback="instantFeedback"
    :readonly="readonly"
    :disable="disable"
    :thickness="thickness"
    :angle="angle"
    :rounded="rounded"
    :tabindex="tabindex"
    :size="size"
    :name="name"
    :show-value="showValue"
    color="primary"
    track-color="grey-3"
    center-color="white"
    @update:model-value="emit('update:modelValue', $event)"
    @change="emit('change', $event)"
    @drag-value="emit('drag-value', $event)"
  >
    <slot>{{ modelValue }}</slot>
  </QKnob>
</template>
