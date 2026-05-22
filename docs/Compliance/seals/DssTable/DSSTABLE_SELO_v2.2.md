# SELO DSS v2.2 — DssTable

**Data de emissão**: 2026-05-22
**Versão DSS**: 2.2.0
**Componente**: DssTable
**Status**: CONFORMANT

---

## Declaração de Conformidade

O componente `DssTable` foi auditado formalmente e está em conformidade com as normas do **Design System Sansys (DSS) v2.2**.

Este selo é emitido após a resolução de todas as Não-Conformidades (NCs) identificadas no ciclo de auditoria.

---

## Classificação

| Atributo | Valor |
|---|---|
| **Categoria** | Tabela interativa — Tabelas e Dados |
| **Fase** | 2 — Nível 4 (Dependente) |
| **Interatividade** | Interativo — seleção, ordenação, paginação, filtro |
| **Golden Reference** | DssChip (interativo — designação normativa global) |
| **Golden Context** | DssMarkupTable (tabela estática selada — mesma família, EXC-Gate-01 como precedente) |
| **Motor Quasar** | QTable |
| **Dependências DSS Internas** | Nenhuma. QTable gerencia internamente QCheckbox de seleção, ícones de sort e paginação. Filhos DSS via slots são responsabilidade do consumidor. |
| **Caminho** | `DSS/components/composed/DssTable/` |

---

## Ciclos de Auditoria

### Ciclo 1 — Auditoria Arquitetural e de Tokens

| Etapa | Data | Resultado |
|---|---|---|
| Implementação inicial | 2026-05-22 | 19 arquivos criados seguindo arquitetura de 4 camadas |
| Auditoria MCP (`validate_component_code`) | 2026-05-22 | 4 warnings (todos EXC-01 documentados) + 0 errors |
| Correção NC-01 (tokens ausentes no meta.json) | 2026-05-22 | `--dss-touch-target-md` e `--dss-duration-250` adicionados |
| **Emissão do Selo** | **2026-05-22** | **CONFORMANT** |

---

## Não-Conformidades Resolvidas

### NC-01 — Tokens Ausentes do `dss.meta.json` (Documental, não-bloqueante)

**Descrição**: `_base.scss` usa `--dss-touch-target-md` (altura mínima das áreas `.q-table__top` e `.q-table__bottom` — acessibilidade WCAG 2.5.5) e `--dss-duration-250` (transições de hover e seleção), mas estes tokens não estavam listados no array `tokens[]` do `dss.meta.json`.

**Impacto**: Rastreabilidade incompleta de tokens no meta.json. Não afeta comportamento em produção.

**Correção aplicada**: Tokens adicionados a `dss.meta.json`, `DSSTABLE_API.md` e `DssTable.md`.

**Arquivos modificados**: `dss.meta.json`, `DSSTABLE_API.md`, `DssTable.md`

---

## GAPs Corrigidos no Ciclo

### GAP-01 — Golden Context Incorreto no Pré-Prompt

**Descrição**: O `pre_prompt_dss_table.md` descrevia o próprio componente na seção "Golden Context" em vez de nomear um componente DSS selado como baseline de auditoria. O contexto correto é `DssMarkupTable` — componente de tabela estática da mesma família, com os mesmos EXC-Gate-01 como precedente.

**Correção**: `dss.meta.json` declara `"goldenContext": "DssMarkupTable"`. Todas as exceções documentadas referenciam DssMarkupTable como precedente.

### GAP-02 — Tokens Fantasmas no Pré-Prompt

**Descrição**: O pré-prompt listava tokens inexistentes: `--dss-font-weight-regular` (→ `-normal`), `--dss-border-width-1` (→ `-thin`), `--dss-border-color-default` (→ `--dss-gray-200`), `--dss-surface-hover/selected` (→ `--dss-gray-50/100`).

**Correção**: Implementação usa exclusivamente tokens existentes validados via Golden Context DssMarkupTable.

---

## Gate de Conformidade v2.4

### Gate Estrutural

| Item | Status |
|---|---|
| 4 camadas presentes (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`) | ✅ |
| Entry Point Wrapper (`DssTable.vue`) — re-export puro | ✅ |
| Orchestrador SCSS (`DssTable.module.scss`) — L2 → L3 → L4 | ✅ |
| Barrel export (`index.js`) | ✅ |
| `dss.meta.json` com `goldenReference` e `goldenContext` declarados | ✅ |

### Gate Técnico

| Item | Status |
|---|---|
| Token First — zero valores hardcoded não documentados | ✅ |
| Cores via CSS cascade (sem SCSS direto) | ✅ |
| Estados: hover, focus, selected, loading, dark mode | ✅ |
| Acessibilidade: `<table>/<thead>/<tbody>`, `th[tabindex]:focus-visible`, WCAG 2.1 AA | ✅ |
| `prefers-contrast: more` | ✅ |
| `forced-colors: active` | ✅ |
| `prefers-reduced-motion: reduce` | ✅ |
| `@media print` | ✅ |

### Gate Documental

| Item | Status |
|---|---|
| Tokens listados com nomes exatos (`dss.meta.json`, `DSSTABLE_API.md`, `DssTable.md`) | ✅ |
| `README.md` completo | ✅ |
| Documentação normativa `DssTable.md` (17 seções — Template 13.1) | ✅ |
| API Reference `DSSTABLE_API.md` (props, emits, slots, expose, tokens) | ✅ |
| Exemplo funcional `DssTable.example.vue` (6 cenários) | ✅ |
| Arquivo de testes `DssTable.test.js` (renderização, props, emits, slots, defineExpose) | ✅ |

---

## Exceções Formais Registradas

| ID | Tipo | Descrição | Precedente |
|---|---|---|---|
| `EXC-Gate-01` | Seletores descendentes | `.dss-table .q-table`, `.q-table th/td/tr` — DOM interno do QTable não acessível por escopo de componente | DssMarkupTable (EXC-Gate-01) |
| `EXC-Gate-02` | CSS custom property override | `--q-color-primary: var(--dss-action-primary)` governa QCheckbox interno e ícones de sort | DssPagination, DssAjaxBar (EXC-Gate-02) |
| `EXC-01` | Valor rgba() | Dark mode — `rgba(255,255,255,0.15)` (header border) e `rgba(255,255,255,0.06)` (row separator). Sem token DSS equivalente para opacidade em dark mode. | DssMarkupTable (EXC-01) |
| `EXC-02` | System color keywords | `forced-colors: active` — Canvas, CanvasText, ButtonText, Highlight, HighlightText. UA ignora custom properties em Windows HCM. | DssMarkupTable (EXC-02) |
| `EXC-03` | `display: block` em print | `@media print` — previne quebra de layout de impressão. | DssMarkupTable (EXC-03) |
| `EXC-04` | `1px solid currentColor` em print | `@media print` — th/td. Token não aplicável em contexto de impressão. | DssMarkupTable (EXC-04) |
| `EXC-Expose-01` | `defineExpose` | 5 métodos da API QTable: `requestServerInteraction`, `resetVirtualScroll`, `scrollTo`, `clearSelection`, `sort`. API imperativa para controle server-side e programático. | DssScrollArea, DssInfiniteScroll (EXC-Expose-01) |

---

## Props Bloqueadas

| Prop QTable | Motivo |
|---|---|
| `dark` | Tema escuro via `[data-theme='dark']` global — nunca por prop de componente |
| `color` | Cor governada via `--q-color-primary` override com tokens DSS |
| `square` | DssTable sempre usa `--dss-radius-md` — remover bordas arredondadas viola identidade DSS |

---

## Estados Não Aplicáveis

| Estado | Justificativa |
|---|---|
| `hover` | Aplicado às linhas (tbody tr), não ao container raiz |
| `focus` | Focus em th[tabindex] individualmente (colunas ordenáveis) |
| `active` | N/A — interatividade pertence às linhas e controles internos |
| `disabled` | Tabelas não têm estado disabled; linhas individuais podem usar slot #body-row |

---

## Auditores

- Claude Code (MCP-First, auditoria automatizada via `validate_component_code`)
- Revisão manual — Gate de Conformidade v2.4 — 6 gates
