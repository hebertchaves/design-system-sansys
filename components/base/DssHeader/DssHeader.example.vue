<template>
  <div class="dss-example-showcase">

    <!-- ===================================================================
         Exemplo 1: Básico
         DssHeader simples com DssToolbar contendo título e ação.
         =================================================================== -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">1. Básico</h2>
      <div class="dss-example-layout-wrapper">
        <!-- EXC-01: q-layout usado temporariamente até DssLayout (Nível 4) existir -->
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-72)">
          <DssHeader>
            <DssToolbar>
              <DssButton flat round aria-label="Menu" icon="menu" />
              <span class="text-subtitle1">Sansys Hub</span>
              <DssSpace />
              <DssButton flat round aria-label="Buscar" icon="search" />
            </DssToolbar>
          </DssHeader>
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Conteúdo da página
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </section>

    <!-- ===================================================================
         Exemplo 2: Elevated
         Header com sombra de elevação (--dss-elevation-2).
         =================================================================== -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">2. Elevated</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-72)">
          <DssHeader elevated>
            <DssToolbar>
              <DssButton flat round aria-label="Voltar" icon="arrow_back" />
              <span class="text-subtitle1">Detalhe do Pedido</span>
              <DssSpace />
              <DssButton flat round aria-label="Mais opções" icon="more_vert" />
            </DssToolbar>
          </DssHeader>
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Conteúdo com header elevado
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </section>

    <!-- ===================================================================
         Exemplo 3: Bordered
         Header com borda inferior sutil (alternativa flat ao elevated).
         =================================================================== -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">3. Bordered</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-72)">
          <DssHeader bordered>
            <DssToolbar>
              <span class="text-subtitle1 q-ml-sm">Relatórios</span>
              <DssSpace />
              <DssButton flat label="Exportar" icon="download" />
            </DssToolbar>
          </DssHeader>
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Conteúdo com header bordeado
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </section>

    <!-- ===================================================================
         Exemplo 4: Com Brand
         Header com DssToolbar usando brand="hub".
         A cor de fundo vem do DssToolbar, não do DssHeader.
         =================================================================== -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">4. Com Brand (Hub)</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-72)">
          <DssHeader elevated>
            <DssToolbar brand="hub">
              <DssButton flat round aria-label="Menu" icon="menu" />
              <span class="text-subtitle1">Sansys Hub</span>
              <DssSpace />
              <DssButton flat round aria-label="Perfil" icon="account_circle" />
            </DssToolbar>
          </DssHeader>
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Brand hub no DssToolbar (não no DssHeader)
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </section>

    <!-- ===================================================================
         Exemplo 5: Com Múltiplos Toolbars
         Header com dois DssToolbar empilhados:
         - Primeiro: ações globais (logo, perfil)
         - Segundo: navegação de seção
         =================================================================== -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">5. Com Múltiplos Toolbars</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-72)">
          <DssHeader elevated>
            <DssToolbar>
              <DssButton flat round aria-label="Menu" icon="menu" />
              <span class="text-subtitle1">Sansys Water</span>
              <DssSpace />
              <DssButton flat round aria-label="Notificações" icon="notifications" />
              <DssButton flat round aria-label="Perfil" icon="account_circle" />
            </DssToolbar>
            <DssToolbar dense>
              <DssButton flat label="Dashboard" no-caps />
              <DssButton flat label="Relatórios" no-caps />
              <DssButton flat label="Configurações" no-caps />
            </DssToolbar>
          </DssHeader>
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Header com toolbar de ações + toolbar de navegação
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import DssHeader from './DssHeader.vue'
import DssToolbar from '../DssToolbar/DssToolbar.vue'
import DssButton from '../DssButton/DssButton.vue'
import DssSpace from '../DssSpace/DssSpace.vue'
</script>

<style scoped>
.dss-example-showcase {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-10);
  padding: var(--dss-spacing-6);
}

.dss-example-section {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

.dss-example-title {
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-body);
  margin: 0;
}

.dss-example-layout-wrapper {
  border: var(--dss-border-width-thin) solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.dss-example-page-content {
  color: var(--dss-text-subtle);
  background-color: var(--dss-gray-100);
  min-height: var(--dss-spacing-14);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
