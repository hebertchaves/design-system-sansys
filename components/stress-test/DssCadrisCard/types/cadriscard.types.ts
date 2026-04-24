/**
 * ==========================================================================
 * DssCadrisCard — TypeScript Interfaces
 * ==========================================================================
 *
 * Componente composto Fase 3 — interface de pesquisa e listagem de Cadris.
 * Orquestra: DssCard + DssToolbar + DssInput + DssSelect + DssButton + Table + Paginação.
 *
 * @version 1.0.0
 * @phase 3
 */

// ==========================================================================
// TIPOS DE SUPORTE
// ==========================================================================

export type CadrisSituacao = 'ativo' | 'inativo'

export interface CadrisRow {
  /** Identificador único */
  id: string | number
  /** Número do Cadri */
  numeroCadri: string
  /** Nome do gerador */
  gerador: string
  /** Nome do aterro */
  aterro: string
  /** Tipo de documento */
  documento: string
  /** Situação do Cadri */
  situacao: CadrisSituacao
  /** Data de validade (ISO 8601 ou string formatada) */
  validade: string
}

export interface CadrisPagination {
  /** Página atual (1-based) */
  page: number
  /** Registros por página */
  rowsPerPage: number
  /** Total de registros (para calcular totalPages) */
  rowsNumber: number
}

export interface CadrisFilters {
  cadri: string
  gerador: string
  documento: string | null
  aterro: string | null
}

export interface SelectOption {
  label: string
  value: string
}

// ==========================================================================
// PROPS
// ==========================================================================

export interface DssCadrisCardProps {
  /**
   * Linhas de dados exibidas na tabela.
   * Array vazio → exibe estado vazio.
   * @default []
   */
  rows?: CadrisRow[]

  /**
   * Ativa estado de carregamento.
   * Exibe skeleton na tabela e loading no botão Pesquisar.
   * @default false
   */
  loading?: boolean

  /**
   * Objeto de paginação atual.
   * Compatível com v-model:pagination.
   * Quando ausente, a paginação não é exibida.
   */
  pagination?: CadrisPagination

  /**
   * Desabilita toda interação do componente.
   * Propagado via provide/inject para botões internos.
   * @default false
   */
  disable?: boolean

  /**
   * Opções do select "Documento".
   * @default []
   */
  documentoOptions?: SelectOption[]

  /**
   * Opções do select "Aterro".
   * @default []
   */
  aterroOptions?: SelectOption[]
}

// ==========================================================================
// EMITS
// ==========================================================================

export interface DssCadrisCardEmits {
  /**
   * Emitido ao clicar em "Pesquisar".
   * Passa os filtros atuais preenchidos pelo usuário.
   */
  (e: 'search', filters: CadrisFilters): void

  /**
   * Emitido ao clicar em "FECHAR".
   * O componente pai é responsável por ocultar/destruir o card.
   */
  (e: 'close'): void

  /**
   * Emitido ao navegar entre páginas.
   * Compatível com v-model:pagination.
   */
  (e: 'update:pagination', pagination: CadrisPagination): void
}

// ==========================================================================
// SLOTS
// ==========================================================================

export interface DssCadrisCardSlots {
  /**
   * Slot para ações adicionais na toolbar (lado direito, antes do botão fechar).
   */
  'toolbar-actions'(): unknown
}
