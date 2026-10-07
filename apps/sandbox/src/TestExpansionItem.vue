<template>
  <PlaygroundLayout
    title="DssExpansionItem — Playground"
    code="base/DssExpansionItem"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Anatomia do header ───────────────────────────────────────── -->
    <PgSection
      id="anatomia" index="01" title="Anatomia do header" :count="4"
      desc="Duas rotas para o header: as props label/caption/icon, ou o slot header, que substitui as três. O slot é a saída quando o header precisa de conteúdo composto — chip de situação, marcador, resumo à direita. O que NÃO muda com o slot é o comportamento: continua sendo o mesmo botão, com aria-expanded e navegação por teclado do Quasar."
    >
      <PgGrid>
        <PgTile code="label" align="start">
          <div class="ei-stage">
            <DssExpansionItem label="Cadastro cClass">
              <div class="ei-panel">27 códigos ativos em 6 grupos.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
        <PgTile code="label + caption" align="start">
          <div class="ei-stage">
            <DssExpansionItem label="Cadastro cClass" caption="cClass (Código de Classificação)">
              <div class="ei-panel">27 códigos ativos em 6 grupos.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
        <PgTile code="label + caption + icon" align="start">
          <div class="ei-stage">
            <DssExpansionItem label="Cadastro cClass" caption="6 grupos" icon="fact_check">
              <div class="ei-panel">27 códigos ativos em 6 grupos.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
        <PgTile code="slot #header (substitui as props)" align="start">
          <div class="ei-stage">
            <DssExpansionItem aria-label="Verificação 2 — Vínculo cClass × serviços — situação Falha">
              <template #header>
                <div class="ei-header">
                  <span class="ei-header__num">2</span>
                  <span class="ei-header__txt">
                    <strong>Vínculo cClass × serviços</strong>
                    <span class="ei-header__sub">cClass › Código Serviço</span>
                  </span>
                  <DssChip color="negative" size="xs" dense icon="cancel" label="Falha" />
                </div>
              </template>
              <div class="ei-panel">3 serviços ativos sem cClass.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Abertura ─────────────────────────────────────────────────── -->
    <PgSection
      id="abertura" index="02" title="Abertura — v-model × defaultOpened" :count="3"
      desc="defaultOpened define o estado inicial e depois sai do caminho; v-model mantém o estado sob controle do consumidor, que é o que permite “abrir automaticamente as verificações com falha” depois de uma execução. O expandIcon troca o glifo do indicador sem mexer no comportamento."
    >
      <PgGrid>
        <PgTile code="fechado (padrão)" align="start">
          <div class="ei-stage">
            <DssExpansionItem label="Fechado ao montar">
              <div class="ei-panel">Conteúdo.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
        <PgTile code="defaultOpened" align="start">
          <div class="ei-stage">
            <DssExpansionItem label="Aberto ao montar" default-opened>
              <div class="ei-panel">Conteúdo.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
        <PgTile :code="`v-model (agora: ${controlado ? 'aberto' : 'fechado'})`" align="start">
          <div class="ei-stage">
            <DssButton
              variant="outline" color="primary" size="xs"
              :label="controlado ? 'Fechar pelo pai' : 'Abrir pelo pai'"
              class="ei-btn"
              @click="controlado = !controlado"
            />
            <DssExpansionItem v-model="controlado" label="Sob controle do pai" expand-icon="unfold_more">
              <div class="ei-panel">O pai manda no estado.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Accordion por group ──────────────────────────────────────── -->
    <PgSection
      id="group" index="03" title="Accordion por group" :count="2"
      desc="Com a mesma prop group, abrir um fecha os outros — o componente não implementa isso, delega ao Quasar. Sem group, os itens são independentes e vários ficam abertos ao mesmo tempo, que é o comportamento pedido por uma lista de verificações."
    >
      <PgGrid>
        <PgTile code='group="g1" — exclusivo' align="start">
          <div class="ei-stage">
            <DssExpansionItem v-for="n in 3" :key="`g-${n}`" :label="`Item ${n} (exclusivo)`" group="g1">
              <div class="ei-panel">Abrir este fecha os irmãos.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
        <PgTile code="sem group — independentes" align="start">
          <div class="ei-stage">
            <DssExpansionItem v-for="n in 3" :key="`i-${n}`" :label="`Item ${n} (independente)`">
              <div class="ei-panel">Vários podem ficar abertos.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Densidade, desabilitado e foco ───────────────────────────── -->
    <PgSection
      id="estados" index="04" title="Densidade, desabilitado e foco" :count="3"
      desc="dense reduz o header, mas o min-height é preservado no alvo de toque por acessibilidade — o visual encolhe, a área clicável não (WCAG 2.5.5). O anel de foco é desenhado POR DENTRO: o header ocupa a largura toda e um offset positivo sairia do card. Percorra com Tab."
    >
      <PgGrid>
        <PgTile code="padrão" align="start">
          <div class="ei-stage">
            <DssExpansionItem label="Altura padrão"><div class="ei-panel">Conteúdo.</div></DssExpansionItem>
          </div>
        </PgTile>
        <PgTile code="dense" align="start">
          <div class="ei-stage">
            <DssExpansionItem label="Denso" dense><div class="ei-panel">Conteúdo.</div></DssExpansionItem>
          </div>
        </PgTile>
        <PgTile code="disable" align="start">
          <div class="ei-stage">
            <DssExpansionItem label="Desabilitado" disable><div class="ei-panel">Inalcançável.</div></DssExpansionItem>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection
      id="brand" index="05" title="Brandabilidade" :count="6"
      desc="A marca aparece como acento de borda à esquerda, e SÓ quando o item está expandido — colapsado não exibe marca. É pela prop: a fila de baixo mostra que [data-brand] sozinho não pinta, e isso é deliberado (superfície, não campo — mesmo padrão do DssToolbar e do DssMarkupTable)."
    >
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="`p-${b}`" :code="`prop brand=&quot;${b}&quot; (aberto)`" align="start">
          <div class="ei-stage">
            <DssExpansionItem :label="`Marca ${b}`" :brand="b" default-opened>
              <div class="ei-panel">Acento à esquerda do header.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`a-${b}`" :code="`ancestral [data-brand=&quot;${b}&quot;] → sem acento`" align="start">
          <div class="ei-stage" :data-brand="b">
            <DssExpansionItem :label="`Ancestral ${b}`" default-opened>
              <div class="ei-panel">Sem acento: a marca é pela prop.</div>
            </DssExpansionItem>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="06" title="Exemplos de uso" :count="1"
      desc="Cenários reais, vindos do DssExpansionItem.example.vue do próprio componente."
    >
      <DssExpansionItemExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssExpansionItem from '@components/base/DssExpansionItem/DssExpansionItem.vue'
import DssExpansionItemExample from '@components/base/DssExpansionItem/DssExpansionItem.example.vue'
import DssChip from '@components/base/DssChip/DssChip.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

const BRANDS = ['hub', 'water', 'waste'] as const
const controlado = ref(false)

const SECTIONS = [
  { id: 'anatomia', index: '01', title: 'Anatomia do header' },
  { id: 'abertura', index: '02', title: 'Abertura — v-model × defaultOpened' },
  { id: 'group',    index: '03', title: 'Accordion por group' },
  { id: 'estados',  index: '04', title: 'Densidade, desabilitado e foco' },
  { id: 'brand',    index: '05', title: 'Brandabilidade' },
  { id: 'exemplos', index: '06', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 11,            label: 'Props' },
  { value: 2,             label: 'Slots' },
  { value: 4,             label: 'Eventos' },
  { value: BRANDS.length, label: 'Brands' },
]
</script>

<style scoped>
.ei-stage {
  width: 100%;
  min-width: var(--dss-spacing-64);
}

.ei-btn {
  margin-bottom: var(--dss-spacing-2);
}

.ei-panel {
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}

.ei-header {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  width: 100%;
  min-width: 0;
}

.ei-header__num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--dss-spacing-7);
  height: var(--dss-spacing-7);
  border-radius: var(--dss-radius-circle);
  background: var(--dss-feedback-error);
  color: var(--dss-text-inverse);
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-bold);
}

.ei-header__txt {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.ei-header__sub {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}
</style>
