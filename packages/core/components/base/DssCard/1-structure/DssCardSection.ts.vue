<template>
  <div :class="sectionClasses" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssCardSection - Design System Sansys Card Section Component
 * ==========================================================================
 *
 * Seção de conteúdo dentro do DssCard
 * Componente DSS baseado em q-card-section com API governada pelo Design System
 *
 * @see https://quasar.dev/vue-components/card#card-sections
 *
 * @example
 * ```vue
 * <DssCardSection horizontal>
 *   Content here
 * </DssCardSection>
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import type { CardSectionProps } from '../types/card.types'
import { useCardSectionClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssCardSection',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<CardSectionProps>(), {
  horizontal: false
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { sectionClasses } = useCardSectionClasses(props)
</script>

<style lang="scss" scoped>
@import '../DssCard.module.scss';
</style>
