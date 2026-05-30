<template>
  <div
    :class="listClasses"
    :data-brand="props.brand || undefined"
    role="list"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabelledby"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssList - Design System Sansys List Component
 * ==========================================================================
 *
 * Container de layout não-interativo para agrupamento de itens de lista.
 * Orquestra DssItem(s) e DssSeparator(s) fornecendo contexto visual
 * (bordas, padding, separadores automáticos).
 *
 * Golden Reference: DssBadge (não-interativo)
 * Golden Context: DssCard (container estrutural)
 *
 * RESPONSABILIDADES:
 * ✅ Layout e estrutura visual do container
 * ✅ Borda externa (prop bordered)
 * ✅ Padding vertical (prop padding)
 * ✅ Separadores automáticos entre itens (prop separator)
 * ✅ Brandabilidade via [data-brand] e .dss-list--brand-*
 * ✅ role="list" para acessibilidade WCAG 2.1 AA
 *
 * NÃO RESPONSABILIDADES:
 * ❌ Interatividade (hover, focus, click) — pertence aos DssItems filhos
 * ❌ Gerenciamento de estado dos filhos (disabled, loading, error)
 * ❌ Dark mode por prop — gerenciado via [data-theme="dark"] global
 * ❌ Dense por prop — controlado individualmente nos DssItems
 *
 * @see https://quasar.dev/vue-components/list-and-list-items
 *
 * @example
 * ```vue
 * <DssList bordered separator>
 *   <DssItem label="Primeiro item" clickable @click="handleClick" />
 *   <DssItem label="Segundo item" clickable @click="handleClick" />
 * </DssList>
 * ```
 *
 * @version 1.0.0
 */

import type { ListProps, ListSlots } from '../types/list.types'
import { useListClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssList',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<ListProps>(), {
  bordered: false,
  padding: false,
  separator: false,
  brand: null,
  ariaLabel: undefined,
  ariaLabelledby: undefined
})

// ==========================================================================
// SLOTS (declaração explícita para type safety)
// ==========================================================================

defineSlots<ListSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { listClasses } = useListClasses(props)
</script>

<!-- Estilos carregados globalmente via dist/style.css — padrão DssItem/DssSeparator -->
