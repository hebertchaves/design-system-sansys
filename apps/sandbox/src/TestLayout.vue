<template>
  <PlaygroundLayout
    title="DssLayout — Playground"
    code="base/DssLayout"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. O trio de estrutura ──────────────────────────────────────── -->
    <PgSection
      id="trio" index="01" title="O trio de estrutura" :count="2"
      desc="DssLayout › DssPageContainer › DssPage é indivisível, e isso não é convenção: o QLayout comunica os offsets de header, footer e drawer aos filhos por provide/inject e variáveis CSS. Fora desse contexto o DssHeader NÃO RENDERIZA — sem erro, sem aviso, simplesmente não aparece no DOM. Foi o primeiro defeito encontrado ao montar o Check-in NFAg desta onda."
    >
      <PgGrid>
        <PgTile code="trio completo — o header aparece" align="stretch">
          <div class="ly-palco">
            <DssLayout view="hHh lpR fFf" container class="ly-layout">
              <DssHeader>
                <DssToolbar brand="water">
                  <span class="ly-titulo">Header dentro do DssLayout</span>
                </DssToolbar>
              </DssHeader>
              <DssPageContainer>
                <DssPage class="ly-page">Conteúdo da página.</DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
        <PgTile code="DssHeader SEM DssLayout — o que acontece" align="stretch">
          <div class="ly-palco ly-palco--vazio">
            <p class="ly-nota">
              Fora do <code>DssLayout</code> o <code>DssHeader</code> não entra no DOM.
              Não há erro de Vue, não há tela em branco: o template continua válido e a
              barra simplesmente não existe. O Quasar registra
              <em>“QHeader needs to be child of QLayout”</em> no console — o único sinal.
            </p>
            <p class="ly-nota">
              Este tile descreve o defeito em vez de reproduzi-lo: montar a composição
              inválida custaria um erro de console por renderização, e console limpo é
              item do gate de fechamento da adequação.
            </p>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. container ────────────────────────────────────────────────── -->
    <PgSection
      id="container" index="02" title="Prop container" :count="2"
      desc="Sem container, o QLayout mede a JANELA e ocupa a viewport inteira — correto para a aplicação, errado para qualquer coisa embutida. Com container, ele mede o elemento pai. Toda demonstração de layout dentro de outra página precisa de container; sem ele, o layout escapa do palco."
    >
      <PgGrid>
        <PgTile code="container (contido no palco)" align="stretch">
          <div class="ly-palco">
            <DssLayout view="hHh lpR fFf" container class="ly-layout">
              <DssHeader>
                <DssToolbar brand="water"><span class="ly-titulo">Contido</span></DssToolbar>
              </DssHeader>
              <DssPageContainer>
                <DssPage class="ly-page">O layout respeita a caixa do pai.</DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
        <PgTile code="view — a string de estrutura" align="stretch">
          <div class="ly-palco">
            <DssLayout view="lHh Lpr lFf" container class="ly-layout">
              <DssHeader bordered>
                <DssToolbar><span class="ly-titulo">view="lHh Lpr lFf"</span></DssToolbar>
              </DssHeader>
              <DssPageContainer>
                <DssPage class="ly-page">
                  Cada letra governa header (h), drawer (l/r) e footer (f) por linha.
                  O padrão corporativo é <code>hHh lpR fFf</code>.
                </DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="03" title="Exemplos de uso" :count="1"
      desc="Cenários reais, vindos do DssLayout.example.vue do próprio componente."
    >
      <DssLayoutExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssLayout from '@components/base/DssLayout/DssLayout.vue'
import DssLayoutExample from '@components/base/DssLayout/DssLayout.example.vue'
import DssPageContainer from '@components/base/DssPageContainer/DssPageContainer.vue'
import DssPage from '@components/base/DssPage/DssPage.vue'
import DssHeader from '@components/base/DssHeader/DssHeader.vue'
import DssToolbar from '@components/base/DssToolbar/DssToolbar.vue'

const SECTIONS = [
  { id: 'trio',      index: '01', title: 'O trio de estrutura' },
  { id: 'container', index: '02', title: 'Prop container' },
  { id: 'exemplos',  index: '03', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 2, label: 'Props' },
  { value: 1, label: 'Slot' },
  { value: 3, label: 'Filhos previstos' },
  { value: 1, label: 'View padrão' },
]
</script>

<style scoped>
/* O palco dá a caixa que o `container` vai medir. */
.ly-palco {
  width: 100%;
  min-width: var(--dss-spacing-64);
  height: var(--dss-spacing-48);
  border: var(--dss-border-width-thin) dashed var(--dss-border-default);
  border-radius: var(--dss-radius-sm);
  overflow: hidden;
}

.ly-palco--vazio {
  padding: var(--dss-spacing-3);
}

.ly-layout {
  height: 100%;
}

.ly-titulo {
  color: inherit;
  font-weight: var(--dss-font-weight-medium);
}

.ly-page {
  padding: var(--dss-spacing-4);
  font-size: var(--dss-font-size-sm);
}

.ly-nota {
  margin: var(--dss-spacing-0);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}
</style>
