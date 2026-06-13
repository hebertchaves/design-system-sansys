# SELO DE CONFORMIDADE DSS v2.2

## Componente: DssVirtualScroll

**Caminho canonico**: `DSS/docs/Compliance/seals/DssVirtualScroll/DSSVIRTUALSCROLL_SELO_v2.2.md`

> Este documento e historico e imutavel. Nao pode ser editado apos emissao.
> Alteracoes no componente invalidam o selo. Nova auditoria gera novo selo em novo arquivo.

---

## 1. Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssVirtualScroll |
| **Versao DSS** | 2.2.0 |
| **Classificacao** | Container de dados virtualizado nao interativo — Fase 2 Nivel 2 |
| **Fase** | 2 |
| **Golden Reference** | DssBadge |
| **Golden Context** | DssLinearProgress |
| **Dependencias DSS Internas** | Nenhuma |
| **Path** | `DSS/components/base/DssVirtualScroll/` |
| **Total de arquivos** | 17 |
| **CSS compilado** | Zero erros de compilacao |
| **Data de emissao** | 12 Mai 2026 |
| **Auditor** | Claude (Modo Auditor DSS) |

---

## 2. Ciclo de Auditoria

| Etapa | Descricao |
|-------|-----------|
| Implementacao inicial | 17 arquivos, arquitetura 4 camadas, wrapper QVirtualScroll, estados loading/empty/disabled, brandabilidade hub/water/waste, ARIA via slot scope |
| Auditoria tecnica (1a rodada) | 2 NCs bloqueantes + 4 NCs nao-bloqueantes + 5 GAPs identificados |
| Parecer estrategico | Token `--dss-action-primary` nao existe no catalogo; substituir por `currentColor` no base e `--dss-action-{brand}` nos brands. EXC-Gate-01 requer justificativa mais especifica com CSS ativo. |
| Correcao NC-01 | Slots `prepend`/`append` duplicados — removidos `#before`/`#after` de dentro do QVirtualScroll. Slots existem apenas no nivel root do DssVirtualScroll, renderizando em todos os estados sem duplicacao. |
| Correcao NC-02 | Cenario 4 do exemplo reescrito: removida estrutura `<table>` manual e `tag="tbody"` (prop nao suportada). Novo padrao usa `type="table"` com `#prepend` para cabecalho fixo via CSS grid. |
| Correcao NC-03 | `withDefaults` simplificado: removidos `horizontal: false`, `loading: false`, `disable: false` (defaults triviais para booleanos). |
| Correcao NC-04 | Token `--dss-spacing-1` removido de `dss.meta.json`, `DSSVIRTUALSCROLL_API.md` e `DssVirtualScroll.md`. Corrigido para `--dss-spacing-px` (token real utilizado na borda do spinner). |
| Correcao NC-05 | Slots `loading` e `empty` adicionados a `DssVirtualScrollSlots` em `virtualscroll.types.ts`. |
| Correcao NC-06 | `pre_prompt_dss_virtual_scroll.md` reescrito: secao 8 estava triplicada com fragmento corrompido. Arquivo limpo com 8 secoes unicas e gate anti-duplicacao de slots adicionado. |
| Correcao parecer — token spinner | `--dss-action-primary` substituido por `currentColor` em `_base.scss` e `_states.scss`. |
| Correcao parecer — tokens brand | `--dss-hub/water/waste-primary` substituidos por `--dss-action-hub/water/waste` em `_brands.scss`. |
| Correcao parecer — EXC-Gate-01 | CSS ativo adicionado: `.q-virtual-scroll__content { width: 100% }` dentro de `__inner`. Justificativa em `dss.meta.json` atualizada com seletor exato, regra especifica e racional tecnico. |
| Correcao GAP-05 | Estado `error` adicionado a `statesNotApplicable` em `dss.meta.json` com justificativa explícita. |
| Auditoria tecnica (2a rodada) | Zero nao-conformidades. 2 GAPs residuais nao-bloqueantes (i18n do aria-label; marker class sem CSS). |
| QA Final | SCSS sem erros de compilacao; todas as correcoes verificadas via leitura direta dos arquivos; MCP `validate_component_code` retornou `compliant`. |
| Selo | CONCEDIDO |

---

## 3. Nao-Conformidades Resolvidas

| ID | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| NC-01 | Slots `prepend` e `append` renderizados duas vezes no DOM em estado normal: uma vez como filhos diretos do div root e uma segunda vez como `#before`/`#after` dentro do QVirtualScroll. Em estado normal (v-else ativo), o consumidor que fornecesse `#prepend` ou `#append` veria o conteúdo duplicado, quebrando layout e ARIA. | Removidos `<template v-if="$slots.prepend" #before>` e `<template v-if="$slots.append" #after>` de dentro do QVirtualScroll. Slots `prepend`/`append` existem apenas no nivel root do div, renderizando em todos os estados (normal, loading, empty) sem duplicacao. | `1-structure/DssVirtualScroll.ts.vue` — template sem `#before`/`#after` no QVirtualScroll; comentario atualizado declarando a decisao. |
| NC-02 | Cenario 4 do `DssVirtualScroll.example.vue` usava `tag="tbody"` em `<DssVirtualScroll>`, esperando que o componente renderizasse como `<tbody>`. A prop `tag` nao esta declarada em `DssVirtualScrollProps`; com `inheritAttrs: false`, caia em `$attrs` e produzia `<div tag="tbody">` — atributo HTML invalido. A estrutura `<table><thead>...<DssVirtualScroll>` era semanticamente invalida. | Cenario 4 reescrito: DssVirtualScroll usa `type="table"` (QVirtualScroll interno gera a estrutura de tabela). Cabecalho fixo implementado via slot `#prepend` com CSS grid alinhado. Nota arquitetural adicionada explicando a limitacao da prop `tag`. | `DssVirtualScroll.example.vue` — Cenario 4 sem `tag="tbody"` e sem `<table>` manual wrapping. |
| NC-03 | `withDefaults` incluia `horizontal: false`, `loading: false` e `disable: false` — defaults triviais para booleanos. Props opcionais do tipo `boolean?` tem `undefined` como default implicito; a triple equality `=== true` no template e composable trata `undefined` identicamente a `false`. Per padrao consolidado nos selos DSS (DssPage, DssLinearProgress — Golden Context), `withDefaults` deve conter apenas defaults nao-triviais. | Removidos `horizontal: false`, `loading: false`, `disable: false` de `withDefaults`. Mantidos apenas `itemSize: 48` e `type: 'list'`. | `1-structure/DssVirtualScroll.ts.vue` — `withDefaults` com dois campos. |
| NC-04 | Token `--dss-spacing-1` (4px) declarado em `dss.meta.json` (lista `tokens`), `DSSVIRTUALSCROLL_API.md` (tabela de tokens com descricao "Largura minima de border") e `DssVirtualScroll.md` (secao 9) — mas nunca referenciado no SCSS. O token real utilizado na borda do spinner e `--dss-spacing-px` (1px). Divergencia entre tokens documentados e tokens usados. | `--dss-spacing-1` removido de `dss.meta.json`, `DSSVIRTUALSCROLL_API.md` e `DssVirtualScroll.md`. Corrigido para `--dss-spacing-px` com descricao "Borda 1px do spinner". | `dss.meta.json` (array `tokens`), `DSSVIRTUALSCROLL_API.md` (tabela Tokens Utilizados), `DssVirtualScroll.md` (secao 9). |
| NC-05 | Interface `DssVirtualScrollSlots` em `virtualscroll.types.ts` declarava apenas `default`, `prepend` e `append`. Os slots `loading` e `empty` existiam no template e estavam documentados na API, mas nao tinham tipagem TypeScript — consumidores perdiam autocomplete e type-check para esses slots. | `loading: () => unknown` e `empty: () => unknown` adicionados a `DssVirtualScrollSlots`. | `types/virtualscroll.types.ts` — interface com 5 slots tipados. |
| NC-06 | `pre_prompt_dss_virtual_scroll.md` estava corrompido: a secao 8 ("SUPERFICIE DE PLAYGROUND") aparecia triplicada (linhas 100–124, 126–145, 148–170) com fragmentos isolados `lmente e funcionalmente...` e `OUND` entre as duplicatas — evidencia de erro de concatenacao na geracao do arquivo. | Arquivo reescrito integralmente: 8 secoes unicas e integras. Secao 2 expandida com gate anti-duplicacao de slots (risco arquitetural especifico deste componente). Secao 4 atualizada com tokens corretos e tokens proibidos declarados explicitamente. | `docs/governance/pre-prompts/pre_prompt_dss_virtual_scroll.md` — 8 secoes, sem duplicacao, arquivo integro. |

---

## 4. GAPs Resolvidos

| ID | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| GAP-01 | Tokens `--dss-hub-primary`, `--dss-water-primary`, `--dss-waste-primary` em `_brands.scss` — tokens nao catalogados no DSS; e o token `--dss-action-primary` no base do spinner — igualmente inexistente no catalogo. | `_brands.scss`: substituidos por `--dss-action-hub`, `--dss-action-water`, `--dss-action-waste`. `_base.scss` e `_states.scss`: substituido `--dss-action-primary` por `currentColor` (brand-agnostic no base; brands sobrescrevem em `_brands.scss`). | `2-composition/_base.scss`, `4-output/_states.scss`, `4-output/_brands.scss`. |
| GAP-02 | EXC-Gate-01 documentada em `dss.meta.json` para seletores `.q-virtual-scroll__content` e `.q-virtual-scroll__padding`, mas sem CSS ativo correspondente — excecao declarada sem uso real. Justificativa generica. | CSS ativo adicionado: `.q-virtual-scroll__content { width: 100% }` dentro de `&__inner` em `_base.scss`. `.q-virtual-scroll__padding` removido das excecoes (nao utilizado). `dss.meta.json` atualizado com seletor exato, regra especifica e localizacao precisa. | `2-composition/_base.scss` linha 45–47; `dss.meta.json` excecao EXC-Gate-01 com seletor unico. |
| GAP-03 | Estado `error` mencionado no pre-prompt (secao 5) como estado previsto, mas sem decisao explicitamente declarada no componente — nem como implementado, nem como nao-aplicavel. | `"error"` adicionado a `statesNotApplicable` em `dss.meta.json` com justificativa: "Estado de erro e responsabilidade do consumidor via slot #append. DssVirtualScroll nao gerencia logica de negocio de falha de rede." | `dss.meta.json` — campo `statesNotApplicableReason.error` preenchido. |

---

## 5. Ressalvas

| ID | Descricao | Classificacao |
|----|-----------|---------------|
| R-01 | `aria-label="Carregando itens"` esta hardcoded em PT-BR no template (estado loading). Nao ha prop `loadingLabel` para internacionalizacao. Em projetos com i18n, o label de acessibilidade estara sempre em portugues. | Nao-bloqueante — registrada para roadmap Fase 3: prop `loadingLabel?: string` com default `'Carregando itens'`. |
| R-02 | Classe modificadora `.dss-virtual-scroll--loading` e adicionada ao root pelo composable `useVirtualScrollClasses` quando `loading === true`, mas nenhum estilo SCSS a utiliza. Funciona como marker class sem estilo DSS nativo. | Nao-bloqueante — intencional como hook para CSS externo do consumidor. Nao documentada como tal. Recomendacao de roadmap: adicionar comentario em `_base.scss` ou remover do composable se sem caso de uso previsto. |

---

## 6. Conformidades

### 6.1 Tokens

| Criterio | Status |
|----------|--------|
| Zero valores hardcoded em SCSS e Vue — px/rem/hex/rgb ausentes | CONFORME |
| 12 tokens `--dss-*` utilizados — todos semanticos e existentes no catalogo DSS | CONFORME |
| Zero tokens especificos de componente criados | CONFORME |
| `dss.meta.json` lista exatamente os tokens utilizados, sem divergencias com o codigo | CONFORME |
| Spinner: `currentColor` no base (brand-agnostic); brands sobrescrevem com `--dss-action-{brand}` | CONFORME |
| Fallback `var(--dss-surface-muted)` declarado nos tokens de brand da scrollbar | CONFORME |

### 6.2 Touch Target

| Criterio | Status |
|----------|--------|
| Touch target declarado como NAO APLICAVEL — componente container nao interativo | CONFORME |
| Justificativa: o scroll e nativo do browser; itens filhos gerenciam seus proprios touch targets | CONFORME |
| `::before` nao utilizado para touch target — correto para componente nao interativo | CONFORME |
| Decisao consistente com Golden Reference DssBadge e Golden Context DssLinearProgress | CONFORME |

### 6.3 Arquitetura

| Criterio | Status |
|----------|--------|
| **Gate Estrutural DSS (CLAUDE.md) — CONFORME** | CONFORME |
| 4 camadas fisicamente presentes: `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` | CONFORME |
| Entry Point Wrapper `DssVirtualScroll.vue` na raiz — re-export puro sem `<template>`, sem `<style>`, sem logica propria | CONFORME |
| `DssVirtualScroll.module.scss` importa L2 → L3 → L4 na ordem obrigatoria | CONFORME |
| `index.js` exporta do wrapper canonico + composable `useVirtualScrollClasses` + todos os types | CONFORME |
| `dss.meta.json` com `goldenReference` (DssBadge) e `goldenContext` (DssLinearProgress) declarados | CONFORME |
| `defineOptions({ name: 'DssVirtualScroll', inheritAttrs: false })` — correto com `<script setup>` | CONFORME |
| `v-bind="$attrs"` no div root — encaminha id, class extra, data-*, aria-* adicionais | CONFORME |
| `withDefaults` com apenas defaults nao-triviais: `itemSize: 48` e `type: 'list'` | CONFORME |
| Slots `prepend`/`append` sem duplicacao: existem apenas no nivel root do div wrapper | CONFORME |
| QVirtualScroll recebe apenas props de virtualizacao — sem `$attrs` e sem slots `#before`/`#after` | CONFORME |
| EXC-Gate-01 ativo e especifico: `.q-virtual-scroll__content { width: 100% }` com CSS real em `_base.scss` | CONFORME |
| Composable `useVirtualScrollClasses` isola logica de classes do SFC | CONFORME |
| Interface `DssVirtualScrollSlots` tipada com todos os 5 slots: `default`, `prepend`, `append`, `loading`, `empty` | CONFORME |
| Gate de Composicao — sem HTML nativo substituivel; sem `:deep()` quebrando encapsulamento | CONFORME |
| Gate de Responsabilidade — container nao captura hover/focus/active dos filhos | CONFORME |

### 6.4 Estados

| Criterio | Status |
|----------|--------|
| default — lista virtualizada normal | CONFORME |
| loading — spinner CSS + slot `#loading` customizavel; `role="status"` + `aria-live="polite"` | CONFORME |
| empty — texto padrao + slot `#empty` customizavel; `role="status"` | CONFORME |
| disabled — `pointer-events: none` + `opacity: var(--dss-opacity-disabled)` | CONFORME |
| hover — NAO APLICAVEL (container); justificado e documentado | CONFORME |
| focus — NAO APLICAVEL (scroll nativo); justificado e documentado | CONFORME |
| active — NAO APLICAVEL (container); justificado e documentado | CONFORME |
| error — NAO APLICAVEL (responsabilidade do consumidor via slot `#append`); justificado e documentado | CONFORME |
| `statesNotApplicable` com justificativas individuais em `dss.meta.json` | CONFORME |

### 6.5 Acessibilidade

| Criterio | Status |
|----------|--------|
| `aria-setsize` / `aria-posinset` expostos via escopo do slot `default` — consumidor aplica nos itens | CONFORME |
| Estrategia ARIA correta: componente nao conhece estrutura interna dos itens; delega ao consumidor | CONFORME |
| `role="status"` + `aria-live="polite"` no container de loading — anuncio nao intrusivo | CONFORME |
| `aria-hidden="true"` no spinner decorativo `.dss-virtual-scroll__loading-indicator` | CONFORME |
| `prefers-reduced-motion: reduce` — `animation: none !important` (EX-States-01 documentado) | CONFORME |
| `prefers-contrast: more` — `currentColor` para scrollbar e texto vazio | CONFORME |
| `forced-colors: active` — `ButtonText`, `Highlight`, `CanvasText` sem `forced-color-adjust: none` | CONFORME |
| Dark mode `[data-theme="dark"]` — scrollbar adaptada | CONFORME |
| Print — `overflow: visible`, `max-height: none`, loading `display: none` | CONFORME |
| Brand `[data-brand]` — hub/water/waste com tokens `--dss-action-{brand}` | CONFORME |
| WCAG 2.1 AA — conformidade via ARIA de slot, role="status", reduced-motion e high-contrast | CONFORME |

### 6.6 Documentacao

| Criterio | Status |
|----------|--------|
| `DssVirtualScroll.md` com 13 secoes (Template 13.1): visao geral, classificacao, arquitetura, API, estados, comportamentos implicitos, paridade com Golden Reference, acessibilidade, tokens, excecoes, composicao, governanca, changelog | CONFORME |
| `DSSVIRTUALSCROLL_API.md` com 8 props, 2 eventos, 5 slots, 12 tokens, CSS classes | CONFORME |
| `README.md` com quick start, quando usar/nao usar, 5 exemplos de codigo, modos disponiveis, nota arquitetural sobre `tag` | CONFORME |
| `DssVirtualScroll.example.vue` com 6 cenarios (acima do minimo de 3): lista basica, loading, empty, tabela, scroll events, brand Hub | CONFORME |
| Comportamentos implicitos declarados no JSDoc da Layer 1: `inheritAttrs: false`, delegacao ao Quasar, ARIA, EXC-Gate-01, props bloqueadas, touch target, estados nao aplicaveis | CONFORME |
| `dss.meta.json` com todos os campos obrigatorios: `goldenReference`, `goldenContext`, `tokens`, `exceptions`, `statesApplicable`, `statesNotApplicable`, `statesNotApplicableReason`, `propsBlocked`, `gateExceptions` | CONFORME |
| Tabela de paridade com Golden Reference (DssBadge) na secao 7 do `.md` | CONFORME |
| Pre-prompt `pre_prompt_dss_virtual_scroll.md` integro, com 8 secoes, gate anti-duplicacao de slots e tokens proibidos explicitamente declarados | CONFORME |
| Anti-patterns documentados: HTML nativo substituivel, `::v-deep` em filhos DSS, chaves unicas ausentes, estado interno sem store, combinacao com DssInfiniteScroll sem loading state | CONFORME |

---

## 7. Excecoes Documentadas

| ID | Regra | Seletor / Valor | Justificativa |
|----|-------|-----------------|---------------|
| EXC-Gate-01 | Gate de Composicao v2.4 — seletores internos de terceiros | `.q-virtual-scroll__content { width: 100% }` em `.dss-virtual-scroll__inner` | `.q-virtual-scroll__content` e o container DOM real dos itens virtualizados gerado exclusivamente pelo QVirtualScroll, nao acessivel via slot ou prop. A regra `width: 100%` garante que o conteudo preencha a largura do `__inner` mesmo quando o Quasar aplica `display: block` ao elemento, evitando colapso de largura em listas com itens de tamanho variavel. Sem esse seletor, listas horizontais ou com overflow quebrariam o layout. Localizacao: `2-composition/_base.scss — bloco .dss-virtual-scroll__inner`. |
| EX-States-01 | `!important` em `prefers-reduced-motion` | `animation: none !important` | Obrigatorio para sobrescrever `@keyframes dss-virtual-scroll-spin` definido em `_base.scss`. Sem `!important`, a animacao persiste com motion reduzido ativo. Precedente: DssLinearProgress (EX-States-01), DssSpinner (EX-02). Localizacao: `4-output/_states.scss`. |

---

## 8. Estrutura Final do Componente

```
DSS/components/base/DssVirtualScroll/ (17 arquivos)
├── 1-structure/
│   └── DssVirtualScroll.ts.vue      (QVirtualScroll wrapper, inheritAttrs: false, ARIA via slot scope)
├── 2-composition/
│   └── _base.scss                   (scroll, loading, empty, disabled, EXC-Gate-01 ativo)
├── 3-variants/
│   ├── _variant.scss                (variante tabela: overflow-x auto)
│   └── index.scss
├── 4-output/
│   ├── _states.scss                 (dark, reduced-motion, high-contrast, forced-colors, print)
│   ├── _brands.scss                 (hub/water/waste — spinner + scrollbar)
│   └── index.scss
├── composables/
│   └── useVirtualScrollClasses.ts   (rootClasses com 5 modificadores)
├── types/
│   └── virtualscroll.types.ts       (Props, Emits, Slots x5, Payload, ItemScope, Type)
├── DssVirtualScroll.module.scss     (orchestrator: L2 → L3 → L4)
├── DssVirtualScroll.example.vue     (6 cenarios: lista, loading, empty, tabela, scroll events, brand)
├── DssVirtualScroll.md              (Template 13.1 — 13 secoes)
├── DSSVIRTUALSCROLL_API.md          (8 props, 2 eventos, 5 slots, 12 tokens)
├── README.md                        (quick start, 5 exemplos, nota arquitetural)
├── dss.meta.json                    (phase 2, level 2, exceptions, statesNotApplicable)
├── DssVirtualScroll.vue             (entry point wrapper — re-export puro)
└── index.js                         (barrel: DssVirtualScroll + useVirtualScrollClasses + types)
```

---

## 9. Metricas

| Metrica | Valor |
|---------|-------|
| Total de arquivos | 17 |
| CSS compilado | Zero erros |
| Tokens referenciados | 12 |
| Nao-conformidades encontradas | 6 (2 bloqueantes, 4 nao-bloqueantes) |
| Nao-conformidades resolvidas | 6/6 |
| GAPs encontrados | 5 |
| GAPs resolvidos | 3/5 (2 residuais nao-bloqueantes registrados como Ressalvas) |
| Excecoes documentadas | 2 (EXC-Gate-01, EX-States-01) |
| Ressalvas nao-bloqueantes | 2 (i18n aria-label; marker class sem CSS) |
| Props publicas | 8 (items, itemSize, type, scrollTarget, sliceSize, horizontal, loading, disable) |
| Slots | 5 (default, prepend, append, loading, empty) |
| Events | 2 (scroll, native-scroll) |
| Cenarios de exemplo | 6 |
| Estados aplicaveis | 4 (default, loading, empty, disabled) |
| Estados nao aplicaveis | 4 (hover, focus, active, error) |
| Brands | 3 (hub, water, waste) |
| Ciclos de auditoria | 2 |

---

## 10. Resultado

**CONFORME — SELO DSS v2.2 CONCEDIDO**

**Componente**: DssVirtualScroll
**Data de emissao**: 12 Mai 2026
**Versao DSS**: 2.2.0

> Este selo atesta que o componente DssVirtualScroll atende aos requisitos normativos do Design System Sansys v2.2, conforme auditoria tecnica em 2 ciclos com resolucao de 6 nao-conformidades e 3 GAPs, e verificacao de aderencia aos documentos vinculantes (CLAUDE.md, DSS_ARCHITECTURE.md, DSS_COMPONENT_ARCHITECTURE.md, DSS_TOKEN_REFERENCE.md).
>
> Componente Container de dados virtualizado nao interativo — Fase 2 Nivel 2. Implementado como wrapper governado do `QVirtualScroll` do Quasar. Delega toda a logica de virtualizacao ao motor Quasar sem reimplementa-la; expoe API DSS simplificada com 8 props, 5 slots e 2 eventos. Estados loading, empty e disabled implementados com ARIA correto. ARIA `aria-setsize`/`aria-posinset` expostos via escopo de slot, permitindo que o consumidor os aplique nos itens sem que o componente precise conhecer sua estrutura interna — decisao arquitetural alinhada a frameworks como Angular CDK e React Virtualized. Token do spinner usa `currentColor` no base, sobrescrito por `--dss-action-{brand}` no contexto de marca. EXC-Gate-01 ativo com CSS real para `.q-virtual-scroll__content`. Slots `prepend`/`append` posicionados exclusivamente no nivel root do wrapper, sem duplicacao via `#before`/`#after` do QVirtualScroll.
>
> Este documento e historico e imutavel. Alteracoes no componente apos esta data invalidam o selo e requerem nova auditoria com emissao de novo selo em novo arquivo.
