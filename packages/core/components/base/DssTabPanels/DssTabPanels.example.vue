<script setup lang="ts">
// Isenção DSS — Policy DssSpace/DSS_IMPLEMENTATION_GUIDE.md: Arquivos .example.vue são isentos de Token First e Gate de Composição para scaffolding de contexto.
import { ref } from 'vue'
import DssTabs from '../DssTabs/DssTabs.vue'
import DssTab from '../DssTab/DssTab.vue'
import DssTabPanel from '../DssTabPanel/DssTabPanel.vue'
import DssTabPanels from './DssTabPanels.vue'

// Cenário 1: Básico (sem animação)
const tab1 = ref<string>('messages')

// Cenário 2: Animado (fade DSS)
const tab2 = ref<string>('overview')

// Cenário 3: Swipeable + animated (mobile)
const tab3 = ref<string>('slide1')

// Cenário 4: Keep Alive (preservar estado entre trocas)
const tab4 = ref<string>('form')
const keepAliveValue = ref<string>('')
</script>

<template>
  <div class="q-gutter-lg">

    <!-- ===================================================================
         Cenário 1: Básico
         Demonstra uso padrão de DssTabPanels com v-model.
         Troca instantânea de painéis (animated=false, default).
         Resolve RES-01 do DssTabPanel: exemplos agora usam DssTabPanels.
         =================================================================== -->
    <section>
      <p class="text-subtitle2 q-mb-sm">1. Básico</p>
      <DssTabs v-model="tab1" align="left">
        <DssTab name="messages" label="Mensagens" icon="mail" />
        <DssTab name="alerts" label="Alertas" icon="notifications" />
        <DssTab name="settings" label="Configurações" icon="settings" />
      </DssTabs>
      <DssTabPanels v-model="tab1">
        <DssTabPanel name="messages">
          <p>Painel de Mensagens — troca instantânea (animated=false).</p>
        </DssTabPanel>
        <DssTabPanel name="alerts">
          <p>Painel de Alertas — conteúdo exibido instantaneamente.</p>
        </DssTabPanel>
        <DssTabPanel name="settings">
          <p>Painel de Configurações — sem transição animada.</p>
        </DssTabPanel>
      </DssTabPanels>
    </section>

    <!-- ===================================================================
         Cenário 2: Animado
         Demonstra prop animated=true.
         Transição fade governada pelo DSS (--dss-duration-200 + --dss-easing-standard).
         Desabilitada automaticamente se prefers-reduced-motion: reduce.
         =================================================================== -->
    <section>
      <p class="text-subtitle2 q-mb-sm">2. Animado (fade DSS)</p>
      <DssTabs v-model="tab2" align="left">
        <DssTab name="overview" label="Visão Geral" />
        <DssTab name="details" label="Detalhes" />
        <DssTab name="history" label="Histórico" />
      </DssTabs>
      <DssTabPanels v-model="tab2" animated>
        <DssTabPanel name="overview">
          <p>Visão Geral — transição fade ao entrar.</p>
          <p class="text-caption text-grey-7">
            animated=true: fade via --dss-duration-200 + --dss-easing-standard.
            Desabilitado em prefers-reduced-motion: reduce.
          </p>
        </DssTabPanel>
        <DssTabPanel name="details">
          <p>Detalhes — fade direction-agnostic (prev e next idênticos).</p>
        </DssTabPanel>
        <DssTabPanel name="history">
          <p>Histórico — sem motion direcional (slide). Apenas opacidade.</p>
        </DssTabPanel>
      </DssTabPanels>
    </section>

    <!-- ===================================================================
         Cenário 3: Swipeable (mobile)
         Demonstra props swipeable + animated combinadas.
         Navegação por gesto de deslize em dispositivos touch.
         animated=true para suavizar a troca ao combinar com swipe.
         =================================================================== -->
    <section>
      <p class="text-subtitle2 q-mb-sm">3. Swipeable (mobile)</p>
      <DssTabs v-model="tab3" align="left">
        <DssTab name="slide1" label="Slide 1" />
        <DssTab name="slide2" label="Slide 2" />
        <DssTab name="slide3" label="Slide 3" />
      </DssTabs>
      <DssTabPanels v-model="tab3" swipeable animated>
        <DssTabPanel name="slide1">
          <p>Slide 1 — deslize para a esquerda em toque (touch device).</p>
          <p class="text-caption text-grey-7">swipeable=true + animated=true</p>
        </DssTabPanel>
        <DssTabPanel name="slide2">
          <p>Slide 2 — deslize para esquerda ou direita.</p>
        </DssTabPanel>
        <DssTabPanel name="slide3">
          <p>Slide 3 — deslize para a direita para voltar.</p>
        </DssTabPanel>
      </DssTabPanels>
    </section>

    <!-- ===================================================================
         Cenário 4: Keep Alive
         Demonstra prop keep-alive=true.
         O estado do painel inativo (input preenchido) é preservado em
         memória — ao voltar para o painel, o valor permanece.
         =================================================================== -->
    <section>
      <p class="text-subtitle2 q-mb-sm">4. Keep Alive (preservar estado)</p>
      <DssTabs v-model="tab4" align="left">
        <DssTab name="form" label="Formulário" icon="edit" />
        <DssTab name="preview" label="Preview" icon="visibility" />
      </DssTabs>
      <DssTabPanels v-model="tab4" keep-alive>
        <DssTabPanel name="form">
          <p class="q-mb-sm">Digite algo e troque para Preview:</p>
          <input
            v-model="keepAliveValue"
            type="text"
            placeholder="Digite aqui..."
            style="border: 1px solid currentColor; padding: var(--dss-spacing-2) var(--dss-spacing-3); width: 100%"
          />
          <p class="text-caption text-grey-7 q-mt-xs">
            keep-alive=true: estado preservado ao trocar de painel.
          </p>
        </DssTabPanel>
        <DssTabPanel name="preview">
          <p>Valor digitado no formulário:</p>
          <p class="text-body1">
            <strong>{{ keepAliveValue || '(nenhum valor digitado)' }}</strong>
          </p>
          <p class="text-caption text-grey-7">
            Volte para Formulário — o texto permanece (Vue KeepAlive ativo).
          </p>
        </DssTabPanel>
      </DssTabPanels>
    </section>

  </div>
</template>
