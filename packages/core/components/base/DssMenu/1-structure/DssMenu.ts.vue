<template>
  <q-menu
    :class="menuClasses"
    :model-value="aberto"
    :fit="props.fit"
    :cover="props.cover"
    :anchor="props.anchor"
    :self="props.self"
    :offset="props.offset"
    :no-parent-event="props.noParentEvent"
    v-bind="$attrs"
    @update:model-value="onToggle"
    @show="emit('show', $event)"
    @hide="emit('hide', $event)"
  >
    <slot />
  </q-menu>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssMenu — Layer 1: Structure
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QMenu do Quasar.
 * Classificação: Overlay de Navegação (Nível 2 — Composição de Primeiro Grau).
 *
 * Golden Reference: DssTooltip
 * Golden Context: DssList
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs repassado explicitamente ao QMenu via v-bind="$attrs".
 *   → QMenu é o elemento raiz; classes DSS aplicadas via :class="menuClasses".
 *   → Evita que atributos HTML extras (aria-*, data-*) sejam aplicados
 *     em um wrapper externo inexistente.
 *
 * Teleport para body
 *   → QMenu teleporta seu conteúdo para <body> automaticamente.
 *   → Estilos DSS são carregados GLOBALMENTE via components/index.scss.
 *   → Estilo <style scoped> seria ineficaz — NÃO usar.
 *   → O seletor .dss-menu escopa os estilos no elemento teleportado.
 *
 * Props bloqueadas (não repassadas)
 *   → `dark`: Modo escuro governado globalmente via [data-theme="dark"].
 *   → `square`: Cantos quadrados violam o token --dss-radius-md.
 *
 * v-model (modelValue / update:modelValue)
 *   → DssMenu suporta v-model para controle externo de visibilidade.
 *   → Propaga eventos show/hide do QMenu ao consumidor.
 *
 * z-index e position
 *   → DssMenu NÃO altera z-index nem position do QMenu.
 *   → Posicionamento gerenciado pelo Quasar (QMenu + QLayout).
 *
 * Touch target
 *   → Opção B — não implementado. DssMenu é container overlay não-interativo.
 *   → Interatividade pertence aos filhos (DssItem, DssButton).
 *
 * @see DssTooltip (Golden Reference — overlay não-interativo)
 * @see DssList (Golden Context — container de itens)
 * @version 1.0.0
 */

import { ref, watch } from 'vue'
import type { MenuProps, MenuEmits, MenuSlots } from '../types/menu.types'
import { useMenuClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssMenu',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<MenuProps>(), {
  /**
   * `undefined`, não `false`, e a diferença é funcional.
   *
   * ACHADO DA ADEQUAÇÃO (set/2026): com o default `false`, o wrapper passava
   * `:model-value="false"` SEMPRE, pondo o QMenu em modo controlado permanente.
   * O idioma do Quasar — <q-menu> dentro de um botão abre no clique — deixava de
   * funcionar: medido no Playground, o menu não abria nem com `v-model` ligado,
   * porque faltava alguém alternar o modelo no clique.
   *
   * Com `undefined` + estado interno espelhado (abaixo), o componente funciona
   * NÃO CONTROLADO (o QMenu governa e o consumidor só escuta) e CONTROLADO
   * (o consumidor dirige) — sem o consumidor escolher nada.
   */
  modelValue: undefined,
  fit: false,
  cover: false,
  anchor: undefined,
  self: undefined,
  offset: undefined
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<MenuEmits>()

/**
 * Espelho local do estado. Existe para o v-model ser OPCIONAL:
 *  - sem binding → o QMenu governa, e isto apenas acompanha
 *  - com binding → o watcher abaixo traz o valor do consumidor
 * Emitir continua acontecendo nos dois casos, para quem quiser só escutar.
 */
const aberto = ref(props.modelValue ?? false)

watch(() => props.modelValue, (v) => {
  if (v !== undefined) aberto.value = v
})

function onToggle(v: boolean) {
  aberto.value = v
  emit('update:modelValue', v)
}

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<MenuSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { menuClasses } = useMenuClasses(props)
</script>

<!-- Estilos carregados globalmente via components/index.scss -->
<!-- Estilo scoped seria ineficaz para conteúdo teleportado para o body -->
