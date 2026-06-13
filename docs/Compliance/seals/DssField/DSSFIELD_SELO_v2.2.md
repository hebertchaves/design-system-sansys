# SELO DSS v2.2 — DssField

## ✅ APROVADO

| Campo | Valor |
|-------|-------|
| **Componente** | DssField |
| **Versão do Selo** | v2.2 |
| **Data de Emissão** | 19 Mai 2026 |
| **Ciclos de Auditoria** | 1 |
| **Status** | ✅ SELADO |
| **Fase** | 2 — Nível 2 |
| **Família** | Formulários |
| **Golden Reference** | DssChip |
| **Golden Context** | DssInput |
| **Quasar Base** | QField (conceitual — implementação custom, sem dependência de QField) |

---

## Gate Estrutural

| Critério | Status | Observação |
|----------|--------|-----------|
| 4 camadas presentes (L1/L2/L3/L4) | ✅ | 1-structure, 2-composition, 3-variants (4 variantes + index), 4-output (_brands + _states + index) |
| Entry Point Wrapper (`DssField.vue`) | ✅ | Re-export puro — sem template/style/lógica própria |
| Orquestrador SCSS (`DssField.module.scss`) | ✅ | L2 → L3 (as variants) → L4 (as output). Namespace corrigido. |
| Barrel export (`index.js`) | ✅ | Exporta DssField wrapper, useFieldClasses, tipos |
| `dss.meta.json` com goldenReference e goldenContext | ✅ | goldenReference: DssChip, goldenContext: DssInput |
| `SCSS compila sem erros` | ✅ | `npx sass DssField.module.scss` — zero erros |
| `MCP validate_component_code` | ✅ | verdict: compliant, 0 findings |

---

## Gate Técnico

| Critério | Status | Observação |
|----------|--------|-----------|
| Token First (zero hardcoded) | ✅ | MCP: compliant. 40 tokens declarados em meta.json |
| Cores via tokens (não hardcoded) | ✅ | Zero hex/rgb no SCSS |
| Estados implementados (hover, focus, active, disabled, readonly, loading, error) | ✅ | Todos os estados com mecanismo documentado |
| Acessibilidade — WCAG 2.1 AA | ✅ | label[for], role=alert, role=status, ariaDescribedby via slot scope |
| Touch target — WCAG 2.5.5 | ✅ | `min-height: var(--dss-touch-target-md)` em `.dss-field__field` (EX-Structural-01) |
| prefers-reduced-motion | ✅ | EX-States-01 — transition/animation suprimidos |
| prefers-contrast: more | ✅ | EX-States-02 — borda reforçada + outline thick no focus |
| forced-colors: active | ✅ | EX-States-03 — SystemColor keywords (ButtonText/Highlight/LinkText/GrayText) |
| inheritAttrs: false + v-bind="$attrs" | ✅ | Atributos extras aplicados no root div |
| defineEmits omitido | ✅ | Container não-emissor — padrão DSS de containers |
| defineExpose completo | ✅ | fieldId, hintId, errorId, ariaDescribedby |

---

## Gate de Composição (Fase 2)

| Critério | Status | Observação |
|----------|--------|-----------|
| Zero HTML nativo substituível | ✅ | DssField é por design wrapper de controles nativos — correto |
| Zero quebra de encapsulamento (`:deep()`) | ✅ | Nenhum uso de :deep() ou ::v-deep |
| Importações de sub-componentes corretas | ✅ | N/A — nenhum sub-componente DSS interno (container estrutural puro) |

---

## Gate de Responsabilidade (Fase 2)

| Critério | Status | Observação |
|----------|--------|-----------|
| Sem captura de estados dos filhos via CSS | ✅ | Estados do chrome (focused, error, disabled) pertencem ao DssField |
| Sem lógica de negócio no template | ✅ | Lógica de UI/UX pura — brand/variant/size/states |
| Limites documentados no `.md` | ✅ | DssField.md §10 declara explicitamente o que é delegado ao controle interno |

---

## Gate Documental

| Critério | Status | Observação |
|----------|--------|-----------|
| Documentação normativa (Template 13.1) — DssField.md | ✅ | 12 seções completas |
| API Reference — DSSFIELD_API.md | ✅ | Props, blocked props, slots (com ariaDescribedby), expose, tokens, CSS classes |
| README.md — quick start | ✅ | Anti-patterns, variantes, exemplos |
| Exemplo funcional — DssField.example.vue | ✅ | 6 cenários: outlined+hub, filled+water+error, stack-label, borderless, disabled, standout+data-brand |
| dss.meta.json — completo e correto | ✅ | 40 tokens, 5 propsBlocked, 7 exceptions, compositionRecommendations atualizados |
| Pré-prompt — 5 eixos cobertos | ✅ | Reescrito pós-auditoria com dados reais |

---

## Exceções Registradas

| ID | Categoria | Decisão |
|----|-----------|---------|
| **EXC-Gate-01** | Estrutural | Implementação custom (div, não QField) — consistência com DssInput (Golden Context) |
| **EX-Focus-01** | Técnico | `focusin`/`focusout` no wrapper raiz para tracking de foco do controle interno (bubbling DOM) |
| **EX-Label-01** | Structural | `hasValue` prop externa para controle do float do label (sem v-model interno) |
| **EX-Structural-01** | Structural | Sem `::before` touch target — DssField não é controle compacto interativo |
| **EX-States-01** | States | `prefers-reduced-motion: reduce` — transition/animation suprimidos (WCAG 2.3.3) |
| **EX-States-02** | States | `prefers-contrast: more` (NOT 'high') — borda reforçada + outline thick (WCAG 1.4.11) |
| **EX-States-03** | States | `forced-colors: active` — SystemColor keywords obrigatórios (WCAG 1.4.11) |

---

## Não-Conformidades do Ciclo de Auditoria

| ID | Descrição | Resolução |
|----|-----------|-----------|
| **NC-01** | `--dss-gray-800` ausente em `dss.meta.json` `tokensUsed` | ✅ Corrigido — token adicionado (40 tokens total) |
| **NC-02** | `import type { FieldEmits }` importado mas nunca usado em `DssField.ts.vue` | ✅ Corrigido — import removido |
| **NC-03** | Documentação inconsistente sobre `aria-hidden` nos slots append/before/after | ✅ Corrigido — `DssField.md §6` e `dss.meta.json compositionRecommendations` atualizados |

---

## Gaps Resolvidos no Ciclo de Auditoria

| ID | Descrição | Resolução |
|----|-----------|-----------|
| **GAP-01** | Slot scope expunha apenas `fieldId` — `ariaDescribedby` não acessível ao consumer | ✅ Resolvido — slot scope expandido: `{ fieldId, ariaDescribedby }`. `defineExpose` ampliado: `fieldId, hintId, errorId, ariaDescribedby` |
| **GAP-02** | Pré-prompt: Golden Context incorreto (descrição genérica) | ✅ Corrigido — `Golden Context: DssInput` |
| **GAP-03** | Pré-prompt §1: Fase, Nível, Família e Quasar Base ausentes | ✅ Corrigido — tabela de classificação completa |
| **GAP-04** | Pré-prompt §2: Riscos genéricos — EXC-Gate-01, EX-Focus-01, EX-Label-01 ausentes | ✅ Corrigido — padrões ❌/✅ para os 3 riscos reais |
| **GAP-05** | Pré-prompt §3: Props bloqueadas listadas como expostas; hasValue/brand/stackLabel ausentes | ✅ Corrigido — tabela de API reescrita a partir da implementação real |
| **GAP-06** | Pré-prompt §4: 12+ tokens fantasmas | ✅ Corrigido — tabela com os 40 tokens reais |

---

## Tokens Utilizados (40 tokens)

`--dss-font-family-sans` · `--dss-font-size-md` · `--dss-font-size-sm` · `--dss-line-height-normal` · `--dss-text-secondary` · `--dss-error-600` · `--dss-surface-default` · `--dss-gray-50` · `--dss-gray-100` · `--dss-gray-200` · `--dss-gray-300` · `--dss-gray-400` · `--dss-gray-600` · `--dss-gray-700` · `--dss-gray-800` · `--dss-gray-900` · `--dss-action-primary` · `--dss-border-width-thin` · `--dss-border-width-md` · `--dss-border-width-thick` · `--dss-radius-md` · `--dss-radius-full` · `--dss-spacing-1` · `--dss-spacing-2` · `--dss-spacing-3` · `--dss-spacing-4` · `--dss-spacing-5` · `--dss-spacing-8` · `--dss-touch-target-md` · `--dss-duration-200` · `--dss-duration-500` · `--dss-easing-standard` · `--dss-opacity-disabled` · `--dss-hub-600` · `--dss-hub-700` · `--dss-water-500` · `--dss-water-600` · `--dss-water-700` · `--dss-waste-600` · `--dss-waste-700` · `--dss-waste-800`

---

## Precedentes Estabelecidos

| Precedente | Descrição |
|-----------|-----------|
| `EX-Focus-01` — bubbling focus | `focusin`/`focusout` + `contains(relatedTarget)` para tracking de foco em containers sem input próprio. Padrão para qualquer futuro componente chrome-de-campo. |
| `EX-Label-01` — hasValue externo | Prop `hasValue` para controle de label flutuante sem v-model. Padrão para containers estruturais de formulário. |
| `ariaDescribedby` via slot scope | Slot scope expõe `{ fieldId, ariaDescribedby }` para associação ARIA completa sem que o consumer precise conhecer IDs internos. Padrão para componentes de formulário com hint/error. |
| Pré-prompt pós-auditoria | `pre_prompt_dss_field.md` reescrito com dados reais — modelo para DssForm (próximo da família). |

---

## Paridade com Golden Context (DssInput)

| Aspecto | DssInput | DssField | Status |
|---------|----------|----------|--------|
| Root element | `<div class="dss-input">` | `<div class="dss-field">` | ✅ Idêntico em estrutura |
| Custom (sem Quasar base) | ✅ | ✅ (EXC-Gate-01) | ✅ Consistente |
| Dual-selector brand | ✅ | ✅ | ✅ Idêntico |
| prefers-contrast | `high` (**INCORRETO**) | `more` (**CORRETO**) | ✅ DssField usa valor canônico |
| Touch target token | `--dss-input-height-md` (deprecated) | `--dss-touch-target-md` (canônico) | ✅ DssField usa token correto |
| Variantes | outlined/filled/borderless/standout | outlined/filled/borderless/standout | ✅ Idênticos |
| Brand tokens | hub-600/700, water-500/600/700, waste-600/700/800 | hub-600/700, water-500/600/700, waste-600/700/800 | ✅ Idênticos |

---

## Observações para Componentes Futuros

**DssForm** (próximo da família — Nível 2):
- Pré-prompt disponível e corrigido: `pre_prompt_dss_field.md` serve como referência de família
- DssForm pode usar DssField como chrome para campos customizados
- DssField.md §10 documenta explicitamente o que DssForm NÃO deve aninhar (DssInput, DssSelect, DssTextarea com chrome próprio)
- Herança de `EX-Focus-01` e `EX-Label-01` como padrões da família Formulários
