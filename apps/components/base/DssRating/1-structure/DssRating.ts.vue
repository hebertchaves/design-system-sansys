<script setup lang="ts">
import { QRating } from 'quasar'
import type { RatingProps, RatingEmits } from '../types/rating.types'
import { useRatingClasses } from '../composables/useRatingClasses'

defineOptions({ name: 'DssRating', inheritAttrs: false })

const props = withDefaults(defineProps<RatingProps>(), {
  max: 5,
})

const emit = defineEmits<RatingEmits>()
const { rootClasses } = useRatingClasses(props)
</script>

<template>
  <!--
    EXC-Gate-01: QRating como root element.
    QRating gerencia internamente: navegação por teclado (ArrowLeft/Right, Home/End),
    interação por click e touch, e ARIA (role=slider, aria-valuemin/max/now).

    EX-Color-01: Props color/color-selected/color-half NÃO são passadas ao QRating.
    Sem prop color → QRating não adiciona classe text-* → CSS DSS controla as cores
    dos ícones diretamente via .q-rating__icon e .q-rating__icon--active (cascade order).
  -->
  <QRating
    v-bind="$attrs"
    :class="rootClasses"
    :model-value="modelValue"
    :max="max"
    :size="size"
    :icon="icon"
    :icon-selected="iconSelected"
    :icon-half="iconHalf"
    :no-reset="noReset"
    :readonly="readonly"
    :disable="disable"
    :tabindex="tabindex"
    :name="name"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
