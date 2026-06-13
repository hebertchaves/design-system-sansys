<script setup lang="ts">
import { ref } from 'vue'
import DssTimeline from './DssTimeline.vue'
import DssTimelineEntry from '../DssTimelineEntry/DssTimelineEntry.vue'

const selectedLayout = ref<'dense' | 'comfortable' | 'loose'>('comfortable')
const selectedSide = ref<'left' | 'right'>('right')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 48px; padding: 24px; max-width: 800px;">

    <!-- Cenário 1: Timeline padrão (comfortable, side right) -->
    <section>
      <h3 style="margin-bottom: 16px;">Timeline Padrão</h3>
      <DssTimeline layout="comfortable" side="right">
        <DssTimelineEntry
          title="Pedido Criado"
          subtitle="20 Mai 2026, 09:00"
          icon="shopping_cart"
        >
          Seu pedido foi recebido com sucesso e está sendo processado.
        </DssTimelineEntry>
        <DssTimelineEntry
          title="Pagamento Confirmado"
          subtitle="20 Mai 2026, 09:15"
          icon="check_circle"
        >
          Pagamento via cartão de crédito aprovado.
        </DssTimelineEntry>
        <DssTimelineEntry
          title="Em Separação"
          subtitle="20 Mai 2026, 10:30"
          icon="inventory"
        >
          Produtos sendo separados no estoque.
        </DssTimelineEntry>
        <DssTimelineEntry
          title="Enviado"
          subtitle="20 Mai 2026, 14:00"
          icon="local_shipping"
        >
          Pedido entregue à transportadora. Código de rastreio: BR123456789.
        </DssTimelineEntry>
      </DssTimeline>
    </section>

    <!-- Cenário 2: Timeline com layout alternado (both sides) -->
    <section>
      <h3 style="margin-bottom: 16px;">Layout Alternado (side: left/right por entrada)</h3>
      <DssTimeline layout="comfortable">
        <DssTimelineEntry
          title="Fase 1 — Planejamento"
          subtitle="Janeiro 2026"
          icon="edit_note"
          side="right"
        >
          Definição de escopo e requisitos iniciais do projeto.
        </DssTimelineEntry>
        <DssTimelineEntry
          title="Fase 2 — Desenvolvimento"
          subtitle="Fevereiro–Março 2026"
          icon="code"
          side="left"
        >
          Implementação dos componentes base e compostos do design system.
        </DssTimelineEntry>
        <DssTimelineEntry
          title="Fase 3 — Auditoria"
          subtitle="Abril–Maio 2026"
          icon="fact_check"
          side="right"
        >
          Auditoria de conformidade e emissão dos selos DSS v2.2.
        </DssTimelineEntry>
      </DssTimeline>
    </section>

    <!-- Cenário 3: Timeline com heading e brand Hub -->
    <section data-brand="hub">
      <h3 style="margin-bottom: 16px;">Brand Hub + Heading Separator</h3>
      <DssTimeline layout="comfortable" side="right">
        <DssTimelineEntry heading title="2025" />
        <DssTimelineEntry
          title="DssButton selado"
          subtitle="Jan 2025"
          icon="check"
        >
          Primeiro componente do DSS recebe Selo v2.2.
        </DssTimelineEntry>
        <DssTimelineEntry
          title="Fase 1 concluída"
          subtitle="Mar 2025"
          icon="emoji_events"
        >
          19 componentes atômicos selados com sucesso.
        </DssTimelineEntry>
        <DssTimelineEntry heading title="2026" />
        <DssTimelineEntry
          title="Fase 2 iniciada"
          subtitle="Abr 2026"
          icon="rocket_launch"
        >
          Início dos componentes compostos e estruturais.
        </DssTimelineEntry>
      </DssTimeline>
    </section>

    <!-- Cenário 4: Layout Dense — brand Water -->
    <section data-brand="water">
      <h3 style="margin-bottom: 16px;">Layout Dense — Brand Water</h3>
      <DssTimeline layout="dense" side="right">
        <DssTimelineEntry title="Abertura do ticket" subtitle="09:00" icon="bug_report">
          Sistema reportou falha no serviço de autenticação.
        </DssTimelineEntry>
        <DssTimelineEntry title="Triagem realizada" subtitle="09:05" icon="manage_search">
          Equipe de infra analisou os logs de erro.
        </DssTimelineEntry>
        <DssTimelineEntry title="Hotfix aplicado" subtitle="09:22" icon="build">
          Deploy do patch emergencial realizado com sucesso.
        </DssTimelineEntry>
        <DssTimelineEntry title="Resolvido" subtitle="09:25" icon="done_all">
          Sistema restaurado. Ticket fechado.
        </DssTimelineEntry>
      </DssTimeline>
    </section>

    <!-- Cenário 5: Layout Loose — brand Waste -->
    <section data-brand="waste">
      <h3 style="margin-bottom: 16px;">Layout Loose — Brand Waste</h3>
      <DssTimeline layout="loose" side="left">
        <DssTimelineEntry
          title="Coleta Agendada"
          subtitle="Segunda, 09:00–12:00"
          icon="schedule"
        >
          Coleta de resíduos sólidos domiciliares agendada para o período da manhã.
        </DssTimelineEntry>
        <DssTimelineEntry
          title="Em Rota"
          subtitle="Segunda, 10:15"
          icon="directions_car"
        >
          Caminhão de coleta a caminho do seu endereço.
        </DssTimelineEntry>
        <DssTimelineEntry
          title="Coleta Realizada"
          subtitle="Segunda, 11:42"
          icon="check_circle"
        >
          Resíduos coletados com sucesso. Próxima coleta: Quinta-feira.
        </DssTimelineEntry>
      </DssTimeline>
    </section>

  </div>
</template>
