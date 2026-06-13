# SELO DE CONFORMIDADE DSS v2.2

## Componente: DssSelect

**Caminho canonico**: `DSS/docs/Compliance/seals/DssSelect/DSSSELECT_SELO_v2.2.md`

> Este documento e historico e imutavel. Nao pode ser editado apos emissao.
> Alteracoes no componente invalidam o selo. Nova auditoria gera novo selo em novo arquivo.

---

## 1. Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssSelect |
| **Versao DSS** | 2.2.0 |
| **Classificacao** | Action Control interativo — campo de selecao |
| **Fase** | 1 |
| **Golden Reference** | DssChip |
| **Golden Context** | DssInput |
| **Dependencias DSS Internas** | DssChip (opcional — quando `useChips=false` e slot `selected-item` usa DssChip para governanca completa) |
| **Path** | `DSS/components/base/DssSelect/` |
| **Total de arquivos** | 24 |
| **CSS compilado** | Zero erros de compilacao |
| **Data de emissao** | 20 Mar 2026 |
| **Auditor** | Claude (Modo Auditor DSS) |

---

## 2. Ciclo de Auditoria

| Etapa | Descricao |
|-------|-----------|
| Implementacao inicial | 24 arquivos, arquitetura 4 camadas, wrapper QSelect, 4 variantes, brandabilidade hub/water/waste, painel dropdown via popup-content-class |
| Auditoria tecnica | 1 NC + 2 GAPs identificados |
| Correcao NC-01 | `clearAriaLabel` removida de `SelectProps`, `withDefaults`, `DSSSELECT_API.md` e `DssSelect.md` — prop prometia funcionalidade que o QSelect nao suporta nativamente |
| Correcao GAP-01 | `hasValue` removido de `useSelectState` (retorno) e `useSelectClasses` (interface `SelectStateRefs`) — QField gerencia float internamente |
| Correcao GAP-02 | `_brands.scss` — blocos CSS vazios de documentacao convertidos em comentarios simples fora de seletores |
| QA Final | SCSS recompilado zero erros; todas as correcoes verificadas |
| Selo | CONCEDIDO |

---

## 3. Nao-Conformidades Resolvidas

| ID | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| NC-01 | `clearAriaLabel` declarada como prop em `SelectProps`, defaultada com `'Clear selection'` em `withDefaults`, e documentada na tabela de props do `DSSSELECT_API.md` com descricao de acessibilidade — mas nunca repassada ao QSelect no template. O QSelect nao possui prop nativa equivalente; a prop prometia funcionalidade de acessibilidade que era silenciosamente ignorada. Contratos de API quebrados sao nao-conformidades documentais per CLAUDE.md ("API documentada != API real"). | Prop `clearAriaLabel` removida de: `types/select.types.ts` (interface SelectProps), `1-structure/DssSelect.ts.vue` (withDefaults), `DSSSELECT_API.md` (tabela de props), `DssSelect.md` (secao de acessibilidade). | `select.types.ts`, `DssSelect.ts.vue`, `DSSSELECT_API.md`, `DssSelect.md` — campo removido. |

---

## 4. GAPs Resolvidos

| ID | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| GAP-01 | `useSelectState` retornava `hasValue: ComputedRef<boolean>` — computado e recebido em `useSelectClasses` via interface `SelectStateRefs`, mas nunca referenciado dentro de `wrapperClasses`. Codigo morto computado a cada render sem produzir efeito. O QField ja gerencia a classe `.q-field--float` internamente. | `hasValue` removido do retorno de `useSelectState` e da interface `SelectStateRefs` em `useSelectClasses`. `import { ref, computed }` simplificado para `import { ref }`. Parametro `props` renomeado para `_props` (convencao TypeScript para parametro nao utilizado). | `composables/useSelectState.ts`, `composables/useSelectClasses.ts` — simplificados. |
| GAP-02 | `_brands.scss` continha blocos CSS com seletores mas corpo vazio (apenas comentario) para documentar que error state prevalece sobre brand. Blocos vazios produzem seletores sem declaracoes no CSS compilado — ruido no output, potencial violacao de regras de lint CSS (stylelint `no-empty-source`). | Blocos vazios convertidos em comentarios simples fora de seletores: `/* Error override: --dss-error-600 prevalece sobre brand por especificidade (0-3-0 vs 0-2-0)... */` | `4-output/_brands.scss` — blocos vazios removidos (3 ocorrencias: hub, water, waste). |

---

## 5. Ressalvas

Nenhuma ressalva nao-bloqueante registrada apos ciclo de correcao.

---

## 6. Conformidades

### 6.1 Tokens

| Criterio | Status |
|----------|--------|
| Zero valores hardcoded na implementacao (SCSS e Vue) — px/rem/hex/rgb ausentes | CONFORME |
| 51 tokens `--dss-*` — todos existentes no catalogo DSS | CONFORME |
| Zero tokens especificos de componente criados | CONFORME |
| `dss.meta.json` lista todos os 51 tokens utilizados | CONFORME |

### 6.2 Touch Target

| Criterio | Status |
|----------|--------|
| Estrategia declarada explicitamente: Opcao A — implementado | CONFORME |
| `min-height: var(--dss-input-height-md)` aplicado em `.dss-select .q-field__control` | CONFORME |
| `--dss-input-height-md` = 44px — WCAG 2.1 AA SC 2.5.5 | CONFORME |
| `::before` nao utilizado — campo select e o proprio touch target (justificado) | CONFORME |
| Dense mode: `min-height: var(--dss-input-height-sm)` = 36px (uso contextual documentado) | CONFORME |
| Decisao consistente com governanca DssInput (Jan 2026) e DssTextarea (Mar 2026) | CONFORME |

### 6.3 Arquitetura

| Criterio | Status |
|----------|--------|
| **Gate Estrutural DSS (CLAUDE.md) — CONFORME** | CONFORME |
| 4 camadas fisicamente presentes: `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` | CONFORME |
| Entry Point Wrapper `DssSelect.vue` na raiz — re-export puro sem `<template>`, sem `<style>`, sem logica propria | CONFORME |
| `DssSelect.module.scss` importa L2 -> L3 -> L4 na ordem obrigatoria | CONFORME |
| L2 split arquitetonicamente justificado: `_base.scss` (campo) + `_panel.scss` (painel teleportado) | CONFORME |
| `index.js` exporta do wrapper canonico + composables + types | CONFORME |
| `dss.meta.json` com `goldenReference` (DssChip) e `goldenContext` (DssInput) declarados | CONFORME |
| `inheritAttrs: false` + `v-bind="$attrs"` — correto para wrapper de QSelect | CONFORME |
| `popup-content-class` injeta `dss-select__panel` + brand class no QMenu teleportado | CONFORME |
| **Gate de Composicao** — sem HTML nativo substituivel; usa QSelect (componente Quasar) | CONFORME |
| Passthrough dinamico de slots via `v-for` sobre `useSlots()` | CONFORME |
| `defineExpose<SelectExpose>` com `focus()`, `blur()`, `showPopup()`, `hidePopup()`, `nativeEl` | CONFORME |
| `defineOptions({ name: 'DssSelect', inheritAttrs: false })` — correto com `<script setup>` | CONFORME |

### 6.4 Estados

| Criterio | Status |
|----------|--------|
| default (repouso por variante) | CONFORME |
| hover | CONFORME |
| focus — `.dss-select--focused` + `.q-field--focused` (dual hook) | CONFORME |
| active (hover + focus simultaneos) | CONFORME |
| disabled — `opacity: var(--dss-opacity-disabled)`, `pointer-events: none` | CONFORME |
| readonly — cursor default, borda reduzida | CONFORME |
| error — borda/sombra com `--dss-error-600` | CONFORME |
| loading — `pointer-events: none`, spinner via QSelect | CONFORME |
| indeterminate — NAO aplicavel (selecao de lista, nao tristate) | CONFORME |
| Rotacao de seta 180 deg no foco — dual hook, `--dss-duration-200 --dss-easing-standard` | CONFORME |

### 6.5 Acessibilidade

| Criterio | Status |
|----------|--------|
| `aria-required` via prop `required` | CONFORME |
| `aria-label` via prop `ariaLabel` repassado ao QSelect | CONFORME |
| `aria-invalid`, `aria-describedby` — gerenciados internamente pelo QSelect | CONFORME |
| Focus ring via `:has(:focus-visible)` — outline com `--dss-focus-ring` | CONFORME |
| Navegacao por teclado: Tab, Space/Enter (abre), Esc (fecha), Arrow Up/Down (navega), Home/End | CONFORME |
| `prefers-reduced-motion` — `transition: none !important` em campo e painel | CONFORME |
| `prefers-contrast: more` — campo (border forcada, outline) + painel (border, active outline) | CONFORME |
| `forced-colors: active` — system color keywords sem `forced-color-adjust: none` (padrao DssTextarea NC-03) | CONFORME |
| Dark mode `[data-theme="dark"]` — campo (variantes, texto, label, hint, chips) + painel (fundo, itens, active, caption) | CONFORME |
| Brand `[data-brand]` — hub/water/waste, padrao identico ao Golden Context DssInput | CONFORME |
| Print — painel `display: none !important`; variantes filled/standout com fallback de borda | CONFORME |

### 6.6 Documentacao

| Criterio | Status |
|----------|--------|
| `DssSelect.md` com 13 secoes obrigatorias: Golden Component, Touch Target, 4 variantes, 2 modos de selecao, decisao arquitetural do painel, estados, acessibilidade, brandabilidade, 4 anti-patterns, paridade com Golden Context, 1 excecao, uso previsto | CONFORME |
| `DSSSELECT_API.md` com 24 props, 6 eventos, 9 slots, 4 expose, 3 composables, 51 tokens por categoria, CSS classes | CONFORME |
| `README.md` com quick start, quando usar/nao usar, variantes, modos de selecao, brandabilidade | CONFORME |
| `DssSelect.example.vue` com 5 cenarios de uso (acima do minimo de 3) | CONFORME |
| 4 anti-patterns documentados (acima do minimo de 3) | CONFORME |
| Tabela de paridade com Golden Context (DssInput) com justificativas para todas as diferencas | CONFORME |
| Secao "Uso Previsto em Componentes Futuros" | CONFORME |
| Comportamentos implicitos declarados no JSDoc da Layer 1 (inheritAttrs, QSelect root, popup-content-class, slots, tabindex, touch target, estados NAO aplicaveis) | CONFORME |
| `dss.meta.json` com todos os campos obrigatorios preenchidos (status, seal, auditMode, auditDate, goldenReference, goldenContext, tokensUsed, antiPatterns) | CONFORME |

---

## 7. Excecoes Documentadas

Nenhuma excecao documentada. O componente nao requer valores nao-tokenizaveis (como bridge de CSS custom property ou filter: brightness()) para sua implementacao.

---

## 8. Estrutura Final do Componente

```
DSS/components/base/DssSelect/ (24 arquivos)
├── 1-structure/
│   └── DssSelect.ts.vue         (QSelect wrapper, inheritAttrs: false, popup-content-class)
├── 2-composition/
│   ├── _base.scss               (override QSelect via .dss-select .q-field__*)
│   └── _panel.scss              (painel dropdown via .dss-select__panel — teleportado)
├── 3-variants/
│   ├── _outlined.scss
│   ├── _filled.scss
│   ├── _standout.scss
│   ├── _borderless.scss
│   └── index.scss
├── 4-output/
│   ├── _states.scss             (dark, contrast, forced-colors, reduced-motion, print)
│   ├── _brands.scss             (hub/water/waste — campo + painel)
│   └── index.scss
├── composables/
│   ├── useSelectClasses.ts
│   ├── useSelectState.ts        (isFocused apenas — hasValue removido pos-auditoria)
│   ├── useSelectActions.ts      (emit tipado via keyof SelectEmits)
│   └── index.ts
├── types/
│   └── select.types.ts
├── DssSelect.module.scss
├── DssSelect.example.vue
├── DssSelect.md
├── DSSSELECT_API.md
├── README.md
├── dss.meta.json
└── index.js
```

---

## 9. Metricas

| Metrica | Valor |
|---------|-------|
| Total de arquivos | 24 |
| CSS compilado | Zero erros |
| Tokens referenciados | 51 |
| Tokens validados no catalogo | 51/51 |
| Nao-conformidades encontradas | 1 |
| Nao-conformidades resolvidas | 1/1 |
| GAPs encontrados | 2 |
| GAPs resolvidos | 2/2 |
| Excecoes documentadas | 0 |
| Ressalvas nao-bloqueantes | 0 |
| Anti-patterns documentados | 4 |
| Props publicas | 24 |
| Slots | 9 (label, selected-item, option, before, prepend, append, after, error, hint) |
| Events | 6 (update:modelValue, focus, blur, clear, popup-show, popup-hide) |
| Expose | 5 (focus, blur, showPopup, hidePopup, nativeEl) |
| Cenarios de exemplo | 5 |
| Variantes | 4 (outlined, filled, standout, borderless) |
| Brands | 3 (hub, water, waste) |

---

## 10. Resultado

**CONFORME — SELO DSS v2.2 CONCEDIDO**

**Componente**: DssSelect
**Data de emissao**: 20 Mar 2026
**Versao DSS**: 2.2.0

> Este selo atesta que o componente DssSelect atende aos requisitos normativos do Design System Sansys v2.2, conforme auditoria tecnica completa com resolucao de 1 nao-conformidade e 2 GAPs, e verificacao de aderencia aos documentos vinculantes (CLAUDE.md, DSS_ARCHITECTURE.md, DSS_COMPONENT_ARCHITECTURE.md, DSS_TOKEN_REFERENCE.md).
>
> Componente Action Control interativo para campos de selecao (dropdowns). Implementado como wrapper do `QSelect` do Quasar. O SCSS utiliza seletores descendentes `.dss-select .q-field__*` para sobrescrever os estilos padrao do Quasar via tokens DSS. A Layer 2 e dividida em `_base.scss` (campo) e `_panel.scss` (painel dropdown) — decisao arquitetural necessaria pois o QMenu e teleportado para o body pelo Quasar. O estilo do painel e governado via `popup-content-class` que injeta `.dss-select__panel` (+ classe de brand) diretamente no QMenu. Suporte a 4 variantes visuais, brandabilidade com campo e painel, selecao simples e multipla (chips nativos ou DssChip via slot). Padrao de brand via `[data-brand]` consistente com o Golden Context DssInput (selado Jan 2026).
>
> Este documento e historico e imutavel. Alteracoes no componente apos esta data invalidam o selo e requerem nova auditoria com emissao de novo selo em novo arquivo.
