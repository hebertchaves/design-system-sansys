# DSS — Estado da Adequação de UI (Fases 1 e 2)

<!-- AUTO-GENERATED — não editar à mão.
     Regenerar: `npm run build:adequacao-status` (ou node scripts/build-adequacao-status.cjs)
     Fontes: docs/governance/CERTIFIED_COMPONENTS.md + apps/sandbox/src/TestSuite.vue -->

> **Gerado do disco em 23/09/2026**, não de memória. Fase, categoria e selo saem do
> `CERTIFIED_COMPONENTS.md`; os artefatos visuais saem do `TestSuite.vue` do sandbox.
>
> ⚠️ **Selo ≠ adequado.** São eixos diferentes. Os 88 componentes das Fases 1 e 2 estão
> **100% selados**; a adequação de UI é uma onda posterior, e cobre **19** deles. Um
> componente selado em janeiro/2026 foi auditado contra as regras de então — não contra o checklist
> de adequação.

## Legenda

| | Significado | Critério objetivo |
|---|---|---|
| ✅ | **Adequação fechada** | Playground **e** Preview Frame **e** o frame tem o que renderizar |
| 🟠 | **Frame sem conteúdo** | Tem os dois artefatos, mas o frame monta **casca** — ver abaixo |
| 🔵 | **Só Preview Frame** | Tem o frame, falta a página Playground — ver nota abaixo |
| 🟡 | **Só Playground** | Tem a página, falta o Preview Frame — não fecha |
| ⬜ | **Não iniciada** | Nenhum dos dois artefatos |

O critério vem do `DSS_UI_ADEQUACAO_CHECKLIST.md`: os dois artefatos juntos são o que torna possível
a análise visual, **o passo que FECHA a adequação**. A marcação é **inferida do disco**, não é selo.

### Por que existe o 🟠 — e por que ele foi acrescentado depois

Até set/2026 o ✅ derivava só de **presença de artefato**: "tem Playground e tem frame registrado".
Isso atestava moldura, não conteúdo. Medido no navegador, `DssStepper` e `DssTimeline` estavam
**✅ montando com ZERO filhos** — o frame não consumia a semente do contrato. O consumidor foi
consertado; este critério impede a classe de voltar.

Um frame prova algo quando o palco recebe **semente de filhos** (`visual.defaultPreview.slots`)
**ou props de preview** (`visual.defaultPreview.props`). Sem nenhum dos dois, o componente monta
como casca.

O critério é **deliberadamente conservador**, em dois pontos:
- **Não exige semente de quem tem props.** Um `DssButton` com `label` mostra algo real sem filho
  nenhum; exigir os dois rebaixaria 20 componentes corretos.
- **Não se aplica a componente sem slot.** Ele renderiza inteiro a partir dos próprios defaults.
  Foi o `DssUploader` (0 slots, 0 props de preview) que expôs isso: a primeira versão da regra o
  rebaixava, e ele estava certo.

⚠️ **O que o 🟠 ainda NÃO vê:** se a semente é *visualmente representativa*. Ele verifica que existe
algo a renderizar, não que o que se renderiza seja um bom exemplar. Isso é julgamento, e continua
sendo do adequador. O conteúdo da semente — se cita componente e prop que existem — é verificado à
parte pelo `validate:demo-seeds`.

## Placar

| Fase | Componentes | Adequados | Casca | Só frame | Só playground | Não iniciados |
|---|---|---|---|---|---|---|
| **Fase 1 — Atômicos** | 20 | **11** | 0 | 0 | 2 | 7 |
| **Fase 2 — Compostos** | 68 | **8** | 0 | 0 | 1 | 59 |
| **Total** | **88** | **19** | 0 | 3 | 66 |

**Próximos da fila por menor esforço** — já têm Playground, falta só o Preview Frame:
`DssAvatar`, `DssBadge`, `DssCard`.

_Nenhum componente na situação "só Preview Frame" — todo frame registrado tem página Playground._

## Fase 1 — Componentes Atômicos (11/20)

| | Componente | Categoria | Selo | Playground | Preview Frame |
|---|---|---|---|---|---|
| ✅ | `DssButton` | Ação primária interativa | 20/01/2026 | sim | sim |
| ✅ | `DssCheckbox` | Compact Control interativo | 01/02/2026 | sim | sim |
| ✅ | `DssChip` | Compact Control interativo | 27/01/2026 | sim | sim |
| ✅ | `DssEmptyState` | Estado de dado não interativo | 28/08/2026 | sim | sim |
| ✅ | `DssFile` | Upload de arquivo | 24/03/2026 | sim | sim |
| ✅ | `DssInput` | Campo de entrada de texto | 04/02/2026 | sim | sim |
| ✅ | `DssItem` | Item de lista | 13/02/2026 | sim | sim |
| ✅ | `DssRadio` | Compact Control interativo | 05/02/2026 | sim | sim |
| ✅ | `DssSelect` | Seleção por dropdown | 20/03/2026 | sim | sim |
| ✅ | `DssTextarea` | Campo de texto multilinha | 19/03/2026 | sim | sim |
| ✅ | `DssToggle` | Controle de estado binário | 05/02/2026 | sim | sim |
| 🟡 | `DssAvatar` | Visual/Identity | 02/02/2026 | sim | — |
| 🟡 | `DssBadge` | Compact Control não-interativo | 27/01/2026 | sim | — |
| ⬜ | `DssIcon` | Ícone decorativo/semântico | 13/02/2026 | — | — |
| ⬜ | `DssRange` | Controle de intervalo | 23/03/2026 | — | — |
| ⬜ | `DssSeparator` | Divisor visual | 17/03/2026 | — | — |
| ⬜ | `DssSlider` | Controle deslizante | 20/03/2026 | — | — |
| ⬜ | `DssSpace` | Espaçador flexível | 18/03/2026 | — | — |
| ⬜ | `DssSpinner` | Indicador de carregamento | 24/03/2026 | — | — |
| ⬜ | `DssTooltip` | Dica contextual | 06/02/2026 | — | — |

## Fase 2 — Componentes Compostos (8/68)

| | Componente | Categoria | Selo | Playground | Preview Frame |
|---|---|---|---|---|---|
| ✅ | `DssBreadcrumbs` | Navegação | 11/04/2026 | sim | sim |
| ✅ | `DssBtnToggle` | Botões e Controles de Grupo | 27/03/2026 | sim | sim |
| ✅ | `DssField` | Inputs Compostos | 19/05/2026 | sim | sim |
| ✅ | `DssHeader` | Estrutura de Página | 17/04/2026 | sim | sim |
| ✅ | `DssStepper` | Navegação por etapas | 20/04/2026 | sim | sim |
| ✅ | `DssTabs` | Tabs | 02/04/2026 | sim | sim |
| ✅ | `DssTimeline` | Visualização de Dados | 21/05/2026 | sim | sim |
| ✅ | `DssUploader` | Upload / File Management | 07/05/2026 | sim | sim |
| 🟡 | `DssCard` | Superfície e Layout | 12/02/2026 | sim | — |
| ⬜ | `DssAjaxBar` | Progresso e Feedback | 18/05/2026 | — | — |
| ⬜ | `DssBanner` | Notificações e Alertas | 20/05/2026 | — | — |
| ⬜ | `DssBar` | Notificações e Alertas | 20/05/2026 | — | — |
| ⬜ | `DssBottomSheet` | Overlays e Dialogs | 21/05/2026 | — | — |
| ⬜ | `DssBreadcrumbsEl` | Navegação Estrutural | 10/04/2026 | — | — |
| ⬜ | `DssBtnDropdown` | Botões e Controles de Grupo | 27/03/2026 | — | — |
| ⬜ | `DssBtnGroup` | Botões e Controles de Grupo | 26/03/2026 | — | — |
| ⬜ | `DssCarousel` | Mídia e Visualização | 21/05/2026 | — | — |
| ⬜ | `DssChatMessage` | Visualização de Dados | 21/05/2026 | — | — |
| ⬜ | `DssCircularProgress` | Progresso e Feedback | 18/05/2026 | — | — |
| ⬜ | `DssColorPicker` | Seletores e Pickers | 22/05/2026 | — | — |
| ⬜ | `DssDatePicker` | Seletores e Pickers | 22/05/2026 | — | — |
| ⬜ | `DssDialog` | Overlays e Dialogs | 11/05/2026 | — | — |
| ⬜ | `DssDrawer` | Estrutura de Página | 20/04/2026 | — | — |
| ⬜ | `DssExpansionItem` | Expansão e Colapso — Item expansível | 05/05/2026 | — | — |
| ⬜ | `DssFab` | Action Group Composto — FAB interativo | 04/05/2026 | — | — |
| ⬜ | `DssFabAction` | Action — FAB secundário | 04/05/2026 | — | — |
| ⬜ | `DssFooter` | Estrutura de Página | 18/04/2026 | — | — |
| ⬜ | `DssForm` | Form Management | 22/05/2026 | — | — |
| ⬜ | `DssImg` | Mídia e Visualização | 13/05/2026 | — | — |
| ⬜ | `DssInfiniteScroll` | Scroll e Virtualização | 13/05/2026 | — | — |
| ⬜ | `DssInnerLoading` | Progresso e Feedback | 18/05/2026 | — | — |
| ⬜ | `DssItemLabel` | Lista e Itens | 20/04/2026 | — | — |
| ⬜ | `DssItemSection` | Lista e Itens | 01/04/2026 | — | — |
| ⬜ | `DssKnob` | Inputs Especializados | 18/05/2026 | — | — |
| ⬜ | `DssLayout` | Layout Global | 20/04/2026 | — | — |
| ⬜ | `DssLinearProgress` | Indicador de Progresso não interativo | 06/05/2026 | — | — |
| ⬜ | `DssList` | Lista e Itens | 31/03/2026 | — | — |
| ⬜ | `DssMarkupTable` | Tabela Simples | 19/05/2026 | — | — |
| ⬜ | `DssMenu` | Navegação / Overlays | 18/04/2026 | — | — |
| ⬜ | `DssOptionGroup` | Botões e Controles de Grupo | 27/03/2026 | — | — |
| ⬜ | `DssPage` | Layout Global — conteúdo principal | 22/04/2026 | — | — |
| ⬜ | `DssPageContainer` | Layout Global — container com offset | 22/04/2026 | — | — |
| ⬜ | `DssPageScroller` | Layout Global | 26/04/2026 | — | — |
| ⬜ | `DssPageSticky` | Layout Global — posicionamento fixo | 23/04/2026 | — | — |
| ⬜ | `DssPagination` | Navegação Estrutural | 08/05/2026 | — | — |
| ⬜ | `DssParallax` | Mídia e Visualização | 18/05/2026 | — | — |
| ⬜ | `DssPopupEdit` | Overlays e Dialogs | 11/05/2026 | — | — |
| ⬜ | `DssPopupProxy` | Overlays e Dialogs | 22/05/2026 | — | — |
| ⬜ | `DssPullToRefresh` | Interação Gestual | 20/05/2026 | — | — |
| ⬜ | `DssRating` | Inputs Especializados | 18/05/2026 | — | — |
| ⬜ | `DssResponsive` | Layout Auxiliar | 19/05/2026 | — | — |
| ⬜ | `DssRouteTab` | Tabs | 10/04/2026 | — | — |
| ⬜ | `DssScrollArea` | Layout Auxiliar | 19/05/2026 | — | — |
| ⬜ | `DssSkeleton` | Progresso e Feedback | 18/05/2026 | — | — |
| ⬜ | `DssSlideItem` | Interação Gestual | 20/05/2026 | — | — |
| ⬜ | `DssSplitter` | Layout Auxiliar | 19/05/2026 | — | — |
| ⬜ | `DssStep` | Navegação Estrutural | 20/04/2026 | — | — |
| ⬜ | `DssTab` | Tabs | 01/04/2026 | — | — |
| ⬜ | `DssTable` | Tabelas e Dados | 22/05/2026 | — | — |
| ⬜ | `DssTabPanel` | Tabs | 09/04/2026 | — | — |
| ⬜ | `DssTabPanels` | Tabs | 09/04/2026 | — | — |
| ⬜ | `DssTimelineEntry` | Visualização de Dados | 21/05/2026 | — | — |
| ⬜ | `DssTimePicker` | Seletores e Pickers | 22/05/2026 | — | — |
| ⬜ | `DssToolbar` | Estrutura de Página | 16/04/2026 | — | — |
| ⬜ | `DssToolbarTitle` | Tipografia de barra de ferramentas | 21/04/2026 | — | — |
| ⬜ | `DssTree` | Navegação e Estrutura de Dados | 22/05/2026 | — | — |
| ⬜ | `DssVideo` | Mídia e Visualização | 13/05/2026 | — | — |
| ⬜ | `DssVirtualScroll` | Scroll e Virtualização | 12/05/2026 | — | — |

## Fora desta contagem

- **Preview Frames sem componente de Fase 1/2 correspondente:** `suite` — tipicamente Fase 3 (ex.: `DssMultiselectAutocomplete`), que não entra neste placar.
- `DssDataCard` (Fase 3), `DssCadrisCard` e `DssTestPageComplexity` — fixtures/stress test, fora
  do escopo por decisão de governança.

## Armadilha ao recontar

O Preview Frame do `DssInput` usa a chave **sem sufixo** (`activeComponent === 'preview-frame'`),
por ter sido o primeiro registrado. Recontar por `grep preview-frame-*` **perde justamente ele** —
foi assim que a contagem anterior (“11 frames”) errou. Este script resolve o dono de cada frame pela
**posição no template**, não pelo nome da chave.
