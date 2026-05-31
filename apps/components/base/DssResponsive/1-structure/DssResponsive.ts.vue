<script lang="ts">
export default {
  name: 'DssResponsive',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { DssResponsiveProps, DssResponsiveSlots } from '../types/responsive.types'
import { useResponsiveState } from '../composables/useResponsiveState'

defineSlots<DssResponsiveSlots>()

const props = withDefaults(defineProps<DssResponsiveProps>(), {
  tag: 'div',
})

const { currentBreakpoint, isXs, isSm, isMd, isLg, isXl, isMobile, isDesktop } =
  useResponsiveState()

const isVisible = computed(() => {
  const bp = currentBreakpoint.value

  // showOn (and its breakpoint alias) takes priority
  const showList = props.showOn ?? props.breakpoint
  if (showList && showList.length > 0) {
    const shown = showList.includes(bp)
    if (props.hideOn && props.hideOn.length > 0) {
      return shown && !props.hideOn.includes(bp)
    }
    return shown
  }

  // hideOn only
  if (props.hideOn && props.hideOn.length > 0) {
    return !props.hideOn.includes(bp)
  }

  // No constraints — always visible
  return true
})

const slotScope = computed(() => ({
  currentBreakpoint: currentBreakpoint.value,
  isXs: isXs.value,
  isSm: isSm.value,
  isMd: isMd.value,
  isLg: isLg.value,
  isXl: isXl.value,
  isMobile: isMobile.value,
  isDesktop: isDesktop.value,
}))
</script>

<template>
  <component
    :is="props.tag"
    v-if="isVisible"
    v-bind="$attrs"
    class="dss-responsive"
  >
    <slot v-bind="slotScope" />
  </component>
</template>
