<script setup lang="ts">
/**
 * DssBreadcrumbs — Layer 1: Implementação Canônica
 *
 * Wrapper DSS governado sobre o QBreadcrumbs do Quasar.
 * Container orquestrador de Nível 2 para DssBreadcrumbsEl.
 *
 * Responsabilidades deste componente:
 *   - Estrutura de navegação via <nav role="navigation"> (gerenciado pelo QBreadcrumbs)
 *   - Layout flexbox com gap via CSS custom property --dss-breadcrumbs-gap
 *   - Renderização dos separadores (delegada ao QBreadcrumbs via prop `separator`)
 *   - Cor dos separadores via --dss-breadcrumbs-separator-color (Layer 2 + EXC-01)
 *   - Alinhamento horizontal via prop `align` repassada ao QBreadcrumbs
 *
 * Gate de Responsabilidade v2.4:
 *   DssBreadcrumbs NÃO gerencia hover, focus-visible, active ou disabled.
 *   Esses estados são exclusivos dos DssBreadcrumbsEl filhos.
 *
 * Gate de Composição v2.4 — Exceção Formal (EXC-01):
 *   O seletor `.dss-breadcrumbs .q-breadcrumbs__separator` é usado no Layer 2
 *   para aplicar tipografia e cor DSS aos separadores injetados pelo QBreadcrumbs.
 *   Registrado em dss.meta.json → exceptions[EXC-01].
 *
 * Decisão arquitetural (gutter):
 *   Passamos `gutter="none"` ao QBreadcrumbs para desativar o sistema de gutter
 *   nativo (baseado em classes q-gutter-{size} com margin). O gap DSS é aplicado
 *   exclusivamente via `gap: var(--dss-breadcrumbs-gap)` no Layer 2.
 *
 * Decisão arquitetural (cores do separador):
 *   As props `active-color` e `separator-color` do QBreadcrumbs são bloqueadas.
 *   A cor do separador é governada pelo token --dss-breadcrumbs-separator-color,
 *   definido via inline style e consumido pelo seletor EXC-01 no SCSS.
 *
 * inheritAttrs: false — $attrs forwarded explicitamente para <q-breadcrumbs>
 * para garantir propagação de aria-label customizado pelo consumidor.
 */
import { computed } from 'vue'
import type {
  BreadcrumbsProps,
  BreadcrumbsEmits,
  BreadcrumbsSlots,
} from '../types/breadcrumbs.types'
import { useBreadcrumbsClasses } from '../composables'

defineOptions({ name: 'DssBreadcrumbs', inheritAttrs: false })

const props = withDefaults(defineProps<BreadcrumbsProps>(), {
  separator: '/',
  separatorColor: 'subtle',
  gutter: 'md',
  align: 'left',
})

defineEmits<BreadcrumbsEmits>()
defineSlots<BreadcrumbsSlots>()

const { breadcrumbsClasses } = useBreadcrumbsClasses(props)

/**
 * Mapeia a prop `gutter` DSS para o token de espaçamento correspondente.
 * sm → --dss-spacing-2 (8px)
 * md → --dss-spacing-3 (12px)
 * lg → --dss-spacing-4 (16px)
 */
const gutterValue = computed<string>(() => {
  const map: Record<string, string> = {
    sm: 'var(--dss-spacing-2)',
    md: 'var(--dss-spacing-3)',
    lg: 'var(--dss-spacing-4)',
  }
  return map[props.gutter ?? 'md'] ?? 'var(--dss-spacing-3)'
})

/**
 * Mapeia a prop `separatorColor` DSS para o token de cor de texto correspondente.
 * Aceita nomes semânticos DSS ('subtle', 'body', 'disabled') e os converte para
 * var(--dss-text-{name}). Valores desconhecidos tentam var(--dss-text-{value}).
 */
const separatorColorValue = computed<string>(() => {
  const known: Record<string, string> = {
    subtle: 'var(--dss-text-subtle)',
    body: 'var(--dss-text-body)',
    disabled: 'var(--dss-text-disabled)',
  }
  const key = props.separatorColor ?? 'subtle'
  return known[key] ?? `var(--dss-text-${key})`
})

/**
 * Estilos inline que definem as CSS custom properties consumidas pelo SCSS.
 * Abordagem: CSS custom properties → tokens DSS → valores visuais.
 * Isso mantém toda a lógica de mapeamento no Layer 1 (Vue) e o SCSS apenas consome.
 */
const breadcrumbsStyle = computed(() => ({
  '--dss-breadcrumbs-gap': gutterValue.value,
  '--dss-breadcrumbs-separator-color': separatorColorValue.value,
}))
</script>

<template>
  <!--
    QBreadcrumbs gerencia nativamente:
    - <nav role="navigation"> como elemento raiz
    - aria-label="Breadcrumbs" (sobrescrito via $attrs se o consumidor fornecer)
    - aria-hidden="true" nos separadores injetados entre os itens
    - Injeção dos separadores (texto ou slot) entre instâncias de DssBreadcrumbsEl

    gutter="none": desativa o sistema q-gutter-{size} do Quasar (margin-based).
    O gap é controlado exclusivamente via CSS custom property --dss-breadcrumbs-gap
    aplicada no Layer 2 (EXC-02: gap no seletor composto .dss-breadcrumbs.q-breadcrumbs).

    active-color e separator-color: props Quasar bloqueadas pelo DSS.
    A cor do separador é controlada via --dss-breadcrumbs-separator-color (EXC-01).
  -->
  <q-breadcrumbs
    :class="breadcrumbsClasses"
    :style="breadcrumbsStyle"
    :separator="separator"
    :align="align === 'left' ? undefined : align"
    gutter="none"
    v-bind="$attrs"
  >
    <!--
      Slot default: aceita apenas DssBreadcrumbsEl.
      Uso de HTML nativo ou outros componentes DSS dentro deste slot
      viola o Gate de Composição v2.4.
    -->
    <slot />

    <!--
      Slot separator: permite separadores customizados (ex: DssIcon).
      Quando não fornecido, QBreadcrumbs usa a prop `separator` como texto.
      aria-hidden="true" é aplicado pelo QBreadcrumbs nativamente.
    -->
    <template
      v-if="$slots.separator"
      #separator
    >
      <slot name="separator" />
    </template>
  </q-breadcrumbs>
</template>

<style lang="scss">
/*
  Sem `scoped` — este componente usa seletores descendentes para estilizar
  os separadores injetados pelo QBreadcrumbs (EXC-01) e sobrescrever o gap
  do container (EXC-02). Com scoped, os elementos injetados pelo Quasar
  não recebem o atributo de escopo Vue e os seletores não produziriam efeito.
  Padrão idêntico ao DssBtnGroup (1-structure/DssBtnGroup.ts.vue).
*/
@import '../DssBreadcrumbs.module.scss';
</style>
