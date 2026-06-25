<template>
  <!--
    DssFabAction — Botão de Ação Flutuante Secundário governado pelo DSS
    Equivalente governado ao QFabAction do Quasar.

    ARQUITETURA:
    - Envolve QFabAction (não reconstrói do zero)
    - Wrapper div necessário para separar classes DSS do elemento raiz QFabAction
    - Sem <style scoped> — seletores de filhos Quasar precisam funcionar globalmente

    GATE DE RESPONSABILIDADE v2.4:
    - Executa uma ação específica ao ser ativado ✓
    - Suporta navegação via `to` (Vue Router) e `href` (link externo) ✓
    - NÃO gerencia estado de expansão (responsabilidade do DssFab pai) ✓
    - NÃO gerencia posicionamento (responsabilidade do DssFab + DssPageSticky) ✓

    GATE DE COMPOSIÇÃO v2.4:
    - Usa QFabAction (componente Quasar, não HTML nativo) ✓
    - Sem seletores que quebrem encapsulamento de filhos DSS ✓
    - Seletores .q-fab__action e .q-fab__action-icon em _base.scss são Quasar internals,
      não subcomponentes DSS — documentado em gateExceptions do dss.meta.json ✓

    TOUCH TARGET (WCAG 2.5.5):
    - O QFabAction renderiza botões de tamanho visual --dss-spacing-10.
    - Touch target expandido para --dss-touch-target-md via ::before no .q-fab__action (gate exception).
    - Diferente do DssFab (--dss-spacing-14 visual, sem ::before necessário).
  -->
  <div
    :class="fabActionClasses"
    v-bind="$attrs"
  >
    <q-fab-action
      class="dss-fab-action__qaction"
      :color="color"
      :text-color="textColor"
      :icon="icon"
      :label="label"
      :external-label="(externalLabel as unknown as boolean)"
      :label-position="labelPosition || 'left'"
      :disable="disable"
      :to="to"
      :href="href"
      :target="target"
      :aria-label="ariaLabel || undefined"
      @click="(e: Event) => emit('click', e as MouseEvent)"
    >
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
    </q-fab-action>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssFabAction - Design System Sansys Floating Action Button — Action
 * ==========================================================================
 *
 * Botão de ação secundário do FAB com governança DSS. Envolve QFabAction com
 * tokens de elevação, touch target e brandabilidade do Design System Sansys.
 *
 * DECISÕES ARQUITETURAIS:
 * 1. WRAPPER (não rebuild): QFabAction fornece animação de entrada/saída,
 *    acessibilidade WAI-ARIA, navegação via router-link e gerenciamento de
 *    label externo nativos. Rebuild seria duplicação sem ganho arquitetural.
 * 2. Props bloqueadas: glossy, push, flat, outline, unelevated, padding.
 *    FabAction no DSS é sempre elevado — variantes sem elevação não fazem
 *    sentido semântico para uma ação flutuante secundária.
 * 3. Touch target via ::before: O QFabAction tem tamanho visual --dss-spacing-10.
 *    ::before em .q-fab__action expande a área tocável para --dss-touch-target-md (WCAG 2.5.5).
 *    Diferente do DssFab (--dss-spacing-14 visual, sem necessidade de ::before).
 * 4. Div wrapper: Necessário para separar classes DSS do elemento raiz
 *    QFabAction e para que classes de estado/brand funcionem corretamente.
 *
 * @see https://quasar.dev/vue-components/floating-action-button
 * @see DSS/components/base/DssFabAction/DssFabAction.md
 *
 * @version 2.2.0
 */

import type { FabActionProps, FabActionEmits } from '../types/fabaction.types'
import { useFabActionClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssFabAction',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<FabActionProps>(), {
  color: 'primary',
  labelPosition: 'left',
  target: '_self',
  disable: false,
  brand: null,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<FabActionEmits>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { fabActionClasses } = useFabActionClasses(props)
</script>
