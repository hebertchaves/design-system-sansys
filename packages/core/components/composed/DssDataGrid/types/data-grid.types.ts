/**
 * ==========================================================================
 * DssDataGrid — TypeScript Definitions
 * ==========================================================================
 *
 * Versão DSS do `jtech-data-grid` (WebComps Jtech): a lista de registros
 * apresentada como CARDS, não como linhas.
 *
 * A divergência estrutural que governa este arquivo: a origem é um
 * `q-table grid`, ou seja, uma TABELA transformada em cards por CSS. No DOM
 * continua sendo tabela — um card por célula. Aqui o conteúdo é o que ele de
 * fato é: uma LISTA de registros, cada um com uma lista de definições
 * (`<dl>`: rótulo → valor). Por isso não existe `columns` nesta API; existe
 * `fields`, que é o vocabulário da origem e descreve campos de ficha, não
 * colunas de grade.
 */

import type { InjectionKey, Ref } from 'vue'

export type DssDataGridSelection = 'none' | 'single' | 'multiple'
export type DssDataGridBrand = 'hub' | 'water' | 'waste'
export type DssDataGridRow = Record<string, unknown>

/**
 * Visibilidade do campo no card.
 *
 * `hidden` NÃO é "não renderizar": é "entra atrás do botão Mais". A origem já
 * declarava essa intenção (`visibility: 'hidden'` e um campo sintético
 * `showhide` rotulado "MORE"), mas nada consumia — o revelador nunca chegou a
 * renderizar. Aqui a intenção é cumprida.
 */
export type DssDataGridFieldVisibility = 'visible' | 'hidden'

export interface DssDataGridField {
  name: string
  label: string
  /** Chave na linha, ou função extratora. Omitido, usa `name`. */
  field?: string | ((row: DssDataGridRow) => unknown)
  format?: (value: unknown, row: DssDataGridRow) => string
  /** @default 'visible' */
  visibility?: DssDataGridFieldVisibility
}

export interface DssDataGridProps {
  /** Registros a exibir — já filtrados pela página. */
  rows: DssDataGridRow[]
  fields: DssDataGridField[]
  /** @default 'id' */
  rowKey?: string
  /** Título da seção, no cabeçalho do bloco. */
  title?: string
  ariaLabel?: string
  /**
   * Campo que dá nome ao card. Omitido, usa o primeiro campo visível.
   *
   * A origem fixava `props.row.name` no rótulo do checkbox — o que amarra o
   * componente a um campo chamado `name` E deixa o título do card existindo
   * apenas como rótulo de um controle.
   */
  titleField?: string | null
  /** Total do conjunto, para a contagem viva. @default null */
  total?: number | null
  /** @default 'registros' */
  countNoun?: string
  /** @default 'none' */
  selection?: DssDataGridSelection
  modelValue?: DssDataGridRow[]
  /** Rótulo do filtro aplicado; presente, vira chip removível. */
  filterLabel?: string | null
  /** @default true */
  paginated?: boolean
  /** Página atual (v-model:page). @default 1 */
  page?: number
  /** @default 12 */
  rowsPerPage?: number
  /**
   * Total de registros no servidor. Informado, a paginação é REMOTA: o
   * componente não fatia `rows` e emite `request` a cada página.
   */
  rowsNumber?: number | null
  /** Colunas do grid em telas largas. @default 3 */
  columnsPerRow?: 1 | 2 | 3 | 4
  loading?: boolean
  error?: string | null
  disabled?: boolean
  brand?: DssDataGridBrand | null
  /** @default 'Nenhum registro encontrado' */
  emptyTitle?: string
  /** @default 'Revise os critérios ou limpe os filtros aplicados.' */
  emptyDescription?: string
  /** @default 'Mais' */
  moreLabel?: string
  /** @default 'Menos' */
  lessLabel?: string
}

export interface DssDataGridRequest {
  page: number
  rowsPerPage: number
}

export interface DssDataGridEmits {
  (e: 'update:modelValue', value: DssDataGridRow[]): void
  (e: 'update:page', value: number): void
  (e: 'request', value: DssDataGridRequest): void
  (e: 'item-click', row: DssDataGridRow, index: number): void
  (e: 'clear-filter'): void
  (e: 'retry'): void
}

export interface DssDataGridSlots {
  'head-start'?: (props: { selected: DssDataGridRow[] }) => unknown
  'head-actions'?: (props: { selected: DssDataGridRow[]; disabled: boolean }) => unknown
  /** Substitui o corpo do card inteiro. */
  item?: (props: { row: DssDataGridRow; selected: boolean; index: number }) => unknown
  /** Acrescenta ao cabeçalho de cada card, à direita do título. */
  'item-actions'?: (props: { row: DssDataGridRow; disabled: boolean }) => unknown
  empty?: (props: { filtered: boolean }) => unknown
}

export interface DssDataGridContext {
  disabled: Ref<boolean>
  loading: Ref<boolean>
  selected: Ref<DssDataGridRow[]>
}

export const DSS_DATA_GRID_KEY = Symbol('dss-data-grid') as InjectionKey<DssDataGridContext>
