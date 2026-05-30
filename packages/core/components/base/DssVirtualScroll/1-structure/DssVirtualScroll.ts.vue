<script setup lang="ts">
/**
 * DssVirtualScroll — Implementação Canônica
 *
 * Wrapper DSS governado sobre QVirtualScroll do Quasar.
 * Golden Reference: DssBadge (componente não interativo de exibição de dados).
 * Golden Context:   DssLinearProgress (wrapper sobre componente Quasar).
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA) ──────────────────────
 *
 * inheritAttrs: false
 *   $attrs (class extra, id, data-*, aria-* adicionais) são encaminhados
 *   ao div root via v-bind="$attrs". O QVirtualScroll interno NÃO recebe $attrs.
 *
 * Delegação ao Quasar:
 *   QVirtualScroll gerencia virtualização, cálculo de posições, reciclagem de DOM
 *   e scroll nativo. DssVirtualScroll NÃO reimplementa nenhuma dessas lógicas.
 *
 * ARIA — aria-setsize / aria-posinset:
 *   Expostos via escopo do slot default para que o consumidor os aplique
 *   em cada item (role="listitem" ou role="row"). Calculados com base em
 *   items.length para comunicar o tamanho real da lista a leitores de tela.
 *
 * EXC-Gate-01: Seletor interno do Quasar
 *   .q-virtual-scroll__content (width: 100%) aplicado dentro de __inner
 *   para evitar colapso de largura em listas com display: block.
 *   Documentado em dss.meta.json e 2-composition/_base.scss.
 *
 * Props bloqueadas (não expostas ao consumidor):
 *   - virtual-scroll-slice-ratio-before/after: gerenciados internamente
 *   - virtual-scroll-sticky-size-start/end: simplificados pelo DSS
 *
 * Touch Target: NÃO aplicável — componente container não interativo.
 * O scroll é nativo do browser; itens filhos gerenciam seu próprio target.
 *
 * Estados NÃO APLICÁVEIS:
 *   - hover, active: componente container — itens filhos gerenciam interação
 *   - focus: scroll é nativo; foco gerenciado por filhos ou tabindex externo
 */

import { computed } from 'vue'
import { QVirtualScroll } from 'quasar'
import type {
  DssVirtualScrollProps,
  DssVirtualScrollEmits,
  VirtualScrollPayload,
} from '../types/virtualscroll.types'
import { useVirtualScrollClasses } from '../composables/useVirtualScrollClasses'

defineOptions({ name: 'DssVirtualScroll', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<DssVirtualScrollProps>(), {
  itemSize: 48,
  type:     'list',
})

// ─── Emits ────────────────────────────────────────────────────────────────────

const emit = defineEmits<DssVirtualScrollEmits>()

// ─── Composables ──────────────────────────────────────────────────────────────

const { rootClasses } = useVirtualScrollClasses(props)

// ─── ARIA ─────────────────────────────────────────────────────────────────────
//
// aria-setsize é o total real de itens na lista, comunicado para
// leitores de tela mesmo quando apenas um subconjunto está no DOM.

const ariaSetsize = computed(() => props.items?.length ?? 0)

// ─── Computed ─────────────────────────────────────────────────────────────────

const isEmpty = computed(
  () => !props.loading && (!props.items || props.items.length === 0)
)

// ─── Handlers ─────────────────────────────────────────────────────────────────

function onVirtualScroll(payload: VirtualScrollPayload) {
  emit('scroll', payload)
}

function onNativeScroll(event: Event) {
  emit('native-scroll', event)
}
</script>

<template>
  <!--
    Root do DssVirtualScroll.

    v-bind="$attrs": encaminha id, class extra, data-*, aria-* adicionais.
    :data-brand: ativa cascade de brand tokens em 4-output/_brands.scss.

    O role semântico (list/table) é delegado ao QVirtualScroll interno
    via propriedade :type, que o Quasar aplica corretamente ao elemento raiz.
  -->
  <div
    v-bind="$attrs"
    :class="rootClasses"
  >
    <!-- Slot prepend: conteúdo fixo antes da lista virtualizada -->
    <slot name="prepend" />

    <!-- Estado de loading: feedback visual enquanto dados carregam -->
    <div
      v-if="loading"
      class="dss-virtual-scroll__loading"
      role="status"
      aria-live="polite"
      aria-label="Carregando itens"
    >
      <slot name="loading">
        <div class="dss-virtual-scroll__loading-indicator" aria-hidden="true" />
      </slot>
    </div>

    <!-- Estado vazio: exibido quando items=[] e não está carregando -->
    <div
      v-else-if="isEmpty"
      class="dss-virtual-scroll__empty"
      role="status"
    >
      <slot name="empty">
        <span class="dss-virtual-scroll__empty-text">Nenhum item para exibir</span>
      </slot>
    </div>

    <!--
      QVirtualScroll: motor de virtualização.

      :items               → array de dados reativos
      :virtual-scroll-item-size → estimativa de tamanho por item (px)
      :type                → 'list' | 'table' (semântica e role ARIA)
      :scroll-target       → container externo de scroll (opcional)
      :virtual-scroll-slice-size → qtd de itens no DOM (opcional)
      :horizontal          → habilita rolagem horizontal
      @virtual-scroll      → mapeia para emit('scroll') DSS
      @scroll              → evento nativo → emit('native-scroll') DSS

      NÃO passados (controlados pelo DSS via CSS):
      - class do item: governado pelo consumidor via slot
      - virtual-scroll-slice-ratio-*: gerenciado internamente pelo Quasar

      Slots prepend/append são renderizados FORA do QVirtualScroll (nível
      root do DssVirtualScroll) para que apareçam em todos os estados
      (normal, loading, empty) sem duplicação no DOM.
    -->
    <q-virtual-scroll
      v-else
      class="dss-virtual-scroll__inner"
      :items="items"
      :virtual-scroll-item-size="itemSize"
      :type="type"
      :scroll-target="scrollTarget ?? undefined"
      :virtual-scroll-slice-size="sliceSize ?? undefined"
      :horizontal="horizontal"
      @virtual-scroll="onVirtualScroll"
      @scroll="onNativeScroll"
    >
      <!--
        Slot de item virtualizado.

        Expõe ao consumidor:
          - item:          dados do item atual
          - index:         posição real no array original
          - ariaSetsize:   total de itens (para aria-setsize no item)
          - ariaPosinset:  posição 1-based (para aria-posinset no item)

        O consumidor é responsável por aplicar role="listitem" / role="row"
        e os atributos aria nos elementos filhos, conforme escopo fornecido.
      -->
      <template #default="{ item, index }">
        <slot
          :item="item"
          :index="index"
          :aria-setsize="ariaSetsize"
          :aria-posinset="index + 1"
        />
      </template>
    </q-virtual-scroll>

    <!-- Slot append: conteúdo fixo após a lista virtualizada -->
    <slot name="append" />
  </div>
</template>
