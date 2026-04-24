<template>
  <div class="test-container">
    <header class="test-header">
      <h1>🃏 DssDataCard — Stress Test Fase 3</h1>
      <p>Validação dos 5 objetivos de stress + monitoramento de 3 riscos conhecidos</p>
      <div class="stress-legend">
        <span class="badge-obj">OBJ</span> Objetivo validado
        <span class="badge-risk">RISCO</span> Risco monitorado
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
          Inspecione o DOM: o elemento com <code>.dss-card</code> deve ter <code>data-testid="card-obj01"</code>.
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <DssDataCard
              title="inheritAttrs test"
              subtitle="Atributos do consumidor"
              variant="elevated"
              data-testid="card-obj01"
              style="max-width: 480px; border: 2px dashed #E31E24;"
              class="consumer-class"
            >
              <p>Conteúdo básico sem abas. Inspecione o DOM para validar <code>data-testid</code>.</p>
            </DssDataCard>
            <code>data-testid="card-obj01" + style + class → aplicados no DssCard raiz</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           OBJ-02 — Slots dinâmicos tab-{name}
           Cada aba expõe um slot nomeado `tab-{name}`.
           Valida: conteúdo de cada aba renderiza no painel correto.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-obj">OBJ-02</span>
          Slots dinâmicos — <code>tab-{name}</code>
        </h2>
        <p class="test-desc">
          Cada aba deve renderizar apenas seu slot correspondente.
          Troque de aba e verifique que o conteúdo muda corretamente.
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <DssDataCard
              v-model="activeTabObj02"
              title="Painel com Abas"
              subtitle="3 abas com slots dinâmicos"
              :tabs="tabsObj02"
              tabs-aria-label="Seções do painel"
              style="max-width: 560px"
            >
              <template #tab-resumo>
                <div class="tab-content">
                  <strong>Slot: #tab-resumo</strong>
                  <p>Aba ativa: <code>{{ activeTabObj02 }}</code></p>
                  <p>Este conteúdo só aparece na aba "Resumo".</p>
                </div>
              </template>
              <template #tab-detalhes>
                <div class="tab-content">
                  <strong>Slot: #tab-detalhes</strong>
                  <p>Este conteúdo só aparece na aba "Detalhes".</p>
                </div>
              </template>
              <template #tab-historico>
                <div class="tab-content">
                  <strong>Slot: #tab-historico</strong>
                  <p>Este conteúdo só aparece na aba "Histórico".</p>
                </div>
              </template>
            </DssDataCard>
            <code>#tab-resumo / #tab-detalhes / #tab-historico</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           OBJ-03 — provide/inject tipado (disabled sem prop drilling)
           disabled é provido no DssDataCard e injetado pelos botões de paginação.
           Valida: botões ficam desabilitados sem receber a prop diretamente.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-obj">OBJ-03</span>
          provide/inject — disabled sem prop drilling
        </h2>
        <p class="test-desc">
          Com <code>:disabled="true"</code>, todos os botões internos (paginação, refresh)
          devem ficar desabilitados sem receber a prop manualmente.
        </p>
        <div class="test-grid test-grid--2col">
          <div class="test-item">
            <p class="item-label">disabled: false (padrão)</p>
            <DssDataCard
              v-model="currentPageObj03"
              title="Lista de Registros"
              :tabs="tabsObj03"
              :total-items="47"
              :items-per-page="5"
              :disabled="false"
              style="max-width: 420px"
            >
              <template #tab-dados>
                <p>Página: <strong>{{ currentPageObj03 }}</strong> / 10</p>
              </template>
              <template #tab-grafico>
                <p>Gráfico — página {{ currentPageObj03 }}</p>
              </template>
            </DssDataCard>
            <code>:disabled="false"</code>
          </div>
          <div class="test-item">
            <p class="item-label">disabled: true → inject nos botões internos</p>
            <DssDataCard
              v-model="currentPageObj03b"
              title="Lista Desabilitada"
              :tabs="tabsObj03"
              :total-items="47"
              :items-per-page="5"
              :disabled="true"
              style="max-width: 420px"
            >
              <template #tab-dados>
                <p>Botões de paginação desabilitados via inject.</p>
              </template>
              <template #tab-grafico>
                <p>Sem interação possível.</p>
              </template>
            </DssDataCard>
            <code>:disabled="true" → provide → inject nos DssButton internos</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           OBJ-04 — CSS Variables / brand propagation
           brand="hub|water|waste" propaga via [data-brand] para DssToolbar e DssTabs
           sem passar a prop manualmente para cada filho.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-obj">OBJ-04</span>
          Brand propagation — CSS Variables sem prop drilling
        </h2>
        <p class="test-desc">
          O atributo <code>[data-brand]</code> é aplicado no DssCard raiz.
          DssToolbar e DssTabs lêem a brand via CSS sem receber a prop diretamente.
        </p>
        <div class="test-grid test-grid--3col">
          <div class="test-item">
            <p class="item-label">Hub 🟠</p>
            <DssDataCard
              title="Sansys Hub"
              subtitle="Dados operacionais"
              brand="hub"
              :tabs="tabsBrand"
              style="max-width: 320px"
            >
              <template #tab-a>
                <p>Brand <code>hub</code> propagada para toolbar e abas.</p>
              </template>
              <template #tab-b>
                <p>Sem prop drilling manual.</p>
              </template>
            </DssDataCard>
            <code>brand="hub"</code>
          </div>
          <div class="test-item">
            <p class="item-label">Water 🔵</p>
            <DssDataCard
              title="Sansys Water"
              subtitle="Gestão de recursos"
              brand="water"
              :tabs="tabsBrand"
              style="max-width: 320px"
            >
              <template #tab-a>
                <p>Brand <code>water</code> propagada para toolbar e abas.</p>
              </template>
              <template #tab-b>
                <p>Sem prop drilling manual.</p>
              </template>
            </DssDataCard>
            <code>brand="water"</code>
          </div>
          <div class="test-item">
            <p class="item-label">Waste 🟢</p>
            <DssDataCard
              title="Sansys Waste"
              subtitle="Gestão ambiental"
              brand="waste"
              :tabs="tabsBrand"
              style="max-width: 320px"
            >
              <template #tab-a>
                <p>Brand <code>waste</code> propagada para toolbar e abas.</p>
              </template>
              <template #tab-b>
                <p>Sem prop drilling manual.</p>
              </template>
            </DssDataCard>
            <code>brand="waste"</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           OBJ-05 — Loading skeleton
           Valida: skeleton renderiza no lugar do conteúdo e da paginação.
           ==================================================================== -->
      <section class="test-section">
        <h2>
          <span class="badge-obj">OBJ-05</span>
          Estado loading — skeleton loader
        </h2>
        <p class="test-desc">
          Com <code>:loading="true"</code>, o conteúdo e a paginação são ocultados
          e substituídos pelo skeleton. Use o botão para alternar.
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <div class="toggle-row">
              <button class="toggle-btn" @click="isLoadingObj05 = !isLoadingObj05">
                {{ isLoadingObj05 ? 'Simular carregamento concluído' : 'Simular carregamento' }}
              </button>
              <span class="toggle-status">loading: <strong>{{ isLoadingObj05 }}</strong></span>
            </div>
            <DssDataCard
              title="Carregando dados..."
              :loading="isLoadingObj05"
              :tabs="[{ name: 'a', label: 'Aba A' }, { name: 'b', label: 'Aba B' }]"
              :total-items="50"
              :items-per-page="10"
              style="max-width: 520px"
            >
              <template #tab-a>
                <p>Conteúdo visível após carregamento.</p>
                <p>Paginação também visível após loading.</p>
              </template>
              <template #tab-b>
                <p>Conteúdo da aba B.</p>
              </template>
            </DssDataCard>
            <code>:loading="true" → skeleton substitui conteúdo + paginação oculta</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           RISCO-01 — DssTabPanels + overflow do DssCard
           Monitorar: painéis de aba não devem vazar fora do DssCard.
           ==================================================================== -->
      <section class="test-section test-section--risk">
        <h2>
          <span class="badge-risk">RISCO-01</span>
          DssTabPanels + overflow do DssCard
        </h2>
        <p class="test-desc">
          Conteúdo longo nos painéis não deve vazar fora do DssCard.
          O card deve crescer verticalmente (sem overflow horizontal).
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <DssDataCard
              title="Conteúdo longo"
              subtitle="Teste de overflow"
              :tabs="tabsRisco01"
              style="max-width: 480px"
            >
              <template #tab-longo>
                <div>
                  <p v-for="i in 12" :key="i">
                    Linha {{ i }} de conteúdo — verificar que o card cresce verticalmente
                    e não há overflow horizontal nem vazamento para fora do card.
                  </p>
                </div>
              </template>
              <template #tab-curto>
                <p>Conteúdo curto para contraste.</p>
              </template>
            </DssDataCard>
            <code>RISCO-01: 12 linhas no painel — card deve crescer, sem overflow</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           RISCO-02 — Touch target dos botões de paginação (size="sm")
           Monitorar: botões com icon+label em size=sm devem ter ≥ 44px de touch target.
           ==================================================================== -->
      <section class="test-section test-section--risk">
        <h2>
          <span class="badge-risk">RISCO-02</span>
          Touch target — botões de paginação size=sm
        </h2>
        <p class="test-desc">
          Botões de paginação usam <code>size="sm"</code>. Inspecione a área clicável
          (via DevTools → hover) e confirme que é ≥ 44px (WCAG 2.5.5).
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <DssDataCard
              v-model="currentPageRisco02"
              title="Paginação size=sm"
              subtitle="Inspecionar touch target"
              :tabs="[{ name: 'x', label: 'Dados' }]"
              :total-items="120"
              :items-per-page="10"
              style="max-width: 560px"
            >
              <template #tab-x>
                <p>Página atual: <strong>{{ currentPageRisco02 }}</strong> de 12</p>
                <p>Inspecione o touch target dos botões de paginação abaixo.</p>
              </template>
            </DssDataCard>
            <code>RISCO-02: botões first_page/chevron em size=sm → ≥ 44px via ::before</code>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           RISCO-03 — Skeleton animation (reflow em listas longas)
           Monitorar: animação do skeleton não causa layout shift no entorno.
           ==================================================================== -->
      <section class="test-section test-section--risk">
        <h2>
          <span class="badge-risk">RISCO-03</span>
          Skeleton animation — reflow em listas longas
        </h2>
        <p class="test-desc">
          Múltiplos cards em loading simultâneo. Verifique que as animações de skeleton
          não causam layout shift (use DevTools → Performance → Layout Shift).
        </p>
        <div class="test-grid test-grid--3col">
          <div class="test-item" v-for="i in 3" :key="i">
            <DssDataCard
              :title="`Card ${i} — Carregando`"
              :loading="isLoadingRisco03"
              :tabs="[{ name: 'a', label: 'Aba' }]"
              :total-items="30"
            >
              <template #tab-a>
                <p>Conteúdo do card {{ i }}.</p>
              </template>
            </DssDataCard>
          </div>
        </div>
        <div class="toggle-row" style="margin-top: 1rem">
          <button class="toggle-btn" @click="isLoadingRisco03 = !isLoadingRisco03">
            {{ isLoadingRisco03 ? 'Revelar conteúdo (todos)' : 'Voltar ao skeleton (todos)' }}
          </button>
          <span class="toggle-status">loading: <strong>{{ isLoadingRisco03 }}</strong></span>
        </div>
        <code>RISCO-03: 3 skeletons simultâneos — monitorar layout shift via DevTools</code>
      </section>

      <!-- ====================================================================
           BÔNUS — Slot footer
           ==================================================================== -->
      <section class="test-section">
        <h2>Bônus — Slot <code>footer</code></h2>
        <p class="test-desc">
          Conteúdo no slot <code>#footer</code> aparece na base do card,
          separado do conteúdo principal.
        </p>
        <div class="test-grid test-grid--1col">
          <div class="test-item">
            <DssDataCard
              title="Card com Footer"
              subtitle="Rodapé via slot"
              variant="bordered"
              style="max-width: 480px"
            >
              <p>Conteúdo principal no slot default.</p>
              <template #footer>
                <div class="footer-demo">
                  <small>Última atualização: 24/04/2026 às 10:30</small>
                </div>
              </template>
            </DssDataCard>
            <code>#footer → renderizado no rodapé do DssCard</code>
          </div>
        </div>
      </section>

    </main>

    <footer class="test-footer">
      <p>✅ DssDataCard — Stress Test Fase 3 — Design System Sansys v2.2.0</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DssDataCard } from '../../components/base/DssDataCard'

// OBJ-02 — slots dinâmicos
const activeTabObj02 = ref('resumo')
const tabsObj02 = [
  { name: 'resumo',   label: 'Resumo',   icon: 'dashboard' },
  { name: 'detalhes', label: 'Detalhes', icon: 'list' },
  { name: 'historico',label: 'Histórico',icon: 'history' },
]

// OBJ-03 — provide/inject disabled
const currentPageObj03  = ref(1)
const currentPageObj03b = ref(1)
const tabsObj03 = [
  { name: 'dados',   label: 'Dados' },
  { name: 'grafico', label: 'Gráfico' },
]

// OBJ-04 — brand propagation
const tabsBrand = [
  { name: 'a', label: 'Principal' },
  { name: 'b', label: 'Secundário' },
]

// OBJ-05 — loading skeleton
const isLoadingObj05 = ref(true)

// RISCO-01 — overflow
const tabsRisco01 = [
  { name: 'longo', label: 'Conteúdo Longo' },
  { name: 'curto', label: 'Curto' },
]

// RISCO-02 — touch target
const currentPageRisco02 = ref(1)

// RISCO-03 — reflow
const isLoadingRisco03 = ref(true)
</script>

<style scoped>
/* ========================================
   CONTAINER PRINCIPAL
   ======================================== */
.test-container {
  padding: 0;
}

.test-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 2rem 2.5rem;
  border-bottom: 4px solid #E31E24;
}

.test-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
}

.test-header p {
  margin: 0 0 1rem 0;
  opacity: 0.8;
  font-size: 0.9375rem;
}

.stress-legend {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8125rem;
  opacity: 0.9;
}

/* ========================================
   BADGES
   ======================================== */
.badge-obj {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-right: 0.5rem;
}

.badge-risk {
  display: inline-block;
  background: #f59e0b;
  color: #1a1a1a;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-right: 0.5rem;
}

/* ========================================
   CONTENT AREA
   ======================================== */
.test-content {
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* ========================================
   SECTIONS
   ======================================== */
.test-section {
  border-left: 4px solid #3b82f6;
  padding-left: 1.5rem;
}

.test-section--risk {
  border-left-color: #f59e0b;
}

.test-section h2 {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #1a1a1a;
}

.test-desc {
  font-size: 0.875rem;
  color: #555;
  margin: 0 0 1.25rem 0;
  line-height: 1.6;
}

/* ========================================
   GRIDS
   ======================================== */
.test-grid {
  display: grid;
  gap: 1.5rem;
}

.test-grid--1col { grid-template-columns: 1fr; }
.test-grid--2col { grid-template-columns: repeat(2, 1fr); }
.test-grid--3col { grid-template-columns: repeat(3, 1fr); }

.test-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.test-item code {
  font-size: 0.75rem;
  color: #555;
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  word-break: break-word;
}

.item-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* ========================================
   TAB CONTENT
   ======================================== */
.tab-content {
  padding: 1rem 0;
}

.tab-content strong {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #E31E24;
}

/* ========================================
   TOGGLE
   ======================================== */
.toggle-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.toggle-btn {
  background: #E31E24;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: #c01920;
}

.toggle-status {
  font-size: 0.875rem;
  color: #555;
}

/* ========================================
   FOOTER DEMO
   ======================================== */
.footer-demo {
  padding: 0.75rem 1rem;
  background: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  text-align: center;
  color: #777;
}

/* ========================================
   PAGE FOOTER
   ======================================== */
.test-footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: 2rem;
}

.test-footer p {
  margin: 0;
  font-size: 0.875rem;
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 900px) {
  .test-grid--3col { grid-template-columns: 1fr; }
  .test-grid--2col { grid-template-columns: 1fr; }
  .test-content { padding: 1.5rem; }
  .test-header { padding: 1.5rem; }
}
</style>
