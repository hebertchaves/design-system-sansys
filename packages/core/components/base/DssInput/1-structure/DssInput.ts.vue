<template>
  <div :class="wrapperClasses" :data-brand="brand || undefined">
    <!-- Linha: before + campo + after lado a lado (semântica Quasar) -->
    <div class="dss-input__row">
    <!-- Before slot -->
    <div v-if="slots.before" class="dss-input__before">
      <slot name="before" />
    </div>

    <!-- Main field wrapper -->
    <div class="dss-input__field">
      <!-- Prepend slot -->
      <div v-if="slots.prepend" class="dss-input__prepend">
        <slot name="prepend" />
      </div>

      <!-- Input control -->
      <div class="dss-input__control">
        <!-- Label -->
        <label
          v-if="label || slots.label"
          :id="labelId"
          :for="inputId"
          :class="labelClasses"
        >
          <slot name="label">{{ label }}</slot>
        </label>

        <!-- Native input -->
        <input
          :id="inputId"
          ref="inputRef"
          :type="type"
          :value="modelValue"
          :placeholder="computedPlaceholder"
          :title="computedPlaceholder || undefined"
          :disabled="disabled || loading"
          :readonly="readonly"
          :class="inputClasses"
          :tabindex="computedTabindex"
          :aria-label="ariaLabel"
          :aria-labelledby="label ? labelId : undefined"
          :aria-describedby="ariaDescribedBy"
          :aria-invalid="temErro ? 'true' : undefined"
          :aria-busy="loading ? 'true' : undefined"
          :aria-disabled="disabled ? 'true' : undefined"
          :aria-readonly="readonly ? 'true' : undefined"
          :aria-required="required ? 'true' : undefined"
          v-bind="$attrs"
          @input="handleInput"
          @focus="handleFocus"
          @blur="onBlur"
        />
      </div>

      <!-- Append slot -->
      <div v-if="slots.append || clearable || loading" class="dss-input__append">
        <slot name="append" />

        <!-- Loading spinner with ARIA -->
        <span
          v-if="loading"
          class="dss-input__loading"
          role="status"
          aria-label="Loading"
          aria-live="polite"
        >
          <span class="dss-input__spinner" aria-hidden="true"></span>
        </span>

        <!-- Clear button -->
        <button
          v-if="clearable && hasValue && !loading && !disabled && !readonly"
          class="dss-input__clear"
          type="button"
          :tabindex="-1"
          :aria-label="clearAriaLabel"
          @click="handleClear"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>

    <!-- After slot -->
    <div v-if="slots.after" class="dss-input__after">
      <slot name="after" />
    </div>
    </div><!-- /.dss-input__row -->

    <!-- Bottom slots (hint/error) -->
    <div v-if="hasBottomSlot" class="dss-input__bottom">
      <div
        v-if="temErro && (mensagemDeErro || slots.error)"
        :id="errorId"
        class="dss-input__error"
        role="alert"
        aria-live="assertive"
      >
        <!-- Paridade Quasar (getBottom): a mensagem tem prioridade; o slot é o
             fallback quando não há mensagem. `mensagemDeErro` já resolve a
             precedência entre a prop errorMessage e a mensagem da regra. -->
        <template v-if="mensagemDeErro">{{ mensagemDeErro }}</template>
        <slot v-else name="error" />
      </div>
      <div
        v-else-if="hint"
        :id="hintId"
        class="dss-input__hint"
      >
        <slot name="hint">{{ hint }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssInput - Design System Sansys Input Component
 * ==========================================================================
 *
 * Componente de input do Design System Sansys (DSS)
 * TypeScript + Composition API. Subset controlado da API do Quasar q-input.
 *
 * @see https://quasar.dev/vue-components/input
 *
 * @example
 * ```vue
 * <DssInput
 *   v-model="email"
 *   type="email"
 *   label="Email"
 *   hint="Enter your email address"
 *   clearable
 * />
 * ```
 *
 * @version 2.3.0
 * @author Hebert Daniel Oliveira Chaves
 */

import { ref, computed, useSlots } from 'vue'
import type { InputProps, InputEmits, InputExpose } from '../types/input.types'
import { useInputClasses, useInputState, useInputActions } from '../composables'
import { useInputModality } from '../../../../composables/useInputModality'
import { useFieldValidation } from '../../../../composables/useFieldValidation'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssInput',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<InputProps>(), {
  // Model
  modelValue: '',

  // Visual
  variant: 'outlined',
  type: 'text',
  dense: false,
  brand: null,

  // Content
  label: '',
  stackLabel: false,
  placeholder: '',
  hint: '',
  errorMessage: '',

  // State
  error: false,
  disabled: false,
  readonly: false,
  loading: false,
  required: false,

  // Features
  clearable: false,

  // Accessibility
  ariaLabel: undefined,
  clearAriaLabel: 'Clear input',
  tabindex: null
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<InputEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

const slots = useSlots()

// ==========================================================================
// REFS
// ==========================================================================

const inputRef = ref<HTMLInputElement | null>(null)

// ==========================================================================
// UNIQUE IDS (Accessibility)
// ==========================================================================

const uniqueId = Math.random().toString(36).substring(2, 9)
const inputId = computed(() => `dss-input-${uniqueId}`)
const labelId = computed(() => `dss-input-label-${uniqueId}`)
const hintId = computed(() => `dss-input-hint-${uniqueId}`)
const errorId = computed(() => `dss-input-error-${uniqueId}`)

// ==========================================================================
// COMPOSABLES
// ==========================================================================

// Registro no motor de validação do QForm. Precisa vir ANTES do useInputState:
// o rodapé (hint/erro) consulta este estado para decidir se abre a área de erro.
const { temErro, mensagemDeErro, validar, resetarValidacao, aoPerderFoco } = useFieldValidation({
  rules: () => props.rules,
  modelValue: () => props.modelValue,
  // Paridade QField: campo inerte não valida. `loading` entra junto porque o
  // input já fica não-focável nesse estado (ver computedTabindex).
  disabled: () => props.disabled === true || props.readonly === true || props.loading === true,
  error: () => props.error,
  errorMessage: () => props.errorMessage,
  lazyRules: () => props.lazyRules,
})

const { isFocused, hasValue, hasBottomSlot } = useInputState(props, slots, {
  temErro,
  mensagemDeErro,
})
const { wrapperClasses, labelClasses, inputClasses } = useInputClasses(props, { isFocused, hasValue })

// Anel de foco só no teclado: `:focus-visible` não separa mouse de teclado em
// campo de TEXTO (é da especificação). O composable marca a modalidade no
// `<html>` e o CSS condiciona o anel a ela. Global e idempotente — chamar aqui,
// e não no entry point, mantém o listener preso a quem precisa dele.
useInputModality()

const { handleInput, handleFocus, handleBlur, handleClear, focus, blur } = useInputActions(
  emit,
  inputRef,
  isFocused
)

/**
 * Blur do input: o comportamento original mais o gatilho da validação.
 *
 * É aqui que mora o modo `lazyRules: true` — a regra só roda quando o campo
 * perde o foco, para o usuário não ver "obrigatório" enquanto ainda digita.
 */
function onBlur(event: FocusEvent) {
  handleBlur(event)
  aoPerderFoco()
}

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Placeholder computado
 *
 * Padrão B da família: o placeholder aparece já em repouso — a label flutua junto
 * (ver labelClasses --float quando há placeholder), então não há sobreposição.
 * Mantido como computed para preservar o ponto de extensão do binding.
 */
const computedPlaceholder = computed(() => props.placeholder)

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

/**
 * IDs para aria-describedby
 *
 * Conecta o input com hint ou error message para screen readers
 */
const ariaDescribedBy = computed(() => {
  const ids: string[] = []

  if (temErro.value && mensagemDeErro.value) {
    ids.push(errorId.value)
  } else if (props.hint) {
    ids.push(hintId.value)
  }

  return ids.length > 0 ? ids.join(' ') : undefined
})

// ==========================================================================
// EXPOSE
// ==========================================================================

defineExpose<InputExpose>({
  focus,
  blur,
  inputRef,
  // O QForm chama estes métodos pelo proxy da instância (via useFormChild);
  // expor aqui é para o CONSUMIDOR que guarda um ref do campo.
  validate: validar,
  resetValidation: resetarValidacao
})
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
