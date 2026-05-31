<script lang="ts">
export default { name: 'DssTimeline', inheritAttrs: false }
</script>

<script setup lang="ts">
import { QTimeline } from 'quasar'
import type { DssTimelineProps } from '../types/timeline.types'
import { useTimelineClasses } from '../composables/useTimelineClasses'

const props = defineProps<DssTimelineProps>()

const { rootClasses } = useTimelineClasses(props)
</script>

<template>
  <QTimeline
    v-bind="$attrs"
    :class="rootClasses"
    :layout="layout"
    :side="side"
    :dark="dark"
    class="dss-timeline"
  >
    <slot />
  </QTimeline>
</template>
