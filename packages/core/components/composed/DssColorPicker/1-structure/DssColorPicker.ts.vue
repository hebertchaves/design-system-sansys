<script setup lang="ts">
import { QColor } from 'quasar'
import type { DssColorPickerProps, DssColorPickerEmits, DssColorPickerSlots } from '../types/color-picker.types'
import { useColorPickerClasses } from '../composables/useColorPickerClasses'

defineOptions({ name: 'DssColorPicker', inheritAttrs: false })

const props = defineProps<DssColorPickerProps>()
const emit = defineEmits<DssColorPickerEmits>()
defineSlots<DssColorPickerSlots>()

const { colorPickerClasses } = useColorPickerClasses(props)
</script>

<template>
  <!--
    EXC-Gate-01: QColor como root element — sem wrapper div.
    QColor gerencia internamente: interface de espectro de cores com canvas,
    sliders de matiz (hue) e transparência (alpha), campos de entrada numérica
    (R, G, B / H, S, L / H, S, V), paleta de cores pré-definidas, conversão
    entre formatos (hex, rgb, hsl, hsv, hexa, rgba, hsla, hsva), navegação
    por teclado e ARIA. Sem alternativa em componentes DSS básicos.

    EXC-Gate-02: color="primary" fixo + CSS --q-color-primary override.
    QColor usa --q-color-primary para o indicador da aba ativa nos QTabs internos
    (espectro / ajuste / paleta). Passamos color="primary" fixo para garantir
    presença de todos os elementos visuais no DOM, e sobrescrevemos
    --q-color-primary via CSS DSS.
    Padrão idêntico ao DssPagination, DssAjaxBar, DssCarousel, DssTimePicker
    e DssDatePicker.

    v-bind="$attrs" antes dos attrs explícitos: garante que color="primary"
    e class sempre prevaleçam sobre qualquer attr do consumer.
    Padrão DssDatePicker (Golden Context).

    Props bloqueadas: dark — o DSS gerencia dark mode via [data-theme="dark"]
    e tokens globais. Não deve ser exposta ao consumer.
  -->
  <QColor
    v-bind="$attrs"
    :class="colorPickerClasses"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :format-model="props.formatModel"
    :no-header="props.noHeader"
    :no-header-tabs="props.noHeaderTabs"
    :no-footer="props.noFooter"
    :default-view="props.defaultView"
    :palette="props.palette"
    :square="props.square"
    :flat="props.flat"
    :bordered="props.bordered"
    :disable="props.disable"
    :readonly="props.readonly"
    :name="props.name"
    :tabindex="props.tabindex"
    color="primary"
    @update:model-value="emit('update:modelValue', $event)"
    @change="emit('change', $event)"
  />
</template>
