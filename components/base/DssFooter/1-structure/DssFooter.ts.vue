<script setup lang="ts">
/**
 * ==========================================================================
 * DssFooter — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QFooter. Container estrutural inferior de página.
 *
 * Responsabilidades:
 * - Encapsula <q-footer> expondo apenas props semanticamente relevantes
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
 * - reveal: oculta/exibe o footer ao rolar a página (comportamento nativo QFooter)
 *
 * Gate de Responsabilidade v2.4:
 * - DssFooter é container estrutural puro — sem hover, focus, active próprios
 * - Interatividade é responsabilidade exclusiva dos componentes filhos (DssToolbar)
 * - Brand/cor são responsabilidade do DssToolbar interno, não do DssFooter
 *
 * @version 1.0.0
 */
import type { FooterProps, FooterSlots } from '../types/footer.types'
import { useFooterClasses } from '../composables'

defineOptions({ name: 'DssFooter', inheritAttrs: false })

const props = withDefaults(defineProps<FooterProps>(), {
  elevated: false,
  bordered: false
})

defineSlots<FooterSlots>()

const { footerClasses } = useFooterClasses(props)
</script>

<template>
  <q-footer
    :class="footerClasses"
    v-bind="$attrs"
  >
    <slot />
  </q-footer>
</template>

<style lang="scss" scoped>
@import '../DssFooter.module.scss';
</style>
