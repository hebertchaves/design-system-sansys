<template>
  <PlaygroundLayout
    title="DssPage — Playground"
    code="base/DssPage"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Altura mínima ────────────────────────────────────────────── -->
    <PgSection
      id="altura" index="01" title="Altura mínima calculada" :count="2"
      desc="O QPage recebe min-height por estilo INLINE, calculado em JavaScript a partir da janela e dos offsets do layout pai. É por isso que o DssPage não pode ser envolvido em outra div: o min-height iria para o wrapper e a página interna não expandiria, quebrando o rodapé grudado no fim. Compare conteúdo curto e longo — a superfície ocupa o palco nos dois."
    >
      <PgGrid>
        <PgTile code="conteúdo curto — a página ainda ocupa tudo" align="stretch">
          <div class="dp-palco">
            <DssLayout view="hHh lpR fFf" container class="dp-layout">
              <DssPageContainer>
                <DssPage class="dp-superficie">Uma linha.</DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
        <PgTile code="conteúdo longo — rola dentro do palco" align="stretch">
          <div class="dp-palco">
            <DssLayout view="hHh lpR fFf" container class="dp-layout">
              <DssPageContainer>
                <DssPage class="dp-superficie">
                  <p v-for="n in 12" :key="n" class="dp-linha">Linha {{ n }} de conteúdo.</p>
                </DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Padding ──────────────────────────────────────────────────── -->
    <PgSection
      id="padding" index="02" title="Prop padding" :count="2"
      desc="padding aplica o respiro padrão do Quasar na página inteira. Nas telas do Sansys o respiro costuma vir do container de conteúdo, não da página — então a prop fica desligada e quem governa a margem é a grade. Ligar as duas coisas soma dois paddings."
    >
      <PgGrid>
        <PgTile code="sem padding (padrão)" align="stretch">
          <div class="dp-palco">
            <DssLayout view="hHh lpR fFf" container class="dp-layout">
              <DssPageContainer>
                <DssPage class="dp-superficie dp-superficie--marcada">O conteúdo encosta na borda.</DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
        <PgTile code="padding" align="stretch">
          <div class="dp-palco">
            <DssLayout view="hHh lpR fFf" container class="dp-layout">
              <DssPageContainer>
                <DssPage padding class="dp-superficie dp-superficie--marcada">O conteúdo respira.</DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Semântica ────────────────────────────────────────────────── -->
    <PgSection
      id="semantica" index="03" title="Semântica" :count="2"
      desc="O DssPage declara role=&quot;main&quot; por padrão — é o conteúdo principal do documento, e só pode haver um por página. Quando a tela tem duas páginas montadas (transição de rota), ou quando o main já é do hospedeiro, o role precisa ser sobrescrito via $attrs."
    >
      <PgGrid>
        <PgTile code='role="main" (padrão)' align="stretch">
          <div class="dp-palco">
            <DssLayout view="hHh lpR fFf" container class="dp-layout">
              <DssPageContainer>
                <DssPage class="dp-superficie">Conteúdo principal do documento.</DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
        <PgTile code='role="region" (sobrescrito por $attrs)' align="stretch">
          <div class="dp-palco">
            <DssLayout view="hHh lpR fFf" container class="dp-layout">
              <DssPageContainer>
                <DssPage role="region" aria-label="Painel secundário" class="dp-superficie">
                  Região nomeada, não o main.
                </DssPage>
              </DssPageContainer>
            </DssLayout>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="04" title="Exemplos de uso" :count="1"
      desc="Cenários reais, vindos do DssPage.example.vue do próprio componente."
    >
      <DssPageExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssPage from '@components/base/DssPage/DssPage.vue'
import DssPageExample from '@components/base/DssPage/DssPage.example.vue'
import DssLayout from '@components/base/DssLayout/DssLayout.vue'
import DssPageContainer from '@components/base/DssPageContainer/DssPageContainer.vue'

const SECTIONS = [
  { id: 'altura',    index: '01', title: 'Altura mínima calculada' },
  { id: 'padding',   index: '02', title: 'Prop padding' },
  { id: 'semantica', index: '03', title: 'Semântica' },
  { id: 'exemplos',  index: '04', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 2, label: 'Props' },
  { value: 1, label: 'Slot' },
  { value: 1, label: 'Pai obrigatório' },
  { value: 1, label: 'Role padrão' },
]
</script>

<style scoped>
.dp-palco {
  width: 100%;
  min-width: var(--dss-spacing-64);
  height: var(--dss-spacing-48);
  border: var(--dss-border-width-thin) dashed var(--dss-border-default);
  border-radius: var(--dss-radius-sm);
  overflow: hidden;
}

.dp-layout {
  height: 100%;
}

.dp-superficie {
  font-size: var(--dss-font-size-sm);
}

.dp-superficie--marcada {
  background: var(--dss-surface-subtle);
}

.dp-linha {
  margin: var(--dss-spacing-0) var(--dss-spacing-0) var(--dss-spacing-2);
}
</style>
