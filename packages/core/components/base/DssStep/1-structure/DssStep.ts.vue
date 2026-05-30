<script setup lang="ts">
/**
 * ==========================================================================
 * DssStep — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QStep. Passo individual de um stepper/wizard.
 *
 * Responsabilidades:
 * - Encapsula <q-step> expondo apenas props semanticamente relevantes
 * - Bloqueia props de cor (color, active-color, done-color, error-color)
 * - Bloqueia prop `prefix` — DSS usa números ou ícones no dot, não prefixos
 * - Fornece classes semânticas para o sistema DSS (done, error, disable)
 * - Delega estado ativo ao container QStepper/DssStepper pai via v-model
 * - Delega estados visuais de hover/focus/active ao SCSS (sem lógica Vue)
 *
 * Props bloqueadas:
 * - color / active-color / done-color / error-color: cores governadas por tokens DSS
 * - prefix: DSS governa numeração e ícones via CSS/Quasar nativo
 *
 * Gate de Responsabilidade v2.4:
 * - Área do cabeçalho (.q-stepper__tab): interativa somente quando headerNav=true
 * - Área de conteúdo (.q-stepper__step-content): sempre estática
 *
 * @version 1.0.0
 */
import type { StepProps, StepSlots } from '../types/step.types'
import { useStepClasses } from '../composables/useStepClasses'

defineOptions({ name: 'DssStep', inheritAttrs: false })

const props = withDefaults(defineProps<StepProps>(), {
  title: undefined,
  caption: undefined,
  icon: undefined,
  activeIcon: undefined,
  doneIcon: undefined,
  errorIcon: undefined,
  done: false,
  error: false,
  disable: false,
  headerNav: false
})

defineSlots<StepSlots>()

const { stepClasses } = useStepClasses(props)
</script>

<template>
  <q-step
    :class="stepClasses"
    :name="props.name"
    :title="props.title"
    :caption="props.caption"
    :icon="props.icon"
    :active-icon="props.activeIcon"
    :done-icon="props.doneIcon"
    :error-icon="props.errorIcon"
    :done="props.done"
    :error="props.error"
    :disable="props.disable"
    :header-nav="props.headerNav"
    v-bind="$attrs"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </q-step>
</template>
