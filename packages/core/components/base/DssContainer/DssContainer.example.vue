<template>
  <div class="dss-container-examples">

    <section>
      <h2>1. Trilho de página</h2>
      <p>O caso mais comum: teto de largura, respiro e centragem. É o que
        substitui o <code>.cn-main</code> reimplementado em cada tela.</p>
      <DssContainer tag="main" size="lg" padding="md" gap="md" class="ex-moldura">
        <DssCard variant="outlined"><DssCardSection>Primeiro bloco</DssCardSection></DssCard>
        <DssCard variant="outlined"><DssCardSection>Segundo bloco</DssCardSection></DssCard>
      </DssContainer>
    </section>

    <section>
      <h2>2. Ritmo vertical pelo gap</h2>
      <p>Acima de <code>none</code>, o container vira coluna flex e o respiro
        entre filhos passa a sair de token — não de margem decidida no filho.</p>
      <DssContainer size="md" padding="sm" gap="lg" class="ex-moldura">
        <DssBanner variant="info">Aviso</DssBanner>
        <DssBanner variant="success">Confirmação</DssBanner>
        <DssBanner variant="warning">Atenção</DssBanner>
      </DssContainer>
    </section>

    <section>
      <h2>3. Fluido dentro de um shell</h2>
      <p>Quando o pai já limita a largura, um segundo teto criaria margem dupla.
        <code>size="fluid"</code> ocupa o que o pai der.</p>
      <DssContainer size="fluid" padding="lg" class="ex-moldura">
        Ocupa a largura inteira do pai.
      </DssContainer>
    </section>

    <section>
      <h2>4. Semântica pela prop tag</h2>
      <p>O trilho principal é <code>main</code>; uma faixa dentro dele,
        <code>section</code>. O componente não decide isso pelo consumidor.</p>
      <DssContainer tag="section" size="sm" padding="md" class="ex-moldura">
        Renderizado como <code>&lt;section&gt;</code>.
      </DssContainer>
    </section>

  </div>
</template>

<script setup lang="ts">
import DssContainer from './DssContainer.vue'
import DssCard from '../DssCard/DssCard.vue'
import { DssCardSection } from '../DssCard/index'
import DssBanner from '../DssBanner/DssBanner.vue'
</script>

<style scoped>
.dss-container-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
}

/* Andaime só para o exemplo: torna o limite do trilho visível. */
.ex-moldura {
  outline: var(--dss-border-width-thin) dashed var(--dss-border-default);
}
</style>
