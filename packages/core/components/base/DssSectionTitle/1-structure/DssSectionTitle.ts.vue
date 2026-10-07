<template>
  <component :is="tag" :class="titleClasses" v-bind="$attrs">
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssSectionTitle — Layer 1: Structure
 * ==========================================================================
 *
 * Título de seção com o traço de marca embaixo. Aparece 8× nas duas telas
 * Sansys de referência, sempre com o mesmo CSS copiado — e é por isso que
 * virou componente.
 *
 * NÍVEL E TAMANHO SÃO EIXOS SEPARADOS:
 *
 * `level` decide a TAG (`<h1>`…`<h4>`) e `size` decide a aparência. Juntar os
 * dois numa prop só parece econômico e não é: quem precisa de um `<h3>` grande
 * acaba escrevendo `<h1>` para conseguir o tamanho, e a navegação por
 * cabeçalhos do leitor de tela quebra (WCAG 1.3.1 · 2.4.6). Separados, a
 * estrutura do documento fica livre da estética.
 *
 * O TRAÇO SEGUE A MARCA, E NÃO É PINTADO AQUI:
 *
 * A cor sai de `--dss-action-primary`, que `[data-brand]` já remapeia. A prop
 * `brand` remapeia o mesmo token no escopo local — nunca pinta a borda direto
 * (§K5 do checklist de adequação). Pintar direto é o que torna a prop `color`
 * inerte dentro de uma página brandeada, defeito já medido no
 * `DssLinearProgress`.
 *
 * A DISTÂNCIA DO TRAÇO É MÍNIMA, E O MÍNIMO FOI MEDIDO:
 *
 * Ver `--dss-section-title-rule-gap`. Em resumo: com `line-height: tight` a
 * entrelinha não acrescenta folga abaixo do texto, e a tinta do descendente
 * alcança o fim da caixa da fonte — então `0` faria o traço encostar no 'g'.
 * 2px é o degrau seguinte da escala.
 */

import { computed } from 'vue'
import type { SectionTitleProps, SectionTitleSlots } from '../types/section-title.types'
import { useSectionTitleClasses } from '../composables'

defineOptions({
  name: 'DssSectionTitle',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SectionTitleProps>(), {
  label: undefined,
  level: 2,
  size: 'md',
  accent: 'brand',
  brand: undefined,
})

defineSlots<SectionTitleSlots>()

const { titleClasses } = useSectionTitleClasses(props)

/** O nível vira a tag. Fora de 1–4, cai em `h2` — o nível mais comum de seção. */
const tag = computed(() => {
  const n = props.level
  return n >= 1 && n <= 4 ? `h${n}` : 'h2'
})
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
