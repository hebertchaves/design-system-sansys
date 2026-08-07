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
 *   → Delega use-chips ao QSelect, MAS o chip renderizado é DssChip, não o
 *     `.q-chip` nativo: o componente preenche o slot `selected-item` com
 *     <DssChip color="neutral" size="xs"> quando o consumidor não traz o seu.
 *   → Antes os chips nativos eram pintados por CSS (.q-field__native .q-chip),
 *     o que fazia o MESMO token de valor aparecer cinza aqui e azul em quem
 *     consumia DssChip direto — duas linguagens visuais para a mesma coisa.
 *   → Slot `selected-item` do consumidor tem precedência sobre o padrão DSS.
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
import DssChip from '../../DssChip/DssChip.vue'

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
/**
 * Rótulo exibível de um item SELECIONADO.
 *
 * O `selected-item` do QSelect entrega a option; `optionLabel` pode ser chave ou
 * função. Mesma resolução que o QSelect faria — só que aqui o conteúdo passa a
 * ser um DssChip em vez do `.q-chip` nativo.
 */
function labelOfSelected(opt: any): string {
  const ol = props.optionLabel
  if (typeof ol === 'function') return String(ol(opt) ?? '')
  if (opt !== null && typeof opt === 'object') return String(opt?.[ol as string] ?? '')
  return String(opt ?? '')
}

/**
 * Renderiza chips DSS no lugar dos `.q-chip` nativos.
 *
 * SÓ quando `useChips` está ligado E o consumidor não trouxe o próprio
 * `selected-item` — sobrescrever o slot sem essa guarda quebraria os selects
 * SEM chip, que são a maioria (o default é false) e exibem texto simples.
 */
const renderDssChips = computed(() => props.useChips && !slots['selected-item'])

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

/**
 * Stack-label computado (padrão B da família) — quando há placeholder E label, a
 * label já ocupa em repouso o estado flutuado (stacked), abrindo espaço para o
 * placeholder aparecer sem sobreposição. Respeita o stackLabel explícito.
 * (Paridade com DssTextarea/DssInput/DssFile.)
 */
const computedStackLabel = computed(
  () => props.stackLabel || (!!props.placeholder && !!props.label)
)

// Com a label flutuada (computedStackLabel), o placeholder pode aparecer sempre que
// vazio — sem o gate antigo (que exigia stackLabel/sem-label para evitar overlap).
const showingPlaceholder = computed(() =>
  !!props.placeholder && isEmptySelection.value
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
    :stack-label="computedStackLabel"
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
    <!--
      CHIP DSS no lugar do `.q-chip` nativo do Quasar.

      Só entra quando `useChips` está ligado e o consumidor não trouxe o próprio
      `selected-item` (ver renderDssChips) — sem essa guarda, sobrescrever o slot
      quebraria os selects SEM chip, que exibem texto simples e são a maioria.

      `color="neutral"`: o chip representa um VALOR escolhido, não ênfase
      semântica. É o que encerra a divergência de o mesmo token aparecer cinza
      aqui (via CSS sobre .q-chip) e azul em quem consome DssChip direto.

      `size="xs"` (20px) NÃO é escolha estética: é a mesma restrição que o CSS
      do `.q-chip` nativo aplicava via --dss-compact-control-height-xs. Em
      `multiple + use-chips` um chip mais alto INVADE a faixa da label
      flutuante — medido: com `md` (28px) o topo do chip entra sob a label.
      Aqui a regra passa a viver na escala do próprio componente, não num patch.
    -->
    <template v-if="renderDssChips" #selected-item="scope">
      <DssChip
        class="dss-select__chip"
        size="xs"
        color="neutral"
        :removable="!disabled && !readonly"
        :remove-aria-label="`Remover ${labelOfSelected(scope.opt)}`"
        @remove="scope.removeAtIndex(scope.index)"
      >{{ labelOfSelected(scope.opt) }}</DssChip>
    </template>

    <!-- Passthrough dinâmico dos demais slots para o QSelect -->
    <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </QSelect>
</template>
