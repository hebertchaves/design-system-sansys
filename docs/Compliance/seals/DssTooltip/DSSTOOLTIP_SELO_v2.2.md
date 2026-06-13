# SELO DE CONFORMIDADE DSS v2.2

---

## Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssTooltip |
| **Versao do Componente** | 1.0.0 |
| **Versao do DSS** | v2.2 |
| **Classificacao** | Elemento Informativo Contextual nao interativo — Informational |
| **Status Pre-Selo** | Draft (elegivel para auditoria) |
| **Golden Component de Referencia** | DssBadge (Compact Control nao interativo, Selo DSS v2.2) |
| **Golden Component Secundario** | N/A (justificado: nao existe outro Golden nao interativo da mesma categoria) |
| **Data de Emissao** | 06 de Fevereiro de 2026 |
| **Auditor** | Claude Code (Modo Auditor DSS) |

---

## Historico de Auditoria

| Fase | Data | Resultado |
|------|------|-----------|
| Auditoria Inicial | 06 Fevereiro 2026 | 2 NCs identificadas (1 bloqueante, 1 nao-bloqueante), 6 GAPs |
| Correcao Tecnica + Documental | 06 Fevereiro 2026 | 2 NCs corrigidas, 2 GAPs resolvidos, 0 regressoes |
| Re-Auditoria | 06 Fevereiro 2026 | 0 NCs, 4 ressalvas nao-bloqueantes |
| Auditoria Final | 06 Fevereiro 2026 | NC = 0, Aprovado |

---

## Nao-Conformidades

**Nenhuma nao-conformidade encontrada.**

Todas as nao-conformidades identificadas durante o ciclo de auditoria foram corrigidas e verificadas:

| NC | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| NC-01 | Token inexistente `--dss-font-weight-regular` utilizado em `_base.scss` e documentado em 3 arquivos de documentacao | Substituido integralmente por `--dss-font-weight-normal` (token existente em DSS_TOKEN_REFERENCE.md, valor 400) | `2-composition/_base.scss:42`, `DssTooltip.md:121`, `DSSTOOLTIP_API.md:116`, `README.md:66` — zero ocorrencias residuais verificadas via grep |
| NC-02 | Default da prop `color` definido como `'dark'`, divergindo do default normativo `'primary'` (DSS_COMPONENT_ARCHITECTURE.md Secao 4) | Documentado formalmente como excecao EX-04 na secao de excecoes do DssTooltip.md, com justificativa completa (convencao UX, legibilidade, precedente Golden) e declaracao de nao-precedente | `DssTooltip.md:146` — excecao EX-04 com ID, regra violada, valor aplicado, justificativa e escopo |

---

## Ressalvas (nao-bloqueantes)

As ressalvas abaixo foram identificadas e aceitas. Nenhuma impede a emissao do selo.

| ID | Descricao | Justificativa | Monitoramento |
|----|-----------|---------------|---------------|
| R-01 | Raw `transition` utilizado em vez do mixin `dss-transition()` | DssBadge golden tambem nao usa o mixin. Mixins sao facilitadores, nao mandatorios. `prefers-reduced-motion` tratado separadamente em `_states.scss`. | Nenhum; consistente com golden. Migrar quando golden migrar. |
| R-02 | Props `size` e `disabled` ausentes (DSS_COMPONENT_ARCHITECTURE.md Secao 4 requer para todos os componentes) | DssBadge golden tambem nao possui. `disabled` e semanticamente inaplicavel a elemento nao interativo. `size` nao faz sentido para conteudo de texto livre. | Monitorar revisao normativa de DSS_COMPONENT_ARCHITECTURE.md para distinção interativo vs. nao-interativo. |
| R-03 | Sem validadores runtime de props (`color`, `brand`) | DssBadge golden tambem nao tem. TypeScript garante validacao compile-time via tipos `TooltipColor` e `TooltipBrand`. | Nenhum; consistente com golden. Considerar para Fase 2 se necessario. |
| R-04 | `border-radius: var(--dss-radius-md)` (8px) diverge do `--dss-radius-sm` (4px) utilizado pelo mixin `dss-accessible-tooltip()` em `_accessibility-mixins.scss` | Arquiteturas complementares: DssTooltip e componente standalone, mixin e CSS-only no trigger. Valor `--dss-radius-md` diferencia visualmente de badges e chips. | Pendente alinhamento com equipe de design. Nao afeta conformidade normativa. |

> Nenhuma ressalva impede a concessao do selo.

---

## Conformidades Confirmadas

### Tokens — CONFORME

- Zero tokens inexistentes (NC-01 corrigida: `--dss-font-weight-regular` → `--dss-font-weight-normal`)
- Zero tokens especificos de componente (`--dss-tooltip-*` = 0 resultados)
- Tokens de tipografia: `--dss-font-family-sans`, `--dss-font-size-sm`, `--dss-font-weight-normal`, `--dss-line-height-tight`
- Tokens de espacamento: `--dss-spacing-1_5`, `--dss-spacing-2`, `--dss-spacing-2_5`
- Tokens de forma: `--dss-radius-md`
- Tokens de motion semanticos: `--dss-duration-tooltip` (GAP-03 corrigido), `--dss-easing-standard`
- Token de z-index: `--dss-z-index-tooltip` (GAP-01 corrigido)
- Tokens de borda: `--dss-border-width-md` (high contrast)
- Tokens de brand: `--dss-hub-600`, `--dss-hub-500`, `--dss-water-500`, `--dss-water-400`, `--dss-waste-600`, `--dss-waste-500`
- Tokens neutros: `--dss-gray-50` (texto sobre fundo de brand)
- 4 excepcoes documentadas (EX-01 a EX-04) com ID, valor, contexto e justificativa
- 19 tokens validados contra DSS_TOKEN_REFERENCE.md (100% correspondencia)
- Zero valores hardcoded nao-documentados

### Touch Target — CONFORME

- Touch target NAO implementado (Opcao B — componente nao interativo)
- Decisao congelada e documentada: DssTooltip e elemento informativo passivo
- Responsabilidade de touch target pertence ao elemento disparador (WCAG 2.5.5)
- `::before` PROIBIDO (conforme CLAUDE.md Principio #7 e decisao arquitetural)
- `::after` nao utilizado (conforme convencao: permitido apenas para efeitos visuais passivos)
- Nenhuma violacao de pseudo-elementos (0 ocorrencias de `::before` nos arquivos SCSS)
- Paridade com DssBadge golden (Opcao B — nao interativo)

### Arquitetura — CONFORME

- Layer 1 (Structure): `1-structure/DssTooltip.ts.vue` — TypeScript + Composition API + `<script setup>`
- Layer 2 (Composition): `2-composition/_base.scss` — tokens genericos, layout, tipografia (80 linhas)
- Layer 3 (Variants): `3-variants/_multi-line.scss` + `3-variants/index.scss` — variante multi-line
- Layer 4 (Output): `4-output/_brands.scss` + `4-output/_states.scss` + `4-output/index.scss`
- Orchestrador: `DssTooltip.module.scss` (3 `@use` imports com aliases, sem duplicacao)
- CSS compilado: 324 linhas, zero erros, zero warnings
- Tipos: `types/tooltip.types.ts` com interfaces completas (TooltipProps, TooltipSlots, TooltipColor, TooltipBrand)
- Composables: `composables/useTooltipClasses.ts` com logica de classes separada
- `defineOptions({ name: 'DssTooltip' })` com `inheritAttrs: true` (default, encaminha `$attrs` ao `<div>` raiz)
- Nenhuma camada omitida
- Nenhuma heranca indevida
- Nenhum acoplamento com outros componentes DSS

### Estados — CONFORME

| Estado | SCSS | Vue/ARIA | Evidencia |
|--------|------|----------|-----------|
| visible | N/A (v-show) | `v-show="visible"` | Controlado externamente via prop. Elemento permanece no DOM. |
| hidden | N/A (v-show) | `v-show="visible"` = false | `display: none` automatico via diretiva Vue. |
| hover | — | — | Declarado como "Nao aplicavel". Tooltip nao responde a hover proprio. |
| active | — | — | Declarado como "Nao aplicavel". Tooltip nao e acionavel. |
| disabled | — | — | Declarado como "Nao aplicavel". Tooltip nao e um controle. |
| loading | — | — | Declarado como "Nao aplicavel". Tooltip exibe informacao estatica. |
| focus | — | — | Declarado como "Nao aplicavel". Tooltip nao e navegavel por teclado. |
| checked | — | — | Declarado como "Nao aplicavel". Tooltip nao e selecionavel. |

### Acessibilidade — CONFORME

| Criterio WCAG | Status | Implementacao |
|---------------|--------|---------------|
| 1.3.1 Info and Relationships (A) | CONFORME | `role="tooltip"` define semantica. Associacao via `aria-describedby` no disparador (responsabilidade do consumidor). |
| 4.1.2 Name, Role, Value (A) | CONFORME | `role="tooltip"`, `aria-label` condicional via prop `ariaLabel` |
| 1.4.3 Contrast (Minimum) (AA) | CONFORME | Fundo escuro (`bg-dark`) + texto claro (`text-white`) garante ratio >= 4.5:1 |
| 2.5.5 Target Size (AA) | CONFORME | N/A — componente nao interativo. Touch target e responsabilidade do disparador. |
| `prefers-reduced-motion` | CONFORME | `transition: none !important` e `animation: none !important` em `_states.scss:89-95` |
| `prefers-contrast: more` | CONFORME | Borda `var(--dss-border-width-md) solid currentColor`, `font-weight: 700` (EX-02) |
| `forced-colors: active` | CONFORME | System colors: `ButtonText`, `ButtonFace`. Borda `2px solid ButtonText` (EX-03). `forced-color-adjust` implicito. |
| `prefers-color-scheme: dark` | CONFORME | Brands ajustados: Hub `--dss-hub-500`, Water `--dss-water-400`, Waste `--dss-waste-500` |
| Print styles | CONFORME | `display: none !important` — tooltip e informacao de interface, nao relevante em impressao |
| `v-show` vs `v-if` | CONFORME | `v-show` mantém elemento no DOM para associacao `aria-describedby` persistente |

### Documentacao — CONFORME

- `DssTooltip.md` — Documentacao principal completa (13 secoes Template 13.1, 734 linhas)
- `README.md` — Quick Reference (133 linhas, 5 exemplos)
- `DSSTOOLTIP_API.md` — API Reference (132 linhas, contrato completo)
- `DssTooltip.example.vue` — Showcase visual (7 cenarios)
- `DssTooltip.test.js` — 28 testes unitarios em 6 suites (rendering, visibility, a11y, CSS classes, brand, non-interactive)
- API documentada = API implementada (7 props, 0 eventos, 1 slot)
- 4 excepcoes com rastreabilidade completa (ID, valor, contexto, justificativa)
- Tokens listados com nomes exatos em 3 documentos (19 tokens, 100% correspondencia SCSS ↔ docs)
- Tabela de paridade com Golden Component (DssBadge) com 25 itens comparados
- 6 estados nao-aplicaveis declarados explicitamente com justificativa
- Anti-patterns documentados (5 usos incorretos + 3 combinacoes nao permitidas)
- Classificacao de recursos (Recomendado / Opcional / Fora de escopo DSS)
- Estrategia de interacao declarada (7 aspectos)
- Nenhuma linguagem absoluta proibida ("100% compativel", "Golden Sample")

---

## Decisoes de Governanca Registradas

| Decisao | Valor | Justificativa |
|---------|-------|---------------|
| Golden Component | DssBadge (unico) | Compact Control nao interativo; nao existe outro Golden da mesma categoria |
| Touch target | NAO implementado (Opcao B) | Componente nao interativo; responsabilidade do elemento disparador |
| `::before` | PROIBIDO | Decisao congelada. Reservado para touch target (CLAUDE.md Principio #7). Componente nao interativo nao implementa touch target. |
| `::after` | Permitido, nao utilizado | Reservado para efeitos visuais passivos. Nao necessario na Fase 1. |
| Visibilidade | Controlada externamente via prop `visible` | DssTooltip e passivo. Nao governa abertura/fechamento. |
| `v-show` vs `v-if` | `v-show` (mantém no DOM) | Associacao `aria-describedby` exige elemento presente no DOM |
| ARIA role | `role="tooltip"` | WAI-ARIA Tooltip Pattern; diferente de DssBadge (`role="status"`) |
| Default `color` | `'dark'` (EX-04) | Convencao UX tooltips; legibilidade; precedente Golden. Nao cria precedente geral. |
| Layer 3 (Variants) | 1 variante (multi-line) | Escopo minimo Fase 1 |
| Estados interativos | Todos nao aplicaveis (6) | Componente nao interativo por design |
| z-index | `var(--dss-z-index-tooltip)` (1070) | Token semantico existente; evita stacking issues |
| Duration | `var(--dss-duration-tooltip)` | Token semantico existente; permite ajuste global |
| `border-radius` | `var(--dss-radius-md)` | Diferencia visualmente de badges (pill) e chips; ressalva R-04 registrada |
| `inheritAttrs` | `true` (default Vue) | Necessario para encaminhamento de `id` ao root (associacao `aria-describedby`) |
| Opacidade disabled | N/A | Componente nao suporta estado disabled |

---

## Veredito Final

| Criterio | Status |
|----------|--------|
| Tokens | CONFORME |
| Touch Target | CONFORME |
| Arquitetura | CONFORME |
| Estados | CONFORME |
| Acessibilidade | CONFORME |
| Documentacao | CONFORME |

---

## CONFORME — SELO DSS v2.2 CONCEDIDO

**Componente:** DssTooltip
**Versao:** 1.0.0
**Data de Emissao:** 06 de Fevereiro de 2026
**Classificacao:** Elemento Informativo Contextual nao interativo — Informational — Fase 1

---

## Imutabilidade

Este documento e historico e imutavel apos emissao. Nao pode ser editado, reinterpretado ou complementado. Qualquer alteracao futura no componente DssTooltip invalida este selo. Nova auditoria devera ser conduzida e novo selo emitido em novo arquivo.

**Caminho canonico deste arquivo:**
```
DSS/docs/Compliance/seals/DssTooltip/DSSTOOLTIP_SELO_v2.2.md
```

---

## Arquivos Auditados

| Arquivo | Camada | Status |
|---------|--------|--------|
| `1-structure/DssTooltip.ts.vue` | Layer 1 | CONFORME |
| `2-composition/_base.scss` | Layer 2 | CONFORME |
| `3-variants/_multi-line.scss` | Layer 3 | CONFORME |
| `3-variants/index.scss` | Layer 3 | CONFORME |
| `4-output/_brands.scss` | Layer 4 | CONFORME |
| `4-output/_states.scss` | Layer 4 | CONFORME |
| `4-output/index.scss` | Layer 4 | CONFORME |
| `DssTooltip.module.scss` | Orchestrador | CONFORME |
| `composables/useTooltipClasses.ts` | Composable | CONFORME |
| `composables/index.ts` | Barrel | CONFORME |
| `types/tooltip.types.ts` | Tipos | CONFORME |
| `DssTooltip.md` | Doc Principal | CONFORME |
| `README.md` | Doc Onboarding | CONFORME |
| `DSSTOOLTIP_API.md` | Doc API | CONFORME |
| `DssTooltip.example.vue` | Showcase | CONFORME |
| `DssTooltip.test.js` | Testes | CONFORME |
| `dss.meta.json` | Metadados | CONFORME |
| `index.js` | API Publica | CONFORME |
