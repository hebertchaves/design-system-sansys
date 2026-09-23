<template>
  <PlaygroundLayout
    title="DssHeader — Playground"
    code="base/DssHeader"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Anatomia ────────────────────────────────────────────────── -->
    <PgSection id="anatomia" index="01" title="Anatomia" :count="2"
      desc="O DssHeader é a faixa fixa no topo do DssLayout. Ele é só a moldura — quem organiza o conteúdo é o DssToolbar por dentro. Fora de um DssLayout o QHeader não se posiciona.">
      <PgGrid class="pg-grid--full">
        <PgTile code="header + toolbar" align="start">
          <DssLayout view="hHh lpR fFf" class="th-palco">
            <DssHeader>
              <DssToolbar>
                <DssButton flat round aria-label="Menu" icon="menu" />
                <span class="th-titulo">Sansys Hub</span>
                <DssSpace />
                <DssButton flat round aria-label="Buscar" icon="search" />
              </DssToolbar>
            </DssHeader>
            <DssPageContainer>
              <p class="th-conteudo">Conteúdo da página</p>
            </DssPageContainer>
          </DssLayout>
        </PgTile>
        <PgTile code="sem toolbar (conteúdo livre)" align="start">
          <DssLayout view="hHh lpR fFf" class="th-palco">
            <DssHeader>
              <div class="th-livre">Conteúdo direto no header</div>
            </DssHeader>
            <DssPageContainer>
              <p class="th-conteudo">Conteúdo da página</p>
            </DssPageContainer>
          </DssLayout>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Separação do conteúdo ───────────────────────────────────── -->
    <PgSection id="separacao" index="02" title="Separação do conteúdo" :count="MOLDURAS.length"
      desc="Como o header se destaca da página: o padrão traz sombra leve + linha; elevated sobe a sombra; bordered é a alternativa FLAT (tira a sombra, fica a linha). Combinar as duas é contraditório — bordered vence, porque é a última na cascata.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="m in MOLDURAS" :key="m.code" :code="m.code" align="start">
          <DssLayout view="hHh lpR fFf" class="th-palco">
            <DssHeader :elevated="m.elevated" :bordered="m.bordered">
              <DssToolbar>
                <span class="th-titulo">{{ m.code }}</span>
              </DssToolbar>
            </DssHeader>
            <DssPageContainer>
              <p class="th-conteudo">Role para ver a separação contra o conteúdo.</p>
            </DssPageContainer>
          </DssLayout>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Reveal ──────────────────────────────────────────────────── -->
    <PgSection id="reveal" index="03" title="Reveal — esconder ao rolar" :count="2"
      desc="reveal esconde o header ao rolar para baixo e o traz de volta ao rolar para cima; revealOffset é a distância mínima antes de começar. Role dentro do palco para ver.">
      <PgGrid class="pg-grid--full">
        <PgTile code="reveal" align="start">
          <DssLayout view="hHh lpR fFf" class="th-palco th-palco--rolavel">
            <DssHeader reveal>
              <DssToolbar>
                <span class="th-titulo">Some ao rolar para baixo</span>
              </DssToolbar>
            </DssHeader>
            <DssPageContainer>
              <p v-for="n in 12" :key="n" class="th-conteudo">Linha de conteúdo {{ n }}</p>
            </DssPageContainer>
          </DssLayout>
        </PgTile>
        <PgTile code="reveal + revealOffset=120" align="start">
          <DssLayout view="hHh lpR fFf" class="th-palco th-palco--rolavel">
            <DssHeader reveal :reveal-offset="120">
              <DssToolbar>
                <span class="th-titulo">Só some após 120px</span>
              </DssToolbar>
            </DssHeader>
            <DssPageContainer>
              <p v-for="n in 12" :key="n" class="th-conteudo">Linha de conteúdo {{ n }}</p>
            </DssPageContainer>
          </DssLayout>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Visibilidade ────────────────────────────────────────────── -->
    <PgSection id="visibilidade" index="04" title="Visibilidade (v-model)" :count="1"
      desc="O v-model controla a presença do header. Serve para telas que entram em modo foco — leitura, apresentação — sem desmontar o layout.">
      <PgGrid class="pg-grid--full">
        <PgTile code="v-model" align="start">
          <div class="th-controle">
            <DssButton :label="visivel ? 'Esconder header' : 'Mostrar header'" size="sm" @click="visivel = !visivel" />
          </div>
          <DssLayout view="hHh lpR fFf" class="th-palco">
            <DssHeader v-model="visivel">
              <DssToolbar>
                <span class="th-titulo">Header controlado</span>
              </DssToolbar>
            </DssHeader>
            <DssPageContainer>
              <p class="th-conteudo">O conteúdo sobe quando o header sai.</p>
            </DssPageContainer>
          </DssLayout>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="05" title="Brandabilidade" :count="BRANDS.length"
      desc="O header é neutro por decisão: quem carrega a marca é o DssToolbar por dentro. Assim a faixa não muda de cor ao trocar de produto — só o conteúdo dela.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="b in BRANDS" :key="b" :code="`DssToolbar brand=&quot;${b}&quot;`" align="start">
          <DssLayout view="hHh lpR fFf" class="th-palco">
            <DssHeader>
              <DssToolbar :brand="b">
                <DssButton flat round aria-label="Menu" icon="menu" />
                <span class="th-titulo">{{ brandLabel(b) }}</span>
              </DssToolbar>
            </DssHeader>
            <DssPageContainer>
              <p class="th-conteudo">A marca vive no toolbar, não no header.</p>
            </DssPageContainer>
          </DssLayout>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Matriz ──────────────────────────────────────────────────── -->
    <PgSection id="matriz" index="06" title="Matriz separação × conteúdo" :count="MOLDURAS.length"
      desc="Cobertura combinatória: cada modo de separação com um toolbar completo, para inspeção rápida.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="m in MOLDURAS" :key="m.code" :code="m.code" align="start">
          <DssLayout view="hHh lpR fFf" class="th-palco">
            <DssHeader :elevated="m.elevated" :bordered="m.bordered">
              <DssToolbar>
                <DssButton flat round aria-label="Voltar" icon="arrow_back" />
                <span class="th-titulo">Detalhe</span>
                <DssSpace />
                <DssButton flat round aria-label="Mais opções" icon="more_vert" />
              </DssToolbar>
            </DssHeader>
            <DssPageContainer>
              <p class="th-conteudo">Conteúdo</p>
            </DssPageContainer>
          </DssLayout>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos ────────────────────────────────────────────────── -->
    <PgSection id="exemplos" index="07" title="Exemplos de uso" :count="1"
      desc="Renderiza o DssHeader.example.vue — fonte única, também usável na documentação.">
      <DssHeaderExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import { ref } from 'vue'
import DssHeader from '@components/base/DssHeader/DssHeader.vue'
import DssLayout from '@components/base/DssLayout/DssLayout.vue'
import DssPageContainer from '@components/base/DssPageContainer/DssPageContainer.vue'
import DssToolbar from '@components/base/DssToolbar/DssToolbar.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssSpace from '@components/base/DssSpace/DssSpace.vue'
import DssHeaderExample from '@components/base/DssHeader/DssHeader.example.vue'

// Template das páginas de teste. A página CONSOME o layout; não reimplementa
// casca, nav ou scroll-spy (premissa do DSS_DEFAULT_PREVIEW_WORKFLOW).
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica (vide DssHeader/types/header.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const BRANDS = ['hub', 'water', 'waste'] as const

const MOLDURAS = [
  { code: 'padrão',              elevated: false, bordered: false },
  { code: 'elevated',            elevated: true,  bordered: false },
  { code: 'bordered',            elevated: false, bordered: true },
  { code: 'elevated + bordered', elevated: true,  bordered: true },
]

const SECTIONS = [
  { id: 'anatomia',     index: '01', title: 'Anatomia' },
  { id: 'separacao',    index: '02', title: 'Separação' },
  { id: 'reveal',       index: '03', title: 'Reveal' },
  { id: 'visibilidade', index: '04', title: 'Visibilidade' },
  { id: 'brand',        index: '05', title: 'Brandabilidade' },
  { id: 'matriz',       index: '06', title: 'Matriz' },
  { id: 'exemplos',     index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: MOLDURAS.length, label: 'Separações' },
  { value: BRANDS.length,   label: 'Brands' },
  { value: 2,               label: 'Reveal' },
  { value: 1,               label: 'Slot' },
]

const visivel = ref(true)

const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>

<style scoped>
/* CONTEÚDO da demonstração, não casca de página. O QHeader só se posiciona
   dentro de um layout, e o layout precisa de altura própria para o header ter
   contra o que se destacar. */
.th-palco {
  min-height: var(--dss-spacing-48);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.th-palco--rolavel {
  max-height: var(--dss-spacing-64);
}

.th-titulo {
  font-size: var(--dss-font-size-md);
  font-weight: var(--dss-font-weight-medium);
}

.th-conteudo {
  margin: 0;
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}

.th-livre {
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  font-size: var(--dss-font-size-md);
}

.th-controle {
  margin-bottom: var(--dss-spacing-3);
}
</style>
