<script setup lang="ts">
/**
 * DssParallax — Implementação Canônica
 *
 * Wrapper DSS governado sobre QParallax do Quasar.
 * Golden Reference: DssBadge  (componente não interativo — governança de categoria)
 * Golden Context:   DssVideo   (mesma família Mídia e Visualização, mesmo nível arquitetural)
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA) ──────────────────────
 *
 * inheritAttrs: false
 *   $attrs (id, class extra, data-*, aria-* adicionais) são encaminhados ao
 *   root element ativo (q-parallax ou div estático) via v-bind="$attrs".
 *   Atributos Quasar avançados não declarados em Props (ex: no-observer)
 *   também fluem por $attrs quando o QParallax está ativo.
 *
 * QParallax como root element (EXC-Gate-01):
 *   Quando `prefers-reduced-motion: reduce` NÃO está ativo, QParallax é o
 *   root element efetivo — sem div wrapper intermediário.
 *   Justificativa: evita DOM desnecessário e preserva o comportamento de
 *   scroll listener nativo do QParallax.
 *
 * Fallback estático (prefers-reduced-motion: reduce):
 *   Quando `prefers-reduced-motion: reduce` está ativo, um <div> estático
 *   substitui o QParallax. O background-image vem da prop `src` (não é
 *   valor hardcoded). Evita registro de scroll listeners desnecessários —
 *   melhor para performance e conformidade com WCAG 2.3.3 (AAA).
 *   A troca é reativa: se o usuário alterar a preferência em tempo de execução,
 *   o componente se adapta sem recarregar.
 *
 * Acessibilidade — imagem de fundo CSS:
 *   CSS background images são invisíveis a leitores de tela por natureza.
 *   Para imagens que transmitem conteúdo significativo, `alt` deve ser
 *   fornecido — renderizado como `<span class="dss-sr-only">` dentro do
 *   componente. Para paralaxe puramente decorativa, `decorative=true`
 *   comunica a intenção ao time.
 *   Em dev mode, aviso é emitido se nenhuma das duas opções for fornecida.
 *
 * Slot default:
 *   Conteúdo renderizado como overlay sobre o efeito de paralaxe.
 *   É acessível normalmente — NÃO é afetado pela natureza decorativa
 *   da imagem de fundo.
 *
 * Estados NÃO APLICÁVEIS:
 *   - hover, focus, active: paralaxe é um efeito visual não interativo.
 *   - disabled: sem semântica de disable para efeitos visuais de apresentação.
 *   - loading, error: QParallax não expõe estados de carregamento controláveis.
 */

import { computed } from 'vue'
import { QParallax } from 'quasar'
import type { DssParallaxProps } from '../types/parallax.types'
import { useParallaxClasses } from '../composables/useParallaxClasses'
import { useReducedMotion } from '../composables/useReducedMotion'

defineOptions({ name: 'DssParallax', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<DssParallaxProps>(), {
  height: 500,
  speed:  0.5,
})

// ─── Acessibilidade / Movimento Reduzido ──────────────────────────────────────

const { isReducedMotion } = useReducedMotion()

// ─── Classes ──────────────────────────────────────────────────────────────────

const { rootClasses } = useParallaxClasses()

// ─── Texto alternativo (sr-only) ─────────────────────────────────────────────
//
// CSS backgrounds são invisíveis a leitores de tela.
// Quando `alt` é fornecido, renderizamos um <span> sr-only para transmitir
// o significado da imagem. Quando `decorative=true`, nenhum texto é necessário.
// Em desenvolvimento, alertamos se a semântica não foi declarada.

const showSrText = computed<boolean>(() => {
  if (props.decorative) return false
  if (props.alt) return true

  if (import.meta.env?.DEV) {
    console.warn(
      '[DssParallax] A prop `alt` não foi fornecida.\n' +
      'Para paralaxe com conteúdo significativo, forneça `alt` com descrição da imagem.\n' +
      'Para paralaxe puramente decorativa, use `:decorative="true"`.',
    )
  }

  return false
})

// ─── Fallback estático ────────────────────────────────────────────────────────
//
// Aplicado quando prefers-reduced-motion: reduce está ativo.
// background-image e height vêm de props — não são valores hardcoded.
// Outros estilos visuais do fallback estão em 2-composition/_base.scss.

const staticFallbackStyle = computed(() => ({
  'background-image':    props.src ? `url(${props.src})` : undefined,
  'height':              `${props.height}px`,
}))
</script>

<template>
  <!--
    QParallax é o root element quando prefers-reduced-motion NÃO está ativo.
    v-bind="$attrs" encaminha id, class extra, data-*, aria-* adicionais.
    :speed controla a velocidade do parallax (0 = estático, 1 = scroll completo).
    :scroll-target aceita CSS selector ou referência DOM para o container de scroll.
  -->
  <q-parallax
    v-if="!isReducedMotion"
    v-bind="$attrs"
    :class="rootClasses"
    :src="src"
    :height="height"
    :speed="speed"
    :scroll-target="scrollTarget"
  >
    <!-- sr-only: texto alternativo para a imagem de fundo (se `alt` fornecido) -->
    <span v-if="showSrText" class="dss-sr-only">{{ alt }}</span>
    <slot />
  </q-parallax>

  <!--
    Fallback estático: ativo quando prefers-reduced-motion: reduce está presente.
    background-image e height são prop-driven — não hardcoded.
    .dss-parallax--static complementa com background-size/position via tokens.
  -->
  <div
    v-else
    v-bind="$attrs"
    :class="[...rootClasses, 'dss-parallax--static']"
    :style="staticFallbackStyle"
  >
    <!-- sr-only: texto alternativo para a imagem de fundo (se `alt` fornecido) -->
    <span v-if="showSrText" class="dss-sr-only">{{ alt }}</span>
    <slot />
  </div>
</template>
