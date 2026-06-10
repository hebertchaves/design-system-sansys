# Plano de Auditoria Final DSS — Pré-Migração GitLab
**Gerado em:** 10 de Junho de 2026  
**Contexto:** Auditoria geral pós-Ondas 5-8, validando que as correções são reais e sem máscaras  
**Escopo:** 91 componentes + infraestrutura + governança + apps  
**Método:** 12 agentes paralelos + 1 síntese  
**Revisão:** v1.1 — incorpora 6 recomendações do chat orquestrador (10/jun/2026)

---

## Diagnóstico do Estado Atual

Desde a auditoria de 9 agentes (29/mai/2026), o repositório acumulou **193 arquivos alterados** e **+33.600 linhas inseridas** (Ondas 5-8: CSS Layers, contrato visual, sandbox isolation, meta.json em 76/91 componentes, grid inspector, MCP). O laudo de produção foi emitido em junho/2026 — mas as correções críticas da Onda 8 vieram *depois* do laudo.

**Diferença fundamental desta auditoria:** a anterior buscava *o que faltava fazer*. Esta deve buscar *o que parece feito mas não funciona em produção*.

---

## Mapa de Agentes

| # | Agente | Domínio | Qtd. Componentes |
|---|--------|---------|-----------------|
| A1 | Fundação CSS & Cascade | `packages/core/themes/`, CSS layers, token bridge | — |
| A2 | Build & Infraestrutura | Monorepo, Vite, TS, import paths | — |
| A3 | Atômicos Grupo 1 | DssButton, DssChip, DssBadge, DssToggle, DssCheckbox, DssRadio, DssAvatar, DssIcon, DssInput, DssTooltip | 10 |
| A4 | Atômicos Grupo 2 | DssTextarea, DssSelect, DssSlider, DssRange, DssFile, DssItem, DssItemLabel, DssItemSection, DssSeparator, DssSpace, DssSpinner | 11 |
| A5 | Layout & Estrutura | DssLayout, DssPage, DssPageContainer, DssPageSticky, DssPageScroller, DssHeader, DssFooter, DssDrawer, DssToolbar, DssToolbarTitle, DssBar | 11 |
| A6 | Navegação & Tabs | DssTabs, DssTab, DssTabPanels, DssTabPanel, DssRouteTab, DssBreadcrumbs, DssBreadcrumbsEl, DssMenu, DssPagination, DssStepper, DssStep | 11 |
| A7 | Formulários & Controles | DssForm, DssField, DssOptionGroup, DssRating, DssKnob, DssColorPicker, DssDatePicker, DssTimePicker, DssUploader | 9 |
| A8 | Overlays & Interativos | DssDialog, DssBottomSheet, DssPopupProxy, DssPopupEdit, DssExpansionItem, DssSplitter, DssFab, DssFabAction | 8 |
| A9 | Dados & Conteúdo | DssTable, DssTree, DssCard, DssTimeline, DssTimelineEntry, DssCarousel, DssInfiniteScroll, DssVirtualScroll, DssSkeleton, DssList | 10 |
| A10 | Componentes Periféricos | DssAjaxBar, DssBanner, DssImg, DssMarkupTable, DssParallax, DssPullToRefresh, DssResponsive, DssScrollArea, DssVideo, DssChatMessage, DssCircularProgress, DssLinearProgress, DssSlideItem, DssInnerLoading, DssCadrisCard, DssDataCard | 16 |
| A11 | Governança & Documentação | CERTIFIED_COMPONENTS.md, meta.json, contrato visual, links | — |
| A12 | Apps & DX | sandbox, docs-portal, MCP server, grid-inspector | — |
| **S1** | **Síntese Final** | Consolida relatórios A1–A12 | — |

---

## Orquestração

```
FASE 1 (paralelo) — Agentes A1 a A12 rodando simultaneamente
       ↓
FASE 2 (sequencial) — Agente S1 somente após todos A1-A12 entregarem
       ↓
FASE 3 (executor) — Corrigir bloqueantes do relatório S1
       ↓
FASE 4 — commit + push GitLab
```

Todos os relatórios gerados pelos agentes devem ser salvos em:
`/mnt/c/Users/hebert.chaves/DSS/docs/governance/audit-reports/`

---

## Critérios de Aceite Globais

| Severidade | Definição | Ação |
|-----------|-----------|------|
| ❌ **Bloqueante** | Quebra em produção ou viola contrato arquitetural (CSS vazando, build falhando, @import ativo, hardcode de cor) | Corrigir antes de migrar |
| ⚠️ **Alerta** | Documentação faltando, meta.json incompleto, links quebrados em docs secundários | Pode migrar, corrigir na primeira sprint GitLab |
| ℹ️ **Info** | Melhoria de qualidade sem impacto funcional | Backlog |

---

## Ferramentas Complementares (rodar manualmente antes de migrar)

```bash
# 1. Build limpo do core
cd /mnt/c/Users/hebert.chaves/DSS && npm run core:build 2>&1 | grep -i "error\|warning"

# 2. Zero @import legado (escopo completo: components/ + themes/ + tokens/)
grep -r "@import" packages/core/ --include="*.scss" | grep -v "^Binary\|node_modules\|_archive"

# 3. Zero valores hardcoded nos 10 componentes críticos
for comp in DssButton DssChip DssInput DssDialog DssHeader DssDrawer DssTabs DssTable DssForm DssCard; do
  count=$(grep -rE ":\s*[0-9]+(px|rem)\b|:\s*#[0-9a-fA-F]{3,6}\b|rgba\(" packages/core/components/*/$comp/2-composition/ 2>/dev/null | wc -l)
  echo "$comp: $count hardcoded values"
done

# 4. Sync visual contract
npm run sync:visual-contract

# 5. Verificar CSS sandbox
grep "quasar" apps/sandbox/index.html
```

---

## Prompts Completos

---

### AGENTE A1 — Fundação CSS & Cascade

```
Você é um auditor sênior do Design System Sansys (DSS). Sua missão exclusiva
é verificar a integridade real da camada de fundação CSS — CSS Cascade Layers,
sistema de tokens e bridge Quasar↔DSS.

CONTEXTO OBRIGATÓRIO (leia antes de auditar):
- /mnt/c/Users/hebert.chaves/DSS/docs/reference/DSS_ARCHITECTURE.md (Princípio #13)
- /mnt/c/Users/hebert.chaves/DSS/docs/reference/DSS_TOKEN_REFERENCE.md (seções de tokens semânticos)
- /mnt/c/Users/hebert.chaves/DSS/packages/core/themes/ (todos os arquivos)
- /mnt/c/Users/hebert.chaves/DSS/apps/sandbox/index.html
- /mnt/c/Users/hebert.chaves/DSS/apps/sandbox/public/ (listar todos os .css)

CHECKLIST DE AUDITORIA (verifique cada item com evidência física do arquivo):

[CSS LAYERS]
□ apps/sandbox/index.html carrega quasar-layered.css, NÃO quasar-scoped.css
□ quasar-layered.css existe em apps/sandbox/public/ e está envolvido em @layer quasar { }
□ quasar-scoped.css foi removido ou está em _archive/ com header DEPRECATED
□ CSS DSS (packages/core) NÃO usa @layer em nenhum arquivo scss
□ Confirmar que unlayered CSS sempre vence @layer via especificidade de cascata

[TOKEN BRIDGE Quasar↔DSS]
□ packages/core/themes/_quasar-tokens-mapping.scss declara --q-primary → var(--dss-primary)
□ Todos os 7 tokens semânticos mapeados: primary, secondary, accent, positive, negative, warning, info
□ --q-dark e --q-dark-page mapeados para tokens de neutros
□ packages/core/themes/_quasar-overrides.scss NÃO contém referências a --quasar-* (variável inexistente)
□ .bg-primary, .text-primary etc. usam var(--dss-primary), não valores hardcoded

[@USE/@IMPORT COMPLIANCE]
□ Executar: grep -r "@import" packages/core/ --include="*.scss" | grep -v "_archive\|node_modules"
  (escopo intencional: packages/core/ — cobre components/, themes/ E tokens/ que também podem conter @import legado)
□ Zero ocorrências de @import fora de comentários em qualquer um dos três subdiretórios
□ Verificar se _quasar-overrides.scss usa @use/@forward corretamente

[SASS COMPILE]
□ Executar: cd /mnt/c/Users/hebert.chaves/DSS && npm run core:build 2>&1 | head -50
□ Zero erros Sass
□ Zero warnings de @import legado

CRITÉRIO DE ACEITE:
✅ APROVADO: Todos os 15 itens com evidência física confirmada
⚠️ ALERTA: 1-2 itens sem confirmação (não-bloqueante, documentar)
❌ REPROVADO: Qualquer ocorrência de @import ativo, quasar-scoped.css referenciado
              no HTML, ou --quasar-* ainda presente nos overrides

OUTPUT OBRIGATÓRIO:
Relatório estruturado com: (1) resultado por item do checklist, (2) trechos exatos
do código auditado como evidência, (3) veredicto final com justificativa.
Salve como: /mnt/c/Users/hebert.chaves/DSS/docs/governance/audit-reports/AUDITORIA_FINAL_A1_FOUNDATION.md
```

---

### AGENTE A2 — Build & Infraestrutura

```
Você é um auditor de infraestrutura do Design System Sansys (DSS). Sua missão
é garantir que o monorepo está funcional do ponto de vista de build, imports
e dependências — sem falsos positivos de "build passou".

CONTEXTO OBRIGATÓRIO:
- /mnt/c/Users/hebert.chaves/DSS/docs/governance/DSS_MONOREPO_PATH_MAP.md
- /mnt/c/Users/hebert.chaves/DSS/package.json (raiz)
- /mnt/c/Users/hebert.chaves/DSS/packages/core/package.json
- /mnt/c/Users/hebert.chaves/DSS/apps/sandbox/package.json
- /mnt/c/Users/hebert.chaves/DSS/apps/docs-portal/package.json (se existir)

CHECKLIST DE AUDITORIA:

[MONOREPO WORKSPACE]
□ bun.lock ou package-lock.json está em sincronia (sem dependências fantasmas)
□ packages/core/index.js exporta todos os componentes (ou confirmar onde está o barrel)
□ Aliases Vite (@dss/*, etc.) estão definidos e apontam para caminhos reais
□ Nenhum pacote importa usando caminho absoluto Windows (C:\Users\...)

[BUILD DO CORE]
□ Executar: cd /mnt/c/Users/hebert.chaves/DSS && npm run core:build 2>&1
□ Saída: zero erros, zero warnings de deprecação Sass
□ /dist ou pasta equivalente gerada com .js, .css e .d.ts

[TYPESCRIPT]
□ tsconfig.json no core aponta paths corretos
□ Nenhum componente usa `any` como atalho (grep rápido)
□ Executar: npm run type-check (se existir) ou npx tsc --noEmit 2>&1 | head -30

[DOCS-PORTAL]
□ apps/docs-portal/src/index.css EXISTE (foi recriado na Onda 8)
□ Conteúdo: @import "tailwindcss" e @config "../tailwind.config.ts"
□ apps/docs-portal/tailwind.config.ts existe
□ Build do portal: npm run docs:build 2>&1 | tail -20 (verificar se conclui sem erro)

[SANDBOX]
□ apps/sandbox/vite.config.js resolve aliases corretamente
□ apps/sandbox/main.js não importa CSS de terceiros fora de @layer
□ DemoRenderer.vue existe em apps/sandbox/src/ e é importado no TestSuite

[SCRIPTS NPM]
□ npm run sync:visual-contract existe e é executável
□ npm run core:build existe
□ Nenhum script usa caminho relativo quebrado

[TOKENS FANTASMAS NO CSS COMPILADO — RISCO CRÍTICO DE PRODUÇÃO]
□ Após o build, executar:
  grep "compact-control-height" packages/core/dist/style.css
  → ESPERADO: linhas de declaração (--dss-compact-control-height-xs: ..., etc.)
  → SE RETORNAR VAZIO = BLOQUEANTE: DssChip, DssBadge e outros componentes compactos
    estão referenciando variáveis CSS indefinidas em produção
□ Verificar também se os tokens estão declarados na fonte:
  grep "compact-control-height" packages/core/tokens/ -r --include="*.scss"
  → Se o token é referenciado em components/ mas não declarado em tokens/ = débito de token

CRITÉRIO DE ACEITE:
✅ APROVADO: Build do core e do portal completam sem erro; compact-control-height presente no dist
❌ REPROVADO: Qualquer import com caminho absoluto Windows, index.css ausente
              no docs-portal, build falhando, ou compact-control-height ausente no CSS compilado

OUTPUT: Salve em docs/governance/audit-reports/AUDITORIA_FINAL_A2_BUILD.md
```

---

### AGENTE A3 — Atômicos Grupo 1

```
Você é um auditor de componentes do DSS. Audite os 10 componentes abaixo
com profundidade real — leia os arquivos, não assuma conformidade.

COMPONENTES: DssButton, DssChip, DssBadge, DssToggle, DssCheckbox, DssRadio,
             DssAvatar, DssIcon, DssInput, DssTooltip

LOCALIZAÇÃO: /mnt/c/Users/hebert.chaves/DSS/packages/core/components/base/<NomeComp>/

CONTEXTO OBRIGATÓRIO (leia antes):
- CLAUDE.md (Checklist de Validação Final — Gate Estrutural DSS)
- docs/reference/DSS_COMPONENT_ARCHITECTURE.md (4 camadas, pseudo-elementos)
- docs/governance/DSS_GOLDEN_COMPONENTS.md
- docs/governance/CERTIFIED_COMPONENTS.md

PARA CADA COMPONENTE, verifique:

[GATE ESTRUTURAL — checklist físico]
□ 1-structure/Dss<Comp>.ts.vue existe
□ 2-composition/_base.scss existe
□ 3-variants/ existe com arquivos e index.scss
□ 4-output/ existe com _states.scss, _brands.scss e index.scss
□ Dss<Comp>.vue existe e é re-export puro (sem template, sem style, sem lógica)
□ Dss<Comp>.module.scss importa L2 → L3 → L4 nessa ordem exata
□ index.js exporta componente, types e composables
□ dss.meta.json existe e contém: goldenReference, goldenContext, previewGroup,
  defaultPreview.demoSlots
□ Dss<Comp>.test.js existe

[GATE TÉCNICO — leitura real do código]
□ _base.scss: zero valores hardcoded (px, rem, hex, rgb) — use grep
□ _brands.scss: reage a [data-brand="hub|water|waste"]
□ ::before SOMENTE para touch target (buscar qualquer outro uso em variantes)
□ Cores aplicadas via classes utilitárias no Vue, não no SCSS
□ Pseudo-elementos brightness() usam apenas valores canônicos: 0.85, 0.90, 0.92,
  0.95, 1.10, 1.20

[GATE DOCUMENTAL — conferência rápida]
□ README.md existe com API (props, slots, events, tokens)
□ Dss<Comp>.example.vue com mínimo 3 cenários
□ dss.meta.json.visualProperties reflete o que está no CSS

[TESTES DE ACESSIBILIDADE POR TECLADO]
Para os componentes interativos deste grupo (DssButton, DssCheckbox, DssRadio, DssToggle, DssInput):
□ Verificar se Dss<Comp>.test.js cobre navegação por teclado (Tab, Enter, Space)
□ Buscar por: grep -n "keydown\|keyboard\|Tab\|ArrowKey\|Enter\|Space" Dss<Comp>.test.js
□ Se o arquivo de teste existir mas não tiver nenhum teste de teclado = ⚠️ Alerta
□ Se o arquivo de teste tiver apenas expect(true).toBe(true) ou equivalente = ❌ Bloqueante
  (teste stub não garante acessibilidade)

USE as ferramentas MCP disponíveis:
- mcp__dss__check_compliance para cada componente
- mcp__dss__validate_component_code quando encontrar suspeita

CRITÉRIO DE ACEITE:
✅ APROVADO: Todos os itens de gate estrutural e técnico confirmados
⚠️ RESSALVA: Itens documentais faltando ou testes de teclado ausentes (não-bloqueante)
❌ REPROVADO: Qualquer gate estrutural ou técnico com falha real, ou testes stub

OUTPUT: Tabela por componente com status por gate + evidências de falha.
Salve em: docs/governance/audit-reports/AUDITORIA_FINAL_A3_ATOMICOS_1.md
```

---

### AGENTE A4 — Atômicos Grupo 2

```
Você é um auditor de componentes do DSS. Use o mesmo método do Agente A3.

COMPONENTES: DssTextarea, DssSelect, DssSlider, DssRange, DssFile, DssItem,
             DssItemLabel, DssItemSection, DssSeparator, DssSpace, DssSpinner

LOCALIZAÇÃO: /mnt/c/Users/hebert.chaves/DSS/packages/core/components/base/<NomeComp>/

CONTEXTO OBRIGATÓRIO: Mesmo do A3 (CLAUDE.md, DSS_COMPONENT_ARCHITECTURE.md,
DSS_GOLDEN_COMPONENTS.md, CERTIFIED_COMPONENTS.md)

EXECUTE O MESMO CHECKLIST DE GATE ESTRUTURAL + TÉCNICO + DOCUMENTAL DO A3.

VERIFICAÇÕES ADICIONAIS ESPECÍFICAS:
□ DssSelect/DssTextarea: confirmar que v-model está documentado no types/
□ DssItem/DssItemLabel/DssItemSection: verificar que a tríade funciona em conjunto
  (confirmar se index.js do DssItem exporta os sub-componentes)
□ DssSlider/DssRange: confirmar que tokens --dss-compact-control-height-* são usados
  (NÃO tokens específicos de componente como --dss-slider-height-*)
□ DssSeparator/DssSpace: confirmar ausência de lógica desnecessária (se tiverem muito
  código, é sinal de problema — esses são os mais simples do sistema)

[TESTES DE ACESSIBILIDADE POR TECLADO]
Para DssSelect, DssSlider, DssRange (interativos com teclado crítico):
□ Verificar se .test.js cobre navegação por teclado (ArrowUp, ArrowDown, Enter)
□ Buscar por: grep -n "keydown\|ArrowUp\|ArrowDown\|keyboard" Dss<Comp>.test.js
□ Ausência de testes de teclado nesses componentes = ⚠️ Alerta

CRITÉRIO DE ACEITE: Mesmo do A3

OUTPUT: docs/governance/audit-reports/AUDITORIA_FINAL_A4_ATOMICOS_2.md
```

---

### AGENTE A5 — Layout & Estrutura

```
Você audita os componentes de estrutura de página do DSS. Esses componentes
são os mais críticos para produção porque controlam o layout global.

COMPONENTES: DssLayout, DssPage, DssPageContainer, DssPageSticky, DssPageScroller,
             DssHeader, DssFooter, DssDrawer, DssToolbar, DssToolbarTitle, DssBar

LOCALIZAÇÃO: /mnt/c/Users/hebert.chaves/DSS/packages/core/components/base/<NomeComp>/

CONTEXTO OBRIGATÓRIO:
- docs/reference/DSS_ARCHITECTURE.md (integração com Quasar QLayout)
- docs/governance/CERTIFIED_COMPONENTS.md (DssLayout, DssHeader, DssFooter,
  DssDrawer foram selados em Abril/2026)
- packages/core/components/base/DssLayout/dss.meta.json

EXECUTE O CHECKLIST PADRÃO (Gate Estrutural + Técnico + Documental do A3) PARA TODOS OS 11.

VERIFICAÇÕES ESPECÍFICAS DE LAYOUT:
□ DssLayout: wraps QLayout do Quasar? Confirmar no 1-structure
□ DssDrawer: dss.meta.json.defaultPreview.demoSlots.modelValue = false (fechado por default)
□ DssHeader: GAP-03 foi resolvido? (verificar CERTIFIED_COMPONENTS.md observação)
□ DssPageSticky: dss.meta.json existe e tem previewGroup definido
□ DssToolbar + DssToolbarTitle: verificar se são usados juntos no example.vue

[CSS DE LAYOUT — RISCO PRODUÇÃO]
□ Nenhum componente de layout usa position:fixed ou z-index com valor hardcoded
  — deve usar tokens --dss-z-*
□ DssDrawer: confirmar que overlay/backdrop usa token de opacidade, não valor hardcoded
□ DssPageSticky: verificar que position:sticky não quebra com @layer
  (comportamento inesperado quando CSS está dentro de layer)

[BRAND REACTIVITY]
□ DssHeader/DssFooter/DssDrawer reagem a [data-brand="hub|water|waste"]
□ Verificar que _brands.scss existe e não está vazio nesses componentes

[TESTES DE ACESSIBILIDADE POR TECLADO]
Para DssDrawer (navegação por teclado crítica — deve fechar com ESC):
□ Verificar se DssDrawer.test.js cobre ESC para fechar
□ Buscar por: grep -n "Escape\|keydown\|keyboard" DssDrawer.test.js
□ Ausência = ⚠️ Alerta

CRITÉRIO DE ACEITE: Mesmo padrão global

OUTPUT: docs/governance/audit-reports/AUDITORIA_FINAL_A5_LAYOUT.md
```

---

### AGENTE A6 — Navegação & Tabs

```
Você audita os componentes de navegação do DSS. Foco especial em integração
com Vue Router e comportamento de estado ativo.

COMPONENTES: DssTabs, DssTab, DssTabPanels, DssTabPanel, DssRouteTab,
             DssBreadcrumbs, DssBreadcrumbsEl, DssMenu, DssPagination,
             DssStepper, DssStep

LOCALIZAÇÃO: /mnt/c/Users/hebert.chaves/DSS/packages/core/components/base/<NomeComp>/

CONTEXTO OBRIGATÓRIO:
- docs/reference/DSS_COMPONENT_ARCHITECTURE.md
- docs/governance/CERTIFIED_COMPONENTS.md (todos foram selados em Abril/2026)

EXECUTE O CHECKLIST PADRÃO (Gate Estrutural + Técnico + Documental do A3) PARA TODOS OS 11.

VERIFICAÇÕES ESPECÍFICAS DE NAVEGAÇÃO:
□ DssRouteTab: integra com Vue Router? Verificar se usa prop `to` ou `router-link`
□ DssMenu: CSS de teleport está em @layer? (QMenu usa teleport ao body — pode vazar
  fora do escopo DSS e perder tokens)
□ DssPagination: tokens de tamanho usam --dss-compact-control-height-*, não hardcoded
□ DssStepper/DssStep: estado "active" usa token DSS, não cor direta

[ACESSIBILIDADE CRÍTICA]
□ DssTabs/DssTab: role="tablist"/"tab" presentes? (WCAG 4.1.2)
□ DssBreadcrumbs: aria-label="breadcrumb" declarado?
□ DssMenu: focus trap quando aberto? (WCAG 2.1.2)
□ DssPagination: aria-label em cada botão de página?

[ESTADO ATIVO — RISCO VISUAL]
□ DssTab ativo usa token --dss-color-surface-* para indicação, não cor hardcoded
□ DssBreadcrumbsEl: estado "current" (aria-current="page") tem estilo diferenciado via token

[TESTES DE ACESSIBILIDADE POR TECLADO]
Para DssTabs, DssMenu, DssPagination, DssStepper (navegação por teclado crítica):
□ DssTabs: .test.js cobre troca de aba com ArrowLeft/ArrowRight?
□ DssMenu: .test.js cobre abertura com Enter, fechamento com ESC?
□ DssPagination: .test.js cobre navegação com Tab entre botões de página?
□ Buscar por: grep -n "keydown\|ArrowLeft\|ArrowRight\|Escape\|keyboard" Dss<Comp>.test.js
□ Ausência em qualquer um desses = ⚠️ Alerta (são críticos para WCAG 2.1.1)

CRITÉRIO DE ACEITE: Mesmo padrão global

OUTPUT: docs/governance/audit-reports/AUDITORIA_FINAL_A6_NAVEGACAO.md
```

---

### AGENTE A7 — Formulários & Controles

```
Você audita os componentes de formulário do DSS. Foco em v-model, validação
e acessibilidade de formulário.

COMPONENTES: DssForm, DssField, DssOptionGroup, DssRating, DssKnob,
             DssColorPicker, DssDatePicker, DssTimePicker, DssUploader

LOCALIZAÇÃO:
- base/ para: DssField, DssOptionGroup, DssRating, DssKnob
- composed/ para: DssForm, DssColorPicker, DssDatePicker, DssTimePicker, DssUploader

CONTEXTO OBRIGATÓRIO:
- docs/reference/DSS_COMPONENT_ARCHITECTURE.md

EXECUTE O CHECKLIST PADRÃO (Gate Estrutural + Técnico + Documental do A3) PARA TODOS OS 9.

VERIFICAÇÕES ESPECÍFICAS DE FORMULÁRIO:
□ DssForm: expõe método validate()? Verificar types/ e README
□ DssField: wraps QField? Verificar se slots de label/hint estão documentados
□ DssColorPicker/DssDatePicker/DssTimePicker: confirmados em composed/, não em base/
□ DssUploader: tem estado de progress documentado? Emite eventos de upload?

[V-MODEL]
□ Cada componente de input define modelValue/update:modelValue corretamente em types/
□ DssOptionGroup: suporta v-model com array (multi-select)?

[ACESSIBILIDADE]
□ DssRating: roles ARIA corretos (slider? radiogroup?)
□ DssKnob: acessível por teclado? (WCAG 2.1.1)
□ DssColorPicker: tem label acessível?

[META.JSON]
□ previewGroup definido para todos
□ defaultPreview.demoSlots tem valor que funciona sem interação do usuário
  (estado default, não loading/submitting)

[TESTES DE ACESSIBILIDADE POR TECLADO]
Para DssKnob, DssRating, DssSelect (componentes com interação por teclado não trivial):
□ DssKnob: .test.js cobre ajuste de valor com ArrowUp/ArrowDown?
□ DssRating: .test.js cobre seleção com Enter/Space?
□ DssSelect: .test.js cobre abertura com Space/Enter e seleção com ArrowDown?
□ Buscar por: grep -n "keydown\|ArrowUp\|ArrowDown\|Space\|Enter\|keyboard" Dss<Comp>.test.js
□ Ausência = ⚠️ Alerta

CRITÉRIO DE ACEITE: Mesmo padrão global

OUTPUT: docs/governance/audit-reports/AUDITORIA_FINAL_A7_FORMS.md
```

---

### AGENTE A8 — Overlays & Interativos

```
Você audita componentes que usam teleport, z-index e estados de abertura/fechamento.
Esses são os componentes com maior risco de vazamento de CSS em produção.

COMPONENTES: DssDialog, DssBottomSheet, DssPopupProxy, DssPopupEdit,
             DssExpansionItem, DssSplitter, DssFab, DssFabAction

LOCALIZAÇÃO:
- composed/ para: DssDialog, DssBottomSheet, DssPopupEdit
- base/ para: DssPopupProxy, DssExpansionItem, DssSplitter, DssFab, DssFabAction

CONTEXTO OBRIGATÓRIO:
- docs/reference/DSS_ARCHITECTURE.md (Princípio #13 — CSS layers e teleport)
- docs/governance/CERTIFIED_COMPONENTS.md

EXECUTE O CHECKLIST PADRÃO (Gate Estrutural + Técnico + Documental do A3) PARA TODOS OS 8.

[RISCO CRÍTICO DE PRODUÇÃO — TELEPORT]
□ DssDialog: CSS do overlay (backdrop) — componentes teleportados para <body> ficam
  fora do escopo #app. Verificar se o CSS do dialog funciona fora do contexto DSS.
□ DssBottomSheet: mesmo risco do DssDialog — backdrop CSS está correto?
□ DssPopupProxy: delega para QPopupProxy? Confirmar se há CSS próprio ou apenas wrapper

[Z-INDEX]
□ DssDialog/DssBottomSheet: usam tokens --dss-z-dialog, --dss-z-overlay?
  Buscar por z-index: [0-9] no SCSS desses componentes
□ DssFab: z-index usa token? Confirmar --dss-z-fab ou equivalente

[ESTADO ABERTO/FECHADO]
□ DssDialog: modelValue = false no dss.meta.json.defaultPreview.demoSlots
□ DssBottomSheet: mesma verificação
□ DssExpansionItem: estado "expanded" tem token de transição?

[ACESSIBILIDADE]
□ DssDialog: role="dialog" + aria-modal="true" + aria-labelledby?
□ Focus trap ativo quando dialog está aberto?
□ ESC fecha o dialog?

[TESTES DE ACESSIBILIDADE POR TECLADO]
Para DssDialog, DssBottomSheet, DssExpansionItem (estados aberto/fechado com teclado):
□ DssDialog: .test.js cobre ESC para fechar e focus trap?
□ DssBottomSheet: .test.js cobre ESC para fechar?
□ DssExpansionItem: .test.js cobre expansão/contração com Enter/Space?
□ Buscar por: grep -n "keydown\|Escape\|keyboard\|focusTrap" Dss<Comp>.test.js
□ Ausência nos dialogs = ⚠️ Alerta (WCAG 2.1.2 exige escape de modais)

CRITÉRIO DE ACEITE: Mesmo padrão global

OUTPUT: docs/governance/audit-reports/AUDITORIA_FINAL_A8_OVERLAYS.md
```

---

### AGENTE A9 — Dados & Conteúdo

```
Você audita componentes de exibição de dados e conteúdo. Foco em slots,
renderização de listas e contratos de dados.

COMPONENTES: DssTable, DssTree, DssCard, DssTimeline, DssTimelineEntry,
             DssCarousel, DssInfiniteScroll, DssVirtualScroll, DssSkeleton, DssList

LOCALIZAÇÃO:
- composed/ para: DssTable, DssCarousel
- base/ para: DssTree, DssCard, DssTimeline, DssTimelineEntry, DssInfiniteScroll,
              DssVirtualScroll, DssSkeleton, DssList

EXECUTE O CHECKLIST PADRÃO (Gate Estrutural + Técnico + Documental do A3) PARA TODOS OS 10.

VERIFICAÇÕES ESPECÍFICAS:
□ DssTable: slot para ações de linha documentado? Suporta paginação server-side?
□ DssVirtualScroll/DssInfiniteScroll: prop de altura obrigatória está no types/?
□ DssSkeleton: tem variantes (text, rect, circle) documentadas?
□ DssCard: DssCardSection e DssCardActions são sub-componentes — confirmados em index.js?
□ DssTimeline: DssTimelineEntry é sub-componente — exportado junto?

[SLOTS — RISCO DE PRODUÇÃO]
□ Cada componente tem slots documentados no README (não apenas o slot default)
□ DssTable: slot de célula personalizada (body-cell-*) funciona com padrão Quasar?
□ DssCarousel: slot de thumbnail documentado?

[META.JSON]
□ DssCard, DssTable: demoSlots não usa dados hardcoded (arrays de exemplo devem
  ser pequenos, 2-3 itens, sem IDs de dados reais)

CRITÉRIO DE ACEITE: Mesmo padrão global

OUTPUT: docs/governance/audit-reports/AUDITORIA_FINAL_A9_DADOS.md
```

---

### AGENTE A10 — Componentes Periféricos

```
Você audita 16 componentes que não foram o foco principal das auditorias
anteriores. Alguns podem ter sido criados sem o mesmo rigor dos componentes
de Fase 1 e 2. Seu foco é identificar débitos ocultos.

COMPONENTES: DssAjaxBar, DssBanner, DssImg, DssMarkupTable, DssParallax,
             DssPullToRefresh, DssResponsive, DssScrollArea, DssVideo,
             DssChatMessage, DssCircularProgress, DssLinearProgress,
             DssSlideItem, DssInnerLoading, DssCadrisCard, DssDataCard

LOCALIZAÇÃO:
- base/ para todos exceto DssChatMessage
- composed/ para DssChatMessage
- stress-test/ para DssCadrisCard e DssDataCard

CONTEXTO OBRIGATÓRIO:
- docs/governance/CERTIFIED_COMPONENTS.md (verificar quais NÃO estão certificados)

[GATE ESTRUTURAL — VARREDURA PARA CADA UM DOS 16]
□ As 4 camadas existem
□ Entry point wrapper existe
□ dss.meta.json existe com previewGroup + demoSlots
□ .test.js existe
□ index.js exporta corretamente

[RISCOS ESPECÍFICOS]
□ DssCadrisCard/DssDataCard (stress-test): são componentes de teste?
  → SE SIM: confirmados como excluídos do barrel export público do core?
  → NÃO devem ser importáveis por consumidores externos do DSS
□ DssAjaxBar: position no dss.meta.json.defaultPreview.demoSlots é "top"
  (foi corrigido em commit anterior — verificar se permanece correto)
□ DssImg: tem fallback de src quebrada documentado?
□ DssParallax: tem nota sobre performance (scroll listener) no README?

[CERTIFICAÇÃO]
□ Listar quais dos 16 NÃO constam no CERTIFIED_COMPONENTS.md
□ Para os não certificados: identificar o gap mais crítico que impede certificação

CRITÉRIO DE ACEITE:
✅ APROVADO: Gates estruturais confirmados para todos os 16
⚠️ ALERTA: Itens de certificação pendente (documentar — não bloqueante)
❌ REPROVADO: DssCadrisCard/DssDataCard no barrel público, ou gate técnico falhando

OUTPUT: docs/governance/audit-reports/AUDITORIA_FINAL_A10_PERIFERICOS.md
```

---

### AGENTE A11 — Governança & Documentação

```
Você audita a integridade documental e de governança do DSS. Foco em
detectar desalinhamentos entre o que os documentos dizem e o que o código faz.

ARQUIVOS CRÍTICOS A LER:
- docs/governance/CERTIFIED_COMPONENTS.md
- docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md
- docs/governance/DSS_PRODUCTION_READINESS_LAUDO.md
- README.md (raiz do repositório)
- packages/core/components/base/DssButton/dss.meta.json (Golden Sample — referência)

[CERTIFIED_COMPONENTS.md]
□ Todos os 91 componentes do repositório estão no índice?
  → Fazer diff: listar ls packages/core/components/*/ vs entradas no CERTIFIED
□ Componentes com placeholder de data ("Selado hoje") — verificar se a data está
  correta ou é um artefato de template não finalizado

[CONTRATO VISUAL — DSS_REFERENCIA_VISUAL_ANALISE.md]
□ A seção <!-- BEGIN:AUTO-GENERATED --> foi editada manualmente?
  (NUNCA deve ser editada diretamente — apenas via npm run sync:visual-contract)
□ Spot-check em 5 componentes: DssButton, DssChip, DssInput, DssDialog, DssCard
  Eixo 1 — Sincronização: comparar campo visualProperties no meta.json vs entrada na
  seção auto-gerada → divergência = sync:visual-contract não rodado pós-mudança
  Eixo 2 — Consistência interna: para cada componente do spot-check, comparar o campo
  computedTokens com os tokens listados em visualProperties.tokens do mesmo meta.json
  → Se computedTokens declara um token que visualProperties não lista (ou vice-versa)
    = ⚠️ Alerta com nota "débito documental — consumidores do campo ficam com dados parciais"
  → Documentar qual campo será a fonte de verdade para ferramentas que consomem o meta.json

[LINKS QUEBRADOS]
□ README.md raiz: links de componentes apontam para packages/core/...?
□ CLAUDE.md: referências a arquivos de docs existem fisicamente?
□ Executar verificação de links nos arquivos de entrada principais

[META.JSON — AMOSTRAGEM DE 10]
□ Auditar 10 meta.json (escolha 10 componentes variados)
□ Verificar que cada um tem: goldenReference, goldenContext, previewGroup,
  defaultPreview.demoSlots não-nulo
□ Campos ausentes = débito documental (⚠️ alerta, não bloqueante)

[PRODUCTION READINESS LAUDO]
□ Registrar no relatório: o laudo foi emitido ANTES da Onda 8
□ Ondas 8+ foram concluídas — documentar evidência (commits relevantes)
□ O laudo precisa de adendo ou nova versão?

CRITÉRIO DE ACEITE:
✅ APROVADO: Links dos arquivos de entrada funcionam, contrato visual em sincronia
⚠️ ALERTA: Meta.json com campos faltando em componentes periféricos
❌ REPROVADO: Seção AUTO-GENERATED editada manualmente, links quebrados no README raiz

OUTPUT: docs/governance/audit-reports/AUDITORIA_FINAL_A11_GOVERNANCA.md
```

---

### AGENTE A12 — Apps & DX

```
Você audita os aplicativos e a experiência do desenvolvedor. Foco em garantir
que o que funciona localmente vai funcionar em produção real.

ESCOPO:
- apps/sandbox/ (completo)
- apps/docs-portal/ (completo)
- packages/mcp/ (MCP server DSS)
- packages/grid-inspector/ (componente utilitário)

[SANDBOX]
□ index.html: carrega quasar-layered.css, NÃO quasar-scoped.css
□ main.js: importações de DSS Core usam aliases corretos (não caminhos relativos longos)
□ TestSuite.vue: lista componentes de forma organizada?
□ DemoRenderer.vue: lê demoSlots do meta.json e renderiza corretamente?
□ apps/sandbox/public/_archive/: arquivos deprecated presentes com header DEPRECATED?
□ Verificar que quasar-components.css não está referenciado em nenhum HTML/JS ativo

[ISOLAMENTO CSS — VERIFICAÇÃO FÍSICA]
□ quasar-layered.css existe em apps/sandbox/public/
□ Executar: grep -c "@layer" apps/sandbox/public/quasar-layered.css → deve ser > 0
□ CSS DSS (packages/core/**/*.scss) não está dentro de nenhum @layer

[DOCS-PORTAL]
□ apps/docs-portal/src/index.css existe (recriado na Onda 8)
□ Conteúdo: @import "tailwindcss" e @config "../tailwind.config.ts"
□ apps/docs-portal/tailwind.config.ts existe
□ apps/docs-portal/src/main.tsx importa "./index.css" sem erro

[TOKENS DUPLICADOS NO PORTAL — SINCRONISMO COM CORE]
□ Verificar se apps/docs-portal/src/index.css contém declarações de tokens --dss-*
  além das diretivas do Tailwind (grep --dss- apps/docs-portal/src/index.css)
□ SE CONTIVER tokens declarados manualmente:
  - Comparar --dss-primary no index.css vs packages/core/tokens/globals.scss (ou equivalente)
  - Comparar --dss-gray-* no index.css vs core
  - Divergência em qualquer token = ⚠️ Alerta: "portal renderiza com paleta desatualizada"
  - Documentar quantos tokens estão duplicados — se > 10, escalar para ❌ Bloqueante
    (risco sistêmico de drift de paleta entre portal e sistema real)

[MCP SERVER]
□ packages/mcp/build/index.js existe (build presente)
□ packages/mcp/src/ tem os tools implementados
□ Executar mcp__dss__check_compliance com DssButton como teste
□ Executar mcp__dss__query_component com um componente como teste
□ Se o MCP falha: documentar o erro exato com stack trace

[MCP — VERIFICAÇÃO DE IMPLEMENTAÇÕES REAIS vs SIMULADAS]
□ Ler packages/mcp/src/tools/validateVisualContract.ts (ou equivalente)
□ Verificar se a implementação renderiza o componente em ambiente real (headless browser,
  Playwright, JSDOM) ou se retorna um resultado mockado/simulado sem renderização
□ Buscar por: "mock\|simulate\|hardcoded\|return true\|always pass" no arquivo
□ SE SIMULADA: classificar como ⚠️ Alerta com nota explícita:
  "validate_visual_contract é infraestrutura pendente — respostas desta tool são
  declarativas, não verificadas por renderização real. Não usar como critério de aceite."
□ A ausência deste item na auditoria anterior gerou falsos positivos — confirmar honestamente

[GRID INSPECTOR]
□ packages/grid-inspector/dist/ tem build atualizado
□ Comparar data de modificação de dist/ vs src/ — dist deve ser mais recente ou igual
□ FloatingGridInspector.tsx compilado corretamente

[DX — ONBOARDING SIMULADO]
□ README.md raiz: comandos de instalação são válidos para o estado atual do repo?
□ Existe QUICK_START.md? Se sim, os comandos funcionam?
□ Um desenvolvedor novo conseguiria iniciar o sandbox em < 5 minutos?

CRITÉRIO DE ACEITE:
✅ APROVADO: Sandbox e docs-portal iniciam, MCP responde, isolamento CSS confirmado
⚠️ ALERTA: Grid inspector dist desatualizado, DX com fricção mas funcional
❌ REPROVADO: quasar-scoped.css ativo, index.css ausente no docs-portal, MCP não responde

OUTPUT: docs/governance/audit-reports/AUDITORIA_FINAL_A12_APPS.md
```

---

### AGENTE S1 — Síntese Final

```
Você é o agente de síntese da auditoria final pré-produção do Design System Sansys.
Execute SOMENTE após todos os agentes A1-A12 terem entregue seus relatórios.

LEIA OS 12 RELATÓRIOS:
- docs/governance/audit-reports/AUDITORIA_FINAL_A1_FOUNDATION.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A2_BUILD.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A3_ATOMICOS_1.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A4_ATOMICOS_2.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A5_LAYOUT.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A6_NAVEGACAO.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A7_FORMS.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A8_OVERLAYS.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A9_DADOS.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A10_PERIFERICOS.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A11_GOVERNANCA.md
- docs/governance/audit-reports/AUDITORIA_FINAL_A12_APPS.md

PRODUZA UM RELATÓRIO CONSOLIDADO com as seguintes seções:

### 1. SCORECARD EXECUTIVO
Tabela com uma linha por agente:
| Agente | Domínio | Veredicto | Bloqueantes | Alertas |

### 2. PROBLEMAS BLOQUEANTES PARA PRODUÇÃO
Lista numerada dos itens ❌ encontrados por qualquer agente.
Cada item: [Agente] [Arquivo/Componente] [Problema exato] [Impacto em produção]

### 3. ALERTAS NÃO-BLOQUEANTES
Lista de itens ⚠️ que podem ser resolvidos pós-migração GitLab.

### 4. PADRÃO RECORRENTE (DÉBITO SISTÊMICO)
Se o mesmo tipo de problema aparece em 3+ componentes diferentes, classificar
como "débito sistêmico" e sugerir correção em lote.

### 5. VEREDICTO FINAL
Escolha exatamente um:
✅ APROVADO PARA MIGRAÇÃO GITLAB — zero bloqueantes confirmados
⚠️ APROVADO COM RESSALVAS — bloqueantes listados, migração possível com decisão consciente
❌ BLOQUEADO — corrigir itens críticos antes de migrar ao GitLab

Justificativa do veredicto em 3-5 linhas.

Salve em: docs/governance/audit-reports/AUDITORIA_FINAL_CONSOLIDADA_JUNHO_2026.md
```

---

## Resumo de Execução

Para executar este plano em um novo chat, use este prompt de entrada:

```
Preciso executar a Auditoria Final pré-produção do DSS. O plano completo está em:
docs/governance/AUDITORIA_FINAL_PLANO_JUNHO_2026.md

Execute assim:
1. Lance os agentes A1 a A12 em PARALELO usando o Agent tool (subagent_type: Explore para 
   agentes de leitura pesada, claude para os demais)
2. Aguarde todos os 12 relatórios serem salvos em docs/governance/audit-reports/
3. Lance o agente S1 com os 12 relatórios como input
4. Mostre o veredicto final consolidado

Os prompts completos de cada agente estão no arquivo do plano.
```
