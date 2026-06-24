<template>
  <PlaygroundLayout
    title="DssTextarea — Playground"
    code="base/DssTextarea"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ───────────────────────────────────────────────── -->
    <PgSection id="variantes" index="01" title="Variantes Visuais" :count="VARIANTS.length"
      desc="4 variantes (outlined, filled, standout, borderless) controladas pela prop variant. Default: outlined. QField-based — verifique LIGHT e DARK.">
      <PgGrid>
        <PgTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`">
          <DssTextarea :variant="v" :label="capitalize(v)" v-model="m[`var-${v}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Densidade ───────────────────────────────────────────────── -->
    <PgSection id="densidade" index="02" title="Densidade" :count="2"
      desc="Prop dense reduz a altura mínima do controle e os espaçamentos internos.">
      <PgGrid>
        <PgTile code="default">
          <DssTextarea label="Confortável" v-model="m.denseOff" />
        </PgTile>
        <PgTile code="dense">
          <DssTextarea dense label="Compacto" v-model="m.denseOn" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Label & Placeholder ─────────────────────────────────────── -->
    <PgSection id="label" index="03" title="Label & Placeholder" :count="3"
      desc="Floating label (padrão), stack-label fixo no topo e placeholder nativo do textarea.">
      <PgGrid>
        <PgTile code="label (floating)">
          <DssTextarea label="Descrição" v-model="m.lblFloat" />
        </PgTile>
        <PgTile code="stack-label">
          <DssTextarea label="Observações" stack-label placeholder="Digite suas observações" v-model="m.lblStack" />
        </PgTile>
        <PgTile code="placeholder only">
          <DssTextarea placeholder="Sem label, só placeholder" v-model="m.lblPh" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Hint & Mensagens ────────────────────────────────────────── -->
    <PgSection id="hint" index="04" title="Hint & Mensagens" :count="2"
      desc="hint (texto de ajuda) e required (aria-required + asterisco). A área inferior é reservada para mensagens.">
      <PgGrid>
        <PgTile code="hint">
          <DssTextarea label="Comentário" hint="Máx. 500 caracteres" v-model="m.hint1" />
        </PgTile>
        <PgTile code="required">
          <DssTextarea label="Campo obrigatório" required hint="Preenchimento obrigatório" v-model="m.hint2" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="05" title="Estados" :count="5"
      desc="error (+ error-message), disabled, readonly, loading e o estado base focável. A área inferior é reservada para evitar layout-shift.">
      <PgGrid>
        <PgTile code=":error=&quot;true&quot;">
          <DssTextarea label="Descrição" :error="true" error-message="Campo inválido" v-model="m.stError" />
        </PgTile>
        <PgTile code=":disabled=&quot;true&quot;">
          <DssTextarea label="Desabilitado" disabled v-model="m.stDisabled" />
        </PgTile>
        <PgTile code=":readonly=&quot;true&quot;">
          <DssTextarea label="Somente leitura" readonly v-model="m.stReadonly" />
        </PgTile>
        <PgTile code=":loading=&quot;true&quot;">
          <DssTextarea label="Carregando…" loading v-model="m.stLoading" />
        </PgTile>
        <PgTile code="base (focável)">
          <DssTextarea label="Estado base" v-model="m.stBase" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Clearable ───────────────────────────────────────────────── -->
    <PgSection id="clearable" index="06" title="Clearable" :count="2"
      desc="Prop clearable exibe o botão × quando há conteúdo, permitindo voltar ao estado vazio. Emite o evento clear.">
      <PgGrid>
        <PgTile code="clearable (com valor)">
          <DssTextarea label="Limpável" clearable v-model="m.clear1" />
        </PgTile>
        <PgTile code="clearable + filled">
          <DssTextarea variant="filled" label="Anotação" clearable v-model="m.clear2" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Autogrow & Altura ───────────────────────────────────────── -->
    <PgSection id="autogrow" index="07" title="Autogrow & Altura" :count="3"
      desc="autogrow cresce conforme o conteúdo; rows define a altura inicial; max-height limita o crescimento (scroll interno).">
      <PgGrid>
        <PgTile code="rows=&quot;5&quot;">
          <DssTextarea label="5 linhas" :rows="5" v-model="m.rows5" />
        </PgTile>
        <PgTile code="autogrow">
          <DssTextarea label="Cresce com o texto" autogrow v-model="m.autogrow" />
        </PgTile>
        <PgTile code="autogrow + max-height">
          <DssTextarea label="Cresce até 160px" autogrow max-height="160px" v-model="m.autogrowMax" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Slots ───────────────────────────────────────────────────── -->
    <PgSection id="slots" index="08" title="Slots" :count="SLOTS.length"
      desc="prepend/append (dentro do campo), before/after (fora) e os slots de conteúdo label, hint e error (sobrescrevem as props correspondentes).">
      <PgGrid>
        <PgTile code="#prepend (ícone)">
          <DssTextarea label="Mensagem" v-model="m.slotPrepend">
            <template #prepend><span class="material-icons pg-slot-icon">edit</span></template>
          </DssTextarea>
        </PgTile>
        <PgTile code="#append (ícone)">
          <DssTextarea label="Nota" v-model="m.slotAppend">
            <template #append><span class="material-icons pg-slot-icon">notes</span></template>
          </DssTextarea>
        </PgTile>
        <PgTile code="#before (ícone externo)">
          <DssTextarea label="Comentário" v-model="m.slotBefore">
            <template #before><span class="material-icons pg-slot-icon">comment</span></template>
          </DssTextarea>
        </PgTile>
        <PgTile code="#after (slot externo)">
          <DssTextarea label="Mensagem" v-model="m.slotAfter">
            <template #after><span class="material-icons pg-slot-icon">send</span></template>
          </DssTextarea>
        </PgTile>
        <PgTile code="#label (custom)">
          <DssTextarea v-model="m.slotLabel">
            <template #label><span class="pg-slot-label">Descrição <strong>*</strong></span></template>
          </DssTextarea>
        </PgTile>
        <PgTile code="#hint (custom)">
          <DssTextarea label="Bio" v-model="m.slotHint">
            <template #hint><span>Máx. <strong>280</strong> caracteres</span></template>
          </DssTextarea>
        </PgTile>
        <PgTile code="#error (custom)">
          <DssTextarea label="Comentário" :error="true" v-model="m.slotError">
            <template #error><span>Conteúdo <strong>inválido</strong></span></template>
          </DssTextarea>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="09" title="Brandabilidade" :count="BRAND_KEYS.length * 2"
      desc="Prop brand sobrescreve o accent de foco. Reage também a [data-brand] global (use as pílulas do topo).">
      <div v-for="brand in BRAND_KEYS" :key="brand" class="pg-brand-block">
        <div class="pg-brand-block__head">
          <span :class="['pg-brand-block__dot', `is-${brand}`]" aria-hidden="true"></span>
          <h3 class="pg-brand-block__title">{{ brandLabel(brand) }}</h3>
          <code class="pg-brand-block__code">brand="{{ brand }}"</code>
        </div>
        <PgGrid>
          <PgTile code="outlined + focus accent">
            <DssTextarea :brand="brand" variant="outlined" :label="`${capitalize(brand)} textarea`"
              hint="Foque para ver o accent" v-model="m[`brand-${brand}-o`]" />
          </PgTile>
          <PgTile code="filled + focus accent">
            <DssTextarea :brand="brand" variant="filled" :label="`${capitalize(brand)} textarea`"
              hint="Foque para ver o accent" v-model="m[`brand-${brand}-f`]" />
          </PgTile>
        </PgGrid>
      </div>
    </PgSection>

    <!-- ── 10. Matriz Variante × Estado ────────────────────────────────── -->
    <PgSection id="matriz" index="10" title="Matriz Variante × Estado" :count="VARIANTS.length * MATRIX_STATES.length"
      desc="Cobertura combinatória para inspeção visual rápida: cada variante em base, erro, desabilitado e readonly. Calibre LIGHT e DARK.">
      <div v-for="v in VARIANTS" :key="v" class="pg-matrix-row">
        <div class="pg-matrix-row__label"><code>{{ v }}</code></div>
        <div class="pg-matrix-row__items">
          <DssTextarea
            v-for="st in MATRIX_STATES"
            :key="v + st.key"
            :variant="v"
            :label="st.label"
            :error="st.key === 'error'"
            :error-message="st.key === 'error' ? 'Inválido' : undefined"
            :disabled="st.key === 'disabled'"
            :readonly="st.key === 'readonly'"
            v-model="m[`mx-${v}-${st.key}`]"
            class="pg-matrix-field"
          />
        </div>
      </div>
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssTextarea from '@components/base/DssTextarea/DssTextarea.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssTextarea (vide types/textarea.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['outlined', 'filled', 'standout', 'borderless'] as const
const SLOTS = ['prepend', 'append', 'before', 'after', 'label', 'error', 'hint'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

const MATRIX_STATES = [
  { key: 'base',     label: 'Base' },
  { key: 'error',    label: 'Erro' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'readonly', label: 'Readonly' },
] as const

const SECTIONS = [
  { id: 'variantes', index: '01', title: 'Variantes' },
  { id: 'densidade', index: '02', title: 'Densidade' },
  { id: 'label',     index: '03', title: 'Label & Placeholder' },
  { id: 'hint',      index: '04', title: 'Hint & Mensagens' },
  { id: 'estados',   index: '05', title: 'Estados' },
  { id: 'clearable', index: '06', title: 'Clearable' },
  { id: 'autogrow',  index: '07', title: 'Autogrow & Altura' },
  { id: 'slots',     index: '08', title: 'Slots' },
  { id: 'brand',     index: '09', title: 'Brandabilidade' },
  { id: 'matriz',    index: '10', title: 'Matriz V × Estado' },
]

// "Seções" removido (redundante); "Exemplos" é anexado pelo PlaygroundLayout.
const KPIS = [
  { value: VARIANTS.length, label: 'Variantes' },
  { value: SLOTS.length,    label: 'Slots' },
]

// Estado dos v-model — mapa reativo único (chaves criadas sob demanda).
const m = reactive<Record<string, any>>({
  denseOff: '', denseOn: '',
  lblFloat: 'Texto de exemplo', lblStack: '', lblPh: '',
  hint1: '', hint2: '',
  stError: '', stDisabled: 'Conteúdo desabilitado', stReadonly: 'Conteúdo somente leitura', stLoading: '', stBase: '',
  clear1: 'Conteúdo limpável', clear2: 'Anotação rápida',
  rows5: '', autogrow: '', autogrowMax: '',
  slotPrepend: '', slotAppend: '', slotBefore: '',
  slotAfter: '', slotLabel: '', slotHint: '', slotError: '',
})

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>
