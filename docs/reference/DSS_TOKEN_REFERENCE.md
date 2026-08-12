# DSS - Referência Completa de Tokens

**Design System Sansys (DSS) - Sistema Multi-Marca Sansys**
**Versão:** v2.3.0
**Data:** Junho 2026
**Tokens Documentados:** 903 tokens
**Taxa de Conformidade com Código:** 100%
**Localização física:** `packages/core/tokens/` (monorepo)
**Sass Module System:** `@use 'tokens/semantic/...'` — `@import` é proibido

---

## Sobre Este Documento

Este é o catálogo completo de todos os tokens CSS disponíveis no Design System Sansys (DSS).

### Relação com Outros Documentos

- **DSS_TOKEN_GUIDELINES.md**: Filosofia e boas práticas de uso de tokens
- **DSS_TOKEN_REFERENCE.md** (este documento): Catálogo técnico completo
- **TOKENS_CONFORMIDADE_AUDITORIA.md**: Relatório de auditoria de/para

### Como Usar Este Documento

1. **Busque por categoria** no índice abaixo
2. **Copie o token** desejado da tabela
3. **Use no código** via `var(--nome-do-token)`

### Filosofia dos Tokens DSS

> **Tokens = Provedores, Componentes = Consumidores**

Os tokens DSS são **genéricos e reutilizáveis**. Componentes escolhem livremente quais tokens usar baseado em suas necessidades, sem depender de tokens component-specific.

---

## Índice

### 1. Espaçamento
- [1.1 Escala Base (34 tokens)](#11-escala-base)
- [1.2 Espaçamentos Semânticos (4 tokens)](#12-espaçamentos-semânticos)
- [1.3 Grid e Gap (4 tokens)](#13-grid-e-gap)
- [1.4 Formulários (2 tokens)](#14-formulários)
- [1.5 Margins (9 tokens)](#15-margins)
- [1.6 Paddings (9 tokens)](#16-paddings)
- [1.7 Gaps (8 tokens)](#17-gaps)
- [1.8 Acessibilidade (2 tokens)](#18-acessibilidade)
- [1.9 Border Radius (10 tokens)](#19-border-radius)

### 2. Cores
- [2.1 Gray Palette (11 tokens)](#21-gray-palette)
- [2.2 Brand Palettes (42 tokens)](#22-brand-palettes)
  - Hub (14 tokens)
  - Water (14 tokens)
  - Waste (14 tokens)
- [2.3 Tokens de Marca Semânticos (15 tokens)](#23-tokens-de-marca-semânticos)
- [2.4 Cores Semânticas Base (48 tokens)](#24-cores-semânticas-base)
  - Primary (6 tokens)
  - Secondary (6 tokens)
  - Tertiary (6 tokens)
  - Accent (6 tokens)
  - Dark (6 tokens)
  - Positive (6 tokens)
  - Negative (6 tokens)
  - Warning (6 tokens)
  - Info (6 tokens)
- [2.5 Opacidade (32 tokens)](#25-opacidade)
  - Escala Base (21 tokens)
  - Tokens Semânticos de Estados (5 tokens)
  - Tokens Semânticos de UI (1 token)
  - Tokens de Marca (4 tokens)
  - Funções de Utilidade (2 tokens)

### 3. Actions
- [3.1 Primary Actions (6 tokens)](#31-primary-actions)
- [3.2 Secondary Actions (6 tokens)](#32-secondary-actions)
- [3.3 Tertiary Actions (6 tokens)](#33-tertiary-actions)
- [3.4 Accent Actions (6 tokens)](#34-accent-actions)
- [3.5 Dark Actions (6 tokens)](#35-dark-actions)
- [3.6 Action Surfaces (5 tokens)](#36-action-surfaces)

### 4. Feedback
- [4.1 Success (5 tokens)](#41-success)
- [4.2 Error (5 tokens)](#42-error)
- [4.3 Warning (5 tokens)](#43-warning)
- [4.4 Info (5 tokens)](#44-info)
- [4.5 Feedback Surfaces (4 tokens)](#45-feedback-surfaces)
- [4.6 Textos de Componentes (8 tokens)](#46-textos-de-componentes)
- [4.7 Surface Hierarchy (12 tokens)](#47-surface-hierarchy)

### 5. Motion e Animação
- [5.1 Durações Base (10 tokens)](#51-durações-base)
- [5.2 Durações Semânticas (8 tokens)](#52-durações-semânticas)
- [5.3 Durações Interativas (4 tokens)](#53-durações-interativas)
- [5.4 Curvas de Easing (14 tokens)](#54-curvas-de-easing)
- [5.5 Atrasos (9 tokens)](#55-atrasos)
- [5.6 Transições Semânticas (9 tokens)](#56-transições-semânticas)
- [5.7 Animações Predefinidas (4 tokens)](#57-animações-predefinidas)
- [5.8 Temporizadores (4 tokens)](#58-temporizadores)

### 6. Tipografia
- [6.1 Famílias de Fonte (4 tokens)](#61-famílias-de-fonte)
- [6.2 Tamanhos de Fonte (9 tokens)](#62-tamanhos-de-fonte)
- [6.3 Pesos de Fonte (6 tokens)](#63-pesos-de-fonte)
- [6.4 Altura de Linha (10 tokens)](#64-altura-de-linha)
- [6.5 Espaçamento de Letras (6 tokens)](#65-espaçamento-de-letras)
- [6.6 Hierarquia de Títulos (19 tokens)](#66-hierarquia-de-títulos)
- [6.7 Utilitários de Legibilidade (2 tokens)](#67-utilitários-de-legibilidade)

### 7. Acessibilidade
- [7.1 Focus - Configurações Base (5 tokens)](#71-focus-configurações-base)
- [7.2 Focus - Cores Semânticas (8 tokens)](#72-focus-cores-semânticas)
- [7.3 Focus - Cores de Feedback (8 tokens)](#73-focus-cores-de-feedback)
- [7.4 Focus - Cores Neutras (3 tokens)](#74-focus-cores-neutras)
- [7.5 Focus - Box Shadows (10 tokens)](#75-focus-box-shadows)
- [7.6 Focus - Variantes com Offset (4 tokens)](#76-focus-variantes-com-offset)
- [7.7 Touch Targets (6 tokens)](#77-touch-targets)
- [7.8 Touch Spacing (5 tokens)](#78-touch-spacing)
- [7.9 Input Heights (10 tokens)](#79-input-heights)
- [7.10 Checkboxes e Controles (10 tokens)](#710-checkboxes-e-controles)
- [7.11 Ícones (10 tokens)](#711-ícones)
- [7.12 Avatares (5 tokens)](#712-avatares)
- [7.13 Compact Controls - Alturas Visuais (4 tokens)](#713-compact-controls---alturas-visuais)
- [7.14 Breakpoints (9 tokens)](#714-breakpoints)
- [7.15 Z-Index (10 tokens)](#715-z-index)
- [7.16 Contraste - Ratios WCAG (5 tokens)](#716-contraste-ratios-wcag)
- [7.17 Contraste - Combinações Validadas (20 tokens)](#717-contraste-combinações-validadas)

### 8. Borders
- [8.1 Border Widths (7 tokens)](#81-border-widths)
- [8.2 Bordas Neutras (11 tokens)](#82-bordas-neutras)
- [8.3 Bordas de Ação (20 tokens)](#83-bordas-de-ação)
- [8.4 Bordas de Feedback (20 tokens)](#84-bordas-de-feedback)
- [8.5 Bordas de Marca (33 tokens)](#85-bordas-de-marca)
- [8.6 Bordas de Dark (5 tokens)](#86-bordas-de-dark)
- [8.7 Bordas Funcionais (6 tokens)](#87-bordas-funcionais)

### 9. Shadows e Elevação
- [9.1 Sombras Base (8 tokens)](#91-sombras-base)
- [9.2 Sombras Semânticas (5 tokens)](#92-sombras-semânticas)
- [9.3 Sombras de Marca (9 tokens)](#93-sombras-de-marca)
- [9.4 Elevação Semântica (6 tokens)](#94-elevação-semântica)
- [9.5 Sombras para Estados (3 tokens)](#95-sombras-para-estados)

### 11. Dimensões de Controles Interativos *(DSS v2.4.0)*
- [11.1 Track Height (4 tokens)](#111-track-height)
- [11.2 Thumb Size (5 tokens)](#112-thumb-size)
- [11.3 Switch Track Width (4 tokens)](#113-switch-track-width)
- [11.4 Min Width (6 tokens)](#114-min-width)
- [11.5 Max Width (4 tokens)](#115-max-width)
- [11.6 Min Height (6 tokens)](#116-min-height)

### 10. Tokens Deprecados
- [10.1 Spacing Component-Specific (16 tokens removidos)](#101-spacing-component-specific)
- [10.2 Motion Component-Specific (2 tokens removidos)](#102-motion-component-specific)
- [10.3 Borders Component-Specific (12 tokens removidos)](#103-borders-component-specific)
- [10.4 Shadows Component-Specific (5 tokens removidos)](#104-shadows-component-specific)
- [10.5 Badges e Chips Component-Specific (10 tokens removidos)](#105-badges-e-chips-component-specific)

---

# 1. Espaçamento

Sistema de escala para margins, paddings e gaps. Baseado em rem (1rem = 16px).

## 1.1 Escala Base

**Total: 34 tokens**

<!-- BEGIN:TOKEN-TABLE:spacing-escala-base -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-spacing-0` | `0` | `0px` | — |
| `--dss-spacing-px` | `1px` | `1px` | para bordas finas |
| `--dss-spacing-0_5` | `0.125rem` | `2px` | — |
| `--dss-spacing-1` | `0.25rem` | `4px` | — |
| `--dss-spacing-1_5` | `0.375rem` | `6px` | — |
| `--dss-spacing-2` | `0.5rem` | `8px` | — |
| `--dss-spacing-2_5` | `0.625rem` | `10px` | — |
| `--dss-spacing-3` | `0.75rem` | `12px` | — |
| `--dss-spacing-3_5` | `0.875rem` | `14px` | — |
| `--dss-spacing-4` | `1rem` | `16px` | — |
| `--dss-spacing-5` | `1.25rem` | `20px` | — |
| `--dss-spacing-6` | `1.5rem` | `24px` | — |
| `--dss-spacing-7` | `1.75rem` | `28px` | — |
| `--dss-spacing-8` | `2rem` | `32px` | — |
| `--dss-spacing-9` | `2.25rem` | `36px` | — |
| `--dss-spacing-10` | `2.5rem` | `40px` | — |
| `--dss-spacing-11` | `2.75rem` | `44px` | — |
| `--dss-spacing-12` | `3rem` | `48px` | — |
| `--dss-spacing-14` | `3.5rem` | `56px` | — |
| `--dss-spacing-16` | `4rem` | `64px` | — |
| `--dss-spacing-20` | `5rem` | `80px` | — |
| `--dss-spacing-24` | `6rem` | `96px` | — |
| `--dss-spacing-28` | `7rem` | `112px` | — |
| `--dss-spacing-32` | `8rem` | `128px` | — |
| `--dss-spacing-36` | `9rem` | `144px` | — |
| `--dss-spacing-40` | `10rem` | `160px` | — |
| `--dss-spacing-44` | `11rem` | `176px` | — |
| `--dss-spacing-48` | `12rem` | `192px` | — |
| `--dss-spacing-52` | `13rem` | `208px` | — |
| `--dss-spacing-56` | `14rem` | `224px` | — |
| `--dss-spacing-60` | `15rem` | `240px` | — |
| `--dss-spacing-64` | `16rem` | `256px` | — |
| `--dss-spacing-72` | `18rem` | `288px` | — |
| `--dss-spacing-80` | `20rem` | `320px` | — |
| `--dss-spacing-96` | `24rem` | `384px` | — |
| `--dss-spacing-120` | `30rem` | `480px` | — |
| `--dss-spacing-192` | `48rem` | `768px` | — |
<!-- END:TOKEN-TABLE:spacing-escala-base -->

## 1.2 Espaçamentos Semânticos

**Total: 4 tokens**

<!-- BEGIN:TOKEN-TABLE:spacing-semanticos -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-container-padding` | `var(--dss-spacing-4)` | — | — |
| `--dss-section-spacing` | `var(--dss-spacing-12)` | — | — |
| `--dss-component-spacing` | `var(--dss-spacing-6)` | — | — |
| `--dss-layout-sidebar-width` | `240px` | `240px` | — |
| `--dss-layout-sidebar-width-mini` | `64px` | `64px` | — |
| `--dss-layout-sidebar-width-wide` | `320px` | `320px` | — |
| `--dss-layout-header-height` | `64px` | `64px` | — |
| `--dss-layout-header-height-dense` | `48px` | `48px` | — |
| `--dss-layout-footer-height` | `64px` | `64px` | — |
| `--dss-layout-footer-padding` | `var(--dss-spacing-10)` | — | — |
| `--dss-layout-content-max-width` | `720px` | `720px` | Largura máxima para leitura confortável |
| `--dss-layout-content-max-width-wide` | `960px` | `960px` | Largura expandida para dashboards |
| `--dss-layout-page-margin-x` | `var(--dss-spacing-4)` | `16px` | ajustado por breakpoint |
| `--dss-layout-page-margin-y` | `var(--dss-spacing-6)` | `24px` | ajustado por breakpoint |
| `--dss-toolbar-height` | `49px` | `49px` | — |
<!-- END:TOKEN-TABLE:spacing-semanticos -->

## 1.3 Grid e Gap

**Total: 4 tokens**

<!-- BEGIN:TOKEN-TABLE:spacing-grid-gap -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-grid-gap-sm` | `var(--dss-spacing-2)` | — | — |
| `--dss-grid-gap-md` | `var(--dss-spacing-4)` | — | — |
| `--dss-grid-gap-lg` | `var(--dss-spacing-6)` | — | — |
| `--dss-grid-gap-xl` | `var(--dss-spacing-8)` | — | — |
<!-- END:TOKEN-TABLE:spacing-grid-gap -->

## 1.4 Formulários

**Total: 2 tokens**

<!-- BEGIN:TOKEN-TABLE:spacing-formularios -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-form-gap` | `var(--dss-spacing-4)` | — | — |
| `--dss-label-margin-bottom` | `var(--dss-spacing-1)` | — | — |
<!-- END:TOKEN-TABLE:spacing-formularios -->

## 1.5 Margins

**Total: 9 tokens**

<!-- BEGIN:TOKEN-TABLE:spacing-margins -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-margin-auto` | `auto` | — | — |
| `--dss-margin-0` | `var(--dss-spacing-0)` | — | — |
| `--dss-margin-1` | `var(--dss-spacing-1)` | — | — |
| `--dss-margin-2` | `var(--dss-spacing-2)` | — | — |
| `--dss-margin-3` | `var(--dss-spacing-3)` | — | — |
| `--dss-margin-4` | `var(--dss-spacing-4)` | — | — |
| `--dss-margin-6` | `var(--dss-spacing-6)` | — | — |
| `--dss-margin-8` | `var(--dss-spacing-8)` | — | — |
| `--dss-margin-12` | `var(--dss-spacing-12)` | — | — |
| `--dss-margin-16` | `var(--dss-spacing-16)` | — | — |
<!-- END:TOKEN-TABLE:spacing-margins -->

## 1.6 Paddings

**Total: 9 tokens**

<!-- BEGIN:TOKEN-TABLE:spacing-paddings -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-padding-0` | `var(--dss-spacing-0)` | — | — |
| `--dss-padding-1` | `var(--dss-spacing-1)` | — | — |
| `--dss-padding-2` | `var(--dss-spacing-2)` | — | — |
| `--dss-padding-3` | `var(--dss-spacing-3)` | — | — |
| `--dss-padding-4` | `var(--dss-spacing-4)` | — | — |
| `--dss-padding-6` | `var(--dss-spacing-6)` | — | — |
| `--dss-padding-8` | `var(--dss-spacing-8)` | — | — |
| `--dss-padding-12` | `var(--dss-spacing-12)` | — | — |
| `--dss-padding-16` | `var(--dss-spacing-16)` | — | — |
<!-- END:TOKEN-TABLE:spacing-paddings -->

## 1.7 Gaps

**Total: 8 tokens**

<!-- BEGIN:TOKEN-TABLE:spacing-gaps -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-gap-0` | `var(--dss-spacing-0)` | — | — |
| `--dss-gap-1` | `var(--dss-spacing-1)` | — | — |
| `--dss-gap-2` | `var(--dss-spacing-2)` | — | — |
| `--dss-gap-3` | `var(--dss-spacing-3)` | — | — |
| `--dss-gap-4` | `var(--dss-spacing-4)` | — | — |
| `--dss-gap-6` | `var(--dss-spacing-6)` | — | — |
| `--dss-gap-8` | `var(--dss-spacing-8)` | — | — |
| `--dss-gap-12` | `var(--dss-spacing-12)` | — | — |
<!-- END:TOKEN-TABLE:spacing-gaps -->

## 1.8 Acessibilidade

**Total: 2 tokens**

<!-- BEGIN:TOKEN-TABLE:spacing-acessibilidade -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-touch-spacing-xs` | `4px` | `4px` | Espaçamento mínimo |
| `--dss-touch-spacing-sm` | `8px` | `8px` | Espaçamento compacto |
| `--dss-touch-spacing-md` | `12px` | `12px` | ✅ Padrão - Evita toques acidentais |
| `--dss-touch-spacing-lg` | `16px` | `16px` | Espaçamento confortável |
| `--dss-touch-spacing-xl` | `20px` | `20px` | Espaçamento generoso |
<!-- END:TOKEN-TABLE:spacing-acessibilidade -->

## 1.9 Border Radius

**Total: 10 tokens**

<!-- BEGIN:TOKEN-TABLE:spacing-border-radius -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-radius-none` | `0` | — | — |
| `--dss-radius-sm` | `var(--dss-spacing-1)` | `4px` | — |
| `--dss-radius-md` | `var(--dss-spacing-2)` | `8px` | — |
| `--dss-radius-lg` | `var(--dss-spacing-3)` | `12px` | — |
| `--dss-radius-xl` | `var(--dss-spacing-4)` | `16px` | — |
| `--dss-radius-2xl` | `var(--dss-spacing-5)` | `20px` | — |
| `--dss-radius-3xl` | `var(--dss-spacing-6)` | `24px` | — |
| `--dss-radius-full` | `9999px` | `9999px` | — |
| `--dss-radius-circle` | `50%` | — | Círculos perfeitos (Avatar, Radio, indicadores circulares) |
| `--dss-radius-badge` | `var(--dss-radius-full)` | — | — |
<!-- END:TOKEN-TABLE:spacing-border-radius -->

---

# 2. Cores

Sistema de cores do DSS dividido em paletas neutras, de marca e semânticas.

## 2.1 Gray Palette

**Total: 11 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-gray-50` | #ffffff | 255, 255, 255 | Branco puro |
| `--dss-gray-100` | #fafafa | 250, 250, 250 | Fundos muito claros |
| `--dss-gray-200` | #f5f5f5 | 245, 245, 245 | Fundos claros |
| `--dss-gray-300` | #e5e5e5 | 229, 229, 229 | Bordas padrão |
| `--dss-gray-400` | #d4d4d4 | 212, 212, 212 | Bordas hover |
| `--dss-gray-500` | #a3a3a3 | 163, 163, 163 | Textos secundários |
| `--dss-gray-600` | #737373 | 115, 115, 115 | Textos terciários |
| `--dss-gray-700` | #525252 | 82, 82, 82 | Textos escuros |
| `--dss-gray-800` | #262626 | 38, 38, 38 | Fundos escuros |
| `--dss-gray-900` | #0a0a0a | 10, 10, 10 | Textos preto |
| `--dss-gray-950` | #000000 | 0, 0, 0 | Preto puro |

## 2.2 Brand Palettes

**⚠️ IMPORTANTE:** As paletas de marca (Hub, Water, Waste) são **escalas de 11 tons** (50 a 950).
Apesar de não terem tokens de estado explícitos, seguem um **padrão de uso para interações**:

**Padrão de Estados:**
- **disable** = -200 (desabilitado)
- **light** = -300 (variante clara)
- **hover/focus** = Principal + 2 níveis (ex: se principal é 600, hover é 800)
- **deep** = Mais escuro (950)

### Hub (Laranja/Marrom)

**Total: 11 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-hub-50` | #fff9ed | 255, 249, 237 | Hub muito claro |
| `--dss-hub-100` | #fef2d6 | 254, 242, 214 | Hub claro |
| `--dss-hub-200` | #fde2ab | 253, 226, 171 | **🔒 Hub disable** |
| `--dss-hub-300` | #fbcb76 | 251, 203, 118 | **✨ Hub light** |
| `--dss-hub-400` | #f8aa3f | 248, 170, 63 | Hub médio |
| `--dss-hub-500` | #f5911a | 245, 145, 26 | Hub padrão |
| `--dss-hub-600` | #ef7a11 | 239, 122, 17 | **✅ Hub principal** |
| `--dss-hub-700` | #bf590f | 191, 89, 15 | Hub escuro |
| `--dss-hub-800` | #984614 | 152, 70, 20 | **💡 Hub hover/focus** |
| `--dss-hub-900` | #7a3614 | 122, 54, 20 | Hub profundo |
| `--dss-hub-950` | #421d08 | 66, 29, 8 | **🎯 Hub deep** |

### Water (Azul)

**Total: 11 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-water-50` | #f0f7ff | 240, 247, 255 | Water muito claro |
| `--dss-water-100` | #e0eefe | 224, 238, 254 | Water claro |
| `--dss-water-200` | #badefd | 186, 222, 253 | **🔒 Water disable** |
| `--dss-water-300` | #7dc4fc | 125, 196, 252 | **✨ Water light** |
| `--dss-water-400` | #38a6f8 | 56, 166, 248 | Water médio |
| `--dss-water-500` | #0e88e4 | 14, 136, 228 | **✅ Water principal** |
| `--dss-water-600` | #026cc7 | 2, 108, 199 | Water padrão |
| `--dss-water-700` | #0356a1 | 3, 86, 161 | **💡 Water hover/focus** |
| `--dss-water-800` | #074a85 | 7, 74, 133 | Water muito escuro |
| `--dss-water-900` | #0c3e6e | 12, 62, 110 | Water profundo |
| `--dss-water-950` | #082749 | 8, 39, 73 | **🎯 Water deep** |

### Waste (Verde)

**Total: 11 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-waste-50` | #edfcf4 | 237, 252, 244 | Waste muito claro |
| `--dss-waste-100` | #d3f8e2 | 211, 248, 226 | Waste claro |
| `--dss-waste-200` | #abefcb | 171, 239, 203 | **🔒 Waste disable** |
| `--dss-waste-300` | #74e1ae | 116, 225, 174 | **✨ Waste light** |
| `--dss-waste-400` | #3ccb8d | 60, 203, 141 | Waste médio |
| `--dss-waste-500` | #18b173 | 24, 177, 115 | Waste padrão |
| `--dss-waste-600` | #0b8154 | 11, 129, 84 | **✅ Waste principal** |
| `--dss-waste-700` | #0a724e | 10, 114, 78 | Waste escuro |
| `--dss-waste-800` | #0a5b3e | 10, 91, 62 | **💡 Waste hover/focus** |
| `--dss-waste-900` | #0a4a34 | 10, 74, 52 | Waste profundo |
| `--dss-waste-950` | #042a1e | 4, 42, 30 | **🎯 Waste deep** |

**📝 RESUMO DE ESTADOS POR MARCA:**
- **Hub**: Principal=600 | Light=300 | Disable=200 | Hover/Focus=800 | Deep=950
- **Water**: Principal=500 | Light=300 | Disable=200 | Hover/Focus=700 | Deep=950
- **Waste**: Principal=600 | Light=300 | Disable=200 | Hover/Focus=800 | Deep=950

## 2.3 Tokens de Marca Semânticos

Tokens semânticos de marca que se adaptam automaticamente ao contexto atual (`[data-brand="hub|water|waste"]`). Devem ser usados por componentes compostos que precisam consumir cores da marca ativa sem conhecer a paleta específica.

**Total: 15 tokens**

| Token | Hub | Water | Waste | Semântica |
|-------|-----|-------|-------|-----------|
| `--dss-brand-primary` | `var(--dss-hub-600)` | `var(--dss-water-500)` | `var(--dss-waste-600)` | Cor principal da marca |
| `--dss-brand-secondary` | `var(--dss-hub-300)` | `var(--dss-water-300)` | `var(--dss-waste-300)` | Variante clara / secundária |
| `--dss-brand-tertiary` | `var(--dss-hub-800)` | `var(--dss-water-700)` | `var(--dss-waste-800)` | Terceira cor da marca |
| `--dss-brand-accent` | `var(--dss-hub-400)` | `var(--dss-water-400)` | `var(--dss-waste-400)` | Cor de destaque / acento |
| `--dss-brand-light` | `var(--dss-hub-100)` | `var(--dss-water-100)` | `var(--dss-waste-100)` | Variante muito clara |
| `--dss-brand-lighter` | `var(--dss-hub-50)` | `var(--dss-water-50)` | `var(--dss-waste-50)` | Variante mínima |
| `--dss-brand-dark` | `var(--dss-hub-900)` | `var(--dss-water-800)` | `var(--dss-waste-900)` | Variante escura |
| `--dss-brand-darker` | `var(--dss-hub-950)` | `var(--dss-water-900)` | `var(--dss-waste-950)` | Variante mais escura |
| `--dss-brand-background` | `var(--dss-hub-50)` | `var(--dss-water-50)` | `var(--dss-waste-50)` | Fundo de áreas brandadas |
| `--dss-brand-surface` | `var(--dss-hub-100)` | `var(--dss-water-100)` | `var(--dss-waste-100)` | Superfície brandada |
| `--dss-brand-border` | `var(--dss-hub-200)` | `var(--dss-water-200)` | `var(--dss-waste-200)` | Borda brandada |
| `--dss-brand-text` | `var(--dss-hub-900)` | `var(--dss-water-800)` | `var(--dss-waste-900)` | Texto sobre fundo brandado |
| `--dss-brand-hover` | `var(--dss-hub-700)` | `var(--dss-water-600)` | `var(--dss-waste-700)` | Estado hover sobre primary |
| `--dss-brand-disable` | `var(--dss-hub-200)` | `var(--dss-water-200)` | `var(--dss-waste-200)` | Estado desabilitado |
| `--dss-brand-deep` | `var(--dss-hub-800)` | `var(--dss-water-800)` | `var(--dss-waste-800)` | Estado active/pressionado |

## 2.4 Cores Semânticas Base

### Primary (Azul Principal)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-primary-disable` | #b3dcff | 179, 220, 255 | Primary desabilitado |
| `--dss-primary-light` | #86c0f3 | 134, 192, 243 | Primary claro |
| `--dss-primary` | #1f86de | 31, 134, 222 | **Primary padrão** |
| `--dss-primary-hover` | #0f5295 | 15, 82, 149 | Primary hover |
| `--dss-primary-deep` | #0a3a6a | 10, 58, 106 | Primary profundo |
| `--dss-primary-focus` | #006AC5 | 0, 106, 197 | Primary foco |

### Secondary (Verde/Turquesa)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-secondary-disable` | #b5ece4 | 181, 236, 228 | Secondary desabilitado |
| `--dss-secondary-light` | #6ddbcb | 109, 219, 203 | Secondary claro |
| `--dss-secondary` | #26a69a | 38, 166, 154 | **Secondary padrão** |
| `--dss-secondary-hover` | #1c857e | 28, 133, 126 | Secondary hover |
| `--dss-secondary-deep` | #116761 | 17, 103, 97 | Secondary profundo |
| `--dss-secondary-focus` | #009C8D | 0, 156, 141 | Secondary foco |

### Tertiary (Laranja)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-tertiary-disable` | #ffd2b5 | 255, 210, 181 | Tertiary desabilitado |
| `--dss-tertiary-light` | #ff9452 | 255, 148, 82 | Tertiary claro |
| `--dss-tertiary` | #ff6607 | 255, 102, 7 | **Tertiary padrão** |
| `--dss-tertiary-hover` | #de5500 | 222, 85, 0 | Tertiary hover |
| `--dss-tertiary-deep` | #ad4200 | 173, 66, 0 | Tertiary profundo |
| `--dss-tertiary-focus` | #E95900 | 233, 89, 0 | Tertiary foco |

### Accent (Roxo/Púrpura)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-accent-disable` | #f0ddf4 | 240, 221, 244 | Accent desabilitado |
| `--dss-accent-light` | #e3bceb | 227, 188, 235 | Accent claro |
| `--dss-accent` | #b454c4 | 180, 84, 196 | **Accent padrão** |
| `--dss-accent-hover` | #883b90 | 136, 59, 144 | Accent hover |
| `--dss-accent-deep` | #642f6a | 100, 47, 106 | Accent profundo |
| `--dss-accent-focus` | #B02EC5 | 176, 46, 197 | Accent foco |

### Dark (Cinza/Preto)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-dark-disable` | #d7d7d7 | 215, 215, 215 | Dark desabilitado |
| `--dss-dark-light` | #b0b0b0 | 176, 176, 176 | Dark claro |
| `--dss-dark` | #454545 | 69, 69, 69 | **Dark padrão** |
| `--dss-dark-hover` | #313131 | 49, 49, 49 | Dark hover |
| `--dss-dark-deep` | #1d1d1d | 29, 29, 29 | Dark profundo |
| `--dss-dark-focus` | #3E3E3E | 62, 62, 62 | Dark foco |

### Positive (Verde)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-positive-disable` | #dbf8d1 | 219, 248, 209 | Positive desabilitado |
| `--dss-positive-light` | #b9f2a4 | 185, 242, 164 | Positive claro |
| `--dss-positive` | #4dd228 | 77, 210, 40 | **Positive padrão** |
| `--dss-positive-hover` | #27910D | 39, 145, 13 | Positive hover |
| `--dss-positive-deep` | #246714 | 36, 103, 20 | Positive profundo |
| `--dss-positive-focus` | #34C30C | 52, 195, 12 | Positive foco |

### Negative (Vermelho)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-negative-disable` | #ffcfd4 | 255, 207, 212 | Negative desabilitado |
| `--dss-negative-light` | #ffa0ab | 255, 160, 171 | Negative claro |
| `--dss-negative` | #d8182e | 216, 24, 46 | **Negative padrão** |
| `--dss-negative-hover` | #a01424 | 160, 20, 36 | Negative hover |
| `--dss-negative-deep` | #720e19 | 114, 14, 25 | Negative profundo |
| `--dss-negative-focus` | #C40016 | 196, 0, 22 | Negative foco |

### Warning (Amarelo/Laranja)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-warning-disable` | #fff9c3 | 255, 249, 195 | Warning desabilitado |
| `--dss-warning-light` | #fff488 | 255, 244, 136 | Warning claro |
| `--dss-warning` | #fabd14 | 250, 189, 20 | **Warning padrão** |
| `--dss-warning-hover` | #dd8e02 | 221, 142, 2 | Warning hover |
| `--dss-warning-deep` | #a66d08 | 166, 109, 8 | Warning profundo |
| `--dss-warning-focus` | #E9AB00 | 233, 171, 0 | Warning foco |

### Info (Azul Claro)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-info-disable` | #d2f6fc | 210, 246, 252 | Info desabilitado |
| `--dss-info-light` | #a7effa | 167, 239, 250 | Info claro |
| `--dss-info` | #0cc4e9 | 12, 196, 233 | **Info padrão** |
| `--dss-info-hover` | #0c8bae | 12, 139, 174 | Info hover |
| `--dss-info-deep` | #0d7491 | 13, 116, 145 | Info profundo |
| `--dss-info-focus` | #00B2D5 | 0, 178, 213 | Info foco |

## 2.4 Opacidade

**Total: 32 tokens** (21 tokens de escala + 11 tokens semânticos)

Sistema padronizado de transparências com escala de 0 a 100 e tokens semânticos para estados e overlays.

**📁 Fonte:** `tokens/semantic/_opacity.scss`

### Escala Base (0-100)

**Total: 21 tokens**

| Token | Valor | Percentual | Uso |
|-------|-------|------------|-----|
| `--dss-opacity-0` | 0 | 0% | Invisível |
| `--dss-opacity-5` | 0.05 | 5% | Overlay muito sutil |
| `--dss-opacity-8` | 0.08 | 8% | Brand subtle (ver abaixo) |
| `--dss-opacity-10` | 0.1 | 10% | Hover state |
| `--dss-opacity-12` | 0.12 | 12% | Brand light (ver abaixo) |
| `--dss-opacity-15` | 0.15 | 15% | Selected state |
| `--dss-opacity-16` | 0.16 | 16% | Brand medium (ver abaixo) |
| `--dss-opacity-20` | 0.2 | 20% | Active state |
| `--dss-opacity-24` | 0.24 | 24% | Brand strong (ver abaixo) |
| `--dss-opacity-25` | 0.25 | 25% | Overlay leve |
| `--dss-opacity-30` | 0.3 | 30% | Progress indicator |
| `--dss-opacity-35` | 0.35 | 35% | - |
| `--dss-opacity-40` | 0.4 | 40% | **Disabled state padrão** |
| `--dss-opacity-45` | 0.45 | 45% | - |
| `--dss-opacity-50` | 0.5 | 50% | Overlay médio |
| `--dss-opacity-55` | 0.55 | 55% | - |
| `--dss-opacity-60` | 0.6 | 60% | Elementos semi-transparentes |
| `--dss-opacity-65` | 0.65 | 65% | - |
| `--dss-opacity-70` | 0.7 | 70% | - |
| `--dss-opacity-75` | 0.75 | 75% | Backdrop (modal/dialog) |
| `--dss-opacity-80` | 0.8 | 80% | Alta visibilidade |
| `--dss-opacity-85` | 0.85 | 85% | - |
| `--dss-opacity-90` | 0.9 | 90% | Quase opaco |
| `--dss-opacity-95` | 0.95 | 95% | - |
| `--dss-opacity-100` | 1 | 100% | Totalmente opaco |

### Tokens Semânticos de Estados

**Total: 5 tokens**

| Token | Alias | Valor | Uso |
|-------|-------|-------|-----|
| `--dss-opacity-disabled` | `var(--dss-opacity-40)` | 0.4 | **Estado desabilitado padrão** ✅ |
| `--dss-opacity-hover` | `var(--dss-opacity-10)` | 0.1 | Overlay de hover |
| `--dss-opacity-active` | `var(--dss-opacity-20)` | 0.2 | Overlay de active/pressed |
| `--dss-opacity-selected` | `var(--dss-opacity-15)` | 0.15 | Estado selecionado |
| `--dss-opacity-overlay` | `var(--dss-opacity-50)` | 0.5 | Overlay genérico |

### Tokens Semânticos de UI

**Total: 1 token**

| Token | Alias | Valor | Uso |
|-------|-------|-------|-----|
| `--dss-opacity-backdrop` | `var(--dss-opacity-75)` | 0.75 | Backdrop de modal/dialog/drawer |

### Tokens de Marca (Brand Overlays)

**Total: 4 tokens**

| Token | Alias | Valor | Uso |
|-------|-------|-------|-----|
| `--dss-opacity-brand-subtle` | `var(--dss-opacity-8)` | 0.08 | Overlay de marca muito sutil |
| `--dss-opacity-brand-light` | `var(--dss-opacity-12)` | 0.12 | Overlay de marca leve |
| `--dss-opacity-brand-medium` | `var(--dss-opacity-16)` | 0.16 | Overlay de marca médio |
| `--dss-opacity-brand-strong` | `var(--dss-opacity-24)` | 0.24 | Overlay de marca forte |

### Funções de Utilidade (Referência)

**Total: 2 tokens** (não devem ser usados diretamente em CSS)

| Token | Valor |
|-------|-------|
| `--dss-opacity-function-hover` | `"opacity: var(--dss-opacity-hover)"` |
| `--dss-opacity-function-disabled` | `"opacity: var(--dss-opacity-disabled)"` |

### ⚠️ Observações Importantes

- **Estado Disabled**: Use sempre `--dss-opacity-disabled` (0.4) para consistência
- **Overlays de Marca**: Use tokens `--dss-opacity-brand-*` quando aplicar overlay sobre cores de marca
- **Interações**: Para hover, active e selected, use os tokens semânticos correspondentes
- **Backdrop**: Use sempre `--dss-opacity-backdrop` (0.75) para fundo de modals/dialogs
- **Funções de Utilidade**: Tokens `--dss-opacity-function-*` são apenas para referência, não devem ser usados em CSS

### 📊 Resumo de Uso por Componente

- **Buttons**: `disabled` (0.4), `60` (spinner), `30` (progress), `active` (0.2), `selected` (0.15)
- **Overlays/Modals**: `backdrop` (0.75), `overlay` (0.5)
- **Estados Interativos**: `hover` (0.1), `active` (0.2), `selected` (0.15)
- **Marca**: `brand-subtle` (0.08), `brand-light` (0.12), `brand-medium` (0.16), `brand-strong` (0.24)

---

## 2.5 Cores de Texto

Cores semânticas de texto — hierarquia, estados, on-color (sobre fundo escuro/cor sólida), links e marca. Tabela auto-gerada de `tokens/semantic/_text.scss` via `npm run sync:tokens-to-reference`.

<!-- BEGIN:TOKEN-TABLE:text-cores -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-text-primary` | `var(--dss-dark)` | — | #454545 - Alias semântico de --dss-text-body |
| `--dss-text-secondary` | `var(--dss-gray-600)` | — | #737373 - Texto secundário (~4.7:1, WCAG AA). Antes #B0B0B0 reprovava (~2.6:1) |
| `--dss-text-body` | `var(--dss-dark)` | — | #454545 - Texto principal |
| `--dss-text-subtle` | `var(--dss-gray-600)` | — | #737373 - Texto sutil legível (WCAG AA). Antes #B0B0B0 reprovava |
| `--dss-text-muted` | `var(--dss-dark-disable)` | — | #D7D7D7 - Texto terciário |
| `--dss-text-inverse` | `var(--dss-gray-50)` | — | #ffffff - Texto claro (sobre fundos escuros) |
| `--dss-text-inverse-secondary` | `var(--dss-gray-100)` | — | #fafafa - Texto claro secundário (label em standout/dark) |
| `--dss-text-inverse-hint` | `var(--dss-gray-400)` | — | #d4d4d4 - Placeholder/hint sobre fundo escuro |
| `--dss-text-disabled` | `var(--dss-gray-600)` | — | #737373 - Texto desabilitado (subido 2 tons: gray-400 → gray-600 p/ legibilidade; alinhado ao dark mode) |
| `--dss-text-on-primary` | `var(--dss-gray-50)` | — | #ffffff - Texto sobre action-primary |
| `--dss-text-action` | `var(--dss-action-primary)` | — | Links padrão |
| `--dss-text-action-hover` | `var(--dss-action-primary-hover)` | — | — |
| `--dss-text-action-alt` | `var(--dss-action-secondary)` | — | Links alternativos |
| `--dss-text-brand-hub` | `var(--dss-hub-500)` | — | — |
| `--dss-text-brand-water` | `var(--dss-water-500)` | — | — |
| `--dss-text-brand-waste` | `var(--dss-waste-500)` | — | — |
<!-- END:TOKEN-TABLE:text-cores -->

---

# 3. Actions

Cores para ações primárias, secundárias, terciárias e de destaque.

## 3.1 Primary Actions

**Total: 6 tokens**

<!-- BEGIN:TOKEN-TABLE:actions-primary -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-action-primary` | `var(--dss-primary)` | — | — |
| `--dss-action-primary-light` | `var(--dss-primary-light)` | — | — |
| `--dss-action-primary-disable` | `var(--dss-primary-disable)` | — | — |
| `--dss-action-primary-hover` | `var(--dss-primary-hover)` | — | — |
| `--dss-action-primary-deep` | `var(--dss-primary-deep)` | — | — |
| `--dss-action-primary-focus` | `var(--dss-primary-focus)` | — | — |
| `--dss-action-primary-surface` | `rgba(31, 134, 222, 0.08)` | — | #1f86de 8% |
<!-- END:TOKEN-TABLE:actions-primary -->

## 3.2 Secondary Actions

**Total: 6 tokens**

<!-- BEGIN:TOKEN-TABLE:actions-secondary -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-action-secondary` | `var(--dss-secondary)` | — | — |
| `--dss-action-secondary-light` | `var(--dss-secondary-light)` | — | — |
| `--dss-action-secondary-disable` | `var(--dss-secondary-disable)` | — | — |
| `--dss-action-secondary-hover` | `var(--dss-secondary-hover)` | — | — |
| `--dss-action-secondary-deep` | `var(--dss-secondary-deep)` | — | — |
| `--dss-action-secondary-focus` | `var(--dss-secondary-focus)` | — | — |
| `--dss-action-secondary-surface` | `rgba(38, 166, 154, 0.08)` | — | #26a69a 8% |
<!-- END:TOKEN-TABLE:actions-secondary -->

## 3.3 Tertiary Actions

**Total: 6 tokens**

<!-- BEGIN:TOKEN-TABLE:actions-tertiary -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-action-tertiary` | `var(--dss-tertiary)` | — | — |
| `--dss-action-tertiary-light` | `var(--dss-tertiary-light)` | — | — |
| `--dss-action-tertiary-disable` | `var(--dss-tertiary-disable)` | — | — |
| `--dss-action-tertiary-hover` | `var(--dss-tertiary-hover)` | — | — |
| `--dss-action-tertiary-deep` | `var(--dss-tertiary-deep)` | — | — |
| `--dss-action-tertiary-focus` | `var(--dss-tertiary-focus)` | — | — |
| `--dss-action-tertiary-surface` | `rgba(255, 102,   7, 0.08)` | — | #ff6607 8% |
<!-- END:TOKEN-TABLE:actions-tertiary -->

## 3.4 Accent Actions

**Total: 6 tokens**

<!-- BEGIN:TOKEN-TABLE:actions-accent -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-action-accent` | `var(--dss-accent)` | — | — |
| `--dss-action-accent-light` | `var(--dss-accent-light)` | — | — |
| `--dss-action-accent-disable` | `var(--dss-accent-disable)` | — | — |
| `--dss-action-accent-hover` | `var(--dss-accent-hover)` | — | — |
| `--dss-action-accent-deep` | `var(--dss-accent-deep)` | — | — |
| `--dss-action-accent-focus` | `var(--dss-accent-focus)` | — | — |
| `--dss-action-accent-surface` | `rgba(180,  84, 196, 0.08)` | — | #b454c4 8% |
<!-- END:TOKEN-TABLE:actions-accent -->

## 3.5 Dark Actions

**Total: 6 tokens**

<!-- BEGIN:TOKEN-TABLE:actions-dark -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-action-dark` | `var(--dss-dark)` | — | — |
| `--dss-action-dark-light` | `var(--dss-dark-light)` | — | — |
| `--dss-action-dark-disable` | `var(--dss-dark-disable)` | — | — |
| `--dss-action-dark-hover` | `var(--dss-dark-hover)` | — | — |
| `--dss-action-dark-deep` | `var(--dss-dark-deep)` | — | — |
| `--dss-action-dark-focus` | `var(--dss-dark-focus)` | — | — |
| `--dss-action-dark-surface` | `rgba( 69,  69,  69, 0.08)` | — | #454545 8% |
<!-- END:TOKEN-TABLE:actions-dark -->

## 3.6 Action Surfaces

Fundos tintados a 8% de opacidade por cor de ação. Definidos em `tokens/semantic/_actions.scss`. Sem override de dark mode — a opacidade baixa garante legibilidade em ambos os modos.

Classe utilitária correspondente: `.dss-bg-primary`, `.dss-bg-secondary`, `.dss-bg-tertiary`, `.dss-bg-accent`, `.dss-bg-dark` (via `utils/_helpers.scss`).

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:actions-surfaces -->
| Token | Valor | Uso típico |
|-------|-------|------------|
| `--dss-action-primary-surface` | `rgba(31, 134, 222, 0.08)` | Fundo de card, seção ou badge com contexto primary |
| `--dss-action-secondary-surface` | `rgba(38, 166, 154, 0.08)` | Fundo com contexto secondary |
| `--dss-action-tertiary-surface` | `rgba(255, 102, 7, 0.08)` | Fundo com contexto tertiary |
| `--dss-action-accent-surface` | `rgba(180, 84, 196, 0.08)` | Fundo com contexto accent |
| `--dss-action-dark-surface` | `rgba(69, 69, 69, 0.08)` | Fundo com contexto dark/neutro |
<!-- END:TOKEN-TABLE:actions-surfaces -->

---

# 4. Feedback

Cores para estados e alertas (sucesso, erro, aviso, informação).

## 4.1 Success

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:feedback-success -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-feedback-success` | `var(--dss-positive)` | — | — |
| `--dss-feedback-success-light` | `var(--dss-positive-light)` | — | — |
| `--dss-feedback-success-disable` | `var(--dss-positive-disable)` | — | — |
| `--dss-feedback-success-hover` | `var(--dss-positive-hover)` | — | — |
| `--dss-feedback-success-deep` | `var(--dss-positive-deep)` | — | — |
| `--dss-feedback-success-surface` | `rgba(77, 210, 40, 0.1)` | — | — |
<!-- END:TOKEN-TABLE:feedback-success -->

## 4.2 Error

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:feedback-error -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-feedback-error` | `var(--dss-negative)` | — | — |
| `--dss-feedback-error-light` | `var(--dss-negative-light)` | — | — |
| `--dss-feedback-error-disable` | `var(--dss-negative-disable)` | — | — |
| `--dss-feedback-error-hover` | `var(--dss-negative-hover)` | — | — |
| `--dss-feedback-error-deep` | `var(--dss-negative-deep)` | — | — |
| `--dss-feedback-error-surface` | `rgba(216, 24, 46, 0.1)` | — | — |
<!-- END:TOKEN-TABLE:feedback-error -->

## 4.3 Warning

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:feedback-warning -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-feedback-warning` | `var(--dss-warning)` | — | — |
| `--dss-feedback-warning-light` | `var(--dss-warning-light)` | — | — |
| `--dss-feedback-warning-disable` | `var(--dss-warning-disable)` | — | — |
| `--dss-feedback-warning-hover` | `var(--dss-warning-hover)` | — | — |
| `--dss-feedback-warning-deep` | `var(--dss-warning-deep)` | — | — |
| `--dss-feedback-warning-surface` | `rgba(250, 189, 20, 0.1)` | — | — |
<!-- END:TOKEN-TABLE:feedback-warning -->

## 4.4 Info

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:feedback-info -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-feedback-info` | `var(--dss-info)` | — | — |
| `--dss-feedback-info-light` | `var(--dss-info-light)` | — | — |
| `--dss-feedback-info-disable` | `var(--dss-info-disable)` | — | — |
| `--dss-feedback-info-hover` | `var(--dss-info-hover)` | — | — |
| `--dss-feedback-info-deep` | `var(--dss-info-deep)` | — | — |
| `--dss-feedback-info-surface` | `rgba(12, 196, 233, 0.1)` | — | — |
<!-- END:TOKEN-TABLE:feedback-info -->

## 4.5 Feedback Surfaces

**Total: 4 tokens**

<!-- BEGIN:TOKEN-TABLE:feedback-surfaces -->
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-feedback-success-surface` | rgba(77, 210, 40, 0.1) | Fundo para alertas de sucesso |
| `--dss-feedback-error-surface` | rgba(216, 24, 46, 0.1) | Fundo para alertas de erro |
| `--dss-feedback-warning-surface` | rgba(250, 189, 20, 0.1) | Fundo para alertas de aviso |
| `--dss-feedback-info-surface` | rgba(12, 196, 233, 0.1) | Fundo para alertas de informação |
<!-- END:TOKEN-TABLE:feedback-surfaces -->

## 4.6 Textos de Componentes

Tokens de cor de texto usados por componentes de formulário interativos e de navegação estrutural. Definidos em `tokens/semantic/_text.scss`; sobrescritos em dark mode em `tokens/themes/dark/_colors.scss`.

**Total: 8 tokens**

> **Nota:** `--dss-surface-muted` e `--dss-surface-disabled` foram movidos para a seção [4.7 Surface Hierarchy](#47-surface-hierarchy).

<!-- BEGIN:TOKEN-TABLE:feedback-textos -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-text-hint` | `var(--dss-gray-500)` | — | #a3a3a3 - Placeholder/dica (texto transitório) |
| `--dss-text-success` | `var(--dss-positive)` | — | — |
| `--dss-text-error` | `var(--dss-negative)` | — | — |
| `--dss-text-warning` | `var(--dss-warning)` | — | — |
| `--dss-text-info` | `var(--dss-info)` | — | — |
<!-- END:TOKEN-TABLE:feedback-textos -->

## 4.7 Surface Hierarchy

Tokens de fundo e container que formam a hierarquia visual de superfícies do DSS. Definidos em `tokens/semantic/_surfaces.scss`; sobrescritos em dark mode em `tokens/themes/dark/_colors.scss`.

**Total: 10 tokens**

> **Nota:** O token `--dss-surface-raised` **não existe** no catálogo DSS. O token correto para elevação suave é `--dss-surface-subtle`.

### Hierarquia de Superfície (4 tokens)

Definem os níveis de elevação visual de fundos e containers.

<!-- BEGIN:TOKEN-TABLE:feedback-hierarchy -->
| Token | Valor (light) | Valor (dark) | Uso |
|-------|---------------|--------------|-----|
| `--dss-surface-default` | `var(--dss-gray-50)` — #ffffff | `var(--dss-gray-800)` — #262626 | Fundo principal de containers (DssCard, DssHeader, DssDrawer, DssStepper, DssLayout, DssMenu, DssFooter e outros) |
| `--dss-surface-subtle` | `var(--dss-gray-100)` — #fafafa | `var(--dss-gray-700)` — #525252 | Elevação suave — superfícies levemente elevadas sobre o default |
| `--dss-surface-muted` | `var(--dss-gray-200)` — #f5f5f5 | `var(--dss-gray-600)` — #737373 | Áreas rebaixadas, tracks inativos, fundos de menor destaque |
| `--dss-surface-overlay` | `rgba(0, 0, 0, 0.5)` | `rgba(255, 255, 255, 0.05)` | Overlay semitransparente para modais, drawers e backdrops |
<!-- END:TOKEN-TABLE:feedback-hierarchy -->

### Estados de Superfície (4 tokens)

Modificadores de interação sobrepostos à superfície base via composição de cor.

| Token | Valor (light) | Valor (dark) | Uso |
|-------|---------------|--------------|-----|
| `--dss-surface-hover` | `rgba(0, 0, 0, 0.04)` | `rgba(255, 255, 255, 0.08)` | Overlay de hover sobre itens interativos |
| `--dss-surface-active` | `rgba(0, 0, 0, 0.08)` | `rgba(255, 255, 255, 0.12)` | Overlay de pressionado / active |
| `--dss-surface-selected` | `rgba(31, 134, 222, 0.12)` | `rgba(31, 134, 222, 0.24)` | Fundo de item selecionado (usa primary com opacidade) |
| `--dss-surface-disabled` | `var(--dss-gray-200)` — #f5f5f5 | `var(--dss-gray-700)` — #525252 | Fundo de superfícies em estado desabilitado |

### Surface Brand (4 tokens)

Superfícies com tint de marca — sem override de dark mode (a marca não inverte). O fallback em `:root` é `transparent`; os valores cromáticos só existem dentro de `[data-brand]`, definidos por `tokens/brand/_hub.scss`, `_water.scss` e `_waste.scss`.

> ⚠️ **Estes tokens só produzem cor dentro de um contexto `[data-brand]`.** Fora desse contexto, o resultado é `transparent` (sem tint). Não use `--dss-surface-brand-*` em componentes que possam ser renderizados sem ancestral `[data-brand]`.

| Token | Valor `:root` | Com `[data-brand="hub"]` | Com `[data-brand="water"]` | Com `[data-brand="waste"]` |
|-------|---------------|--------------------------|----------------------------|----------------------------|
| `--dss-surface-brand-subtle` | `transparent` | `rgba(239,122,17,0.08)` | `rgba(14,136,228,0.08)` | `rgba(11,129,84,0.08)` |
| `--dss-surface-brand-light` | `transparent` | `rgba(239,122,17,0.12)` | `rgba(14,136,228,0.12)` | `rgba(11,129,84,0.12)` |
| `--dss-surface-brand-medium` | `transparent` | `rgba(239,122,17,0.16)` | `rgba(14,136,228,0.16)` | `rgba(11,129,84,0.16)` |
| `--dss-surface-brand-strong` | `transparent` | `rgba(239,122,17,0.24)` | `rgba(14,136,228,0.24)` | `rgba(11,129,84,0.24)` |

---

# 5. Motion e Animação

Sistema de temporização, curvas de easing e animações predefinidas.

## 5.1 Durações Base

**Total: 10 tokens**

<!-- BEGIN:TOKEN-TABLE:motion-duracoes-base -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-duration-0` | `0ms` | — | Imediato |
| `--dss-duration-75` | `75ms` | — | Ultra rápido |
| `--dss-duration-100` | `100ms` | — | Muito rápido |
| `--dss-duration-150` | `150ms` | — | Rápido |
| `--dss-duration-200` | `200ms` | — | Moderadamente rápido |
| `--dss-duration-250` | `250ms` | — | Base (padrão) |
| `--dss-duration-300` | `300ms` | — | Moderadamente lento |
| `--dss-duration-500` | `500ms` | — | Lento |
| `--dss-duration-700` | `700ms` | — | Muito lento |
| `--dss-duration-1000` | `1000ms` | — | Ultra lento |
| `--dss-duration-instant` | `var(--dss-duration-0)` | — | — |
| `--dss-duration-fastest` | `var(--dss-duration-75)` | — | — |
| `--dss-duration-faster` | `var(--dss-duration-100)` | — | — |
| `--dss-duration-fast` | `var(--dss-duration-150)` | — | — |
| `--dss-duration-base` | `var(--dss-duration-250)` | — | Padrão WCAG amigável |
| `--dss-duration-slow` | `var(--dss-duration-300)` | — | — |
| `--dss-duration-slower` | `var(--dss-duration-500)` | — | — |
| `--dss-duration-slowest` | `var(--dss-duration-700)` | — | — |
| `--dss-duration-hover` | `var(--dss-duration-150)` | — | — |
| `--dss-duration-focus` | `var(--dss-duration-100)` | — | — |
| `--dss-duration-active` | `var(--dss-duration-100)` | — | — |
| `--dss-duration-tooltip` | `var(--dss-duration-150)` | — | — |
| `--dss-duration-base` | `var(--dss-duration-0)` | — | — |
| `--dss-duration-fast` | `var(--dss-duration-0)` | — | — |
| `--dss-duration-slow` | `var(--dss-duration-0)` | — | — |
<!-- END:TOKEN-TABLE:motion-duracoes-base -->

## 5.2 Durações Semânticas

**Total: 8 tokens**

<!-- BEGIN:TOKEN-TABLE:motion-duracoes-semanticas -->
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-duration-instant` | `var(--dss-duration-0)` | Sem animação |
| `--dss-duration-fastest` | `var(--dss-duration-75)` | 75ms |
| `--dss-duration-faster` | `var(--dss-duration-100)` | 100ms |
| `--dss-duration-fast` | `var(--dss-duration-150)` | 150ms |
| `--dss-duration-base` | `var(--dss-duration-250)` | **250ms (padrão WCAG)** |
| `--dss-duration-slow` | `var(--dss-duration-300)` | 300ms |
| `--dss-duration-slower` | `var(--dss-duration-500)` | 500ms |
| `--dss-duration-slowest` | `var(--dss-duration-700)` | 700ms |
<!-- END:TOKEN-TABLE:motion-duracoes-semanticas -->

## 5.3 Durações Interativas

**Total: 4 tokens**

<!-- BEGIN:TOKEN-TABLE:motion-duracoes-interativas -->
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-duration-hover` | `var(--dss-duration-150)` | Duração para hover |
| `--dss-duration-focus` | `var(--dss-duration-100)` | Duração para foco |
| `--dss-duration-active` | `var(--dss-duration-100)` | Duração para estado ativo |
| `--dss-duration-tooltip` | `var(--dss-duration-150)` | Duração para tooltips |
<!-- END:TOKEN-TABLE:motion-duracoes-interativas -->

## 5.4 Curvas de Easing

**Total: 14 tokens**

<!-- BEGIN:TOKEN-TABLE:motion-easing -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-easing-linear` | `cubic-bezier(0, 0, 1, 1)` | — | — |
| `--dss-easing-ease` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | — | — |
| `--dss-easing-ease-in` | `cubic-bezier(0.42, 0, 1, 1)` | — | — |
| `--dss-easing-ease-out` | `cubic-bezier(0, 0, 0.58, 1)` | — | — |
| `--dss-easing-ease-in-out` | `cubic-bezier(0.42, 0, 0.58, 1)` | — | — |
| `--dss-easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | — | — |
| `--dss-easing-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | — | — |
| `--dss-easing-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | — | — |
| `--dss-easing-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | — | — |
| `--dss-easing-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | — | — |
| `--dss-easing-hover` | `var(--dss-easing-ease-out)` | — | — |
| `--dss-easing-focus` | `var(--dss-easing-ease-out)` | — | — |
| `--dss-easing-active` | `var(--dss-easing-ease-in)` | — | — |
| `--dss-easing-modal` | `var(--dss-easing-standard)` | — | — |
| `--dss-easing-toast` | `var(--dss-easing-ease-out)` | — | — |
| `--dss-easing-tooltip` | `var(--dss-easing-ease-out)` | — | — |
<!-- END:TOKEN-TABLE:motion-easing -->

## 5.5 Atrasos

**Total: 9 tokens**

<!-- BEGIN:TOKEN-TABLE:motion-atrasos -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-delay-0` | `0ms` | — | — |
| `--dss-delay-75` | `75ms` | — | — |
| `--dss-delay-100` | `100ms` | — | — |
| `--dss-delay-150` | `150ms` | — | — |
| `--dss-delay-200` | `200ms` | — | — |
| `--dss-delay-300` | `300ms` | — | — |
| `--dss-delay-500` | `500ms` | — | — |
| `--dss-delay-700` | `700ms` | — | — |
| `--dss-delay-1000` | `1000ms` | — | — |
<!-- END:TOKEN-TABLE:motion-atrasos -->

## 5.6 Transições Semânticas

**Total: 9 tokens**

<!-- BEGIN:TOKEN-TABLE:motion-transicoes -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-transition-fast` | `all var(--dss-duration-fast) var(--dss-easing-ease-out)` | — | — |
| `--dss-transition-base` | `all var(--dss-duration-base) var(--dss-easing-standard)` | — | — |
| `--dss-transition-slow` | `all var(--dss-duration-slow) var(--dss-easing-ease-in-out)` | — | — |
| `--dss-transition-color` | `color var(--dss-duration-base) var(--dss-easing-ease)` | — | — |
| `--dss-transition-background` | `background-color var(--dss-duration-base) var(--dss-easing-ease)` | — | — |
| `--dss-transition-border` | `border-color var(--dss-duration-base) var(--dss-easing-ease)` | — | — |
| `--dss-transition-shadow` | `box-shadow var(--dss-duration-base) var(--dss-easing-ease)` | — | — |
| `--dss-transition-transform` | `transform var(--dss-duration-base) var(--dss-easing-standard)` | — | — |
| `--dss-transition-opacity` | `opacity var(--dss-duration-base) var(--dss-easing-ease)` | — | — |
| `--dss-transition-base` | `none` | — | — |
| `--dss-transition-fast` | `none` | — | — |
| `--dss-transition-slow` | `none` | — | — |
<!-- END:TOKEN-TABLE:motion-transicoes -->

## 5.7 Animações Predefinidas

**Total: 4 tokens**

<!-- BEGIN:TOKEN-TABLE:motion-animacoes -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-animation-spin` | `spin 1s linear infinite` | — | — |
| `--dss-animation-ping` | `ping 1s cubic-bezier(0, 0, 0.2, 1) infinite` | — | — |
| `--dss-animation-pulse` | `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite` | — | — |
| `--dss-animation-bounce` | `bounce 1s infinite` | — | — |
| `--dss-animation-spin` | `none` | — | — |
| `--dss-animation-pulse` | `none` | — | — |
| `--dss-animation-bounce` | `none` | — | — |
<!-- END:TOKEN-TABLE:motion-animacoes -->

## 5.8 Temporizadores

**Total: 4 tokens**

<!-- BEGIN:TOKEN-TABLE:motion-temporizadores -->
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-timing-toast` | 5000ms | Duração de exibição de toasts (5s) |
| `--dss-timing-tooltip-hide` | 300ms | Atraso para esconder tooltip |
| `--dss-timing-debounce` | 150ms | Debounce padrão |
| `--dss-timing-throttle` | 100ms | Throttle padrão |
<!-- END:TOKEN-TABLE:motion-temporizadores -->

> **Acessibilidade**: Todos os tokens de motion respeitam `prefers-reduced-motion: reduce`, desabilitando animações automaticamente.

---

# 6. Tipografia

Sistema de fontes, tamanhos e hierarquia tipográfica baseado no Guia de Acessibilidade DSS (Página 8).

## 6.1 Famílias de Fonte

**Total: 4 tokens**

<!-- BEGIN:TOKEN-TABLE:text-familias -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-font-family-mono` | `'Roboto Mono', 'SF Mono', Monaco, 'Courier New', monospace` | — | — |
| `--dss-font-family-fallback` | `sans-serif` | — | — |
<!-- END:TOKEN-TABLE:text-familias -->

## 6.2 Tamanhos de Fonte

**Total: 9 tokens**

<!-- BEGIN:TOKEN-TABLE:text-tamanhos -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-font-size-xs` | `0.75rem` | `12px` | Apenas para rótulos, não para corpo |
| `--dss-font-size-sm` | `0.875rem` | `14px` | Texto secundário mínimo |
| `--dss-font-size-md` | `1rem` | `16px` | ✅ Padrão Quasar - WCAG mínimo |
| `--dss-font-size-base` | `1rem` | `16px` | Alias para compatibilidade |
| `--dss-font-size-lg` | `1.125rem` | `18px` | Texto grande (3:1 contraste) |
| `--dss-font-size-xl` | `1.25rem` | `20px` | — |
| `--dss-font-size-2xl` | `1.5rem` | `24px` | — |
| `--dss-font-size-3xl` | `1.875rem` | `30px` | — |
| `--dss-font-size-4xl` | `2.25rem` | `36px` | — |
<!-- END:TOKEN-TABLE:text-tamanhos -->

## 6.3 Pesos de Fonte

**Total: 6 tokens**

<!-- BEGIN:TOKEN-TABLE:text-pesos -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-font-weight-light` | `300` | — | — |
| `--dss-font-weight-normal` | `400` | — | Texto corporal |
| `--dss-font-weight-medium` | `500` | — | — |
| `--dss-font-weight-semibold` | `600` | — | Ênfase |
| `--dss-font-weight-bold` | `700` | — | Títulos, forte ênfase |
| `--dss-font-weight-extrabold` | `800` | — | — |
<!-- END:TOKEN-TABLE:text-pesos -->

## 6.4 Altura de Linha

**Total: 10 tokens**

<!-- BEGIN:TOKEN-TABLE:text-line-height -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-line-height-xs` | `18px` | `12px` | — |
| `--dss-line-height-sm` | `21px` | `14px` | — |
| `--dss-line-height-md` | `24px` | `16px` | — |
| `--dss-line-height-base` | `24px` | `16px` | alias de -md |
| `--dss-line-height-lg` | `27px` | `18px` | — |
| `--dss-line-height-xl` | `30px` | `20px` | — |
| `--dss-line-height-2xl` | `36px` | `24px` | — |
| `--dss-line-height-3xl` | `45px` | `30px` | — |
| `--dss-line-height-4xl` | `54px` | `36px` | — |
| `--dss-line-height-xs-tight` | `15px` | `12px` | — |
| `--dss-line-height-sm-tight` | `18px` | `14px` | era 17,5 |
| `--dss-line-height-md-tight` | `20px` | `16px` | — |
| `--dss-line-height-lg-tight` | `23px` | `18px` | era 22,5 |
| `--dss-line-height-xl-tight` | `25px` | `20px` | — |
| `--dss-line-height-normal` | `1.5` | — | — |
| `--dss-line-height-tight` | `1.25` | — | — |
| `--dss-line-height-snug` | `1.375` | — | — |
| `--dss-line-height-relaxed` | `1.625` | — | — |
| `--dss-line-height-loose` | `1.75` | — | — |
| `--dss-line-height-md-relaxed` | `26px` | `26px` | — |
<!-- END:TOKEN-TABLE:text-line-height -->

## 6.5 Espaçamento de Letras

**Total: 6 tokens**

<!-- BEGIN:TOKEN-TABLE:text-letter-spacing -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-letter-spacing-tighter` | `-0.05em` | — | — |
| `--dss-letter-spacing-tight` | `-0.025em` | — | — |
| `--dss-letter-spacing-normal` | `0` | — | Normal para corpo |
| `--dss-letter-spacing-wide` | `0.025em` | — | — |
| `--dss-letter-spacing-wider` | `0.05em` | — | — |
| `--dss-letter-spacing-widest` | `0.1em` | — | — |
<!-- END:TOKEN-TABLE:text-letter-spacing -->

## 6.6 Hierarquia de Títulos

**Total: 19 tokens**

**⚠️ IMPORTANTE:** Escala DECRESCENTE lógica e consistente:
- **Size**: Maior título = maior tamanho (H1=36px → H6=16px) ✓
- **Weight**: Maior título = maior peso (H1=700 → H6=400) ✓
- **Line-height**: Maior título = maior espaço (H1=1.5 → H6=1.1) ✓

<!-- BEGIN:TOKEN-TABLE:text-hierarquia -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-heading-font-family` | `var(--dss-font-family-sans)` | — | — |
| `--dss-heading-1-size` | `var(--dss-font-size-4xl)` | — | — |
| `--dss-heading-1-weight` | `var(--dss-font-weight-bold)` | — | 700 |
| `--dss-heading-1-line-height` | `1.5` | `150%` | Maior |
| `--dss-heading-2-size` | `var(--dss-font-size-3xl)` | — | — |
| `--dss-heading-2-weight` | `var(--dss-font-weight-semibold)` | — | 600 |
| `--dss-heading-2-line-height` | `1.4` | `140%` | — |
| `--dss-heading-3-size` | `var(--dss-font-size-2xl)` | — | — |
| `--dss-heading-3-weight` | `var(--dss-font-weight-medium)` | — | 500 |
| `--dss-heading-3-line-height` | `1.3` | `130%` | — |
| `--dss-heading-4-size` | `var(--dss-font-size-xl)` | — | — |
| `--dss-heading-4-weight` | `var(--dss-font-weight-medium)` | — | 500 |
| `--dss-heading-4-line-height` | `1.2` | `120%` | — |
| `--dss-heading-5-size` | `var(--dss-font-size-lg)` | — | — |
| `--dss-heading-5-weight` | `var(--dss-font-weight-normal)` | — | 400 |
| `--dss-heading-5-line-height` | `1.15` | `115%` | — |
| `--dss-heading-6-size` | `var(--dss-font-size-base)` | — | — |
| `--dss-heading-6-weight` | `var(--dss-font-weight-normal)` | — | 400 |
| `--dss-heading-6-line-height` | `1.1` | `110%` | Menor |
<!-- END:TOKEN-TABLE:text-hierarquia -->

**📊 Escala DECRESCENTE Consistente:**
```
H1: Size=36px | Weight=700 | Line-height=1.5  (150%)  ← Maior em TUDO
H2: Size=30px | Weight=600 | Line-height=1.4  (140%)  ↓
H3: Size=24px | Weight=500 | Line-height=1.3  (130%)  ↓ Decrescente
H4: Size=20px | Weight=500 | Line-height=1.2  (120%)  ↓ Contínuo
H5: Size=18px | Weight=400 | Line-height=1.15 (115%)  ↓
H6: Size=16px | Weight=400 | Line-height=1.1  (110%)  ← Menor em TUDO

✅ Amplitude: 0.4 (1.5 → 1.1) - Escala bem distribuída
✅ Lógica: DECRESCENTE em size, weight E line-height
```

## 6.7 Utilitários de Legibilidade

**Total: 2 tokens**

<!-- BEGIN:TOKEN-TABLE:text-utilitarios -->
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-dyslexia-friendly-spacing` | 0.075em | Espaçamento para dislexia |
| `--dss-low-vision-scale` | 1.1 | Aumento para baixa visão |
<!-- END:TOKEN-TABLE:text-utilitarios -->

---

# 7. Acessibilidade

Tokens para garantir conformidade WCAG 2.1 AA (foco, touch targets, contraste).

## 7.1 Focus - Configurações Base

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-focus-base -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-focus-ring-width` | `3px` | `3px` | — |
| `--dss-focus-ring-offset` | `2px` | `2px` | — |
| `--dss-focus-ring-style` | `solid` | — | — |
| `--dss-focus-ring-opacity` | `0.5` | — | — |
| `--dss-focus-duration` | `150ms` | — | — |
| `--dss-focus-easing` | `ease-in-out` | — | — |
| `--dss-focus-primary` | `rgba(0, 106, 197, 0.5)` | — | — |
| `--dss-focus-primary-rgb` | `0, 106, 197` | — | — |
| `--dss-focus-secondary` | `rgba(5, 156, 141, 0.5)` | — | — |
| `--dss-focus-secondary-rgb` | `5, 156, 141` | — | — |
| `--dss-focus-tertiary` | `rgba(227, 89, 0, 0.5)` | — | — |
| `--dss-focus-tertiary-rgb` | `227, 89, 0` | — | — |
| `--dss-focus-accent` | `rgba(176, 46, 197, 0.5)` | — | — |
| `--dss-focus-accent-rgb` | `176, 46, 197` | — | — |
| `--dss-focus-positive` | `rgba(52, 195, 12, 0.5)` | — | — |
| `--dss-focus-positive-rgb` | `52, 195, 12` | — | — |
| `--dss-focus-negative` | `rgba(196, 0, 27, 0.5)` | — | — |
| `--dss-focus-negative-rgb` | `196, 0, 27` | — | — |
| `--dss-focus-warning` | `rgba(233, 171, 0, 0.6)` | — | — |
| `--dss-focus-warning-rgb` | `233, 171, 0` | — | — |
| `--dss-focus-info` | `rgba(13, 178, 213, 0.5)` | — | — |
| `--dss-focus-info-rgb` | `13, 178, 213` | — | — |
| `--dss-focus-light` | `rgba(255, 255, 255, 0.7)` | — | — |
| `--dss-focus-light-rgb` | `255, 255, 255` | — | — |
| `--dss-focus-dark` | `rgba(62, 62, 62, 0.5)` | — | — |
| `--dss-focus-dark-rgb` | `62, 62, 62` | — | — |
| `--dss-focus-inverse` | `var(--dss-focus-light)` | — | — |
| `--dss-focus-primary` | `rgba(51, 153, 229, 0.6)` | — | — |
| `--dss-focus-primary-rgb` | `51, 153, 229` | — | — |
| `--dss-focus-secondary` | `rgba(38, 179, 164, 0.6)` | — | — |
| `--dss-focus-secondary-rgb` | `38, 179, 164` | — | — |
| `--dss-focus-tertiary` | `rgba(255, 128, 51, 0.6)` | — | — |
| `--dss-focus-tertiary-rgb` | `255, 128, 51` | — | — |
| `--dss-focus-accent` | `rgba(208, 102, 229, 0.6)` | — | — |
| `--dss-focus-accent-rgb` | `208, 102, 229` | — | — |
| `--dss-focus-positive` | `rgba(102, 229, 51, 0.6)` | — | — |
| `--dss-focus-positive-rgb` | `102, 229, 51` | — | — |
| `--dss-focus-negative` | `rgba(229, 51, 77, 0.6)` | — | — |
| `--dss-focus-negative-rgb` | `229, 51, 77` | — | — |
| `--dss-focus-warning` | `rgba(255, 198, 51, 0.7)` | — | — |
| `--dss-focus-warning-rgb` | `255, 198, 51` | — | — |
| `--dss-focus-info` | `rgba(51, 204, 242, 0.6)` | — | — |
| `--dss-focus-info-rgb` | `51, 204, 242` | — | — |
| `--dss-focus-dark` | `rgba(128, 128, 128, 0.6)` | — | — |
| `--dss-focus-dark-rgb` | `128, 128, 128` | — | — |
| `--dss-focus-inverse` | `var(--dss-focus-light)` | — | — |
| `--dss-focus-primary` | `rgba(191, 89, 15, 0.5)` | — | — |
| `--dss-focus-primary-rgb` | `191, 89, 15` | — | — |
| `--dss-focus-shadow-primary` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary)` | — | — |
| `--dss-focus-primary` | `rgba(248, 170, 63, 0.6)` | — | — |
| `--dss-focus-primary-rgb` | `248, 170, 63` | — | — |
| `--dss-focus-shadow-primary` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary)` | — | — |
| `--dss-focus-primary` | `rgba(2, 108, 199, 0.5)` | — | — |
| `--dss-focus-primary-rgb` | `2, 108, 199` | — | — |
| `--dss-focus-shadow-primary` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary)` | — | — |
| `--dss-focus-primary` | `rgba(56, 166, 248, 0.6)` | — | — |
| `--dss-focus-primary-rgb` | `56, 166, 248` | — | — |
| `--dss-focus-shadow-primary` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary)` | — | — |
| `--dss-focus-primary` | `rgba(10, 114, 78, 0.5)` | — | — |
| `--dss-focus-primary-rgb` | `10, 114, 78` | — | — |
| `--dss-focus-shadow-primary` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary)` | — | — |
| `--dss-focus-primary` | `rgba(24, 177, 115, 0.6)` | — | — |
| `--dss-focus-primary-rgb` | `24, 177, 115` | — | — |
| `--dss-focus-shadow-primary` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary)` | — | — |
| `--dss-focus-shadow-primary` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary)` | — | — |
| `--dss-focus-shadow-secondary` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-secondary)` | — | — |
| `--dss-focus-shadow-tertiary` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-tertiary)` | — | — |
| `--dss-focus-shadow-accent` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-accent)` | — | — |
| `--dss-focus-shadow-success` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-success)` | — | — |
| `--dss-focus-shadow-error` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-error)` | — | — |
| `--dss-focus-shadow-warning` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-warning)` | — | — |
| `--dss-focus-shadow-info` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-info)` | — | — |
| `--dss-focus-shadow-light` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-light)` | — | — |
| `--dss-focus-shadow-dark` | `0 0 0 var(--dss-focus-ring-width) var(--dss-focus-dark)` | — | — |
| `--dss-focus-ring-opacity` | `0.8` | — | — |
| `--dss-focus-ring-width` | `4px` | `4px` | — |
| `--dss-focus-primary` | `rgba(31, 134, 222, 0.8)` | — | — |
| `--dss-focus-error` | `rgba(216, 24, 46, 0.8)` | — | — |
| `--dss-focus-success` | `rgba(77, 210, 40, 0.8)` | — | — |
| `--dss-focus-primary` | `rgba(134, 192, 243, 0.9)` | — | — |
| `--dss-focus-error` | `rgba(255, 160, 171, 0.9)` | — | — |
| `--dss-focus-success` | `rgba(129, 230, 99, 0.9)` | — | — |
| `--dss-focus-primary` | `Highlight` | — | — |
| `--dss-focus-error` | `Highlight` | — | — |
| `--dss-focus-success` | `Highlight` | — | — |
| `--dss-focus-warning` | `Highlight` | — | — |
| `--dss-focus-info` | `Highlight` | — | — |
| `--dss-focus-ring-width` | `3px` | `3px` | — |
| `--dss-focus-ring-style` | `solid` | — | — |
<!-- END:TOKEN-TABLE:accessibility-focus-base -->

## 7.2 Focus - Cores Semânticas

**Total: 8 tokens** (Light Mode)

<!-- BEGIN:TOKEN-TABLE:accessibility-focus-cores-semanticas -->
| Token | Valor RGBA | RGB | Uso |
|-------|------------|-----|-----|
| `--dss-focus-primary` | rgba(0, 106, 197, 0.5) | 0, 106, 197 | Focus primary |
| `--dss-focus-primary-rgb` | 0, 106, 197 | - | RGB para manipulação |
| `--dss-focus-secondary` | rgba(5, 156, 141, 0.5) | 5, 156, 141 | Focus secondary |
| `--dss-focus-secondary-rgb` | 5, 156, 141 | - | RGB para manipulação |
| `--dss-focus-tertiary` | rgba(227, 89, 0, 0.5) | 227, 89, 0 | Focus tertiary |
| `--dss-focus-tertiary-rgb` | 227, 89, 0 | - | RGB para manipulação |
| `--dss-focus-accent` | rgba(176, 46, 197, 0.5) | 176, 46, 197 | Focus accent |
| `--dss-focus-accent-rgb` | 176, 46, 197 | - | RGB para manipulação |
<!-- END:TOKEN-TABLE:accessibility-focus-cores-semanticas -->

## 7.3 Focus - Cores de Feedback

**Total: 8 tokens** (Light Mode)

<!-- BEGIN:TOKEN-TABLE:accessibility-focus-feedback -->
| Token | Valor RGBA | RGB | Uso |
|-------|------------|-----|-----|
| `--dss-focus-positive` | rgba(52, 195, 12, 0.5) | 52, 195, 12 | Focus success |
| `--dss-focus-positive-rgb` | 52, 195, 12 | - | RGB para manipulação |
| `--dss-focus-negative` | rgba(196, 0, 27, 0.5) | 196, 0, 27 | Focus error |
| `--dss-focus-negative-rgb` | 196, 0, 27 | - | RGB para manipulação |
| `--dss-focus-warning` | rgba(233, 171, 0, 0.6) | 233, 171, 0 | Focus warning (60% para contraste) |
| `--dss-focus-warning-rgb` | 233, 171, 0 | - | RGB para manipulação |
| `--dss-focus-info` | rgba(13, 178, 213, 0.5) | 13, 178, 213 | Focus info |
| `--dss-focus-info-rgb` | 13, 178, 213 | - | RGB para manipulação |
<!-- END:TOKEN-TABLE:accessibility-focus-feedback -->

## 7.4 Focus - Cores Neutras

**Total: 3 tokens** (Light Mode)

<!-- BEGIN:TOKEN-TABLE:accessibility-focus-neutras -->
| Token | Valor RGBA | RGB | Uso |
|-------|------------|-----|-----|
| `--dss-focus-light` | rgba(255, 255, 255, 0.7) | 255, 255, 255 | Focus em fundos escuros |
| `--dss-focus-dark` | rgba(62, 62, 62, 0.5) | 62, 62, 62 | Focus em fundos claros |
| `--dss-focus-inverse` | `var(--dss-focus-light)` | - | Inversão automática |
<!-- END:TOKEN-TABLE:accessibility-focus-neutras -->

## 7.5 Focus - Box Shadows

**Total: 10 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-focus-shadows -->
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-focus-shadow-primary` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary) | Shadow primary |
| `--dss-focus-shadow-secondary` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-secondary) | Shadow secondary |
| `--dss-focus-shadow-tertiary` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-tertiary) | Shadow tertiary |
| `--dss-focus-shadow-accent` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-accent) | Shadow accent |
| `--dss-focus-shadow-success` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-success) | Shadow success |
| `--dss-focus-shadow-error` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-error) | Shadow error |
| `--dss-focus-shadow-warning` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-warning) | Shadow warning |
| `--dss-focus-shadow-info` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-info) | Shadow info |
| `--dss-focus-shadow-light` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-light) | Shadow light |
| `--dss-focus-shadow-dark` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-dark) | Shadow dark |
<!-- END:TOKEN-TABLE:accessibility-focus-shadows -->

## 7.6 Focus - Variantes com Offset

**Total: 4 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-focus-offset -->
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-focus-shadow-primary-offset` | 0 0 0 var(--dss-focus-ring-offset) transparent, 0 0 0 calc(...) var(--dss-focus-primary) | Offset primary |
| `--dss-focus-shadow-error-offset` | 0 0 0 var(--dss-focus-ring-offset) transparent, 0 0 0 calc(...) var(--dss-focus-error) | Offset error |
| `--dss-focus-shadow-success-offset` | 0 0 0 var(--dss-focus-ring-offset) transparent, 0 0 0 calc(...) var(--dss-focus-success) | Offset success |
| `--dss-focus-shadow-warning-offset` | 0 0 0 var(--dss-focus-ring-offset) transparent, 0 0 0 calc(...) var(--dss-focus-warning) | Offset warning |
<!-- END:TOKEN-TABLE:accessibility-focus-offset -->

## 7.7 Touch Targets

**Total: 6 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-touch-targets -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-touch-target-xs` | `32px` | `32px` | Componentes compactos (chips, badges) |
| `--dss-touch-target-sm` | `36px` | `36px` | Botões secundários densos |
| `--dss-touch-target-md` | `44px` | `44px` | ✅ Padrão - WCAG mínimo (44px) |
| `--dss-touch-target-lg` | `52px` | `52px` | Botões destacados |
| `--dss-touch-target-xl` | `64px` | `64px` | CTAs principais e ações primárias |
<!-- END:TOKEN-TABLE:accessibility-touch-targets -->

> **⚠️ IMPORTANTE**: Use `--dss-touch-target-min` (48px) como padrão para pseudo-elementos de touch target em Compact Controls. Este valor atende WCAG 2.5.5 com margem de segurança.

## 7.8 Touch Spacing

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-touch-spacing -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-component-margin-xs` | `8px` | `8px` | — |
| `--dss-component-margin-sm` | `12px` | `12px` | — |
| `--dss-component-margin-md` | `16px` | `16px` | Padrão |
| `--dss-component-margin-lg` | `24px` | `24px` | — |
| `--dss-component-margin-xl` | `32px` | `32px` | — |
<!-- END:TOKEN-TABLE:accessibility-touch-spacing -->

## 7.9 Input Heights

**Total: 10 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-input-heights -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-form-control-height-xs` | `32px` | `32px` | Controles compactos |
| `--dss-form-control-height-sm` | `36px` | `36px` | Controles densos |
| `--dss-form-control-height-md` | `44px` | `44px` | ✅ Padrão - WCAG mínimo |
| `--dss-form-control-height-lg` | `52px` | `52px` | Controles destacados |
| `--dss-form-control-height-xl` | `64px` | `64px` | Controles extra grandes |
| `--dss-input-height-xs` | `var(--dss-form-control-height-xs)` | — | — |
| `--dss-input-height-sm` | `var(--dss-form-control-height-sm)` | — | — |
| `--dss-input-height-md` | `var(--dss-form-control-height-md)` | — | — |
| `--dss-input-height-lg` | `var(--dss-form-control-height-lg)` | — | — |
| `--dss-input-height-xl` | `var(--dss-form-control-height-xl)` | — | — |
| `--dss-component-padding-xs` | `8px` | `8px` | — |
| `--dss-component-padding-sm` | `12px` | `12px` | — |
| `--dss-component-padding-md` | `16px` | `16px` | Padrão |
| `--dss-component-padding-lg` | `20px` | `20px` | — |
| `--dss-component-padding-xl` | `24px` | `24px` | — |
<!-- END:TOKEN-TABLE:accessibility-input-heights -->

## 7.10 Checkboxes e Controles

**Total: 10 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-checkboxes -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-checkbox-size-xs` | `16px` | `16px` | — |
| `--dss-checkbox-size-sm` | `18px` | `18px` | — |
| `--dss-checkbox-size-md` | `20px` | `20px` | Padrão visual |
| `--dss-checkbox-size-lg` | `24px` | `24px` | — |
| `--dss-checkbox-size-xl` | `28px` | `28px` | — |
| `--dss-checkbox-touch-area-xs` | `36px` | `36px` | — |
| `--dss-checkbox-touch-area-sm` | `40px` | `40px` | — |
| `--dss-checkbox-touch-area-md` | `44px` | `44px` | ✅ WCAG mínimo |
| `--dss-checkbox-touch-area-lg` | `52px` | `52px` | — |
| `--dss-checkbox-touch-area-xl` | `60px` | `60px` | — |
<!-- END:TOKEN-TABLE:accessibility-checkboxes -->

## 7.11 Ícones

**Total: 10 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-icons -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-icon-size-xs` | `16px` | `16px` | Ícones inline |
| `--dss-icon-size-sm` | `20px` | `20px` | Ícones secundários |
| `--dss-icon-size-md` | `24px` | `24px` | ✅ Padrão - Ícones interativos |
| `--dss-icon-size-lg` | `32px` | `32px` | Ícones destacados |
| `--dss-icon-size-xl` | `48px` | `48px` | Ícones grandes (avatares, etc) |
| `--dss-icon-spacing-xs` | `4px` | `4px` | — |
| `--dss-icon-spacing-sm` | `6px` | `6px` | — |
| `--dss-icon-spacing-md` | `8px` | `8px` | Padrão |
| `--dss-icon-spacing-lg` | `12px` | `12px` | — |
| `--dss-icon-spacing-xl` | `16px` | `16px` | — |
<!-- END:TOKEN-TABLE:accessibility-icons -->

## 7.12 Avatares

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-avatares -->
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-avatar-size-xs` | 24px | Avatar pequeno |
| `--dss-avatar-size-sm` | 32px | Avatar compacto |
| `--dss-avatar-size-md` | 40px | **Avatar padrão** |
| `--dss-avatar-size-lg` | 56px | Avatar grande |
| `--dss-avatar-size-xl` | 80px | Avatar extra grande |
<!-- END:TOKEN-TABLE:accessibility-avatares -->

## 7.13 Compact Controls - Alturas Visuais

**Total: 4 tokens**

> **⚠️ IMPORTANTE: Altura Visual vs Touch Target**
>
> Os tokens abaixo definem a **altura visual** do componente, NÃO o touch target.
> O touch target mínimo (48×48px WCAG) é garantido por outros mecanismos:
> - Padding expandido invisível
> - Pseudo-elementos `::before`/`::after`
> - Área de clique estendida via CSS
>
> **Consulte:** Seção "Touch Target vs Visual Height" no DSS_IMPLEMENTATION_GUIDE.md

### Definição

<!-- BEGIN:TOKEN-TABLE:accessibility-compact-controls -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-compact-control-height-xs` | `20px` | `20px` | Badge/Chip extra small |
| `--dss-compact-control-height-sm` | `24px` | `24px` | Badge/Chip small |
| `--dss-compact-control-height-md` | `28px` | `28px` | Badge/Chip medium (padrão) |
| `--dss-compact-control-height-lg` | `32px` | `32px` | Badge/Chip large |
| `--dss-chip-height-xs` | `var(--dss-compact-control-height-xs)` | — | — |
| `--dss-chip-height-sm` | `var(--dss-compact-control-height-sm)` | — | — |
| `--dss-chip-height-md` | `var(--dss-compact-control-height-md)` | — | — |
| `--dss-chip-height-lg` | `var(--dss-compact-control-height-lg)` | — | — |
| `--dss-chip-height-xl` | `var(--dss-compact-control-height-lg)` | — | xl → lg (sem diferença visual) |
<!-- END:TOKEN-TABLE:accessibility-compact-controls -->

### Filosofia de Uso

```scss
// ✅ CORRETO: Componente consome token genérico
.dss-chip--md {
  min-height: var(--dss-compact-control-height-md); // 28px visual
  // Touch target garantido via padding ou pseudo-elemento
}

.dss-badge--md {
  min-height: var(--dss-compact-control-height-md); // 28px visual
}

// ❌ INCORRETO: Não criar tokens específicos de componente
// --dss-chip-height-md: 28px; // DEPRECADO
// --dss-badge-size-md: 24px;  // DEPRECADO
```

### Garantia de Touch Target (WCAG 2.5.5)

Os componentes que usam estes tokens DEVEM garantir touch target mínimo de 48×48px via:

```scss
// Exemplo de implementação do touch target via pseudo-elemento
.dss-chip {
  position: relative;
  min-height: var(--dss-compact-control-height-md); // 28px visual

  // Touch target expandido (invisível)
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: var(--dss-touch-target-min);  // 48px
    min-height: var(--dss-touch-target-min); // 48px
    pointer-events: none; // ⚠️ NÃO REMOVER - ver nota
  }
}
```

> **⚠️ `pointer-events: none` é OBRIGATÓRIO**: O pseudo-elemento existe apenas para ferramentas de acessibilidade aferir a área de toque. Ele NÃO deve interceptar eventos. Isto é decisão arquitetural, não bug.

### Mapeamento de Componentes

| Componente | Size Prop | Token Consumido | Touch Target |
|------------|-----------|-----------------|--------------|
| DssBadge | xs | `--dss-compact-control-height-xs` (20px) | Via padding |
| DssBadge | sm | `--dss-compact-control-height-sm` (24px) | Via padding |
| DssBadge | md | `--dss-compact-control-height-md` (28px) | Via padding |
| DssBadge | lg | `--dss-compact-control-height-lg` (32px) | Já atende |
| DssChip | xs | `--dss-compact-control-height-xs` (20px) | Via ::before |
| DssChip | sm | `--dss-compact-control-height-sm` (24px) | Via ::before |
| DssChip | md | `--dss-compact-control-height-md` (28px) | Via ::before |
| DssChip | lg | `--dss-compact-control-height-lg` (32px) | Já atende |

## 7.14 Breakpoints

**Total: 9 tokens**

<!-- BEGIN:TOKEN-TABLE:breakpoints -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-breakpoint-xs` | `320px` | `320px` | Mobile pequeno, zoom 300% |
| `--dss-breakpoint-sm` | `640px` | `640px` | Mobile, zoom 200% |
| `--dss-breakpoint-md` | `768px` | `768px` | Tablet |
| `--dss-breakpoint-lg` | `1024px` | `1024px` | Desktop pequeno |
| `--dss-breakpoint-xl` | `1280px` | `1280px` | Desktop padrão |
| `--dss-breakpoint-2xl` | `1536px` | `1536px` | Desktop grande |
| `--dss-breakpoint-zoom-200` | `800px` | `800px` | Para usuários com zoom 200% |
| `--dss-breakpoint-zoom-300` | `600px` | `600px` | Para usuários com zoom 300% |
| `--dss-breakpoint-reflow` | `320px` | `320px` | Mínimo para reflow (WCAG) |
<!-- END:TOKEN-TABLE:breakpoints -->

### 7.14.1 Variáveis SCSS de Breakpoint (uso exclusivo em @media queries)

CSS custom properties não podem ser usadas diretamente em `@media` queries. Para esse caso, use as variáveis SCSS abaixo com a sintaxe `@media (max-width: #{$var})`.

| Variável SCSS | Valor | Uso |
|---------------|-------|-----|
| `$dss-breakpoint-mobile-max` | `768px` | Breakpoint mobile/tablet (alinhado com Quasar Framework). Uso em componentes com comportamento responsivo mobile, ex: DssBadge floating. Distinto de `--dss-breakpoint-sm` (640px, Tailwind). |

> **Nota**: Estas variáveis são definidas em `tokens/semantic/_breakpoints.scss` e devem ser importadas com `@use '../../../../tokens/semantic/breakpoints' as bp;`.

## 7.15 Z-Index

**Total: 10 tokens**

<!-- BEGIN:TOKEN-TABLE:z-index -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-z-index-base` | `1` | — | — |
| `--dss-z-index-dropdown` | `1000` | — | — |
| `--dss-z-index-sticky` | `1020` | — | — |
| `--dss-z-index-fixed` | `1030` | — | — |
| `--dss-z-index-backdrop` | `1040` | — | — |
| `--dss-z-index-modal` | `1050` | — | — |
| `--dss-z-index-popover` | `1060` | — | — |
| `--dss-z-index-tooltip` | `1070` | — | — |
| `--dss-z-index-notification` | `1080` | — | — |
| `--dss-z-index-focus` | `9999` | — | Garantir que foco fique acima |
<!-- END:TOKEN-TABLE:z-index -->

## 7.16 Contraste - Ratios WCAG

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-contrast-ratios -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-contrast-safe-text` | `var(--dss-text-body)` | — | Uso seguro para texto |
| `--dss-contrast-safe-ui` | `var(--dss-action-primary)` | — | Uso seguro para UI |
| `--dss-contrast-safe-graphics` | `var(--dss-negative)` | — | Uso seguro para gráficos |
| `--dss-contrast-check-small-text` | `"Garantir ≥ 4.5:1"` | — | — |
| `--dss-contrast-check-large-text` | `"Garantir ≥ 3:1"` | — | — |
| `--dss-contrast-check-ui` | `"Garantir ≥ 3:1"` | — | — |
<!-- END:TOKEN-TABLE:accessibility-contrast-ratios -->

## 7.17 Contraste - Combinações Validadas

**Total: 20 tokens**

<!-- BEGIN:TOKEN-TABLE:accessibility-contrast-combinacoes -->
| Token | Valor | Status | Uso |
|-------|-------|--------|-----|
| `--dss-contrast-primary-on-white` | 4.6 | ✅ APROVADO | Primary sobre branco |
| `--dss-contrast-primary-on-gray50` | 4.8 | ✅ APROVADO | Primary sobre gray-50 |
| `--dss-contrast-primary-on-gray100` | 3.9 | ❌ NÃO USAR | Primary sobre gray-100 |
| `--dss-contrast-secondary-on-white` | 3.2 | ⚠️ SÓ TEXTO GRANDE | Secondary sobre branco |
| `--dss-contrast-tertiary-on-white` | 3.1 | ⚠️ SÓ TEXTO GRANDE | Tertiary sobre branco |
| `--dss-contrast-positive-on-white` | 2.4 | ❌ NUNCA TEXTO | Positive sobre branco |
| `--dss-contrast-positive-on-gray900` | 7.8 | ✅ APROVADO | Positive sobre gray-900 |
| `--dss-contrast-negative-on-white` | 7.1 | ✅ APROVADO | Negative sobre branco |
| `--dss-contrast-warning-on-white` | 1.9 | ❌ NUNCA TEXTO | Warning sobre branco |
| `--dss-contrast-warning-on-gray900` | 11.2 | ✅ APROVADO | Warning sobre gray-900 |
| `--dss-contrast-info-on-white` | 1.8 | ❌ NUNCA TEXTO | Info sobre branco |
| `--dss-contrast-info-on-gray900` | 9.6 | ✅ APROVADO | Info sobre gray-900 |
| `--dss-contrast-hub500-on-white` | 2.9 | ❌ NUNCA TEXTO | Hub sobre branco |
| `--dss-contrast-hub500-on-gray900` | 8.3 | ✅ APROVADO | Hub sobre gray-900 |
| `--dss-contrast-water500-on-white` | 4.6 | ✅ APROVADO | Water sobre branco |
| `--dss-contrast-water500-on-gray900` | 11.1 | ✅ APROVADO | Water sobre gray-900 |
| `--dss-contrast-waste500-on-white` | 3.1 | ⚠️ SÓ TEXTO GRANDE | Waste sobre branco |
| `--dss-contrast-dark-on-white` | 12.3 | ✅ APROVADO | Dark sobre branco |
| `--dss-contrast-gray600-on-white` | 4.8 | ✅ APROVADO | Gray-600 sobre branco |
| `--dss-contrast-gray700-on-white` | 7.3 | ✅ APROVADO | Gray-700 sobre branco |
<!-- END:TOKEN-TABLE:accessibility-contrast-combinacoes -->

---

# 8. Borders

Sistema de bordas para todos os componentes.

## 8.1 Border Widths

**Total: 7 tokens**

<!-- BEGIN:TOKEN-TABLE:border-widths -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-border-width-none` | `0` | — | — |
| `--dss-border-width-hairline` | `0.5px` | `0.5px` | — |
| `--dss-border-width-thin` | `1px` | `1px` | — |
| `--dss-border-width-md` | `2px` | `2px` | — |
| `--dss-border-width-thick` | `3px` | `3px` | — |
| `--dss-border-width-heavy` | `4px` | `4px` | — |
| `--dss-border-width-extra-heavy` | `8px` | `8px` | — |
<!-- END:TOKEN-TABLE:border-widths -->

## 8.2 Bordas Neutras

**Total: 11 tokens**

<!-- BEGIN:TOKEN-TABLE:borders-neutras -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-border-gray-50` | `1px solid var(--dss-gray-50)` | — | — |
| `--dss-border-gray-100` | `1px solid var(--dss-gray-100)` | — | — |
| `--dss-border-gray-200` | `1px solid var(--dss-gray-200)` | — | — |
| `--dss-border-gray-300` | `1px solid var(--dss-gray-300)` | — | — |
| `--dss-border-gray-400` | `1px solid var(--dss-gray-400)` | — | — |
| `--dss-border-gray-500` | `1px solid var(--dss-gray-500)` | — | — |
| `--dss-border-gray-600` | `1px solid var(--dss-gray-600)` | — | — |
| `--dss-border-gray-700` | `1px solid var(--dss-gray-700)` | — | — |
| `--dss-border-gray-800` | `1px solid var(--dss-gray-800)` | — | — |
| `--dss-border-gray-900` | `1px solid var(--dss-gray-900)` | — | — |
| `--dss-border-gray-950` | `1px solid var(--dss-gray-950)` | — | — |
<!-- END:TOKEN-TABLE:borders-neutras -->

## 8.3 Bordas de Ação

**Total: 25 tokens**

### Primary

<!-- BEGIN:TOKEN-TABLE:borders-acao -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-border-primary-disable` | `1px solid var(--dss-primary-disable)` | — | — |
| `--dss-border-primary-light` | `1px solid var(--dss-primary-light)` | — | — |
| `--dss-border-primary` | `1px solid var(--dss-primary)` | — | — |
| `--dss-border-primary-hover` | `1px solid var(--dss-primary-hover)` | — | — |
| `--dss-border-primary-deep` | `1px solid var(--dss-primary-deep)` | — | — |
| `--dss-border-secondary-disable` | `1px solid var(--dss-secondary-disable)` | — | — |
| `--dss-border-secondary-light` | `1px solid var(--dss-secondary-light)` | — | — |
| `--dss-border-secondary` | `1px solid var(--dss-secondary)` | — | — |
| `--dss-border-secondary-hover` | `1px solid var(--dss-secondary-hover)` | — | — |
| `--dss-border-secondary-deep` | `1px solid var(--dss-secondary-deep)` | — | — |
| `--dss-border-tertiary-disable` | `1px solid var(--dss-tertiary-disable)` | — | — |
| `--dss-border-tertiary-light` | `1px solid var(--dss-tertiary-light)` | — | — |
| `--dss-border-tertiary` | `1px solid var(--dss-tertiary)` | — | — |
| `--dss-border-tertiary-hover` | `1px solid var(--dss-tertiary-hover)` | — | — |
| `--dss-border-tertiary-deep` | `1px solid var(--dss-tertiary-deep)` | — | — |
| `--dss-border-accent-disable` | `1px solid var(--dss-accent-disable)` | — | — |
| `--dss-border-accent-light` | `1px solid var(--dss-accent-light)` | — | — |
| `--dss-border-accent` | `1px solid var(--dss-accent)` | — | — |
| `--dss-border-accent-hover` | `1px solid var(--dss-accent-hover)` | — | — |
| `--dss-border-accent-deep` | `1px solid var(--dss-accent-deep)` | — | — |
<!-- END:TOKEN-TABLE:borders-acao -->

### Secondary

| Token | Valor |
|-------|-------|
| `--dss-border-secondary-disable` | 1px solid var(--dss-secondary-disable) |
| `--dss-border-secondary-light` | 1px solid var(--dss-secondary-light) |
| `--dss-border-secondary` | 1px solid var(--dss-secondary) |
| `--dss-border-secondary-hover` | 1px solid var(--dss-secondary-hover) |
| `--dss-border-secondary-deep` | 1px solid var(--dss-secondary-deep) |

### Tertiary

| Token | Valor |
|-------|-------|
| `--dss-border-tertiary-disable` | 1px solid var(--dss-tertiary-disable) |
| `--dss-border-tertiary-light` | 1px solid var(--dss-tertiary-light) |
| `--dss-border-tertiary` | 1px solid var(--dss-tertiary) |
| `--dss-border-tertiary-hover` | 1px solid var(--dss-tertiary-hover) |
| `--dss-border-tertiary-deep` | 1px solid var(--dss-tertiary-deep) |

### Accent

| Token | Valor |
|-------|-------|
| `--dss-border-accent-disable` | 1px solid var(--dss-accent-disable) |
| `--dss-border-accent-light` | 1px solid var(--dss-accent-light) |
| `--dss-border-accent` | 1px solid var(--dss-accent) |
| `--dss-border-accent-hover` | 1px solid var(--dss-accent-hover) |
| `--dss-border-accent-deep` | 1px solid var(--dss-accent-deep) |

## 8.4 Bordas de Feedback

**Total: 20 tokens**

### Positive

<!-- BEGIN:TOKEN-TABLE:borders-feedback -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-border-positive-disable` | `1px solid var(--dss-positive-disable)` | — | — |
| `--dss-border-positive-light` | `1px solid var(--dss-positive-light)` | — | — |
| `--dss-border-positive` | `1px solid var(--dss-positive)` | — | — |
| `--dss-border-positive-hover` | `1px solid var(--dss-positive-hover)` | — | — |
| `--dss-border-positive-deep` | `1px solid var(--dss-positive-deep)` | — | — |
| `--dss-border-negative-disable` | `1px solid var(--dss-negative-disable)` | — | — |
| `--dss-border-negative-light` | `1px solid var(--dss-negative-light)` | — | — |
| `--dss-border-negative` | `1px solid var(--dss-negative)` | — | — |
| `--dss-border-negative-hover` | `1px solid var(--dss-negative-hover)` | — | — |
| `--dss-border-negative-deep` | `1px solid var(--dss-negative-deep)` | — | — |
| `--dss-border-warning-disable` | `1px solid var(--dss-warning-disable)` | — | — |
| `--dss-border-warning-light` | `1px solid var(--dss-warning-light)` | — | — |
| `--dss-border-warning` | `1px solid var(--dss-warning)` | — | — |
| `--dss-border-warning-hover` | `1px solid var(--dss-warning-hover)` | — | — |
| `--dss-border-warning-deep` | `1px solid var(--dss-warning-deep)` | — | — |
| `--dss-border-info-disable` | `1px solid var(--dss-info-disable)` | — | — |
| `--dss-border-info-light` | `1px solid var(--dss-info-light)` | — | — |
| `--dss-border-info` | `1px solid var(--dss-info)` | — | — |
| `--dss-border-info-hover` | `1px solid var(--dss-info-hover)` | — | — |
| `--dss-border-info-deep` | `1px solid var(--dss-info-deep)` | — | — |
<!-- END:TOKEN-TABLE:borders-feedback -->

### Negative

| Token | Valor |
|-------|-------|
| `--dss-border-negative-disable` | 1px solid var(--dss-negative-disable) |
| `--dss-border-negative-light` | 1px solid var(--dss-negative-light) |
| `--dss-border-negative` | 1px solid var(--dss-negative) |
| `--dss-border-negative-hover` | 1px solid var(--dss-negative-hover) |
| `--dss-border-negative-deep` | 1px solid var(--dss-negative-deep) |

### Warning

| Token | Valor |
|-------|-------|
| `--dss-border-warning-disable` | 1px solid var(--dss-warning-disable) |
| `--dss-border-warning-light` | 1px solid var(--dss-warning-light) |
| `--dss-border-warning` | 1px solid var(--dss-warning) |
| `--dss-border-warning-hover` | 1px solid var(--dss-warning-hover) |
| `--dss-border-warning-deep` | 1px solid var(--dss-warning-deep) |

### Info

| Token | Valor |
|-------|-------|
| `--dss-border-info-disable` | 1px solid var(--dss-info-disable) |
| `--dss-border-info-light` | 1px solid var(--dss-info-light) |
| `--dss-border-info` | 1px solid var(--dss-info) |
| `--dss-border-info-hover` | 1px solid var(--dss-info-hover) |
| `--dss-border-info-deep` | 1px solid var(--dss-info-deep) |

## 8.5 Bordas de Marca

**Total: 33 tokens**

### Hub (11 tokens)

<!-- BEGIN:TOKEN-TABLE:borders-marca -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-border-hub-50` | `1px solid var(--dss-hub-50)` | — | — |
| `--dss-border-hub-100` | `1px solid var(--dss-hub-100)` | — | — |
| `--dss-border-hub-200` | `1px solid var(--dss-hub-200)` | — | — |
| `--dss-border-hub-300` | `1px solid var(--dss-hub-300)` | — | — |
| `--dss-border-hub-400` | `1px solid var(--dss-hub-400)` | — | — |
| `--dss-border-hub-500` | `1px solid var(--dss-hub-500)` | — | — |
| `--dss-border-hub-600` | `1px solid var(--dss-hub-600)` | — | — |
| `--dss-border-hub-700` | `1px solid var(--dss-hub-700)` | — | — |
| `--dss-border-hub-800` | `1px solid var(--dss-hub-800)` | — | — |
| `--dss-border-hub-900` | `1px solid var(--dss-hub-900)` | — | — |
| `--dss-border-hub-950` | `1px solid var(--dss-hub-950)` | — | — |
| `--dss-border-water-50` | `1px solid var(--dss-water-50)` | — | — |
| `--dss-border-water-100` | `1px solid var(--dss-water-100)` | — | — |
| `--dss-border-water-200` | `1px solid var(--dss-water-200)` | — | — |
| `--dss-border-water-300` | `1px solid var(--dss-water-300)` | — | — |
| `--dss-border-water-400` | `1px solid var(--dss-water-400)` | — | — |
| `--dss-border-water-500` | `1px solid var(--dss-water-500)` | — | — |
| `--dss-border-water-600` | `1px solid var(--dss-water-600)` | — | — |
| `--dss-border-water-700` | `1px solid var(--dss-water-700)` | — | — |
| `--dss-border-water-800` | `1px solid var(--dss-water-800)` | — | — |
| `--dss-border-water-900` | `1px solid var(--dss-water-900)` | — | — |
| `--dss-border-water-950` | `1px solid var(--dss-water-950)` | — | — |
| `--dss-border-waste-50` | `1px solid var(--dss-waste-50)` | — | — |
| `--dss-border-waste-100` | `1px solid var(--dss-waste-100)` | — | — |
| `--dss-border-waste-200` | `1px solid var(--dss-waste-200)` | — | — |
| `--dss-border-waste-300` | `1px solid var(--dss-waste-300)` | — | — |
| `--dss-border-waste-400` | `1px solid var(--dss-waste-400)` | — | — |
| `--dss-border-waste-500` | `1px solid var(--dss-waste-500)` | — | — |
| `--dss-border-waste-600` | `1px solid var(--dss-waste-600)` | — | — |
| `--dss-border-waste-700` | `1px solid var(--dss-waste-700)` | — | — |
| `--dss-border-waste-800` | `1px solid var(--dss-waste-800)` | — | — |
| `--dss-border-waste-900` | `1px solid var(--dss-waste-900)` | — | — |
| `--dss-border-waste-950` | `1px solid var(--dss-waste-950)` | — | — |
<!-- END:TOKEN-TABLE:borders-marca -->

### Water (11 tokens)

| Token | Valor |
|-------|-------|
| `--dss-border-water-50` | 1px solid var(--dss-water-50) |
| `--dss-border-water-100` | 1px solid var(--dss-water-100) |
| `--dss-border-water-200` | 1px solid var(--dss-water-200) |
| `--dss-border-water-300` | 1px solid var(--dss-water-300) |
| `--dss-border-water-400` | 1px solid var(--dss-water-400) |
| `--dss-border-water-500` | 1px solid var(--dss-water-500) |
| `--dss-border-water-600` | 1px solid var(--dss-water-600) |
| `--dss-border-water-700` | 1px solid var(--dss-water-700) |
| `--dss-border-water-800` | 1px solid var(--dss-water-800) |
| `--dss-border-water-900` | 1px solid var(--dss-water-900) |
| `--dss-border-water-950` | 1px solid var(--dss-water-950) |

### Waste (11 tokens)

| Token | Valor |
|-------|-------|
| `--dss-border-waste-50` | 1px solid var(--dss-waste-50) |
| `--dss-border-waste-100` | 1px solid var(--dss-waste-100) |
| `--dss-border-waste-200` | 1px solid var(--dss-waste-200) |
| `--dss-border-waste-300` | 1px solid var(--dss-waste-300) |
| `--dss-border-waste-400` | 1px solid var(--dss-waste-400) |
| `--dss-border-waste-500` | 1px solid var(--dss-waste-500) |
| `--dss-border-waste-600` | 1px solid var(--dss-waste-600) |
| `--dss-border-waste-700` | 1px solid var(--dss-waste-700) |
| `--dss-border-waste-800` | 1px solid var(--dss-waste-800) |
| `--dss-border-waste-900` | 1px solid var(--dss-waste-900) |
| `--dss-border-waste-950` | 1px solid var(--dss-waste-950) |

## 8.6 Bordas de Dark

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:borders-dark -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-border-dark-disable` | `1px solid var(--dss-dark-disable)` | — | — |
| `--dss-border-dark-light` | `1px solid var(--dss-dark-light)` | — | — |
| `--dss-border-dark` | `1px solid var(--dss-dark)` | — | — |
| `--dss-border-dark-hover` | `1px solid var(--dss-dark-hover)` | — | — |
| `--dss-border-dark-deep` | `1px solid var(--dss-dark-deep)` | — | — |
<!-- END:TOKEN-TABLE:borders-dark -->

## 8.7 Bordas Funcionais

**Total: 6 tokens**

<!-- BEGIN:TOKEN-TABLE:borders-funcionais -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-border-focus` | `2px solid var(--dss-action-primary)` | — | — |
| `--dss-border-focus-subtle` | `1px solid var(--dss-action-primary)` | — | — |
| `--dss-border-active` | `2px solid var(--dss-action-secondary)` | — | — |
| `--dss-border-selected` | `2px solid var(--dss-action-tertiary)` | — | — |
| `--dss-border-disabled` | `1px solid var(--dss-gray-300)` | — | — |
| `--dss-border-readonly` | `1px dashed var(--dss-gray-400)` | — | — |
<!-- END:TOKEN-TABLE:borders-funcionais -->

---

# 9. Shadows e Elevação

Sistema de profundidade visual através de sombras.

## 9.1 Sombras Base

**Total: 8 tokens**

<!-- BEGIN:TOKEN-TABLE:shadows-base -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-shadow-hover` | `var(--dss-shadow-md)` | — | — |
| `--dss-shadow-active` | `var(--dss-shadow-inner)` | — | — |
| `--dss-shadow-drag` | `0 10px 20px rgba(0, 0, 0, 0.15)` | — | — |
| `--dss-shadow-transition` | `none` | — | — |
| `--dss-shadow-focus` | `0 0 0 3px rgba(31, 134, 222, 0.8)` | — | — |
<!-- END:TOKEN-TABLE:shadows-base -->

## 9.2 Sombras Semânticas

**Total: 5 tokens**

<!-- BEGIN:TOKEN-TABLE:shadows-semanticas -->
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-shadow-focus` | 0 0 0 3px rgba(31, 134, 222, 0.5) | Sombra de foco (alternativa a outline) |
| `--dss-shadow-focus-error` | 0 0 0 3px rgba(216, 24, 46, 0.5) | Sombra de foco em erro |
| `--dss-shadow-focus-success` | 0 0 0 3px rgba(77, 210, 40, 0.5) | Sombra de foco em sucesso |
| `--dss-shadow-overlay` | 0 10px 38px rgba(0, 0, 0, 0.2) | Sombra de overlay/backdrop |
| `--dss-shadow-modal` | 0 20px 60px rgba(0, 0, 0, 0.3) | Sombra de modal |
<!-- END:TOKEN-TABLE:shadows-semanticas -->

## 9.3 Sombras de Marca

**Total: 9 tokens**

### Hub

<!-- BEGIN:TOKEN-TABLE:shadows-marca -->
| Token | Valor |
|-------|-------|
| `--dss-shadow-hub-sm` | 0 1px 3px rgba(245, 145, 26, 0.15) |
| `--dss-shadow-hub-md` | 0 4px 6px rgba(245, 145, 26, 0.15) |
| `--dss-shadow-hub-lg` | 0 10px 15px rgba(245, 145, 26, 0.15) |
<!-- END:TOKEN-TABLE:shadows-marca -->

### Water

| Token | Valor |
|-------|-------|
| `--dss-shadow-water-sm` | 0 1px 3px rgba(14, 136, 228, 0.15) |
| `--dss-shadow-water-md` | 0 4px 6px rgba(14, 136, 228, 0.15) |
| `--dss-shadow-water-lg` | 0 10px 15px rgba(14, 136, 228, 0.15) |

### Waste

| Token | Valor |
|-------|-------|
| `--dss-shadow-waste-sm` | 0 1px 3px rgba(24, 177, 115, 0.15) |
| `--dss-shadow-waste-md` | 0 4px 6px rgba(24, 177, 115, 0.15) |
| `--dss-shadow-waste-lg` | 0 10px 15px rgba(24, 177, 115, 0.15) |

## 9.4 Elevação Semântica

**Total: 6 tokens**

<!-- BEGIN:TOKEN-TABLE:shadows-elevacao -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-elevation-0` | `none` | — | — |
| `--dss-elevation-1` | `var(--dss-shadow-sm)` | — | — |
| `--dss-elevation-2` | `var(--dss-shadow-md)` | — | — |
| `--dss-elevation-3` | `var(--dss-shadow-lg)` | — | — |
| `--dss-elevation-4` | `var(--dss-shadow-xl)` | — | — |
| `--dss-elevation-5` | `var(--dss-shadow-2xl)` | — | — |
<!-- END:TOKEN-TABLE:shadows-elevacao -->

## 9.5 Sombras para Estados

**Total: 3 tokens**

<!-- BEGIN:TOKEN-TABLE:shadows-estados -->
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-shadow-hover` | `var(--dss-shadow-md)` | Sombra em hover |
| `--dss-shadow-active` | `var(--dss-shadow-inner)` | Sombra em estado ativo |
| `--dss-shadow-drag` | 0 10px 20px rgba(0, 0, 0, 0.15) | Sombra durante drag |
<!-- END:TOKEN-TABLE:shadows-estados -->

---

# 11. Dimensões de Controles Interativos

**Versão DSS:** v2.4.0 (Junho 2026)  
**Arquivo fonte:** `packages/core/tokens/semantic/_dimensions.scss`  
**Filosofia:** Tokens genéricos por padrão de UI — não por componente. Um token `--dss-track-height-sm` é consumido por qualquer controle deslizante, não apenas pelo DssRange.

---

## 11.1 Track Height

Altura do trilho em controles deslizantes lineares e indicadores de navegação.

**Total: 4 tokens** *(tabela auto-gerada por `scripts/sync-tokens-to-reference.js`)*

<!-- BEGIN:TOKEN-TABLE:dimensions-track-height -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-track-height-xs` | `var(--dss-spacing-0_5)` | `2px` | indicadores de tab, trilhos decorativos |
| `--dss-track-height-sm` | `var(--dss-spacing-1)` | `4px` | progresso, range, slider padrão |
| `--dss-track-height-md` | `var(--dss-spacing-1_5)` | `6px` | trilhos de destaque |
| `--dss-track-height-lg` | `var(--dss-spacing-2)` | `8px` | controles de alto contraste / acessibilidade |
<!-- END:TOKEN-TABLE:dimensions-track-height -->

```scss
// Uso nos componentes
.dss-linear-progress__track {
  min-height: var(--dss-track-height-sm); // 4px
}
.dss-tab__indicator {
  height: var(--dss-track-height-xs); // 2px
}
```

---

## 11.2 Thumb Size

Tamanho do polegar (handle) em controles arrastáveis.

**Total: 5 tokens** *(tabela auto-gerada por `scripts/sync-tokens-to-reference.js`)*

<!-- BEGIN:TOKEN-TABLE:dimensions-thumb-size -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-thumb-size-xs` | `var(--dss-spacing-3)` | `12px` | compacto |
| `--dss-thumb-size-sm` | `var(--dss-spacing-4)` | `16px` | DssToggle thumb off |
| `--dss-thumb-size-md` | `var(--dss-spacing-5)` | `20px` | DssRange / DssSlider padrão |
| `--dss-thumb-size-lg` | `var(--dss-spacing-6)` | `24px` | DssToggle thumb on |
| `--dss-thumb-size-xl` | `var(--dss-spacing-8)` | `32px` | reserva Fase 3 |
<!-- END:TOKEN-TABLE:dimensions-thumb-size -->

> **Nota DssToggle:** a animação de ativação transita de `--dss-thumb-size-sm` → `--dss-thumb-size-lg`, expressando semanticamente que o polegar "expande" ao ativar.

---

## 11.3 Switch Track Width

Largura do trilho do componente toggle/switch. Altura do trilho usa `--dss-spacing-8` (32px).

**Total: 4 tokens** *(tabela auto-gerada por `scripts/sync-tokens-to-reference.js`)*

<!-- BEGIN:TOKEN-TABLE:dimensions-switch-track-width -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-switch-track-width-sm` | `var(--dss-spacing-12)` | `48px` | toggle compacto |
| `--dss-switch-track-width-md` | `var(--dss-spacing-14)` | `56px` | toggle padrão |
| `--dss-switch-track-width-lg` | `var(--dss-spacing-16)` | `64px` | toggle grande |
| `--dss-switch-track-width-xl` | `var(--dss-spacing-20)` | `80px` | toggle extra grande |
<!-- END:TOKEN-TABLE:dimensions-switch-track-width -->

> **Breaking change visual (v2.4.0):** o valor de produção anterior era 52px. A migração para `--dss-switch-track-width-md` (56px) implica delta de +4px validado visualmente em Junho 2026.

---

## 11.4 Min Width

Restrições mínimas de largura por contexto semântico de uso.

**Total: 6 tokens** *(tabela auto-gerada por `scripts/sync-tokens-to-reference.js`)*

<!-- BEGIN:TOKEN-TABLE:dimensions-min-width -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-min-w-xs` | `var(--dss-spacing-16)` | `64px` | botões e controles compactos |
| `--dss-min-w-sm` | `var(--dss-spacing-40)` | `160px` | rating, elementos de avaliação |
| `--dss-min-w-md` | `var(--dss-spacing-52)` | `208px` | menus, overlays, ranges |
| `--dss-min-w-lg` | `var(--dss-spacing-60)` | `240px` | campos de formulário (Input, Select, Textarea) |
| `--dss-min-w-xl` | `var(--dss-spacing-80)` | `320px` | painéis compactos (reserva Fase 3) |
| `--dss-min-w-2xl` | `var(--dss-spacing-120)` | `480px` | painéis e modais (reserva Fase 3) |
<!-- END:TOKEN-TABLE:dimensions-min-width -->

> ⚠️ `--dss-min-w-md` (200px) é exceção estrutural — valor não mapeável à escala base de spacing (spacing-48 = 192px / spacing-52 = 208px). Documentado como constante semântica legítima.

---

## 11.5 Max Width

Restrições máximas de largura por contexto semântico de uso.

**Total: 4 tokens** *(tabela auto-gerada por `scripts/sync-tokens-to-reference.js`)*

<!-- BEGIN:TOKEN-TABLE:dimensions-max-width -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-max-w-xs` | `var(--dss-spacing-60)` | `240px` | tooltips, popovers compactos |
| `--dss-max-w-sm` | `var(--dss-spacing-80)` | `320px` | cards compactos |
| `--dss-max-w-md` | `var(--dss-spacing-120)` | `480px` | painéis laterais |
| `--dss-max-w-lg` | `var(--dss-spacing-192)` | `768px` | modais e drawers |
<!-- END:TOKEN-TABLE:dimensions-max-width -->

---

## 11.6 Min Height

Restrições mínimas de altura por contexto semântico.

**Referência:** xs/sm para elementos não-interativos compactos; md (48px) é o **piso MD3/WCAG 2.5.5** para qualquer área interativa.

**Total: 6 tokens** *(tabela auto-gerada por `scripts/sync-tokens-to-reference.js`)*

<!-- BEGIN:TOKEN-TABLE:dimensions-min-height -->
| Token | Valor | px | Descrição |
|---|---|---|---|
| `--dss-min-h-xs` | `var(--dss-spacing-6)` | `24px` | elementos não-interativos compactos (IBM Carbon layout-05) |
| `--dss-min-h-sm` | `var(--dss-spacing-10)` | `40px` | elementos compactos abaixo do mínimo WCAG (uso restrito) |
| `--dss-min-h-md` | `var(--dss-spacing-12)` | `48px` | ✅ piso MD3/WCAG 2.5.5 — referência primária |
| `--dss-min-h-lg` | `var(--dss-spacing-48)` | `192px` | containers overlay (menus, scroll areas, parallax) |
| `--dss-min-h-xl` | `var(--dss-spacing-80)` | `320px` | painéis laterais e seções de conteúdo |
| `--dss-min-h-2xl` | `var(--dss-spacing-120)` | `480px` | seções de altura completa |
<!-- END:TOKEN-TABLE:dimensions-min-height -->

---

# 10. Tokens Deprecados

Tokens component-specific removidos na refatoração de Janeiro 2025 seguindo a filosofia **"Tokens = Provedores, Componentes = Consumidores"**.

## 10.1 Spacing Component-Specific

**Total: 16 tokens removidos**

| Token Deprecado | Substituir por | Componente |
|-----------------|----------------|-----------|
| `--dss-button-padding-x` | `var(--dss-spacing-4)` | DssButton |
| `--dss-button-padding-y` | `var(--dss-spacing-2)` | DssButton |
| `--dss-button-padding-compact-x` | `var(--dss-spacing-3)` | DssButton |
| `--dss-button-padding-compact-y` | `var(--dss-spacing-1_5)` | DssButton |
| `--dss-input-padding-x` | `var(--dss-spacing-3)` | DssInput |
| `--dss-input-padding-y` | `var(--dss-spacing-2)` | DssInput |
| `--dss-input-height` | `var(--dss-spacing-10)` | DssInput |
| `--dss-card-padding` | `var(--dss-spacing-6)` | DssCard |
| `--dss-card-padding-compact` | `var(--dss-spacing-4)` | DssCard |
| `--dss-modal-padding` | `var(--dss-spacing-6)` | DssModal |
| `--dss-modal-header-padding` | `var(--dss-spacing-6) var(--dss-spacing-6) var(--dss-spacing-4)` | DssModal |
| `--dss-modal-body-padding` | `var(--dss-spacing-6)` | DssModal |
| `--dss-modal-footer-padding` | `var(--dss-spacing-4) var(--dss-spacing-6) var(--dss-spacing-6)` | DssModal |
| `--dss-radius-button` | `var(--dss-radius-md)` | DssButton |
| `--dss-radius-input` | `var(--dss-radius-md)` | DssInput |
| `--dss-radius-card` | `var(--dss-radius-lg)` | DssCard |

## 10.2 Motion Component-Specific

**Total: 2 tokens removidos**

| Token Deprecado | Substituir por | Componente |
|-----------------|----------------|-----------|
| `--dss-duration-modal` | `var(--dss-duration-slow)` | DssModal |
| `--dss-duration-toast` | `var(--dss-duration-slow)` | DssToast |

## 10.3 Borders Component-Specific

**Total: 12 tokens removidos**

| Token Deprecado | Substituir por | Componente |
|-----------------|----------------|-----------|
| `--dss-border-input-default` | `1px solid var(--dss-gray-300)` | DssInput |
| `--dss-border-input-hover` | `1px solid var(--dss-gray-400)` | DssInput |
| `--dss-border-input-focus` | `2px solid var(--dss-action-primary)` | DssInput |
| `--dss-border-input-error` | `2px solid var(--dss-negative)` | DssInput |
| `--dss-border-input-success` | `2px solid var(--dss-positive)` | DssInput |
| `--dss-border-input-disabled` | `1px solid var(--dss-gray-200)` | DssInput |
| `--dss-border-card-default` | `1px solid var(--dss-gray-200)` | DssCard |
| `--dss-border-card-elevated` | `1px solid var(--dss-gray-300)` | DssCard |
| `--dss-border-card-selected` | `2px solid var(--dss-action-primary)` | DssCard |
| `--dss-border-divider-subtle` | `1px solid var(--dss-gray-100)` | DssDivider |
| `--dss-border-divider-default` | `1px solid var(--dss-gray-200)` | DssDivider |
| `--dss-border-divider-strong` | `1px solid var(--dss-gray-300)` | DssDivider |

## 10.4 Shadows Component-Specific

**Total: 5 tokens removidos**

| Token Deprecado | Substituir por | Componente |
|-----------------|----------------|-----------|
| `--dss-elevation-card` | `var(--dss-elevation-1)` | DssCard |
| `--dss-elevation-card-hover` | `var(--dss-elevation-2)` | DssCard |
| `--dss-elevation-modal` | `var(--dss-elevation-4)` | DssModal |
| `--dss-elevation-tooltip` | `var(--dss-elevation-2)` | DssTooltip |
| `--dss-elevation-toast` | `var(--dss-elevation-3)` | DssToast |

## 10.5 Badges e Chips Component-Specific

**Total: 10 tokens removidos** (Janeiro 2025)

| Token Deprecado | Substituir por | Componente |
|-----------------|----------------|-----------|
| `--dss-badge-size-xs` | `var(--dss-compact-control-height-xs)` (20px) | DssBadge |
| `--dss-badge-size-sm` | `var(--dss-compact-control-height-sm)` (24px) | DssBadge |
| `--dss-badge-size-md` | `var(--dss-compact-control-height-md)` (28px) | DssBadge |
| `--dss-badge-size-lg` | `var(--dss-compact-control-height-lg)` (32px) | DssBadge |
| `--dss-badge-size-xl` | `var(--dss-compact-control-height-lg)` (32px) | DssBadge |
| `--dss-chip-height-xs` | `var(--dss-compact-control-height-xs)` (20px) | DssChip |
| `--dss-chip-height-sm` | `var(--dss-compact-control-height-sm)` (24px) | DssChip |
| `--dss-chip-height-md` | `var(--dss-compact-control-height-md)` (28px) | DssChip |
| `--dss-chip-height-lg` | `var(--dss-compact-control-height-lg)` (32px) | DssChip |
| `--dss-chip-height-xl` | `var(--dss-compact-control-height-lg)` (32px) | DssChip |

> **Motivo da Deprecação:** Tokens component-specific violam a filosofia "Tokens = Provedores, Componentes = Consumidores".
> O novo token `--dss-compact-control-height-*` é genérico e reutilizável por qualquer controle compacto.

### Benefícios da Refatoração

✅ **Escalabilidade**: 100 componentes = mesmos tokens genéricos
✅ **Flexibilidade**: Componentes escolhem tokens livremente
✅ **Manutenibilidade**: Mudanças isoladas nos componentes
✅ **Clareza**: Valores explícitos (gray-300, spacing-4)

---

## Referências

### Documentos Relacionados
- **DSS_TOKEN_GUIDELINES.md**: Filosofia e boas práticas
- **TOKENS_CONFORMIDADE_AUDITORIA.md**: Relatório de auditoria (Janeiro 2025)
- **AUDITORIA_DSS_JAN_2025.md**: Auditoria completa do sistema
- **Guia de Acessibilidade DSS**: Páginas 7-9 (Tipografia, Contraste, Legibilidade)

### Conformidade WCAG
- **WCAG 2.1 AA**: https://www.w3.org/WAI/WCAG21/quickref/
- **SC 2.5.5**: Target Size (44×44px mínimo)
- **SC 1.4.10**: Reflow (320px viewport)
- **SC 1.4.11**: Non-text Contrast (3:1 mínimo)
- **SC 2.4.7**: Focus Visible (indicadores de foco)

### Framework
- **Quasar Framework**: https://quasar.dev/style/spacing
- **Escala de Tamanhos**: xs, sm, md, lg, xl (compatível com Quasar)

---

**Documento Gerado em:** Janeiro 2025
**Última Atualização:** Janeiro 2025
**Versão DSS:** v2.2.0
