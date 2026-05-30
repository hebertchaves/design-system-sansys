<script setup lang="ts">
/**
 * ==========================================================================
 * DssToolbar — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QToolbar. Barra de ferramentas horizontal.
 *
 * Responsabilidades:
 * - Encapsula <q-toolbar> expondo apenas props semanticamente relevantes
 * - Bloqueia props de cor e modo visual (dark, glossy, color, text-color)
 * - Fornece layout horizontal flexbox para elementos filhos
 * - Aplica brand como fundo e propaga [data-brand] para herança dos filhos
 * - Container 100% não-interativo — estados de interação são dos filhos
 *
 * Props bloqueadas:
 * - dark: modo escuro governado globalmente via [data-theme="dark"]
 * - glossy: efeito visual não utilizado no DSS
 * - color / text-color: governados por tokens DSS + prop brand
 *
 * Gate de Responsabilidade v2.4:
 * - DssToolbar é container estrutural puro — sem hover, focus, active próprios
 * - Interatividade é responsabilidade exclusiva dos componentes filhos
 *
 * @version 1.0.0
 */
import { computed } from 'vue'
import type { ToolbarProps, ToolbarSlots } from '../types/toolbar.types'
import { useToolbarClasses } from '../composables/useToolbarClasses'

defineOptions({ name: 'DssToolbar', inheritAttrs: false })

const props = withDefaults(defineProps<ToolbarProps>(), {
  inset: false,
  brand: undefined
})

defineSlots<ToolbarSlots>()

const { toolbarClasses } = useToolbarClasses(props)

/**
 * Propaga [data-brand] no elemento raiz quando brand está definida.
 * Isso permite que componentes filhos (DssButton, DssIcon, etc.) herdem
 * automaticamente as cores da brand ativa via tokens CSS.
 */
const brandAttr = computed(() => props.brand ? { 'data-brand': props.brand } : {})
</script>

<template>
  <q-toolbar
    :class="toolbarClasses"
    v-bind="{ ...$attrs, ...brandAttr }"
  >
    <slot />
  </q-toolbar>
</template>
