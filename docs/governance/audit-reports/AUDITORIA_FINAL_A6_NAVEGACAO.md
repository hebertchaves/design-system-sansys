# AUDITORIA FINAL — A6: COMPONENTES DE NAVEGAÇÃO

**Data:** 2026-06-11
**Auditor:** Agente A6 (Claude Code)
**Escopo:** 11 componentes — DssTabs, DssTab, DssTabPanels, DssTabPanel, DssRouteTab, DssBreadcrumbs, DssBreadcrumbsEl, DssMenu, DssPagination, DssStepper, DssStep
**Localização:** `packages/core/components/base/<NomeComp>/`
**Baseline normativo:** CLAUDE.md, DSS_COMPONENT_ARCHITECTURE.md, CERTIFIED_COMPONENTS.md (selos Abril/2026)

---

## 1. Veredito Consolidado

| # | Componente | Gate Estrutural | Gate Técnico | Gate Documental | A11y / Navegação | Veredito |
|---|------------|:---------------:|:------------:|:---------------:|:----------------:|:--------:|
| 1 | DssTabs | ✅ | ✅ | ⚠️ | ⚠️ (teste teclado ausente) | ✅ APROVADO c/ ressalva |
| 2 | DssTab | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| 3 | DssTabPanels | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| 4 | DssTabPanel | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| 5 | DssRouteTab | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| 6 | DssBreadcrumbs | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| 7 | DssBreadcrumbsEl | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| 8 | DssMenu | ✅ | ✅ | ✅ | ⚠️ (focus trap não implementado; teste teclado ausente) | ✅ APROVADO c/ ressalva |
| 9 | DssPagination | ✅ | ✅ | ⚠️ (visualProperties) | ⚠️ (teste teclado ausente; aria por botão delegado) | ✅ APROVADO c/ ressalva |
| 10 | DssStepper | ✅ | ✅ | ✅ | ⚠️ (teste teclado ausente) | ✅ APROVADO c/ ressalva |
| 11 | DssStep | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |

**Resultado global: ✅ APROVADO (11/11) — nenhuma falha bloqueante; 6 ressalvas não-bloqueantes (testes de teclado e itens documentais).**

---

## 2. Gate Estrutural — Detalhe

Verificação em lote (ls/grep) de todos os arquivos obrigatórios.

| Item | Tabs | Tab | TabPanels | TabPanel | RouteTab | Breadcrumbs | BreadcrumbsEl | Menu | Pagination | Stepper | Step |
|------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| `1-structure/Dss<C>.ts.vue` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `2-composition/_base.scss` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `3-variants/index.scss` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `4-output/` (_states, _brands, index) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Wrapper re-export puro | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `module.scss` ordem L2→L3→L4 | ✅ | ✅ | ✅ | ✅ | ✅* | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Barrel export (comp+types+composables) | ✅ (.ts) | ✅ | ✅ (.ts) | ✅ (.ts) | ✅ (.ts) | ✅ (.ts) | ✅ (.ts) | ✅ | ✅ | ✅ | ✅ |
| `dss.meta.json` (golden/preview/demoSlots) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Dss<C>.test.js` | ✅ 22 its | ✅ 21 | ✅ 22 | ✅ 19 | ✅ 27 | ✅ 19 | ✅ 21 | ✅ 14 | ✅ 19 | ✅ 28 | ✅ 24 |

Evidências:
- **Wrappers**: todos os 11 são re-exports puros (`import Dss<C> from './1-structure/Dss<C>.ts.vue'; export default`) — sem template, style ou lógica. Conforme Princípio #11.
- **Orquestradores**: todos importam L2 → L3 → L4 com `@use` nessa ordem exata. Zero ocorrências de `@import` (Princípio #2 OK).
- **\*DssRouteTab**: `DssRouteTab.module.scss` adicionalmente importa `../DssTab/DssTab.module` antes das camadas próprias — decisão arquitetural documentada no próprio arquivo (compartilhamento da classe `.dss-tab`, deduplicação por bundler). Não viola a ordem L2→L3→L4 das camadas próprias.
- **Barrel export**: 6 componentes usam `index.ts` em vez de `index.js` (DssTabs, DssTabPanels, DssTabPanel, DssRouteTab, DssBreadcrumbs, DssBreadcrumbsEl). Funcionalmente equivalente — todos exportam componente + types + composables. **Observação de padronização** (não-bloqueante): unificar extensão do barrel no monorepo.
- **dss.meta.json**: todos os 11 declaram `goldenReference`, `goldenContext`, `previewGroup` e `defaultPreview.demoSlots`. Golden Contexts coerentes (ex.: DssRouteTab → goldenReference DssTab; DssStep → goldenContext DssTabs).
- **Testes**: nenhum stub — 14 a 28 casos por arquivo, com asserções reais sobre props, classes, slots e eventos.

---

## 3. Gate Técnico — Detalhe

### 3.1 Token First (valores hardcoded)

Grep de `px|rem|hex|rgb` em todas as camadas SCSS dos 11 componentes. **Únicas ocorrências fora de comentários:**

| Arquivo | Linha(s) | Valor | Classificação |
|---------|----------|-------|---------------|
| `DssTabPanels/4-output/_states.scss` | 51 | `border: 1px solid ButtonText` | ✅ Exceção forced-colors (system keyword WCAG) |
| `DssTabPanel/4-output/_states.scss` | 36 | `border: 1px solid ButtonText` | ✅ EXC-02 documentada no próprio arquivo |
| `DssBreadcrumbsEl/4-output/_states.scss` | 57–58 | `outline: 2px solid ButtonText` | ✅ Exceção forced-colors |
| `DssMenu/4-output/_states.scss` | 75 | `border: 1px solid ButtonText` | ✅ Exceção forced-colors |
| `DssStepper/4-output/_states.scss` | 70–72 | `#fff/#000 !important` | ✅ EXC-03 — `@media print`, precedente DssStep/DssTab/DssHeader |
| `DssStep/4-output/_states.scss` | 177–187 | `#fff/#000 !important` | ✅ EXC-04 — `@media print`, monocromático |

Todas são exceções legítimas e documentadas inline (forced-colors exige system keywords; print exige monocromático). **Nenhuma violação real de Token First.**

### 3.2 Brandabilidade (`[data-brand]`)

| Componente | Ocorrências `data-brand` em `_brands.scss` | Status |
|------------|:--:|--------|
| DssTabs 9 · DssTab 4 · DssTabPanels 3 · DssTabPanel 8 · DssBreadcrumbs 7 · DssBreadcrumbsEl 6 · DssMenu 1 · DssPagination 8 · DssStepper 9 · DssStep 4 | — | ✅ Todos reagem a hub/water/waste |
| DssRouteTab | 1 (somente comentário) | ✅ Conforme — brands herdados integralmente do `DssTab._brands.scss` via classe compartilhada `.dss-tab` (decisão documentada no arquivo) |

### 3.3 Pseudo-elementos (`::before` reservado para touch target)

- Zero usos de `::before` para efeito visual em código DSS. DssTab e DssStep usam `::after` para overlays hover/active (comentário explícito: "::before reservado para touch target").
- **Única ocorrência**: `DssStepper/2-composition/_base.scss:57` — `.dss-stepper .q-stepper--vertical .q-stepper__step-inner::before { border-color: var(--dss-gray-300) }`. Trata-se de **estilização de pseudo-elemento gerado pelo Quasar** (linha conectora do modo vertical), não criação de `::before` DSS para efeito visual. Documentado inline como fallback. **Conforme** (a convenção governa pseudo-elementos criados pelo DSS).

### 3.4 brightness()

Zero ocorrências de `brightness()` nos 11 componentes. ✅ N/A — sem risco de valores não-canônicos.

### 3.5 Cores via Vue (não no SCSS)

Cores aplicadas via tokens semânticos (`--dss-action-primary`, `--dss-text-body`, `--dss-feedback-success`) e computed classes nos composables (`use<C>Classes.ts` presente em todos os 11). Nenhum `_colors.scss` por componente. ✅

---

## 4. Verificações Específicas de Navegação

### 4.1 DssRouteTab — Integração Vue Router ✅
- `1-structure/DssRouteTab.ts.vue`: expõe e repassa `:to`, `:exact`, `:replace` (+ `href`, `target`) ao `QRouteTab` (linhas 54–56), que implementa `RouterLink` internamente.
- `types/route-tab.types.ts`: `to?: string | Record<string, unknown>`, `exact?: boolean`, `replace?: boolean` — tipados e documentados como equivalentes ao RouterLink.
- `DssRouteTab.test.js`: cobre `to` como string e como objeto de rota, `exact`, `replace` (describe "Props de roteamento", linhas 172+), com router stubs.

### 4.2 DssMenu — Teleport e Cascade Layers ✅ (estratégia correta)
- QMenu teleporta o conteúdo para `<body>` — documentado em `1-structure/DssMenu.ts.vue` e `dss.meta.json` (`teleportBehavior`).
- Estratégia DSS: o CSS do DssMenu é carregado **globalmente e unlayered** via `packages/core/components/index.scss:67` (`@forward 'base/DssMenu/DssMenu.module'`), escopado por `.dss-menu`. Estilos scoped seriam ineficazes (comentário normativo no orquestrador).
- O CSS do Quasar é servido dentro de `@layer quasar` (`apps/sandbox/index.html:11` → `/quasar-layered.css`). Conforme Princípio #13: **DSS unlayered vence Quasar layered mesmo no conteúdo teleportado** — não há vazamento de tokens. O `!important` do `.q-menu { background: #fff }` é neutralizado (EXC-01 documentada em `_base.scss:41`).
- ✅ Resposta à pergunta da auditoria: o CSS de teleport **não está** em `@layer` — e é exatamente isso que a norma exige (CSS DSS nunca é layered).

### 4.3 DssPagination — Tokens de tamanho ✅
- `2-composition/_base.scss`: `min-width/min-height: var(--dss-compact-control-height-md)` (base, linhas 25–26) e variantes `xs/sm/lg` (linhas 57–70). Zero alturas hardcoded. Conforme Princípio #7.

### 4.4 DssStepper/DssStep — Estado ativo via token ✅
- `DssStep/2-composition/_base.scss:125–135`: `&.q-stepper__step--active` → `background-color: var(--dss-action-primary)`, `color: var(--dss-text-inverse)`, `font-weight: var(--dss-font-weight-medium)`. Estados done/error usam `--dss-feedback-success`/`--dss-feedback-error`. Nenhuma cor direta.

---

## 5. Acessibilidade Crítica

| Verificação | Resultado | Evidência |
|-------------|-----------|-----------|
| DssTabs/DssTab: `role="tablist"/"tab"` | ✅ via delegação Quasar | QTabs/QTab renderizam roles nativamente; DssTabs repassa `:aria-label` ao `q-tabs` (`DssTabs.ts.vue:116`); DssTab estiliza `&[aria-selected='true']` (`_base.scss:105`), comprovando contrato ARIA ativo |
| DssBreadcrumbs: `aria-label` | ✅ | `<nav role="navigation">` via QBreadcrumbs + `aria-label="Breadcrumbs"` default, sobrescritível via `$attrs` (`DssBreadcrumbs.ts.vue:103–104`); README dedica seção "Regra de Ouro: aria-current=page" |
| DssMenu: focus trap quando aberto | ⚠️ **NÃO implementado** | `dss.meta.json:48`: `"no-focus": "Não transfere foco ao abrir"`. Fechamento por ESC e restauração de foco são delegados ao QMenu (comportamento default Quasar), mas não há trap explícito nem teste. Risco WCAG 2.1.2 mitigado pelo Quasar, não verificado pelo DSS |
| DssPagination: `aria-label` por botão de página | ⚠️ delegado | Root tem `role="navigation"` + `:aria-label` (default "Navegação por páginas", `DssPagination.ts.vue:25–26`). Labels individuais dos botões são gerados internamente pelo QPagination — não verificados por teste DSS |

---

## 6. Estado Ativo — Risco Visual

| Verificação | Resultado | Evidência |
|-------------|-----------|-----------|
| DssTab ativo via token | ✅ | `DssTab/2-composition/_base.scss:104–108`: `&.q-tab--active, &[aria-selected='true'] { color: var(--dss-action-primary); font-weight: var(--dss-font-weight-medium) }`. Nota: o vocabulário de token efetivo do DSS para indicação ativa é `--dss-action-primary` (semântico), não `--dss-color-surface-*` — atende ao requisito de "token, não cor hardcoded" |
| DssBreadcrumbsEl estado current | ✅ | `_base.scss:60–66`: `.dss-breadcrumbs-el--current { color: var(--dss-text-body); font-weight: var(--dss-font-weight-semibold); cursor: default; pointer-events: none }`. `aria-current="page"` injetado pelo pai DssBreadcrumbs (documentado em `DssBreadcrumbsEl.ts.vue:16`) |

---

## 7. Testes de Acessibilidade por Teclado ⚠️ ALERTA

Grep `keydown|ArrowLeft|ArrowRight|Escape|keyboard` nos `.test.js`:

| Componente | Cobertura de teclado no .test.js | Status |
|------------|----------------------------------|--------|
| DssTabs | **Ausente** — nenhum teste de ArrowLeft/ArrowRight (delegação ao QTabs apenas comentada) | ⚠️ |
| DssMenu | **Ausente** — nenhum teste de Enter/ESC | ⚠️ |
| DssPagination | **Ausente** — nenhum teste de navegação por Tab | ⚠️ |
| DssStepper | **Ausente** — apenas comentário "(q-stepper) gerencia keyboard navigation" (`test.js:18`) | ⚠️ |

**Alerta WCAG 2.1.1 (não-bloqueante):** a navegação por teclado é delegada ao Quasar e documentada, porém **não há nenhum teste de regressão** que detecte quebra dessa delegação (ex.: upgrade do Quasar). Recomendação: adicionar suíte mínima de teclado nos 4 componentes (trigger `keydown` + asserção de mudança de modelo/foco).

---

## 8. Gate Documental

| Item | Resultado |
|------|-----------|
| README.md presente nos 11 | ✅ |
| API completa | ✅ com ressalva — padrão do projeto distribui API completa em `DSS<COMP>_API.md` (presente nos 11); READMEs de DssTabs, DssPagination e DssStepper não trazem seções explícitas de Slots/Events/Tokens (linkam para a doc completa). Piso mínimo atendido pelo conjunto README + *_API.md + *.md normativo |
| example.vue ≥ 3 cenários | ✅ todos — mínimo encontrado: 5 (DssMenu: 5 seções; DssPagination: 6 exemplos; DssStep: 5 blocos; demais 5–7+) |
| `visualProperties` reflete o CSS | ✅ com 1 ressalva (abaixo) |

**Ressalva documental — DssPagination `dss.meta.json`:**
- Entrada `"item width × height": 32px × 32px` com `token: null` e `source: "Seção 13.24"`:
  1. O CSS real usa `var(--dss-compact-control-height-md)` (`_base.scss:25–26`) — o campo deveria citar o token, não `null`;
  2. `source` referencia seção de documento externo, violando o Princípio #12 ("o campo source DEVE referenciar o arquivo CSS de origem").
- Correção sugerida: `token: "--dss-compact-control-height-md"`, `source: "2-composition/_base.scss"`, seguida de `npm run sync:visual-contract`.

---

## 9. Resumo de Ressalvas (todas não-bloqueantes)

| # | Severidade | Componente(s) | Descrição | Ação recomendada |
|---|-----------|----------------|-----------|------------------|
| R1 | ⚠️ Média | DssTabs, DssMenu, DssPagination, DssStepper | Ausência total de testes de teclado (WCAG 2.1.1) — delegação ao Quasar sem regressão | Adicionar testes `keydown` (Arrow/Enter/ESC/Tab) |
| R2 | ⚠️ Média | DssMenu | Sem focus trap próprio; comportamento ESC/foco delegado ao QMenu sem verificação | Documentar formalmente a delegação no *_API.md + teste de ESC |
| R3 | ⚠️ Baixa | DssPagination | `visualProperties` com `token: null` e `source` apontando para doc externo (viola Princípio #12) | Corrigir meta + `sync:visual-contract` |
| R4 | ⚠️ Baixa | DssPagination | aria-label por botão de página delegado ao QPagination sem teste | Teste de presença de `aria-label` nos `.q-btn` internos |
| R5 | ℹ️ Info | 6 componentes | Barrel `index.ts` vs. `index.js` (CLAUDE.md cita `index.js`) — funcionalmente equivalente | Padronizar extensão no monorepo |
| R6 | ℹ️ Info | DssTabs, DssPagination, DssStepper | README sem seções explícitas Slots/Events/Tokens (conteúdo está no *_API.md) | Adicionar seções-resumo ou declarações explícitas de ausência |

---

## 10. Conclusão

Os 11 componentes de navegação **passam integralmente nos Gates Estrutural e Técnico**: arquitetura de 4 camadas completa, wrappers puros, ordem L2→L3→L4, Token First sem violações reais (apenas exceções documentadas de forced-colors e print), brandabilidade hub/water/waste, `::before` reservado, zero `brightness()` e zero `@import`.

A integração com Vue Router (DssRouteTab) está correta e testada; o isolamento do conteúdo teleportado do DssMenu segue exatamente o Princípio #13 (DSS unlayered × Quasar em `@layer quasar`); DssPagination e DssStepper/DssStep usam exclusivamente tokens DSS para tamanhos e estado ativo.

A lacuna sistêmica é a **ausência de testes de teclado** nos 4 componentes onde isso é crítico — risco real de regressão silenciosa em upgrades do Quasar, recomendado endereçar antes do próximo ciclo de selo.

**Veredito final: ✅ APROVADO (11/11), com 6 ressalvas não-bloqueantes registradas.**
