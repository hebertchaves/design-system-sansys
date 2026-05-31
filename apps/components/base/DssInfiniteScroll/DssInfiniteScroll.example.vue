<script setup lang="ts">
import { ref } from 'vue'
import DssInfiniteScroll from './DssInfiniteScroll.vue'

// ─── Utilitário: gerar itens mock ─────────────────────────────────────────────

function makeItems(from: number, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: from + i + 1,
    label: `Item ${from + i + 1}`,
  }))
}

// ─── Cenário 1: Lista básica com carregamento simulado ────────────────────────

const items1 = ref(makeItems(0, 20))
const MAX_ITEMS = 80

async function onLoad1(index: number, done: (stop?: boolean) => void) {
  // Simula latência de rede
  await new Promise(resolve => setTimeout(resolve, 800))
  const next = makeItems(items1.value.length, 20)
  items1.value.push(...next)
  const stop = items1.value.length >= MAX_ITEMS
  done(stop)
}

// ─── Cenário 2: Com scroll-target customizado (container fixo) ────────────────

const items2 = ref(makeItems(0, 10))

async function onLoad2(index: number, done: (stop?: boolean) => void) {
  await new Promise(resolve => setTimeout(resolve, 600))
  items2.value.push(...makeItems(items2.value.length, 10))
  done(items2.value.length >= 60)
}

// ─── Cenário 3: Modo reverse (chat / mensageiro) ──────────────────────────────

const messages = ref(
  Array.from({ length: 15 }, (_, i) => ({
    id: 100 - i,
    text: `Mensagem ${100 - i}`,
    mine: i % 3 === 0,
  })).reverse()
)

async function onLoadMessages(index: number, done: (stop?: boolean) => void) {
  await new Promise(resolve => setTimeout(resolve, 700))
  const older = Array.from({ length: 10 }, (_, i) => ({
    id: messages.value[0].id - 10 + i,
    text: `Mensagem ${messages.value[0].id - 10 + i}`,
    mine: i % 3 === 0,
  }))
  messages.value.unshift(...older)
  done(messages.value[0].id <= 1)
}

// ─── Cenário 4: Controle programático ────────────────────────────────────────

const scrollRef = ref<{ trigger: () => void; reset: () => void; stop: () => void; resume: () => void } | null>(null)
const items4 = ref(makeItems(0, 15))
const isStopped = ref(false)

async function onLoad4(index: number, done: (stop?: boolean) => void) {
  await new Promise(resolve => setTimeout(resolve, 500))
  items4.value.push(...makeItems(items4.value.length, 15))
  done(items4.value.length >= 60)
}

function handleStop() {
  isStopped.value = true
  scrollRef.value?.stop()
}

function handleResume() {
  isStopped.value = false
  scrollRef.value?.resume()
}

function handleReset() {
  items4.value = makeItems(0, 15)
  isStopped.value = false
  scrollRef.value?.reset()
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-8); padding: var(--dss-spacing-6);">

    <!-- ─── Cenário 1: Lista básica com carregamento simulado ─────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        1. Lista básica — carrega 20 itens por vez (máx. 80)
      </h3>
      <div
        id="scroll-container-1"
        style="height: 300px; overflow-y: auto; border: 1px solid var(--dss-surface-muted); border-radius: var(--dss-radius-md);"
      >
        <DssInfiniteScroll
          :offset="100"
          scroll-target="#scroll-container-1"
          @load="onLoad1"
        >
          <div
            v-for="item in items1"
            :key="item.id"
            style="
              padding: var(--dss-spacing-3) var(--dss-spacing-4);
              border-bottom: 1px solid var(--dss-surface-muted);
              min-height: 48px;
              display: flex;
              align-items: center;
            "
          >
            <span style="color: var(--dss-text-subtle); margin-right: var(--dss-spacing-3);">#{{ item.id }}</span>
            <span>{{ item.label }}</span>
          </div>

          <template #no-more>
            <span style="color: var(--dss-text-subtle);">
              ✓ Todos os {{ items1.length }} itens carregados
            </span>
          </template>
        </DssInfiniteScroll>
      </div>
      <p style="color: var(--dss-text-subtle); margin-top: var(--dss-spacing-2);">
        Role até o fim para carregar mais. Spinner DSS padrão como loading indicator.
      </p>
    </section>

    <!-- ─── Cenário 2: Scroll-target — container com overflow ─────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        2. Scroll-target customizado (container com overflow: auto)
      </h3>
      <div
        id="scroll-container-2"
        style="height: 250px; overflow-y: auto; border: 1px solid var(--dss-surface-muted); border-radius: var(--dss-radius-md);"
      >
        <DssInfiniteScroll
          :offset="80"
          scroll-target="#scroll-container-2"
          @load="onLoad2"
        >
          <div
            v-for="item in items2"
            :key="item.id"
            style="padding: var(--dss-spacing-3) var(--dss-spacing-4); border-bottom: 1px solid var(--dss-surface-muted);"
          >
            {{ item.label }}
          </div>
        </DssInfiniteScroll>
      </div>
    </section>

    <!-- ─── Cenário 3: Modo reverse (chat) ───────────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        3. Modo reverse — carrega mensagens mais antigas ao rolar para o topo
      </h3>
      <div
        id="scroll-container-3"
        style="height: 280px; overflow-y: auto; border: 1px solid var(--dss-surface-muted); border-radius: var(--dss-radius-md); display: flex; flex-direction: column;"
      >
        <DssInfiniteScroll
          :offset="80"
          :reverse="true"
          scroll-target="#scroll-container-3"
          @load="onLoadMessages"
        >
          <div
            v-for="msg in messages"
            :key="msg.id"
            :style="{
              padding: 'var(--dss-spacing-2) var(--dss-spacing-4)',
              display: 'flex',
              justifyContent: msg.mine ? 'flex-end' : 'flex-start',
            }"
          >
            <span
              :style="{
                background: msg.mine ? 'var(--dss-action-hub)' : 'var(--dss-surface-muted)',
                color: msg.mine ? 'white' : 'inherit',
                padding: 'var(--dss-spacing-2) var(--dss-spacing-3)',
                borderRadius: 'var(--dss-radius-md)',
                maxWidth: '70%',
              }"
            >{{ msg.text }}</span>
          </div>
        </DssInfiniteScroll>
      </div>
      <p style="color: var(--dss-text-subtle); margin-top: var(--dss-spacing-2);">
        Role para o topo para carregar mensagens mais antigas.
      </p>
    </section>

    <!-- ─── Cenário 4: Controle programático ─────────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        4. Controle programático — stop / resume / reset
      </h3>
      <div style="display: flex; gap: var(--dss-spacing-2); margin-bottom: var(--dss-spacing-3);">
        <button
          style="padding: var(--dss-spacing-2) var(--dss-spacing-3); border-radius: var(--dss-radius-sm); border: 1px solid var(--dss-surface-muted);"
          @click="handleStop"
        >Parar</button>
        <button
          style="padding: var(--dss-spacing-2) var(--dss-spacing-3); border-radius: var(--dss-radius-sm); border: 1px solid var(--dss-surface-muted);"
          @click="handleResume"
        >Retomar</button>
        <button
          style="padding: var(--dss-spacing-2) var(--dss-spacing-3); border-radius: var(--dss-radius-sm); border: 1px solid var(--dss-surface-muted);"
          @click="handleReset"
        >Reset</button>
        <span v-if="isStopped" style="color: var(--dss-text-subtle); align-self: center;">
          Scroll pausado
        </span>
      </div>
      <div
        id="scroll-container-4"
        style="height: 250px; overflow-y: auto; border: 1px solid var(--dss-surface-muted); border-radius: var(--dss-radius-md);"
      >
        <DssInfiniteScroll
          ref="scrollRef"
          :offset="100"
          scroll-target="#scroll-container-4"
          @load="onLoad4"
        >
          <div
            v-for="item in items4"
            :key="item.id"
            style="padding: var(--dss-spacing-3) var(--dss-spacing-4); border-bottom: 1px solid var(--dss-surface-muted);"
          >
            {{ item.label }}
          </div>
        </DssInfiniteScroll>
      </div>
    </section>

    <!-- ─── Cenário 5: Brand Hub — loading indicator ─────────────────────── -->
    <section data-brand="hub">
      <h3 style="margin-bottom: var(--dss-spacing-3);">5. Brand Hub</h3>
      <div style="color: var(--dss-text-subtle);">
        DssSpinner herda <code>currentColor</code> do contexto.
        Em brand hub, o spinner e o texto no-more assumem a cor
        <code>--dss-action-hub</code>.
      </div>
    </section>

  </div>
</template>
