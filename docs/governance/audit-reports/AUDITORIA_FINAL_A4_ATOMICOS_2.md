# AUDITORIA FINAL — Lote A4 (Atômicos 2)

**Data:** 2026-06-10
**Auditor:** Claude Code (agente auditor DSS)
**Escopo:** 11 componentes — DssTextarea, DssSelect, DssSlider, DssRange, DssFile, DssItem, DssItemLabel, DssItemSection, DssSeparator, DssSpace, DssSpinner
**Localização:** `packages/core/components/base/<NomeComp>/`
**Método:** Verificação física de arquivos (ls/grep/find em lote), leitura real de código (wrappers, orquestradores, barrels, SCSS L2–L4, types, testes), compilação Sass de todos os orquestradores e validação programática dos `dss.meta.json`.

---

## 1. Veredito Geral

| # | Componente | Gate Estrutural | Gate Técnico | Gate Documental | Veredito |
|---|------------|:---------------:|:------------:|:---------------:|----------|
| 1 | DssTextarea | ✅ | ✅ | ⚠️ | ⚠️ **RESSALVA** |
| 2 | DssSelect | ✅ | ✅ | ⚠️ | ⚠️ **RESSALVA** |
| 3 | DssSlider | ❌ | ✅ | ⚠️ | ❌ **REPROVADO** |
| 4 | DssRange | ❌ | ✅ | ⚠️ | ❌ **REPROVADO** |
| 5 | DssFile | ⚠️ | ✅ | ✅ | ⚠️ **RESSALVA** |
| 6 | DssItem | ✅ | ✅ | ⚠️ | ⚠️ **RESSALVA** |
| 7 | DssItemLabel | ✅ | ✅ | ✅ | ✅ **APROVADO** |
| 8 | DssItemSection | ⚠️ | ✅ | ✅ | ⚠️ **RESSALVA** |
| 9 | DssSeparator | ✅ | ✅ | ⚠️ | ⚠️ **RESSALVA** |
| 10 | DssSpace | ✅ | ✅ | ⚠️ | ⚠️ **RESSALVA** |
| 11 | DssSpinner | ✅ | ✅ | ⚠️ | ⚠️ **RESSALVA** |

**Resumo:** 1 aprovado, 8 com ressalva (não-bloqueante), 2 reprovados por falha real de Gate Estrutural (barrel `index.js` não exporta types — correção trivial, ver §3.3 e §3.4).

---

## 2. Verificações Globais (aplicadas aos 11)

### 2.1 Gate Estrutural — checklist físico

Verificado por script em lote (existência de arquivo, byte a byte):

| Item | Resultado |
|------|-----------|
| `1-structure/Dss<Comp>.ts.vue` | ✅ 11/11 |
| `2-composition/_base.scss` | ✅ 11/11 (DssSelect possui adicionalmente `_panel.scss`, importado no orquestrador) |
| `3-variants/` com `index.scss` | ✅ 11/11 (Slider/Range/ItemSection/Spinner: L3 só com `index.scss` justificado — camada vazia mantida por integridade arquitetural) |
| `4-output/` com `_states.scss`, `_brands.scss`, `index.scss` | ✅ 11/11 |
| `Dss<Comp>.vue` re-export puro | ✅ 11/11 — todos sem `<template>`, sem `<style>`, sem lógica; apontam para `1-structure/` |
| `Dss<Comp>.module.scss` importa L2 → L3 → L4 nessa ordem | ✅ 11/11 (via `@use`, zero `@import` em todo o lote) |
| `index.js` exporta componente + types + composables | ❌ DssSlider e DssRange **não exportam types**; ⚠️ DssFile usa `index.ts`; ⚠️ DssItemSection bypassa o wrapper — demais ✅ |
| `dss.meta.json` com goldenReference, goldenContext, previewGroup, defaultPreview.demoSlots | ✅ 11/11 (validado via parse JSON programático) |
| `Dss<Comp>.test.js` | ✅ 11/11 |

### 2.2 Gate Técnico — verificações em lote

- **Hardcoded em `_base.scss` (L2):** ✅ zero ocorrências reais nos 11 (grep para `px|rem|#hex|rgb(` excluindo comentários). Únicas ocorrências fora de comentário: DssSpinner padrão sr-only (`1px`, `clip: rect(0,0,0,0)`) — **exceção EX-01 documentada inline** (`DssSpinner/2-composition/_base.scss:142-156`).
- **Hardcoded em L3/L4:** apenas valores de sistema em `forced-colors` (2px/3px + keywords `ButtonText`/`Highlight`) em DssSlider (`4-output/_states.scss:132-152`, exceção documentada com precedente DssToggle/DssTextarea) e DssItem (`4-output/_states.scss:101-130`); e DssSeparator `rgba(255,255,255,0.12)` em dark mode — **EXC-01 documentada inline** (`4-output/_states.scss:27-44`) + `1px` forced-colors **EXC-02** (`:92-93`). Nenhuma violação não documentada.
- **`brightness()`:** somente valores canônicos encontrados em todo o lote: `0.95`, `1.10` (grafado também `1.1` — numericamente idêntico) e `1.20` (DssSlider/DssRange). ✅
- **`::before` reservado a touch target:** ✅ — únicas declarações `::before` DSS estão em DssItem: `3-variants/_interactive.scss:21` (touch target WCAG 2.5.5, `min-height: var(--dss-touch-target-min)`) e `3-variants/_density.scss:33` (`display: none` do touch target em compact — ver observação §3.6). Efeitos visuais usam `::after` (`_interactive.scss:33`). Caso limítrofe documentado em §3.2 (DssSelect estiliza pseudo-elemento interno do QSelect).
- **`[data-brand="hub|water|waste"]`:** ✅ presente nos `_brands.scss` de Textarea, Select, Slider, Range, File, Item, Separator, Spinner (aspas simples em Slider/Range — equivalente). DssItemLabel, DssItemSection e DssSpace **não possuem regras de brand com justificativa explícita escrita no arquivo** (herança via tokens semânticos / componente de layout neutro / elemento sem cor) — conforme regra "camadas com pouco conteúdo continuam existindo". ✅
- **Compilação Sass:** ✅ 11/11 orquestradores compilam sem erro nem warning (`npx sass --no-source-map`).
- **Cores via classes utilitárias no Vue:** ✅ DssItem aplica cor via `text-${props.color}` no composable (`useItemClasses.ts:34`); DssSeparator documenta explicitamente exceção (cor é `border-color`/`currentColor`, não preenchimento — `useSeparatorClasses.ts:8,25`); form fields (Textarea/Select/Slider/Range/File) usam exclusivamente tokens semânticos no SCSS para sobrescrever internals do Quasar, sem hex/rgb.

### 2.3 Gate Documental — verificações em lote

- **`dss.meta.json` → `defaultPreview.visualProperties`:** ✅ presente nos 11 (campo aninhado em `defaultPreview`, padrão dos 76 componentes do core). Spot-check contra o CSS real:
  - DssSlider: `--dss-track-height-sm` (CSS `:83`), `--dss-thumb-size-md` (CSS `:123-124`), `--dss-touch-target-md` (CSS `:60`) — **fiel ao CSS** ✅
  - DssSeparator: `--dss-border-width-thin` + `currentColor` — fiel ✅
  - DssTextarea: tokens corretos, porém campo `source` **impreciso** (ver §3.1) ⚠️
- **README.md:** todos existem; profundidade varia (ver fichas individuais). Vários não atendem o piso mínimo do CLAUDE.md no próprio README (slots/events/tokens não declarados — mesmo que "nenhum"), embora todos possuam `DSS<COMP>_API.md` completo ao lado.
- **`Dss<Comp>.example.vue`:** ✅ 11/11 com ≥ 3 cenários (contagem de seções/headings: mínimo 11 marcadores em DssRange e DssSpinner; máximo 32 em DssItem).

### 2.4 Testes — qualidade e teclado

- **Stubs:** ✅ zero — `grep 'expect(true).toBe(true)'` sem ocorrências em nenhum dos 11. Spot-check de `DssSlider.test.js` confirma testes reais com `mount` + `installQuasar` + asserções de classes/props/eventos. Volume: 15–49 `it()` por componente (165–429 linhas).
- **Teclado (Select/Slider/Range):**
  - DssSelect: apenas `it('is keyboard navigable (has tabindex)')` (`DssSelect.test.js:128`) — **sem cobertura de ArrowUp/ArrowDown/Enter/Escape** → ⚠️ Alerta
  - DssSlider: **zero** testes de teclado (grep `keydown|Arrow*|keyboard|Enter` sem hits) → ⚠️ Alerta
  - DssRange: **zero** testes de teclado → ⚠️ Alerta

---

## 3. Fichas Individuais

### 3.1 DssTextarea — ⚠️ RESSALVA

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ✅ | 4 camadas completas; wrapper puro; orquestrador L2→L3→L4; `index.js` exporta componente + composables + types; meta completo; test.js (15 its) |
| Técnico | ✅ | L2 sem hardcoded; brands hub/water/waste (6 seletores); sem `::before`; compila OK |
| Documental | ⚠️ | Ver ressalvas |

- ✅ **v-model documentado em types:** `types/textarea.types.ts:56` (`modelValue?: string`) e `:208` (`(e: 'update:modelValue', value: string)`).
- ⚠️ **R1 — README incompleto** (piso mínimo CLAUDE.md): seções apenas `Instalação / Uso Básico / Props / Quando NÃO usar / Links`. Sem Slots, Events e Tokens (nem declaração explícita de ausência). API completa existe em `DSSTEXTAREA_API.md`, mas o piso mínimo exige no README.
- ⚠️ **R2 — `visualProperties.source` impreciso:** declara `border → --dss-gray-400 | source: 3-variants/_borderless.scss` e `border-radius → --dss-radius-md | source: 3-variants/_filled.scss`, mas no CSS real esses valores estão em `3-variants/_outlined.scss:20-21` (variante default). Tokens corretos; rastreabilidade de origem incorreta. Corrigir via `npm run sync:visual-contract` após ajuste do meta.

### 3.2 DssSelect — ⚠️ RESSALVA

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ✅ | Completo; L2 com `_base.scss` + `_panel.scss` ambos importados no orquestrador; `index.js` exporta componente + composables + types; test.js (16 its) |
| Técnico | ✅ | L2 100% tokens (`--dss-font-size-md`, `--dss-text-hint`, `--dss-gray-100` etc.); brands 3/3; compila OK |
| Documental | ⚠️ | Ver ressalvas |

- ✅ **v-model documentado em types:** `types/select.types.ts:55` (`modelValue?: any`), `:189` (contrato multiple→Array), `:236` (`update:modelValue`).
- 📝 **Observação técnica (não-bloqueante):** `2-composition/_base.scss:68` estiliza `.q-field__native > span:empty::before` — pseudo-elemento **gerado pelo Quasar** para o placeholder do QSelect; o DSS apenas aplica `color: var(--dss-text-hint)`. Não é criação de efeito visual via `::before` em elemento DSS, mas recomenda-se registrar como exceção documentada no meta para auditorias futuras.
- ⚠️ **R1 — README sem API:** sem seção/tabela de Props, Slots, Events ou Tokens (headings: Quick Start, Instalação, Quando usar/NÃO usar, Variantes, Seleção múltipla, Com objetos, Brandabilidade, Links). Viola o piso mínimo do README.
- ⚠️ **R2 — Teste de teclado superficial:** componente interativo crítico com apenas verificação de `tabindex` (`DssSelect.test.js:128`); sem ArrowUp/ArrowDown/Enter/Escape (abrir painel, navegar opções, selecionar).

### 3.3 DssSlider — ❌ REPROVADO

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ❌ | **Barrel não exporta types** |
| Técnico | ✅ | Tokens genéricos; brands 3/3; brightness canônico; compila OK |
| Documental | ⚠️ | README com tokens (7 refs) mas sem slots/events; sem testes de teclado |

- ❌ **NC-01 (BLOQUEANTE — Gate Estrutural):** `DssSlider/index.js` exporta apenas componente e composables:
  ```js
  export { default as DssSlider } from './DssSlider.vue'
  export { useSliderClasses, useSliderActions, useSliderState } from './composables'
  ```
  `types/slider.types.ts` existe mas **não é re-exportado** — viola o Gate Estrutural do CLAUDE.md ("Barrel export (index.js) exporta componente, **types** e composables"). O `composables/index.ts` tampouco re-exporta types. **Correção trivial:** adicionar `export * from './types/slider.types'`.
- ✅ **Tokens de altura corretos:** NÃO usa tokens específicos (`--dss-slider-height-*` inexistente em todo o diretório). Usa tokens genéricos globais definidos em `tokens/semantic/_dimensions.scss`: `--dss-touch-target-md` (`_base.scss:60`), `--dss-track-height-sm` (`:83`), `--dss-thumb-size-md` (`:123-124`), `--dss-touch-target-sm` dense (`:307`). Nota: não usa `--dss-compact-control-height-*` — justificado em comentário (slider não é Compact Control; estratégia Option A com min-height no track-container), coerente com o comentário equivalente do DssRange (`_base.scss:38`).
- ⚠️ **R1 — Zero testes de teclado** (ArrowUp/ArrowDown/keydown): nenhum hit no test.js. Componente cuja interação primária por teclado é crítica (WCAG 2.1.1).
- ✅ Forced-colors 2px/3px com exceção documentada inline (`4-output/_states.scss:132-136`) e precedente citado.
- ✅ Testes reais (16 its, mount + asserções — sem stub).

### 3.4 DssRange — ❌ REPROVADO

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ❌ | **Barrel não exporta types** |
| Técnico | ✅ | Tokens genéricos; brands 3/3 (aspas simples); brightness 0.95/1.10 canônico; compila OK |
| Documental | ⚠️ | Sem testes de teclado |

- ❌ **NC-01 (BLOQUEANTE — Gate Estrutural):** `DssRange/index.js` exporta apenas componente e composables; `types/range.types.ts` não é re-exportado (mesma não-conformidade do DssSlider). **Correção trivial:** `export * from './types/range.types'`.
- ✅ **Tokens de altura corretos:** sem tokens específicos de componente; usa `--dss-touch-target-md` (`_base.scss:42`), `--dss-track-height-sm` (`:48`), `--dss-thumb-size-md` (`:70-71`), `--dss-touch-target-sm` dense (`:229`) — todos globais (`tokens/semantic/_dimensions.scss:19-32`). Decisão de não usar `--dss-compact-control-height-*` documentada inline (`_base.scss:33-42`: "O DssRange não é Compact Control — usa min-height diretamente no track-container").
- ✅ `::before` não utilizado; comentário normativo em `_base.scss:37` reservando-o.
- ✅ Brands: hub/water/waste presentes com padrão duplo (ancestor + próprio elemento), focus-ring por brand (`_brands.scss:18-35`).
- ⚠️ **R1 — Zero testes de teclado** no `DssRange.test.js` (15 its reais, sem stub).

### 3.5 DssFile — ⚠️ RESSALVA

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ⚠️ | Barrel é `index.ts`, não `index.js` |
| Técnico | ✅ | L2 limpo; brands 3/3; compila OK; exceção EX-01 (2px forced-colors) documentada no orquestrador |
| Documental | ✅ | README com props/slots/events/tokens (11 refs `--dss-*`); example com 25 marcadores de cenário; 19 its |

- ⚠️ **R1 — Desvio nominal de convenção:** barrel é `DssFile/index.ts` (único do lote; os demais 10 usam `index.js`). O conteúdo é **completo e superior** (exporta componente via wrapper, types explícitos `FileProps/FileEmits/FileSlots/FileExpose/...` e os 3 composables) e o barrel central resolve corretamente (`components/index.js:43` `export { DssFile } from './base/DssFile'` + `:175` import direto do wrapper). Não-bloqueante; recomenda-se padronizar a extensão ou registrar a decisão.

### 3.6 DssItem — ⚠️ RESSALVA

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ✅ | Completo; `index.js` exporta componente + types + composables |
| Técnico | ✅ | `::before` exclusivo para touch target; `::after` para overlays; forced-colors com keywords de sistema; compila OK |
| Documental | ⚠️ | README sem seção de Tokens |

- ✅ **Convenção de pseudo-elementos exemplar:** `3-variants/_interactive.scss:21` — `::before` = touch target (`min-height: var(--dss-touch-target-min)`); `:33` — `::after` = overlay hover/active com `currentColor` + opacity. Cor via classe utilitária `text-${props.color}` no composable (`useItemClasses.ts:34`).
- ✅ **Tríade Item/Label/Section:** os 3 são componentes independentes (diretórios próprios). `DssItem/index.js` **não** re-exporta os sub-componentes, mas a tríade é exportada em conjunto no barrel central `packages/core/components/index.js` (`:56-58` named exports; `:261` registro conjunto `DssList, DssItem, DssItemLabel, DssItemSection`) e no `index.scss` (`:76-77`). Funciona em conjunto via import único do core. Aceito; se a intenção de governança for consumo atômico da tríade via `DssItem`, adicionar re-export é opcional.
- 📝 **Observação A11y:** `3-variants/_density.scss:33` — em modo compact o touch target é removido (`&::before { display: none }`), comentado no código ("Touch target removido em modo compact"). Decisão consciente, mas recomenda-se documentar a implicação WCAG 2.5.5 no `.md` normativo/meta como exceção.
- ⚠️ **R1 — README sem tokens:** zero referências `--dss-*` no README (piso mínimo exige lista explícita; existe no `DSSITEM_API.md`).
- ✅ Suite de testes mais robusta do lote: 49 its / 429 linhas.

### 3.7 DssItemLabel — ✅ APROVADO

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ✅ | 4 camadas (L2 com `_base.scss` + `index.scss`; L3 com caption/header/lines/overline); wrapper puro; `index.js` exporta default + named + types + composables |
| Técnico | ✅ | L2 sem hardcoded (refs a rem/rgba são apenas comentários descrevendo o CSS do Quasar que é sobrescrito); compila OK |
| Documental | ✅ | README com props/slots/events e 17 refs de tokens; example com 15 marcadores; 22 its reais |

- ✅ `_brands.scss` sem regras ativas com **justificativa normativa completa escrita no arquivo** (componente tipográfico não-interativo; brand herdada via `--dss-text-body`/`--dss-text-subtle` no cascade de `[data-brand]` ancestral) — conforme regra de camadas com pouco conteúdo.
- Nenhuma não-conformidade encontrada.

### 3.8 DssItemSection — ⚠️ RESSALVA

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ⚠️ | Barrel bypassa o Entry Point Wrapper |
| Técnico | ✅ | L2 limpo; sem `::before`; compila OK |
| Documental | ✅ | README com props/slots/events/tokens; 26 its |

- ⚠️ **R1 — Barrel não usa o wrapper:** `index.js:8` importa `from './1-structure/DssItemSection.ts.vue'` diretamente, tornando o wrapper `DssItemSection.vue` (que existe e é puro) código morto no caminho do barrel. A letra do Princípio #11 é atendida (wrapper existe), mas todos os demais 10 componentes do lote exportam via wrapper — e o próprio DssSpinner documenta "Consumidores devem sempre importar de DssSpinner, nunca de 1-structure". O barrel central (`components/index.js:187`) também importa via wrapper, divergindo do barrel local. **Correção trivial:** trocar import para `'./DssItemSection.vue'`.
- 📝 **Observação:** `DssItemSection.module.scss:25-43` contém regras próprias (media queries de high contrast/reduced motion) no nível do orquestrador, que canonicamente deveria apenas importar L2→L3→L4. Conteúdo pertence a `4-output/_states.scss`. Não-bloqueante (compila e não viola token-first), mas desvia do padrão de orquestrador puro.
- ✅ Brands ausente com justificativa escrita (container de layout neutro; brand propagada pelos filhos).

### 3.9 DssSeparator — ⚠️ RESSALVA

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ✅ | Completo; L3 rico (vertical/colors/sizes/inset/spaced); barrel completo |
| Técnico | ✅ | Exceções documentadas (EXC-01, EXC-02); brands 3/3; compila OK |
| Documental | ⚠️ | README sem declaração de slots/events |

- ✅ **Simplicidade confirmada** (verificação específica): `1-structure` 76 linhas + composable 64 linhas — sem lógica desnecessária; coerente com componente mais simples do sistema.
- ✅ **EXC-01** `rgba(255,255,255,0.12)` dark mode — exceção documentada inline com justificativa completa e referência Material Design (`4-output/_states.scss:27-44`). **EXC-02** `1px` em forced-colors — documentada (`:92-93`, tokens ignorados pelo UA nesse modo).
- ✅ Cor via `border-color`/`currentColor` no SCSS com justificativa explícita de por que NÃO usa classes utilitárias (`useSeparatorClasses.ts:8,25` + orquestrador) — exceção consciente e documentada ao padrão Quasar de cores.
- ⚠️ **R1 — README:** slots e events não declarados (piso mínimo exige declarar "nenhum" explicitamente); tokens presentes (5 refs).

### 3.10 DssSpace — ⚠️ RESSALVA

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ✅ | Completo; barrel exporta componente + composable + types |
| Técnico | ✅ | 100% tokens (`--dss-spacing-*` em `3-variants/_sizes.scss`); compila OK |
| Documental | ⚠️ | README sem declaração de slots/events/tokens |

- ✅ **Simplicidade confirmada** (verificação específica): `1-structure` 50 linhas + composable 31 linhas — sem lógica desnecessária. ✔ o mais enxuto do lote, como esperado.
- ✅ `_brands.scss` sem regras com justificativa "NÃO APLICÁVEL" escrita no arquivo (elemento de layout puro, sem cor/borda/conteúdo) — única ausência total de `data-brand` do lote, corretamente fundamentada.
- ✅ `visualProperties` declara dimensões como "N/A — Componente estrutural adaptativo" — coerente com o CSS.
- ⚠️ **R1 — README:** sem seções de Slots/Events/Tokens (nem declaração de ausência); Props presente.

### 3.11 DssSpinner — ⚠️ RESSALVA

| Gate | Status | Evidências |
|------|--------|------------|
| Estrutural | ✅ | Completo; barrel exporta componente + types + composable, com comentário proibindo import de `1-structure` |
| Técnico | ✅ | EX-01 sr-only (1px/clip) documentada inline; brands 3/3; compila OK |
| Documental | ⚠️ | README sem declaração de slots/events; tokens com apenas 2 refs |

- ✅ **EX-01:** valores `1px`/`margin: -1px`/`clip: rect(0,0,0,0)` em `.dss-spinner__label` (`2-composition/_base.scss:142-156`) — padrão sr-only universal, exceção documentada com referência à política do CLAUDE.md.
- ✅ Brands hub/water/waste presentes (7 seletores `data-brand`).
- ⚠️ **R1 — README:** sem Slots/Events (nem declaração de ausência) e lista de tokens incompleta no README (catálogo completo está no orquestrador e no meta). 28 its reais no test.js.

---

## 4. Consolidação de Não-Conformidades

### Bloqueantes (❌) — exigem correção antes do selo
| ID | Componente | Descrição | Correção |
|----|-----------|-----------|----------|
| A4-NC-01 | DssSlider | `index.js` não exporta types (`slider.types.ts` órfão do barrel) | `export * from './types/slider.types'` |
| A4-NC-02 | DssRange | `index.js` não exporta types (`range.types.ts` órfão do barrel) | `export * from './types/range.types'` |

### Ressalvas (⚠️) — não-bloqueantes
| ID | Componente(s) | Descrição |
|----|---------------|-----------|
| A4-R-01 | DssSelect, DssSlider, DssRange | Ausência de testes de navegação por teclado (ArrowUp/ArrowDown/Enter); DssSelect cobre apenas `tabindex`. Alerta A11y (WCAG 2.1.1) |
| A4-R-02 | DssTextarea, DssSelect, DssItem, DssSeparator, DssSpace, DssSpinner | README abaixo do piso mínimo do CLAUDE.md (slots/events/tokens não declarados — ainda que existam nos `*_API.md`) |
| A4-R-03 | DssTextarea | `visualProperties.source` cita `_borderless.scss`/`_filled.scss` para valores que residem em `_outlined.scss:20-21` |
| A4-R-04 | DssFile | Barrel em `index.ts` (desvio nominal da convenção `index.js`; conteúdo completo) |
| A4-R-05 | DssItemSection | Barrel importa de `1-structure/` bypassando o wrapper; orquestrador SCSS com regras próprias (deveriam estar em `4-output/_states.scss`) |
| A4-R-06 | DssSelect | `::before` de placeholder do QSelect estilizado em `_base.scss:68` — registrar exceção documentada |
| A4-R-07 | DssItem | Touch target removido em densidade compact (`_density.scss:33`) — documentar implicação WCAG 2.5.5 como exceção formal |

### Conformidades destacadas
- 11/11 compilam sem erro (`npx sass`); zero `@import` no lote.
- 11/11 com `dss.meta.json` completo (goldenReference, goldenContext, previewGroup, `defaultPreview.demoSlots`, `defaultPreview.visualProperties`).
- Zero testes stub; 15–49 testes reais por componente.
- Zero valores hardcoded não documentados; todas as exceções (5) com justificativa inline e precedente.
- `brightness()` 100% canônico (0.95, 1.10, 1.20).
- DssSlider/DssRange usam exclusivamente tokens genéricos globais (`--dss-touch-target-*`, `--dss-track-height-sm`, `--dss-thumb-size-md`); nenhum token específico de componente foi criado.
- Tríade Item/Label/Section integrada via barrel central (`components/index.js:56-58, 261`).

---

*Relatório gerado por auditoria automatizada com leitura real de código. Evidências reproduzíveis via os comandos grep/sass citados em cada seção.*
