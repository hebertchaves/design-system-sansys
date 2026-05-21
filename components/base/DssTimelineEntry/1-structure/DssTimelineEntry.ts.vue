<script lang="ts">
export default { name: 'DssTimelineEntry', inheritAttrs: false }
</script>

<script setup lang="ts">
import { useSlots } from 'vue'
import { QTimelineEntry } from 'quasar'
import type { DssTimelineEntryProps } from '../types/timeline-entry.types'
import { useTimelineEntryClasses } from '../composables/useTimelineEntryClasses'

const props = defineProps<DssTimelineEntryProps>()

const $slots = useSlots()
const { rootClasses } = useTimelineEntryClasses(props)
</script>

<template>
  <QTimelineEntry
    v-bind="$attrs"
    :class="rootClasses"
    :heading="heading"
    :tag="tag"
    :side="side"
    :icon="icon"
    :avatar="avatar"
    :title="title"
    :subtitle="subtitle"
    class="dss-timeline-entry"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.subtitle" #subtitle>
      <slot name="subtitle" />
    </template>
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </QTimelineEntry>
</template>
