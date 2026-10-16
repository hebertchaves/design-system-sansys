<template>
  <!--
    A raiz muda de papel conforme o contexto:
    - sozinha, é um GRUPO rotulado (um campo de formulário composto);
    - dentro do DssCompositionGroup, é o PAINEL da própria aba — e fica
      montada mesmo com a aba inativa (v-show), senão sai do DssForm (risco 5).
  -->
  <div
    v-show="!grupo || grupo.ativa.value"
    v-bind="$attrs"
    :class="rootClasses"
    :data-brand="brand || undefined"
    :role="grupo ? 'tabpanel' : 'group'"
    :id="grupo ? grupo.panelId.value : undefined"
    :aria-labelledby="grupo ? grupo.tabId.value : undefined"
    :aria-label="grupo ? undefined : label"
    :aria-invalid="invalida ? 'true' : undefined"
    :aria-describedby="invalida && mensagemDeErro ? idDoErro : undefined"
  >
    <DssDataTableClaudeCode
      :rows="modelValue"
      :columns="columns"
      :row-key="rowKey"
      :title="label"
      :aria-label="label"
      count-noun="registros"
      :selection="selection"
      :model-value="selected"
      :actions="acoesDaBarra"
      :row-actions="acoesDeLinha"
      :loading="loading"
      :error="error"
      :disabled="disabled"
      :brand="brand"
      :empty-title="emptyTitle"
      :empty-description="emptyDescription"
      @update:model-value="emit('update:selected', $event)"
      @action="aoAcionar"
      @retry="emit('retry')"
    >
      <template v-if="$slots['head-actions']" #head-actions="escopo">
        <slot name="head-actions" v-bind="escopo" />
      </template>
      <template v-if="$slots.empty" #empty="escopo">
        <slot name="empty" v-bind="escopo" />
      </template>
    </DssDataTableClaudeCode>

    <DssBanner
      v-if="invalida && mensagemDeErro"
      :id="idDoErro"
      variant="error"
      icon="error_outline"
      dense
      rounded
    >
      {{ mensagemDeErro }}
    </DssBanner>

    <!-- Modal do registro. O slot `form` vive dentro de um DssForm PRÓPRIO:
         é ele, e não o mestre, o formulário mais próximo dos campos do modal.
         Sem isso, um obrigatório vazio no modal reprovaria o mestre (risco 2,
         provado no spike). -->
    <DssDialog
      :open="modoDoFormulario !== null"
      persistent
      :data-brand="brand || undefined"
      @update:open="(aberto: boolean) => { if (!aberto) fecharFormulario() }"
    >
      <template #header>
        <h2 :id="idDoTituloDoFormulario" class="dss-composition__dialog-title">{{ tituloDoFormulario }}</h2>
      </template>
      <DssForm
        v-if="modoDoFormulario !== null"
        ref="formularioDoRegistro"
        class="dss-composition__form"
        :aria-labelledby="idDoTituloDoFormulario"
        @submit="salvarRascunho"
      >
        <slot name="form" :record="rascunho" :mode="modoDoFormulario" />
      </DssForm>
      <template #footer>
        <DssButton :label="cancelLabel" variant="flat" @click="fecharFormulario" />
        <DssButton :label="saveLabel" color="primary" @click="submeterFormulario" />
      </template>
    </DssDialog>

    <!-- Confirmação de ação destrutiva ou de mudança de estado. Nada é
         emitido antes do "sim". -->
    <DssDialog
      :open="confirmacao !== null"
      :data-brand="brand || undefined"
      @update:open="(aberto: boolean) => { if (!aberto) confirmacao = null }"
    >
      <template #header>
        <h2 class="dss-composition__dialog-title">{{ confirmacao?.texto.title }}</h2>
      </template>
      <p class="dss-composition__confirm-message">{{ confirmacao?.texto.message }}</p>
      <template #footer>
        <DssButton :label="cancelLabel" variant="flat" @click="confirmacao = null" />
        <DssButton
          :label="confirmacao?.texto.confirmLabel || confirmacao?.payload.action.label"
          :color="confirmacao?.payload.action.intent === 'remove' ? 'negative' : 'primary'"
          @click="confirmar"
        />
      </template>
    </DssDialog>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssComposition — coleção de sub-registros como CAMPO de formulário
 * ==========================================================================
 *
 * Migra o `JtComposition`. Responsável por listar, incluir e editar por
 * modal, confirmar ações destrutivas e responder ao `validate()` do DssForm
 * mestre. NÃO busca nem persiste registros, não gera formulário, não decide
 * entre excluir e inativar e não desenha a tabela (é do DssDataTableClaudeCode).
 *
 * Riscos declarados antes de construir (ver MIGRATION_JTECH_COMPOSITION.md):
 *   1 — participar do DssForm mestre → useFieldValidation (useFormChild)
 *   2 — campos do modal no mestre    → DssForm próprio em volta do slot `form`
 *   4 — chave do registro novo       → rowKey obrigatório + aviso em DEV
 */
import { computed, ref, useId } from 'vue'
import DssDataTableClaudeCode from '../../DssDataTableClaudeCode/DssDataTableClaudeCode.vue'
import DssDialog from '../../DssDialog/DssDialog.vue'
import DssForm from '../../DssForm/DssForm.vue'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssBanner from '../../../base/DssBanner/DssBanner.vue'
import { useFieldValidation, type DssFieldRule } from '../../../../composables/useFieldValidation'
import type {
  DssCompositionAction,
  DssCompositionActionPayload,
  DssCompositionConfirm,
  DssCompositionEmits,
  DssCompositionExpose,
  DssCompositionFormMode,
  DssCompositionProps,
  DssCompositionRow,
  DssCompositionSlots,
} from '../types/composition.types'
import {
  ACOES_DA_BARRA_PADRAO,
  ACOES_DE_LINHA_PADRAO,
  useCompositionClasses,
  useCompositionGroup,
} from '../composables'

defineOptions({ name: 'DssComposition', inheritAttrs: false })

const props = withDefaults(defineProps<DssCompositionProps>(), {
  name: undefined,
  required: false,
  requiredMessage: 'Inclua ao menos um registro.',
  rules: undefined,
  actions: () => ACOES_DA_BARRA_PADRAO,
  rowActions: () => ACOES_DE_LINHA_PADRAO,
  selection: 'none',
  selected: () => [],
  newRecord: undefined,
  addTitle: 'Incluir registro',
  editTitle: 'Editar registro',
  saveLabel: 'Salvar',
  cancelLabel: 'Cancelar',
  loading: false,
  error: null,
  disabled: false,
  readonly: false,
  brand: null,
  emptyTitle: 'Nenhum registro incluído',
  emptyDescription: 'Os registros incluídos aparecem aqui.',
})

const emit = defineEmits<DssCompositionEmits>()
const slots = defineSlots<DssCompositionSlots>()

const idDoErro = `dss-composition-erro-${useId()}`
const idDoTituloDoFormulario = `dss-composition-form-${useId()}`

// ============================================================================
// VALIDAÇÃO — a composição é um campo do DssForm mestre (risco 1)
// ============================================================================

const regras = computed<DssFieldRule<DssCompositionRow[]>[]>(() => [
  ...(props.required
    ? [(linhas: DssCompositionRow[]) => linhas.length > 0 || props.requiredMessage]
    : []),
  ...(props.rules ?? []),
])

const { temErro, mensagemDeErro, validar, resetarValidacao } = useFieldValidation<DssCompositionRow[]>({
  rules: () => regras.value,
  modelValue: () => props.modelValue,
  // Paridade QField: campo inerte não valida (obrigatório desabilitado não
  // pode travar a submissão do mestre).
  disabled: () => props.disabled || props.readonly,
  lazyRules: () => false,
})

const invalida = computed(() => temErro.value)

const { rootClasses } = useCompositionClasses(props, invalida)

const grupo = useCompositionGroup(computed(() => ({
  name: props.name ?? '',
  label: props.label,
  count: props.modelValue.length,
  required: props.required,
  invalid: invalida.value,
})))

// ============================================================================
// AÇÕES
// ============================================================================

const acoesDaBarra = computed(() => (props.readonly ? [] : props.actions))

const acoesDeLinha = computed(() => {
  if (props.readonly) return []
  return props.rowActions
})

const CONFIRMACOES_PADRAO: Partial<Record<NonNullable<DssCompositionAction['intent']>, DssCompositionConfirm>> = {
  remove: { title: 'Excluir registro', message: 'O registro será retirado da lista.' },
  activate: { title: 'Ativar registro', message: 'O registro passará a valer como ativo.' },
  inactivate: { title: 'Inativar registro', message: 'O registro continua na lista, mas deixa de valer como ativo.' },
}

function aoAcionar(payload: DssCompositionActionPayload) {
  const { action } = payload
  switch (action.intent) {
    case 'add':
      abrirFormulario('add')
      return
    case 'edit': {
      const alvo = payload.row ?? payload.rows[0]
      if (alvo) abrirFormulario('edit', alvo)
      return
    }
    case 'remove':
    case 'activate':
    case 'inactivate': {
      const texto = action.confirm === undefined ? CONFIRMACOES_PADRAO[action.intent] : action.confirm
      if (texto) confirmacao.value = { payload, texto }
      else executar(payload)
      return
    }
    case 'detail':
      emit('detail', payload)
      return
    default:
      emit('action', payload)
  }
}

// ============================================================================
// CONFIRMAÇÃO
// ============================================================================

const confirmacao = ref<{ payload: DssCompositionActionPayload; texto: DssCompositionConfirm } | null>(null)

function confirmar() {
  const atual = confirmacao.value
  confirmacao.value = null
  if (atual) executar(atual.payload)
}

function chaveDe(linha: DssCompositionRow) {
  return linha[props.rowKey]
}

function executar(payload: DssCompositionActionPayload) {
  switch (payload.action.intent) {
    case 'remove': {
      const removidas = new Set(payload.rows.map(chaveDe))
      emit('update:modelValue', props.modelValue.filter((linha) => !removidas.has(chaveDe(linha))))
      if (props.selected.some((linha) => removidas.has(chaveDe(linha)))) {
        emit('update:selected', props.selected.filter((linha) => !removidas.has(chaveDe(linha))))
      }
      return
    }
    case 'activate':
      emit('activate', payload)
      return
    case 'inactivate':
      emit('inactivate', payload)
      return
  }
}

// ============================================================================
// FORMULÁRIO DO REGISTRO (modal)
// ============================================================================

const modoDoFormulario = ref<DssCompositionFormMode | null>(null)
const rascunho = ref<DssCompositionRow>({})
const chaveEmEdicao = ref<unknown>(undefined)
// O wrapper re-export não carrega o tipo do defineExpose do DssForm.
const formularioDoRegistro = ref<{ submit: (event?: Event) => void } | null>(null)

const tituloDoFormulario = computed(() =>
  modoDoFormulario.value === 'edit' ? props.editTitle : props.addTitle,
)

function abrirFormulario(modo: DssCompositionFormMode, linha?: DssCompositionRow) {
  if (import.meta.env?.DEV && !slots.form) {
    console.warn('[DSS] DssComposition: ação de inclusão/edição sem o slot `form` — o modal abriria vazio.')
  }
  modoDoFormulario.value = modo
  // Cópia rasa: o slot edita o RASCUNHO; o valor só muda ao salvar.
  rascunho.value = modo === 'edit' && linha ? { ...linha } : { ...(props.newRecord?.() ?? {}) }
  chaveEmEdicao.value = linha ? chaveDe(linha) : undefined
}

function fecharFormulario() {
  modoDoFormulario.value = null
  rascunho.value = {}
  chaveEmEdicao.value = undefined
  emit('form-close')
}

function submeterFormulario() {
  // O botão vive no rodapé do diálogo, FORA do <form>: submete pela API
  // imperativa do DssForm, que valida os campos do modal antes de emitir submit.
  formularioDoRegistro.value?.submit()
}

function avisarChaveInvalida(registro: DssCompositionRow) {
  if (!import.meta.env?.DEV) return
  const chave = chaveDe(registro)
  if (chave === undefined || chave === null || chave === '') {
    console.warn(`[DSS] DssComposition: registro incluído sem a chave "${props.rowKey}". Devolva-a em \`newRecord\`.`)
  } else if (props.modelValue.some((linha) => chaveDe(linha) === chave)) {
    console.warn(`[DSS] DssComposition: chave "${String(chave)}" repetida em "${props.rowKey}".`)
  }
}

function salvarRascunho() {
  const registro = { ...rascunho.value }
  if (modoDoFormulario.value === 'add') {
    avisarChaveInvalida(registro)
    emit('update:modelValue', [...props.modelValue, registro])
  } else if (modoDoFormulario.value === 'edit') {
    emit('update:modelValue', props.modelValue.map((linha) =>
      chaveDe(linha) === chaveEmEdicao.value ? registro : linha,
    ))
  }
  fecharFormulario()
}

// ============================================================================
// EXPOSE — o DssForm chama sozinho; ficam para uso imperativo, como nos campos
// ============================================================================

defineExpose<DssCompositionExpose>({
  validate: validar,
  resetValidation: resetarValidacao,
})
</script>

<style lang="scss" scoped>
@use '../DssComposition.module.scss';
</style>
