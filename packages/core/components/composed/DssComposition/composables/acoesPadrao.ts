import type { DssCompositionAction } from '../types/composition.types'

/**
 * Ações padrão da composição. Vivem num módulo próprio porque o `withDefaults`
 * é içado para fora do `setup()` e não pode referenciar constantes locais do
 * `<script setup>` — e um literal dentro dele alargaria `intent` para `string`.
 * Nunca são mutadas: a composição só lê as listas de ações.
 */
export const ACOES_DA_BARRA_PADRAO: DssCompositionAction[] = [
  { name: 'add', label: 'Incluir', icon: 'add', intent: 'add' },
]

export const ACOES_DE_LINHA_PADRAO: DssCompositionAction[] = [
  { name: 'edit', label: 'Editar', icon: 'edit', intent: 'edit' },
  { name: 'remove', label: 'Excluir', icon: 'delete', intent: 'remove', color: 'negative' },
]
