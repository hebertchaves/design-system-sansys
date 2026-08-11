<template>
  <PlaygroundLayout
    title="DssRadio — Playground"
    code="base/DssRadio"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="01" title="Estados" :count="4"
      desc="Radio é escolha exclusiva: não existe estado indeterminate. Selecionado x não selecionado, disabled e erro de validação.">
      <PgGrid>
        <PgTile code="não selecionado">
          <DssRadio v-model="m.stGroup" val="a" name="st" label="Não selecionado" />
        </PgTile>
        <PgTile code="selecionado">
          <DssRadio v-model="m.stGroup" val="b" name="st" label="Selecionado" />
        </PgTile>
        <PgTile code=":disable=&quot;true&quot;">
          <DssRadio v-model="m.stDisabled" val="x" name="st-dis" label="Desabilitado" disable />
        </PgTile>
        <PgTile code="error + error-message">
          <DssRadio v-model="m.stError" val="x" name="st-err" label="Com erro" error error-message="Seleção obrigatória" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Tamanhos ────────────────────────────────────────────────── -->
    <PgSection id="tamanhos" index="02" title="Tamanhos" :count="SIZES.length"
      desc="Prop size — xs, sm, md (default), lg, xl. União literal: px arbitrário é rejeitado por tipo. O touch target (≥48px) é preservado em todos via ::before.">
      <PgGrid>
        <PgTile v-for="s in SIZES" :key="s" :code="`size=&quot;${s}&quot;`">
          <DssRadio :size="s" :label="s.toUpperCase()" :val="s" v-model="m.sizeSel" :name="`size-${s}`" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Cores semânticas ────────────────────────────────────────── -->
    <PgSection id="cores" index="03" title="Cores Semânticas" :count="COLORS.length"
      desc="Prop color — 8 tokens semânticos. Selecionados para exibir a cor no anel e no ponto.">
      <PgGrid>
        <PgTile v-for="c in COLORS" :key="c" :code="`color=&quot;${c}&quot;`">
          <DssRadio :color="c" :label="capitalize(c)" :val="c" v-model="m[`color-${c}`]" :name="`color-${c}`" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. keepColor ───────────────────────────────────────────────── -->
    <PgSection id="keepcolor" index="04" title="keepColor (escape hatch)" :count="4"
      desc="Por padrão o stroke em repouso é cinza e a cor só aparece na seleção. Com keepColor o DESMARCADO também recebe a cor — compare as colunas no estado não selecionado.">
      <PgGrid>
        <PgTile code="padrão · não selecionado">
          <DssRadio v-model="m.kcOffA" val="outro" name="kc-a" label="Stroke cinza" />
        </PgTile>
        <PgTile code="keep-color · não selecionado">
          <DssRadio v-model="m.kcOffB" val="outro" name="kc-b" label="Stroke colorido" keep-color />
        </PgTile>
        <PgTile code="keep-color · selecionado">
          <DssRadio v-model="m.kcOn" val="on" name="kc-c" label="Selecionado" keep-color />
        </PgTile>
        <PgTile code="keep-color + error (erro vence)">
          <DssRadio v-model="m.kcErr" val="outro" name="kc-d" label="Erro tem prioridade" keep-color error />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. checkedIcon ─────────────────────────────────────────────── -->
    <PgSection id="icone" index="05" title="checkedIcon (glifo substitui o ponto)" :count="4"
      desc="Sem a prop, o indicador é o PONTO preenchido — convenção do radio. Informar checkedIcon troca o ponto pelo glifo; os dois nunca coexistem. Não há uncheckedIcon nem indeterminateIcon.">
      <PgGrid>
        <PgTile code="sem prop (ponto)">
          <DssRadio v-model="m.icPlain" val="on" name="ic-a" label="Ponto padrão" />
        </PgTile>
        <PgTile code="checked-icon=&quot;check&quot;">
          <DssRadio v-model="m.icCheck" val="on" name="ic-b" label="Glifo check" checked-icon="check" />
        </PgTile>
        <PgTile code="checked-icon=&quot;star&quot;">
          <DssRadio v-model="m.icStar" val="on" name="ic-c" label="Glifo star" checked-icon="star" />
        </PgTile>
        <PgTile code="checked-icon + size=&quot;xl&quot;">
          <DssRadio v-model="m.icXl" val="on" name="ic-d" label="Glifo em xl" checked-icon="star" size="xl" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Label & Posição ─────────────────────────────────────────── -->
    <PgSection id="label" index="06" title="Label &amp; Posição" :count="4"
      desc="label à direita (padrão), left-label à esquerda, sem label (só o controle, com aria-label) e slot default para conteúdo rico.">
      <PgGrid>
        <PgTile code="label (direita)">
          <DssRadio v-model="m.lblRight" val="on" name="lbl-a" label="Rótulo à direita" />
        </PgTile>
        <PgTile code="left-label">
          <DssRadio v-model="m.lblLeft" val="on" name="lbl-b" label="Rótulo à esquerda" left-label />
        </PgTile>
        <PgTile code="sem label (aria-label)">
          <DssRadio v-model="m.lblNone" val="on" name="lbl-c" aria-label="Sem rótulo visível" />
        </PgTile>
        <PgTile code="slot default">
          <DssRadio v-model="m.lblSlot" val="on" name="lbl-d">
            <strong>Plano Pro</strong> — inclui suporte
          </DssRadio>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Densidade ───────────────────────────────────────────────── -->
    <PgSection id="densidade" index="07" title="Densidade" :count="2"
      desc="dense reduz gap, altura e fonte, e remove o touch target expandido (::before) — usar apenas em contexto de alta densidade, ciente do trade-off de WCAG 2.5.5.">
      <PgGrid>
        <PgTile code="padrão">
          <DssRadio v-model="m.dnOff" val="on" name="dn-a" label="Densidade padrão" />
        </PgTile>
        <PgTile code=":dense=&quot;true&quot;">
          <DssRadio v-model="m.dnOn" val="on" name="dn-b" label="Modo dense" dense />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="08" title="Brandabilidade" :count="BRAND_KEYS.length"
      desc="Prop brand sobrescreve o accent. Reage também a [data-brand] global — use as pílulas do topo para comparar os dois caminhos.">
      <PgGrid>
        <PgTile v-for="b in BRAND_KEYS" :key="b" :code="`brand=&quot;${b}&quot;`">
          <DssRadio :brand="b" :label="brandLabel(b)" val="on" v-model="m[`brand-${b}`]" :name="`brand-${b}`" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Grupo exclusivo ─────────────────────────────────────────── -->
    <PgSection id="grupo" index="09" title="Grupo exclusivo (prop name)" :count="1"
      desc="O DssRadio NÃO gerencia lógica de grupo: a exclusividade vem do agrupamento nativo via prop name compartilhada + v-model comum. Clique para ver a seleção migrar.">
      <PgGrid>
        <!-- O stage do PgTile já empilha em coluna com gap — sem wrapper próprio. -->
        <PgTile :code="`v-model = &quot;${m.grupo}&quot;`">
          <DssRadio v-model="m.grupo" val="mensal" name="plano" label="Mensal" />
          <DssRadio v-model="m.grupo" val="anual" name="plano" label="Anual" />
          <DssRadio v-model="m.grupo" val="vitalicio" name="plano" label="Vitalício" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 10. Matriz Tamanho × Estado ─────────────────────────────────── -->
    <PgSection id="matriz" index="10" title="Matriz Tamanho × Estado" :count="SIZES.length * MATRIX_STATES.length"
      desc="Cobertura combinatória para inspeção visual rápida: cada tamanho em não selecionado, selecionado, disabled e erro.">
      <div v-for="s in SIZES" :key="s" class="pg-matrix-row">
        <div class="pg-matrix-row__label"><code>{{ s }}</code></div>
        <div class="pg-matrix-row__items">
          <DssRadio
            v-for="st in MATRIX_STATES"
            :key="s + st.key"
            :size="s"
            :label="st.label"
            :val="st.selected ? 'on' : 'off'"
            :disable="st.key === 'disabled'"
            :error="st.key === 'error'"
            :name="`mx-${s}-${st.key}`"
            v-model="m[`mx-${s}-${st.key}`]"
          />
        </div>
      </div>
    </PgSection>

    <!-- ── 11. Exemplos de uso (.example.vue como fonte) — última seção ─── -->
    <PgSection id="exemplos" index="11" title="Exemplos de uso" :count="1"
      desc="Composições reais do DssRadio.example.vue — fonte única, também usável na documentação.">
      <DssRadioExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssRadio from '@components/base/DssRadio/DssRadio.vue'
import DssRadioExample from '@components/base/DssRadio/DssRadio.example.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssRadio (vide types/radio.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const COLORS = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

// Radio não tem indeterminate — a matriz cobre erro no lugar.
const MATRIX_STATES = [
  { key: 'unselected', label: 'Off',      selected: false },
  { key: 'selected',   label: 'On',       selected: true  },
  { key: 'disabled',   label: 'Disabled', selected: true  },
  { key: 'error',      label: 'Erro',     selected: false },
] as const

const SECTIONS = [
  { id: 'estados',    index: '01', title: 'Estados' },
  { id: 'tamanhos',   index: '02', title: 'Tamanhos' },
  { id: 'cores',      index: '03', title: 'Cores Semânticas' },
  { id: 'keepcolor',  index: '04', title: 'keepColor' },
  { id: 'icone',      index: '05', title: 'checkedIcon' },
  { id: 'label',      index: '06', title: 'Label & Posição' },
  { id: 'densidade',  index: '07', title: 'Densidade' },
  { id: 'brand',      index: '08', title: 'Brandabilidade' },
  { id: 'grupo',      index: '09', title: 'Grupo exclusivo' },
  { id: 'matriz',     index: '10', title: 'Matriz Tam × Estado' },
  { id: 'exemplos',   index: '11', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: SIZES.length,      label: 'Tamanhos' },
  { value: COLORS.length,     label: 'Cores' },
  { value: BRAND_KEYS.length, label: 'Brands' },
]

// Estado dos v-model. Radio compara modelValue === val, então "selecionado" é
// semear a chave com o próprio val e "não selecionado" é semear com outra coisa.
const m = reactive<Record<string, string>>({
  stGroup: 'b',            // o tile "selecionado" (val="b") nasce marcado
  stDisabled: 'x',
  stError: 'outro',
  sizeSel: 'md',
  kcOffA: 'nada', kcOffB: 'nada', kcOn: 'on', kcErr: 'nada',
  icPlain: 'on', icCheck: 'on', icStar: 'on', icXl: 'on',
  lblRight: 'on', lblLeft: 'on', lblNone: 'on', lblSlot: 'on',
  dnOff: 'on', dnOn: 'on',
  grupo: 'anual',
})
// Semear as chaves geradas: selecionadas p/ exibir cor e brand.
COLORS.forEach(c => { m[`color-${c}`] = c })
BRAND_KEYS.forEach(b => { m[`brand-${b}`] = 'on' })
SIZES.forEach(s => MATRIX_STATES.forEach(st => {
  m[`mx-${s}-${st.key}`] = st.selected ? 'on' : 'off-nada'
}))

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>
