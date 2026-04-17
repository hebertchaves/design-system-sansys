<script setup lang="ts">
/**
 * ==========================================================================
 * DssHeader — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QHeader. Container estrutural superior de página.
 *
 * Responsabilidades:
 * - Encapsula <q-header> expondo apenas props semanticamente relevantes
 * - Bloqueia prop color (background governado por --dss-surface-default via CSS)
 * - Gerencia variantes de elevação (elevated) e borda (bordered)
 * - Container 100% não-interativo — estados de interação são dos filhos
 * - Slot default destinado exclusivamente a componentes DssToolbar
 *
 * Props bloqueadas:
 * - color: cor de fundo governada por token --dss-surface-default
 * - height-hint: calculado automaticamente pelo Quasar via conteúdo
 *
 * Props repassadas via $attrs (não declaradas como props DSS):
 * - reveal: oculta/exibe o header ao rolar a página (comportamento nativo QHeader)
 *
 * Gate de Responsabilidade v2.4:
 * - DssHeader é container estrutural puro — sem hover, focus, active próprios
 * - Interatividade é responsabilidade exclusiva dos componentes filhos (DssToolbar)
 * - Brand/cor são responsabilidade do DssToolbar interno, não do DssHeader
 *
 * @version 1.0.0
 */
import type { HeaderProps, HeaderSlots } from '../types/header.types'
import { useHeaderClasses } from '../composables'

defineOptions({ name: 'DssHeader', inheritAttrs: false })

const props = withDefaults(defineProps<HeaderProps>(), {
  elevated: false,
  bordered: false
})

defineSlots<HeaderSlots>()

const { headerClasses } = useHeaderClasses(props)
</script>

<template>
  <q-header
    :class="headerClasses"
    v-bind="$attrs"
  >
    <slot />
  </q-header>
</template>

<style lang="scss" scoped>
@import '../DssHeader.module.scss';
</style>
