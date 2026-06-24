<template>
  <!-- Exemplos REAIS de uso do DssSelect (composições contextuais — não repete as
       variantes/estados das seções do playground). Embeddable, Token First, box
       estilizado como o PgTile do sandbox. Consumido por TestSelect.vue. -->
  <div class="dss-ex">
    <div class="dss-ex__item">
      <div class="dss-ex__stage">
        <DssSelect v-model="statusCor" :options="statusOpts" label="Status">
          <template #option="{ itemProps, opt }">
            <q-item v-bind="itemProps">
              <q-item-section avatar><DssIcon name="circle" inline decorative :style="{ color: statusColor(opt) }" /></q-item-section>
              <q-item-section>{{ opt }}</q-item-section>
            </q-item>
          </template>
          <template #selected-item="{ opt }">
            <span><DssIcon name="circle" inline decorative :style="{ color: statusColor(opt) }" /> {{ opt }}</span>
          </template>
        </DssSelect>
      </div>
      <code class="dss-ex__code">filtro de status com cor</code>
    </div>

    <div class="dss-ex__item">
      <div class="dss-ex__stage">
        <DssSelect v-model="tags" :options="tagOpts" label="Tags" multiple use-input>
          <template #selected-item="{ opt, index }">
            <DssChip :key="index" :label="opt" removable @remove="tags.splice(index, 1)" />
          </template>
        </DssSelect>
      </div>
      <code class="dss-ex__code">seletor de tags (DssChip)</code>
    </div>

    <div class="dss-ex__item">
      <div class="dss-ex__stage">
        <DssSelect v-model="filtro" :options="filtroOpts" label="Filtrar" clearable>
          <template #prepend><DssIcon name="filter_list" inline decorative /></template>
        </DssSelect>
      </div>
      <code class="dss-ex__code">filtro com clearable</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssSelect from './DssSelect.vue'
import DssChip from '../DssChip/DssChip.vue'
import DssIcon from '../DssIcon/DssIcon.vue'

const statusCor = ref('Ativo')
const statusOpts = ['Ativo', 'Pendente', 'Inativo']
const statusColor = (s: string) => ({
  Ativo: 'var(--dss-positive)',
  Pendente: 'var(--dss-warning)',
  Inativo: 'var(--dss-text-disabled)',
}[s] || 'var(--dss-text-secondary)')

const tags = ref<string[]>(['Vue.js', 'DSS'])
const tagOpts = ['Vue.js', 'TypeScript', 'Figma', 'SCSS', 'A11Y', 'DSS']

const filtro = ref(null)
const filtroOpts = ['Mais recentes', 'Mais antigos', 'A–Z', 'Z–A']
</script>

<style scoped>
.dss-ex {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--dss-spacing-5);
}
.dss-ex__item {
  display: flex;
  flex-direction: column;
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}
.dss-ex__stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--dss-spacing-4);
  min-height: 104px;
  padding: var(--dss-spacing-4);
  background:
    linear-gradient(var(--dss-surface-subtle), var(--dss-surface-subtle)),
    repeating-linear-gradient(45deg, transparent 0 8px,
      color-mix(in srgb, var(--dss-gray-400) 8%, transparent) 8px 9px);
}
.dss-ex__code {
  font-family: var(--dss-font-family-mono, monospace);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  background: var(--dss-surface-default);
  padding: var(--dss-spacing-1) var(--dss-spacing-3);
  border-top: var(--dss-border-width-thin) solid var(--dss-gray-200);
}
</style>
