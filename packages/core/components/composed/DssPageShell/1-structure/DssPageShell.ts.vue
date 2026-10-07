<template>
  <div :class="shellClasses" v-bind="$attrs">
    <!-- RAIL — a coluna de 52px com os módulos do sistema -->
    <nav
      v-if="$slots.rail"
      class="dss-page-shell__rail"
      :aria-label="railAriaLabel"
    >
      <ul class="dss-page-shell__rail-list">
        <slot name="rail" />
      </ul>
    </nav>

    <!-- CONTEÚDO — trilha em cima, board embaixo -->
    <div class="dss-page-shell__content">
      <div v-if="$slots.breadcrumb" class="dss-page-shell__breadcrumb">
        <slot name="breadcrumb" />
      </div>

      <div class="dss-page-shell__board">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssPageShell — Layer 1: Structure
 * ==========================================================================
 *
 * O miolo da tela Sansys: rail de módulos à esquerda, trilha e board à direita.
 *
 *     ┌────┬──────────────────────────────┐
 *     │    │  trilha de navegação          │
 *     │rail│  ┌────────────────────────┐   │
 *     │52px│  │  board (a superfície)  │   │
 *     │    │  └────────────────────────┘   │
 *     └────┴──────────────────────────────┘
 *
 * POR QUE EXISTE:
 *
 * O rail se repete em TODA tela do Sansys e não existia como componente — cada
 * tela reimplementava a coluna, os itens e o estado ativo. É o §1.6 outra vez:
 * estrutura invariante vira composto.
 *
 * O QUE O COMPOSTO ABSORVEU, E O QUE DEIXOU DE FORA:
 *
 * Absorveu o ARRANJO — a coluna de 52px, o fundo rebaixado da página, o
 * respiro do conteúdo, a superfície do board. Deixou de fora o CONTEÚDO: quais
 * módulos, qual trilha, o que vai no board. Tudo por slot.
 *
 * O BOARD É DO SHELL, E ISSO É DELIBERADO:
 *
 * O cartão branco sobre o fundo rebaixado é o arranjo padrão das telas Sansys,
 * e estava duplicado como `.gm-board` em cada uma. `board={false}` devolve a
 * coluna nua para a tela que monta a própria superfície.
 *
 * NÃO USA `DssPage` NEM `DssLayout`:
 *
 * O shell é o MIOLO, não a casca inteira. Quem monta a tela é que decide se
 * isto vive dentro de um `DssLayout` com `DssAppBar` em cima — e na maioria
 * das vezes vive. Absorver o layout aqui travaria o shell num único arranjo de
 * página e o tornaria inútil em modal, aba ou preview.
 *
 * @see DssPageShellRailItem — os itens do rail
 * @see DssAppBar — a barra que normalmente fica acima
 */

import type { PageShellProps, PageShellSlots } from '../types/page-shell.types'
import { usePageShellClasses } from '../composables'

defineOptions({
  name: 'DssPageShell',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PageShellProps>(), {
  board: true,
  railAriaLabel: 'Módulos do sistema',
})

defineSlots<PageShellSlots>()

const { shellClasses } = usePageShellClasses(props)
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
