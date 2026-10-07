<template>
  <component
    :is="componentType"
    :type="nativeType"
    :to="to"
    :replace="replace"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :style="buttonStyle"
    :tabindex="computedTabindex"
    :aria-label="ariaLabel"
    :aria-busy="loading ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Loading spinner with ARIA -->
    <span
      v-if="loading && percentage === null"
      class="dss-button__loading"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <span class="dss-button__spinner" aria-hidden="true"></span>
    </span>

    <!-- Progress bar with ARIA -->
    <span
      v-if="loading && percentage !== null"
      class="dss-button__progress"
      :class="{ 'dss-button__progress--dark': darkPercentage }"
      role="progressbar"
      :aria-valuenow="percentage"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="`Loading ${percentage}%`"
    >
      <span
        class="dss-button__progress-indicator"
        :style="percentageStyle"
        aria-hidden="true"
      ></span>
    </span>

    <!-- Icon Left — composto via DssIcon (CCI §3.1 / §3.2).
         Slot #icon-left tem precedência sobre a prop icon (CCI §3.2). -->
    <span
      v-if="$slots['icon-left'] && !loading"
      class="dss-button__icon dss-button__icon--left"
      aria-hidden="true"
    >
      <slot name="icon-left"></slot>
    </span>
    <DssIcon
      v-else-if="computedIconLeft && !loading"
      :name="computedIconLeft"
      inline
      decorative
      class="dss-button__icon dss-button__icon--left"
    />

    <!-- Label/Content — espelha o QBtn em DOIS pontos, e cada um consertou um defeito
         encontrado na adequação do DssMenu (set/2026):

         1. `label` E slot, não `label` COMO FALLBACK do slot.
            Antes: <slot>{{ label }}</slot> — a prop era só fallback, então qualquer
            conteúdo no slot DESCARTAVA o label em silêncio. Com um overlay no slot
            (DssMenu, DssPopupProxy) ou um DssBadge flutuante — que não renderizam
            texto — o botão ficava SEM NOME ACESSÍVEL. Medidos 54 usos nesse estado.
            O QBtn nunca fez isso: `inner.push(label)` e depois
            `hMergeSlot(slots.default, inner)` — ele MESCLA (QBtn.js:356-359).

         2. `q-anchor--skip` no wrapper.
            O QMenu ancora em `proxy.$el.parentNode`, subindo apenas por
            `.q-anchor--skip` (use-anchor.js:148-164). Sem a classe, a âncora virava
            este span — inline e de largura zero — e o clique no <button> nunca a
            alcançava: o idioma `<DssButton><DssMenu/></DssButton>` NÃO ABRIA.
            O QBtn põe a classe no próprio `q-btn__content` (QBtn.js:402). -->
    <span v-if="label || $slots.default" class="dss-button__label q-anchor--skip">
      <template v-if="label">{{ label }}</template>
      <slot />
    </span>

    <!-- Icon Right — composto via DssIcon (CCI §3.1 / §3.2).
         Slot #icon-right tem precedência sobre a prop iconRight (CCI §3.2). -->
    <span
      v-if="$slots['icon-right'] && !loading"
      class="dss-button__icon dss-button__icon--right"
      aria-hidden="true"
    >
      <slot name="icon-right"></slot>
    </span>
    <DssIcon
      v-else-if="computedIconRight && !loading"
      :name="computedIconRight"
      inline
      decorative
      class="dss-button__icon dss-button__icon--right"
    />

    <!-- Ripple effect (decorative - hidden from screen readers) -->
    <span v-if="ripple" class="dss-button__ripple" aria-hidden="true"></span>
  </component>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssButton - Design System Sansys Button Component
 * ==========================================================================
 *
 * Componente de botão moderno com TypeScript + Composition API
 * Compatível com Quasar q-btn API
 *
 * @see https://quasar.dev/vue-components/button
 *
 * @example
 * ```vue
 * <DssButton
 *   color="primary"
 *   variant="elevated"
 *   icon="save"
 *   :loading="isLoading"
 *   @click="handleSubmit"
 * >
 *   Salvar
 * </DssButton>
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import { computed, useSlots, Comment, Text, Fragment } from 'vue'
import type { ButtonProps, ButtonEmits } from '../types/button.types'
import {
  useButtonClasses,
  useButtonComponent,
  useButtonProgress
} from '../composables'
import DssIcon from '../../DssIcon/DssIcon.vue'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssButton',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<ButtonProps>(), {
  // Content
  label: '',
  icon: '',
  iconRight: '',

  // Visual
  variant: 'elevated',
  color: 'primary',
  size: 'md',
  round: false,
  square: false,

  // States
  loading: false,
  disabled: false,

  // Loading Progress
  percentage: null,
  darkPercentage: false,

  // Behavior
  type: 'button',
  to: null,
  replace: false,

  // Brand
  brand: null,

  // Layout
  dense: false,
  noCaps: false,
  align: 'center',
  stack: false,
  stretch: false,
  noWrap: false,
  padding: null,

  // Interaction
  ripple: false,
  tabindex: null,

  // Accessibility
  ariaLabel: undefined
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<ButtonEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

const slots = useSlots()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

/**
 * Detecta se o slot default renderiza RÓTULO — não apenas se o slot existe.
 *
 * `!!slots.default` contava qualquer conteúdo como rótulo, inclusive o que não
 * desenha texto nenhum: DssTooltip, DssMenu, DssPopupProxy, DssBadge flutuante.
 * É a MESMA observação que motivou a mescla de `label` com o slot logo acima no
 * template (set/2026) — lá o sintoma foi botão sem nome acessível; aqui é
 * geometria: `<DssButton icon="help"><DssTooltip/></DssButton>` perdia a classe
 * `--icon-only`, caía no `min-width: 56px` do tamanho e o botão redondo virava
 * uma elipse de 56×36. O idioma "ícone + dica" é o mais comum na app bar, então
 * o defeito se repetia em toda tela.
 *
 * Anexos são reconhecidos pelo NOME do componente — inspecionar o vnode é o
 * único jeito de distinguir "slot com overlay" de "slot com texto".
 */
const ANEXOS_SEM_ROTULO = new Set([
  'DssTooltip', 'DssMenu', 'DssPopupProxy', 'DssBadge',
  'QTooltip', 'QMenu', 'QPopupProxy', 'QBadge',
])

function renderizaRotulo(nodes: unknown[]): boolean {
  return nodes.some((n) => {
    const node = n as { type?: unknown; children?: unknown }
    if (node.type === Comment) return false               // v-if falso
    if (node.type === Text) return String(node.children ?? '').trim().length > 0
    if (node.type === Fragment) return renderizaRotulo((node.children as unknown[]) ?? [])
    const tipo = node.type as { name?: string; __name?: string } | undefined
    const nome = tipo?.name ?? tipo?.__name
    if (nome && ANEXOS_SEM_ROTULO.has(nome)) return false
    return true
  })
}

const hasDefaultSlot = computed(() => {
  const slot = slots.default
  if (!slot) return false
  // Fail-safe: se a inspeção falhar, tratar como rótulo (comportamento anterior)
  // — errar para "tem rótulo" só deixa o botão largo; errar para o contrário
  // esconderia um rótulo de verdade.
  try { return renderizaRotulo(slot()) } catch { return true }
})

// Tipo de componente (button ou router-link)
const { componentType, nativeType } = useButtonComponent(props)

// Classes CSS do botão
const { buttonClasses } = useButtonClasses(props, { hasDefaultSlot })

// Barra de progresso
const { percentageStyle } = useButtonProgress(props)

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Ícone à esquerda computado
 */
const computedIconLeft = computed(() => props.icon || '')

/**
 * Ícone à direita computado
 */
const computedIconRight = computed(() => props.iconRight || '')

/**
 * Estilo inline para padding customizável
 */
const buttonStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.padding) {
    style.padding = props.padding
  }

  return style
})

/**
 * Tabindex computado
 *
 * - Desabilitado/Loading: -1 (não focável)
 * - Customizado: usa prop tabindex
 * - Padrão: 0 (focável na ordem natural)
 */
const computedTabindex = computed(() => {
  if (props.disabled || props.loading) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) {
    return typeof props.tabindex === 'number' ? props.tabindex : parseInt(props.tabindex)
  }
  return 0
})

// ==========================================================================
// METHODS
// ==========================================================================

/**
 * Handler de clique do botão
 *
 * Emite evento 'click' apenas se:
 * - Não está disabled
 * - Não está loading
 */
function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
