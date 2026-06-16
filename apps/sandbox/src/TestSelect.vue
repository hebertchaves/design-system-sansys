<template>
  <div class="ts-page" :data-theme="isDark ? 'dark' : undefined">
    <header class="ts-hero">
      <div>
        <h1 class="ts-title">DssSelect — Playground</h1>
        <p class="ts-sub">Inspeção real do wrapper Quasar <code>q-field</code> (auto-height). Compare a altura com o DssInput.</p>
      </div>
      <button class="ts-toggle" type="button" @click="isDark = !isDark">
        {{ isDark ? '☀ Light' : '☾ Dark' }}
      </button>
    </header>

    <!-- Comparação direta de altura: Input vs Select (mesma label) -->
    <section class="ts-section">
      <h2 class="ts-h2">Altura: DssInput × DssSelect (outlined, com label)</h2>
      <div class="ts-grid">
        <DemoTile code="DssInput outlined">
          <DssInput variant="outlined" label="Campo" v-model="txt" />
        </DemoTile>
        <DemoTile code="DssSelect outlined" data-probe="select-outlined">
          <DssSelect variant="outlined" label="Seleção" :options="opts" v-model="sel" />
        </DemoTile>
      </div>
    </section>

    <!-- Variantes -->
    <section class="ts-section">
      <h2 class="ts-h2">Variantes</h2>
      <div class="ts-grid">
        <DemoTile v-for="v in VARIANTS" :key="v" :code="`variant=${v}`">
          <DssSelect :variant="v" label="Seleção" :options="opts" v-model="sel" />
        </DemoTile>
      </div>
    </section>

    <!-- Densidade -->
    <section class="ts-section">
      <h2 class="ts-h2">Densidade</h2>
      <div class="ts-grid">
        <DemoTile code="default (44px)">
          <DssSelect variant="outlined" label="Confortável" :options="opts" v-model="sel" />
        </DemoTile>
        <DemoTile code="dense">
          <DssSelect variant="outlined" dense label="Compacto" :options="opts" v-model="sel" />
        </DemoTile>
      </div>
    </section>

    <!-- Estados -->
    <section class="ts-section">
      <h2 class="ts-h2">Estados</h2>
      <div class="ts-grid">
        <DemoTile code="disabled">
          <DssSelect variant="outlined" disabled label="Desabilitado" :options="opts" v-model="sel" />
        </DemoTile>
        <DemoTile code="com valor">
          <DssSelect variant="outlined" label="Preenchido" :options="opts" v-model="selFilled" />
        </DemoTile>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import DssInput  from '@components/base/DssInput/DssInput.vue'
import DssSelect from '@components/base/DssSelect/DssSelect.vue'

const VARIANTS = ['outlined', 'filled', 'standout', 'borderless'] as const

const isDark = ref(false)
const txt = ref('')
const sel = ref(null)
const selFilled = ref('Opção 1')
const opts = ['Opção 1', 'Opção 2', 'Opção 3']

const DemoTile = (_props: { code: string }, { slots }: any) => h(
  'div', { class: 'ts-tile' }, [
    h('div', { class: 'ts-tile__stage' }, slots.default?.()),
    h('code', { class: 'ts-tile__code' }, _props.code),
  ]
)
DemoTile.props = ['code']
</script>

<style scoped>
.ts-page {
  min-height: 100%;
  background: var(--dss-surface-subtle);
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  padding: var(--dss-spacing-6);
}
[data-theme="dark"].ts-page { background: var(--dss-gray-900); }
.ts-hero {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: var(--dss-spacing-6);
}
.ts-title { font-size: var(--dss-font-size-2xl); margin: 0; }
.ts-sub { color: var(--dss-text-secondary); margin: var(--dss-spacing-1) 0 0; }
.ts-toggle {
  border: var(--dss-border-width-thin) solid var(--dss-gray-400);
  background: transparent; color: inherit; cursor: pointer;
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  border-radius: var(--dss-radius-sm);
}
.ts-section { margin-bottom: var(--dss-spacing-8); }
.ts-h2 { font-size: var(--dss-font-size-lg); margin: 0 0 var(--dss-spacing-3); }
.ts-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--dss-spacing-4);
}
.ts-tile {
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-gray-300);
  border-radius: var(--dss-radius-md);
  padding: var(--dss-spacing-4);
}
[data-theme="dark"] .ts-tile { background: var(--dss-gray-800); border-color: var(--dss-gray-700); }
.ts-tile__stage { margin-bottom: var(--dss-spacing-3); }
.ts-tile__code {
  font-size: var(--dss-font-size-xs); color: var(--dss-text-secondary);
  font-family: var(--dss-font-family-mono, monospace);
}
</style>
