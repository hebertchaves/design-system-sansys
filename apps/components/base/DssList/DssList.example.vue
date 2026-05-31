<template>
  <div class="dss-list-examples">
    <h2 class="text-h6">DssList — Exemplos</h2>

    <!-- ====================================================================
         Cenário 1: Lista Simples (Básico)
         Uso básico com DssItems sem nenhuma prop adicional.
         ==================================================================== -->
    <section>
      <h3 class="text-subtitle2 q-mb-sm">1. Lista Simples</h3>

      <DssList aria-label="Lista de navegação principal">
        <DssItem label="Início" />
        <DssItem label="Produtos" />
        <DssItem label="Sobre nós" />
        <DssItem label="Contato" />
      </DssList>
    </section>

    <!-- ====================================================================
         Cenário 2: Com Bordas e Separadores
         Uso das props bordered e separator para delimitar e dividir itens.
         ==================================================================== -->
    <section>
      <h3 class="text-subtitle2 q-mb-sm">2. Com Bordas e Separadores</h3>

      <DssList bordered separator aria-label="Lista de usuários com bordas">
        <DssItem
          label="Ana Silva"
          caption="Administradora"
          clickable
        >
          <template #leading>
            <DssIcon name="account_circle" aria-hidden="true" />
          </template>
          <template #trailing>
            <DssIcon name="chevron_right" aria-hidden="true" />
          </template>
        </DssItem>

        <DssItem
          label="Bruno Souza"
          caption="Desenvolvedor"
          clickable
        >
          <template #leading>
            <DssIcon name="account_circle" aria-hidden="true" />
          </template>
          <template #trailing>
            <DssIcon name="chevron_right" aria-hidden="true" />
          </template>
        </DssItem>

        <DssItem
          label="Carla Mendes"
          caption="Designer"
          clickable
        >
          <template #leading>
            <DssIcon name="account_circle" aria-hidden="true" />
          </template>
          <template #trailing>
            <DssIcon name="chevron_right" aria-hidden="true" />
          </template>
        </DssItem>
      </DssList>
    </section>

    <!-- ====================================================================
         Cenário 3: Com Padding
         Demonstração da prop padding adicionando espaço nas extremidades.
         ==================================================================== -->
    <section>
      <h3 class="text-subtitle2 q-mb-sm">3. Com Padding</h3>

      <DssList padding bordered aria-label="Lista de configurações com padding">
        <DssItem label="Notificações" clickable>
          <template #leading>
            <DssIcon name="notifications" aria-hidden="true" />
          </template>
        </DssItem>
        <DssItem label="Privacidade" clickable>
          <template #leading>
            <DssIcon name="lock" aria-hidden="true" />
          </template>
        </DssItem>
        <DssItem label="Aparência" clickable>
          <template #leading>
            <DssIcon name="palette" aria-hidden="true" />
          </template>
        </DssItem>
      </DssList>
    </section>

    <!-- ====================================================================
         Cenário 4: Com Brand Hub
         Lista com acento de marca Hub (laranja) e bordered.
         ==================================================================== -->
    <section>
      <h3 class="text-subtitle2 q-mb-sm">4. Com Brand Hub</h3>

      <DssList bordered separator brand="hub" aria-label="Lista Hub com acento de marca">
        <DssItem label="Dashboard" clickable brand="hub">
          <template #leading>
            <DssIcon name="dashboard" aria-hidden="true" />
          </template>
        </DssItem>
        <DssItem label="Relatórios" clickable brand="hub">
          <template #leading>
            <DssIcon name="bar_chart" aria-hidden="true" />
          </template>
        </DssItem>
        <DssItem label="Configurações" clickable brand="hub">
          <template #leading>
            <DssIcon name="settings" aria-hidden="true" />
          </template>
        </DssItem>
      </DssList>
    </section>

    <!-- ====================================================================
         Cenário 5: Combinação Completa com Separador Manual (DssSeparator)
         Demonstra coexistência com DssSeparator explícito (sem separator prop).
         ==================================================================== -->
    <section>
      <h3 class="text-subtitle2 q-mb-sm">5. Com Separador Manual (DssSeparator)</h3>

      <DssList bordered padding aria-label="Lista com separador manual">
        <DssItem label="Meu Perfil" clickable>
          <template #leading>
            <DssIcon name="person" aria-hidden="true" />
          </template>
        </DssItem>

        <DssSeparator />

        <DssItem label="Sair" clickable>
          <template #leading>
            <DssIcon name="logout" aria-hidden="true" />
          </template>
        </DssItem>
      </DssList>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * DssList.example.vue
 *
 * Exemplos interativos do componente DssList.
 * Demonstra os 5 cenários de uso mais comuns.
 *
 * Política DSS: .example.vue segue Token First e Composition API.
 * (Isento de hardcoded apenas para scaffolding de contexto visual — DssSpace policy)
 */

import DssList from './DssList.vue'

// Nota: DssItem, DssSeparator e DssIcon são importados globalmente
// via plugin DSS ou registrados no nível da aplicação.
</script>

<style scoped>
.dss-list-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-8);
  padding: var(--dss-spacing-6);
  max-width: 480px;
}

section {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}
</style>
