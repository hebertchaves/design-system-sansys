<template>
  <q-dialog
    :model-value="props.open"
    position="bottom"
    full-width
    :persistent="props.persistent"
    :maximized="props.maximized"
    :no-esc-dismiss="props.noEscDismiss"
    :no-backdrop-dismiss="props.noBackdropDismiss"
    :transition-show="props.transitionEnter ?? 'slide-up'"
    :transition-hide="props.transitionLeave ?? 'slide-down'"
    v-bind="$attrs"
    @update:model-value="emit('update:open', $event)"
    @show="emit('open')"
    @hide="emit('close')"
    @before-show="emit('before-open')"
    @before-hide="emit('before-close')"
  >
    <div :class="sheetClasses">
      <!-- Handle visual de arrasto — slot customizável ou padrão -->
      <div class="dss-bottom-sheet__handle-area" aria-hidden="true">
        <slot name="handle">
          <div v-if="props.showHandle" class="dss-bottom-sheet__handle" />
        </slot>
      </div>

      <!-- Slot Header: título, botão fechar — responsabilidade do consumidor -->
      <div v-if="hasHeader" class="dss-bottom-sheet__header">
        <slot name="header" />
      </div>

      <!-- Slot Default: conteúdo principal -->
      <div class="dss-bottom-sheet__body">
        <slot />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssBottomSheet — Layer 1: Structure
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QDialog do Quasar com position="bottom".
 * Classificação: Overlay Bottom Sheet (Fase 2 — Nível 2, Família Navegação).
 *
 * Golden Reference: DssChip (componente interativo)
 * Golden Context: DssDialog (overlay modal com header/body via slots)
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs repassado explicitamente ao QDialog via v-bind="$attrs".
 *   → QDialog é o componente raiz; atributos HTML extras são gerenciados
 *     pelo Quasar internamente.
 *
 * Motor QDialog com position="bottom"
 *   → QBottomSheet do Quasar é um plugin ($q.bottomSheet({})), não componente.
 *   → Internamente, o plugin usa QDialog com position="bottom" + fullWidth.
 *   → DssBottomSheet reproduz este comportamento diretamente via QDialog.
 *   → EXC-Gate-01: uso de QDialog como motor (infraestrutura insubstituível).
 *
 * Teleport para body
 *   → QDialog teleporta conteúdo para <body> automaticamente.
 *   → Estilos DSS carregados GLOBALMENTE via components/index.scss.
 *   → Estilo <style scoped> seria ineficaz — NÃO usar.
 *   → O seletor .dss-bottom-sheet escopa os estilos no elemento teleportado.
 *
 * full-width fixo
 *   → Bottom sheets são sempre largura total (padrão UX universal).
 *   → Prop não exposta — não faz sentido ter bottom sheet sem full-width.
 *
 * Handle visual
 *   → Exibido quando showHandle: true.
 *   → Slot "handle" permite customização total — substitui o handle padrão.
 *   → aria-hidden="true" na área do handle — decorativo.
 *
 * Slots estruturais
 *   → #handle: slot opcional para handle customizado.
 *   → #header: slot opcional — renderizado apenas quando preenchido.
 *   → #default: slot obrigatório — conteúdo principal do sheet.
 *   → Composição é responsabilidade do consumidor (DssToolbar, DssButton, etc.).
 *
 * Props bloqueadas (não repassadas)
 *   → `position`: fixo em "bottom" — invariante arquitetural do bottom sheet.
 *   → `fullWidth`: fixo em true — bottom sheets são sempre full-width.
 *   → `dark`: modo escuro governado globalmente via [data-theme="dark"].
 *   → `square` do QDialog: gerenciado via CSS por DssBottomSheet (--square).
 *
 * Touch target
 *   → N/A — DssBottomSheet é overlay de container, não controle interativo.
 *   → Interatividade pertence aos filhos (DssButton, DssList, etc.).
 *
 * @see DssChip (Golden Reference — componente interativo)
 * @see DssDialog (Golden Context — overlay modal com padrão idêntico)
 * @version 1.0.0
 */

import { computed, useSlots } from 'vue'
import type { DssBottomSheetProps, DssBottomSheetEmits, DssBottomSheetSlots } from '../types/bottomsheet.types'
import { useBottomSheetClasses } from '../composables/useBottomSheetClasses'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssBottomSheet',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<DssBottomSheetProps>(), {
  transitionEnter: 'slide-up',
  transitionLeave: 'slide-down',
  showHandle: true
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<DssBottomSheetEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<DssBottomSheetSlots>()

const slots = useSlots()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { sheetClasses } = useBottomSheetClasses(props)

// ==========================================================================
// COMPUTED
// ==========================================================================

const hasHeader = computed(() => !!slots.header)
</script>

<!-- Estilos carregados globalmente via components/index.scss -->
<!-- Estilo scoped seria ineficaz para conteúdo teleportado para o body -->
