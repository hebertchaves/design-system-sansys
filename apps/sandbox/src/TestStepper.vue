<template>
  <PlaygroundLayout
    title="DssStepper — Playground"
    code="base/DssStepper"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Orientação ──────────────────────────────────────────────── -->
    <PgSection id="orientacao" index="01" title="Orientação" :count="2"
      desc="Prop vertical do DssStepper. No horizontal os passos formam uma barra e só o painel ativo aparece abaixo; no vertical cada passo abre o próprio painel no lugar.">
      <PgGrid class="pg-grid--full">
        <PgTile code="horizontal (padrão)" align="start">
          <DssStepper v-model="passoA" class="ts-largura">
            <DssStep name="1" title="Dados" caption="Identificação" icon="person">
              Conteúdo do passo 1.
            </DssStep>
            <DssStep name="2" title="Endereço" caption="Local de atendimento" icon="place">
              Conteúdo do passo 2.
            </DssStep>
            <DssStep name="3" title="Revisão" caption="Confirme e envie" icon="task_alt">
              Conteúdo do passo 3.
            </DssStep>
          </DssStepper>
        </PgTile>
        <PgTile code="vertical" align="start">
          <DssStepper v-model="passoB" vertical class="ts-largura">
            <DssStep name="1" title="Dados" caption="Identificação" icon="person">
              Conteúdo do passo 1.
            </DssStep>
            <DssStep name="2" title="Endereço" caption="Local de atendimento" icon="place">
              Conteúdo do passo 2.
            </DssStep>
            <DssStep name="3" title="Revisão" caption="Confirme e envie" icon="task_alt">
              Conteúdo do passo 3.
            </DssStep>
          </DssStepper>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Estados do passo ────────────────────────────────────────── -->
    <PgSection id="estados" index="02" title="Estados do passo" :count="4"
      desc="Os estados moram no DssStep, não no container. ativo é o passo do v-model; done e error são props declaradas pelo consumidor; disable bloqueia a navegação por cabeçalho.">
      <PgGrid class="pg-grid--full">
        <PgTile code="ativo · done · error · disable" align="start">
          <DssStepper v-model="passoC" class="ts-largura">
            <DssStep name="1" title="Concluído" caption="done" done icon="person">
              Passo concluído.
            </DssStep>
            <DssStep name="2" title="Ativo" caption="passo atual" icon="place">
              Passo ativo — este é o do v-model.
            </DssStep>
            <DssStep name="3" title="Com erro" caption="error" error icon="warning">
              Passo com erro.
            </DssStep>
            <DssStep name="4" title="Bloqueado" caption="disable" disable icon="lock">
              Passo desabilitado.
            </DssStep>
          </DssStepper>
        </PgTile>
      </PgGrid>
      <p class="ts-nota">
        O dot de cada estado tem cor própria: cinza em repouso, <code>action-primary</code> no ativo,
        <code>feedback-success</code> no done e <code>feedback-error</code> no erro.
      </p>
    </PgSection>

    <!-- ── 03. Ícones por estado ───────────────────────────────────────── -->
    <PgSection id="icones" index="03" title="Ícones por estado" :count="4"
      desc="icon é o ícone de repouso; activeIcon, doneIcon e errorIcon substituem-no no respectivo estado. Sem icon, o QStepper numera o passo.">
      <PgGrid class="pg-grid--full">
        <PgTile code="numeração (sem icon)" align="start">
          <DssStepper v-model="passoD" class="ts-largura">
            <DssStep name="1" title="Um" done>Passo 1.</DssStep>
            <DssStep name="2" title="Dois">Passo 2.</DssStep>
            <DssStep name="3" title="Três">Passo 3.</DssStep>
          </DssStepper>
        </PgTile>
        <PgTile code="icon + doneIcon + errorIcon" align="start">
          <DssStepper v-model="passoE" class="ts-largura">
            <DssStep name="1" title="Enviado" icon="mail" done-icon="check" done>Passo 1.</DssStep>
            <DssStep name="2" title="Em análise" icon="hourglass_empty" active-icon="pending">Passo 2.</DssStep>
            <DssStep name="3" title="Recusado" icon="gavel" error-icon="report" error>Passo 3.</DssStep>
          </DssStepper>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Navegação por cabeçalho ─────────────────────────────────── -->
    <PgSection id="headernav" index="04" title="Navegação por cabeçalho" :count="2"
      desc="headerNav torna o cabeçalho clicável. Sem ele o cabeçalho é apenas indicador — o cursor continua default e não há hover nem foco de teclado.">
      <PgGrid class="pg-grid--full">
        <PgTile code="sem headerNav (indicador)" align="start">
          <DssStepper v-model="passoF" class="ts-largura">
            <DssStep name="1" title="Um" icon="looks_one">Passo 1.</DssStep>
            <DssStep name="2" title="Dois" icon="looks_two">Passo 2.</DssStep>
          </DssStepper>
        </PgTile>
        <PgTile code="headerNav (clicável, com foco)" align="start">
          <DssStepper v-model="passoG" header-nav class="ts-largura">
            <DssStep name="1" title="Um" icon="looks_one" header-nav>Passo 1.</DssStep>
            <DssStep name="2" title="Dois" icon="looks_two" header-nav>Passo 2.</DssStep>
          </DssStepper>
        </PgTile>
      </PgGrid>
      <p class="ts-nota">Navegue por Tab no segundo para ver o anel de foco no cabeçalho.</p>
    </PgSection>

    <!-- ── 05. Moldura ─────────────────────────────────────────────────── -->
    <PgSection id="moldura" index="05" title="Moldura" :count="3"
      desc="flat remove a sombra; bordered troca a sombra por borda. São exclusivos entre si na leitura visual, mas independentes na API.">
      <PgGrid class="pg-grid--full">
        <PgTile v-for="m in MOLDURAS" :key="m.code" :code="m.code" align="start">
          <DssStepper v-model="passoH" :flat="m.flat" :bordered="m.bordered" class="ts-largura">
            <DssStep name="1" title="Um" icon="looks_one">Passo 1.</DssStep>
            <DssStep name="2" title="Dois" icon="looks_two">Passo 2.</DssStep>
          </DssStepper>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="06" title="Brandabilidade" :count="BRANDS.length * 2"
      desc="A marca colore o dot do passo ativo. Duas vias: a prop brand no DssStepper e o [data-brand] herdado de um ancestral — as duas precisam dar o mesmo resultado.">
      <template v-for="b in BRANDS" :key="b">
        <h3 class="ts-brand-titulo">{{ brandLabel(b) }}</h3>
        <PgGrid class="pg-grid--full">
          <PgTile :code="`prop brand=&quot;${b}&quot;`" align="start">
            <DssStepper v-model="passoI" :brand="b" class="ts-largura">
              <DssStep name="1" title="Concluído" icon="check" done>Passo 1.</DssStep>
              <DssStep name="2" title="Ativo" icon="edit">Passo 2.</DssStep>
            </DssStepper>
          </PgTile>
          <PgTile :code="`[data-brand=&quot;${b}&quot;] ancestral`" align="start">
            <div :data-brand="b">
              <DssStepper v-model="passoI" class="ts-largura">
                <DssStep name="1" title="Concluído" icon="check" done>Passo 1.</DssStep>
                <DssStep name="2" title="Ativo" icon="edit">Passo 2.</DssStep>
              </DssStepper>
            </div>
          </PgTile>
        </PgGrid>
      </template>
    </PgSection>

    <!-- ── 07. Matriz ──────────────────────────────────────────────────── -->
    <PgSection id="matriz" index="07" title="Matriz estado × orientação" :count="2"
      desc="Cobertura combinatória para inspeção rápida: os quatro estados do passo em cada orientação.">
      <PgGrid class="pg-grid--full">
        <PgTile code="horizontal" align="start">
          <DssStepper v-model="passoJ" class="ts-largura">
            <DssStep name="1" title="Done" done icon="check">—</DssStep>
            <DssStep name="2" title="Ativo" icon="edit">—</DssStep>
            <DssStep name="3" title="Erro" error icon="warning">—</DssStep>
            <DssStep name="4" title="Disable" disable icon="lock">—</DssStep>
          </DssStepper>
        </PgTile>
        <PgTile code="vertical" align="start">
          <DssStepper v-model="passoJ" vertical class="ts-largura">
            <DssStep name="1" title="Done" done icon="check">—</DssStep>
            <DssStep name="2" title="Ativo" icon="edit">—</DssStep>
            <DssStep name="3" title="Erro" error icon="warning">—</DssStep>
            <DssStep name="4" title="Disable" disable icon="lock">—</DssStep>
          </DssStepper>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Exemplos ────────────────────────────────────────────────── -->
    <PgSection id="exemplos" index="08" title="Exemplos de uso" :count="1"
      desc="Renderiza o DssStepper.example.vue — fonte única, também usável na documentação.">
      <DssStepperExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import { ref } from 'vue'
import DssStepper from '@components/base/DssStepper/DssStepper.vue'
import DssStep from '@components/base/DssStep/DssStep.vue'
import DssStepperExample from '@components/base/DssStepper/DssStepper.example.vue'

// Template das páginas de teste. A página CONSOME o layout; não reimplementa
// casca, nav ou scroll-spy (premissa do DSS_DEFAULT_PREVIEW_WORKFLOW).
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica (vide DssStepper/types/stepper.types.ts e DssStep/types/step.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const BRANDS = ['hub', 'water', 'waste'] as const

const MOLDURAS = [
  { code: 'padrão (sombra)', flat: false, bordered: false },
  { code: 'flat',            flat: true,  bordered: false },
  { code: 'bordered',        flat: false, bordered: true },
]

const SECTIONS = [
  { id: 'orientacao', index: '01', title: 'Orientação' },
  { id: 'estados',    index: '02', title: 'Estados do passo' },
  { id: 'icones',     index: '03', title: 'Ícones por estado' },
  { id: 'headernav',  index: '04', title: 'Navegação por cabeçalho' },
  { id: 'moldura',    index: '05', title: 'Moldura' },
  { id: 'brand',      index: '06', title: 'Brandabilidade' },
  { id: 'matriz',     index: '07', title: 'Matriz' },
  { id: 'exemplos',   index: '08', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 4,              label: 'Estados' },
  { value: 2,              label: 'Orientações' },
  { value: BRANDS.length,  label: 'Brands' },
  { value: 4,              label: 'Ícones' },
]

// Um v-model por bloco: passos independentes não podem compartilhar estado,
// senão clicar num cabeçalho move todos os steppers da página.
const passoA = ref('1')
const passoB = ref('1')
const passoC = ref('2')
const passoD = ref('2')
const passoE = ref('2')
const passoF = ref('1')
const passoG = ref('1')
const passoH = ref('1')
const passoI = ref('2')
const passoJ = ref('2')

const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>

<style scoped>
/* CONTEÚDO da demonstração, não casca de página. O stepper é um bloco de
   largura total: solto num tile ele encolhe e os cabeçalhos se amontoam. */
.ts-largura {
  width: 100%;
}

.ts-brand-titulo {
  margin: var(--dss-spacing-4) 0 var(--dss-spacing-2);
  font-size: var(--dss-font-size-md);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
}

.ts-nota {
  margin: var(--dss-spacing-3) 0 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}
</style>
