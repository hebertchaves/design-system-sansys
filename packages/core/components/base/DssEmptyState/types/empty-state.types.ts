/**
 * ==========================================================================
 * DssEmptyState TypeScript Definitions
 * ==========================================================================
 *
 * O que a tela mostra quando NÃO há dados.
 *
 * POR QUE ESTE COMPONENTE EXISTE
 * ------------------------------
 * O estado vazio era um vazio nas DUAS pontas do processo: `estado_dado.vazio`
 * aparecia 0 vez em 3 de 3 especificações medidas, e o DSS não tinha peça para
 * respondê-lo — `empty` existia apenas como SLOT do DssVirtualScroll, o que
 * deixava o conteúdo por conta do consumidor e fazia cada tela inventar o seu.
 * Ver `DEBITO_ABERTO.md` e `DSS_JOIN_SPEC_CONTRATO.md`.
 *
 * NÃO é um componente de erro nem de carregamento. Estado vazio significa "a
 * operação funcionou e o resultado é zero" — semântica diferente de "falhou"
 * (use `error` no componente de campo/lista) e de "ainda não sei"
 * (use DssSkeleton ou DssInnerLoading).
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Densidade do bloco.
 *
 * Não é escala tipográfica livre: são três contextos de uso reais.
 */
export type EmptyStateSize =
  /** Dentro de tabela, painel ou lista curta — sem ilustração grande */
  | 'sm'
  /** Padrão: área de conteúdo de uma seção */
  | 'md'
  /** Página inteira vazia (primeiro acesso, busca sem resultado global) */
  | 'lg'

/**
 * Tratamento visual do contêiner.
 */
export type EmptyStateVariant =
  /** Sem moldura — o bloco respira no espaço que já existe (padrão) */
  | 'plain'
  /** Moldura tracejada — delimita a área vazia dentro de card ou painel */
  | 'bordered'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssEmptyState
 *
 * @example
 * ```vue
 * <DssEmptyState
 *   icon="inbox"
 *   title="Nenhuma solicitação encontrada"
 *   description="Ajuste os filtros ou limpe a busca para ver todos os registros."
 * >
 *   <template #action>
 *     <DssButton variant="outline" @click="limparFiltros">Limpar filtros</DssButton>
 *   </template>
 * </DssEmptyState>
 * ```
 */
export interface EmptyStateProps {
  // ========================================
  // Conteúdo
  // ========================================

  /**
   * Nome do ícone (Material Icons), renderizado via DssIcon.
   *
   * Decorativo por definição: a informação está no `title`. Por isso é emitido
   * com `decorative`, e o leitor de tela não o anuncia.
   */
  icon?: string

  /**
   * Frase principal. Diz o que NÃO há, na linguagem do domínio.
   *
   * Escreva o assunto, não o mecanismo: "Nenhuma solicitação encontrada",
   * não "Lista vazia" nem "0 registros".
   */
  title?: string

  /**
   * Explicação secundária: por que está vazio e o que fazer a respeito.
   *
   * Opcional de propósito — estado vazio sem saída é ruído. Se não há ação
   * possível, o `title` sozinho basta.
   */
  description?: string

  // ========================================
  // Visual
  // ========================================

  /** Densidade do bloco */
  size?: EmptyStateSize

  /** Tratamento do contêiner */
  variant?: EmptyStateVariant

  // ========================================
  // Acessibilidade
  // ========================================

  /**
   * Emite `role="status"` + `aria-live="polite"` no elemento raiz.
   *
   * NÃO garante que o leitor de tela anuncie: uma live region só anuncia com
   * confiabilidade quando já existe no DOM antes de o conteúdo mudar, e no uso
   * canônico (`v-if` montando o componente) região e texto entram juntos.
   * Para anúncio confiável, mantenha um contêiner `aria-live` PERSISTENTE em
   * volta da área que troca — ver `DssEmptyState.md` §8.1.
   *
   * Só tem efeito sobre `ariaLabel` quando `true` (§8.2).
   * @default true
   */
  announce?: boolean

  /**
   * Rótulo acessível do bloco, quando o `title` não basta sozinho.
   *
   * Na maioria dos casos é desnecessário — o `title` já é o texto anunciado.
   */
  ariaLabel?: string
}

/**
 * Slots disponíveis no DssEmptyState
 */
export interface EmptyStateSlots {
  /**
   * Ilustração no lugar do ícone.
   *
   * Tem precedência sobre a prop `icon`. Use para SVG de marca ou ilustração
   * própria; o `icon` cobre o caso comum.
   */
  icon?: () => unknown

  /** Frase principal customizada (substitui a prop `title`) */
  title?: () => unknown

  /** Explicação customizada (substitui a prop `description`) */
  description?: () => unknown

  /**
   * Ação que tira o usuário do vazio — normalmente um DssButton.
   *
   * Fica abaixo da descrição, com espaçamento próprio.
   */
  action?: () => unknown

  /** Conteúdo adicional, abaixo da ação */
  default?: () => unknown
}
