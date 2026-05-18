<script setup lang="ts">
/**
 * DssCircularProgress — Implementação Canônica
 *
 * Wrapper DSS governado sobre QCircularProgress do Quasar.
 * Golden Reference: DssBadge  (componente não interativo — governança de categoria)
 * Golden Context:   DssLinearProgress  (componente de progresso irmão — baseline específico)
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA) ──────────────────────
 *
 * inheritAttrs: false
 *   $attrs (class extra, id, data-*, aria-* adicionais) são encaminhados ao
 *   div root via v-bind="$attrs". O QCircularProgress interno NÃO recebe $attrs.
 *
 * Delegação total ao Quasar:
 *   QCircularProgress gerencia role="progressbar", aria-valuenow/min/max,
 *   lógica de animação indeterminate e renderização SVG.
 *   DssCircularProgress NÃO reimplementa nenhuma dessas lógicas.
 *
 * Prop `size` traduzida para CSS token:
 *   A prop `size` DSS é mapeada para CSS vars de spacing (ex: 'md' →
 *   'var(--dss-spacing-16)'). Esse valor é passado como :size ao QCircularProgress,
 *   que o aplica como inline style de width/height. CSS vars resolvem corretamente
 *   como inline style — sem conflito de especificidade.
 *
 * Prop `color` NÃO passada ao QCircularProgress (EXC-Gate-01):
 *   A cor do arco de progresso é governada por CSS DSS via seletor
 *   .q-circular-progress__circle { stroke: var(--dss-...) }. Isso evita
 *   dependência do sistema de cores do Quasar (--q-primary) e garante
 *   que os tokens DSS sejam aplicados diretamente.
 *
 * Prop `track-color` NÃO passada ao QCircularProgress (EXC-Gate-01):
 *   Governada por --dss-surface-muted via CSS seletor .q-circular-progress__track.
 *
 * show-value auto-detectado:
 *   QCircularProgress só renderiza o conteúdo do slot quando show-value=true.
 *   DssCircularProgress detecta automaticamente a presença do slot default via
 *   useSlots() e passa show-value=true apenas quando há conteúdo.
 *
 * Props bloqueadas (não expostas ao consumidor):
 *   - dark:        gerenciado pelo DSS via [data-theme="dark"] em _states.scss
 *   - track-color: governado por --dss-surface-muted (EXC-Gate-01)
 *   - center-color: sem semântica DSS — manter transparente (fundo herdado)
 *   - font-size:   proporção padrão do Quasar (0.25em) é adequada e proporcional
 *   - rounded:     estilo de cap do arco — mantido no padrão Quasar
 *
 * Touch Target: Opção B — NÃO aplicável. Componente não interativo.
 *
 * Estados NÃO APLICÁVEIS:
 *   - hover, focus, active: componente sem interatividade
 *   - loading: este componente É o indicador de carregamento
 */

import { computed, useSlots } from 'vue'
import { QCircularProgress } from 'quasar'
import type { CircularProgressProps } from '../types/circularprogress.types'
import { useCircularProgressClasses } from '../composables/useCircularProgressClasses'

defineOptions({ name: 'DssCircularProgress', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<CircularProgressProps>(), {
  color:     'primary',
  size:      'md',
  min:       0,
  max:       100,
  thickness: 0.2,
  angle:     0,
})

// ─── Composables ──────────────────────────────────────────────────────────────

const { rootClasses } = useCircularProgressClasses(props)

// ─── Size → CSS Token Map ─────────────────────────────────────────────────────
//
// Prop `size` é traduzida para token CSS de espaçamento e passada ao
// QCircularProgress como :size. O Quasar aplica como inline style de
// width e height. CSS vars resolvem corretamente em inline style.

const SIZE_TOKEN_MAP = {
  xs: 'var(--dss-spacing-10)', //  40px
  sm: 'var(--dss-spacing-12)', //  48px
  md: 'var(--dss-spacing-16)', //  64px — padrão
  lg: 'var(--dss-spacing-20)', //  80px
  xl: 'var(--dss-spacing-24)', //  96px
} as const

const computedSize = computed(() => SIZE_TOKEN_MAP[props.size ?? 'md'])

// ─── Value ────────────────────────────────────────────────────────────────────
//
// Quando indeterminate=true, value deve ser undefined para que o Quasar
// ative a animação contínua corretamente (valor 0 não é equivalente).

const computedValue = computed<number | undefined>(() =>
  props.indeterminate ? undefined : props.value
)

// ─── Slot detection ───────────────────────────────────────────────────────────
//
// QCircularProgress só renderiza conteúdo do slot default quando show-value=true.
// Detectamos a presença do slot automaticamente para não exigir que o consumidor
// declare show-value manualmente.

const slots = useSlots()
const hasDefaultSlot = computed(() => !!slots.default)
</script>

<template>
  <!--
    Root do DssCircularProgress.

    v-bind="$attrs": encaminha id, class extra, data-*, aria-* do pai.
    :data-brand: ativa cascade de brand tokens em 4-output/_brands.scss.
    role e aria-* são gerenciados pelo QCircularProgress interno.
  -->
  <div
    v-bind="$attrs"
    :class="rootClasses"
    :data-brand="brand ?? undefined"
  >
    <!--
      QCircularProgress: delega TODA a lógica de renderização e ARIA ao Quasar.

      :size           → token CSS traduzido (CSS var aplicado como inline style)
      :value          → undefined quando indeterminate (ativa animação Quasar)
      :min / :max     → limites do intervalo de progresso
      :thickness      → espessura do traço relativa ao raio (0–1)
      :angle          → ângulo de início do arco em graus
      :indeterminate  → passado diretamente
      :reverse        → passado diretamente
      :instant-feedback → passado diretamente
      :show-value     → auto-detectado pela presença do slot default
      :animation-speed → 250ms (alinhado com --dss-duration-250)

      NÃO passados ao Quasar (controlados pelo DSS via CSS — EXC-Gate-01):
      - color:       governado por .dss-circular-progress--color-* em _colors.scss
      - track-color: fixado em --dss-surface-muted em _base.scss
      - center-color: sem semântica DSS — mantém transparent padrão
      - font-size:   proporção padrão Quasar (0.25em) é adequada e proporcional
      - dark:        gerenciado por [data-theme="dark"] em _states.scss
      - rounded:     cap style mantido no padrão Quasar
    -->
    <q-circular-progress
      class="dss-circular-progress__inner"
      :size="computedSize"
      :value="computedValue"
      :min="min"
      :max="max"
      :thickness="thickness"
      :angle="angle"
      :indeterminate="indeterminate"
      :reverse="reverse"
      :instant-feedback="instantFeedback"
      :show-value="hasDefaultSlot"
      :animation-speed="250"
    >
      <slot />
    </q-circular-progress>
  </div>
</template>
