// DssExpansionItem — TypeScript interfaces

export type ExpansionItemBrand = 'hub' | 'water' | 'waste'

export interface ExpansionItemProps {
  // Content
  label?: string
  caption?: string
  icon?: string
  expandIcon?: string

  // Behavior
  modelValue?: boolean
  defaultOpened?: boolean
  group?: string
  disable?: boolean

  // Visual
  dense?: boolean
  brand?: ExpansionItemBrand | null

  // Accessibility
  ariaLabel?: string
}

export interface ExpansionItemEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'show'): void
  (e: 'hide'): void
  (e: 'before-show'): void
  (e: 'before-hide'): void
}

export interface ExpansionItemSlots {
  /** Conteúdo do painel expansível (obrigatório para demonstrar propósito) */
  default: () => unknown
  /** Override completo do header — bloqueia props label/caption/icon/expandIcon */
  header?: () => unknown
}
