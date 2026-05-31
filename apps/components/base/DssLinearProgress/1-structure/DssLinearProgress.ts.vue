<script setup lang="ts">
/**
 * DssLinearProgress — Implementação Canônica
 *
 * Wrapper DSS governado sobre QLinearProgress do Quasar.
 * Golden Reference: DssBadge (componente não interativo).
 * Golden Context:   DssSpinner (componente de feedback não interativo).
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA) ──────────────────────
 *
 * inheritAttrs: false
 *   $attrs (class extra, id, data-*, aria-* adicionais) são encaminhados
 *   ao div root via v-bind="$attrs". O QLinearProgress interno NÃO recebe $attrs.
 *
 * Delegação total ao Quasar:
 *   QLinearProgress gerencia role="progressbar", aria-valuenow/min/max,
 *   lógica de animação indeterminate e posicionamento da barra.
 *   DssLinearProgress NÃO reimplementa nenhuma dessas lógicas.
 *
 * Prop `size` traduzida para CSS token:
 *   A prop `size` DSS é mapeada para valores CSS via token (ex: 'md' →
 *   'var(--dss-spacing-3)'). Esse valor é passado como :size ao QLinearProgress,
 *   que o aplica como inline style de altura. Isso evita conflito de especificidade.
 *
 * Props bloqueadas (não expostas ao consumidor):
 *   - dark: gerenciado pelo DSS via [data-theme="dark"] em _states.scss
 *   - track-color: governado por --dss-surface-muted (EXC-Gate-01)
 *   - rounded: governado por --dss-radius-full globalmente (EXC-Gate-01)
 *
 * EXC-Gate-01: Seletores internos do Quasar
 *   .q-linear-progress__track e .q-linear-progress__model são necessários
 *   em _base.scss para aplicar tokens de cor e border-radius do DSS.
 *   Documentado em dss.meta.json.
 *
 * Touch Target: Opção B — NÃO aplicável. Componente não interativo.
 *
 * Estados NÃO APLICÁVEIS:
 *   - hover, focus, active: componente sem interatividade
 *   - loading: este componente É o indicador de loading/progresso
 */

import { computed } from 'vue'
import { QLinearProgress } from 'quasar'
import type { LinearProgressProps } from '../types/linearprogress.types'
import { useLinearProgressClasses } from '../composables/useLinearProgressClasses'

defineOptions({ name: 'DssLinearProgress', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<LinearProgressProps>(), {
  color: 'primary',
  size:  'md',
})

// ─── Composables ──────────────────────────────────────────────────────────────

const { rootClasses } = useLinearProgressClasses(props)

// ─── Size → CSS Token Map ─────────────────────────────────────────────────────
//
// Prop `size` é traduzida para o token CSS correspondente e passada ao
// QLinearProgress como :size. O Quasar aplica como inline style de height,
// o que garante que o browser resolva o CSS var corretamente sem conflito
// de especificidade entre classe DSS e inline style Quasar.

const SIZE_TOKEN_MAP = {
  xs: 'var(--dss-spacing-1)', //  4px
  sm: 'var(--dss-spacing-2)', //  8px
  md: 'var(--dss-spacing-3)', // 12px — padrão
  lg: 'var(--dss-spacing-4)', // 16px
  xl: 'var(--dss-spacing-6)', // 24px
} as const

const computedSize = computed(() => SIZE_TOKEN_MAP[props.size ?? 'md'])

// ─── Value ────────────────────────────────────────────────────────────────────
//
// Quando indeterminate=true, value deve ser undefined para que o Quasar
// ative a animação contínua corretamente (valor 0 não é equivalente).

const computedValue = computed<number | undefined>(() =>
  props.indeterminate ? undefined : props.value
)
</script>

<template>
  <!--
    Root do DssLinearProgress.

    v-bind="$attrs": encaminha id, class extra, data-*, aria-* do pai.
    :data-brand: ativa cascade de brand tokens em 4-output/_brands.scss.
    role e aria-* são gerenciados pelo QLinearProgress interno.

    Não possui role próprio — o QLinearProgress raiz já declara
    role="progressbar" com aria-valuenow/min/max gerenciados pelo Quasar.
  -->
  <div
    v-bind="$attrs"
    :class="rootClasses"
    :data-brand="brand ?? undefined"
  >
    <!--
      QLinearProgress: delega TODA a lógica e ARIA ao Quasar.

      :size         → token CSS traduzido (evita conflito inline style × classe DSS)
      :value        → undefined quando indeterminate (activa animação Quasar)
      :indeterminate → passado diretamente
      :reverse      → passado diretamente
      :stripe       → passado diretamente
      :animation-speed → 250ms (alinhado com --dss-duration-250)

      NÃO passados ao Quasar (controlados pelo DSS via CSS):
      - color:       controlado por .dss-linear-progress--color-* em _colors.scss
      - track-color: fixado em --dss-surface-muted em _base.scss (EXC-Gate-01)
      - rounded:     fixado em --dss-radius-full em _base.scss (EXC-Gate-01)
      - dark:        gerenciado por [data-theme="dark"] em _states.scss
    -->
    <q-linear-progress
      class="dss-linear-progress__inner"
      :size="computedSize"
      :value="computedValue"
      :indeterminate="indeterminate"
      :reverse="reverse"
      :stripe="stripe"
      :animation-speed="250"
    />
  </div>
</template>
