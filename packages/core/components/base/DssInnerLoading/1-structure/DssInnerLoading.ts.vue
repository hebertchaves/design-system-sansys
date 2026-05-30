<script setup lang="ts">
/**
 * DssInnerLoading — Implementação Canônica
 *
 * Wrapper DSS para QInnerLoading do Quasar.
 * Fornece overlay de loading posicionado absolutamente dentro de um container.
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA — CLAUDE.md §7.1) ────
 *
 * inheritAttrs: false
 *   $attrs (class extra, id, data-*, aria-* adicionais do pai) são
 *   encaminhados explicitamente ao QInnerLoading root via v-bind="$attrs".
 *   Attrs declarados como props (showing, color, size, label, delay, brand)
 *   são extraídos automaticamente de $attrs pelo Vue e NÃO são repassados.
 *
 * QInnerLoading como root element (EXC-Gate-01):
 *   QInnerLoading provê nativamente: position: absolute, top/left/right/bottom:0,
 *   display: flex, flex-direction: column, align-items: center,
 *   justify-content: center e transição de fade via Vue <Transition>.
 *   Duplicar essa lógica em um wrapper div seria redundante e perigoso.
 *
 * CSS `color` como canal de cor para DssSpinner:
 *   A prop `color` de DssInnerLoading controla a propriedade CSS `color`
 *   no root (via classes .dss-inner-loading--color-*).
 *   DssSpinner, renderizado sem prop `color` explícita, herda `currentColor`
 *   do ancestral, aplicando a cor correta ao SVG animado.
 *   DssSpinner com `aria-hidden="true"` — anúncio de loading é responsabilidade
 *   do root (role="status") do DssInnerLoading, não do DssSpinner aninhado.
 *
 * Container pai requer `position: relative` (ou absolute):
 *   QInnerLoading usa `position: absolute` internamente — o container pai
 *   DEVE ter `position: relative` para que o overlay cubra apenas a área desejada.
 *   Documentado em README.md e DssInnerLoading.md como requisito obrigatório.
 *
 * Slot default como substituto completo:
 *   Quando o slot default é preenchido pelo consumer, o DssSpinner e o label
 *   internos NÃO são renderizados. O consumer assume controle total do conteúdo
 *   do overlay, incluindo acessibilidade.
 *
 * defineEmits omitido:
 *   DssInnerLoading é um container de feedback não-emissor. Nenhum evento
 *   é disparado pelo componente. Precedente: DssLinearProgress, DssCircularProgress.
 *
 * Estados NÃO APLICÁVEIS:
 *   - hover/focus/active: o overlay NÃO é interativo (pointer-events: all bloqueia
 *     interação com o conteúdo abaixo, mas o overlay em si não é clicável por design)
 *   - disabled: um overlay de loading não possui estado "disabled" — está showing ou não
 *   - error: estado de erro deve ser comunicado por DssBanner ou outro componente
 *
 * @see DssBadge — Golden Reference (governança não interativa)
 * @see DssCircularProgress — Golden Context (família Progresso e Feedback)
 */

import { defineOptions, defineProps, withDefaults, defineSlots } from 'vue'
import { QInnerLoading } from 'quasar'
import DssSpinner from '../../DssSpinner/DssSpinner.vue'
import type { InnerLoadingProps, InnerLoadingSlots } from '../types/innerloading.types'
import { useInnerLoadingClasses } from '../composables/useInnerLoadingClasses'

defineOptions({ name: 'DssInnerLoading', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<InnerLoadingProps>(), {
  color: 'primary',
  size:  'md',
})

// ─── Composables ──────────────────────────────────────────────────────────────

const { rootClasses } = useInnerLoadingClasses(props)

// ─── Slots ────────────────────────────────────────────────────────────────────

defineSlots<InnerLoadingSlots>()
</script>

<template>
  <!--
    QInnerLoading como root element — EXC-Gate-01.

    role="status": região live que anuncia o estado de carregamento.
    aria-live="polite": anuncia ao screen reader sem interromper a leitura.
    :class="rootClasses": classes DSS (color, size, brand, has-label).
    :data-brand: habilita cascade de brand tokens no SCSS (_brands.scss).
    :showing="showing": prop fundamental — controla visibilidade do overlay.
    :delay="delay": atraso em ms antes de exibir (undefined = 0ms).
    v-bind="$attrs": encaminha id, class extra, data-*, aria-* adicionais do consumer.

    NOTA: `role` e `aria-live` são posicionados ANTES de v-bind="$attrs"
    para que o consumer possa sobrescrevê-los se necessário (ex: aria-live="assertive").

    NOTA: props `color`, `size`, `label`, `showing`, `delay`, `brand` são extraídas
    de $attrs pelo Vue automaticamente — NÃO são repassadas ao QInnerLoading via $attrs.
  -->
  <QInnerLoading
    role="status"
    aria-live="polite"
    :class="rootClasses"
    :data-brand="brand ?? undefined"
    :showing="showing"
    :delay="delay"
    v-bind="$attrs"
  >
    <!--
      Slot default: conteúdo do overlay.

      Quando não preenchido pelo consumer:
        - DssSpinner: spinner visual, sem prop `color` (herda currentColor do root).
          aria-hidden="true": semântica de status é responsabilidade do root.
        - .dss-inner-loading__label: texto opcional abaixo do spinner.
          v-if="label": renderizado somente quando a prop `label` é passada.

      Quando preenchido pelo consumer:
        - DssSpinner e label internos NÃO são renderizados.
        - Consumer é responsável pela acessibilidade do conteúdo customizado.
    -->
    <slot>
      <DssSpinner
        :size="size"
        aria-hidden="true"
      />
      <span
        v-if="label"
        class="dss-inner-loading__label"
      >{{ label }}</span>
    </slot>
  </QInnerLoading>
</template>
