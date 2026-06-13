# 🏆 SELO DSS v2.2 — DssFab

> **Status:** ✅ CONFORME
> **Data de emissão:** 04 Mai 2026
> **Auditor:** Claude Code Assistant (Modo Auditor DSS v2.5)
> **Versão DSS auditada:** v2.2
> **Ciclo de auditoria:** Criação → Correções parciais (créditos esgotados) → Correção cirúrgica → Auditoria Formal v2.5 → Re-correção NC-01 → Selo

---

## Identificação do Componente

| Campo | Valor |
|---|---|
| **Componente** | DssFab |
| **Versão** | 1.0.0 |
| **Fase** | 2 — Componente Composto (Composição de Primeiro Grau) |
| **Classificação** | Action Group Composto — Floating Action Button interativo |
| **Categoria** | Fase 2, Nível 2 |
| **Path** | `DSS/components/base/DssFab/` |
| **Dependência base** | QFab (Quasar Framework) |
| **Dependências DSS Internas** | DssButton, DssIcon (composicionais implícitas) |
| **Composição Futura** | DssFabAction (Nível 3 — ainda não criado) |

---

## Modelo Golden

| Campo | Componente | Justificativa |
|---|---|---|
| **Golden Reference** | DssChip | Golden Reference oficial para componentes interativos (DSS_GOLDEN_COMPONENTS.md §1.1). DssFab possui estados interativos completos (hover, focus, active, disabled) e touch target ≥ 48px. |
| **Golden Context** | DssBtnDropdown | Baseline de auditoria principal: componente composto de Fase 2 que envolve QBtnDropdown (mesma estratégia wrap), gerencia painel de ações expandido/colapsado, usa div wrapper externo com `inheritAttrs: false`, `<style>` sem scoped para seletores Quasar internos e gate exceptions documentados. Selado em Mar 2026. |

---

## Ciclo de Auditoria

| Fase | Data | Resultado |
|---|---|---|
| Criação do componente | 01 Mai 2026 | Scaffold completo, status `in-progress` |
| Correção parcial (créditos esgotados) | ~02 Mai 2026 | NC-01 (token inválido) e NC-02 (token não documentado) parcialmente tratados |
| Correção cirúrgica (NC-01 + NC-02 + GAP-03) | 04 Mai 2026 | `--dss-focus-ring-dark` substituído por EXC-States-02, `--dss-spacing-14` documentado, `_extended.scss` corrigido |
| Auditoria Formal v2.5 (MCP + manual) | 04 Mai 2026 | 1 NC bloqueante: `--dss-padding-md` inexistente |
| Re-correção NC-01 + GAPs documentais | 04 Mai 2026 | `--dss-padding-4` aplicado, status e docs atualizados |
| **Selo emitido** | **04 Mai 2026** | **0 NCs pendentes — CONFORME** |

---

## Não-Conformidades

### Histórico de NCs Corrigidas

| ID | Ciclo | Descrição | Resolução |
|----|-------|-----------|-----------|
| NC-01 (ciclo 1) | Correção parcial | `outline: var(--dss-focus-ring-dark)` — token inexistente no catálogo v2.2 | Substituído por `2px solid white` com EXC-States-02 documentada |
| NC-02 (ciclo 1) | Correção parcial | `--dss-spacing-14` usado mas não documentado | Adicionado a `dss.meta.json`, `DSSFAB_API.md` e `DssFab.md §7` |
| NC-01 (ciclo 2) | Auditoria v2.5 | `--dss-padding-md` inexistente no catálogo (tokens DSS usam sufixo numérico) | Substituído por `--dss-padding-4` (16px); documentado nos 3 artefatos |

### NCs Pendentes no Momento do Selo
**0 NCs pendentes.**

---

## Gaps Documentados

| ID | Descrição | Criticidade | Resolução |
|----|-----------|-------------|-----------|
| GAP-01 (ciclo 2) | `DssFab.md` status desatualizado | Documental | `Status: Conformant` aplicado |
| GAP-02 (ciclo 2) | Classes de direção sem nota de extension hook | Documental | Nota adicionada em `DSSFAB_API.md §Classes CSS Geradas` |
| GAP-03 (ciclo 2) | Pré-prompt Eixo 4 incompleto (token sizing, dark focus strategy) | Pré-prompt | Corrigido no chat estratégico (fora do escopo deste componente) |

---

## Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `<q-fab-action>` nativo em exemplos | `DssFab.example.vue`, `DssFab.md` | DssFabAction (Nível 3) ainda não construído. Exceção temporária removível após DssFabAction ser selado. |
| EXC-States-01 | `1px solid ButtonBorder` | `4-output/_states.scss (@media forced-colors)` | Forced-colors mode — system color keywords obrigatórios. Tokens CSS ignorados neste modo. Padrão DssCard EXC-04, DssBtnDropdown EXC-04. |
| EXC-States-02 | `outline: 2px solid white; outline-offset: 2px` | `4-output/_states.scss ([data-theme="dark"] :focus-visible)` | Fallback explícito para dark mode — token `--dss-focus-ring-dark` não existe no catálogo v2.2. Necessário para WCAG 2.4.7 em fundos escuros. |
| EXC-Gate | `.q-fab__trigger`, `.q-fab__actions` | `2-composition/_base.scss`, `4-output/` | Elementos DOM internos do QFab (Quasar Framework), não subcomponentes DSS. Gate de Composição v2.4 não se aplica. Precedente: DssBtnDropdown (selado Mar 2026). |

---

## Tokens Utilizados

| Categoria | Tokens |
|-----------|--------|
| `shape` | `--dss-radius-full` |
| `elevation` | `--dss-elevation-2`, `--dss-elevation-3` |
| `motion` | `--dss-duration-200`, `--dss-easing-standard` |
| `sizing` | `--dss-spacing-14` |
| `padding` | `--dss-padding-4` |
| `accessibility` | `--dss-focus-ring`, `--dss-opacity-disabled` |
| `border` | `--dss-border-width-md`, `--dss-border-width-thick` |
| `brand` | `--dss-hub-600`, `--dss-hub-400`, `--dss-water-500`, `--dss-water-400`, `--dss-waste-600`, `--dss-waste-500` |

> ⚠️ Tokens de brand numéricos usados intencionalmente — tokens semânticos de brand não existem no catálogo v2.2. Reserva documentada. Padrão idêntico ao DssCard, DssBtnGroup, DssBtnDropdown.

---

## Gate Exceptions (Composição v2.4)

```json
{
  "compositionGateV24": {
    "selectors": [".dss-fab__qfab .q-fab__trigger", ".dss-fab__qfab .q-fab__actions"],
    "justification": "Elementos DOM internos do QFab — não subcomponentes DSS. Precedente: DssBtnDropdown."
  }
}
```

---

## Touch Target

**Opção A — Tamanho intrínseco.**
`--dss-spacing-14` (56px) ≥ 48×48px (WCAG 2.5.5). Sem necessidade de `::before`. Diferente de Compact Controls que usam `::before` porque o tamanho visual é inferior a 48px.

---

## Decisões Arquiteturais Vinculantes

1. **WRAP (não rebuild):** DssFab envolve QFab diretamente. QFab fornece estado de expansão, direção de animação, acessibilidade WAI-ARIA e keyboard navigation nativos.
2. **Div wrapper externo:** Necessário para separar classes DSS do elemento raiz QFab e aplicar corretamente classes de estado/brand.
3. **`<style>` sem scoped:** Necessário para seletores `.dss-fab__qfab .q-fab__trigger` funcionar em internals Quasar. Precedente: DssBtnDropdown.
4. **`inheritAttrs: false` + `v-bind="$attrs"`:** Atributos não declarados recebidos pelo wrapper div (não pelo QFab interno).
5. **Touch target intrínseco:** FAB 56×56px dispensa `::before` — `::before` reservado exclusivamente para Compact Controls com tamanho visual < 48px.
6. **Posicionamento delegado:** DssFab não gerencia `position: fixed` — responsabilidade do DssPageSticky.
7. **Classes de direção como extension hooks:** `.dss-fab--direction-*` geradas pelo composable sem CSS DSS próprio; comportamento de direção delegado ao QFab via `:direction` prop.

---

## Arquivos Auditados

| Arquivo | Status |
|---------|--------|
| `1-structure/DssFab.ts.vue` | ✅ Conforme |
| `2-composition/_base.scss` | ✅ Conforme |
| `3-variants/_extended.scss` | ✅ Conforme (após NC-01 ciclo 2) |
| `3-variants/index.scss` | ✅ Conforme |
| `4-output/_states.scss` | ✅ Conforme (após NC-01 ciclo 1) |
| `4-output/_brands.scss` | ✅ Conforme |
| `4-output/index.scss` | ✅ Conforme |
| `DssFab.module.scss` | ✅ Conforme |
| `DssFab.vue` | ✅ Conforme — re-export puro |
| `composables/useFabClasses.ts` | ✅ Conforme |
| `composables/index.ts` | ✅ Conforme |
| `types/fab.types.ts` | ✅ Conforme |
| `index.js` | ✅ Conforme |
| `dss.meta.json` | ✅ Conforme |
| `DssFab.md` | ✅ Conforme |
| `DSSFAB_API.md` | ✅ Conforme |
| `DssFab.example.vue` | ✅ Conforme (EXC-01 documentada) |
| `README.md` | ✅ Conforme |

---

## Composição Futura

| Componente | Nível | Status | Impacto no DssFab |
|-----------|-------|--------|-------------------|
| DssFabAction | 3 | Não criado | Após selado, EXC-01 é removida e `<q-fab-action>` nativo é substituído |

---

> **Este selo é imutável.** Alterações posteriores ao componente invalidam o selo e exigem nova auditoria.
>
> **Design System Sansys — DSS v2.2**
> **Emitido em:** 04 de Maio de 2026
> **Componentes selados após este:** Aguardando fila (próximo: DssFabAction ou outro Fase 2 pendente)
