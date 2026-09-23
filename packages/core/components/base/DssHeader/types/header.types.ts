// ==========================================================================
// DssHeader — Types
// ==========================================================================

export interface HeaderProps {
  /**
   * Visibilidade do header (v-model).
   *
   * Controla a PRESENÇA da faixa sem desmontar o layout — o conteúdo da página
   * sobe e desce acompanhando. Serve para telas que entram em modo foco
   * (leitura, apresentação, tela cheia).
   *
   * @default true
   */
  modelValue?: boolean

  /**
   * Esconde o header ao rolar para baixo e o traz de volta ao rolar para cima.
   *
   * Padrão consagrado em app bars quando a leitura é longa: devolve altura ao
   * conteúdo sem tirar a navegação do alcance.
   *
   * @default false
   */
  reveal?: boolean

  /**
   * Distância de rolagem (px) antes de o `reveal` começar a agir.
   *
   * Evita que o header pisque em rolagens curtas — só some depois que o usuário
   * já percorreu um trecho real da página.
   *
   * @default 250
   */
  revealOffset?: number

  /** Aplica sombra de elevação (--dss-elevation-2) para destacar o header. */
  elevated?: boolean

  /** Aplica borda inferior sutil em vez de sombra. Alternativa flat ao elevated. */
  bordered?: boolean
}

export interface HeaderEmits {
  /** Emitido quando o header é revelado (`true`) ou escondido (`false`). */
  (e: 'reveal', revealed: boolean): void
  /** v-model da visibilidade. */
  (e: 'update:modelValue', value: boolean): void
}

export interface HeaderSlots {
  /** Conteúdo do header. Deve conter exclusivamente componentes DssToolbar. */
  default(): void
}

/**
 * PROPS DO QHeader FORA DA API DSS
 * ---------------------------------
 *
 * `height-hint` — NÃO exposta. É a altura que o QLayout ASSUME para o header
 * antes de medi-lo (default 50), usada só no primeiro frame e em SSR. No DSS a
 * altura do header é consequência do DssToolbar que vai dentro, e não algo que o
 * consumidor declara — expor a dica abriria uma segunda fonte de verdade para
 * dimensão, contra a Constituição #1.
 *
 * `color` / `text-color` — NÃO expostas (já eram bloqueadas). A faixa é neutra
 * por decisão: quem carrega a marca é o DssToolbar por dentro. Ver
 * `4-output/_brands.scss`.
 */
