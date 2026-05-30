<script setup lang="ts">
/**
 * DssScrollArea — Implementação Canônica
 *
 * Wrapper DSS governado sobre QScrollArea do Quasar.
 * Golden Reference: DssBadge (componente não interativo, invólucro de conteúdo).
 * Golden Context:   DssVirtualScroll (wrapper sobre componente de scroll Quasar).
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA) ──────────────────────
 *
 * inheritAttrs: false
 *   $attrs (class extra, id, data-*, aria-* adicionais) são encaminhados
 *   ao q-scroll-area root via v-bind="$attrs". Atributos role/aria-label
 *   são controlados explicitamente via props label.
 *
 * EXC-Gate-01: QScrollArea como root element (sem wrapper div adicional)
 *   QScrollArea é usado como root element direto. $attrs forwarded via
 *   v-bind=$attrs no q-scroll-area. Evita DOM desnecessário e mantém
 *   a semântica de scroll nativa do Quasar intacta.
 *
 * EXC-Gate-02: Seletores .q-scrollarea__* no SCSS
 *   Os elementos .q-scrollarea__bar e .q-scrollarea__thumb são elementos
 *   internos do Quasar não expostos por API. Estilizados via CSS descendant
 *   selectors em 2-composition/_base.scss para aplicar tokens DSS.
 *   CSS global (não scoped) — sem :deep().
 *
 * EXC-Expose-01: defineExpose para API imperativa
 *   Métodos getScrollTarget, getScrollPosition, scrollTo, scrollBy e
 *   setScrollPosition são delegados ao QScrollArea interno via scrollAreaRef.
 *   Necessário para controle programático de posição de scroll pelo consumidor.
 *
 * Mapeamento de prop visible:
 *   DSS 'auto'    → Quasar visible = undefined (Quasar gerencia auto-hide)
 *   DSS 'always'  → Quasar visible = true
 *   DSS 'never'   → Quasar visible = false
 *
 * Props bloqueadas (não expostas):
 *   - bar-style / thumb-style: governados via CSS DSS (EXC-Gate-02)
 *   - dark: governado via tokens DSS em 4-output/_states.scss
 *   - content-style / content-active-style: consumidor usa class/style no slot
 *
 * Touch Target: NÃO aplicável — componente container não interativo.
 *   Elementos filhos gerenciam seus próprios targets.
 *
 * Estados NÃO APLICÁVEIS:
 *   - hover, active: container de conteúdo — filhos gerenciam interação
 *   - disabled: QScrollArea não possui estado disabled
 *   - error, loading: responsabilidade do conteúdo interno
 */

import { ref, computed } from 'vue'
import { QScrollArea } from 'quasar'
import type {
  DssScrollAreaProps,
  DssScrollAreaEmits,
  ScrollPayload,
} from '../types/scrollarea.types'
import { useScrollAreaClasses } from '../composables/useScrollAreaClasses'

defineOptions({ name: 'DssScrollArea', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<DssScrollAreaProps>(), {
  visible:    'auto',
  horizontal: false,
  barDelay:   1000,
})

// ─── Emits ────────────────────────────────────────────────────────────────────

const emit = defineEmits<DssScrollAreaEmits>()

// ─── Composables ──────────────────────────────────────────────────────────────

const { rootClasses } = useScrollAreaClasses(props)

// ─── Internal ref ─────────────────────────────────────────────────────────────

const scrollAreaRef = ref<InstanceType<typeof QScrollArea> | null>(null)

// ─── Computed — Quasar visible prop mapping ───────────────────────────────────
//
// QScrollArea.visible is Boolean | undefined:
//   undefined → auto-hide behavior (show on hover/scroll)
//   true      → always visible
//   false     → never visible (hidden)

const quasarVisible = computed<boolean | undefined>(() => {
  if (props.visible === 'always') return true
  if (props.visible === 'never') return false
  return undefined
})

// ─── Handlers ─────────────────────────────────────────────────────────────────

function onScroll(payload: ScrollPayload) {
  emit('scroll', payload)
}

// ─── Expose (EXC-Expose-01) ───────────────────────────────────────────────────

defineExpose({
  /** Returns the underlying scroll DOM element */
  getScrollTarget: () => scrollAreaRef.value?.getScrollTarget(),

  /** Returns current scroll position as { top, left } */
  getScrollPosition: () => scrollAreaRef.value?.getScrollPosition(),

  /**
   * Scrolls to an absolute offset.
   * @param offset  Position in pixels
   * @param duration  Animation duration in ms (0 = instant)
   * @param axis  'vertical' (default) | 'horizontal'
   */
  scrollTo: (offset: number, duration?: number, axis?: 'vertical' | 'horizontal') =>
    scrollAreaRef.value?.scrollTo(offset, duration, axis),

  /**
   * Scrolls by a relative offset from current position.
   * @param offset  Delta in pixels
   * @param duration  Animation duration in ms (0 = instant)
   * @param axis  'vertical' (default) | 'horizontal'
   */
  scrollBy: (offset: number, duration?: number, axis?: 'vertical' | 'horizontal') =>
    scrollAreaRef.value?.scrollBy(offset, duration, axis),

  /**
   * Sets scroll position on a specific axis.
   * @param axis  'vertical' | 'horizontal'
   * @param offset  Position in pixels
   * @param duration  Animation duration in ms (optional)
   */
  setScrollPosition: (axis: 'vertical' | 'horizontal', offset: number, duration?: number) =>
    scrollAreaRef.value?.setScrollPosition(axis, offset, duration),
})
</script>

<template>
  <!--
    Root: QScrollArea (EXC-Gate-01 — sem wrapper div adicional).

    v-bind="$attrs": encaminha id, class extra, data-*, aria-* adicionais.
    class="dss-scroll-area": base class para estilização CSS DSS.
    :class="rootClasses": modificadores de estado/variante.

    :role / :aria-label: aplicados diretamente no root quando label é fornecida.
    Quando label está presente, a área se torna uma landmark region ARIA,
    identificável por leitores de tela via aria-label.

    :visible → quasarVisible: mapeia DSS 'auto'|'always'|'never' para
    undefined|true|false esperados pelo QScrollArea.

    :delay → barDelay: controla o tempo antes da scrollbar se ocultar.
    Valor padrão 1000ms (Quasar default); consumidores podem usar --dss-duration-*
    como referência semântica (250=base, 1000=ultra-slow).
  -->
  <q-scroll-area
    ref="scrollAreaRef"
    v-bind="$attrs"
    class="dss-scroll-area"
    :class="rootClasses"
    :visible="quasarVisible"
    :horizontal="horizontal"
    :delay="barDelay"
    :scroll-target="scrollTarget ?? undefined"
    :role="label ? 'region' : undefined"
    :aria-label="label ?? undefined"
    @scroll="onScroll"
  >
    <slot />
  </q-scroll-area>
</template>
