<script setup lang="ts">
/**
 * ==========================================================================
 * DssSlider — Layer 1: Structure
 * ==========================================================================
 *
 * RESPONSABILIDADE: Estrutura Vue e lógica do componente.
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs é repassado explicitamente para o QSlider via v-bind="$attrs".
 *   → O wrapper externo <div class="dss-slider"> é o elemento raiz,
 *     portanto atributos HTML devem ir explicitamente para o QSlider.
 *
 * QSlider como controle interno
 *   → DssSlider cria um <div> externo para abrigar hint/errorMessage,
 *     pois o QSlider não é um QField (sem label, hint, error nativo).
 *   → O <div class="dss-slider"> recebe data-brand e wrapperClasses.
 *   → O QSlider recebe $attrs + todas as props funcionais.
 *
 * Cor do controle
 *   → DssSlider NÃO expõe prop `color`.
 *   → A cor é governada exclusivamente via tokens DSS (--dss-action-primary).
 *   → O SCSS sobrescreve as classes de cor do QSlider via seletores
 *     descendentes: .dss-slider .q-slider__track, .q-slider__selection, etc.
 *
 * Touch Target: Opção A (interativo)
 *   → min-height: var(--dss-touch-target-md) aplicado em
 *     .dss-slider .q-slider__track-container no SCSS.
 *   → QSlider já possui área de interação via padding interno;
 *     o min-height garante 44px WCAG 2.5.5 consistente com DssInput/DssSelect.
 *   → Dense mode: reduz para --dss-touch-target-sm (36px) — uso contextual.
 *
 * Estados NÃO aplicáveis:
 *   → indeterminate: slider possui valor contínuo, não estado tristate.
 *   → loading: Fase 1 — sem estado de carregamento (value vem síncrono).
 *
 * @see https://quasar.dev/vue-components/slider
 * @version 1.0.0
 */

import { ref, computed, onMounted } from 'vue'
import { QSlider } from 'quasar'
import type { SliderProps, SliderEmits, SliderExpose } from '../types/slider.types'
import { useSliderClasses, useSliderActions, useSliderState } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssSlider',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<SliderProps>(), {
  // Model
  min: 0,
  max: 100,
  step: 1,
  snap: false,

  // Display
  markers: false,
  label: false,
  labelAlways: false,
  labelValue: null,

  // Form integration
  hint: '',
  errorMessage: '',
  error: false,

  // States
  disabled: false,
  readonly: false,
  dense: false,

  // Orientation
  vertical: false,
  reverse: false,

  // Brand
  brand: null,

  // Accessibility
  tabindex: null
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<SliderEmits>()

// ==========================================================================
// REFS
// ==========================================================================

/** Referência ao QSlider interno */
const qSliderRef = ref<InstanceType<typeof QSlider> | null>(null)

// ==========================================================================
// UNIQUE ID (for aria-describedby)
// ==========================================================================

/**
 * ID único para associação error message ↔ slider via aria-describedby.
 */
const uid = Math.random().toString(36).substring(2, 8)
const errorId = `dss-slider-error-${uid}`

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { isFocused, handleFocusIn, handleFocusOut } = useSliderState()
const { wrapperClasses } = useSliderClasses(props, { isFocused })
const { focus, blur } = useSliderActions(qSliderRef)

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Tabindex computado
 *
 * - Desabilitado: -1 (não focável)
 * - Customizado: usa prop tabindex
 * - Padrão: 0 (focável na ordem natural)
 */
const computedTabindex = computed(() => {
  if (props.disabled) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) {
    return typeof props.tabindex === 'number'
      ? props.tabindex
      : parseInt(String(props.tabindex))
  }
  return 0
})

/**
 * aria-describedby para associar slider com mensagem de erro
 */
const errorDescribedBy = computed(() => {
  if (props.error && props.errorMessage) return errorId
  return undefined
})

/**
 * label-value passado ao QSlider.
 * Quando null/undefined, QSlider exibe o valor numérico atual.
 */
const resolvedLabelValue = computed(() =>
  props.labelValue !== null && props.labelValue !== undefined
    ? props.labelValue
    : undefined
)

// ==========================================================================
// DEV WARNINGS
// ==========================================================================

onMounted(() => {
  if (process.env.NODE_ENV !== 'production' && !props.ariaLabel) {
    console.warn(
      '[DssSlider] ariaLabel é fortemente recomendado quando não há label visual associado (WCAG 1.3.1)'
    )
  }
})

// ==========================================================================
// EXPOSE
// ==========================================================================

defineExpose<SliderExpose>({
  focus,
  blur
})
</script>

<template>
  <!-- Wrapper externo: recebe data-brand e classes DSS -->
  <div
    :class="wrapperClasses"
    :data-brand="brand || undefined"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <!-- QSlider: controle nativo com $attrs repassados -->
    <QSlider
      ref="qSliderRef"
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :snap="snap"
      :markers="markers"
      :label="label"
      :label-always="labelAlways"
      :label-value="resolvedLabelValue"
      :disable="disabled"
      :readonly="readonly"
      :dense="dense"
      :vertical="vertical"
      :reverse="reverse"
      :tabindex="computedTabindex"
      :aria-label="ariaLabel || undefined"
      :aria-describedby="errorDescribedBy"
      v-bind="$attrs"
      @update:model-value="emit('update:modelValue', $event)"
      @change="emit('change', $event)"
    />

    <!-- Hint text — visível somente quando não há erro -->
    <div
      v-if="hint && !error"
      class="dss-slider__hint"
    >
      {{ hint }}
    </div>

    <!-- Error message — visível quando error=true e mensagem fornecida -->
    <div
      v-if="error && errorMessage"
      :id="errorId"
      class="dss-slider__error"
      role="alert"
      aria-live="assertive"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
