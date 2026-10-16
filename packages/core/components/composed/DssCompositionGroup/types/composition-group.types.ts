/**
 * ==========================================================================
 * DssCompositionGroup — TypeScript Definitions
 * ==========================================================================
 *
 * Migração do `JtCompositions`. O grupo NÃO valida nada: cada
 * `DssComposition` é um campo registrado no `DssForm` mestre. O grupo só
 * mostra, na aba, qual coleção está inválida.
 */

import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { DssDataTableCcBrand } from '../../DssDataTableClaudeCode/types/data-table-claude-code.types'

export interface DssCompositionGroupProps {
  /** Nome da aba ativa (v-model opcional). Ausente, abre a primeira. */
  modelValue?: string | null
  /** Nome da lista de abas. @default 'Coleções do cadastro' */
  ariaLabel?: string
  /** Abas compactas. @default true */
  dense?: boolean
  brand?: DssDataTableCcBrand | null
}

export interface DssCompositionGroupEmits {
  (e: 'update:modelValue', value: string): void
}

export interface DssCompositionGroupSlots {
  /** Somente `DssComposition`, cada uma com `name`. */
  default?: () => unknown
}

/** O que cada `DssComposition` informa ao grupo. */
export interface DssCompositionGroupItem {
  name: string
  label: string
  count: number
  required: boolean
  invalid: boolean
}

export interface DssCompositionGroupContext {
  /** Registra a coleção; devolve a função que a remove. */
  register: (item: ComputedRef<DssCompositionGroupItem>) => () => void
  active: Ref<string | null>
  tabId: (name: string) => string
  panelId: (name: string) => string
}

export const DSS_COMPOSITION_GROUP_KEY = Symbol('dss-composition-group') as InjectionKey<DssCompositionGroupContext>
