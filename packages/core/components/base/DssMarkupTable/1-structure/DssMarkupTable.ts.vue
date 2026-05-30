<template>
  <q-markup-table
    v-bind="$attrs"
    :class="rootClasses"
    :dense="isDense"
    :flat="flat"
    :bordered="bordered"
    :separator="separator"
    :square="square"
    :wrap-cells="wrapCells"
  >
    <slot />
  </q-markup-table>
</template>

<script lang="ts">
export default {
  name: 'DssMarkupTable',
  inheritAttrs: false
}
</script>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssMarkupTable — Design System Sansys Markup Table Component
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QMarkupTable do Quasar Framework.
 * Fornece tabelas HTML semânticas estilizadas com tokens DSS,
 * brandabilidade e conformidade WCAG 2.1 AA.
 *
 * Golden Reference: DssBadge (componente não-interativo)
 * Golden Context: DssList (container estrutural não-interativo)
 *
 * RESPONSABILIDADES:
 * ✅ Estrutura visual da tabela via QMarkupTable (motor)
 * ✅ Density (compact / standard / comfortable)
 * ✅ Separadores de células (horizontal / vertical / cell / none)
 * ✅ Flat e bordered variants
 * ✅ Brandabilidade via [data-brand] + .dss-markup-table--brand-*
 * ✅ Square (sem border-radius)
 * ✅ Wrap-cells (quebra de texto em células)
 * ✅ Tokens DSS para cores, tipografia e espaçamento
 *
 * NÃO RESPONSABILIDADES:
 * ❌ Interatividade (ordenação, filtro, paginação) — pertence ao DssTable
 * ❌ dark prop — gerenciado via [data-theme="dark"] global DSS
 * ❌ dense prop — exposto como density com três níveis semânticos
 * ❌ Semântica ARIA das células — responsabilidade do consumidor
 *   (consumer deve usar scope="col" / scope="row" nos <th>)
 *
 * EXC-Gate-01: QMarkupTable é o motor de renderização da tabela.
 * CSS descendente (.dss-markup-table th, td, tr) é obrigatório
 * para governar o conteúdo de slot.
 *
 * @see https://quasar.dev/vue-components/markup-table
 *
 * @example
 * ```vue
 * <DssMarkupTable bordered separator="cell">
 *   <thead>
 *     <tr>
 *       <th scope="col">Nome</th>
 *       <th scope="col">Status</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>João Silva</td>
 *       <td>Ativo</td>
 *     </tr>
 *   </tbody>
 * </DssMarkupTable>
 * ```
 *
 * @version 1.0.0
 */

import { computed } from 'vue'
import type { DssMarkupTableProps, DssMarkupTableSlots } from '../types/markuptable.types'
import { useMarkupTableClasses } from '../composables/useMarkupTableClasses'

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<DssMarkupTableProps>(), {
  density: 'standard',
  separator: 'horizontal',
  brand: null
})

// ==========================================================================
// SLOTS (declaração explícita para type safety)
// ==========================================================================

defineSlots<DssMarkupTableSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { rootClasses } = useMarkupTableClasses(props)

// ==========================================================================
// COMPUTED
// ==========================================================================

/** Mapeamento density → dense prop do QMarkupTable */
const isDense = computed(() => props.density === 'compact')
</script>

<!-- Estilos carregados globalmente via DssMarkupTable.module.scss -->
