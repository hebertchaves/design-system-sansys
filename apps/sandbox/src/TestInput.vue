<template>
  <PlaygroundLayout
    title="DssInput — Playground"
    code="base/DssInput"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ───────────────────────────────────────────────── -->
    <PgSection id="variantes" index="01" title="Variantes Visuais" :count="VARIANTS.length"
      desc="4 variantes (outlined, filled, standout, borderless) controladas pela prop variant. Default: outlined.">
      <PgGrid>
        <PgTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`">
          <DssInput :variant="v" :label="capitalize(v)" placeholder="Digite aqui" v-model="m[`var-${v}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Tipos HTML ──────────────────────────────────────────────── -->
    <PgSection id="tipos" index="02" title="Tipos HTML" :count="TYPES.length"
      desc="Prop type — mapeia o atributo nativo do input (text, email, password, number, search, tel, url, date, time, datetime-local).">
      <PgGrid>
        <PgTile v-for="t in TYPES" :key="t" :code="`type=&quot;${t}&quot;`">
          <DssInput :type="t" :label="capitalize(t)" :placeholder="typePlaceholder(t)" v-model="m[`type-${t}`]" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Densidade ───────────────────────────────────────────────── -->
    <PgSection id="densidade" index="03" title="Densidade" :count="2"
      desc="Prop dense reduz a altura do controle. Altura padrão 44px (touch-target WCAG 2.5.5).">
      <PgGrid>
        <PgTile code="default (44px)">
          <DssInput label="Confortável" placeholder="Altura padrão" v-model="m.denseOff" />
        </PgTile>
        <PgTile code="dense">
          <DssInput dense label="Compacto" placeholder="Altura reduzida" v-model="m.denseOn" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Label & Placeholder ─────────────────────────────────────── -->
    <PgSection id="label" index="04" title="Label & Placeholder" :count="4"
      desc="Floating label (padrão), stack-label fixo no topo, placeholder isolado e a combinação dos dois.">
      <PgGrid>
        <PgTile code="label (floating)">
          <DssInput label="Nome completo" v-model="m.lblFloat" />
        </PgTile>
        <PgTile code="stack-label">
          <DssInput label="Endereço" stack-label placeholder="Rua, número, bairro" v-model="m.lblStack" />
        </PgTile>
        <PgTile code="placeholder only">
          <DssInput placeholder="Sem label, só placeholder" v-model="m.lblPh" />
        </PgTile>
        <PgTile code="label + placeholder">
          <DssInput label="E-mail" placeholder="voce@exemplo.com" v-model="m.lblBoth" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Hint & Mensagens ────────────────────────────────────────── -->
    <PgSection id="hint" index="05" title="Hint & Mensagens" :count="3"
      desc="hint (texto de ajuda), required (aria-required + asterisco) e a área inferior reservada para mensagens.">
      <PgGrid>
        <PgTile code="hint">
          <DssInput label="Username" hint="Mínimo de 6 caracteres" v-model="m.hint1" />
        </PgTile>
        <PgTile code="required">
          <DssInput label="Campo obrigatório" required hint="Preenchimento obrigatório" v-model="m.hint2" />
        </PgTile>
        <PgTile code="hint + clearable">
          <DssInput label="Pesquisa" hint="Pressione Esc para limpar" clearable v-model="m.hint3" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="06" title="Estados" :count="5"
      desc="error (+ error-message), disabled, readonly, loading e o estado base focável. A área inferior é reservada para evitar layout-shift.">
      <PgGrid>
        <PgTile code=":error=&quot;true&quot;">
          <DssInput label="CPF" :error="true" error-message="CPF deve ter 11 dígitos" v-model="m.stError" />
        </PgTile>
        <PgTile code=":disabled=&quot;true&quot;">
          <DssInput label="Desabilitado" disabled placeholder="Não editável" v-model="m.stDisabled" />
        </PgTile>
        <PgTile code=":readonly=&quot;true&quot;">
          <DssInput label="Somente leitura" readonly v-model="m.stReadonly" />
        </PgTile>
        <PgTile code=":loading=&quot;true&quot;">
          <DssInput label="Verificando…" loading placeholder="Aguarde" v-model="m.stLoading" />
        </PgTile>
        <PgTile code="base (focável)">
          <DssInput label="Estado base" placeholder="Clique para focar" v-model="m.stBase" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Clearable ───────────────────────────────────────────────── -->
    <PgSection id="clearable" index="07" title="Clearable" :count="2"
      desc="Prop clearable exibe o botão × (com clear-aria-label) quando há valor. Emite o evento clear.">
      <PgGrid>
        <PgTile code="clearable (com valor)">
          <DssInput label="Busca" clearable v-model="m.clear1" />
        </PgTile>
        <PgTile code="clearable + filled">
          <DssInput variant="filled" label="Filtro" clearable v-model="m.clear2" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Slots ───────────────────────────────────────────────────── -->
    <PgSection id="slots" index="08" title="Slots" :count="SLOTS.length"
      desc="prepend e append (dentro do campo), before e after (fora), além de label/hint/error customizados.">
      <PgGrid>
        <PgTile code="#prepend (ícone)">
          <DssInput label="Telefone" placeholder="(00) 00000-0000" v-model="m.slotPrepend">
            <template #prepend><span class="material-icons pg-slot-icon">call</span></template>
          </DssInput>
        </PgTile>
        <PgTile code="#append (ícone)">
          <DssInput label="Valor" placeholder="0,00" v-model="m.slotAppend">
            <template #append><span class="material-icons pg-slot-icon">attach_money</span></template>
          </DssInput>
        </PgTile>
        <PgTile code="#before (ícone externo)">
          <DssInput label="Localização" v-model="m.slotBefore">
            <template #before><span class="material-icons pg-slot-icon">place</span></template>
          </DssInput>
        </PgTile>
        <PgTile code="#after (slot externo)">
          <DssInput label="Mensagem" v-model="m.slotAfter">
            <template #after><span class="material-icons pg-slot-icon">send</span></template>
          </DssInput>
        </PgTile>
        <PgTile code="#label (custom)">
          <DssInput v-model="m.slotLabel">
            <template #label><span class="pg-slot-label">Nome <strong>*</strong></span></template>
          </DssInput>
        </PgTile>
        <PgTile code="#hint (custom)">
          <DssInput label="Usuário" v-model="m.slotHint">
            <template #hint><span>Mín. <strong>3</strong> caracteres</span></template>
          </DssInput>
        </PgTile>
        <PgTile code="#error (custom)">
          <DssInput label="E-mail" :error="true" v-model="m.slotError">
            <template #error><span>Formato <strong>inválido</strong></span></template>
          </DssInput>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Casos de uso (composições de slots) ─────────────────────── -->
    <PgSection id="casos" index="09" title="Casos de uso" :count="2"
      desc="Composições reais combinando slots — não são slots novos, mas exemplos de uso (toggle de senha no #append, busca com ícone + contador no #prepend/#append).">
      <PgGrid>
        <PgTile code="senha (toggle no #append)">
          <DssInput
            label="Senha"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Digite sua senha"
            v-model="m.slotPassword"
          >
            <template #append>
              <DssButton
                variant="flat"
                color="secondary"
                size="sm"
                :icon="showPassword ? 'visibility_off' : 'visibility'"
                :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
                @click="showPassword = !showPassword"
              />
            </template>
          </DssInput>
        </PgTile>
        <PgTile code="busca (#prepend + #append)">
          <DssInput label="Buscar" placeholder="Termo…" v-model="m.slotBoth">
            <template #prepend><span class="material-icons pg-slot-icon">search</span></template>
            <template #append><span class="pg-char-count">{{ (m.slotBoth || '').length }}/40</span></template>
          </DssInput>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 10. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="10" title="Brandabilidade" :count="BRAND_KEYS.length * 2"
      desc="Prop brand sobrescreve o accent de foco. Reage também a [data-brand] global (use as pílulas do topo).">
      <div v-for="brand in BRAND_KEYS" :key="brand" class="pg-brand-block">
        <div class="pg-brand-block__head">
          <span :class="['pg-brand-block__dot', `is-${brand}`]" aria-hidden="true"></span>
          <h3 class="pg-brand-block__title">{{ brandLabel(brand) }}</h3>
          <code class="pg-brand-block__code">brand="{{ brand }}"</code>
        </div>
        <PgGrid>
          <PgTile code="outlined + focus accent">
            <DssInput :brand="brand" variant="outlined" :label="`${capitalize(brand)} input`"
              hint="Foque para ver o accent" v-model="m[`brand-${brand}-o`]" />
          </PgTile>
          <PgTile code="filled + focus accent">
            <DssInput :brand="brand" variant="filled" :label="`${capitalize(brand)} input`"
              hint="Foque para ver o accent" v-model="m[`brand-${brand}-f`]" />
          </PgTile>
        </PgGrid>
      </div>
    </PgSection>

    <!-- ── 11. Matriz Variante × Estado ────────────────────────────────── -->
    <PgSection id="matriz" index="11" title="Matriz Variante × Estado" :count="VARIANTS.length * MATRIX_STATES.length"
      desc="Cobertura combinatória para inspeção visual rápida: cada variante em base, erro, desabilitado e readonly.">
      <div v-for="v in VARIANTS" :key="v" class="pg-matrix-row">
        <div class="pg-matrix-row__label"><code>{{ v }}</code></div>
        <div class="pg-matrix-row__items">
          <DssInput
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
import { reactive, ref } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssInput  from '@components/base/DssInput/DssInput.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssInput (vide types/input.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['outlined', 'filled', 'standout', 'borderless'] as const
const TYPES = ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'date', 'time', 'datetime-local'] as const
const SLOTS = ['prepend', 'append', 'before', 'after', 'label', 'hint', 'error'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

const MATRIX_STATES = [
  { key: 'base',     label: 'Base' },
  { key: 'error',    label: 'Erro' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'readonly', label: 'Readonly' },
] as const

const SECTIONS = [
  { id: 'variantes', index: '01', title: 'Variantes' },
  { id: 'tipos',     index: '02', title: 'Tipos HTML' },
  { id: 'densidade', index: '03', title: 'Densidade' },
  { id: 'label',     index: '04', title: 'Label & Placeholder' },
  { id: 'hint',      index: '05', title: 'Hint & Mensagens' },
  { id: 'estados',   index: '06', title: 'Estados' },
  { id: 'clearable', index: '07', title: 'Clearable' },
  { id: 'slots',     index: '08', title: 'Slots' },
  { id: 'casos',     index: '09', title: 'Casos de uso' },
  { id: 'brand',     index: '10', title: 'Brandabilidade' },
  { id: 'matriz',    index: '11', title: 'Matriz V × Estado' },
]

// "Seções" removido (redundante com a numeração). "Exemplos" é anexado
// automaticamente pelo PlaygroundLayout (total de tiles renderizados).
const KPIS = [
  { value: VARIANTS.length, label: 'Variantes' },
  { value: TYPES.length,    label: 'Tipos HTML' },
  { value: SLOTS.length,    label: 'Slots' },
]

// Estado dos v-model — mapa reativo único (chaves criadas sob demanda).
const m = reactive<Record<string, string>>({
  denseOff: '', denseOn: '',
  lblFloat: '', lblStack: '', lblPh: '', lblBoth: '',
  hint1: '', hint2: '', hint3: '',
  stError: '123', stDisabled: 'Não editável', stReadonly: 'Somente leitura', stLoading: '', stBase: '',
  clear1: 'Texto inicial', clear2: 'Filtro ativo',
  slotPrepend: '', slotAppend: '', slotPassword: '', slotBoth: '',
  slotBefore: '', slotAfter: '', slotLabel: '', slotHint: '', slotError: '',
})

const showPassword = ref(false)

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)

const typePlaceholder = (t: string) => ({
  text: 'Texto livre',
  email: 'voce@exemplo.com',
  password: '••••••••',
  number: '0',
  search: 'Buscar…',
  tel: '(00) 00000-0000',
  url: 'https://exemplo.com',
  date: '',
  time: '',
  'datetime-local': '',
}[t] || '')
</script>
