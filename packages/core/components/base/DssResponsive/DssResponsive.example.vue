<script setup lang="ts">
import { ref } from 'vue'
import DssResponsive from './DssResponsive.vue'
import DssButton from '../DssButton/DssButton.vue'

const simulatedTag = ref<'div' | 'section' | 'aside'>('div')
</script>

<template>
  <div class="q-pa-md column q-gutter-lg">

    <!-- Cenário 1: showOn — exibe apenas em md+ -->
    <section>
      <p class="text-caption q-mb-sm">showOn: md, lg, xl — visível apenas em desktop</p>
      <DssResponsive :show-on="['md', 'lg', 'xl']">
        <div
          class="q-pa-md rounded-borders"
          style="background: var(--dss-surface-subtle); border: 1px solid var(--dss-gray-200)"
        >
          Conteúdo visível apenas em desktop (md, lg, xl)
        </div>
      </DssResponsive>
    </section>

    <!-- Cenário 2: showOn — exibe apenas em xs, sm -->
    <section>
      <p class="text-caption q-mb-sm">showOn: xs, sm — visível apenas em mobile</p>
      <DssResponsive :show-on="['xs', 'sm']">
        <div
          class="q-pa-md rounded-borders"
          style="background: var(--dss-surface-muted); border: 1px solid var(--dss-gray-200)"
        >
          Conteúdo visível apenas em mobile (xs, sm)
        </div>
      </DssResponsive>
    </section>

    <!-- Cenário 3: hideOn — oculta em xs -->
    <section>
      <p class="text-caption q-mb-sm">hideOn: xs — oculto apenas em tela extra-pequena</p>
      <DssResponsive :hide-on="['xs']">
        <div
          class="q-pa-md rounded-borders"
          style="background: var(--dss-surface-subtle); border: 1px solid var(--dss-gray-300)"
        >
          Conteúdo oculto apenas em xs
        </div>
      </DssResponsive>
    </section>

    <!-- Cenário 4: Slot scope — expõe estado reativo -->
    <section>
      <p class="text-caption q-mb-sm">Slot scope — estado reativo do breakpoint</p>
      <DssResponsive v-slot="{ currentBreakpoint, isMobile, isDesktop }">
        <div
          class="q-pa-md rounded-borders column q-gutter-xs"
          style="background: var(--dss-surface-default); border: 1px solid var(--dss-gray-200)"
        >
          <span>Breakpoint atual: <strong>{{ currentBreakpoint }}</strong></span>
          <span>isMobile: <strong>{{ isMobile }}</strong></span>
          <span>isDesktop: <strong>{{ isDesktop }}</strong></span>
        </div>
      </DssResponsive>
    </section>

    <!-- Cenário 5: breakpoint + slot scope combinados -->
    <section>
      <p class="text-caption q-mb-sm">breakpoint: sm, md — visível + slot scope</p>
      <DssResponsive
        v-slot="{ currentBreakpoint, isXs, isSm, isMd, isLg, isXl }"
        :breakpoint="['sm', 'md']"
      >
        <div
          class="q-pa-md rounded-borders column q-gutter-xs"
          style="background: var(--dss-surface-subtle); border: 1px solid var(--dss-gray-200)"
        >
          <span>Você está em: <strong>{{ currentBreakpoint }}</strong></span>
          <span>xs: {{ isXs }} | sm: {{ isSm }} | md: {{ isMd }} | lg: {{ isLg }} | xl: {{ isXl }}</span>
        </div>
      </DssResponsive>
    </section>

    <!-- Cenário 6: tag customizado -->
    <section>
      <p class="text-caption q-mb-sm">Tag customizado (section/aside/div)</p>
      <div class="q-gutter-sm row">
        <DssButton
          v-for="t in ['div', 'section', 'aside']"
          :key="t"
          :label="t"
          :outline="simulatedTag !== t"
          dense
          @click="simulatedTag = t as typeof simulatedTag['value']"
        />
      </div>
      <DssResponsive :tag="simulatedTag" class="q-mt-sm">
        <div
          class="q-pa-md rounded-borders"
          style="background: var(--dss-surface-muted); border: 1px solid var(--dss-gray-200)"
        >
          Wrapper renderizado como: <strong>&lt;{{ simulatedTag }}&gt;</strong>
        </div>
      </DssResponsive>
    </section>

    <!-- Cenário 7: Sem constraints — sempre visível -->
    <section>
      <p class="text-caption q-mb-sm">Sem constraints — sempre visível (apenas expõe slot scope)</p>
      <DssResponsive v-slot="{ isMobile, isDesktop }">
        <div
          class="q-pa-md rounded-borders"
          style="background: var(--dss-surface-default); border: 1px solid var(--dss-gray-100)"
        >
          Sempre visível. isMobile={{ isMobile }}, isDesktop={{ isDesktop }}
        </div>
      </DssResponsive>
    </section>

  </div>
</template>
