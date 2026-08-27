<template>
  <div class="dss-empty-state-examples">
    <h1>DssEmptyState - Exemplos Completos</h1>

    <!-- 1. Busca sem resultado — o caso mais comum -->
    <section class="example-section">
      <h2>1. Busca sem resultado</h2>
      <p class="example-note">
        O caso dominante: o vazio SUBSTITUI um resultado. A saída é desfazer o filtro.
      </p>
      <div class="example-frame">
        <DssEmptyState
          icon="search_off"
          title="Nenhuma solicitação encontrada"
          description="Nenhum registro corresponde aos filtros aplicados. Ajuste os critérios ou limpe a busca."
        >
          <template #action>
            <DssButton variant="outline" size="sm" @click="filtros = []">
              Limpar filtros
            </DssButton>
          </template>
        </DssEmptyState>
      </div>
    </section>

    <!-- 2. Primeiro acesso — ainda não existe nada para ver -->
    <section class="example-section">
      <h2>2. Primeiro acesso (página inteira)</h2>
      <p class="example-note">
        Nada foi criado ainda. Aqui a ação é <strong>criar</strong>, não desfazer —
        e o <code>size="lg"</code> reconhece que o vazio ocupa a página toda.
      </p>
      <div class="example-frame">
        <DssEmptyState
          size="lg"
          icon="inbox"
          title="Você ainda não tem solicitações"
          description="Quando alguém abrir uma solicitação para a sua equipe, ela aparece aqui."
        >
          <template #action>
            <DssButton color="primary" icon="add">Nova solicitação</DssButton>
          </template>
        </DssEmptyState>
      </div>
    </section>

    <!-- 3. Dentro de tabela — size sm -->
    <section class="example-section">
      <h2>3. Dentro de uma tabela ou painel</h2>
      <p class="example-note">
        <code>size="sm"</code> cabe na linha vazia de uma tabela sem empurrar o layout.
      </p>
      <div class="example-frame example-frame--table">
        <DssEmptyState
          size="sm"
          icon="table_rows"
          title="Sem registros no período"
        />
      </div>
    </section>

    <!-- 4. Variante bordered -->
    <section class="example-section">
      <h2>4. Variante <code>bordered</code></h2>
      <p class="example-note">
        A moldura tracejada delimita uma área que <em>pertence</em> a algo e ainda
        não tem conteúdo — anexos, itens de um formulário.
      </p>
      <div class="example-frame">
        <DssEmptyState
          variant="bordered"
          icon="attach_file"
          title="Nenhum anexo"
          description="Arraste arquivos para esta área ou use o botão abaixo."
        >
          <template #action>
            <DssButton variant="outline" size="sm" icon="upload">Anexar arquivo</DssButton>
          </template>
        </DssEmptyState>
      </div>
    </section>

    <!-- 5. Sem ação — quando não há saída, o título basta -->
    <section class="example-section">
      <h2>5. Sem ação possível</h2>
      <p class="example-note">
        Estado vazio sem saída é legítimo — o que <strong>não</strong> se faz é inventar
        um botão que não resolve nada. Sem descrição e sem ação, só o fato.
      </p>
      <div class="example-frame">
        <DssEmptyState icon="event_busy" title="Nenhum evento agendado para hoje" />
      </div>
    </section>

    <!-- 6. Ilustração própria via slot -->
    <section class="example-section">
      <h2>6. Ilustração própria (slot <code>icon</code>)</h2>
      <p class="example-note">
        O slot tem precedência sobre a prop <code>icon</code>. Use para SVG de marca.
      </p>
      <div class="example-frame">
        <DssEmptyState title="Nada por aqui" description="Ilustração fornecida pelo consumidor.">
          <template #icon>
            <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" fill="none"
                 stroke="currentColor" stroke-width="2">
              <rect x="6" y="14" width="36" height="26" rx="3" />
              <path d="M6 20h36M16 8v6M32 8v6" />
            </svg>
          </template>
        </DssEmptyState>
      </div>
    </section>

    <!-- 7. announce=false — conteúdo estático -->
    <section class="example-section">
      <h2>7. <code>announce=false</code> para conteúdo estático</h2>
      <p class="example-note">
        Quando o bloco já nasce na tela e nunca muda, anunciá-lo é ruído para quem usa
        leitor de tela. Desligue o <code>role="status"</code> nesse caso — e
        <strong>só</strong> nesse caso.
      </p>
      <div class="example-frame">
        <DssEmptyState
          :announce="false"
          icon="folder_open"
          title="Esta pasta está vazia"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DssEmptyState from './DssEmptyState.vue'
import DssButton from '../DssButton/DssButton.vue'

const filtros = ref(['status:aberta'])
</script>

<style scoped>
.dss-empty-state-examples {
  padding: var(--dss-spacing-6);
  font-family: var(--dss-font-family-sans);
  color: var(--dss-text-primary);
}

.example-section {
  margin-bottom: var(--dss-spacing-10);
}

.example-note {
  max-width: var(--dss-spacing-192);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
}

/* Moldura só do exemplo: mostra a área que o bloco recebe do pai.
   A largura do bloco é decisão do PAI — o componente não a define. */
.example-frame {
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-md);
  background-color: var(--dss-surface-default);
}

.example-frame--table {
  max-width: var(--dss-spacing-120);
}
</style>
