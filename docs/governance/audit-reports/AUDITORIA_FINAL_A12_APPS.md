# AUDITORIA FINAL A12 — Apps & Developer Experience (DSS)

**Data:** 2026-06-11
**Escopo:** `apps/sandbox/`, `apps/docs-portal/`, `packages/mcp/`, `packages/grid-inspector/`, DX de onboarding
**Método:** Verificação física de arquivos + smoke tests reais (servidores Vite iniciados e inspecionados via HTTP) + execução real das tools MCP

---

## Veredicto Global

> **⚠️ ALERTA — com 1 achado escalado a ❌ BLOQUEANTE setorial**
>
> Os três gatilhos de REPROVADO do critério de aceite **não** ocorreram (quasar-scoped.css não está ativo, `index.css` existe no docs-portal, o MCP responde). Sandbox e docs-portal **iniciam e compilam de verdade** (smoke test HTTP executado). Isolamento CSS confirmado fisicamente.
>
> Porém, conforme a regra de escalonamento desta auditoria, o **drift de tokens entre docs-portal e core** (262 tokens duplicados, 13 com valores divergentes) é classificado como **❌ Bloqueante — risco sistêmico de drift de paleta entre portal e sistema real**. Esse item impede aprovação plena até correção.

| Seção | Resultado |
|---|---|
| Sandbox | ✅ Aprovado (1 nota de conformidade de caminho) |
| Isolamento CSS | ✅ Aprovado |
| Docs-portal (estrutura/boot) | ✅ Aprovado |
| Tokens duplicados no portal | ❌ **Bloqueante** (262 duplicados, 13 divergentes) |
| MCP Server | ⚠️ Alerta (responde, mas build stale + 1 tool simulada e quebrada) |
| Grid Inspector | ✅ Aprovado (dist mais recente que src) |
| DX / Onboarding | ⚠️ Alerta (README ok; QUICK_START.md obsoleto; lockfiles mistos) |

---

## 1. SANDBOX — ✅ APROVADO

### 1.1 index.html
- ✅ Carrega **apenas** `/quasar-layered.css` (`apps/sandbox/index.html:12`), com comentário explicando o `@layer quasar`.
- ✅ Nenhuma referência a `quasar-scoped.css` ou `quasar-components.css` em `index.html`, `src/`, `vite.config.js`, `test-utility-classes.html` ou `public/test-icons.html` (grep retornou vazio, exit 1).

### 1.2 main.js — importações do DSS Core
- ✅ Componentes importados via alias oficial `@components` (ex.: `@components/base/DssButton/DssButton.vue` — 50+ ocorrências nas views) e via workspace `@sansys/design-system` (`DebugButton.vue`). Aliases `@dss` e `@components` definidos em `vite.config.js`, conforme `DSS_MONOREPO_PATH_MAP.md`.
- ⚠️ **Nota de conformidade:** `apps/sandbox/src/main.js:3` importa o SCSS via caminho relativo longo: `import '../../../packages/core/index.scss'`. O `DSS_MONOREPO_PATH_MAP.md` documenta que "o SCSS é compilado ao vivo pelo Vite a partir de `packages/core/index.scss`", mas a Regra de Ouro do mesmo documento proíbe caminhos relativos que cruzem fronteiras de pacote. Não existe alias Vite para a raiz do core — recomenda-se criar (ex.: `@core`) e atualizar `main.js` e `TestDefaultPreview.vue:197` (glob relativo `'../../../packages/core/components/**/dss.meta.json'`). **Funciona, mas viola a regra canônica de caminhos.**

### 1.3 TestSuite.vue
- ✅ Lista componentes de forma organizada: sidebar com `nav-section`/`nav-category` (Dashboard, Defaults Preview com badge 76, Foundation → Design Tokens com badge 112, Colors, Typography, Spacing, categorias expansíveis). 904 linhas, navegação por categoria com estado `expandedCategories`.

### 1.4 DemoRenderer.vue
- ✅ Lê corretamente `meta.defaultPreview.demoSlots` (`DemoRenderer.vue:320-322`), converte em slots Vue via `buildSlots()` (linha 263), suporta `props`, `previewHtml` (componentes overlay), `wrapIn` e `wrapChain` (contextos pai), com `errorCaptured` + fallback visual para componentes que exigem contexto. Consumido por `TestDefaultPreview.vue`, que carrega todos os `dss.meta.json` via `import.meta.glob` e agrupa por `previewGroup`.

### 1.5 Arquivos deprecated
- ✅ `apps/sandbox/public/_archive/quasar-components.css.deprecated` presente com header:
  > `/* DEPRECATED 2026-06-06 — substituído por quasar-layered.css com @layer quasar. NÃO REINTRODUZIR. ... Ver docs/reference/DSS_ARCHITECTURE.md — Princípio #13. */`

### 1.6 Smoke test real (produção-like)
- ✅ `npx vite` no sandbox: `GET /` → **HTTP 200** com `main.js` e `quasar-layered.css` referenciados.
- ✅ `GET /src/main.js` → transformado pelo Vite (imports resolvidos para `/node_modules/.vite/deps/` e `/@fs/.../packages/core/index.scss`).
- ✅ `GET /@fs/.../packages/core/index.scss` → **HTTP 200, 1.127.058 bytes** de CSS compilado (ocorrências "Error" no output são apenas comentários CSS de tokens de focus negativo — falso positivo verificado).
- ✅ `GET /quasar-layered.css` → HTTP 200, 248.385 bytes.

---

## 2. ISOLAMENTO CSS — VERIFICAÇÃO FÍSICA — ✅ APROVADO

| Verificação | Resultado |
|---|---|
| `quasar-layered.css` existe em `apps/sandbox/public/` | ✅ Sim (248 KB) |
| `grep -c "@layer" apps/sandbox/public/quasar-layered.css` | ✅ **3** (> 0) — header documenta `@layer quasar → prioridade ABAIXO de todos os estilos sem layer` |
| CSS DSS dentro de `@layer`? | ✅ **Não** — `grep -rn "@layer" packages/core --include="*.scss"` retorna apenas 1 ocorrência, e é **comentário** (`packages/core/themes/_quasar-overrides.scss:1013`). Nenhuma regra DSS está envolvida em layer. Princípio #13 respeitado. |
| `quasar-components.css` referenciado em HTML/JS ativo? | ✅ Não (apenas o `.deprecated` no `_archive/`) |

---

## 3. DOCS-PORTAL

### 3.1 Estrutura e boot — ✅ APROVADO
- ✅ `apps/docs-portal/src/index.css` existe (738 linhas) e inicia com:
  ```css
  @import "tailwindcss";
  @config "../tailwind.config.ts";
  ```
- ✅ `apps/docs-portal/tailwind.config.ts` existe (Tailwind com `darkMode: ["class"]`, content globs corretos).
- ✅ `apps/docs-portal/src/main.tsx:5` importa `"./index.css"`.
- ✅ `postcss.config.js` usa `@tailwindcss/postcss` (Tailwind v4) + autoprefixer.
- ✅ **Smoke test real:** dev server iniciado → `GET /` HTTP 200; `GET /src/index.css` HTTP 200 com **152.808 bytes** compilados (519 ocorrências `dss-`). Nenhum erro de compilação (apenas warnings benignos de browserslist e `from` option de plugin PostCSS).

### 3.2 Tokens duplicados no portal — ❌ BLOQUEANTE
- ❌ `index.css` contém **346 declarações** `--dss-*` manuais (327 nomes únicos) além das diretivas Tailwind.
- ❌ **262 desses nomes também existem no core** (`packages/core/tokens/globals.scss` + `semantic/*.scss`) — duplicação massiva, muito acima do limiar de 10 definido pelo critério de escalonamento.
- ❌ **13 tokens com valores DIVERGENTES** (portal ≠ core):

| Token | Portal (`index.css`) | Core (efetivo) |
|---|---|---|
| `--dss-action-primary` | `var(--dss-hub-600)` | `var(--dss-primary)` |
| `--dss-action-primary-hover` | `var(--dss-hub-700)` | `var(--dss-primary-hover)` |
| `--dss-action-primary-light` | `var(--dss-hub-300)` | `var(--dss-primary-light)` |
| `--dss-action-primary-deep` | `var(--dss-hub-900)` | `var(--dss-primary-deep)` |
| `--dss-action-primary-disable` | `var(--dss-hub-200)` | `var(--dss-primary-disable)` |
| `--dss-shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | `0 1px 3px rgba(0,0,0,0.25)` |
| `--dss-shadow-md` | `... 0.10` | `... 0.30` |
| `--dss-shadow-lg` | `... 0.12` | `... 0.35` |
| `--dss-shadow-xl` | `... 0.15` | `... 0.40` |
| `--dss-shadow-2xl` | `... 0.20` | `... 0.45` |
| `--dss-info-deep` | `#0d7491` | `#00B2D5` |
| `--dss-tertiary-deep` | `#ad4200` | `#E95900` |
| `--dss-warning-deep` | `#a66d08` | `#E9AB00` |

- **Conclusão:** ⚠️→❌ **"portal renderiza com paleta desatualizada"** — escalado a Bloqueante por exceder 10 tokens duplicados (262). Recomendação: gerar o bloco de tokens do `index.css` a partir do core via script de sync (mesmo padrão do `sync:visual-contract`) ou importar o CSS de tokens do core diretamente.
- 🔎 **Achado colateral no core (higiene):** `packages/core/tokens/globals.scss` contém **declarações duplicadas do mesmo token** — `--dss-tertiary-deep` (linhas 89–90), `--dss-warning-deep` (129–130), `--dss-info-deep` (137–138). A última declaração vence em CSS; o portal copiou os valores antigos (primeira declaração). Limpar as duplicatas no core para eliminar a ambiguidade na cadeia de verdade (Princípio #12).

---

## 4. MCP SERVER — ⚠️ ALERTA (responde, com ressalvas)

### 4.1 Build e estrutura
- ✅ `packages/mcp/build/index.js` existe (+ `http-server.js`, `sse-server.js`, 2 chunks).
- ✅ `packages/mcp/src/tools/` contém 14 tools implementadas (`checkCompliance`, `queryComponent`, `queryToken`, `validateVisualContract`, `validateComponentCode`, `validateGridLayout`, `generateComponentScaffold`, etc.).
- ⚠️ **Build STALE:** `build/index.js` é de **2026-06-02 17:14**; `src/tools/validateVisualContract.ts` foi modificado em **2026-06-05 18:48**. Evidência de conteúdo: o build ainda referencia `computedTokens` e não contém a nota de depreciação "use `visualProperties`" presente no src. Rodar `npm run mcp:build`.

### 4.2 Execução real das tools (ambiente desta auditoria)
- ✅ `mcp__dss__query_component("DssButton")` → **respondeu** com meta completo (status approved, selo DSS v2.2, `defaultPreview` com `visualProperties`, `demoSlots`, `previewGroup: "acoes"`) + documentação Template 13.1 integral.
- ✅ `mcp__dss__check_compliance("brightness(0.93)...", ruleType="composition")` → **respondeu corretamente**: `non-compliant`, citando a tabela canônica `[0.85, 0.9, 0.92, 0.95, 1.1, 1.2]` e `CLAUDE.md — Princípio #8`.
- ⚠️ Nota de DX: o mesmo contexto com `ruleType="token"` retorna `uncertain` — a detecção é sensível ao `ruleType` escolhido pelo agente. Não é bug, mas convém documentar no contrato da tool.

### 4.3 validate_visual_contract — IMPLEMENTAÇÃO SIMULADA E QUEBRADA
- ❌ **Execução real falhou:** `mcp__dss__validate_visual_contract("DssButton")` → `Error: Component DssButton not found or missing dss.meta.json.`
  - **Causa raiz (bug):** `packages/mcp/src/tools/validateVisualContract.ts:22` resolve caminhos via `path.join(process.cwd(), "..", "components", "base", componentName)` — dependente do cwd do processo e **nunca** resolve para `packages/core/components/` a partir de `packages/mcp/`. Compare com `queryComponent.ts:26`, que usa `resolve(dssRoot, "packages/core/components/base", ...)` corretamente. Correção: usar o mesmo helper `dssRoot`.
- ⚠️ **Implementação SIMULADA confirmada (verificação honesta, ausente na auditoria anterior):** o código-fonte declara explicitamente (linhas 60–86):
  > "Em uma implementação real, isso usaria Puppeteer/Playwright... Para o escopo atual, retornamos um **relatório simulado**... `**Status:** ⚠️ PENDING INFRASTRUCTURE` ... `This tool is currently a placeholder for the Phase 4 Visual Regression Pipeline.`"
  
  **Não há renderização real** (sem headless browser, Playwright ou JSDOM) — a tool apenas ecoa o contrato declarado no `dss.meta.json`.

> **⚠️ NOTA NORMATIVA OBRIGATÓRIA:** `validate_visual_contract` é **infraestrutura pendente** — respostas desta tool são **declarativas, não verificadas por renderização real**. **Não usar como critério de aceite** em auditorias ou selos. Mesmo quando o bug de caminho for corrigido, o resultado continuará simulado até a implementação do pipeline de regressão visual (Fase 4).

- Varredura por padrões de simulação nas demais tools: único outro hit de `mock|placeholder|simulate` é em `generatePrePromptTemplate.ts` (placeholders `⟪…⟫` de template — **benigno**).

---

## 5. GRID INSPECTOR — ✅ APROVADO

- ✅ `packages/grid-inspector/dist/` existe com build completo: `grid-inspector.es.js`, `grid-inspector.umd.js`, `style.css`, `.d.ts` + sourcemaps.
- ✅ **Dist mais recente que src:** arquivo mais novo do `src/` = `components/GridOverlay.tsx` (2026-06-09 **01:24**); arquivos mais novos do `dist/` = 2026-06-09 **01:25**. Build atualizado.
- ✅ `FloatingGridInspector.tsx` compilado: `dist/components/FloatingGridInspector.d.ts` (+ `.map`) presente e símbolo incluído nos bundles ES/UMD.
- ✅ Integração no sandbox: `main.js` injeta o inspector apenas em `import.meta.env.DEV` via `@sansys/grid-inspector` (declarado como `file:../../packages/grid-inspector` no `package.json` do sandbox, conforme PATH_MAP).

---

## 6. DX — ONBOARDING SIMULADO — ⚠️ ALERTA

### 6.1 README.md raiz — ✅ válido
- Comandos conferidos contra `package.json` raiz: `npm install`, `npm run core:build`, `npm run sandbox:dev`, `npm run docs:dev`, `npm run docs:build`, `npm run build:all`, `npm run portal:sync-docs`, `npm run setup:hooks` — **todos os scripts existem** nos workspaces declarados (`packages/*`, `apps/*`).

### 6.2 QUICK_START.md — ❌ OBSOLETO
- `QUICK_START.md` na raiz referencia uma estrutura que **não existe mais**: `quasar-to-figma-converter/` com subdiretório `dss/`, comandos `cd dss`, `npm run dss:build` (script inexistente no `package.json` atual) e `test-dss-button.html` (arquivo inexistente). Um dev novo que seguir este guia **falha em todos os passos**. Recomendação: reescrever apontando para `npm install` + `npm run sandbox:dev`, ou remover e apontar para o README raiz / `docs/AGENT_QUICKSTART.md`.

### 6.3 Onboarding < 5 minutos — ✅ SIM (via README)
- Smoke test desta auditoria confirmou: `npm run sandbox:dev` (Vite) sobe e serve a aplicação com SCSS do core compilando ao vivo — sem passos manuais ocultos. Docs-portal idem.
- ⚠️ **Fricção identificada — lockfiles mistos:** raiz tem `bun.lock` **e** `package-lock.json`; `apps/sandbox/` tem `package-lock.json` próprio (dentro de um workspace npm); `packages/mcp/` tem `pnpm-lock.yaml` **e** `package-lock.json`. Três gerenciadores de pacote com lockfiles concorrentes = risco de instalações não reproduzíveis entre devs/CI. Recomendação: padronizar um gerenciador e remover os lockfiles órfãos.

---

## 7. Resumo de Ações Recomendadas (por prioridade)

| # | Severidade | Ação | Local |
|---|---|---|---|
| 1 | ❌ Bloqueante | Eliminar duplicação manual de 262 tokens no portal (gerar via script de sync a partir do core ou importar CSS de tokens do core); corrigir as 13 divergências | `apps/docs-portal/src/index.css` |
| 2 | ⚠️ Alta | Corrigir resolução de caminho cwd-dependente em `validateVisualContract.ts` (usar `dssRoot` como em `queryComponent.ts`) | `packages/mcp/src/tools/validateVisualContract.ts:22,27,42` |
| 3 | ⚠️ Alta | Registrar formalmente que `validate_visual_contract` é simulada — não usar como critério de aceite até o pipeline Fase 4 | governança / descrição da tool |
| 4 | ⚠️ Média | Rebuildar o MCP (`npm run mcp:build`) — build de 06-02 anterior ao src de 06-05 | `packages/mcp/build/` |
| 5 | ⚠️ Média | Reescrever ou remover `QUICK_START.md` (estrutura e comandos inexistentes) | raiz |
| 6 | ⚠️ Média | Remover declarações duplicadas de `--dss-tertiary-deep`/`--dss-warning-deep`/`--dss-info-deep` | `packages/core/tokens/globals.scss:89-90,129-130,137-138` |
| 7 | ⚠️ Baixa | Criar alias Vite para a raiz do core e substituir `'../../../packages/core/index.scss'` e o glob de `TestDefaultPreview.vue` | `apps/sandbox/vite.config.js`, `src/main.js:3`, `src/TestDefaultPreview.vue:197` |
| 8 | ⚠️ Baixa | Padronizar gerenciador de pacotes (remover lockfiles concorrentes bun/pnpm/npm) | raiz, `apps/sandbox/`, `packages/mcp/` |

---

*Auditoria executada com verificação física de arquivos, servidores Vite reais (HTTP smoke tests) e chamadas reais às tools MCP. Nenhum resultado desta auditoria depende de saída da tool `validate_visual_contract` (simulada).*
