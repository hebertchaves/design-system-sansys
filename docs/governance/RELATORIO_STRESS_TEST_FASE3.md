  ---
  RELATÓRIO DE AUDITORIA DSS v2.5

  DssTestPageComplexity — Fase 3 / Stress Test

  Data: 2026-04-29 | Auditor: Claude Code | Golden Context: DssCard | Golden Reference: DssChip

  ---
  🤖 MCP Gate (Fase 3 — Automático)

  validate_component_code("DssTestPageComplexity")
  → verdict: "compliant"
  → findings: []
  → Todas as 4 camadas presentes

  O MCP não detectou hardcoded values pois sua análise é estrutural. As NCs de tokens foram detectadas via análise humana
  cruzando SCSS ↔ DSS_TOKEN_REFERENCE.md.

  ---
  ❌ NÃO-CONFORMIDADES

  ---
  NC-01 — aria-label sem binding Vue no card "No prazo"

  Arquivo: 1-structure/DssTestPageComplexity.ts.vue — linha 206
  Evidência:
  <!-- ❌ Sem : → string literal -->
  aria-label="`${statusCounts.onTime} ordens no prazo`"

  <!-- As linhas 235 e 264 estão corretas com : -->
  :aria-label="`${statusCounts.expiring} ordens a vencer`"
  O atributo sem o prefixo : é tratado como string estática. Um screen reader lê o texto literal `${statusCounts.onTime} ordens
   no prazo` ao invés do número real.
  Referência normativa: WCAG 4.1.2 — Name, Role, Value
  Impacto: Informação de contagem inacessível a tecnologias assistivas; o número de ordens no prazo é inatingível via árvore de
   acessibilidade.
  Gravidade: 🔴 Bloqueante

  ---
  NC-02 — Import de DssCardSection via path inexistente

  Arquivo: 1-structure/DssTestPageComplexity.ts.vue — linha 9
  Evidência:
  // ❌ Arquivo não existe neste path
  import DssCardSection from '../../base/DssCard/DssCardSection.vue'

  // O arquivo real está em:
  // DssCard/1-structure/DssCardSection.vue
  // O correto seria importar do barrel:
  import { DssCardSection } from '../../base/DssCard'
  DssCardSection.vue não existe na raiz de DssCard/ — confirmado via ls. O arquivo está em 1-structure/. O Gate de Composição
  exige importação via wrapper ou barrel, nunca via 1-structure.
  Referência normativa: Gate de Composição — "Importação Correta: Componentes DSS DEVEM ser importados via seus wrappers na
  raiz, NUNCA via 1-structure"
  Impacto: Erro de resolução de módulo. Bundlers estritos (Vite prod, TypeScript path-check) falham. Em dev com resolução
  permissiva pode funcionar mas é silenciosamente quebrado.
  Gravidade: 🔴 Bloqueante

  ---
  NC-03 — <q-checkbox> ao invés de DssCheckbox

  Arquivo: 1-structure/DssTestPageComplexity.ts.vue — linha 442
  Evidência:
  <!-- ❌ Componente Quasar cru -->
  <q-checkbox :disable="disabled" :aria-label="`Selecionar ordem ${row.code}`" />

  <!-- ✅ Correto -->
  <DssCheckbox :disable="disabled" :aria-label="`Selecionar ordem ${row.code}`" />
  DssCheckbox existe em /DSS/components/base/DssCheckbox/ e é o Golden Context de DssRadio (componente selado). O Gate de
  Composição proíbe uso de Quasar cru quando existe equivalente DSS.
  Referência normativa: Gate de Composição — "Zero HTML Nativo Substituível" (extensível a Quasar cru); CLAUDE.md
  Impacto: Theming via data-brand não aplicado ao checkbox; propagação de disabled via provide/inject
  (PAGE_COMPLEXITY_DISABLED_KEY) ignorada; estados DSS não aplicados (hover, focus ring, dark mode).
  Gravidade: 🔴 Bloqueante

  ---
  NC-04 — style="width: 40px" — Token First violado (4 ocorrências)

  Arquivo: 1-structure/DssTestPageComplexity.ts.vue — linhas 421, 429, 441, 458
  Evidência:
  <!-- ❌ 4x no template -->
  <div class="col-auto" style="width: 40px" />
  40px = --dss-spacing-10 (confirmado no catálogo: 10rem = 160px — aguarde, spacing-10 = 2.5rem = 40px). Token correto:
  var(--dss-spacing-10). CLAUDE.md proíbe explicitamente qualquer valor hardcoded, incluindo inline styles.
  Referência normativa: CLAUDE.md — Princípio 1 — Token First
  Impacto: 4 colunas de tabela (ação e checkbox) ignoram mudanças de spacing tokens. Regressão garantida em redesign.
  Gravidade: 🔴 Bloqueante

  ---
  NC-05 — --dss-border-default não existe no catálogo de tokens

  Arquivo: 3-variants/_variant.scss — seletor &__view-toggle
  Evidência:
  // ❌ Token inexistente
  border: 1px solid var(--dss-border-default);

  // ✅ Token correto (catálogo DSS_TOKEN_REFERENCE.md, descrito como "Borda padrão")
  border: var(--dss-border-gray-300);
  Pesquisa no DSS_TOKEN_REFERENCE.md confirma: --dss-border-default não existe. O catálogo lista --dss-border-gray-300 como
  "Borda padrão". Token inexistente resulta em initial — borda do toggle de view nunca renderizada.
  Referência normativa: DSS_TOKEN_REFERENCE.md — Catálogo oficial de tokens
  Impacto: Bug visual silencioso: toggle de view não tem borda visível em runtime. O SCSS compila (CSS custom properties não
  causam erro), mas o valor é initial.
  Gravidade: 🔴 Bloqueante

  ---
  NC-06 — DssCardActions declarada em dss.meta.json mas não usada

  Arquivo: dss.meta.json — seção dependencies.dss
  Evidência:
  "dss": ["DssCard", "DssCardSection", "DssCardActions", ...]
  DssCardActions não é importada nem usada em nenhum arquivo do componente.
  Referência normativa: CLAUDE.md — Gate Documental — "API documentada ≠ API real"
  Impacto: Auditores e consumidores assumem acoplamento a DssCardActions que não existe. Tree-shaking analysis incorreto.
  Gravidade: 🟡 Não-bloqueante

  ---
  NC-07 — Slot tab-orders documentado como exposto mas não é

  Arquivos: README.md, DSSTESTPAGECOMPLEXITY_API.md
  Evidência:
  <!-- README e API Doc listam: -->
  | `tab-orders` | Conteúdo exibido nas views "Mapa" e "Agenda"... |

  <!-- Mas no template, é uso interno no DssDataCard, não um <slot name="tab-orders"> -->
  <DssDataCard ...>
    <template #tab-orders>  <!-- ← slot de DssDataCard, não de DssTestPageComplexity -->
      ...
    </template>
  </DssDataCard>
  A interface DssTestPageComplexitySlots está correta (não inclui tab-orders). Apenas a documentação humana está errada.
  Referência normativa: CLAUDE.md — Gate Documental
  Impacto: Consumidores tentando <template #tab-orders> no componente não terão o slot respondido — API prometida mas não
  entregue.
  Gravidade: 🟡 Não-bloqueante

  ---
  NC-08 — Estado interno de filtros não emitido no evento filter:search

  Arquivo: 1-structure/DssTestPageComplexity.ts.vue
  Evidência:
  // Estado capturado internamente
  const filterSetor  = ref<string | null>(null)
  const filterEquipe = ref('')
  const filterCodigo = ref('')

  // Evento sem payload
  function handleSearch() {
    emit('filter:search')  // ← consumidor não recebe os valores
  }
  O evento filter:search é declarado como (e: 'filter:search'): void — sem payload. O consumidor não tem acesso aos valores
  inseridos nos inputs. Para ser funcional, o evento deve emitir os valores, ou os filtros devem ser v-model props controladas
  externamente.
  Referência normativa: Gate de Responsabilidade — Limites Documentados; funcionalidade incompleta
  Impacto: Componente não pode ser usado em produção sem que o consumidor reimplemente os filtros. Captura de estado que
  deveria ser delegada ou emitida.
  Gravidade: 🟡 Não-bloqueante (mas bloqueia uso real)

  ---
  ⚠️ GAPS / RISCOS FUTUROS

  ---
  GAP-01 — Golden Context diverge entre pré-prompt e dss.meta.json

  Onde: pre_prompt_test_page_complexity.md declara DssDataCard e DssPageContainer; dss.meta.json declara apenas DssCard.
  Por quê: O processo de criação gerou o meta separadamente do pré-prompt sem reconciliar.
  Onde documentar: Atualizar dss.meta.json → "goldenContext": "DssDataCard" (o contexto mais específico e relevante) e
  adicionar DssPageContainer se aplicável.

  ---
  GAP-02 — id="dss-filters-panel" é ID estático

  Onde: Template — <DssCardSection id="dss-filters-panel"> + aria-controls="dss-filters-panel"
  Por quê: Em múltiplas instâncias do componente na mesma página, IDs duplicados quebram aria-controls. WCAG 2.4.1 requer IDs
  únicos.
  Onde documentar: Gerar ID único via useId() (Vue 3.5+) ou crypto.randomUUID() no setup. Documentar no API Ref.

  ---
  GAP-03 — Estrutura ARIA de tabela incompleta

  Onde: Seção de tabela no template — <div role="row"> sem container role="grid" ou role="table".
  Por quê: WCAG 1.3.1 exige que role="row" esteja dentro de role="rowgroup" dentro de role="grid" ou role="table". Sem isso, as
   células (<div> sem role="cell") e os cabeçalhos (__table-th sem role="columnheader") não formam uma estrutura semântica de
  tabela reconhecível por screen readers.
  Onde documentar: Adicionar role="grid" no container da tabela, role="rowgroup" para header e body, role="columnheader" nos
  __table-th e role="cell" nos dados.

  ---
  GAP-04 — Classes BEM no template sem definição SCSS

  Onde: dss-test-page-complexity__title-row, dss-test-page-complexity__status-row, dss-test-page-complexity__active-chips —
  usadas no template, ausentes no SCSS.
  Por quê: São puramente para layout Quasar (classes row, q-gutter-md). Sem impacto visual, mas a convenção BEM do DSS espera
  que classes do namespace do componente sejam definidas.
  Onde documentar: Ou remover as classes órfãs do template, ou adicionar entradas no L2 com comentário "layout via Quasar — sem
   override necessário".

  ---
  GAP-05 — Pré-prompt: Eixos 3 e 4 com cobertura insuficiente

  Onde: docs/governance/pre-prompts/pre_prompt_test_page_complexity.md
  Por quê: Eixo 3 (Mapeamento de API) documenta apenas 3 props (loading, brand, disabled). As 10 props de dados (statusCounts,
  tableRows, breadcrumbs, activeFilters, etc.) estão ausentes. Eixo 4 (Tokens) não lista nenhum token específico — apenas
  proíbe hardcoded. As NC-01 e NC-05 poderiam ter sido evitadas com mapeamento mais completo.
  Onde documentar: Complementar o pré-prompt retroativamente para uso como template de referência para Fase 3.

  ---
  GAP-06 — Ícone schedule semanticamente inadequado no card "Vencidas"

  Onde: Template — todos os 3 cards de status usam name="schedule".
  Por quê: schedule (relógio) é coerente para "No prazo" e "A vencer". Para "Vencidas" (feedback-error), o ícone semântico
  esperado seria error, cancel ou report. Inconsistência visual-semântica diminui a comunicação de estado crítico.
  Onde documentar: Corrigir no template; documentar a escolha de ícone por status no README.

  ---
  GAP-07 — <h1> sem nível configurável

  Onde: Template — <h1 class="dss-test-page-complexity__page-title">.
  Por quê: Componente composto que usa <h1> fixo conflita com a hierarquia de headings quando inserido em páginas que já têm
  <h1> (ex: DssHeader). WCAG 1.3.1 e 2.4.6 recomendam hierarquia de headings lógica.
  Onde documentar: Expor prop headingLevel?: 1 | 2 | 3 com default 1, usando tag dinâmica :is="\h${headingLevel}`"`.

  ---
  ✅ PONTOS CONFORMES

  1. inheritAttrs: false + v-bind="$attrs" — Implementado corretamente com duplo <script> (Options API para inheritAttrs +
  Composition API para setup). Padrão canônico DSS.
  2. provide/inject com InjectionKey tipado — provide(PAGE_COMPLEXITY_DISABLED_KEY, readonly(disabledRef)) — readonly()
  correto, tipo InjectionKey<Readonly<Ref<boolean>>> declarado. Conforme com arquitetura DSS.
  3. Brand via data-brand — :data-brand="brand || undefined" no root — propaga corretamente e suprime atributo quando ausente
  (não emite data-brand="" vazio).
  4. Regra Matryoshka respeitada — DssCard flat e DssCard bordered ao nível de página. Nenhum elevated aninhado.
  5. SCSS: Token First completo — Exceto a NC-04 e NC-05, todos os valores usam var(--dss-*). Zero hex, zero px arbitrários no
  SCSS.
  6. Skeleton shimmer — Gradiente com tokens --dss-surface-muted e --dss-surface-subtle. @keyframes com nome namespaced
  dss-skeleton-shimmer. Suprimida em prefers-reduced-motion.
  7. 4 camadas + orchestrador L2→L3→L4 — Presentes e na ordem correta. SCSS compila 341 linhas sem warnings.
  8. Dark mode, forced-colors, print, prefers-contrast, prefers-reduced-motion — Todos implementados em 4-output/_states.scss.
  forced-color-adjust: none aplicado apenas no botão ativo (correto — necessário para manter marca visual).
  9. Brands Hub/Water/Waste — 4-output/_brands.scss usa tokens semânticos com fallback para --dss-action-primary. Padrão
  conforme com DssInput (Golden Context de referência de brands).
  10. aria-busy + aria-disabled no root — Uso correto via || undefined para suprimir quando false (evita aria-busy="false"
  desnecessário).
  11. role="status" + aria-live="polite" no results label — Correto. Screen readers anunciam mudanças de paginação
  automaticamente.
  12. role="group" + aria-label no toggle de views — Padrão correto para grupo de botões relacionados.
  13. aria-pressed nos botões de view — Toggle button pattern ARIA correto. ✅
  14. role="list" + role="listitem" nos chips — Semântica correta para lista de filtros ativos.
  15. <DssButton> ao invés de <button> — Gate de Composição respeitado nos botões de ação e toggle.
  16. DssChip com prop removable — Delegação correta. O componente não implementa o botão X manualmente.
  17. Entry Point Wrapper — DssTestPageComplexity.vue é re-export puro, sem template/style/lógica.
  18. Barrel export — index.js exporta componente (named + default), PAGE_COMPLEXITY_DISABLED_KEY e composable.
  19. Composable isolado — useTestPageComplexityClasses em composables/, retorna apenas rootClasses sem lógica de negócio.
  20. Playground — 4 cenários (completo, vazio, loading, disabled) + log de eventos + toggle de dark mode funcional.

  ---
  🛠️ RECOMENDAÇÕES

  Prioridade 1 — Bloqueantes (corrigir antes de auditoria formal):

  1. NC-01 — Adicionar : ao aria-label na linha 206:
  aria-label="..." → :aria-label="\${statusCounts.onTime} ordens no prazo`"`
  2. NC-02 — Corrigir import de DssCardSection:
  import DssCardSection from '../../base/DssCard/DssCardSection.vue'
  → import { DssCardSection } from '../../base/DssCard'
  3. NC-03 — Substituir <q-checkbox> por <DssCheckbox> (importar ../../base/DssCheckbox/DssCheckbox.vue)
  4. NC-04 — Substituir 4x style="width: 40px" por classe SCSS ou token:
  Opção: criar dss-test-page-complexity__table-action com width: var(--dss-spacing-10)
  5. NC-05 — Substituir --dss-border-default por --dss-border-gray-300 (token "Borda padrão" no catálogo)

  Prioridade 2 — Não-bloqueantes (corrigir antes do merge):

  6. NC-06 — Remover DssCardActions de dss.meta.json → dependencies.dss
  7. NC-07 — Remover slot tab-orders do README e DSSTESTPAGECOMPLEXITY_API.md; clarificar que é slot interno do DssDataCard
  8. NC-08 — Definir estratégia: (a) tornar filterSetor/Equipe/Codigo props com v-model, ou (b) emitir os valores em
  filter:search, ou (c) documentar explicitamente que filtros são internos/não controlados

  Prioridade 3 — Gaps (documentar e planejar):

  9. GAP-01 — Reconciliar goldenContext entre pré-prompt e dss.meta.json
  10. GAP-02 — Implementar ID único para dss-filters-panel
  11. GAP-03 — Completar estrutura ARIA de tabela (role="grid", role="columnheader", role="cell")
  12. GAP-06 — Corrigir ícone do card "Vencidas" para error ou cancel

  ---
  📊 RESUMO EXECUTIVO

  ┌───────────────────────────────────┬─────────────────────────────────────┐
  │              Métrica              │             Quantidade              │
  ├───────────────────────────────────┼─────────────────────────────────────┤
  │ Não-conformidades bloqueantes     │ 5                                   │
  ├───────────────────────────────────┼─────────────────────────────────────┤
  │ Não-conformidades não-bloqueantes │ 3                                   │
  ├───────────────────────────────────┼─────────────────────────────────────┤
  │ Gaps / Riscos futuros             │ 7                                   │
  ├───────────────────────────────────┼─────────────────────────────────────┤
  │ Pontos conformes                  │ 20                                  │
  ├───────────────────────────────────┼─────────────────────────────────────┤
  │ Tokens inexistentes no catálogo   │ 1 (--dss-border-default)            │
  ├───────────────────────────────────┼─────────────────────────────────────┤
  │ Violações WCAG                    │ 2 (NC-01, GAP-03)                   │
  ├───────────────────────────────────┼─────────────────────────────────────┤
  │ Violações Gate de Composição      │ 2 (NC-02, NC-03)                    │
  ├───────────────────────────────────┼─────────────────────────────────────┤
  │ Violações Token First             │ 2 (NC-04, NC-05)                    │
  ├───────────────────────────────────┼─────────────────────────────────────┤
  │ Status Final                      │ 🔴 NÃO CONFORME — 5 NCs Bloqueantes │
  └───────────────────────────────────┴─────────────────────────────────────┘

  ---
  O componente não está apto a receber o Selo DSS v2.2 no estado atual. As 5 NCs bloqueantes devem ser corrigidas e o
  componente resubmetido para re-auditoria. Nenhuma das NCs exige re-arquitetura — todas são correções pontuais (binding Vue,
  import path, substituição de componente, inline style, nome de token).