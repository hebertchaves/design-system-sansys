<template>
  <q-popup-proxy
    ref="qProxyRef"
    :class="classes"
    :model-value="props.modelValue"
    :breakpoint="props.breakpoint"
    :target="props.target"
    :no-parent-event="props.noParentEvent"
    :context-menu="props.contextMenu"
    :anchor="props.anchor"
    :self="props.self"
    :offset="props.offset"
    :persistent="props.persistent"
    :no-focus="props.noFocus"
    :no-refocus="props.noRefocus"
    :auto-close="props.autoClose"
    :transition-show="props.transitionShow"
    :transition-hide="props.transitionHide"
    :max-height="props.maxHeight"
    :max-width="props.maxWidth"
    :scroll-target="props.scrollTarget"
    :fit="props.fit"
    :cover="props.cover"
    v-bind="$attrs"
    @update:model-value="emit('update:modelValue', $event)"
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
 * Classificação: Overlay Responsivo — Composed (Nível 2 — Proxy de Popup).
 *
 * Golden Reference: DssChip
 * Golden Context: DssMenu
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs repassado explicitamente ao QPopupProxy via v-bind="$attrs".
 *   → QPopupProxy é o root (EXC-Gate-01). Não há elemento DOM próprio do wrapper.
 *   → Props explicitamente declaradas são removidas de $attrs e vinculadas
 *     manualmente ao QPopupProxy para controle correto do forwarding.
 *
 * EXC-Gate-01: QPopupProxy como root
 *   → QPopupProxy renderiza internamente QMenu (viewport >= breakpoint) ou
 *     QDialog (viewport < breakpoint). Não é possível usar um wrapper DSS
 *     próprio sem perder a funcionalidade de switching responsivo.
 *   → A classe `dss-popup-proxy` é aplicada via `:class` no QPopupProxy e
 *     forwarded via attrs ao QMenu ou QDialog interno.
 *
 * EXC-Gate-02: Compound selectors CSS
 *   → CSS DSS usa `.q-menu.dss-popup-proxy` e `.q-dialog.dss-popup-proxy`
 *     para estilizar o painel renderizado pelo QPopupProxy internamente.
 *   → Estes seletores são necessários pois QMenu/QDialog são instâncias
 *     internas criadas pelo QPopupProxy (não DssMenu/DssDialog).
 *
 * Teleport para body
 *   → QPopupProxy (via QMenu ou QDialog) teleporta o conteúdo para <body>.
 *   → Estilos DSS são carregados globalmente via components/index.scss.
 *   → Estilo <style scoped> seria ineficaz — NÃO usar.
 *
 * Comportamento responsivo (breakpoint)
 *   → Abaixo de `breakpoint` (px): renderiza QDialog (fullscreen mobile)
 *   → Acima de `breakpoint` (px): renderiza QMenu (dropdown posicionado)
 *   → Por padrão: 450px (alinhado ao padrão Quasar)
 *
 * v-model (modelValue / update:modelValue)
 *   → DssPopupProxy suporta v-model para controle externo de visibilidade.
 *   → Propaga todos os eventos show/hide ao consumidor.
 *
 * defineExpose (show, hide, toggle, currentComponent) — EXC-Expose-01
 *   → Métodos imperativos implementados via ref interno `qProxyRef` ao QPopupProxy.
 *   → Em Vue 3 `<script setup>`, a instância é fechada sem defineExpose.
 *   → O ref interno captura a instância QPopupProxy e os métodos são delegados.
 *   → `currentComponent.type` retorna 'menu' ou 'dialog' — útil para adaptar
 *     comportamentos do consumidor à estratégia de renderização ativa.
 *   → Precedente: DssInfiniteScroll, DssScrollArea, DssAjaxBar (EXC-Expose-01).
 *
 * Props não expostas (bloqueadas)
 *   → `dark`: Modo escuro governado globalmente via [data-theme="dark"].
 *   → `square`: Cantos quadrados violam o token --dss-radius-md.
 *
 * Touch target
 *   → Não aplicável. DssPopupProxy é um container/proxy overlay.
 *   → Interatividade pertence aos filhos (DssItem, DssButton) via slot.
 *
 * @see DssChip (Golden Reference — componente interativo)
 * @see DssMenu (Golden Context — overlay de navegação mais próximo)
 * @version 1.0.0
 */

import { ref } from 'vue'
import type { DssPopupProxyProps, DssPopupProxyEmits, DssPopupProxySlots } from '../types/popupproxy.types'
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

const props = withDefaults(defineProps<DssPopupProxyProps>(), {
  breakpoint: 450
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<DssPopupProxyEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<DssPopupProxySlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { classes } = usePopupProxyClasses(props)

// ==========================================================================
// INTERNAL REF — EXC-Expose-01
// Captura a instância interna do QPopupProxy para delegação de métodos.
// ==========================================================================

interface QPopupProxyInstance {
  show: (evt?: Event) => void
  hide: (evt?: Event) => void
  toggle: (evt?: Event) => void
  currentComponent: { type: 'menu' | 'dialog'; ref: unknown }
}

const qProxyRef = ref<QPopupProxyInstance | null>(null)

// ==========================================================================
// EXPOSE — EXC-Expose-01
// Em <script setup>, a instância é fechada. defineExpose torna os métodos
// imperativos do QPopupProxy acessíveis ao consumidor via ref do DssPopupProxy.
// ==========================================================================

defineExpose({
  show: (evt?: Event) => qProxyRef.value?.show(evt),
  hide: (evt?: Event) => qProxyRef.value?.hide(evt),
  toggle: (evt?: Event) => qProxyRef.value?.toggle(evt),
  get currentComponent() { return qProxyRef.value?.currentComponent }
})
</script>

<!-- Estilos carregados globalmente via components/index.scss -->
<!-- Estilo scoped seria ineficaz para conteúdo teleportado pelo QPopupProxy -->
