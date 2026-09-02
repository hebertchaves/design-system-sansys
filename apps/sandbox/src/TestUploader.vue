<template>
  <PlaygroundLayout
    title="DssUploader — Playground"
    code="composed/DssUploader"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Variantes ───────────────────────────────────────────────── -->
    <PgSection id="variantes" index="01" title="Variantes Visuais" :count="VARIANTS.length"
      desc="3 variantes de container (elevated, outline, subtle) controladas pela prop variant. Default: elevated.">
      <PgGrid>
        <PgTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`">
          <DssUploader :variant="v" :label="`Arraste aqui — ${v}`" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Rótulo da dropzone ──────────────────────────────────────── -->
    <PgSection id="rotulo" index="02" title="Rótulo da Dropzone" :count="3"
      desc="A prop label é o texto da dropzone vazia. Sem ela, o componente usa o rótulo padrão.">
      <PgGrid>
        <PgTile code="label omitida (padrão)">
          <DssUploader />
        </PgTile>
        <PgTile code='label="Solte os anexos"'>
          <DssUploader label="Solte os anexos" />
        </PgTile>
        <PgTile code="label com instrução de formato">
          <DssUploader label="Comprovantes em PDF ou imagem" accept=".pdf,image/*" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Seleção de arquivos ─────────────────────────────────────── -->
    <PgSection id="selecao" index="03" title="Seleção de Arquivos" :count="4"
      desc="multiple libera a fila com vários arquivos; accept filtra o seletor nativo; maxFiles limita a quantidade.">
      <PgGrid>
        <PgTile code="single (default)">
          <DssUploader label="Um arquivo por vez" />
        </PgTile>
        <PgTile code="multiple">
          <DssUploader multiple label="Vários arquivos" />
        </PgTile>
        <PgTile code='accept=".pdf"'>
          <DssUploader multiple accept=".pdf" label="Somente PDF" />
        </PgTile>
        <PgTile code=":max-files=&quot;3&quot;">
          <DssUploader multiple :max-files="3" label="Até 3 arquivos" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Limites de tamanho ──────────────────────────────────────── -->
    <PgSection id="limites" index="04" title="Limites de Tamanho" :count="2"
      desc="maxFileSize limita cada arquivo; maxTotalSize limita a soma da fila. Ambos em bytes — o excedente dispara o evento rejected.">
      <PgGrid>
        <PgTile code=':max-file-size="1024 * 1024"'>
          <DssUploader multiple :max-file-size="1024 * 1024" label="Máx. 1 MB por arquivo" />
        </PgTile>
        <PgTile code=':max-total-size="5 * 1024 * 1024"'>
          <DssUploader multiple :max-total-size="5 * 1024 * 1024" label="Máx. 5 MB no total" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Envio ───────────────────────────────────────────────────── -->
    <PgSection id="envio" index="05" title="Comportamento de Envio" :count="3"
      desc="Por padrão o envio é manual. autoUpload dispara ao adicionar; batch manda a fila inteira num único request; method escolhe POST ou PUT."
    >
      <PgGrid>
        <PgTile code="manual (default)">
          <DssUploader multiple label="Envio manual" />
        </PgTile>
        <PgTile code="auto-upload">
          <DssUploader multiple auto-upload :factory="simulaEnvio" label="Envia ao adicionar" />
        </PgTile>
        <PgTile code='batch + method="PUT"'>
          <DssUploader multiple batch method="PUT" :factory="simulaEnvio" label="Fila em um request" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="06" title="Estados" :count="3"
      desc="disable bloqueia toda interação; readonly mostra a fila mas impede adicionar ou remover.">
      <PgGrid>
        <PgTile code="base">
          <DssUploader label="Interativo" />
        </PgTile>
        <PgTile code="disable">
          <DssUploader disable label="Desabilitado" />
        </PgTile>
        <PgTile code="readonly">
          <DssUploader readonly label="Somente leitura" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. API imperativa & eventos ────────────────────────────────── -->
    <PgSection id="api" index="07" title="API Imperativa & Eventos" :count="EXPOSED.length"
      desc="O componente NÃO expõe slots públicos (EXC-01: header e list do QUploader são internos, para garantir conformidade DSS). A composição é por props, eventos e os 4 métodos expostos via ref."
    >
      <PgGrid>
        <PgTile code="ref.pickFiles() · upload() · abort() · reset()" align="stretch">
          <div class="pg-api-stack">
            <DssUploader
              ref="uploaderRef"
              multiple
              :factory="simulaEnvio"
              label="Controlado por fora"
              @added="log('added', $event)"
              @removed="log('removed', $event)"
              @rejected="log('rejected', $event)"
              @uploading="log('uploading')"
              @uploaded="log('uploaded')"
              @failed="log('failed')"
            />
            <div class="pg-api-actions">
              <DssButton
                v-for="metodo in EXPOSED"
                :key="metodo"
                variant="outline"
                size="sm"
                :label="metodo + '()'"
                @click="chamar(metodo)"
              />
            </div>
            <div class="pg-api-log" role="status" aria-live="polite">
              <p v-if="!eventos.length" class="pg-api-log__vazio">
                Nenhum evento ainda — adicione um arquivo ou use os botões acima.
              </p>
              <ol v-else>
                <li v-for="(e, i) in eventos" :key="i"><code>{{ e }}</code></li>
              </ol>
            </div>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Acessibilidade ──────────────────────────────────────────── -->
    <PgSection id="a11y" index="08" title="Acessibilidade" :count="ARIA_PROPS.length"
      desc="Os 4 botões de ação da barra têm aria-label configurável, para adequar o rótulo ao domínio do produto sem tocar no componente."
    >
      <PgGrid>
        <PgTile code="aria-labels customizados">
          <DssUploader
            multiple
            :factory="simulaEnvio"
            label="Anexos do processo"
            add-aria-label="Adicionar anexos do processo"
            upload-aria-label="Enviar anexos do processo"
            abort-aria-label="Cancelar envio dos anexos"
            clear-aria-label="Limpar anexos do processo"
          />
        </PgTile>
        <PgTile code="props disponíveis">
          <ul class="pg-api-props">
            <li v-for="p in ARIA_PROPS" :key="p"><code>{{ p }}</code></li>
          </ul>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="09" title="Brandabilidade" :count="BRAND_KEYS.length * 2"
      desc="Prop brand aplica o contexto Sansys. Reage também a [data-brand] global — use as pílulas do topo para comparar."
    >
      <div v-for="brand in BRAND_KEYS" :key="brand" class="pg-brand-block">
        <div class="pg-brand-block__head">
          <span :class="['pg-brand-block__dot', `is-${brand}`]" aria-hidden="true"></span>
          <h3 class="pg-brand-block__title">{{ brandLabel(brand) }}</h3>
          <code class="pg-brand-block__code">brand="{{ brand }}"</code>
        </div>
        <PgGrid>
          <PgTile code="elevated">
            <DssUploader :brand="brand" variant="elevated" :label="`${capitalize(brand)} — elevated`" />
          </PgTile>
          <PgTile code="outline">
            <DssUploader :brand="brand" variant="outline" :label="`${capitalize(brand)} — outline`" />
          </PgTile>
        </PgGrid>
      </div>
    </PgSection>

    <!-- ── 10. Matriz Variante × Estado ────────────────────────────────── -->
    <PgSection id="matriz" index="10" title="Matriz Variante × Estado" :count="VARIANTS.length * MATRIX_STATES.length"
      desc="Cobertura combinatória para inspeção visual rápida: cada variante em base, desabilitado e somente leitura."
    >
      <div v-for="v in VARIANTS" :key="v" class="pg-matrix-row">
        <div class="pg-matrix-row__label"><code>{{ v }}</code></div>
        <div class="pg-matrix-row__items">
          <DssUploader
            v-for="st in MATRIX_STATES"
            :key="v + st.key"
            :variant="v"
            :label="st.label"
            :disable="st.key === 'disable'"
            :readonly="st.key === 'readonly'"
            class="pg-matrix-field"
          />
        </div>
      </div>
    </PgSection>

    <!-- ── 11. Exemplos de uso (.example.vue como fonte) — última seção ─── -->
    <PgSection id="exemplos" index="11" title="Exemplos de uso" :count="1"
      desc="Composição real com simulação de upload (pending → uploading → uploaded/failed). Renderiza o DssUploader.example.vue — fonte única, também usável na documentação."
    >
      <DssUploaderExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssUploader from '@components/composed/DssUploader/DssUploader.vue'
import DssUploaderExample from '@components/composed/DssUploader/DssUploader.example.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssUploader (vide types/uploader.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const VARIANTS = ['elevated', 'outline', 'subtle'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const
const EXPOSED = ['pickFiles', 'upload', 'abort', 'reset'] as const
const ARIA_PROPS = ['addAriaLabel', 'uploadAriaLabel', 'abortAriaLabel', 'clearAriaLabel'] as const

// O componente não tem prop `error`/`readonly` de campo: os estados reais são
// `disable` e `readonly` (vide uploader.types.ts § Estado).
const MATRIX_STATES = [
  { key: 'base',     label: 'Base' },
  { key: 'disable',  label: 'Disabled' },
  { key: 'readonly', label: 'Readonly' },
] as const

const SECTIONS = [
  { id: 'variantes', index: '01', title: 'Variantes' },
  { id: 'rotulo',    index: '02', title: 'Rótulo da Dropzone' },
  { id: 'selecao',   index: '03', title: 'Seleção de Arquivos' },
  { id: 'limites',   index: '04', title: 'Limites de Tamanho' },
  { id: 'envio',     index: '05', title: 'Comportamento de Envio' },
  { id: 'estados',   index: '06', title: 'Estados' },
  { id: 'api',       index: '07', title: 'API Imperativa & Eventos' },
  { id: 'a11y',      index: '08', title: 'Acessibilidade' },
  { id: 'brand',     index: '09', title: 'Brandabilidade' },
  { id: 'matriz',    index: '10', title: 'Matriz V × Estado' },
  { id: 'exemplos',  index: '11', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: VARIANTS.length, label: 'Variantes' },
  { value: 6,               label: 'Eventos' },
  { value: EXPOSED.length,  label: 'Métodos expostos' },
]

// ──────────────────────────────────────────────────────────────────────────
// Simulação de envio
//
// A `factory` aponta para uma rota local inexistente do próprio dev server, com
// um atraso curto antes de resolver. Serve para exercitar a transição
// `uploading → failed` SEM tocar em rede externa — o 404 do Vite é o "erro".
// Tiles sem factory não enviam nada: só demonstram a fila.
// ──────────────────────────────────────────────────────────────────────────
function simulaEnvio() {
  return new Promise<{ url: string }>((resolve) => {
    setTimeout(() => resolve({ url: '/__upload-simulado' }), 600)
  })
}

// ── Seção 07: API imperativa e log de eventos ─────────────────────────────
type MetodoExposto = (typeof EXPOSED)[number]

const uploaderRef = ref<Record<MetodoExposto, () => void> | null>(null)
const eventos = ref<string[]>([])

function log(nome: string, payload?: unknown) {
  const n = Array.isArray(payload) ? ` (${payload.length})` : ''
  eventos.value = [`${hora()} · ${nome}${n}`, ...eventos.value].slice(0, 6)
}

function chamar(metodo: MetodoExposto) {
  uploaderRef.value?.[metodo]()
  log(`chamada: ${metodo}()`)
}

const hora = () => new Date().toLocaleTimeString('pt-BR', { hour12: false })
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>

<style scoped>
/* Layout local da seção 07/08 — o template Playground cobre o resto.
   Tokens DSS: a página do sandbox consome o CSS do core já compilado. */
.pg-api-stack {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
  width: 100%;
}

.pg-api-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-2);
}

.pg-api-log {
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-md);
  background: var(--dss-surface-subtle);
  padding: var(--dss-spacing-3);
  min-height: 5rem;
}

.pg-api-log ol {
  margin: 0;
  padding-left: var(--dss-spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1);
}

.pg-api-log code {
  font-size: var(--dss-font-size-xs);
}

.pg-api-log__vazio {
  margin: 0;
  color: var(--dss-text-subtle);
  font-size: var(--dss-font-size-xs);
}

.pg-api-props {
  margin: 0;
  padding-left: var(--dss-spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1);
}

.pg-api-props code {
  font-size: var(--dss-font-size-xs);
}
</style>
