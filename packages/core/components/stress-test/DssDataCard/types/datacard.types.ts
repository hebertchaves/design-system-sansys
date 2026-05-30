/**
 * ==========================================================================
 * DssDataCard — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssDataCard.
 * Componente stress test da Fase 3 — composição profunda de:
 * DssCard + DssToolbar + DssTabs + DssTabPanels + paginação interna.
 *
 * @version 1.0.0
 * @stress-test true — Componente criado para revelar gargalos de aninhamento
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Marcas do sistema Sansys
 */
export type DataCardBrand = 'hub' | 'water' | 'waste'

/**
 * Variante visual do card container
 */
export type DataCardVariant = 'elevated' | 'flat' | 'bordered' | 'outlined'

/**
 * Configuração de uma aba de dados
 */
export interface DataCardTab {
  /** Identificador único da aba — usado como v-model do DssTabs */
  name: string
  /** Label exibida na aba */
  label: string
  /** Ícone opcional (Material Icons) */
  icon?: string
  /** Desabilita a aba */
  disabled?: boolean
}

/**
 * Item de dado exibido em uma linha da tabela interna
 */
export interface DataCardRow {
  /** Identificador único da linha */
  id: string | number
  /** Dados da linha — chave/valor livre */
  [key: string]: unknown
}

// ==========================================================================
// INTERFACES — DssDataCard
// ==========================================================================

/**
 * Props do componente DssDataCard.
 *
 * Props bloqueadas (não expostas ao consumidor):
 * - dark: DSS governa dark mode via CSS global
 * - flat/square no DssCard: controlado pela prop `variant`
 *
 * Decisões arquiteturais:
 * - `brand` propaga via CSS Variable (--dss-data-card-brand-context) para
 *   DssToolbar e DssTabs filhos, sem prop drilling manual
 * - `disabled` usa provide/inject para atingir botões de paginação internos
 */
export interface DataCardProps {
  /**
   * Título exibido na DssToolbar interna.
   */
  title?: string

  /**
   * Subtítulo exibido abaixo do título na toolbar.
   */
  subtitle?: string

  /**
   * Variante visual do DssCard container.
   * @default 'elevated'
   */
  variant?: DataCardVariant

  /**
   * Marca Sansys — propaga para DssToolbar e DssTabs via CSS Variable.
   * Não usa prop drilling manual.
   * @default null
   */
  brand?: DataCardBrand | null

  /**
   * Lista de abas a renderizar.
   * Cada aba corresponde a um slot nomeado `tab-{name}`.
   */
  tabs?: DataCardTab[]

  /**
   * Total de itens para cálculo da paginação.
   * Quando 0 ou undefined, a paginação não é exibida.
   * @default 0
   */
  totalItems?: number

  /**
   * Itens por página.
   * @default 10
   */
  itemsPerPage?: number

  /**
   * Página atual (v-model).
   * @default 1
   */
  modelValue?: number

  /**
   * Desabilita toda interação (abas, paginação, ações da toolbar).
   * Usa provide/inject internamente — não requer prop drilling.
   * @default false
   */
  disabled?: boolean

  /**
   * Exibe skeleton loader no lugar do conteúdo.
   * @default false
   */
  loading?: boolean

  /**
   * Label acessível para o grupo de abas (aria-label do DssTabs interno).
   */
  tabsAriaLabel?: string
}

// ==========================================================================
// EMITS
// ==========================================================================

export interface DataCardEmits {
  /** Emitido quando a página muda. Compatível com v-model. */
  (e: 'update:modelValue', page: number): void
  /** Emitido quando a aba ativa muda. */
  (e: 'tab-change', tabName: string | number): void
  /** Emitido quando o botão de refresh da toolbar é clicado. */
  (e: 'refresh'): void
}

// ==========================================================================
// SLOTS
// ==========================================================================

export interface DataCardSlots {
  /**
   * Slot de ações adicionais na DssToolbar (lado direito, após o botão refresh).
   * Aceita: DssButton (flat/ghost), DssIcon.
   */
  'toolbar-actions'(): unknown

  /**
   * Slot de conteúdo para cada aba.
   * Nomeado dinamicamente: `tab-{name}` onde `name` é o DataCardTab.name.
   * Exemplo: <template #tab-resumo>...</template>
   */
  [key: `tab-${string}`]: () => unknown

  /**
   * Slot de fallback quando não há abas configuradas.
   * Renderizado diretamente no DssCardSection.
   */
  default(): unknown

  /**
   * Slot para área de rodapé, abaixo da paginação.
   */
  footer(): unknown
}
