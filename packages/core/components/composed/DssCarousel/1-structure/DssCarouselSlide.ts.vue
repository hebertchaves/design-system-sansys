<script setup lang="ts">
/**
 * ==========================================================================
 * DssCarouselSlide — Layer 1: Structure
 * ==========================================================================
 *
 * Sub-componente de DssCarousel. Wrapper governado sobre QCarouselSlide.
 * Sempre usado como filho direto de DssCarousel.
 *
 * Motor QCarouselSlide (EXC-Gate-01)
 *   → QCarouselSlide gerencia a transição e o estado de visibilidade do slide.
 *   → O DSS governa apenas o conteúdo via slot e a semântica.
 *
 * role="group" + aria-label
 *   → Cada slide é um grupo de conteúdo dentro do landmark region do carousel.
 *   → Consumidor pode fornecer aria-label via $attrs ou via ariaLabel do slide.
 *
 * @version 1.0.0
 */

import { QCarouselSlide } from 'quasar'
import type { DssCarouselSlideProps, DssCarouselSlideSlots } from '../types/carousel.types'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssCarouselSlide',
  inheritAttrs: false,
})

// ==========================================================================
// PROPS
// ==========================================================================

defineProps<DssCarouselSlideProps>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<DssCarouselSlideSlots>()
</script>

<template>
  <QCarouselSlide
    v-bind="$attrs"
    :name="name"
    :disable="disable"
    :img-src="imgSrc"
    :img-style="imgStyle"
    :img-class="imgClass"
    role="group"
    class="dss-carousel__slide"
  >
    <slot />
  </QCarouselSlide>
</template>
