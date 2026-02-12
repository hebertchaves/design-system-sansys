# SELO DE CONFORMIDADE DSS v2.2

---

## Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssCard (+ DssCardSection, DssCardActions) |
| **Versao do Componente** | 1.0.0 |
| **Versao do DSS** | v2.2 |
| **Classificacao** | Superficie estrutural composta — Container / Layout |
| **Status Pre-Selo** | Pre-normativo |
| **Golden Component de Referencia** | DssChip (Compact Control interativo, Selo DSS v2.2) |
| **Golden Component Secundario** | DssBadge (Compact Control nao interativo, Selo DSS v2.2) |
| **Data de Emissao** | 12 de Fevereiro de 2026 |
| **Auditor** | Claude Code (Modo Auditor DSS) |

---

## Historico de Auditoria

| Fase | Data | Resultado |
|------|------|-----------|
| Auditoria Inicial | 12 Fevereiro 2026 | 6 NCs identificadas (2 bloqueantes, 4 nao-bloqueantes), 6 GAPs |
| Correcao Tecnica | 12 Fevereiro 2026 | 6 NCs corrigidas, 5 GAPs implementados, 1 reserva mantida |
| Re-Auditoria | 12 Fevereiro 2026 | 0 NCs bloqueantes, 4 NCs residuais (exemplo/meta) |
| Correcao Residual | 12 Fevereiro 2026 | 4 NCs residuais corrigidas, 0 regressoes |
| Auditoria Final | 12 Fevereiro 2026 | NC = 0, Aprovado |

---

## Nao-Conformidades

**Nenhuma nao-conformidade encontrada.**

Todas as nao-conformidades identificadas durante o ciclo de auditoria foram corrigidas e verificadas:

| NC | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| NC-01 | Token inexistente `--dss-action-primary-rgb` em `_outlined.scss` | Substituido por tokens existentes `--dss-surface-hover` e `--dss-surface-active` | `_outlined.scss:18,24` — `grep "action-primary-rgb"` = 0 resultados |
| NC-02 | Frases proibidas "100% compativel" em 6 arquivos | Substituidas por "API governada pelo Design System" em todos os arquivos | `grep -ri "100%.*compat"` = 0 resultados em todo o diretorio |
| NC-03 | Valores `rgba(255,255,255,...)` hardcoded em dark mode sem excecao formal | Formalizados como excecoes EXC-01 e EXC-02 com IDs, justificativa e registro em `dss.meta.json` | `_states.scss:17-30` — comentarios EXC-01/EXC-02 inline |
| NC-04 | `inheritAttrs: false` ausente em DssCardSection e DssCardActions | Adicionado `inheritAttrs: false` em `defineOptions` + `v-bind="$attrs"` no template | `DssCardSection.ts.vue:38`, `DssCardActions.ts.vue:39` |
| NC-05 | Arquivo API com nome placeholder `DSSNOMECOMPONENTE_API.md` | Criado `DSSCARD_API.md` com conteudo completo (props, eventos, slots, tipos, tokens, excecoes) | `DSSCARD_API.md` — 249 linhas |
| NC-06 | `dss.meta.json` ausente | Criado seguindo formato DssChip/DssAvatar com metadata de governanca completa | `dss.meta.json` — 67 linhas, 7 excecoes |
| NC-R01 | Valores hex hardcoded em `DssCard.example.vue` (`#667eea`, `#764ba2`, `#1a1a1a`) | Substituidos por tokens DSS (`--dss-action-primary`, `--dss-action-secondary`, `--dss-surface-dark`) | `grep "#[0-9a-fA-F]" DssCard.example.vue` = 0 resultados |
| NC-R02 | `2px` hardcoded em `DssCard.example.vue` scoped styles | Substituido por `var(--dss-border-width-thin)` | `DssCard.example.vue:377` |
| NC-R03 | `dss.meta.json` faltando EXC-04/05/06 (forced-colors) | Adicionados EXC-04, EXC-05, EXC-06, EXC-07 ao array `exceptions` | `dss.meta.json:42-65` — 7 excecoes, consistente com `DssCard.md` secao 16 |
| NC-R04 | `color: white` e `rgba(255,255,255,0.2)` no scoped style do exemplo | Substituidos por `var(--dss-text-inverse)` e `var(--dss-gray-700)` | `DssCard.example.vue:406-407` |

---

## Ressalvas (nao-bloqueantes)

As ressalvas abaixo foram identificadas e aceitas. Nenhuma impede a emissao do selo.

| ID | Descricao | Justificativa | Monitoramento |
|----|-----------|---------------|---------------|
| R-01 | Tokens de brand usam referencia numerica (`--dss-hub-600`, `--dss-water-500`, `--dss-waste-600`) | Tokens semanticos de brand (`--dss-{brand}-primary`) nao existem no catalogo de tokens DSS. Uso numerico e tecnicamente correto com infraestrutura atual. | Migrar quando tokens semanticos de brand forem oficializados. |
| R-02 | Mixins DSS (`dss-focus-ring`, `dss-touch-target`) nao utilizados | DssCard e superficie estrutural, nao Compact Control. Mixin `dss-transition` e utilizado. Mixins sao facilitadores, nao mandatorios. | Avaliar se mixins sao aplicaveis a superficies em futuras revisoes. |
| R-03 | Sem testes unitarios/integracao | Nao impacta conformidade DSS. Infraestrutura de testes pendente de configuracao. | Implementar quando test framework for configurado. |

> Nenhuma ressalva impede a concessao do selo.

---

## Conformidades Confirmadas

### Tokens — CONFORME

- Zero tokens inexistentes
- Zero tokens especificos de componente (`--dss-card-*` = 0 resultados)
- Tokens de surface: `--dss-surface-default`, `--dss-surface-dark`, `--dss-surface-hover`, `--dss-surface-active`
- Tokens de elevacao: `--dss-elevation-1`, `--dss-elevation-2`, `--dss-shadow-active`
- Tokens de spacing: `--dss-spacing-2`, `--dss-spacing-4`, `--dss-spacing-6`
- Tokens de borda: `--dss-border-width-thin`, `--dss-border-width-thick`, `--dss-border-width-md`
- Tokens de radius: `--dss-radius-lg`
- Tokens de texto: `--dss-text-body`, `--dss-text-inverse`
- Tokens de acao: `--dss-action-primary`, `--dss-action-primary-deep`
- Tokens de focus: `--dss-focus-shadow-primary`
- Tokens de cor: `--dss-gray-200`, `--dss-gray-300`, `--dss-gray-700`
- Tokens de brand: `--dss-hub-{300,400,600,700}`, `--dss-water-{200,400,500}`, `--dss-waste-{200,500,600}`
- Tokens de motion: `dss-transition` mixin com parametro `'fast'`
- 7 excecoes documentadas (EXC-01 a EXC-07) com ID, valor, arquivo e racional
- Zero valores hardcoded nao-documentados em `.scss` e `.vue`

### Touch Target — CONFORME (Nao Aplicavel)

- DssCard e superficie estrutural (container), nao Compact Control
- Touch target via `::before` nao se aplica a superficies
- Cards clickable utilizam `-webkit-tap-highlight-color: transparent` para remover highlight mobile
- Cards clickable recebem `cursor: pointer` e `tabindex="0"` para interacao
- `::before` nao utilizado (nenhuma violacao da convencao de pseudo-elementos)
- `::after` nao utilizado (nenhuma violacao da convencao de pseudo-elementos)
- Decisao alinhada com classificacao do componente: nao e Compact Control

### Arquitetura — CONFORME

- Layer 1 (Structure): `1-structure/DssCard.ts.vue`, `DssCardSection.ts.vue`, `DssCardActions.ts.vue` — TypeScript + Composition API, 3 subcomponentes
- Layer 2 (Composition): `2-composition/_base.scss` — tokens genericos, layout, typography, dividers
- Layer 3 (Variants): `3-variants/_elevated.scss`, `_flat.scss`, `_bordered.scss`, `_outlined.scss` — 4 variantes separadas
- Layer 4 (Output): `4-output/_states.scss` (dark mode, focus, forced-colors) + `4-output/_brands.scss` (3 brands + dark)
- Orchestrador: `DssCard.module.scss` (3 `@use` imports com aliases: composition, variants, output)
- Entry points: `DssCard.vue`, `DssCardSection.vue`, `DssCardActions.vue` (re-exports para Layer 1)
- Tipos: `types/card.types.ts` com interfaces completas (CardProps, CardEmits, CardSectionProps, CardActionsProps)
- Composables: 5 composables (`useCardClasses`, `useCardAttrs`, `useCardActions`, `useCardActionsClasses`, `useCardSectionClasses`)
- Compilado: `DssCard.module.css` — 3120 linhas CSS, zero erros
- Nenhuma camada omitida
- Nenhuma heranca indevida
- Nenhum acoplamento com outros componentes DSS

### Estados — CONFORME

| Estado | SCSS | Vue/ARIA | Evidencia |
|--------|------|----------|-----------|
| default | `_base.scss:14-44` | Template raiz | Surface com background, radius, overflow, transition |
| hover | `_elevated.scss:8-10`, `_outlined.scss:10-14` | — | Elevacao aumentada (elevated), borda colorida (outlined) |
| active | `_outlined.scss:17-20` | — | `border-color: var(--dss-action-primary-deep)`, `background-color: var(--dss-surface-active)` |
| focus | `_states.scss:44-47` | `tabindex="0"` | `box-shadow: var(--dss-focus-shadow-primary)` via `:focus-visible` |
| dark | `_states.scss:11-36` | Prop `dark` | `--dss-surface-dark`, `--dss-text-inverse`, dividers EXC-01/EXC-02 |
| clickable | `_base.scss:36-38`, `_states.scss:42-51` | `role="article"`, `tabindex="0"` | Cursor pointer, tap-highlight, focus ring, keyboard handlers |
| disabled | — | — | Nao aplicavel: superficie estrutural. Disabled pertence aos componentes internos. |
| loading | — | — | Nao aplicavel: superficie estrutural. Loading pertence aos componentes internos. |
| error | — | — | Nao aplicavel: superficie estrutural. Error pertence aos componentes internos. |
| indeterminate | — | — | Nao aplicavel: superficie nao possui estado intermediario. |

### Acessibilidade — CONFORME

| Criterio WCAG | Status | Implementacao |
|---------------|--------|---------------|
| 1.4.3 Contraste Minimo (AA) | CONFORME | Background vs texto com contraste adequado em todas as variantes |
| 2.1.1 Teclado (A) | CONFORME | Cards clickable: Tab, Enter, Space. `tabindex="0"` e handlers de teclado |
| 2.4.7 Foco Visivel (AA) | CONFORME | `:focus-visible` com `box-shadow: var(--dss-focus-shadow-primary)` |
| 3.2.4 Identificacao Consistente (AA) | CONFORME | Padroes visuais consistentes em todas as variantes |
| 4.1.2 Nome, Funcao, Valor (A) | CONFORME | `role="article"` em cards clickable, semantica HTML correta |
| `prefers-reduced-motion` | CONFORME | `transition: none` em `.dss-card` (orchestrador) |
| `prefers-contrast: high` | CONFORME | `border: var(--dss-border-width-md) solid currentColor` (orchestrador) |
| `forced-colors: active` | CONFORME | System colors: `ButtonText`, `Highlight`, `HighlightText` — EXC-04/05/06 |
| Dark mode | CONFORME | `[data-theme="dark"]`, prop `dark`, tokens `--dss-surface-dark`, `--dss-text-inverse` |
| `-webkit-tap-highlight-color` | CONFORME | `transparent` em `.dss-card--clickable` |

### Documentacao — CONFORME

- `DssCard.md` — Documentacao principal completa (16 secoes, Template 13.1 + secoes Fase 2)
- `README.md` — Quick Reference com arquitetura e exemplos
- `DSSCARD_API.md` — API Reference (props, eventos, slots, tipos, tokens, excecoes, governanca)
- `DssCard.example.vue` — Showcase visual (11 secoes: uso basico, variantes, clickable, brandabilidade, horizontal, multiplas secoes, dark mode, grid responsivo, square, alinhamentos, contexto data-brand)
- `dss.meta.json` — Metadados de governanca (7 excecoes, estados aplicaveis/nao aplicaveis, subcomponentes)
- API documentada = API implementada (5 props DssCard, 1 prop DssCardSection, 2 props DssCardActions)
- 7 excecoes com rastreabilidade completa (ID, valor, arquivo, justificativa)
- Tokens listados com nomes exatos
- Secao 14: Comportamentos Implicitos (inheritAttrs, forwarding, estados nao aplicaveis)
- Secao 15: Paridade com Golden Component (tabela comparativa DssCard vs DssChip, 12 aspectos)
- Secao 16: Excecoes Documentadas (EXC-01 a EXC-07 com IDs formais)
- Anti-patterns documentados (7 usos incorretos)
- Nenhuma linguagem absoluta proibida ("100% compativel", "Golden Sample")
- Composition API + TypeScript em todos os componentes e exemplos

---

## Decisoes de Governanca Registradas

| Decisao | Valor | Justificativa |
|---------|-------|---------------|
| Golden Component | DssChip (primario), DssBadge (secundario) | Referencia estrutural mais proxima; DssCard nao e Compact Control |
| Touch target | Nao aplicavel | Superficie estrutural, nao Compact Control. Cards clickable usam `tabindex` e teclado. |
| Tokens de altura | Nao utiliza tokens de compact control | DssCard nao e controle compacto; dimensoes definidas por conteudo |
| Tokens de brand | Numericos (`--dss-hub-600`, etc.) | Tokens semanticos de brand inexistentes no catalogo DSS atual |
| Layer 3 (Variants) | 4 variantes (elevated, flat, bordered, outlined) | Variantes visuais completas para todos os contextos de uso |
| Estados nao aplicaveis | disabled, loading, error, indeterminate | Superficie estrutural; estados pertencem aos componentes internos |
| Dark mode dividers | `rgba(255,255,255,0.12)` — EXC-01 | Material Design standard; sem token DSS equivalente |
| Dark mode borders | `rgba(255,255,255,0.2)` — EXC-02 | Bordas em dark mode requerem white alpha; sem token equivalente |
| Square variant | `border-radius: 0` — EXC-03 | Valor 0 e semanticamente "sem radius", nao hardcoded visual |
| Opacidade disabled | Nao utilizada | DssCard nao implementa disabled (responsabilidade dos filhos) |

---

## Veredito Final

| Criterio | Status |
|----------|--------|
| Tokens | CONFORME |
| Touch Target | CONFORME (Nao Aplicavel) |
| Arquitetura | CONFORME |
| Estados | CONFORME |
| Acessibilidade | CONFORME |
| Documentacao | CONFORME |

---

## CONFORME — SELO DSS v2.2 CONCEDIDO

**Componente:** DssCard (+ DssCardSection, DssCardActions)
**Versao:** 1.0.0
**Data de Emissao:** 12 de Fevereiro de 2026
**Classificacao:** Superficie estrutural composta — Container / Layout — Fase 1

---

## Imutabilidade

Este documento e historico e imutavel apos emissao. Nao pode ser editado, reinterpretado ou complementado. Qualquer alteracao futura no componente DssCard invalida este selo. Nova auditoria devera ser conduzida e novo selo emitido em novo arquivo.

**Caminho canonico deste arquivo:**
```
DSS/docs/Compliance/seals/DssCard/DSSCARD_SELO_v2.2.md
```

---

## Arquivos Auditados

| Arquivo | Camada | Status |
|---------|--------|--------|
| `1-structure/DssCard.ts.vue` | Layer 1 | CONFORME |
| `1-structure/DssCard.vue` | Layer 1 (Entry) | CONFORME |
| `1-structure/DssCardSection.ts.vue` | Layer 1 | CONFORME |
| `1-structure/DssCardSection.vue` | Layer 1 (Entry) | CONFORME |
| `1-structure/DssCardActions.ts.vue` | Layer 1 | CONFORME |
| `1-structure/DssCardActions.vue` | Layer 1 (Entry) | CONFORME |
| `2-composition/_base.scss` | Layer 2 | CONFORME |
| `3-variants/_elevated.scss` | Layer 3 | CONFORME |
| `3-variants/_flat.scss` | Layer 3 | CONFORME |
| `3-variants/_bordered.scss` | Layer 3 | CONFORME |
| `3-variants/_outlined.scss` | Layer 3 | CONFORME |
| `3-variants/index.scss` | Layer 3 | CONFORME |
| `4-output/_states.scss` | Layer 4 | CONFORME |
| `4-output/_brands.scss` | Layer 4 | CONFORME |
| `4-output/index.scss` | Layer 4 | CONFORME |
| `DssCard.module.scss` | Orchestrador | CONFORME |
| `DssCard.module.css` | Compilado | CONFORME |
| `DssCard.module.css.map` | Source Map | CONFORME |
| `DssCard.vue` | Entry Point | CONFORME |
| `composables/useCardClasses.ts` | Composable | CONFORME |
| `composables/useCardAttrs.ts` | Composable | CONFORME |
| `composables/useCardActions.ts` | Composable | CONFORME |
| `composables/useCardActionsClasses.ts` | Composable | CONFORME |
| `composables/useCardSectionClasses.ts` | Composable | CONFORME |
| `composables/index.ts` | Barrel | CONFORME |
| `types/card.types.ts` | Tipos | CONFORME |
| `DssCard.md` | Doc Principal | CONFORME |
| `README.md` | Doc Onboarding | CONFORME |
| `DSSCARD_API.md` | Doc API | CONFORME |
| `DssCard.example.vue` | Showcase | CONFORME |
| `dss.meta.json` | Metadados | CONFORME |
| `index.js` | API Publica | CONFORME |
