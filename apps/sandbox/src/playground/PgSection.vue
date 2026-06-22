<template>
  <section v-if="visible" :id="`pg-${id}`" class="pg-section">
    <div class="pg-section__head">
      <div class="pg-section__heading">
        <span class="pg-section__index">{{ index }}</span>
        <div>
          <h2 class="pg-section__title">{{ title }}</h2>
          <p class="pg-section__desc">{{ desc }}</p>
        </div>
      </div>
      <div class="pg-section__badge">{{ count }}<span> items</span></div>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed, inject, type ComputedRef } from 'vue'

const props = defineProps<{
  id: string
  index: string
  title: string
  desc: string
  count: number | string
}>()

// Filtro de busca provido pelo PlaygroundLayout; ausente = sempre visível.
const visibleIds = inject<ComputedRef<Set<string>> | null>('pg-visibleIds', null)
const visible = computed(() => !visibleIds?.value || visibleIds.value.has(props.id))
</script>
