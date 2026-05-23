# SELO DSS v2.2 — DssDataCard

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **Componente** | `DssDataCard` |
| **Versão do Selo** | v2.2 |
| **Fase** | 3 |
| **Nível** | 1 (Golden Context da Fase 3) |
| **Família** | Composição Complexa / Card de Dados |
| **Quasar Base** | Nenhuma direta — orquestra DSS Fase 1/2 |
| **Golden Reference** | `DssChip` (interativo) |
| **Golden Context** | *Este componente É o Golden Context da Fase 3* |
| **Interativo** | Sim (abas, paginação, botões de toolbar) |
| **Data do Selo** | 2026-05-23 |
| **Autor** | Claude (DSS Agent) |

---

## 2. Não-Conformidades

### NCs Corrigidas no Ciclo 1

| ID | Severidade | Descrição | Resolução |
|----|-----------|-----------|-----------|
| NC-01 | Não-bloqueante | CSS morto em `4-output/_states.scss` — bloco `&--loading` continha regras que nunca casavam com nenhum elemento DOM (template usa `v-if/v-else`; paginação usa `showPagination` computed que exclui `loading`) | Removido o bloco CSS morto; substituído por comentário explicativo sobre por que não há CSS necessário para o estado `--loading` |
| NC-02 | Não-bloqueante | Ausência de `prefers-reduced-motion` para a animação shimmer do skeleton — a animação infinita não respeitava a preferência de usuários sensíveis a movimento | Adicionado em `4-output/_states.scss`: `@media (prefers-reduced-motion: reduce) { .dss-data-card__skeleton-line { animation: none; } }` |
| NC-03 | Não-bloqueante | `opacity: 0.4` no `@keyframes dss-data-card-shimmer` era hardcoded sem documentação de exceção | Documentado como EXC-Structural-03 em `_base.scss`, `dss.meta.json`, `DssDataCard.md` e `DSSDATACARD_API.md` |
| GAP-01 | Não-bloqueante | `DssDataCard.example.vue`: Cenário 2 usava `v-model="activeTab2"` (variável semanticamente incorreta para `modelValue`/página) e nomes de abas numéricos | Removido `v-model` do cenário 2 (sem paginação); nomes das abas corrigidos para strings descritivas (`resumo`, `detalhes`, `historico`); slots `#tab-{name}` corrigidos correspondentemente |

---

## 3. Exceções Estruturais

| ID | Valor | Justificativa |
|----|-------|---------------|
| EXC-Structural-01 | `gap: 2px` em `__title-group` | Gap geométrico mínimo entre título e subtítulo. `--dss-spacing-1` (4px) é o menor token disponível e seria visualmente excessivo para o espaçamento compacto do grupo de título |
| EXC-Structural-02 | `line-height: 1.3` em `__subtitle` | Nenhum token DSS mapeia para 1.3. `--dss-line-height-xs` = 1.4 é o mais próximo mas seria incorreto visualmente para um subtítulo compacto sem ascendentes |
| EXC-Structural-03 | `opacity: 0.4` em `@keyframes dss-data-card-shimmer` | Valor de ponto médio da animação shimmer. Nenhum token DSS de opacidade para animações existe. `--dss-opacity-disabled` (0.4) tem o mesmo valor mas semântica de estado `disabled`, inapropriada para contexto de animação |

---

## 4. Conformidades Verificadas

### Gate Estrutural

| Critério | Resultado |
|----------|-----------|
| 4 camadas presentes (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`) | ✅ Conforme |
| Entry Point Wrapper `DssDataCard.vue` — re-export puro sem template/style/lógica | ✅ Conforme |
| Orchestrador `DssDataCard.module.scss` — imports L2→L3→L4 na ordem canônica | ✅ Conforme |
| Barrel export `index.js` — componente + composables (DATA_CARD_DISABLED_KEY, provide, inject) | ✅ Conforme |
| `dss.meta.json` — `goldenReference: "DssChip"`, `goldenContext: "DssDataCard"` | ✅ Conforme |

### Gate Técnico

| Critério | Resultado |
|----------|-----------|
| Token First — sem hardcoded (exceto EXC-Structural-01/02/03 documentadas) | ✅ Conforme |
| Ausência de `:deep()` para layout — PADRÃO FASE 3 #4 | ✅ Conforme |
| `inheritAttrs: false` + `v-bind="attrs"` no `DssCard` raiz — PADRÃO FASE 3 #1 | ✅ Conforme |
| `provide/inject` tipado — `DATA_CARD_DISABLED_KEY: InjectionKey<Ref<boolean>>` — PADRÃO FASE 3 #2 | ✅ Conforme |
| CSS Variables como canal visual — `[data-brand]` no raiz propaga brand sem prop drilling — PADRÃO FASE 3 #3 | ✅ Conforme |
| Slots dinâmicos tipados — `tab-{name}` via `v-for` sobre `tabs` — PADRÃO FASE 3 #5 | ✅ Conforme |
| Estado `--disabled` — `opacity: var(--dss-opacity-disabled)` + `pointer-events: none` + `user-select: none` | ✅ Conforme |
| Estado `loading` — skeleton com `role="status"` + `aria-label="Carregando conteúdo"` | ✅ Conforme |
| `prefers-reduced-motion: reduce` — `animation: none` no skeleton | ✅ Conforme |
| WCAG 2.1 AA — `aria-busy` (loading), `aria-disabled` (disabled), `aria-live="polite"` (paginação), `aria-current="page"` (página ativa), `aria-label` em todos os botões de paginação | ✅ Conforme |
| SCSS compila sem erros | ✅ Conforme |
| Brandabilidade — `[data-brand='hub|water|waste']` afeta bordas internas `__toolbar` e `__tabs` | ✅ Conforme |
| Delegação de variante — `variant` prop delegada ao `DssCard` interno sem duplicação de CSS | ✅ Conforme |
| Dependências DSS exclusivamente via entry-point wrappers (não via `1-structure/` interno) | ✅ Conforme |

### Gate Documental

| Critério | Resultado |
|----------|-----------|
| `dss.meta.json` — schema completo, 19 tokens, 3 exceções, `statesNotApplicable`, `phase3Patterns` | ✅ Conforme |
| `DssDataCard.md` — Template 13.1, 15 seções (identificação, propósito, uso, a11y, foco, props, emits, slots, variantes, estados, brand, padrões Fase 3, exceções, exemplos, histórico) | ✅ Conforme |
| `DSSDATACARD_API.md` — props (11), tipos (`DataCardTab`), emits (3), slots (4), provide/inject, tokens (19), exceções (3) | ✅ Conforme |
| `DssDataCard.example.vue` — 5 cenários (básico, abas, paginação+provide/inject, brand, loading) | ✅ Conforme |
| `README.md` — quick start, tabela padrões Fase 3, estrutura interna, propagação de estado, links | ✅ Conforme |
| `DssDataCard.test.js` — 12 casos de teste (renderização, props, estados, events, slots) | ✅ Conforme |

### 5 Padrões Obrigatórios da Fase 3

| # | Padrão | Implementação | Status |
|---|--------|---------------|--------|
| 1 | `inheritAttrs: false` | `defineOptions({ inheritAttrs: false })` + `v-bind="attrs"` no `DssCard` raiz via `useAttrs()` | ✅ Conforme |
| 2 | `provide/inject` tipado | `DATA_CARD_DISABLED_KEY: InjectionKey<Ref<boolean>>` em `composables/useDataCard.ts`; `provideDataCardDisabled()` no setup; `injectDataCardDisabled()` disponível para filhos | ✅ Conforme |
| 3 | CSS Variables como canal visual | `[data-brand]` no raiz — DssToolbar e DssTabs recebem brand via cascata CSS DSS sem prop drilling | ✅ Conforme |
| 4 | Proibição de `:deep()` para layout | Nenhum uso de `:deep()` em nenhum dos arquivos SCSS; layout via classes BEM `dss-data-card__*` próprias | ✅ Conforme |
| 5 | Slots dinâmicos tipados | `tab-{name}` gerado via `v-for` sobre `tabs` no `DssTabPanel`; interface `DataCardSlots` tipada com `[key: \`tab-${string}\`]` | ✅ Conforme |

---

## 5. Histórico de Auditoria

| Ciclo | Data | Achados | Ação |
|-------|------|---------|------|
| Ciclo 1 | 2026-05-23 | 3 NCs não-bloqueantes + 1 GAP | Corrigidos todos no mesmo ciclo |

---

## 6. Resultado

**✅ APROVADO — SELO DSS v2.2 EMITIDO**

> `DssDataCard` está em conformidade plena com os padrões do Design System Sansys v2.2.
> Auditado em 1 ciclo. Todas as NCs não-bloqueantes e GAPs foram corrigidos.
> Os 5 Padrões Obrigatórios da Fase 3 estão implementados e verificados.
>
> **Este componente é o Golden Context da Fase 3 — baseline de auditoria para todos os componentes compostos complexos do DSS.**
>
> **Componente elegível para produção DSS.**
