<script setup lang="ts">
import { QTime } from 'quasar'
import type { DssTimePickerProps, DssTimePickerEmits, DssTimePickerSlots } from '../types/time-picker.types'
import { useTimePickerClasses } from '../composables/useTimePickerClasses'

defineOptions({ name: 'DssTimePicker', inheritAttrs: false })

const props = defineProps<DssTimePickerProps>()
const emit = defineEmits<DssTimePickerEmits>()
defineSlots<DssTimePickerSlots>()

const { timePickerClasses } = useTimePickerClasses(props)
</script>

<template>
  <!--
    EXC-Gate-01: QTime como root element — sem wrapper div.
    QTime gerencia internamente: clock face visual com ponteiro animado,
    navegação por teclado (ArrowUp/Down para ajustar hora/minuto/segundo),
    ARIA (role="group"), gestão de horas/minutos/segundos, transições de
    ponteiro e views (Hours → Minutes → Seconds). Sem alternativa em
    componentes DSS básicos.

    EXC-Gate-02: color="primary" fixo + CSS --q-color-primary override.
    QTime usa --q-color-primary para colorir os controles ativos (número
    selecionado, ponteiro do relógio, fundo do header). Passamos color="primary"
    fixo para garantir presença de todos os elementos visuais no DOM, e
    sobrescrevemos --q-color-primary via CSS DSS.
    Padrão idêntico ao DssPagination, DssAjaxBar e DssCarousel.

    v-bind="$attrs" antes dos attrs explícitos: garante que color="primary"
    e class sempre prevaleçam sobre qualquer attr do consumer.
    Padrão DssKnob (Golden Context).
  -->
  <QTime
    v-bind="$attrs"
    :class="timePickerClasses"
    :model-value="props.modelValue"
    :landscape="props.landscape"
    :mask="props.mask"
    :locale="props.locale"
    :format24h="props.format24h"
    :default-view="props.defaultView"
    :options="props.options"
    :hour-options="props.hourOptions"
    :minute-options="props.minuteOptions"
    :second-options="props.secondOptions"
    :with-seconds="props.withSeconds"
    :now-btn="props.nowBtn"
    :minimal="props.minimal"
    :readonly="props.readonly"
    :disable="props.disable"
    :name="props.name"
    :tabindex="props.tabindex"
    color="primary"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </QTime>
</template>
