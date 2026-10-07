<template>
  <PlaygroundLayout
    title="DssLinearProgress — Playground"
    code="base/DssLinearProgress"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Determinada × indeterminada ──────────────────────────────── -->
    <PgSection
      id="modo" index="01" title="Determinada × indeterminada" :count="4"
      desc="A barra determinada mede progresso (value de 0 a 1); a indeterminada só diz “algo está acontecendo”. O que se verifica aqui é que value é ignorado quando indeterminate está ligado — o QLinearProgress recebe value: undefined, e é isso que ativa a animação."
    >
      <PgGrid>
        <PgTile v-for="m in MODOS" :key="m.code" :code="m.code" align="center">
          <div class="lp-stage">
            <DssLinearProgress :value="m.value" :indeterminate="m.indeterminate" />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Escala de tamanho ────────────────────────────────────────── -->
    <PgSection
      id="tamanhos" index="02" title="Escala de tamanho" :count="TAMANHOS.length"
      desc="Cinco degraus de espessura. A prop size é traduzida para token CSS e entregue ao Quasar como :size — nunca como px cru. Meça a altura renderizada: é ela que prova que a tradução aconteceu."
    >
      <PgGrid>
        <PgTile v-for="t in TAMANHOS" :key="t" :code="`size=&quot;${t}&quot;`" align="center">
          <div class="lp-stage">
            <DssLinearProgress :value="0.6" :size="t" />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Cor semântica ────────────────────────────────────────────── -->
    <PgSection
      id="cores" index="03" title="Cor semântica" :count="CORES.length"
      desc="Seis cores. primary consome --dss-action-primary (e por isso acompanha a marca); as demais consomem a escala --dss-feedback-*, que NÃO é brandeável — erro é vermelho em Hub, Water e Waste."
    >
      <PgGrid>
        <PgTile v-for="c in CORES" :key="c" :code="`color=&quot;${c}&quot;`" align="center">
          <div class="lp-stage">
            <DssLinearProgress :value="0.7" :color="c" />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection
      id="brand" index="04" title="Brandabilidade" :count="6"
      desc="Duas rotas para a mesma marca: a prop brand e o [data-brand] herdado de um ancestral. As duas precisam concordar. A rota ancestral não tem regra no componente — quem remapeia --dss-action-primary é o próprio tokens/brand/_*.scss, e o valor desce por herança."
    >
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="`p-${b}`" :code="`prop brand=&quot;${b}&quot;`" align="center">
          <div class="lp-stage">
            <DssLinearProgress :value="0.7" :brand="b" />
          </div>
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`a-${b}`" :code="`ancestral [data-brand=&quot;${b}&quot;]`" align="center">
          <div class="lp-stage" :data-brand="b">
            <DssLinearProgress :value="0.7" />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Regressão: cor semântica DENTRO de página brandeada ──────── -->
    <PgSection
      id="regressao" index="05" title="Cor semântica dentro de página brandeada" :count="6"
      desc="Este é o caso que quebrava. O _brands.scss pintava .q-linear-progress__model direto — especificidade (0,3,0) — e vencia a regra de cor (0,2,0). Dentro de qualquer [data-brand], e toda tela Sansys é brandeada, a prop color virava inerte: color=&quot;error&quot; renderizava azul-marca. Agora a marca remapeia o TOKEN e quem pinta é a regra de cor, então erro continua vermelho. Cada par abaixo tem de mostrar DUAS cores diferentes."
    >
      <PgGrid>
        <template v-for="b in BRANDS" :key="`r-${b}`">
          <PgTile :code="`[data-brand=&quot;${b}&quot;] + color=&quot;primary&quot;`" align="center">
            <div class="lp-stage" :data-brand="b">
              <DssLinearProgress :value="0.7" color="primary" />
            </div>
          </PgTile>
          <PgTile :code="`[data-brand=&quot;${b}&quot;] + color=&quot;error&quot; ← precisa ficar VERMELHO`" align="center">
            <div class="lp-stage" :data-brand="b">
              <DssLinearProgress :value="0.7" color="error" />
            </div>
          </PgTile>
        </template>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Stripe, reverse e disabled ───────────────────────────────── -->
    <PgSection
      id="estados" index="06" title="Stripe, reverse e disabled" :count="4"
      desc="stripe e reverse são repassados direto ao Quasar. disable é do DSS: o fade vem da cor desabilitada, não de opacity empilhada no wrapper — empilhar com o opacity layered do Quasar dava 0,24 e tornava a barra ilegível (checklist §F1)."
    >
      <PgGrid>
        <PgTile code="stripe" align="center">
          <div class="lp-stage"><DssLinearProgress :value="0.6" stripe /></div>
        </PgTile>
        <PgTile code="reverse" align="center">
          <div class="lp-stage"><DssLinearProgress :value="0.6" reverse /></div>
        </PgTile>
        <PgTile code="indeterminate + stripe" align="center">
          <div class="lp-stage"><DssLinearProgress indeterminate stripe /></div>
        </PgTile>
        <PgTile code="disable" align="center">
          <div class="lp-stage"><DssLinearProgress :value="0.6" disable /></div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="07" title="Exemplos de uso" :count="1"
      desc="Cenários reais, vindos do DssLinearProgress.example.vue do próprio componente."
    >
      <DssLinearProgressExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssLinearProgress from '@components/base/DssLinearProgress/DssLinearProgress.vue'
import DssLinearProgressExample from '@components/base/DssLinearProgress/DssLinearProgress.example.vue'

const BRANDS = ['hub', 'water', 'waste'] as const
const TAMANHOS = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const CORES = ['primary', 'secondary', 'error', 'success', 'warning', 'info'] as const

const MODOS = [
  { code: 'value="0.25"',              value: 0.25, indeterminate: false },
  { code: 'value="0.75"',              value: 0.75, indeterminate: false },
  { code: 'indeterminate',             value: 0,    indeterminate: true  },
  { code: 'indeterminate + value (value é ignorado)', value: 0.5, indeterminate: true },
]

const SECTIONS = [
  { id: 'modo',      index: '01', title: 'Determinada × indeterminada' },
  { id: 'tamanhos',  index: '02', title: 'Escala de tamanho' },
  { id: 'cores',     index: '03', title: 'Cor semântica' },
  { id: 'brand',     index: '04', title: 'Brandabilidade' },
  { id: 'regressao', index: '05', title: 'Cor semântica dentro de página brandeada' },
  { id: 'estados',   index: '06', title: 'Stripe, reverse e disabled' },
  { id: 'exemplos',  index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 8,               label: 'Props' },
  { value: TAMANHOS.length, label: 'Tamanhos' },
  { value: CORES.length,    label: 'Cores' },
  { value: BRANDS.length,   label: 'Brands' },
]
</script>

<style scoped>
/* Andaime: a barra é 100% da largura do pai, então o tile precisa dar largura. */
.lp-stage {
  width: 100%;
  min-width: var(--dss-spacing-40);
}
</style>
