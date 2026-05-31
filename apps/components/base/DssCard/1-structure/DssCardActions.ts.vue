<template>
  <div :class="actionsClasses" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssCardActions - Design System Sansys Card Actions Component
 * ==========================================================================
 *
 * Área de ações (botões) dentro do DssCard
 * Componente DSS baseado em q-card-actions com API governada pelo Design System
 *
 * @see https://quasar.dev/vue-components/card#card-actions
 *
 * @example
 * ```vue
 * <DssCardActions align="right">
 *   <DssButton>Cancel</DssButton>
 *   <DssButton color="primary">Confirm</DssButton>
 * </DssCardActions>
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import type { CardActionsProps } from '../types/card.types'
import { useCardActionsClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssCardActions',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<CardActionsProps>(), {
  align: 'right',
  vertical: false
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { actionsClasses } = useCardActionsClasses(props)
</script>

<style lang="scss" scoped>
@import '../DssCard.module.scss';
</style>
