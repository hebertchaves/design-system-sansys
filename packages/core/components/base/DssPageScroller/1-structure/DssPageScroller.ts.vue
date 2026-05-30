<template>
  <!--
    DssPageScroller — Container de visibilidade condicional baseado em scroll.

    Padrão arquitetural (EXC-01):
    <q-page-scroller> é o elemento raiz — não pode ser envolvido em <div>.
    O QPageScroller monitora o scroll do container pai (window/QScrollArea)
    para injetar e remover o slot via transição de visibilidade. Envolver
    em outro elemento quebra essa detecção de scroll e a animação de entrada.
    Precedente canônico: DssPageSticky (EXC-01).

    Gate de Responsabilidade v2.4:
    DssPageScroller é container estrutural de comportamento de scroll.
    Não possui estados hover, focus ou active próprios.
    Interatividade é responsabilidade exclusiva do conteúdo no slot default.

    Acessibilidade (prefers-reduced-motion):
    A prop `duration` é forçada a 0 quando prefers-reduced-motion: reduce
    está ativo, garantindo conformidade com WCAG 2.3.3 (Animação a partir
    de Interações). O comportamento é gerido em JS (effectiveDuration).

    v-bind="$attrs" repassa atributos não declarados como props (ex.: aria-label,
    data-* attributes, classes adicionais) para o elemento raiz.
  -->
  <q-page-scroller
    :position="props.position"
    :offset="props.offset"
    :scroll-offset="props.scrollOffset"
    :duration="effectiveDuration"
    :reverse="props.reverse"
    :class="scrollerClasses"
    v-bind="$attrs"
  >
    <slot />
  </q-page-scroller>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssPageScroller — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QPageScroller. Exibe um elemento flutuante
 * apenas quando o usuário rola a página além de um limite configurável,
 * acionando scroll suave de volta à posição de origem ao ser clicado.
 *
 * Responsabilidades:
 * - Encapsula <q-page-scroller> preservando a detecção de scroll do Quasar
 * - Garante z-index governado via --dss-z-index-sticky (1020)
 * - Governa a duração de animação de scroll (padrão 250ms = --dss-duration-base)
 * - Respeita prefers-reduced-motion: forçando duration=0 quando ativo (WCAG 2.3.3)
 * - Repassa props de posicionamento e comportamento ao QPageScroller
 * - Repassa todos os atributos HTML ao elemento raiz via v-bind="$attrs"
 *
 * NÃO responsabilidades:
 * - Cor de fundo ou aparência: herdada do conteúdo no slot
 * - Interatividade: responsabilidade do conteúdo interno (DssButton, etc.)
 * - Layout interno: responsabilidade do desenvolvedor consumidor
 * - aria-label: deve ser definido no botão interno (slot default)
 *
 * Props expostas:
 * - position: ancoragem na viewport (bottom-right padrão)
 * - offset: deslocamento [x, y] em pixels
 * - scrollOffset: pixels rolados antes do componente aparecer
 * - duration: duração da animação de scroll em ms (governa sobre padrão Quasar)
 * - reverse: componente aparece ao rolar para cima
 *
 * EXC-01: Uso direto de <q-page-scroller> como raiz do template
 * - QPageScroller detecta scroll do container pai para controlar visibilidade
 * - Depende da hierarquia DOM direta para a transição de entrada/saída
 * - Envolver em <div> quebraria a detecção de scroll e a animação de visibilidade
 *
 * @version 1.0.0
 */

import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { PageScrollerProps, PageScrollerSlots } from '../types/pagescroller.types'
import { usePageScrollerClasses } from '../composables/usePageScrollerClasses'

defineOptions({
  name: 'DssPageScroller',
  inheritAttrs: false
})

const props = withDefaults(defineProps<PageScrollerProps>(), {
  position: 'bottom-right',
  offset: () => [18, 18],
  scrollOffset: 1000,
  duration: 250,
  reverse: false
})

defineSlots<PageScrollerSlots>()

const { scrollerClasses } = usePageScrollerClasses()

// ------------------------------------------------------------------
// prefers-reduced-motion — WCAG 2.3.3 (Animação a partir de Interações)
// Quando o usuário prefere motion reduzido, a animação de scroll é
// imediata (duration=0) independentemente do valor da prop `duration`.
// ------------------------------------------------------------------
const prefersReducedMotion = ref(false)
let motionMediaQuery: MediaQueryList | null = null

function handleMotionChange(e: MediaQueryListEvent): void {
  prefersReducedMotion.value = e.matches
}

onMounted(() => {
  motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = motionMediaQuery.matches
  motionMediaQuery.addEventListener('change', handleMotionChange)
})

onUnmounted(() => {
  motionMediaQuery?.removeEventListener('change', handleMotionChange)
})

const effectiveDuration = computed(() =>
  prefersReducedMotion.value ? 0 : props.duration
)
</script>

<style lang="scss" scoped>
@import '../DssPageScroller.module.scss';
</style>
