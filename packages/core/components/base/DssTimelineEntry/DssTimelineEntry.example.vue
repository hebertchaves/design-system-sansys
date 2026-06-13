<script setup lang="ts">
import DssTimeline from '../DssTimeline/DssTimeline.vue'
import DssTimelineEntry from './DssTimelineEntry.vue'
import DssBadge from '../DssBadge/DssBadge.vue'
import DssIcon from '../DssIcon/DssIcon.vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 48px; padding: 24px; max-width: 700px;">

    <!-- Cenário 1: Entrada padrão com title + subtitle + icon -->
    <section>
      <h3 style="margin-bottom: 16px;">Entrada Padrão</h3>
      <DssTimeline layout="comfortable" side="right">
        <DssTimelineEntry
          title="Evento Registrado"
          subtitle="20 Mai 2026, 14:00"
          icon="event"
        >
          Conteúdo descritivo do evento com informações relevantes.
        </DssTimelineEntry>
      </DssTimeline>
    </section>

    <!-- Cenário 2: Heading separator -->
    <section>
      <h3 style="margin-bottom: 16px;">Heading Separator</h3>
      <DssTimeline layout="comfortable" side="right">
        <DssTimelineEntry heading title="Março 2026" />
        <DssTimelineEntry title="Evento A" subtitle="01 Mar" icon="star">
          Primeiro evento do mês.
        </DssTimelineEntry>
        <DssTimelineEntry heading title="Abril 2026" />
        <DssTimelineEntry title="Evento B" subtitle="15 Abr" icon="star">
          Primeiro evento de abril.
        </DssTimelineEntry>
      </DssTimeline>
    </section>

    <!-- Cenário 3: Slots customizados (#title com DssBadge, #subtitle com time, #icon com DssIcon) -->
    <section>
      <h3 style="margin-bottom: 16px;">Slots Customizados</h3>
      <DssTimeline layout="comfortable" side="right">
        <DssTimelineEntry>
          <template #icon>
            <DssIcon name="person" />
          </template>
          <template #title>
            Usuário Admin <DssBadge label="ADMIN" />
          </template>
          <template #subtitle>
            <time datetime="2026-05-20T14:00">Hoje às 14:00</time>
          </template>
          Configurações de acesso atualizadas no sistema.
        </DssTimelineEntry>
      </DssTimeline>
    </section>

    <!-- Cenário 4: Avatar em vez de ícone -->
    <section>
      <h3 style="margin-bottom: 16px;">Com Avatar</h3>
      <DssTimeline layout="comfortable" side="right">
        <DssTimelineEntry
          title="João da Silva aprovado"
          subtitle="19 Mai 2026"
          avatar="https://cdn.quasar.dev/img/avatar.png"
        >
          Aprovação registrada pela equipe de RH.
        </DssTimelineEntry>
      </DssTimeline>
    </section>

  </div>
</template>
