<template>
  <q-item-section
    :class="itemSectionClasses"
    :avatar="props.avatar"
    :thumbnail="props.thumbnail"
    :side="props.side"
    :top="props.top"
    :no-wrap="props.noWrap"
    v-bind="$attrs"
  >
    <slot />
  </q-item-section>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssItemSection - Design System Sansys Item Section Component
 * ==========================================================================
 *
 * Container de layout interno para itens de lista.
 * Orquestra o alinhamento e espaçamento de avatares, ícones, textos
 * e ações secundárias dentro de um DssItem.
 *
 * Golden Reference: DssAvatar (para seções de mídia)
 * Golden Context:   DssList (container pai da família)
 *
 * RESPONSABILIDADES:
 * ✅ Coluna flex dentro do DssItem (layout de seção)
 * ✅ Seção de avatar — alinhamento e largura mínima para DssAvatar/DssIcon
 * ✅ Seção de thumbnail — ajuste de largura para imagens em miniatura
 * ✅ Seção lateral (side) — alinhamento à direita para ações secundárias
 * ✅ Alinhamento ao topo (top) — itens multi-linha
 * ✅ Sem quebra de linha interna (noWrap)
 * ✅ Sobrescrita de espaçamentos Quasar com tokens DSS (EXC-01)
 * ✅ Forwarding de $attrs via inheritAttrs: false + v-bind="$attrs"
 *
 * NÃO RESPONSABILIDADES:
 * ❌ Interatividade (hover, focus, click) — pertence ao DssItem pai
 * ❌ Tipografia contextual — pertence ao DssItemLabel (Fase 2)
 * ❌ Brandabilidade direta — herdada via [data-brand] no ancestral
 * ❌ Dark mode por prop — gerenciado via [data-theme="dark"] global
 * ❌ Dense por prop — controlado pelo DssItem pai
 *
 * @see https://quasar.dev/vue-components/list-and-list-items#qitemsection-api
 *
 * @example
 * ```vue
 * <DssItem>
 *   <DssItemSection avatar>
 *     <DssAvatar color="primary" icon="person" />
 *   </DssItemSection>
 *   <DssItemSection>
 *     <DssItemLabel label="Ana Silva" caption="Administradora" />
 *   </DssItemSection>
 *   <DssItemSection side>
 *     <DssIcon name="chevron_right" />
 *   </DssItemSection>
 * </DssItem>
 * ```
 *
 * @version 1.0.0
 */

import type { ItemSectionProps, ItemSectionSlots } from '../types/item-section.types'
import { useItemSectionClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssItemSection',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<ItemSectionProps>(), {
  avatar: false,
  thumbnail: false,
  side: false,
  top: false,
  noWrap: false
})

// ==========================================================================
// SLOTS (declaração explícita para type safety)
// ==========================================================================

defineSlots<ItemSectionSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { itemSectionClasses } = useItemSectionClasses(props)
</script>

<!-- Estilos carregados globalmente via dist/style.css — padrão DssList/DssItem -->
