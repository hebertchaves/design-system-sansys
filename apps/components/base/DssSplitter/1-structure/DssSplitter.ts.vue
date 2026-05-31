<script setup lang="ts">
import { computed } from 'vue'
import type { DssSplitterProps, DssSplitterEmits } from '../types/splitter.types'
import { useSplitterClasses } from '../composables/useSplitterClasses'

defineOptions({ name: 'DssSplitter', inheritAttrs: false })

const props = withDefaults(defineProps<DssSplitterProps>(), {
  modelValue: 50,
  orientation: 'horizontal',
  limits: () => [0, 100] as [number, number],
  unit: '%',
})

const emit = defineEmits<DssSplitterEmits>()
const { rootClasses } = useSplitterClasses(props)

// DSS 'horizontal' (panels side-by-side) → Quasar horizontal=false (vertical separator)
// DSS 'vertical'   (panels stacked)       → Quasar horizontal=true  (horizontal separator)
const qHorizontal = computed(() => props.orientation === 'vertical')
</script>

<template>
  <q-splitter
    v-bind="$attrs"
    class="dss-splitter"
    :class="rootClasses"
    :model-value="modelValue"
    :horizontal="qHorizontal"
    :limits="limits"
    :reverse="reverse"
    :disable="disabled"
    :emit-immediately="emitImmediately"
    :unit="unit"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template #before>
      <slot name="before" />
    </template>
    <template #separator>
      <slot name="separator" />
    </template>
    <template #after>
      <slot name="after" />
    </template>
  </q-splitter>
</template>
