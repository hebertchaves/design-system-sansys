# SELO DE CONFORMIDADE DSS v2.2

---

## Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssItem |
| **Versao do Componente** | 1.0.0 |
| **Versao do DSS** | v2.2 |
| **Classificacao** | Elemento Estrutural Base dual-mode (estatico/interativo) — Layout / List |
| **Status Pre-Selo** | Pre-normativo |
| **Golden Component de Referencia** | DssChip (Compact Control interativo, Selo DSS v2.2) |
| **Golden Component Secundario** | N/A (DssItem e o primeiro elemento estrutural dual-mode auditado; DssChip e a referencia mais proxima por ser interativo) |
| **Data de Emissao** | 13 de Fevereiro de 2026 |
| **Auditor** | Claude Code (Modo Auditor DSS) |

---

## Historico de Auditoria

| Fase | Data | Resultado |
|------|------|-----------|
| Auditoria Inicial | 13 Fevereiro 2026 | 5 NCs identificadas (1 bloqueante, 4 nao-bloqueantes), 6 GAPs |
| Correcao Tecnica | 13 Fevereiro 2026 | 5 NCs corrigidas, estrutura complementada (dss.meta.json, DssItem.md) |
| Re-Auditoria | 13 Fevereiro 2026 | 2 NCs residuais (exemplo), 6 GAPs |
| Correcao Residual | 13 Fevereiro 2026 | Tokens no exemplo corrigidos, hardcoded removido, Entry Point Wrapper criado |
| Re-Auditoria Final | 13 Fevereiro 2026 | NC = 0, Gate Estrutural APROVADO |
| Auditoria Final | 13 Fevereiro 2026 | NC = 0, Aprovado |

---

## Nao-Conformidades

**Nenhuma nao-conformidade encontrada.**

Todas as nao-conformidades identificadas durante o ciclo de auditoria foram corrigidas e verificadas:

| NC | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| NC-01 | `aria-hidden="true"` hardcoded em slots leading/trailing sem opcao de controle | Criadas props `leadingDecorative` e `trailingDecorative` com binding condicional `:aria-hidden="leadingDecorative ? 'true' : undefined"` | `DssItem.ts.vue:15,29` — binding condicional, `item.types.ts:133,140` — props tipadas |
| NC-02 | Hover/active em `_interactive.scss` sem guard `:not(.dss-item--disabled)` | Adicionado guard `:not(.dss-item--disabled)` nos seletores `&:hover::after` e `&:active::after` | `_interactive.scss:49,59` — `&:hover:not(.dss-item--disabled)::after`, `&:active:not(.dss-item--disabled)::after` |
| NC-03 | `dss.meta.json` ausente | Criado com metadata de governanca completa (Golden context, tokens por categoria, audit status) | `dss.meta.json` — 71 linhas, 7 categorias de tokens |
| NC-04 | Decisao arquitetural de altura nao documentada em `DssItem.md` | Adicionada secao "Decisao Arquitetural — Altura via spacing tokens" com tabela de composicao e justificativa | `DssItem.md:484-497` — secao completa com racional |
| NC-05 | Valores hardcoded em `DssItem.example.vue` (font-sizes, border-widths, hex color) | Substituidos por tokens DSS com fallback: `var(--dss-font-size-2xl, 2.5rem)`, `var(--dss-border-width-md, 2px)`, removido `#e0e0e0` | `DssItem.example.vue:304,310,314,319,330,338` — zero hex, zero px sem token |
| NC-06 | Entry Point Wrapper `DssItem.vue` ausente na raiz do componente | Criado `DssItem.vue` como re-export puro da Layer 1; `index.js` atualizado para exportar via wrapper | `DssItem.vue` — re-export puro, `index.js:2` — `export { default as DssItem } from './DssItem.vue'` |
| NC-07 | `DSSITEM_API.md` faltando props `leadingDecorative` e `trailingDecorative` | Adicionadas as 2 props na tabela de API Reference com tipos e descricoes completas | `DSSITEM_API.md:19-20` — 14 props documentadas |

---

## Ressalvas (nao-bloqueantes)

As ressalvas abaixo foram identificadas e aceitas. Nenhuma impede a emissao do selo.

| ID | Descricao | Justificativa | Monitoramento |
|----|-----------|---------------|---------------|
| R-01 | Mixins DSS (`dss-transition`, `dss-focus-ring`, `dss-touch-target`) nao utilizados | DssItem usa CSS raw funcional. Mixins sao facilitadores, nao mandatorios. Comportamento identico ao produzido pelos mixins. | Avaliar adocao em proxima revisao. |
| R-02 | Dark mode hover depende de overlay `currentColor` automatico | Overlay via `::after` com `currentColor` funciona corretamente em dark mode por heranca natural de cor. Nao ha falha funcional. | Validar em testes visuais de dark mode. |
| R-03 | Sem testes unitarios/integracao | Nao impacta conformidade DSS. Infraestrutura de testes pendente de configuracao. | Implementar quando test framework for configurado. |
| R-04 | Sem CHANGELOG | Historico de alteracoes nao versionado. Nao impacta conformidade tecnica. | Criar quando processo de versionamento for formalizado. |
| R-05 | `!important` nao usado em `prefers-reduced-motion: reduce` | `transition: none` sem `!important` pode ser sobrescrito por especificidade. Funcional no contexto atual. | Monitorar se especificidade causa regressao. |
| R-06 | `defineExpose` nao utilizado | DssItem nao expoe metodos publicos. Aceitavel para componente sem API imperativa. | Adicionar se API imperativa for necessaria no futuro. |

> Nenhuma ressalva impede a concessao do selo.

---

## Conformidades Confirmadas

### Tokens — CONFORME

- Zero tokens inexistentes
- Zero tokens especificos de componente (`--dss-item-*` = 0 resultados)
- Tokens de spacing: `--dss-spacing-0_5`, `--dss-spacing-1`, `--dss-spacing-3`, `--dss-spacing-4`, `--dss-spacing-5`, `--dss-spacing-6`, `--dss-spacing-8`, `--dss-spacing-12`
- Tokens de typography: `--dss-font-family-sans`, `--dss-font-size-xs`, `--dss-font-size-sm`, `--dss-font-size-md`, `--dss-font-weight-normal`, `--dss-font-weight-medium`, `--dss-line-height-normal`, `--dss-line-height-tight`
- Tokens de cor: `--dss-text-body`, `--dss-text-subtle`, `--dss-action-primary`, `--dss-surface-active`, `--dss-border-default`
- Tokens de interacao: `--dss-touch-target-min`, `--dss-opacity-hover`, `--dss-opacity-active`, `--dss-opacity-disabled`, `--dss-opacity-50`, `--dss-focus-ring`
- Tokens de motion: `--dss-duration-150`, `--dss-easing-standard`
- Tokens de borda: `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-width-thick`
- Tokens de brand: `--dss-hub-600`, `--dss-hub-500`, `--dss-water-500`, `--dss-water-400`, `--dss-waste-600`, `--dss-waste-500`
- 4 excecoes documentadas (EXC-01 a EXC-04) com ID, valor, arquivo e racional
- Zero valores hardcoded nao-documentados em `.scss` e `.vue`

### Touch Target — CONFORME

- DssItem implementa touch target condicional baseado no modo de operacao
- Modo clickable (`clickable=true`): touch target 48px via `::before` com `min-height: var(--dss-touch-target-min)`, conforme WCAG 2.5.5 Opcao A
- Modo estatico (`clickable=false`): touch target nao implementado, conforme Opcao B (elemento nao interativo)
- Modo compact (`density="compact"`): touch target removido via `::before { display: none }`, conforme padrao DssChip/DssRadio
- `::before` reservado exclusivamente para touch target (nenhuma violacao da convencao de pseudo-elementos)
- `::after` utilizado exclusivamente para efeitos visuais de hover/active (nenhuma violacao da convencao de pseudo-elementos)
- `-webkit-tap-highlight-color: transparent` aplicado em `_base.scss`

### Arquitetura — CONFORME

- Layer 1 (Structure): `1-structure/DssItem.ts.vue` — TypeScript + Composition API + `<script setup>`
- Layer 2 (Composition): `2-composition/_base.scss` — tokens genericos, layout flex, typography, divider
- Layer 3 (Variants): `3-variants/_density.scss`, `_interactive.scss`, `_alignment.scss` — 3 variantes separadas
- Layer 4 (Output): `4-output/_states.scss` (dark mode, high contrast, forced-colors, reduced-motion, print) + `4-output/_brands.scss` (3 brands + dark)
- Orchestrador: `DssItem.module.scss` (3 `@use` imports com aliases: base, variants, output — ordem L2 → L3 → L4)
- **Gate Estrutural DSS (CLAUDE.md) — CONFORME:**
  - Entry Point Wrapper `DssItem.vue` presente na raiz do componente e e re-export puro (`import DssItem from './1-structure/DssItem.ts.vue'; export default DssItem`) — sem `<template>`, sem `<style>`, sem logica propria
  - 4 camadas presentes em completude: `1-structure/`, `2-composition/`, `3-variants/`, `4-output/`
  - Orchestrador `DssItem.module.scss` importa L2 → L3 → L4 na ordem exata via `@use`
  - `index.js` exporta o wrapper como entry point principal: `export { default as DssItem } from './DssItem.vue'`
  - `dss.meta.json` presente com `goldenReference: "DssChip"` e `goldenContext: "DssChip"` declarados
- Tipos: `types/item.types.ts` com interfaces completas (ItemProps, ItemEmits, ItemSlots, ItemDensity, ItemColor, ItemBrand)
- Composables: `composables/useItemClasses.ts` com logica de classes computadas
- Compilado: 580 linhas CSS, zero erros
- Nenhuma camada omitida
- Nenhuma heranca indevida
- Nenhum acoplamento com outros componentes DSS

### Estados — CONFORME

| Estado | SCSS | Vue/ARIA | Evidencia |
|--------|------|----------|-----------|
| default | `_base.scss:17-48` | Template raiz | Layout flex, typography, color, padding, transitions |
| hover | `_interactive.scss:49-51` | — | `::after { opacity: var(--dss-opacity-hover) }` com guard `:not(.dss-item--disabled)` |
| active (press) | `_interactive.scss:59-61` | — | `::after { opacity: var(--dss-opacity-active) }` com guard `:not(.dss-item--disabled)` |
| active (prop) | `_interactive.scss:68-76` | — | `background-color: var(--dss-surface-active)`, `color: var(--dss-action-primary)`, `font-weight: var(--dss-font-weight-medium)` |
| focus | `_interactive.scss:92-95` | `tabindex="0"` | `:focus-visible` com `outline: var(--dss-border-width-md) solid var(--dss-focus-ring)` inset |
| disabled | `_interactive.scss:82-86` | `aria-disabled="true"` | `opacity: var(--dss-opacity-disabled)`, `pointer-events: none`, `cursor: not-allowed` |
| dark | `_states.scss:17-48` | — | Tokens semanticos reapplicados em dark mode |
| loading | — | — | Nao aplicavel: pertence ao container (DssList). Documentado em DssItem.md:200. |
| error | — | — | Nao aplicavel: pertence a formularios. Documentado em DssItem.md:201. |
| indeterminate | — | — | Nao aplicavel: pertence a DssCheckbox/DssRadio. Documentado em DssItem.md:202. |

### Acessibilidade — CONFORME

| Criterio WCAG | Status | Implementacao |
|---------------|--------|---------------|
| 2.5.5 Target Size (AAA) | CONFORME | Touch target 48px via `::before` com `min-height: var(--dss-touch-target-min)` quando clickable |
| 2.1.1 Teclado (A) | CONFORME | `@keydown.enter`, `@keydown.space.prevent` — handler `handleClick` emite evento |
| 2.4.7 Foco Visivel (AA) | CONFORME | `:focus-visible` com outline inset |
| 4.1.2 Nome, Funcao, Valor (A) | CONFORME | `role="button"` (clickable) / `role="listitem"` (static), `aria-disabled`, `aria-label`, `aria-hidden` condicional via `leadingDecorative`/`trailingDecorative` |
| 1.4.3 Contraste Minimo (AA) | CONFORME | Tokens semanticos (`--dss-text-body`, `--dss-text-subtle`) com contraste adequado |
| `prefers-reduced-motion` | CONFORME | `transition: none` em `.dss-item` e `.dss-item--clickable::after` |
| `prefers-contrast: more` | CONFORME | Focus ring espesso (`--dss-border-width-thick`), borda lateral no active, opacity ajustada, `text-decoration: line-through` em disabled |
| `forced-colors: active` | CONFORME | System colors: `ButtonText`, `Highlight`, `HighlightText`, `GrayText` — EXC-02/03/04 |
| Dark mode | CONFORME | `prefers-color-scheme: dark` com tokens semanticos reapplicados |
| `-webkit-tap-highlight-color` | CONFORME | `transparent` em `.dss-item` |
| `inheritAttrs: false` | CONFORME | `defineOptions({ name: 'DssItem', inheritAttrs: false })` com `v-bind="$attrs"` no template |
| `defineOptions` | CONFORME | `name: 'DssItem'` declarado via `defineOptions` |

### Documentacao — CONFORME

- `DssItem.md` — Documentacao normativa completa (13 secoes, Template 13.1: Visao Geral, Anatomia, Tokens, API, Estados, Variantes, Brandabilidade, Acessibilidade, Modos de Uso, Exemplos, Anti-patterns, Governanca, Troubleshooting)
- `README.md` — Quick Reference com modos de operacao, densidades, slots, exemplos e links
- `DSSITEM_API.md` — API Reference (14 props, 3 slots, 1 evento, 16 classes CSS, tokens por categoria)
- `DssItem.example.vue` — Showcase visual (13 cenarios: basico, clicavel, leading, trailing, leading+trailing, active, disabled, densidades, inset, divider, brandabilidade, cores semanticas, navegacao completa + secao de acessibilidade)
- `dss.meta.json` — Metadados de governanca (Golden context, 7 categorias de tokens, audit status)
- API documentada = API implementada (14 props, 3 slots, 1 evento)
- 4 excecoes com rastreabilidade (ID, valor, arquivo, justificativa)
- Tokens listados com nomes exatos em `DssItem.md`, `DSSITEM_API.md` e `dss.meta.json`
- Nenhuma linguagem absoluta proibida ("100% compativel", "Golden Sample")
- Composition API + TypeScript em componente e composables

---

## Decisoes de Governanca Registradas

| Decisao | Valor | Justificativa |
|---------|-------|---------------|
| Golden Component | DssChip (unico) | Referencia interativa mais proxima; DssItem e dual-mode com interatividade condicional |
| Touch target | Condicional (clickable=48px, static=N/A, compact=removido) | Alinhado com WCAG 2.5.5 — Opcao A quando interativo, Opcao B quando estatico |
| Tokens de altura | Genericos (`--dss-spacing-12`, `--dss-spacing-8`) | DssItem NAO e Compact Control; altura via composicao de spacing tokens existentes |
| Tokens de brand | Numericos (`--dss-hub-600`, etc.) | Tokens semanticos de brand inexistentes no catalogo DSS atual |
| Dual-mode | `clickable` prop controla modo (static vs interactive) | Simplifica API, evita componentes duplicados, role/tabindex/handlers automaticos |
| `aria-hidden` em slots | Props `leadingDecorative`/`trailingDecorative` com default `false` | Consumidor opta explicitamente; nao bloqueia acessibilidade por default |
| Estados nao aplicaveis | loading, error, indeterminate | Pertencem ao container (DssList) ou a form controls (DssCheckbox/DssRadio) |
| Pseudo-elementos | `::before` = touch target, `::after` = overlay visual | Conforme convencao normativa DSS (CLAUDE.md regra 7) |
| Focus ring | `outline` inset (`outline-offset` negativo) | Evita overflow em listas contidas |
| Disabled guard | `:not(.dss-item--disabled)` em hover/active | Impede interacao visual em estado desabilitado |

---

## Excecoes Documentadas

| ID | Valor | Arquivo | Justificativa |
|----|-------|---------|---------------|
| EXC-01 | `max-width: 600px` | `DssItem.example.vue:297` | Container de scaffolding do exemplo (`.dss-item-examples`), nao pertence ao componente. Nao ha token DSS de max-width para demo pages. |
| EXC-02 | `3px solid Highlight` | `4-output/_states.scss:113` | Forced-colors mode: tokens CSS custom properties sao ignorados pelo navegador. Keywords de sistema obrigatorios. |
| EXC-03 | `3px solid HighlightText` | `4-output/_states.scss:119` | Forced-colors mode: idem EXC-02. |
| EXC-04 | `1px solid ButtonText` | `4-output/_states.scss:128` | Forced-colors mode: idem EXC-02. |

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

**Componente:** DssItem
**Versao:** 1.0.0
**Data de Emissao:** 13 de Fevereiro de 2026
**Classificacao:** Elemento Estrutural Base dual-mode (estatico/interativo) — Layout / List — Fase 1

---

## Imutabilidade

Este documento e historico e imutavel apos emissao. Nao pode ser editado, reinterpretado ou complementado. Qualquer alteracao futura no componente DssItem invalida este selo. Nova auditoria devera ser conduzida e novo selo emitido em novo arquivo.

**Caminho canonico deste arquivo:**
```
DSS/docs/Compliance/seals/DssItem/DSSITEM_SELO_v2.2.md
```

---

## Arquivos Auditados

| Arquivo | Camada | Status |
|---------|--------|--------|
| `DssItem.vue` | Entry Point Wrapper | CONFORME |
| `1-structure/DssItem.ts.vue` | Layer 1 | CONFORME |
| `2-composition/_base.scss` | Layer 2 | CONFORME |
| `3-variants/_density.scss` | Layer 3 | CONFORME |
| `3-variants/_interactive.scss` | Layer 3 | CONFORME |
| `3-variants/_alignment.scss` | Layer 3 | CONFORME |
| `3-variants/index.scss` | Layer 3 (Orchestrador) | CONFORME |
| `4-output/_brands.scss` | Layer 4 | CONFORME |
| `4-output/_states.scss` | Layer 4 | CONFORME |
| `4-output/index.scss` | Layer 4 (Orchestrador) | CONFORME |
| `DssItem.module.scss` | Orchestrador Principal | CONFORME |
| `composables/useItemClasses.ts` | Composable | CONFORME |
| `composables/index.ts` | Barrel | CONFORME |
| `types/item.types.ts` | Tipos | CONFORME |
| `index.js` | API Publica | CONFORME |
| `DssItem.md` | Doc Normativa | CONFORME |
| `DSSITEM_API.md` | Doc API | CONFORME |
| `README.md` | Doc Onboarding | CONFORME |
| `DssItem.example.vue` | Showcase | CONFORME |
| `dss.meta.json` | Metadados | CONFORME |
