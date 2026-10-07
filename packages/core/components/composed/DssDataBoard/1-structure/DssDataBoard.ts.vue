<template>
  <section
    ref="raiz"
    :class="boardClasses"
    :data-brand="brand || undefined"
    :aria-label="ariaLabel"
    v-bind="$attrs"
  >
    <!-- ================================================================
         FILTRO — o núcleo, sempre presente
         ================================================================ -->
    <div class="dss-data-board__filter">
      <div class="dss-data-board__head">
        <DssSectionTitle :label="title" />

        <div v-if="$slots.actions" class="dss-data-board__actions">
          <slot name="actions" />
        </div>
      </div>

      <!-- Campos: somem ao retrair. Os chips abaixo continuam, porque é
           justamente no estado retraído que eles viram o resumo do filtro.

           `v-show`, e NÃO um invólucro de grade animado: retraído, o
           `__filter` deixa de ser coluna e vira LINHA, então um campo que
           continuasse montado durante a transição saltaria para o lado do
           título antes de sumir. Quem dá a suavidade aqui é a altura da peça
           inteira (`useCollapseHeight`) mais o esmaecimento do conteúdo. -->
      <div v-show="!estaRetraido" class="dss-data-board__fields">
        <div
          v-for="campo in fields"
          :key="campo.name"
          class="dss-data-board__field"
          :style="{ gridColumn: `span ${campo.span ?? 1}` }"
        >
          <slot
            :name="`field-${campo.name}`"
            :field="campo"
            :value="valorDe(campo.name)"
            :dense="dense"
            :update="(v: unknown) => atualizarCampo(campo.name, v)"
          >
            <DssInput
              :model-value="valorDe(campo.name) as string"
              variant="outlined"
              :dense="dense"
              :label="campo.label"
              :type="campo.type || 'text'"
              @update:model-value="atualizarCampo(campo.name, $event)"
            />
          </slot>
        </div>
      </div>

      <!-- ==============================================================
           CHIPS — os filtros aplicados, em UMA linha

           Derivados do `v-model`, nunca declarados em paralelo: uma lista
           escrita à mão divergiria do estado real no primeiro filtro que
           alguém removesse. O que não couber vive atrás do "+N filtros".

           O gatilho mora DENTRO da lista de propósito — assim participa da
           mesma quebra de linha que os chips, e a conta de "o que cabe" é a
           do navegador, não uma aritmética paralela.
           ============================================================== -->
      <ul
        v-if="filtrosAplicados.length"
        :id="idDosChips"
        ref="listaChips"
        class="dss-data-board__chips"
        :class="{
          'dss-data-board__chips--medindo': medindo,
          'dss-data-board__chips--expandido': expandidos,
        }"
        :aria-label="`Filtros aplicados em ${title}`"
      >
        <li
          v-for="(f, i) in filtrosAplicados"
          :key="f.name"
          :hidden="!chipVisivel(i)"
        >
          <DssChip
            variant="outline"
            color="neutral"
            size="sm"
            dense
            :label="f.text"
            removable
            :remove-aria-label="`Remover filtro ${f.label}`"
            @remove="removerFiltro(f.name)"
          />
        </li>

        <li v-if="medindo || ocultos > 0 || expandidos">
          <DssButton
            variant="flat"
            color="primary"
            size="sm"
            :label="expandidos ? 'Ver menos' : `+${ocultos} filtros`"
            :icon-right="expandidos ? 'expand_less' : 'expand_more'"
            :aria-expanded="expandidos"
            :aria-controls="idDosChips"
            @click="expandidos = !expandidos"
          />
        </li>
      </ul>

      <!-- ==============================================================
           BUSCA — e o aviso de que a tabela ainda NÃO reflete o filtro

           Gap identificado pelo processo de UX/UI: o usuário mudava um campo
           e lia a tabela como se já estivesse filtrada. O botão passa a
           avisar — cor, ícone, dica e texto para leitor de tela.

           A cor NÃO é o único sinal: a WCAG 1.4.1 proíbe informação só por
           cor. O ícone muda junto (busca → alerta) e há um texto oculto
           referenciado por `aria-describedby`, porque tooltip não é lido de
           forma confiável por leitor de tela.
           ============================================================== -->
      <div v-show="!estaRetraido" class="dss-data-board__submit">
        <DssButton
          variant="unelevated"
          :color="filtroSujo ? 'tertiary' : 'primary'"
          size="md"
          dense
          :icon="filtroSujo ? 'error_outline' : 'search'"
          :label="searchLabel"
          :aria-describedby="filtroSujo ? idDoAviso : undefined"
          @click="pesquisar"
        >
          <DssTooltip v-if="filtroSujo" :label="avisoDeFiltroSujo" />
        </DssButton>

        <span :id="idDoAviso" class="dss-data-board__notice" aria-live="polite">
          {{ filtroSujo ? avisoDeFiltroSujo : '' }}
        </span>
      </div>
    </div>

    <!-- ================================================================
         PAINÉIS COMPLEMENTARES — KPIs, gráficos. Incrementais.
         ================================================================ -->
    <div v-if="$slots.panels" class="dss-data-board__panels">
      <slot name="panels" />
    </div>

    <!-- ================================================================
         GATILHO DE RETRAÇÃO
         ================================================================ -->
    <button
      v-if="collapsible"
      type="button"
      class="dss-data-board__toggle"
      :aria-expanded="!estaRetraido"
      :aria-controls="controls || undefined"
      :aria-label="estaRetraido ? 'Expandir filtros' : 'Retrair filtros'"
      @click="alternarRetracao"
    >
      <!-- UM glifo, que GIRA. Trocar `arrow_up` por `arrow_down` é uma troca
           INSTANTÂNEA no meio de uma transição suave: o ícone pulava enquanto
           o resto deslizava, e era o pulo que se via. -->
      <DssIcon
        name="keyboard_arrow_up"
        class="dss-data-board__toggle-icon"
        inline
        decorative
      />
    </button>
  </section>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssDataBoard — Layer 1: Structure
 * ==========================================================================
 *
 * A faixa de filtro e leitura que vive ACIMA de uma tabela.
 *
 *     ┌──────────────────────────────────────────────┬─────┬─────┐
 *     │ Filtros            [salvar] [opções filtro]  │ KPI │ ▦   │
 *     │ [campo] [campo] [campo]                      │     │     │
 *     │ ⊗filtro-1 ⊗filtro-2 … +3 filtros             │     │     │
 *     │            [ Pesquisar ]                     │     │     │
 *     └──────────────────────────────────────────────┴─────┴─────┘
 *
 * POR QUE EXISTE
 *
 * O analista escolhe quais campos de filtro ficam visíveis; os demais vivem
 * atrás de "opções de filtro". O filtro é o núcleo e está SEMPRE presente —
 * KPIs e gráficos são complementos que entram pelo slot `panels`.
 *
 * O §1.6 decide o mecanismo de cada eixo:
 *
 *   | eixo                          | mecanismo |
 *   |-------------------------------|-----------|
 *   | pele (cor, marca)             | token via [data-brand] |
 *   | quais campos, quais painéis   | config + slot |
 *   | a ESTRUTURA e a retração      | COMPOSTO — é o que não varia |
 *
 * O QUE ELE NÃO FAZ, E É DELIBERADO
 *
 * Não conhece a tabela. Declara o vínculo por `controls` (aria-controls) e
 * emite `search`; quem filtra os dados é a página. Receber `rows` o tornaria
 * um componente de DADOS e o amarraria ao `DssTable` para sempre — hoje ele
 * serve igualmente a uma lista ou a um conjunto de cartões.
 *
 * A RETRAÇÃO É COORDENADA
 *
 * O board PROVÊ o estado (§1.2, `provide/inject` tipado) e todo descendente
 * que o injete recolhe junto. É o que nenhum arranjo de peças soltas entrega:
 * o `DssExpansionItem` retrai a si mesmo e não propaga nada.
 *
 * @see DssDataBoardPanel — os painéis complementares
 */

import { computed, ref, useId } from 'vue'

import { useCollapseHeight } from '../../../../composables/useCollapseHeight'

import DssButton from '../../../base/DssButton/DssButton.vue'
import DssChip from '../../../base/DssChip/DssChip.vue'
import DssIcon from '../../../base/DssIcon/DssIcon.vue'
import DssInput from '../../../base/DssInput/DssInput.vue'
import DssSectionTitle from '../../../base/DssSectionTitle/DssSectionTitle.vue'
import DssTooltip from '../../../base/DssTooltip/DssTooltip.vue'

import { provideDataBoard, useDataBoardChips } from '../composables'
import type {
  DataBoardAppliedFilter,
  DataBoardEmits,
  DataBoardProps,
} from '../types/data-board.types'

defineOptions({
  name: 'DssDataBoard',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DataBoardProps>(), {
  modelValue: () => ({}),
  fields: () => [],
  // `undefined`, NÃO `false` — o comentário do espelho local diz que a prop é
  // opcional, mas com default `false` ela nunca é nula: o `??` abaixo nunca cai
  // para o espelho e o gatilho fica MUDO em toda tela que não amarra
  // `v-model:collapsed`. O defeito foi medido no DssContextHeader, que nasceu
  // deste mesmo código.
  collapsed: undefined,
  collapsible: true,
  dense: false,
  title: 'Filtros',
  columns: 6,
  searchLabel: 'Pesquisar',
  brand: null,
  ariaLabel: 'Filtros e indicadores',
})

const emit = defineEmits<DataBoardEmits>()

// ── Retração ─────────────────────────────────────────────────────────────
// Espelho local porque `collapsed` é opcional: sem `v-model:collapsed`, o
// board ainda precisa retrair sozinho. Com o v-model, a prop manda.
const retracaoLocal = ref(props.collapsed ?? false)
const estaRetraido = computed(() => props.collapsed ?? retracaoLocal.value)

function alternarRetracao() {
  const novo = !estaRetraido.value
  retracaoLocal.value = novo
  emit('update:collapsed', novo)
}

// Provê para TODO descendente — é o que faz a retração cascatear.
provideDataBoard(estaRetraido as unknown as typeof retracaoLocal)

/**
 * A altura acompanha a retração.
 *
 * Sem isto, a classe `--collapsed` entra e o board salta de ~300px para ~50px
 * em um quadro. O composable mede as duas alturas e transita entre elas; o
 * conteúdo, que já trocou de arranjo, fica recortado pelo `overflow: hidden`
 * enquanto a caixa se move.
 */
const raiz = ref<HTMLElement | null>(null)
useCollapseHeight(raiz, estaRetraido)

// ── Campos ───────────────────────────────────────────────────────────────
function valorDe(name: string) {
  return props.modelValue?.[name] ?? ''
}

function atualizarCampo(name: string, valor: unknown) {
  emit('update:modelValue', { ...props.modelValue, [name]: valor })
}

// ── Filtros aplicados ────────────────────────────────────────────────────
/**
 * Derivados do `v-model`: um filtro existe quando tem valor.
 *
 * `0` e `false` CONTAM como valor — só string vazia, `null` e `undefined` não.
 * Tratar `0` como ausente esconderia o filtro "quantidade = 0" sem avisar.
 */
const filtrosAplicados = computed<DataBoardAppliedFilter[]>(() =>
  props.fields
    .map((campo) => {
      const bruto = props.modelValue?.[campo.name]
      const vazio = bruto === '' || bruto === null || bruto === undefined
      if (vazio) return null
      const value = String(bruto)
      return { name: campo.name, label: campo.label, value, text: `${campo.label}: ${value}` }
    })
    .filter((f): f is DataBoardAppliedFilter => f !== null),
)

// ── O filtro mudou e a tabela ainda não sabe ─────────────────────────────
/**
 * Gap identificado pelo processo de UX/UI, resolvido no protótipo: alterar um
 * campo não altera a tabela — a busca só acontece no clique. Sem aviso, o
 * usuário lia a tabela como se já estivesse filtrada.
 *
 * O estado é derivado da comparação entre o filtro ATUAL e o snapshot da
 * ÚLTIMA busca. Derivar em vez de guardar um booleano é o que mantém o aviso
 * honesto: desfazer a alteração à mão (apagar o que digitou) limpa o aviso
 * sozinho, porque o estado volta a ser igual ao buscado.
 */
const ultimaBusca = ref<Record<string, unknown>>({ ...props.modelValue })

const filtroSujo = computed(() =>
  props.fields.some((campo) => {
    const atual = props.modelValue?.[campo.name] ?? ''
    const buscado = ultimaBusca.value?.[campo.name] ?? ''
    return String(atual) !== String(buscado)
  }),
)

const avisoDeFiltroSujo =
  'Os filtros mudaram. A tabela ainda mostra o resultado anterior — clique para aplicar.'

const idDoAviso = `dss-data-board-aviso-${useId()}`

function pesquisar() {
  ultimaBusca.value = { ...props.modelValue }
  emit('search', { ...props.modelValue })
}

/**
 * Remover um chip APLICA na hora, e isso é decisão de comportamento: o chip
 * representa um filtro JÁ aplicado à tabela, então removê-lo é desfazer algo
 * que está em vigor — não é preparar uma busca futura. Deixar a remoção
 * pendente mostraria um filtro que o usuário acabou de tirar ainda agindo
 * sobre os dados.
 */
function removerFiltro(name: string) {
  const novo = { ...props.modelValue, [name]: '' }
  emit('update:modelValue', novo)
  emit('remove-filter', name)
  ultimaBusca.value = novo
  emit('search', novo)
}

// ── Chips em uma linha ───────────────────────────────────────────────────
const listaChips = ref<HTMLElement | null>(null)
const { expandidos, medindo, ocultos, chipVisivel } = useDataBoardChips(
  filtrosAplicados,
  listaChips,
)

const idDosChips = `dss-data-board-chips-${useId()}`

// ── Classes ──────────────────────────────────────────────────────────────
const boardClasses = computed(() => [
  'dss-data-board',
  {
    'dss-data-board--collapsed': estaRetraido.value,
    'dss-data-board--brand-hub': props.brand === 'hub',
    'dss-data-board--brand-water': props.brand === 'water',
    'dss-data-board--brand-waste': props.brand === 'waste',
  },
])
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
