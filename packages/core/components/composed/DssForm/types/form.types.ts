// ==========================================================================
// DssForm — TypeScript Interfaces
// ==========================================================================

import type { Component } from 'vue'

/**
 * Props do DssForm.
 *
 * Subconjunto governado da API do QForm — apenas props que fazem sentido
 * em nível de container de formulário. Props de controle visual (dark, square)
 * são bloqueadas: escuridão governada globalmente via [data-theme="dark"].
 */
export interface DssFormProps {
  /** Foca automaticamente o primeiro campo do formulário na montagem. */
  autofocus?: boolean

  /**
   * Valida todos os campos, mesmo após encontrar o primeiro inválido.
   * Por padrão, a validação para no primeiro campo com erro.
   */
  greedy?: boolean

  /**
   * Desabilita o comportamento padrão de mover o foco para o campo
   * com erro após falha de validação.
   */
  noErrorFocus?: boolean
}

/**
 * Emits do DssForm.
 *
 * Mapeados diretamente dos eventos do QForm, com nomes camelCase
 * seguindo a convenção DSS (snake-case Quasar → camelCase DSS).
 */
export interface DssFormEmits {
  /** Disparado quando o formulário é submetido e a validação é bem-sucedida. */
  (e: 'submit', event: SubmitEvent): void

  /** Disparado quando o formulário é resetado. O QForm não fornece payload. */
  (e: 'reset'): void

  /**
   * Disparado quando a validação falha.
   * O QForm fornece apenas a referência do primeiro componente inválido
   * (`ref: Component`) — não há tabIndex/index no payload do Quasar.
   * @param ref - Instância do componente de campo inválido
   */
  (e: 'validationError', ref: Component): void

  /** Disparado quando todos os campos passam na validação. */
  (e: 'validationSuccess'): void
}

/**
 * Slots do DssForm.
 *
 * DssForm fornece apenas o slot default — conteúdo do formulário
 * (DssInput, DssSelect, DssButton, etc.) é responsabilidade do consumidor.
 */
export interface DssFormSlots {
  /** Campos e controles do formulário — responsabilidade do consumidor. */
  default(): unknown
}

/**
 * Interface mínima do QForm exposta via ref para operações imperativas.
 * Usada internamente para type-safety do qFormRef.
 */
export interface QFormInstance {
  /**
   * Valida todos os campos do formulário.
   * @param shouldFocus - Se deve focar o primeiro campo com erro (padrão: true)
   * @returns Promise que resolve para true se válido, false se inválido
   */
  validate(shouldFocus?: boolean): Promise<boolean>

  /** Reseta apenas o estado de validação (erros exibidos), sem alterar os valores. */
  resetValidation(): void

  /** Dispara a submissão do formulário programaticamente. */
  submit(event?: Event): void

  /** Reseta valores e estado de validação para o estado inicial. */
  reset(): void
}
