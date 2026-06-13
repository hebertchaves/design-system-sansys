# AUDITORIA FINAL A2 — BUILD, IMPORTS E DEPENDÊNCIAS (Infraestrutura do Monorepo)

- **Data:** 2026-06-10
- **Auditor:** Agente IA (Claude Code) — Auditoria de Infraestrutura
- **Escopo:** Workspace npm, build do core, TypeScript, docs-portal, sandbox, scripts npm, tokens fantasmas no CSS compilado
- **Baseline normativa:** `docs/governance/DSS_MONOREPO_PATH_MAP.md`, CLAUDE.md (Princípios #2, #7, #13)

---

## VEREDICTO

# ❌ REPROVADO

O `npm run core:build` **falha** no estado atual do repositório (import quebrado em `DssUploader`), e — mesmo após correção pontual que faz o build concluir — o artefato `packages/core/dist/style.css` **não contém nenhuma declaração de token** (`:root` = 0 ocorrências). `--dss-compact-control-height-*` está **ausente do CSS compilado**, configurando o risco crítico de tokens fantasmas em produção previsto no checklist. Há ainda 17 warnings de deprecação Sass `@import` (violação do Princípio #2 do CLAUDE.md).

---

## 1. MONOREPO WORKSPACE

| Item | Resultado | Evidência |
|---|---|---|
| Lockfile em sincronia | ⚠️ PARCIAL | `package-lock.json` (v3): todas as deps declaradas nos 4 `package.json` auditados existem no lock (verificação programática — zero dependências fantasmas). **Porém** coexistem `package-lock.json` E `bun.lock`, e o `bun.lock` está **desatualizado**: registra o workspace raiz como `"@sansys/design-system"`, enquanto o `package.json` raiz é `"design-system-sansys-monorepo"`. Dois lockfiles = risco de instalações divergentes. |
| Barrel do core | ⚠️ PARCIAL | Barrel real: `packages/core/components/index.js` (reexportado por `packages/core/index.js`). Exporta 90 nomes `Dss*` para 91 diretórios de componentes. **Não exportados:** `composed/DssTestPageComplexity`, `stress-test/DssCadrisCard`, `stress-test/DssDataCard` (aceitável se intencional — componentes de stress-test/teste; recomenda-se declarar a exclusão). |
| Aliases Vite | ✅ OK | `apps/sandbox/vite.config.js`: `@dss` → `packages/core/components/base` (existe, 77 entradas) e `@components` → `packages/core/components` (existe). Conformes ao PATH_MAP. |
| Caminho absoluto Windows | ✅ OK | `grep` por `C:\` / `C:/Users` em `packages/` e `apps/` (js/ts/vue/json/scss, excluindo node_modules e dist): **zero ocorrências**. |
| Regra de Ouro do PATH_MAP | ⚠️ DESVIO | `apps/sandbox/src/main.js:3` importa `'../../../packages/core/index.scss'` — caminho relativo cruzando fronteira de pacote, proibido pela Regra de Ouro do PATH_MAP (deveria usar workspace/alias). |

## 2. BUILD DO CORE

| Item | Resultado | Evidência |
|---|---|---|
| `npm run core:build` | ❌ **FALHA (BLOQUEANTE)** | `error during build: Could not resolve "../../base/DssIcon/DssIcon.vue" from "components/composed/DssUploader/1-structure/DssUploader.ts.vue"` — exit code 1. |
| Causa raiz | Identificada | `DssUploader.ts.vue` linhas 60–62 importam `'../../base/Dss{Button,Icon,LinearProgress}/...'`. O arquivo está em `composed/DssUploader/1-structure/` (profundidade 3) — o correto é `'../../../base/...'`. **Teste controlado:** corrigindo essas 3 linhas, o build conclui com exit 0 (correção revertida após o teste; o bug permanece no working tree e no HEAD). |
| Zero warnings Sass | ❌ FALHA | **17 `DEPRECATION WARNING [import]`** no build (Princípio #2 — `@import` proibido). Componentes afetados (todos em `<style>` de `1-structure/*.ts.vue`): DssBreadcrumbs, DssBreadcrumbsEl, DssBtnDropdown, DssBtnGroup, DssBtnToggle, DssDrawer, DssExpansionItem, DssFab, DssFabAction, DssFooter, DssHeader, DssLayout, DssPage, DssPageScroller, DssPageSticky, DssTabPanel, DssTabPanels. |
| dist gerado | ⚠️ STALE/INCOMPLETO | O `dist/` versionado no git data de **04/06** e é incompatível com o código atual: `dss.es.js` com 44 KB vs **887 KB** no build fresco de teste. **Nenhum `.d.ts` é gerado** (nem no dist antigo nem no fresco — o `vite.config.lib.js` não tem plugin de declaração de tipos). |
| Outros | ⚠️ | Warning Rollup: entry mistura named + default exports (`output.exports: "named"` recomendado). |

## 3. TYPESCRIPT

| Item | Resultado | Evidência |
|---|---|---|
| tsconfig do core | ❌ AUSENTE | Não existe `packages/core/tsconfig*.json`. `npx tsc --noEmit` no core é inexecutável de forma significativa. |
| Script type-check | ❌ DESATIVADO | `packages/core/package.json`: `"type-check": "echo \"type-check disabled (legacy Vue tsconfig)\""` — é um stub que **sempre passa** (falso positivo institucionalizado). O docs-portal compensa parcialmente: seu build roda `tsc -b` e passou. |
| Uso de `any` | ⚠️ TOLERÁVEL | 84 ocorrências de `: any`/`as any` em `packages/core/components`. Maioria é o padrão Vue de slots (`default(): any`) e `modelValue?: any` em controles genéricos (DssBtnToggle etc.) — não são "atalhos", mas o volume merece revisão na adoção de `VNode[]` para slots. |
| Sintaxe TS em arquivos .js | ❌ **ACHADO CRÍTICO ADICIONAL** | 5 barrels `index.js` de composed (`DssBottomSheet`, `DssCarousel`, `DssChatMessage`, `DssDialog`, `DssUploader`) contêm **no HEAD** `export type {...}` — sintaxe TypeScript inválida em `.js`. O working tree tem correções **não commitadas** (status `M`). Ou seja: o estado commitado do repositório quebra o build ainda mais cedo; as correções precisam ser commitadas. |

## 4. DOCS-PORTAL

| Item | Resultado | Evidência |
|---|---|---|
| `src/index.css` existe | ✅ OK | Presente. Linhas 1–2: `@import "tailwindcss";` e `@config "../tailwind.config.ts";` — exatamente o esperado pós-Onda 8. |
| `tailwind.config.ts` existe | ✅ OK | `apps/docs-portal/tailwind.config.ts` presente. |
| `npm run docs:build` | ✅ OK | `tsc -b && vite build` concluiu com exit 0 em 33s (1980 módulos). Warnings não-bloqueantes: chunk de 1,74 MB (>500 kB) e caniuse-lite com 6 meses. |

## 5. SANDBOX

| Item | Resultado | Evidência |
|---|---|---|
| Aliases do vite.config.js | ✅ OK | `@dss`, `@components`, dedupe de react/react-dom, `fs.allow` para a raiz do monorepo. Caminhos resolvem para diretórios reais. |
| CSS de terceiros em `@layer` | ✅ OK | `main.js` não importa CSS do Quasar diretamente. `index.html` carrega `/quasar-layered.css`, que envolve o CSS do Quasar em `@layer quasar` (2 ocorrências de `@layer quasar` no arquivo) — conforme Princípio #13. CSS DSS permanece unlayered. ⚠️ Ressalva: ver desvio da Regra de Ouro no item 1 (import relativo de `index.scss`). |
| DemoRenderer.vue | ✅ OK | Existe em `apps/sandbox/src/DemoRenderer.vue`; importado e usado em `TestDefaultPreview.vue` (linhas 146 e 193). `TestSuite.vue` existe no diretório; o consumo do DemoRenderer se dá via TestDefaultPreview. |

## 6. SCRIPTS NPM

| Item | Resultado | Evidência |
|---|---|---|
| `sync:visual-contract` | ✅ OK | `scripts/sync-visual-contract.js` existe; `node --check` passa (sintaxe válida). |
| `core:build` | ✅ OK (definição) | Existe e delega para `build:lib` do workspace `@sansys/design-system`. (A execução falha — ver seção 2.) |
| Caminhos relativos quebrados | ✅ OK | Todos os alvos de scripts verificados existem: `sync-visual-contract.js`, `sync-css-to-meta.js`, `sync-tokens-to-reference.js`, `generate-portal-landing-pages.js`, `update-meta-preview.cjs`, `hooks/pre-commit`. Os 4 scripts .js passam em `node --check`. |

## 7. TOKENS FANTASMAS NO CSS COMPILADO — RISCO CRÍTICO

| Item | Resultado | Evidência |
|---|---|---|
| `compact-control-height` no dist | ❌ **BLOQUEANTE** | `grep "compact-control-height" packages/core/dist/style.css` → **VAZIO**, tanto no dist versionado (stale) quanto no dist gerado por build fresco bem-sucedido (teste controlado). |
| Declaração na fonte | ✅ Existe | `packages/core/tokens/semantic/accessibility/_sizing.scss:129-132` declara `--dss-compact-control-height-{xs:20px, sm:24px, md:28px, lg:32px}`; agregado via `tokens/index.scss:17` (`@use 'semantic/accessibility'`). **Não é débito de token na fonte** — é falha de empacotamento. |
| Causa raiz | Identificada | O entry da lib (`vite.config.lib.js` → `index.js`) **não importa `packages/core/index.scss`** (orquestrador de tokens + utils + themes + components). O `dist/style.css` resultante contém apenas estilos de SFCs com `<style>` próprio. Consequências medidas no dist fresco: **0 blocos `:root`** (nenhum token declarado), **0 ocorrências de `dss-chip`** (DssChip declara "Estilos carregados globalmente via dist/style.css" e não tem `<style>` — seus estilos vivem em `components/index.scss`, que nunca entra no bundle). Quem consumir `@sansys/design-system/css` recebe centenas de `var(--dss-*)` **indefinidas** e componentes (Chip, Badge etc.) sem estilo. O sandbox não percebe o problema porque importa `index.scss` direto (compilação ao vivo) — o falso positivo clássico de "funciona no dev". |

---

## RESUMO DE BLOQUEANTES (ordem de correção sugerida)

1. **[BLOQUEANTE] Build do core falha** — corrigir `DssUploader.ts.vue` linhas 60–62: `'../../base/...'` → `'../../../base/...'` (3 imports). Correção validada em teste controlado (build passa após o ajuste).
2. **[BLOQUEANTE] dist/style.css sem tokens e sem estilos globais** — incluir `index.scss` no pipeline da lib (ex.: importar no entry `index.js` ou adicionar como entrada CSS no `vite.config.lib.js`), e regravar o dist. Critério de aceite: `grep "compact-control-height" dist/style.css` retorna as 4 declarações e `:root` > 0.
3. **[BLOQUEANTE no HEAD] `export type` em 5 `index.js` de composed** — commitar as correções já presentes no working tree (DssBottomSheet, DssCarousel, DssChatMessage, DssDialog, DssUploader).
4. **[ALTO] 17 warnings Sass `@import`** — migrar os `<style>` dos 17 componentes listados para `@use` (Princípio #2; remoção prevista no Dart Sass 3.0).
5. **[ALTO] dist/ versionado e stale** — dist no git de 04/06 difere 20x do build real; decidir entre regenerar a cada release ou remover do versionamento. Ausência de `.d.ts` no dist contradiz o "TypeScript ready" do pacote.
6. **[MÉDIO] type-check do core é stub** (`echo`) e core não tem `tsconfig.json` — falso positivo permanente de tipos.
7. **[MÉDIO] Lockfiles duplicados** — `bun.lock` desatualizado (nome do workspace raiz divergente) coexistindo com `package-lock.json`; eleger um gerenciador canônico.
8. **[BAIXO] `main.js` do sandbox** importa `index.scss` por caminho relativo inter-pacote (desvio da Regra de Ouro do PATH_MAP); 3 componentes fora do barrel sem declaração de intencionalidade.

## ITENS APROVADOS

- Sem caminhos absolutos Windows em nenhum pacote.
- Sem dependências fantasmas no `package-lock.json`.
- Aliases Vite do sandbox corretos e apontando para caminhos reais.
- Quasar isolado em `@layer quasar` no sandbox (Princípio #13 atendido).
- `docs-portal` íntegro: `index.css` + `tailwind.config.ts` presentes, build com `tsc -b` concluindo sem erro.
- `DemoRenderer.vue` presente e consumido.
- Todos os scripts npm apontam para arquivos existentes e sintaticamente válidos.
- Tokens `--dss-compact-control-height-*` corretamente declarados **na fonte** SCSS.

---

*Nota metodológica: para eliminar falso negativo, o auditor aplicou correção temporária nos 3 imports do DssUploader, executou build completo, inspecionou o dist fresco e **reverteu** a alteração e o dist. Nenhuma modificação de código foi mantida por esta auditoria.*
