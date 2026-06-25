<script setup lang="ts">
import { computed } from 'vue'
import { QVideo } from 'quasar'
import type { DssVideoProps } from '../types/video.types'
import { useVideoClasses } from '../composables/useVideoClasses'

defineOptions({ name: 'DssVideo', inheritAttrs: false })

const props = withDefaults(defineProps<DssVideoProps>(), {
  ratio: 16 / 9,
})

const computedTitle = computed<string>(() => {
  if (props.decorative === true) return ''
  if (props.title !== undefined) return props.title
  if (import.meta.env?.DEV) {
    console.warn('[DssVideo] O prop `title` é obrigatório para vídeos não-decorativos (WCAG 4.1.2).')
  }
  return ''
})

const { rootClasses } = useVideoClasses(props)
</script>

<template>
  <q-video
    v-bind="$attrs"
    :class="rootClasses"
    :src="(src as string)"
    :ratio="ratio"
    :title="computedTitle"
  >
    <slot />
  </q-video>
</template>
