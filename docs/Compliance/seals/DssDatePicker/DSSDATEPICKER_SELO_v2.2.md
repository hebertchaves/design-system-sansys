# SELO DE CONFORMIDADE DSS v2.2
## DssDatePicker

> **Caminho canônico:** `DSS/docs/Compliance/seals/DssDatePicker/DSSDATEPICKER_SELO_v2.2.md`
> **Este arquivo é histórico e imutável. Alterações no componente invalidam este selo. Nova auditoria → novo selo → novo arquivo.**

---

## 1. IDENTIFICAÇÃO

| Campo | Valor |
|-------|-------|
| Componente | `DssDatePicker` |
| Versão DSS | v2.2 |
| Fase | Fase 2 — Nível 3 (Composição de Segundo Grau) |
| Categoria | Seletores e Pickers |
| Motor Quasar | `QDate` |
| Tipo | Widget visual interativo de seleção de data |
| Golden Reference | `DssChip` (componente interativo — padrão de focus, hover, touch target) |
| Golden Context | `DssTimePicker` (QMotor root, `color="primary"` fixo, `--q-color-primary` override, descendant selectors) |
| Dependências DSS Internas | Nenhuma (widget autossuficiente; composição externa recomendada: DssButton, DssDialog, DssField) |
| Data de Auditoria | 2026-05-22 |
| Auditado por | Claude Code — Prompt Auditoria v2.5 |

---

## 2. NÃO-CONFORMIDADES

### Ciclo 1 — Identificadas e Corrigidas

| ID | Descrição | Referência Normativa | Correção Aplicada | Gravidade |
|----|-----------|---------------------|-------------------|-----------|
| NC-01 | Seletor `.q-date__header-subtitle--light` não existe no DOM do QDate — CSS morto sem efeito real. EX-Structural-01 documentada sem efeito. | CLAUDE.md — Token First; DSS_IMPLEMENTATION_GUIDE.md | Substituído por `.q-date__header-link:not(.q-date__header-link--active)` — seletor real do QDate para o link inativo do header. `dss.meta.json` e `DssDatePicker.md` atualizados. | Não-bloqueante |
| NC-02 | Seletor `.q-date__calendar-item--fill button` — células fill são espaçadores sem botões filhos. CSS morto. | CLAUDE.md — Token First | Seletor removido de `2-composition/_base.scss`. | Não-bloqueante |

**Não-conformidades bloqueantes:** Nenhuma encontrada.
**Não-conformidades não-bloqueantes:** 2 (ambas corrigidas no ciclo 1).

---

## 3. RESSALVAS

| ID | Descrição | Localização |
|----|-----------|-------------|
| RES-01 | `opacity: 0.7` (EX-Structural-01) aplicado a `.q-date__header-link:not(.q-date__header-link--active)` é um valor não-tokenizado. DSS não possui token de opacidade para estados visuais de texto secundário em header colorido. Documentado como exceção estrutural análoga ao DssTimePicker EX-Structural-01. | `2-composition/_base.scss` |
| RES-02 | Os seletores `EXC-Gate-02b` (descendant selectors para partes internas do QDate) dependem da estrutura interna de classes do Quasar. Atualização do Quasar pode requerer revisão dos seletores. | `2-composition/_base.scss`, `4-output/_brands.scss` |

---

## 4. CONFORMIDADES

### Tokens
**PASS** — Gate de Tokens: Verificado via `mcp__dss__validate_component_code` — nenhuma violação detectada. Zero valores hardcoded não documentados. Exceção `EX-Structural-01` (`opacity: 0.7`) documentada com ID, valor, local e justificativa. 17 tokens DSS utilizados, todos mapeados em `dss.meta.json`.

### Touch Target
**CONFORME** — DssDatePicker é um widget de calendário que não é um Compact Control. Touch target é gerenciado internamente pelo QDate para cada célula de dia interativa. Não se aplica estratégia `::before` (WCAG 2.5.5) no nível do wrapper DSS.

### Arquitetura
**PASS** — Gate Estrutural DSS (CLAUDE.md): Componente CONFORME.
- ✅ 4 camadas presentes: `1-structure/`, `2-composition/`, `3-variants/`, `4-output/`
- ✅ Entry Point Wrapper `DssDatePicker.vue` presente na raiz — re-export puro sem `<template>`, sem `<style>`, sem lógica própria
- ✅ Orquestrador `DssDatePicker.module.scss` importa L2 → L3 → L4 na ordem correta
- ✅ `index.js` exporta o wrapper como entry point principal
- ✅ Gate de Composição: EXC-Gate-01 documentado (QDate como root), sem `:deep()` ou `::v-deep`, sem HTML nativo substituível
- ✅ Gate de Responsabilidade: Sem captura de estados de filhos via CSS, sem lógica de negócio

### Estados
**PASS** — Todos os estados aplicáveis implementados:
- `hover`: Células do calendário e setas de navegação via descendant selectors (EXC-Gate-02b)
- `focus`: Root via `:focus-visible` com `--dss-focus-ring`
- `active`: Dia selecionado e endpoints de range via EXC-Gate-02b
- `disabled`: Root via `aria-disabled="true"` → `opacity: var(--dss-opacity-disabled)`
- `readonly`: Root via `.q-date--readonly` → `cursor: default`
- `loading`: Justificado como N/A — QDate é síncrono; consumidor usa DssInnerLoading externamente
- `error`: Justificado como N/A — validação é responsabilidade do consumidor (DssField)

### Acessibilidade
**PASS** — WCAG 2.1 AA:
- ARIA gerenciado pelo QDate (`role="group"`, `aria-label` dinâmico, `aria-disabled`)
- Navegação por teclado gerenciada pelo QDate (setas, PageUp/Down, Enter)
- `prefers-reduced-motion`: `transition-duration: var(--dss-duration-0)` em `4-output/_states.scss`
- `prefers-contrast: more`: bordas adicionais em `4-output/_states.scss`
- `forced-colors: active`: SystemColor keywords em `4-output/_states.scss`

### Documentação
**PASS** — Documentação normativa completa:
- `DssDatePicker.md`: Template 13.1 completo com seções obrigatórias Fase 2 (Comportamentos Implícitos, Paridade com Golden Context, Tokens Utilizados, Matriz de Composição)
- `DSSDATEPICKER_API.md`: Props (27), Slots (1), Eventos (4), Tokens (17), Props Bloqueadas (6), Classes CSS, Exceções
- `README.md`: Quick start, modos de seleção, composição recomendada, brandabilidade
- `dss.meta.json`: `goldenReference`, `goldenContext`, `goldenContextJustification`, `statesApplicable`, `statesNotApplicable`, `tokens`, `exceptions`, `gateExceptions`, `compositionRecommendations`, `propsBlocked`

### Testes
**PASS** — `DssDatePicker.test.js` presente (351 linhas):
- Renderização base (classe `dss-date-picker`, classe `q-date`, `name`, `inheritAttrs`)
- Props expostas: `modelValue` (string, objeto range, array), `range`, `multiple`, `mask`, `landscape`, `minimal`, `todayBtn`, `defaultView`, `defaultYearMonth`, `emitImmediately`, `yearsInMonthView`, `options` (Function e Array), `navigationMinYearMonth`, `navigationMaxYearMonth`, `firstDayOfWeek`, `noUnset`, `events`, `disable`, `readonly`, `name`, `tabindex`, `title`, `subtitle`
- Eventos emitidos: `update:modelValue` (data única e range), `navigation`, `range-start`, `range-end`
- Attrs forwarding: `aria-label`, `data-testid`
- EXC-Gate-02: `color="primary"` fixo verificado e prop `color` bloqueada verificada
- Gate de Responsabilidade: root é `q-date` (sem wrapper div), compound class verificada
- Slot default: renderização verificada

---

## 5. EXCEÇÕES FORMALIZADAS

| ID | Tipo | Local | Valor | Justificativa |
|----|------|-------|-------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 | `1-structure/DssDatePicker.ts.vue` | QDate como root element — sem wrapper div | QDate gerencia internamente: calendário visual, navegação mês/ano/anos, seleção única/range/múltipla, ARIA, transições de views e teclado. Sem alternativa em componentes DSS básicos. |
| EXC-Gate-02 | CSS Custom Property Override | `2-composition/_base.scss` | `--q-color-primary: var(--dss-action-primary)` | QDate usa `--q-color-primary` para colorir header, dia selecionado, botão Hoje e endpoints de range. `color="primary"` fixo garante presença de todos elementos visuais no DOM. Padrão idêntico ao DssPagination, DssAjaxBar, DssCarousel e DssTimePicker. |
| EXC-Gate-02b | Gate de Composição v2.4 — Descendant Selector | `2-composition/_base.scss` | Descendant selectors para `.q-date__header`, `.q-date__header-link`, `.q-date__calendar-item--active button`, `.q-date__range-from button`, `.q-date__range-to button`, `.q-date__range button`, `.q-date__calendar-item--out-of-range button`, `.q-date__event`, `.q-date__arrow button`, `.q-date__today` | QDate não fornece CSS custom property hooks nativos para partes internas. Descendant selectors são o único mecanismo de override CSS disponível. Padrão DssTimePicker (EXC-Gate-02b). |
| EX-Structural-01 | Valor Visual Não-Tokenizado | `2-composition/_base.scss` | `opacity: 0.7` em `.q-date__header-link:not(.q-date__header-link--active)` | DSS não possui token de opacidade para estados visuais de texto secundário em header colorido. Valor canonicamente estabelecido para indicar link inativo. Análogo ao DssTimePicker EX-Structural-01 (`opacity: 0.7` para texto AM/PM inativo). |

---

## 6. RESUMO EXECUTIVO

| Métrica | Quantidade |
|---------|------------|
| Não-conformidades bloqueantes | 0 |
| Não-conformidades não-bloqueantes | 2 (ambas corrigidas — ciclo 1) |
| Gaps / Riscos futuros | 0 |
| Ciclos de correção | 1 |
| Ressalvas (não impeditivas) | 2 |

---

## CONFORME — SELO DSS v2.2 CONCEDIDO

**Componente:** `DssDatePicker`
**Data de emissão:** 2026-05-22
**Arquitetura:** v2.2

Este selo é imutável. Alterações no componente após esta data invalidam o selo e exigem nova auditoria e emissão de novo arquivo de selo.
