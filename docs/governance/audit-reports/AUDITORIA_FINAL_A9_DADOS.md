# AUDITORIA FINAL — A9: Componentes de Exibição de Dados e Conteúdo

**Data:** 2026-06-11
**Escopo:** DssTable, DssCarousel (composed) · DssTree, DssCard, DssTimeline, DssTimelineEntry, DssInfiniteScroll, DssVirtualScroll, DssSkeleton, DssList (base)
**Baseline normativo:** CLAUDE.md, DSS_COMPONENT_ARCHITECTURE.md
**Foco:** slots, renderização de listas e contratos de dados

---

## 1. Veredito Consolidado

| Componente | Gate Estrutural | Gate Técnico | Gate Documental | Slots/Contratos | Veredito |
|---|---|---|---|---|---|
| DssTable | ✅ | ✅ | ⚠️ | ❌ NC-A9-01 | ❌ **REPROVADO** |
| DssCarousel | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ RESSALVA |
| DssTree | ✅ | ✅ | ⚠️ | ✅ | ⚠️ RESSALVA |
| DssCard | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| DssTimeline | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| DssTimelineEntry | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| DssInfiniteScroll | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| DssVirtualScroll | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| DssSkeleton | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |
| DssList | ✅ | ✅ | ✅ | ✅ | ✅ APROVADO |

**Resultado: 7 aprovados · 2 ressalvas · 1 reprovado (DssTable — contrato de slot documentado mas não implementado).**

---

## 2. Gate Estrutural — Evidências

Verificação em lote (existência de arquivos) para os 10 componentes:

| Item | Resultado |
|---|---|
| `1-structure/Dss<Comp>.ts.vue` | ✅ 10/10 |
| `2-composition/_base.scss` | ✅ 10/10 |
| `3-variants/index.scss` | ✅ 10/10 |
| `4-output/_states.scss` + `_brands.scss` + `index.scss` | ✅ 10/10 |
| `Dss<Comp>.vue` re-export puro (sem template/style/lógica) | ✅ 10/10 — todos seguem o formato canônico |
| `Dss<Comp>.module.scss` importa L2 → L3 → L4 nessa ordem | ✅ 10/10 — 100% via `@use` (zero `@import`) |
| Barrel export (`index.js` ou `index.ts`) | ✅ 10/10 (ver nota N1) |
| `dss.meta.json` com goldenReference, goldenContext, previewGroup, defaultPreview.demoSlots | ✅ 10/10 — todos os campos declarados |
| `Dss<Comp>.test.js` | ✅ 10/10 — nenhum stub (ver §5) |

**N1 — Barrel exports (desvios menores, não-bloqueantes):**
- DssTimeline, DssTimelineEntry, DssInfiniteScroll, DssVirtualScroll usam `index.ts` (não `index.js`) — equivalente funcional, exporta componente + composable + types via `export type`. Conformidade plena de conteúdo.
- DssTable e DssTree (`index.js`): exportam componente + composable, mas **não** os types (limitação `export type` em `.js` — DssCarousel documenta isso explicitamente em comentário; Table/Tree não).
- DssCard (`index.js`): importa direto de `1-structure/` (não via wrapper) e não exporta composables/types.
- DssList e DssSkeleton: barrels completos (componente + types + composables).

**Golden Model (Princípio #10):** todos os 10 declaram `goldenReference` (DssChip ou DssBadge — referências oficiais) e `goldenContext` específico. ✅

---

## 3. Gate Técnico — Evidências

### 3.1 Token First (valores hardcoded em `2-composition/_base.scss`)
- ✅ 8/10 totalmente limpos.
- ⚠️ DssTable `_base.scss:84` e DssTree `_base.scss:65`: `outline-offset: -2px` — único valor não-tokenizado encontrado (offset negativo para focus interno; não há token DSS negativo equivalente). **Exceção menor, recomenda-se registrar em `gateExceptions`.**
- ⚠️ DssTree `4-output/_states.scss:38`: `rgba(255, 255, 255, 0.15)` — **já justificado em comentário EXC-01** ("sem token DSS equivalente para dark connectors"). Conforme.

### 3.2 Brandabilidade (`[data-brand='hub|water|waste']`)
- ✅ 9/10 implementam os 3 brands com tokens de escala (`--dss-hub-*`, `--dss-water-*`, `--dss-waste-*`), incluindo variantes dark.
- ✅ DssTimelineEntry: `_brands.scss` sem seletores, **com justificativa documentada no arquivo** — herda cores via custom properties do DssTimeline pai (`--dss-timeline-line-color`, `--dss-timeline-dot-color`). Conforme (arquivo existe para satisfazer a arquitetura).

### 3.3 Pseudo-elementos (Princípio #8)
- ✅ Nenhum uso de `::before` para efeito visual DSS.
- DssTree: seletores `.q-tree__node::before/::after` apenas **estilizam pseudo-elementos internos do QTree** (linhas conectoras) — marcado EXC-Gate-01. Conforme.
- DssSkeleton `_states.scss`: `.q-skeleton::before/::after` apenas para **suprimir animação** em `prefers-reduced-motion` (EX-States-01, WCAG 2.3.3). Conforme.
- DssCarousel: comentário explícito "hover overlay via ::after (::before reservado para touch target)". Conforme.

### 3.4 brightness()
- ✅ Zero ocorrências de `brightness()` em todos os 10 componentes — nenhum valor arbitrário possível.

### 3.5 Cores via classes utilitárias / computed no Vue
- ✅ Todos usam composables `use<Comp>Classes` e tokens semânticos; nenhum `_colors.scss` por componente encontrado.

---

## 4. Gate Documental — Evidências

| Componente | README API completa | example.vue (mín. 3 cenários) | visualProperties reflete CSS |
|---|---|---|---|
| DssTable | ✅ props/slots/events/tokens | ✅ (~21 seções) | ❌ **ausente** no defaultPreview |
| DssCarousel | ⚠️ sem seção de slots no README (API.md cobre) | ✅ (~12 seções) | ❌ **ausente** no defaultPreview |
| DssTree | ⚠️ sem seção de slots no README (API.md cobre forwarding dinâmico) | ✅ (~23 seções) | ✅ (2 props, "N/A — estrutural adaptativo") |
| DssCard | ✅ | ✅ (~85 seções) | ✅ (10 props, sources em `2-composition/_base.scss` e `3-variants/_bordered.scss`) |
| DssTimeline | ✅ | ✅ (~15 seções) | ✅ (estrutural adaptativo) |
| DssTimelineEntry | ✅ | ✅ (~12 seções) | ✅ (6 props com sources CSS) |
| DssInfiniteScroll | ✅ | ✅ (~19 seções) | ✅ (6 props com sources CSS) |
| DssVirtualScroll | ✅ | ✅ (~22 seções) | ✅ (3 props) |
| DssSkeleton | ✅ | ✅ (~21 seções) | ✅ (7 props com sources CSS) |
| DssList | ✅ | ✅ (~16 seções) | ⚠️ (2 props, source "None" — refinar) |

---

## 5. Testes (gate de build bloqueante)

Nenhum stub detectado — todos com cobertura substantiva:

| Arquivo | Linhas | Casos de teste |
|---|---|---|
| DssTable.test.js | 215 | 29 |
| DssCarousel.test.js | 184 | 21 |
| DssTree.test.js | 220 | 28 |
| DssCard.test.js | 276 | 32 |
| DssTimeline.test.js | 102 | 13 |
| DssTimelineEntry.test.js | 159 | 12 |
| DssInfiniteScroll.test.js | 369 | 41 |
| DssVirtualScroll.test.js | 377 | 36 |
| DssSkeleton.test.js | 299 | 30 |
| DssList.test.js | 218 | 22 |

---

## 6. Verificações Específicas

### 6.1 DssTable — slot de ações de linha + paginação server-side
- ✅ **Paginação server-side: SUPORTADA.** `v-model:pagination` (`DssTablePagination` com `rowsNumber`), evento `@request` (`types/table.types.ts:101-106`), método imperativo `requestServerInteraction()` exposto (`1-structure/DssTable.ts.vue:152-153`). README documenta em "Paginação server-side" (linha 113).
- ❌ **Slot de ações de linha: CONTRATO QUEBRADO — ver NC-A9-01 (§7).**

### 6.2 DssVirtualScroll / DssInfiniteScroll — prop de altura nos types
- **DssVirtualScroll:** não existe prop `height`. A altura mínima do container é resolvida **no CSS** com token: `min-height: var(--dss-min-h-lg)` (`2-composition/_base.scss:5`, comentado "necessário para cálculo dos itens virtuais"). `itemSize?: number` (opcional) está em `types/virtualscroll.types.ts:23` com JSDoc explicando height/width. **Conformidade por design alternativo** — altura via token CSS, não via prop. Aceito.
- **DssInfiniteScroll:** altura não é requisito do padrão (usa `offset?: number` + `scrollTarget` — `types/infinitescroll.types.ts:5,12`), coerente com o QInfiniteScroll. Aceito.

### 6.3 DssSkeleton — variantes
- ✅ `SkeletonType = 'rect' | 'text' | 'circle' | 'heading' | 'avatar'` em `types/skeleton.types.ts:1`. Variantes documentadas no README e API.md. Supera o mínimo solicitado (text/rect/circle).

### 6.4 DssCard — sub-componentes
- ✅ `index.js` exporta `DssCard`, `DssCardSection`, `DssCardActions` (importados de `1-structure/DssCard.ts.vue`, `DssCardSection.ts.vue`, `DssCardActions.ts.vue`).

### 6.5 DssTimeline — DssTimelineEntry exportado junto
- ✅ Exportados em conjunto no barrel central: `packages/core/components/index.js:121-122` e registrados em `packages/core/index.js:95`. DssTimelineEntry possui diretório próprio completo (componente irmão com 4 camadas, não sub-arquivo).

---

## 7. Slots — Risco de Produção

### ❌ NC-A9-01 (BLOQUEANTE) — DssTable: slots dinâmicos `body-cell-[name]` documentados mas NÃO repassados

- **Implementação** (`1-structure/DssTable.ts.vue:34-93`): o template repassa **apenas uma lista fixa** de slots nomeados (`top`, `top-left`, `top-right`, `top-row`, `top-selection`, `header`, `header-cell`, `body`, `body-row`, `body-cell`, `no-data`, `loading`, `pagination`, `bottom`, `bottom-row`). **Não há forwarding dinâmico** (`v-for sobre $slots`) para o padrão Quasar `body-cell-[name]`.
- **README** (`composed/DssTable/README.md:138`): documenta exemplo com `<template #body-cell-actions="{ row }">` — **este slot será silenciosamente ignorado em produção** (a coluna renderiza o valor padrão, sem erro).
- **API.md** documenta apenas o `body-cell` genérico (linha 69) — divergência interna entre README e API.md.
- **Impacto:** ações por linha (botões editar/excluir), o caso de uso nº 1 de tabelas corporativas, não funcionam pelo caminho documentado.
- **Correção recomendada (uma das duas):**
  1. Adotar forwarding dinâmico como o DssTree já faz (`base/DssTree/1-structure/DssTree.ts.vue:31-32`): `<template v-for="(_, name) in $slots" :key="name" #[name]="slotData"><slot :name="name" v-bind="slotData || {}" /></template>`; ou
  2. Corrigir o README para usar somente o `body-cell` genérico com `v-if="col.name === 'actions'"`.
- A opção 1 é preferível (paridade com padrão Quasar, precedente interno no DssTree).

### Demais componentes
- ✅ **DssTree:** forwarding dinâmico de todos os slots do QTree (`1-structure/DssTree.ts.vue:31`); API.md declara explicitamente. Padrão de referência.
- ⚠️ **DssCarousel:** slots documentados em types (`DssCarouselSlots`, `DssCarouselSlideSlots`) e API.md (duas tabelas de slots). **Não existe slot `thumbnail`** — thumbnails são a prop booleana `thumbnails` (API.md:24, comportamento nativo QCarousel que gera miniaturas das slides). Aceitável, mas o README não tem seção de slots (0 menções) — adicionar e declarar explicitamente "não há slot de thumbnail customizado".
- ⚠️ **DssTree/DssTimeline/DssSkeleton (READMEs):** DssTree e DssTimeline não trazem seção de slots no README (cobertos no API.md / exemplos). DssSkeleton declara explicitamente "Nenhum slot exposto" no API.md (`DSSSKELETON_API.md:80`) — conforme a regra "se não existir, declarar".
- ✅ **DssInfiniteScroll:** slots `default`, `loading`, `no-more` tipados com JSDoc (`types/infinitescroll.types.ts:28-36`).
- ✅ **DssVirtualScroll:** slots `default` (scoped com `item/index/ariaSetsize/ariaPosinset`), `prepend`, `append`, `loading`, `empty` tipados.
- ✅ **DssList:** slot default + composição via DssItem documentados.

---

## 8. META.JSON — demoSlots

- ✅ **DssCard:** `demoSlots.default` com DssCardSection + DssCardActions + 1 DssButton — pequeno, genérico, sem IDs reais. Conforme.
- ✅ **DssTable:** `demoSlots: null` — sem dados hardcoded. ⚠️ Observação: `defaultPreview` não traz `rows`/`columns` de demonstração (apenas `density/bordered/flat/separator`); o preview do sandbox pode renderizar tabela vazia. Avaliar adicionar 2-3 linhas genéricas via mecanismo data-driven.
- ✅ **DssList:** 2 DssItem genéricos ("Item 1", "Item 2"). Conforme.
- ✅ **DssTimeline:** 2 DssTimelineEntry genéricos ("Evento 1/2"). Conforme.
- ✅ **DssVirtualScroll:** `defaultPreview.props.items` com 5 itens genéricos `{id: 1..5, label: "Item N"}` — sem dados reais; levemente acima do ideal de 2-3, aceitável para demonstrar virtualização.
- ✅ Demais (`Carousel`, `Tree`, `InfiniteScroll`, `Skeleton`): `demoSlots: null` declarado, sem dados hardcoded.

---

## 9. Não-Conformidades e Recomendações

| ID | Severidade | Componente | Descrição | Ação |
|---|---|---|---|---|
| NC-A9-01 | **Bloqueante** | DssTable | README documenta `#body-cell-actions`, mas slots dinâmicos `body-cell-[name]` não são repassados ao QTable | Implementar forwarding dinâmico (padrão DssTree) ou corrigir README |
| NC-A9-02 | Média | DssTable, DssCarousel | `defaultPreview.visualProperties` ausente no dss.meta.json (Princípio #12 — espelho do CSS) | Preencher com sources CSS e rodar `npm run sync:visual-contract` |
| NC-A9-03 | Baixa | DssCarousel, DssTree, DssTimeline | README sem seção de Slots (cobertos só no API.md) | Adicionar tabela de slots ao README (piso mínimo de documentação) |
| NC-A9-04 | Baixa | DssTable, DssTree | `outline-offset: -2px` hardcoded em `_base.scss` | Tokenizar ou registrar em `gateExceptions` |
| NC-A9-05 | Baixa | DssTable, DssTree, DssCard | Barrel não exporta types (e DssCard não exporta composables) | Padronizar barrels (migrar para `index.ts` como Timeline/Scrolls) |
| NC-A9-06 | Informativa | DssTable | `defaultPreview` sem dados demo de rows/columns (preview potencialmente vazio) | Avaliar dados demo genéricos (2-3 linhas) |
| NC-A9-07 | Informativa | DssList | `visualProperties` com `source: "None"` | Referenciar arquivo CSS de origem |

---

## 10. Critério de Aceite — Conclusão

- ✅ **APROVADOS (7):** DssCard, DssTimeline, DssTimelineEntry, DssInfiniteScroll, DssVirtualScroll, DssSkeleton, DssList — gates estrutural e técnico integralmente confirmados; contratos de slots e dados consistentes entre types, implementação e documentação.
- ⚠️ **RESSALVA (2):** DssCarousel e DssTree — gates estrutural e técnico OK; pendências exclusivamente documentais (seção de slots no README; visualProperties no Carousel). Não-bloqueante.
- ❌ **REPROVADO (1):** DssTable — gates estrutural e técnico OK, porém **falha real de contrato de slot** (NC-A9-01): o caminho documentado para ações de linha (`body-cell-[name]`) não funciona. Risco direto de produção. Reauditar após correção (estimativa: 1 edição no template ou no README).

---

*Auditoria A9 — Dados e Conteúdo. Evidências coletadas por verificação em lote (estrutura, greps de gate técnico) e leitura dirigida de templates, types, READMEs e meta.json. Baseline: CLAUDE.md (Princípios 1-13) e DSS_COMPONENT_ARCHITECTURE.md.*
