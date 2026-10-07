<!--
  ==========================================================================
  DssPageShell — Exemplos de uso
  ==========================================================================
-->
<template>
  <div class="dss-page-shell-examples">

    <section>
      <h3 class="ex-rotulo">1. O miolo completo</h3>
      <p class="ex-nota">
        Rail, trilha e board. O rail acompanha a marca sem receber nada: ele consome os
        tokens de ação, que o <code>[data-brand]</code> remapeia.
      </p>
      <div data-brand="water" class="ex-palco">
        <DssPageShell>
          <template #rail>
            <DssPageShellRailItem
              v-for="m in MODULOS" :key="m.label"
              :icon="m.icone" :label="m.label" :active="m.ativo"
              @click="moduloAtual = m.label"
            />
          </template>
          <template #breadcrumb>
            <DssBreadcrumbs separator="›" gutter="sm">
              <DssBreadcrumbsEl label="Pesquisar registro" icon="search" />
              <DssBreadcrumbsEl label="Solicitações" icon="description" />
            </DssBreadcrumbs>
          </template>

          <DssSectionTitle label="Verificações" size="lg" />
          <p class="ex-corpo">
            O conteúdo da página vai aqui, dentro do board — o cartão branco sobre o fundo
            rebaixado.
          </p>
        </DssPageShell>
      </div>
      <p v-if="moduloAtual" class="ex-nota">último módulo clicado: <code>{{ moduloAtual }}</code></p>
    </section>

    <section>
      <h3 class="ex-rotulo">2. As três marcas</h3>
      <p class="ex-nota">
        Mesmo markup. O rail muda de cor porque o fundo, o separador e o item ativo saem dos
        tokens de ação.
      </p>
      <div v-for="b in MARCAS" :key="b" :data-brand="b" class="ex-palco ex-palco--baixo">
        <DssPageShell :rail-aria-label="`Módulos do Sansys ${b}`">
          <template #rail>
            <DssPageShellRailItem v-for="m in MODULOS.slice(0, 3)" :key="m.label"
              :icon="m.icone" :label="m.label" :active="m.ativo" />
          </template>
          <DssSectionTitle :label="`Sansys ${b}`" />
        </DssPageShell>
      </div>
    </section>

    <section>
      <h3 class="ex-rotulo">3. Sem rail</h3>
      <p class="ex-nota">
        Tela sem navegação de módulos — um relatório, uma tela de impressão. O
        <code>&lt;nav&gt;</code> não é renderizado: região vazia é ruído para quem usa leitor
        de tela.
      </p>
      <div data-brand="water" class="ex-palco ex-palco--baixo">
        <DssPageShell>
          <DssSectionTitle label="Relatório mensal" />
          <p class="ex-corpo">Sem rail, a coluna de conteúdo ocupa a largura inteira.</p>
        </DssPageShell>
      </div>
    </section>

    <section>
      <h3 class="ex-rotulo">4. Sem o board</h3>
      <p class="ex-nota">
        <code>board={{ '{' }}false{{ '}' }}</code> devolve a coluna nua, para a tela que monta
        a própria superfície — ou que tem várias.
      </p>
      <div data-brand="water" class="ex-palco ex-palco--baixo">
        <DssPageShell :board="false">
          <template #rail>
            <DssPageShellRailItem icon="dashboard" label="Painel" active />
          </template>
          <DssCard variant="outlined" class="ex-cartao">
            <DssCardSection>Primeira superfície</DssCardSection>
          </DssCard>
          <DssCard variant="outlined" class="ex-cartao">
            <DssCardSection>Segunda superfície</DssCardSection>
          </DssCard>
        </DssPageShell>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssPageShell from './DssPageShell.vue'
import DssPageShellRailItem from './1-structure/DssPageShellRailItem.ts.vue'
import DssBreadcrumbs from '../../base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '../../base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssSectionTitle from '../../base/DssSectionTitle/DssSectionTitle.vue'
import DssCard from '../../base/DssCard/DssCard.vue'
import { DssCardSection } from '../../base/DssCard/index'

const MARCAS = ['water', 'hub', 'waste'] as const
const moduloAtual = ref('')

const MODULOS = [
  { icone: 'dashboard', label: 'Painel', ativo: true },
  { icone: 'description', label: 'Solicitações', ativo: false },
  { icone: 'people', label: 'Clientes', ativo: false },
  { icone: 'settings', label: 'Configurações', ativo: false },
]
</script>

<style scoped>
.dss-page-shell-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
}

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

/* O shell preenche a altura do pai. Dentro de uma página de exemplos o pai
   precisa declarar uma, senão o rail não tem o que acompanhar. */
.ex-palco {
  block-size: var(--dss-spacing-80);
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.ex-palco--baixo {
  block-size: var(--dss-spacing-48);
  margin-bottom: var(--dss-spacing-3);
}

.ex-corpo {
  margin: 0;
  max-width: 76ch;
  color: var(--dss-text-body);
}

.ex-cartao {
  padding: var(--dss-spacing-4);
}
</style>
