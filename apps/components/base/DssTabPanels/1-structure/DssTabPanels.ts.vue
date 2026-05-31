<script setup lang="ts">
/**
 * ==========================================================================
 * DssTabPanels — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Container pai dos DssTabPanel. Wrapper DSS governado sobre QTabPanels.
 * Gerencia qual painel está ativo via v-model e coordena transições.
 *
 * Responsabilidades:
 * - Recebe `modelValue` (v-model) e repassa ao QTabPanels para sincronização
 *   de qual painel está visível (via provide/inject Quasar interno)
 * - Governa transições entre painéis quando animated=true:
 *   - Transition name: "dss-tab-panels" (bloqueando transition-prev/next da API)
 *   - Fade direction-agnostic para prev e next (sem motion direcional)
 *   - Tokens: --dss-duration-200 + --dss-easing-standard
 *   - Respeita prefers-reduced-motion via --dss-duration-0
 * - Suporta swipe em dispositivos touch via `swipeable`
 * - Suporta navegação cíclica via `infinite`
 * - Preserva estado dos painéis inativos via `keepAlive` (Vue KeepAlive)
 * - Bloqueia `dark` — dark mode governado globalmente pelo DSS
 * - Bloqueia `transition-prev` / `transition-next` — governados internamente
 *
 * Gate de Responsabilidade v2.4:
 * - DssTabPanels NÃO possui estados de :hover, :focus ou :active próprios
 * - É container orquestrador não-interativo
 * - Interatividade pertence exclusivamente aos componentes filhos no slot
 *
 * Gate de Composição v2.4:
 * - Slot default aceita APENAS componentes DssTabPanel
 * - Não instancia filhos automaticamente
 * - Não estiliza filhos internamente via ::v-deep
 * - Composição é responsabilidade do consumidor
 *
 * Padrão arquitetural (Level 1 DOM, Level 2 DSS):
 * Usa <q-tab-panels> como elemento raiz (Level 1 DOM pattern),
 * seguindo o precedente do DssTabPanel (<q-tab-panel> como root).
 * "Level 2 DSS" refere-se à hierarquia de composição (contém DssTabPanel
 * filhos), não ao DOM — não é necessário wrapper <div> externo pois
 * DssTabPanels não adiciona elementos além do slot.
 *
 * Separação de responsabilidades dos <style> blocks:
 * - <style scoped>: estilos base, high-contrast, forced-colors (via module)
 * - <style> global: classes de transição Vue — DEVEM ser globais pois Vue
 *   as aplica nos filhos do slot (DssTabPanel), fora do escopo data-v-xxx
 *   do root DssTabPanels. Scoped style adicionaria [data-v-xxx] ao seletor,
 *   impedindo a aplicação correta pelo Vue transition system.
 *
 * @version 1.0.0
 * @see https://quasar.dev/vue-components/tab-panels
 */

import type { TabPanelsProps, TabPanelsEmits, TabPanelsSlots } from '../types/tab-panels.types'
import { useTabPanelsClasses } from '../composables/useTabPanelsClasses'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssTabPanels',
  inheritAttrs: false,
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<TabPanelsProps>(), {
  animated: false,
  swipeable: false,
  infinite: false,
  keepAlive: false,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<TabPanelsEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<TabPanelsSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { tabPanelsClasses } = useTabPanelsClasses(props)

// ==========================================================================
// CONSTANTS
// ==========================================================================

/**
 * Nome da transição Vue governada pelo DSS.
 * Aplicada internamente quando animated=true.
 * Bloqueia as props transition-prev e transition-next da API pública.
 *
 * CSS classes correspondentes:
 * - .dss-tab-panels-enter-active / .dss-tab-panels-leave-active
 * - .dss-tab-panels-enter-from / .dss-tab-panels-leave-to
 * Definidas no bloco <style> global abaixo (não scoped).
 *
 * Fade direction-agnostic (mesmo nome para prev e next):
 * - Sem motion direcional (não causa desconforto vestibular)
 * - Funciona corretamente em layouts RTL
 * - Semanticamente neutro entre navegação "anterior" e "próximo"
 */
const DSS_TRANSITION = 'dss-tab-panels' as const
</script>

<template>
  <!--
    DssTabPanels — Container pai dos DssTabPanel

    Padrão Level 1 DOM (igual ao DssTabPanel):
    <q-tab-panels> é o elemento raiz. No DOM renderizado:
    <div class="q-tab-panels q-panel-parent dss-tab-panels [dss-tab-panels--animated]" tabindex="-1">

    tabindex="-1": aplicado nativamente pelo QTabPanels.
    Permite foco programático (JavaScript) mas não via Tab de teclado.
    Correto: navegação por Tab pertence aos filhos interativos (DssTab).

    v-bind="$attrs": repassa atributos extras (data-*, aria-*, id) ao root,
    seguindo padrão DSS com inheritAttrs: false.

    Gate de Composição v2.4:
    O slot default aceita EXCLUSIVAMENTE DssTabPanel.
    QTabPanels gerencia show/hide via provide/inject com os DssTabPanel filhos
    (que encapsulam QTabPanel) baseado em modelValue ↔ name.

    Transições (quando animated=true):
    - transition-prev="dss-tab-panels" e transition-next="dss-tab-panels"
    - Fade direction-agnostic: sem slide direcional para prev ou next
    - CSS no bloco <style> global abaixo
    - prefers-reduced-motion: transition-duration = var(--dss-duration-0)

    Quando animated=false (default):
    - transition-prev e transition-next são undefined
    - QTabPanels troca painéis instantaneamente
  -->
  <q-tab-panels
    :class="tabPanelsClasses"
    :model-value="modelValue"
    :animated="animated"
    :transition-prev="animated ? DSS_TRANSITION : undefined"
    :transition-next="animated ? DSS_TRANSITION : undefined"
    :swipeable="swipeable"
    :infinite="infinite"
    :keep-alive="keepAlive"
    v-bind="$attrs"
    @update:model-value="(val) => emit('update:modelValue', val as string | number)"
  >
    <!-- Gate de Composição v2.4: apenas DssTabPanel permitido neste slot -->
    <slot />
  </q-tab-panels>
</template>

<style lang="scss" scoped>
/**
 * Uso de <style scoped> alinhado com Golden Reference (DssCard) e DssTabPanel.
 * Com <q-tab-panels> como root (Level 1 DOM pattern), Vue adiciona data-v-xxx
 * ao elemento raiz — estilos do módulo ficam escopados ao componente.
 *
 * SEPARAÇÃO OBRIGATÓRIA (ver bloco <style> global abaixo):
 * Este bloco scoped cobre via DssTabPanels.module.scss:
 *   - background transparent (2-composition/_base.scss)
 *   - high-contrast outline (4-output/_states.scss)
 *   - forced-colors border (4-output/_states.scss)
 *
 * O bloco <style> global (não scoped) cobre:
 *   - Classes de transição Vue (.dss-tab-panels-enter-active, etc.)
 *   - prefers-reduced-motion para transições
 * Essas classes NÃO podem ser scoped — Vue as aplica nos filhos do slot.
 */
@import '../DssTabPanels.module.scss';
</style>

<style lang="scss">
/**
 * Classes de transição Vue — NÃO scoped (obrigatório).
 *
 * Vue aplica estas classes nos elementos filhos do slot (DssTabPanel)
 * durante a transição entre painéis. Esses elementos estão fora do
 * escopo data-v-xxx do root DssTabPanels, portanto scoped style NÃO
 * funcionaria — o seletor ficaria com [data-v-xxx] que não existe
 * nos elementos de transição.
 *
 * Transition name: "dss-tab-panels" (definida internamente como DSS_TRANSITION).
 * Bloqueia transition-prev/transition-next da API pública do QTabPanels.
 *
 * Design decision — Fade direction-agnostic:
 * O mesmo nome de transição é usado para prev e next.
 * Sem motion direcional (slide), apenas fade de opacidade.
 * Razão: evitar desconforto vestibular, funcionar em RTL,
 * e manter consistência semântica entre "anterior" e "próximo".
 *
 * Tokens utilizados:
 * - --dss-duration-200: duração padrão de animações de UI no DSS
 * - --dss-easing-standard: cubic-bezier(0.4, 0, 0.2, 1) — Material Design
 * - --dss-duration-0: zero ms — elimina animação em prefers-reduced-motion
 */

/* Fase de entrada (painel tornando-se visível) */
.dss-tab-panels-enter-active {
  transition: opacity var(--dss-duration-200) var(--dss-easing-standard);
}

/* Fase de saída (painel tornando-se invisível) */
.dss-tab-panels-leave-active {
  transition: opacity var(--dss-duration-200) var(--dss-easing-standard);
}

/* Estado inicial do enter: opaco 0 → fade in para 1 */
.dss-tab-panels-enter-from,
/* Estado final do leave: opaco 1 → fade out para 0 */
.dss-tab-panels-leave-to {
  opacity: 0;
}

/* Acessibilidade: desativar animações quando usuário prefere movimento reduzido */
@media (prefers-reduced-motion: reduce) {
  .dss-tab-panels-enter-active,
  .dss-tab-panels-leave-active {
    transition-duration: var(--dss-duration-0);
  }
}
</style>
