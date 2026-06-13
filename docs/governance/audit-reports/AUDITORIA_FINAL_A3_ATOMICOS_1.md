# AUDITORIA FINAL A3 — Componentes Atômicos (Grupo 1)

**Data:** 2026-06-10
**Auditor:** Claude Code (agente auditor DSS)
**Escopo:** DssButton, DssChip, DssBadge, DssToggle, DssCheckbox, DssRadio, DssAvatar, DssIcon, DssInput, DssTooltip
**Localização:** `packages/core/components/base/<NomeComp>/`
**Baseline normativa:** CLAUDE.md (Gate Estrutural DSS), DSS_COMPONENT_ARCHITECTURE.md, DSS_GOLDEN_COMPONENTS.md, CERTIFIED_COMPONENTS.md
**Método:** Verificação física de arquivos (ls/find), leitura real de código (cat/sed), grep de padrões proibidos. Nenhuma conformidade foi assumida sem evidência.

---

## 1. Sumário Executivo

| Componente | Gate Estrutural | Gate Técnico | Gate Documental | Testes Teclado | **Veredicto** |
|---|---|---|---|---|---|
| DssButton | ❌ FALHA | ✅ OK | ✅ OK | ⚠️ Ausente | **❌ REPROVADO** |
| DssChip | ✅ OK | ❌ FALHA | ✅ OK | ✅ Presente | **❌ REPROVADO** |
| DssBadge | ❌ FALHA | ✅ OK | ✅ OK | N/A (não interativo) | **❌ REPROVADO** |
| DssToggle | ✅ OK | ✅ OK | ✅ OK | ⚠️ Ausente | **⚠️ RESSALVA** |
| DssCheckbox | ✅ OK | ✅ OK | ✅ OK | ⚠️ Ausente | **⚠️ RESSALVA** |
| DssRadio | ❌ FALHA | ✅ OK | ✅ OK | ⚠️ Ausente | **❌ REPROVADO** |
| DssAvatar | ❌ FALHA | ❌ FALHA | ❌ FALHA | N/A (não interativo) | **❌ REPROVADO** |
| DssIcon | ❌ FALHA | ✅ OK | ✅ OK | N/A (não interativo) | **❌ REPROVADO** |
| DssInput | ❌ FALHA | ✅ OK | ✅ OK | ⚠️ Ausente | **❌ REPROVADO** |
| DssTooltip | ❌ FALHA | ✅ OK | ✅ OK | N/A (não interativo) | **❌ REPROVADO** |

**Resultado: 0 aprovados, 2 ressalvas, 8 reprovados.**

### Causas dominantes de reprovação
1. **Barrel export incompleto (7/10 componentes):** o item do Gate Estrutural "index.js DEVE exportar componente, types e composables" (CLAUDE.md, Arquitetura Obrigatória) falha em DssButton, DssBadge, DssRadio, DssAvatar, DssIcon, DssInput e DssTooltip — todos exportam **apenas o componente**. Somente DssChip, DssToggle e DssCheckbox possuem barrel completo.
2. **DssButton possui implementação dupla divergente** em `1-structure/` (achado mais grave da auditoria — ver §2.1).
3. **DssAvatar acumula 4 falhas independentes** (example.vue ausente, 4-output sem index.scss, brands na camada errada, px hardcoded).

> Nota de severidade: a falha de barrel export é **sistêmica e de baixo custo de correção** (adicionar 2 linhas de export por componente). Foi classificada como ❌ por ser item explícito e bloqueante do Gate Estrutural do CLAUDE.md ("Qualquer gate estrutural com falha real" = REPROVADO). Excluída essa falha, DssIcon, DssTooltip, DssBadge e DssInput estariam em ⚠️/✅.

---

## 2. Detalhamento por Componente

### 2.1 DssButton — ❌ REPROVADO

| Item | Status | Evidência |
|---|---|---|
| 1-structure/DssButton.ts.vue | ✅ | Existe (257 linhas) |
| 2-composition/_base.scss | ✅ | Existe |
| 3-variants/ + index.scss | ✅ | 6 variantes + index.scss |
| 4-output/ (_states, _brands, index) | ✅ | Completo |
| Wrapper re-export puro | ❌ | **Aponta para implementação errada** (ver abaixo) |
| module.scss L2→L3→L4 | ✅ | Ordem correta |
| index.js (comp + types + composables) | ❌ | Exporta só o componente; `types/button.types.ts` e 3 composables existem mas não são exportados |
| dss.meta.json campos obrigatórios | ✅ | goldenReference, goldenContext, previewGroup, defaultPreview.demoSlots OK |
| DssButton.test.js | ✅ | 740 linhas, 69 testes, sem stubs |
| _base.scss sem hardcoded | ✅ | Apenas `letter-spacing: 0.01em` (exceção documentada no meta.json, "Seção 13.1") |
| _brands.scss data-brand | ✅ | hub, water, waste |
| ::before só touch target | ✅ | Nenhum uso de ::before |
| brightness canônico | ✅ | 0.95, 0.9 (`3-variants/_unelevated.scss:16,20`) |
| Cores via utility classes no Vue | ✅ | 10 ocorrências bg-*/text-* em composables/structure |
| README + API | ✅ | README.md, DSSBUTTON_API.md |
| example.vue ≥ 3 cenários | ✅ | 310 linhas, 17 seções |
| visualProperties espelha CSS | ✅ | 14 propriedades, campo `source` referencia arquivos SCSS reais |
| Testes de teclado | ⚠️ | **Zero** testes keydown/Enter/Space em 740 linhas — só `trigger('click')` |

**❌ FALHA ESTRUTURAL CRÍTICA — Implementação dupla divergente:**
- `1-structure/` contém **dois arquivos de implementação**: `DssButton.vue` (295 linhas, legado) e `DssButton.ts.vue` (257 linhas, canônico).
- O wrapper raiz `DssButton.vue` importa `./1-structure/DssButton.vue` (legado), enquanto `index.js` importa `./1-structure/DssButton.ts.vue` (canônico).
- **As duas implementações divergem em acessibilidade**: o `.ts.vue` possui `:aria-label`, `:aria-busy`, `:aria-disabled`, `role="status"`, `aria-live="polite"` no spinner; o `.vue` legado **não possui nenhum desses atributos ARIA**.
- Consequência: consumidores que importam via wrapper recebem um botão **sem ARIA**; via barrel, recebem o canônico. Viola o Princípio #11 (wrapper DEVE apontar para `1-structure/DssNomeComponente.ts.vue`).
- **Correção:** apontar o wrapper para `.ts.vue` e remover `1-structure/DssButton.vue`.

Observação técnica (não bloqueante): `4-output/_states.scss:95-99` usa `#000 !important` dentro de `@media print` — exceção comum, mas fora da tabela de exceções documentadas; recomenda-se registrar ou tokenizar.

---

### 2.2 DssChip — ❌ REPROVADO (Golden Reference interativo)

| Item | Status | Evidência |
|---|---|---|
| Gate estrutural completo | ✅ | 4 camadas, wrapper puro → `.ts.vue`, module.scss L2→L3→L4, meta.json completo, test.js |
| index.js barrel | ✅ | **Único do grupo com barrel exemplar** (componente via wrapper + composables + types) |
| _base.scss sem hardcoded | ⚠️ | `_base.scss:157` → `outline-offset: 1px` (hardcoded, sem token nem exceção documentada) |
| _brands.scss data-brand | ✅ | hub, water, waste (por variante: filled/outline/flat) |
| ::before só touch target | ✅ | `_base.scss:39` touch target WCAG 2.5.5; efeitos visuais via ::after |
| brightness canônico | ✅ | 0.95, 0.9, 0.92, 0.85, 1.1, 1.2 — todos canônicos, com exceções documentadas |
| Cores via utility classes | ❌ | **Ver falha abaixo** |
| Documental | ✅ | README, API, example (555 linhas, 22 seções), visualProperties com source SCSS |
| Testes de teclado | ✅ | **Único do grupo**: `test.js:318-338` — Enter, Space, Tab (`trigger('keydown.enter')` etc.) |

**❌ FALHA TÉCNICA — Cor literal aplicada no SCSS:**
- `3-variants/_outline.scss` linhas 22, 27, 45, 55 (+2 no bloco remove): `color: white;` aplicado diretamente no SCSS para estados hover/selected da variante outline.
- Viola o Princípio #1 (Token First — nenhuma cor literal) e o Princípio #3 (cores não são aplicadas no SCSS). O token correto existe: `var(--dss-text-inverse)` (o próprio meta.json do componente o referencia como "branco").
- Severidade: localizada (1 arquivo, 1 variante), correção trivial — substituir `white` por `var(--dss-text-inverse)`.
- Agravante de governança: DssChip é **Golden Reference interativo** — a falha se propaga como referência para auditorias de outros componentes.

---

### 2.3 DssBadge — ❌ REPROVADO (Golden Reference não interativo)

| Item | Status | Evidência |
|---|---|---|
| 4 camadas + wrapper puro + module.scss L2→L3→L4 | ✅ | Conforme |
| index.js barrel | ❌ | Exporta só `DssBadge`; `types/badge.types.ts` e `useBadgeClasses` existem mas não são exportados |
| Arquivo órfão com import quebrado | ❌ | `4-output/DssBadge.scss` (legado, fora da arquitetura) contém `@use '../3-variants/colors'` — **`3-variants/_colors.scss` não existe**. O arquivo não é importado pelo module.scss (não quebra o build atual), mas é código morto com referência inválida que falharia se compilado. Deve ser removido |
| _base.scss sem hardcoded | ✅ | Zero ocorrências |
| _brands.scss data-brand | ✅ | hub, water, waste |
| ::before | ✅ | Não usa (não interativo, sem touch target — decisão correta) |
| Cores | ✅ | `useBadgeClasses.ts` aplica bg-*/text-* (padrão Quasar); sistema colors apenas em `@media (forced-colors)` |
| Documental | ✅ | README, API, example (532 linhas), visualProperties com sources |
| test.js | ✅ | 367 linhas, 32 testes, sem stubs |

---

### 2.4 DssToggle — ⚠️ RESSALVA

| Item | Status | Evidência |
|---|---|---|
| Gate estrutural completo | ✅ | 4 camadas (3-variants só com index.scss — Fase 1 sem variantes, documentado no orquestrador), wrapper puro, L2→L3→L4, meta.json OK, test.js OK |
| index.js barrel | ✅ | Componente + useToggleClasses + types (nota menor: importa de `1-structure/` direto em vez do wrapper) |
| _base.scss sem hardcoded | ✅ | Apenas padrão sr-only (`width/height: 1px; margin: -1px`) para input nativo visualmente oculto — padrão a11y universal, aceitável |
| _brands.scss data-brand | ✅ | hub, water, waste (contexto + direto) |
| ::before só touch target | ✅ | `_base.scss:64` cria touch target; `:322` e `_states.scss:137` apenas o **removem** (dense/print) — conforme |
| brightness canônico | ✅ | 0.95, 0.90, 1.1, 1.2 — todos com exceção documentada |
| Documental | ✅ | README, API, example (124 linhas, 9 seções), visualProperties com sources |
| **Testes de teclado** | ⚠️ | **Zero** testes keydown/Enter/Space em 503 linhas/55 testes. Header do arquivo promete "keyboard" mas só há `trigger('change')`. Componente é `role="switch"` — Space é interação primária |

---

### 2.5 DssCheckbox — ⚠️ RESSALVA

| Item | Status | Evidência |
|---|---|---|
| Gate estrutural completo | ✅ | Idêntico ao DssToggle em conformidade (4 camadas, wrapper puro, L2→L3→L4, barrel completo com types+composables, meta.json OK) |
| _base.scss sem hardcoded | ✅ | Apenas padrão sr-only (1px) |
| _brands.scss data-brand | ✅ | hub, water, waste |
| ::before só touch target | ✅ | `_base.scss:57` (touch target WCAG 2.5.5) |
| brightness canônico | ✅ | 0.95, 0.90, 1.1, 1.2 — exceções documentadas |
| Documental | ✅ | README, API, example (282 linhas, 12 cenários), visualProperties OK |
| **Testes de teclado** | ⚠️ | **Zero** testes de teclado em 466 linhas/50 testes — só `trigger('change')`. Space toggle não coberto |

---

### 2.6 DssRadio — ❌ REPROVADO

| Item | Status | Evidência |
|---|---|---|
| 4 camadas + wrapper puro + L2→L3→L4 | ✅ | Conforme |
| index.js barrel | ❌ | `index.js` tem **5 linhas** e exporta apenas `DssRadio`. `types/radio.types.ts` e `composables/useRadioClasses.ts` existem e **não são exportados** |
| meta.json + test.js | ✅ | Campos obrigatórios OK; test.js 235 linhas, 24 testes, sem stubs |
| _base.scss sem hardcoded | ✅ | Apenas sr-only (1px) |
| _brands.scss data-brand | ✅ | hub, water, waste (contexto + direto) |
| ::before só touch target | ✅ | `_base.scss:40` cria; `:246` (dense) e `_states.scss:173` (print) removem — conforme |
| brightness canônico | ✅ | 0.95, 0.90, 1.10, 1.20 |
| Documental | ✅ | README, API, example (268 linhas, 9 cenários) |
| **Testes de teclado** | ⚠️ | **Zero** testes de teclado (Arrow keys são navegação primária de radio group — nem Tab nem Arrows cobertos) |

---

### 2.7 DssAvatar — ❌ REPROVADO (maior número de falhas do grupo)

| Item | Status | Evidência |
|---|---|---|
| 1-structure/DssAvatar.ts.vue | ✅ | Existe (há também `1-structure/DssAvatar.vue` adicional — verificar se é resíduo legado, mesmo padrão de risco do DssButton) |
| 4-output com index.scss | ❌ | **`4-output/index.scss` NÃO existe.** Orquestrador L4 chama-se `4-output/DssAvatar.scss` (nome não canônico). O checklist exige `_states.scss`, `_brands.scss` **e `index.scss`** |
| Brands na camada correta | ❌ | Brands reais (`[data-brand="hub|water|waste"]`) estão em **`3-variants/_brands.scss`** (camada errada). O `4-output/_brands.scss` é casca vazia que declara: "Brands sao definidos completamente em 3-variants/_brands.scss". Viola a arquitetura de 4 camadas (brands pertencem à L4) |
| index.js barrel | ❌ | Exporta só o componente; types + 2 composables não exportados |
| _base.scss sem hardcoded | ❌ | `2-composition/_base.scss:263-275`: `@media (max-width: 768px)`, `width/height: 64px`, `56px` hardcoded; `:237` `outline-offset: 2px`. Comentários admitem ausência de token mas não há registro de exceção aprovada (Princípio #9 exige justificativa explícita **e aprovação**) |
| **DssAvatar.example.vue** | ❌ | **ARQUIVO NÃO EXISTE.** Único componente do grupo sem example.vue (mínimo obrigatório: 3 cenários) |
| meta.json + test.js | ✅ | Campos obrigatórios OK; test.js 294 linhas, 36 testes |
| visualProperties espelha CSS | ⚠️ | `min-height/min-width: 40px` com `token: null` e `source: "defaultPreview"` (auto-referente, não aponta CSS); porém `_base.scss:26` documenta md = **48px** — possível divergência meta ↔ CSS a validar |
| README + API | ✅ | Existem |

---

### 2.8 DssIcon — ❌ REPROVADO

| Item | Status | Evidência |
|---|---|---|
| 4 camadas + wrapper puro + L2→L3→L4 | ✅ | Conforme (3-variants: sizes, semantic, animations + index) |
| index.js barrel | ❌ | Exporta só `DssIcon`; `types/icon.types.ts` e `useIconClasses` não exportados |
| meta.json + test.js | ✅ | Campos OK; test.js 219 linhas, 24 testes, sem stubs |
| _base.scss sem hardcoded | ✅ | Zero ocorrências |
| _brands.scss data-brand | ✅ | hub, water, waste |
| ::before / brightness | ✅ | Não usa nenhum dos dois |
| Documental | ✅ | README, API, example (314 linhas, 13 seções) |
| visualProperties | ⚠️ | `min-height/min-width/font-size: 24px` com `token: null` e source `"defaultPreview"`/"size prop" — formato fora do padrão (não referencia arquivo CSS) |

---

### 2.9 DssInput — ❌ REPROVADO

| Item | Status | Evidência |
|---|---|---|
| 4 camadas + wrapper puro + L2→L3→L4 | ✅ | Conforme (4 variantes + index) |
| index.js barrel | ❌ | Exporta só `DssInput` (importado direto de `1-structure/`, bypassando o wrapper); `types/input.types.ts` e **3 composables** (useInputActions, useInputClasses, useInputState) não exportados |
| Resíduos no repositório | ⚠️ | `1-structure/DssInput.vue.legacy` e `DssInput.module.css`/`.css.map` (artefatos compilados commitados) — higiene, não bloqueante |
| meta.json + test.js | ✅ | Campos OK; test.js 287 linhas, 32 testes, sem stubs |
| _base.scss sem hardcoded | ✅ | Zero ocorrências |
| _brands.scss data-brand | ✅ | hub, water, waste |
| ::before / brightness | ✅ | Não usa |
| Cores | ✅ | Via tokens no SCSS (campo de formulário — sem padrão bg-*/text-*, coerente com meta.json "via Quasar :color") |
| Documental | ✅ | README, API, example (379 linhas, 18 seções), visualProperties com sources SCSS detalhados |
| **Testes de teclado** | ⚠️ | **Zero** testes de teclado em 287 linhas — apenas `trigger('focus')`, `trigger('blur')`, `trigger('click')` no clear. Enter (submit) e navegação não cobertos |

---

### 2.10 DssTooltip — ❌ REPROVADO

| Item | Status | Evidência |
|---|---|---|
| 4 camadas + wrapper puro + L2→L3→L4 | ✅ | Conforme |
| index.js barrel | ❌ | Exporta só `DssTooltip`; `types/tooltip.types.ts` e `useTooltipClasses` não exportados |
| meta.json + test.js | ✅ | Campos OK; test.js 278 linhas, 28 testes, sem stubs |
| _base.scss sem hardcoded | ✅ | Zero ocorrências |
| _brands.scss data-brand | ✅ | hub, water, waste |
| ::before | ✅ | Proibição explícita documentada e cumprida ("decisao congelada") |
| brightness | ✅ | Não usa |
| Documental | ✅ | README, API, example (369 linhas, 12 seções), visualProperties com sources |

---

## 3. Achados Transversais

### 3.1 Bloqueantes
| # | Achado | Componentes | Norma violada |
|---|---|---|---|
| T-01 | Barrel export não exporta types e composables | Button, Badge, Radio, Avatar, Icon, Input, Tooltip (7/10) | CLAUDE.md — Gate Estrutural ("index.js DEVE exportar componente, types e composables") |
| T-02 | Implementação dupla divergente em 1-structure; wrapper aponta para versão legada **sem ARIA** | DssButton (verificar também DssAvatar e DssBadge, que possuem `.vue` extra em 1-structure) | Princípio #11 (Entry Point Wrapper) |
| T-03 | Cor literal `white` aplicada em SCSS | DssChip (`3-variants/_outline.scss`) | Princípios #1 e #3 |
| T-04 | 4-output sem index.scss + brands na L3 + px hardcoded + example.vue ausente | DssAvatar | Arquitetura 4 camadas; Token First; Piso Mínimo de Documentação |
| T-05 | Arquivo órfão com `@use` para módulo inexistente (`3-variants/colors`) | DssBadge (`4-output/DssBadge.scss`) | Higiene estrutural |

### 3.2 Não-bloqueantes (ressalvas)
| # | Achado | Componentes |
|---|---|---|
| T-06 | **Nenhum teste de navegação por teclado** (Tab/Enter/Space/Arrows) nos componentes interativos, exceto DssChip | Button, Toggle, Checkbox, Radio, Input |
| T-07 | `outline-offset: 1px` hardcoded | DssChip |
| T-08 | `#000` em `@media print` sem exceção registrada | DssButton |
| T-09 | visualProperties com `token: null` e source não-CSS ("defaultPreview", "Seção 13.x") | Avatar, Icon, Button (letter-spacing), Badge (line-height) |
| T-10 | Artefatos compilados commitados (`.module.css`, `.css.map`) | Button, Toggle, Radio, Input |

**Ponto positivo:** zero testes stub no grupo (nenhum `expect(true).toBe(true)`); todos os 10 test.js têm cobertura real (24–69 testes cada). Valores brightness 100% canônicos. Convenção ::before/::after 100% respeitada nos 10 componentes. Sistema colors (`ButtonFace`, `Highlight` etc.) usados exclusivamente dentro de `@media (forced-colors: active)` — correto.

---

## 4. Plano de Correção Recomendado (ordem de prioridade)

1. **DssButton (T-02):** apontar wrapper para `1-structure/DssButton.ts.vue`, deletar `1-structure/DssButton.vue` legado. Auditar `DssAvatar/1-structure/DssAvatar.vue` e `DssBadge/1-structure/DssBadge.vue` pelo mesmo padrão.
2. **T-01 (7 componentes):** completar barrel exports com types + composables (modelo: `DssChip/index.js`).
3. **DssChip (T-03):** `color: white` → `var(--dss-text-inverse)` em `_outline.scss` (6 ocorrências).
4. **DssAvatar (T-04):** criar `DssAvatar.example.vue` (≥3 cenários); renomear `4-output/DssAvatar.scss` → `index.scss`; mover brands para `4-output/_brands.scss`; tokenizar 64px/56px/768px ou registrar exceção aprovada; validar divergência 40px vs 48px no meta.json.
5. **DssBadge (T-05):** remover `4-output/DssBadge.scss` órfão.
6. **T-06:** adicionar testes de teclado (modelo: `DssChip.test.js:318-338`) a Button, Toggle, Checkbox, Radio, Input.

---

*Relatório gerado por auditoria automatizada com leitura real de código. Evidências citadas com caminho e linha. Nenhum componente deste grupo está elegível para selo DSS v2.2 sem as correções de T-01 a T-05.*
