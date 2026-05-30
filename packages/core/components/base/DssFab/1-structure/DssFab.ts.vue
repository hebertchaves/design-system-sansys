<template>
  <!--
    DssFab — Floating Action Button governado pelo DSS
    Equivalente governado ao QFab do Quasar.

    ARQUITETURA:
    - Envolve QFab (não reconstrói do zero)
    - Wrapper div necessário para separar classes DSS do elemento raiz QFab
    - Sem <style scoped> — seletores de filhos Quasar precisam funcionar globalmente

    GATE DE RESPONSABILIDADE v2.4:
    - Gerencia estado de expansão (aberto/fechado) ✓
    - Orquestra direção de animação das ações filhas ✓
    - NÃO gerencia posicionamento fixo (responsabilidade do DssPageSticky) ✓
    - NÃO executa ações finais (responsabilidade dos DssFabAction filhos) ✓

    GATE DE COMPOSIÇÃO v2.4:
    - Usa QFab (componente Quasar, não HTML nativo) ✓
    - Sem seletores que quebrem encapsulamento de filhos DSS ✓
    - Seletores .q-fab__trigger em _base.scss são Quasar internals,
      não subcomponentes DSS — documentado em gateExceptions do dss.meta.json ✓

    SLOT DEFAULT:
    - Reservado para DssFabAction (Nível 3, a ser criado).
    - Temporariamente aceita <q-fab-action> nativo (EXC-01).
  -->
  <div
    :class="fabClasses"
    v-bind="$attrs"
  >
    <q-fab
      class="dss-fab__qfab"
      :model-value="modelValue"
      :color="color"
      :text-color="textColor"
      :icon="icon"
      :active-icon="activeIcon"
      :label="label"
      :hide-icon="hideIcon"
      :hide-label="hideLabel"
      :direction="direction"
      :vertical-actions-align="verticalActionsAlign"
      :persistent="persistent"
      :disable="disable"
      :aria-label="ariaLabel || undefined"
      @update:model-value="(v: boolean) => emit('update:modelValue', v)"
      @click="(e: MouseEvent) => emit('click', e)"
      @show="emit('show')"
      @hide="emit('hide')"
      @before-show="emit('before-show')"
      @before-hide="emit('before-hide')"
    >
      <!-- Slot default: DssFabAction filhos -->
      <slot />
    </q-fab>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssFab - Design System Sansys Floating Action Button
 * ==========================================================================
 *
 * FAB (Floating Action Button) com governança DSS. Envolve QFab com tokens
 * de elevação, transição e brandabilidade do Design System Sansys.
 *
 * DECISÕES ARQUITETURAIS:
 * 1. WRAPPER (não rebuild): QFab fornece estado de expansão, direção de
 *    animação, acessibilidade WAI-ARIA e keyboard navigation nativos.
 *    Rebuild seria duplicação de esforço sem ganho arquitetural.
 * 2. Props bloqueadas: glossy, push, flat, outline, unelevated, padding.
 *    O FAB no DSS é sempre elevado (Material Design baseline). Variantes
 *    flat/outline não fazem sentido semântico para ação flutuante primária.
 * 3. Div wrapper: Necessário para separar classes DSS do elemento raiz QFab
 *    e para que as classes de estado/brand sejam aplicadas corretamente.
 * 4. Posicionamento: NÃO gerenciado aqui. O consumidor é responsável por
 *    posicionar o DssFab (tipicamente via DssPageSticky).
 *
 * @see https://quasar.dev/vue-components/floating-action-button
 * @see DSS/components/base/DssFab/DssFab.md
 *
 * @version 2.2.0
 */

import type { FabProps, FabEmits } from '../types/fab.types'
import { useFabClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssFab',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<FabProps>(), {
  // Estado
  modelValue: false,

  // Conteúdo visual
  color: 'primary',
  textColor: undefined,
  label: undefined,
  icon: 'add',
  activeIcon: 'close',
  hideIcon: false,
  hideLabel: false,

  // Comportamento de expansão
  direction: 'up',
  verticalActionsAlign: 'center',
  persistent: false,

  // Estado
  disable: false,

  // Brand
  brand: null,

  // Acessibilidade
  ariaLabel: undefined,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  click: [event: MouseEvent]
  show: []
  hide: []
  'before-show': []
  'before-hide': []
}>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { fabClasses } = useFabClasses(props)
</script>

<style lang="scss">
// Import final compiled styles (Layer 4 output)
// NOTA: Sem `scoped` — necessário para que seletores .dss-fab__qfab .q-fab__trigger
// funcionem. Com scoped, seletores em elementos Quasar internos não recebem
// o atributo data-v-xxx e ficam inaplicáveis.
// Precedente: DssBtnDropdown (mesma razão).
@import '../DssFab.module.scss';
</style>
