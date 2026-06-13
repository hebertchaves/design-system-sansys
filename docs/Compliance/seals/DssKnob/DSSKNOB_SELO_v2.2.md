# SELO DSS v2.2 — DssKnob

**Data de emissão:** 18 de Maio de 2026  
**Versão do componente:** 2.2  
**Auditor:** Claude Code (claude-sonnet-4-6)  
**Ciclos de auditoria:** 1  
**Não-conformidades:** 0 (1 NC pré-ciclo corrigida antes da auditoria formal)

---

## Resultado

```
✅ APROVADO — DssKnob recebe SELO DSS v2.2
```

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| Componente | `DssKnob` |
| Família | Inputs Especializados |
| Fase | 2 — Nível 1 |
| Quasar Base | `QKnob` (via `QCircularProgress`) |
| Golden Reference | `DssChip` |
| Golden Context | `DssSlider` |
| Status final | `compliant` |

---

## 2. Resumo Técnico

### Arquitetura

`DssKnob` utiliza **QKnob como root element** (EXC-Gate-01), sem wrapper div. O QKnob gerencia internamente: navegação por teclado (ArrowUp/Down/Left/Right, PageUp/Down, Home/End), drag por touch e mouse, ARIA (`role=slider`, `aria-valuemin/max/now`), e representação SVG circular via QCircularProgress.

### Mecanismo de Cores (EXC-Gate-02)

QCircularProgress renderiza três `<circle>` SVG com atributos `stroke="currentColor"` / `fill="currentColor"`. CSS `stroke`/`fill` têm prioridade maior que atributos de apresentação SVG. DSS passa valores fixos ao QKnob (`color="primary"`, `track-color="grey-3"`, `center-color="white"`) para garantir presença dos elementos no DOM, e então sobrescreve via seletores CSS descendentes com tokens DSS.

### Foco (EXC-Focus-01)

QKnob usa `::before + box-shadow` para anel de foco visual (padrão Quasar). DSS reserva `::before` exclusivamente para touch target (WCAG 2.5.5). Resolução: `::before box-shadow` neutralizado via `box-shadow: none !important`; outline DSS aplicado em `:focus-visible` com `border-radius: 50%`. Padrão DssChip (Golden Reference).

### Brand

Dual-selector para cada brand: `.dss-knob--brand-{b}` (prop direta) e `[data-brand="{b}"] .dss-knob` (herança via ancestral). Somente `stroke` do arco de progresso e `outline-color` do foco variam por brand.

---

## 3. Gates de Conformidade

### Gate Estrutural ✅

| Critério | Resultado |
|----------|-----------|
| 4 camadas presentes | ✅ |
| Entry Point Wrapper | ✅ |
| Orchestrador SCSS (L2→L3→L4) | ✅ |
| Barrel export | ✅ |
| `dss.meta.json` completo | ✅ |

### Gate Técnico ✅

| Critério | Resultado |
|----------|-----------|
| Token First | ✅ |
| Cores via CSS stroke/fill | ✅ |
| Estados hover/focus/active/disabled/readonly | ✅ |
| `::before` exclusivo para touch target | ✅ |
| `prefers-contrast: more` | ✅ |
| `prefers-reduced-motion: reduce` | ✅ |
| `forced-colors: active` (SystemColor keywords) | ✅ |
| Brand dual-selector | ✅ |
| WCAG 2.1 AA | ✅ |
| MCP validate_component_code: `compliant` | ✅ |

### Gate Documental ✅

| Documento | Resultado |
|-----------|-----------|
| `DssKnob.md` (Template 13.1) | ✅ |
| `DSSKNOB_API.md` | ✅ |
| `README.md` | ✅ |
| `DssKnob.example.vue` (6 cenários) | ✅ |
| `dss.meta.json` (7 exceptions, 12 tokens, 4 blocked props) | ✅ |

---

## 4. Exceções Registradas

| ID | Classificação | Resumo |
|----|---------------|--------|
| EXC-Gate-01 | Gate | QKnob como root element (sem wrapper div) |
| EXC-Gate-02 | Gate | `color/track-color/center-color` fixos + CSS stroke/fill override |
| EXC-Focus-01 | Focus | `::before box-shadow` neutralizado; outline no root via `:focus-visible` |
| EX-Structural-01 | Structural | `filter: brightness(0.95/0.90)` no SVG container; `stroke-width: 3` unitless em SVG (sem token DSS) |
| EX-States-01 | States | `* { transition: none }` para suprimir animações internas do QKnob/QCircularProgress |
| EX-States-02 | States | `forced-colors: active` com SystemColor keywords para SVG stroke/fill |
| EX-States-03 | States | `prefers-contrast: more` — `stroke-width: 3` (SVG unitless, sem token) + `outline-width: var(--dss-border-width-thick)` |

---

## 5. NC pré-ciclo corrigida (antes da auditoria formal)

| Nº | Descrição | Arquivo | Resolução |
|----|-----------|---------|-----------|
| NC-01 | `outline-width: 3px` hardcoded em `_states.scss` | `4-output/_states.scss:31` | Substituído por `var(--dss-border-width-thick)` — token canônico 3px |

> NC-01 foi identificada e corrigida **antes** do início da Auditoria Ciclo 1 (via MCP validate_component_code). O ciclo formal verificou 0 NCs.

---

## 6. Tokens Utilizados

| Token | Aplicação |
|-------|-----------|
| `--dss-action-primary` | Arco de progresso (neutro/sem brand) |
| `--dss-surface-muted` | Trilha de fundo |
| `--dss-surface-default` | Círculo central |
| `--dss-font-family-sans` | Tipografia do valor central |
| `--dss-font-size-xs` | Tamanho do valor central |
| `--dss-font-weight-medium` | Peso do valor central |
| `--dss-border-width-md` | Espessura do outline de foco (normal) |
| `--dss-border-width-thick` | Espessura do outline de foco (alto contraste) |
| `--dss-focus-ring` | Cor do outline de foco (neutro) |
| `--dss-opacity-disabled` | Opacidade disabled (0.4) |
| `--dss-hub-600` | Arco e foco brand hub |
| `--dss-water-500` | Arco e foco brand water |
| `--dss-waste-600` | Arco e foco brand waste |

> Nota: 13 tokens no total (12 no `dss.meta.json` inicial + `--dss-border-width-thick` adicionado na correção NC-01).

---

## 7. Precedentes Aplicados

| Precedente | Princípio aplicado ao DssKnob |
|------------|-------------------------------|
| DssChip (Golden Reference) | Focus outline (`var(--dss-border-width-md) solid var(--dss-focus-ring)`), `border-radius: 50%`, `brightness(0.95/0.90)` |
| DssCircularProgress | SVG stroke override via CSS; prop `color` NÃO passada para controle 100% CSS |
| DssPagination | `--q-color-primary` override padrão Quasar |
| DssLinearProgress / DssAjaxBar | `prefers-reduced-motion: reduce` com `* { transition: none }` |
| DssInfiniteScroll | QComponent como root sem wrapper |

---

*Emitido em conformidade com o protocolo DSS Governance v2.2.*  
*Este selo certifica que DssKnob está em conformidade com os gates Estrutural, Técnico e Documental do DSS.*
