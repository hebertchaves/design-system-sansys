<template>
  <PlaygroundLayout
    title="DssBanner — Playground"
    code="base/DssBanner"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ────────────────────────────────────────────────── -->
    <PgSection
      id="variantes" index="01" title="Variantes semânticas" :count="VARIANTES.length"
      desc="Cinco variantes. Cada uma resolve um ícone padrão — menos default, que é deliberadamente sem ícone para não poluir um aviso neutro. O que se mede aqui é contraste do texto sobre a superfície de cada variante: banner é conteúdo, tem de passar AA."
    >
      <PgGrid>
        <PgTile v-for="v in VARIANTES" :key="v.nome" :code="`variant=&quot;${v.nome}&quot;`" align="start">
          <DssBanner :variant="v.nome" class="bn-stage">{{ v.texto }}</DssBanner>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Ícone ────────────────────────────────────────────────────── -->
    <PgSection
      id="icone" index="02" title="Ícone — padrão, custom e slot" :count="4"
      desc="Três rotas para a área de ícone, em ordem de precedência: slot avatar > prop icon > ícone padrão da variante. O ícone é composto via DssIcon com decorative — nunca aria-hidden solto: o contrato de ícone (CCI §2.1) exige a prop, e o aria-hidden fazia o DssIcon advertir no console a cada renderização."
    >
      <PgGrid>
        <PgTile code="ícone padrão da variante" align="start">
          <DssBanner variant="warning" class="bn-stage">Tabela de tributos vence em 30 dias.</DssBanner>
        </PgTile>
        <PgTile code='prop icon="schedule"' align="start">
          <DssBanner variant="warning" icon="schedule" class="bn-stage">Resultado com mais de 24 h.</DssBanner>
        </PgTile>
        <PgTile code="slot #avatar (vence a prop)" align="start">
          <DssBanner variant="info" icon="info" class="bn-stage">
            <template #avatar><DssIcon name="water_drop" size="md" decorative /></template>
            Leitura sincronizada com o mobile.
          </DssBanner>
        </PgTile>
        <PgTile code='icon="" — sem área de ícone' align="start">
          <DssBanner variant="error" icon="" class="bn-stage">Sem ícone: o texto ocupa a largura toda.</DssBanner>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Densidade e cantos ───────────────────────────────────────── -->
    <PgSection
      id="densidade" index="03" title="Densidade e cantos" :count="4"
      desc="dense reduz o padding interno; rounded arredonda os cantos. Banner embutido num card costuma pedir dense; banner de página inteira costuma pedir a régua cheia."
    >
      <PgGrid>
        <PgTile code="padrão" align="start">
          <DssBanner variant="info" class="bn-stage">Banner com padding padrão.</DssBanner>
        </PgTile>
        <PgTile code="dense" align="start">
          <DssBanner variant="info" dense class="bn-stage">Banner denso, para dentro de card.</DssBanner>
        </PgTile>
        <PgTile code="rounded" align="start">
          <DssBanner variant="success" rounded class="bn-stage">Cantos arredondados.</DssBanner>
        </PgTile>
        <PgTile code="dense + rounded" align="start">
          <DssBanner variant="success" dense rounded class="bn-stage">As duas juntas.</DssBanner>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Ações ────────────────────────────────────────────────────── -->
    <PgSection
      id="acoes" index="04" title="Ações e dispensa" :count="4"
      desc="O slot actions recebe DssButton — nunca botão cru. inlineActions põe as ações na mesma linha do texto em vez de abaixo. dismissible acrescenta o botão de fechar, que emite dismiss e precisa de rótulo acessível próprio (dismissLabel)."
    >
      <PgGrid>
        <PgTile code="#actions (abaixo do texto)" align="start">
          <DssBanner variant="error" class="bn-stage">
            Ambiente não apto para emissão.
            <template #actions>
              <DssButton variant="outline" color="negative" size="sm" label="Executar novamente" />
            </template>
          </DssBanner>
        </PgTile>
        <PgTile code="inlineActions" align="start">
          <DssBanner variant="warning" inline-actions class="bn-stage">
            Verificação desatualizada.
            <template #actions>
              <DssButton variant="flat" color="warning" size="sm" label="Atualizar" />
            </template>
          </DssBanner>
        </PgTile>
        <PgTile code="dismissible" align="start">
          <DssBanner variant="info" dismissible dismiss-label="Dispensar aviso" class="bn-stage">
            Este aviso pode ser dispensado.
          </DssBanner>
        </PgTile>
        <PgTile code="dismissible + #actions" align="start">
          <DssBanner variant="info" dismissible dismiss-label="Dispensar" class="bn-stage">
            Dispensa e ação convivem.
            <template #actions>
              <DssButton variant="flat" color="primary" size="sm" label="Saiba mais" />
            </template>
          </DssBanner>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection
      id="brand" index="05" title="Brandabilidade" :count="3"
      desc="Banner de variante semântica NÃO brandeia: erro é vermelho em Hub, Water e Waste — a cor carrega significado, não identidade. O que a marca pode mudar é a cor das ações dentro do banner. Se a superfície do banner mudar de cor entre as marcas, é defeito."
    >
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="b" :code="`ancestral [data-brand=&quot;${b}&quot;]`" align="start">
          <div :data-brand="b" class="bn-stage">
            <DssBanner variant="error">
              Erro permanece vermelho.
              <template #actions>
                <DssButton variant="flat" color="primary" size="sm" label="Ação brandeada" />
              </template>
            </DssBanner>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="06" title="Exemplos de uso" :count="1"
      desc="Cenários reais, vindos do DssBanner.example.vue do próprio componente."
    >
      <DssBannerExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssBanner from '@components/base/DssBanner/DssBanner.vue'
import DssBannerExample from '@components/base/DssBanner/DssBanner.example.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssIcon from '@components/base/DssIcon/DssIcon.vue'

const BRANDS = ['hub', 'water', 'waste'] as const

const VARIANTES = [
  { nome: 'default', texto: 'Aviso neutro, sem ícone por decisão de design.' },
  { nome: 'info',    texto: 'Informação de apoio ao preenchimento.' },
  { nome: 'success', texto: 'Ambiente apto para emissão.' },
  { nome: 'warning', texto: 'Verificação desatualizada — execute novamente.' },
  { nome: 'error',   texto: 'Ambiente não apto para emissão.' },
] as const

const SECTIONS = [
  { id: 'variantes',  index: '01', title: 'Variantes semânticas' },
  { id: 'icone',      index: '02', title: 'Ícone — padrão, custom e slot' },
  { id: 'densidade',  index: '03', title: 'Densidade e cantos' },
  { id: 'acoes',      index: '04', title: 'Ações e dispensa' },
  { id: 'brand',      index: '05', title: 'Brandabilidade' },
  { id: 'exemplos',   index: '06', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 7,                 label: 'Props' },
  { value: VARIANTES.length,  label: 'Variantes' },
  { value: 3,                 label: 'Slots' },
  { value: 1,                 label: 'Evento' },
]
</script>

<style scoped>
/* Andaime: o banner ocupa a largura do pai; o tile precisa dar largura útil. */
.bn-stage {
  width: 100%;
  min-width: var(--dss-spacing-64);
}
</style>
