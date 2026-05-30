<script setup lang="ts">
/**
 * DssInfiniteScroll — Implementação Canônica
 *
 * Wrapper DSS governado sobre QInfiniteScroll do Quasar.
 * Golden Reference: DssChip (componente interativo — comportamento acionado por scroll).
 * Golden Context:   DssVirtualScroll (componente de scroll e virtualização, Família Scroll).
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA) ──────────────────────
 *
 * inheritAttrs: false
 *   $attrs (class extra, id, data-*, aria-* adicionais) são encaminhados ao
 *   QInfiniteScroll interno via v-bind="$attrs". O QInfiniteScroll é o root
 *   element efetivo — sem div wrapper extra para evitar DOM desnecessário.
 *
 * Delegação total ao Quasar:
 *   QInfiniteScroll gerencia detecção de scroll, debounce, cálculo de offset
 *   e ciclo de vida de paginação. DssInfiniteScroll NÃO reimplementa essas
 *   lógicas — apenas governa a API exposta, estados reativos e feedback visual.
 *
 * Estado interno — isLoading / noMore:
 *   isLoading é true entre o disparo do @load e a chamada de done().
 *   noMore é true após done(true) — o QInfiniteScroll para de disparar @load
 *   automaticamente. Ambos são rastreados internamente e expostos via
 *   defineExpose para controle programático externo.
 *
 * done() wrapping:
 *   A função done passada para o consumidor via @load é um wrapper sobre a
 *   done original do Quasar. Ela atualiza isLoading e noMore antes de chamar
 *   a done original, garantindo sincronia dos estados DSS com o Quasar.
 *
 * defineExpose — métodos do QInfiniteScroll:
 *   poll, trigger, reset, stop, resume, setIndex são delegados diretamente
 *   ao innerRef do QInfiniteScroll. reset() também reseta noMore.
 *
 * Slot no-more:
 *   Renderizado DENTRO do slot default do QInfiniteScroll (não após), para
 *   aparecer naturalmente ao final da lista quando noMore = true. O slot
 *   #loading do QInfiniteScroll é mapeado para o slot loading DSS.
 *
 * Touch Target: NÃO aplicável — componente container comportamental.
 *   O scroll é nativo; itens filhos gerenciam seus próprios touch targets.
 *
 * Props bloqueadas (não expostas ao consumidor):
 *   - virtual-scroll-*: internos ao QVirtualScroll (não ao QInfiniteScroll)
 *
 * Estados NÃO APLICÁVEIS:
 *   - hover, focus, active: container comportamental — itens filhos gerenciam
 *   - error: responsabilidade do consumidor via slot #no-more ou lógica externa
 */

import { ref } from 'vue'
import { QInfiniteScroll } from 'quasar'
import DssSpinner from '../../DssSpinner/DssSpinner.vue'
import type {
  DssInfiniteScrollProps,
  DssInfiniteScrollEmits,
} from '../types/infinitescroll.types'
import { useInfiniteScrollClasses } from '../composables/useInfiniteScrollClasses'

defineOptions({ name: 'DssInfiniteScroll', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<DssInfiniteScrollProps>(), {
  offset:  500,
  debounce: 100,
})

// ─── Emits ────────────────────────────────────────────────────────────────────

const emit = defineEmits<DssInfiniteScrollEmits>()

// ─── Estado interno ───────────────────────────────────────────────────────────

const isLoading = ref(false)
const noMore    = ref(false)

// ─── Referência ao QInfiniteScroll ───────────────────────────────────────────

const innerRef = ref<InstanceType<typeof QInfiniteScroll> | null>(null)

// ─── Composables ──────────────────────────────────────────────────────────────

const { rootClasses } = useInfiniteScrollClasses(props, { isLoading, noMore })

// ─── Handler @load ────────────────────────────────────────────────────────────
//
// Intercepta o evento @load do QInfiniteScroll para:
//   1. Marcar isLoading = true ao iniciar
//   2. Envolver done() para atualizar isLoading e noMore ao concluir
//   3. Re-emitir para o consumidor com a done envolvida

function onLoad(index: number, done: (stop?: boolean) => void) {
  isLoading.value = true

  const wrappedDone = (stop = false) => {
    isLoading.value = false
    if (stop) noMore.value = true
    done(stop)
  }

  emit('load', index, wrappedDone)
}

// ─── Métodos expostos ─────────────────────────────────────────────────────────
//
// Delega para o QInfiniteScroll interno. reset() também reseta noMore para
// que o consumidor possa reiniciar o ciclo de paginação.

defineExpose({
  poll:     ()              => innerRef.value?.poll(),
  trigger:  ()              => innerRef.value?.trigger(),
  reset:    ()              => { noMore.value = false; innerRef.value?.reset() },
  stop:     ()              => innerRef.value?.stop(),
  resume:   ()              => innerRef.value?.resume(),
  setIndex: (i: number)     => innerRef.value?.setIndex(i),
  isLoading,
  noMore,
})
</script>

<template>
  <!--
    QInfiniteScroll é o root element do DssInfiniteScroll.

    v-bind="$attrs": encaminha id, class extra, data-*, aria-* adicionais.
    :class="rootClasses": aplica dss-infinite-scroll + modificadores de estado.

    Não há div wrapper — QInfiniteScroll já renderiza como <div> e isso evita
    nesting desnecessário no DOM.

    Prop `tag` do QInfiniteScroll NÃO é exposta: DssInfiniteScroll sempre
    renderiza como <div>. Usar scroll-target para containers customizados.
  -->
  <q-infinite-scroll
    ref="innerRef"
    v-bind="$attrs"
    :class="rootClasses"
    :offset="offset"
    :debounce="debounce"
    :initial-index="initialIndex ?? undefined"
    :scroll-target="scrollTarget ?? undefined"
    :reverse="reverse"
    :disable="disable"
    @load="onLoad"
  >
    <!--
      Slot default: conteúdo da lista que cresce a cada carregamento.
      O consumidor renderiza items, cards, linhas de tabela, etc.
    -->
    <slot />

    <!--
      Slot no-more: renderizado ao final da lista quando done(true) foi chamado.
      Aparece dentro da área de conteúdo do QInfiniteScroll, abaixo dos itens.
      O consumidor pode substituir pelo slot #no-more.
    -->
    <div
      v-if="noMore"
      class="dss-infinite-scroll__no-more"
      role="status"
      aria-live="polite"
    >
      <slot name="no-more">
        <span class="dss-infinite-scroll__no-more-text">
          Todos os itens foram carregados
        </span>
      </slot>
    </div>

    <!--
      Slot #loading do QInfiniteScroll: exibido automaticamente pelo Quasar
      enquanto isLoading=true (entre @load e done()).
      Mapeia para o slot loading DSS. Default: DssSpinner centralizado.
    -->
    <template #loading>
      <div
        class="dss-infinite-scroll__loading"
        role="status"
        aria-live="polite"
        aria-label="Carregando mais itens"
      >
        <slot name="loading">
          <!--
            DssSpinner com aria-hidden="true" — o aria-label está no container.
            Spinner decorativo: o feedback acessível é o role="status" do pai.
          -->
          <dss-spinner
            class="dss-infinite-scroll__spinner"
            size="sm"
            aria-hidden="true"
          />
        </slot>
      </div>
    </template>
  </q-infinite-scroll>
</template>
