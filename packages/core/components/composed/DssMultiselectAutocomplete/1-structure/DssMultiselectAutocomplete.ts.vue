<script setup lang="ts">
/**
 * ==========================================================================
 * DssMultiselectAutocomplete - Design System Sansys (COMPOSTO — Fase 3)
 * ==========================================================================
 *
 * Orquestra bases DSS (Cartão Composto — "aninhar, não reimplementar"):
 *   - DssSelect   → base envelopada (raiz). Multiseleção + autocomplete via
 *                   passthrough de $attrs ao QSelect (use-input, @filter).
 *   - DssItem     → cada OPÇÃO do dropdown. O `itemProps` do QSelect é repassado
 *                   ao root do DssItem via $attrs: `role=option`, `aria-selected`,
 *                   e o estado de foco por teclado como ATRIBUTO `focused="true"`
 *                   (num QItem viraria a classe `q-manual-focusable--focused`).
 *                   A navegação por teclado funciona via `aria-activedescendant`.
 *                   `color=null` → o rótulo herda a cor neutra (não text-primary).
 *   - DssCheckbox → no slot `leading` do DssItem (DECORATIVO — a fonte de verdade
 *                   é aria-selected da option; pointer-events:none). Como não há
 *                   `.q-item`, o leak de margem `.q-item .q-icon` não ocorre e o
 *                   glifo centra naturalmente (ver histórico: usar q-item exigia
 *                   patches de margem/cor; DssItem elimina o leak na origem).
 *   - DssChip     → token removível de cada valor selecionado.
 *
 * NOTA (ex-EXC-Gate revisada): tentou-se `q-item` cru por supor que DssItem
 * quebraria teclado/ARIA — VERIFICADO que NÃO quebra (ARIA via activedescendant,
 * foco via atributo `focused`). Trocado para DssItem = consumir a base + sem leaks.
 *
 * INCREMENTO 1 (thin): sem "selecionado sobe ao topo" (Incremento 2).
 *
 * @see docs/governance/DSS_GUIA_COMPOSICAO_FASE3.md
 */

import { ref, computed, watch, useSlots, onMounted, onUnmounted, nextTick } from 'vue'
import DssSelect from '../../../base/DssSelect/DssSelect.vue'
import DssItem from '../../../base/DssItem/DssItem.vue'
import DssCheckbox from '../../../base/DssCheckbox/DssCheckbox.vue'
import DssChip from '../../../base/DssChip/DssChip.vue'
import type {
  MultiselectAutocompleteProps,
  MultiselectAutocompleteEmits,
  MultiselectAutocompleteExpose,
} from '../types/multiselect-autocomplete.types'

defineOptions({ name: 'DssMultiselectAutocomplete', inheritAttrs: false })

const props = withDefaults(defineProps<MultiselectAutocompleteProps>(), {
  modelValue: () => [],
  options: () => [],
  optionValue: 'value',
  optionLabel: 'label',
  emitValue: false,
  mapOptions: false,
  inputDebounce: 300,
  label: '',
  placeholder: '',
  loading: false,
  disable: false,
  readonly: false,
  clearable: false,
  chipsRemovable: true,
  showSelectedSummary: false,
  brand: null,
  ariaLabel: undefined,
})

const emit = defineEmits<MultiselectAutocompleteEmits>()

/** Slots (genérico) — usado no passthrough dinâmico dos slots do consumidor. */
const slots = useSlots()

// ==========================================================================
// REFS
// ==========================================================================

/** Ref ao DssSelect interno (para focus/blur/showPopup/hidePopup). */
const selectRef = ref<any>(null)

/** Opções visíveis (filtradas pelo autocomplete). Inicia com todas. */
const filteredOptions = ref<any[]>([...props.options])

/** Fetch assíncrono (loadOptions) em andamento. */
const isLoadingOptions = ref(false)

/** Loading efetivo: prop externa OU busca assíncrona em andamento. */
const effectiveLoading = computed(() => props.loading || isLoadingOptions.value)

// --- Lazy / infinite loading (loadMore) ---
/** Texto da busca atual (para paginar o loadMore com a mesma query). */
const currentQuery = ref('')
/** Ainda há lotes a carregar? (false quando loadMore retorna []). */
const hasMore = ref(true)
/** Carregamento de PRÓXIMO lote (loadMore) em andamento. */
const isLoadingMore = ref(false)

// Mantém as opções filtradas em sincronia quando a lista-fonte muda.
watch(
  () => props.options,
  (next) => { filteredOptions.value = [...(next || [])] },
  { deep: false }
)

// ==========================================================================
// HELPERS
// ==========================================================================

/** Extrai o rótulo exibível de uma opção (string-key ou função). */
function labelOf(opt: any): string {
  const ol = props.optionLabel
  if (typeof ol === 'function') return String(ol(opt) ?? '')
  if (opt !== null && typeof opt === 'object') return String(opt?.[ol as string] ?? '')
  return String(opt ?? '')
}

/** Extrai o VALOR de uma opção (string-key ou função) — p/ resolver emitValue. */
function optionValueOf(opt: any): any {
  const ov = props.optionValue
  if (typeof ov === 'function') return ov(opt)
  if (opt !== null && typeof opt === 'object') return opt?.[ov as string]
  return opt
}

/**
 * Rótulo de uma entrada da SELEÇÃO (não de uma opção da lista).
 *
 * Com `emitValue` e sem `mapOptions`, o QSelect entrega o VALOR cru ao slot
 * `selected-item` — e `labelOf` devolveria "2" no lugar de "Curitiba". Aqui a
 * entrada é resolvida de volta para a opção antes de extrair o rótulo.
 *
 * Vale para os três arranjos: sem emitValue a entrada já É a opção; com
 * emitValue + mapOptions ela também já vem resolvida (a busca não acha nada e o
 * fallback devolve a própria entrada). Usado pelo CAMPO e pela SEÇÃO, para os
 * dois nunca discordarem sobre o mesmo valor.
 */
function labelOfEntry(entry: any): string {
  if (!props.emitValue) return labelOf(entry)
  const all = props.options || []
  return labelOf(all.find((o) => optionValueOf(o) === entry) ?? entry)
}

// ==========================================================================
// AUTOCOMPLETE (filtro default)
// ==========================================================================

/**
 * Handler de filtro do QSelect (use-input), com debounce de `inputDebounce`.
 *
 * - COM `loadOptions`: busca ASSÍNCRONA (server-side). Marca loading, aguarda o
 *   resultado e popula o dropdown; em erro, aborta o ciclo do QSelect.
 * - SEM `loadOptions`: filtro LOCAL por substring case-insensitive do rótulo.
 *
 * update()/abort() são fornecidos pelo QSelect (coordenam a exibição do menu).
 */
async function onFilter(
  inputValue: string,
  update: (fn: () => void) => void,
  abort: () => void,
) {
  const val = String(inputValue || '').trim()
  // Nova query → reseta a paginação do lazy loading.
  currentQuery.value = val
  hasMore.value = true
  isLoadingMore.value = false

  if (props.loadOptions) {
    isLoadingOptions.value = true
    try {
      const results = await props.loadOptions(val)
      update(() => { filteredOptions.value = Array.isArray(results) ? results : [] })
    } catch {
      abort()
    } finally {
      isLoadingOptions.value = false
    }
    return
  }

  update(() => {
    const all = props.options || []
    const needle = val.toLowerCase()
    filteredOptions.value = needle
      ? all.filter((o) => labelOf(o).toLowerCase().includes(needle))
      : [...all]
  })
}

// ==========================================================================
// LAZY LOADING (infinite scroll via @virtual-scroll)
// ==========================================================================

/** Dispara loadMore quando faltam <= N itens para o fim da lista. */
const LOAD_MORE_THRESHOLD = 4

/**
 * Handler do @virtual-scroll do QSelect: se rolou perto do fim e há mais lotes,
 * carrega o próximo (loadMore) e APPENDA. Ignora se não há loadMore, se já está
 * carregando, ou se acabou (hasMore=false).
 */
function onVirtualScroll(details: { to: number }) {
  if (!props.loadMore || isLoadingMore.value || !hasMore.value) return
  const total = filteredOptions.value.length
  if (details && details.to >= total - LOAD_MORE_THRESHOLD) {
    void loadMoreOptions()
  }
}

/** Carrega e APPENDA o próximo lote; [] ⇒ fim (hasMore=false). */
async function loadMoreOptions() {
  if (!props.loadMore || isLoadingMore.value || !hasMore.value) return
  isLoadingMore.value = true
  try {
    const more = await props.loadMore(currentQuery.value, filteredOptions.value.length)
    if (!Array.isArray(more) || more.length === 0) {
      hasMore.value = false
    } else {
      filteredOptions.value = [...filteredOptions.value, ...more]
    }
  } catch {
    hasMore.value = false
  } finally {
    isLoadingMore.value = false
  }
}

// ==========================================================================
// MODEL
// ==========================================================================

const model = computed<any[]>({
  get: () => props.modelValue ?? [],
  set: (v) => emit('update:modelValue', Array.isArray(v) ? v : []),
})

/** Remove um valor da seleção (chip removido). */
function removeValue(opt: any) {
  const current = props.modelValue ?? []
  const idx = current.indexOf(opt)
  const next = idx === -1 ? current.filter((v) => v !== opt) : [...current.slice(0, idx), ...current.slice(idx + 1)]
  emit('update:modelValue', next)
  emit('remove', opt)
}

/**
 * Tokens da seção "Selecionados" (before-options): cada entrada do modelValue
 * resolvida para { value, label }. Com emitValue, a entrada é o VALOR → resolve
 * o rótulo pela option correspondente; senão a entrada É a option. STICKY: mostra
 * TODOS os selecionados, independente do filtro do autocomplete (o objetivo é ver
 * tudo de uma vez). Deriva do modelValue — sem estado duplicado.
 */
const selectedTokens = computed(() =>
  (props.modelValue ?? []).map((entry) => ({ value: entry, label: labelOfEntry(entry) }))
)

/**
 * Condições da seção "Selecionados" como CONSTS do setup (não props diretas):
 * o slot before-options renderiza no QMenu TELEPORTADO, onde acesso direto a
 * props não resolve (o _ctx é re-vinculado). Consts do setup vêm por closure.
 */
const showSelected = computed(() => props.showSelectedSummary && selectedTokens.value.length > 0)
const summaryChipRemovable = computed(() => props.chipsRemovable && !props.disable && !props.readonly)

// ==========================================================================
// CAMPO DE UMA LINHA — quantos chips cabem é MEDIDO, não pré-definido
// ==========================================================================
//
// O campo NUNCA cresce em altura: numa grade de formulário, um campo que ganha
// linha desloca tudo à volta. Os chips ficam numa linha só e o excedente sai de
// cena, sinalizado por um contador.
//
// Quantos cabem depende da largura REAL e do tamanho dos rótulos — um número
// fixo (ex.: "mostre 2") erra nas duas pontas: sobra espaço num campo largo e
// expulsa o input de busca num estreito. Por isso a conta é feita medindo o
// layout, com ResizeObserver, e não por prop.

/** Total de selecionados. */
const totalSelected = computed(() => props.modelValue?.length ?? 0)

/** Linha do campo (.q-field__native) — origem das medidas. */
const fieldRow = ref<HTMLElement | null>(null)

/** Quantos chips cabem na linha. Começa "todos" — a medição corrige. */
const visibleCount = ref(Number.MAX_SAFE_INTEGER)

/** Quantos ficaram de fora (rótulo do contador `+N`). */
const hiddenCount = computed(() => Math.max(0, totalSelected.value - visibleCount.value))

/**
 * Rótulo do contador. Com algum chip à mostra é um INCREMENTO (`+3` = mais três
 * além dos visíveis). Sem nenhum, "+4" seria incoerente (mais quatro do que
 * quê?) — passa a ser o TOTAL puro.
 */
const counterLabel = computed(() =>
  visibleCount.value === 0 ? String(totalSelected.value) : `+${hiddenCount.value}`
)

/** Texto acessível equivalente, sempre por extenso. */
const counterAriaLabel = computed(() =>
  visibleCount.value === 0
    ? `${totalSelected.value} selecionados`
    : `mais ${hiddenCount.value} de ${totalSelected.value} selecionados`
)

/** Espaço reservado à direita para o input de busca continuar utilizável. */
const INPUT_RESERVE_PX = 56
/** Espaço reservado ao contador quando ele for necessário. */
const COUNTER_RESERVE_PX = 48

/** Evita realimentação: esconder chip muda o layout e reacorda o ResizeObserver. */
let measuring = false

/**
 * Decide quantos chips cabem, em DUAS passadas.
 *
 * 1ª — mostra todos e lê as larguras naturais. Necessário porque um chip
 *      escondido tem largura 0: medir com ele já escondido perpetuaria a
 *      decisão anterior (o campo nunca voltaria a crescer ao alargar).
 * 2ª — acumula as larguras dentro do orçamento e corta.
 *
 * O contador só entra na conta quando de fato vai existir — reservar espaço
 * para ele mesmo cabendo tudo desperdiçaria um chip em campos justos.
 */
async function measureOverflow() {
  const row = fieldRow.value
  if (!row || measuring) return
  measuring = true
  try {
    const total = totalSelected.value
    if (!total) { visibleCount.value = Number.MAX_SAFE_INTEGER; return }

    // 1ª passada
    visibleCount.value = total
    await nextTick()

    const chips = Array.from(row.querySelectorAll<HTMLElement>(
      '.dss-multiselect-autocomplete__chip:not(.dss-multiselect-autocomplete__chip--counter)'
    ))
    if (!chips.length) return
    const widths = chips.map((c) => c.getBoundingClientRect().width)
    const rowW = row.clientWidth

    // Sem layout medível (jsdom, display:none, antes da 1ª pintura) não há o que
    // decidir — manter TODOS visíveis. Concluir "nada cabe" a partir de zeros
    // esconderia a seleção inteira por falta de informação.
    if (!rowW || !widths.some((w) => w > 0)) { visibleCount.value = total; return }

    // 2ª passada: cabe tudo sem contador?
    const somaTotal = widths.reduce((a, b) => a + b, 0)
    if (somaTotal <= rowW - INPUT_RESERVE_PX) {
      visibleCount.value = total
      return
    }

    // Não cabe: o contador passa a existir e também ocupa lugar.
    const budget = rowW - INPUT_RESERVE_PX - COUNTER_RESERVE_PX
    let acc = 0
    let n = 0
    for (const w of widths) {
      if (acc + w > budget) break
      acc += w
      n++
    }
    // Pode dar ZERO: em campo muito estreito, insistir num chip expulsaria o
    // input de busca e o autocomplete pararia de funcionar. Aí o contador
    // assume sozinho e passa a exibir o TOTAL (ver counterLabel).
    visibleCount.value = n
  } finally {
    measuring = false
  }
}

/**
 * Índice do último chip — posição em que o contador é renderizado (uma vez só,
 * no fim da linha, para ficar ancorado à direita).
 */
const counterIndex = computed(() => Math.max(0, totalSelected.value - 1))

let ro: ResizeObserver | null = null

onMounted(async () => {
  await nextTick()
  // O QSelect é a raiz do DssSelect; a linha dos chips é o .q-field__native.
  const root = (selectRef.value as any)?.$el as HTMLElement | undefined
  fieldRow.value = root?.querySelector('.q-field__native') ?? null
  if (fieldRow.value && typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => measureOverflow())
    ro.observe(fieldRow.value)
  }
  measureOverflow()
})

onUnmounted(() => { ro?.disconnect(); ro = null })

// Mudou a seleção → as larguras mudaram; remede depois do repaint.
watch(() => props.modelValue, async () => { await nextTick(); measureOverflow() }, { deep: true })

// ==========================================================================
// EXPOSE
// ==========================================================================

defineExpose<MultiselectAutocompleteExpose>({
  focus: () => selectRef.value?.focus?.(),
  blur: () => selectRef.value?.blur?.(),
  showPopup: () => selectRef.value?.showPopup?.(),
  hidePopup: () => selectRef.value?.hidePopup?.(),
  selectRef,
})
</script>

<template>
  <!--
    DssSelect é a raiz (o QSelect É a raiz do DssSelect). inheritAttrs:false +
    v-bind="$attrs" garante que class/style/hint/rules do consumidor cheguem lá.
    use-input + @filter chegam ao QSelect via passthrough de $attrs do DssSelect.
  -->
  <DssSelect
    ref="selectRef"
    v-model="model"
    v-bind="$attrs"
    class="dss-multiselect-autocomplete"
    multiple
    use-input
    :options="filteredOptions"
    :option-value="optionValue"
    :option-label="optionLabel"
    :emit-value="emitValue"
    :map-options="mapOptions"
    :input-debounce="inputDebounce"
    :label="label"
    :placeholder="placeholder"
    :loading="effectiveLoading"
    :disable="disable"
    :readonly="readonly"
    :clearable="clearable"
    :brand="brand"
    :aria-label="ariaLabel"
    @filter="onFilter"
    @virtual-scroll="onVirtualScroll"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @clear="emit('clear')"
    @popup-show="emit('popup-show')"
    @popup-hide="emit('popup-hide')"
  >
    <!-- SELECIONADOS: seção FIXA no topo do painel (slot before-options do QSelect
         — acima da lista virtualizada e FORA do scroll). Tokens derivam do
         modelValue (sem estado duplicado); remover aqui desmarca a opção in-place.
         Sticky: mostra todos os selecionados, independente do filtro. -->
    <template #before-options>
      <div
        v-if="showSelected"
        class="dss-multiselect-autocomplete__selected"
        role="group"
        :aria-label="`Selecionados (${selectedTokens.length})`"
      >
        <span class="dss-multiselect-autocomplete__selected-label">
          Selecionados ({{ selectedTokens.length }})
        </span>
        <div class="dss-multiselect-autocomplete__selected-tokens">
          <DssChip
            v-for="t in selectedTokens"
            :key="String(t.value)"
            size="sm"
            variant="outline"
            color="neutral"
            :removable="summaryChipRemovable"
            :remove-aria-label="`Remover ${t.label}`"
            @remove="removeValue(t.value)"
          >{{ t.label }}</DssChip>
        </div>
      </div>
    </template>

    <!-- OPÇÃO: DssItem (base consumida) — o itemProps do QSelect (role=option,
         aria-selected, teclado/highlight) é repassado ao root do DssItem via $attrs.
         Checkbox DECORATIVO no slot leading; rótulo no default. -->
    <template #option="scope">
      <slot name="option" v-bind="scope">
        <DssItem
          v-bind="scope.itemProps"
          class="dss-multiselect-autocomplete__option"
          :color="null"
          :leading-decorative="true"
        >
          <template #leading>
            <!-- DECORATIVO (aria-hidden via leadingDecorative): aria-selected da
                 option é a fonte de verdade; clique/teclado são do itemProps. -->
            <DssCheckbox
              :model-value="scope.selected"
              size="md"
              tabindex="-1"
              style="pointer-events: none"
            />
          </template>
          {{ labelOf(scope.opt) }}
        </DssItem>
      </slot>
    </template>

    <!-- TOKEN SELECIONADO no CAMPO.
         O campo nunca ganha altura: os chips ficam numa linha só e o que não
         cabe é cortado, sinalizado pelo contador. `flat` (sem fundo nem borda)
         separa os papéis — o campo resume, a seção do painel gere a seleção
         (lá os tokens são `outline`). -->
    <template #selected-item="scope">
      <slot name="selected-item" v-bind="scope">
        <!-- TODOS os chips são renderizados (sem v-if por contagem): o corte é
             VISUAL, pelo overflow da linha. É isso que mantém as larguras
             naturais mensuráveis e permite a contagem adaptativa. -->
        <DssChip
          :class="['dss-multiselect-autocomplete__chip', {
            // Não coube na linha — sai de cena, o contador o representa.
            'dss-multiselect-autocomplete__chip--overflowed': scope.index >= visibleCount,
          }]"
          size="md"
          variant="flat"
          color="neutral"
          :removable="chipsRemovable && !disable && !readonly"
          :remove-aria-label="`Remover ${labelOfEntry(scope.opt)}`"
          @remove="removeValue(scope.opt)"
        >
          {{ labelOfEntry(scope.opt) }}
        </DssChip>
        <!-- CONTADOR: uma vez só, ancorado ao fim da linha. O número vem da
             MEDIÇÃO do layout (ResizeObserver), não de um limite pré-definido —
             por isso acompanha a largura real do campo. Não é removível: não
             representa um valor único. -->
        <DssChip
          v-if="scope.index === counterIndex && hiddenCount > 0"
          class="dss-multiselect-autocomplete__chip dss-multiselect-autocomplete__chip--counter"
          size="md"
          variant="flat"
          color="neutral"
          :aria-label="counterAriaLabel"
        >
          {{ counterLabel }}
        </DssChip>
      </slot>
    </template>

    <!-- LAZY LOADING: indicador "carregando mais" no rodapé da lista (after-options,
         abaixo da lista virtualizada). isLoadingMore é ref do setup (resolve no
         menu teleportado; props diretas não resolveriam). -->
    <template #after-options>
      <div v-if="isLoadingMore" class="dss-multiselect-autocomplete__loading-more">
        Carregando mais…
      </div>
    </template>

    <!-- Passthrough dos demais slots do consumidor (label, prepend, append,
         no-option, hint, error…) que NÃO sejam os dois com default DSS acima. -->
    <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
      <slot v-if="name !== 'option' && name !== 'selected-item'" :name="name" v-bind="slotProps ?? {}" />
    </template>
  </DssSelect>
</template>

<!-- Estilos carregados globalmente via dist/style.css -->
