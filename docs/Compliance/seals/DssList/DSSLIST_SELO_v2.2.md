# SELO DE CONFORMIDADE DSS v2.2

---

## Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssList |
| **Versao do Componente** | 1.0.0 |
| **Versao do DSS** | v2.2 |
| **Classificacao** | Superficie estrutural de lista — Container de Layout Nao-Interativo — Fase 2 |
| **Status Pre-Selo** | Pre-normativo |
| **Golden Reference** | DssBadge (Elemento nao-interativo, Selo DSS v2.2) |
| **Golden Context** | DssCard (Container estrutural, Selo DSS v2.2) |
| **Dependencias DSS Internas** | Nenhuma (DssItem e DssSeparator sao requisitos de composicao por slot, nao dependencias de importacao diretas) |
| **Data de Emissao** | 31 de Marco de 2026 |
| **Auditor** | Claude Code (Modo Auditor DSS) |

---

## Historico de Auditoria

| Fase | Data | Resultado |
|------|------|-----------|
| Auditoria Inicial | 31 Marco 2026 | 1 NC identificada (tokens fantasma), 3 GAPs |
| Correcao Tecnica | 31 Marco 2026 | NC-01 corrigida (5 tokens fantasma removidos), 3 GAPs implementados |
| Re-Auditoria | 31 Marco 2026 | 1 NC residual (ID de excecao incorreto em 2 arquivos), 1 GAP (tokens README incompleto) |
| Correcao Residual | 31 Marco 2026 | NC residual corrigida, GAP resolvido, 0 regressoes |
| Auditoria Final | 31 Marco 2026 | NC = 0, Aprovado |

---

## Nao-Conformidades

**Nenhuma nao-conformidade encontrada.**

Todas as nao-conformidades identificadas durante o ciclo de auditoria foram corrigidas e verificadas:

| NC | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| NC-01 | 5 tokens fantasma em `dss.meta.json` e `DSSLIST_API.md`: `--dss-hub-700`, `--dss-water-300`, `--dss-water-600`, `--dss-waste-300`, `--dss-waste-700` declarados mas ausentes no SCSS | Removidos de `dss.meta.json` (campo `tokensUsed`) e de `DSSLIST_API.md` (tabela de tokens por brand). Contagem corrigida de 25 para 20 tokens | `dss.meta.json` — 20 entradas em `tokensUsed`; `grep "hub-700\|water-300\|water-600\|waste-300\|waste-700"` = 0 resultados em todo o diretorio |
| NC-R01 | ID de excecao incorreto em 2 arquivos: `3-variants/_separator.scss` linha 6 e `types/list.types.ts` linha 49 referenciavam `EXC-01` para o seletor descendente, quando o ID registrado e `EXC-06` | Corrigido `EXC-01` → `EXC-06` no comentario de `_separator.scss` e no JSDoc de `list.types.ts` | `3-variants/_separator.scss:6` — `EXC-06: Seletor descendente`; `list.types.ts:49` — `(EXC-06)` |

---

## Ressalvas (nao-bloqueantes)

Nenhuma ressalva registrada.

> O campo `hasReservations` em `dss.meta.json` confirma: `false`.

---

## Conformidades Confirmadas

### Tokens — CONFORME

- Zero tokens inexistentes apos correcao NC-01
- Zero tokens especificos de componente (`--dss-list-*` = 0 resultados)
- Tokens de tipografia: `--dss-font-family-sans`, `--dss-font-size-md`
- Tokens de texto: `--dss-text-body`, `--dss-text-inverse`
- Tokens de borda: `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-width-thick`
- Tokens de cor: `--dss-gray-200`, `--dss-gray-300`
- Tokens de radius: `--dss-radius-md`
- Tokens de spacing: `--dss-spacing-2`
- Tokens de brand Hub: `--dss-hub-300`, `--dss-hub-400`, `--dss-hub-600`
- Tokens de brand Water: `--dss-water-200`, `--dss-water-400`, `--dss-water-500`
- Tokens de brand Waste: `--dss-waste-200`, `--dss-waste-500`, `--dss-waste-600`
- Tokens de brand numericos (`--dss-hub-600`, etc.) — alinhado com DssCard (Golden Context): tokens semanticos de brand inexistentes no catalogo DSS atual
- 6 excecoes documentadas (EXC-01 a EXC-06) com ID, valor, arquivo e racional
- Zero valores hardcoded nao-documentados em `.scss` e `.vue`
- EXC-01/EXC-02: `rgba(255,255,255,0.2/0.12)` para dark mode (mesmo padrao do DssCard Golden Context)
- EXC-03/EXC-04/EXC-05: system color keywords obrigatorios em `forced-colors`
- EXC-06: seletor descendente `.dss-list--separator > * + *` — Gate de Composicao v2.4

### Touch Target — CONFORME (Nao Aplicavel)

- DssList e container estrutural nao-interativo (Option B, como DssBadge Golden Reference)
- Touch target via `::before` nao se aplica: componente nao captura eventos
- `::before` nao utilizado — nenhuma violacao da convencao de pseudo-elementos
- `::after` nao utilizado — nenhuma violacao da convencao de pseudo-elementos
- Interatividade delegada integralmente aos componentes filhos (`DssItem` com prop `clickable`)
- Decisao alinhada com classificacao: nao e Compact Control, nao e interativo

### Arquitetura — CONFORME

**Gate Estrutural DSS (CLAUDE.md) — CONFORME.** Verificacao explicita:

- Layer 1 (Structure): `1-structure/DssList.ts.vue` — Vue 3 + TypeScript + Composition API, `defineOptions({ name: 'DssList', inheritAttrs: false })`, `v-bind="$attrs"` no elemento raiz
- Layer 2 (Composition): `2-composition/_base.scss` — tokens genericos, layout, tipografia, reset
- Layer 3 (Variants): `3-variants/_bordered.scss`, `_padding.scss`, `_separator.scss` + `index.scss` — 3 variantes distintas em arquivos separados
- Layer 4 (Output): `4-output/_brands.scss` (Hub, Water, Waste com dark mode), `4-output/_states.scss` (dark mode, forced-colors, print) + `4-output/index.scss`
- Orchestrador: `DssList.module.scss` — importa L2 → L3 → L4 na ordem exata, com `prefers-contrast: high` e `prefers-reduced-motion` no nivel do orchestrador
- Entry Point Wrapper: `DssList.vue` na raiz do diretorio — re-export puro da Layer 1, sem `<template>`, sem `<style>`, sem logica propria. Conteudo: `import DssList from './1-structure/DssList.ts.vue'; export default DssList`
- Barrel export: `index.js` exporta componente, tipos e composables
- Composable: `composables/useListClasses.ts` — `computed` reativo, classe condicional de brand com template literal
- Tipos: `types/list.types.ts` — `ListBrand`, `ListProps`, `ListSlots` com JSDoc completo; props bloqueadas (`dark`, `dense`) documentadas
- Cascade 4-output: `_brands.scss` declarado antes de `_states.scss` — comportamento dark+bordered+brand identico ao DssCard (Golden Context, selado fev/2026); documentado em `DssList.md` secao 11
- Nenhuma camada omitida
- Nenhum acoplamento de importacao com outros componentes DSS

### Estados — CONFORME

| Estado | Aplicavel | Implementacao | Evidencia |
|--------|-----------|---------------|-----------|
| default | ✅ | `2-composition/_base.scss` — layout, tipografia, cor base | `_base.scss:1-30` |
| bordered | ✅ | `3-variants/_bordered.scss` — borda, border-radius, overflow | `_bordered.scss` |
| padding | ✅ | `3-variants/_padding.scss` — padding vertical | `_padding.scss` |
| separator | ✅ | `3-variants/_separator.scss` — seletor `> * + *` (EXC-06) | `_separator.scss` |
| dark mode | ✅ | `4-output/_states.scss` — EXC-01 border, EXC-02 separator | `_states.scss` |
| forced-colors | ✅ | `4-output/_states.scss` — EXC-03/04/05 system keywords | `_states.scss` |
| hover | ❌ | Nao aplicavel — container nao-interativo | `statesNotApplicable` em meta |
| focus | ❌ | Nao aplicavel — container nao-interativo | `statesNotApplicable` em meta |
| active | ❌ | Nao aplicavel — container nao-interativo | `statesNotApplicable` em meta |
| disabled | ❌ | Nao aplicavel — pertence aos filhos (DssItem) | `statesNotApplicable` em meta |
| loading | ❌ | Nao aplicavel — pertence ao consumidor | `statesNotApplicable` em meta |
| error | ❌ | Nao aplicavel — pertence ao consumidor | `statesNotApplicable` em meta |
| indeterminate | ❌ | Nao aplicavel — listas nao possuem estado intermediario | `statesNotApplicable` em meta |

### Acessibilidade — CONFORME

| Criterio WCAG | Status | Implementacao |
|---------------|--------|---------------|
| 1.4.3 Contraste Minimo (AA) | CONFORME | Tokens `--dss-text-body`, `--dss-text-inverse` garantem conformidade em light/dark |
| 2.1.1 Teclado (A) | CONFORME (Nao Aplicavel) | Container nao-interativo; navegacao por teclado pertence aos DssItems filhos |
| 2.4.7 Foco Visivel (AA) | CONFORME (Nao Aplicavel) | Foco gerenciado pelos DssItems filhos |
| 4.1.2 Nome, Funcao, Valor (A) | CONFORME | `role="list"` declarado explicitamente; `aria-label` e `aria-labelledby` disponíveis |
| WCAG 2.5.5 Touch Target | CONFORME (Nao Aplicavel) | Option B — container nao-interativo, sem touch target proprio |
| `prefers-reduced-motion` | CONFORME | `transition: none` em `.dss-list` (orchestrador) |
| `prefers-contrast: high` | CONFORME | `border-width: var(--dss-border-width-md); border-color: currentColor` (orchestrador) |
| `forced-colors: active` | CONFORME | System colors: `ButtonText`, `Highlight` — EXC-03/EXC-04/EXC-05 |
| Dark mode | CONFORME | `[data-theme="dark"]`, tokens `--dss-text-inverse`, EXC-01/EXC-02 |
| Semantica de lista | CONFORME | `role="list"` no container; filhos assumem `role="listitem"` ou `role="button"` via DssItem |
| Forwarding de atributos | CONFORME | `inheritAttrs: false` + `v-bind="$attrs"` — atributos extras aplicados ao container |

### Documentacao — CONFORME

- `DssList.md` — Documentacao principal completa (12 secoes: visao geral, classificacao DSS, arquitetura, API, exemplos, acessibilidade, matriz de composicao, tokens, excecoes, comparacao QList, comportamentos implicitos, reconciliacao transversal)
- `README.md` — Quick Reference com API, exemplos e lista completa de 20 tokens (agrupados por categoria)
- `DSSLIST_API.md` — API Reference (props, slots, eventos, classes CSS, excecoes, paridade DssCard e DssBadge)
- `DssList.example.vue` — Showcase visual (multiplos cenarios: basico, bordado, separado, com padding, com brand, DssSeparator manual)
- `dss.meta.json` — Metadados de governanca (20 tokens validos, 6 excecoes, estados aplicaveis/nao-aplicaveis, anti-patterns)
- API documentada = API implementada: 6 props expostas, 2 props bloqueadas com justificativa, 1 slot, 0 eventos
- 6 excecoes com rastreabilidade completa (ID, valor, arquivo, justificativa)
- Tokens listados com nomes exatos, agrupados por dominio
- Secao 11 DssList.md: Comportamentos Implicitos (dark mode brand, estrategia CSS global, forwarding de atributos)
- Secao 12 DssList.md: Reconciliacao Transversal (SCSS ↔ CSS, SCSS ↔ Documentacao, Codigo ↔ Documentacao)
- Aviso de anti-pattern `separator` + `DssSeparator` manual documentado explicitamente no README
- Paridade com Golden Context (DssCard) declarada em `DSSLIST_API.md` (tabela comparativa, 9 aspectos)
- Paridade com Golden Reference (DssBadge) declarada em `DSSLIST_API.md` (tabela comparativa, 4 aspectos)
- Nenhuma linguagem absoluta proibida

---

## Decisoes de Governanca Registradas

| Decisao | Valor | Justificativa |
|---------|-------|---------------|
| Golden Reference | DssBadge | Componente nao-interativo canonico do DSS. DssList nao captura eventos proprios. |
| Golden Context | DssCard | Baseline especifico mais proximo: ambos sao containers estruturais que fornecem superficie, bordas e layout sem interatividade propria. |
| Touch target | Nao aplicavel (Option B) | DssList e nao-interativo. Mesmo padrao do DssBadge (Golden Reference). |
| Props bloqueadas | `dark`, `dense` | `dark`: governanca global via `[data-theme="dark"]`. `dense`: responsabilidade dos DssItems individualmente, nao forcada pelo container. |
| Estados nao aplicaveis | hover, focus, active, disabled, loading, error, indeterminate | Container nao-interativo. Estados interativos pertencem aos DssItems filhos. Loading/error pertencem ao consumidor. |
| Tokens de brand | Numericos (`--dss-hub-600`, etc.) | Tokens semanticos de brand inexistentes no catalogo DSS atual. Padrao identico ao DssCard (Golden Context). |
| Cascade 4-output | `_brands.scss` antes de `_states.scss` | Dark mode estados sobrescrevem brand accent em dark+bordered: comportamento intencional, identico ao DssCard (Golden Context, selado fev/2026). |
| Seletor descendente EXC-06 | `.dss-list--separator > * + *` | Gate de Composicao v2.4. Separadores automaticos via CSS sem DX friction. Afeta apenas `border-top`. |
| Estrategia CSS | Global via `dist/style.css` | Alinhado com DssItem e DssSeparator (Fase 1, selados). Sem `<style>` block proprio. |
| Dependencias de composicao | Por slot (nao por import) | DssItem e DssSeparator sao composicao esperada, nao dependencias tecnicas obrigatorias. |

---

## Veredito Final

| Criterio | Status |
|----------|--------|
| Tokens | CONFORME |
| Touch Target | CONFORME (Nao Aplicavel) |
| Arquitetura | CONFORME |
| Estados | CONFORME |
| Acessibilidade | CONFORME |
| Documentacao | CONFORME |

---

## CONFORME — SELO DSS v2.2 CONCEDIDO

**Componente:** DssList
**Versao:** 1.0.0
**Data de Emissao:** 31 de Marco de 2026
**Classificacao:** Superficie estrutural de lista — Container de Layout Nao-Interativo — Fase 2

---

## Imutabilidade

Este documento e historico e imutavel apos emissao. Nao pode ser editado, reinterpretado ou complementado. Qualquer alteracao futura no componente DssList invalida este selo. Nova auditoria devera ser conduzida e novo selo emitido em novo arquivo.

**Caminho canonico deste arquivo:**
```
DSS/docs/Compliance/seals/DssList/DSSLIST_SELO_v2.2.md
```

---

## Arquivos Auditados

| Arquivo | Camada | Status |
|---------|--------|--------|
| `1-structure/DssList.ts.vue` | Layer 1 | CONFORME |
| `DssList.vue` | Entry Point Wrapper | CONFORME |
| `2-composition/_base.scss` | Layer 2 | CONFORME |
| `3-variants/_bordered.scss` | Layer 3 | CONFORME |
| `3-variants/_padding.scss` | Layer 3 | CONFORME |
| `3-variants/_separator.scss` | Layer 3 | CONFORME |
| `3-variants/index.scss` | Layer 3 | CONFORME |
| `4-output/_brands.scss` | Layer 4 | CONFORME |
| `4-output/_states.scss` | Layer 4 | CONFORME |
| `4-output/index.scss` | Layer 4 | CONFORME |
| `DssList.module.scss` | Orchestrador | CONFORME |
| `composables/useListClasses.ts` | Composable | CONFORME |
| `composables/index.ts` | Barrel Composables | CONFORME |
| `types/list.types.ts` | Tipos | CONFORME |
| `DssList.md` | Doc Principal | CONFORME |
| `README.md` | Doc Onboarding | CONFORME |
| `DSSLIST_API.md` | Doc API | CONFORME |
| `DssList.example.vue` | Showcase | CONFORME |
| `dss.meta.json` | Metadados | CONFORME |
| `index.js` | API Publica | CONFORME |
