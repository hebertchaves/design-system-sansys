/**
 * ==========================================================================
 * useResolvedBrand — marca efetiva do logo
 * ==========================================================================
 *
 * A marca decide QUAIS PATHS desenhar — é conteúdo, não pele. CSS não troca
 * `d` de um `<path>`, então isto não pode sair por cascata: precisa ser
 * resolvido em JS.
 *
 * Duas fontes, nesta ordem:
 *   1. a prop `brand`, quando o consumidor declara;
 *   2. o ancestral `[data-brand]` mais PRÓXIMO.
 *
 * O "mais próximo" é deliberado e é onde este composable difere do
 * `useTeleportedBrand`. Aquele resolve pelo DOCUMENTO porque o conteúdo dele é
 * teleportado para fora da árvore e não tem ancestral útil. O logo vive na
 * árvore: quem está mais perto é quem manda, e é isso que faz um bloco de marca
 * mista funcionar.
 */

import { ref, onMounted, onBeforeUnmount, watch, type Ref } from 'vue'
import type { BrandKey } from '../../../../assets/brand/logos'

const MARCAS: readonly string[] = ['water', 'hub', 'waste']

export interface UseResolvedBrandReturn {
  /** Marca efetiva, ou `undefined` enquanto não há nenhuma fonte. */
  marcaEfetiva: Ref<BrandKey | undefined>
}

export function useResolvedBrand(
  elemento: Ref<HTMLElement | SVGElement | null>,
  marcaDaProp: () => BrandKey | undefined,
): UseResolvedBrandReturn {
  const herdada = ref<BrandKey | undefined>(undefined)
  const marcaEfetiva = ref<BrandKey | undefined>(marcaDaProp())
  let observador: MutationObserver | null = null

  function resolverHerdada() {
    const el = elemento.value
    if (!el || typeof el.closest !== 'function') {
      herdada.value = undefined
      return
    }
    const ancestral = el.closest('[data-brand]') as HTMLElement | null
    const valor = ancestral?.dataset?.brand
    herdada.value = valor && MARCAS.includes(valor) ? (valor as BrandKey) : undefined
  }

  function recalcular() {
    marcaEfetiva.value = marcaDaProp() ?? herdada.value
  }

  onMounted(() => {
    resolverHerdada()
    recalcular()

    if (typeof MutationObserver !== 'undefined') {
      // O sandbox troca a marca em runtime (as pílulas do playground escrevem
      // `data-brand` num container). Sem observar, o logo montaria certo e
      // congelaria na primeira marca.
      observador = new MutationObserver(() => {
        resolverHerdada()
        recalcular()
      })
      observador.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-brand'],
        subtree: true,
      })
    }
  })

  watch(marcaDaProp, recalcular)
  watch(herdada, recalcular)

  onBeforeUnmount(() => {
    observador?.disconnect()
    observador = null
  })

  return { marcaEfetiva }
}
