<template>
  <q-popup-proxy
    ref="proxyRef"
    :class="popupProxyClasses"
    :model-value="props.open"
    :breakpoint="props.breakpoint"
    :target="props.target"
    :no-parent-event="props.noParentEvent"
    :context-menu="props.contextMenu"
    :persistent="props.persistent"
    :no-focus="props.noFocus"
    :no-refocus="props.noRefocus"
    :auto-close="props.autoClose"
    :anchor="props.anchor"
    :self="props.self"
    :offset="props.offset"
    :fit="props.fit"
    :cover="props.cover"
    :max-height="props.maxHeight"
    :max-width="props.maxWidth"
    :transition-show="props.transitionShow"
    :transition-hide="props.transitionHide"
    :scroll-target="props.scrollTarget"
    v-bind="$attrs"
    @update:model-value="emit('update:open', $event)"
    @before-show="emit('beforeShow', $event)"
    @show="emit('show', $event)"
    @before-hide="emit('beforeHide', $event)"
    @hide="emit('hide', $event)"
  >
    <slot />
  </q-popup-proxy>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssPopupProxy — Layer 1: Structure
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QPopupProxy do Quasar.
 * Classificação: Overlay Responsivo (Nível 2 — Composição de Primeiro Grau).
 *
 * Golden Reference: DssChip
 * Golden Context: DssMenu
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs repassado explicitamente ao QPopupProxy via v-bind="$attrs".
 *   → QPopupProxy é o elemento raiz; classes DSS aplicadas via :class="popupProxyClasses".
 *   → Evita que atributos HTML extras (aria-*, data-*) sejam aplicados em
 *     um wrapper externo inexistente.
 *
 * Modo Duplo (QMenu / QDialog)
 *   → QPopupProxy decide internamente: QMenu (viewport >= breakpoint) ou
 *     QDialog (viewport < breakpoint, default 450px).
 *   → Em modo QMenu: .dss-popup-proxy aplica-se ao elemento .q-menu teleportado.
 *   → Em modo QDialog: .dss-popup-proxy aplica-se ao elemento .q-dialog.
 *   → Estilos para modo dialog usam seletor descendente em _states.scss (EXC-Gate-01).
 *
 * Teleport para body
 *   → Tanto QMenu quanto QDialog teleportam seu conteúdo para <body>.
 *   → Estilos DSS são carregados GLOBALMENTE via components/index.scss.
 *   → Estilo <style scoped> seria ineficaz — NÃO usar.
 *
 * Props bloqueadas (não repassadas)
 *   → `dark`: Modo escuro governado globalmente via [data-theme="dark"].
 *   → `square`: Cantos quadrados violam o token --dss-radius-md.
 *
 * v-model:open (open / update:open)
 *   → DSS renomeia `model-value` para `open` para semântica mais clara.
 *   → QPopupProxy usa model-value internamente → mapeado via @update:model-value.
 *
 * defineExpose (EXC-Expose-01)
 *   → show, hide, toggle, currentComponent delegados ao ref interno do QPopupProxy.
 *   → Padrão: DssInfiniteScroll, DssScrollArea, DssAjaxBar.
 *
 * Touch target
 *   → Não aplicável — DssPopupProxy é container overlay, não controle interativo.
 *   → Interatividade pertence aos filhos (DssItem, DssButton).
 *
 * Brand
 *   → Delegado aos filhos via slot (DssList, DssItem, DssCard).
 *   → DssPopupProxy não aplica brand diretamente.
 *
 * z-index e position
 *   → Gerenciados pelo Quasar (QMenu/QDialog) — DssPopupProxy NÃO os altera.
 *
 * @see DssMenu (Golden Context — overlay QMenu)
 * @see DssChip (Golden Reference — componente interativo)
 * @version 1.0.0
 */

import { ref } from 'vue'
import type { PopupProxyProps, PopupProxyEmits, PopupProxySlots } from '../types/popupproxy.types'
import { usePopupProxyClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssPopupProxy',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<PopupProxyProps>(), {
  breakpoint: 450
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<PopupProxyEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<PopupProxySlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { popupProxyClasses } = usePopupProxyClasses(props)

// ==========================================================================
// INTERNAL REF
// ==========================================================================

const proxyRef = ref()

// ==========================================================================
// EXPOSE (EXC-Expose-01)
// Delegação imperativa ao QPopupProxy interno.
// Padrão: DssInfiniteScroll, DssScrollArea, DssAjaxBar.
// ==========================================================================

defineExpose({
  /** Abre o popup programaticamente */
  show: (evt?: Event) => proxyRef.value?.show(evt),
  /** Fecha o popup programaticamente */
  hide: (evt?: Event) => proxyRef.value?.hide(evt),
  /** Alterna a visibilidade do popup programaticamente */
  toggle: (evt?: Event) => proxyRef.value?.toggle(evt),
  /** Referência ao componente atual renderizado (QMenu ou QDialog) */
  get currentComponent() {
    return proxyRef.value?.currentComponent
  }
})
</script>

<!-- Estilos carregados globalmente via components/index.scss -->
<!-- Estilo scoped seria ineficaz para conteúdo teleportado ao body -->
