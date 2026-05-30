<script setup lang="ts">
import { ref } from 'vue'
import DssInnerLoading from './DssInnerLoading.vue'
import DssCard from '../DssCard/DssCard.vue'
import DssSpinner from '../DssSpinner/DssSpinner.vue'

// ─── Controles do Playground ─────────────────────────────────────────────────

const showing = ref(true)
const color = ref<'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'>('primary')
const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const label = ref('')
const delay = ref(0)

// ─── Cenário 1: Carregamento em DssCard ──────────────────────────────────────

const isLoadingCard = ref(false)

async function simulateCardLoad() {
  isLoadingCard.value = true
  await new Promise(resolve => setTimeout(resolve, 3000))
  isLoadingCard.value = false
}

// ─── Cenário 2: Submissão de Formulário ──────────────────────────────────────

const isSubmitting = ref(false)

async function simulateSubmit() {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isSubmitting.value = false
}

// ─── Cenário 3: Slot Customizado ─────────────────────────────────────────────

const isCustomLoading = ref(true)
</script>

<template>
  <div class="q-pa-lg q-gutter-y-xl">

    <!-- ── Playground ─────────────────────────────────────────────────────── -->
    <section>
      <h2 class="text-h6 q-mb-md">Playground</h2>
      <div class="row q-gutter-md q-mb-md">
        <q-toggle v-model="showing" label="showing" />
        <q-select
          v-model="color"
          :options="['primary','secondary','error','success','warning','info']"
          label="color"
          dense
          outlined
          style="min-width: 140px;"
        />
        <q-select
          v-model="size"
          :options="['xs','sm','md','lg','xl']"
          label="size"
          dense
          outlined
          style="min-width: 100px;"
        />
        <q-input v-model="label" label="label" dense outlined />
        <q-input v-model.number="delay" label="delay (ms)" type="number" dense outlined style="width: 120px;" />
      </div>
      <div style="position: relative; min-height: 180px; background: #f5f5f5; border-radius: 8px;">
        <div class="q-pa-md">
          <p>Conteúdo do container. Será coberto pelo overlay quando showing=true.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <DssInnerLoading
          :showing="showing"
          :color="color"
          :size="size"
          :label="label || undefined"
          :delay="delay"
        />
      </div>
    </section>

    <!-- ── Cenário 1: DssCard com Loading ─────────────────────────────────── -->
    <section>
      <h2 class="text-h6 q-mb-md">Cenário 1 — Carregamento de Dados em DssCard</h2>
      <DssCard style="position: relative; min-height: 200px;">
        <div class="q-pa-md">
          <p class="text-h6">Relatório Mensal</p>
          <p>Receita: R$ 142.500,00</p>
          <p>Despesas: R$ 98.300,00</p>
          <p>Lucro: R$ 44.200,00</p>
          <q-btn
            color="primary"
            label="Recarregar"
            :disable="isLoadingCard"
            @click="simulateCardLoad"
          />
        </div>
        <DssInnerLoading
          :showing="isLoadingCard"
          color="primary"
          size="lg"
          label="Atualizando dados..."
        />
      </DssCard>
    </section>

    <!-- ── Cenário 2: Formulário com Loading ──────────────────────────────── -->
    <section>
      <h2 class="text-h6 q-mb-md">Cenário 2 — Submissão de Formulário</h2>
      <div style="position: relative; max-width: 400px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px;">
        <p class="text-subtitle1 q-mb-md">Atualizar Perfil</p>
        <q-input label="Nome" value="João Silva" outlined class="q-mb-sm" readonly />
        <q-input label="E-mail" value="joao@empresa.com" outlined class="q-mb-md" readonly />
        <q-btn
          color="primary"
          label="Salvar"
          :disable="isSubmitting"
          @click="simulateSubmit"
        />
        <DssInnerLoading
          :showing="isSubmitting"
          color="primary"
          size="md"
          label="Salvando alterações..."
        />
      </div>
    </section>

    <!-- ── Cenário 3: Slot Customizado ────────────────────────────────────── -->
    <section>
      <h2 class="text-h6 q-mb-md">Cenário 3 — Slot Customizado</h2>
      <q-toggle v-model="isCustomLoading" label="Ativar loading customizado" class="q-mb-md" />
      <div style="position: relative; min-height: 200px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px;">
        <p>Conteúdo do container abaixo do overlay customizado.</p>
        <DssInnerLoading :showing="isCustomLoading">
          <DssSpinner type="dots" size="lg" />
          <span class="text-body2 q-mt-sm" style="color: var(--dss-action-primary);">
            Sincronizando arquivos...
          </span>
        </DssInnerLoading>
      </div>
    </section>

    <!-- ── Todas as Cores ─────────────────────────────────────────────────── -->
    <section>
      <h2 class="text-h6 q-mb-md">Todas as Cores Semânticas</h2>
      <div class="row q-gutter-md">
        <div
          v-for="colorOption in ['primary', 'secondary', 'error', 'success', 'warning', 'info']"
          :key="colorOption"
          style="position: relative; width: 100px; height: 100px; border: 1px solid #e0e0e0; border-radius: 8px;"
        >
          <DssInnerLoading
            :showing="true"
            :color="colorOption as 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'"
            size="sm"
            :label="colorOption"
          />
        </div>
      </div>
    </section>

    <!-- ── Todos os Tamanhos ──────────────────────────────────────────────── -->
    <section>
      <h2 class="text-h6 q-mb-md">Todos os Tamanhos</h2>
      <div class="row q-gutter-md items-center">
        <div
          v-for="sizeOption in ['xs', 'sm', 'md', 'lg', 'xl']"
          :key="sizeOption"
          style="position: relative; width: 120px; height: 120px; border: 1px solid #e0e0e0; border-radius: 8px;"
        >
          <DssInnerLoading
            :showing="true"
            :size="sizeOption as 'xs' | 'sm' | 'md' | 'lg' | 'xl'"
            :label="sizeOption"
          />
        </div>
      </div>
    </section>

    <!-- ── Brand Context ──────────────────────────────────────────────────── -->
    <section>
      <h2 class="text-h6 q-mb-md">Brand Context</h2>
      <div class="row q-gutter-md">
        <div
          v-for="brandOption in ['hub', 'water', 'waste']"
          :key="brandOption"
          style="position: relative; width: 140px; height: 120px; border: 1px solid #e0e0e0; border-radius: 8px;"
        >
          <DssInnerLoading
            :showing="true"
            :brand="brandOption as 'hub' | 'water' | 'waste'"
            size="md"
            :label="brandOption"
          />
        </div>
      </div>
    </section>

  </div>
</template>
