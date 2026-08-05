<template>
  <div class="dss-msa-examples">
    <!-- 1. BÁSICO -->
    <section>
      <h3>1. Básico</h3>
      <p class="nota">Filtro local por substring, checkbox por opção, chips removíveis.</p>
      <DssMultiselectAutocomplete
        v-model="basic"
        :options="frutas"
        label="Frutas"
        placeholder="Digite para filtrar…"
      />
      <p class="saida">Selecionadas: {{ basic.join(', ') || 'nenhuma' }}</p>
    </section>

    <!-- 2. OBJETOS -->
    <section>
      <h3>2. Opções como objetos</h3>
      <p class="nota">
        <code>emitValue</code> + <code>mapOptions</code>: o model guarda só os ids, mas
        os rótulos continuam resolvidos nos chips e na seção de selecionados.
      </p>
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
      <p class="saida">IDs: {{ comObjeto.join(', ') || 'nenhum' }}</p>
    </section>

    <!-- 3. COLUNA ESTREITA — o caso que motiva o componente -->
    <section>
      <h3>3. Coluna estreita (260px)</h3>
      <p class="nota">
        O campo <strong>não cresce em altura</strong>: quantos chips aparecem é medido
        conforme a largura. Nesta faixa não cabe nenhum junto com o input de busca, então
        o campo mostra só o total e a seção do painel passa a ser onde a seleção é gerida.
      </p>
      <div class="coluna-estreita">
        <DssMultiselectAutocomplete
          v-model="estreito"
          :options="frutas"
          label="Frutas"
          placeholder="Filtrar…"
          show-selected-summary
        />
      </div>
      <p class="saida">{{ estreito.length }} selecionada(s)</p>
    </section>

    <!-- 4. LARGURA CONFORTÁVEL, mesma configuração -->
    <section>
      <h3>4. Mesma configuração, largura confortável</h3>
      <p class="nota">
        Idêntico ao anterior — só o container mudou. Aqui cabem chips, e o contador
        indica quantos ficaram de fora.
      </p>
      <DssMultiselectAutocomplete
        v-model="estreito"
        :options="frutas"
        label="Frutas"
        placeholder="Filtrar…"
        show-selected-summary
      />
    </section>

    <!-- 5. BUSCA ASSÍNCRONA + PAGINAÇÃO -->
    <section>
      <h3>5. Busca no servidor + carregamento incremental</h3>
      <p class="nota">
        <code>loadOptions</code> substitui o filtro local (a fonte passa a ser o servidor);
        <code>loadMore</code> anexa o próximo lote ao rolar. Aqui ambos são simulados.
      </p>
      <DssMultiselectAutocomplete
        v-model="assinc"
        :load-options="buscarNoServidor"
        :load-more="carregarMais"
        label="Clientes"
        placeholder="Digite para buscar…"
        show-selected-summary
      />
      <p class="saida">{{ assinc.length }} selecionado(s)</p>
    </section>

    <!-- 6. BRAND -->
    <section>
      <h3>6. Brand (Water)</h3>
      <p class="nota">O brand alcança o menu teleportado via <code>popup-content-class</code> do DssSelect.</p>
      <DssMultiselectAutocomplete
        v-model="comBrand"
        :options="frutas"
        brand="water"
        label="Frutas (Water)"
      />
    </section>

    <!-- 7. DESABILITADO E SOMENTE LEITURA -->
    <section>
      <h3>7. Desabilitado e somente leitura</h3>
      <p class="nota">Em ambos os casos os chips deixam de ser removíveis.</p>
      <DssMultiselectAutocomplete
        v-model="basic"
        :options="frutas"
        disable
        label="Desabilitado"
      />
      <DssMultiselectAutocomplete
        v-model="basic"
        :options="frutas"
        readonly
        label="Somente leitura"
        class="espaco-acima"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * DssMultiselectAutocomplete — Example Showcase
 *
 * Cobre os cenários reais de uso: filtro local, objetos com emitValue, o campo
 * em coluna estreita (contagem medida), busca assíncrona com paginação, brand e
 * estados não interativos.
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
const estreito = ref<string[]>(['Maçã', 'Banana', 'Cereja'])
const comBrand = ref<string[]>(['Manga'])
const assinc = ref<string[]>([])

// --- Simulação de servidor (num app real, chamadas à API) ---

const BASE = Array.from({ length: 45 }, (_, i) => `Cliente ${String(i + 1).padStart(2, '0')}`)
const LOTE = 20

function atraso<T>(valor: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(valor), ms))
}

/** Primeira página do resultado da busca. */
function buscarNoServidor(query: string) {
  const q = query.trim().toLowerCase()
  const achados = q ? BASE.filter((c) => c.toLowerCase().includes(q)) : BASE
  return atraso(achados.slice(0, LOTE))
}

/** Próximo lote da MESMA busca. Array vazio sinaliza fim. */
function carregarMais(query: string, loaded: number) {
  const q = query.trim().toLowerCase()
  const achados = q ? BASE.filter((c) => c.toLowerCase().includes(q)) : BASE
  return atraso(achados.slice(loaded, loaded + LOTE))
}
</script>

<style scoped>
.dss-msa-examples {
  padding: var(--dss-spacing-6);
  max-width: 640px;
}
.dss-msa-examples section {
  margin-bottom: var(--dss-spacing-8);
}
.dss-msa-examples h3 {
  margin-bottom: var(--dss-spacing-2);
}
.nota {
  margin-bottom: var(--dss-spacing-3);
  color: var(--dss-text-secondary);
  font-size: var(--dss-font-size-sm);
}
.saida {
  margin-top: var(--dss-spacing-2);
  color: var(--dss-text-secondary);
  font-size: var(--dss-font-size-sm);
}
/* Container estreito do cenário 3 — o componente se adapta a ele. */
.coluna-estreita {
  width: 260px;
}
.espaco-acima {
  margin-top: var(--dss-spacing-4);
}
</style>
