<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import type { FieldProps } from '../types/field.types'
import { useFieldClasses } from '../composables/useFieldClasses'

defineOptions({ name: 'DssField', inheritAttrs: false })

const props = withDefaults(defineProps<FieldProps>(), {
  variant: 'outlined',
})

const slots = useSlots()

// ── Estado de foco ────────────────────────────────────────────────────────────
// Detectado via focusin/focusout que borbulham do controle interno.
const isFocused = ref(false)

function onFocusIn() {
  if (!props.disable) isFocused.value = true
}

function onFocusOut(e: FocusEvent) {
  const wrapper = e.currentTarget as HTMLElement
  if (!wrapper.contains(e.relatedTarget as Node)) {
    isFocused.value = false
  }
}

// ── IDs únicos para associação ARIA ──────────────────────────────────────────
const _uid = Math.random().toString(36).slice(2, 9)
const generatedFieldId = `dss-field-ctrl-${_uid}`
const hintId = `dss-field-hint-${_uid}`
const errorId = `dss-field-error-${_uid}`
const labelId = `dss-field-label-${_uid}`

/** ID exposto ao controle interno via slot scope e defineExpose */
const computedFieldId = computed(() => props.fieldId ?? generatedFieldId)

// ── Classes ───────────────────────────────────────────────────────────────────
const { rootClasses, labelClasses } = useFieldClasses(props, isFocused)

// ── Bottom area ───────────────────────────────────────────────────────────────
const hasBottomContent = computed(
  () =>
    (props.error && (props.errorMessage || slots.error)) ||
    (!props.error && (props.hint || slots.hint))
)

// ── aria-describedby dinâmico ─────────────────────────────────────────────────
// Exposto via slot scope e defineExpose para que o controle interno possa bindear
// :aria-describedby="ariaDescribedby" sem precisar conhecer os IDs internos.
const ariaDescribedby = computed<string | undefined>(() => {
  if (props.error && (props.errorMessage || slots.error)) return errorId
  if (!props.error && (props.hint || slots.hint)) return hintId
  return undefined
})

defineExpose({ fieldId: computedFieldId, hintId, errorId, ariaDescribedby })
</script>

<template>
  <div
    v-bind="$attrs"
    :class="rootClasses"
    :data-brand="brand || undefined"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <!-- Linha horizontal: before | campo | after. Sem este wrapper os slots
         externos EMPILHAM (a raiz é flex-column) — divergia de DssInput,
         onde before/after ficam ao lado. -->
    <div class="dss-field__row">
      <div v-if="$slots.before" class="dss-field__before">
        <slot name="before" />
      </div>

      <!-- Chrome do campo: borda, label, controle, prepend, append -->
      <div class="dss-field__field">
        <!-- Prepend: ícone ou botão antes do controle, dentro da borda -->
        <div v-if="$slots.prepend" class="dss-field__prepend" aria-hidden="true">
          <slot name="prepend" />
        </div>

        <!-- Prefix: texto antes do controle (ex: "R$") -->
        <span v-if="prefix" class="dss-field__prefix" aria-hidden="true">{{ prefix }}</span>

        <!-- Área de controle: label flutuante + slot do controle -->
        <div class="dss-field__control">
          <label
            v-if="label || $slots.label"
            :id="labelId"
            :for="computedFieldId"
            :class="labelClasses"
          >
            <slot name="label">{{ label }}</slot>
          </label>

          <!--
            Slot padrão: o controle real (input nativo, DssInput sem label,
            seletor customizado, etc.).
            `fieldId` é exposto para que o consumer possa associar ao label:
            <template #default="{ fieldId }">
              <input :id="fieldId" ... />
            </template>
          -->
          <slot :field-id="computedFieldId" :aria-describedby="ariaDescribedby" />
        </div>

        <!-- Suffix: texto após o controle (ex: ".com") -->
        <span v-if="suffix" class="dss-field__suffix" aria-hidden="true">{{ suffix }}</span>

        <!-- Append: ícone, botão ou spinner, após o controle, dentro da borda -->
        <div v-if="$slots.append || loading" class="dss-field__append">
          <slot name="append" />
          <span
            v-if="loading"
            class="dss-field__loading"
            role="status"
            aria-label="Carregando"
            aria-live="polite"
          >
            <span class="dss-field__spinner" aria-hidden="true" />
          </span>
        </div>
      </div>

      <!-- After slot: conteúdo fora da borda, após o campo -->
      <div v-if="$slots.after" class="dss-field__after">
        <slot name="after" />
      </div>

    </div><!-- /.dss-field__row -->

    <!-- Bottom: erro (preferência) ou dica -->

    <div v-if="hasBottomContent" class="dss-field__bottom">
      <div
        v-if="error && (errorMessage || $slots.error)"
        :id="errorId"
        class="dss-field__error"
        role="alert"
        aria-live="assertive"
      >
        <slot name="error">{{ errorMessage }}</slot>
      </div>
      <div
        v-else-if="!error && (hint || $slots.hint)"
        :id="hintId"
        class="dss-field__hint"
      >
        <slot name="hint">{{ hint }}</slot>
      </div>
    </div>
  </div>
</template>
