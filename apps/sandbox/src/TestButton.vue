<template>
  <PlaygroundLayout
    title="DssButton — Playground"
    code="base/DssButton"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ───────────────────────────────────────────────── -->
    <PgSection id="variantes" index="01" title="Variantes Visuais" :count="VARIANTS.length"
      desc="6 variantes (elevated, flat, outline, unelevated, push, glossy) controladas pela prop variant. Default: elevated.">
      <PgGrid>
        <PgTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`" align="start">
          <DssButton :variant="v" color="primary" :label="capitalize(v)" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Cores ───────────────────────────────────────────────────── -->
    <PgSection id="cores" index="02" title="Cores Semânticas" :count="COLORS.length"
      desc="Aplicação via prop color — tokens semânticos DSS, nunca hex. A cor vira classe utilitária (bg-*/text-*), não SCSS de componente.">
      <PgGrid>
        <PgTile v-for="c in COLORS" :key="c" :code="`color=&quot;${c}&quot;`" align="start">
          <DssButton :color="c" :label="capitalize(c)" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Tamanhos ────────────────────────────────────────────────── -->
    <PgSection id="tamanhos" index="03" title="Tamanhos" :count="SIZES.length"
      desc="5 tamanhos. Touch target ≥ 44px (WCAG 2.5.5) via --dss-touch-target-* — a altura visual pode ser menor que o alvo.">
      <PgGrid>
        <PgTile v-for="s in SIZES" :key="s" :code="`size=&quot;${s}&quot;`" align="start">
          <DssButton :size="s" :label="`Size ${s.toUpperCase()}`" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Ícones ──────────────────────────────────────────────────── -->
    <PgSection id="icones" index="04" title="Ícones" :count="5"
      desc="Props icon e iconRight renderizam DssIcon (primitivo único). Botão só-ícone exige aria-label — sem ele, não há nome acessível.">
      <PgGrid>
        <PgTile code='icon="favorite"' align="start">
          <DssButton icon="favorite" label="Curtir" />
        </PgTile>
        <PgTile code='icon-right="send"' align="start">
          <DssButton icon-right="send" label="Enviar" />
        </PgTile>
        <PgTile code="icon + icon-right" align="start">
          <DssButton icon="arrow_back" icon-right="arrow_forward" label="Navegar" />
        </PgTile>
        <PgTile code="só ícone + aria-label" align="start">
          <DssButton icon="star" aria-label="Favoritar" />
        </PgTile>
        <PgTile code="só ícone + negative" align="start">
          <DssButton icon="delete" color="negative" aria-label="Excluir" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="05" title="Estados" :count="4"
      desc="loading e disabled. O hover/focus não cabe em tile estático — inspecione interagindo; o anel de foco segue o brand ancestral.">
      <PgGrid>
        <PgTile code=':loading="true"' align="start">
          <DssButton :loading="true" label="Carregando" />
        </PgTile>
        <PgTile code=':disabled="true"' align="start">
          <DssButton :disabled="true" label="Desabilitado" />
        </PgTile>
        <PgTile code="loading + icon" align="start">
          <DssButton :loading="true" icon="cloud_upload" label="Enviando" />
        </PgTile>
        <PgTile code="disabled + icon" align="start">
          <DssButton :disabled="true" icon="lock" label="Bloqueado" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Progresso ───────────────────────────────────────────────── -->
    <PgSection id="progresso" index="06" title="Loading com Barra de Progresso" :count="5"
      desc="percentage (0–100) renderiza a barra interna; só tem efeito junto de loading. darkPercentage escurece a barra para fundos claros.">
      <PgGrid>
        <PgTile code=':percentage="25"' align="start">
          <DssButton :loading="true" :percentage="25" label="25%" />
        </PgTile>
        <PgTile code=':percentage="50"' align="start">
          <DssButton :loading="true" :percentage="50" color="info" label="50%" />
        </PgTile>
        <PgTile code=':percentage="75"' align="start">
          <DssButton :loading="true" :percentage="75" color="positive" label="75%" />
        </PgTile>
        <PgTile code=':percentage="100"' align="start">
          <DssButton :loading="true" :percentage="100" color="positive" label="100%" />
        </PgTile>
        <PgTile code="dark-percentage" align="start">
          <DssButton :loading="true" :percentage="65" dark-percentage label="65% dark" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Align ───────────────────────────────────────────────────── -->
    <PgSection id="align" index="07" title="Layout — Align" :count="ALIGNS.length"
      desc="Alinhamento horizontal do conteúdo interno. Só é observável com largura fixa maior que o conteúdo — por isso os tiles fixam 240px.">
      <PgGrid>
        <PgTile v-for="a in ALIGNS" :key="a" :code="`align=&quot;${a}&quot;`" align="start">
          <DssButton :align="a" icon="save" icon-right="cloud" :label="capitalize(a)" class="tb-w240" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Stack / Stretch / No-wrap ───────────────────────────────── -->
    <PgSection id="layout" index="08" title="Layout — Stack, Stretch & No-Wrap" :count="5"
      desc="Modificadores estruturais. stretch ocupa a largura do container — por isso esses dois tiles usam o alinhamento esticado, e não start.">
      <PgGrid>
        <PgTile code="stack" align="start">
          <DssButton stack icon="cloud_upload" label="Upload" />
        </PgTile>
        <PgTile code="stack + color" align="start">
          <DssButton stack icon="download" label="Download" color="info" />
        </PgTile>
        <PgTile code="no-wrap (ellipsis)" align="start">
          <DssButton no-wrap label="Texto longo demais para caber" class="tb-w160" />
        </PgTile>
        <PgTile code="stretch (full-width)">
          <DssButton stretch label="Botão full-width" />
        </PgTile>
        <PgTile code="stretch + align + ícones">
          <DssButton stretch align="between" icon="save" icon-right="cloud" label="Salvar na nuvem" color="primary" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Formas ──────────────────────────────────────────────────── -->
    <PgSection id="formas" index="09" title="Formas & Modificadores" :count="6"
      desc="round, square, dense, no-caps e padding custom. padding aceita valor livre — é a única porta de escape dimensional da API.">
      <PgGrid>
        <PgTile code="round" align="start">
          <DssButton round label="Round" />
        </PgTile>
        <PgTile code="square" align="start">
          <DssButton square label="Square" />
        </PgTile>
        <PgTile code="round + só ícone" align="start">
          <DssButton round icon="favorite" aria-label="Curtir" />
        </PgTile>
        <PgTile code="dense" align="start">
          <DssButton dense label="Compact" />
        </PgTile>
        <PgTile code="no-caps" align="start">
          <DssButton no-caps label="Texto Normal" />
        </PgTile>
        <PgTile code='padding="20px 40px"' align="start">
          <DssButton padding="20px 40px" label="Padding custom" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 10. Interação ───────────────────────────────────────────────── -->
    <PgSection id="interacao" index="10" title="Interação & Acessibilidade" :count="4"
      desc="ripple e tabindex. tabindex=-1 tira o botão da ordem de tabulação sem desabilitá-lo — use com cuidado.">
      <PgGrid>
        <PgTile code=':ripple="true"' align="start">
          <DssButton :ripple="true" label="Com ripple" />
        </PgTile>
        <PgTile code="ripple default (false)" align="start">
          <DssButton label="Sem ripple" />
        </PgTile>
        <PgTile code=':tabindex="1"' align="start">
          <DssButton :tabindex="1" label="Tab 1" />
        </PgTile>
        <PgTile code=':tabindex="-1"' align="start">
          <DssButton :tabindex="-1" label="Não focável" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 11. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="11" title="Brandabilidade" :count="BRAND_KEYS.length * VARIANTS.length"
      desc="Prop brand aplica o contexto Sansys. Reage também a [data-brand] global — compare com as pílulas do topo.">
      <div v-for="brand in BRAND_KEYS" :key="brand" class="pg-brand-block">
        <div class="pg-brand-block__head">
          <span :class="['pg-brand-block__dot', `is-${brand}`]" aria-hidden="true"></span>
          <h3 class="pg-brand-block__title">{{ brandLabel(brand) }}</h3>
          <code class="pg-brand-block__code">brand="{{ brand }}"</code>
        </div>
        <PgGrid>
          <PgTile v-for="v in VARIANTS" :key="brand + v" :code="`variant=&quot;${v}&quot;`" align="start">
            <DssButton :brand="brand" :variant="v" :label="capitalize(v)" />
          </PgTile>
        </PgGrid>
      </div>
    </PgSection>

    <!-- ── 12. Composição com DssBadge ─────────────────────────────────── -->
    <PgSection id="badges" index="12" title="Composição com DssBadge" :count="3"
      desc="O slot default do botão aceita um DssBadge floating. É composição de primitivos DSS — nenhum dos dois é reimplementado aqui.">
      <PgGrid>
        <PgTile code="badge floating primary" align="start">
          <DssButton icon="mail" label="Email">
            <DssBadge floating color="primary" label="5" />
          </DssButton>
        </PgTile>
        <PgTile code="outline + badge negative" align="start">
          <DssButton icon="notifications" variant="outline" label="Alertas">
            <DssBadge floating color="negative" label="12" />
          </DssButton>
        </PgTile>
        <PgTile code="flat + badge accent" align="start">
          <DssButton icon="shopping_cart" variant="flat" color="accent" label="Carrinho">
            <DssBadge floating color="accent" label="3" />
          </DssButton>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 13. Matriz Variante × Cor ───────────────────────────────────── -->
    <PgSection id="matriz" index="13" title="Matriz Variante × Cor" :count="VARIANTS.length * COLORS.length"
      desc="Cobertura combinatória completa (6 × 8) para inspeção visual rápida — é onde uma cor que não brandeia aparece de imediato.">
      <div v-for="v in VARIANTS" :key="v" class="pg-matrix-row">
        <div class="pg-matrix-row__label"><code>{{ v }}</code></div>
        <div class="pg-matrix-row__items">
          <DssButton v-for="c in COLORS" :key="v + c" :variant="v" :color="c" size="sm" :label="c" />
        </div>
      </div>
    </PgSection>

    <!-- ── 14. Exemplos (.example.vue como fonte) — última seção ────────── -->
    <PgSection id="exemplos" index="14" title="Exemplos de uso" :count="1"
      desc="Renderiza o DssButton.example.vue — fonte única, também usável na documentação. ATENÇÃO: hoje esse arquivo é um CATÁLOGO (repete cores, tamanhos, variantes, estados e brand), não composições reais como o checklist pede; sobrepõe as seções 01–11. Registrado no DEBITO_ABERTO.">
      <DssButtonExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssBadge from '@components/base/DssBadge/DssBadge.vue'
import DssButtonExample from '@components/base/DssButton/DssButton.example.vue'

// Template reutilizável das páginas de teste.
//
// set/2026: esta página era a PRIMEIRA do sandbox e vinha de antes do template —
// carregava casca própria (hero, nav, scroll-spy, toggles) e reimplementava o
// PgSection/PgTile/PgGrid em render functions locais (`SectionHead`, `DemoTile`),
// mais ~400 linhas de CSS `.tb-*`. Página de teste CONSOME, não implementa: tudo
// isso saiu e virou consumo do template. O único CSS local que sobrou são duas
// larguras de demonstração, que são conteúdo do exemplo, não casca.
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssButton (vide types/button.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['elevated', 'flat', 'outline', 'unelevated', 'push', 'glossy'] as const
const COLORS = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const ALIGNS = ['left', 'center', 'right', 'between', 'around', 'evenly'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

const SECTIONS = [
  { id: 'variantes', index: '01', title: 'Variantes' },
  { id: 'cores',     index: '02', title: 'Cores' },
  { id: 'tamanhos',  index: '03', title: 'Tamanhos' },
  { id: 'icones',    index: '04', title: 'Ícones' },
  { id: 'estados',   index: '05', title: 'Estados' },
  { id: 'progresso', index: '06', title: 'Progresso' },
  { id: 'align',     index: '07', title: 'Align' },
  { id: 'layout',    index: '08', title: 'Layout' },
  { id: 'formas',    index: '09', title: 'Formas' },
  { id: 'interacao', index: '10', title: 'Interação' },
  { id: 'brand',     index: '11', title: 'Brandabilidade' },
  { id: 'badges',    index: '12', title: 'Com DssBadge' },
  { id: 'matriz',    index: '13', title: 'Matriz V × C' },
  { id: 'exemplos',  index: '14', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: VARIANTS.length, label: 'Variantes' },
  { value: COLORS.length,   label: 'Cores' },
  { value: SIZES.length,    label: 'Tamanhos' },
]

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>

<style scoped>
/* Larguras de DEMONSTRAÇÃO — não são casca de página.
   `align` e `no-wrap` só são observáveis com largura fixa: sem restringir, o
   botão encolhe até o conteúdo e os dois viram no-op visual. */
.tb-w240 { width: 240px; }
.tb-w160 { max-width: 160px; }
</style>
