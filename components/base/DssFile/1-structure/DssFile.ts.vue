<template>
  <!-- ==========================================================================
       DssFile — Wrapper do QFile
       Drag-and-drop + seleção de arquivos com identidade visual DssInput
       ========================================================================== -->
  <div
    :class="wrapperClasses"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
  >
    <!-- QFile — gerencia toda a lógica de seleção de arquivos -->
    <q-file
      ref="qFileRef"
      :model-value="modelValue"
      :multiple="multiple"
      :accept="accept"
      :max-files="maxFiles"
      :max-file-size="maxFileSize"
      :disable="disabled"
      :readonly="readonly"
      :tabindex="computedTabindex"
      :aria-label="ariaLabel"
      class="dss-file__q-file"
      borderless
      @update:model-value="(val) => emit('update:modelValue', val)"
      @add="(files) => emit('add', files)"
      @remove="(files) => emit('remove', files)"
      @rejected="(rejections) => emit('rejected', rejections)"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <!-- Prepend slot -->
      <template v-if="slots.prepend" #prepend>
        <div class="dss-file__prepend">
          <slot name="prepend" />
        </div>
      </template>

      <!-- Append slot + clear button -->
      <template #append>
        <div class="dss-file__append">
          <slot name="append" />

          <!-- Botão de limpar -->
          <button
            v-if="clearable && hasValue && !disabled && !readonly"
            class="dss-file__clear"
            type="button"
            :tabindex="-1"
            :aria-label="clearAriaLabel"
            @click.stop="handleClear"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </template>
    </q-file>

    <!-- Região interna do campo (sobreposição visual) -->
    <div class="dss-file__field" aria-hidden="true">
      <!-- Label flutuante -->
      <label
        v-if="label || slots['label-slot']"
        :class="labelClasses"
        @click="pickFiles"
      >
        {{ label }}
      </label>

      <!-- Área de drag-and-drop (dica visual) -->
      <div v-if="!hasValue && !disabled && !readonly" class="dss-file__drop-hint">
        <span class="dss-file__drop-icon" aria-hidden="true">📎</span>
        <span class="dss-file__drop-text">
          {{ placeholder || 'Clique ou arraste arquivos aqui' }}
        </span>
      </div>

      <!-- Nomes dos arquivos selecionados -->
      <div v-if="hasValue" class="dss-file__value">
        <span v-if="Array.isArray(modelValue)" class="dss-file__file-name">
          {{ modelValue.length === 1 ? modelValue[0].name : `${modelValue.length} arquivos selecionados` }}
        </span>
        <span v-else class="dss-file__file-name">
          {{ (modelValue as File).name }}
        </span>
      </div>
    </div>

    <!-- Overlay visual para drag ativo -->
    <div
      v-if="isDragging"
      class="dss-file__drag-overlay"
      aria-hidden="true"
    >
      <span class="dss-file__drag-label">Solte os arquivos aqui</span>
    </div>

    <!-- Área inferior: hint / erro -->
    <div v-if="hasBottomSlot" class="dss-file__bottom">
      <div
        v-if="error && (errorMessage || slots.error)"
        :id="errorId"
        class="dss-file__error"
        role="alert"
        aria-live="assertive"
      >
        <slot name="error">{{ errorMessage }}</slot>
      </div>
      <div
        v-else-if="hint || slots.hint"
        :id="hintId"
        class="dss-file__hint"
      >
        <slot name="hint">{{ hint }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssFile — Design System Sansys File Component
 * ==========================================================================
 *
 * Componente de seleção de arquivos do Design System Sansys (DSS)
 * TypeScript + Composition API. Wrapper controlado do QFile (Quasar).
 *
 * Arquitetura: idêntica ao DssInput — tokens, estados e brandabilidade
 * compartilhados. Adiciona suporte a drag-and-drop e validação de arquivos.
 *
 * @see https://quasar.dev/vue-components/file
 *
 * @example
 * ```vue
 * <DssFile
 *   v-model="selectedFile"
 *   label="Anexar documento"
 *   accept=".pdf,.doc,.docx"
 *   :max-file-size="5242880"
 *   clearable
 * />
 * ```
 *
 * @version 1.0.0
 */

import { ref, computed, useSlots } from 'vue'
import { QFile } from 'quasar'
import type { FileProps, FileEmits, FileExpose } from '../types/file.types'
import { useFileState, useFileClasses, useFileActions } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssFile',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<FileProps>(), {
  // Model
  modelValue: null,

  // File selection
  multiple: false,
  accept: undefined,
  maxFiles: undefined,
  maxFileSize: undefined,

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

  // Features
  clearable: false,

  // Accessibility
  ariaLabel: undefined,
  clearAriaLabel: 'Remover arquivo selecionado',
  tabindex: null
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<FileEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

const slots = useSlots()

// ==========================================================================
// REFS
// ==========================================================================

const qFileRef = ref<InstanceType<typeof QFile> | null>(null)

// ==========================================================================
// UNIQUE IDs (Acessibilidade)
// ==========================================================================

const uniqueId = Math.random().toString(36).substring(2, 9)
const hintId = computed(() => `dss-file-hint-${uniqueId}`)
const errorId = computed(() => `dss-file-error-${uniqueId}`)

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { isFocused, isDragging, hasValue, hasBottomSlot } = useFileState(props, slots)
const { wrapperClasses, labelClasses } = useFileClasses(props, { isFocused, hasValue, isDragging })
const {
  handleFocus,
  handleBlur,
  handleClear,
  handleDragOver,
  handleDragLeave,
  pickFiles,
  removeAtIndex,
  removeFile,
  focus,
  blur
} = useFileActions(emit, qFileRef, isFocused, isDragging)

// ==========================================================================
// COMPUTED
// ==========================================================================

/**
 * Tabindex computado
 * - Desabilitado: -1 (não focável)
 * - Customizado: usa prop tabindex
 * - Padrão: 0 (focável na ordem natural)
 */
const computedTabindex = computed(() => {
  if (props.disabled) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) {
    return typeof props.tabindex === 'number' ? props.tabindex : parseInt(String(props.tabindex))
  }
  return 0
})

// ==========================================================================
// EXPOSE
// ==========================================================================

defineExpose<FileExpose>({
  pickFiles,
  removeAtIndex,
  removeFile,
  focus,
  blur
})
</script>

<!-- Estilos carregados globalmente via DssFile.module.scss -->
