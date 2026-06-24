<template>
  <section v-if="visible" ref="sectionEl" :id="`pg-${id}`" class="pg-section">
    <div class="pg-section__head">
      <div class="pg-section__heading">
        <span class="pg-section__index">{{ index }}</span>
        <div>
          <h2 class="pg-section__title">{{ title }}</h2>
          <p class="pg-section__desc">{{ desc }}</p>
        </div>
      </div>
      <div class="pg-section__badge">{{ displayCount }}<span> items</span></div>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed, inject, ref, onMounted, nextTick, type ComputedRef } from 'vue'

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

// O badge reflete os TILES realmente renderizados (.pg-tile), não a prop count —
// evita o descompasso "diz N, renderiza M" (ex.: seção Slots com tiles de variação).
// Seções sem PgTile (ex.: matriz) caem para a prop count.
const sectionEl = ref<HTMLElement | null>(null)
const tileCount = ref<number | null>(null)
onMounted(async () => {
  await nextTick()
  // conta tiles do playground (.pg-tile) e boxes de exemplo (.dss-ex__item)
  const n = sectionEl.value?.querySelectorAll('.pg-tile, .dss-ex__item').length ?? 0
  tileCount.value = n || null
})
const displayCount = computed(() => tileCount.value ?? props.count)
</script>
