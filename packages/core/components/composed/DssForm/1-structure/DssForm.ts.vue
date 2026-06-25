<template>
  <q-form
    ref="qFormRef"
    :class="formClasses"
    :autofocus="props.autofocus"
    :greedy="props.greedy"
    :no-error-focus="props.noErrorFocus"
    v-bind="$attrs"
    @submit="emit('submit', $event as SubmitEvent)"
    @reset="emit('reset', $event as unknown as Event)"
    @validation-error="(el: any, tabIndex?: number, index?: number) => emit('validationError', el as Element, tabIndex as number, index as number)"
    @validation-success="emit('validationSuccess')"
  >
    <slot />
  </q-form>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssForm — Layer 1: Structure
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QForm do Quasar.
 * Classificação: Container de Formulário (Fase 2 — Nível 2, Composed).
 *
 * Golden Reference: DssChip (componente interativo do DSS)
 * Golden Context: DssDialog (mesma família — QMotor + EXC-Gate-01 +
 *   EXC-Expose-01 + inheritAttrs: false + CSS global)
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs repassado explicitamente ao QForm via v-bind="$attrs".
 *   → QForm é o componente raiz; atributos HTML extras (id, aria-label, etc.)
 *     são gerenciados pelo QForm e repassados ao <form> nativo.
 *
 * QForm como root (EXC-Gate-01)
 *   → QForm renderiza como elemento <form> nativo sem wrapper adicional.
 *   → Inserir um wrapper DSS externo quebraria a semântica de <form> HTML.
 *   → A classe dss-form é aplicada via :class no <q-form>.
 *
 * defineExpose (EXC-Expose-01)
 *   → DssForm expõe `validate`, `resetValidation`, `submit` e `reset`
 *     como API imperativa para consumidores que precisam controlar o
 *     formulário programaticamente (e.g., submit via botão externo).
 *   → Métodos delegados ao qFormRef interno (QForm instance).
 *
 * CSS global (não scoped)
 *   → QForm pode ser aninhado em overlays ou teleportados.
 *   → Seguindo Golden Context DssDialog: estilos carregados globalmente
 *     via components/index.scss com seletor .q-form.dss-form.
 *
 * Props bloqueadas (não repassadas ao QForm)
 *   → `dark`: Modo escuro governado globalmente via [data-theme="dark"].
 *
 * Touch target
 *   → N/A — DssForm é container estrutural, não controle interativo.
 *   → Touch targets pertencem aos filhos (DssButton, DssInput, etc.).
 *
 * @see DssChip (Golden Reference — padrão interativo global)
 * @see DssDialog (Golden Context — QMotor + EXC-Gate-01 + EXC-Expose-01)
 * @version 1.0.0
 */

import { ref } from 'vue'
import type { DssFormProps, DssFormEmits, DssFormSlots, QFormInstance } from '../types/form.types'
import { useFormClasses } from '../composables/useFormClasses'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssForm',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = defineProps<DssFormProps>()

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<DssFormEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<DssFormSlots>()

// ==========================================================================
// REFS
// ==========================================================================

const qFormRef = ref<QFormInstance | null>(null)

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { formClasses } = useFormClasses(props)

// ==========================================================================
// EXPOSE — EXC-Expose-01
// ==========================================================================
// Delegação imperativa ao motor QForm interno.
// Padrão: DssDialog, DssInfiniteScroll, DssScrollArea.

defineExpose({
  validate: (shouldFocus?: boolean) => qFormRef.value?.validate(shouldFocus),
  resetValidation: () => qFormRef.value?.resetValidation(),
  submit: (event?: Event) => qFormRef.value?.submit(event),
  reset: () => qFormRef.value?.reset()
})
</script>

<!-- Estilos carregados globalmente via components/index.scss -->
<!-- Seguindo padrão Golden Context DssDialog — CSS global para formulários aninhados -->
