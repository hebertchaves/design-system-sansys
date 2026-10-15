<script setup lang="ts">
/**
 * ==========================================================================
 *  DssPagination
 * ==========================================================================
 *
 *  COMPÕE `DssButton`. Não envolve o QPagination.
 *
 *  Até out/2026 a cadeia era `div.dss-pagination → q-pagination → q-btn`: já
 *  no primeiro elo saía da governança do DSS, e o que pintava os botões era
 *  Quasar cru. Três consequências medidas, todas no mesmo lugar:
 *
 *  1. A PÁGINA ATUAL não se distinguia por cor. O template passava
 *     `color="primary"` E `active-color="primary"` — o mesmo valor nos dois —,
 *     então ativo e inativo saíam com fundo `rgb(31,134,222)` e texto branco.
 *     A única diferença no DOM era `standard` vs `unelevated` na classe: o
 *     estado atual era comunicado por SOMBRA. Para quem enxerga, uma barra
 *     azul uniforme; a informação ficava só no `aria-current`.
 *
 *  2. O CSS virou perseguição a seletor interno. O QPagination escreve estilo
 *     INLINE em cada botão (`padding: 3px 2px; min-height: 0px`), então altura
 *     e respiro só se governavam com `!important` — dois deles, documentados
 *     como EXC-IMPORTANT-01. Compondo `DssButton`, a altura vem da escala do
 *     próprio botão e os dois `!important` deixam de existir.
 *
 *  3. A documentação da API interna de terceiro envelheceu em silêncio: o
 *     arquivo afirmava que `.q-pagination__content` não existia e selecionava
 *     por `.q-pagination > .q-btn`, que havia deixado de casar com qualquer
 *     botão.
 *
 *  O que NÃO muda: a API pública (props, evento, `role`/`aria-current`). Quem
 *  consome não vê a troca.
 */
import { computed } from 'vue'
import DssButton from '../../DssButton/DssButton.vue'
import type { DssPaginationProps, DssPaginationEmits } from '../types/pagination.types'
import { usePaginationClasses } from '../composables/usePaginationClasses'

defineOptions({ name: 'DssPagination', inheritAttrs: false })

const props = withDefaults(defineProps<DssPaginationProps>(), {
  maxPages: 5,
  ellipses: true,
  directionLinks: true,
  ariaLabel: 'Navegação por páginas',
})

const emit = defineEmits<DssPaginationEmits>()

const { rootClasses } = usePaginationClasses(props)

function intervalo(de: number, ate: number) {
  const saida: number[] = []
  for (let i = de; i <= ate; i++) saida.push(i)
  return saida
}

/**
 * Páginas visíveis. `null` é a reticência.
 *
 * Primeira e última são SEMPRE visíveis quando há reticência: é o que permite
 * saltar para as pontas sem depender dos botões de limite, que são opcionais.
 */
const paginas = computed<(number | null)[]>(() => {
  const total = Math.max(1, Math.floor(props.max))
  const janela = Math.max(1, Math.floor(props.maxPages))
  if (total <= janela) return intervalo(1, total)

  if (!props.ellipses) {
    const inicio = Math.min(
      Math.max(1, props.modelValue - Math.floor((janela - 1) / 2)),
      total - janela + 1,
    )
    return intervalo(inicio, inicio + janela - 1)
  }

  // Duas vagas da janela vão para a primeira e a última.
  const miolo = Math.max(1, janela - 2)
  let fim = Math.min(total - 1, Math.max(2, props.modelValue - Math.floor((miolo - 1) / 2)) + miolo - 1)
  const inicio = Math.max(2, fim - miolo + 1)
  fim = Math.max(inicio, fim)

  const saida: (number | null)[] = [1]
  if (inicio > 2) saida.push(null)
  saida.push(...intervalo(inicio, fim))
  if (fim < total - 1) saida.push(null)
  saida.push(total)
  return saida
})

const bloqueado = computed(() => Boolean(props.disable || props.readonly))
const noInicio = computed(() => props.modelValue <= 1)
const noFim = computed(() => props.modelValue >= props.max)

/**
 * Pele dos botões que NÃO são a página atual.
 *
 * O padrão é PREENCHIDO. Antes `flat` e padrão produziam exatamente o mesmo
 * desenho — a variante não significava nada —, porque o inativo era `flat`
 * nos dois casos. Agora a escala é: padrão preenche, `flat` deixa só o texto,
 * `outline` desenha a borda. A página atual continua preenchida em todas, e
 * no padrão ela se separa pelo degrau `-deep` (ver 4-output/_states.scss),
 * que é a mesma técnica do DssBtnToggle para "pressionado".
 */
const peleInativa = computed(() => {
  if (props.outline) return 'outline'
  if (props.flat) return 'flat'
  return 'unelevated'
})

function irPara(pagina: number) {
  if (bloqueado.value) return
  const alvo = Math.min(Math.max(1, pagina), Math.max(1, props.max))
  if (alvo !== props.modelValue) emit('update:modelValue', alvo)
}
</script>

<template>
  <div
    v-bind="$attrs"
    :class="rootClasses"
    :data-brand="brand ?? undefined"
    role="navigation"
    :aria-label="ariaLabel"
  >
    <DssButton
      v-if="boundaryLinks"
      class="dss-pagination__control"
      icon="first_page"
      :variant="peleInativa"
      :size="size"
      :round="round"
      :disabled="disable || noInicio"
      aria-label="Primeira página"
      @click="irPara(1)"
    />
    <DssButton
      v-if="directionLinks"
      class="dss-pagination__control"
      icon="chevron_left"
      :variant="peleInativa"
      :size="size"
      :round="round"
      :disabled="disable || noInicio"
      aria-label="Página anterior"
      @click="irPara(modelValue - 1)"
    />

    <template v-for="(pagina, i) in paginas" :key="pagina === null ? `gap-${i}` : pagina">
      <span v-if="pagina === null" class="dss-pagination__ellipsis" aria-hidden="true">…</span>
      <!--
        A página atual é PREENCHIDA; as demais são planas. A cor é o sinal
        primário e a diferença de pele reforça — antes o estado vivia só na
        sombra, que não é informação para quem não a percebe.
      -->
      <DssButton
        v-else
        class="dss-pagination__page"
        :label="String(pagina)"
        :variant="pagina === modelValue ? 'unelevated' : peleInativa"
        :color="pagina === modelValue ? 'primary' : undefined"
        :size="size"
        :round="round"
        :disabled="disable"
        :aria-current="pagina === modelValue ? 'true' : undefined"
        :aria-label="`Página ${pagina}`"
        @click="irPara(pagina)"
      />
    </template>

    <DssButton
      v-if="directionLinks"
      class="dss-pagination__control"
      icon="chevron_right"
      :variant="peleInativa"
      :size="size"
      :round="round"
      :disabled="disable || noFim"
      aria-label="Próxima página"
      @click="irPara(modelValue + 1)"
    />
    <DssButton
      v-if="boundaryLinks"
      class="dss-pagination__control"
      icon="last_page"
      :variant="peleInativa"
      :size="size"
      :round="round"
      :disabled="disable || noFim"
      aria-label="Última página"
      @click="irPara(max)"
    />
  </div>
</template>
