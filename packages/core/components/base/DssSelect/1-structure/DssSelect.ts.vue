<script setup lang="ts">
/**
 * ==========================================================================
 * DssSelect — Layer 1: Structure
 * ==========================================================================
 *
 * RESPONSABILIDADE: Estrutura Vue e lógica do componente.
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs é repassado explicitamente para o QSelect via v-bind="$attrs".
 *   → Evita que atributos HTML extras sejam aplicados em wrapper externo
 *     inexistente — o QSelect É o elemento raiz.
 *
 * QSelect como root element
 *   → DssSelect NÃO cria wrapper <div> externo.
 *   → O QSelect é o elemento raiz; classes DSS são aplicadas diretamente
 *     via :class="wrapperClasses".
 *   → O SCSS usa .dss-select como hook para sobrescrever os estilos padrão
 *     do Quasar via seletores descendentes (.dss-select .q-field__*).
 *
 * popup-content-class
 *   → O QSelect teleporta o QMenu (dropdown) para o body do documento.
 *   → Para estilizar o painel com tokens DSS fora da árvore do componente,
 *     injetamos 'dss-select__panel' (+ brand class) via popup-content-class.
 *   → O SCSS de .dss-select__panel é global e escopa via essa classe.
 *
 * Slots: label, selected-item, option, before, prepend, append, after, error, hint
 *   → Todos os slots do QSelect são encaminhados via passthrough dinâmico.
 *
 * Events: update:modelValue, focus, blur, clear, popup-show, popup-hide
 *
 * useChips
 *   → Delega diretamente para use-chips do QSelect.
 *   → Chips nativos (.q-chip) estilizados via .dss-select .q-field__native .q-chip.
 *   → Para chips 100% governados pelo DSS, usar slot selected-item + DssChip.
 *
 * Touch Target: Opção A (interativo)
 *   → min-height: var(--dss-input-height-md) aplicado em .q-field__control no SCSS.
 *   → O campo select em si é a área de toque — sem ::before necessário.
 *   → Decisão consistente com DssInput e DssTextarea (auditoria Jan/Mar 2026).
 *
 * Estados NÃO aplicáveis:
 *   → indeterminate: select não possui estado tristate.
 * ==========================================================================
 */

import { ref, computed, useSlots, onBeforeUnmount, onMounted, watch, nextTick } from 'vue'
import { QSelect } from 'quasar'
import type { SelectProps, SelectEmits, SelectExpose } from '../types/select.types'
import { useSelectClasses, useSelectState, useSelectActions } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssSelect',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<SelectProps>(), {
  // Model
  modelValue: null,

  // Options
  options: () => [],
  optionValue: 'value',
  optionLabel: 'label',
  emitValue: false,
  mapOptions: false,

  // Visual
  variant: 'outlined',
  dense: false,
  brand: null,

  // Content
  label: '',
  stackLabel: false,
  placeholder: '',
  hint: '',
  errorMessage: '',

  // State
  error: false,
  disabled: false,
  readonly: false,
  loading: false,
  required: false,

  // Features
  multiple: false,
  useChips: false,
  clearable: false,

  // Accessibility
  tabindex: null
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<SelectEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

const slots = useSlots()

// ==========================================================================
// REFS
// ==========================================================================

const qSelectRef = ref<InstanceType<typeof QSelect> | null>(null)

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { isFocused } = useSelectState(props)
const { wrapperClasses } = useSelectClasses(props, { isFocused })
const { handleFocus, handleBlur, focus, blur, showPopup, hidePopup, getNativeEl } =
  useSelectActions(emit, qSelectRef, isFocused)

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Tabindex computado
 *
 * - Desabilitado/Loading: -1 (não focável)
 * - Customizado: usa prop tabindex
 * - Padrão: 0 (focável na ordem natural)
 */
const computedTabindex = computed(() => {
  if (props.disabled || props.loading) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) {
    return typeof props.tabindex === 'number'
      ? props.tabindex
      : parseInt(String(props.tabindex))
  }
  return 0
})

/**
 * Classes do painel dropdown — injetadas via popup-content-class no QMenu.
 *
 * O QMenu do QSelect é teleportado para o body. Injetar classes via
 * popup-content-class permite que o SCSS de .dss-select__panel aplique
 * tokens DSS ao dropdown independente do local de montagem no DOM.
 *
 * Brand class incluída para aplicar cores de marca nas opções selecionadas.
 */
const panelClasses = computed(() => {
  const classes = ['dss-select__panel']
  if (props.brand) classes.push(`dss-select__panel--brand-${props.brand}`)
  return classes.join(' ')
})

/**
 * PLACEHOLDER em repouso (sem `use-input`).
 *
 * O QSelect só renderiza o `<input>` — único portador do atributo `placeholder`
 * — quando `use-input` é true. Como o DssSelect é um select de seleção (não
 * filtrável), o `placeholder` nunca aparecia. Solução: quando o campo está vazio
 * e não há label flutuante competindo (sem label, ou stack-label), exibimos o
 * placeholder via `display-value` e o pintamos como hint pela classe
 * `dss-select--placeholder` (ver _base.scss / _states.scss).
 */
const isEmptySelection = computed(() => {
  const v = props.modelValue
  return props.multiple
    ? !(Array.isArray(v) && v.length > 0)
    : (v === null || v === undefined || v === '')
})

const showingPlaceholder = computed(() =>
  !!props.placeholder && isEmptySelection.value && (props.stackLabel || !props.label)
)

const placeholderDisplay = computed(() =>
  showingPlaceholder.value ? props.placeholder : undefined
)

// ==========================================================================
// DROPDOWN — manter ancorado ao campo durante o scroll
// ==========================================================================

/**
 * Re-ancora o dropdown ao campo quando a página (ou qualquer container) rola.
 *
 * O QMenu do Quasar reposiciona no scroll apenas dos scroll-parents que ele
 * detecta; em layouts com container de scroll customizado o menu "descola"
 * (fica parado enquanto o campo rola). Usamos captura (3º arg = true) para
 * detectar scroll em QUALQUER container e chamamos updateMenuPosition() do
 * QSelect, mantendo o dropdown colado abaixo do campo.
 */
function repositionMenu(): void {
  qSelectRef.value?.updateMenuPosition?.()
}

function onPopupShow(): void {
  emit('popup-show')
  window.addEventListener('scroll', repositionMenu, true)
}

function onPopupHide(): void {
  emit('popup-hide')
  window.removeEventListener('scroll', repositionMenu, true)
}

onBeforeUnmount(() => {
  window.removeEventListener('scroll', repositionMenu, true)
})

// ==========================================================================
// VALOR LEGÍVEL — neutraliza o dim do Quasar no native de exibição
// ==========================================================================

/**
 * Sem `use-input`, o QSelect renderiza o valor selecionado num
 * `<div class="q-field__native" disabled>`. O atributo `disabled` aciona a regra
 * do Quasar `[disabled] { opacity: .6 !important }` (servida em `@layer quasar`),
 * deixando o VALOR de um campo HABILITADO apagado — diferente do DssInput, cujo
 * valor fica em cor cheia. Por ser `!important` dentro de layer, CSS DSS unlayered
 * não sobrescreve (só inline ou um layer declarado antes de `quasar`).
 *
 * `disabled` num `<div>` não tem efeito funcional (o alvo de foco/teclado é outro
 * elemento) — serve só para o estilo. Por isso, quando o campo NÃO está
 * desabilitado, removemos o atributo para o valor herdar a cor cheia (text-primary,
 * igual ao DssInput). Quando o campo está desabilitado de fato, mantemos — o dim
 * do estado disabled é coerente (ver `.dss-select--disabled`).
 */
function normalizeNativeDisabled(): void {
  if (props.disabled) return
  const root = qSelectRef.value?.$el as HTMLElement | undefined
  root?.querySelector('.q-field__native[disabled]')?.removeAttribute('disabled')
}

/**
 * Emite a atualização do valor e, num select de seleção ÚNICA, tira o foco do
 * campo após a interação — o padrão do QSelect é manter o foco (exigindo clique
 * fora p/ sair). Aplica-se tanto ao SELECIONAR uma opção quanto ao LIMPAR
 * (clearable → null): em ambos o campo deve voltar ao estado default. Em
 * `multiple` o foco permanece (várias escolhas em sequência).
 */
function handleModelUpdate(value: unknown): void {
  emit('update:modelValue', value as SelectProps['modelValue'])
  if (!props.multiple) {
    nextTick(() => blur())
  }
}

onMounted(() => nextTick(normalizeNativeDisabled))
watch(
  () => [props.modelValue, props.disabled],
  () => nextTick(normalizeNativeDisabled),
  { deep: true }
)

// ==========================================================================
// EXPOSE
// ==========================================================================

defineExpose<SelectExpose>({
  focus,
  blur,
  showPopup,
  hidePopup,
  get nativeEl() {
    return getNativeEl()
  }
})
</script>

<template>
  <QSelect
    ref="qSelectRef"
    :class="[wrapperClasses, { 'dss-select--placeholder': showingPlaceholder }]"
    :popup-content-class="panelClasses"
    :model-value="modelValue"
    :display-value="placeholderDisplay"
    :options="options"
    :option-value="optionValue"
    :option-label="optionLabel"
    :emit-value="emitValue"
    :map-options="mapOptions"
    :label="label"
    :stack-label="stackLabel"
    :placeholder="placeholder"
    :hint="hint"
    :error="error"
    :error-message="errorMessage"
    :disabled="disabled"
    :readonly="readonly"
    :loading="loading"
    :clearable="clearable"
    :multiple="multiple"
    :use-chips="useChips"
    :outlined="variant === 'outlined'"
    :filled="variant === 'filled'"
    :standout="variant === 'standout'"
    :borderless="variant === 'borderless'"
    :dense="dense"
    :tabindex="computedTabindex"
    :aria-label="ariaLabel || undefined"
    :aria-required="required ? 'true' : undefined"
    v-bind="$attrs"
    @update:model-value="handleModelUpdate"
    @focus="handleFocus"
    @blur="handleBlur"
    @clear="emit('clear')"
    @popup-show="onPopupShow"
    @popup-hide="onPopupHide"
  >
    <!-- Passthrough dinâmico de todos os slots para o QSelect -->
    <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </QSelect>
</template>
