<script setup lang="ts">
import { QDate } from 'quasar'
import type { DssDatePickerProps, DssDatePickerEmits, DssDatePickerSlots } from '../types/date-picker.types'
import { useDatePickerClasses } from '../composables/useDatePickerClasses'

defineOptions({ name: 'DssDatePicker', inheritAttrs: false })

const props = defineProps<DssDatePickerProps>()
const emit = defineEmits<DssDatePickerEmits>()
defineSlots<DssDatePickerSlots>()

const { datePickerClasses } = useDatePickerClasses(props)
</script>

<template>
  <!--
    EXC-Gate-01: QDate como root element — sem wrapper div.
    QDate gerencia internamente: calendário visual com navegação mês/ano/anos,
    seleção de data única, intervalo (range) e múltiplas datas,
    ARIA (role="group", aria-label dinâmico), transições de views
    (Calendar → Months → Years) e eventos de teclado.
    Sem alternativa em componentes DSS básicos.

    EXC-Gate-02: color="primary" fixo + CSS --q-color-primary override.
    QDate usa --q-color-primary para colorir os controles ativos (dia selecionado,
    fundo do header, botão "Hoje", indicadores de range). Passamos color="primary"
    fixo para garantir presença de todos os elementos visuais no DOM, e
    sobrescrevemos --q-color-primary via CSS DSS.
    Padrão idêntico ao DssPagination, DssAjaxBar, DssCarousel e DssTimePicker.

    v-bind="$attrs" antes dos attrs explícitos: garante que color="primary"
    e class sempre prevaleçam sobre qualquer attr do consumer.
    Padrão DssTimePicker (Golden Context).
  -->
  <QDate
    v-bind="$attrs"
    :class="datePickerClasses"
    :model-value="props.modelValue"
    :multiple="props.multiple"
    :range="props.range"
    :mask="props.mask"
    :locale="props.locale"
    :calendar="props.calendar"
    :landscape="props.landscape"
    :minimal="props.minimal"
    :today-btn="props.todayBtn"
    :emit-immediately="props.emitImmediately"
    :default-view="props.defaultView"
    :default-year-month="props.defaultYearMonth"
    :years-in-month-view="props.yearsInMonthView"
    :options="props.options"
    :events="props.events"
    :event-color="props.eventColor"
    :navigation-min-year-month="props.navigationMinYearMonth"
    :navigation-max-year-month="props.navigationMaxYearMonth"
    :no-unset="props.noUnset"
    :first-day-of-week="props.firstDayOfWeek"
    :title="props.title"
    :subtitle="props.subtitle"
    :name="props.name"
    :tabindex="props.tabindex"
    :disable="props.disable"
    :readonly="props.readonly"
    color="primary"
    @update:model-value="emit('update:modelValue', $event)"
    @navigation="emit('navigation', $event)"
    @range-start="emit('range-start', ($event as unknown as string))"
    @range-end="emit('range-end', ($event as unknown as string))"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </QDate>
</template>
