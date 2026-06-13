# SELO DE CONFORMIDADE DSS v2.2 — DssParallax

> **Arquivo histórico e imutável.**
> Não deve ser editado após emissão.
> Alterações no componente invalidam este selo.
> Nova auditoria → novo ciclo → novo arquivo de selo.

**Caminho canônico:**
`DSS/docs/Compliance/seals/DssParallax/DSSPARALLAX_SELO_v2.2.md`

---

## 1. Identificação

| Campo | Valor |
|---|---|
| **Componente** | `DssParallax` |
| **Versão DSS** | 2.2 |
| **Fase** | 2 |
| **Nível** | 1 — Container de efeito visual não interativo |
| **Família** | Mídia e Visualização |
| **Categoria** | Container de efeito visual não interativo |
| **Fase de Emissão** | Fase 2 |
| **Data de Emissão** | 2026-05-18 |
| **Auditor** | Claude (DSS Agent) |
| **Golden Reference** | DssBadge (componente não interativo — governança global de categoria) |
| **Golden Context** | DssVideo (container Fase 2 Nível 1 não interativo — baseline de auditoria específico) |
| **Dependências DSS Internas** | Nenhuma (QParallax é a única dependência; nenhum componente DSS compõe o interior do DssParallax) |
| **Quasar Base** | `QParallax` |
| **Ciclos de Auditoria** | 2 (3 NCs corrigidas; 5 GAPs corrigidos; 0 NCs remanescentes) |
| **Status** | `conformant` |

---

## 2. Não-Conformidades

**Nenhuma não-conformidade remanescente.**

As 3 NCs identificadas nos dois ciclos de auditoria foram corrigidas antes da emissão do selo.

**NCs corrigidas — Ciclo 1:**

| ID | Severidade | Descrição | Correção aplicada |
|----|-----------|-----------|-------------------|
| NC-01 | Não-bloqueante | `DSSPARALLAX_API.md` — seção "Tokens Utilizados" listava `-webkit-tap-highlight-color: transparent` como um token `var(--dss-*)` fantasma (`--dss-touch-highlight-transparent`). Propriedade é valor hardcoded estrutural com exceção canônica DSS (padrão DssBadge), não um token. | Tabela de tokens reescrita com estrutura propriedade/fonte/justificativa, sem inventar token inexistente. |
| NC-02 | Não-bloqueante | `4-output/_states.scss` continha `forced-color-adjust: none` no bloco `@media (forced-colors: active)`. Esta propriedade é herdada (CSS spec: "Inherited: yes") — desabilitaria o ajuste forced-colors para todos os componentes DSS no slot default (DssCard, DssButton, etc.). Não há necessidade de opt-out: `background-color: Canvas` funciona sem ela. | Propriedade `forced-color-adjust: none` removida integralmente. Bloco `@media (forced-colors: active)` mantido apenas com `background-color: Canvas`. |

**NCs corrigidas — Ciclo 2:**

| ID | Severidade | Descrição | Correção aplicada |
|----|-----------|-----------|-------------------|
| NC-01 | Não-bloqueante | `DSSPARALLAX_API.md` — seção `useParallaxClasses()` ainda mostrava a assinatura antiga `useParallaxClasses(props)` após o código ter sido corrigido no Ciclo 1 (GAP-03). Inconsistência entre código implementado e documentação da API pública. | Cabeçalho da seção e exemplo de código corrigidos para `useParallaxClasses()` sem parâmetro. |

**GAPs corrigidos — Ciclo 1 (não são NCs — registrados para rastreabilidade):**

| ID | Natureza | Correção aplicada |
|----|----------|-------------------|
| GAP-01 | `DssParallax.md` §5 listava `background-image` como token (`Prop src`) em estrutura de tabela de tokens — campo "Prop src" implica token DSS, quando é style binding direto. | Seção §5 reescrita com declaração explícita: zero tokens `var(--dss-*)` utilizados. Tabela reestruturada como propriedade/fonte/motivo com declaração de conformidade. |
| GAP-02 | `dss.meta.json` não registrava `EXC-SrOnly-01`. A `.dss-sr-only` definida no SCSS do componente é uma exceção à ausência de utilitário global DSS para sr-only. | `EXC-SrOnly-01` adicionada ao array `exceptions` em `dss.meta.json` com `rule`, `detail` e `location`. |
| GAP-03 | `useParallaxClasses(props)` recebia `props` como parâmetro, mas não os utilizava (composable sem variantes CSS configu­ráveis no DssParallax). Parâmetro desnecessário e enganoso. | Parâmetro removido do composable `useParallaxClasses.ts`; chamada no template `1-structure/DssParallax.ts.vue` atualizada para `useParallaxClasses()`. |
| GAP-04 | Pré-prompt Eixo 3: tabela de mapeamento de API listava `factor` como prop separada do QParallax — prop inexistente na API atual do Quasar. `speed` é o único parâmetro de movimento. | Linha `factor` removida da tabela de mapeamento; nota explicativa adicionada na linha `speed`. |
| GAP-05 | `DSSPARALLAX_API.md` não documentava a diferença de comportamento do slot com múltiplos filhos diretos entre o branch QParallax ativo e o fallback estático. Pode causar regressão visual silenciosa ao ativar `prefers-reduced-motion`. | Seção "Comportamento do Slot com Múltiplos Filhos Diretos" adicionada com exemplos correto (✅) e de atenção (⚠️). |

---

## 3. Ressalvas

**Nenhuma ressalva.**

O componente não apresenta limitações técnicas não-bloqueantes que requeiram registro formal. As características inerentes ao `QParallax` (ausência de slots `#loading`/`#error` controláveis, ausência de eventos DSS expostos) estão documentadas na especificação como comportamentos esperados do Quasar base.

A decisão arquitetural de troca de componente (QParallax → `div` estático) para `prefers-reduced-motion` — em vez de CSS puro — está registrada como `EXC-States-01` com justificativa técnica: CSS `transition:none` não suprime os scroll listeners JavaScript do QParallax.

---

## 4. Conformidades

### Tokens — PASS / CONFORME
Zero tokens `var(--dss-*)` utilizados. Declaração de conformidade explícita na documentação: a ausência é intencional e arquiteturalmente correta — componente de efeito visual cujas dimensões e imagem são 100% prop-driven não possui propriedades tokenizáveis na camada CSS. `-webkit-tap-highlight-color: transparent` é exceção canônica estrutural (padrão DssBadge), documentada como tal. Zero valores hardcoded indevidos.

### Touch Target — PASS / CONFORME
Componente de efeito visual não interativo. Touch target declarado como N/A — `::before` não implementado. Consistente com DssBadge (Golden Reference não-interativo) e DssVideo (Golden Context). Elementos interativos no slot default gerenciam seus próprios touch targets.

### Arquitetura — PASS / CONFORME
**Gate Estrutural DSS verificado:**
- **4 camadas presentes:** `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` — todas existentes com conteúdo ou justificativa documentada de vazio intencional.
- **Orquestrador SCSS:** `DssParallax.module.scss` importa `L2 → L3 → L4` na ordem exata obrigatória.
- **Entry Point Wrapper:** `DssParallax.vue` presente na raiz — re-export puro da Layer 1, sem `<template>`, `<style>` ou lógica própria. Aponta corretamente para `./1-structure/DssParallax.ts.vue`.
- **`index.js`:** exporta wrapper (`DssParallax`), composables (`useParallaxClasses`, `useReducedMotion`) e 2 types (`DssParallaxProps`, `DssParallaxSlots`).
- **`dss.meta.json`:** `goldenReference: "DssBadge"` e `goldenContext: "DssVideo"` declarados; 3 exceções documentadas (`EXC-Gate-01`, `EXC-States-01`, `EXC-SrOnly-01`); `statesNotApplicable` com razões explícitas por estado.

**Decisões arquiteturais documentadas:**
- EXC-Gate-01: QParallax como root element (sem div wrapper intermediário). `$attrs` forwarded via `v-bind="$attrs"`. Justificativa: evita DOM desnecessário e preserva scroll listeners nativos do QParallax.
- EXC-States-01: `prefers-reduced-motion: reduce` tratado via troca de componente (v-if/v-else) — não via CSS puro. CSS `transition:none` não suprime comportamento JavaScript do QParallax. Troca é reativa: adapta-se sem reload de página.
- EXC-SrOnly-01: `.dss-sr-only` definida em `2-composition/_base.scss`. Não existe utilitário global DSS para sr-only. Necessária para transmitir alt text de CSS backgrounds (invisíveis ao accessibility tree por natureza).
- `defineEmits` omitido — container não-emissor. QParallax não expõe eventos controláveis pelo DSS.
- Zero `:deep()` / `::v-deep` — encapsulamento preservado.

### Estados — PASS / CONFORME
Estados aplicáveis (`default`, `reduced-motion`) implementados. Estados não-aplicáveis (`hover`, `focus`, `active`, `disabled`, `loading`, `error`) declarados explicitamente em `dss.meta.json` com `statesNotApplicableReason`, em `DssParallax.md` Seção 4 e no pré-prompt. A distinção entre o estado `default` (QParallax ativo, scroll listeners registrados) e `reduced-motion` (fallback estático, sem scroll listeners) está documentada nos comportamentos implícitos.

### Acessibilidade — PASS / CONFORME
- `alt` + `decorative`: sistema dual conforme WCAG 1.1.1 (Nível A). `<span class="dss-sr-only">` inserido para CSS backgrounds que transmitem conteúdo. Dev warning em `import.meta.env?.DEV` se nenhuma das duas opções fornecida.
- `prefers-reduced-motion: reduce`: fallback estático substitui QParallax por `<div>` — sem scroll listeners, sem animações. WCAG 2.3.3 (Nível AAA). Reativo: adapta-se em tempo de execução.
- `forced-colors: active`: `background-color: Canvas` aplicado. `forced-color-adjust: none` explicitamente removido (proibido no DSS — afeta herança para componentes filho no slot).
- `prefers-contrast: more` (valor canônico correto): sem ajuste visual adicional necessário.
- `defineOptions({ inheritAttrs: false })` + `v-bind="$attrs"` — atributos ARIA extras do consumidor forwarded corretamente ao root element ativo (QParallax ou div estático).

### Documentação — PASS / CONFORME
- `README.md`: quick start, modos, exemplos — piso mínimo atendido.
- `DssParallax.md`: Template 13.1 completo — classificação, API, estados, tokens (declaração de zero tokens com justificativa), acessibilidade, comportamentos implícitos, paridade com Golden Reference/Context, composição, exceções, changelog.
- `DSSPARALLAX_API.md`: props, slots, events (Nenhum), composables exportados (`useReducedMotion`, `useParallaxClasses`), CSS classes, comportamentos implícitos, nota de comportamento do slot, tabela de comparação com Golden Reference — API documentada fiel à implementação real.
- `dss.meta.json`: schema correto, `compositionRecommendations` presentes, 3 exceções registradas, `gateExceptions.templateStructure` documentado.
- Pré-prompt `pre_prompt_dss_parallax.md`: alinhado com correção de GAP-04 (prop `factor` inexistente removida).

---

## 5. Histórico de Auditoria

| Ciclo | Data | Auditor | Resumo |
|-------|------|---------|--------|
| 1 | 2026-05-18 | Claude (DSS Agent) | Auditoria inicial. 2 NCs corrigidas (NC-01: tabela de tokens reescrita sem token fantasma; NC-02: `forced-color-adjust: none` removido — herança CSS afetaria slot). 5 GAPs corrigidos: GAP-01 §5 docs reescrito; GAP-02 EXC-SrOnly-01 registrada; GAP-03 `useParallaxClasses(props)` → sem parâmetro; GAP-04 prop `factor` removida do pré-prompt; GAP-05 comportamento do slot com múltiplos filhos documentado. |
| 2 | 2026-05-18 | Claude (DSS Agent) | Ciclo de verificação. 1 NC corrigida (NC-01: `DSSPARALLAX_API.md` ainda mostrava assinatura antiga `useParallaxClasses(props)` após correção de código). 0 NCs adicionais. 0 Ressalvas. Selo emitido. |

---

## 6. Resultado

```
CONFORME — SELO DSS v2.2 CONCEDIDO

Componente: DssParallax
Data de emissão: 2026-05-18
Arquitetura DSS: v2.2

Este documento é histórico e imutável.
Alterações no componente após esta data invalidam o selo.
Nova auditoria → novo ciclo → novo arquivo de selo.
```
