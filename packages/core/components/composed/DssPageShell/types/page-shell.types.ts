/**
 * ==========================================================================
 * DssPageShell — TypeScript Definitions
 * ==========================================================================
 */

export interface PageShellProps {
  /**
   * Envolve o conteúdo na SUPERFÍCIE do board — o cartão branco sobre o fundo
   * rebaixado da página.
   *
   * É o arranjo padrão das telas Sansys. `false` entrega a coluna de conteúdo
   * nua, para a tela que monta a própria superfície.
   * @default true
   */
  board?: boolean

  /**
   * Nome acessível do rail.
   *
   * Obrigatório quando há rail: é um `<nav>`, e dois `<nav>` sem nome na mesma
   * página são indistinguíveis no leitor de tela — o da trilha e o dos módulos
   * viram "navegação" e "navegação".
   * @default 'Módulos do sistema'
   */
  railAriaLabel?: string
}

export interface PageShellSlots {
  /** Itens do rail. Use `DssPageShellRailItem`. */
  rail?: () => unknown
  /** Trilha de navegação. Use `DssBreadcrumbs`. */
  breadcrumb?: () => unknown
  /** Conteúdo da página — o board. */
  default?: () => unknown
}

export interface PageShellRailItemProps {
  /** Ícone do módulo. */
  icon: string

  /**
   * Nome do módulo.
   *
   * É o nome ACESSÍVEL do item — o rail só mostra ícones, e ícone sem nome não
   * existe para quem usa leitor de tela. Vai também para o `title`, que é a
   * dica de quem usa mouse.
   */
  label: string

  /**
   * Item do módulo atual.
   *
   * Pinta o item E marca `aria-current="page"` — o estado visual sozinho
   * deixaria quem usa leitor de tela sem saber onde está.
   * @default false
   */
  active?: boolean

  /** Desabilita o item. */
  disabled?: boolean
}

export interface PageShellRailItemEmits {
  (e: 'click', event: MouseEvent): void
}
