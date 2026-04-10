<script setup lang="ts">
/**
 * DssTabPanel — Exemplos de Uso
 *
 * Cenários cobertos:
 * 1. Básico: painel simples com texto dentro de DssTabPanels (v1.0.0 — RES-01 resolvida)
 * 2. Conteúdo Rico: painel contendo DssCard com seções
 * 3. Múltiplos Painéis: uso completo com DssTabs + DssTab + DssTabPanels + brand
 *
 * Atualizado em 2026-04-09 para usar DssTabPanels (agora implementado).
 * Resolve RES-01 do DssTabPanel: exemplos atualizados de QTabPanels para DssTabPanels.
 */
import { ref } from 'vue'
import DssTab from '../DssTab/DssTab.vue'
import DssTabs from '../DssTabs/DssTabs.vue'
import DssTabPanel from './DssTabPanel.vue'
import DssTabPanels from '../DssTabPanels/DssTabPanels.vue'

// ==========================================================================
// CENÁRIO 1 — Básico
// ==========================================================================

const tabBasico = ref('descricao')

// ==========================================================================
// CENÁRIO 2 — Conteúdo Rico
// ==========================================================================

const tabRico = ref('produto')

// ==========================================================================
// CENÁRIO 3 — Múltiplos Painéis com Brand
// ==========================================================================

const tabCompleto = ref('perfil')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 48px; padding: 24px;">

    <!-- ======================================================================
         CENÁRIO 1 — Básico
         Painel simples com texto, dentro do contexto mínimo de DssTabPanels.
         Demonstra o uso mais direto do DssTabPanel.
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 1: Básico</p>

      <DssTabs v-model="tabBasico" align="left">
        <DssTab name="descricao" label="Descrição" />
        <DssTab name="detalhes" label="Detalhes" />
      </DssTabs>

      <DssTabPanels v-model="tabBasico">
        <DssTabPanel name="descricao">
          <p>Este é o painel de Descrição. O DssTabPanel fornece espaçamento
          governado por tokens DSS e é um container não-interativo — os
          filhos são responsáveis pela interatividade.</p>
        </DssTabPanel>

        <DssTabPanel name="detalhes">
          <p>Este é o painel de Detalhes. O padding interno usa
          <code>var(--dss-spacing-6)</code> em vez do valor nativo do
          QTabPanel, garantindo alinhamento com o sistema de espaçamento DSS.</p>
        </DssTabPanel>
      </DssTabPanels>
    </section>

    <!-- ======================================================================
         CENÁRIO 2 — Conteúdo Rico
         Painel contendo componentes DSS compostos (DssCard, DssButton, etc.).
         Demonstra que o DssTabPanel não estiliza filhos — composição é
         responsabilidade do consumidor (Gate de Composição v2.4).
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 2: Conteúdo Rico (com DssCard)</p>

      <DssTabs v-model="tabRico" align="left">
        <DssTab name="produto" label="Produto" />
        <DssTab name="especificacoes" label="Especificações" />
        <DssTab name="avaliacoes" label="Avaliações" />
      </DssTabs>

      <DssTabPanels v-model="tabRico" animated>
        <DssTabPanel name="produto">
          <q-card class="dss-card" flat bordered>
            <q-card-section class="dss-card-section">
              <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">
                Produto Principal
              </div>
              <p>Descrição detalhada do produto com todas as informações
              relevantes para o usuário. O DssTabPanel é o container
              estrutural — o DssCard é o responsável pela superfície visual.</p>
            </q-card-section>
            <q-card-actions class="dss-card-actions" align="right">
              <q-btn flat label="Saiba mais" />
              <q-btn color="primary" label="Adicionar ao carrinho" />
            </q-card-actions>
          </q-card>
        </DssTabPanel>

        <DssTabPanel name="especificacoes">
          <q-card class="dss-card" flat bordered>
            <q-card-section class="dss-card-section">
              <div style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">
                Especificações Técnicas
              </div>
              <ul style="padding-left: 20px; line-height: 1.8;">
                <li>Dimensões: 10 × 5 × 3 cm</li>
                <li>Peso: 250g</li>
                <li>Material: Alumínio reciclado</li>
                <li>Garantia: 24 meses</li>
              </ul>
            </q-card-section>
          </q-card>
        </DssTabPanel>

        <DssTabPanel name="avaliacoes">
          <p style="color: var(--dss-text-subtle); font-style: italic;">
            Nenhuma avaliação disponível ainda. Seja o primeiro a avaliar!
          </p>
        </DssTabPanel>
      </DssTabPanels>
    </section>

    <!-- ======================================================================
         CENÁRIO 3 — Múltiplos Painéis com Brand
         Demonstra propagação de marca do DssTabs para o DssTabPanel
         via cascade CSS ([data-brand]).
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 3: Com propagação de marca (Hub)</p>

      <div data-brand="hub">
        <DssTabs v-model="tabCompleto" align="left">
          <DssTab name="perfil" label="Perfil" />
          <DssTab name="seguranca" label="Segurança" />
          <DssTab name="notificacoes" label="Notificações" />
        </DssTabs>

        <DssTabPanels v-model="tabCompleto">
          <DssTabPanel name="perfil">
            <p>Configurações de perfil do usuário. A borda esquerda laranja
            indica o acento de marca Hub, propagado via <code>[data-brand]</code>
            do container ancestral.</p>
          </DssTabPanel>

          <DssTabPanel name="seguranca">
            <p>Configurações de segurança: senha, autenticação de dois fatores
            e sessões ativas.</p>
          </DssTabPanel>

          <DssTabPanel name="notificacoes">
            <p>Preferências de notificações por e-mail, SMS e push.</p>
          </DssTabPanel>
        </DssTabPanels>
      </div>
    </section>

  </div>
</template>
