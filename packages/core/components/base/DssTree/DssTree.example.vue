<script setup lang="ts">
// DssTree — Exemplos interativos
import { ref } from 'vue'
import DssTree from './DssTree.vue'

// ─── Dados compartilhados ────────────────────────────────────────────────────

const nodes = [
  {
    id: 'tecnologia',
    label: 'Tecnologia',
    children: [
      {
        id: 'frontend',
        label: 'Front-end',
        children: [
          { id: 'vue', label: 'Vue.js' },
          { id: 'react', label: 'React' },
          { id: 'angular', label: 'Angular' }
        ]
      },
      {
        id: 'backend',
        label: 'Back-end',
        children: [
          { id: 'node', label: 'Node.js' },
          { id: 'python', label: 'Python' },
          { id: 'java', label: 'Java' }
        ]
      }
    ]
  },
  {
    id: 'design',
    label: 'Design',
    children: [
      { id: 'ux', label: 'UX Research' },
      { id: 'ui', label: 'UI Design' },
      { id: 'ds', label: 'Design Systems' }
    ]
  },
  {
    id: 'dados',
    label: 'Dados',
    disabled: false,
    children: [
      { id: 'analytics', label: 'Analytics' },
      { id: 'bi', label: 'Business Intelligence' }
    ]
  }
]

// ─── Cenário 1: Seleção simples ───────────────────────────────────────────

const selected = ref(null)
const expanded1 = ref(['tecnologia'])

// ─── Cenário 2: Modo checkbox (tick) ─────────────────────────────────────

const ticked = ref([])

// ─── Cenário 3: Filtro externo ────────────────────────────────────────────

const filter = ref('')

// ─── Cenário 4: Lazy loading ─────────────────────────────────────────────

const lazyNodes = ref([
  { id: 'root-1', label: 'Categorias', lazy: true },
  { id: 'root-2', label: 'Projetos', lazy: true }
])

function onLazyLoad ({ node, key, done, fail }) {
  setTimeout(() => {
    done([
      { id: `${key}-filho-1`, label: `${node.label} — Item 1` },
      { id: `${key}-filho-2`, label: `${node.label} — Item 2` },
      { id: `${key}-filho-3`, label: `${node.label} — Item 3` }
    ])
  }, 800)
}

// ─── Cenário 5: API imperativa ───────────────────────────────────────────

const treeRef = ref()

function expandAll () {
  treeRef.value?.expandAll()
}

function collapseAll () {
  treeRef.value?.collapseAll()
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-gap-6); padding: var(--dss-padding-4);">

    <!-- Cenário 1: Seleção simples -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">Seleção simples</h3>
      <p style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); margin-bottom: var(--dss-spacing-3);">
        Selecionado: {{ selected ?? '(nenhum)' }}
      </p>
      <DssTree
        v-model:selected="selected"
        v-model:expanded="expanded1"
        :nodes="nodes"
        node-key="id"
      />
    </section>

    <!-- Cenário 2: Modo checkbox (tick-strategy leaf) -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">Modo checkbox (tick-strategy=leaf)</h3>
      <p style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); margin-bottom: var(--dss-spacing-3);">
        Marcados: {{ ticked.join(', ') || '(nenhum)' }}
      </p>
      <DssTree
        v-model:ticked="ticked"
        :nodes="nodes"
        node-key="id"
        tick-strategy="leaf"
      />
    </section>

    <!-- Cenário 3: Com filtro externo -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">Filtro externo</h3>
      <q-input
        v-model="filter"
        dense
        outlined
        debounce="300"
        placeholder="Filtrar nós..."
        clearable
        style="margin-bottom: var(--dss-spacing-3); max-width: 280px;"
      />
      <DssTree
        :nodes="nodes"
        node-key="id"
        :filter="filter"
        default-expand-all
      />
    </section>

    <!-- Cenário 4: Lazy loading -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">Lazy loading</h3>
      <DssTree
        :nodes="lazyNodes"
        node-key="id"
        @lazy-load="onLazyLoad"
      />
    </section>

    <!-- Cenário 5: API imperativa + Dense -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">API imperativa (expandAll/collapseAll) + Dense</h3>
      <div style="display: flex; gap: var(--dss-gap-3); margin-bottom: var(--dss-spacing-3);">
        <q-btn flat dense no-caps label="Expandir todos" @click="expandAll" />
        <q-btn flat dense no-caps label="Colapsar todos" @click="collapseAll" />
      </div>
      <DssTree
        ref="treeRef"
        :nodes="nodes"
        node-key="id"
        dense
      />
    </section>

    <!-- Cenário 6: Brand Hub -->
    <section data-brand="hub">
      <h3 style="margin-bottom: var(--dss-spacing-3);">Brand Hub</h3>
      <DssTree
        v-model:selected="selected"
        :nodes="nodes"
        node-key="id"
      />
    </section>

  </div>
</template>
