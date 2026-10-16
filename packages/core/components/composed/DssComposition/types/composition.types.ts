/**
 * ==========================================================================
 * DssComposition — TypeScript Definitions
 * ==========================================================================
 *
 * Migração do `JtComposition` (WebComps Jtech). De-para, decisões e riscos:
 * `MIGRATION_JTECH_COMPOSITION.md`, nesta pasta.
 *
 * A composição é UM CAMPO DE FORMULÁRIO cujo valor é a lista de
 * sub-registros: participa do `DssForm` mestre como qualquer campo
 * (`useFieldValidation`), e o consumidor monta o formulário do registro no
 * slot `form`.
 */

import type { DssTableColumn, DssTableSelection } from '../../DssTable/types/table.types'
import type {
  DssDataTableCcAction,
  DssDataTableCcBrand,
  DssDataTableCcRow,
} from '../../DssDataTableClaudeCode/types/data-table-claude-code.types'
import type { DssFieldRule } from '../../../../composables/useFieldValidation'

export type DssCompositionRow = DssDataTableCcRow
export type DssCompositionBrand = DssDataTableCcBrand

/**
 * O que a composição FAZ ao acionar uma ação.
 *
 * | intent       | efeito                                                       |
 * |--------------|--------------------------------------------------------------|
 * | `add`        | abre o modal com `newRecord()`; ao salvar, inclui            |
 * | `edit`       | abre o modal com uma cópia da linha; ao salvar, substitui    |
 * | `remove`     | confirma; ao confirmar, emite o array sem as linhas          |
 * | `activate`   | confirma; ao confirmar, emite `activate` (consumidor muda)   |
 * | `inactivate` | confirma; ao confirmar, emite `inactivate` (consumidor muda) |
 * | `detail`     | emite `detail` — o consumidor decide onde mostrar            |
 * | (ausente)    | emite `action` — a composição não interpreta                 |
 *
 * Ativar e inativar NÃO alteram o valor: a composição não sabe o que é
 * registro "ativo" (decisão C). Ela pede confirmação e entrega a intenção.
 */
export type DssCompositionIntent = 'add' | 'edit' | 'remove' | 'activate' | 'inactivate' | 'detail'

export type DssCompositionFormMode = 'add' | 'edit'

export interface DssCompositionConfirm {
  title: string
  message: string
  /** Rótulo do botão que confirma. @default o `label` da ação */
  confirmLabel?: string
}

export interface DssCompositionAction extends DssDataTableCcAction {
  intent?: DssCompositionIntent
  /**
   * Texto da confirmação. Omitido, `remove`/`activate`/`inactivate` usam o
   * texto padrão em português. `false` executa sem perguntar.
   */
  confirm?: DssCompositionConfirm | false
}

/** Lista fixa, ou função que decide as ações de cada linha (decisão D). */
export type DssCompositionRowActions =
  | DssCompositionAction[]
  | ((row: DssCompositionRow) => DssCompositionAction[])

export interface DssCompositionProps {
  /** As linhas — o VALOR do campo. Nunca é mutado: toda mudança sai como array novo. */
  modelValue: DssCompositionRow[]
  columns: DssTableColumn[]
  /**
   * Chave de cada registro. Obrigatória e sem padrão: o legado gravava
   * `__index` nos registros do consumidor. Chave é dado do consumidor.
   */
  rowKey: string
  /** Rótulo do campo — título do bloco e da aba no `DssCompositionGroup`. */
  label: string
  /** Identifica a coleção no grupo. Obrigatório dentro do `DssCompositionGroup`. */
  name?: string
  /** Exige ao menos um registro. Avaliado pelo `validate()` do `DssForm` mestre. */
  required?: boolean
  /** @default 'Inclua ao menos um registro.' */
  requiredMessage?: string
  /** Regras extras sobre a lista — mesma semântica dos campos DSS. */
  rules?: DssFieldRule<DssCompositionRow[]>[]
  /** Ações da barra. @default [Incluir] */
  actions?: DssCompositionAction[]
  /** Ações de cada linha. @default [Editar, Excluir] */
  rowActions?: DssCompositionRowActions
  /** @default 'none' */
  selection?: DssTableSelection
  /** Linhas selecionadas (v-model:selected). */
  selected?: DssCompositionRow[]
  /**
   * Semente do registro em inclusão. Deve trazer a chave (`rowKey`): em
   * desenvolvimento, chave ausente ou repetida gera aviso no console.
   */
  newRecord?: () => DssCompositionRow
  /** @default 'Incluir registro' */
  addTitle?: string
  /** @default 'Editar registro' */
  editTitle?: string
  /** @default 'Salvar' */
  saveLabel?: string
  /** @default 'Cancelar' */
  cancelLabel?: string
  loading?: boolean
  /** Falha de carga — repassada ao DataTable, que oferece "tentar novamente". */
  error?: string | null
  /** Inerte: sem ações e sem validação (paridade QField). */
  disabled?: boolean
  /** Somente leitura: lista visível, sem ações. Substitui o `buttonHidden` do legado. */
  readonly?: boolean
  brand?: DssCompositionBrand | null
  /** @default 'Nenhum registro incluído' */
  emptyTitle?: string
  /** @default 'Os registros incluídos aparecem aqui.' */
  emptyDescription?: string
}

export interface DssCompositionActionPayload {
  action: DssCompositionAction
  rows: DssCompositionRow[]
  row?: DssCompositionRow
}

export interface DssCompositionEmits {
  (e: 'update:modelValue', value: DssCompositionRow[]): void
  (e: 'update:selected', value: DssCompositionRow[]): void
  (e: 'activate', value: DssCompositionActionPayload): void
  (e: 'inactivate', value: DssCompositionActionPayload): void
  (e: 'detail', value: DssCompositionActionPayload): void
  /** Ação sem `intent`: a composição não interpreta, entrega o dado. */
  (e: 'action', value: DssCompositionActionPayload): void
  (e: 'form-close'): void
  (e: 'retry'): void
}

export interface DssCompositionFormScope {
  /** RASCUNHO — cópia do registro. Editar aqui não toca o valor até salvar. */
  record: DssCompositionRow
  mode: DssCompositionFormMode
}

export interface DssCompositionSlots {
  /** O formulário do registro, montado pelo consumidor com campos DSS. */
  form?: (props: DssCompositionFormScope) => unknown
  /** Substitui a barra de ações do bloco. */
  'head-actions'?: (props: { selected: DssCompositionRow[]; disabled: boolean }) => unknown
  /** Substitui o estado vazio. */
  empty?: (props: { filtered: boolean }) => unknown
}

export interface DssCompositionExpose {
  validate: () => boolean | Promise<boolean>
  resetValidation: () => void
}
