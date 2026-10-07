<template>
  <PlaygroundLayout
    title="DssContainer — Playground"
    code="base/DssContainer"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Largura ──────────────────────────────────────────────────── -->
    <PgSection
      id="size" index="01" title="Teto de largura" :count="TAMANHOS.length"
      desc="Seis opções, da família --dss-container-* (a escala de GRADE, não a de leitura: --dss-layout-content-max-width é 720/960 e mira texto corrido, que é mais estreito que trilho de aplicação). A moldura tracejada marca onde o trilho termina — é o que se mede aqui, não o conteúdo. `responsive` reproduz a classe utilitária `.dss-container` que já existia em utils/_layout-helpers.scss — o componente absorveu o comportamento em vez de competir pelo mesmo nome."
    >
      <PgGrid>
        <PgTile v-for="t in TAMANHOS" :key="t.nome" :code="`size=&quot;${t.nome}&quot; · ${t.px}`" align="stretch">
          <div class="ct-palco">
            <DssContainer :size="t.nome" padding="sm" class="ct-moldura">
              {{ t.px }}
            </DssContainer>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Respiro ──────────────────────────────────────────────────── -->
    <PgSection
      id="padding" index="02" title="Respiro interno" :count="RESPIROS.length"
      desc="Escala --dss-gutter-*, que é a MESMA da calha entre colunas. Respiro e calha saindo de réguas diferentes dão dois ritmos na mesma página — é o defeito que aparece quando cada tela escolhe o próprio padding."
    >
      <PgGrid>
        <PgTile v-for="p in RESPIROS" :key="p.nome" :code="`padding=&quot;${p.nome}&quot; · ${p.px}`" align="stretch">
          <DssContainer size="fluid" :padding="p.nome" class="ct-moldura">
            <span class="ct-miolo">conteúdo</span>
          </DssContainer>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Ritmo vertical ───────────────────────────────────────────── -->
    <PgSection
      id="gap" index="03" title="Ritmo vertical" :count="4"
      desc="Acima de none o container vira coluna flex — deliberado, porque gap só existe em contexto flex ou grid. Em none ele NÃO impõe display: continua bloco comum, e quem quiser outro arranjo declara por fora sem brigar. Compare o primeiro tile (blocos colados) com os demais."
    >
      <PgGrid>
        <PgTile v-for="g in RITMOS" :key="g.nome" :code="`gap=&quot;${g.nome}&quot;${g.px ? ' · ' + g.px : ''}`" align="stretch">
          <DssContainer size="fluid" padding="sm" :gap="g.nome" class="ct-moldura">
            <span class="ct-bloco">um</span>
            <span class="ct-bloco">dois</span>
            <span class="ct-bloco">três</span>
          </DssContainer>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Centragem ────────────────────────────────────────────────── -->
    <PgSection
      id="centered" index="04" title="Centragem" :count="2"
      desc="margin-inline: auto, e não margin: 0 auto — o atalho zeraria a margem vertical que o consumidor tenha posto por fora. Centrar no eixo horizontal não tem nada a dizer sobre o vertical."
    >
      <PgGrid>
        <PgTile code="centered (padrão)" align="stretch">
          <div class="ct-palco">
            <DssContainer size="sm" padding="sm" class="ct-moldura">centrado</DssContainer>
          </div>
        </PgTile>
        <PgTile code=":centered=&quot;false&quot;" align="stretch">
          <div class="ct-palco">
            <DssContainer size="sm" padding="sm" :centered="false" class="ct-moldura">à esquerda</DssContainer>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Semântica ────────────────────────────────────────────────── -->
    <PgSection
      id="semantica" index="05" title="Semântica pela prop tag" :count="4"
      desc="O trilho principal de uma tela é main; uma faixa dentro dele, section. O componente não decide a estrutura do documento pelo consumidor — é a âncora do claim WCAG 1.3.1. Inspecione a tag renderizada, não só o visual: as quatro são idênticas na tela e diferentes na árvore."
    >
      <PgGrid>
        <PgTile v-for="t in TAGS" :key="t" :code="`tag=&quot;${t}&quot; → <${t}>`" align="stretch">
          <DssContainer :tag="t" size="fluid" padding="sm" class="ct-moldura">
            <code>&lt;{{ t }}&gt;</code>
          </DssContainer>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection
      id="brand" index="06" title="Brandabilidade" :count="6"
      desc="O container NÃO PINTA — não é superfície. A marca chega como data-brand no root e remapeia os tokens na subárvore: quem muda de cor são os FILHOS. As duas rotas têm de dar o mesmo resultado; se divergirem, é o bug de família da prop brand."
    >
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="`p-${b}`" :code="`prop brand=&quot;${b}&quot;`" align="stretch">
          <DssContainer size="fluid" padding="sm" :brand="b" class="ct-moldura">
            <DssButton variant="unelevated" color="primary" size="sm" label="Ação" />
          </DssContainer>
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`a-${b}`" :code="`ancestral [data-brand=&quot;${b}&quot;]`" align="stretch">
          <div :data-brand="b">
            <DssContainer size="fluid" padding="sm" class="ct-moldura">
              <DssButton variant="unelevated" color="primary" size="sm" label="Ação" />
            </DssContainer>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="07" title="Exemplos de uso" :count="4"
      desc="Cenários reais, vindos do DssContainer.example.vue do próprio componente."
    >
      <DssContainerExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssContainer from '@components/base/DssContainer/DssContainer.vue'
import DssContainerExample from '@components/base/DssContainer/DssContainer.example.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

const BRANDS = ['hub', 'water', 'waste'] as const
const TAGS = ['div', 'main', 'section', 'article'] as const

const TAMANHOS = [
  { nome: 'sm',    px: '608px' },
  { nome: 'md',    px: '960px' },
  { nome: 'lg',    px: '1280px' },
  { nome: 'xl',    px: '1600px' },
  { nome: 'fluid', px: 'sem teto' },
  { nome: 'responsive', px: 'acompanha o breakpoint' },
] as const

const RESPIROS = [
  { nome: 'none', px: '0' },
  { nome: 'xs',   px: '8px' },
  { nome: 'sm',   px: '16px' },
  { nome: 'md',   px: '24px' },
  { nome: 'lg',   px: '32px' },
  { nome: 'xl',   px: '40px' },
] as const

const RITMOS = [
  { nome: 'none', px: '' },
  { nome: 'sm',   px: '8px' },
  { nome: 'md',   px: '16px' },
  { nome: 'lg',   px: '24px' },
] as const

const SECTIONS = [
  { id: 'size',      index: '01', title: 'Teto de largura' },
  { id: 'padding',   index: '02', title: 'Respiro interno' },
  { id: 'gap',       index: '03', title: 'Ritmo vertical' },
  { id: 'centered',  index: '04', title: 'Centragem' },
  { id: 'semantica', index: '05', title: 'Semântica pela prop tag' },
  { id: 'brand',     index: '06', title: 'Brandabilidade' },
  { id: 'exemplos',  index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 6,                label: 'Props' },
  { value: TAMANHOS.length,  label: 'Larguras' },
  { value: RESPIROS.length,  label: 'Respiros' },
  { value: BRANDS.length,    label: 'Brands' },
]
</script>

<style scoped>
/* Palco: dá a largura contra a qual o teto do trilho é medido. */
.ct-palco {
  width: 100%;
  min-width: var(--dss-spacing-64);
  background: var(--dss-surface-subtle);
}

/* Andaime: torna o limite do trilho visível. Não faz parte do componente. */
.ct-moldura {
  outline: var(--dss-border-width-thin) dashed var(--dss-border-default);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

.ct-miolo {
  display: block;
  background: var(--dss-surface-selected);
  text-align: center;
}

.ct-bloco {
  background: var(--dss-surface-selected);
  padding: var(--dss-spacing-1) var(--dss-spacing-2);
  text-align: center;
}
</style>
