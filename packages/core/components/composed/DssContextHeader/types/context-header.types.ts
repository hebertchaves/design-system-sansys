/**
 * ==========================================================================
 * DssContextHeader — TypeScript Definitions
 * ==========================================================================
 *
 * O cabeçalho de CONTEXTO que acompanha o atendente por toda a jornada.
 *
 * POR QUE EXISTE: durante um atendimento o operador navega por várias telas,
 * e em todas elas precisa saber — sem rolar, sem clicar — QUEM está sendo
 * atendido e QUAL é a situação do registro. O cabeçalho é a única peça que
 * não muda de tela para tela: ele persiste, retrai quando o conteúdo abaixo
 * precisa de espaço, e carrega as ações de sessão (alternar atendimento,
 * iniciar outro).
 *
 * O QUE ELE NÃO É: não é um `DssAppBar` (aquele é a barra do produto, global
 * e fora do fluxo do documento) nem um `DssDataBoard` (aquele filtra uma
 * tabela). Este descreve UM registro e as ações sobre ele.
 */

import type { ComputedRef, InjectionKey, Ref } from 'vue'

// ==========================================================================
// MARCA
// ==========================================================================

export type ContextHeaderBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INFORMAÇÕES
// ==========================================================================

/**
 * Tom semântico do VALOR de uma informação.
 *
 * `warning` NÃO existe de propósito. A regra de a11y declarada em
 * `tokens/globals.scss` é explícita: não há contraste seguro entre o amarelo
 * da paleta e fundo claro — nem `--dss-warning-deep` fecha 4.5:1 (máx. 4,36).
 * Oferecer o tom seria oferecer um valor que reprova a WCAG 1.4.3 em todo
 * tema claro. Quem precisa de "atenção" usa `negative` ou um ícone no slot.
 */
export type ContextHeaderTone = 'neutral' | 'positive' | 'negative' | 'info'

/**
 * Ação de linha — o ícone que aparece à direita de um valor.
 *
 * No protótipo é o "visualizar cliente" ao lado do proprietário e do morador.
 * É sempre opcional: a maioria das linhas é só leitura.
 */
export interface ContextHeaderItemAction {
  /** Nome do ícone Material. */
  icon: string
  /**
   * Nome acessível E texto da dica.
   *
   * Obrigatório porque o botão não tem rótulo visível: sem isto o leitor de
   * tela anuncia "botão" e nada mais.
   */
  label: string
}

/**
 * Uma informação do registro — o par rótulo/valor.
 *
 * É CONFIG, não conteúdo, pela mesma razão das `columns` do `DssTable`: a
 * lista é SERVIDA por atendimento e varia entre clientes (filiais pedem
 * campos diferentes, e dados incompletos fazem o mesmo cliente render listas
 * diferentes em dias diferentes). Uma lista escrita no template teria que ser
 * reescrita por filial.
 *
 * O caso que foge do padrão sai pelo slot `item-[name]`.
 */
export interface ContextHeaderItem {
  /** Chave estável. Nomeia o slot `item-*` e vai no payload de `item-action`. */
  name: string

  /** Rótulo visível, à esquerda. */
  label: string

  /** Valor visível, à direita. */
  value?: string

  /**
   * Tom semântico do valor.
   * @default 'neutral'
   */
  tone?: ContextHeaderTone

  /** Ação à direita do valor (ex.: abrir a ficha do cliente). */
  action?: ContextHeaderItemAction
}

/**
 * Um grupo de informações — uma coluna do cabeçalho.
 *
 * O agrupamento é o que mantém o sentido quando falta dado: sem grupos, um
 * campo ausente faria o primeiro item do assunto seguinte subir para o lugar
 * dele, e o operador leria "Rota de leitura" onde esperava "Endereço".
 */
export interface ContextHeaderGroup {
  /** Chave estável do grupo. */
  name: string

  /**
   * Nome acessível do grupo. Não é desenhado — o protótipo não tem título de
   * coluna —, mas vai no `aria-label` da lista para o leitor de tela saber
   * onde entrou.
   */
  label?: string

  /** As informações da coluna. */
  items: ContextHeaderItem[]

  /**
   * Quantas frações da área de informação o grupo ocupa.
   *
   * Vira `flex-grow`. O grupo que carrega endereço precisa de mais largura que
   * o que carrega "Ativa/Inativa" — sem isto, as três colunas dividem igual e
   * o endereço trunca enquanto sobra espaço ao lado.
   * @default 1
   */
  span?: number
}

// ==========================================================================
// PROPS
// ==========================================================================

export interface ContextHeaderProps {
  /**
   * Identificação do registro em atendimento (matrícula, protocolo, contrato).
   *
   * É o dado que o operador dita ao telefone — por isso vive na coluna de
   * identidade, em destaque, e permanece visível quando o cabeçalho retrai.
   */
  identifier?: string

  /**
   * Nome acessível do identificador, lido ANTES dele.
   *
   * Sem isto o leitor de tela anuncia "652701-9" sem dizer o que é.
   * @default 'Matrícula'
   */
  identifierLabel?: string

  /** Ícone da coluna de identidade. @default 'domain' */
  identityIcon?: string

  /**
   * Quantas informações estão cadastradas no modal de registros.
   *
   * Zero (ou ausente) desenha o badge de ADICIONAR; a partir de 1 o badge vira
   * o CONTADOR. O ícone não muda — só o badge. É o mesmo botão nos dois
   * estados, e isso é deliberado: o destino do clique é sempre o mesmo modal.
   */
  recordsCount?: number

  /**
   * Nome acessível do botão de registros, no estado SEM registros.
   * @default 'Adicionar informações do imóvel'
   */
  recordsAddLabel?: string

  /**
   * Nome acessível do botão de registros, no estado COM registros.
   * Recebe a contagem por interpolação de `{n}`.
   * @default 'Ver {n} informações do imóvel'
   */
  recordsLabel?: string

  /**
   * Rótulo do botão de detalhes.
   *
   * O DSS aplica `text-transform: uppercase` em controle por token
   * (`--dss-text-transform-control`), então "Detalhes" é desenhado "DETALHES".
   * Não escreva o rótulo já em caixa alta: o leitor de tela soletraria.
   * @default 'Detalhes'
   */
  detailsLabel?: string

  /** Ícone do botão de detalhes. @default 'add' */
  detailsIcon?: string

  /** Dica do botão de detalhes. @default 'Ver detalhes do cadastro' */
  detailsTooltip?: string

  /** As informações do registro, agrupadas em colunas. */
  groups?: ContextHeaderGroup[]

  /**
   * Quais informações continuam visíveis quando o cabeçalho RETRAI.
   *
   * Lista de `name`s. Vazia, caem as duas primeiras informações na ordem do
   * documento — default honesto mas raramente o certo: quem monta a tela sabe
   * quais duas linhas o operador precisa ver o tempo todo, e isso muda por
   * filial. O protótipo mantém morador e endereço.
   */
  summary?: string[]

  /**
   * Cabeçalho retraído (`v-model:collapsed`).
   *
   * A retração é COORDENADA: o cabeçalho provê o estado e todo descendente que
   * o injete recolhe junto — inclusive o que vier por slot.
   * @default false
   */
  collapsed?: boolean

  /** Mostra o gatilho de retrair/expandir. @default true */
  collapsible?: boolean

  /**
   * Quantos atendimentos estão em aberto — badge do botão de alternar.
   *
   * Ausente ou zero: sem badge. Não esconde o botão: alternar continua sendo
   * possível, e esconder a ação faria a barra mudar de forma entre telas.
   */
  openCount?: number

  /** Mostra o botão de alternar atendimento. @default true */
  switchable?: boolean

  /** Mostra o botão de iniciar novo atendimento. @default true */
  creatable?: boolean

  /** Ícone do botão de alternar. @default 'switch_account' */
  switchIcon?: string

  /** Dica do botão de alternar. @default 'Alterar atendimento' */
  switchLabel?: string

  /** Ícone do botão de novo atendimento. @default 'add' */
  createIcon?: string

  /** Dica do botão de novo atendimento. @default 'Iniciar novo atendimento' */
  createLabel?: string

  /** Dica do gatilho quando EXPANDIDO. @default 'Minimizar cabeçalho' */
  collapseLabel?: string

  /** Dica do gatilho quando RETRAÍDO. @default 'Maximizar cabeçalho' */
  expandLabel?: string

  /** Marca aplicada localmente; emite `data-brand` no root. */
  brand?: ContextHeaderBrand | null

  /** Nome acessível da região. @default 'Contexto do atendimento' */
  ariaLabel?: string
}

// ==========================================================================
// EVENTOS
// ==========================================================================

export interface ContextHeaderEmits {
  (e: 'update:collapsed', value: boolean): void
  /** O botão de identidade (ícone + badge) foi acionado. */
  (e: 'open-records'): void
  /** O botão de detalhes foi acionado. */
  (e: 'open-details'): void
  /** Alternar entre atendimentos em aberto. */
  (e: 'switch'): void
  /** Iniciar um novo atendimento. */
  (e: 'create'): void
  /** A ação de uma linha foi acionada; o payload é o `name` da informação. */
  (e: 'item-action', name: string): void
}

// ==========================================================================
// SLOTS
// ==========================================================================

export interface ContextHeaderSlots {
  /** Conteúdo da coluna de identidade, no lugar do identificador. */
  identity?: () => unknown
  /**
   * Valor customizado de uma informação. O nome é derivado: `item-[name]`.
   * Recebe a informação e o estado de retração.
   */
  [key: `item-${string}`]: (props: {
    item: ContextHeaderItem
    collapsed: boolean
  }) => unknown
}

// ==========================================================================
// CONTEXTO (provide/inject tipado — §1.2 do guia de Fase 3)
// ==========================================================================

/**
 * Estado de retração, provido pelo cabeçalho e injetável por QUALQUER
 * descendente.
 *
 * `Readonly` de propósito: quem recolhe é o cabeçalho. Um filho que pudesse
 * escrever aqui criaria dois donos para o mesmo estado.
 */
export interface ContextHeaderContext {
  collapsed: Readonly<Ref<boolean>>
  expanded: ComputedRef<boolean>
}

export const DSS_CONTEXT_HEADER: InjectionKey<ContextHeaderContext> =
  Symbol('dss-context-header')
