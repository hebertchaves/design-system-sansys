<template>
  <q-popup-edit
    :model-value="props.modelValue"
    :title="props.title"
    :buttons="props.buttons"
    :label-set="props.labelSet"
    :label-cancel="props.labelCancel"
    :persistent="props.persistent"
    :fit="props.fit"
    :cover="props.cover"
    :anchor="props.anchor"
    :self="props.self"
    :offset="props.offset"
    :max-height="props.maxHeight"
    :max-width="props.maxWidth"
    :auto-save="props.autoSave"
    :validate="props.validate"
    :touch-position="props.touchPosition"
    :disable="props.disable"
    :data-brand="effectiveBrand"
    v-bind="$attrs"
    @update:model-value="emit('update:modelValue', $event)"
    @save="(val, initVal) => emit('save', val, initVal)"
    @cancel="emit('cancel')"
    @show="emit('show')"
    @hide="emit('hide')"
    @before-show="emit('before-show')"
    @before-hide="emit('before-hide')"
    ref="popupEditRef"
  >
    <slot />
  </q-popup-edit>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssPopupEdit — Layer 1: Structure
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QPopupEdit do Quasar.
 * Classificação: Overlay de Edição Inline (Fase 2 — Nível 1, Família Overlays e Dialogs).
 *
 * Golden Reference: DssChip (componente interativo)
 * Golden Context: DssMenu (overlay teleportado via mecanismo QMenu interno)
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs repassado explicitamente ao QPopupEdit via v-bind="$attrs".
 *   → QPopupEdit é o componente raiz e deve receber atributos adicionais.
 *
 * Teleport via QMenu interno
 *   → QPopupEdit usa QMenu internamente para posicionamento e teleport.
 *   → O popup é teleportado para <body> automaticamente.
 *   → QPopupEdit NÃO expõe `popup-content-class` para injetar classes DSS.
 *   → Estilos DSS são carregados GLOBALMENTE via components/index.scss,
 *     direcionados ao seletor `.q-popup-edit` (EXC-Gate-01 e EXC-Gate-02).
 *   → Estilo <style scoped> seria ineficaz — NÃO usar.
 *
 * v-model (modelValue)
 *   → O v-model do DssPopupEdit controla o VALOR em edição, NÃO a visibilidade.
 *   → A visibilidade do popup é gerenciada internamente pelo QPopupEdit
 *     mediante clique no elemento pai hospedeiro.
 *   → Esta é a diferença fundamental em relação ao DssDialog (v-model:open = visibilidade).
 *
 * buttons: true (padrão DSS)
 *   → DSS força exibição dos botões de confirmação/cancelamento por padrão.
 *   → Quasar padrão é buttons: false (fecha ao clicar em qualquer lugar).
 *   → O padrão DSS (buttons: true) garante ação explícita do usuário.
 *
 * Slot #default
 *   → Conteúdo do formulário de edição (DssInput, DssSelect, DssCheckbox, etc.).
 *   → Composição é responsabilidade do consumidor.
 *
 * Props bloqueadas (não repassadas):
 *   → `dark`: Modo escuro governado globalmente via [data-theme="dark"].
 *
 * Métodos expostos via defineExpose
 *   → `set()`: Confirma a edição programaticamente.
 *   → `cancel()`: Cancela a edição programaticamente.
 *
 * Touch target
 *   → N/A — DssPopupEdit renderiza nada no DOM no estado fechado (Opção B).
 *   → O elemento pai hospedeiro (td, div, li) é o alvo de toque.
 *   → Interatividade interna pertence ao conteúdo do slot (DssInput, DssButton).
 *
 * @see DssChip (Golden Reference — componente interativo)
 * @see DssMenu (Golden Context — overlay teleportado)
 * @version 1.0.0
 */

import { ref } from 'vue'
import { useTeleportedBrand } from '../../../../composables/useTeleportedBrand'
import type { DssPopupEditProps, DssPopupEditEmits, DssPopupEditSlots, DssPopupEditExpose } from '../types/popupedit.types'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssPopupEdit',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<DssPopupEditProps>(), {
  buttons: true,
  labelSet: 'Salvar',
  labelCancel: 'Cancelar'
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<DssPopupEditEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<DssPopupEditSlots>()

// ==========================================================================
// REFS
// ==========================================================================

const popupEditRef = ref<{ set: () => void; cancel: () => void } | null>(null)

// Brand para conteúdo teleportado (Onda P0/T4 — ver composable)
const { effectiveBrand } = useTeleportedBrand()

// ==========================================================================
// EXPOSE
// ==========================================================================

defineExpose<DssPopupEditExpose>({
  set: () => popupEditRef.value?.set(),
  cancel: () => popupEditRef.value?.cancel()
})
</script>

<!-- Estilos carregados globalmente via components/index.scss -->
<!-- QPopupEdit não expõe popup-content-class — CSS global é a única estratégia (EXC-Gate-02) -->
<!-- Estilo scoped seria ineficaz para conteúdo teleportado via QMenu interno -->
