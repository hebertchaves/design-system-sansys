<template>
  <PlaygroundLayout
    title="DssFile — Playground"
    code="base/DssFile"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ───────────────────────────────────────────────── -->
    <PgSection id="variantes" index="01" title="Variantes Visuais" :count="VARIANTS.length"
      desc="4 variantes (outlined, filled, standout, borderless) controladas pela prop variant. Default: outlined.">
      <PgGrid>
        <PgTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`">
          <DssFile :variant="v" :label="capitalize(v)" placeholder="Clique ou arraste" v-model="m[`var-${v}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Densidade ───────────────────────────────────────────────── -->
    <PgSection id="densidade" index="02" title="Densidade" :count="2"
      desc="Prop dense reduz a altura do controle. Altura padrão 44px (touch-target WCAG 2.5.5).">
      <PgGrid>
        <PgTile code="default (44px)">
          <DssFile label="Confortável" placeholder="Altura padrão" v-model="m.denseOff" />
        </PgTile>
        <PgTile code="dense">
          <DssFile dense label="Compacto" placeholder="Altura reduzida" v-model="m.denseOn" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Label & Placeholder ─────────────────────────────────────── -->
    <PgSection id="label" index="03" title="Label & Placeholder" :count="3"
      desc="Floating label (padrão) + placeholder (dropzone). Padrão B: com label, ela flutua e o hint aparece.">
      <PgGrid>
        <PgTile code="label + placeholder">
          <DssFile label="Anexo" placeholder="Clique ou arraste arquivos aqui" v-model="m.lblBoth" />
        </PgTile>
        <PgTile code="placeholder only">
          <DssFile placeholder="Sem label, só a dica" v-model="m.lblPh" />
        </PgTile>
        <PgTile code="label only (dica default)">
          <DssFile label="Documento" v-model="m.lblOnly" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="04" title="Estados" :count="4"
      desc="error (+ error-message), disabled, readonly e o estado base focável (anel :focus-visible).">
      <PgGrid>
        <PgTile code=":error=&quot;true&quot;">
          <DssFile label="Comprovante" :error="true" error-message="Arquivo obrigatório" v-model="m.stError" />
        </PgTile>
        <PgTile code=":disabled=&quot;true&quot;">
          <DssFile label="Desabilitado" disabled placeholder="Não editável" v-model="m.stDisabled" />
        </PgTile>
        <PgTile code=":readonly=&quot;true&quot;">
          <DssFile label="Somente leitura" readonly v-model="m.stReadonly" />
        </PgTile>
        <PgTile code="base (focável)">
          <DssFile label="Estado base" placeholder="Tab para focar" v-model="m.stBase" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Seleção múltipla & filtros ──────────────────────────────── -->
    <PgSection id="multiple" index="05" title="Múltiplos & Filtros" :count="3"
      desc="multiple (vários arquivos), accept (tipos MIME/extensão) e max-files (limite).">
      <PgGrid>
        <PgTile code=":multiple=&quot;true&quot;">
          <DssFile multiple label="Anexos" placeholder="Selecione vários" v-model="m.multi" />
        </PgTile>
        <PgTile code="accept=&quot;image/*&quot;">
          <DssFile accept="image/*" label="Imagem" placeholder="Só imagens" v-model="m.accept" />
        </PgTile>
        <PgTile code=":max-files=&quot;3&quot;">
          <DssFile multiple :max-files="3" label="Até 3" placeholder="Máx. 3 arquivos" v-model="m.maxFiles" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Slots ───────────────────────────────────────────────────── -->
    <PgSection id="slots" index="06" title="Slots" :count="2"
      desc="prepend e append (ícones dentro do campo) via DssIcon — acompanham o texto (20px, inline).">
      <PgGrid>
        <PgTile code="#prepend (ícone)">
          <DssFile label="Anexo" placeholder="Clique ou arraste" v-model="m.slotPrepend">
            <template #prepend><span class="material-icons pg-slot-icon">attach_file</span></template>
          </DssFile>
        </PgTile>
        <PgTile code="#append (ícone)">
          <DssFile label="Upload" placeholder="Clique ou arraste" v-model="m.slotAppend">
            <template #append><span class="material-icons pg-slot-icon">upload</span></template>
          </DssFile>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="07" title="Brandabilidade" :count="BRAND_KEYS.length"
      desc="Prop brand sobrescreve o accent de foco. Reage também a [data-brand] global — use as pílulas do topo.">
      <PgGrid>
        <PgTile v-for="b in BRAND_KEYS" :key="b" :code="`brand=&quot;${b}&quot;`">
          <DssFile :brand="b" :label="brandLabel(b)" placeholder="Foque para ver o accent" v-model="m[`brand-${b}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Matriz Variante × Estado ────────────────────────────────── -->
    <PgSection id="matriz" index="08" title="Matriz Variante × Estado" :count="VARIANTS.length * MATRIX_STATES.length"
      desc="Cobertura combinatória para inspeção visual rápida: cada variante em base, erro, desabilitado e readonly.">
      <div v-for="v in VARIANTS" :key="v" class="pg-matrix-row">
        <div class="pg-matrix-row__label"><code>{{ v }}</code></div>
        <div class="pg-matrix-row__items">
          <DssFile
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

    <!-- ── 09. Exemplos de uso ─────────────────────────────────────────── -->
    <PgSection id="exemplos" index="09" title="Exemplos de uso" :count="1"
      desc="Composições reais do DssFile.example.vue — fonte única, também usável na documentação.">
      <DssFileExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssFile from '@components/base/DssFile/DssFile.vue'
import DssFileExample from '@components/base/DssFile/DssFile.example.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssFile (vide types/file.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['outlined', 'filled', 'standout', 'borderless'] as const
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
  { id: 'estados',   index: '04', title: 'Estados' },
  { id: 'multiple',  index: '05', title: 'Múltiplos & Filtros' },
  { id: 'slots',     index: '06', title: 'Slots' },
  { id: 'brand',     index: '07', title: 'Brandabilidade' },
  { id: 'matriz',    index: '08', title: 'Matriz V × Estado' },
  { id: 'exemplos',  index: '09', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: VARIANTS.length,   label: 'Variantes' },
  { value: BRAND_KEYS.length, label: 'Brands' },
]

// v-model do DssFile: File | File[] | null. No playground fica vazio (mostra a dica).
const m = reactive<Record<string, any>>({})

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>
