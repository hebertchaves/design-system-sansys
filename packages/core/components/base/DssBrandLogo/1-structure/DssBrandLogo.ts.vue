<template>
  <svg
    ref="svgRef"
    :class="logoClasses"
    :viewBox="desenho?.viewBox"
    :role="a11y.papel"
    :aria-label="a11y.nome"
    :aria-hidden="a11y.oculto ? 'true' : undefined"
    fill="currentColor"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <path
      v-for="(p, i) in pathsVisiveis"
      :key="i"
      :d="p.d"
      :opacity="p.opacity"
    />
  </svg>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssBrandLogo — Layer 1: Structure
 * ==========================================================================
 *
 * Desenha a marca Sansys — Water, Hub ou Waste — como SVG inline.
 *
 * POR QUE INLINE, E NÃO `<img src>`:
 *
 * · A cor sai de `currentColor`. É o mesmo mecanismo do DssIcon (CCI §2.3), e
 *   deixa o logo herdar a cor do host: branco sobre a barra de marca, escuro
 *   sobre fundo claro, sem o componente decidir nada. O protótipo do Figma
 *   forçava branco com `filter: brightness(0) invert(1)`, que só funciona em
 *   logo monocromático e não sobrevive a um fundo claro.
 * · Zero requisição de rede — e `<img>` não aceita recolorir.
 * · O DSS troca de marca em RUNTIME (`[data-brand]`), então as três precisam
 *   estar no bundle de qualquer forma. Dividir por marca não se aplica.
 *
 * A MARCA É CONTEÚDO, NÃO PELE:
 *
 * CSS não troca o `d` de um `<path>`. Por isso a marca não pode sair por
 * cascata como o resto da brandabilidade do DSS — ela é resolvida em JS, pela
 * prop ou pelo ancestral `[data-brand]` mais próximo (ver `useResolvedBrand`).
 *
 * `opacity` VEM DOS DADOS, e é desenho:
 *
 * As formas do símbolo são deliberadamente parciais (0,4 a 0,7). Sobre fundo
 * colorido com `currentColor` branco, é o que produz a profundidade da marca.
 * Não é decoração que o componente possa descartar.
 *
 * @see assets/brand/logos.ts — os dados das três marcas
 * @see DssIcon — o outro primitivo de glifo do DSS
 */

import { ref, computed } from 'vue'
import { BRAND_LOGOS } from '../../../../assets/brand/logos'
import type { BrandLogoProps } from '../types/brand-logo.types'
import { useBrandLogoClasses, useResolvedBrand } from '../composables'

defineOptions({
  name: 'DssBrandLogo',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BrandLogoProps>(), {
  brand: undefined,
  size: 'md',
  variant: 'full',
  decorative: false,
  ariaLabel: undefined,
})

const svgRef = ref<SVGElement | null>(null)

const { logoClasses } = useBrandLogoClasses(props)
const { marcaEfetiva } = useResolvedBrand(svgRef, () => props.brand)

const desenho = computed(() => (marcaEfetiva.value ? BRAND_LOGOS[marcaEfetiva.value] : undefined))

/**
 * Os paths do recorte pedido.
 *
 * Sem marca resolvida o array é vazio: o `<svg>` renderiza sem nada dentro em
 * vez de escolher uma marca por conta própria. Chutar a marca de um produto é
 * pior que não desenhar.
 */
const pathsVisiveis = computed(() => {
  const d = desenho.value
  if (!d) return []
  if (props.variant === 'full') return d.paths
  const papel = props.variant === 'icon' ? 'icon' : 'wordmark'
  return d.paths.filter((p) => p.role === papel)
})

/**
 * Acessibilidade.
 *
 * Diferença deliberada em relação ao DssIcon: lá, `ariaLabel` é obrigatório
 * para o ícone informativo, porque um ícone não tem nome natural. O logo TEM —
 * ele vem dos dados da marca. Por isso o padrão aqui é informativo e nomeado,
 * e `decorative` é quem opta por sair da árvore.
 *
 * O caso de `decorative` é concreto: numa barra onde o nome do produto já
 * aparece em texto ao lado, o logo anunciado duplicaria a leitura.
 */
const a11y = computed(() => {
  if (props.decorative) {
    return { oculto: true, papel: undefined, nome: undefined }
  }
  return {
    oculto: false,
    papel: 'img' as const,
    nome: props.ariaLabel ?? desenho.value?.label,
  }
})
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
