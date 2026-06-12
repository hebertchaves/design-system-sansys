<template>
  <!--
    DssExpansionItem — Item Expansível governado pelo DSS
    Equivalente governado ao QExpansionItem do Quasar.

    ARQUITETURA:
    - Envolve QExpansionItem (não reconstrói do zero)
    - Wrapper div necessário para separar classes DSS do root do QExpansionItem
    - Sem <style scoped> — seletores de filhos Quasar precisam funcionar globalmente

    GATE DE RESPONSABILIDADE v2.4:
    - Gerencia seu próprio estado de expansão via v-model ✓
    - NÃO força comportamento de accordion — usa prop group do QExpansionItem ✓
    - NÃO gerencia posicionamento ✓

    GATE DE COMPOSIÇÃO v2.4:
    - Usa QExpansionItem (componente Quasar, não HTML nativo) ✓
    - Seletores .q-item, .q-expansion-item__content e
      .q-expansion-item__toggle-icon são internos Quasar,
      não subcomponentes DSS — documentados como gateExceptions em dss.meta.json ✓

    TOUCH TARGET (WCAG 2.5.5) — Opção A:
    - Header (.q-item) tem min-height --dss-spacing-12
    - Tamanho visual ≥ --dss-touch-target-md → Opção A (sem ::before necessário)
    - Dense: min-height mantido em --dss-touch-target-md por acessibilidade
  -->
  <div
    :class="expansionItemClasses"
    v-bind="$attrs"
  >
    <q-expansion-item
      class="dss-expansion-item__qexpansion"
      :model-value="modelValue"
      :default-opened="defaultOpened"
      :group="group"
      :disable="disable"
      :label="label"
      :caption="caption"
      :icon="icon"
      :expand-icon="expandIcon || undefined"
      :header-aria-label="ariaLabel || undefined"
      @update:model-value="(val: boolean) => emit('update:modelValue', val)"
      @show="emit('show')"
      @hide="emit('hide')"
      @before-show="emit('before-show')"
      @before-hide="emit('before-hide')"
    >
      <template v-if="$slots.header" #header>
        <slot name="header" />
      </template>
      <slot />
    </q-expansion-item>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssExpansionItem — Design System Sansys Expansion Item
 * ==========================================================================
 *
 * Item expansível com header interativo e painel colapsável, com governança
 * DSS de tokens, touch target WCAG e brandabilidade.
 *
 * DECISÕES ARQUITETURAIS:
 * 1. WRAPPER (não rebuild): QExpansionItem fornece animação de altura,
 *    gerenciamento de accordion via group, ARIA (aria-expanded, aria-controls)
 *    e navegação por teclado nativos. Rebuild seria duplicação sem ganho.
 * 2. Props bloqueadas: dark, headerClass, headerStyle, switchToggleSide.
 *    DSS gerencia dark mode via CSS global; header visual é governado pelo DSS;
 *    ícone de expansão fica sempre à direita (padrão DSS).
 * 3. Touch target Opção A: .q-item tem min-height --dss-spacing-12,
 *    acima do mínimo --dss-touch-target-md. Diferente de DssFabAction (Opção B).
 * 4. Estado expanded via classe Quasar .q-expansion-item--expanded no DOM interno,
 *    usada como seletor descendente para brand e estilos de expanded state.
 *
 * @see https://quasar.dev/vue-components/expansion-item
 * @see DSS/components/base/DssExpansionItem/DssExpansionItem.md
 *
 * @version 2.2.0
 */

import type { ExpansionItemProps, ExpansionItemEmits } from '../types/expansionitem.types'
import { useExpansionItemClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssExpansionItem',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<ExpansionItemProps>(), {
  disable: false,
  dense: false,
  brand: null,
  // undefined explícito: sem isso o cast booleano do Vue transforma a
  // ausência em false, forçando modo CONTROLADO fechado e ignorando
  // defaultOpened (bug real corrigido na Onda P2/G3.2)
  modelValue: undefined,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<ExpansionItemEmits>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { expansionItemClasses } = useExpansionItemClasses(props)
</script>
