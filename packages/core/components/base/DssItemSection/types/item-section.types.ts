/**
 * ==========================================================================
 * DssItemSection - TypeScript Types
 * ==========================================================================
 *
 * Tipos e interfaces do componente DssItemSection.
 * Seguem o padrão DSS v2.2 de tipagem explícita e governada.
 */

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssItemSection
 *
 * Nota: DssItemSection não possui props bloqueadas.
 * A API do QItemSection é minimalista e focada exclusivamente em layout,
 * sem divergências arquiteturais que exijam bloqueio.
 */
export interface ItemSectionProps {
  /**
   * Configura a seção como container de avatar.
   * Reduz o espaçamento lateral e alinha para conter DssAvatar ou DssIcon.
   * Sobrescreve o padding-right do Quasar com var(--dss-spacing-3) (EXC-01).
   *
   * @default false
   */
  avatar?: boolean

  /**
   * Configura a seção como container de thumbnail.
   * Min-width herdada do Quasar (.q-item__section--thumbnail) — não gerenciada
   * por tokens DSS. Decisão intencional: override desnecessário para este escopo.
   *
   * @default false
   */
  thumbnail?: boolean

  /**
   * Indica que a seção é secundária (side section).
   * Geralmente alinhada à direita, contendo ações ou meta-informações.
   * Sobrescreve o padding-right do Quasar com var(--dss-spacing-4) (EXC-01).
   *
   * @default false
   */
  side?: boolean

  /**
   * Alinha o conteúdo da seção ao topo do item.
   * Útil em itens com múltiplas linhas de texto onde a seção lateral
   * deve ancorar ao topo em vez de centralizar verticalmente.
   *
   * @default false
   */
  top?: boolean

  /**
   * Impede a quebra de linha do conteúdo interno da seção.
   * O conteúdo é truncado com overflow-hidden quando exceder a largura.
   *
   * @default false
   */
  noWrap?: boolean
}

/**
 * Slots do componente DssItemSection
 */
export interface ItemSectionSlots {
  /**
   * Slot default — conteúdo da seção.
   * Aceita qualquer componente DSS ou elemento HTML.
   * Uso idiomático DSS: DssAvatar, DssIcon, DssItemLabel, DssBadge, DssButton.
   *
   * @example
   * ```vue
   * <!-- Seção de avatar -->
   * <DssItemSection avatar>
   *   <DssAvatar color="primary" icon="person" />
   * </DssItemSection>
   *
   * <!-- Seção principal (texto) -->
   * <DssItemSection>
   *   <DssItemLabel label="Título" caption="Subtítulo" />
   * </DssItemSection>
   *
   * <!-- Seção lateral com ação -->
   * <DssItemSection side>
   *   <DssIcon name="chevron_right" />
   * </DssItemSection>
   * ```
   */
  default(): any
}
