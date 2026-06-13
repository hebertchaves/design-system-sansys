<template>
  <div class="dss-avatar-examples">
    <h1>DssAvatar - Exemplos Completos</h1>

    <!-- Cenário 1: Tamanhos -->
    <section class="example-section">
      <h2>Tamanhos</h2>
      <div class="avatar-row">
        <DssAvatar size="xs" icon="person" aria-label="Avatar extra pequeno" />
        <DssAvatar size="sm" icon="person" aria-label="Avatar pequeno" />
        <DssAvatar size="md" icon="person" aria-label="Avatar médio (padrão)" />
        <DssAvatar size="lg" icon="person" aria-label="Avatar grande" />
        <DssAvatar size="xl" icon="person" aria-label="Avatar extra grande" />
      </div>
    </section>

    <!-- Cenário 2: Conteúdo (iniciais, ícone e imagem) -->
    <section class="example-section">
      <h2>Tipos de Conteúdo</h2>
      <div class="avatar-row">
        <DssAvatar aria-label="Usuária Ana Souza">AS</DssAvatar>
        <DssAvatar icon="person" aria-label="Usuário sem foto" />
        <DssAvatar aria-label="Foto de perfil">
          <img
            src="https://cdn.quasar.dev/img/avatar.png"
            alt="Foto de perfil do usuário"
          />
        </DssAvatar>
      </div>
    </section>

    <!-- Cenário 3: Status indicators -->
    <section class="example-section">
      <h2>Indicadores de Status</h2>
      <div class="avatar-row">
        <DssAvatar status="online" aria-label="Usuário online">ON</DssAvatar>
        <DssAvatar status="away" aria-label="Usuário ausente">AW</DssAvatar>
        <DssAvatar status="busy" aria-label="Usuário ocupado">BS</DssAvatar>
        <DssAvatar status="offline" aria-label="Usuário offline">OF</DssAvatar>
      </div>
    </section>

    <!-- Cenário 4: Brandabilidade -->
    <section class="example-section">
      <h2>Brands (Hub, Water, Waste)</h2>
      <div class="avatar-row">
        <div data-brand="hub">
          <DssAvatar status="online" aria-label="Avatar contexto Hub">HB</DssAvatar>
        </div>
        <div data-brand="water">
          <DssAvatar status="online" aria-label="Avatar contexto Water">WT</DssAvatar>
        </div>
        <div data-brand="waste">
          <DssAvatar status="online" aria-label="Avatar contexto Waste">WS</DssAvatar>
        </div>
      </div>
    </section>

    <!-- Cenário 5: Grupo de avatares -->
    <section class="example-section">
      <h2>Grupo (sobreposição)</h2>
      <div class="dss-avatar-group">
        <DssAvatar aria-label="Membro 1">A</DssAvatar>
        <DssAvatar aria-label="Membro 2">B</DssAvatar>
        <DssAvatar aria-label="Membro 3">C</DssAvatar>
        <DssAvatar aria-label="Mais 4 membros">+4</DssAvatar>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * DssAvatar — Exemplos interativos (mínimo 3 cenários — Gate Documental).
 * Criado na Onda P0/T7.3 (era o único componente do grupo Atômico 1
 * sem example.vue — achado A3 da Auditoria Final Jun/2026).
 */
import DssAvatar from './DssAvatar.vue'
</script>

<style lang="scss" scoped>
@use '../../../utils/example-showcase' as *;

.avatar-row {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-4);
  flex-wrap: wrap;
}
</style>
