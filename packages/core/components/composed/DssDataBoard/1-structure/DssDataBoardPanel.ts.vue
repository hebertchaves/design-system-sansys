<template>
  <!--
    `v-if` e não `v-show` quando retraído sem resumo: um painel sem `summary`
    não tem o que mostrar na faixa de uma linha, e deixá-lo no DOM escondido
    manteria seus controles tabuláveis — foco em cima de algo invisível.
  -->
  <div
    v-if="!retraidoSemResumo"
    class="dss-data-board__panel"
    :style="{ gridColumn: `span ${span}` }"
    v-bind="$attrs"
  >
    <!--
      Separador à esquerda. Renderizado SEMPRE e suprimido no primeiro painel
      por CSS (`:first-child`) — assim o componente real do DS é usado, em vez
      de uma `border-inline-start` que imitaria a linha sem ser ela.
    -->
    <DssSeparator vertical class="dss-data-board__panel-divider" />

    <div class="dss-data-board__panel-content">
      <DssSectionTitle
        v-if="title && !collapsed"
        :label="title"
        size="sm"
        class="dss-data-board__panel-title"
      />

      <!--
        Retraído mostra o RESUMO, não o mesmo conteúdo menor. Medido no
        protótipo: o donut de prioridade vira cinco barras e o status perde os
        rótulos. É conteúdo diferente, por isso slot próprio.
      -->
      <slot v-if="collapsed" name="summary" />
      <slot v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssDataBoardPanel — Layer 1: Structure
 * ==========================================================================
 *
 * Um painel complementar do `DssDataBoard`: KPI, gráfico, resumo.
 *
 * NÃO RECEBE PROP DE RETRAÇÃO, e é o ponto do desenho: ele INJETA o estado do
 * board (§1.2 do guia de Fase 3). Um nível intermediário entre o board e o
 * painel não precisa saber que existe retração para que ela funcione — é o que
 * faz a cascata alcançar qualquer profundidade.
 *
 * Fora de um board ele renderiza expandido, pelo default do `inject`. Isso o
 * mantém utilizável isolado, inclusive no Preview Frame.
 *
 * SEM FUNDO PRÓPRIO: o fundo rebaixado é do board, e o painel é transparente —
 * é o que o protótipo mostra e o mesmo padrão que o `DssPageShell` usa entre a
 * página e o board.
 */

import { computed } from 'vue'

import DssSectionTitle from '../../../base/DssSectionTitle/DssSectionTitle.vue'
import DssSeparator from '../../../base/DssSeparator/DssSeparator.vue'

import { useDataBoard } from '../composables'
import type { DataBoardPanelProps } from '../types/data-board.types'

defineOptions({
  name: 'DssDataBoardPanel',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DataBoardPanelProps>(), {
  span: 2,
})

const slots = defineSlots<{
  default?: () => unknown
  summary?: () => unknown
}>()

const { collapsed } = useDataBoard()

/** Retraído e sem resumo: não há o que mostrar na faixa de uma linha. */
const retraidoSemResumo = computed(() => collapsed.value && !slots.summary)

void props
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
