/**
 * ==========================================================================
 * useFieldValidation - Global Composable
 * ==========================================================================
 *
 * Liga um campo DSS de CONSTRUÇÃO EXPLÍCITA ao motor de validação do QForm.
 *
 * ── Por que existe ────────────────────────────────────────────────────────
 *
 * O `DssForm` delega a validação ao QForm, e o QForm só valida os componentes
 * que se REGISTRAM nele. Os campos do DSS não são todos wrappers de Quasar:
 * `DssSelect` (QSelect), `DssTextarea` (QInput) e `DssFile` (QFile) se
 * registram sozinhos, mas `DssInput`, `DssCheckbox`, `DssToggle`, `DssRadio` e
 * `DssField` renderizam `<input>` nativo e não se registravam.
 *
 * O efeito medido (set/2026) era o pior possível: `DssForm.validate()`
 * respondia **`true`** para um campo com regra que sempre reprova. Não era
 * "a validação não roda" — era "a validação diz que passou". Formulário com
 * obrigatório vazio se declarava válido e submetia, sem um aviso de console.
 *
 * ── Como resolve ──────────────────────────────────────────────────────────
 *
 * Pelo ponto de extensão PÚBLICO do próprio Quasar (`useFormChild`), não por
 * um motor paralelo: o DSS não reimplementa primitivo. O que este composable
 * acrescenta é só o que o QForm espera de um filho — `validate()`,
 * `resetValidation()` — com a MESMA semântica de regra do QField, para que
 * `rules` signifique a mesma coisa em qualquer campo do sistema.
 *
 * ── Semântica de regra (paridade QField) ──────────────────────────────────
 *
 * Cada regra recebe o valor e devolve:
 *   • `true` ou `undefined` → aprovado
 *   • `false`              → reprovado, sem mensagem
 *   • `string`             → reprovado, e a string É a mensagem
 *   • `Promise<…>`         → validação assíncrona (todas são aguardadas)
 *
 * A primeira regra SÍNCRONA que reprova interrompe as demais — igual ao
 * QField. Campo desabilitado não valida e responde `true`, também por
 * paridade: obrigatório desabilitado não pode travar a submissão.
 *
 * @example
 * ```ts
 * const { temErro, mensagemDeErro, validar, resetarValidacao, aoPerderFoco } =
 *   useFieldValidation({
 *     rules:        () => props.rules,
 *     modelValue:   () => props.modelValue,
 *     disabled:     () => props.disabled === true || props.readonly === true,
 *     error:        () => props.error,
 *     errorMessage: () => props.errorMessage,
 *     lazyRules:    () => props.lazyRules,
 *   })
 * ```
 */

import { ref, computed, onBeforeUnmount, watch, type ComputedRef } from 'vue'
import { useFormChild } from 'quasar'

/**
 * Regra de validação de campo.
 *
 * Diferença deliberada em relação ao QField: o DSS aceita apenas regra em
 * FORMA DE FUNÇÃO. O QField também aceita a string de um padrão nomeado
 * (`rules="['email']"`), que depende do registro de `testPattern` do Quasar —
 * um canal que o DSS não expõe e que, se aceito aqui, falharia em silêncio.
 * Regra em forma não suportada emite aviso em desenvolvimento (ver `validar`).
 */
export type DssFieldRule<T = unknown> = (
  val: T,
) => boolean | string | void | Promise<boolean | string | void>

/**
 * Momento em que a regra roda sozinha, sem ninguém chamar `validate()`.
 *
 * - `false` (padrão) — a cada mudança do valor, depois da primeira interação.
 * - `true` — só ao perder o foco.
 * - `'ondemand'` — nunca sozinha; apenas via `validate()` do campo ou do form.
 */
export type DssLazyRules = boolean | 'ondemand'

export interface FieldValidationOptions<T = unknown> {
  /** As regras declaradas pelo consumidor. */
  rules: () => DssFieldRule<T>[] | undefined
  /** O valor corrente do campo. */
  modelValue: () => T
  /** Campo inerte (desabilitado/somente leitura) não valida. */
  disabled?: () => boolean
  /** Erro imposto de FORA pelo consumidor — soma-se ao erro interno. */
  error?: () => boolean | undefined
  /** Mensagem imposta de fora — tem PRECEDÊNCIA sobre a mensagem da regra. */
  errorMessage?: () => string | undefined
  /** Quando as regras rodam sozinhas. */
  lazyRules?: () => DssLazyRules | undefined
}

export interface FieldValidationReturn {
  /** Erro externo (prop) OU erro apurado pelas regras. Use no lugar de `props.error`. */
  temErro: ComputedRef<boolean>
  /** Mensagem a exibir: a da prop vence; na falta, a da regra reprovada. */
  mensagemDeErro: ComputedRef<string | undefined>
  /** Roda as regras. Contrato do QForm: devolve boolean ou Promise<boolean>. */
  validar: (val?: unknown) => boolean | Promise<boolean>
  /** Limpa só o estado de validação (o valor não é tocado). */
  resetarValidacao: () => void
  /** O campo chama isto no blur — é o gatilho do modo `lazyRules: true`. */
  aoPerderFoco: () => void
  /** `true` quando há pelo menos uma regra declarada. */
  temRegras: ComputedRef<boolean>
}

export function useFieldValidation<T = unknown>(
  opcoes: FieldValidationOptions<T>,
): FieldValidationReturn {
  const erroInterno = ref(false)
  const mensagemInterna = ref<string | undefined>(undefined)
  // "Sujo" = o usuário já interagiu. Antes disso a regra não roda sozinha, para
  // o campo não abrir a tela já pintado de vermelho.
  const sujo = ref(false)
  // Corrida de validação assíncrona: só a rodada MAIS RECENTE pode escrever o
  // resultado. Sem isso, uma regra lenta que começou antes sobrescreve o
  // veredito de uma rápida que começou depois.
  let rodada = 0

  const temRegras = computed(() => {
    const r = opcoes.rules()
    return Array.isArray(r) && r.length > 0
  })

  const inerte = () => opcoes.disabled?.() === true

  const temErro = computed(() => opcoes.error?.() === true || erroInterno.value === true)

  const mensagemDeErro = computed(() => {
    const externa = opcoes.errorMessage?.()
    if (typeof externa === 'string' && externa.length > 0) return externa
    return mensagemInterna.value
  })

  function aplicar(erro: boolean, mensagem?: string) {
    erroInterno.value = erro
    mensagemInterna.value = mensagem
  }

  function validar(val: unknown = opcoes.modelValue()): boolean | Promise<boolean> {
    // Paridade QField: campo inerte responde aprovado. Um obrigatório
    // desabilitado não pode travar a submissão do formulário.
    if (inerte() || !temRegras.value) {
      aplicar(false)
      return true
    }

    const indice = ++rodada
    const regras = opcoes.rules() as DssFieldRule<T>[]
    const pendentes: Promise<boolean | string | void>[] = []

    for (const regra of regras) {
      if (typeof regra !== 'function') {
        // Falha VISÍVEL. Regra em forma não suportada (a string de padrão
        // nomeado do Quasar, por exemplo) seria ignorada em silêncio — que é
        // exatamente o defeito que este composable existe para eliminar.
        if (import.meta.env?.DEV) {
          console.warn(
            '[DSS] useFieldValidation: regra ignorada — o DSS aceita apenas regra em forma de função. Recebido:',
            regra,
          )
        }
        continue
      }

      const res = regra(val as T)

      if (res === false || typeof res === 'string') {
        sujo.value = true
        aplicar(true, typeof res === 'string' ? res : undefined)
        return false
      }
      if (res !== true && res !== undefined) {
        pendentes.push(res as Promise<boolean | string | void>)
      }
    }

    if (pendentes.length === 0) {
      aplicar(false)
      return true
    }

    return Promise.all(pendentes).then(
      (resultados) => {
        const reprovada = resultados.find((r) => r === false || typeof r === 'string')
        if (indice === rodada) {
          if (reprovada !== undefined) {
            sujo.value = true
            aplicar(true, typeof reprovada === 'string' ? reprovada : undefined)
          } else {
            aplicar(false)
          }
        }
        return reprovada === undefined
      },
      (erro) => {
        if (indice === rodada) {
          console.error(erro)
          aplicar(true)
        }
        return false
      },
    )
  }

  function resetarValidacao() {
    rodada++
    sujo.value = false
    aplicar(false)
  }

  function aoPerderFoco() {
    sujo.value = true
    if (opcoes.lazyRules?.() === true) revalidarSozinho()
  }

  function revalidarSozinho() {
    if (inerte() || !temRegras.value) return
    if (opcoes.lazyRules?.() === 'ondemand') return
    void validar()
  }

  // Modo padrão (`lazyRules: false`): revalida a cada mudança, mas só DEPOIS
  // da primeira interação — senão o formulário nasce com todos os
  // obrigatórios já em erro.
  watch(
    () => opcoes.modelValue(),
    () => {
      sujo.value = true
      if (opcoes.lazyRules?.() === false || opcoes.lazyRules?.() === undefined) revalidarSozinho()
    },
  )

  // Regra que deixa de existir (ou campo que fica inerte) não pode manter o
  // campo pintado de vermelho.
  watch([temRegras, inerte], () => {
    if (!temRegras.value || inerte()) aplicar(false)
    else if (sujo.value) revalidarSozinho()
  })

  onBeforeUnmount(() => {
    rodada++
  })

  // O REGISTRO no QForm. `useFormChild` é API pública do Quasar: ele injeta o
  // formulário ancestral e pendura `validate`/`resetValidation` no proxy da
  // instância, que é o objeto sobre o qual o QForm chama os métodos.
  //
  // Os nomes locais são `validar`/`resetarValidacao` de propósito: o
  // `useFormChild` faz `Object.assign(proxy, { validate, resetValidation })`, e
  // uma binding de <script setup> com esses nomes exatos cairia na trava de
  // "cannot mutate <script setup> binding". Com nomes distintos, as chaves
  // entram limpas no contexto da instância.
  useFormChild({ validate: validar, resetValidation: resetarValidacao })

  return { temErro, mensagemDeErro, validar, resetarValidacao, aoPerderFoco, temRegras }
}
