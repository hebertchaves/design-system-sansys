<template>
  <div class="example-container">

    <!-- ================================================================
         CENÁRIO 1: Básico — Grupo de Radio vertical
         ================================================================ -->
    <section class="example-section">
      <h3>1. Básico — Radio Group (Vertical)</h3>
      <DssOptionGroup
        v-model="plano"
        :options="opcoesPlano"
        aria-label="Selecione o plano"
      />
      <p>Selecionado: {{ plano ?? 'nenhum' }}</p>
    </section>

    <!-- ================================================================
         CENÁRIO 2: Checkbox Múltiplo — Seleção de features
         ================================================================ -->
    <section class="example-section">
      <h3>2. Checkbox — Seleção múltipla</h3>
      <DssOptionGroup
        v-model="features"
        :options="opcoesFeatures"
        type="checkbox"
        color="primary"
        aria-label="Funcionalidades ativas"
      />
      <p>Ativas: {{ features.length ? features.join(', ') : 'nenhuma' }}</p>
    </section>

    <!-- ================================================================
         CENÁRIO 3: Toggle Inline — Dias da semana
         ================================================================ -->
    <section class="example-section">
      <h3>3. Toggle — Layout horizontal (inline)</h3>
      <DssOptionGroup
        v-model="diasSelecionados"
        :options="opcoesDias"
        type="toggle"
        inline
        color="primary"
        aria-label="Dias de notificação"
      />
      <p>Dias: {{ diasSelecionados.length ? diasSelecionados.join(', ') : 'nenhum' }}</p>
    </section>

    <!-- ================================================================
         CENÁRIO 4: Estados — Disable global, disable individual, readonly
         ================================================================ -->
    <section class="example-section">
      <h3>4. Estados — Disable e Readonly</h3>

      <div class="example-subsection">
        <span class="example-label">Grupo desabilitado (disable global):</span>
        <DssOptionGroup
          v-model="estadoDemo"
          :options="opcoesDemo"
          disable
          aria-label="Grupo desabilitado"
        />
      </div>

      <div class="example-subsection">
        <span class="example-label">Opção individual desabilitada:</span>
        <DssOptionGroup
          v-model="estadoDemo"
          :options="opcoesDemoComDisable"
          aria-label="Grupo com opção desabilitada"
        />
      </div>

      <div class="example-subsection">
        <span class="example-label">Somente leitura (readonly):</span>
        <DssOptionGroup
          v-model="estadoDemo"
          :options="opcoesDemo"
          readonly
          aria-label="Grupo somente leitura"
        />
      </div>
    </section>

    <!-- ================================================================
         CENÁRIO 5: Brand Context — Hub, Water, Waste
         ================================================================ -->
    <section class="example-section">
      <h3>5. Brand Context</h3>

      <div data-brand="hub" class="example-brand-row">
        <span class="example-label">Hub:</span>
        <DssOptionGroup
          v-model="selecaoBrand"
          :options="opcoesDemo"
          aria-label="Seleção brand Hub"
        />
      </div>

      <div data-brand="water" class="example-brand-row">
        <span class="example-label">Water:</span>
        <DssOptionGroup
          v-model="selecaoBrand"
          :options="opcoesDemo"
          type="checkbox"
          aria-label="Seleção brand Water"
        />
      </div>

      <div data-brand="waste" class="example-brand-row">
        <span class="example-label">Waste:</span>
        <DssOptionGroup
          v-model="selecaoBrand"
          :options="opcoesDemo"
          type="toggle"
          inline
          aria-label="Seleção brand Waste"
        />
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssOptionGroup from './DssOptionGroup.vue'
import type { OptionGroupItem } from './types/option-group.types'

// ==========================================================================
// ESTADO DOS EXEMPLOS
// ==========================================================================

const plano = ref<string>('basico')
const features = ref<string[]>(['relatorios'])
const diasSelecionados = ref<string[]>(['seg', 'qua', 'sex'])
const estadoDemo = ref<string>('opcao1')
const selecaoBrand = ref<string | string[]>('opcao1')

// ==========================================================================
// OPÇÕES DOS EXEMPLOS
// ==========================================================================

const opcoesPlano: OptionGroupItem[] = [
  { label: 'Básico', value: 'basico' },
  { label: 'Profissional', value: 'profissional' },
  { label: 'Enterprise', value: 'enterprise' },
]

const opcoesFeatures: OptionGroupItem[] = [
  { label: 'Relatórios avançados', value: 'relatorios' },
  { label: 'Integrações externas', value: 'integracoes' },
  { label: 'Exportação de dados', value: 'exportacao' },
  { label: 'API de acesso (somente Pro)', value: 'api', disable: true },
]

const opcoesDias: OptionGroupItem[] = [
  { label: 'Seg', value: 'seg' },
  { label: 'Ter', value: 'ter' },
  { label: 'Qua', value: 'qua' },
  { label: 'Qui', value: 'qui' },
  { label: 'Sex', value: 'sex' },
]

const opcoesDemo: OptionGroupItem[] = [
  { label: 'Opção 1', value: 'opcao1' },
  { label: 'Opção 2', value: 'opcao2' },
  { label: 'Opção 3', value: 'opcao3' },
]

const opcoesDemoComDisable: OptionGroupItem[] = [
  { label: 'Opção 1', value: 'opcao1' },
  { label: 'Opção 2 (desabilitada)', value: 'opcao2', disable: true },
  { label: 'Opção 3', value: 'opcao3' },
]
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
  padding: var(--dss-spacing-4);
}

.example-section {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-4);
  border: var(--dss-border-width-thin) solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}

.example-section h3 {
  margin: 0 0 var(--dss-spacing-1);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
}

.example-section p {
  margin: 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-hint);
}

.example-subsection {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1);
}

.example-label {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
}

.example-brand-row {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-3);
  border-radius: var(--dss-radius-sm);
  background-color: var(--dss-surface-muted);
}
</style>
