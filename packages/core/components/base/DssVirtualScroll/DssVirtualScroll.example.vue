<script setup lang="ts">
import { ref, computed } from 'vue'
import DssVirtualScroll from './DssVirtualScroll.vue'

// ─── Mock Data ────────────────────────────────────────────────────────────────

function generateItems(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    label: `Item ${i + 1}`,
    description: `Descrição do item ${i + 1}`,
    status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'pending' : 'inactive',
  }))
}

// ─── Scenario 1 — Lista básica com 1000 itens ────────────────────────────────

const itemsBasic = generateItems(1000)

// ─── Scenario 2 — Estado de loading ─────────────────────────────────────────

const isLoading = ref(true)
const itemsLoaded = ref<Array<{ id: number; label: string }>>([])

setTimeout(() => {
  itemsLoaded.value = generateItems(500)
  isLoading.value = false
}, 2000)

// ─── Scenario 3 — Estado vazio ───────────────────────────────────────────────

const emptyItems = ref<Array<{ id: number; label: string }>>([])

// ─── Scenario 4 — Tabela virtualizada ────────────────────────────────────────

interface TableRow { id: number; name: string; email: string; role: string }
const tableRows: TableRow[] = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: `Usuário ${i + 1}`,
  email: `usuario${i + 1}@exemplo.com`,
  role: i % 2 === 0 ? 'Administrador' : 'Visualizador',
}))

// ─── Scenario 5 — Scroll events ──────────────────────────────────────────────

const lastScrollIndex = ref(0)
const itemsScrollable = generateItems(10000)

function onScroll(payload: { index: number; from: number; to: number }) {
  lastScrollIndex.value = payload.index
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-8); padding: var(--dss-spacing-6);">

    <!-- ─── Cenário 1: Lista básica com 1000 itens ──────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        1. Lista básica — 1.000 itens
      </h3>
      <div style="height: 300px; border: 1px solid var(--dss-surface-muted); border-radius: var(--dss-radius-md); overflow: hidden;">
        <DssVirtualScroll :items="itemsBasic" :item-size="48">
          <template #default="{ item, index, ariaSetsize, ariaPosinset }">
            <div
              role="listitem"
              :aria-setsize="ariaSetsize"
              :aria-posinset="ariaPosinset"
              style="
                display: flex;
                align-items: center;
                padding: var(--dss-spacing-3) var(--dss-spacing-4);
                border-bottom: 1px solid var(--dss-surface-muted);
                min-height: 48px;
              "
            >
              <span style="color: var(--dss-text-subtle); margin-right: var(--dss-spacing-3);">
                #{{ item.id }}
              </span>
              <span>{{ item.label }}</span>
            </div>
          </template>
        </DssVirtualScroll>
      </div>
      <p style="color: var(--dss-text-subtle); margin-top: var(--dss-spacing-2);">
        ✓ Apenas ~10 items renderizados no DOM a qualquer momento.
      </p>
    </section>

    <!-- ─── Cenário 2: Estado de loading ───────────────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        2. Estado de loading (carrega em 2 segundos)
      </h3>
      <div style="height: 200px; border: 1px solid var(--dss-surface-muted); border-radius: var(--dss-radius-md); overflow: hidden;">
        <DssVirtualScroll :items="itemsLoaded" :item-size="48" :loading="isLoading">
          <template #default="{ item, index, ariaSetsize, ariaPosinset }">
            <div
              role="listitem"
              :aria-setsize="ariaSetsize"
              :aria-posinset="ariaPosinset"
              style="padding: var(--dss-spacing-3) var(--dss-spacing-4); min-height: 48px; border-bottom: 1px solid var(--dss-surface-muted);"
            >
              {{ item.label }}
            </div>
          </template>
        </DssVirtualScroll>
      </div>
    </section>

    <!-- ─── Cenário 3: Estado vazio ─────────────────────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        3. Estado vazio (items=[])
      </h3>
      <div style="height: 150px; border: 1px solid var(--dss-surface-muted); border-radius: var(--dss-radius-md); overflow: hidden;">
        <DssVirtualScroll :items="emptyItems" :item-size="48">
          <template #default="{ item }">
            <div>{{ item }}</div>
          </template>
          <template #empty>
            <div style="text-align: center; color: var(--dss-text-subtle);">
              <div style="font-size: var(--dss-font-size-lg, 1.5rem); margin-bottom: var(--dss-spacing-2);">📭</div>
              <p>Nenhum resultado encontrado.</p>
            </div>
          </template>
        </DssVirtualScroll>
      </div>
    </section>

    <!-- ─── Cenário 4: Tabela virtualizada com 5.000 linhas ─────────────────── -->
    <!--
      NOTA ARQUITETURAL: DssVirtualScroll sempre renderiza um <div> como root.
      Com type="table", o QVirtualScroll interno gera a estrutura <table>/<tbody>
      automaticamente. O consumidor fornece apenas os <tr> no slot default.
      Para cabeçalho fixo, usar o slot #prepend com uma tabela separada
      (mesmas larguras de coluna via CSS grid ou colgroup).
    -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        4. Tabela virtualizada — 5.000 linhas (type="table")
      </h3>
      <div style="height: 300px; border: 1px solid var(--dss-surface-muted); border-radius: var(--dss-radius-md); overflow: hidden;">
        <DssVirtualScroll
          type="table"
          :items="tableRows"
          :item-size="40"
        >
          <template #prepend>
            <!-- Cabeçalho fixo via slot prepend — fora da área virtualizada -->
            <div style="display: grid; grid-template-columns: 60px 1fr 1fr 120px; background: var(--dss-surface-default); border-bottom: 2px solid var(--dss-surface-muted);">
              <span style="padding: var(--dss-spacing-2) var(--dss-spacing-4); font-weight: 600;">ID</span>
              <span style="padding: var(--dss-spacing-2) var(--dss-spacing-4); font-weight: 600;">Nome</span>
              <span style="padding: var(--dss-spacing-2) var(--dss-spacing-4); font-weight: 600;">E-mail</span>
              <span style="padding: var(--dss-spacing-2) var(--dss-spacing-4); font-weight: 600;">Papel</span>
            </div>
          </template>
          <template #default="{ item, index, ariaSetsize, ariaPosinset }">
            <tr
              role="row"
              :aria-setsize="ariaSetsize"
              :aria-posinset="ariaPosinset"
              :style="{ background: index % 2 === 0 ? 'transparent' : 'var(--dss-surface-subtle)' }"
            >
              <td style="padding: var(--dss-spacing-2) var(--dss-spacing-4); width: 60px;">{{ item.id }}</td>
              <td style="padding: var(--dss-spacing-2) var(--dss-spacing-4);">{{ item.name }}</td>
              <td style="padding: var(--dss-spacing-2) var(--dss-spacing-4); color: var(--dss-text-subtle);">{{ item.email }}</td>
              <td style="padding: var(--dss-spacing-2) var(--dss-spacing-4); width: 120px;">{{ item.role }}</td>
            </tr>
          </template>
        </DssVirtualScroll>
      </div>
    </section>

    <!-- ─── Cenário 5: Scroll event tracking ────────────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        5. Eventos de scroll — 10.000 itens
      </h3>
      <p style="color: var(--dss-text-subtle); margin-bottom: var(--dss-spacing-2);">
        Índice visível atual: <strong>{{ lastScrollIndex }}</strong>
      </p>
      <div style="height: 250px; border: 1px solid var(--dss-surface-muted); border-radius: var(--dss-radius-md); overflow: hidden;">
        <DssVirtualScroll
          :items="itemsScrollable"
          :item-size="40"
          @scroll="onScroll"
        >
          <template #default="{ item, index, ariaSetsize, ariaPosinset }">
            <div
              role="listitem"
              :aria-setsize="ariaSetsize"
              :aria-posinset="ariaPosinset"
              style="padding: var(--dss-spacing-2) var(--dss-spacing-4); min-height: 40px; display: flex; align-items: center; gap: var(--dss-spacing-2); border-bottom: 1px solid var(--dss-surface-muted);"
            >
              <span style="color: var(--dss-text-subtle); min-width: 60px;">#{{ item.id }}</span>
              <span>{{ item.label }}</span>
            </div>
          </template>
        </DssVirtualScroll>
      </div>
    </section>

    <!-- ─── Brand: Hub ───────────────────────────────────────────────────────── -->
    <section data-brand="hub">
      <h3 style="margin-bottom: var(--dss-spacing-3);">6. Brand Hub — Loading</h3>
      <div style="height: 150px; border: 1px solid var(--dss-surface-muted); border-radius: var(--dss-radius-md); overflow: hidden;">
        <DssVirtualScroll :items="[]" :loading="true" :item-size="48">
          <template #default="{ item }">{{ item }}</template>
        </DssVirtualScroll>
      </div>
    </section>

  </div>
</template>
