# AUDITORIA FINAL A5 — Componentes de Estrutura de Página (Layout)

**Data:** 2026-06-10
**Auditor:** Agente A5 (Claude Code)
**Escopo:** DssLayout, DssPage, DssPageContainer, DssPageSticky, DssPageScroller, DssHeader, DssFooter, DssDrawer, DssToolbar, DssToolbarTitle, DssBar
**Baseline normativo:** CLAUDE.md, DSS_ARCHITECTURE.md, DSS_MONOREPO_PATH_MAP.md, CERTIFIED_COMPONENTS.md
**Modelo Golden:** Golden References e Golden Contexts declarados em cada `dss.meta.json` (verificados — ver tabela)

---

## 1. Veredicto Geral

| # | Componente | Gate Estrutural | Gate Técnico | Gate Documental | Veredicto |
|---|------------|:---------------:|:------------:|:---------------:|-----------|
| 1 | DssLayout | ✅ | ⚠️ (NC-A5-01) | ⚠️ (slots/events ausentes no README) | ⚠️ RESSALVA |
| 2 | DssPage | ✅ | ⚠️ (NC-A5-01) | ✅ | ⚠️ RESSALVA |
| 3 | DssPageContainer | ✅ | ✅ | ✅ | ✅ APROVADO |
| 4 | DssPageSticky | ✅ | ⚠️ (NC-A5-01) | ⚠️ (status meta "in-progress" × CERTIFIED selado 23/04) | ⚠️ RESSALVA |
| 5 | DssPageScroller | ✅ | ⚠️ (NC-A5-01) | ⚠️ (status meta "in-progress" × CERTIFIED selado 26/04) | ⚠️ RESSALVA |
| 6 | DssHeader | ✅ | ⚠️ (NC-A5-01; GAP-03 NÃO resolvido) | ⚠️ (sealDate ausente no meta) | ⚠️ RESSALVA |
| 7 | DssFooter | ✅ | ⚠️ (NC-A5-01; EXC-05 sombra hardcoded) | ⚠️ (sealDate ausente no meta) | ⚠️ RESSALVA |
| 8 | DssDrawer | ✅ | ⚠️ (NC-A5-01) | ⚠️ (status meta "pending-audit" × CERTIFIED selado 20/04; preview aberto) | ⚠️ RESSALVA |
| 9 | DssToolbar | ✅ | ✅ | ⚠️ (example não compõe com DssToolbarTitle; previewGroup "cartoes") | ⚠️ RESSALVA |
| 10 | DssToolbarTitle | ✅ | ✅ | ⚠️ (previewGroup "cartoes") | ⚠️ RESSALVA |
| 11 | DssBar | ✅ | ✅ | ⚠️ (README sem seções Props/Slots/Events estruturadas) | ⚠️ RESSALVA |

**Resultado:** Nenhuma reprovação estrutural. **1 NC técnica sistêmica (NC-A5-01)** afeta 7 componentes e é a continuação direta do **GAP-03 escalado** na auditoria do DssHeader — permanece em aberto. Demais achados são documentais (não-bloqueantes).

---

## 2. Gate Estrutural — Evidências (11/11 ✅)

Verificado por varredura em lote (`ls`/teste de existência) em `/mnt/c/Users/hebert.chaves/DSS/packages/core/components/base/<Comp>/`:

| Item | Resultado |
|------|-----------|
| `1-structure/Dss<Comp>.ts.vue` | ✅ 11/11 |
| `2-composition/_base.scss` | ✅ 11/11 |
| `3-variants/index.scss` | ✅ 11/11 |
| `4-output/_states.scss` + `_brands.scss` + `index.scss` | ✅ 11/11 |
| `Dss<Comp>.vue` re-export puro (sem template/style/lógica) | ✅ 11/11 — todos os wrappers verificados linha a linha |
| `Dss<Comp>.module.scss` importa L2 → L3 → L4 nessa ordem (via `@use`) | ✅ 11/11 |
| Barrel export (componente + types + composables) | ⚠️ ver notas abaixo |
| `dss.meta.json` com goldenReference, goldenContext, previewGroup, defaultPreview.demoSlots | ✅ 11/11 |
| `Dss<Comp>.test.js` | ✅ 11/11 (9 a 41 testes por componente) |
| SCSS compila (`npx sass`) | ✅ amostra: DssLayout, DssDrawer, DssToolbar, DssBar, DssPageSticky — todos OK |

**Notas estruturais (não-bloqueantes):**
- **Barrel `index.ts` em vez de `index.js`:** DssPageSticky, DssPageScroller, DssBar. Conteúdo conforme (componente + composable + types). Desvio apenas de extensão de arquivo.
- **Barrel bypassa o wrapper:** `DssLayout/index.js`, `DssHeader/index.js` e `DssDrawer/index.js` importam diretamente de `./1-structure/Dss*.ts.vue` em vez de `./Dss*.vue` (o wrapper existe mas não é o ponto de exportação). Funcionalmente equivalente; desvio do formato canônico do Princípio #11.
- **Types não exportados no barrel:** DssLayout, DssHeader e DssDrawer não fazem `export * from './types/...'` (DssFooter faz). Ressalva de completude do barrel.

---

## 3. Gate Técnico — Evidências

### 3.1 NC-A5-01 (SISTÊMICA) — `@import` em blocos `<style>` + dupla carga de CSS

**Severidade:** Média-alta (normativa + risco de produção). **Status: continuação do GAP-03 do DssHeader ("escalado para Chat Estratégico", CERTIFIED_COMPONENTS.md linha 57) — NÃO resolvido.**

Dois mecanismos de carga de CSS coexistem:

1. **Via `<style>` no SFC com `@import` (PROIBIDO pelo Princípio #2 e pelo checklist do DSS_MONOREPO_PATH_MAP.md, linha 139: "Nenhum arquivo `.scss` ou bloco `<style>` do componente usa `@import`?"):**
   - `DssLayout/1-structure/DssLayout.ts.vue:84` → `@import '../DssLayout.module.scss';`
   - `DssPage/1-structure/DssPage.ts.vue:80`
   - `DssPageSticky/1-structure/DssPageSticky.ts.vue:90`
   - `DssPageScroller/1-structure/DssPageScroller.ts.vue:126`
   - `DssHeader/1-structure/DssHeader.ts.vue:55`
   - `DssFooter/1-structure/DssFooter.ts.vue:55`
   - `DssDrawer/1-structure/DssDrawer.ts.vue:150`
2. **Via orquestrador global** `packages/core/components/index.scss` (linhas 55, 84–85, 109–116): **todos os 11 módulos** são `@forward`-ados.

**Consequências:**
- Os 7 componentes do item 1 têm seu CSS carregado **duas vezes** em builds que consomem `index.scss` (duplicação de regras no bundle; risco de divergência de ordem de cascata entre dev e produção — crítico justamente em componentes de layout global).
- DssToolbar, DssToolbarTitle, DssBar e DssPageContainer **não possuem** bloco `<style>` (dependem só do index global) — exatamente a inconsistência sistêmica apontada pelo GAP-03.

**Recomendação:** decisão única de governança — ou todo componente carrega via index global (remover `<style>` dos 7) ou todo SFC carrega seu próprio módulo via `@use` (remover `@forward` do index). Migrar os `@import` remanescentes para `@use`.

### 3.2 Token First (`_base.scss`) — ✅ 11/11

`grep -E '[0-9]+(px|rem)|#hex|rgba?\('` em todos os `_base.scss`: **limpo** (ocorrências encontradas eram comentários explicativos). Única exceção real:
- `DssDrawer/2-composition/_base.scss:44` → `background: rgba(0, 0, 0, var(--dss-opacity-backdrop, 0.75))` — **opacidade via token** (`--dss-opacity-backdrop` existe em `packages/core/tokens/semantic/_opacity.scss:36` e DSS_TOKEN_REFERENCE.md:642). Base preta documentada como EXC-04 no meta. **Conforme com ressalva documentada.**

### 3.3 Hardcoded em L3/L4 — todos dentro de exceções documentadas

- `@media (forced-colors: active)`: system colors (`Canvas`, `CanvasText`, `ButtonFace`, `ButtonText`) e `rgba(0,0,0,0.75)` no backdrop do Drawer — **obrigatórios nesse contexto** (tokens CSS são ignorados pelo navegador). EXCs registradas (Drawer EXC-05, Header EXC-03, etc.).
- `@media print`: `#fff`/`#000` canônicos para impressão (EXC-03/EXC-06 documentados) em DssLayout, DssPage, DssPageContainer, DssHeader, DssFooter, DssDrawer, DssToolbar.
- ⚠️ `DssFooter/3-variants/_elevated.scss:20` → `box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.30)` — **fora de media query**, hardcoded. Já registrado em CERTIFIED_COMPONENTS.md como "EXC-05: sombra upward pendente token". **Pendência conhecida, ainda não tokenizada.**

### 3.4 Pseudo-elementos, brightness, z-index, position — ✅

- `::before`: **nenhuma ocorrência** nos 11 componentes (todos não-interativos, sem touch target próprio). ✅
- `brightness()`: **nenhuma ocorrência**. ✅
- **z-index:** nenhum valor hardcoded em CSS DSS. `DssPageSticky/2-composition/_base.scss:21` e `DssPageScroller/2-composition/_base.scss:27` usam `z-index: var(--dss-z-index-sticky)` (token = 1020, definido em `tokens/semantic/_z-index.scss:27`). Único literal: `z-index: auto !important` em `@media print` (neutralização, válido). ✅
- **position: fixed:** nenhum CSS DSS declara `position: fixed` — o posicionamento fixo vem do QPageSticky/QFooter/QDrawer do Quasar (referências apenas em comentários). Em `@media print`, DssFooter e DssDrawer aplicam `position: static` para neutralizar o fixed do Quasar. ✅
- **`@layer`:** nenhuma ocorrência nos SCSS dos 11 componentes — CSS DSS permanece unlayered, conforme Princípio #13. `position: fixed` do QPageSticky dentro de `@layer quasar` não é afetado por layering (declarações de posicionamento dentro de layer aplicam normalmente quando não sobrescritas); o `z-index` tokenizado do DSS (unlayered) prevalece sobre o `z-index: 1000` do Quasar. **Sem risco de quebra identificado.** DssPageSticky não usa `position: sticky` próprio. ✅

### 3.5 Brand Reactivity (`_brands.scss`)

| Componente | data-brand refs | Regras reais | Avaliação |
|------------|:---:|:---:|-----------|
| DssToolbar | 5 | 15 linhas | ✅ Reage a `[data-brand="hub\|water\|waste"]` |
| DssBar | 4 | 25 linhas | ✅ Reage |
| DssToolbarTitle | 2 (comentários) | 0 | ✅ Delegação documentada |
| DssHeader | 1 (comentário) | 0 | ⚠️ **Delegação intencional documentada** — brand é responsabilidade do DssToolbar interno (arquivo todo-comentado explica o racional) |
| DssFooter | 1 (comentário) | 0 | ⚠️ Idem (delegação ao DssToolbar) |
| DssDrawer | 1 (comentário) | 0 | ⚠️ Idem (delegação a DssList/DssItem; alinhado ao Golden Context DssHeader) |
| DssLayout / DssPage / DssPageContainer / DssPageSticky / DssPageScroller | 0–2 (comentários) | 0 | ✅ Containers agnósticos de brand (documentado) |

**Veredicto:** DssHeader/DssFooter/DssDrawer **não reagem diretamente** a `[data-brand]` — modelo de **transparência de marca** explicitamente documentado nos próprios `_brands.scss` e com precedente aceito em selo (DssStepper: "_brands.scss all-commented = INTENCIONAL", CERTIFIED_COMPONENTS.md linha 65). Não é NC; é decisão arquitetural registrada.

### 3.6 Cores via classes utilitárias no Vue — ✅

Nenhuma cor de identidade aplicada em SCSS fora das exceções acima; brands aplicadas via `[data-brand]` + tokens (Toolbar/Bar) ou delegadas a filhos com classes utilitárias.

---

## 4. Gate Documental — Evidências

| Componente | README API | example.vue (≥3 cenários) | meta.visualProperties |
|------------|-----------|---------------------------|----------------------|
| DssLayout | ⚠️ Props ✅, Slots/Events sem seção própria | ✅ 3 exemplos (EXC-01 documentado: usa q-page-container nativo) | ⚠️ 2 itens (mínimo) |
| DssPage | ✅ Props/Slots/Events | ✅ 3 cenários | ⚠️ 2 itens |
| DssPageContainer | ✅ Props/Slots/Events | ✅ 4 cenários | ⚠️ 2 itens |
| DssPageSticky | ⚠️ Slots/Events sem seção | ✅ 17 menções a cenários | ⚠️ 2 itens |
| DssPageScroller | ⚠️ Slots/Events sem seção; sem seção de tokens | ✅ 3 cenários | ⚠️ 2 itens |
| DssHeader | ✅ | ✅ ≥3 (Básico, Elevated, Bordered…) | ✅ 8 itens, source referenciando SCSS |
| DssFooter | ✅ | ✅ ≥3 | ✅ 4 itens |
| DssDrawer | ✅ | ✅ 5 seções | ⚠️ 9 itens, mas entradas com `token: null, value: null` (ex.: min-height) |
| DssToolbar | ✅ | ✅ 6 exemplos | ✅ 8 itens |
| DssToolbarTitle | ✅ | ✅ 5 cenários | ✅ 4 itens |
| DssBar | ⚠️ Sem headings Props/Slots/Events | ✅ 6 cenários | ✅ 7 itens |

**Inconsistências meta × CERTIFIED_COMPONENTS.md (DOC-A5-01):**

| Componente | dss.meta.json `status` | CERTIFIED_COMPONENTS.md | Divergência |
|------------|------------------------|--------------------------|-------------|
| DssDrawer | `pending-audit` | Selado 20/04/2026 | ❌ meta desatualizado |
| DssPageSticky | `in-progress` | Selado 23/04/2026 | ❌ meta desatualizado |
| DssPageScroller | `in-progress` | Selado 26/04/2026 | ❌ meta desatualizado |
| DssHeader / DssFooter / DssToolbar | `sealed` sem `sealDate` | 17–18/04 e 16/04/2026 | ⚠️ campo ausente |
| DssBar | `conformant` | Listado 20/05/2026 | ⚠️ vocabulário de status não-canônico |

**previewGroup:** DssToolbar e DssToolbarTitle declaram `"cartoes"` e DssBar declara `"banners"` — os demais 8 declaram `"layout"`. Avaliar se a classificação de preview é intencional (Toolbar pode aparecer em cards) ou resíduo de scaffold.

---

## 5. Verificações Específicas de Layout

| Verificação | Resultado | Evidência |
|-------------|-----------|-----------|
| DssLayout wraps QLayout? | ✅ SIM | `1-structure/DssLayout.ts.vue:73` — `<q-layout>` como elemento raiz; EXC-01 documenta provide/inject (não pode ser envolvido em `<div>`) |
| DssDrawer fechado por default no preview? | ❌ **NÃO** | `dss.meta.json → defaultPreview.props.modelValue = true` (com `persistent: true, width: 150`). O esperado era `modelValue: false`. Obs.: o campo está em `defaultPreview.props`, não em `demoSlots` (demoSlots contém apenas o slot `default` com 3 DssItem). O drawer renderiza **aberto** no preview, envolto em `wrapIn: DssLayout` com altura 80px — decisão aparentemente intencional para visibilidade no sandbox, mas diverge do critério da auditoria. **Flag para decisão de governança.** |
| DssHeader GAP-03 resolvido? | ❌ **NÃO** | CERTIFIED_COMPONENTS.md:57 — "GAP-03 escalado". GAP-03 = inconsistência sistêmica de carga de CSS (DssToolbar/DssTabs sem bloco `<style>`), conforme `docs/Compliance/seals/DssHeader/DSSHEADER_SELO_v2.2.md:51,77`. A inconsistência **persiste**: DssToolbar, DssToolbarTitle, DssBar e DssPageContainer continuam sem `<style>` enquanto 7 componentes carregam via `@import` no SFC **e** todos os 11 são `@forward`-ados no index global (ver NC-A5-01). |
| DssPageSticky meta + previewGroup? | ✅ | `dss.meta.json` existe; `previewGroup: "layout"`; goldenReference DssBadge, goldenContext DssHeader |
| DssToolbar + DssToolbarTitle juntos no example? | ⚠️ PARCIAL | `DssToolbarTitle.example.vue` usa `<dss-toolbar>` + `<dss-toolbar-title>` juntos ✅; `DssToolbar.example.vue` **não usa** DssToolbarTitle em nenhum dos 6 exemplos (usa texto/botões diretos) — recomenda-se adicionar ao menos 1 cenário composto |
| Drawer backdrop com token de opacidade? | ✅ | `2-composition/_base.scss:44` — `rgba(0, 0, 0, var(--dss-opacity-backdrop, 0.75))`; token canônico (DSS_TOKEN_REFERENCE.md:642). Exceção: forced-colors usa 0.75 literal (EXC documentada, obrigatório no contexto) |
| position:fixed / z-index hardcoded? | ✅ NENHUM | z-index só via `var(--dss-z-index-sticky)`; position:fixed só no Quasar interno (neutralizado com `position: static` em print) |
| PageSticky × @layer | ✅ SEM RISCO | Nenhum `@layer` no CSS dos componentes (DSS unlayered, Princípio #13); QPageSticky usa `position: fixed` (não sticky) dentro do layer Quasar — comportamento de posicionamento não é alterado por cascade layers; precedência DSS garantida para overrides |

---

## 6. Acessibilidade por Teclado — DssDrawer

| Verificação | Resultado |
|-------------|-----------|
| `grep -n "Escape\|keydown\|keyboard\|esc" DssDrawer.test.js` | **Nenhuma ocorrência** |
| Cobertura do test.js (18 testes) | useDrawerClasses, contratos de tipos, comportamentos implícitos — **sem testes de teclado** |

⚠️ **ALERTA A5-A11Y-01:** DssDrawer.test.js não cobre fechamento via ESC. O comportamento nativo do QDrawer (fecha com ESC quando não-persistente em modo overlay) não está validado por teste DSS. O meta declara o componente "100% não-interativo" (responsibilityGateV24) — delegação ao Quasar é defensável, mas um teste de regressão do contrato ESC é recomendado, dado que o preview usa `persistent: true` (que **desabilita** ESC).

---

## 7. Consolidado de Não-Conformidades e Recomendações

| ID | Tipo | Severidade | Componentes | Descrição | Ação |
|----|------|-----------|-------------|-----------|------|
| NC-A5-01 | Técnica (sistêmica) | Média-alta | 7 (Layout, Page, PageSticky, PageScroller, Header, Footer, Drawer) | `@import` em `<style>` do SFC (proibido — Princípio #2 + PATH_MAP:139) + dupla carga de CSS (SFC + `index.scss` global) | Decisão de governança: unificar estratégia de carga; migrar `@import` → `@use`. **Sucessora direta do GAP-03 (em aberto desde 17/04/2026)** |
| DOC-A5-01 | Documental | Média | Drawer, PageSticky, PageScroller, Header, Footer, Toolbar, Bar | `status`/`sealDate` do dss.meta.json divergem de CERTIFIED_COMPONENTS.md | Sincronizar metas com o índice de selos |
| DOC-A5-02 | Documental | Baixa | Toolbar, ToolbarTitle, Bar | `previewGroup` ("cartoes"/"banners") inconsistente com a categoria de layout | Confirmar intencionalidade |
| DOC-A5-03 | Documental | Baixa | Layout, PageSticky, PageScroller, Bar | README sem seções explícitas de Slots/Events (piso mínimo exige declaração mesmo quando "nenhum") | Completar READMEs |
| DOC-A5-04 | Documental | Baixa | Drawer | `defaultPreview.props.modelValue = true` (esperado: fechado por default) + entradas `visualProperties` com token/value nulos | Decisão de governança sobre preview; completar visualProperties |
| DOC-A5-05 | Documental | Baixa | Toolbar | example.vue não demonstra composição com DssToolbarTitle | Adicionar cenário composto |
| EXC-PEND-01 | Técnica (pendência conhecida) | Baixa | Footer | `box-shadow` upward hardcoded (`rgba(0,0,0,0.30)`) — EXC-05 "pendente token" desde o selo | Criar token de elevação upward |
| A5-A11Y-01 | Teste | Baixa | Drawer | Sem cobertura de teste para ESC/keydown | Adicionar teste de regressão do contrato ESC |
| EST-A5-01 | Estrutural (menor) | Baixa | Layout, Header, Drawer | Barrel importa de `1-structure/` direto (bypassa wrapper) e omite export de types | Alinhar ao formato canônico do Princípio #11 |

---

## 8. Conclusão

**Veredicto da categoria: ⚠️ APROVADO COM RESSALVAS (10 de 11) / ✅ APROVADO (DssPageContainer).**

- **Gate Estrutural:** 11/11 íntegros — 4 camadas completas, wrappers puros, orquestradores L2→L3→L4, metas com Golden Model declarado, testes presentes, SCSS compila.
- **Gate Técnico:** Token First exemplar nos `_base.scss`; z-index e backdrop tokenizados; zero `::before`/`brightness()` indevidos; exceções de print/forced-colors devidamente documentadas. A única falha real é a **NC-A5-01** (carga dupla de CSS + `@import` em SFC), que é exatamente o **GAP-03 já escalado e ainda não resolvido** — por estar formalmente sob tratamento de governança desde o selo do DssHeader, classifica-se como ressalva vinculada a pendência conhecida, e não como reprovação nova. **Recomenda-se priorizar sua resolução: em componentes de layout global, duplicação de CSS e divergência de ordem de cascata são o maior risco de produção identificado nesta auditoria.**
- **Gate Documental:** não-bloqueante, mas com desalinhamento sistemático entre `dss.meta.json.status` e CERTIFIED_COMPONENTS.md que compromete a confiabilidade do índice de selos.

---

*Relatório gerado pela Auditoria Final A5 — Layout. Evidências coletadas por varredura em lote (grep/ls/python) sobre `/mnt/c/Users/hebert.chaves/DSS/packages/core/components/base/`.*
