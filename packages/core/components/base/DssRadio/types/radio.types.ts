/**
 * DssRadio — Types
 * Design System Sansys v2.2
 *
 * Classificacao: Compact Control interativo
 * Golden Context: DssCheckbox
 *
 * Subset controlado da API do Quasar q-radio.
 * Este componente NAO replica a API completa do q-radio.
 */

import type { DssFieldRule, DssLazyRules } from '../../../../composables/useFieldValidation'

// ==========================================================================
// TIPOS DE VALIDACAO — declarados ESTRUTURALMENTE de proposito
// ==========================================================================
//
// O compilador de `<script setup>` deriva os props de RUNTIME do tipo. Alias
// importado de OUTRO arquivo dentro do tipo de um prop faz o prop sumir da
// lista compilada, em silencio (medido no DssInput, set/2026). A forma abaixo
// e estrutural; a trava logo adiante impede divergencia com o canonico.

/** Regra de validacao do DssRadio. Forma canonica: `DssFieldRule`. */
export type RadioRule = (
  val: unknown,
) => boolean | string | void | Promise<boolean | string | void>

/** Momento em que as regras rodam sozinhas. Forma canonica: `DssLazyRules`. */
export type RadioLazyRules = boolean | 'ondemand'

type _ParidadeRegra = RadioRule extends DssFieldRule<unknown> ? true : never
type _ParidadeLazy = RadioLazyRules extends DssLazyRules ? true : never
const _paridade: [_ParidadeRegra, _ParidadeLazy] = [true, true]
void _paridade

// ---------------------------------------------------------------------------
// Cores semanticas (governadas pelo DSS)
// ---------------------------------------------------------------------------
export type RadioColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

// ---------------------------------------------------------------------------
// Tamanhos (5 niveis com suporte a token)
//
// Uniao literal, NAO string: px arbitrario e rejeitado POR TIPO. Precedente da
// familia de controles de selecao, firmado no DssCheckbox — o consumidor que
// precisa de outra dimensao pede token, nao passa numero.
// ---------------------------------------------------------------------------
export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// ---------------------------------------------------------------------------
// Brands Sansys
// ---------------------------------------------------------------------------
export type RadioBrand = 'hub' | 'water' | 'waste'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface RadioProps {
  /** Valor atual do grupo (v-model) */
  modelValue?: any

  /** Valor que este radio representa */
  val?: any

  /** Nome do grupo (agrupa radios nativamente) */
  name?: string

  /** Texto do label */
  label?: string

  /** Posicionar label a esquerda do controle */
  leftLabel?: boolean

  /** Cor semantica do indicador */
  color?: RadioColor

  /** Tamanho do controle */
  size?: RadioSize

  /**
   * Escape hatch de cor: mantem a cor (semantica/brand) no stroke tambem no
   * estado DESMARCADO. Por padrao (false) o stroke em repouso e cinza e a cor
   * so aparece na selecao (convencao M3/Carbon/Lightning). Opt-in, espelha o
   * `keep-color` do q-radio. A cor de brand como borda fina DEVE bater 3:1
   * (WCAG 1.4.11) por brand x tema.
   *
   * @default false
   */
  keepColor?: boolean

  /**
   * Nome do glifo exibido no estado CHECKED, composto via DssIcon (CCI §7).
   *
   * SEM default de propósito: o indicador padrao do radio e o PONTO preenchido
   * (`.dss-radio__dot`), nao um glifo — e a convencao da plataforma para escolha
   * unica. Informar `checkedIcon` TROCA o ponto pelo glifo; omitir preserva o
   * ponto. Aditivo, sem mudar o visual de quem nao pede.
   *
   * Nao existe `indeterminateIcon`: radio nao tem estado indeterminado (o
   * proprio q-radio do Quasar tambem nao o oferece). Tambem nao existe
   * `uncheckedIcon` — o estado desmarcado permanece vazio, como no DssCheckbox.
   */
  checkedIcon?: string

  /** Estado desabilitado */
  /**
   * Regras de validacao do campo.
   *
   * Declarar `rules` REGISTRA o campo no `DssForm` ancestral — a partir dai ele
   * entra no `validate()` e no `submit()` do formulario.
   */
  rules?: RadioRule[]

  /**
   * Quando as regras rodam sozinhas.
   * - `false` (padrao) — a cada mudanca do valor, depois da primeira interacao
   * - `true` — apenas ao perder o foco
   * - `'ondemand'` — so via `validate()`
   * @default false
   */
  lazyRules?: RadioLazyRules

  disable?: boolean

  /** Modo compacto: reduz gap, altura e tamanho da fonte, e remove touch target expandido */
  dense?: boolean

  /** Estado de erro (validacao de formulario) */
  error?: boolean

  /** Mensagem de erro */
  errorMessage?: string

  /** Brand Sansys */
  brand?: RadioBrand | null

  /** Indice de tabulacao */
  tabindex?: number | string | null

  /** Label acessivel (quando label visual nao e suficiente) */
  ariaLabel?: string
}

// ---------------------------------------------------------------------------
// Emits
// ---------------------------------------------------------------------------
export interface RadioEmits {
  (e: 'update:modelValue', value: any): void
}

// ---------------------------------------------------------------------------
// Slots
// ---------------------------------------------------------------------------
export interface RadioSlots {
  /** Conteudo customizado do label */
  default(): any
}
