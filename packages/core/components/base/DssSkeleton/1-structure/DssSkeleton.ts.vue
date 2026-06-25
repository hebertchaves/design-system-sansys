<script setup lang="ts">
import { QSkeleton } from 'quasar'
import type { QSkeletonProps } from 'quasar'
import type { SkeletonProps } from '../types/skeleton.types'
import { useSkeletonClasses } from '../composables/useSkeletonClasses'

defineOptions({ name: 'DssSkeleton', inheritAttrs: false })

const props = withDefaults(defineProps<SkeletonProps>(), {
  type: 'rect',
  animation: 'wave',
})

const { rootClasses, rootStyle, quasarType, quasarAnimation, skeletonItems } =
  useSkeletonClasses(props)
</script>

<template>
  <div
    aria-hidden="true"
    v-bind="$attrs"
    :class="rootClasses"
    :style="rootStyle"
    :data-brand="brand ?? undefined"
  >
    <QSkeleton
      v-for="(item, i) in skeletonItems"
      :key="i"
      class="dss-skeleton__item"
      :type="(quasarType as QSkeletonProps['type'])"
      :animation="(quasarAnimation as QSkeletonProps['animation'])"
      :bordered="bordered"
      :width="item.width"
      :height="height"
      :tag="tag"
    />
  </div>
</template>
