# SELO DE CONFORMIDADE DSS v2.2 — DssVideo

> **Arquivo histórico e imutável.**
> Não deve ser editado após emissão.
> Alterações no componente invalidam este selo.
> Nova auditoria → novo ciclo → novo arquivo de selo.

**Caminho canônico:**
`DSS/docs/Compliance/seals/DssVideo/DSSVIDEO_SELO_v2.2.md`

---

## 1. Identificação

| Campo | Valor |
|---|---|
| **Componente** | `DssVideo` |
| **Versão DSS** | 2.2 |
| **Fase** | 2 |
| **Nível** | 1 — Container de mídia |
| **Família** | Mídia e Visualização |
| **Categoria** | Container de mídia não interativo |
| **Fase de Emissão** | Fase 2 |
| **Data de Emissão** | 2026-05-13 |
| **Auditor** | Claude (DSS Agent) |
| **Golden Reference** | DssBadge (componente não interativo — governança global de categoria) |
| **Golden Context** | DssImg (container Fase 2 Nível 1 não interativo — baseline de auditoria específico) |
| **Dependências DSS Internas** | Nenhuma (QVideo é a única dependência; nenhum componente DSS compõe o interior do DssVideo) |
| **Quasar Base** | `QVideo` |
| **Ciclos de Auditoria** | 1 (2 NCs corrigidas no código; 4 GAPs corrigidos no pré-prompt; 0 NCs remanescentes) |
| **Status** | `conformant` |

---

## 2. Não-Conformidades

**Nenhuma não-conformidade remanescente.**

As 2 NCs identificadas no ciclo 1 foram corrigidas antes da emissão do selo.

**NCs corrigidas neste ciclo:**

| ID | Severidade | Descrição | Correção aplicada |
|----|-----------|-----------|-------------------|
| NC-01 | Não-bloqueante | `4-output/_states.scss` continha bloco `@media (forced-colors: active)` com `forced-color-adjust: none` — propriedade explicitamente proibida no DSS (referência: DssTextarea e DssUploader seals). `border-radius` é propriedade geométrica não afetada por forced-colors — o bloco era proibido e desnecessário. | Bloco removido integralmente. Comentários explicativos substituídos. |
| NC-02 | Não-bloqueante | `withDefaults` definia `ratio: '16/9'` como string literal. `parseFloat('16/9') === 16` em JavaScript (parser para no `/`) — todo vídeo sem ratio explícito renderia com `paddingBottom ≈ 6.25%` (correto seria 56.25% para 16:9). | Corrigido para `ratio: 16 / 9` (expressão aritmética; TypeScript avalia como `1.7777...`). |

**GAPs corrigidos neste ciclo (não são NCs — registrados para rastreabilidade):**

| ID | Natureza | Correção aplicada |
|----|----------|-------------------|
| GAP-01 | Pré-prompt Eixo 1: campo Golden Context ausente; Fase 2 / Nível 1 não declarados | Pré-prompt reescrito: `DssImg` declarado como Golden Context; `Fase: 2`, `Nível: 1` adicionados. |
| GAP-02 | Pré-prompt Eixo 3: 6 props listadas que NÃO existem no QVideo (`autoplay`, `loop`, `controls`, `volume`, `muted`, `poster` — são atributos do `<video>` HTML nativo, não do QVideo Quasar). Estados inventados (`isPlaying`, `currentTime`, `duration`). | Pré-prompt corrigido: QVideo tem apenas 4 props reais (`src`, `ratio`, `title`, `fetchpriority`). Tabela de props bloqueadas documenta explicitamente as 6 props inexistentes e o motivo. |
| GAP-03 | Pré-prompt Eixo 4: token fantasma `--dss-action-hub-surface` listado; ausência de nota sobre inaplicabilidade de brand theming (iframe opaco ao DSS) | Pré-prompt corrigido: token fantasma removido; seção explícita "Tokens NÃO utilizados e por quê" adicionada; `_brands.scss` documentado como intencionalmente vazio com justificativa. |
| GAP-04 | Pré-prompt Eixo 5: estados `hover`, `focus`, `active`, `disabled`, `loading`, `error` sem declaração explícita de N/A; EXC-Gate-01 ausente do documento de especificação | Pré-prompt corrigido: tabela de estados com N/A explícitos e justificativas específicas por estado; EXC-Gate-01 documentada na Seção 2. |

---

## 3. Ressalvas

**Nenhuma ressalva.**

O componente não apresenta limitações técnicas não-bloqueantes que requeiram registro formal. As limitações inerentes ao `QVideo` (sem slots `#loading`/`#error`, conteúdo de iframe opaco ao DSS para brand theming) estão documentadas na especificação e no pré-prompt como comportamentos esperados do Quasar base, não como deficiências do DssVideo.

---

## 4. Conformidades

### Tokens — PASS / CONFORME
Apenas 4 tokens utilizados: `--dss-radius-sm/md/lg/full`. Todos presentes no catálogo DSS. Zero tokens fantasmas. Zero valores hardcoded (px, rem, hex, rgb). `_brands.scss` intencionalmente vazio com comentário explícito — brand theming não aplicável para iframe nativo.

### Touch Target — PASS / CONFORME
Componente de mídia não interativo. Touch target declarado como N/A — Opção B aplicada: `::before` não implementado. Consistente com DssBadge (Golden Reference não-interativo) e DssImg (Golden Context). Elementos interativos que envolvem `DssVideo` (links, botões) gerenciam seus próprios touch targets.

### Arquitetura — PASS / CONFORME
**Gate Estrutural DSS (CLAUDE.md) verificado:**
- **4 camadas presentes:** `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` — todas existentes com conteúdo ou justificativa documentada de vazio intencional.
- **Orquestrador SCSS:** `DssVideo.module.scss` importa `L2 → L3 → L4` na ordem exata obrigatória.
- **Entry Point Wrapper:** `DssVideo.vue` presente na raiz — re-export puro da Layer 1, sem `<template>`, `<style>` ou lógica própria. Aponta corretamente para `./1-structure/DssVideo.ts.vue`.
- **`index.js`:** exporta wrapper (`DssVideo`), composable (`useVideoClasses`) e 2 types (`Props`, `Slots`).
- **`dss.meta.json`:** `goldenReference: "DssBadge"` e `goldenContext: "DssImg"` declarados; `exceptions` e `gateExceptions` com EXC-Gate-01 documentados; `statesNotApplicable` com razões explícitas por estado.

**Decisões arquiteturais documentadas:**
- EXC-Gate-01: QVideo como root element direto (sem div wrapper). `$attrs` forwarded via `v-bind="$attrs"`. Justificativa: QVideo aplica `overflow:hidden` e `position:relative` internamente — necessário para clip de `border-radius` e aspect ratio padding trick. Registrada em `dss.meta.json` e `DssVideo.md` Seção 9.
- Sistema `title` + `decorative`: computed `computedTitle` com dev warning via `import.meta.env?.DEV` (optional chaining para SSR). WCAG 4.1.2 Nível A.
- `defineEmits` omitido — container não-emissor (referência: DssPageSticky seal). QVideo não emite eventos DSS.
- Zero `:deep()` / `::v-deep` — encapsulamento preservado.
- `2-composition/_base.scss` vazio intencional com comentário: QVideo renderiza `position:relative` + `overflow:hidden` internamente — sem redeclaração necessária.

### Estados — PASS / CONFORME
Estado aplicável (`default`) implementado. Estados não-aplicáveis (`loading`, `error`, `hover`, `focus`, `active`, `disabled`) declarados explicitamente em `dss.meta.json` com `statesNotApplicableReason`, em `DssVideo.md` Seção 4 e no pré-prompt reescrito. A distinção QVideo/QImg (QVideo não expõe slots de estado; QImg expõe) está documentada no pré-prompt e na documentação normativa.

### Acessibilidade — PASS / CONFORME
- `title` + `decorative`: sistema dual conforme WCAG 4.1.2 (Nível A). Dev warning em `import.meta.env?.DEV` se nenhum dos dois fornecido.
- `prefers-contrast: more` (valor canônico correto): nenhum ajuste visual adicional necessário — border-radius é propriedade geométrica.
- `forced-colors: active`: nenhum bloco necessário — `forced-color-adjust: none` explicitamente proibido no DSS; border-radius não é afetado por forced-colors.
- `@media print`: iframe de vídeo não é reproduzível em papel; nenhuma ação adicional (browsers ocultam iframes por padrão em print).
- `defineOptions({ inheritAttrs: false })` + `v-bind="$attrs"` — atributos ARIA extras do consumidor forwarded corretamente ao root.
- CLS (Core Web Vital): prop `ratio` com default `16/9 ≈ 1.778` reserva espaço antes do carregamento do iframe.

### Documentação — PASS / CONFORME
- `README.md`: quick start, modos, exemplos com links — piso mínimo atendido.
- `DssVideo.md`: Template 13.1 completo (13 seções) — classificação, estados, comportamentos implícitos, paridade com Golden Reference/Context, tokens, acessibilidade, exceções, composição, governança, changelog.
- `DSSVIDEO_API.md`: props, slots, events (Nenhum), tokens, CSS classes — API documentada fiel à implementação real.
- `DssVideo.example.vue`: 5+ cenários — básico 16:9, variantes radius, overlay slot, decorativo, eventos.
- `dss.meta.json`: schema correto, `compositionRecommendations` presentes.
- Pré-prompt `pre_prompt_dss_video.md`: completamente reescrito e alinhado aos 5 eixos obrigatórios (Fase 2).

---

## 5. Histórico de Auditoria

| Ciclo | Data | Auditor | Resumo |
|-------|------|---------|--------|
| 1 | 2026-05-13 | Claude (DSS Agent) | Auditoria inicial. 2 NCs corrigidas (NC-01: `forced-color-adjust: none` removido; NC-02: `ratio` string → número). 4 GAPs identificados e corrigidos (todos no pré-prompt: Golden Context ausente, API QVideo incorreta com 6 props inexistentes, tokens fantasmas, estados N/A). 0 Ressalvas. Selo emitido. |

---

## 6. Resultado

```
CONFORME — SELO DSS v2.2 CONCEDIDO

Componente: DssVideo
Data de emissão: 2026-05-13
Arquitetura DSS: v2.2

Este documento é histórico e imutável.
Alterações no componente após esta data invalidam o selo.
Nova auditoria → novo ciclo → novo arquivo de selo.
```
