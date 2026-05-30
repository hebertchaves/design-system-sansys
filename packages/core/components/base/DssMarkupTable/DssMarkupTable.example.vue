<script setup lang="ts">
// DssMarkupTable — Exemplos interativos
// Composition API + TypeScript — padrão DSS v2.2

import { ref } from 'vue'

const selectedDensity = ref<'compact' | 'standard' | 'comfortable'>('standard')
const selectedSeparator = ref<'horizontal' | 'vertical' | 'cell' | 'none'>('horizontal')
const isBordered = ref(true)
const isFlat = ref(false)
const isSquare = ref(false)
const isWrapCells = ref(false)

const usuarios = [
  { nome: 'Ana Costa', email: 'ana.costa@sansys.com.br', cargo: 'Analista de Dados', status: 'Ativo' },
  { nome: 'Bruno Lima', email: 'bruno.lima@sansys.com.br', cargo: 'Desenvolvedor Sênior', status: 'Ativo' },
  { nome: 'Carla Souza', email: 'carla.souza@sansys.com.br', cargo: 'Gerente de Projeto', status: 'Férias' },
  { nome: 'Diego Mendes', email: 'diego.mendes@sansys.com.br', cargo: 'UX Designer', status: 'Ativo' },
  { nome: 'Elena Ferreira', email: 'elena.ferreira@sansys.com.br', cargo: 'QA Engineer', status: 'Inativo' }
]

const medicoes = [
  { ponto: 'Entrada Principal', volume: '15.234 m³', pressao: '4,2 bar', temperatura: '18°C', status: 'Normal' },
  { ponto: 'Estação Norte', volume: '8.901 m³', pressao: '3,8 bar', temperatura: '17°C', status: 'Normal' },
  { ponto: 'Rede Sul', volume: '4.512 m³', pressao: '2,1 bar', temperatura: '19°C', status: 'Alerta' }
]

const residuos = [
  { local: 'Zona Leste', tipo: 'Orgânico', peso: '12,4 ton', coletores: 3, eficiencia: '94%' },
  { local: 'Zona Oeste', tipo: 'Reciclável', peso: '8,7 ton', coletores: 2, eficiencia: '87%' },
  { local: 'Centro', tipo: 'Misto', peso: '18,2 ton', coletores: 5, eficiencia: '91%' }
]
</script>

<template>
  <div class="q-pa-lg" style="display: flex; flex-direction: column; gap: var(--dss-spacing-8);">

    <!-- =====================================================================
         CONTROLES INTERATIVOS
         ===================================================================== -->
    <section>
      <h2 class="text-h6 q-mb-md">Controles</h2>
      <div class="row q-gutter-md">
        <q-select
          v-model="selectedDensity"
          label="Density"
          :options="['compact', 'standard', 'comfortable']"
          style="min-width: 160px;"
          outlined
          dense
        />
        <q-select
          v-model="selectedSeparator"
          label="Separator"
          :options="['horizontal', 'vertical', 'cell', 'none']"
          style="min-width: 160px;"
          outlined
          dense
        />
        <q-toggle v-model="isBordered" label="Bordered" />
        <q-toggle v-model="isFlat" label="Flat" />
        <q-toggle v-model="isSquare" label="Square" />
        <q-toggle v-model="isWrapCells" label="Wrap Cells" />
      </div>
    </section>

    <!-- =====================================================================
         CENÁRIO 1: Tabela padrão com controles dinâmicos
         ===================================================================== -->
    <section>
      <h2 class="text-h6 q-mb-md">Cenário 1 — Tabela Interativa (Hub)</h2>
      <DssMarkupTable
        :density="selectedDensity"
        :separator="selectedSeparator"
        :bordered="isBordered"
        :flat="isFlat"
        :square="isSquare"
        :wrap-cells="isWrapCells"
        brand="hub"
      >
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th scope="col">Cargo</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.email">
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.cargo }}</td>
            <td>
              <DssBadge
                :label="usuario.status"
                :color="usuario.status === 'Ativo' ? 'positive' : usuario.status === 'Férias' ? 'warning' : 'negative'"
              />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Total de usuários</td>
            <td>{{ usuarios.length }}</td>
          </tr>
        </tfoot>
      </DssMarkupTable>
    </section>

    <!-- =====================================================================
         CENÁRIO 2: Tabela Water — medições
         ===================================================================== -->
    <section>
      <h2 class="text-h6 q-mb-md">Cenário 2 — Medições Hídricas (Water)</h2>
      <DssMarkupTable bordered separator="cell" brand="water">
        <thead>
          <tr>
            <th scope="col">Ponto de Medição</th>
            <th scope="col">Volume</th>
            <th scope="col">Pressão</th>
            <th scope="col">Temperatura</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="medicao in medicoes" :key="medicao.ponto">
            <td>{{ medicao.ponto }}</td>
            <td>{{ medicao.volume }}</td>
            <td>{{ medicao.pressao }}</td>
            <td>{{ medicao.temperatura }}</td>
            <td>{{ medicao.status }}</td>
          </tr>
        </tbody>
      </DssMarkupTable>
    </section>

    <!-- =====================================================================
         CENÁRIO 3: Tabela Waste — coleta de resíduos (Compact)
         ===================================================================== -->
    <section>
      <h2 class="text-h6 q-mb-md">Cenário 3 — Coleta de Resíduos (Waste · Compact)</h2>
      <DssMarkupTable density="compact" bordered brand="waste">
        <thead>
          <tr>
            <th scope="col">Localidade</th>
            <th scope="col">Tipo de Resíduo</th>
            <th scope="col">Peso Coletado</th>
            <th scope="col">Coletores</th>
            <th scope="col">Eficiência</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="residuo in residuos" :key="residuo.local">
            <td>{{ residuo.local }}</td>
            <td>{{ residuo.tipo }}</td>
            <td>{{ residuo.peso }}</td>
            <td>{{ residuo.coletores }}</td>
            <td>{{ residuo.eficiencia }}</td>
          </tr>
        </tbody>
      </DssMarkupTable>
    </section>

    <!-- =====================================================================
         CENÁRIO 4: Flat + Comfortable (sem marca)
         ===================================================================== -->
    <section>
      <h2 class="text-h6 q-mb-md">Cenário 4 — Flat + Comfortable (sem marca)</h2>
      <DssMarkupTable flat density="comfortable" separator="horizontal">
        <thead>
          <tr>
            <th scope="col">Produto</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unit.</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sensor de Pressão DSS-P100</td>
            <td>12</td>
            <td>R$ 450,00</td>
            <td>R$ 5.400,00</td>
          </tr>
          <tr>
            <td>Módulo de Telemetria MT-4G</td>
            <td>5</td>
            <td>R$ 1.200,00</td>
            <td>R$ 6.000,00</td>
          </tr>
          <tr>
            <td>Gateway IoT Industrial</td>
            <td>2</td>
            <td>R$ 3.800,00</td>
            <td>R$ 7.600,00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Total Geral</td>
            <td>R$ 19.000,00</td>
          </tr>
        </tfoot>
      </DssMarkupTable>
    </section>

    <!-- =====================================================================
         CENÁRIO 5: Dark Mode Preview
         ===================================================================== -->
    <section data-theme="dark" style="background-color: var(--dss-gray-900); padding: var(--dss-spacing-4); border-radius: var(--dss-radius-md);">
      <h2 class="text-h6 q-mb-md text-white">Cenário 5 — Dark Mode (Hub)</h2>
      <DssMarkupTable bordered separator="horizontal" brand="hub">
        <thead>
          <tr>
            <th scope="col">Usuário</th>
            <th scope="col">Cargo</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios.slice(0, 3)" :key="usuario.email">
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.cargo }}</td>
            <td>{{ usuario.status }}</td>
          </tr>
        </tbody>
      </DssMarkupTable>
    </section>

  </div>
</template>
