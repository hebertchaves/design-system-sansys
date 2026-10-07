<template>
  <PlaygroundLayout
    title="DssPageContainer — Playground"
    code="base/DssPageContainer"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. O que ele faz ────────────────────────────────────────────── -->
    <PgSection
      id="papel" index="01" title="O papel — reservar o espaço das marginais" :count="2"
      desc="O DssPageContainer não tem prop nenhuma e não desenha nada: ele envolve o QPageContainer, que aplica o padding correspondente à altura do header, do footer e à largura dos drawers. Sem ele, o conteúdo passa POR BAIXO do header fixo. Compare os dois palcos: no da direita o texto começa escondido atrás da barra."
    >
      <PgGrid>
        <PgTile code="com DssPageContainer — conteúdo abaixo do header" align="stretch">
          <div class="pc-palco">
            <DssLayout view="hHh lpR fFf" container class="pc-layout">
              <DssHeader>
                <DssToolbar brand="water"><span class="pc-titulo">Header fixo</span></DssToolbar>
              </DssHeader>
              <DssPageContainer>
                <DssPage class="pc-page">
                  <strong>Primeira linha visível.</strong>
                  <p class="pc-texto">O container reservou a altura do header.</p>
                </DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
        <PgTile code="sem DssPageContainer — o que acontece" align="stretch">
          <div class="pc-palco pc-palco--nota">
            <p class="pc-texto">
              Sem o container, nada reserva a altura do header: a primeira linha do
              conteúdo nasce por baixo da barra fixa. O Quasar registra
              <em>“QPage needs to be child of QPageContainer”</em> no console.
            </p>
            <p class="pc-texto">
              Este tile descreve o defeito em vez de reproduzi-lo — montar a composição
              inválida custaria dois erros de console por renderização, e console limpo
              é item do gate de fechamento.
            </p>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Filho previsto ───────────────────────────────────────────── -->
    <PgSection
      id="filhos" index="02" title="Filho previsto — DssPage" :count="2"
      desc="O slot é destinado ao DssPage. Mais de uma página dentro do mesmo container é uso válido para transição de rota, mas o min-height calculado vale por página — duas páginas empilhadas somam altura e criam rolagem dupla."
    >
      <PgGrid>
        <PgTile code="uma DssPage" align="stretch">
          <div class="pc-palco">
            <DssLayout view="hHh lpR fFf" container class="pc-layout">
              <DssPageContainer>
                <DssPage class="pc-page">Página única.</DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
        <PgTile code="DssPage com padding" align="stretch">
          <div class="pc-palco">
            <DssLayout view="hHh lpR fFf" container class="pc-layout">
              <DssPageContainer>
                <DssPage padding class="pc-page pc-page--sem-padding">
                  Página com a prop padding — o respiro vem do componente.
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
      desc="Cenários reais, vindos do DssPageContainer.example.vue do próprio componente."
    >
      <DssPageContainerExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssPageContainer from '@components/base/DssPageContainer/DssPageContainer.vue'
import DssPageContainerExample from '@components/base/DssPageContainer/DssPageContainer.example.vue'
import DssLayout from '@components/base/DssLayout/DssLayout.vue'
import DssPage from '@components/base/DssPage/DssPage.vue'
import DssHeader from '@components/base/DssHeader/DssHeader.vue'
import DssToolbar from '@components/base/DssToolbar/DssToolbar.vue'

const SECTIONS = [
  { id: 'papel',    index: '01', title: 'O papel — reservar o espaço das marginais' },
  { id: 'filhos',   index: '02', title: 'Filho previsto — DssPage' },
  { id: 'exemplos', index: '03', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 0, label: 'Props' },
  { value: 1, label: 'Slot' },
  { value: 1, label: 'Filho previsto' },
  { value: 1, label: 'Pai obrigatório' },
]
</script>

<style scoped>
.pc-palco--nota {
  padding: var(--dss-spacing-3);
}

.pc-palco {
  width: 100%;
  min-width: var(--dss-spacing-64);
  height: var(--dss-spacing-48);
  border: var(--dss-border-width-thin) dashed var(--dss-border-default);
  border-radius: var(--dss-radius-sm);
  overflow: hidden;
}

.pc-layout {
  height: 100%;
}

.pc-titulo {
  color: inherit;
  font-weight: var(--dss-font-weight-medium);
}

.pc-page {
  padding: var(--dss-spacing-4);
  font-size: var(--dss-font-size-sm);
}

.pc-page--sem-padding {
  padding: var(--dss-spacing-0);
}

.pc-texto {
  margin: var(--dss-spacing-1) var(--dss-spacing-0) var(--dss-spacing-0);
  color: var(--dss-text-subtle);
}
</style>
