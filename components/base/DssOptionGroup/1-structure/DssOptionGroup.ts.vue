<script lang="ts">
// ============================================================================
// CONTADOR A NÍVEL DE MÓDULO — garante `radioGroupName` único por instância.
// Este bloco é executado UMA VEZ ao carregar o módulo, não por instância.
// Padrão Vue 3 para estado compartilhado entre instâncias do mesmo componente.
// SSR-safe: módulo é isolado por request no servidor.
// ============================================================================
let _moduleGroupSeq = 0
</script>

<script setup lang="ts">
/**
 * DssOptionGroup — Implementação Canônica (Layer 1)
 * Design System Sansys v2.2 — Fase 2 — Componente Composto
 *
 * DECISÃO ARQUITETURAL CRÍTICA:
 * Este componente NÃO faz wrap de <q-option-group>.
 * Em vez disso, itera sobre `options` e renderiza explicitamente os
 * componentes DSS da Fase 1 (DssRadio, DssCheckbox, DssToggle) para
 * garantir 100% de fidelidade com a governança visual e de tokens já
 * implementada nesses componentes.
 *
 * Importações dos filhos via Entry Point Wrapper (nunca via 1-structure).
 */

import type { OptionGroupProps, OptionGroupEmits } from '../types/option-group.types'
import { useDssOptionGroupClasses } from '../composables'
import DssRadio from '../../DssRadio/DssRadio.vue'
import DssCheckbox from '../../DssCheckbox/DssCheckbox.vue'
import DssToggle from '../../DssToggle/DssToggle.vue'

defineOptions({
  name: 'DssOptionGroup',
  /**
   * inheritAttrs: false — Atributos extras (data-*, event listeners) são
   * repassados manualmente ao container via v-bind="$attrs".
   * Evita duplicação de atributos em elemento raiz e filhos.
   */
  inheritAttrs: false,
})

const props = withDefaults(defineProps<OptionGroupProps>(), {
  type: 'radio',
  inline: false,
  disable: false,
  readonly: false,
  dense: false,
  keepColor: false,
})

const emit = defineEmits<OptionGroupEmits>()

const { containerClasses, computedRole } = useDssOptionGroupClasses(props)

// ============================================================================
// NOME ÚNICO DO GRUPO DE RÁDIO
// Para garantir navegação por teclado (setas) em type="radio",
// todos os DssRadio do grupo devem compartilhar o mesmo atributo `name`.
// O contador _moduleGroupSeq vive no escopo de módulo (bloco <script> acima),
// garantindo valor diferente para cada nova instância criada na página.
// ============================================================================
const radioGroupName = `dss-option-group-${++_moduleGroupSeq}`

// ============================================================================
// LÓGICA DE ESTADO — CHECKBOX / TOGGLE (modelValue como array)
// ============================================================================

/**
 * Verifica se uma opção está marcada (para checkbox/toggle).
 * O modelValue deve ser um array. Valores são comparados por igualdade estrita.
 */
function isChecked(value: any): boolean {
  if (!Array.isArray(props.modelValue)) return false
  return props.modelValue.includes(value)
}

/**
 * Atualiza o array de seleção ao marcar/desmarcar uma opção (checkbox/toggle).
 * Emite o novo array com ou sem o valor dependendo do estado `checked`.
 */
function onMultiChange(value: any, checked: boolean): void {
  const current: any[] = Array.isArray(props.modelValue)
    ? [...props.modelValue]
    : []

  if (checked) {
    if (!current.includes(value)) current.push(value)
  } else {
    const idx = current.indexOf(value)
    if (idx > -1) current.splice(idx, 1)
  }

  emit('update:modelValue', current)
}
</script>

<template>
  <div
    :class="containerClasses"
    :role="computedRole"
    :aria-label="ariaLabel || undefined"
    :aria-labelledby="ariaLabelledby || undefined"
    :aria-disabled="disable || undefined"
    v-bind="$attrs"
  >
    <!-- ================================================================
         TYPE: RADIO
         Renderiza DssRadio para cada opção.
         modelValue: valor escalar do grupo (qual opção está selecionada)
         val: valor desta opção (emitido quando selecionada)
         name: grupo de rádio para navegação por teclado (setas)
         ================================================================ -->
    <template v-if="type === 'radio' || !type">
      <DssRadio
        v-for="option in options"
        :key="String(option.value)"
        :model-value="modelValue"
        :val="option.value"
        :label="option.label"
        :color="option.color ?? color"
        :keep-color="option.keepColor ?? keepColor"
        :disable="Boolean(disable || option.disable)"
        :readonly="readonly"
        :dense="dense"
        :name="radioGroupName"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </template>

    <!-- ================================================================
         TYPE: CHECKBOX
         Renderiza DssCheckbox para cada opção.
         modelValue: boolean (esta opção está marcada?)
         Calculado a partir do array modelValue do grupo.
         ================================================================ -->
    <template v-else-if="type === 'checkbox'">
      <DssCheckbox
        v-for="option in options"
        :key="String(option.value)"
        :model-value="isChecked(option.value)"
        :label="option.label"
        :color="option.color ?? color"
        :keep-color="option.keepColor ?? keepColor"
        :disable="Boolean(disable || option.disable)"
        :readonly="readonly"
        :dense="dense"
        @update:model-value="(checked: boolean) => onMultiChange(option.value, checked)"
      />
    </template>

    <!-- ================================================================
         TYPE: TOGGLE
         Renderiza DssToggle para cada opção.
         Mesmo padrão de estado que checkbox (array de valores).
         ================================================================ -->
    <template v-else-if="type === 'toggle'">
      <DssToggle
        v-for="option in options"
        :key="String(option.value)"
        :model-value="isChecked(option.value)"
        :label="option.label"
        :color="option.color ?? color"
        :keep-color="option.keepColor ?? keepColor"
        :disable="Boolean(disable || option.disable)"
        :readonly="readonly"
        :dense="dense"
        @update:model-value="(checked: boolean) => onMultiChange(option.value, checked)"
      />
    </template>
  </div>
</template>

<style lang="scss">
@use '../DssOptionGroup.module.scss';
</style>
