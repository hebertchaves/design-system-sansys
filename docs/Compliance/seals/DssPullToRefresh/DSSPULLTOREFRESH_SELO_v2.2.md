# SELO DE CONFORMIDADE DSS v2.2
## DssPullToRefresh

> **Caminho canônico:** `DSS/docs/Compliance/seals/DssPullToRefresh/DSSPULLTOREFRESH_SELO_v2.2.md`
> Este arquivo é histórico e imutável. Não pode ser editado após emissão.
> Alterações no componente invalidam este selo. Nova auditoria → novo selo → novo arquivo.

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **Componente** | DssPullToRefresh |
| **Versão DSS** | 2.2 |
| **Data de emissão** | 2026-05-20 |
| **Fase** | 2 — Nível 1 |
| **Família** | Interação Gestual |
| **Tipo** | Interativo — Wrapper de Interação Gestual |
| **Motor Quasar** | QPullToRefresh |
| **Golden Reference** | DssChip (interativo) |
| **Golden Context** | DssInfiniteScroll |
| **Dependências DSS Internas** | Nenhuma |
| **Auditor** | Claude Code DSS |
| **Ciclos de auditoria** | 2 |

---

## 2. Não-Conformidades

### Ciclo 1 — 2026-05-20 (resolvidas antes da emissão)

| ID | Gravidade | Descrição | Correção | Evidência |
|----|-----------|-----------|----------|-----------|
| NC-01 | Bloqueante | Anunciador sr-only sem classe `.dss-sr-only` local; classe utilitária global inexistente. | Adicionado `.dss-sr-only` em `2-composition/_base.scss` com EXC-SrOnly-02 registrada no `dss.meta.json`. | Classe presente em `_base.scss` linhas 87–97. |
| NC-02 | Não-bloqueante | Bloco `.dss-pull-to-refresh--disabled` com `pointer-events: none` violava Gate de Responsabilidade. | Bloco CSS removido. `disabled` é gerenciado inteiramente pelo QPullToRefresh via prop `:disable`. | Comentário explicativo em `_base.scss` linhas 74–79. |
| NC-03 | Não-bloqueante | `1px` hardcoded em `forced-colors` em vez de `var(--dss-border-width-thin)`. | Substituído por `var(--dss-border-width-thin)` em `4-output/_states.scss`. | `_states.scss` linha 53. |
| NC-04 | Não-bloqueante | `beforeEach` importado sem uso em `DssPullToRefresh.test.js`. | Removido do import. | `test.js` linha 1 — import correto com apenas `describe`, `it`, `expect`, `vi`. |
| NC-05 | Não-bloqueante | Fallback hardcoded `var(--dss-opacity-disabled, 0.4)` no bloco disabled. | Resolvida com NC-02 (bloco removido). | Sem ocorrências em nenhum arquivo SCSS. |
| NC-06 | Não-bloqueante | Heights em `px` e borders com `1px` hardcoded no `example.vue`. | Heights substituídos por `vh` (35–55vh). Borders substituídos por `var(--dss-border-width-thin)`. | `example.vue` — sem valores `px` ou `1px` hardcoded. |

### Ciclo 2 — 2026-05-20 (resolvidas antes da emissão)

| ID | Gravidade | Descrição | Correção | Evidência |
|----|-----------|-----------|----------|-----------|
| NC-01 | Não-bloqueante | Documentação inconsistente sobre estado `disabled` após NC-02 do ciclo 1: `DssPullToRefresh.md` §6 descrevia `opacity` + `pointer-events`; `dss.meta.json` e `DSSPULLTOREFRESH_API.md` listavam `--dss-opacity-disabled` como token usado (token fantasma). | `DssPullToRefresh.md` §6 atualizado com descrição correta; `--dss-opacity-disabled` removido de `dss.meta.json` e `DSSPULLTOREFRESH_API.md`. | `DssPullToRefresh.md` §6 linha atualizada; `dss.meta.json` tokens sem `--dss-opacity-disabled`. |

---

## 3. Ressalvas

| ID | Tipo | Descrição | Impacto |
|----|------|-----------|---------|
| EXC-Gate-01 | gateException | QPullToRefresh como elemento root do componente DSS. | Motor necessário para comportamento de pull-to-refresh. Sem ele o componente não pode existir. Aceito por governança DSS. |
| EXC-Gate-02-a | gateException | `--q-color-primary` override via CSS para governar cor do ícone interno. | QPullToRefresh não expõe hook CSS para a cor do ícone. Padrão canônico: DssPagination, DssAjaxBar. |
| EXC-Gate-02-b | gateException | Seletores descendentes `.q-pull-to-refresh__handler` e `.q-pull-to-refresh__arrow`. | Handler interno ao QPullToRefresh sem slot API. Única forma de controlar background, shadow, border-radius e tamanho de ícone. |
| EX-Structural-01 | structuralException | `border-radius: 50%` no handler — constante geométrica para forma circular. | Sem token DSS equivalente para formas circulares perfeitas. Precedente: DssKnob (`stroke-width` unitless para SVG). |
| EXC-States-01 | statesException | `prefers-reduced-motion` via CSS (`animation-duration: 0.01ms !important`). | Animação do handler é CSS-based; CSS puro é suficiente. Diferente do DssParallax cujos JS listeners exigem `v-if/v-else`. |
| EXC-States-02 | statesException | `forced-colors` usa SystemColor keywords (`ButtonFace`, `ButtonText`). | Obrigatório conforme WCAG 1.4.11. Padrão canônico DSS. |
| EXC-SrOnly-02 | srOnlyException | `.dss-sr-only` declarado localmente em `2-composition/_base.scss`. | Utilitário global DSS para sr-only inexistente. Risco de duplicação. Precedente: DssParallax EXC-SrOnly-01. |
| EXC-Expose-01 | exposeException | `defineExpose({ trigger })` expõe API imperativa do QPullToRefresh. | Necessário para ativar refresh programaticamente (ex: botão alternativo acessível). Padrão: DssInfiniteScroll, DssScrollArea. |
| WARN-A11Y-01 | acessibilidadeWarning | Gesto de puxar não é acessível via teclado. | Toda interface com DssPullToRefresh DEVE fornecer botão de atualização alternativo. Declarado obrigatoriamente na documentação e no `dss.meta.json`. |

---

## 4. Conformidades

### Tokens — PASS
O MCP `validate_component_code` retornou `verdict: compliant` — sem valores hardcoded não documentados. Todos os tokens declarados em `dss.meta.json` correspondem aos usados nos arquivos SCSS após a remoção de `--dss-opacity-disabled` (NC-01 ciclo 2). As exceções estruturais (`border-radius: 50%`, `1px` em forced-colors via `var(--dss-border-width-thin)`) estão documentadas e justificadas.

### Touch Target — CONFORME
`DssPullToRefresh` é um container de rolagem, não um controle compacto. O handler do QPullToRefresh é um indicador visual de feedback, não um alvo de toque discreto. Touch target como Compact Control é declarado N/A com justificativa explícita na documentação (§7) e no `dss.meta.json` (`statesNotApplicable`). Conforme premissa arquitetural DSS #2 para componentes que não são alvos de toque discretos.

### Arquitetura — CONFORME
O componente está CONFORME com o Gate Estrutural DSS (CLAUDE.md — fonte de verdade):
- **4 camadas obrigatórias presentes**: `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` — verificadas com MCP e `find`.
- **Orquestrador SCSS** (`DssPullToRefresh.module.scss`): importa L2 → L3 → L4 na ordem exata.
- **Entry Point Wrapper** (`DssPullToRefresh.vue`) presente na raiz — re-export puro de `./1-structure/DssPullToRefresh.ts.vue`, sem `<template>`, sem `<style>`, sem lógica própria.
- **`index.js`** exporta o wrapper como entry point principal, além de tipos e composables.
- **Gate de Composição**: sem seletores `:deep()`, sem tags HTML nativas substituíveis. Componente é Fase 2 — Nível 1 independente (nenhum componente DSS interno).
- **Gate de Responsabilidade**: sem captura de estados de filhos via CSS (NC-02 corrigida no ciclo 1). `disabled` delegado inteiramente ao QPullToRefresh. Sem lógica de negócio no template.

### Estados — CONFORME
Estados do ciclo de pull (`idle`, `pulling`, `ready`, `refreshing`, `done`) gerenciados pelo motor QPullToRefresh. Estado `disabled` delegado via prop `:disable`. Estado `refreshing` refletido no ARIA (`aria-busy="true"` no anunciador sr-only). Estados N/A (`hover`, `focus`, `active`, `loading`) declarados explicitamente no `dss.meta.json` (`statesNotApplicable`) e na documentação (§6) com justificativas objetivas.

### Acessibilidade — CONFORME
- **WCAG 2.1 AA**: verificado.
- **Anunciador sr-only**: `role="status"` + `aria-live="polite"` + `aria-busy` — anuncia transição de estado para leitores de tela sem interromper.
- **Classe `.dss-sr-only`** local: padrão consolidado (EXC-SrOnly-02), precedente DssParallax.
- **`prefers-reduced-motion`**: CSS suprime animação do handler (`animation-duration: 0.01ms !important`).
- **`prefers-contrast: more`**: borda `var(--dss-border-width-thick) solid currentColor` no handler.
- **`forced-colors`**: SystemColor keywords `ButtonFace`/`ButtonText` conforme WCAG 1.4.11 (EXC-States-02).
- **Aviso obrigatório** sobre alternativa por teclado: declarado em §1 ("Quando NÃO usar"), §7 (bloco destacado), §13 (anti-patterns), `dss.meta.json` (`accessibilityNotes.criticalWarning`) e `compositionRecommendations`.

### Documentação — CONFORME
- `DssPullToRefresh.md`: Template 13.1 completo — visão geral, classificação, API, estados, acessibilidade, tokens, comportamentos, paridade Golden, decisões arquiteturais, exceções, anti-patterns, changelog.
- `DSSPULLTOREFRESH_API.md`: props (expostas e bloqueadas), slots, eventos, métodos, classes CSS e tokens — consistente com o código após NC-01 ciclo 2.
- `README.md`: quick start, modos de marca, tamanhos, ativação programática, links.
- `DssPullToRefresh.example.vue`: 5 cenários (Hub md, Hub sm, Water lg com ícone personalizado, disabled, Waste no-mouse) — sem valores hardcoded.
- Exceções documentadas em `dss.meta.json` (7 entradas), `DssPullToRefresh.md` §12 e `DSSPULLTOREFRESH_API.md` §Exceções.

### Testes — CONFORME
`DssPullToRefresh.test.js` presente na raiz do componente. Cobertura verificada:
- **Renderização base**: slot default, classe raiz, classe de tamanho padrão (md), anunciador acessível.
- **Props**: `size="sm"`, `size="lg"`, `disabled=true`, `disabled=false`.
- **Eventos**: `refresh` emitido com função `done`; `aria-busy` durante refresh e reset após `done()`.
- **Slots**: slot default com conteúdo arbitrário.
- **Forwarding (`$attrs`)**: atributos HTML arbitrários encaminhados ao root.
- Imports corretos: `describe`, `it`, `expect`, `vi` — sem `beforeEach` não utilizado (NC-04 resolvida).

---

## 5. Resultado Final

**CONFORME — SELO DSS v2.2 CONCEDIDO**

- **Componente:** DssPullToRefresh
- **Data de emissão:** 2026-05-20
- **Este documento é imutável.** Qualquer alteração posterior no componente invalida este selo. Uma nova auditoria deve ser conduzida e um novo arquivo de selo deve ser criado.
