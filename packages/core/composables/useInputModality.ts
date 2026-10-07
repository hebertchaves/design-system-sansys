/**
 * ==========================================================================
 * useInputModality — de onde veio o foco: teclado ou ponteiro
 * ==========================================================================
 *
 * POR QUE ISTO EXISTE (set/2026)
 *
 * `:focus-visible` NÃO separa mouse de teclado em campo de TEXTO. É decisão de
 * especificação, não limitação de navegador: um `<input type="text">` casa
 * `:focus-visible` mesmo no foco por clique, porque o campo precisa mostrar
 * onde o texto vai cair.
 *
 * Isso deixava a família de campos com duas opções ruins e nenhuma boa:
 *
 *   - anel SEMPRE: ao clicar, o campo mostrava a borda de 2px `action-primary`
 *     E um anel de 2px `focus-primary` com 4px de offset. Medidos, os dois
 *     azuis dão 1,43:1 ENTRE SI — separados por 4px não leem como duas coisas,
 *     leem como um halo grosso. Foi o relato que abriu esta frente.
 *
 *   - anel NUNCA: removido o anel, sobra a borda engrossando de 1px para 2px
 *     no mesmo lugar. Tecnicamente é indicador (4,08:1 entre focado e
 *     não-focado, passa na 2.4.11), mas num formulário denso quase não se
 *     percebe — e a navegação por teclado perdeu a afordância. Foi o segundo
 *     relato, e o custo foi maior que o ganho.
 *
 * A modalidade resolve o que a pseudo-classe não alcança: marca no `<html>` se
 * a última interação foi de teclado ou de ponteiro, e o CSS condiciona o anel a
 * isso. Clique fica limpo, Tab volta a saltar. É o mesmo mecanismo que os
 * polyfills de `:focus-visible` usavam antes do suporte nativo — aqui ele não
 * substitui a pseudo-classe, COMPLEMENTA: o seletor continua pedindo
 * `:focus-visible` e só acrescenta a condição de modalidade.
 *
 * CONTRATO
 *
 * Emite `data-dss-modality="keyboard" | "pointer"` no elemento raiz. O CSS lê:
 *
 *   [data-dss-modality='keyboard'] .dss-input:has(:focus-visible) … { outline: … }
 *
 * Sem o atributo, nenhum anel aparece — degradação segura: na ausência da
 * marca, vale o indicador de borda, que existe nas duas modalidades.
 *
 * É GLOBAL e IDEMPOTENTE. Instala um par de listeners no documento, uma única
 * vez por página, por mais componentes que o chamem. Chamar de dentro dos
 * campos (em vez de no entry point do pacote) mantém o efeito colateral ligado
 * a quem precisa dele: uma página sem campo nenhum não ganha listener.
 */

/** Teclas que significam NAVEGAR, não digitar. */
const TECLAS_DE_NAVEGACAO = new Set([
  'Tab',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
  'PageUp',
  'PageDown',
])

let instalado = false

/**
 * Garante o rastreio de modalidade de entrada no documento.
 *
 * Seguro para SSR (sai cedo sem `document`) e seguro para chamada repetida.
 */
export function useInputModality(): void {
  if (instalado) return
  if (typeof document === 'undefined') return
  instalado = true

  const raiz = document.documentElement
  const marcar = (modalidade: 'keyboard' | 'pointer') => {
    if (raiz.dataset.dssModality !== modalidade) {
      raiz.dataset.dssModality = modalidade
    }
  }

  // Fase de CAPTURA nos dois: a marca precisa estar correta ANTES de o foco
  // mudar, e antes que qualquer handler da aplicação pare a propagação.
  //
  // O `keydown` precede a mudança de foco do Tab, então quando o campo recebe
  // foco o atributo já diz `keyboard`. Essa ordem é o que faz o mecanismo
  // funcionar sem piscar.
  document.addEventListener(
    'keydown',
    (evento) => {
      if (evento.metaKey || evento.altKey || evento.ctrlKey) return
      if (TECLAS_DE_NAVEGACAO.has(evento.key)) marcar('keyboard')
    },
    true,
  )

  document.addEventListener('pointerdown', () => marcar('pointer'), true)

  // Estado inicial: ponteiro. Quem abre a página e tabula imediatamente é
  // coberto pelo `keydown` acima, que dispara antes do foco chegar ao campo.
  marcar('pointer')
}
