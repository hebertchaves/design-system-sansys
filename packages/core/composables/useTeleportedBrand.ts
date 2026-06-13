/**
 * ==========================================================================
 * useTeleportedBrand - Global Composable
 * ==========================================================================
 *
 * Resolve o brand efetivo ([data-brand]) para componentes TELEPORTADOS.
 *
 * PROBLEMA (Auditoria Final Jun/2026, bloqueante A8):
 * QDialog/QPopupEdit teleportam o conteúdo para <body>. Seletores CSS como
 * `[data-brand="x"] .dss-dialog` exigem um ancestral com o atributo — mas o
 * ancestral real do conteúdo teleportado é o <body>. Se o consumidor aplica
 * data-brand em um container interno (ex.: #app), o acento de brand falha
 * silenciosamente nos overlays.
 *
 * SOLUÇÃO (dupla, normativa + defensiva):
 * 1. NORMA: aplicar data-brand em document.body (ou <html>) — assim o
 *    seletor descendente funciona inclusive para conteúdo teleportado.
 *    Ver DSS_IMPLEMENTATION_GUIDE.md, seção Brandabilidade.
 * 2. DEFESA (este composable): lê o brand efetivo do documento (norma ou
 *    fallback legado) e o expõe para ser aplicado via :data-brand no root
 *    do conteúdo teleportado. O seletor de atributo casa com o próprio
 *    elemento, reativando o acento e os tokens [data-brand="x"] na subárvore.
 *
 * @example
 * ```vue
 * <q-dialog>
 *   <div :class="dialogClasses" :data-brand="effectiveBrand">...</div>
 * </q-dialog>
 *
 * <script setup>
 * const { effectiveBrand } = useTeleportedBrand()
 * </script>
 * ```
 */

import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

export interface UseTeleportedBrandReturn {
  /**
   * Brand efetivo do documento ('hub' | 'water' | 'waste') ou undefined.
   * undefined faz o Vue omitir o atributo data-brand no template.
   */
  effectiveBrand: Ref<string | undefined>
}

export function useTeleportedBrand(): UseTeleportedBrandReturn {
  const effectiveBrand = ref<string | undefined>(undefined)
  let observer: MutationObserver | null = null

  const resolve = (): void => {
    if (typeof document === 'undefined') return
    // Caminho normativo: data-brand em <body> ou <html>
    const normative =
      document.body?.dataset.brand || document.documentElement?.dataset.brand
    if (normative) {
      effectiveBrand.value = normative
      return
    }
    // Fallback legado: primeiro container com data-brand no documento
    // (apps que aplicam o atributo em um wrapper interno, ex.: #app)
    const container = document.querySelector<HTMLElement>('[data-brand]')
    effectiveBrand.value = container?.dataset.brand || undefined
  }

  onMounted(() => {
    resolve()
    if (typeof MutationObserver !== 'undefined') {
      // Reage a troca de brand em runtime (ex.: seletor de brand do sandbox)
      observer = new MutationObserver(resolve)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-brand'],
        subtree: true,
      })
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return { effectiveBrand }
}
