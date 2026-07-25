<template>
  <div class="dss-msa-examples">
    <!-- 1. BÁSICO: multiseleção + autocomplete + checkbox por opção + chips -->
    <section>
      <h3>1. Básico</h3>
      <DssMultiselectAutocomplete
        v-model="basic"
        :options="frutas"
        label="Frutas"
        placeholder="Digite para filtrar…"
      />
      <p>Selecionadas: {{ basic.join(', ') || 'nenhuma' }}</p>
    </section>

    <!-- 2. OBJETOS (optionValue/optionLabel + emitValue) -->
    <section>
      <h3>2. Opções como objetos</h3>
      <DssMultiselectAutocomplete
        v-model="comObjeto"
        :options="cidades"
        option-value="id"
        option-label="nome"
        emit-value
        map-options
        clearable
        label="Cidades"
      />
      <p>IDs: {{ comObjeto.join(', ') || 'nenhum' }}</p>
    </section>

    <!-- 3. BRAND (o brand chega ao menu teleportado via DssSelect) -->
    <section>
      <h3>3. Brand (Water)</h3>
      <DssMultiselectAutocomplete
        v-model="comBrand"
        :options="frutas"
        brand="water"
        label="Frutas (Water)"
      />
    </section>

    <!-- 4. DESABILITADO -->
    <section>
      <h3>4. Desabilitado</h3>
      <DssMultiselectAutocomplete
        v-model="basic"
        :options="frutas"
        disable
        label="Somente leitura visual"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * DssMultiselectAutocomplete — Example Showcase (Incremento 1)
 *
 * Demonstra multiseleção + autocomplete + checkbox por opção + chips removíveis.
 * O comportamento "selecionado sobe ao topo" chega no Incremento 2.
 */
import { ref } from 'vue'
import DssMultiselectAutocomplete from './DssMultiselectAutocomplete.vue'

const frutas = ['Maçã', 'Banana', 'Cereja', 'Damasco', 'Laranja', 'Manga', 'Uva']

const cidades = [
  { id: 1, nome: 'São Paulo' },
  { id: 2, nome: 'Rio de Janeiro' },
  { id: 3, nome: 'Belo Horizonte' },
  { id: 4, nome: 'Curitiba' },
]

const basic = ref<string[]>(['Banana', 'Cereja'])
const comObjeto = ref<number[]>([1])
const comBrand = ref<string[]>(['Manga'])
</script>

<style scoped>
.dss-msa-examples {
  padding: 24px;
  max-width: 640px;
}
.dss-msa-examples section {
  margin-bottom: 32px;
}
.dss-msa-examples h3 {
  margin-bottom: 12px;
}
.dss-msa-examples p {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}
</style>
