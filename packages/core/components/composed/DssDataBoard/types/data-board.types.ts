/**
 * ==========================================================================
 * DssDataBoard — TypeScript Definitions
 * ==========================================================================
 *
 * A faixa de filtro e leitura que vive ACIMA de uma tabela.
 *
 * POR QUE EXISTE: o analista escolhe quais campos de filtro ficam visíveis na
 * tela; os demais vivem atrás de "opções de filtro". O filtro é o núcleo e está
 * SEMPRE presente — KPIs, gráficos e outros painéis são complementos que
 * entram por slot, incrementalmente.
 *
 * O componente não conhece a tabela. Ele declara o vínculo por `controls`
 * (aria-controls) e emite `search`; quem filtra os dados é a página. Acoplar
 * linhas ao componente o tornaria um componente de DADOS, não de UI — e
 * amarraria o board ao `DssTable` para sempre.
 */

import type { ComputedRef, InjectionKey, Ref } from 'vue'

// ==========================================================================
// MARCA
// ==========================================================================

export type DataBoardBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// CAMPOS
// ==========================================================================

/**
 * Um campo de filtro visível no board.
 *
 * É CONFIG, não conteúdo — mesma natureza das `columns` do `DssTable`. O caso
 * comum (um campo de texto rotulado) sai daqui sem marcação nenhuma; o campo
 * que foge do padrão é customizado pelo slot `field-[name]`, que recebe o valor
 * e o atualizador. É o padrão que o `DssTable` já usa com `body-cell-[coluna]`,
 * e evita o anti-padrão do §1.6: conteúdo livre expresso como prop vira
 * reimplementação de slot, mal.
 */
export interface DataBoardField {
  /** Chave no objeto de filtros (`v-model`). Também nomeia o slot `field-*`. */
  name: string

  /**
   * Rótulo visível. Vira a label flutuante do campo e o prefixo do chip do
   * filtro aplicado — por isso é obrigatório: sem ele o chip não teria nome.
   */
  label: string

  /**
   * Tipo do campo nativo quando renderizado pelo board.
   * @default 'text'
   */
  type?: 'text' | 'number' | 'date'

  /**
   * Quantas colunas da grade o campo ocupa.
   * @default 1
   */
  span?: number
}

/** Um filtro aplicado, já resolvido para exibição. */
export interface DataBoardAppliedFilter {
  /** `name` do campo de origem. */
  name: string
  /** Rótulo do campo. */
  label: string
  /** Valor atual, como string. */
  value: string
  /** O que o chip mostra: `label: value`. */
  text: string
}

// ==========================================================================
// PROPS
// ==========================================================================

export interface DataBoardProps {
  /**
   * Estado dos filtros (`v-model`). As chaves são os `name` dos campos.
   *
   * É deste objeto que saem os chips de filtro aplicado — derivados, nunca
   * declarados em paralelo. Uma lista de chips escrita à mão divergiria do
   * estado real no primeiro filtro que alguém removesse pelo teclado.
   */
  modelValue?: Record<string, unknown>

  /** Campos de filtro visíveis. */
  fields?: DataBoardField[]

  /**
   * Board retraído (`v-model:collapsed`).
   *
   * A retração é COORDENADA: o board provê o estado e todo descendente que o
   * injete recolhe junto. É o que nenhum arranjo de peças soltas entrega — o
   * `DssExpansionItem` retrai a si mesmo e não propaga nada.
   * @default false
   */
  collapsed?: boolean

  /**
   * Mostra o gatilho de retrair/expandir.
   * @default true
   */
  collapsible?: boolean

  /**
   * Título da seção de filtro.
   * @default 'Filtros'
   */
  title?: string

  /**
   * `id` do elemento que este board filtra — normalmente a tabela.
   *
   * Emite `aria-controls`. O vínculo é DECLARADO, não executado: o board não
   * toca nos dados, só diz a quem o leitor de tela deve associá-lo.
   */
  controls?: string

  /**
   * Campos em modo compacto (36px em vez de 44px).
   *
   * `false` por padrão, e o default é deliberado: 44px é o mínimo de alvo de
   * toque da WCAG 2.5.5, e o campo não estende área por pseudo-elemento — a
   * caixa visual É o alvo. Densidade é escolha de quem monta a tela, com o
   * custo declarado; um composto que a crava decide pelo consumidor sem avisar.
   *
   * Aplica-se aos campos que o board renderiza; um campo vindo do slot
   * `field-*` recebe o valor no escopo e decide por conta.
   * @default false
   */
  dense?: boolean

  /**
   * Colunas da grade de campos.
   * @default 6
   */
  columns?: number

  /**
   * Rótulo do botão de busca.
   * @default 'Pesquisar'
   */
  searchLabel?: string

  /** Marca aplicada localmente; emite `data-brand` no root. */
  brand?: DataBoardBrand | null

  /**
   * Nome acessível da região.
   * @default 'Filtros e indicadores'
   */
  ariaLabel?: string
}

export interface DataBoardPanelProps {
  /**
   * Colunas da grade que o painel ocupa.
   * @default 2
   */
  span?: number

  /** Título do painel. */
  title?: string
}

// ==========================================================================
// EVENTOS
// ==========================================================================

export interface DataBoardEmits {
  (e: 'update:modelValue', value: Record<string, unknown>): void
  (e: 'update:collapsed', value: boolean): void
  /** Busca pedida — o payload é o estado atual dos filtros. */
  (e: 'search', filters: Record<string, unknown>): void
  /** Um filtro foi removido pelo chip. */
  (e: 'remove-filter', name: string): void
  /** Todos os filtros foram limpos. */
  (e: 'clear'): void
}

// ==========================================================================
// SLOTS
// ==========================================================================

export interface DataBoardSlots {
  /** Ações do cabeçalho (salvar filtro, opções de filtro). */
  actions?: () => unknown
  /** Painéis complementares — KPIs, gráficos. Entram à direita do filtro. */
  panels?: () => unknown
  /**
   * Campo customizado. O nome é derivado: `field-[name]`.
   * Recebe o valor atual e o atualizador.
   */
  [key: `field-${string}`]: (props: {
    field: DataBoardField
    value: unknown
    update: (v: unknown) => void
  }) => unknown
}

export interface DataBoardPanelSlots {
  /** Conteúdo quando o board está expandido. */
  default?: () => unknown
  /**
   * Conteúdo quando o board está RETRAÍDO.
   *
   * Não é o mesmo conteúdo menor: medido no protótipo, o donut de prioridade
   * vira cinco barras e o status perde os rótulos. Quando ausente, o painel
   * inteiro some ao retrair — que é o certo para painel sem resumo útil.
   */
  summary?: () => unknown
}

// ==========================================================================
// CONTEXTO (provide/inject tipado — §1.2 do guia de Fase 3)
// ==========================================================================

/**
 * Estado de retração, provido pelo board e injetável por QUALQUER descendente.
 *
 * `Readonly` de propósito: quem recolhe é o board. Um filho que pudesse
 * escrever aqui criaria dois donos para o mesmo estado — e o segundo venceria
 * por ordem de montagem, não por decisão.
 */
export interface DataBoardContext {
  collapsed: Readonly<Ref<boolean>>
  /** Conveniência para o filho: o oposto, já computado. */
  expanded: ComputedRef<boolean>
}

export const DSS_DATA_BOARD: InjectionKey<DataBoardContext> =
  Symbol('dss-data-board')
