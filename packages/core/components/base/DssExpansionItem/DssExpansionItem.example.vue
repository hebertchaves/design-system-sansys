<template>
  <div class="expansion-item-examples">

    <!-- =================================================================
      CENÁRIO 1: Padrão — label simples com conteúdo de texto
      ================================================================= -->
    <section>
      <h3>1. Padrão</h3>
      <div class="demo-block">
        <DssExpansionItem
          label="O que é o Design System Sansys?"
          aria-label="Expandir: O que é o Design System Sansys?"
        >
          <div class="demo-content">
            <p>
              O Design System Sansys (DSS) é uma camada corporativa de design e engenharia
              construída sobre o Quasar Framework, fornecendo tokens semânticos, brandabilidade
              e governança visual para os produtos Sansys Hub, Water e Waste.
            </p>
          </div>
        </DssExpansionItem>
      </div>
    </section>

    <!-- =================================================================
      CENÁRIO 2: Completo — ícone, label, caption e conteúdo
      ================================================================= -->
    <section>
      <h3>2. Completo (Ícone + Caption)</h3>
      <div class="demo-block">
        <DssExpansionItem
          icon="settings"
          label="Configurações avançadas"
          caption="Gerencie preferências e permissões"
          aria-label="Expandir: Configurações avançadas"
        >
          <div class="demo-content">
            <p>Conteúdo de configurações avançadas aparece aqui quando o item é expandido.</p>
          </div>
        </DssExpansionItem>

        <DssExpansionItem
          icon="notifications"
          label="Notificações"
          caption="Alertas e preferências de comunicação"
          aria-label="Expandir: Notificações"
        >
          <div class="demo-content">
            <p>Configure quais notificações você deseja receber e como recebê-las.</p>
          </div>
        </DssExpansionItem>
      </div>
    </section>

    <!-- =================================================================
      CENÁRIO 3: Accordion — três itens com o mesmo group
      ================================================================= -->
    <section>
      <h3>3. Accordion (group)</h3>
      <div class="demo-block">
        <DssExpansionItem
          group="faq"
          label="Como criar uma conta?"
          aria-label="Expandir: Como criar uma conta?"
        >
          <div class="demo-content">
            <p>Acesse o portal e clique em "Criar conta". Preencha seus dados e confirme o e-mail.</p>
          </div>
        </DssExpansionItem>

        <DssExpansionItem
          group="faq"
          label="Como redefinir minha senha?"
          aria-label="Expandir: Como redefinir minha senha?"
        >
          <div class="demo-content">
            <p>Na tela de login, clique em "Esqueci minha senha" e siga as instruções enviadas por e-mail.</p>
          </div>
        </DssExpansionItem>

        <DssExpansionItem
          group="faq"
          label="Como entrar em contato com o suporte?"
          aria-label="Expandir: Como entrar em contato com o suporte?"
        >
          <div class="demo-content">
            <p>Use o chat ao vivo disponível no canto inferior direito ou abra um ticket pelo portal de suporte.</p>
          </div>
        </DssExpansionItem>
      </div>
    </section>

    <!-- =================================================================
      CENÁRIO 4: Disabled
      ================================================================= -->
    <section>
      <h3>4. Estado Disabled</h3>
      <div class="demo-block">
        <DssExpansionItem
          label="Item disponível"
          icon="check_circle"
          aria-label="Expandir: Item disponível"
        >
          <div class="demo-content">
            <p>Este item pode ser expandido normalmente.</p>
          </div>
        </DssExpansionItem>

        <DssExpansionItem
          label="Item desabilitado"
          icon="block"
          aria-label="Item desabilitado — não disponível"
          disable
        >
          <div class="demo-content">
            <p>Este conteúdo não é acessível.</p>
          </div>
        </DssExpansionItem>
      </div>
    </section>

    <!-- =================================================================
      CENÁRIO 5: Brand — Hub, Water, Waste
      Acento de marca visível no header quando expandido
      ================================================================= -->
    <section>
      <h3>5. Brandabilidade</h3>
      <div class="demo-row">

        <!-- Hub -->
        <div data-brand="hub" class="demo-brand-block">
          <p class="demo-brand-label">Hub</p>
          <DssExpansionItem
            icon="hub"
            label="Módulo Hub"
            caption="Gestão integrada"
            brand="hub"
            aria-label="Expandir: Módulo Hub"
          >
            <div class="demo-content">
              <p>Conteúdo do módulo Hub expandido com acento de marca laranja na borda esquerda do header.</p>
            </div>
          </DssExpansionItem>
        </div>

        <!-- Water -->
        <div data-brand="water" class="demo-brand-block">
          <p class="demo-brand-label">Water</p>
          <DssExpansionItem
            icon="water_drop"
            label="Módulo Water"
            caption="Monitoramento hídrico"
            brand="water"
            aria-label="Expandir: Módulo Water"
          >
            <div class="demo-content">
              <p>Conteúdo do módulo Water expandido com acento de marca azul na borda esquerda do header.</p>
            </div>
          </DssExpansionItem>
        </div>

        <!-- Waste -->
        <div data-brand="waste" class="demo-brand-block">
          <p class="demo-brand-label">Waste</p>
          <DssExpansionItem
            icon="recycling"
            label="Módulo Waste"
            caption="Gestão de resíduos"
            brand="waste"
            aria-label="Expandir: Módulo Waste"
          >
            <div class="demo-content">
              <p>Conteúdo do módulo Waste expandido com acento de marca verde na borda esquerda do header.</p>
            </div>
          </DssExpansionItem>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import DssExpansionItem from './DssExpansionItem.vue'
</script>

<style scoped>
.expansion-item-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-8);
  padding: var(--dss-spacing-6);
}

.demo-block {
  background: var(--dss-surface-default);
  border: var(--dss-border-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.demo-content {
  padding: var(--dss-spacing-4);
  color: var(--dss-text-body);
  font-size: var(--dss-font-size-md);
  line-height: var(--dss-line-height-normal);
}

.demo-content p {
  margin: 0;
}

.demo-row {
  display: flex;
  gap: var(--dss-spacing-4);
  flex-wrap: wrap;
}

.demo-brand-block {
  flex: 1;
  min-width: var(--dss-spacing-40);
  border: var(--dss-border-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.demo-brand-label {
  margin: 0;
  padding: var(--dss-spacing-2) var(--dss-spacing-4);
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-subtle);
  background: var(--dss-surface-subtle);
  border-bottom: var(--dss-border-gray-200);
}
</style>
