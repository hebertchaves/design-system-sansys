# SELO DSS v2.2 — DssAjaxBar

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **Componente** | `DssAjaxBar` |
| **Versão do Selo** | v2.2 |
| **Fase** | 2 |
| **Nível** | 1 |
| **Família** | Progresso e Feedback |
| **Quasar Base** | `QAjaxBar` |
| **Golden Reference** | `DssBadge` (não interativo) |
| **Golden Context** | `DssLinearProgress` |
| **Interativo** | Não |
| **Data do Selo** | 2026-05-18 |
| **Autor** | Claude (DSS Agent) |

---

## 2. Não-Conformidades

**Nenhuma não-conformidade identificada.**

O componente foi auditado em 1 ciclo e aprovado sem NCs.

---

## 3. Ressalvas e Observações

### Divergências Intencionais (documentadas e aprovadas)

| Item | Padrão Base | DssAjaxBar | Justificativa |
|------|-------------|------------|---------------|
| `defineEmits` | Omitido em DssLinearProgress/DssCircularProgress/DssInnerLoading | ✅ Declarado (`start`, `stop`) | QAjaxBar emite esses eventos nativamente; consumer precisa sincronizar `aria-busy` no container pai |
| `defineExpose` | Ausente na maioria dos componentes de Progresso | ✅ 4 métodos (EXC-Expose-01) | API imperativa necessária para controle manual quando `skipHijack=true` |

### Exceedências Estruturais Documentadas (EX-Structural)

| ID | Valor | Justificativa |
|----|-------|---------------|
| EX-Structural-01 | `'2px'` — espessura padrão herdada do QAjaxBar | Valor canônico estrutural para barra slim AJAX. Nenhum token DSS existe para espessura de barra global (contexto muito específico) |

---

## 4. Conformidades Verificadas

### Gate Estrutural

| Critério | Resultado |
|----------|-----------|
| 4 camadas presentes (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`) | ✅ Conforme |
| Entry Point Wrapper `DssAjaxBar.vue` — re-export puro | ✅ Conforme |
| Orchestrador `DssAjaxBar.module.scss` — imports L2→L3→L4 na ordem | ✅ Conforme |
| Barrel export `index.js` — componente + composable + types | ✅ Conforme |
| `dss.meta.json` com `goldenReference` e `goldenContext` declarados | ✅ Conforme |

### Gate Técnico

| Critério | Resultado |
|----------|-----------|
| Token First — sem hardcoded (exceto estruturais canônicos documentados) | ✅ Conforme |
| Cores via `--q-color-primary` CSS custom property override (EXC-Gate-02) | ✅ Conforme |
| Estados interativos N/A documentados explicitamente (`statesNotApplicable`) | ✅ Conforme |
| `prefers-contrast: more` — `outline: 1px solid currentColor` (precedente DssBadge) | ✅ Conforme |
| `prefers-reduced-motion` — `transition: none !important; animation-duration: 0.01ms !important` (EX-States-01) | ✅ Conforme |
| `forced-colors: active` — `Highlight`, `ButtonText`; `forced-color-adjust` NOT declarado (EX-States-03) | ✅ Conforme |
| `print` — `display: none` (EX-States-02) | ✅ Conforme |
| WCAG 2.1 AA — `role="progressbar"` nativo via QAjaxBar; `aria-busy` responsabilidade do consumer | ✅ Conforme |
| `QAjaxBar` como root element — sem wrapper div (EXC-Gate-01) | ✅ Conforme |
| `inheritAttrs: false` + `v-bind="$attrs"` — atributos forwarded; `color` sempre sobrescrito | ✅ Conforme |
| `color="primary"` declarado após `v-bind="$attrs"` — garante precedência DSS (Vue 3) | ✅ Conforme |
| `defineExpose` — `start`, `stop`, `increment`, `setProgress` (EXC-Expose-01) | ✅ Conforme |
| `defineEmits` — `start`, `stop` re-emitidos (divergência intencional documentada) | ✅ Conforme |
| SCSS compila sem erros — 0 erros, 0 warnings | ✅ Conforme |
| Brand dual-selector — `.dss-ajax-bar--brand-{brand}` e `[data-brand="{brand}"] .dss-ajax-bar` | ✅ Conforme |

### Gate Documental

| Critério | Resultado |
|----------|-----------|
| `dss.meta.json` — schema completo, 4 tokens exatos, 7 exceções, `statesNotApplicable` | ✅ Conforme |
| `DssAjaxBar.md` — Template 13.1 com 10 seções (visão geral, API, comportamento, tokens, acessibilidade, comportamentos implícitos, paridade, composição, exceções, changelog) | ✅ Conforme |
| `DSSAJAXBAR_API.md` — props, tipos, slots (nenhum), events, API imperativa, composable, tokens, comportamentos, paridade Golden | ✅ Conforme |
| `DssAjaxBar.example.vue` — 6 cenários completos (> mínimo 3) | ✅ Conforme |
| `README.md` — quick start, posições, brand, controle manual, links | ✅ Conforme |

### Paridade Golden Reference (DssBadge) e Golden Context (DssLinearProgress)

| Aspecto | DssBadge (Ref) | DssLinearProgress (Context) | DssAjaxBar | Status |
|---------|---------------|-----------------------------|------------|--------|
| Interatividade | ❌ | ❌ | ❌ | ✅ Paridade |
| Touch Target | N/A Opção B | N/A Opção B | N/A | ✅ Paridade |
| Brand dual-selector | ✅ | ✅ | ✅ | ✅ Paridade |
| Quasar como root | ❌ | ✅ EXC-Gate-01 | ✅ EXC-Gate-01 | ✅ Paridade com Context |
| prefers-contrast: more | ✅ `border currentColor` | ✅ | ✅ `outline currentColor` | ✅ Paridade |
| prefers-reduced-motion | ✅ | ✅ EX-States-01 | ✅ EX-States-01 | ✅ Paridade |
| forced-colors | ✅ | ✅ | ✅ EX-States-03 | ✅ Paridade |
| print display:none | ✅ | ✅ | ✅ EX-States-02 | ✅ Paridade |
| defineEmits | Omitido | Omitido | ✅ Declarado | ✅ Divergência intencional |
| defineExpose | — | — | ✅ EXC-Expose-01 | ✅ Divergência intencional |

---

## 5. Histórico de Auditoria

| Ciclo | Data | Achados | Ação |
|-------|------|---------|------|
| Ciclo 1 | 2026-05-18 | 0 NCs | Aprovado diretamente |

---

## 6. Resultado

**✅ APROVADO — SELO DSS v2.2 EMITIDO**

> `DssAjaxBar` está em conformidade plena com os padrões do Design System Sansys v2.2.
> Auditado em 1 ciclo. Nenhuma não-conformidade registrada.
> Divergências intencionais de `defineEmits` e `defineExpose` documentadas e justificadas.
>
> **Componente elegível para produção DSS.**
