# AUDITORIA FINAL A1 — Camada de Fundação CSS

**Escopo:** CSS Cascade Layers (Princípio #13), Sistema de Tokens, Bridge Quasar↔DSS, Compliance @use/@import, Compilação Sass
**Data:** 2026-06-10
**Auditor:** Agente DSS (Claude Code) — auditoria com evidência física de arquivo
**Baseline normativo:** `docs/reference/DSS_ARCHITECTURE.md` (Princípio #13), `docs/reference/DSS_TOKEN_REFERENCE.md`, `CLAUDE.md` (Princípios #1, #2, #13)

---

## VEREDICTO FINAL: ❌ REPROVADO

Dois critérios de reprovação automática foram acionados, ambos com evidência física:

1. **`@import` ativo em `packages/core/`** — 25 ocorrências ativas (fora de comentários) em 5 arquivos `.scss`, mais 1 em arquivo `.vue`. Confirmado também em runtime: o compilador Dart Sass emite múltiplos `DEPRECATION WARNING [import]` ao compilar `packages/core/index.scss`.
2. **`--quasar-*` presente em `_quasar-overrides.scss`** — 16 ocorrências de `var(--quasar-*)`. Nota de nuance: a variável **não é inexistente** (é declarada em `:root` na Seção 7 de `_quasar-tokens-mapping.scss`), mas o critério de aceite desta auditoria considera qualquer presença como reprovação. Adicionalmente, foi encontrado **bug real de CSS**: `rgba(var(--quasar-primary), 0.1)` é inválido (ver item B4).

Achado adicional (fora do checklist, bloqueante): `npm run core:build` **falha** por sintaxe TypeScript (`export type`) em arquivo `.js` (`DssChatMessage/index.js:4`). O erro não é Sass, mas impede o build da biblioteca.

A camada de Cascade Layers (Seção A) está **íntegra e conforme** — a reprovação concentra-se na higiene Sass (`@import`) e na presença residual de `--quasar-*` nos overrides.

---

## A. CSS LAYERS — 5/5 CONFORME

### A1. ✅ `apps/sandbox/index.html` carrega `quasar-layered.css`, NÃO `quasar-scoped.css`

Evidência — `/mnt/c/Users/hebert.chaves/DSS/apps/sandbox/index.html`, linhas 11–12:

```html
<!-- CSS do Quasar encapsulado via @layer quasar — DSS ganha precedência absoluta na cascata -->
<link rel="stylesheet" href="/quasar-layered.css">
```

Busca por `quasar-scoped` em todo o sandbox (`*.html`, `*.js`, `*.vue`, `*.ts`) e em `apps/` + `packages/` (incluindo `*.css`): **zero ocorrências** (grep exit 1).

### A2. ✅ `quasar-layered.css` existe em `apps/sandbox/public/` e está envolvido em `@layer quasar { }`

Evidência — `/mnt/c/Users/hebert.chaves/DSS/apps/sandbox/public/quasar-layered.css` (248.385 bytes):

```css
/* Quasar CSS completo envolvido em @layer para controle de cascata. */
/* @layer quasar → prioridade ABAIXO de todos os estilos sem layer. */
/* DSS overrides (dss-full.css, sem layer) vencem automaticamente. */
/* Grid Inspector Tailwind (!important) vence todas as layers. */

@layer quasar {
```

- Única abertura de bloco: `@layer quasar {` na linha 6 (3 ocorrências de "@layer" no arquivo: 2 em comentários de header + 1 declaração real).
- Final do arquivo fecha o bloco: as últimas linhas são `background: var(--q-dark); }` seguido do `}` que encerra o layer. Todo o CSS Quasar está contido no layer.

Conteúdo de `apps/sandbox/public/`: `_archive/`, `dss-full.css`, `dss-full.css.map`, `dss.css`, `quasar-layered.css`, `test-icons.html`.

### A3. ✅ `quasar-scoped.css` removido / arquivo legado em `_archive/` com header DEPRECATED

- Nenhum arquivo `quasar-scoped.css` existe no repositório e nenhuma referência a ele foi encontrada.
- O arquivo legado real (predecessor sem layer) está arquivado como `apps/sandbox/public/_archive/quasar-components.css.deprecated` com header DEPRECATED conforme:

```css
/* DEPRECATED 2026-06-06 — substituído por quasar-layered.css com @layer quasar. NÃO REINTRODUZIR.
   Razão: com a adoção do Princípio #13 (Cascade Layers), todo CSS de terceiros deve viver dentro
   de @layer vendor/quasar. Este arquivo não possuía o wrapper de layer e causava conflitos de
   especificidade. Ver docs/reference/DSS_ARCHITECTURE.md — Princípio #13. */
```

### A4. ✅ CSS DSS (`packages/core`) NÃO usa `@layer` em nenhum arquivo SCSS

Evidência — `grep -rn "@layer" packages/core/ --include="*.scss"` retorna **apenas 1 hit, em comentário**:

```
packages/core/themes/_quasar-overrides.scss:1013:   --q-* → --dss-* (Seção 12 de _quasar-tokens-mapping.scss), pois o @layer quasar já contém
```

Nenhuma declaração `@layer` ativa no CSS DSS. O CSS DSS permanece unlayered, conforme Princípio #13 ("CSS DSS NUNCA é envolvido em @layer").

### A5. ✅ Unlayered CSS sempre vence `@layer` (cadeia de precedência confirmada)

Confirmação por três evidências convergentes:

1. **Normativa** — `DSS_ARCHITECTURE.md`, Princípio #13 (linha 1547+): "regras unlayered sempre vencem regras dentro de layers nomeados (...) qualquer regra DSS sem layer vence qualquer regra Quasar dentro de `@layer quasar`, mesmo que o Quasar use `!important`."
2. **Implementação** — A2 (Quasar 100% dentro do layer) + A4 (DSS 100% fora de layer) + ordem de carregamento em `index.html` (layered primeiro, bundle DSS via `/src/main.js` depois).
3. **Validação automatizada existente** — suíte de regressão confirmada fisicamente em `apps/sandbox/tests/regression/`:
   - `static/layer-structure.spec.ts`, `static/bridge-strings.spec.ts`
   - `e2e/cascade-layers.spec.ts`, `e2e/token-resolution.spec.ts`, `e2e/utility-classes.spec.ts`, `e2e/brand-switching.spec.ts`

---

## B. TOKEN BRIDGE Quasar↔DSS — 4/5 (1 REPROVADO)

### B1. ✅ `--q-primary` mapeado para token DSS (via `--dss-action-primary`)

Evidência — `packages/core/themes/_quasar-tokens-mapping.scss`, Seção 12, linhas 202–212:

```scss
:root {
  --q-primary:   var(--dss-action-primary);
  --q-secondary: var(--dss-action-secondary);
  --q-accent:    var(--dss-action-accent);
  --q-positive:  var(--dss-feedback-success);
  --q-negative:  var(--dss-feedback-error);
  --q-warning:   var(--dss-feedback-warning);
  --q-info:      var(--dss-feedback-info);
  --q-dark:      var(--dss-gray-900);
  --q-dark-page: var(--dss-gray-950);
}
```

**Nota:** o checklist pedia `--q-primary → var(--dss-primary)`. O mapeamento real é `--q-primary → var(--dss-action-primary)`, e `DSS_TOKEN_REFERENCE.md` (linha 692) confirma que `--dss-action-primary` é definido como `var(--dss-primary)`. A cadeia `--q-primary → --dss-action-primary → --dss-primary` é semanticamente equivalente e usa o token de camada de ação correto (mais conforme que o alias direto). **CONFORME.**

### B2. ✅ Todos os 7 tokens semânticos mapeados

`primary`, `secondary`, `accent`, `positive`, `negative`, `warning`, `info` — todos presentes no bloco `:root` acima (linhas 203–209). Mapeamento: action tokens para os 3 primeiros, feedback tokens para os 4 semânticos. **CONFORME.**

### B3. ✅ `--q-dark` e `--q-dark-page` mapeados para tokens de neutros

`--q-dark: var(--dss-gray-900)` e `--q-dark-page: var(--dss-gray-950)` (linhas 210–211 do mesmo bloco). Escala de neutros gray do DSS. **CONFORME.**

### B4. ❌ `_quasar-overrides.scss` CONTÉM referências a `--quasar-*` — 16 ocorrências

Evidência — `grep -c "var(--quasar-" packages/core/themes/_quasar-overrides.scss` → **16**. Linhas: 42, 46, 63, 74, 75, 79, 87, 90, 511, 536, 541, 614, 688, 691, 891, 919. Exemplos:

```scss
/* linha 42 */  background-color: var(--quasar-primary) !important;
/* linha 79 */  background-color: rgba(var(--quasar-primary), 0.1) !important;
/* linha 919 */ color: var(--quasar-primary) !important;
```

**Nuance factual (registrada para correção justa):** a premissa do checklist ("variável inexistente") está incorreta — `--quasar-primary`, `--quasar-secondary` e `--quasar-accent` SÃO declaradas em `:root` na Seção 7 de `_quasar-tokens-mapping.scss` (linhas 98–103) e re-sobrescritas em `[data-brand="*"]`, `.dss-theme--*` (`themes/index.scss`) e `.dss-brand-*` (`tokens/brand/index.scss`). As variáveis resolvem em runtime quando o mapping é carregado.

**Porém, dois problemas reais permanecem:**

1. **Bug de CSS inválido** (linhas 79 e 90): `rgba(var(--quasar-primary), 0.1)` — `--quasar-primary` resolve para um valor de cor completo (ex.: `#1f86de` via cadeia de vars), e `rgba()` não aceita um valor de cor como primeiro argumento nessa forma. A declaração é descartada pelo browser (fallback silencioso). Correção sugerida: usar `color-mix(in srgb, var(--quasar-primary) 10%, transparent)` ou token de surface (`--dss-action-primary-surface`).
2. **Critério de aceite da auditoria**: qualquer presença de `--quasar-*` nos overrides é condição explícita de REPROVADO. A camada bridge canônica é `--q-*` (Seção 12); o namespace `--quasar-*` é legado e deveria ser migrado para `var(--q-primary)` ou `var(--dss-action-primary)`.

**REPROVADO** (com a nuance acima documentada).

### B5. ✅ `.bg-primary`, `.text-primary` etc. usam `var(--dss-*)`, sem valores hardcoded

Evidência — `_quasar-overrides.scss`, Seção 12, linhas 1016–1035 (defesa em profundidade declarada em comentário nas linhas 1012–1015):

```scss
.text-primary { color: var(--dss-action-primary) !important; }
.text-secondary { color: var(--dss-action-secondary) !important; }
.text-positive { color: var(--dss-feedback-success) !important; }
.text-negative { color: var(--dss-feedback-error) !important; }
/* ... */
.bg-primary { background-color: var(--dss-action-primary) !important; }
.bg-secondary { background-color: var(--dss-action-secondary) !important; }
.bg-positive { background-color: var(--dss-feedback-success) !important; }
.bg-negative { background-color: var(--dss-feedback-error) !important; }
.bg-warning { background-color: var(--dss-feedback-warning) !important; }
.bg-info { background-color: var(--dss-feedback-info) !important; }
.bg-dark { background-color: var(--dss-gray-900) !important; }
.bg-light { background-color: var(--dss-gray-100) !important; }
```

Nenhum hex/rgb hardcoded nas classes utilitárias de cor. **CONFORME.**

---

## C. @USE/@IMPORT COMPLIANCE — 1/3 (2 REPROVADOS)

### C1. ✅ Grep executado conforme escopo

Comando executado: `grep -rn "@import" packages/core/ --include="*.scss" | grep -v "_archive" | grep -v node_modules` — cobrindo `components/`, `themes/` e `tokens/`.

### C2. ❌ Ocorrências ATIVAS de `@import` encontradas — 25 em SCSS + 1 em SFC Vue

Classificação de todos os hits (ativo vs. comentário), verificada por leitura dos arquivos:

**ATIVOS na cadeia de compilação principal** (`packages/core/index.scss` → confirmados por DEPRECATION WARNING do Dart Sass):

| Arquivo | Linhas | Qtd | Conteúdo |
|---|---|---|---|
| `packages/core/themes/index.scss` | 7, 10, 13 | 3 | `@import 'quasar-tokens-mapping';` / `'quasar-overrides'` / `'quasar-utilities'` |
| `packages/core/tokens/semantic/accessibility/index.scss` | 20, 29, 38, 48 | 4 | `@import 'focus';` / `'contrast'` / `'sizing'` / `'typography'` |

**ATIVOS em arquivos órfãos/legados** (nenhuma referência encontrada a estes orquestradores em `packages/` ou `apps/` — código morto, mas ainda viola o Princípio #2 do CLAUDE.md):

| Arquivo | Linhas | Qtd |
|---|---|---|
| `packages/core/tokens/semantic/index.scss` | 11, 14, 17, 20, 23, 26, 33, 36, 39, 42, 45, 48, 51, 58 | 14 |
| `packages/core/tokens/brand/index.scss` | 10, 11, 12 | 3 |
| `packages/core/themes/quasar.variables.scss` | 7 | 1 |

**ATIVO em SFC Vue** (fora do escopo do grep `*.scss`, mas compilado pelo Sass do Vite):

- `packages/core/components/base/DssTabPanels/1-structure/DssTabPanels.ts.vue`, linha 180: `@import '../DssTabPanels.module.scss';` dentro de `<style scoped lang="scss">`.

**Apenas comentários (não violam):** `DssTabPanels.module.scss:4`, `themes/index.scss:17` (`// @import 'quasar.variables';`), `utils/_helpers.scss:8`, `utils/index.scss:37`, `accessibility/index.scss:53–65` (bloco de documentação).

**Total: 25 declarações `@import` ativas em `.scss` (11 na cadeia de build viva + 18... [14+3+1=18 órfãs]) + 1 em `.vue`. REPROVADO** — contradiz a alegação do CLAUDE.md de que "Onda 3 migrou 100% do codebase".

### C3. ⚠️ `_quasar-overrides.scss` usa `@use` corretamente — mas é consumido via `@import`

Evidência — `_quasar-overrides.scss`, linha 7:

```scss
@use '../utils/mixins' as *;
```

O arquivo em si está conforme (usa `@use` para os mixins `dss-focus-ring`). **Porém**, ele é consumido por `themes/index.scss` linha 10 via `@import 'quasar-overrides';` — modo legado. **PARCIALMENTE CONFORME** (interno OK, consumo externo não conforme — coberto pela reprovação C2).

---

## D. SASS COMPILE — 0/2 (1 FALHA DE BUILD + 1 REPROVADO)

### D1. ❌ `npm run core:build` FALHA (erro de JS, não de Sass)

Comando executado: `npm run core:build` (→ `vite build --config vite.config.lib.js` no workspace `@sansys/design-system@2.3.0`). Saída:

```
✓ 143 modules transformed.
x Build failed in 8.39s
error during build:
components/composed/DssChatMessage/index.js (4:7): Expected '{', got 'type'
file: packages/core/components/composed/DssChatMessage/index.js:4:7

2: export { default as DssChatMessage } from './DssChatMessage.vue'
3: export { useChatMessageClasses } from './composables/useChatMessageClasses'
4: export type { DssChatMessageProps, DssChatMessageEmits, ... } from './types/...'
          ^
```

**Causa:** sintaxe TypeScript (`export type`) em arquivo `.js` — Rollup não aceita. Correção: remover o `export type` do barrel `.js` ou renomear para `.ts`. **Build da biblioteca está quebrado** — achado bloqueante independente do escopo Sass.

### D2. ❌ Sass compila sem erros, mas COM warnings de `@import` legado

Verificação isolada do Sass (já que o build Vite aborta antes por D1): `npx sass index.scss` em `packages/core/` → **exit code 0** (zero erros Sass), porém com múltiplos warnings:

```
DEPRECATION WARNING [import]: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
20 │ @import 'focus';        ← tokens/semantic/accessibility/index.scss 20:9
29 │ @import 'contrast';     ← tokens/semantic/accessibility/index.scss 29:9
38 │ @import 'sizing';       ← tokens/semantic/accessibility/index.scss 38:9
48 │ @import 'typography';   ← tokens/semantic/accessibility/index.scss 48:9
 7 │ @import 'quasar-tokens-mapping';  ← themes/index.scss 7:9
WARNING: 2 repetitive deprecation warnings omitted.
```

- Zero erros Sass: ✅
- Zero warnings de `@import` legado: ❌ (7 warnings: 4 + 1 exibidos + 2 omitidos = `quasar-overrides` e `quasar-utilities` de `themes/index.scss`)

**REPROVADO** no critério "zero warnings".

---

## RESUMO DO CHECKLIST (15 itens)

| # | Item | Resultado |
|---|------|-----------|
| 1 | index.html carrega quasar-layered.css | ✅ CONFORME |
| 2 | quasar-layered.css em @layer quasar { } | ✅ CONFORME |
| 3 | quasar-scoped.css removido / _archive com DEPRECATED | ✅ CONFORME |
| 4 | CSS DSS sem @layer | ✅ CONFORME |
| 5 | Unlayered vence @layer (cadeia + testes) | ✅ CONFORME |
| 6 | --q-primary → token DSS | ✅ CONFORME (via --dss-action-primary) |
| 7 | 7 tokens semânticos mapeados | ✅ CONFORME |
| 8 | --q-dark / --q-dark-page → neutros | ✅ CONFORME |
| 9 | Overrides sem --quasar-* | ❌ REPROVADO (16 ocorrências + bug rgba) |
| 10 | .bg-*/.text-* usam var(--dss-*) | ✅ CONFORME |
| 11 | Grep @import executado | ✅ EXECUTADO |
| 12 | Zero @import ativo | ❌ REPROVADO (25 em .scss + 1 em .vue) |
| 13 | _quasar-overrides.scss usa @use | ⚠️ PARCIAL (interno OK; consumido via @import) |
| 14 | core:build sem erros | ❌ FALHA (erro JS em DssChatMessage/index.js:4) |
| 15 | Zero erros Sass / zero warnings @import | ❌ REPROVADO (0 erros, 7 deprecation warnings) |

**Placar: 10 conformes, 1 parcial, 4 reprovados.**

---

## JUSTIFICATIVA DO VEREDICTO

❌ **REPROVADO** — pelos critérios de aceite declarados, qualquer uma das condições abaixo é suficiente, e duas foram confirmadas com evidência física:

1. **`@import` ativo** em `packages/core/` (item 12): 11 declarações na cadeia de build viva (`themes/index.scss`, `tokens/semantic/accessibility/index.scss`) confirmadas por warnings do compilador, 18 em orquestradores órfãos (`tokens/semantic/index.scss`, `tokens/brand/index.scss`, `quasar.variables.scss`) e 1 em `DssTabPanels.ts.vue`.
2. **`--quasar-*` presente nos overrides** (item 9): 16 ocorrências — com a ressalva documentada de que as variáveis são declaradas (não inexistentes), mas incluindo 2 usos efetivamente quebrados (`rgba(var(--quasar-primary), 0.1)`).

Agravante fora do checklist: **build da biblioteca quebrado** por `export type` em `.js` (item 14) — viola o gate de build do CLAUDE.md.

**Ponto forte:** a arquitetura de Cascade Layers (Princípio #13) está integralmente implementada e validada por suíte de regressão — os 5 itens da seção CSS LAYERS passaram sem ressalvas.

### Plano de Correção Recomendado (ordem de prioridade)

1. **P0 — Build:** remover `export type` de `packages/core/components/composed/DssChatMessage/index.js` (linha 4) ou converter o barrel para `.ts`.
2. **P0 — @import vivo:** migrar `themes/index.scss` (3) e `tokens/semantic/accessibility/index.scss` (4) para `@forward`/`@use`.
3. **P1 — Órfãos:** arquivar ou migrar `tokens/semantic/index.scss`, `tokens/brand/index.scss`, `themes/quasar.variables.scss` (nenhuma referência ativa encontrada — candidatos a `_archive/`).
4. **P1 — SFC:** trocar `@import` por `@use` em `DssTabPanels.ts.vue:180`.
5. **P2 — Namespace legado:** migrar as 16 referências `var(--quasar-*)` em `_quasar-overrides.scss` para `var(--q-*)` ou `var(--dss-action-*)`, corrigindo os 2 `rgba(var(--quasar-primary), 0.1)` inválidos (usar `color-mix()` ou token de surface).
