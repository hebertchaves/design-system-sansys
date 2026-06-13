# SELO DSS v2.2 — DssLinearProgress

**Data de emissão**: 2026-05-06
**Versão DSS**: 2.2.0
**Componente**: DssLinearProgress
**Status**: CONFORMANT

---

## Declaração de Conformidade

O componente `DssLinearProgress` foi auditado formalmente e está em conformidade com as normas do **Design System Sansys (DSS) v2.2**.

Este selo é emitido após a resolução de todas as Não-Conformidades (NCs) identificadas no ciclo de auditoria.

---

## Classificação

| Atributo | Valor |
|----------|-------|
| **Categoria** | Indicador de Progresso não interativo — Progresso e Feedback |
| **Fase** | 2 — Nível 2 (Composição de Base) |
| **Interatividade** | Não interativo (Opção B) |
| **Golden Reference** | DssBadge (não interativo — designação normativa global) |
| **Golden Context** | DssSpinner (selado 2026-03-24 — baseline de auditoria) |

---

## Ciclos de Auditoria

### Ciclo 1 — Auditoria Arquitetural e de Tokens

| Etapa | Data | Resultado |
|-------|------|-----------|
| Auditoria inicial | 2026-05-06 | 2 NCs + 6 GAPs identificados |
| Correções aplicadas | 2026-05-06 | 2 NCs resolvidas, 5 GAPs resolvidos (GAP-05 N/A) |
| Auditoria final (MCP validate_component_code) | 2026-05-06 | 0 NCs pendentes |
| **Emissão do Selo** | **2026-05-06** | **CONFORMANT** |

---

## Não-Conformidades Resolvidas

### NC-01 — `withDefaults` com Booleans Triviais (Arquitetural)

**Descrição**: `withDefaults` incluía defaults triviais para `indeterminate: false`, `reverse: false`, `stripe: false` e `disable: false`. Em Vue 3, props do tipo `Boolean` sem default têm valor `false` implícito — declarar explicitamente viola o padrão DSS de omitir defaults desnecessários (conforme DssBadge Golden Reference).

**Impacto**: Paridade arquitetural quebrada com Golden Reference DssBadge. Ruído semântico no `withDefaults` que pode induzir erros futuros (ex.: adicionar logic condicional desnecessária).

**Correção aplicada**:
- `withDefaults` reduzido para apenas defaults não-triviais: `color: 'primary'` e `size: 'md'`
- Booleans `indeterminate`, `reverse`, `stripe`, `disable` removidos do `withDefaults`

**Arquivos modificados**: `1-structure/DssLinearProgress.ts.vue`

---

### NC-02 — Interfaces Vazias Exportadas no Types (Arquitetural)

**Descrição**: `types/linearprogress.types.ts` exportava `LinearProgressEmits {}` e `LinearProgressSlots {}` — interfaces vazias sem conteúdo. Componentes visuais puros não devem declarar `defineEmits` nem `defineSlots`, e a exportação de interfaces vazias para esses contratos contradiz a declaração de componente não-interativo e cria contrato falso.

**Impacto**: Paridade arquitetural quebrada com Golden Reference DssBadge (que não emite eventos). Contrato de tipos inconsistente com a natureza do componente.

**Correção aplicada**:
- `LinearProgressEmits {}` removido completamente do types file
- `LinearProgressSlots {}` removido completamente do types file
- Comentário adicionado: `// Sem eventos e sem slots: componente visual puro não interativo — DssBadge (Golden Reference)`

**Arquivos modificados**: `types/linearprogress.types.ts`

---

## GAPs Resolvidos

### GAP-01 — `EX-Code-01` Ausente em `dss.meta.json` (Documental)

**Descrição**: A exceção `EX-Code-01` (`animation-speed: 250` em JS, equivalente a `--dss-duration-250`) não estava registrada em `dss.meta.json`, embora fosse uma violação real da regra "Token First" (JS não pode consumir CSS vars diretamente).

**Correção**: `EX-Code-01` adicionado ao array `exceptions` em `dss.meta.json` com justificativa: "QLinearProgress aceita velocidade de animação como número JS. Valor equivale a --dss-duration-250 (250ms). Manter sincronizado ao atualizar token de duração."

**Arquivos modificados**: `dss.meta.json`

---

### GAP-02 — `EX-States-02` Ausente em `dss.meta.json` (Documental)

**Descrição**: A exceção `EX-States-02` (`background-color: currentColor !important` no bloco `print`) não estava registrada em `dss.meta.json`. O `!important` em contexto print é necessário para garantir visibilidade em impressão monocromática, com precedente em DssTabPanel (EXC-04).

**Correção**: `EX-States-02` adicionado ao array `exceptions` em `dss.meta.json` com justificativa: "Contexto print: garante visibilidade em impressão monocromática sobrescrevendo qualquer cor de background. Precedente: DssTabPanel (EXC-04)."

**Arquivos modificados**: `dss.meta.json`

---

### GAP-03 — Dualidade de Altura Não Documentada (Documental)

**Descrição**: O mecanismo dual de altura (`:size` como inline style via QLinearProgress + `min-height` via classes CSS) não estava documentado na seção de Comportamentos Implícitos do `DssLinearProgress.md`. A ausência desta documentação cria risco de remoção incorreta do `:size` por mantenedores futuros assumindo que o CSS é suficiente.

**Correção**: Seção §6.5 "Dualidade de altura: inline style × classe CSS" adicionada ao `DssLinearProgress.md`, explicando que os dois mecanismos são complementares (não redundantes) e que remover `:size` do QLinearProgress quebra a altura exata mesmo com as classes CSS presentes.

**Arquivos modificados**: `DssLinearProgress.md`

---

### GAP-04 — Orientação `aria-label` Ausente para Estado Indeterminado (Documental)

**Descrição**: O estado `indeterminate` do QLinearProgress omite `aria-valuenow` conforme a ARIA spec — comportamento correto, mas que pode produzir progressbars sem rótulo acessível quando não há label visual adjacente. A seção de Acessibilidade do `DssLinearProgress.md` não documentava essa limitação nem orientava o consumidor sobre como mitigá-la.

**Correção**: Nota adicionada à seção §8 Acessibilidade: "Em estado `indeterminate`, o Quasar omite `aria-valuenow` conforme ARIA spec. Se não houver label visual adjacente, passe `aria-label='Descrição do processo'` via `$attrs` para garantir conformidade com WCAG 2.4.6."

**Arquivos modificados**: `DssLinearProgress.md`

---

### GAP-05 — Pre-Prompt Ausente (Documental)

**Status**: N/A — arquivo `pre_prompt_dss_linear_progress.md` já existia na pasta do componente antes da auditoria. GAP não aplicável.

---

### GAP-06 — Ordem Não-Canônica em `4-output/index.scss` (Arquitetural)

**Descrição**: O orquestrador `4-output/index.scss` importava `_states` antes de `_brands`, invertendo a ordem canônica DSS (`_brands → _states`). A justificativa inicial ("states devem sobrescrever brands") era incorreta porque `[data-theme="dark"]` em `_states.scss` adiciona especificidade +0,1,0 que garante a sobreposição independentemente da ordem de importação.

**Correção**: Ordem corrigida para canônica (`@use './brands' → @use './states'`) com comentário explicativo sobre o mecanismo de especificidade: `[data-theme="dark"]` adiciona +1 ao seletor de atributo (0,4,0 vs 0,3,0), garantindo que os tokens dark de brand sobrescrevam os light mesmo com a ordem canônica brands-first.

**Arquivos modificados**: `4-output/index.scss`

---

## Reservas Registradas

| ID | Descrição | Impacto |
|----|-----------|---------|
| R-01 | Tokens numéricos de brand (`--dss-hub-600`, `--dss-water-500`, etc.) usados por ausência de tokens semânticos `--dss-{brand}-primary` | Técnico — documentado como precedente DssBadge/DssSpinner/DssCard |
| R-02 | `animation-speed: 250` em JS deve ser mantido sincronizado com `--dss-duration-250`; sem mecanismo automatizado de verificação | Baixo — documentado em EX-Code-01; risco controlado via documentação |
| R-03 | Sem unit tests automatizados na Fase 2 | Aceitável por política DSS Fase 2 |

---

## Tokens Utilizados (22)

| Categoria | Tokens |
|-----------|--------|
| Superfície | `--dss-surface-muted` |
| Forma | `--dss-radius-full` |
| Opacidade | `--dss-opacity-disabled` |
| Transição | `--dss-duration-250`, `--dss-easing-standard` |
| Dimensão (tamanhos) | `--dss-spacing-1` (xs/4px), `--dss-spacing-2` (sm/8px), `--dss-spacing-3` (md/12px), `--dss-spacing-4` (lg/16px), `--dss-spacing-6` (xl/24px) |
| Cor — actions | `--dss-action-primary`, `--dss-action-secondary` |
| Cor — feedback | `--dss-feedback-error`, `--dss-feedback-success`, `--dss-feedback-warning`, `--dss-feedback-info` |
| Brand Hub | `--dss-hub-600` (claro), `--dss-hub-500` (dark) |
| Brand Water | `--dss-water-500` (claro), `--dss-water-400` (dark) |
| Brand Waste | `--dss-waste-600` (claro), `--dss-waste-500` (dark) |

---

## Exceções Documentadas (4)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-Gate-01 | Seletores `.q-linear-progress`, `.q-linear-progress__track`, `.q-linear-progress__model` | `2-composition/_base.scss`, `3-variants/_colors.scss`, `4-output/_brands.scss` | Gate de Composição v2.4 — necessário para aplicar tokens DSS à estrutura DOM interna do QLinearProgress. Sem esses seletores, `--dss-surface-muted`, `--dss-radius-full` e cores semânticas perdem governança visual. |
| EX-States-01 | `animation: none !important`, `transition: none !important` | `4-output/_states.scss` | Quasar aplica keyframes via CSS interno; `!important` obrigatório para WCAG 2.3.3 (`prefers-reduced-motion`). Precedente: DssSpinner (EX-02). |
| EX-Code-01 | `animation-speed: 250` | `1-structure/DssLinearProgress.ts.vue` | QLinearProgress aceita velocidade de animação como número JS. O valor 250 equivale a `--dss-duration-250` (250ms). Manter sincronizado ao atualizar o token de duração. |
| EX-States-02 | `background-color: currentColor !important` | `4-output/_states.scss` | Contexto `@media print`: garante visibilidade em impressão monocromática sobrescrevendo qualquer cor de background. Precedente: DssTabPanel (EXC-04). |

---

## Paridade com Golden Context (DssSpinner)

O DssLinearProgress mantém paridade com o DssSpinner (Golden Context) nos seguintes critérios arquiteturais:

| Aspecto | DssSpinner | DssLinearProgress | Igual |
|---------|------------|-------------------|-------|
| Delegação total ao Quasar | ✅ | ✅ | ✅ |
| `defineOptions` + `inheritAttrs: false` | ✅ | ✅ | ✅ |
| Touch Target Opção B (não interativo) | ✅ | ✅ | ✅ |
| `pointer-events: none` | ✅ | ✅ | ✅ |
| `prefers-reduced-motion: !important` | ✅ (EX-02) | ✅ (EX-States-01) | ✅ |
| Brand via `data-brand` ancestral | ✅ | ✅ | ✅ |
| Brand dark mode (tokens ~500) em `_states.scss` | ✅ | ✅ | ✅ |
| Ordem canônica `_brands → _states` | ✅ | ✅ (GAP-06 corrigido) | ✅ |
| `forced-colors: active` | `ButtonText` | `CanvasText` | Diferente — justificado |
| `sr-only` label | ✅ | N/A | Diferente — justificado |

**Diferenças justificadas**:
- `forced-colors`: DssSpinner usa `ButtonText` (elemento interativo contextual); DssLinearProgress usa `CanvasText` (mais semântico para fills e backgrounds de progressbar).
- `sr-only` label: DssSpinner precisa de label próprio pois não possui `role="progressbar"` nativo; DssLinearProgress delega o ARIA completo ao QLinearProgress (que gerencia `role="progressbar"`, `aria-valuenow/min/max`).

---

*Selo emitido pelo auditor DSS em 2026-05-06. Válido para a versão DSS 2.2.0.*
*Próxima revisão: mediante atualização de dependência Quasar ou criação de tokens semânticos de brand.*
