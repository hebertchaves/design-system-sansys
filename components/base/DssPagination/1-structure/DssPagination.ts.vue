<script setup lang="ts">
import { QPagination } from 'quasar'
import type { DssPaginationProps, DssPaginationEmits } from '../types/pagination.types'
import { usePaginationClasses } from '../composables/usePaginationClasses'

defineOptions({ name: 'DssPagination', inheritAttrs: false })

const props = withDefaults(defineProps<DssPaginationProps>(), {
  maxPages: 5,
  ellipses: true,
  directionLinks: true,
  ariaLabel: 'Navegação por páginas',
})

const emit = defineEmits<DssPaginationEmits>()

const { rootClasses } = usePaginationClasses(props)
</script>

<template>
  <div
    v-bind="$attrs"
    :class="rootClasses"
    :data-brand="brand ?? undefined"
    role="navigation"
    :aria-label="ariaLabel"
  >
    <q-pagination
      :model-value="modelValue"
      :max="max"
      :max-pages="maxPages"
      :disable="disable"
      :readonly="readonly"
      :size="size"
      :ellipses="ellipses"
      :boundary-links="boundaryLinks"
      :direction-links="directionLinks"
      :flat="flat"
      :outline="outline"
      :round="round"
      color="primary"
      active-color="primary"
      unelevated
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>
