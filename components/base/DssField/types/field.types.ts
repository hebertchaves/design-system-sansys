export type FieldVariant = 'outlined' | 'filled' | 'borderless' | 'standout'
export type FieldSize = 'sm' | 'md'
export type FieldBrand = 'hub' | 'water' | 'waste'

export interface FieldProps {
  // Visual
  variant?: FieldVariant
  size?: FieldSize
  brand?: FieldBrand

  // Label
  label?: string
  stackLabel?: boolean
  /** Sinaliza externamente que o controle interno possui valor (mantém label flutuante) */
  hasValue?: boolean

  // Bottom area
  hint?: string
  error?: boolean
  errorMessage?: string

  // Inline decorations
  prefix?: string
  suffix?: string

  // States
  disable?: boolean
  readonly?: boolean
  loading?: boolean

  // Accessibility
  /** ID do controle interno — para associação label[for]. Auto-gerado se omitido. */
  fieldId?: string
}

// DssField não emite eventos — é um container estrutural passivo.
export interface FieldEmits {
  // vazio intencional: DssField não captura estado dos filhos
}

export interface FieldSlots {
  /** Controle principal. Recebe { fieldId, ariaDescribedby } para associação ARIA completa.
   *  Exemplo: <template #default="{ fieldId, ariaDescribedby }">
   *             <input :id="fieldId" :aria-describedby="ariaDescribedby" />
   *           </template>
   */
  default: (scope: { fieldId: string; ariaDescribedby?: string }) => unknown
  /** Conteúdo antes da área de campo (ícone, botão) — dentro da borda */
  prepend?: () => unknown
  /** Conteúdo após a área de campo (ícone, botão) — dentro da borda */
  append?: () => unknown
  /** Conteúdo antes de toda a estrutura do campo — fora da borda */
  before?: () => unknown
  /** Conteúdo após toda a estrutura do campo — fora da borda */
  after?: () => unknown
  /** Label personalizado (substitui a prop `label`) */
  label?: () => unknown
  /** Texto de dica personalizado (substitui a prop `hint`) */
  hint?: () => unknown
  /** Mensagem de erro personalizada (substitui a prop `errorMessage`) */
  error?: () => unknown
}
