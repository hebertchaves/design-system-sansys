<script setup lang="ts">
/**
 * DssSpinner — Implementação Canônica
 *
 * Wrapper DSS para os componentes QSpinner* do Quasar.
 * Segue a mesma arquitetura não interativa do DssIcon (Golden Reference).
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA — CLAUDE.md §7.1) ────
 *
 * inheritAttrs: false
 *   $attrs (class extra, id, data-*, aria-* adicionais do pai) são
 *   encaminhados explicitamente ao span root via v-bind="$attrs".
 *   O QSpinner interno NÃO recebe $attrs.
 *
 * Delegação total ao Quasar:
 *   Renderização SVG, keyframes CSS e lógica de animação são responsabilidade
 *   exclusiva dos componentes QSpinner* do Quasar. O DssSpinner NÃO
 *   reimplementa animações.
 *
 * Elemento decorativo:
 *   O <component :is="spinnerComponent"> interno possui aria-hidden="true".
 *   A semântica é fornecida pelo container (role="status") e pelo
 *   .dss-spinner__label (sr-only).
 *
 * Prop `color` não repassada ao QSpinner:
 *   A cor é controlada exclusivamente via CSS (color: var(--dss-*) no wrapper).
 *   O QSpinner usa currentColor internamente nos SVG fills/strokes.
 *
 * Prop `size` passada como "100%":
 *   O QSpinner preenche as dimensões do wrapper DSS (controladas por tokens
 *   --dss-icon-size-*). NÃO é passado o tamanho em px/rem diretamente.
 *
 * Estados NÃO APLICÁVEIS:
 *   - hover/active/focus: não interativo (Opção B — como DssIcon)
 *   - disabled: spinners de loading são sempre visíveis quando montados
 *   - indeterminate: spinner sempre indica progresso indeterminado por natureza
 *   - loading: este componente É o loading
 *
 * @see DssIcon — Golden Reference (mesma arquitetura não interativa)
 */

import { computed } from 'vue'
import {
  QSpinner,
  QSpinnerDots,
  QSpinnerIos,
  QSpinnerOval,
  QSpinnerTail,
  QSpinnerRings,
  QSpinnerPie,
  QSpinnerBars,
} from 'quasar'
import type { SpinnerProps } from '../types/spinner.types'
import { useSpinnerClasses } from '../composables/useSpinnerClasses'

defineOptions({ name: 'DssSpinner', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<SpinnerProps>(), {
  type:      'standard',
  color:     null,
  size:      'md',
  thickness: 5,
  brand:     null,
  ariaLabel: 'Carregando',
})

// ─── Composables ──────────────────────────────────────────────────────────────

const { spinnerClasses } = useSpinnerClasses(props)

// ─── QSpinner Component Map ───────────────────────────────────────────────────
//
// Mapeamento type → componente Quasar correspondente.
// O DssSpinner não reimplementa nenhuma animação — delega 100% ao Quasar.

const SPINNER_MAP = {
  standard: QSpinner,
  dots:     QSpinnerDots,
  ios:      QSpinnerIos,
  oval:     QSpinnerOval,
  tail:     QSpinnerTail,
  rings:    QSpinnerRings,
  pie:      QSpinnerPie,
  bars:     QSpinnerBars,
} as const

const spinnerComponent = computed(() => SPINNER_MAP[props.type])

// ─── Thickness (somente para QSpinner / type='standard') ─────────────────────
//
// A prop `thickness` controla a espessura do traço no QSpinner circular.
// Outros tipos não expõem essa prop — undefined é seguro (ignorado pelo Quasar).

const computedThickness = computed<number | undefined>(() =>
  props.type === 'standard' ? props.thickness : undefined
)
</script>

<template>
  <!--
    Wrapper root do DssSpinner.

    role="status": região live de status — screen readers monitoram mudanças.
    aria-live="polite": anuncia o conteúdo sem interromper a leitura atual.
    v-bind="$attrs": encaminha id, class extra, data-*, aria-* do pai.
    :data-brand: habilita cascade de brand tokens no SCSS (_brands.scss).

    NOTA: O wrapper não possui largura/altura definidas via style inline.
    As dimensões vêm exclusivamente de .dss-spinner--size-* no SCSS.
  -->
  <span
    v-bind="$attrs"
    :class="spinnerClasses"
    :data-brand="brand ?? undefined"
    role="status"
    aria-live="polite"
  >
    <!--
      Componente QSpinner* selecionado via prop `type`.

      aria-hidden="true": o SVG animado é puramente decorativo aqui.
        A semântica é fornecida pelo container (role="status") e pelo label.
      size="100%": o SVG preenche as dimensões do wrapper DSS.
        O wrapper é quem controla as dimensões via tokens --dss-icon-size-*.
      :thickness: somente para type='standard' (QSpinner circular).
        Ignorado pelos demais tipos (undefined é seguro).
      class="dss-spinner__inner": preenche 100% do wrapper.
    -->
    <component
      :is="spinnerComponent"
      class="dss-spinner__inner"
      size="100%"
      :thickness="computedThickness"
      aria-hidden="true"
    />

    <!--
      Label acessível — visualmente oculto via CSS sr-only (.dss-spinner__label).
      Lido por screen readers junto com role="status".
      Customizável via prop ariaLabel.
    -->
    <span class="dss-spinner__label">{{ ariaLabel }}</span>
  </span>
</template>
