<script lang="ts">
export default { name: 'DssBar', inheritAttrs: false }
</script>

<script setup lang="ts">
import { QBar } from 'quasar'
import type { DssBarProps } from '../types/bar.types'
import { useBarClasses } from '../composables/useBarClasses'

const props = defineProps<DssBarProps>()

const { rootClasses } = useBarClasses(props)
</script>

<template>
  <QBar
    v-bind="$attrs"
    :class="rootClasses"
    :dense="dense"
    class="dss-bar"
  >
    <slot />
  </QBar>
</template>
