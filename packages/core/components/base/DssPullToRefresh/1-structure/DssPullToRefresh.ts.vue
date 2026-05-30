<script lang="ts">
export default { name: 'DssPullToRefresh', inheritAttrs: false }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { QPullToRefresh } from 'quasar'
import type { DssPullToRefreshProps, DssPullToRefreshEmits } from '../types/pulltorefresh.types'
import { usePullToRefreshClasses } from '../composables/usePullToRefreshClasses'

const props = withDefaults(defineProps<DssPullToRefreshProps>(), {
  size: 'md',
})

const emit = defineEmits<DssPullToRefreshEmits>()

const { rootClasses } = usePullToRefreshClasses(props)

const qPullToRefreshRef = ref<InstanceType<typeof QPullToRefresh> | null>(null)
const isRefreshing = ref(false)

function handleRefresh(done: () => void) {
  isRefreshing.value = true
  emit('refresh', () => {
    isRefreshing.value = false
    done()
  })
}

defineExpose({
  /** Dispara a ação de refresh programaticamente */
  trigger: () => qPullToRefreshRef.value?.trigger(),
})
</script>

<template>
  <QPullToRefresh
    ref="qPullToRefreshRef"
    v-bind="$attrs"
    :class="rootClasses"
    class="dss-pull-to-refresh"
    color="primary"
    :no-mouse="noMouse"
    :disable="disabled"
    :icon="icon"
    @refresh="handleRefresh"
  >
    <!-- Anunciador acessível: leitores de tela anunciam mudanças de estado -->
    <span
      class="dss-sr-only"
      role="status"
      aria-live="polite"
      :aria-busy="isRefreshing"
    >
      <template v-if="isRefreshing">Atualizando conteúdo…</template>
    </span>

    <slot />
  </QPullToRefresh>
</template>
