<template>
  <div class="test-container">
    <header class="test-header">
      <h1>📋 DssCadrisCard — Stress Test Fase 3</h1>
      <p>Validação dos 5 padrões obrigatórios da Fase 3 + monitoramento de 3 riscos conhecidos</p>
      <div class="stress-legend">
        <span class="badge-obj">OBJ</span> Objetivo validado
        <span class="badge-risk">RISCO</span> Risco monitorado
        <span class="badge-info">INFO</span> Informativo
      </div>
    </header>

    <main class="test-content">

      <!-- ====================================================================
           OBJ-01 — inheritAttrs: false
           v-bind="$attrs" aplicado no DssCard raiz, não no elemento raiz do template.
           Valida: class, style e data-* passados pelo consumidor chegam no DssCard.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-obj">OBJ-01</span>
          inheritAttrs: false — atributos no DssCard raiz
        </h2>
        <p class="test-desc">
          <code>class</code>, <code>style</code> e <code>data-testid</code> passados pelo consumidor
          devem ser aplicados no <code>DssCard</code> raiz, não em um wrapper fantasma.
          Inspecione o DOM: o elemento com <code>.dss-card</code> deve ter <code>data-testid="cadris-obj01"</code>.
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <DssCadrisCard
              :rows="mockRows"
              :documento-options="documentoOptions"
              :aterro-options="aterroOptions"
              data-testid="cadris-obj01"
              style="border: 2px dashed #E31E24;"
              class="consumer-class"
              @search="handleSearch"
              @close="handleClose"
            />
            <code>data-testid="cadris-obj01" + style + class → aplicados no DssCard raiz</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           OBJ-02 — Slot toolbar-actions
           Slot nomeado que insere conteúdo na toolbar sem modificar o componente.
           Valida: botão "Exportar" aparece na toolbar, ao lado do botão fechar.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-obj">OBJ-02</span>
          Slot <code>#toolbar-actions</code>
        </h2>
        <p class="test-desc">
          O slot <code>#toolbar-actions</code> deve inserir conteúdo na toolbar entre o título
          e o botão fechar. Use o toggle para comparar com e sem o slot.
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <div class="toggle-row">
              <button class="toggle-btn" @click="hasToolbarSlot = !hasToolbarSlot">
                {{ hasToolbarSlot ? 'Remover slot toolbar-actions' : 'Adicionar slot toolbar-actions' }}
              </button>
              <span class="toggle-status">slot ativo: <strong>{{ hasToolbarSlot }}</strong></span>
            </div>
            <DssCadrisCard
              :rows="mockRows"
              :documento-options="documentoOptions"
              :aterro-options="aterroOptions"
              @search="handleSearch"
              @close="handleClose"
            >
              <template v-if="hasToolbarSlot" #toolbar-actions>
                <button
                  class="export-btn"
                  title="Exportar dados"
                >
                  ↓ Exportar
                </button>
              </template>
            </DssCadrisCard>
            <code>#toolbar-actions → botão "Exportar" na toolbar</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           OBJ-03 — provide/inject tipado (disabled sem prop drilling)
           disabled é provido no DssCadrisCard e injetado pelos componentes internos.
           Valida: filtros, botão Pesquisar e paginação ficam desabilitados sem prop drilling.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-obj">OBJ-03</span>
          provide/inject — disabled sem prop drilling
        </h2>
        <p class="test-desc">
          Com <code>:disable="true"</code>, todos os componentes internos (DssInput, DssSelect, DssButton)
          devem ficar desabilitados sem receber a prop manualmente.
        </p>
        <div class="test-grid test-grid--2col">
          <div class="test-item">
            <p class="item-label">disable: false (padrão)</p>
            <DssCadrisCard
              :rows="mockRows"
              :pagination="paginationObj03"
              :disable="false"
              :documento-options="documentoOptions"
              :aterro-options="aterroOptions"
              @search="handleSearch"
              @close="handleClose"
              @update:pagination="(p) => paginationObj03 = p"
            />
            <code>:disable="false"</code>
          </div>
          <div class="test-item">
            <p class="item-label">disable: true → inject nos componentes internos</p>
            <DssCadrisCard
              :rows="mockRows"
              :pagination="paginationObj03b"
              :disable="true"
              :documento-options="documentoOptions"
              :aterro-options="aterroOptions"
              @search="handleSearch"
              @close="handleClose"
              @update:pagination="(p) => paginationObj03b = p"
            />
            <code>:disable="true" → provide → inject nos DssInput/DssSelect/DssButton internos</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           OBJ-04 — Estado loading
           Valida: skeleton renderiza no lugar da tabela; botão Pesquisar fica em loading.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-obj">OBJ-04</span>
          Estado loading — skeleton loader
        </h2>
        <p class="test-desc">
          Com <code>:loading="true"</code>, a tabela é substituída pelo skeleton e o botão
          "Pesquisar" exibe estado de carregamento. Use o botão para alternar.
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <div class="toggle-row">
              <button class="toggle-btn" @click="isLoadingObj04 = !isLoadingObj04">
                {{ isLoadingObj04 ? 'Simular carregamento concluído' : 'Simular carregamento' }}
              </button>
              <span class="toggle-status">loading: <strong>{{ isLoadingObj04 }}</strong></span>
            </div>
            <DssCadrisCard
              :rows="isLoadingObj04 ? [] : mockRows"
              :loading="isLoadingObj04"
              :pagination="paginationObj04"
              :documento-options="documentoOptions"
              :aterro-options="aterroOptions"
              @search="handleSearch"
              @close="handleClose"
            />
            <code>:loading="true" → skeleton na tabela + loading no botão Pesquisar</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           OBJ-05 — Estado vazio (empty state)
           Valida: mensagem "Nenhum resultado encontrado" aparece quando rows=[].
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-obj">OBJ-05</span>
          Estado vazio — empty state
        </h2>
        <p class="test-desc">
          Com <code>:rows="[]"</code>, a tabela deve exibir a mensagem de estado vazio
          no lugar das linhas. Use o toggle para comparar.
        </p>
        <div class="test-grid test-grid--2col">
          <div class="test-item">
            <p class="item-label">Com dados (7 linhas)</p>
            <DssCadrisCard
              :rows="mockRows"
              :documento-options="documentoOptions"
              :aterro-options="aterroOptions"
              @search="handleSearch"
              @close="handleClose"
            />
            <code>:rows="mockRows" (7 linhas)</code>
          </div>
          <div class="test-item">
            <p class="item-label">Sem dados → empty state</p>
            <DssCadrisCard
              :rows="[]"
              :documento-options="documentoOptions"
              :aterro-options="aterroOptions"
              @search="handleSearch"
              @close="handleClose"
            />
            <code>:rows="[]" → mensagem de estado vazio</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           RISCO-01 — Dark mode via [data-theme]
           Valida: tokens de cor se adaptam corretamente ao tema escuro.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-risk">RISCO-01</span>
          Dark mode — tokens via [data-theme]
        </h2>
        <p class="test-desc">
          O componente deve adaptar cores via CSS Custom Properties quando o ancestral
          recebe <code>[data-theme="dark"]</code>. Nenhuma cor deve ser hardcoded.
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <div class="toggle-row">
              <button class="toggle-btn" @click="isDarkRisco01 = !isDarkRisco01">
                {{ isDarkRisco01 ? 'Voltar para Light Mode' : 'Ativar Dark Mode' }}
              </button>
              <span class="toggle-status">tema: <strong>{{ isDarkRisco01 ? 'dark' : 'light' }}</strong></span>
            </div>
            <div :data-theme="isDarkRisco01 ? 'dark' : 'light'" class="theme-wrapper">
              <DssCadrisCard
                :rows="mockRows"
                :pagination="paginationRisco01"
                :documento-options="documentoOptions"
                :aterro-options="aterroOptions"
                @search="handleSearch"
                @close="handleClose"
                @update:pagination="(p) => paginationRisco01 = p"
              />
            </div>
            <code>[data-theme="dark"] → tokens de cor adaptados via CSS Custom Properties</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           RISCO-02 — Fluxo completo: pesquisar → loading → resultado
           Valida: ciclo de vida completo do componente com dados reais mockados.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-risk">RISCO-02</span>
          Fluxo completo — pesquisar → loading → resultado
        </h2>
        <p class="test-desc">
          Clique em "Pesquisar" para simular o ciclo completo: loading por 2 segundos,
          depois exibe os resultados. Valida que os emits <code>@search</code> e
          <code>@update:pagination</code> funcionam corretamente.
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <p class="item-label">
              Último evento: <code>{{ lastEvent || 'nenhum' }}</code>
            </p>
            <DssCadrisCard
              :rows="fluxoRows"
              :loading="isLoadingFluxo"
              :pagination="paginationFluxo"
              :documento-options="documentoOptions"
              :aterro-options="aterroOptions"
              @search="handleFluxoSearch"
              @close="handleFluxoClose"
              @update:pagination="handleFluxoPagination"
            />
            <code>@search → loading 2s → @update:pagination</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           RISCO-03 — Paginação com janela deslizante
           Valida: visiblePages exibe até 5 páginas centralizadas na página atual.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-risk">RISCO-03</span>
          Paginação — janela deslizante de 5 páginas
        </h2>
        <p class="test-desc">
          Com muitas páginas, a paginação deve exibir uma janela deslizante de até 5 páginas
          centralizadas na página atual. Navegue pelas páginas para validar o comportamento.
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <p class="item-label">
              Página atual: <strong>{{ paginationRisco03.page }}</strong> / {{ totalPagesRisco03 }}
            </p>
            <DssCadrisCard
              :rows="mockRows"
              :pagination="paginationRisco03"
              :documento-options="documentoOptions"
              :aterro-options="aterroOptions"
              @search="handleSearch"
              @close="handleClose"
              @update:pagination="(p) => paginationRisco03 = p"
            />
            <code>rowsNumber=100, rowsPerPage=5 → 20 páginas com janela deslizante</code>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DssCadrisCard from '../../components/stress-test/DssCadrisCard/DssCadrisCard.vue'
import type { CadrisRow, CadrisPagination, CadrisFilters, SelectOption } from '../../components/stress-test/DssCadrisCard/types/cadriscard.types'

// --------------------------------------------------------------------------
// Dados mockados
// --------------------------------------------------------------------------

const mockRows: CadrisRow[] = [
  { id: 1, numeroCadri: 'CADRI-2024-001', gerador: 'Empresa Alpha Ltda', aterro: 'Aterro Beta S.A.', documento: 'CTF', situacao: 'ativo', validade: '31/12/2024' },
  { id: 2, numeroCadri: 'CADRI-2024-002', gerador: 'Indústria Gamma', aterro: 'Aterro Delta', documento: 'MTR', situacao: 'ativo', validade: '30/06/2025' },
  { id: 3, numeroCadri: 'CADRI-2024-003', gerador: 'Construtora Epsilon', aterro: 'Aterro Zeta', documento: 'CTF', situacao: 'inativo', validade: '15/03/2024' },
  { id: 4, numeroCadri: 'CADRI-2024-004', gerador: 'Petroquímica Eta', aterro: 'Aterro Theta', documento: 'MTR', situacao: 'ativo', validade: '28/02/2026' },
  { id: 5, numeroCadri: 'CADRI-2024-005', gerador: 'Logística Iota', aterro: 'Aterro Kappa', documento: 'CTF', situacao: 'ativo', validade: '31/10/2025' },
  { id: 6, numeroCadri: 'CADRI-2024-006', gerador: 'Metalúrgica Lambda', aterro: 'Aterro Mu', documento: 'MTR', situacao: 'inativo', validade: '01/01/2024' },
  { id: 7, numeroCadri: 'CADRI-2024-007', gerador: 'Fábrica Nu', aterro: 'Aterro Xi', documento: 'CTF', situacao: 'ativo', validade: '30/09/2025' },
]

const documentoOptions: SelectOption[] = [
  { label: 'CTF', value: 'CTF' },
  { label: 'MTR', value: 'MTR' },
  { label: 'CADRI', value: 'CADRI' },
]

const aterroOptions: SelectOption[] = [
  { label: 'Aterro Beta S.A.', value: 'Aterro Beta S.A.' },
  { label: 'Aterro Delta', value: 'Aterro Delta' },
  { label: 'Aterro Zeta', value: 'Aterro Zeta' },
  { label: 'Aterro Theta', value: 'Aterro Theta' },
]

// --------------------------------------------------------------------------
// OBJ-02 — Slot toolbar-actions
// --------------------------------------------------------------------------

const hasToolbarSlot = ref(true)

// --------------------------------------------------------------------------
// OBJ-03 — provide/inject disabled
// --------------------------------------------------------------------------

const paginationObj03 = ref<CadrisPagination>({ page: 1, rowsPerPage: 5, rowsNumber: 28 })
const paginationObj03b = ref<CadrisPagination>({ page: 1, rowsPerPage: 5, rowsNumber: 28 })

// --------------------------------------------------------------------------
// OBJ-04 — Estado loading
// --------------------------------------------------------------------------

const isLoadingObj04 = ref(false)
const paginationObj04 = ref<CadrisPagination>({ page: 1, rowsPerPage: 5, rowsNumber: 28 })

// --------------------------------------------------------------------------
// RISCO-01 — Dark mode
// --------------------------------------------------------------------------

const isDarkRisco01 = ref(false)
const paginationRisco01 = ref<CadrisPagination>({ page: 1, rowsPerPage: 5, rowsNumber: 28 })

// --------------------------------------------------------------------------
// RISCO-02 — Fluxo completo
// --------------------------------------------------------------------------

const isLoadingFluxo = ref(false)
const fluxoRows = ref<CadrisRow[]>(mockRows)
const lastEvent = ref('')
const paginationFluxo = ref<CadrisPagination>({ page: 1, rowsPerPage: 5, rowsNumber: 28 })

function handleFluxoSearch(filters: CadrisFilters) {
  lastEvent.value = `@search: cadri="${filters.cadri}", gerador="${filters.gerador}"`
  isLoadingFluxo.value = true
  fluxoRows.value = []
  setTimeout(() => {
    isLoadingFluxo.value = false
    fluxoRows.value = mockRows
    lastEvent.value = '@search concluído → rows atualizados'
  }, 2000)
}

function handleFluxoClose() {
  lastEvent.value = '@close emitido'
}

function handleFluxoPagination(p: CadrisPagination) {
  paginationFluxo.value = p
  lastEvent.value = `@update:pagination: page=${p.page}`
}

// --------------------------------------------------------------------------
// RISCO-03 — Paginação com janela deslizante
// --------------------------------------------------------------------------

const paginationRisco03 = ref<CadrisPagination>({ page: 1, rowsPerPage: 5, rowsNumber: 100 })
const totalPagesRisco03 = computed(() =>
  Math.ceil(paginationRisco03.value.rowsNumber / paginationRisco03.value.rowsPerPage)
)

// --------------------------------------------------------------------------
// Handlers genéricos
// --------------------------------------------------------------------------

function handleSearch(filters: CadrisFilters) {
  console.log('[TestCadrisCard] @search:', filters)
}

function handleClose() {
  console.log('[TestCadrisCard] @close')
}
</script>

<style scoped>
.test-container {
  min-height: 100vh;
  background: var(--dss-surface-default, #f5f5f5);
  font-family: Roboto, sans-serif;
}

.test-header {
  padding: 32px 40px 24px;
  border-bottom: 1px solid var(--dss-gray-200, #e5e5e5);
  background: var(--dss-surface-subtle, #fafafa);
}

.test-header h1 {
  margin: 0 0 8px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dss-text-body, #454545);
}

.test-header p {
  margin: 0 0 16px;
  color: var(--dss-text-subtle, #b0b0b0);
  font-size: 0.9375rem;
}

.stress-legend {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.8125rem;
  color: var(--dss-text-subtle, #b0b0b0);
}

.badge-obj,
.badge-risk,
.badge-info {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.badge-obj {
  background: #dbeafe;
  color: #1d4ed8;
}

.badge-risk {
  background: #fef3c7;
  color: #d97706;
}

.badge-info {
  background: #f0fdf4;
  color: #16a34a;
}

.test-content {
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.test-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.test-section h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--dss-text-body, #454545);
}

.test-desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--dss-text-subtle, #b0b0b0);
  line-height: 1.6;
}

.test-grid {
  display: grid;
  gap: 24px;
}

.test-grid--1col { grid-template-columns: 1fr; }
.test-grid--2col { grid-template-columns: repeat(2, 1fr); }

.test-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.test-item code {
  font-size: 0.75rem;
  color: var(--dss-text-subtle, #b0b0b0);
  background: var(--dss-surface-muted, #f5f5f5);
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
}

.item-label {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--dss-text-subtle, #b0b0b0);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toggle-btn {
  padding: 8px 16px;
  background: var(--dss-action-primary, #ef7a11);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.toggle-btn:hover {
  background: var(--dss-action-primary-hover, #bf590f);
}

.toggle-status {
  font-size: 0.875rem;
  color: var(--dss-text-subtle, #b0b0b0);
}

.export-btn {
  padding: 6px 12px;
  border: 1px solid var(--dss-gray-300, #d4d4d4);
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--dss-text-body, #454545);
  transition: background 0.15s;
}

.export-btn:hover {
  background: var(--dss-surface-muted, #f5f5f5);
}

.theme-wrapper {
  padding: 24px;
  border-radius: 8px;
  background: var(--dss-surface-default, #f5f5f5);
  border: 1px solid var(--dss-gray-200, #e5e5e5);
}
</style>
