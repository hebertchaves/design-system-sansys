/**
 * ==========================================================================
 * DssStep — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssStep.
 * Passo individual de navegação em stepper — wrapper DSS sobre QStep.
 *
 * @version 1.0.0
 */

// ==========================================================================
// PROPS
// ==========================================================================

/**
 * Props do DssStep.
 *
 * A API expõe seletivamente as props do QStep, bloqueando aquelas
 * governadas pelo sistema de tokens e brandabilidade DSS.
 *
 * Props bloqueadas:
 * - color / active-color / done-color / error-color: governados por tokens DSS
 * - prefix: DSS usa apenas números ou ícones no dot, não prefixos textuais
 */
export interface StepProps {
  /**
   * Identificador único do passo.
   * Obrigatório para o v-model do DssStepper/QStepper pai.
   */
  name: string | number

  /**
   * Título principal do passo.
   */
  title?: string

  /**
   * Texto secundário exibido abaixo do título.
   */
  caption?: string

  /**
   * Ícone customizado (Material Icons name).
   * Quando fornecido, substitui o número padrão no dot.
   */
  icon?: string

  /**
   * Ícone exibido quando o passo está ativo.
   * Substitui o ícone padrão ou número durante o estado ativo.
   */
  activeIcon?: string

  /**
   * Ícone exibido quando o passo está concluído (done=true).
   * Padrão Quasar: 'check' quando não especificado.
   */
  doneIcon?: string

  /**
   * Ícone exibido quando o passo tem erro (error=true).
   * Padrão Quasar: 'warning' quando não especificado.
   */
  errorIcon?: string

  /**
   * Marca o passo como concluído.
   * Aplica dot com cor de sucesso e ícone de conclusão.
   */
  done?: boolean

  /**
   * Marca o passo com estado de erro.
   * Aplica dot com cor de erro e ícone de alerta.
   */
  error?: boolean

  /**
   * Desabilita a interação com o passo.
   * Aplica opacidade reduzida e cursor not-allowed na área do cabeçalho.
   */
  disable?: boolean

  /**
   * Permite que o cabeçalho do passo seja clicável para navegação direta.
   * Funciona apenas quando o stepper pai permite navegação livre (não linear).
   */
  headerNav?: boolean
}

// ==========================================================================
// SLOTS
// ==========================================================================

/**
 * Slots disponíveis no DssStep.
 */
export interface StepSlots {
  /**
   * Conteúdo do passo.
   * Exibido na área de conteúdo expandida quando o passo está ativo.
   * Aceita qualquer componente DSS.
   */
  default(): unknown
}
