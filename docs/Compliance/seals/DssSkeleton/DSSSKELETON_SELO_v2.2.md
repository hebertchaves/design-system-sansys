# SELO DE CONFORMIDADE DSS v2.2 — DssSkeleton

> **Arquivo histórico e imutável.**
> Não deve ser editado após emissão.
> Alterações no componente invalidam este selo.
> Nova auditoria → novo ciclo → novo arquivo de selo.

**Caminho canônico:**
`DSS/docs/Compliance/seals/DssSkeleton/DSSSKELETON_SELO_v2.2.md`

---

## 1. Identificação

| Campo | Valor |
|---|---|
| **Componente** | `DssSkeleton` |
| **Versão DSS** | 2.2 |
| **Fase** | 2 |
| **Nível** | 1 — Placeholder visual de carregamento |
| **Família** | Progresso e Feedback |
| **Categoria** | Placeholder de carregamento (skeleton screen) |
| **Fase de Emissão** | Fase 2 |
| **Data de Emissão** | 2026-05-18 |
| **Auditor** | Claude (DSS Agent) |
| **Golden Reference** | DssBadge (componente não interativo — governança global de categoria) |
| **Golden Context** | DssInnerLoading (componente de feedback de loading irmão — baseline de auditoria específico) |
| **Dependências DSS Internas** | Nenhuma |
| **Quasar Base** | `QSkeleton` |
| **Ciclos de Auditoria** | 2 (1 NC corrigida no Ciclo 1; 0 NCs remanescentes) |
| **Status** | `conformant` |

---

## 2. Não-Conformidades

**Nenhuma não-conformidade remanescente.**

A 1 NC identificada no Ciclo 1 foi corrigida antes da emissão do selo.

**NCs corrigidas — Ciclo 1:**

| ID | Severidade | Descrição | Correção aplicada |
|----|-----------|-----------|-------------------|
| NC-01 | Não-bloqueante | `4-output/_states.scss` — `@media (prefers-contrast: more)` ausente. DssBadge (Golden Reference) aplica `border: 1px solid currentColor` em alto contraste para demarcar visualmente os limites do componente. DssSkeleton não implementava esta media query e não documentava como N/A. | Adicionado `@media (prefers-contrast: more) { .dss-skeleton .q-skeleton { border: 1px solid currentColor; } }`. DssSkeleton.md Seção 3 e DSSSKELETON_API.md atualizados com o novo estado. |

**Ciclo 2:** 0 NCs. 0 Ressalvas. Reconciliação SCSS ↔ documentação ↔ meta.json verificada sem divergências.

---

## 3. Ressalvas

**Nenhuma ressalva.**

As limitações inerentes ao `QSkeleton` e as decisões arquiteturais (div wrapper por causa da prop `lines`, descendant selectors para override de background/radius/border, `aria-hidden="true"` no root) estão documentadas na especificação como comportamentos esperados e exceções registradas, não como deficiências do DssSkeleton.

---

## 4. Conformidades

### Tokens — PASS / CONFORME
13 tokens utilizados — todos presentes no catálogo DSS. Zero tokens fantasmas. Zero valores hardcoded (exceto exceções estruturais documentadas: `0.01ms` e `1` em prefers-reduced-motion são valores canônicos — precedente DssLinearProgress, DssInnerLoading; SystemColor keywords em forced-colors são keywords CSS standard — precedente DssCircularProgress, DssInnerLoading; `70%` para última linha multi-linha — EX-Structural-01, valor canônico web sem token DSS correspondente).

### Touch Target — PASS / CONFORME
Componente de placeholder visual não interativo. Touch target declarado como N/A — `::before` não implementado (Opção B). Consistente com DssBadge (Golden Reference) e DssInnerLoading (Golden Context).

### Arquitetura — PASS / CONFORME
**Gate Estrutural DSS verificado:**
- **4 camadas presentes:** `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` — todas existentes com conteúdo.
- **Orquestrador SCSS:** `DssSkeleton.module.scss` importa `L2 → L3 → L4` na ordem exata obrigatória. Aliases `as variants` e `as output` prevenem conflito de namespace "index".
- **Entry Point Wrapper:** `DssSkeleton.vue` presente na raiz — re-export puro da Layer 1. Sem `<template>`, `<style>` ou lógica própria.
- **`index.js`:** exporta wrapper (`DssSkeleton`), composable (`useSkeletonClasses`) e types (`SkeletonType`, `SkeletonAnimation`, `SkeletonBrand`, `SkeletonRadius`, `SkeletonProps`, `SkeletonSlots`).
- **`dss.meta.json`:** `goldenReference: "DssBadge"` e `goldenContext: "DssInnerLoading"` declarados; 7 exceções documentadas; `statesNotApplicable` com razões explícitas; `propsBlocked` declarado (5 props Quasar); `gateExceptions.templateStructure` presente.

**Decisões arquiteturais documentadas:**
- **Div wrapper como root (vs QSkeleton como root):** A prop `lines` requer múltiplos QSkeleton filhos quando `type='text'` e `lines > 1`. Um root condicional (às vezes QSkeleton, às vezes div) viola a consistência arquitetural DSS. Consistência do wrapper div é preferida — documentado em `gateExceptions.templateStructure`.
- EXC-Gate-01: `.dss-skeleton .q-skeleton { background-color }` — QSkeleton aplica background-color via CSS interno sem hook de CSS custom property. Descendant selector obrigatório para injetar token DSS. Padrão consistente com DssPagination `--q-color-primary`.
- EXC-Gate-02: `.dss-skeleton--type-* .q-skeleton { border-radius }` — override de border-radius via `--dss-skeleton-radius` (CSS custom property chain: inline style injeta `var(--dss-radius-*)`, SCSS usa `var(--dss-skeleton-radius, var(--dss-radius-sm))`). Não aplicado a circle/avatar.
- EXC-Gate-03: `.q-skeleton.q-skeleton--bordered { border-color }` — QSkeleton aplica border-color interna; DSS sobrescreve com `--dss-gray-200`.
- EX-States-01: `animation: none !important` em prefers-reduced-motion — suprime keyframes do QSkeleton (incluindo `::after` pseudo-element wave/pulse). WCAG 2.3.3. Precedente: DssLinearProgress, DssCircularProgress, DssInnerLoading.
- EX-States-02: `display: none` em print — skeleton oculto. Precedente: DssCircularProgress, DssInnerLoading.
- EX-States-03: SystemColor keywords em forced-colors — `Canvas`, `CanvasText`. `::after` suprimido (display:none) — shimmer perde semântica em forced-colors. `forced-color-adjust` NÃO utilizado (sem slot para proteger). WCAG 1.4.11. Precedente: DssCircularProgress, DssInnerLoading.
- EX-Structural-01: `70%` — última linha multi-linha text — valor canônico web sem token DSS correspondente.
- `defineEmits` omitido — container não-emissor. Precedente: DssLinearProgress, DssCircularProgress, DssInnerLoading.
- `withDefaults` apenas para `type: 'rect'` e `animation: 'wave'` — defaults não-triviais. Demais props com `undefined` implícito: omitidos do `withDefaults`.

### Estados — PASS / CONFORME
Estados aplicáveis (`wave`, `pulse`, `none`, `dark mode`, `prefers-contrast: more`, `prefers-reduced-motion`, `forced-colors`, `print`) implementados. Estados não-aplicáveis (`hover`, `focus`, `active`, `disabled`, `error`) declarados explicitamente em `dss.meta.json` com `statesNotApplicable`, em `DssSkeleton.md` Seção 3 e em `DSSSKELETON_API.md`.

### Acessibilidade — PASS / CONFORME
- `aria-hidden="true"` no root div: DssSkeleton é placeholder visual puro — leitores de tela ignoram completamente (WCAG — non-text content in decorative state).
- `aria-busy` é responsabilidade do consumer: documentado em DssSkeleton.md Seção 5 e nos `compositionRecommendations` do `dss.meta.json`.
- `prefers-reduced-motion: reduce`: toda animação QSkeleton suprimida, incluindo `::after` keyframes (WCAG 2.3.3 Nível AAA).
- `prefers-contrast: more`: `border: 1px solid currentColor` em todos os shapes — demarcar formas visualmente para usuários com necessidade de alto contraste.
- `forced-colors: active`: `Canvas` (background), `CanvasText` (border). `::after` suprimido. `forced-color-adjust` NÃO utilizado (sem slot). WCAG 1.4.11.
- `defineOptions({ inheritAttrs: false })` + `v-bind="$attrs"` — atributos ARIA extras do consumer forwarded ao root. Consumer pode sobrescrever `aria-hidden` se necessário para padrões avançados.

### Documentação — PASS / CONFORME
- `README.md`: quick start com tipos disponíveis, animações, brand — piso mínimo atendido.
- `DssSkeleton.md`: Template 13.1 completo (10 seções) — classificação, API, estados, tokens, acessibilidade, comportamentos implícitos, paridade Golden Reference/Context, composição, exceções, changelog.
- `DSSSKELETON_API.md`: props, props bloqueadas (5: color, dark, square, animation-speed, size), tipos TypeScript completos, slots (Nenhum), events (Nenhum), composable `useSkeletonClasses`, CSS classes, tabela de 13 tokens, comportamentos implícitos, comparação Golden Reference/Context — API documentada fiel à implementação.
- `DssSkeleton.example.vue`: 7 cenários — tipos disponíveis, texto multilinha, animações, bordas/raio, composição de card skeleton, brand hub via ancestral, brand water/waste via prop explícita. Zero hardcoded px/hex/rgb.
- `dss.meta.json`: schema correto (validado vs DssInnerLoading), 7 exceptions, `propsBlocked` (5 props), `compositionRecommendations`, `gateExceptions.templateStructure`, 13 tokens.
- Pré-prompt: 4 GAPs identificados e corrigidos na implementação (GAP-01 token `--dss-surface-variant` fantasma → `--dss-surface-muted`; GAP-02 tokens brand-specific fantasmas → `--dss-hub/water/waste-100/200`; GAP-03 Golden Context sem nome → `DssInnerLoading`; GAP-04 pré-prompt afirmava "Quasar não tem skeleton nativo" incorretamente — `QSkeleton` existe e foi usado como base).

---

## 5. Histórico de Auditoria

| Ciclo | Data | Auditor | Resumo |
|-------|------|---------|--------|
| 1 | 2026-05-18 | Claude (DSS Agent) | Auditoria inicial. 1 NC identificada e corrigida (NC-01: `prefers-contrast: more` ausente em `_states.scss` — adicionado `border: 1px solid currentColor`). 4 GAPs do pré-prompt registrados e corrigidos na implementação. |
| 2 | 2026-05-18 | Claude (DSS Agent) | Ciclo de verificação. 0 NCs adicionais. Reconciliação SCSS ↔ documentação ↔ meta.json completa sem divergências. 0 Ressalvas. Selo emitido. |

---

## 6. Resultado

```
CONFORME — SELO DSS v2.2 CONCEDIDO

Componente: DssSkeleton
Data de emissão: 2026-05-18
Arquitetura DSS: v2.2

Este documento é histórico e imutável.
Alterações no componente após esta data invalidam o selo.
Nova auditoria → novo ciclo → novo arquivo de selo.
```
