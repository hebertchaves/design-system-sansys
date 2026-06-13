# SELO DSS v2.2 — DssRating

**Data de emissão:** 18 de Maio de 2026  
**Versão do componente:** 2.2  
**Auditor:** Claude Code (claude-sonnet-4-6)  
**Ciclos de auditoria:** 1  
**Não-conformidades:** 0

---

## Resultado

```
✅ APROVADO — DssRating recebe SELO DSS v2.2
```

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| Componente | `DssRating` |
| Família | Inputs Especializados |
| Fase | 2 — Nível 1 |
| Quasar Base | `QRating` |
| Golden Reference | `DssChip` |
| Golden Context | `DssKnob` |
| Status final | `compliant` |

---

## 2. Resumo Técnico

### Arquitetura

`DssRating` utiliza **QRating como root element** (EXC-Gate-01), sem wrapper div. O QRating gerencia internamente: navegação por teclado (ArrowLeft/Right, Home/End), drag por touch e mouse, ARIA (`role=slider`, `aria-valuemin/max/now`), e renderização de ícones via QIcon.

### Mecanismo de Cores (EX-Color-01)

Diferentemente do DssKnob (que usa EXC-Gate-02 com props fixas para garantir elementos SVG no DOM), o QRating **não adiciona classe `text-*` quando `color=undefined`**. Portanto, o DSS **não passa as props `color`, `color-selected` e `color-half`** ao QRating — governança 100% via CSS cascade, sem necessidade de EXC-Gate-02.

```scss
.dss-rating .q-rating__icon          { color: var(--dss-surface-muted); }
.dss-rating .q-rating__icon--active  { color: var(--dss-action-primary); }
.dss-rating .q-rating__icon--half    { color: var(--dss-action-primary); }
```

Precedente: DssCircularProgress (prop `color` não passada — governança 100% CSS DSS).

### Hover e Active (EX-Structural-01)

`filter: brightness(0.95)` para hover e `filter: brightness(0.90)` para active — valores canônicos da tabela CLAUDE.md Princípio 8. Aplicados em `.q-rating--editable .q-rating__icon--hovered`. Consistente com DssChip (Golden Reference) e DssKnob (Golden Context).

### Brand

Dual-selector para cada brand: `.dss-rating--brand-{b}` (prop direta) e `[data-brand="{b}"] .dss-rating` (herança via ancestral). Tokens idênticos ao DssKnob Golden Context: `--dss-hub-600`, `--dss-water-500`, `--dss-waste-600`.

### Touch Target

**Opção B — delegado ao consumer via prop `size`**. QRating não expõe mecanismo de touch target interceptável pelo DSS. Consumer responsável por `size="44px"` em contextos touch (WCAG 2.5.5 — documentado em `compositionRecommendations`).

---

## 3. Gates de Conformidade

### Gate Estrutural ✅

| Critério | Resultado |
|----------|-----------|
| 4 camadas presentes (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`) | ✅ |
| Entry Point Wrapper (`DssRating.vue`) — re-export puro | ✅ |
| Orchestrador SCSS (`DssRating.module.scss`) — L2→L3→L4 na ordem | ✅ |
| Barrel export (`index.js`) — componente, types e composables | ✅ |
| `dss.meta.json` — `goldenReference` e `goldenContext` declarados | ✅ |

### Gate Técnico ✅

| Critério | Resultado |
|----------|-----------|
| Token First — zero valores hardcoded | ✅ |
| Props `color/color-selected/color-half` bloqueadas — CSS cascade governa | ✅ |
| Estado hover — `filter: brightness(0.95)` (valor canônico) | ✅ |
| Estado focus — `outline` via `var(--dss-border-width-md)` + `var(--dss-focus-ring)` em `:focus-visible` | ✅ |
| Estado active — `filter: brightness(0.90)` (valor canônico) | ✅ |
| Estado disabled — `opacity: var(--dss-opacity-disabled)` via `[aria-disabled="true"]` | ✅ |
| Estado readonly — `cursor: default` via `:not(.q-rating--editable)` | ✅ |
| `::before` não usado para efeitos visuais | ✅ |
| `prefers-reduced-motion: reduce` — transition suprimido no root e `.q-rating__icon` (EX-States-01) | ✅ |
| `forced-colors: active` — SystemColor keywords para ícones SVG (EX-States-02) | ✅ |
| `prefers-contrast: more` — `outline-width: var(--dss-border-width-thick)` (EX-States-03) | ✅ |
| Brand dual-selector — prop + `[data-brand]` ancestral | ✅ |
| WCAG 2.1 AA — ARIA delegado ao QRating, foco visível, high contrast | ✅ |
| SCSS compila sem erros | ✅ |

### Gate Documental ✅

| Documento | Resultado |
|-----------|-----------|
| `DssRating.md` (Template 13.1 — Seções 1–12 incluindo Comportamentos Implícitos e Matriz de Composição) | ✅ |
| `DSSRATING_API.md` | ✅ |
| `README.md` | ✅ |
| `DssRating.example.vue` (6 cenários) | ✅ |
| `dss.meta.json` (6 exceptions, 12 tokens, 3 propsBlocked) | ✅ |

---

## 4. Exceções Registradas

| ID | Classificação | Resumo |
|----|---------------|--------|
| EXC-Gate-01 | Gate | QRating como root element — gerencia internamente ARIA, teclado, touch e QIcon |
| EX-Color-01 | Color | Props `color/color-selected/color-half` bloqueadas — CSS cascade governa sem EXC-Gate-02 (QRating não adiciona `text-*` com `color=undefined`) |
| EX-Structural-01 | Structural | `filter: brightness(0.95)` hover e `brightness(0.90)` active — valores canônicos (CLAUDE.md Princípio 8) |
| EX-States-01 | States | `prefers-reduced-motion: reduce` — transition suprimido no root e `.q-rating__icon` (QRating anima ícone no hover via transition — WCAG 2.3.3) |
| EX-States-02 | States | `forced-colors: active` — `ButtonText` para não-selecionados, `Highlight` para selecionados/hovered/focus — WCAG 1.4.11 |
| EX-States-03 | States | `prefers-contrast: more` — `outline-width: var(--dss-border-width-thick)` no foco (3px) |

---

## 5. Gaps Resolvidos (não-bloqueantes)

| # | Localização | Descrição | Resolução |
|---|-------------|-----------|-----------|
| GAP-01 | `DssRating.example.vue` | Inline styles com valores hardcoded nos wrappers de demonstração | Aceito como padrão sistêmico — DssKnob.example.vue (Golden Context, 0 NCs) tem padrão idêntico. Documentado em `compositionRecommendations`. |
| GAP-02 | `types/rating.types.ts` | Prop `size` sem restrição de valores (tipo `string` livre) | Aceito — QRating aceita qualquer CSS size string. Restrição documentada em `compositionRecommendations` (recomendação de `size >= '44px'` para touch). |
| GAP-03 | `pre_prompt_dss_rating.md` Eixo 1 | Ausência de "Fase 2 — Nível 1" e "Golden Context: DssKnob" | Corrigido — Seção 1 atualizada com Fase, Família, Golden Context e Quasar Base. |
| GAP-04 | `pre_prompt_dss_rating.md` Eixo 4 | Tokens fantasmas (`--dss-action-hub`, `--dss-color-negative`, `--dss-color-surface-default`, `--dss-color-on-surface`) | Corrigido — Seção 4 substituída por tabela com os 12 tokens reais da implementação. |
| GAP-05 | `pre_prompt_dss_rating.md` Eixo 2 | Ausência de formato ❌/✅ para EX-Color-01 (risco arquitetural central) | Corrigido — Seção 2 reescrita com bloco ❌ INCORRETO e ✅ CORRETO explícitos. |
| GAP-06 | `pre_prompt_dss_rating.md` Eixo 5 | Ausência de decisão explícita de Touch Target (Opção A ou B) | Corrigido — Seção 5 declara "Opção B — delegado ao consumer via prop `size`". |

---

## 6. Tokens Utilizados

| Token | Aplicação |
|-------|-----------|
| `--dss-action-primary` | Cor dos ícones selecionados e meia avaliação (neutro/sem brand) |
| `--dss-surface-muted` | Cor dos ícones não-selecionados |
| `--dss-border-width-md` | Espessura do outline de foco (estado normal) |
| `--dss-border-width-thick` | Espessura do outline de foco (prefers-contrast: more) |
| `--dss-focus-ring` | Cor do outline de foco (neutro/sem brand) |
| `--dss-opacity-disabled` | Opacidade no estado disabled (0.4) |
| `--dss-radius-sm` | border-radius do outline de foco |
| `--dss-duration-150` | Duração da transição de cor e filter |
| `--dss-easing-standard` | Easing da transição |
| `--dss-hub-600` | Ícones selecionados + foco (brand hub) |
| `--dss-water-500` | Ícones selecionados + foco (brand water) |
| `--dss-waste-600` | Ícones selecionados + foco (brand waste) |

---

## 7. Precedentes Aplicados

| Precedente | Princípio aplicado ao DssRating |
|------------|----------------------------------|
| DssChip (Golden Reference) | Focus outline (`var(--dss-border-width-md) solid var(--dss-focus-ring)`), `border-radius: var(--dss-radius-sm)`, `brightness(0.95/0.90)` |
| DssKnob (Golden Context) | QComponent como root (EXC-Gate-01), brand dual-selector, tokens hub-600/water-500/waste-600, EX-States-01/02/03 |
| DssCircularProgress | Prop `color` NÃO passada — governança 100% CSS DSS (EX-Color-01) |
| DssLinearProgress / DssKnob | `prefers-reduced-motion: reduce` — transições suprimidas (EX-States-01) |
| DssKnob / DssBadge | `prefers-contrast: more` — `outline-width: var(--dss-border-width-thick)` (EX-States-03) |
| DssKnob / DssCircularProgress | `forced-colors: active` — SystemColor keywords (EX-States-02) |

---

*Emitido em conformidade com o protocolo DSS Governance v2.2.*  
*Este selo certifica que DssRating está em conformidade com os gates Estrutural, Técnico e Documental do DSS.*
