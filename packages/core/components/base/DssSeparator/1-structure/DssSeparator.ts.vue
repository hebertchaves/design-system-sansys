<template>
  <!--
    DssSeparator — Separador standalone DSS v2.2
    Renderiza <hr> (horizontal) ou <div role="separator"> (vertical)
    O elemento pai é responsável pelo touch target (Opção B — não interativo)
  -->
  <component
    :is="vertical ? 'div' : 'hr'"
    :class="separatorClasses"
    :role="vertical ? 'separator' : undefined"
    :aria-orientation="vertical ? 'vertical' : undefined"
    :aria-hidden="ariaHidden || undefined"
  />
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssSeparator — Design System Sansys
 * ==========================================================================
 *
 * Separador standalone para dividir layouts, seções ou blocos independentes.
 *
 * ⚠️ ANTI-PATTERN: Não usar <DssSeparator> dentro de <DssCard> para separar
 * DssCardSection. O DssCard insere bordas automaticamente via CSS (& + &).
 *
 * @see https://quasar.dev/vue-components/separator
 *
 * @example
 * ```vue
 * <DssSeparator />
 * <DssSeparator vertical spaced color="primary" />
 * <DssSeparator inset="item" size="md" />
 * ```
 *
 * @version 1.0.0
 */

import type { SeparatorProps } from '../types/separator.types'
import { useSeparatorClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssSeparator',
  /**
   * inheritAttrs: true (default)
   * Atributos HTML passam automaticamente para o elemento raiz (<hr> ou <div>).
   * Permite: <DssSeparator aria-hidden="true" id="sep-1" />
   */
  inheritAttrs: true
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<SeparatorProps>(), {
  vertical:  false,
  inset:     false,
  spaced:    false,
  color:     'default',
  size:      'thin',
  ariaHidden: undefined
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { separatorClasses } = useSeparatorClasses(props)
</script>

<!-- Estilos carregados globalmente via DssSeparator.module.scss -->
