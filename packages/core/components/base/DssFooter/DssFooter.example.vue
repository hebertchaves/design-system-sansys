<template>
  <div class="dss-example-showcase">

    <!-- ===================================================================
         Exemplo 1: Básico
         DssFooter simples com DssToolbar contendo copyright e links.
         =================================================================== -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">1. Básico</h2>
      <div class="dss-example-layout-wrapper">
        <!-- EXC-01: q-layout usado temporariamente até DssLayout (Nível 4) existir -->
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-72)">
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Conteúdo da página
            </div>
          </q-page-container>
          <DssFooter>
            <DssToolbar>
              <span class="text-caption">© 2026 Sansys. Todos os direitos reservados.</span>
              <DssSpace />
              <DssButton flat dense label="Política de Privacidade" no-caps />
              <DssButton flat dense label="Termos de Uso" no-caps />
            </DssToolbar>
          </DssFooter>
        </q-layout>
      </div>
    </section>

    <!-- ===================================================================
         Exemplo 2: Elevated
         Footer com sombra de elevação projetada para cima (EXC-05).
         =================================================================== -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">2. Elevated</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-72)">
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Conteúdo com footer elevado
            </div>
          </q-page-container>
          <DssFooter elevated>
            <DssToolbar>
              <DssButton flat round aria-label="Voltar ao topo" icon="keyboard_arrow_up" />
              <span class="text-caption">Sansys Hub v2.0</span>
              <DssSpace />
              <DssButton flat dense label="Suporte" no-caps icon="help_outline" />
            </DssToolbar>
          </DssFooter>
        </q-layout>
      </div>
    </section>

    <!-- ===================================================================
         Exemplo 3: Bordered
         Footer com borda superior sutil (alternativa flat ao elevated).
         =================================================================== -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">3. Bordered</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-72)">
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Conteúdo com footer bordeado
            </div>
          </q-page-container>
          <DssFooter bordered>
            <DssToolbar>
              <span class="text-caption q-ml-sm">Central de Ajuda</span>
              <DssSpace />
              <DssButton flat label="Documentação" icon="menu_book" no-caps />
            </DssToolbar>
          </DssFooter>
        </q-layout>
      </div>
    </section>

    <!-- ===================================================================
         Exemplo 4: Com Brand
         Footer com DssToolbar usando brand="hub".
         A cor de fundo vem do DssToolbar, não do DssFooter.
         =================================================================== -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">4. Com Brand (Hub)</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-72)">
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Brand hub no DssToolbar (não no DssFooter)
            </div>
          </q-page-container>
          <DssFooter elevated>
            <DssToolbar brand="hub">
              <span class="text-caption">Sansys Hub — Portal do Operador</span>
              <DssSpace />
              <DssButton flat round aria-label="Configurações" icon="settings" />
              <DssButton flat round aria-label="Conta" icon="account_circle" />
            </DssToolbar>
          </DssFooter>
        </q-layout>
      </div>
    </section>

    <!-- ===================================================================
         Exemplo 5: Com Múltiplos Toolbars
         Footer com dois DssToolbar empilhados:
         - Primeiro: navegação secundária (links)
         - Segundo: copyright e informações legais
         =================================================================== -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">5. Com Múltiplos Toolbars</h2>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-72)">
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Footer com toolbar de navegação + toolbar de copyright
            </div>
          </q-page-container>
          <DssFooter elevated>
            <DssToolbar>
              <DssButton flat dense label="Início" no-caps />
              <DssButton flat dense label="Sobre" no-caps />
              <DssButton flat dense label="Serviços" no-caps />
              <DssButton flat dense label="Contato" no-caps />
              <DssSpace />
              <DssButton flat round aria-label="Acessibilidade" icon="accessibility" />
            </DssToolbar>
            <DssToolbar dense>
              <span class="text-caption">© 2026 Sansys Sistemas de Saneamento. CNPJ 00.000.000/0001-00</span>
              <DssSpace />
              <DssButton flat dense label="Privacidade" no-caps />
            </DssToolbar>
          </DssFooter>
        </q-layout>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import DssFooter from './DssFooter.vue'
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
