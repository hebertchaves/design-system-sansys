<script setup lang="ts">
/**
 * ==========================================================================
 * DssCarousel — Layer 1: Structure
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QCarousel do Quasar.
 * Classificação: Componente de exibição interativo com navegação
 * (Fase 2 — Nível 2, Família Conteúdo Rico).
 *
 * Golden Reference: DssChip (componente interativo)
 * Golden Context: DssBottomSheet (overlay composto, EXC-Gate-01)
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs repassado ao QCarousel via v-bind="$attrs".
 *   → Permite forwarding de class, style, aria-*, data-* e event handlers.
 *
 * Motor QCarousel (EXC-Gate-01)
 *   → QCarousel é a infraestrutura insubstituível de navegação de slides.
 *   → DssCarousel governa tokens, cores e semântica ARIA via CSS/template.
 *
 * Cores de navegação via CSS (EXC-Gate-02)
 *   → control-color="primary" é passado internamente ao QCarousel.
 *   → CSS do DSS sobrescreve --q-color-primary por brand (hub/water/waste).
 *   → Pontos inativos: descendant selector força --dss-gray-400 !important.
 *
 * role="region" + aria-label
 *   → Carousel é landmark WAI-ARIA de navegação de conteúdo.
 *   → aria-label DEVE ser fornecido via prop ariaLabel (recomendado, não obrigatório).
 *   → Valor padrão: "Carrossel de conteúdo" (acessível, mas genérico).
 *
 * Props bloqueadas:
 *   → control-color: bloqueado — CSS governa via --q-color-primary.
 *   → control-text-color: bloqueado — não exposto (CSS governa).
 *   → dark: bloqueado — modo escuro via [data-theme="dark"] global.
 *
 * Touch target:
 *   → N/A — container não é controle interativo direto.
 *   → Setas e pontos de paginação são QBtn (herdam foco DSS do DssButton).
 *
 * Composição:
 *   → Filhos DEVEM ser DssCarouselSlide.
 *   → QCarouselControl pode ser usado para controles de navegação customizados.
 *
 * @see DssChip (Golden Reference — componente interativo)
 * @see DssBottomSheet (Golden Context — composto com EXC-Gate-01)
 * @version 1.0.0
 */

import { QCarousel } from 'quasar'
import type { DssCarouselProps, DssCarouselEmits, DssCarouselSlots } from '../types/carousel.types'
import { useCarouselClasses } from '../composables/useCarouselClasses'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssCarousel',
  inheritAttrs: false,
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<DssCarouselProps>(), {
  animated: true,
  swipeable: true,
  controlType: 'flat',
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<DssCarouselEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<DssCarouselSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { rootClasses } = useCarouselClasses(props)
</script>

<template>
  <QCarousel
    v-bind="$attrs"
    :model-value="modelValue"
    :animated="animated"
    :swipeable="swipeable"
    :vertical="vertical"
    :infinite="infinite"
    :autoplay="autoplay"
    :height="height"
    :padding="padding"
    :arrows="arrows"
    :prev-icon="prevIcon"
    :next-icon="nextIcon"
    :navigation="navigation"
    :navigation-position="navigationPosition"
    :navigation-active-icon="navigationActiveIcon"
    :navigation-icon="navigationIcon"
    :thumbnails="thumbnails"
    :control-type="controlType"
    :keep-alive="keepAlive"
    :keep-alive-include="keepAliveInclude"
    :keep-alive-exclude="keepAliveExclude"
    :keep-alive-max="keepAliveMax"
    :fullscreen="fullscreen"
    control-color="primary"
    role="region"
    :aria-label="ariaLabel ?? 'Carrossel de conteúdo'"
    :class="rootClasses"
    class="dss-carousel"
    @update:model-value="emit('update:modelValue', $event)"
    @before-transition="(newSlide, oldSlide) => emit('before-transition', newSlide, oldSlide)"
    @transition="(newSlide, oldSlide) => emit('transition', newSlide, oldSlide)"
    @fullscreen="emit('fullscreen', $event)"
  >
    <slot />
  </QCarousel>
</template>
