# Selo de Conformidade DSS v2.2 — DssTree

> **Componente:** DssTree  
> **Versão DSS:** 2.2  
> **Data de Emissão:** 22 de Maio de 2026  
> **Auditor:** Claude Code (Sonnet 4.6)  
> **Ciclos de Auditoria:** 1  
> **Resultado:** ✅ CONFORME

---

## Identificação

| Campo | Valor |
|-------|-------|
| Componente | DssTree |
| Quasar Base | QTree |
| CSS Class | `.dss-tree` |
| Fase | 2 |
| Nível | 4 (Dependente) |
| Golden Reference | DssChip |
| Golden Context | DssExpansionItem |
| Família | Navegação e Estrutura de Dados |

---

## Resultado dos Gates

| Gate | Status | Observação |
|------|--------|------------|
| Gate 1 — Estrutura de 4 camadas | ✅ PASS | Todas as camadas presentes |
| Gate 2 — Entry Point Wrapper | ✅ PASS | `DssTree.vue` re-export puro |
| Gate 3 — Orchestrador SCSS | ✅ PASS | L2 → L3 → L4 na ordem correta |
| Gate 4 — Barrel export | ✅ PASS | `index.js` exporta componente + composables |
| Gate 5 — dss.meta.json | ✅ PASS | goldenReference + goldenContext declarados |
| Gate 6 — Token First | ✅ PASS | Valores hardcoded justificados como EXC |

---

## Não-Conformâncias

### NC-01 — `calc(var(--dss-touch-target-md) * 0.75)` em `_variant.scss` *(corrigida)*

**Severidade:** Não-bloqueante  
**Arquivo:** `3-variants/_variant.scss`  
**Descrição:** O modificador `* 0.75` no `min-height` da variante dense usava um multiplicador hardcoded (sem token DSS correspondente), resultando em 36px — abaixo do mínimo WCAG 2.5.5 de 44px.  
**Correção:** Removido o override de `min-height` do bloco dense. O `min-height: var(--dss-touch-target-md)` da camada base é mantido — apenas `padding` é reduzido no modo dense.  
**Status:** ✅ Corrigida no mesmo ciclo

---

## GAPs do Pré-prompt

### GAP-01 — Golden Context não nomeado

**Descrição:** O pré-prompt descrevia o componente Golden Context sem nomear explicitamente o componente. Identificado como DssExpansionItem via `dss.meta.json` do componente.  
**Impacto:** Baseline de auditoria ambígua no pré-prompt.  
**Ação:** Confirmado DssExpansionItem como Golden Context. Corrigido para próximas gerações do pré-prompt.

### GAP-02 — Tokens inexistentes referenciados no pré-prompt

**Descrição:** O pré-prompt referenciava tokens que não existem no catálogo DSS:
- `--dss-action-hub-surface` → correto: `--dss-hub-50`
- `--dss-surface-hover` → correto: `--dss-gray-50`
- `--dss-text-default` → correto: `--dss-text-body`

**Impacto:** Risco de tokens fantasmas na implementação.  
**Ação:** Tokens corrigidos na implementação. Tokens inexistentes não foram usados no SCSS.

### GAP-03 — Renomeação de props proposta mas não aplicada

**Descrição:** O pré-prompt propunha renomear props QTree para nomes DSS-style (ex: `node-key` → `node-id-key`). Não aplicado — props mantidas com nomes nativos do QTree para compatibilidade ergonômica.  
**Impacto:** Mínimo — apenas preferência de nomenclatura.  
**Ação:** Mantidos nomes QTree nativos (`nodeKey`, `labelKey`, `childrenKey`, etc.).

### GAP-04 — `opacity: 0.5` para disabled em vez de token

**Descrição:** O pré-prompt sugeria `opacity: 0.5` para nós desabilitados.  
**Correção:** Implementado `opacity: var(--dss-opacity-disabled)` = 0.4 conforme catálogo DSS.

---

## Exceções Registradas

| ID | Tipo | Descrição |
|----|------|-----------|
| EXC-Gate-01 | Gate | Seletores descendentes `.dss-tree .q-tree__*` — DOM interno QTree |
| EXC-Gate-02 | Gate | `--q-color-primary: var(--dss-action-primary)` — governa QCheckbox e spinner internos |
| EXC-01 | Código | Dark mode connectors: `rgba(255,255,255,0.15)` — sem token DSS equivalente |
| EXC-02 | Código | `forced-colors`: system color keywords (`Canvas`, `ButtonText`, `Highlight`, `HighlightText`) |
| EXC-03 | Código | Print: `display: block` no container |
| EXC-04 | Código | Print: `outline: 1px solid currentColor` em seleção e connectors |
| EXC-Expose-01 | API | `defineExpose` com 9 métodos imperativos do QTree |

---

## Arquivo de Componente

| Arquivo | Status |
|---------|--------|
| `1-structure/DssTree.ts.vue` | ✅ |
| `2-composition/_base.scss` | ✅ |
| `3-variants/_variant.scss` | ✅ |
| `3-variants/index.scss` | ✅ |
| `4-output/_states.scss` | ✅ |
| `4-output/_brands.scss` | ✅ |
| `4-output/index.scss` | ✅ |
| `composables/useTreeClasses.ts` | ✅ |
| `composables/index.ts` | ✅ |
| `types/tree.types.ts` | ✅ |
| `DssTree.vue` | ✅ |
| `DssTree.module.scss` | ✅ |
| `DssTree.md` | ✅ |
| `DSSTREE_API.md` | ✅ |
| `DssTree.example.vue` | ✅ |
| `DssTree.test.js` | ✅ |
| `dss.meta.json` | ✅ |
| `README.md` | ✅ |
| `index.js` | ✅ |

---

## Decisões Arquiteturais Registradas

1. **QTree como root** — A classe `.dss-tree` é aplicada diretamente no `<ul role="tree">` do QTree via `:class`. Não existe wrapper div extra. Padrão idêntico a DssExpansionItem, DssScrollArea.

2. **Dynamic slot forwarding** — `v-for="(_, name) in $slots" #[name]="slotData"` encaminha TODOS os slots dinamicamente, incluindo slots dinâmicos por nó (`#[header-{key}]`, `#[body-{key}]`) que não podem ser enumerados estaticamente.

3. **tickStrategy='none' → undefined** — QTree não tem `tick-strategy="none"`. O DSS trata `'none'` como ausência de tickStrategy: `props.tickStrategy !== 'none' ? props.tickStrategy : undefined`.

4. **withDefaults para labels PT-BR** — `noNodesLabel` e `noResultsLabel` têm defaults em português para garantir UX consistente sem configuração adicional.

5. **Dense reduz apenas padding** — Em dense mode, apenas o padding é reduzido. O `min-height` permanece como `var(--dss-touch-target-md)` para WCAG 2.5.5.

---

## Tokens Verificados (36)

`--dss-action-primary`, `--dss-font-family-sans`, `--dss-font-size-md`, `--dss-font-size-sm`, `--dss-font-weight-semibold`, `--dss-text-body`, `--dss-gray-50`, `--dss-gray-100`, `--dss-gray-200`, `--dss-gray-700`, `--dss-gray-800`, `--dss-radius-sm`, `--dss-spacing-1`, `--dss-spacing-1_5`, `--dss-spacing-2`, `--dss-spacing-3`, `--dss-spacing-4`, `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-duration-250`, `--dss-touch-target-md`, `--dss-opacity-disabled`, `--dss-hub-50`, `--dss-hub-200`, `--dss-hub-600`, `--dss-hub-700`, `--dss-hub-900`, `--dss-water-50`, `--dss-water-200`, `--dss-water-500`, `--dss-water-700`, `--dss-water-900`, `--dss-waste-50`, `--dss-waste-200`, `--dss-waste-600`, `--dss-waste-700`, `--dss-waste-900`

*(37 tokens — `--dss-hub-200` e `--dss-waste-900` adicionados relativamente à lista inicial)*

---

**Emitido em:** 22 de Maio de 2026  
**Status:** ✅ CONFORME — DssTree pode ser usado em produção sob governança DSS v2.2
