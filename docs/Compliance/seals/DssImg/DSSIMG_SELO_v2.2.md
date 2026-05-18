# SELO DE CONFORMIDADE DSS v2.2 — DssImg

> **Arquivo histórico e imutável.**
> Não deve ser editado após emissão.
> Alterações no componente invalidam este selo.
> Nova auditoria → novo ciclo → novo arquivo de selo.

**Caminho canônico:**
`DSS/docs/Compliance/seals/DssImg/DSSIMG_SELO_v2.2.md`

---

## 1. Identificação

| Campo | Valor |
|---|---|
| **Componente** | `DssImg` |
| **Versão DSS** | 2.2 |
| **Fase** | 2 |
| **Nível** | 1 — Container de mídia |
| **Família** | Mídia e Visualização |
| **Categoria** | Container de mídia não interativo |
| **Fase de Emissão** | Fase 2 |
| **Data de Emissão** | 2026-05-13 |
| **Auditor** | Claude (DSS Agent) |
| **Golden Reference** | DssBadge (componente não interativo — governança global de categoria) |
| **Golden Context** | DssInfiniteScroll (container Fase 2 Nível 1 não interativo — baseline de auditoria específico) |
| **Dependências DSS Internas** | `DssSpinner` (loading indicator padrão no slot `#loading`), `DssIcon` (ícone `broken_image` no slot `#error`) |
| **Quasar Base** | `QImg` |
| **Ciclos de Auditoria** | 1 (4 GAPs identificados e corrigidos no pré-prompt; 0 NCs) |
| **Status** | `conformant` |

---

## 2. Não-Conformidades

**Nenhuma não-conformidade encontrada.**

A auditoria do código do componente não identificou violações bloqueantes nem não-bloqueantes. Os 4 GAPs identificados residem exclusivamente no pré-prompt (`pre_prompt_dss_img.md`) e foram corrigidos antes da emissão do selo.

**GAPs corrigidos neste ciclo (não são NCs — registrados para rastreabilidade):**

| ID | Natureza | Correção aplicada |
|----|----------|-------------------|
| GAP-01 | Pré-prompt Eixo 1: campo Golden Context descrevia o próprio componente em vez de nomear `DssInfiniteScroll`; Fase 2 / Nível 1 ausentes | Pré-prompt corrigido: `DssInfiniteScroll` declarado como Golden Context; `Fase: 2`, `Nível: 1` adicionados. |
| GAP-02 | Pré-prompt Eixo 3: 4 props da API real ausentes da tabela de mapeamento (`decorative`, `radius`, `placeholderSrc`, `noTransition`) | Pré-prompt corrigido: todas as 11 props da implementação documentadas com tipo, default e observações. |
| GAP-03 | Pré-prompt Eixo 4: token fantasma `--dss-action-hub-surface` listado; `--dss-duration-250` incorretamente indicado para fade-in (responsabilidade do QImg, não do DSS CSS) | Pré-prompt corrigido: tokens fantasmas removidos; nota explícita sobre delegação do fade-in ao QImg. |
| GAP-04 | Pré-prompt Eixo 5: estados `hover`, `focus`, `active`, `disabled` sem declaração explícita de N/A; EXC-Gate-01 ausente do documento de especificação | Pré-prompt corrigido: tabela de estados com N/A explícitos e justificativas; EXC-Gate-01 documentada na Seção 2. |

---

## 3. Ressalvas

**Nenhuma ressalva.**

O componente não apresenta limitações técnicas não-bloqueantes que requeiram registro formal. Os comportamentos implícitos (EXC-Gate-01, sistema `alt`/`decorative`, delegação de fade-in ao QImg, `aria-hidden` nos containers de estado) estão todos documentados no código e na documentação normativa.

---

## 4. Conformidades

### Tokens — PASS / CONFORME
Validado via `validate_component_code` (MCP Fase 3): `verdict: "compliant"`, zero findings. Todos os 9 tokens declarados em `dss.meta.json` verificados no SCSS contra o catálogo oficial: `--dss-surface-disabled`, `--dss-text-subtle`, `--dss-radius-sm/md/lg/full`, `--dss-action-hub/water/waste`. Nenhum valor hardcoded (px, rem, hex, rgb) identificado. Token fantasma `--dss-action-hub-surface` corretamente ausente da implementação.

### Touch Target — PASS / CONFORME
Componente de mídia não interativo. Touch target declarado como N/A — Opção B aplicada: `::before` não implementado. Consistente com DssBadge (Golden Reference não-interativo). Elementos interativos que envolvem `DssImg` (links, botões) gerenciam seus próprios touch targets. Documentado em `2-composition/_base.scss` e `DssImg.md` Seção 4.

### Arquitetura — PASS / CONFORME
**Gate Estrutural DSS (CLAUDE.md) verificado:**
- **4 camadas presentes:** `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` — todas existentes com conteúdo ou justificativa documentada de vazio intencional.
- **Orquestrador SCSS:** `DssImg.module.scss` importa `L2 → L3 → L4` na ordem exata obrigatória.
- **Entry Point Wrapper:** `DssImg.vue` presente na raiz — re-export puro da Layer 1, sem `<template>`, `<style>` ou lógica própria. Aponta corretamente para `./1-structure/DssImg.ts.vue`.
- **`index.js`:** exporta wrapper (`DssImg`), composable (`useImgClasses`) e 3 types (`Props`, `Emits`, `Slots`).
- **`dss.meta.json`:** `goldenReference: "DssBadge"` e `goldenContext: "DssInfiniteScroll"` declarados; `exceptions` e `gateExceptions` com EXC-Gate-01 documentados; `propsBlocked` listados.

**Decisões arquiteturais documentadas:**
- EXC-Gate-01: QImg como root element direto (sem div wrapper). `$attrs` forwarded via `v-bind="$attrs"`. Justificativa: QImg aplica `overflow:hidden !important` internamente — necessário para clip de `border-radius` e aspect ratio padding trick. Registrada em `dss.meta.json` e `DssImg.md` Seção 9.
- Sistema `alt` + `decorative`: computed `computedAlt` com dev warning via `import.meta.env?.DEV` (optional chaining para SSR). WCAG 1.1.1 Nível A.
- `DssSpinner` e `DssIcon` importados via wrapper raiz — Gate de Composição respeitado.
- Zero `:deep()` / `::v-deep` — encapsulamento preservado.
- Seletores brand via descendant duplo `[data-brand="hub"] .dss-img .dss-img__error` — padrão DSS de descendant selector com espaço satisfeito.

### Estados — PASS / CONFORME
Estados aplicáveis (`default`, `loading`, `error`) implementados com slots QImg e defaults DSS (DssSpinner / DssIcon `broken_image`). Ambos os containers de estado com `aria-hidden="true"`. Estados não-aplicáveis (`hover`, `focus`, `active`, `disabled`) declarados explicitamente em `dss.meta.json` com `statesNotApplicableReason`, em `DssImg.md` Seção 4 e no pré-prompt corrigido. `@load` e `@error` emitidos corretamente via `defineEmits`.

### Acessibilidade — PASS / CONFORME
- `alt` + `decorative`: sistema dual conforme WCAG 1.1.1 (Nível A). Dev warning em `import.meta.env?.DEV` se nenhum dos dois fornecido.
- `aria-hidden="true"` em `__loading` e `__error` — indicadores visuais decorativos; feedback acessível delegado ao `alt` text do `<img>`.
- `prefers-contrast: more` (valor canônico correto): `color: currentColor` no `__error`.
- `forced-colors: active`: `color: CanvasText` e `background-color: Canvas` — SystemColor keywords corretos. Sem `forced-color-adjust` (proibido no DSS).
- `@media print`: `__loading { display: none }` — loading sem significado em contexto estático; estado de erro mantido (informação relevante).
- `defineOptions({ inheritAttrs: false })` + `v-bind="$attrs"` — atributos ARIA extras do consumidor forwarded corretamente ao root.

### Documentação — PASS / CONFORME
- `README.md`: quick start, modos, exemplos com links — piso mínimo atendido.
- `DssImg.md`: Template 13.1 completo (13 seções) — classificação, estados, comportamentos implícitos, paridade com Golden Reference/Context, tokens, acessibilidade, exceções, composição, governança, changelog.
- `DSSIMG_API.md`: props (incluindo props bloqueadas), slots, events, tokens, CSS classes — API documentada fiel à implementação real.
- `DssImg.example.vue`: 6 cenários — básico 16:9, variantes radius, erro sem/com fallback, overlay decorativo, eventos @load/@error, brand hub.
- `dss.meta.json`: schema correto, `propsBlocked` documentados, `compositionRecommendations` presentes.
- Pré-prompt `pre_prompt_dss_img.md`: corrigido e alinhado aos 5 eixos obrigatórios (Fase 2).

---

## 5. Histórico de Auditoria

| Ciclo | Data | Auditor | Resumo |
|-------|------|---------|--------|
| 1 | 2026-05-13 | Claude (DSS Agent) | Auditoria inicial. 0 NCs. 4 GAPs identificados e corrigidos (todos no pré-prompt: Golden Context, API incompleta, tokens fantasmas, estados N/A). 0 Ressalvas. Selo emitido. |

---

## 6. Resultado

```
CONFORME — SELO DSS v2.2 CONCEDIDO

Componente: DssImg
Data de emissão: 2026-05-13
Arquitetura DSS: v2.2

Este documento é histórico e imutável.
Alterações no componente após esta data invalidam o selo.
Nova auditoria → novo ciclo → novo arquivo de selo.
```
