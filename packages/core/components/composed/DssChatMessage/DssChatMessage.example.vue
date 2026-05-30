<script setup lang="ts">
// DssChatMessage — Exemplos interativos
import { ref } from 'vue'
import DssChatMessage from './DssChatMessage.vue'

const lastAction = ref('')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-8); padding: var(--dss-spacing-6);">

    <!-- ================================================================
      Cenário 1: Conversa básica (recebida vs enviada)
    ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3); font-family: var(--dss-font-family-sans);">
        1. Conversa básica
      </h3>
      <div role="list" style="display: flex; flex-direction: column; gap: var(--dss-spacing-3);">
        <DssChatMessage
          message="Olá! Como você está?"
          sender-name="Maria Silva"
          avatar-src=""
          timestamp="10:30"
          status="read"
        />
        <DssChatMessage
          message="Estou bem, obrigado! E você?"
          :is-mine="true"
          timestamp="10:31"
          status="read"
        />
        <DssChatMessage
          message="Tudo ótimo! Tem reunião hoje às 14h."
          sender-name="Maria Silva"
          timestamp="10:32"
          status="delivered"
        />
        <DssChatMessage
          message="Certo, estarei lá!"
          :is-mine="true"
          timestamp="10:33"
          status="sent"
        />
      </div>
    </section>

    <!-- ================================================================
      Cenário 2: Estados de status
    ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3); font-family: var(--dss-font-family-sans);">
        2. Estados de status de mensagem
      </h3>
      <div role="list" style="display: flex; flex-direction: column; gap: var(--dss-spacing-3);">
        <DssChatMessage
          message="Mensagem enviando..."
          :is-mine="true"
          timestamp="11:00"
          status="sending"
        />
        <DssChatMessage
          message="Mensagem enviada"
          :is-mine="true"
          timestamp="11:01"
          status="sent"
        />
        <DssChatMessage
          message="Mensagem entregue"
          :is-mine="true"
          timestamp="11:02"
          status="delivered"
        />
        <DssChatMessage
          message="Mensagem lida ✓✓"
          :is-mine="true"
          timestamp="11:03"
          status="read"
        />
        <DssChatMessage
          message="Falha ao enviar — toque para tentar novamente"
          :is-mine="true"
          timestamp="11:04"
          status="error"
        />
      </div>
    </section>

    <!-- ================================================================
      Cenário 3: Com ações contextuais
    ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3); font-family: var(--dss-font-family-sans);">
        3. Com ações e interatividade
      </h3>
      <p style="font-family: var(--dss-font-family-sans); color: var(--dss-text-subtle); margin-bottom: var(--dss-spacing-2);">
        Última ação: <strong>{{ lastAction || '—' }}</strong>
      </p>
      <div role="list" style="display: flex; flex-direction: column; gap: var(--dss-spacing-3);">
        <DssChatMessage
          message="Mensagem com ações contextuais"
          sender-name="João Costa"
          timestamp="12:00"
          status="read"
          @click="lastAction = 'click na mensagem recebida'"
          @long-press="lastAction = 'long-press na mensagem recebida'"
        >
          <template #actions>
            <button
              style="font-size: var(--dss-font-size-xs); padding: var(--dss-spacing-0_5) var(--dss-spacing-2);"
              @click.stop="lastAction = 'Responder'"
            >
              Responder
            </button>
            <button
              style="font-size: var(--dss-font-size-xs); padding: var(--dss-spacing-0_5) var(--dss-spacing-2);"
              @click.stop="lastAction = 'Encaminhar'"
            >
              Encaminhar
            </button>
          </template>
        </DssChatMessage>

        <DssChatMessage
          message="Minha mensagem com ações"
          :is-mine="true"
          timestamp="12:01"
          status="delivered"
          @click="lastAction = 'click na minha mensagem'"
          @long-press="lastAction = 'long-press na minha mensagem'"
        >
          <template #actions>
            <button
              style="font-size: var(--dss-font-size-xs); padding: var(--dss-spacing-0_5) var(--dss-spacing-2);"
              @click.stop="lastAction = 'Editar'"
            >
              Editar
            </button>
            <button
              style="font-size: var(--dss-font-size-xs); padding: var(--dss-spacing-0_5) var(--dss-spacing-2);"
              @click.stop="lastAction = 'Excluir'"
            >
              Excluir
            </button>
          </template>
        </DssChatMessage>
      </div>
    </section>

    <!-- ================================================================
      Cenário 4: Compacto
    ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3); font-family: var(--dss-font-family-sans);">
        4. Modo compacto
      </h3>
      <div role="list" style="display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
        <DssChatMessage
          message="Mensagem compacta recebida"
          sender-name="Ana"
          timestamp="13:00"
          :compact="true"
        />
        <DssChatMessage
          message="Resposta compacta enviada"
          :is-mine="true"
          timestamp="13:00"
          status="sent"
          :compact="true"
        />
        <DssChatMessage
          message="Outra mensagem no modo compacto"
          sender-name="Ana"
          timestamp="13:01"
          :compact="true"
        />
      </div>
    </section>

    <!-- ================================================================
      Cenário 5: Estado selecionado e desabilitado
    ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3); font-family: var(--dss-font-family-sans);">
        5. Selecionada e desabilitada
      </h3>
      <div role="list" style="display: flex; flex-direction: column; gap: var(--dss-spacing-3);">
        <DssChatMessage
          message="Mensagem selecionada (modo de seleção ativo)"
          sender-name="Carlos"
          timestamp="14:00"
          :selected="true"
        />
        <DssChatMessage
          message="Mensagem desabilitada (não interativa)"
          :is-mine="true"
          timestamp="14:01"
          status="sent"
          :disable="true"
        />
      </div>
    </section>

    <!-- ================================================================
      Cenário 6: Brands
    ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3); font-family: var(--dss-font-family-sans);">
        6. Brands (Hub, Water, Waste)
      </h3>
      <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-6);">
        <div data-brand="hub" style="display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
          <p style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); font-family: var(--dss-font-family-sans);">Hub</p>
          <div role="list" style="display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
            <DssChatMessage message="Mensagem recebida no contexto Hub" sender-name="Hub User" timestamp="09:00" />
            <DssChatMessage message="Minha mensagem no Hub" :is-mine="true" timestamp="09:01" status="read" />
          </div>
        </div>

        <div data-brand="water" style="display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
          <p style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); font-family: var(--dss-font-family-sans);">Water</p>
          <div role="list" style="display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
            <DssChatMessage message="Mensagem recebida no contexto Water" sender-name="Water User" timestamp="09:00" />
            <DssChatMessage message="Minha mensagem no Water" :is-mine="true" timestamp="09:01" status="read" />
          </div>
        </div>

        <div data-brand="waste" style="display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
          <p style="font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); font-family: var(--dss-font-family-sans);">Waste</p>
          <div role="list" style="display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
            <DssChatMessage message="Mensagem recebida no contexto Waste" sender-name="Waste User" timestamp="09:00" />
            <DssChatMessage message="Minha mensagem no Waste" :is-mine="true" timestamp="09:01" status="read" />
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================
      Cenário 7: Slot de avatar customizado
    ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3); font-family: var(--dss-font-family-sans);">
        7. Avatar customizado via slot
      </h3>
      <div role="list" style="display: flex; flex-direction: column; gap: var(--dss-spacing-3);">
        <DssChatMessage
          message="Mensagem com avatar customizado via slot"
          sender-name="Bot"
          timestamp="15:00"
          status="delivered"
        >
          <template #avatar>
            <div
              style="width: 36px; height: 36px; border-radius: 50%; background-color: var(--dss-gray-300); display: flex; align-items: center; justify-content: center; font-size: var(--dss-font-size-sm); font-weight: var(--dss-font-weight-bold);"
              aria-hidden="true"
            >
              🤖
            </div>
          </template>
        </DssChatMessage>
      </div>
    </section>

  </div>
</template>
