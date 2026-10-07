<template>
  <PlaygroundLayout
    title="DssBadge — Playground"
    code="base/DssBadge"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Cor semântica ────────────────────────────────────────────── -->
    <PgSection
      id="cores" index="01" title="Cor semântica" :count="CORES.length"
      desc="Oito cores. O badge é texto pequeno sobre fundo preenchido — o par mais frágil de contraste do sistema. O que se mede aqui é AA sobre cada fundo, nos dois temas; warning é historicamente o que falha."
    >
      <PgGrid>
        <PgTile v-for="c in CORES" :key="c" :code="`color=&quot;${c}&quot;`" align="center">
          <DssBadge :color="c" label="12" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Preenchido, contorno, transparente ───────────────────────── -->
    <PgSection
      id="variantes" index="02" title="Preenchido, contorno e transparente" :count="3"
      desc="outline troca preenchimento por borda — e compensa a borda no padding para o badge não crescer 2px. Essa compensação estava em px cru e foi tokenizada nesta onda (Constituição #1). transparent remove o fundo, deixando só o texto colorido."
    >
      <PgGrid>
        <PgTile code="preenchido (padrão)" align="center">
          <DssBadge color="primary" label="12" />
        </PgTile>
        <PgTile code="outline" align="center">
          <DssBadge color="primary" outline label="12" />
        </PgTile>
        <PgTile code="transparent" align="center">
          <DssBadge color="primary" transparent label="12" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Forma e conteúdo ─────────────────────────────────────────── -->
    <PgSection
      id="forma" index="03" title="Forma e conteúdo" :count="5"
      desc="rounded deixa o badge em cápsula; multiLine permite quebra. A largura mínima é o menor alvo compacto, para que um badge de um dígito não vire um retângulo estreito — compare 1 e 999."
    >
      <PgGrid>
        <PgTile code="1 dígito" align="center"><DssBadge color="negative" label="1" /></PgTile>
        <PgTile code="3 dígitos" align="center"><DssBadge color="negative" label="999" /></PgTile>
        <PgTile code="texto" align="center"><DssBadge color="info" label="Novo" /></PgTile>
        <PgTile code="rounded" align="center"><DssBadge color="info" rounded label="Novo" /></PgTile>
        <PgTile code="multiLine" align="center">
          <DssBadge color="warning" multi-line label="Texto longo que quebra em duas linhas" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Flutuante ────────────────────────────────────────────────── -->
    <PgSection
      id="floating" index="04" title="Flutuante sobre o host" :count="4"
      desc="floating posiciona o badge no canto do elemento pai — o deslocamento era -8px cru e agora sai da escala de espaçamento. align move a âncora vertical. O host precisa de position: relative; sem isso o badge escapa para o ancestral posicionado mais próximo."
    >
      <PgGrid>
        <PgTile v-for="a in ALINHAMENTOS" :key="a.code" :code="a.code" align="center">
          <span class="bd-host">
            <DssButton variant="flat" round size="sm" icon="notifications" aria-label="Notificações" />
            <DssBadge floating color="negative" :align="a.valor" label="3" />
          </span>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection
      id="brand" index="05" title="Brandabilidade" :count="6"
      desc="A prop brand e o [data-brand] ancestral precisam concordar quando a cor é a de ação. Cor semântica não brandeia: um badge negative é vermelho nas três marcas, porque a cor carrega significado."
    >
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="`p-${b}`" :code="`prop brand=&quot;${b}&quot;`" align="center">
          <DssBadge color="primary" :brand="b" label="12" />
        </PgTile>
        <PgTile v-for="b in BRANDS" :key="`a-${b}`" :code="`ancestral [data-brand=&quot;${b}&quot;]`" align="center">
          <div :data-brand="b">
            <DssBadge color="primary" label="12" />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="06" title="Exemplos de uso" :count="1"
      desc="Cenários reais, vindos do DssBadge.example.vue do próprio componente."
    >
      <DssBadgeExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssBadge from '@components/base/DssBadge/DssBadge.vue'
import DssBadgeExample from '@components/base/DssBadge/DssBadge.example.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

const BRANDS = ['hub', 'water', 'waste'] as const
const CORES = [
  'primary', 'secondary', 'tertiary', 'accent',
  'positive', 'negative', 'warning', 'info',
] as const

const ALINHAMENTOS = [
  { code: 'floating (padrão)', valor: null },
  { code: 'align="top"',       valor: 'top' },
  { code: 'align="middle"',    valor: 'middle' },
  { code: 'align="bottom"',    valor: 'bottom' },
]

const SECTIONS = [
  { id: 'cores',     index: '01', title: 'Cor semântica' },
  { id: 'variantes', index: '02', title: 'Preenchido, contorno e transparente' },
  { id: 'forma',     index: '03', title: 'Forma e conteúdo' },
  { id: 'floating',  index: '04', title: 'Flutuante sobre o host' },
  { id: 'brand',     index: '05', title: 'Brandabilidade' },
  { id: 'exemplos',  index: '06', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 10,            label: 'Props' },
  { value: CORES.length,  label: 'Cores' },
  { value: BRANDS.length, label: 'Brands' },
  { value: 1,             label: 'Slot' },
]
</script>

<style scoped>
/* O badge flutuante ancora no host posicionado — sem isto ele escapa. */
.bd-host {
  position: relative;
  display: inline-flex;
}
</style>
