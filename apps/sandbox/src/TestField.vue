<template>
  <PlaygroundLayout
    title="DssField — Playground"
    code="base/DssField"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ───────────────────────────────────────────────── -->
    <PgSection id="variantes" index="01" title="Variantes Visuais" :count="VARIANTS.length"
      desc="4 variantes (outlined, filled, standout, borderless). DssField é a moldura — envolve um controle via slot #default escopado (fieldId).">
      <PgGrid>
        <PgTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`">
          <DssField :variant="v" :label="capitalize(v)" :has-value="!!m[`var-${v}`]">
            <template #default="{ fieldId }">
              <input :id="fieldId" v-model="m[`var-${v}`]" type="text" :style="INPUT_STYLE" />
            </template>
          </DssField>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Label & Hint ────────────────────────────────────────────── -->
    <PgSection id="label" index="02" title="Label & Hint" :count="3"
      desc="label (flutuante), hint (texto de ajuda na área inferior) e a combinação com valor preenchido.">
      <PgGrid>
        <PgTile code="label">
          <DssField label="Nome completo" :has-value="!!m.lbl">
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m.lbl" type="text" :style="INPUT_STYLE" /></template>
          </DssField>
        </PgTile>
        <PgTile code="label + hint">
          <DssField label="Usuário" hint="Mínimo de 6 caracteres" :has-value="!!m.hint">
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m.hint" type="text" :style="INPUT_STYLE" /></template>
          </DssField>
        </PgTile>
        <PgTile code="com valor (label flutua)">
          <DssField label="Cidade" :has-value="!!m.filled">
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m.filled" type="text" :style="INPUT_STYLE" /></template>
          </DssField>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Erro ────────────────────────────────────────────────────── -->
    <PgSection id="erro" index="03" title="Estado de Erro" :count="2"
      desc="error (+ error-message) na área inferior. O slot #error permite mensagem customizada (fallback = errorMessage).">
      <PgGrid>
        <PgTile code=":error=&quot;true&quot; + error-message">
          <DssField label="Email" :error="true" error-message="Formato inválido" :has-value="!!m.err1">
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m.err1" type="text" :style="INPUT_STYLE" /></template>
          </DssField>
        </PgTile>
        <PgTile code="#error (custom)">
          <DssField label="CPF" :error="true" :has-value="!!m.err2">
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m.err2" type="text" :style="INPUT_STYLE" /></template>
            <template #error><span>Deve ter <strong>11</strong> dígitos</span></template>
          </DssField>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Slots ───────────────────────────────────────────────────── -->
    <PgSection id="slots" index="04" title="Slots" :count="4"
      desc="prepend/append (dentro da moldura) e before/after (fora), além de label/hint/error customizados.">
      <PgGrid>
        <PgTile code="#prepend (ícone)">
          <DssField label="Telefone" :has-value="!!m.slotPre">
            <template #prepend><span class="material-icons pg-slot-icon">call</span></template>
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m.slotPre" type="text" :style="INPUT_STYLE" /></template>
          </DssField>
        </PgTile>
        <PgTile code="#append (ícone)">
          <DssField label="Valor" :has-value="!!m.slotApp">
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m.slotApp" type="text" :style="INPUT_STYLE" /></template>
            <template #append><span class="material-icons pg-slot-icon">attach_money</span></template>
          </DssField>
        </PgTile>
        <PgTile code="#before (externo)">
          <DssField label="Local" :has-value="!!m.slotBef">
            <template #before><span class="material-icons pg-slot-icon">place</span></template>
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m.slotBef" type="text" :style="INPUT_STYLE" /></template>
          </DssField>
        </PgTile>
        <PgTile code="#after (externo)">
          <DssField label="Mensagem" :has-value="!!m.slotAft">
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m.slotAft" type="text" :style="INPUT_STYLE" /></template>
            <template #after><span class="material-icons pg-slot-icon">send</span></template>
          </DssField>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="05" title="Brandabilidade" :count="BRAND_KEYS.length"
      desc="Prop brand sobrescreve o accent de foco. Reage também a [data-brand] global — use as pílulas do topo.">
      <PgGrid>
        <PgTile v-for="b in BRAND_KEYS" :key="b" :code="`brand=&quot;${b}&quot;`">
          <DssField :brand="b" :label="brandLabel(b)" :has-value="!!m[`brand-${b}`]">
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m[`brand-${b}`]" type="text" :style="INPUT_STYLE" /></template>
          </DssField>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Matriz Variante × Estado ────────────────────────────────── -->
    <PgSection id="matriz" index="06" title="Matriz Variante × Estado" :count="VARIANTS.length * MATRIX_STATES.length"
      desc="Cobertura combinatória: cada variante em base e erro.">
      <div v-for="v in VARIANTS" :key="v" class="pg-matrix-row">
        <div class="pg-matrix-row__label"><code>{{ v }}</code></div>
        <div class="pg-matrix-row__items">
          <DssField
            v-for="st in MATRIX_STATES"
            :key="v + st.key"
            :variant="v"
            :label="st.label"
            :error="st.key === 'error'"
            :error-message="st.key === 'error' ? 'Inválido' : undefined"
            :has-value="!!m[`mx-${v}-${st.key}`]"
            class="pg-matrix-field"
          >
            <template #default="{ fieldId }"><input :id="fieldId" v-model="m[`mx-${v}-${st.key}`]" type="text" :style="INPUT_STYLE" /></template>
          </DssField>
        </div>
      </div>
    </PgSection>

    <!-- ── 07. Exemplos de uso ─────────────────────────────────────────── -->
    <PgSection id="exemplos" index="07" title="Exemplos de uso" :count="1"
      desc="Composições reais do DssField.example.vue — fonte única, também usável na documentação.">
      <DssFieldExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssField from '@components/base/DssField/DssField.vue'
import DssFieldExample from '@components/base/DssField/DssField.example.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssField (vide types/field.types.ts). DssField é a MOLDURA —
// o controle vai no slot #default escopado ({ fieldId }).
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['outlined', 'filled', 'standout', 'borderless'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

// Input nativo (não estilizado) que a moldura DssField envolve.
const INPUT_STYLE = 'border:none;outline:none;background:transparent;width:100%;font-size:16px;padding-top:20px;padding-bottom:4px;color:inherit;'

const MATRIX_STATES = [
  { key: 'base',  label: 'Base' },
  { key: 'error', label: 'Erro' },
] as const

const SECTIONS = [
  { id: 'variantes', index: '01', title: 'Variantes' },
  { id: 'label',     index: '02', title: 'Label & Hint' },
  { id: 'erro',      index: '03', title: 'Estado de Erro' },
  { id: 'slots',     index: '04', title: 'Slots' },
  { id: 'brand',     index: '05', title: 'Brandabilidade' },
  { id: 'matriz',    index: '06', title: 'Matriz V × Estado' },
  { id: 'exemplos',  index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: VARIANTS.length,   label: 'Variantes' },
  { value: BRAND_KEYS.length, label: 'Brands' },
]

const m = reactive<Record<string, string>>({ filled: 'São Paulo' })

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>
