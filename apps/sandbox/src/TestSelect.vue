<template>
  <PlaygroundLayout
    title="DssSelect — Playground"
    code="base/DssSelect"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ───────────────────────────────────────────────── -->
    <PgSection id="variantes" index="01" title="Variantes Visuais" :count="VARIANTS.length"
      desc="4 variantes (outlined, filled, standout, borderless) controladas pela prop variant. Default: outlined.">
      <PgGrid>
        <PgTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`">
          <DssSelect :variant="v" :label="capitalize(v)" :options="opts" v-model="m[`var-${v}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Densidade ───────────────────────────────────────────────── -->
    <PgSection id="densidade" index="02" title="Densidade" :count="2"
      desc="Prop dense reduz a altura do controle. Altura padrão 44px (touch-target WCAG 2.5.5); compacto 36px.">
      <PgGrid>
        <PgTile code="default (44px)">
          <DssSelect label="Confortável" :options="opts" v-model="m.denseOff" />
        </PgTile>
        <PgTile code="dense (36px)">
          <DssSelect dense label="Compacto" :options="opts" v-model="m.denseOn" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Label & Placeholder ─────────────────────────────────────── -->
    <PgSection id="label" index="03" title="Label & Placeholder" :count="3"
      desc="Floating label (padrão), stack-label fixo no topo e placeholder exibido enquanto não há seleção.">
      <PgGrid>
        <PgTile code="label (floating)">
          <DssSelect label="Seleção" :options="opts" v-model="m.lblFloat" />
        </PgTile>
        <PgTile code="stack-label">
          <DssSelect label="Categoria" stack-label placeholder="Escolha uma opção" :options="opts" v-model="m.lblStack" />
        </PgTile>
        <PgTile code="placeholder only">
          <DssSelect placeholder="Sem label, só placeholder" :options="opts" v-model="m.lblPh" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Hint & Mensagens ────────────────────────────────────────── -->
    <PgSection id="hint" index="04" title="Hint & Mensagens" :count="2"
      desc="hint (texto de ajuda) e required (aria-required + asterisco). A área inferior é reservada para mensagens.">
      <PgGrid>
        <PgTile code="hint">
          <DssSelect label="Estado" hint="Selecione a unidade federativa" :options="opts" v-model="m.hint1" />
        </PgTile>
        <PgTile code="required">
          <DssSelect label="Campo obrigatório" required hint="Seleção obrigatória" :options="opts" v-model="m.hint2" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="05" title="Estados" :count="5"
      desc="error (+ error-message), disabled, readonly, loading e o estado base focável. A área inferior é reservada para evitar layout-shift.">
      <PgGrid>
        <PgTile code=":error=&quot;true&quot;">
          <DssSelect label="Categoria" :error="true" error-message="Selecione uma categoria válida" :options="opts" v-model="m.stError" />
        </PgTile>
        <PgTile code=":disabled=&quot;true&quot;">
          <DssSelect label="Desabilitado" disabled :options="opts" v-model="m.stDisabled" />
        </PgTile>
        <PgTile code=":readonly=&quot;true&quot;">
          <DssSelect label="Somente leitura" readonly :options="opts" v-model="m.stReadonly" />
        </PgTile>
        <PgTile code=":loading=&quot;true&quot;">
          <DssSelect label="Carregando…" loading :options="opts" v-model="m.stLoading" />
        </PgTile>
        <PgTile code="base (focável)">
          <DssSelect label="Estado base" :options="opts" v-model="m.stBase" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Clearable ───────────────────────────────────────────────── -->
    <PgSection id="clearable" index="06" title="Clearable" :count="2"
      desc="Prop clearable exibe o botão × quando há seleção, permitindo voltar ao estado vazio. Emite o evento clear.">
      <PgGrid>
        <PgTile code="clearable (com valor)">
          <DssSelect label="Limpável" clearable :options="opts" v-model="m.clear1" />
        </PgTile>
        <PgTile code="clearable + filled">
          <DssSelect variant="filled" label="Filtro" clearable :options="opts" v-model="m.clear2" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Seleção Múltipla ────────────────────────────────────────── -->
    <PgSection id="multipla" index="07" title="Seleção Múltipla" :count="2"
      desc="Prop multiple permite várias seleções; use-chips renderiza cada item como um chip removível dentro do campo.">
      <PgGrid>
        <PgTile code="multiple">
          <DssSelect label="Tags" multiple :options="opts" v-model="m.multi1" />
        </PgTile>
        <PgTile code="multiple + use-chips">
          <DssSelect label="Tags (chips)" multiple use-chips :options="opts" v-model="m.multi2" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Slots ───────────────────────────────────────────────────── -->
    <PgSection id="slots" index="08" title="Slots" :count="SLOTS.length"
      desc="prepend/append (dentro), before/after (fora), label/hint/error customizados e option/selected-item para render customizado das opções.">
      <PgGrid>
        <PgTile code="#prepend (ícone)">
          <DssSelect label="Localidade" :options="opts" v-model="m.slotPrepend">
            <template #prepend><span class="material-icons pg-slot-icon">place</span></template>
          </DssSelect>
        </PgTile>
        <PgTile code="#append (ícone)">
          <DssSelect label="Filtro" :options="opts" v-model="m.slotAppend">
            <template #append><span class="material-icons pg-slot-icon">filter_list</span></template>
          </DssSelect>
        </PgTile>
        <PgTile code="#before (ícone externo)">
          <DssSelect label="Categoria" :options="opts" v-model="m.slotBefore">
            <template #before><span class="material-icons pg-slot-icon">category</span></template>
          </DssSelect>
        </PgTile>
        <PgTile code="#after (slot externo)">
          <DssSelect label="Ações" :options="opts" v-model="m.slotAfter">
            <template #after><span class="material-icons pg-slot-icon">tune</span></template>
          </DssSelect>
        </PgTile>
        <PgTile code="#label (custom)">
          <DssSelect :options="opts" v-model="m.slotLabel">
            <template #label><span class="pg-slot-label">Categoria <strong>*</strong></span></template>
          </DssSelect>
        </PgTile>
        <PgTile code="#option (render custom)">
          <DssSelect label="Com ícone" :options="opts" v-model="m.slotOption">
            <template #option="{ itemProps, opt }">
              <q-item v-bind="itemProps">
                <q-item-section avatar><span class="material-icons pg-slot-icon">star</span></q-item-section>
                <q-item-section>{{ opt }}</q-item-section>
              </q-item>
            </template>
          </DssSelect>
        </PgTile>
        <PgTile code="#selected-item (custom)">
          <DssSelect label="Selecionado" :options="opts" v-model="m.slotSelected">
            <template #selected-item="{ opt }">
              <span class="pg-slot-selected">✓ {{ opt }}</span>
            </template>
          </DssSelect>
        </PgTile>
        <PgTile code="#hint (custom)">
          <DssSelect label="UF" :options="opts" v-model="m.slotHint">
            <template #hint><span>Selecione a <strong>unidade</strong></span></template>
          </DssSelect>
        </PgTile>
        <PgTile code="#error (custom)">
          <DssSelect label="Categoria" :error="true" :options="opts" v-model="m.slotError">
            <template #error><span>Seleção <strong>obrigatória</strong></span></template>
          </DssSelect>
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
            <DssSelect :brand="brand" variant="outlined" :label="`${capitalize(brand)} select`"
              hint="Foque para ver o accent" :options="opts" v-model="m[`brand-${brand}-o`]" />
          </PgTile>
          <PgTile code="filled + focus accent">
            <DssSelect :brand="brand" variant="filled" :label="`${capitalize(brand)} select`"
              hint="Foque para ver o accent" :options="opts" v-model="m[`brand-${brand}-f`]" />
          </PgTile>
        </PgGrid>
      </div>
    </PgSection>

    <!-- ── 10. Matriz Variante × Estado ────────────────────────────────── -->
    <PgSection id="matriz" index="10" title="Matriz Variante × Estado" :count="VARIANTS.length * MATRIX_STATES.length"
      desc="Cobertura combinatória para inspeção visual rápida: cada variante em base, erro, desabilitado e readonly.">
      <div v-for="v in VARIANTS" :key="v" class="pg-matrix-row">
        <div class="pg-matrix-row__label"><code>{{ v }}</code></div>
        <div class="pg-matrix-row__items">
          <DssSelect
            v-for="st in MATRIX_STATES"
            :key="v + st.key"
            :variant="v"
            :label="st.label"
            :options="opts"
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

    <!-- ── 11. Exemplos de uso (.example.vue como fonte) — última seção ──── -->
    <PgSection id="exemplos" index="11" title="Exemplos de uso" :count="3"
      desc="Composições reais (não repete variantes/estados). Renderiza o DssSelect.example.vue — fonte única, também usável na documentação.">
      <DssSelectExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssSelect from '@components/base/DssSelect/DssSelect.vue'
import DssSelectExample from '@components/base/DssSelect/DssSelect.example.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssSelect (vide types/select.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['outlined', 'filled', 'standout', 'borderless'] as const
// Espelha a interface SelectSlots (fonte de verdade). `no-option` foi removido por
// NÃO estar tipado em SelectSlots; se for um slot público intencional, adicioná-lo
// à interface primeiro (validate:api-docs aponta a divergência).
const SLOTS = ['label', 'before', 'prepend', 'append', 'after', 'option', 'selected-item', 'error', 'hint'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

const opts = ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']

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
  { id: 'multipla',  index: '07', title: 'Seleção Múltipla' },
  { id: 'slots',     index: '08', title: 'Slots' },
  { id: 'brand',     index: '09', title: 'Brandabilidade' },
  { id: 'matriz',    index: '10', title: 'Matriz V × Estado' },
  { id: 'exemplos',  index: '11', title: 'Exemplos de uso' },
]

// "Seções" removido (redundante); "Exemplos" é anexado pelo PlaygroundLayout.
const KPIS = [
  { value: VARIANTS.length, label: 'Variantes' },
  { value: SLOTS.length,    label: 'Slots' },
]

// Estado dos v-model — mapa reativo único (chaves criadas sob demanda).
// Selects únicos usam string|null; múltiplos usam array.
const m = reactive<Record<string, any>>({
  denseOff: null, denseOn: null,
  lblFloat: 'Opção 1', lblStack: null, lblPh: null,
  hint1: null, hint2: null,
  stError: null, stDisabled: 'Opção 2', stReadonly: 'Opção 1', stLoading: null, stBase: null,
  clear1: 'Opção 2', clear2: 'Opção 3',
  multi1: ['Opção 1', 'Opção 3'], multi2: ['Opção 2', 'Opção 4'],
  slotPrepend: null, slotAppend: null, slotBefore: null,
  slotAfter: null, slotLabel: null, slotOption: null, slotSelected: 'Opção 1', slotHint: null, slotError: null,
})

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>
