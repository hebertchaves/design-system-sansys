<!--
  ==========================================================================
  DssSectionTitle — Exemplos de uso
  ==========================================================================
-->
<template>
  <div class="dss-section-title-examples">

    <section>
      <h3 class="ex-rotulo">1. O caso padrão</h3>
      <p class="ex-nota">
        Numa página que já declara a marca, o traço fica na cor do produto sem ninguém
        passar nada — <code>accent="brand"</code> consome <code>--dss-action-primary</code>.
      </p>
      <div data-brand="water" class="ex-bloco">
        <DssSectionTitle label="Verificações" :level="2" size="lg" />
        <p class="ex-corpo">
          O conteúdo da seção vem aqui. O traço tem a largura do TEXTO, não a do container —
          é o que o diferencia de uma régua divisória.
        </p>
      </div>
    </section>

    <section>
      <h3 class="ex-rotulo">2. Nível e tamanho são independentes</h3>
      <p class="ex-nota">
        <code>level</code> decide a tag; <code>size</code> decide a aparência. Um
        <code>&lt;h3&gt;</code> pode precisar parecer grande sem virar <code>&lt;h1&gt;</code>
        — e é assim que a hierarquia de cabeçalhos para de mentir.
      </p>
      <div data-brand="water" class="ex-bloco">
        <DssSectionTitle :level="1" size="sm" label="h1 pequeno" />
        <DssSectionTitle :level="3" size="lg" label="h3 grande" />
      </div>
    </section>

    <section>
      <h3 class="ex-rotulo">3. Cor de estado</h3>
      <p class="ex-nota">
        A exceção nomeada: uma seção que fala de um estado pode querer o traço na cor desse
        estado. Elas não são brandeáveis — erro é vermelho em Water, Hub e Waste.
      </p>
      <div data-brand="water" class="ex-bloco ex-bloco--linha">
        <DssSectionTitle v-for="a in ACENTOS" :key="a" :accent="a" :label="a" />
      </div>
    </section>

    <section>
      <h3 class="ex-rotulo">4. As três marcas</h3>
      <p class="ex-nota">
        Mesmo markup, três contextos. O traço acompanha porque consome o token de ação, que o
        <code>[data-brand]</code> remapeia.
      </p>
      <div class="ex-bloco ex-bloco--linha">
        <div v-for="m in MARCAS" :key="m" :data-brand="m">
          <DssSectionTitle :label="`Seção ${m}`" />
        </div>
      </div>
    </section>

    <section>
      <h3 class="ex-rotulo">5. Título composto, pelo slot</h3>
      <p class="ex-nota">
        O slot aceita o que for — aqui, um rótulo com um chip ao lado.
      </p>
      <div data-brand="water" class="ex-bloco">
        <DssSectionTitle :level="2" size="lg">
          Faturamento <DssChip label="beta" size="xs" dense color="warning" />
        </DssSectionTitle>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import DssSectionTitle from './DssSectionTitle.vue'
import DssChip from '../DssChip/DssChip.vue'

const ACENTOS = ['info', 'success', 'warning', 'error'] as const
const MARCAS = ['water', 'hub', 'waste'] as const
</script>

<style scoped>
.dss-section-title-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
}

/* Rótulo dos BLOCOS do exemplo — não é um DssSectionTitle, de propósito:
   confundir a moldura do exemplo com o componente exibido faria a página
   mentir sobre o que está sendo demonstrado. */
.ex-rotulo {
  margin: 0 0 var(--dss-spacing-2);
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold);
  line-height: var(--dss-line-height-snug);
  color: var(--dss-text-primary);
}

.ex-nota {
  margin: 0 0 var(--dss-spacing-3);
  max-width: 76ch;
  font-size: var(--dss-font-size-sm);
  line-height: var(--dss-line-height-relaxed);
  color: var(--dss-text-subtle);
}

.ex-bloco {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
}

.ex-bloco--linha {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--dss-spacing-6);
}

.ex-corpo {
  margin: 0;
  max-width: 76ch;
  color: var(--dss-text-body);
}
</style>
