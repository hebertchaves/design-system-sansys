<script setup lang="ts">
/**
 * DssLinearProgress — Exemplos interativos (Playground)
 *
 * Cobre os 6 cenários obrigatórios do pré-prompt:
 *   1. Determinado (value fixo)
 *   2. Indeterminado (animação contínua)
 *   3. Cores de feedback (success, error, warning)
 *   4. Tamanhos (xs → xl)
 *   5. Brand
 *   6. Playground interativo com controles obrigatórios
 *
 * Composite Logic:
 *   - Quando indeterminate=true, o slider de value é desabilitado visualmente
 *   - A barra anima suavemente (transition via --dss-duration-250)
 */
import { ref, computed } from 'vue'
import DssLinearProgress from './DssLinearProgress.vue'

// ── Playground controls ──────────────────────────────────────────────────────
const playValue       = ref(0.7)
const playIndeterminate = ref(false)
const playColor       = ref<'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'>('primary')
const playSize        = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const playStripe      = ref(false)

const colorOptions = ['primary', 'secondary', 'error', 'success', 'warning', 'info'] as const
const sizeOptions  = ['xs', 'sm', 'md', 'lg', 'xl'] as const

// Quando indeterminate, value é irrelevante — o slider é desabilitado
const valueDisabled = computed(() => playIndeterminate.value)
</script>

<template>
  <div class="lp-examples">

    <!-- ═══════════════════════════════════════════════════════════════════════
         CENÁRIO 1 — Determinado (value fixo)
         ═══════════════════════════════════════════════════════════════════════ -->
    <section class="lp-section">
      <h3 class="lp-heading">1. Determinado</h3>
      <p class="lp-desc">Barra com valor fixo. Anima suavemente ao mudar o value.</p>
      <DssLinearProgress :value="0.7" color="primary" />
      <DssLinearProgress :value="0.4" color="primary" size="sm" />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         CENÁRIO 2 — Indeterminado
         ═══════════════════════════════════════════════════════════════════════ -->
    <section class="lp-section">
      <h3 class="lp-heading">2. Indeterminado</h3>
      <p class="lp-desc">Animação contínua quando não há valor definido.</p>
      <DssLinearProgress indeterminate color="primary" />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         CENÁRIO 3 — Cores de Feedback
         ═══════════════════════════════════════════════════════════════════════ -->
    <section class="lp-section">
      <h3 class="lp-heading">3. Cores de Feedback</h3>
      <div class="lp-stack">
        <DssLinearProgress :value="0.9" color="success" />
        <DssLinearProgress :value="0.3" color="error" />
        <DssLinearProgress :value="0.6" color="warning" />
        <DssLinearProgress :value="0.5" color="info" />
        <DssLinearProgress :value="0.7" color="secondary" />
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         CENÁRIO 4 — Tamanhos
         ═══════════════════════════════════════════════════════════════════════ -->
    <section class="lp-section">
      <h3 class="lp-heading">4. Tamanhos (xs → xl)</h3>
      <div class="lp-stack">
        <div class="lp-size-row">
          <span class="lp-label">xs (4px)</span>
          <DssLinearProgress :value="0.6" size="xs" />
        </div>
        <div class="lp-size-row">
          <span class="lp-label">sm (8px)</span>
          <DssLinearProgress :value="0.6" size="sm" />
        </div>
        <div class="lp-size-row">
          <span class="lp-label">md (12px) — padrão</span>
          <DssLinearProgress :value="0.6" size="md" />
        </div>
        <div class="lp-size-row">
          <span class="lp-label">lg (16px)</span>
          <DssLinearProgress :value="0.6" size="lg" />
        </div>
        <div class="lp-size-row">
          <span class="lp-label">xl (24px)</span>
          <DssLinearProgress :value="0.6" size="xl" />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         CENÁRIO 5 — Brand
         ═══════════════════════════════════════════════════════════════════════ -->
    <section class="lp-section">
      <h3 class="lp-heading">5. Brand</h3>
      <div class="lp-stack">
        <div data-brand="hub">
          <p class="lp-label">Hub (contextual)</p>
          <DssLinearProgress :value="0.7" />
        </div>
        <div data-brand="water">
          <p class="lp-label">Water (contextual)</p>
          <DssLinearProgress :value="0.7" />
        </div>
        <div data-brand="waste">
          <p class="lp-label">Waste (contextual)</p>
          <DssLinearProgress :value="0.7" />
        </div>
        <div>
          <p class="lp-label">Hub (via prop brand="hub")</p>
          <DssLinearProgress :value="0.7" brand="hub" />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         CENÁRIO 6 — Playground Interativo
         Composite Logic obrigatória do pré-prompt:
         - value desabilitado quando indeterminate=true
         - stripe toggle
         ═══════════════════════════════════════════════════════════════════════ -->
    <section class="lp-section lp-playground">
      <h3 class="lp-heading">6. Playground Interativo</h3>

      <div class="lp-controls">
        <!-- Value slider -->
        <label class="lp-control">
          <span class="lp-control-label">
            Value: {{ playValue.toFixed(2) }}
            <span v-if="valueDisabled" class="lp-control-note">(ignorado — indeterminate ativo)</span>
          </span>
          <input
            v-model.number="playValue"
            type="range"
            min="0"
            max="1"
            step="0.01"
            :disabled="valueDisabled"
          />
        </label>

        <!-- Indeterminate toggle -->
        <label class="lp-control">
          <span class="lp-control-label">Indeterminate</span>
          <input v-model="playIndeterminate" type="checkbox" />
        </label>

        <!-- Color select -->
        <label class="lp-control">
          <span class="lp-control-label">Color</span>
          <select v-model="playColor">
            <option v-for="c in colorOptions" :key="c" :value="c">{{ c }}</option>
          </select>
        </label>

        <!-- Size select -->
        <label class="lp-control">
          <span class="lp-control-label">Size</span>
          <select v-model="playSize">
            <option v-for="s in sizeOptions" :key="s" :value="s">{{ s }}</option>
          </select>
        </label>

        <!-- Stripe toggle -->
        <label class="lp-control">
          <span class="lp-control-label">Stripe</span>
          <input v-model="playStripe" type="checkbox" />
        </label>
      </div>

      <!-- Resultado -->
      <DssLinearProgress
        :value="playValue"
        :indeterminate="playIndeterminate"
        :color="playColor"
        :size="playSize"
        :stripe="playStripe"
      />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         CENÁRIO 7 — Stripe
         ═══════════════════════════════════════════════════════════════════════ -->
    <section class="lp-section">
      <h3 class="lp-heading">7. Stripe</h3>
      <DssLinearProgress :value="0.6" stripe color="primary" />
      <DssLinearProgress indeterminate stripe color="success" />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         CENÁRIO 8 — Disabled
         ═══════════════════════════════════════════════════════════════════════ -->
    <section class="lp-section">
      <h3 class="lp-heading">8. Disabled</h3>
      <DssLinearProgress :value="0.6" disable />
      <DssLinearProgress indeterminate disable color="error" />
    </section>

  </div>
</template>

<style scoped>
.lp-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-8);
  padding: var(--dss-spacing-6);
  width: 100%;
}

.lp-section {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

.lp-heading {
  font-size: var(--dss-font-size-md);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-primary);
  margin: 0;
}

.lp-desc {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
  margin: 0;
}

.lp-stack {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

.lp-size-row {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1);
}

.lp-label {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-secondary);
  margin: 0;
}

.lp-playground {
  padding: var(--dss-spacing-4);
  border: 1px solid var(--dss-surface-muted);
  border-radius: var(--dss-radius-md);
}

.lp-controls {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  margin-bottom: var(--dss-spacing-4);
}

.lp-control {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
}

.lp-control-label {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-primary);
  min-width: var(--dss-spacing-28);
}

.lp-control-note {
  color: var(--dss-text-secondary);
  font-size: var(--dss-font-size-xs);
}
</style>
