<template>
  <!--
    DssPageSticky — Container de posicionamento fixo governado pelo DSS.

    Padrão arquitetural (EXC-01):
    <q-page-sticky> é o elemento raiz — não pode ser envolvido em <div>.
    O QPageSticky usa `position: fixed` calculado em relação ao QLayout pai,
    aplicando offsets dinâmicos para não sobrepor header/footer (via
    CSS custom properties --q-header-offset e --q-footer-offset).
    Envolver em outro elemento quebraria esse cálculo de offset.
    Precedente canônico: DssPage, DssHeader, DssLayout, DssPageContainer.

    Gate de Responsabilidade v2.4:
    DssPageSticky é container estrutural de posicionamento 100% não-interativo.
    Não possui estados hover, focus ou active próprios.
    Interatividade é responsabilidade exclusiva do conteúdo no slot default.

    v-bind="$attrs" repassa atributos não declarados como props (ex.: aria-label,
    data-* attributes, classes adicionais). Posicionado no elemento raiz para
    preservar o forwarding correto de atributos HTML.
  -->
  <q-page-sticky
    :position="props.position"
    :offset="props.offset"
    :expand="props.expand"
    :class="stickyClasses"
    v-bind="$attrs"
  >
    <slot />
  </q-page-sticky>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssPageSticky — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QPageSticky. Permite fixar elementos na
 * viewport enquanto o usuário rola a página, com z-index e elevação
 * controlados por tokens DSS.
 *
 * Responsabilidades:
 * - Encapsula <q-page-sticky> preservando o cálculo de offsets do Quasar
 * - Garante z-index governado via --dss-z-index-sticky (1020)
 * - Expõe prop `elevated` DSS-exclusiva (box-shadow: --dss-elevation-2)
 * - Repassa props de posicionamento (position, offset, expand) ao Quasar
 * - Repassa todos os atributos HTML ao elemento raiz via v-bind="$attrs"
 *
 * NÃO responsabilidades:
 * - Cor de fundo: herdada do conteúdo no slot
 * - Interatividade: responsabilidade do conteúdo interno (DssButton, etc.)
 * - Layout interno: responsabilidade do desenvolvedor consumidor
 *
 * Props expostas:
 * - position: ancoragem na viewport (top-right, bottom-right, bottom, etc.)
 * - offset: deslocamento [x, y] em pixels
 * - expand: expande para toda a largura/altura da borda definida
 * - elevated: aplica --dss-elevation-2 (prop DSS exclusiva)
 *
 * EXC-01: Uso direto de <q-page-sticky> como raiz do template
 * - QPageSticky usa position: fixed relativo ao QLayout pai
 * - Depende de CSS custom properties --q-header-offset/--q-footer-offset
 * - Envolver em <div> quebraria os offsets dinâmicos do layout
 *
 * @version 1.0.0
 */

import type { PageStickyProps, PageStickySlots } from '../types/pagesticky.types'
import { usePageStickyClasses } from '../composables/usePageStickyClasses'

defineOptions({
  name: 'DssPageSticky',
  inheritAttrs: false
})

const props = withDefaults(defineProps<PageStickyProps>(), {
  position: 'bottom-right',
  offset: () => [18, 18],
  expand: false,
  elevated: false
})

defineSlots<PageStickySlots>()

const { stickyClasses } = usePageStickyClasses(props)
</script>

<style lang="scss" scoped>
@import '../DssPageSticky.module.scss';
</style>
