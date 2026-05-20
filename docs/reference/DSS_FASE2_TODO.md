# DSS — To Do List: Fase 2

> **Status:** Ativo
> **Última Atualização:** 20 de Maio de 2026 — DssBar SELADO (53/68 = 78%)
> **Legenda:** ✅ Selado · 🔄 Aguardando auditoria · ⬜ Pendente · 🔒 Bloqueado (aguarda dependência)

---

## Nível 1 — Independentes (Base da Fase 2)

*Estes componentes dependem apenas de componentes da Fase 1 (já selados). Podem ser iniciados imediatamente.*

### Família: Botões e Controles de Grupo

- [x] ~~`DssBtnGroup`~~ ✅ **SELADO**
- [x] ~~`DssBtnDropdown`~~ ✅ **SELADO**
- [x] ~~`DssBtnToggle`~~ ✅ **SELADO**
- [x] ~~`DssOptionGroup`~~ ✅ **SELADO**

### Família: Lista e Itens

- [x] ~~`DssItem`~~ ✅ **SELADO** *(Fase 1 — retroativo)*
- [x] ~~`DssList`~~ ✅ **SELADO**
- [x] ~~`DssItemSection`~~ ✅ **SELADO**
- [x] ~~`DssItemLabel`~~ ✅ **SELADO** *(20 Abr 2026)*

### Família: Tabs

- [x] ~~`DssTab`~~ ✅ **SELADO**
- [x] ~~`DssTabPanel`~~ ✅ **SELADO**

### Família: Navegação Estrutural

- [x] ~~`DssBreadcrumbsEl`~~ ✅ **SELADO**
- [x] ~~`DssStep`~~ ✅ **SELADO** *(20 Abr 2026)*
- [x] ~~`DssPagination`~~ ✅ **SELADO** *(08 Mai 2026)*

### Família: Overlays e Dialogs

- [x] ~~`DssDialog`~~ ✅ **SELADO** *(11 Mai 2026)*
- [x] ~~`DssPopupEdit`~~ ✅ **SELADO** *(11 Mai 2026)*

### Família: Scroll e Virtualização

- [x] ~~`DssVirtualScroll`~~ ✅ **SELADO** *(12 Mai 2026)*
- [x] ~~`DssInfiniteScroll`~~ ✅ **SELADO** *(13 Mai 2026)*

### Família: Expansão e Colapso

- [x] ~~`DssExpansionItem`~~ ✅ **SELADO** *(05 Mai 2026)*

### Família: Estrutura de Página (Base)

- [x] ~~`DssToolbar`~~ ✅ **SELADO** *(16 Abr 2026)*

### Família: Superfícies e Layout

- [x] ~~`DssCard`~~ ✅ **SELADO**

### Família: Mídia e Visualização

- [x] ~~`DssImg`~~ ✅ **SELADO** *(13 Mai 2026)*
- [x] ~~`DssVideo`~~ ✅ **SELADO** *(13 Mai 2026)*
- [x] ~~`DssParallax`~~ ✅ **SELADO** *(18 Mai 2026)*

### Família: Progresso e Feedback

- [x] ~~`DssLinearProgress`~~ ✅ **SELADO** *(06 Mai 2026)*
- [x] ~~`DssCircularProgress`~~ ✅ **SELADO** *(18 Mai 2026)*
- [x] ~~`DssInnerLoading`~~ ✅ **SELADO** *(18 Mai 2026)*
- [x] ~~`DssSkeleton`~~ ✅ **SELADO** *(18 Mai 2026)*
- [x] ~~`DssAjaxBar`~~ ✅ **SELADO** *(18 Mai 2026)*

### Família: Inputs Especializados

- [x] ~~`DssKnob`~~ ✅ **SELADO (18 Mai 2026)**
- [x] ~~`DssRating`~~ ✅ **SELADO** *(18 Mai 2026)*

### Família: Layout Auxiliar

- [x] ~~`DssScrollArea`~~ ✅ **SELADO** *(19 Mai 2026)*
- [x] ~~`DssSplitter`~~ ✅ **SELADO** *(19 Mai 2026)*
- [x] ~~`DssResponsive`~~ ✅ **SELADO** *(19 Mai 2026)*

### Família: Tabela Simples

- [x] ~~`DssMarkupTable`~~ ✅ **SELADO** *(19 Mai 2026)*

### Família: Notificações e Alertas

- [x] ~~`DssBanner`~~ ✅ **SELADO** *(20 Mai 2026)*
- [x] ~~`DssBar`~~ ✅ **SELADO** *(20 Mai 2026)*

### Família: Interação Gestual

- [x] `DssPullToRefresh` — Gesto de arrastar para atualizar (mobile) ✅ Selado (20 Mai 2026)
- [ ] `DssSlideItem` — Item de lista com ações deslizáveis (swipe) ⬜

---

## Nível 2 — Composição de Primeiro Grau

*Só podem ser iniciados após os componentes do Nível 1 que os bloqueiam estarem selados.*

### Família: Tabs (completa)

- [x] ~~`DssTabs`~~ ✅ **SELADO**
- [x] ~~`DssTabPanels`~~ ✅ **SELADO**
- [x] ~~`DssRouteTab`~~ ✅ **SELADO**

### Família: Navegação

- [x] ~~`DssBreadcrumbs`~~ ✅ **SELADO**
- [x] ~~`DssStepper`~~ ✅ **SELADO** *(20 Abr 2026)*
- [x] ~~`DssMenu`~~ ✅ **SELADO** *(18 Abr 2026)*
- [ ] `DssBottomSheet` 🔒 *(aguarda DssList, DssItem)*

### Família: FAB

- [x] ~~`DssFab`~~ ✅ **SELADO** *(04 Mai 2026)*

### Família: Estrutura de Página

- [x] ~~`DssToolbarTitle`~~ ✅ **SELADO** *(21 Abr 2026)*

### Família: Conteúdo Rico

- [ ] `DssTimeline` 🔒 *(aguarda DssIcon, DssAvatar)*
- [ ] `DssCarousel` 🔒 *(aguarda DssButton, DssIcon)*
- [ ] `DssChatMessage` 🔒 *(aguarda DssAvatar)*

### Família: Upload

- [x] ~~`DssUploader`~~ ✅ **SELADO** *(07 Mai 2026)*

### Família: Overlays Compostos

- [ ] `DssPopupProxy` 🔒 *(aguarda DssMenu ou DssDialog)*

### Família: Formulários

- [x] ~~`DssField`~~ ✅ **SELADO** *(19 Mai 2026 — 1 ciclo, 3 NCs corrigidas, 6 GAPs resolvidos)*
- [ ] `DssForm` 🔒 *(aguarda DssButton)*

---

## Nível 3 — Composição de Segundo Grau e Estrutura

*Dependem de componentes do Nível 2.*

### Família: FAB

- [x] ~~`DssFabAction`~~ ✅ **SELADO** *(04 Mai 2026)*

### Família: Layout (Estrutura de Página)

- [x] ~~`DssHeader`~~ ✅ **SELADO** *(17 Abr 2026)*
- [x] ~~`DssFooter`~~ ✅ **SELADO** *(18 Abr 2026)*
- [x] ~~`DssDrawer`~~ ✅ **SELADO** *(20 Abr 2026)*

### Família: Inputs de Data/Hora

- [ ] `DssTimePicker` 🔒 *(aguarda DssIcon, DssButton)*
- [ ] `DssDatePicker` 🔒 *(aguarda DssIcon, DssButton, DssBtnGroup)*
- [ ] `DssColorPicker` 🔒 *(aguarda DssInput, DssSlider)*

---

## Nível 4 — Layouts e Alta Complexidade

*O topo da cadeia de dependências.*

### Família: Layout Global

- [x] ~~`DssLayout`~~ ✅ **SELADO** *(20 Abr 2026)*
- [x] ~~`DssPage`~~ ✅ **SELADO** *(22 Abr 2026)*
- [x] ~~`DssPageContainer`~~ ✅ **SELADO** *(22 Abr 2026)*
- [x] ~~`DssPageSticky`~~ ✅ **SELADO** *(23 Abr 2026)*
- [x] ~~`DssPageScroller`~~ ✅ **SELADO** *(26 Abr 2026)*

### Família: Dados Complexos

- [ ] `DssTable` 🔒 *(aguarda DssPagination, DssCheckbox, DssSpinner)*
- [ ] `DssTree` 🔒 *(aguarda DssIcon, DssCheckbox)*

---

## Fase 3 — Patterns / Utilitários (sem wrapper DSS)

*Documentação, recipes e guias de uso. Não geram componentes no pacote npm.*

- [ ] `DssEditor` — Recipe: configuração do QEditor com DSS tokens
- [ ] Guia: Uso do `QScrollObserver` em contexto DSS
- [ ] Guia: Uso do `QResizeObserver` em contexto DSS
- [ ] Guia: Uso do `QIntersection` em contexto DSS
- [ ] Guia: Uso do `QNoSsr` em contexto DSS
- [ ] Guia: Uso do `QSlideTransition` em contexto DSS

---

## Progresso Geral

| Nível | Total | Selados | % Concluído |
|---|---|---|---|
| Fase 1 | 19 | 19 | 100% |
| Fase 2 — Nível 1 | 38 | 26 | 68% |
| Fase 2 — Nível 2 | 16 | 10 | 63% |
| Fase 2 — Nível 3 | 7 | 4 | 57% |
| Fase 2 — Nível 4 | 7 | 5 | 71% |
| **Fase 2 Total** | **68** | **45** | **66%** |
| Fase 3 | 6 | N/A | — |
