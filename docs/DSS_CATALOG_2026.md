# Design System Sansys — Catálogo Completo v2.2
> Inventário técnico oficial · Junho 2026

---

## 1. VISÃO GERAL

| Dimensão | Valor |
|---|---|
| Versão corrente | **DSS v2.2** |
| Componentes públicos | **89** (77 base + 12 compostos) |
| Componentes certificados | **87** (19 Fase 1 + 68 Fase 2) |
| Tokens totais | **952** (98 globais + 854 semânticos) |
| Ferramentas MCP | **14** |
| Arquivos de teste | **88 unitários + 29 E2E + 15 estáticos** |
| Brands suportados | **3** (Hub · Water · Waste) |
| Conformidade | **WCAG 2.1 AA** |
| Framework base | **Quasar Framework v2 + Vue 3** |

---

## 2. SISTEMA DE TOKENS

### 2.1 Tokens Globais (98 tokens)
Localização: `packages/core/tokens/globals.scss`

| Família | Tokens | Descrição |
|---|---|---|
| Gray scale | 10 | gray-50 → gray-950 |
| Hub brand | ~12 | hub-50 → hub-950 (laranja) |
| Water brand | ~12 | water-50 → water-700+ (azul) |
| Waste brand | ~12 | waste-50+ (verde) |
| Base palette | ~52 | Cores primitivas neutras e de feedback |

### 2.2 Tokens Semânticos (854 tokens)
Localização: `packages/core/tokens/semantic/`

| Arquivo | Categoria | Propósito |
|---|---|---|
| `_actions.scss` | Ações | Cores de interação (primary, secondary, tertiary, accent) |
| `_text.scss` | Texto | Hierarquia tipográfica e cores de texto |
| `_surfaces.scss` | Superfícies | Backgrounds, cards, elevações |
| `_borders.scss` | Bordas | Cores de borda por contexto |
| `_border-widths.scss` | Espessuras | `--dss-border-width-{xs,sm,md,lg}` |
| `_feedback.scss` | Feedback | success, error, warning, info |
| `_opacity.scss` | Opacidade | `--dss-opacity-{8,16,24,38,60,76,disabled,active,selected}` |
| `_shadows.scss` | Sombras | `--dss-shadow-{sm,md,lg,xl}` + elevações |
| `_z-index.scss` | Z-Index | Camadas: tooltip, modal, overlay, sticky |
| `_motion.scss` | Animação | `--dss-duration-{100,200,300,500,slowest}` + easing curves |
| `_spacing.scss` | Espaçamento | 97 tokens — 0 a 60rem (base 4px) |
| `_breakpoints.scss` | Breakpoints | xs, sm, md, lg, xl, 2xl responsivos |
| `_gradients.scss` | Gradientes | Gradientes DSS pré-compostos |
| `accessibility/_contrast.scss` | Contraste | Ratios WCAG integrados |
| `accessibility/_focus.scss` | Foco | `--dss-focus-ring-{width,color,offset}` |
| `accessibility/_sizing.scss` | Dimensões | `--dss-touch-target-{xs,sm,md,lg,xl}` · `--dss-compact-control-height-*` |

### 2.3 Tokens de Brand
Localização: `packages/core/tokens/brand/`

Ativação via `[data-brand="hub|water|waste"]` no elemento raiz.

| Brand | Token primário | Ativação |
|---|---|---|
| Hub | `--dss-brand-primary` → laranja Hub | `data-brand="hub"` |
| Water | `--dss-brand-primary` → azul Water | `data-brand="water"` |
| Waste | `--dss-brand-primary` → verde Waste | `data-brand="waste"` |

### 2.4 Dark Mode
- **Mecanismo:** `[data-theme="dark"]` no `<html>`
- **Arquivo:** `packages/core/tokens/themes/dark/_colors.scss`
- **Padrão Sass:** `dss-theme-color($light, $dark)` — resolve automaticamente
- **Cobertura:** Tokens de superfície, texto, bordas e ações possuem variantes dark nativas

---

## 3. BIBLIOTECA DE COMPONENTES

### 3.1 Componentes Base (77)
Localização: `packages/core/components/base/`

**Ações e Controles**
- DssButton ★ · DssChip ★ · DssBtnGroup · DssBtnDropdown · DssBtnToggle · DssFab · DssFabAction

**Indicadores e Avatares**
- DssBadge ★ · DssAvatar · DssIcon · DssSpinner · DssRating · DssKnob · DssTooltip

**Formulários**
- DssField · DssInput · DssSelect · DssTextarea · DssFile · DssCheckbox · DssRadio · DssToggle · DssOptionGroup · DssSlider · DssRange

**Progresso e Feedback**
- DssLinearProgress · DssCircularProgress · DssSkeleton · DssInnerLoading · DssAjaxBar

**Banners e Barras**
- DssBanner · DssBar

**Navegação**
- DssTabs · DssTab · DssTabPanels · DssTabPanel · DssRouteTab · DssBreadcrumbs · DssBreadcrumbsEl · DssPagination · DssExpansionItem · DssMenu

**Stepper**
- DssStepper · DssStep

**Listas e Estrutura**
- DssList · DssItem · DssItemSection · DssItemLabel · DssSlideItem · DssSeparator · DssSpace

**Cartões e Superfícies**
- DssCard · DssToolbar · DssToolbarTitle · DssMarkupTable

**Timeline**
- DssTimeline · DssTimelineEntry

**Árvore**
- DssTree

**Mídia**
- DssImg · DssVideo · DssParallax

**Scroll e Layout Auxiliar**
- DssScrollArea · DssSplitter · DssVirtualScroll · DssInfiniteScroll · DssPullToRefresh · DssResponsive

**Layout Estrutural**
- DssLayout · DssHeader · DssFooter · DssDrawer · DssPage · DssPageContainer · DssPageSticky · DssPageScroller

**Popups**
- DssPopupProxy

★ = Golden Reference

### 3.2 Componentes Compostos (12)
Localização: `packages/core/components/composed/`

| Componente | Descrição |
|---|---|
| DssDialog | Modal com animação, foco preso, ARIA dialog |
| DssTable | Tabela avançada: sort, filter, pagination, selection |
| DssCarousel + DssCarouselSlide | Carrossel acessível |
| DssBottomSheet | Sheet mobile-first |
| DssChatMessage | Mensagens de chat |
| DssColorPicker | Seletor de cores |
| DssDatePicker | Seletor de data |
| DssTimePicker | Seletor de horário |
| DssForm | Formulário com validação integrada |
| DssPopupEdit | Edição inline com popup |
| DssUploader | Upload de arquivos com preview |

### 3.3 Componentes de Stress-Test (2)
Localização: `packages/core/components/stress-test/`

- **DssDataCard** — Card de dados complexo com múltiplos estados
- **DssCadrisCard** — Card especializado para módulo Cadris

### 3.4 Status de Certificação

| Status | Quantidade |
|---|---|
| conformant (meta.json) | 28 |
| Certificados com Selo DSS v2.2 | **87** |
| Fase 1 completa | 19/19 (100%) |
| Fase 2 completa | 68/68 (100%) |

---

## 4. ARQUITETURA DO SISTEMA

### 4.1 Posicionamento Técnico
DSS não é uma biblioteca standalone. É uma **camada corporativa** construída sobre Quasar Framework v2, adicionando:
- Tokens semânticos proprietários
- Brandabilidade dinâmica
- Governança técnica e visual
- Acessibilidade WCAG 2.1 AA embutida

### 4.2 Arquitetura de 4 Camadas (por componente)

```
DssNomeComponente/
├── 1-structure/       ← Vue + TypeScript — estrutura semântica, DOM, lógica
├── 2-composition/     ← SCSS base — tokens genéricos, layout, reset
├── 3-variants/        ← SCSS variantes — density, tamanhos, variantes visuais
├── 4-output/          ← SCSS saídas — dark mode, brands, high contrast
├── composables/       ← Lógica reativa (useXxxClasses.ts)
├── types/             ← TypeScript interfaces (Props, Emits, Slots)
├── DssComponente.vue  ← Entry Point Wrapper (re-export puro)
├── DssComponente.module.scss ← Orchestrador SCSS (L2 → L3 → L4)
└── dss.meta.json      ← Metadados, auditoria, preview
```

### 4.3 Princípios Fundamentais (13 princípios)

| # | Princípio | Regra |
|---|---|---|
| 1 | Token First | Nenhum valor hardcoded — sempre `var(--dss-*)` |
| 2 | Sass Module System | `@use`/`@forward` · `@import` proibido |
| 3 | Cores Quasar | Cores via classes utilitárias (`bg-*`, `text-*`) |
| 4 | 4 Camadas | Nenhuma camada pode ser omitida |
| 5 | Acessibilidade | WCAG 2.1 AA obrigatório |
| 6 | Brandabilidade | Reação a `[data-brand]` |
| 7 | Altura genérica | `--dss-compact-control-height-{xs..lg}` |
| 8 | Pseudo-elementos | `::before` = touch target · `::after` = efeitos visuais |
| 9 | Brightness canônico | 0.85, 0.90, 0.92, 0.95, 1.10, 1.20 |
| 10 | Golden Model | Reference + Context + Sample |
| 11 | Entry Point Wrapper | Re-export puro obrigatório em raiz |
| 12 | CSS como Fonte de Verdade | CSS → meta.json → DSS_REFERENCIA_VISUAL |
| 13 | Cascade Layers | CSS de terceiros em `@layer` · DSS unlayered |

### 4.4 CSS Cascade Layers (Constituição #3)
```
Unlayered (DSS)       → VENCE TUDO (sem @layer)
@layer quasar { }     → CSS do Quasar (contido, inofensivo)
@layer vendor { }     → CSS de terceiros genéricos
```
O DSS não precisa de `!important` para vencer CSS de terceiros — a ausência de `@layer` no DSS garante precedência absoluta por spec CSS.

---

## 5. ACESSIBILIDADE

### 5.1 Conformidade
- **Padrão:** WCAG 2.1 AA (nível obrigatório em todos os componentes)
- **Cobertura:** Touch target, focus ring, contrast ratio, keyboard navigation, forced-colors

### 5.2 Implementação Técnica

| Recurso | Implementação |
|---|---|
| Touch target ≥ 48px | `::before` pseudo-elemento (reservado exclusivamente) |
| Focus ring visível | Mixin `dss-focus-ring()` com tokens `--dss-focus-ring-*` |
| Contraste de texto | Função `dss-contrast-ratio()` em Sass |
| High Contrast Mode | `@media (forced-colors: active)` em 4-output/_states.scss |
| prefers-reduced-motion | Mixin `dss-transition()` respeita automaticamente |
| ARIA | role, aria-label, aria-disabled, aria-live nas implementações |
| Navegação por teclado | Tab, Enter, Space, Arrow keys em todos interativos |
| Skip links | Mixin `dss-skip-link()` disponível |

### 5.3 Tokens de Acessibilidade
```scss
--dss-focus-ring-width       // Largura do anel de foco
--dss-focus-ring-color       // Cor do anel (varia por tipo: primary/error)
--dss-focus-ring-offset      // Offset do outline
--dss-touch-target-xs        // 32px
--dss-touch-target-sm        // 36px
--dss-touch-target-md        // 44px (mínimo WCAG)
--dss-touch-target-lg        // 52px
--dss-touch-target-xl        // 64px
--dss-opacity-disabled       // Opacidade para estados desabilitados
```

---

## 6. SISTEMA DE BRAND

### 6.1 Produtos Suportados

| Brand | Cor primária | Produto |
|---|---|---|
| **Hub** | Laranja | Sansys Hub — gestão central |
| **Water** | Azul | Sansys Water — gestão de água |
| **Waste** | Verde | Sansys Waste — gestão de resíduos |

### 6.2 Mecanismo de Ativação
```html
<!-- Ativa brand Hub em todo o escopo -->
<div data-brand="hub">
  <DssButton color="primary" />  <!-- usa hub-primary automaticamente -->
</div>
```

### 6.3 Fallback Semântico
Componentes sem `[data-brand]` ativo usam tokens semânticos como fallback (`--dss-action-primary`). Isso garante funcionamento visual mesmo sem brand definido.

---

## 7. GOVERNANÇA

### 7.1 Modelo Golden
Três conceitos distintos de referência:

| Conceito | Componente | Propósito |
|---|---|---|
| **Golden Reference** | DssChip (interativo) · DssBadge (não-interativo) | Padrão global de categoria |
| **Golden Context** | Varia por componente auditado | Baseline específica de auditoria |
| **Golden Sample** | DssButton | Template de documentação (Template 13.1) |

### 7.2 Processo de Certificação (Gate)

**Gate Estrutural (Bloqueante)**
- 4 camadas existem em completude
- Entry Point Wrapper presente (re-export puro)
- Orchestrador SCSS importa L2 → L3 → L4 em ordem
- Barrel export (index.js) completo
- dss.meta.json com campos obrigatórios

**Gate Técnico (Bloqueante)**
- Zero valores hardcoded
- Cores via classes utilitárias
- Estados implementados (hover, focus, active, disabled)
- WCAG 2.1 AA validado

**Gate Documental (Bloqueante para Selo)**
- Tokens listados com nomes exatos
- README completo (quick start, modos, exemplos mínimo 3)
- Documentação normativa (Template 13.1, 13 seções)
- API Reference atualizada
- Arquivo de testes com cobertura mínima

### 7.3 dss.meta.json — Estrutura por Componente
```json
{
  "component": "DssNomeComponente",
  "status": "conformant | pending-audit | draft",
  "goldenReference": "DssChip | DssBadge",
  "goldenContext": "DssButton | DssCheckbox | ...",
  "auditHistory": [...],
  "previewGroup": "actions | indicators | forms | ...",
  "defaultPreview": {
    "demoSlots": {...}
  },
  "visualProperties": {...}
}
```

### 7.4 Pre-prompts de Implementação
- **82 pre-prompts** documentados em `docs/governance/pre-prompts/`
- Um por componente — define contexto, escopo, restrições e critérios
- Garante consistência entre agentes IA diferentes
- Template validado via MCP (`validate_pre_prompt`)

---

## 8. MCP SERVER

### 8.1 Identificação
- **Package:** `@sansys/dss-mcp`
- **Localização:** `packages/mcp/`
- **Contrato:** Read-Only Foundation (Phase 1) — exceto `record_audit_event`
- **Protocolo:** Model Context Protocol (MCP)

### 8.2 Ferramentas (14 tools)

| Tool | Categoria | Função |
|---|---|---|
| `query_component` | Query | Informações detalhadas de qualquer componente |
| `query_token` | Query | Busca tokens em DSS_TOKEN_REFERENCE.md |
| `check_compliance` | Validação | Conformidade com regras DSS |
| `validate_component_code` | Validação | Violações arquiteturais (4 layers, Token First) |
| `validate_pre_prompt` | Validação | 5 eixos obrigatórios de pre-prompt |
| `validate_visual_contract` | Validação | Contrato visual (fase 5) |
| `validate_grid_layout` | Validação | Grid/layout contra tokens DSS |
| `suggest_token_replacement` | Sugestão | Tokens DSS para valores hardcoded |
| `generate_component_scaffold` | Geração | Boilerplate 4-layer completo |
| `generate_pre_prompt_template` | Geração | Template de pre-prompt com 5 eixos |
| `get_todo_list_status` | Status | Progresso de implementação por fase |
| `record_audit_event` | Escrita | Registra evento em `auditHistory` (único write autorizado) |
| `describe_grid_inspector` | Documentação | Manual completo do Grid Inspector |

### 8.3 Integração
O MCP DSS conecta-se a agentes IA (Claude Code, Cursor, etc.) para:
- Validação em tempo real durante desenvolvimento
- Geração de boilerplate conforme padrões DSS
- Consulta ao catálogo de tokens e componentes
- Rastreabilidade de auditorias

---

## 9. GRID INSPECTOR

### 9.1 Identificação
- **Package:** `@sansys/grid-inspector`
- **Localização:** `packages/grid-inspector/`
- **Distribuição:** NPM package + Bookmarklet (zero install)
- **Compatibilidade:** Vue, React, Angular, HTML puro

### 9.2 Funcionalidades (5 fronts)

| Front | Funcionalidade |
|---|---|
| **Visual Debugger** | Overlay de grid com controles flutuantes |
| **Layout Editor** | Edição em tempo real das configurações |
| **Token Validator** | Validação contra tokens Sansys DSS |
| **Brand Switcher** | Troca dinâmica hub · water · waste |
| **CI Reporter** | Relatórios para pipeline CI/CD |

### 9.3 Interface de Configuração
```typescript
interface GridInspectorConfig {
  overlay: {
    columns: number;      // colunas do grid
    gutter: string;       // espaçamento entre colunas
    margin: string;       // margem lateral
    visible: boolean;     // visibilidade do overlay
  };
  layout: { ... };
  brand?: 'hub' | 'water' | 'waste';
  theme: 'light' | 'dark';
}
```

---

## 10. SANDBOX / PLAYGROUND

### 10.1 Identificação
- **Package:** `@sansys/sandbox`
- **Localização:** `apps/sandbox/`
- **Tecnologia:** Vite + Vue 3 + Quasar

### 10.2 Páginas de Teste Disponíveis

| Página | Componentes Cobertos |
|---|---|
| TestIndex.vue | Índice de navegação |
| TestButton.vue | DssButton — todos os estados, variantes, brands |
| TestBadge.vue | DssBadge — tamanhos, cores, posições |
| TestAvatar.vue | DssAvatar — tipos, tamanhos, status |
| TestCard.vue | DssCard + sections + actions |
| TestTokens.vue | Visualização de tokens |
| TestSuite.vue | Suite completa multi-componente |
| TestDefaultPreview.vue | Preview padrão data-driven |
| TestPageComplexity.vue | Stress test de complexidade |
| TestCadrisCard.vue | DssCadrisCard especializado |
| TestDataCard.vue | DssDataCard de dados |

### 10.3 Sistema de Preview Data-Driven
- **Workflow:** `dss.meta.json` → campo `defaultPreview.demoSlots` → `DemoRenderer.vue`
- **Benefício:** Previews consistentes geradas automaticamente a partir dos metadados
- **Sync:** `npm run sync:visual-contract` atualiza `DSS_REFERENCIA_VISUAL_ANALISE.md`

---

## 11. UTILITÁRIOS SCSS

### 11.1 Mixins Principais (9 mixins — `_mixins.scss`)

| Mixin | Função |
|---|---|
| `dss-focus-ring($type, $offset)` | Focus ring WCAG AA com tipos (primary/error) |
| `dss-touch-target($size)` | Touch target mínimo 44px via `::before` |
| `dss-transition($props, $speed)` | Transições com `prefers-reduced-motion` |
| `dss-button-variant($variant, $mode)` | Variantes de botão brandáveis |
| `dss-input-base` | Base para todos os inputs |
| `dss-card($brand)` | Cards com suporte a brand |
| `dss-text($size, $weight)` | Tipografia acessível |
| `dss-visually-hidden` | Ocultar visualmente (manter para screen readers) |
| `dss-loading-state($type)` | Estados de carregamento acessíveis |

### 11.2 Funções Sass (10 funções — `_functions.scss`)

| Função | Retorna |
|---|---|
| `dss-rem($px)` | Valor em rem |
| `dss-contrast-ratio($c1, $c2)` | Ratio WCAG |
| `dss-luminance($color)` | Luminância relativa |
| `dss-is-contrast-valid($text, $bg, $size)` | boolean |
| `dss-darken-accessible($color, $amount)` | Cor preservando contraste |
| `dss-lighten-accessible($color, $amount)` | Cor preservando contraste |
| `dss-gradient-with-opacity($color, $opacity, $dir)` | Gradiente |
| `dss-brand-token($token, $brand)` | Token por brand |
| `dss-responsive-spacing($base, $mobile, $desktop)` | Espaçamento responsivo |
| `dss-theme-color($light, $dark)` | Cor por tema |

### 11.3 Mixins de Acessibilidade (7 mixins — `_accessibility-mixins.scss`)

`dss-validate-contrast` · `dss-skip-link` · `dss-aria-live` · `dss-loading-state` · `dss-accessible-tooltip` · `dss-accessible-modal` · `dss-accessible-form`

---

## 12. TESTES E QUALIDADE

### 12.1 Cobertura de Testes

| Suite | Tipo | Total | Status |
|---|---|---|---|
| Unitários por componente | Vitest + @vue/test-utils | 88 arquivos | ✅ |
| E2E — brand-switching | Playwright | 4 testes | ✅ |
| E2E — cascade-layers | Playwright | 3 testes | ✅ |
| E2E — token-resolution | Playwright | 12 testes | ✅ |
| E2E — utility-classes | Playwright | 10 testes | ✅ |
| Estáticos — bridge-strings | Vitest | 11 testes | ✅ |
| Estáticos — layer-structure | Vitest | 4 testes | ✅ |

**Total: 29 E2E + 15 estáticos + 88 unitários = 132 testes**

### 12.2 O Que os Testes Cobrem
- **Brand switching:** `[data-brand]` propaga tokens corretamente
- **Cascade layers:** DSS CSS vence Quasar via unlayered (sem `!important`)
- **Token resolution:** tokens semânticos resolvem para valores corretos
- **Utility classes:** `.bg-*`, `.text-*` usam tokens DSS, não valores Quasar
- **Bridge strings:** strings de ponte CSS → meta.json válidas
- **Layer structure:** estrutura de 4 camadas respeitada

---

## 13. DOCUMENTAÇÃO DO SISTEMA

### 13.1 Hierarquia Normativa

| Nível | Documento | Propósito |
|---|---|---|
| L1 | CLAUDE.md | Regras operacionais para agentes IA |
| L1 | PRD_DSS.md | Papel estratégico e critérios de qualidade |
| L1 | DSS_ARCHITECTURE.md | Estrutura do sistema, 13 princípios |
| L1 | DSS_COMPONENT_ARCHITECTURE.md | Arquitetura de 4 camadas |
| L1 | DSS_REFERENCIA_VISUAL_ANALISE.md | Contrato Visual Canônico (auto-gerado) |
| L2 | DSS_TOKEN_REFERENCE.md | Catálogo oficial de tokens |
| L2 | DSS_IMPLEMENTATION_GUIDE.md | Guia de implementação passo a passo |
| L2 | DSS_MONOREPO_PATH_MAP.md | Mapeamento canônico de paths |

### 13.2 Por Componente (estrutura completa)
Cada componente inclui:
- `DssComponente.md` — documentação normativa (Template 13.1, 13 seções)
- `DSSCOMPONENTE_API.md` — API Reference completa
- `README.md` — Quick start com exemplos
- `DssComponente.example.vue` — Exemplos interativos
- `dss.meta.json` — Metadados, audit trail, preview
- `DssComponente.test.js` — Testes unitários

---

## 14. MONOREPO

### 14.1 Workspaces

| Workspace | Package | Conteúdo |
|---|---|---|
| `packages/core` | `@sansys/design-system` | Biblioteca principal (componentes, tokens, utils) |
| `packages/mcp` | `@sansys/dss-mcp` | MCP Server — 14 ferramentas de IA |
| `packages/grid-inspector` | `@sansys/grid-inspector` | Inspector visual de grid |
| `apps/sandbox` | `@sansys/sandbox` | Playground interativo + testes regression |
| `apps/docs-portal` | `@sansys/docs-portal` | Portal de documentação |

### 14.2 Scripts Principais
```bash
npm run sandbox:dev       # Rodar playground
npm run core:build        # Build da biblioteca
npm run mcp:start         # Iniciar MCP Server
npm run test:regression   # Todos os testes
npm run sync:all          # Sincronizar metadados
npm run setup:hooks       # Instalar git hooks (pre-commit)
```

---

## 15. POSSIBILIDADES DE EVOLUÇÃO

### Fase 3 — Em andamento
- Componentes complexos de alta composição
- Stress tests validando consistência entre múltiplos componentes
- Automação de auditoria via MCP

### Próximas Fronteiras Técnicas

| Área | Possibilidade |
|---|---|
| **Tokens** | Migração completa para `@use`/`@forward` em semantic/ e brand/ |
| **Figma MCP** | Sync bidirecional Figma ↔ DSS (tokens e componentes) |
| **Testing** | Testes visuais automatizados (Percy/Chromatic) |
| **Storybook** | Portal de documentação interativo gerado a partir de meta.json |
| **A11y CI** | axe-core no pipeline de PR |
| **Design Tokens** | W3C Design Token spec (DTCG JSON format) |
| **Dark Mode** | Sistema de temas expandido (alto contraste, daltonismo) |
| **Motion** | prefers-reduced-motion mais granular |
| **Analytics** | Telemetria de uso de componentes em produção |
| **AI Governance** | Validação automática de conformidade por LLM via MCP |

---

*Catálogo gerado em 08 de Junho de 2026 — Design System Sansys v2.2*
