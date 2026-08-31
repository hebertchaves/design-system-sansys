# Componentes Certificados DSS

Índice oficial de componentes com Selo de Conformidade DSS.

> Este arquivo é mantido pelo Agente de Governança DSS. Cada entrada corresponde a um componente que passou pela auditoria final completa e recebeu selo aprovado. Última atualização: **02 de Junho de 2026**.

---

## Fase 1 — Componentes Atômicos (20/20 — 100%)

| Componente | Categoria | Data do Selo | Golden Reference | Golden Context | Observação |
|---|---|---|---|---|---|
| `DssChip` | Compact Control interativo | 27/01/2026 | **Sim** (interativo) | DssChip (auto) | Golden Reference oficial |
| `DssBadge` | Compact Control não-interativo | 27/01/2026 | **Sim** (não-interativo) | DssChip | Golden Reference oficial |
| `DssButton` | Ação primária interativa | 20/01/2026 | — | DssChip | Golden Sample de documentação |
| `DssToggle` | Controle de estado binário | 05/02/2026 | — | DssChip | — |
| `DssCheckbox` | Compact Control interativo | 01/02/2026 | — | DssChip | 3 ressalvas não-bloqueantes |
| `DssRadio` | Compact Control interativo | 05/02/2026 | — | DssChip | — |
| `DssAvatar` | Visual/Identity | 02/02/2026 | — | DssChip | 2 ressalvas; 6 exceções documentadas |
| `DssIcon` | Ícone decorativo/semântico | 13/02/2026 | — | DssChip | — |
| `DssInput` | Campo de entrada de texto | 04/02/2026 | — | DssChip | — |
| `DssTextarea` | Campo de texto multilinha | 19/03/2026 | — | DssInput | — |
| `DssSelect` | Seleção por dropdown | 20/03/2026 | — | DssInput | — |
| `DssSlider` | Controle deslizante | 20/03/2026 | — | DssChip | — |
| `DssRange` | Controle de intervalo | 23/03/2026 | — | DssSlider | — |
| `DssSeparator` | Divisor visual | 17/03/2026 | — | DssChip | — |
| `DssSpace` | Espaçador flexível | 18/03/2026 | — | DssChip | — |
| `DssSpinner` | Indicador de carregamento | 24/03/2026 | — | DssChip | — |
| `DssTooltip` | Dica contextual | 06/02/2026 | — | DssChip | — |
| `DssItem` | Item de lista | — | — | DssChip | Retroativo — Fase 1 |
| `DssFile` | Upload de arquivo | 24/03/2026 | — | DssInput | — |
| `DssEmptyState` | Estado de dado não interativo | 28/08/2026 | — | DssBanner | 3 ressalvas não-bloqueantes; 4 passagens de auditoria (3 independentes); sem motor Quasar |

---

## Fase 2 — Componentes Compostos (68/68 — 100%) ✅

| Componente | Nível | Categoria | Data do Selo | Golden Reference | Golden Context | Observação |
|---|---|---|---|---|---|---|
| `DssCard` | 1 | Superfície e Layout | 12/02/2026 | — | DssChip | — |
| `DssBtnGroup` | 1 | Botões e Controles de Grupo | 26/03/2026 | — | DssButton | — |
| `DssBtnDropdown` | 1 | Botões e Controles de Grupo | 27/03/2026 | — | DssButton | — |
| `DssBtnToggle` | 1 | Botões e Controles de Grupo | 27/03/2026 | — | DssButton | — |
| `DssOptionGroup` | 1 | Botões e Controles de Grupo | 27/03/2026 | — | DssCheckbox | — |
| `DssItemSection` | 1 | Lista e Itens | 01/04/2026 | — | DssItem | — |
| `DssItemLabel` | 1 | Lista e Itens | 20/04/2026 | — | DssItem | — |
| `DssList` | 1 | Lista e Itens | 31/03/2026 | — | DssItem | — |
| `DssTab` | 1 | Tabs | 01/04/2026 | — | DssChip | — |
| `DssTabPanel` | 1 | Tabs | 09/04/2026 | — | DssTab | — |
| `DssBreadcrumbsEl` | 1 | Navegação Estrutural | 10/04/2026 | — | DssChip | — |
| `DssStep` | 1 | Navegação Estrutural | 20/04/2026 | — | DssTabs | — |
| `DssToolbar` | 1 | Estrutura de Página | 16/04/2026 | DssCard | DssTabs | 4 gaps de pré-prompt corrigidos |
| `DssTabs` | 2 | Tabs | 02/04/2026 | — | DssTab | — |
| `DssTabPanels` | 2 | Tabs | 09/04/2026 | — | DssTabPanel | — |
| `DssRouteTab` | 2 | Tabs | 10/04/2026 | — | DssTab | — |
| `DssBreadcrumbs` | 2 | Navegação | 11/04/2026 | — | DssBreadcrumbsEl | — |
| `DssMenu` | 2 | Navegação / Overlays | 18/04/2026 | DssTooltip | DssList | CSS global por teleport QMenu |
| `DssHeader` | 3 | Estrutura de Página | 17/04/2026 | DssCard | DssToolbar | 2 NCs resolvidas; GAP-03 resolvido na Onda P0/T1 (carga única global de CSS) |
| `DssFooter` | 3 | Estrutura de Página | 18/04/2026 | DssCard | DssHeader | EXC-05: sombra upward pendente token |
| `DssDrawer` | 3 | Estrutura de Página | 20/04/2026 | — | DssList | — |
| `DssLayout` | 4 | Layout Global | 20/04/2026 | — | DssHeader + DssFooter | Selado — desbloqueia DssPage |
| `DssPageScroller` | 4 | Layout Global | 26/04/2026 | DssBadge | DssPageSticky | 3 NCs resolvidas |
| `DssFab` | 2 | Action Group Composto — FAB interativo | 04/05/2026 | DssChip | DssButton | EXC: .q-fab__actions para direção; extension hooks sem CSS |
| `DssFabAction` | 3 | Action — FAB secundário | 04/05/2026 | DssChip | DssFab | Opção B touch target; gate-exc .q-fab__action |
| `DssExpansionItem` | 1 | Expansão e Colapso — Item expansível | 05/05/2026 | DssChip | DssItem | WRAP QExpansionItem; brand no expanded; gate-exc .q-item/.q-expansion-item--expanded |
| `DssStepper` | 2 | Navegação por etapas | 20/04/2026 | DssTabs | DssStep | _brands.scss all-commented = INTENCIONAL (brand via filhos) |
| `DssToolbarTitle` | 2 | Tipografia de barra de ferramentas | 21/04/2026 | DssBadge | DssItemLabel | Golden Ref DssBadge (NOT DssItemLabel) |
| `DssPage` | 4 | Layout Global — conteúdo principal | 22/04/2026 | DssBadge | DssLayout | withDefaults só non-trivial; role="main" |
| `DssPageContainer` | 4 | Layout Global — container com offset | 22/04/2026 | DssBadge | DssLayout | Record<string,never> para no-props |
| `DssPageSticky` | 4 | Layout Global — posicionamento fixo | 23/04/2026 | DssBadge | DssLayout | defineEmits anti-padrão para containers |
| `DssLinearProgress` | 1 | Indicador de Progresso não interativo | 06/05/2026 | DssBadge | DssSpinner | withDefaults só non-trivials; EXC-Gate-01 seletores Quasar; EX-Code-01 animation-speed |
| `DssUploader` | 2 | Upload / File Management | 07/05/2026 | DssBadge | DssCard | EXC-01 slots obrigatórios; EXC-Gate-02 :has(); 6 NCs resolvidas |
| `DssPagination` | 1 | Navegação Estrutural | 08/05/2026 | DssChip | DssBtnGroup | EXC-01 motor QPagination sem slot API; EXC-Gate-01 --q-color-primary + seletores internos; 3 NCs resolvidas |
| `DssDialog` | 1 | Overlays e Dialogs | 11/05/2026 | DssChip | DssCard | EXC-Gate-01 QDialog motor; CSS global (não scoped); slots condicionais via useSlots() |
| `DssPopupEdit` | 1 | Overlays e Dialogs | 11/05/2026 | DssChip | DssDialog | EXC-Gate-02 ÚNICO: `.q-popup-edit` CSS global sem popup-content-class; v-model = valor editado (não visibilidade) |
| `DssVirtualScroll` | 2 | Scroll e Virtualização | 12/05/2026 | DssBadge | DssInfiniteScroll | QVirtualScroll wrapper; ARIA via slot scope; spinner CSS currentColor |
| `DssInfiniteScroll` | 1 | Scroll e Virtualização | 13/05/2026 | DssChip | DssVirtualScroll | QInfiniteScroll root; EXC-Expose-01; done() wrapping; slot no-more dentro do slot default |
| `DssImg` | 1 | Mídia e Visualização | 13/05/2026 | DssBadge | DssCard | QImg root; alt+decorative WCAG 1.1.1; DssSpinner/DssIcon nos slots #loading/#error |
| `DssVideo` | 1 | Mídia e Visualização | 13/05/2026 | DssBadge | DssImg | QVideo root; title+decorative WCAG 4.1.2; NC-02 ratio string→número |
| `DssParallax` | 1 | Mídia e Visualização | 18/05/2026 | DssBadge | DssImg | QParallax root; EXC-States-01 prefers-reduced-motion via v-if/v-else; alt sr-only span |
| `DssCircularProgress` | 1 | Progresso e Feedback | 18/05/2026 | DssBadge | DssLinearProgress | div wrapper; EXC-Gate-01 SVG stroke via `.q-circular-progress__circle`; prop color bloqueada |
| `DssInnerLoading` | 1 | Progresso e Feedback | 18/05/2026 | DssBadge | DssSpinner | QInnerLoading root; color CSS cascade (currentColor); overlay sólido surface-default; border-radius:inherit |
| `DssSkeleton` | 1 | Progresso e Feedback | 18/05/2026 | DssBadge | DssInnerLoading | div wrapper (prop lines requer múltiplos QSkeleton); EXC-Gate-01/02/03 descendant selectors |
| `DssAjaxBar` | 1 | Progresso e Feedback | 18/05/2026 | DssBadge | DssLinearProgress | QAjaxBar root; --q-color-primary override; EXC-Expose-01 4 métodos; defineEmits start/stop |
| `DssKnob` | 1 | Inputs Especializados | 18/05/2026 | DssChip | DssRating | QKnob root; props color/track-color/center-color fixas; EXC-Focus-01 ::before neutralizado |
| `DssRating` | 1 | Inputs Especializados | 18/05/2026 | DssChip | DssKnob | QRating root; props color bloqueadas — CSS cascade puro sem EXC-Gate-02 |
| `DssField` | 2 | Inputs Compostos | 19/05/2026 | DssChip | DssInput | Custom sem QField; EX-Focus-01 focusin/focusout; EX-Label-01 hasValue prop; slot scope expandido |
| `DssScrollArea` | 1 | Layout Auxiliar | 19/05/2026 | DssBadge | DssSplitter | QScrollArea root; EXC-Gate-02 opacity:1 !important; EXC-Expose-01 5 métodos |
| `DssSplitter` | 1 | Layout Auxiliar | 19/05/2026 | DssChip | DssScrollArea | QSplitter root; Touch Target Opção B ::before; -webkit-tap-highlight-color transparent |
| `DssResponsive` | 1 | Layout Auxiliar | 19/05/2026 | DssBadge | DssScrollArea | Wrapper utilitário de visibilidade por breakpoint |
| `DssMarkupTable` | 1 | Tabela Simples | 19/05/2026 | DssBadge | DssList | QMarkupTable motor; EXC-Gate-01 descendant selectors th/td/tr; prefers-contrast:more |
| `DssBanner` | 1 | Notificações e Alertas | 20/05/2026 | DssBadge | DssCard | 2 NCs: border-width token + vi import; NC-01 @media print token |
| `DssBar` | 1 | Notificações e Alertas | 20/05/2026 | DssBadge | DssBanner | Barra de sistema (Electron/mobile) |
| `DssPullToRefresh` | 1 | Interação Gestual | 20/05/2026 | DssChip | DssScrollArea | QPullToRefresh root; EXC-Gate-02a --q-color-primary; WARN-A11Y-01 gesto não acessível via teclado |
| `DssSlideItem` | 1 | Interação Gestual | 20/05/2026 | DssBadge | DssList | Item de lista com ações deslizáveis (swipe) |
| `DssTimeline` | 2 | Visualização de Dados | 21/05/2026 | DssBadge | DssList | Container de linha do tempo cronológica |
| `DssBottomSheet` | 2 | Overlays e Dialogs | 21/05/2026 | DssChip | DssDialog | Selo físico em docs/Compliance/seals/ — entrada reconciliada na Onda P1 (estava fora do índice, gerando o falso 67/68) |
| `DssTimelineEntry` | 2 | Visualização de Dados | 21/05/2026 | DssBadge | DssTimeline | Subcomponente entrada da DssTimeline (evento individual) |
| `DssChatMessage` | 2 | Visualização de Dados | 21/05/2026 | DssBadge | DssCard | Widget de mensagem de chat |
| `DssCarousel` | 2 | Mídia e Visualização | 21/05/2026 | DssChip | DssTabs | Container de slides com navegação interativa |
| `DssPopupProxy` | 2 | Overlays e Dialogs | 22/05/2026 | DssChip | DssDialog | Proxy de overlay adaptativo mobile/desktop |
| `DssForm` | 2 | Form Management | 22/05/2026 | DssBadge | DssField | Container de formulário com validação |
| `DssTimePicker` | 3 | Seletores e Pickers | 22/05/2026 | DssChip | DssKnob | QTime root; color="primary" fixo + --q-color-primary override |
| `DssDatePicker` | 3 | Seletores e Pickers | 22/05/2026 | DssChip | DssTimePicker | QDate root; EXC-Gate-01/02; Golden Context DssTimePicker |
| `DssColorPicker` | 3 | Seletores e Pickers | 22/05/2026 | DssChip | DssDatePicker | QColor root; descendant selectors palette-square/header; filter:brightness(0.85) hover |
| `DssTable` | 4 | Tabelas e Dados | 22/05/2026 | DssChip | DssMarkupTable | Tabela interativa com ordenação, paginação, filtro e seleção |
| `DssTree` | 4 | Navegação e Estrutura de Dados | 22/05/2026 | DssChip | DssList | Árvore hierárquica interativa com seleção, tick mode, lazy loading |

---

## Fase 3 — Stress Test de Composição (1/? — Em andamento)

| Componente | Categoria | Data do Selo | Golden Context | Observação |
|---|---|---|---|---|
| `DssDataCard` | Composto Complexo — Card com grid interno | 23/05/2026 | DssCard | Golden Context Fase 3; 5 padrões obrigatórios; 3 EXC-Structural; 1 ciclo |

---

## Resumo por Ciclo

| Período | Componentes Selados | Destaques |
|---|---|---|
| Jan–Fev 2026 | 10 | Fundação atômica: Chip, Badge, Button, Toggle, Checkbox, Radio, Avatar, Icon, Input, Tooltip |
| Mar 2026 | 9 | Inputs especializados: Textarea, Select, Slider, Range, Separator, Space, Spinner, File, BtnDropdown/Toggle/OptionGroup |
| Abr 1–15, 2026 | 10 | Navegação e Tabs: Tab, Tabs, TabPanel, TabPanels, RouteTab, BreadcrumbsEl, Breadcrumbs, Toolbar, Header, Card |
| Abr 16–20, 2026 | 8 | Layout completo: Footer, Menu, Drawer, Layout, Step, Stepper, ItemLabel, ItemSection |
| Abr 21–26, 2026 | 5 | Layout Global: ToolbarTitle, Page, PageContainer, PageSticky, PageScroller |
| Mai 1–9, 2026 | 6 | Compostos, Progresso e Navegação: Fab, FabAction, ExpansionItem, LinearProgress, Uploader, Pagination |
| Mai 10–15, 2026 | 7 | Overlays, Scroll e Mídia: Dialog, PopupEdit, VirtualScroll, InfiniteScroll, Img, Video |
| Mai 16–22, 2026 | 28 | Progresso, Inputs Especializados, Layout Auxiliar, Alertas, Gestos, Dados, Pickers, Tabelas: CircularProgress, InnerLoading, Skeleton, AjaxBar, Knob, Rating, Field, ScrollArea, Splitter, Responsive, MarkupTable, Banner, Bar, PullToRefresh, SlideItem, Timeline, TimelineEntry, ChatMessage, Carousel, PopupProxy, Form, TimePicker, DatePicker, ColorPicker, Table, Tree + DssParallax (Mídia) |
| Mai 23, 2026 | 1 | **Fase 3 iniciada**: DssDataCard (Stress Test de Composição) |

---

## Legenda

- **Golden Reference:** Referência normativa global para toda a categoria de componentes.
- **Golden Context:** Baseline específico usado para auditar aquele componente.
- **Golden Sample:** Referência de documentação (Template 13.1) — não listado como certificação arquitetural.

---

## Documentos Relacionados

- [DSS_GOLDEN_COMPONENTS.md](./DSS_GOLDEN_COMPONENTS.md) — Modelo de Governança Golden (definições formais)
- [CLAUDE.md](../../CLAUDE.md) — Documento normativo vinculante (Constituição + Cartões)
- [DSS_COMPONENT_ARCHITECTURE.md](../reference/DSS_COMPONENT_ARCHITECTURE.md) — Arquitetura de 4 camadas
- [DSS_TOKEN_REFERENCE.md](../reference/DSS_TOKEN_REFERENCE.md) — Catálogo oficial de tokens

---

**Design System Sansys — Governança DSS v2.3 · Última atualização: 02 de Junho de 2026**
