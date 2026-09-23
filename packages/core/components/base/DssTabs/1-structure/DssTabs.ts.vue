<script setup lang="ts">
/**
 * ==========================================================================
 * DssTabs — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QTabs. Container de navegação por abas.
 *
 * Responsabilidades:
 * - Encapsula <q-tabs> expondo apenas as props semanticamente relevantes
 * - Gerencia o estado global de seleção (v-model) entre as DssTab filhas
 * - Bloqueia props de cor (active-color, active-bg-color, indicator-color)
 *   — DSS governa cores via tokens no DssTab
 * - Feedback visual é governado pelo DSS no DssTab (ver nota sobre ripple abaixo)
 * - Bloqueia `no-caps` — governado por `--dss-text-transform-control`
 * - Impõe ícones oficiais DSS nas setas de navegação (chevron_left/right)
 * - Propaga [data-brand] para coloração automática dos DssTab filhos
 *
 * Props bloqueadas:
 * - active-color: tokens DSS no DssTab governam cor ativa
 * - active-bg-color: tokens DSS no DssTab governam cor de fundo ativa
 * - indicator-color: tokens DSS no DssTab governam cor do indicador
 * - ripple: desligado no DssTab/DssRouteTab, que é onde a prop EXISTE.
 *   O `:ripple="false"` que ficava aqui era inócuo — o QTabs não tem essa prop
 *   (conferido em `dist/api/QTabs.json`), então o valor caía em `$attrs` e só
 *   vazava para o DOM como atributo `ripple="false"`. Removido em set/2026.
 * - no-caps: governado por `--dss-text-transform-control` (padrão `none`).
 *   A declaração NÃO mora aqui: o container não tem rótulo próprio, e quem
 *   carrega o texto é a DssTab filha — é o `.dss-tab` que lê o token. Uma
 *   regra de capitalização neste container seria inerte.
 *
 * Regra de Composição v2.4:
 * - Aceita apenas DssTab (ou DssRouteTab futuro) em seu slot default
 * - O uso de <q-tab> diretamente dentro do DssTabs é violação arquitetural
 *
 * @version 1.0.0
 * @see https://quasar.dev/vue-components/tabs
 */
import type { TabsProps, TabsEmits, TabsSlots } from '../types/tabs.types'
import { useTabsClasses } from '../composables/useTabsClasses'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssTabs',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: undefined,
  align: 'left',
  // 0, não 600. No Quasar o breakpoint NÃO controla setas: ele força
  // `justify` quando a largura do container é MENOR que o valor
  // (`justify.value = size < breakpoint`, QTabs.js:239). Com o default 600
  // herdado do Quasar, qualquer barra dentro de um painel comum — quase toda
  // barra — nascia justificada, e a prop `align` virava letra morta. Medido:
  // quatro tiles com align left/center/right/justify saíam TODOS
  // `q-tabs__content--align-justify`. Em 0 a condição nunca é satisfeita e o
  // `align` manda; quem quiser o justify responsivo declara o breakpoint.
  breakpoint: 0,
  vertical: false,
  dense: false,
  brand: null,
  ariaLabel: undefined,
  inlineLabel: false,
  narrowIndicator: false,
  switchIndicator: false,
  shrink: false,
  stretch: false,
  outsideArrows: false,
  mobileArrows: false,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<TabsEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<TabsSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { tabsClasses } = useTabsClasses(props)

// ==========================================================================
// HANDLERS
// ==========================================================================

/**
 * Emite update:modelValue para compatibilidade com v-model.
 */
function onUpdate(val: string | number): void {
  emit('update:modelValue', val)
}
</script>

<template>
  <!--
    DssTabs — Container de grupo de abas DSS

    Padrão arquitetural (Gate de Composição v2.4 Regra 1):
    <div> DSS como elemento raiz — mesmo padrão de DssBtnDropdown (conformant).
    O <q-tabs> é o componente Quasar interno que provê state management,
    keyboard navigation e scroll/arrow logic.

    aria-label e data-brand ficam no root <div> para forwarding correto de
    atributos e cascade CSS de marca nos DssTab filhos.

    As setas de navegação usam chevron_left/right (Material Icons padrão
    do Quasar) forçados explicitamente — impedindo substituição acidental
    por ícones externos.
  -->
  <div
    :class="tabsClasses"
    :data-brand="props.brand || undefined"
    v-bind="$attrs"
  >
    <q-tabs
      :model-value="props.modelValue"
      :align="props.align"
      :breakpoint="props.breakpoint"
      :vertical="props.vertical"
      :dense="props.dense"
      :aria-label="props.ariaLabel || undefined"
      left-icon="chevron_left"
      right-icon="chevron_right"
      :inline-label="props.inlineLabel"
      :narrow-indicator="props.narrowIndicator"
      :switch-indicator="props.switchIndicator"
      :shrink="props.shrink"
      :stretch="props.stretch"
      :outside-arrows="props.outsideArrows"
      :mobile-arrows="props.mobileArrows"
      @update:model-value="onUpdate"
    >
      <!-- Slot default: aceita DssTab (e DssRouteTab quando implementado) -->
      <slot />
    </q-tabs>
  </div>
</template>
