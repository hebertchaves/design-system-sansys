<template>
  <PlaygroundLayout
    title="DssToggle — Playground"
    code="base/DssToggle"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="01" title="Estados" :count="5"
      desc="Toggle é binário puro (role=switch): não existe indeterminate. Desligado, ligado, disabled em cada posição e erro de validação.">
      <PgGrid>
        <PgTile code="off (false)">
          <DssToggle v-model="m.stOff" label="Desligado" />
        </PgTile>
        <PgTile code="on (true)">
          <DssToggle v-model="m.stOn" label="Ligado" />
        </PgTile>
        <PgTile code=":disable=&quot;true&quot; · off">
          <DssToggle v-model="m.stDisOff" label="Disabled off" disable />
        </PgTile>
        <PgTile code=":disable=&quot;true&quot; · on">
          <DssToggle v-model="m.stDisOn" label="Disabled on" disable />
        </PgTile>
        <PgTile code="error + error-message">
          <DssToggle v-model="m.stError" label="Com erro" error error-message="Confirmação obrigatória" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Tamanhos ────────────────────────────────────────────────── -->
    <PgSection id="tamanhos" index="02" title="Tamanhos" :count="SIZES.length"
      desc="Prop size — xs, sm, md (default), lg, xl. União literal: px arbitrário é rejeitado por tipo. Em xl o track usa 48px (a escala de spacing não tem 50px, que manteria a proporção exata da família).">
      <PgGrid>
        <PgTile v-for="s in SIZES" :key="s" :code="`size=&quot;${s}&quot;`">
          <DssToggle :size="s" :label="s.toUpperCase()" v-model="m[`size-${s}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Cores semânticas ────────────────────────────────────────── -->
    <PgSection id="cores" index="03" title="Cores Semânticas" :count="COLORS.length"
      desc="Prop color — união literal com as 8 cores semânticas DSS; cor fora dela é rejeitada por tipo. Ligados para exibir o preenchimento do track.">
      <PgGrid>
        <PgTile v-for="c in COLORS" :key="c" :code="`color=&quot;${c}&quot;`">
          <DssToggle :color="c" :label="capitalize(c)" v-model="m[`color-${c}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. keepColor ───────────────────────────────────────────────── -->
    <PgSection id="keepcolor" index="04" title="keepColor (escape hatch)" :count="4"
      desc="No toggle o keepColor colore o trilho no estado desligado mantendo a translucidez baixa (40%) e o thumb branco. No ligado o trilho vai a 55% e o thumb fica sólido na cor — é o par translucidez × solidez que distingue os dois estados, não o matiz sozinho.">
      <PgGrid>
        <PgTile code="padrão · desligado">
          <DssToggle v-model="m.kcOffA" label="Track cinza" />
        </PgTile>
        <PgTile code="keep-color · desligado">
          <DssToggle v-model="m.kcOffB" label="Borda colorida, fundo muted" keep-color />
        </PgTile>
        <PgTile code="keep-color · ligado">
          <DssToggle v-model="m.kcOn" label="Ligado (trilho 55% + thumb sólido)" keep-color />
        </PgTile>
        <PgTile code="keep-color + error (erro vence)">
          <DssToggle v-model="m.kcErr" label="Erro tem prioridade" keep-color error />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. checkedIcon ─────────────────────────────────────────────── -->
    <PgSection id="icone" index="05" title="checkedIcon (glifo no thumb)" :count="4"
      desc="Sem a prop, o thumb é liso. Informar checkedIcon coloca o glifo DENTRO do thumb quando ligado; desligado segue sem glifo. Não há uncheckedIcon nem indeterminateIcon.">
      <PgGrid>
        <PgTile code="sem prop (thumb liso)">
          <DssToggle v-model="m.icPlain" label="Thumb liso" />
        </PgTile>
        <PgTile code="checked-icon=&quot;check&quot;">
          <DssToggle v-model="m.icCheck" label="Glifo check" checked-icon="check" />
        </PgTile>
        <PgTile code="checked-icon · desligado">
          <DssToggle v-model="m.icOff" label="Desligado não exibe glifo" checked-icon="check" />
        </PgTile>
        <PgTile code="checked-icon + size=&quot;xl&quot;">
          <DssToggle v-model="m.icXl" label="Glifo em xl" checked-icon="bolt" size="xl" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Label & Posição ─────────────────────────────────────────── -->
    <PgSection id="label" index="06" title="Label &amp; Posição" :count="4"
      desc="label à direita (padrão), left-label à esquerda, sem label (só o controle, com aria-label) e slot default para conteúdo rico.">
      <PgGrid>
        <PgTile code="label (direita)">
          <DssToggle v-model="m.lblRight" label="Rótulo à direita" />
        </PgTile>
        <PgTile code="left-label">
          <DssToggle v-model="m.lblLeft" label="Rótulo à esquerda" left-label />
        </PgTile>
        <PgTile code="sem label (aria-label)">
          <DssToggle v-model="m.lblNone" aria-label="Sem rótulo visível" />
        </PgTile>
        <PgTile code="slot default">
          <DssToggle v-model="m.lblSlot">
            <strong>Notificações</strong> — por e-mail
          </DssToggle>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Densidade ───────────────────────────────────────────────── -->
    <PgSection id="densidade" index="07" title="Densidade" :count="2"
      desc="dense reduz gap, altura e fonte, e remove o touch target expandido (::before) — usar apenas em contexto de alta densidade, ciente do trade-off de WCAG 2.5.5.">
      <PgGrid>
        <PgTile code="padrão">
          <DssToggle v-model="m.dnOff" label="Densidade padrão" />
        </PgTile>
        <PgTile code=":dense=&quot;true&quot;">
          <DssToggle v-model="m.dnOn" label="Modo dense" dense />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="08" title="Brandabilidade" :count="BRAND_KEYS.length"
      desc="Prop brand sobrescreve o accent do track ligado. Reage também a [data-brand] global — use as pílulas do topo para comparar os dois caminhos.">
      <PgGrid>
        <PgTile v-for="b in BRAND_KEYS" :key="b" :code="`brand=&quot;${b}&quot;`">
          <DssToggle :brand="b" :label="brandLabel(b)" v-model="m[`brand-${b}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Array mode (grupo) ──────────────────────────────────────── -->
    <PgSection id="grupo" index="09" title="Array mode (grupo)" :count="1"
      desc="Com v-model apontando para um array e a prop val, cada toggle adiciona/remove seu valor — permite um grupo de opções independentes sobre um único modelo.">
      <PgGrid>
        <PgTile :code="`v-model = [${m.features.join(', ')}]`">
          <DssToggle v-model="m.features" val="wifi" label="Wi-Fi" />
          <DssToggle v-model="m.features" val="bluetooth" label="Bluetooth" />
          <DssToggle v-model="m.features" val="gps" label="GPS" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 10. Matriz Tamanho × Estado ─────────────────────────────────── -->
    <PgSection id="matriz" index="10" title="Matriz Tamanho × Estado" :count="SIZES.length * MATRIX_STATES.length"
      desc="Cobertura combinatória para inspeção visual rápida: cada tamanho em desligado, ligado, disabled e erro.">
      <div v-for="s in SIZES" :key="s" class="pg-matrix-row">
        <div class="pg-matrix-row__label"><code>{{ s }}</code></div>
        <div class="pg-matrix-row__items">
          <DssToggle
            v-for="st in MATRIX_STATES"
            :key="s + st.key"
            :size="s"
            :label="st.label"
            :disable="st.key === 'disabled'"
            :error="st.key === 'error'"
            v-model="m[`mx-${s}-${st.key}`]"
          />
        </div>
      </div>
    </PgSection>

    <!-- ── 11. Exemplos de uso (.example.vue como fonte) — última seção ─── -->
    <PgSection id="exemplos" index="11" title="Exemplos de uso" :count="1"
      desc="Composições reais do DssToggle.example.vue — fonte única, também usável na documentação.">
      <DssToggleExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssToggle from '@components/base/DssToggle/DssToggle.vue'
import DssToggleExample from '@components/base/DssToggle/DssToggle.example.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssToggle (vide types/toggle.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const COLORS = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

// Toggle não tem indeterminate — a matriz cobre erro no lugar.
const MATRIX_STATES = [
  { key: 'off',      label: 'Off',      value: false },
  { key: 'on',       label: 'On',       value: true  },
  { key: 'disabled', label: 'Disabled', value: true  },
  { key: 'error',    label: 'Erro',     value: false },
] as const

const SECTIONS = [
  { id: 'estados',   index: '01', title: 'Estados' },
  { id: 'tamanhos',  index: '02', title: 'Tamanhos' },
  { id: 'cores',     index: '03', title: 'Cores Semânticas' },
  { id: 'keepcolor', index: '04', title: 'keepColor' },
  { id: 'icone',     index: '05', title: 'checkedIcon' },
  { id: 'label',     index: '06', title: 'Label & Posição' },
  { id: 'densidade', index: '07', title: 'Densidade' },
  { id: 'brand',     index: '08', title: 'Brandabilidade' },
  { id: 'grupo',     index: '09', title: 'Array mode' },
  { id: 'matriz',    index: '10', title: 'Matriz Tam × Estado' },
  { id: 'exemplos',  index: '11', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: SIZES.length,      label: 'Tamanhos' },
  { value: COLORS.length,     label: 'Cores' },
  { value: BRAND_KEYS.length, label: 'Brands' },
]

// Estado dos v-model — boolean, exceto `features` (array mode).
const m = reactive<Record<string, any>>({
  stOff: false, stOn: true, stDisOff: false, stDisOn: true, stError: false,
  kcOffA: false, kcOffB: false, kcOn: true, kcErr: false,
  icPlain: true, icCheck: true, icOff: false, icXl: true,
  lblRight: true, lblLeft: true, lblNone: true, lblSlot: true,
  dnOff: true, dnOn: true,
  features: ['wifi'],
})
// Semear as chaves geradas: ligadas p/ exibir cor e brand no track.
COLORS.forEach(c => { m[`color-${c}`] = true })
BRAND_KEYS.forEach(b => { m[`brand-${b}`] = true })
SIZES.forEach(s => MATRIX_STATES.forEach(st => { m[`mx-${s}-${st.key}`] = st.value }))

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>
