<template>
  <!--
    DssContainer — o trilho de conteúdo da página.

    `tag` é dinâmica de propósito: o trilho principal costuma ser `main`, uma
    faixa dentro dele `section`. Container não decide semântica pelo consumidor.

    `:data-brand` no root é a norma DSS para brand pela PROP (checklist §K1):
    o atributo remapeia os tokens de marca na subárvore inteira, o que a classe
    sozinha não faz. A rota ancestral não precisa de regra — os tokens já descem.
  -->
  <component
    :is="tag"
    :class="containerClasses"
    :data-brand="brand || undefined"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssContainer — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Trilho de conteúdo: largura máxima, respiro, centragem e ritmo vertical.
 *
 * POR QUE ELE EXISTE (set/2026). Em abr/2026 o componente foi adiado com a
 * justificativa "classes CSS suficientes" (PLANO_ACAO_GRID_LAYOUT §12.6). A
 * decisão foi reaberta com um argumento que não existia então: medidas duas
 * telas reais montadas sobre o DSS, `TestGridMasterDashboard.vue` e
 * `TestCheckinNFAg.vue` carregavam 970 linhas de CSS de página — 43% dos
 * arquivos — e o trilho de conteúdo estava reimplementado nas duas, com nomes
 * diferentes (`.cn-main`, `.gm-content`, `.gm-board`) e valores divergentes.
 * Classe utilitária resolve quem já sabe qual token usar; não impede a terceira
 * tela de inventar a quarta largura.
 *
 * RESPONSABILIDADE ÚNICA: a CAIXA. A grade de colunas é outro componente
 * (`DssGrid`) — juntar os dois faria um componente com duas razões para mudar.
 *
 * NÃO ENVOLVE QUASAR: não há equivalente. `QPage` é a superfície da página e
 * depende do QLayout; o trilho de largura entre ele e o conteúdo não existe lá.
 *
 * @version 1.0.0
 */
import type { ContainerProps } from '../types/container.types'
import { useContainerClasses } from '../composables'

defineOptions({ name: 'DssContainer', inheritAttrs: false })

const props = withDefaults(defineProps<ContainerProps>(), {
  size: 'lg',
  padding: 'md',
  gap: 'none',
  centered: true,
  tag: 'div',
  brand: null,
})

const { containerClasses } = useContainerClasses(props)
</script>
