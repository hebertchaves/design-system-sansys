/**
 * ==========================================================================
 * DssDataTable - Claude Code — TypeScript Definitions
 * ==========================================================================
 *
 * Segunda versão do `jtech-data-table` (WebComps Jtech), escrita a partir da
 * UI já consolidada nos patterns "Check-in NFAg - Paralelo" e "Solicitações".
 *
 * O que esta versão herda da FONTE e a outra não: o vocabulário de `mode` dos
 * botões de ação (`SINGLE`/`MULTI`/`NONE`/`ANY`), que no Jtech decide quando um
 * botão da barra está ativo. Ele é um contrato de quatro estados; reduzi-lo a
 * um booleano "exige seleção" perde o caso `ANY` e o caso `MULTI`.
 */

import type { InjectionKey, Ref } from 'vue'
import type {
  DssTableColumn,
  DssTableDensity,
  DssTablePagination,
  DssTableSelection,
} from '../../DssTable/types/table.types'
import type { ButtonColor } from '../../../base/DssButton/types/button.types'

export type DssDataTableCcMode = 'local' | 'remote'
export type DssDataTableCcBrand = 'hub' | 'water' | 'waste'
export type DssDataTableCcRow = Record<string, unknown>

/**
 * Quando o botão da barra fica ativo — espelha o `mode` do `JtDataTable`.
 *
 * | valor    | ativo quando                          |
 * |----------|---------------------------------------|
 * | `single` | exatamente 1 linha selecionada        |
 * | `multi`  | 1 ou mais linhas selecionadas         |
 * | `any`    | qualquer quantidade selecionada (≥ 1) |
 * | `none`   | sempre (independe de seleção)         |
 *
 * `single` e `any` divergem só no teto: `single` desativa com 2+ selecionadas,
 * `any` não. É a diferença entre "Editar" e "Exportar seleção".
 */
export type DssDataTableCcActionMode = 'single' | 'multi' | 'any' | 'none'

/** Tom semântico de uma situação — o mesmo conjunto usado no pattern NFAg. */
export type DssDataTableCcTone = 'info' | 'success' | 'warning' | 'error' | 'neutral'

export interface DssDataTableCcAction {
  name: string
  label: string
  icon?: string
  color?: ButtonColor
  /** @default 'none' */
  mode?: DssDataTableCcActionMode
  disabled?: boolean
}

/** Como uma situação da coluna de status vira chip. */
export interface DssDataTableCcStatus {
  tone: DssDataTableCcTone
  icon?: string
  /** Rótulo exibido no chip. Omitido, usa o valor da célula. */
  label?: string
}

/** Lista fixa, ou função que decide as ações de cada linha. */
export type DssDataTableCcRowActions =
  | DssDataTableCcAction[]
  | ((row: DssDataTableCcRow) => DssDataTableCcAction[])

export interface DssDataTableCcProps {
  /**
   * As linhas a exibir — JÁ FILTRADAS pela página.
   *
   * O componente não recebe o conjunto completo nem devolve `filtered-rows`.
   * É a mesma decisão registrada no pattern "Solicitações" para o
   * `DssDataBoard`: quem filtra é a página. Receber tudo e filtrar aqui
   * transformaria o bloco num componente de DADOS.
   */
  rows: DssDataTableCcRow[]
  columns: DssTableColumn[]
  /** @default 'id' */
  rowKey?: string
  /** Título da seção, exibido no cabeçalho do bloco. */
  title?: string
  ariaLabel?: string
  /**
   * Denominador da contagem viva ("N de M registros"). Omitido, o bloco informa
   * apenas o que está em tela — nunca inventa um total que não recebeu.
   */
  total?: number | null
  /** Substantivo contado no cabeçalho. @default 'registros' */
  countNoun?: string
  /** @default 'local' */
  mode?: DssDataTableCcMode
  /** @default 'none' */
  selection?: DssTableSelection
  modelValue?: DssDataTableCcRow[]
  /** Rótulo do filtro aplicado. Presente, vira chip removível no cabeçalho. */
  filterLabel?: string | null
  pagination?: DssTablePagination
  /** @default [10, 25, 50] */
  rowsPerPageOptions?: number[]
  loading?: boolean
  error?: string | null
  /** @default 'compact' */
  density?: DssTableDensity
  actions?: DssDataTableCcAction[]
  /**
   * Ações por linha. Lista = as mesmas em todas as linhas. Função = o
   * consumidor decide POR LINHA (ex.: registro novo → Excluir; gravado →
   * Inativar). Devolver `[]` deixa a linha sem botões.
   */
  rowActions?: DssDataTableCcRowActions
  expandable?: boolean
  expandedKeys?: Array<string | number>
  /** Coluna cujo valor é uma situação e deve ser pintada como chip. */
  statusColumn?: string | null
  /** Mapa valor-da-célula → tom/ícone do chip. */
  statusMap?: Record<string, DssDataTableCcStatus>
  disabled?: boolean
  brand?: DssDataTableCcBrand | null
  /** @default 'Nenhum registro para este filtro' */
  emptyTitle?: string
  /** @default 'Revise os critérios ou limpe os filtros aplicados.' */
  emptyDescription?: string
}

export interface DssDataTableCcRequest {
  pagination: DssTablePagination
}

export interface DssDataTableCcActionPayload {
  action: DssDataTableCcAction
  rows: DssDataTableCcRow[]
  row?: DssDataTableCcRow
}

export interface DssDataTableCcEmits {
  (e: 'update:modelValue', value: DssDataTableCcRow[]): void
  (e: 'update:pagination', value: DssTablePagination): void
  (e: 'update:expandedKeys', value: Array<string | number>): void
  (e: 'request', value: DssDataTableCcRequest): void
  (e: 'action', value: DssDataTableCcActionPayload): void
  (e: 'expand-request', value: { row: DssDataTableCcRow; key: string | number; expanded: boolean }): void
  (e: 'row-click', evt: Event, row: DssDataTableCcRow, index: number): void
  (e: 'clear-filter'): void
  (e: 'retry'): void
}

export interface DssDataTableCcSlots {
  /** Entre o título e a contagem — filtros, legenda, o que a tela precisar. */
  'head-start'?: (props: { selected: DssDataTableCcRow[] }) => unknown
  /** Substitui a barra de ações derivada de `actions`. */
  'head-actions'?: (props: { selected: DssDataTableCcRow[]; disabled: boolean }) => unknown
  'row-actions'?: (props: { row: DssDataTableCcRow; disabled: boolean }) => unknown
  'expanded-row'?: (props: { row: DssDataTableCcRow; key: string | number }) => unknown
  /** Substitui o estado vazio padrão. */
  empty?: (props: { filtered: boolean }) => unknown
}

export interface DssDataTableCcContext {
  disabled: Ref<boolean>
  loading: Ref<boolean>
  selected: Ref<DssDataTableCcRow[]>
}

export const DSS_DATA_TABLE_CC_KEY = Symbol('dss-data-table-cc') as InjectionKey<DssDataTableCcContext>
