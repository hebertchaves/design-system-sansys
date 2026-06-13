<template>
  <q-dialog
    :model-value="props.open"
    :persistent="props.persistent"
    :seamless="props.seamless"
    :maximized="props.maximized"
    :full-width="props.fullWidth"
    :full-height="props.fullHeight"
    :position="props.position ?? 'standard'"
    :transition-show="props.transitionEnter ?? 'scale'"
    :transition-hide="props.transitionLeave ?? 'scale'"
    :no-esc-dismiss="props.disableEsc"
    :no-backdrop-dismiss="props.disableBackdropClick"
    v-bind="$attrs"
    @update:model-value="emit('update:open', $event)"
    @show="emit('open')"
    @hide="emit('close')"
    @before-show="emit('before-open')"
    @before-hide="emit('before-close')"
  >
    <div :class="dialogClasses" :data-brand="effectiveBrand">
      <!-- Slot Header: título, botão fechar — responsabilidade do consumidor -->
      <div v-if="hasHeader" class="dss-dialog__header">
        <slot name="header" />
      </div>

      <!-- Slot Default: conteúdo principal -->
      <div class="dss-dialog__body">
        <slot />
      </div>

      <!-- Slot Footer: botões de ação — responsabilidade do consumidor -->
      <div v-if="hasFooter" class="dss-dialog__footer">
        <slot name="footer" />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssDialog — Layer 1: Structure
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QDialog do Quasar.
 * Classificação: Overlay Modal (Fase 2 — Nível 1, Família Overlays e Dialogs).
 *
 * Golden Reference: DssChip (componente interativo)
 * Golden Context: DssCard (estrutura de superfície com header/body/footer)
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs repassado explicitamente ao QDialog via v-bind="$attrs".
 *   → QDialog é o componente raiz; atributos HTML extras são gerenciados
 *     pelo Quasar internamente.
 *
 * Teleport para body
 *   → QDialog teleporta seu conteúdo para <body> automaticamente.
 *   → Estilos DSS são carregados GLOBALMENTE via components/index.scss.
 *   → Estilo <style scoped> seria ineficaz — NÃO usar.
 *   → O seletor .dss-dialog escopa os estilos no elemento teleportado.
 *
 * v-model:open
 *   → DssDialog usa "open" (não "modelValue") para clareza semântica DSS.
 *   → Mapeia para QDialog's v-model (Boolean).
 *   → Eventos @show/@hide do QDialog mapeados para @open/@close no DSS.
 *
 * Slots estruturais
 *   → #header: slot opcional — renderizado apenas quando preenchido.
 *   → #default: slot obrigatório — conteúdo principal do diálogo.
 *   → #footer: slot opcional — renderizado apenas quando preenchido.
 *   → Composição é responsabilidade do consumidor (DssCard, DssButton, etc.).
 *
 * Props bloqueadas (não repassadas)
 *   → `dark`: Modo escuro governado globalmente via [data-theme="dark"].
 *   → `square`: Cantos quadrados violam o token --dss-radius-lg.
 *
 * Touch target
 *   → N/A — DssDialog é overlay de container, não controle interativo.
 *   → Interatividade pertence aos filhos (DssButton no header/footer).
 *
 * @see DssChip (Golden Reference — componente interativo)
 * @see DssCard (Golden Context — estrutura header/body/footer)
 * @version 1.0.0
 */

import { computed, useSlots } from 'vue'
import type { DssDialogProps, DssDialogEmits, DssDialogSlots } from '../types/dialog.types'
import { useDialogClasses } from '../composables/useDialogClasses'
import { useTeleportedBrand } from '../../../../composables/useTeleportedBrand'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssDialog',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<DssDialogProps>(), {
  position: 'standard',
  transitionEnter: 'scale',
  transitionLeave: 'scale'
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<DssDialogEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<DssDialogSlots>()

const slots = useSlots()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { dialogClasses } = useDialogClasses(props)

// Brand para conteúdo teleportado (Onda P0/T4 — ver composable)
const { effectiveBrand } = useTeleportedBrand()

// ==========================================================================
// COMPUTED
// ==========================================================================

const hasHeader = computed(() => !!slots.header)
const hasFooter = computed(() => !!slots.footer)
</script>

<!-- Estilos carregados globalmente via components/index.scss -->
<!-- Estilo scoped seria ineficaz para conteúdo teleportado para o body -->
