<script setup lang="ts">
/**
 * DssPageSticky — Exemplos Interativos
 *
 * Cenário 1: FAB (Bottom Right) — DssButton round no canto inferior direito.
 * Cenário 2: Banner (Bottom Expand) — banner persistente em toda a largura inferior.
 * Cenário 3: Elevated — DssButton round com prop elevated=true e sombra visível.
 *
 * EXC-01 (scaffolding): q-layout usado diretamente (mesma decisão de DssHeader.example.vue
 * — QPageSticky requer contexto QLayout para calcular offsets de header/footer).
 *
 * EXC-02 (scaffolding): q-btn-toggle usado para seleção de cenário —
 * não existe equivalente DssBtnToggle no catálogo DSS (Abr 2026).
 */
import { ref } from 'vue'
import DssPageSticky from './DssPageSticky.vue'
import DssHeader from '../DssHeader/DssHeader.vue'
import DssToolbar from '../DssToolbar/DssToolbar.vue'
import DssButton from '../DssButton/DssButton.vue'
import DssSpace from '../DssSpace/DssSpace.vue'

type Scenario = 'fab' | 'banner' | 'elevated'

const activeScenario = ref<Scenario>('fab')
const showBanner = ref(true)

const scenarioOptions = [
  { label: 'FAB', value: 'fab' },
  { label: 'Banner', value: 'banner' },
  { label: 'Elevated', value: 'elevated' }
]

const contentLines = Array.from(
  { length: 20 },
  (_, i) => `Linha ${i + 1} — role para ver o elemento fixo permanecer na tela.`
)

function onScenarioChange () {
  showBanner.value = true
}
</script>

<template>
  <div class="dss-example-showcase">

    <!-- ================================================================
         Cenário 1: FAB Bottom Right
         ================================================================ -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">1. FAB — position="bottom-right"</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" :style="{ minHeight: 'var(--dss-spacing-72)' }">
          <DssHeader>
            <DssToolbar>
              <DssButton flat round icon="menu" aria-label="Menu" />
              <span class="example-toolbar-title">Cenário 1 — FAB padrão</span>
              <DssSpace />
            </DssToolbar>
          </DssHeader>
          <q-page-container>
            <q-page>
              <div
                v-for="(line, i) in contentLines"
                :key="i"
                class="dss-example-content-line"
              >
                {{ line }}
              </div>

              <!-- Cenário 1: DssButton FAB no canto inferior direito -->
              <DssPageSticky position="bottom-right" :offset="[18, 18]">
                <DssButton
                  round
                  icon="add"
                  color="primary"
                  aria-label="Adicionar item"
                />
              </DssPageSticky>
            </q-page>
          </q-page-container>
        </q-layout>
      </div>
    </section>

    <!-- ================================================================
         Cenário 2: Banner Bottom Expand
         ================================================================ -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">2. Banner — position="bottom" + expand</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" :style="{ minHeight: 'var(--dss-spacing-72)' }">
          <DssHeader>
            <DssToolbar>
              <DssButton flat round icon="menu" aria-label="Menu" />
              <span class="example-toolbar-title">Cenário 2 — Banner persistente</span>
              <DssSpace />
            </DssToolbar>
          </DssHeader>
          <q-page-container>
            <q-page>
              <div
                v-for="(line, i) in contentLines"
                :key="i"
                class="dss-example-content-line"
              >
                {{ line }}
              </div>

              <!-- Cenário 2: Banner em toda a largura inferior -->
              <DssPageSticky
                v-if="showBanner"
                position="bottom"
                :expand="true"
                :offset="[0, 0]"
              >
                <div class="example-cookie-banner">
                  <span class="example-cookie-banner__text">
                    Este site utiliza cookies para melhorar sua experiência de navegação.
                  </span>
                  <DssButton
                    flat
                    dense
                    label="Aceitar"
                    color="primary"
                    @click="showBanner = false"
                  />
                </div>
              </DssPageSticky>
            </q-page>
          </q-page-container>
        </q-layout>
      </div>
      <p class="dss-example-note">
        Clique em "Aceitar" para ocultar o banner.
      </p>
    </section>

    <!-- ================================================================
         Cenário 3: Elevated
         ================================================================ -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">3. Elevated — box-shadow: var(--dss-elevation-2)</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" :style="{ minHeight: 'var(--dss-spacing-72)' }">
          <DssHeader>
            <DssToolbar>
              <DssButton flat round icon="menu" aria-label="Menu" />
              <span class="example-toolbar-title">Cenário 3 — elevated=true</span>
              <DssSpace />
            </DssToolbar>
          </DssHeader>
          <q-page-container>
            <q-page>
              <div
                v-for="(line, i) in contentLines"
                :key="i"
                class="dss-example-content-line"
              >
                {{ line }}
              </div>

              <!-- Cenário 3: DssButton com sombra de elevação -->
              <DssPageSticky
                position="bottom-right"
                :offset="[18, 18]"
                :elevated="true"
              >
                <DssButton
                  round
                  icon="edit"
                  color="secondary"
                  aria-label="Editar"
                />
              </DssPageSticky>
            </q-page>
          </q-page-container>
        </q-layout>
      </div>
      <p class="dss-example-note">
        Observe a sombra aplicada pelo token <code>--dss-elevation-2</code> no elemento fixo.
      </p>
    </section>

  </div>
</template>

<style scoped>
.dss-example-showcase {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-8);
  padding: var(--dss-spacing-6);
}

.dss-example-section {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
}

.dss-example-title {
  font-size: var(--dss-font-size-md);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  margin: 0;
}

.dss-example-layout-wrapper {
  border: 1px solid var(--dss-gray-300);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
  position: relative;
}

.example-toolbar-title {
  font-size: var(--dss-font-size-md);
  color: var(--dss-text-body);
  margin-left: var(--dss-spacing-2);
}

.dss-example-content-line {
  padding: var(--dss-spacing-2) var(--dss-spacing-4);
  border-bottom: 1px solid var(--dss-gray-200);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}

.example-cookie-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--dss-spacing-3) var(--dss-spacing-6);
  background-color: var(--dss-surface-default);
  border-top: 1px solid var(--dss-gray-300);
  width: 100%;
  box-shadow: var(--dss-shadow-xs);
}

.example-cookie-banner__text {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
}

.dss-example-note {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  margin: 0;
}
</style>
