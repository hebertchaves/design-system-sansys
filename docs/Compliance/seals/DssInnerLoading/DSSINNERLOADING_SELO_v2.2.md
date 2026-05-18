# SELO DE CONFORMIDADE DSS v2.2 — DssInnerLoading

> **Arquivo histórico e imutável.**
> Não deve ser editado após emissão.
> Alterações no componente invalidam este selo.
> Nova auditoria → novo ciclo → novo arquivo de selo.

**Caminho canônico:**
`DSS/docs/Compliance/seals/DssInnerLoading/DSSINNERLOADING_SELO_v2.2.md`

---

## 1. Identificação

| Campo | Valor |
|---|---|
| **Componente** | `DssInnerLoading` |
| **Versão DSS** | 2.2 |
| **Fase** | 2 |
| **Nível** | 1 — Overlay de loading para container |
| **Família** | Progresso e Feedback |
| **Categoria** | Overlay de loading local (não interativo) |
| **Fase de Emissão** | Fase 2 |
| **Data de Emissão** | 2026-05-18 |
| **Auditor** | Claude (DSS Agent) |
| **Golden Reference** | DssBadge (componente não interativo — governança global de categoria) |
| **Golden Context** | DssCircularProgress (componente de progresso irmão — baseline de auditoria específico) |
| **Dependências DSS Internas** | DssSpinner (renderizado no slot default padrão) |
| **Quasar Base** | `QInnerLoading` |
| **Ciclos de Auditoria** | 2 (1 NC corrigida no Ciclo 1; 5 GAPs corrigidos; 0 NCs remanescentes) |
| **Status** | `conformant` |

---

## 2. Não-Conformidades

**Nenhuma não-conformidade remanescente.**

A 1 NC identificada no Ciclo 1 foi corrigida antes da emissão do selo.

**NCs corrigidas — Ciclo 1:**

| ID | Severidade | Descrição | Correção aplicada |
|----|-----------|-----------|-------------------|
| NC-01 | Não-bloqueante | `2-composition/_base.scss` — `.dss-inner-loading__label` continha `line-height: 1.4` — valor hardcoded sem token DSS correspondente (Token First violation). O token `--dss-line-height-xs: 1.4` existe no catálogo DSS em `tokens/semantic/accessibility/_typography.scss`. | Substituído por `line-height: var(--dss-line-height-xs)`. Token adicionado ao `dss.meta.json` `tokensUsed` e à tabela de tokens na API reference. |

**GAPs corrigidos — Ciclo 1 (não são NCs — registrados para rastreabilidade):**

| ID | Natureza | Correção aplicada |
|----|----------|-------------------|
| GAP-01 | Pré-prompt Seção 4: `rgba(var(--dss-surface-default-rgb), 0.7)` — token fantasma (`-rgb` suffix não existe no catálogo DSS). | Overlay implementado com `var(--dss-surface-default)` sólido. Documentado como EX-Overlay-01 com justificativa completa. |
| GAP-02 | Pré-prompt Seção 4: `--dss-z-index-overlay` para z-index do overlay. | Não implementado: QInnerLoading usa `position: absolute` dentro do container pai — z-index relativo ao stacking context do pai é suficiente sem token explícito. QInnerLoading não define z-index próprio. |
| GAP-03 | Pré-prompt Seção 6: `DssText` mencionado como dependência interna. | `DssText` não existe no catálogo DSS atual. Label implementado com `<span class="dss-inner-loading__label">` e tokens tipográficos diretos (`--dss-font-size-sm`, `--dss-font-weight-medium`, `--dss-line-height-xs`). |
| GAP-04 | Pré-prompt Seção 5: `aria-busy="true"` mencionado como atributo que o container pai deveria receber. | Responsabilidade do consumer (componente pai que usa DssInnerLoading). Documentado em DssInnerLoading.md Seção 5 como requisito de uso. DssInnerLoading não manipula DOM fora de si mesmo por design. |
| GAP-05 | Pré-prompt Seção 9 (linhas 104–157): ~50 linhas de conteúdo padding genérico não-técnico (motivação, sustentabilidade, diversidade, "fim", "obrigado"). | Ignorado na implementação. Não contém diretivas técnicas DSS. |

**Ciclo 2:** 0 NCs. 0 Ressalvas. Reconciliação SCSS ↔ documentação ↔ meta.json verificada sem divergências.

---

## 3. Ressalvas

**Nenhuma ressalva.**

As limitações inerentes ao `QInnerLoading` e as decisões arquiteturais (overlay sólido sem opacidade, z-index não explícito, DssSpinner como dependência com `aria-hidden="true"`) estão documentadas na especificação como comportamentos esperados, não como deficiências do DssInnerLoading.

---

## 4. Conformidades

### Tokens — PASS / CONFORME
18 tokens utilizados — todos presentes no catálogo DSS. Zero tokens fantasmas após NC-01 corrigida. Zero valores hardcoded (exceto exceções estruturais documentadas: `border-radius: inherit` depende do pai; `pointer-events: all`, `user-select: none`, `-webkit-tap-highlight-color: transparent` são propriedades estruturais sem equivalente em tokens; `0.01ms` e `1` em prefers-reduced-motion são valores estruturais canônicos — precedente DssLinearProgress; SystemColor keywords em forced-colors são keywords CSS standard — precedente DssCircularProgress).

### Touch Target — PASS / CONFORME
Componente de feedback visual não interativo. Touch target declarado como N/A — `::before` não implementado (Opção B). Consistente com DssBadge (Golden Reference) e DssCircularProgress (Golden Context).

### Arquitetura — PASS / CONFORME
**Gate Estrutural DSS verificado:**
- **4 camadas presentes:** `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` — todas existentes com conteúdo ou justificativa documentada de vazio intencional (`_sizes.scss`: size é prop-driven via DssSpinner).
- **Orquestrador SCSS:** `DssInnerLoading.module.scss` importa `L2 → L3 → L4` na ordem exata obrigatória.
- **Entry Point Wrapper:** `DssInnerLoading.vue` presente na raiz — re-export puro da Layer 1. Sem `<template>`, `<style>` ou lógica própria.
- **`index.js`:** exporta wrapper (`DssInnerLoading`), composable (`useInnerLoadingClasses`) e 3 types (`InnerLoadingProps`, `InnerLoadingSlots`, e types via `*`).
- **`dss.meta.json`:** `goldenReference: "DssBadge"` e `goldenContext: "DssCircularProgress"` declarados; 6 exceções documentadas; `statesNotApplicable` com razões explícitas; `propsBlocked` declarado; `gateExceptions.templateStructure` presente.

**Decisões arquiteturais documentadas:**
- EXC-Gate-01: QInnerLoading como root element — provê posicionamento absoluto, layout flex column/center e fade transition nativa via Vue `<Transition>`. Duplicar em wrapper div seria redundante e introduziria risco de posicionamento incorreto.
- EX-States-01: `animation: none !important; transition: none !important` em prefers-reduced-motion — suprime keyframes do DssSpinner (QSpinner) E q-transition--fade do QInnerLoading. WCAG 2.3.3. Precedente DssLinearProgress, DssCircularProgress.
- EX-States-02: `display: none` em print — overlay de loading oculto. Precedente DssCircularProgress.
- EX-States-03: SystemColor keywords em forced-colors — `Canvas`, `CanvasText`, `ButtonText`. `forced-color-adjust` NÃO utilizado (herdado e afetaria slot). Precedente DssCircularProgress.
- EX-Overlay-01: `background-color: var(--dss-surface-default)` sólido — token `-rgb` não existe no catálogo DSS. Overlay sólido garante máximo contraste.
- EX-Structural-01: `border-radius: inherit` — valor dependente da geometria do pai em runtime.
- `defineEmits` omitido — container não-emissor. Precedente: DssLinearProgress, DssCircularProgress, DssPageSticky.
- `withDefaults` apenas para `color: 'primary'` e `size: 'md'` — defaults não-triviais. `delay` omitido de `withDefaults` (0 é trivial; QInnerLoading usa 0 como default quando `undefined` é passado).
- DssSpinner com `aria-hidden="true"` no slot default: root tem `role="status"` como anunciador primário. DssSpinner com `inheritAttrs:false` e `v-bind="$attrs"` encaminha `aria-hidden="true"` ao seu root span, suprimindo anúncio redundante.

### Estados — PASS / CONFORME
Estados aplicáveis (`showing`/`not-showing`, `com label`, `com delay`, `com slot customizado`) implementados. Estados não-aplicáveis (`hover`, `focus`, `active`, `disabled`, `error`) declarados explicitamente em `dss.meta.json` com `statesNotApplicable`, em `DssInnerLoading.md` Seção 3 e em `DSSINNERLOADING_API.md`.

### Acessibilidade — PASS / CONFORME
- `role="status"` + `aria-live="polite"` no root (QInnerLoading): anuncia loading sem interromper leitura (WCAG 4.1.3).
- `aria-hidden="true"` no DssSpinner interno do slot default: evita anúncio duplo.
- `pointer-events: all`: bloqueia interações com conteúdo abaixo do overlay.
- `prefers-reduced-motion: reduce`: animação do DssSpinner + fade transition suprimidos (WCAG 2.3.3 Nível AAA).
- `forced-colors: active`: `Canvas` (background), `CanvasText` (texto), `ButtonText` (border) via SystemColor keywords. `forced-color-adjust` NÃO utilizado (WCAG 1.4.11).
- `prefers-contrast: more`: label com `font-weight: var(--dss-font-weight-bold)`.
- `defineOptions({ inheritAttrs: false })` + `v-bind="$attrs"` — atributos ARIA extras do consumer forwarded ao root.

### Documentação — PASS / CONFORME
- `README.md`: quick start com requisito `position:relative`, variações, tokens — piso mínimo atendido.
- `DssInnerLoading.md`: Template 13.1 completo (10 seções) — classificação, API, estados, tokens, acessibilidade, comportamentos implícitos, paridade Golden Reference/Context, composição, exceções, changelog.
- `DSSINNERLOADING_API.md`: props, props bloqueadas, slots, events (Nenhum), composable, CSS classes, tabela de tokens, comportamentos implícitos, comparação Golden Reference/Context — API documentada fiel à implementação.
- `DssInnerLoading.example.vue`: 7 cenários — playground, DssCard, formulário, slot customizado, todas as cores, todos os tamanhos, brand context. Zero hardcoded px/hex/rgb.
- `dss.meta.json`: schema correto, 6 exceptions, `propsBlocked` (3 props), `compositionRecommendations`, `gateExceptions.templateStructure`.
- Pré-prompt: 5 GAPs identificados e corrigidos na implementação (GAP-01 token fantasma, GAP-02 z-index desnecessário, GAP-03 DssText inexistente, GAP-04 aria-busy no consumer, GAP-05 conteúdo padding não-técnico).

---

## 5. Histórico de Auditoria

| Ciclo | Data | Auditor | Resumo |
|-------|------|---------|--------|
| 1 | 2026-05-18 | Claude (DSS Agent) | Auditoria inicial. 1 NC corrigida (NC-01: `line-height: 1.4` hardcoded → `var(--dss-line-height-xs)`). 5 GAPs registrados e corrigidos (token fantasma -rgb, z-index desnecessário, DssText inexistente, aria-busy no consumer, conteúdo padding). |
| 2 | 2026-05-18 | Claude (DSS Agent) | Ciclo de verificação. 0 NCs adicionais. Reconciliação SCSS ↔ documentação ↔ meta.json completa sem divergências. 0 Ressalvas. Selo emitido. |

---

## 6. Resultado

```
CONFORME — SELO DSS v2.2 CONCEDIDO

Componente: DssInnerLoading
Data de emissão: 2026-05-18
Arquitetura DSS: v2.2

Este documento é histórico e imutável.
Alterações no componente após esta data invalidam o selo.
Nova auditoria → novo ciclo → novo arquivo de selo.
```
