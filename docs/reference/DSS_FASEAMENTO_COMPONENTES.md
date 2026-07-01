# DSS — Faseamento Oficial de Componentes Quasar

> **Status:** Ativo e Normativo
> **Última Atualização:** Maio 2026 (Atualização de status — 33 componentes selados em Fase 2)

## Princípio Fundamental

Todo componente Quasar **DEVE** ser classificado em uma fase antes de entrar no DSS. A fase determina as regras de arquitetura, governança e complexidade permitidas. Componentes marcados como **Utilitário** não geram wrapper DSS — são usados diretamente do Quasar ou via diretiva.

---

## FASE 1 — Componentes Atômicos (Wrappers DSS)

**Objetivo:** Criar o vocabulário atômico do DSS, substituir o uso direto de Quasar, garantir consistência visual, semântica e de acessibilidade.

**Regra de Ouro da Fase 1:** O componente deve ser um wrapper direto de **UM único componente Quasar**, sem composição interna relevante, sem layout complexo, com API pública curada e mínima, e sem lógica de negócio.

**Status: FASE 1 COMPLETA — 19 componentes selados.**

| Componente DSS | Quasar Base | Status |
|---|---|---|
| `DssButton` | `QBtn` | ✅ Selado |
| `DssInput` | `QInput` | ✅ Selado |
| `DssTextarea` | `QInput` (type textarea) | ✅ Selado |
| `DssSelect` | `QSelect` | ✅ Selado |
| `DssCheckbox` | `QCheckbox` | ✅ Selado |
| `DssRadio` | `QRadio` | ✅ Selado |
| `DssToggle` | `QToggle` | ✅ Selado |
| `DssSlider` | `QSlider` | ✅ Selado |
| `DssRange` | `QRange` | ✅ Selado |
| `DssFile` | `QFile` | ✅ Selado |
| `DssBadge` | `QBadge` | ✅ Selado |
| `DssChip` | `QChip` | ✅ Selado |
| `DssAvatar` | `QAvatar` | ✅ Selado |
| `DssIcon` | `QIcon` | ✅ Selado |
| `DssSpinner` | `QSpinner*` | ✅ Selado |
| `DssTooltip` | `QTooltip` | ✅ Selado |
| `DssSeparator` | `QSeparator` | ✅ Selado |
| `DssSpace` | `QSpace` | ✅ Selado |
| `DssItem` | `QItem` | ✅ Selado |

---

## FASE 2 — Componentes Compostos / Estruturais

**Objetivo:** Criar padrões reutilizáveis de UI/UX, resolver composição recorrente entre produtos, definir estruturas de layout e agrupamento.

**Regra de Ouro da Fase 2:** O componente envolve a **composição de dois ou mais componentes DSS** (ou gerencia estado complexo entre filhos), pode definir layout e estrutura, mas ainda não representa uma feature de negócio. Exige governança explícita de composição.

### Trilha de Execução (Ordem Lógica por Dependência)

A lista abaixo está ordenada para garantir que componentes base sejam criados antes dos componentes que os consomem, evitando bloqueios de arquitetura.

---

#### Nível 1 — Independentes (Base da Fase 2)

*Não possuem dependências de outros componentes da Fase 2, apenas da Fase 1. Podem ser criados em paralelo.*

| Componente DSS | Quasar Base | Depende de (Fase 1) | Status |
|---|---|---|---|
| `DssCard` | `QCard` + `QCardSection` + `QCardActions` | `DssButton`, `DssAvatar` | ✅ Selado (12 Fev 2026) |
| `DssBtnGroup` | `QBtnGroup` | `DssButton` | ✅ Selado (26 Mar 2026) |
| `DssBtnDropdown` | `QBtnDropdown` | `DssButton`, `DssIcon` | ✅ Selado (27 Mar 2026) |
| `DssBtnToggle` | `QBtnToggle` | `DssButton` | ✅ Selado (27 Mar 2026) |
| `DssOptionGroup` | `QOptionGroup` | `DssRadio`, `DssCheckbox`, `DssToggle` | ✅ Selado (27 Mar 2026) |
| `DssList` | `QList` | `DssItem`, `DssSeparator` | ✅ Selado (31 Mar 2026) |
| `DssItemSection` | `QItemSection` | `DssItem` | ✅ Selado (01 Abr 2026) |
| `DssItemLabel` | `QItemLabel` | `DssItem` | ✅ Selado (20 Abr 2026) |
| `DssTab` | `QTab` | `DssIcon`, `DssBadge` | ✅ Selado (01 Abr 2026) |
| `DssTabPanel` | `QTabPanel` | — | ✅ Selado (09 Abr 2026) |
| `DssBreadcrumbsEl` | `QBreadcrumbsEl` | `DssIcon` | ✅ Selado (10 Abr 2026) |
| `DssStep` | `QStep` | `DssIcon`, `DssButton` | ✅ Selado (20 Abr 2026) |
| `DssToolbar` | `QToolbar` | `DssButton`, `DssIcon` | ✅ Selado (16 Abr 2026) |
| `DssExpansionItem` | `QExpansionItem` | `DssItem`, `DssIcon` | ✅ Selado (05 Mai 2026) |
| `DssLinearProgress` | `QLinearProgress` | — | ✅ Selado (06 Mai 2026) |
| `DssPagination` | `QPagination` | `DssButton`, `DssIcon` | ✅ Selado (08 Mai 2026) |
| `DssDialog` | `QDialog` | `DssButton`, `DssCard` | ✅ Selado (11 Mai 2026) |
| `DssVirtualScroll` | `QVirtualScroll` | — | ✅ Selado (12 Mai 2026) |
| `DssInfiniteScroll` | `QInfiniteScroll` | `DssSpinner` | ✅ Selado (13 Mai 2026) |
| `DssImg` | `QImg` | `DssSpinner` | ✅ Selado (13 Mai 2026) |
| `DssCircularProgress` | `QCircularProgress` | — | ✅ Selado (18 Mai 2026) |
| `DssInnerLoading` | `QInnerLoading` | `DssSpinner` | ✅ Selado (18 Mai 2026) |
| `DssKnob` | `QKnob` | — | ✅ Selado (18 Mai 2026) |
| `DssRating` | `QRating` | `DssIcon` | ✅ Selado v2.2 — 2026-05-18 |
| `DssSkeleton` | `QSkeleton` | — | ✅ Selado (18 Mai 2026) |
| `DssScrollArea` | `QScrollArea` | — | ✅ Selado (19 Mai 2026) |
| `DssSplitter` | `QSplitter` | — | ✅ Selado (19 Mai 2026) |
| `DssMarkupTable` | `QMarkupTable` | DssBadge | ✅ Selado (19 Mai 2026) |
| `DssVideo` | `QVideo` | — | ✅ Selado (13 Mai 2026) |
| `DssResponsive` | `$q.screen` (Screen Plugin) | — | ✅ Selado (19 Mai 2026) |
| `DssParallax` | `QParallax` | — | ✅ Selado (18 Mai 2026) |
| `DssAjaxBar` | `QAjaxBar` | — | ✅ Selado (18 Mai 2026) |
| `DssBanner` | `QBanner` | `DssButton`, `DssIcon` | ✅ Selado (20 Mai 2026) |
| `DssBar` | `QBar` | `DssButton`, `DssIcon` | ✅ Selado (20 Mai 2026) |
| `DssPopupEdit` | `QPopupEdit` | `DssInput`, `DssButton` | ✅ Selado (11 Mai 2026) |
| `DssPullToRefresh` | `QPullToRefresh` | `DssIcon` | ✅ Selado (20 Mai 2026) |
| `DssSlideItem` | `QSlideItem` | `DssIcon` | ✅ Selado (20 Mai 2026) |

---

#### Nível 2 — Composição de Primeiro Grau

*Dependem de componentes do Nível 1 desta fase.*

| Componente DSS | Quasar Base | Depende de (Fase 2 N1) | Status |
|---|---|---|---|
| `DssTabs` | `QTabs` | `DssTab` | ✅ Selado (02 Abr 2026) |
| `DssTabPanels` | `QTabPanels` | `DssTabPanel` | ✅ Selado (09 Abr 2026) |
| `DssRouteTab` | `QRouteTab` | `DssTab` | ✅ Selado (10 Abr 2026) |
| `DssBreadcrumbs` | `QBreadcrumbs` | `DssBreadcrumbsEl` | ✅ Selado (11 Abr 2026) |
| `DssStepper` | `QStepper` + `QStepperNavigation` | `DssStep`, `DssButton` | ✅ Selado (20 Abr 2026) |
| `DssMenu` | `QMenu` | `DssList`, `DssItem` | ✅ Selado (18 Abr 2026) |
| `DssFab` | `QFab` | `DssButton`, `DssIcon` | ✅ Selado (04 Mai 2026) |
| `DssToolbarTitle` | `QToolbarTitle` | `DssToolbar` | ✅ Selado (21 Abr 2026) |
| `DssUploader` | `QUploader` + `QUploaderAddTrigger` | `DssButton`, `DssIcon`, `DssLinearProgress` | ✅ Selado (07 Mai 2026) |
| `DssBottomSheet` | `QBottomSheet` (plugin) | `DssList`, `DssItem` | ✅ Selado v2.2 |
| `DssTimeline` + `DssTimelineEntry` | `QTimeline` + `QTimelineEntry` | `DssIcon`, `DssAvatar` | ✅ Selado (21 Mai 2026) |
| `DssCarousel` | `QCarousel` + `QCarouselSlide` + `QCarouselControl` | `DssButton`, `DssIcon` | ✅ Selado v2.2 — 2026-05-21 |
| `DssPopupProxy` | `QPopupProxy` | `DssMenu` ou `DssDialog` | ✅ Selado v2.2 — 2026-05-21 |
| `DssField` | `QField` | `DssInput` (padrão visual) | ✅ Selado v2.2 — 2026-05-19 |
| `DssForm` | `QForm` | `DssButton` (submit/reset) | ✅ Selado v2.2 — 2026-05-22 |
| `DssChatMessage` | `QChatMessage` | `DssAvatar` | ✅ Selado v2.2 — 2026-05-21 |

---

#### Nível 3 — Composição de Segundo Grau e Estrutura

*Dependem de componentes do Nível 2.*

| Componente DSS | Quasar Base | Depende de (Fase 2 N2) | Status |
|---|---|---|---|
| `DssFabAction` | `QFabAction` | `DssFab` | ✅ Selado (04 Mai 2026) |
| `DssHeader` | `QHeader` | `DssToolbar` | ✅ Selado (17 Abr 2026) |
| `DssFooter` | `QFooter` | `DssToolbar` | ✅ Selado (18 Abr 2026) |
| `DssDrawer` | `QDrawer` | `DssList`, `DssMenu` | ✅ Selado (19 Abr 2026) |
| `DssTimePicker` | `QTime` | `DssIcon`, `DssButton` | ✅ Selado v2.2 — 2026-05-22 |
| `DssDatePicker` | `QDate` | `DssIcon`, `DssButton`, `DssBtnGroup` | ✅ Selado v2.2 — 2026-05-22 |
| `DssColorPicker` | `QColor` | `DssInput`, `DssSlider` | ✅ Selado v2.2 — 2026-05-22 |

---

#### Nível 4 — Layouts e Alta Complexidade

*O topo da cadeia de dependências.*

| Componente DSS | Quasar Base | Depende de (Fase 2 N3) | Status |
|---|---|---|---|
| `DssLayout` | `QLayout` | `DssHeader`, `DssFooter`, `DssDrawer` | ✅ Selado (20 Abr 2026) |
| `DssPage` | `QPage` | `DssLayout` | ✅ Selado (22 Abr 2026) |
| `DssPageContainer` | `QPageContainer` | `DssLayout` | ✅ Selado (22 Abr 2026) |
| `DssPageSticky` | `QPageSticky` | `DssLayout` | ✅ Selado (23 Abr 2026) |
| `DssPageScroller` | `QPageScroller` | `DssLayout` | ✅ Selado (26 Abr 2026) |
| `DssTable` | `QTable` + `QTh` + `QTr` + `QTd` | `DssPagination`, `DssCheckbox`, `DssSpinner` | ✅ Selado v2.2 — 2026-05-22 |
| `DssTree` | `QTree` | `DssIcon`, `DssCheckbox` | ✅ Selado v2.2 — 2026-05-22 |

---

## FASE 3 — Componentes Compostos Complexos

**Objetivo:** Criar interfaces completas e reutilizáveis que orquestram múltiplos componentes DSS (Fases 1 e 2) internamente, gerenciam estado compartilhado entre filhos e implementam padrões de composição de alto nível para cenários de produto real.

**Regra de Ouro da Fase 3:** O componente orquestra **três ou mais componentes DSS** de Fase 1/2, gerencia estado global interno (disabled, loading, brand) via `provide/inject`, e resolve ao menos um dos riscos clássicos de composição profunda (prop drilling, inheritAttrs, :deep(), teleport de overlays).

> **Fonte normativa:** `DSS_GUIA_COMPOSICAO_FASE3.md` · `DSS_ESTRATEGIA_FASE3_COMPLEXIDADE_IA.md` · `TEMPLATE_FASE3.md`

---

### Diferencial arquitetural da Fase 3

Componentes da Fase 3 **obrigatoriamente** implementam os 5 padrões do Guia de Composição:

| # | Padrão | Regra |
|---|---|---|
| 1 | `inheritAttrs: false` | Repasse explícito de `$attrs` para o nó raiz correto via `v-bind="$attrs"` |
| 2 | `provide/inject` tipado | Estado global (disabled, loading) propagado via composable com `InjectionKey` |
| 3 | CSS Variables como canal visual | Prop `brand` propagada via `data-brand` no elemento raiz — sem prop drilling |
| 4 | Proibição de `:deep()` para layout | Layout controlado por classes do componente pai, nunca injetando CSS nos filhos |
| 5 | Slots dinâmicos e tipados | Conteúdo de subáreas exposto via `slot :name="..."` para composição transparente |

---

### Golden References da Fase 3

| Papel | Componente | Quando usar |
|---|---|---|
| **Golden Reference** (interativo) | `DssChip` | Componentes com interação, hover, focus, active |
| **Golden Reference** (não-interativo) | `DssBadge` | Componentes puramente de display |
| **Golden Context** | `DssDataCard` | Baseline de auditoria para composição profunda |

---

### Candidatos Fase 3

*Baseados nos stress-tests realizados em Abril/Maio 2026. A Fase 3 não é guiada por cobertura de API Quasar, mas por necessidades de produto. Novos componentes são adicionados conforme padrões recorrentes emergem.*

| Componente DSS | Compõe | Padrão principal | Status |
|---|---|---|---|
| `DssDataCard` | `DssCard` + `DssTabs` + `DssToolbar` + `DssPagination` | provide/inject · slots dinâmicos | ✅ Selado (2026-05-23) — Golden Context da Fase 3 |
| `DssCadrisCard` | `DssCard` + `DssInput` + `DssSelect` + `DssButton` + `DssIcon` | provide/inject · inheritAttrs · todos os 5 padrões | 🔄 Aguarda auditoria formal (selado informalmente em Abr 2026) |
| `DssTestPageComplexity` | `DssLayout` + `DssCard` + `DssTable` + filtros + KPIs | Composição full-page · Grid Inspector | 🔒 5 NCs bloqueantes pendentes |

> **Sobre os stress-tests:** estes componentes existem em `components/stress-test/` e foram criados para validar os padrões da Fase 3 antes da sua formalização. Devem ser promovidos para `components/composed/` após correção das NCs e emissão de selo v2.2 seguindo `TEMPLATE_FASE3.md`.

---

### O que NÃO é Fase 3

Componentes Quasar sem representação visual própria, utilitários comportamentais e recipes de configuração **não são Fase 3**. Veja a seção "Utilitários Quasar" abaixo.

---

## Utilitários Quasar (sem wrapper DSS)

*Estes elementos não geram wrapper DSS e não pertencem a nenhuma fase formal. São usados diretamente do Quasar ou documentados como recipes de configuração.*

| Elemento | Quasar Base | Natureza | Entregável |
|---|---|---|---|
| Recipe: Editor Rich Text | `QEditor` | Altíssima complexidade WYSIWYG — requer biblioteca de rich text | Guia de configuração com tokens DSS |
| Utilitário: Scroll Observer | `QScrollObserver` | Comportamental puro — sem representação visual | Usar diretamente do Quasar |
| Utilitário: Resize Observer | `QResizeObserver` | Comportamental puro — sem representação visual | Usar diretamente do Quasar |
| Utilitário: Intersection | `QIntersection` | Diretiva/comportamento — sem representação visual | Usar diretamente do Quasar |
| Utilitário: No SSR | `QNoSsr` | Renderização condicional — sem representação visual | Usar diretamente do Quasar |
| Utilitário: Slide Transition | `QSlideTransition` | Transição CSS — sem representação visual própria | Usar diretamente do Quasar |

---

## Resumo de Cobertura

| Fase | Total | Selados | Pendentes |
|---|---|---|---|
| Fase 1 — Atômicos | 19 | 19 | 0 ✅ |
| Fase 2 — Nível 1 (Independentes) | 38 | 38 | 0 ✅ |
| Fase 2 — Nível 2 (1º Grau) | 16 | 16 | 0 ✅ |
| Fase 2 — Nível 3 (2º Grau) | 7 | 7 | 0 ✅ |
| Fase 2 — Nível 4 (Layouts) | 7 | 7 | 0 ✅ |
| **Fase 2 Total** | **68** | **68** | **0 🎉** |
| Fase 3 — Compostos Complexos | 3 | 1 | 33% (DssDataCard ✅ selado; DssCadrisCard aguarda auditoria; DssTestPageComplexity com 5 NCs) |
| Utilitários (sem wrapper) | 6 | N/A | N/A |

---

## Histórico de Revisões

| Data | Revisão |
|---|---|
| Março 2026 | **Cobertura total**: Todos os 92 componentes/patterns Quasar classificados. Adicionados 34 componentes ausentes na versão anterior. Fase 3 expandida com utilitários comportamentais. |
| Março 2026 | Reordenação da Fase 2 em "Trilha de Execução" baseada em interdependência, garantindo que componentes consumidos sejam criados antes dos consumidores. |
| Março 2026 | Reclassificação de `QOptionGroup`, `QBtnGroup`, `QFab` e `QFabAction` da Fase 1 para a Fase 2. Justificativa: A regra de ouro da Fase 1 exige que o componente seja um wrapper de um único componente, sem composição interna. Estes componentes gerenciam estado entre múltiplos filhos ou compõem outros componentes internamente, caracterizando comportamento de Fase 2. |
| Maio 2026 | **Depara completo**: 33 selos verificados contra diretórios de seal. Status atualizado: N1 (15/37), N2 (9/16), N3 (4/7), N4 (5/7). Tabela de cobertura corrigida de 20→52 selados. |
| 11 Mai 2026 | Selos emitidos: `DssDialog` e `DssPopupEdit` (Nível 1). N1 atualizado: 18/37. Total: 55 selados. |
| 12 Mai 2026 | Selo emitido: `DssVirtualScroll` (Nível 1). N1 atualizado: 19/37. Total: 56 selados. |
| 13 Mai 2026 | Selo emitido: `DssInfiniteScroll` (Nível 1). N1 atualizado: 20/37. Total: 57 selados. |
| 13 Mai 2026 | Selos emitidos: `DssImg` e `DssVideo` (Nível 1 — Família Mídia e Visualização). DssImg: 0 NCs, 4 GAPs pré-prompt. DssVideo: 2 NCs (forced-color-adjust + ratio string), 4 GAPs pré-prompt (API QVideo com props inexistentes). N1 atualizado: 22/38. Total: 59 selados. |
| 22 Mai 2026 | **🎉 FASE 2 COMPLETA**: `DssTable` e `DssTree` selados (Nível 4). `DssForm` corrigido (já selado, não contabilizado). Total: 68/68 = 100%. Próximo: Fase 3 — Recipes e Guias. |
| Fevereiro 2026 | Documento original criado em formato PDF. |
