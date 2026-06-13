// DssDatePicker — TypeScript interfaces

export type DssDatePickerModelValue =
  | string
  | { from: string; to: string }
  | string[]

export interface DssDatePickerProps {
  /** Valor controlado — string (YYYY/MM/DD), objeto { from, to } ou array de datas */
  modelValue?: DssDatePickerModelValue
  /** Seleção de múltiplas datas individuais */
  multiple?: boolean
  /** Seleção de intervalo (from/to) */
  range?: boolean
  /** Máscara de formatação da data (padrão: YYYY/MM/DD) */
  mask?: string
  /** Locale para internacionalização */
  locale?: Record<string, unknown>
  /** Calendário: gregoriano ou persa */
  calendar?: 'gregorian' | 'persian'
  /** Layout paisagem */
  landscape?: boolean
  /** Modo minimal (sem header) */
  minimal?: boolean
  /** Exibir botão "Hoje" */
  todayBtn?: boolean
  /** Emite valor imediatamente ao selecionar */
  emitImmediately?: boolean
  /** Vista padrão ao abrir */
  defaultView?: 'Calendar' | 'Months' | 'Years'
  /** Ano/mês padrão ao abrir (YYYY/MM) */
  defaultYearMonth?: string
  /** Exibir anos no modo de meses */
  yearsInMonthView?: boolean
  /** Função ou array que define quais datas são selecionáveis */
  options?: string[] | ((date: string) => boolean)
  /** Datas marcadas com ponto de evento */
  events?: string[] | ((date: string) => boolean)
  /** Cor do ponto de evento */
  eventColor?: string | ((date: string) => string)
  /** Limita navegação mínima (YYYY/MM) */
  navigationMinYearMonth?: string
  /** Limita navegação máxima (YYYY/MM) */
  navigationMaxYearMonth?: string
  /** Impede deselecionar a data já selecionada */
  noUnset?: boolean
  /** Primeiro dia da semana (0=dom, 1=seg, ..., 6=sab) */
  firstDayOfWeek?: string | number
  /** Título personalizado no header */
  title?: string
  /** Subtítulo personalizado no header */
  subtitle?: string
  /** Atributo name para form */
  name?: string
  /** Tabindex */
  tabindex?: string | number
  /** Desabilita o componente */
  disable?: boolean
  /** Somente leitura */
  readonly?: boolean
}

export interface DssDatePickerEmits {
  (e: 'update:modelValue', value: DssDatePickerModelValue): void
  (e: 'navigation', value: { year: number; month: number }): void
  (e: 'range-start', value: string): void
  (e: 'range-end', value: string): void
}

export interface DssDatePickerSlots {
  /** Slot para conteúdo adicional (ex: botões de ação) */
  default?: () => unknown
}
