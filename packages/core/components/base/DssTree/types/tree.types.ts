// DssTree — TypeScript Interfaces

export type DssTreeTickStrategy = 'none' | 'strict' | 'leaf' | 'leaf-filtered'

export interface DssTreeNode {
  /** Valor único do nó (mapeado por node-key) */
  [key: string]: unknown
  /** Label exibido (mapeado por label-key) */
  label?: string
  /** Filhos do nó (mapeado por children-key) */
  children?: DssTreeNode[]
  /** Nó está desabilitado */
  disabled?: boolean
  /** Nó tem lazy loading de filhos */
  lazy?: boolean
  /** Ícone do nó */
  icon?: string
  /** Ícone expandido */
  expandedIcon?: string
  /** Ícone colapsado */
  collapsedIcon?: string
  /** Nó não pode ser marcado (tick) */
  noTick?: boolean
  /** Corpo abaixo do label (slot body) */
  body?: string
  /** Cabeçalho custom (slot header) */
  header?: string
}

export interface DssTreeLazyLoadDetails {
  node: DssTreeNode
  key: string
  done: (children?: DssTreeNode[]) => void
  fail: () => void
}

export interface DssTreeProps {
  /** Dados hierárquicos da árvore (obrigatório) */
  nodes: DssTreeNode[]
  /** Campo identificador único de cada nó */
  nodeKey?: string
  /** Campo do texto exibido de cada nó */
  labelKey?: string
  /** Campo dos filhos de cada nó */
  childrenKey?: string
  /**
   * Nó selecionado (v-model:selected).
   * String = seleção simples; null = nenhum selecionado.
   */
  selected?: string | null
  /**
   * Nós expandidos (v-model:expanded).
   * Array de chaves dos nós abertos.
   */
  expanded?: string[]
  /**
   * Nós marcados/checked (v-model:ticked).
   * Requer tick-strategy diferente de 'none'.
   */
  ticked?: string[]
  /** Modo acordeão: apenas um nó de cada nível expandido por vez */
  accordion?: boolean
  /** Oculta as linhas de conexão entre nós */
  noConnectors?: boolean
  /** Expande todos os nós ao montar o componente */
  defaultExpandAll?: boolean
  /** String de filtro para busca client-side */
  filter?: string
  /** Função customizada de filtro */
  filterMethod?: (node: DssTreeNode, filter: string, update: (fn: () => void) => void) => boolean
  /** Estratégia de seleção via checkbox */
  tickStrategy?: DssTreeTickStrategy
  /** Mensagem quando não há nós */
  noNodesLabel?: string
  /** Mensagem quando filtro não retorna resultados */
  noResultsLabel?: string
  /** Tamanho dos ícones de expansão */
  iconSize?: string
  /** Modo compacto (equivale ao dense do Quasar) */
  dense?: boolean
  // BLOQUEADAS: dark (→ [data-theme='dark']), color, controlColor, textColor, selectedColor
}

export interface DssTreeEmits {
  /** Nó selecionado mudou */
  (e: 'update:selected', value: string | null): void
  /** Nós expandidos mudaram */
  (e: 'update:expanded', value: string[]): void
  /** Nós marcados mudaram */
  (e: 'update:ticked', value: string[]): void
  /** Evento de lazy loading — preencher filhos assíncronos */
  (e: 'lazy-load', details: DssTreeLazyLoadDetails): void
  /** Nó terminou de expandir (animação concluída). QTree não fornece payload. */
  (e: 'after-show'): void
  /** Nó terminou de colapsar (animação concluída). QTree não fornece payload. */
  (e: 'after-hide'): void
}
