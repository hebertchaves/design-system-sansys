/**
 * ==========================================================================
 * DssSectionTitle — TypeScript Definitions
 * ==========================================================================
 */

/**
 * Nível semântico do cabeçalho — vira a TAG (`<h1>`…`<h4>`).
 *
 * Separado de `size` de propósito: nível é ESTRUTURA do documento, tamanho é
 * APARÊNCIA. Um `<h3>` pode precisar parecer grande e um `<h1>` pequeno, e
 * forçar os dois a andarem juntos empurra quem monta a tela a escolher a tag
 * errada para conseguir o tamanho certo — que é como se quebra a navegação por
 * cabeçalhos (WCAG 1.3.1 e 2.4.6).
 */
export type SectionTitleLevel = 1 | 2 | 3 | 4

/** Tamanho visual do título. */
export type SectionTitleSize = 'sm' | 'md' | 'lg'

/**
 * Cor do traço.
 *
 * `brand` é o padrão e consome `--dss-action-primary` — logo acompanha a marca
 * da página sem ninguém passar nada.
 *
 * As demais são a exceção nomeada: seção que fala de um estado (um bloco de
 * alerta, um resultado reprovado) pode querer o traço na cor desse estado.
 * Elas NÃO são brandeáveis — erro é vermelho em Water, Hub e Waste.
 */
export type SectionTitleAccent = 'brand' | 'info' | 'success' | 'warning' | 'error'

export interface SectionTitleProps {
  /** Texto do título. Ignorado quando o slot default é fornecido. */
  label?: string

  /**
   * Nível semântico do cabeçalho.
   * @default 2
   */
  level?: SectionTitleLevel

  /**
   * Tamanho visual, independente do nível.
   * @default 'md'
   */
  size?: SectionTitleSize

  /**
   * Cor do traço.
   * @default 'brand'
   */
  accent?: SectionTitleAccent

  /**
   * Marca aplicada localmente.
   *
   * Remapeia `--dss-action-primary` no escopo do título — não pinta o traço
   * direto (§K5 do checklist de adequação). Desnecessário quando a página já
   * declara `[data-brand]`, que é o caso normal.
   */
  brand?: 'hub' | 'water' | 'waste'
}

export interface SectionTitleSlots {
  /** Conteúdo do título. Tem precedência sobre `label`. */
  default?: () => unknown
}
