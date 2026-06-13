# Auditoria Final A7 — Componentes de Formulário (DSS)

**Data:** 2026-06-11
**Escopo:** DssForm, DssField, DssOptionGroup, DssRating, DssKnob, DssColorPicker, DssDatePicker, DssTimePicker, DssUploader
**Foco:** v-model, validação, acessibilidade de formulário
**Baseline normativo:** CLAUDE.md, DSS_COMPONENT_ARCHITECTURE.md
**Golden References:** DssChip (interativo), DssBadge (não interativo)

---

## Veredito Geral

**⚠️ APROVADO COM RESSALVAS**

- Gates Estrutural e Técnico: **confirmados para os 9 componentes** (nenhuma falha bloqueante real).
- Ressalvas concentradas em: testes ausentes (DssUploader), cobertura de teclado nos testes (DssKnob, DssRating), `visualProperties` ausente nos metas dos 5 composed, e `outline-offset: 2px` hardcoded (padrão sistêmico do codebase).

---

## Tabela-Resumo por Componente

| Componente | Gate Estrutural | Gate Técnico | Gate Documental | Veredito |
|---|---|---|---|---|
| DssField (base) | ✅ | ✅ | ✅ | ✅ APROVADO |
| DssOptionGroup (base) | ✅ (nota: `index.ts`) | ✅ | ✅ | ✅ APROVADO |
| DssRating (base) | ✅ | ✅ (nota: outline-offset) | ⚠️ teste de teclado ausente | ⚠️ RESSALVA |
| DssKnob (base) | ✅ | ✅ (exceções documentadas) | ⚠️ teste de teclado ausente | ⚠️ RESSALVA |
| DssForm (composed) | ✅ | ✅ | ⚠️ `visualProperties` ausente no meta | ✅ APROVADO |
| DssColorPicker (composed) | ✅ | ✅ | ⚠️ label acessível não documentado; `visualProperties` ausente | ⚠️ RESSALVA |
| DssDatePicker (composed) | ✅ | ✅ | ⚠️ `visualProperties` ausente | ⚠️ RESSALVA (leve) |
| DssTimePicker (composed) | ✅ | ✅ | ⚠️ `visualProperties` ausente | ⚠️ RESSALVA (leve) |
| DssUploader (composed) | ⚠️ **`DssUploader.test.js` AUSENTE** | ✅ | ⚠️ defaultPreview mínimo; `visualProperties` ausente | ⚠️ RESSALVA |

---

## 1. Gate Estrutural — Evidências

Verificação em lote (existência de arquivos) para os 9 componentes:

| Item | Field | OptGrp | Rating | Knob | Form | Color | Date | Time | Uploader |
|---|---|---|---|---|---|---|---|---|---|
| `1-structure/Dss<C>.ts.vue` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `2-composition/_base.scss` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `3-variants/index.scss` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `4-output/_states.scss` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `4-output/_brands.scss` | ✅ | ✅* | ✅ | ✅ | ✅* | ✅ | ✅ | ✅ | ✅ |
| `4-output/index.scss` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Wrapper `Dss<C>.vue` re-export puro | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `module.scss` L2 → L3 → L4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Barrel export | ✅ | ⚠️ `index.ts` | ✅ | ✅ | ⚠️ sem types | ⚠️ sem types | ⚠️ sem types | ⚠️ sem types | ⚠️ sem types |
| `dss.meta.json` (golden/preview) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Dss<C>.test.js` | ✅ (223 l) | ✅ (216 l) | ✅ (219 l) | ✅ (206 l) | ✅ (321 l) | ✅ (255 l) | ✅ (351 l) | ✅ (219 l) | ❌ **AUSENTE** |

\* `_brands.scss` de DssForm e DssOptionGroup são intencionalmente vazios (containers estruturais; brand delegada aos filhos via `[data-brand]` herdado — justificativa documentada no próprio arquivo, padrão DssStepper). Conforme.

**Notas estruturais:**
- **DssOptionGroup** usa `index.ts` em vez de `index.js` — funcionalmente superior (exporta componente + types + composable via `export type`). Divergência apenas de nomenclatura em relação ao checklist.
- **DssForm, DssColorPicker, DssDatePicker, DssTimePicker, DssUploader**: `index.js` exporta componente + composable, mas **não os types** — limitação documentada em `composed/DssUploader/index.js` ("`export type` é sintaxe TS, inválida em .js"; consumidores importam de `./types/*.types`). Recomendação: migrar barrels para `.ts` (padrão DssOptionGroup).
- **DssUploader.test.js não existe** em nenhum local do repositório (`find` global sem resultado). CLAUDE.md declara "100% de cobertura: 76/76 componentes possuem test.js" — **divergência factual com o corpo normativo**. Per critério de aceite desta auditoria, testes ausentes = ressalva não-bloqueante, mas o gate de build descrito no CLAUDE.md o trata como bloqueante para selo.

---

## 2. Gate Técnico — Evidências

### Token First (grep px/rem/hex/rgb em `_base.scss`, `3-variants/`, `4-output/`)
- **Limpos:** DssField, DssOptionGroup, DssForm, DssUploader (`_base.scss` 100% tokens).
- **`outline-offset: 2px`** hardcoded em DssRating, DssKnob, DssColorPicker (2×), DssDatePicker, DssTimePicker — padrão sistêmico (22 arquivos no codebase usam o mesmo valor). Os Golden References usam token (`DssBadge/_states.scss`: `outline-offset: var(--dss-spacing-0_5)`; DssChip usa exceção documentada de 1px). **Ressalva não-bloqueante** dada a prevalência sistêmica; recomendação: tokenizar como `--dss-focus-ring-offset` em onda futura.
- DssRating `_base.scss:15` usa `var(--dss-min-w-sm)` com comentário "160px" — apenas comentário, conforme.
- DssDatePicker/_states:58, DssTimePicker/_states:52, DssUploader/_states:169: `border: 1px/2px solid ButtonText/Highlight` — **dentro de `@media (forced-colors: active)`** com SystemColor keywords (WCAG 1.4.11). Exceção legítima e documentada no próprio arquivo. Conforme.

### Brandabilidade `[data-brand="hub|water|waste"]`
- Presente nos `_brands.scss` de: DssField (4 ocorrências), DssRating (4), DssKnob (7), DssColorPicker (3), DssDatePicker (3), DssTimePicker (3), DssUploader (11). ✅
- DssForm e DssOptionGroup: vazios intencionais com justificativa normativa inline. ✅

### `::before` reservado para touch target
- Única ocorrência: `base/DssKnob/2-composition/_base.scss:118` — `&.q-knob--editable::before { box-shadow: none !important; }`. **Não é efeito visual DSS**: neutralização do `::before` interno do QKnob (EXC-Focus-01, documentada inline), substituído por outline DSS via `:focus-visible` (padrão DssChip). Conforme.

### brightness() — valores canônicos
- DssRating: 0.95 (hover), 0.90 (active). DssKnob: 0.95, 0.90. DssColorPicker: 0.85. Todos canônicos (EX-Structural-01), com comentários referenciando a tabela. ✅ Nenhum valor arbitrário encontrado.

### Cores via classes utilitárias / computed no Vue
- Nenhum hex/rgb em SCSS dos 9 componentes. DssColorPicker usa `color="primary"` fixo + override `--q-color-primary` (EXC-Gate-02 documentado, padrão idêntico a DssPagination/DssCarousel). ✅

---

## 3. Gate Documental — Evidências

| Item | Status |
|---|---|
| README.md presente nos 9 | ✅ |
| API completa | ✅ via `DSS<COMP>_API.md` (todos com seções Props/Slots/Events/Tokens — 5 headings API confirmados por amostragem em Rating, ColorPicker, Uploader). ⚠️ Nota: o Piso Mínimo do CLAUDE.md pede API no README; o padrão do projeto delega ao `*_API.md` com link no README (READMEs são quick-start). Convenção consistente, registrada como observação. |
| example.vue ≥ 3 cenários | ✅ todos (contagem de seções: Field 6, OptionGroup 22, Rating 6, Knob 6, Form 13, Color 30, Date 40, Time 40, Uploader 29) |
| `visualProperties` reflete CSS | ✅ nos 4 base (Field, OptionGroup, Rating, Knob). ❌ **ausente nos 5 composed** (Form, ColorPicker, DatePicker, TimePicker, Uploader) — metas têm apenas `computedTokens`/`props`. Ressalva: contrato visual canônico incompleto para composed. |

---

## 4. Verificações Específicas de Formulário

| Verificação | Resultado |
|---|---|
| **DssForm expõe `validate()`?** | ✅ `types/form.types.ts:75` — `validate(shouldFocus?: boolean): Promise<boolean>`, mais `resetValidation()`, `submit()`, `reset()`. Implementação delega ao QForm (`1-structure/DssForm.ts.vue:116`). Documentado no README (linha 72) e **testado** (`DssForm.test.js:202,222,258` — expõe, delega ao QForm, retorna Promise<boolean>). |
| **DssField wraps QField?** | ⚠️ **Não** — implementação própria com `<div>`/`<label>` nativos (sem QField). Fornece o chrome visual (label flutuante, borda, hint, erro) via composição. Slots `label` e `hint` **documentados** em `types/field.types.ts` (FieldSlots), além de `default` com scope `{ fieldId, ariaDescribedby }` para associação ARIA, `prepend/append/before/after`, `error`. Decisão arquitetural válida (container passivo); README documenta anti-pattern de chrome duplicado. |
| **Pickers em composed/, não base/** | ✅ DssColorPicker, DssDatePicker, DssTimePicker confirmados em `packages/core/components/composed/`. |
| **DssUploader: progress + eventos de upload** | ✅ `types/uploader.types.ts` — `__status: 'idle'|'uploading'|'uploaded'|'failed'`, `__progress`, `__progressLabel`; eventos `rejected`, `uploading`, `uploaded`, `failed` tipados e documentados em `DSSUPLOADER_API.md` (linhas 73–76). ⚠️ README não menciona progress (delegado ao API.md). |

---

## 5. V-Model

| Componente | modelValue / update:modelValue em types/ | Evidência |
|---|---|---|
| DssOptionGroup | ✅ `any \| any[]` | `option-group.types.ts:33,63` — **multi-select com array confirmado**: `type="checkbox"\|"toggle"` → array de valores (documentado linhas 31, 61) |
| DssRating | ✅ `number` | `rating.types.ts:4,19` |
| DssKnob | ✅ `number` | `knob.types.ts:7,46` |
| DssColorPicker | ✅ `string` / emite `string \| null` | `color-picker.types.ts:4,22` |
| DssDatePicker | ✅ `DssDatePickerModelValue` | `date-picker.types.ts:10,64` |
| DssTimePicker | ✅ `string` | `time-picker.types.ts:2,22` |
| DssField | N/A por design — container estrutural passivo, `FieldEmits` vazio intencional (comentado nos types) | ✅ conforme |
| DssForm | N/A — container; expõe validate/submit/reset | ✅ conforme |
| DssUploader | N/A — QUploader não usa v-model (gestão interna de fila de arquivos) | ✅ conforme padrão Quasar |

Testes de v-model presentes: Rating (5 asserções `update:modelValue`), OptionGroup (4), ColorPicker (4), DatePicker (7), TimePicker (4), Knob (1).

---

## 6. Acessibilidade

| Verificação | Resultado |
|---|---|
| **DssRating — role ARIA** | ✅ `role=slider` + `aria-valuemin/max/now` via QRating (documentado em `1-structure/DssRating.ts.vue:20`). README documenta touch target WCAG 2.5.5 e navegação por teclado. |
| **DssKnob — teclado (WCAG 2.1.1)** | ✅ QKnob gerencia ArrowUp/Down/Left/Right, PageUp/Down, Home/End (documentado em `1-structure/DssKnob.ts.vue:24-26`); `tabindex` exposto como prop; README documenta a tabela de teclas (linhas 78-79). Focus ring DSS via `:focus-visible` com tokens. |
| **DssColorPicker — label acessível** | ⚠️ **Nenhum mecanismo de label próprio**: QColor como root (EXC-Gate-01), sem prop `aria-label` explícita. `v-bind="$attrs"` permite repasse de `aria-label` pelo consumer, mas **nem README nem DSSCOLORPICKER_API.md documentam isso** (grep aria/acessib sem resultado). **Recomendação:** documentar uso de `aria-label` via attrs ou composição com DssField. |

---

## 7. META.JSON

| Componente | previewGroup | defaultPreview funciona sem interação? |
|---|---|---|
| DssField | `contextuais` | ✅ props `{}` + demoContent textual |
| DssOptionGroup | `form-controles` | ✅ `type=radio, modelValue="opt1"` + 2 options — estado selecionado estático |
| DssRating | `indicadores` | ✅ `modelValue: 3, max: 5` |
| DssKnob | `indicadores` | ✅ `modelValue: 50, min: 0, max: 100` |
| DssForm | `contextuais` | ✅ demoSlots ricos (DssInput + DssSelect + DssButton) — estado default, sem submitting |
| DssColorPicker | `contextuais` | ✅ `formatModel: "hex"` — picker renderiza estado inicial |
| DssDatePicker | `contextuais` | ✅ `modelValue: "2026/05/22"` |
| DssTimePicker | `contextuais` | ✅ `modelValue: "14:30", format24h` |
| DssUploader | `contextuais` | ⚠️ defaultPreview contém **apenas** `demoSlots: null` — sem props nem demoContent; preview depende 100% do default do componente. Funciona (estado idle), mas é o meta mais pobre do grupo. |

- `previewGroup` definido nos 9. ✅
- Chave `demoSlots` declarada nos 9 (valor `null` nos componentes sem slots de demo — válido para previews props-driven; conteúdo real apenas em DssForm). ✅ formal.
- Nenhum preview em estado loading/submitting. ✅
- `goldenReference`/`goldenContext` declarados nos 9 (ex.: Field→DssInput, OptionGroup→DssBtnToggle, Knob→DssSlider, ColorPicker→DssDatePicker, Uploader→DssCard). ✅

---

## 8. Testes de Acessibilidade por Teclado

Busca: `grep -n "keydown|ArrowUp|ArrowDown|Space|Enter|keyboard"` nos `.test.js`:

| Componente | Resultado | Status |
|---|---|---|
| DssKnob | Apenas `DssKnob.test.js:156` — "is keyboard focusable (has tabindex)". **Nenhum teste de ajuste de valor com ArrowUp/ArrowDown.** | ⚠️ **ALERTA** |
| DssRating | Apenas `DssRating.test.js:168` — "is keyboard focusable by default". **Nenhum teste de seleção com Enter/Space.** | ⚠️ **ALERTA** |

Atenuante: a interação por teclado é implementada internamente pelo QKnob/QRating (Quasar), não por código DSS — os testes cobrem o contrato DSS (focabilidade, tabindex). Ainda assim, recomenda-se teste de regressão simulando `keydown` para garantir que o wrapper DSS não quebra a delegação. Nenhum teste é stub (206–351 linhas, com asserções reais de render, props, eventos e slots).

---

## 9. Ressalvas Consolidadas (ordem de prioridade)

1. **DssUploader.test.js ausente** — única lacuna do gate estrutural; contradiz a alegação "76/76" do CLAUDE.md. Criar com cobertura mínima (render, props, eventos `uploading/uploaded/failed/rejected`, slots).
2. **DssKnob / DssRating** — adicionar testes de teclado (ArrowUp/ArrowDown; Enter/Space).
3. **DssColorPicker** — documentar estratégia de label acessível (`aria-label` via `$attrs` ou composição com DssField).
4. **`visualProperties` ausente** nos `dss.meta.json` dos 5 composed (Form, ColorPicker, DatePicker, TimePicker, Uploader) — completar para conformidade com o Contrato Visual Canônico (Princípio #12).
5. **`outline-offset: 2px`** hardcoded em 5 dos 9 (padrão sistêmico em 22 arquivos do codebase) — candidato a tokenização global (`--dss-focus-ring-offset`); não tratar como falha individual destes componentes.
6. **Barrels `.js` sem export de types** (5 composed) — migrar para `index.ts` (padrão DssOptionGroup).
7. **DssUploader defaultPreview** mínimo — enriquecer com props/demoContent.

---

## 10. Critério de Aceite Aplicado

- Gate Estrutural: ✅ 9/9 (DssUploader com lacuna de teste, classificada como ressalva conforme critério desta auditoria).
- Gate Técnico: ✅ 9/9 — nenhuma falha real; exceções encontradas estão documentadas inline (EXC-Gate-01/02, EXC-Focus-01, forced-colors SystemColors) ou são padrão sistêmico (outline-offset).
- Gate Documental: ⚠️ ressalvas não-bloqueantes (itens 1–7 acima).

**Resultado final: ⚠️ APROVADO COM RESSALVAS** — nenhum componente reprovado.
