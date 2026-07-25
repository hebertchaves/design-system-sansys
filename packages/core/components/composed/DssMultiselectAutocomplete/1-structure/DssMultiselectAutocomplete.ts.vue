<script setup lang="ts">
/**
 * ==========================================================================
 * DssMultiselectAutocomplete - Design System Sansys (COMPOSTO — Fase 3)
 * ==========================================================================
 *
 * Orquestra bases DSS (Cartão Composto — "aninhar, não reimplementar"):
 *   - DssSelect   → base envelopada (raiz). Multiseleção + autocomplete via
 *                   passthrough de $attrs ao QSelect (use-input, @filter).
 *   - DssCheckbox → glifo de estado por opção (DECORATIVO — a fonte de verdade
 *                   é aria-selected da option; o checkbox é pointer-events:none).
 *   - DssChip     → token removível de cada valor selecionado.
 *
 * EXC-Gate-01: `q-item`/`q-item-section` no slot `option`.
 *   O slot option do QSelect exige itemProps ligados a um QItem — o QSelect
 *   ancora nele a navegação por teclado, o highlight (.q-manual-focusable) e o
 *   aria-selected. DssItem é um <div> próprio (não integra o QSelect) → usá-lo
 *   quebraria teclado/ARIA (WCAG 2.1.1/4.1.2). q-item é INFRAESTRUTURA do
 *   QSelect, sem alternativa em base DSS. Precedente: DssSelect.example (slot
 *   option) e DssDatePicker (QDate como raiz). As BASES DSS são consumidas
 *   DENTRO da linha (DssCheckbox + rótulo).
 *
 * INCREMENTO 1 (thin): sem "selecionado sobe ao topo" (Incremento 2).
 *
 * @see docs/governance/DSS_GUIA_COMPOSICAO_FASE3.md
 */

import { ref, computed, watch, useSlots } from 'vue'
import { QItem, QItemSection } from 'quasar'
import DssSelect from '../../../base/DssSelect/DssSelect.vue'
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

// ==========================================================================
// AUTOCOMPLETE (filtro default)
// ==========================================================================

/**
 * Handler de filtro do QSelect (use-input). Substring case-insensitive sobre
 * o rótulo. update()/abort() são fornecidos pelo QSelect.
 */
function onFilter(inputValue: string, update: (fn: () => void) => void) {
  update(() => {
    const all = props.options || []
    const needle = String(inputValue || '').trim().toLowerCase()
    filteredOptions.value = needle
      ? all.filter((o) => labelOf(o).toLowerCase().includes(needle))
      : [...all]
  })
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
    :loading="loading"
    :disable="disable"
    :readonly="readonly"
    :clearable="clearable"
    :brand="brand"
    :aria-label="ariaLabel"
    @filter="onFilter"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @clear="emit('clear')"
    @popup-show="emit('popup-show')"
    @popup-hide="emit('popup-hide')"
  >
    <!-- OPÇÃO: q-item (EXC-Gate-01) + DssCheckbox decorativo + rótulo -->
    <template #option="scope">
      <slot name="option" v-bind="scope">
        <QItem
          v-bind="scope.itemProps"
          class="dss-multiselect-autocomplete__option"
        >
          <QItemSection avatar class="dss-multiselect-autocomplete__option-check">
            <!-- DECORATIVO: pointer-events:none — o clique/teclado é do q-item.
                 aria-hidden pois aria-selected da option é a fonte de verdade. -->
            <DssCheckbox
              :model-value="scope.selected"
              size="sm"
              tabindex="-1"
              aria-hidden="true"
              style="pointer-events: none"
            />
          </QItemSection>
          <QItemSection>{{ labelOf(scope.opt) }}</QItemSection>
        </QItem>
      </slot>
    </template>

    <!-- TOKEN SELECIONADO: DssChip removível -->
    <template #selected-item="scope">
      <slot name="selected-item" v-bind="scope">
        <DssChip
          class="dss-multiselect-autocomplete__chip"
          size="sm"
          :removable="chipsRemovable && !disable && !readonly"
          :remove-aria-label="`Remover ${labelOf(scope.opt)}`"
          @remove="removeValue(scope.opt)"
        >
          {{ labelOf(scope.opt) }}
        </DssChip>
      </slot>
    </template>

    <!-- Passthrough dos demais slots do consumidor (label, prepend, append,
         no-option, hint, error…) que NÃO sejam os dois com default DSS acima. -->
    <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
      <slot v-if="name !== 'option' && name !== 'selected-item'" :name="name" v-bind="slotProps ?? {}" />
    </template>
  </DssSelect>
</template>

<!-- Estilos carregados globalmente via dist/style.css -->
