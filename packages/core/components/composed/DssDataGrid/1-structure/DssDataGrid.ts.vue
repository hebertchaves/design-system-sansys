<template>
  <section
    :class="rootClasses"
    :data-brand="brand || undefined"
    :aria-label="ariaLabel || title || undefined"
    :aria-busy="loading ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    v-bind="$attrs"
  >
    <header class="dss-data-grid__head">
      <div class="dss-data-grid__identity">
        <DssSectionTitle v-if="title" :level="2" :label="title" />
        <span class="dss-data-grid__count" aria-live="polite">{{ contagem }}</span>
        <slot name="head-start" :selected="selecionados" />
        <DssChip
          v-if="filterLabel"
          :label="filterLabel"
          variant="outline"
          color="primary"
          size="xs"
          removable
          :aria-label="`Remover filtro ${filterLabel}`"
          @remove="emit('clear-filter')"
        />
      </div>
      <div class="dss-data-grid__actions" role="toolbar" aria-label="Ações do grid">
        <slot name="head-actions" :selected="selecionados" :disabled="disabled || loading" />
      </div>
    </header>

    <DssBanner
      v-if="error"
      class="dss-data-grid__error"
      variant="error"
      icon="error_outline"
      rounded
    >
      {{ error }}
      <template #actions>
        <DssButton
          label="Tentar novamente"
          variant="outline"
          size="sm"
          :disabled="disabled"
          @click="solicitarNovamente"
        />
      </template>
    </DssBanner>

    <!--
      LISTA, não tabela.

      A origem é um `q-table grid`: o DOM continua sendo uma tabela e cada
      card ocupa uma célula. Para quem navega por estrutura, isso se anuncia
      como "tabela, 1 coluna, N linhas" e os rótulos dos campos somem na
      leitura. Aqui o conteúdo é o que ele é — uma lista de registros, e cada
      card uma lista de definições.
    -->
    <ul v-if="paginaVisivel.length" class="dss-data-grid__items">
      <li
        v-for="(row, index) in paginaVisivel"
        :key="identificador(row)"
        class="dss-data-grid__item"
      >
        <DssCard
          variant="outlined"
          class="dss-data-grid__card"
          :class="{ 'dss-data-grid__card--selected': estaSelecionado(row) }"
          @click="emit('item-click', row, index)"
        >
          <slot name="item" :row="row" :selected="estaSelecionado(row)" :index="index">
            <div class="dss-data-grid__card-head">
              <DssCheckbox
                v-if="selection !== 'none'"
                :model-value="estaSelecionado(row)"
                :aria-label="`Selecionar ${tituloDoCard(row)}`"
                :disable="disabled || loading"
                @update:model-value="alternarSelecao(row)"
              />
              <h3 class="dss-data-grid__card-title">{{ tituloDoCard(row) }}</h3>
              <div class="dss-data-grid__card-actions">
                <slot name="item-actions" :row="row" :disabled="disabled || loading" />
              </div>
            </div>

            <dl class="dss-data-grid__fields">
              <template v-for="campo in camposVisiveis" :key="campo.name">
                <dt>{{ campo.label }}</dt>
                <dd>{{ valorDoCampo(campo, row) }}</dd>
              </template>
            </dl>

            <template v-if="camposOcultos.length">
              <dl
                v-show="estaRevelado(row)"
                :id="`${idDoBloco}-extra-${identificador(row)}`"
                class="dss-data-grid__fields dss-data-grid__fields--extra"
              >
                <template v-for="campo in camposOcultos" :key="campo.name">
                  <dt>{{ campo.label }}</dt>
                  <dd>{{ valorDoCampo(campo, row) }}</dd>
                </template>
              </dl>
              <div class="dss-data-grid__card-foot">
                <DssButton
                  :label="estaRevelado(row) ? lessLabel : moreLabel"
                  :icon-right="estaRevelado(row) ? 'expand_less' : 'expand_more'"
                  variant="flat"
                  size="sm"
                  :aria-expanded="estaRevelado(row)"
                  :aria-controls="`${idDoBloco}-extra-${identificador(row)}`"
                  :disabled="disabled || loading"
                  @click="alternarRevelacao(row)"
                />
              </div>
            </template>
          </slot>
        </DssCard>
      </li>
    </ul>

    <div v-else class="dss-data-grid__empty">
      <slot name="empty" :filtered="Boolean(filterLabel)">
        <DssEmptyState icon="search_off" :title="emptyTitle" :description="emptyDescription">
          <template v-if="filterLabel" #action>
            <DssButton label="Limpar filtro" variant="outline" @click="emit('clear-filter')" />
          </template>
        </DssEmptyState>
      </slot>
    </div>

    <nav v-if="paginated && totalDePaginas > 1" class="dss-data-grid__pagination" aria-label="Paginação do grid">
      <!-- SEM `size="sm"`: o default do DssButton é `md`, que é o alvo de toque
           de 44px (WCAG 2.5.5). `sm` e `xs` existem na escala e ficam abaixo
           disso — são escolha consciente do consumidor, não default de um
           bloco de dados que se navega com o dedo. -->
      <DssPagination
        :model-value="page"
        :max="totalDePaginas"
        :disable="disabled || loading"
        aria-label="Páginas de registros"
        @update:model-value="irParaPagina"
      />
    </nav>
  </section>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 *  DssDataGrid — versão DSS do `jtech-data-grid`
 * ==========================================================================
 *
 *  O QUE MUDA EM RELAÇÃO À ORIGEM, e por quê
 *
 *  · `q-table grid` → `<ul>` de cards com `<dl>` dentro. A origem exibia
 *    cards mas o DOM era tabela; o rótulo de cada campo vivia num
 *    `q-item-label` ao lado do valor, sem vínculo programático. `<dt>/<dd>`
 *    dá o vínculo de graça (WCAG 1.3.1).
 *
 *  · `visibility: 'hidden'` passa a FUNCIONAR. A origem montava um campo
 *    sintético `showhide` rotulado "MORE" e nada o consumia — campo marcado
 *    como oculto simplesmente sumia. Aqui ele vai para trás de um botão por
 *    card, com `aria-expanded` e `aria-controls`.
 *
 *  · O título do card deixa de ser `row.name`. A origem fixava esse campo E o
 *    usava como rótulo do checkbox, então o título só existia como nome de um
 *    controle. Agora `titleField` escolhe (padrão: primeiro campo visível), o
 *    título é um `<h3>` e o checkbox tem nome próprio.
 *
 *  · Nada de mutação de prop. A origem reescrevia os objetos de `fields`
 *    (`col.name = …`, `col.sortable = true`), dava `push` no array do pai e
 *    `Object.assign` nas linhas. Aqui tudo é derivado.
 *
 *  · `isPaginated: false` não vira `rowsPerPage = 9999`: vira sem paginação.
 *
 *  · Seleção por três booleanos (`singleselect`/`multiselect`/`noneselect`)
 *    vira um enum — eles eram mutuamente exclusivos e nada impedia os três
 *    juntos.
 *
 *  · `scale(0.95)` no card selecionado sai. Deslocamento não é perceptível
 *    por quem não enxerga e some em `prefers-reduced-motion`; o estado passa
 *    a ser checkbox marcado (sinal primário) + tinte e borda.
 *
 *  O QUE NÃO FAZ: não busca (`nmInterface`, `$jt.repository` ficam fora — em
 *  paginação remota emite `request`), não filtra (a página filtra) e não
 *  ordena (ficha não tem cabeçalho clicável; ordenar é da página).
 */
import { computed, ref, useId } from 'vue'
import DssCard from '../../../base/DssCard/DssCard.vue'
import DssChip from '../../../base/DssChip/DssChip.vue'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssCheckbox from '../../../base/DssCheckbox/DssCheckbox.vue'
import DssBanner from '../../../base/DssBanner/DssBanner.vue'
import DssEmptyState from '../../../base/DssEmptyState/DssEmptyState.vue'
import DssPagination from '../../../base/DssPagination/DssPagination.vue'
import DssSectionTitle from '../../../base/DssSectionTitle/DssSectionTitle.vue'
import type {
  DssDataGridField,
  DssDataGridEmits,
  DssDataGridProps,
  DssDataGridRow,
  DssDataGridSlots,
} from '../types/data-grid.types'
import { provideDataGridContext, useDataGridClasses } from '../composables'

defineOptions({ name: 'DssDataGrid', inheritAttrs: false })

const props = withDefaults(defineProps<DssDataGridProps>(), {
  rowKey: 'id',
  title: '',
  ariaLabel: '',
  titleField: null,
  total: null,
  countNoun: 'registros',
  selection: 'none',
  modelValue: () => [],
  filterLabel: null,
  paginated: true,
  page: 1,
  rowsPerPage: 12,
  rowsNumber: null,
  columnsPerRow: 3,
  loading: false,
  error: null,
  disabled: false,
  brand: null,
  emptyTitle: 'Nenhum registro encontrado',
  emptyDescription: 'Revise os critérios ou limpe os filtros aplicados.',
  moreLabel: 'Mais',
  lessLabel: 'Menos',
})

const emit = defineEmits<DssDataGridEmits>()
defineSlots<DssDataGridSlots>()

const selecionados = computed(() => props.modelValue)
provideDataGridContext(props, selecionados)
const { rootClasses } = useDataGridClasses(props)

/** Prefixo de id estável para ligar botão → bloco revelado em cada card. */
const idDoBloco = useId()

const revelados = ref<Set<string | number>>(new Set())

/** Paginação REMOTA quando o consumidor informa `rowsNumber`. */
const remoto = computed(() => props.rowsNumber != null)

const camposVisiveis = computed(() =>
  props.fields.filter((campo) => (campo.visibility ?? 'visible') !== 'hidden'),
)
const camposOcultos = computed(() =>
  props.fields.filter((campo) => campo.visibility === 'hidden'),
)

const totalDePaginas = computed(() => {
  if (!props.paginated) return 1
  const universo = remoto.value ? (props.rowsNumber as number) : props.rows.length
  return Math.max(1, Math.ceil(universo / props.rowsPerPage))
})

/**
 * Em remoto, `rows` JÁ é a página — fatiar de novo esconderia registros.
 * Em local, o componente fatia.
 */
const paginaVisivel = computed(() => {
  if (props.error) return []
  if (!props.paginated || remoto.value) return props.rows
  const inicio = (props.page - 1) * props.rowsPerPage
  return props.rows.slice(inicio, inicio + props.rowsPerPage)
})

const contagem = computed(() => {
  const exibidos = paginaVisivel.value.length
  const universo = props.total ?? (remoto.value ? props.rowsNumber : props.rows.length)
  return universo == null
    ? `${exibidos} ${props.countNoun}`
    : `${exibidos} de ${universo} ${props.countNoun}`
})

function identificador(row: DssDataGridRow): string | number {
  const valor = row[props.rowKey]
  return typeof valor === 'number' || typeof valor === 'string' ? valor : String(valor ?? '')
}

function valorDoCampo(campo: DssDataGridField, row: DssDataGridRow) {
  const chave = campo.field ?? campo.name
  const bruto = typeof chave === 'function' ? chave(row) : row[chave]
  return campo.format ? campo.format(bruto, row) : String(bruto ?? '')
}

/** Primeiro campo visível é o título, salvo escolha explícita. */
function tituloDoCard(row: DssDataGridRow) {
  const nome = props.titleField ?? camposVisiveis.value[0]?.name
  const campo = props.fields.find((item) => item.name === nome)
  return campo ? valorDoCampo(campo, row) : String(identificador(row))
}

function estaSelecionado(row: DssDataGridRow) {
  return props.modelValue.some((item) => identificador(item) === identificador(row))
}

function alternarSelecao(row: DssDataGridRow) {
  if (props.disabled || props.loading) return
  const marcado = estaSelecionado(row)
  const proximo = props.selection === 'single'
    ? (marcado ? [] : [row])
    : (marcado
        ? props.modelValue.filter((item) => identificador(item) !== identificador(row))
        : [...props.modelValue, row])
  emit('update:modelValue', proximo)
}

function estaRevelado(row: DssDataGridRow) {
  return revelados.value.has(identificador(row))
}

function alternarRevelacao(row: DssDataGridRow) {
  if (props.disabled || props.loading) return
  const chave = identificador(row)
  const proximo = new Set(revelados.value)
  if (proximo.has(chave)) proximo.delete(chave)
  else proximo.add(chave)
  revelados.value = proximo
}

function irParaPagina(valor: number) {
  emit('update:page', valor)
  if (remoto.value) emit('request', { page: valor, rowsPerPage: props.rowsPerPage })
}

function solicitarNovamente() {
  emit('retry')
  emit('request', { page: props.page, rowsPerPage: props.rowsPerPage })
}

defineExpose({
  request: () => emit('request', { page: props.page, rowsPerPage: props.rowsPerPage }),
  clearSelection: () => emit('update:modelValue', []),
  revealAll: () => { revelados.value = new Set(props.rows.map(identificador)) },
  collapseAll: () => { revelados.value = new Set() },
})
</script>

<style lang="scss" scoped>
@use '../DssDataGrid.module.scss';
</style>
