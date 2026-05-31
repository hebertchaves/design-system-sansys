<script setup lang="ts">
/**
 * ==========================================================================
 * DssTabPanel — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QTabPanel. Painel de conteúdo vinculado a uma aba.
 *
 * Responsabilidades:
 * - Encapsula <q-tab-panel> expondo apenas as props semanticamente relevantes
 * - Recebe `name` para associação com DssTab via DssTabPanels (container pai)
 * - Suporta `disable` para bloquear seleção do painel
 * - Bloqueia a prop `dark` — dark mode é governado globalmente pelo DSS
 *   via [data-theme="dark"] ou classe `.dss-theme-dark`
 * - Fornece slot `default` para composição livre de conteúdo DSS
 * - É um container estrutural NÃO-INTERATIVO: hover/focus/active
 *   pertencem exclusivamente aos componentes filhos
 *
 * Props bloqueadas:
 * - dark: DSS governa dark mode globalmente via tokens e atributo de tema
 *
 * Gate de Responsabilidade v2.4:
 * - O DssTabPanel NÃO possui estados de :hover, :focus ou :active próprios
 * - A interatividade pertence integralmente aos componentes filhos no slot
 *
 * Gate de Composição v2.4:
 * - Fornece apenas slot e container estrutural
 * - Não instancia filhos DSS automaticamente
 * - Não estiliza filhos internamente via ::v-deep
 * - Composição é responsabilidade do consumidor
 *
 * Padrão arquitetural (Nível 1):
 * Usa <q-tab-panel> como elemento raiz, seguindo o precedente do DssTab
 * (componente irmão, Nível 1) que usa <q-tab> como root diretamente.
 * Correção NC-01 (Ciclo 1): removido wrapper <div> externo — DOM pollution
 * para painéis inativos e desvio do padrão Level 1 da família Tabs.
 *
 * @version 1.0.1
 * @see https://quasar.dev/vue-components/tab-panels
 */

import type { TabPanelProps, TabPanelSlots } from '../types/tab-panel.types'
import { useTabPanelClasses } from '../composables/useTabPanelClasses'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssTabPanel',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<TabPanelProps>(), {
  disable: false,
})

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<TabPanelSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { tabPanelClasses } = useTabPanelClasses(props)
</script>

<template>
  <!--
    DssTabPanel — Painel de conteúdo de aba DSS

    Padrão arquitetural Level 1 (NC-01 corrigido — Ciclo 1):
    <q-tab-panel> é o elemento raiz do componente, seguindo o precedente
    do DssTab que usa <q-tab> como root diretamente.

    As classes DSS (tabPanelClasses) são aplicadas diretamente ao <q-tab-panel>.
    No DOM renderizado o elemento fica: <div class="q-tab-panel dss-tab-panel [--disabled]">
    O seletor SCSS .dss-tab-panel.q-tab-panel captura este elemento (EXC-01).

    O QTabPanel gerencia sua própria visibilidade (v-show) via provide/inject
    com o QTabPanels (futuro DssTabPanels) — sem necessidade de wrapper externo.

    v-bind="$attrs" repassa atributos extras (data-*, aria-*, id) para o root,
    seguindo o padrão DSS com inheritAttrs: false.

    role="tabpanel" e aria-labelledby gerenciados nativamente pelo QTabPanel.
  -->
  <q-tab-panel
    :class="tabPanelClasses"
    :name="props.name"
    :disable="props.disable"
    v-bind="$attrs"
  >
    <!-- Slot default: conteúdo livre, composição é responsabilidade do consumidor -->
    <slot />
  </q-tab-panel>
</template>

<style lang="scss" scoped>
/**
 * Uso de <style scoped> intencional e documentado.
 *
 * Alinha-se com o Golden Reference (DssCard), que também usa <style scoped>
 * com @import do módulo principal. O scoped garante que o Vue adicione
 * `data-v-xxx` ao elemento raiz (<q-tab-panel>) e a seus filhos diretos,
 * evitando vazamento de estilos para componentes irmãos na mesma página.
 *
 * Com <q-tab-panel> como root (Level 1 pattern), o comportamento scoped é:
 * - `.dss-tab-panel.q-tab-panel[data-v-xxx]` → elemento raiz ✅
 * - `[data-brand] .dss-tab-panel.q-tab-panel[data-v-xxx]` → cascade ancestral ✅
 * - `[data-theme] .dss-tab-panel.q-tab-panel[data-v-xxx]` → cascade ancestral ✅
 *
 * Divergência vs. DssTab (sem <style>): DssTab delega ao módulo global.
 * DssTabPanel usa scoped por decisão de alinhamento com DssCard (Golden Reference).
 */
@import '../DssTabPanel.module.scss';
</style>
