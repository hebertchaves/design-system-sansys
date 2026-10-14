<template>
  <section
    :class="rootClasses"
    :data-brand="brand || undefined"
    :aria-label="ariaLabel || title || undefined"
    :aria-busy="loading ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    v-bind="$attrs"
  >
    <!--
      CABEÇALHO FORA DA TABELA.

      Nos dois patterns o título, a contagem e as ações vivem acima do cartão,
      não dentro do chrome da tabela: NFAg em `.nf-between`, Solicitações em
      `.sol-card__head`. Pôr isso no slot `#top` do QTable amarra o bloco à
      tabela e faz a barra rolar junto com ela quando o corpo rola.
    -->
    <header class="dss-data-table-cc__head">
      <div class="dss-data-table-cc__identity">
        <DssSectionTitle v-if="title" :level="headingLevel" :label="title" />
        <span class="dss-data-table-cc__count" aria-live="polite">{{ contagem }}</span>
        <slot name="head-start" :selected="selecionadas" />
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

      <div class="dss-data-table-cc__actions" role="toolbar" aria-label="Ações da tabela">
        <slot name="head-actions" :selected="selecionadas" :disabled="disabled || loading">
          <DssButton
            v-for="action in actions"
            :key="action.name"
            :label="action.label"
            :icon="action.icon"
            :color="action.color || 'primary'"
            variant="outline"
            size="sm"
            :disabled="acaoBloqueada(action)"
            @click="emitirAcao(action)"
          />
        </slot>
      </div>
    </header>

    <DssBanner
      v-if="error"
      class="dss-data-table-cc__error"
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

    <DssCard variant="outlined" class="dss-data-table-cc__card">
      <DssTable
        ref="tabelaRef"
        :rows="error ? [] : rows"
        :columns="colunasEfetivas"
        :row-key="rowKey"
        :loading="loading"
        :selection="corpoProprio ? 'none' : selection"
        :model-value="selecionadas"
        :pagination="pagination"
        :density="density"
        :rows-per-page-options="rowsPerPageOptions"
        flat
        @update:model-value="emit('update:modelValue', $event)"
        @update:pagination="emit('update:pagination', $event)"
        @request="aoSolicitar"
        @row-click="aoClicarNaLinha"
      >
        <template v-if="corpoProprio" #body="scope">
          <tr :class="{ 'dss-data-table-cc__row--selected': estaSelecionada(scope.row) }">
            <td v-if="selection !== 'none'" class="dss-data-table-cc__control-cell">
              <DssCheckbox
                :model-value="estaSelecionada(scope.row)"
                :aria-label="`Selecionar linha ${String(identificador(scope.row))}`"
                :disable="disabled || loading"
                @update:model-value="alternarSelecao(scope.row)"
              />
            </td>
            <td v-if="expandable" class="dss-data-table-cc__control-cell">
              <DssButton
                variant="flat"
                size="sm"
                round
                :icon="estaExpandida(scope.row) ? 'expand_less' : 'expand_more'"
                :aria-label="`${estaExpandida(scope.row) ? 'Recolher' : 'Expandir'} linha ${String(identificador(scope.row))}`"
                :aria-expanded="estaExpandida(scope.row)"
                :disabled="disabled || loading"
                @click="alternarExpansao(scope.row)"
              />
            </td>
            <td
              v-for="col in columns"
              :key="col.name"
              :class="classeAlinhamento(col.align)"
            >
              <DssChip
                v-if="col.name === statusColumn"
                :label="situacao(scope.row).label"
                :color="situacao(scope.row).color"
                :icon="situacao(scope.row).icon"
                size="xs"
              />
              <template v-else>{{ valorCelula(col, scope.row) }}</template>
            </td>
            <td
              v-if="rowActions.length || $slots['row-actions']"
              class="dss-data-table-cc__actions-cell"
            >
              <slot name="row-actions" :row="scope.row" :disabled="disabled || loading">
                <div
                  class="dss-data-table-cc__row-actions"
                  role="group"
                  :aria-label="`Ações da linha ${String(identificador(scope.row))}`"
                >
                  <DssButton
                    v-for="action in rowActions"
                    :key="action.name"
                    :icon="action.icon"
                    :label="action.label"
                    variant="flat"
                    size="sm"
                    :color="action.color || 'primary'"
                    :disabled="disabled || loading || action.disabled"
                    @click="emitirAcao(action, scope.row)"
                  />
                </div>
              </slot>
            </td>
          </tr>
          <tr v-if="expandable && estaExpandida(scope.row)" class="dss-data-table-cc__detail-row">
            <td :colspan="colunasEfetivas.length">
              <div class="dss-data-table-cc__detail">
                <slot name="expanded-row" :row="scope.row" :key="identificador(scope.row)" />
              </div>
            </td>
          </tr>
        </template>

        <!--
          Coluna de situação sem corpo próprio: o chip entra pelo slot de célula
          do DssTable, como em "Solicitações". Os dois caminhos leem o MESMO
          `situacao(row)` — a duplicação é de marcação, não de regra.
        -->
        <template v-else-if="statusColumn" #[slotDaSituacao]="celula">
          <td :class="classeAlinhamento(celula.col?.align)">
            <DssChip
              :label="situacao(celula.row).label"
              :color="situacao(celula.row).color"
              :icon="situacao(celula.row).icon"
              size="xs"
            />
          </td>
        </template>

        <template #no-data>
          <div class="dss-data-table-cc__empty">
            <slot name="empty" :filtered="Boolean(filterLabel)">
              <DssEmptyState
                icon="search_off"
                :title="emptyTitle"
                :description="emptyDescription"
              >
                <template v-if="filterLabel" #action>
                  <DssButton label="Limpar filtro" variant="outline" @click="emit('clear-filter')" />
                </template>
              </DssEmptyState>
            </slot>
          </div>
        </template>
      </DssTable>
    </DssCard>
  </section>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 *  DssDataTable - Claude Code
 * ==========================================================================
 *
 *  Segunda leitura do `jtech-data-table`, escrita a partir da UI já
 *  consolidada em "Check-in NFAg - Paralelo" e "Solicitações".
 *
 *  O QUE VEIO DE CADA PATTERN (e por quê)
 *
 *  · Cartão `outlined` com cabeçalho próprio — título, contagem viva e ações
 *    ficam ACIMA do cartão (`sol-card__head`, `nf-between`). A tabela cuida da
 *    grade; o bloco cuida do enquadramento.
 *  · Contagem viva com `aria-live="polite"` (`sol-contagem`): filtrar é uma
 *    mudança que não move o foco, então precisa ser anunciada.
 *  · Chip removível do filtro aplicado (NFAg): o mesmo gesto informa o que
 *    está filtrando e como sair.
 *  · Situação como chip com cor e ícone (`body-cell-situacao`): cor sozinha
 *    não comunica (WCAG 1.4.1) — por isso ícone SEMPRE junto do rótulo.
 *  · Estado vazio com ação (NFAg `#action`): sem saída, o vazio é beco.
 *  · Paginação ligada por padrão — o comentário de "Solicitações" registra o
 *    porquê: `rowsPerPage: 0` faz a tabela crescer até o container e ganhar
 *    rolagem própria de 3px fantasmas (`border-collapse` + arredondamento).
 *
 *  O QUE VEIO DA FONTE JTECH
 *
 *  · O `mode` dos botões (`SINGLE`/`MULTI`/`ANY`/`NONE`) — quatro estados, não
 *    um booleano. Ver `DssDataTableCcActionMode`.
 *
 *  O QUE ESTE BLOCO NÃO FAZ
 *
 *  · Não filtra. Recebe `rows` já filtradas e `total` para o denominador —
 *    mesma fronteira que o pattern "Solicitações" documenta para o
 *    `DssDataBoard`: filtrar aqui o tornaria um componente de dados.
 *  · Não busca. Em `mode="remote"` apenas emite `request`.
 *  · Não edita célula inline (`columnEdit` do Jtech) — exige contrato próprio.
 */
import { computed, ref } from 'vue'
import DssTable from '../../DssTable/DssTable.vue'
import DssCard from '../../../base/DssCard/DssCard.vue'
import DssChip from '../../../base/DssChip/DssChip.vue'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssCheckbox from '../../../base/DssCheckbox/DssCheckbox.vue'
import DssBanner from '../../../base/DssBanner/DssBanner.vue'
import DssEmptyState from '../../../base/DssEmptyState/DssEmptyState.vue'
import DssSectionTitle from '../../../base/DssSectionTitle/DssSectionTitle.vue'
import type { DssTableColumn, DssTablePagination } from '../../DssTable/types/table.types'
import type { ChipColor } from '../../../base/DssChip/types/chip.types'
import type {
  DssDataTableCcAction,
  DssDataTableCcEmits,
  DssDataTableCcProps,
  DssDataTableCcRow,
  DssDataTableCcSlots,
  DssDataTableCcTone,
} from '../types/data-table-claude-code.types'
import { provideDataTableCcContext, useDataTableCcClasses } from '../composables'

defineOptions({ name: 'DssDataTableClaudeCode', inheritAttrs: false })

const props = withDefaults(defineProps<DssDataTableCcProps>(), {
  rowKey: 'id',
  title: '',
  ariaLabel: '',
  total: null,
  countNoun: 'registros',
  mode: 'local',
  selection: 'none',
  modelValue: () => [],
  filterLabel: null,
  pagination: () => ({ page: 1, rowsPerPage: 10 }),
  rowsPerPageOptions: () => [10, 25, 50],
  loading: false,
  error: null,
  density: 'compact',
  actions: () => [],
  rowActions: () => [],
  expandable: false,
  expandedKeys: () => [],
  statusColumn: null,
  statusMap: () => ({}),
  disabled: false,
  brand: null,
  emptyTitle: 'Nenhum registro para este filtro',
  emptyDescription: 'Revise os critérios ou limpe os filtros aplicados.',
})

const emit = defineEmits<DssDataTableCcEmits>()
defineSlots<DssDataTableCcSlots>()

const selecionadas = computed(() => props.modelValue)
provideDataTableCcContext(props, selecionadas)
const { rootClasses } = useDataTableCcClasses(props)

const tabelaRef = ref<{ sort?: (col: string | { name: string }) => void } | null>(null)

/** `<h2>` quando o bloco tem título — a página é dona do `<h1>`. */
const headingLevel = 2 as const

const slotDaSituacao = computed(() => `body-cell-${props.statusColumn}`)

/**
 * "N de M registros". Sem `total`, só N — informar um denominador que não
 * recebemos seria inventar dado.
 */
const contagem = computed(() => {
  const exibidas = props.error ? 0 : props.rows.length
  return props.total == null
    ? `${exibidas} ${props.countNoun}`
    : `${exibidas} de ${props.total} ${props.countNoun}`
})

const corpoProprio = computed(
  () => props.expandable || props.rowActions.length > 0 || props.selection !== 'none',
)

const colunasEfetivas = computed<DssTableColumn[]>(() => {
  const resultado = [...props.columns]
  if (corpoProprio.value && props.expandable) {
    resultado.unshift({ name: '__expandir', label: '', field: props.rowKey, align: 'center' })
  }
  if (corpoProprio.value && props.selection !== 'none') {
    resultado.unshift({ name: '__selecionar', label: '', field: props.rowKey, align: 'center' })
  }
  if (props.rowActions.length) {
    resultado.push({ name: '__acoes', label: 'Ações', field: props.rowKey, align: 'right' })
  }
  return resultado
})

function identificador(row: DssDataTableCcRow): string | number {
  const valor = row[props.rowKey]
  return typeof valor === 'number' || typeof valor === 'string' ? valor : String(valor ?? '')
}

function estaSelecionada(row: DssDataTableCcRow) {
  return props.modelValue.some((item) => identificador(item) === identificador(row))
}

function estaExpandida(row: DssDataTableCcRow) {
  return props.expandedKeys.includes(identificador(row))
}

function alternarSelecao(row: DssDataTableCcRow) {
  if (props.disabled || props.loading) return
  const marcada = estaSelecionada(row)
  const proxima = props.selection === 'single'
    ? (marcada ? [] : [row])
    : (marcada
        ? props.modelValue.filter((item) => identificador(item) !== identificador(row))
        : [...props.modelValue, row])
  emit('update:modelValue', proxima)
}

function alternarExpansao(row: DssDataTableCcRow) {
  if (props.disabled || props.loading) return
  const chave = identificador(row)
  const expandida = !props.expandedKeys.includes(chave)
  const proxima = expandida
    ? [...props.expandedKeys, chave]
    : props.expandedKeys.filter((item) => item !== chave)
  emit('update:expandedKeys', proxima)
  emit('expand-request', { row, key: chave, expanded: expandida })
}

/**
 * O `mode` do Jtech, inteiro.
 *
 * `single` ≠ `any` no TETO: `single` desativa com 2+ selecionadas.
 */
function acaoBloqueada(action: DssDataTableCcAction) {
  if (props.disabled || props.loading || action.disabled) return true
  const n = props.modelValue.length
  switch (action.mode ?? 'none') {
    case 'single': return n !== 1
    case 'multi': return n < 1
    case 'any': return n < 1
    case 'none': return false
    default: return false
  }
}

function emitirAcao(action: DssDataTableCcAction, row?: DssDataTableCcRow) {
  if (!row && acaoBloqueada(action)) return
  emit('action', { action, rows: row ? [row] : props.modelValue, row })
}

function aoClicarNaLinha(evt: Event, row: DssDataTableCcRow, index: number) {
  emit('row-click', evt, row, index)
}

function aoSolicitar(valor: { pagination: DssTablePagination }) {
  emit('request', { pagination: valor.pagination })
}

function solicitarNovamente() {
  emit('retry')
  emit('request', { pagination: props.pagination })
}

function valorCelula(col: DssTableColumn, row: DssDataTableCcRow) {
  const bruto = typeof col.field === 'function' ? col.field(row) : row[col.field]
  return col.format ? col.format(bruto, row) : String(bruto ?? '')
}

const CORES: Record<DssDataTableCcTone, ChipColor> = {
  info: 'info',
  success: 'positive',
  warning: 'warning',
  error: 'negative',
  neutral: 'neutral',
}

/**
 * Situação de uma linha → chip.
 *
 * Valor sem entrada no `statusMap` cai em `neutral` SEM ícone: inventar um
 * ícone para um estado que ninguém declarou é afirmar semântica que não temos.
 */
function situacao(row: DssDataTableCcRow) {
  const bruto = String(row[props.statusColumn ?? ''] ?? '')
  const mapeado = props.statusMap[bruto]
  return {
    label: mapeado?.label ?? bruto,
    color: CORES[mapeado?.tone ?? 'neutral'],
    icon: mapeado?.icon,
  }
}

function classeAlinhamento(align?: 'left' | 'right' | 'center') {
  return `dss-data-table-cc__cell--${align ?? 'left'}`
}

defineExpose({
  request: () => emit('request', { pagination: props.pagination }),
  clearSelection: () => emit('update:modelValue', []),
  sort: (col: string | { name: string }) => tabelaRef.value?.sort?.(col),
})
</script>

<style lang="scss" scoped>
@use '../DssDataTableClaudeCode.module.scss';
</style>
