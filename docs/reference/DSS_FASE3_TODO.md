# DSS — To Do List: Fase 3

> **Status:** 🔄 EM ANDAMENTO — 1/3 Selados formalmente
> **Última Atualização:** 23 de Maio de 2026 — DssDataCard SELADO (Golden Context Fase 3)
> **Legenda:** ✅ Selado · 🔄 Aguardando auditoria · ⬜ Pendente · 🔒 Bloqueado (aguarda dependência)

---

## O que é a Fase 3

A Fase 3 não é guiada por cobertura de API Quasar, mas por necessidades de produto. Componentes da Fase 3 **orquestram três ou mais componentes DSS** de Fase 1/2, gerenciam estado global interno via `provide/inject`, e implementam os 5 padrões obrigatórios do Guia de Composição.

**Fonte normativa:** `DSS_GUIA_COMPOSICAO_FASE3.md` · `prompt_criacao_v3.0.txt` · `TEMPLATE_FASE3.md`

---

## Nível 1 — Golden Context (Base da Fase 3)

*DssDataCard é o Golden Context de todos os outros componentes da Fase 3. Deve ser selado primeiro.*

### Família: Card de Dados

- [x] `DssDataCard` — Card com tabs, paginação interna e composição profunda *(Golden Context)*
  - **Compõe:** `DssCard` + `DssTabs` + `DssTabPanels` + `DssTabPanel` + `DssToolbar` + `DssButton`
  - **Padrão principal:** provide/inject · slots dinâmicos · inheritAttrs
  - **Selado em:** 2026-05-23
  - **Ciclos de auditoria:** 1 — 3 NCs não-bloqueantes + 1 GAP corrigidos
  - **Selo:** `DSS/docs/Compliance/seals/DssDataCard/DSSDATACARD_SELO_v2.2.md`
  - **Localização atual:** `components/stress-test/DssDataCard/` (mover para `components/composed/` na próxima sprint)

---

## Nível 2 — Dependentes do DssDataCard

*Podem ser iniciados após DssDataCard estar selado, pois o referenciam como Golden Context.*

### Família: Card de Pesquisa/Listagem

- [ ] `DssCadrisCard` — Card de busca/listagem com filtros e tabela paginada
  - **Compõe:** `DssCard` + `DssToolbar` + `DssInput` + `DssSelect` + `DssButton` + `DssIcon`
  - **Padrão principal:** provide/inject · inheritAttrs · todos os 5 padrões implementados
  - **Status atual:** `status: "sealed"` em `dss.meta.json` (stress-test informalmente aprovado em Abril 2026) — **sem selo formal em `docs/Compliance/seals/`**
  - **Golden Context:** `DssDataCard` ✅ (agora disponível)
  - **Ação:** Auditar formalmente → corrigir NCs → emitir `DSSCADRISCARD_SELO_v2.2.md`
  - **Pré-prompt:** `docs/governance/pre-prompts/pre_prompt_dss_cadris_card.md`

### Família: Página Complexa (Full-Page Composition)

- [ ] `DssTestPageComplexity` — Página de gerenciamento de ordens com KPIs, filtros e tabela
  - **Compõe:** `DssLayout` + `DssCard` + `DssTable` + `DssChip` + `DssButton` + filtros + KPIs
  - **Padrão principal:** Composição full-page · Grid Inspector · provide/inject
  - **Status atual:** Auditado em Abril 2026 — **5 NCs bloqueantes pendentes**
  - **Golden Context:** `DssDataCard` ✅ (agora disponível)
  - **Ação:** Corrigir 5 NCs bloqueantes → re-auditar → emitir `DSSTESTPAGECOMPLEXITY_SELO_v2.2.md`
  - **Pré-prompt:** `docs/governance/pre-prompts/pre_prompt_test_page_complexity.md`
  - **NCs bloqueantes:**
    1. NC-01 — `aria-label` sem binding Vue (linha 206) → adicionar `:`
    2. NC-02 — Import de `DssCardSection` via path inexistente → usar barrel `from '../../base/DssCard'`
    3. NC-03 — `<q-checkbox>` cru → substituir por `<DssCheckbox>`
    4. NC-04 — `style="width: 40px"` (4 ocorrências) → `var(--dss-spacing-10)` via classe SCSS
    5. NC-05 — `--dss-border-default` inexistente → `--dss-border-gray-300`

---

## Progresso Geral

| Componente | Tipo | Golden Context | Status Atual | Status Formal |
|---|---|---|---|---|
| `DssDataCard` | Card de Dados com Tabs | *É o Golden Context* | selado | ✅ Selado (2026-05-23) |
| `DssCadrisCard` | Card de Pesquisa | `DssDataCard` | sealed (informal) | 🔄 Aguarda Auditoria Formal |
| `DssTestPageComplexity` | Página Complexa | `DssDataCard` | 5 NCs bloqueantes | 🔒 Aguarda correção das NCs |

| Total | Selados Formalmente | % Concluído |
|---|---|---|
| 3 | 1 | 33% |

---

## Workflow — Próximos Passos

### Para DssCadrisCard (Nível 2 — PRÓXIMO)

1. **[ ] Ler pré-prompt** `pre_prompt_dss_cadris_card.md`
2. **[ ] Auditar formalmente** via `prompt_auditoria_v2.5.txt`
3. **[ ] Corrigir NCs** (estrutura já existe — verificar completude e todos os 5 padrões Fase 3)
4. **[ ] Emitir selo** `DSSCADRISCARD_SELO_v2.2.md` em `docs/Compliance/seals/DssCadrisCard/`
5. **[ ] Mover** de `components/stress-test/` → `components/composed/`

### Para DssTestPageComplexity (Nível 2 — 5 NCs bloqueantes)

1. **[ ] Corrigir 5 NCs bloqueantes** (ver lista acima)
2. **[ ] Re-auditar** via `prompt_auditoria_v2.5.txt`
3. **[ ] Emitir selo** `DSSTESTPAGECOMPLEXITY_SELO_v2.2.md`
4. **[ ] Mover** de `components/stress-test/` → `components/composed/`

---

## Regra de Ouro da Fase 3

> Um componente Fase 3 é selado somente quando:
> 1. Todos os 5 padrões de composição estão implementados (`phase3Patterns` no `dss.meta.json`)
> 2. O Golden Context está selado previamente (ou é o próprio Golden Context)
> 3. Passou por auditoria formal via `prompt_auditoria_v2.5.txt` + leitura de `prompt_criacao_v3.0.txt`
> 4. Possui `DSSNOMECOMPONENTE_SELO_v2.2.md` em `docs/Compliance/seals/DssNomeComponente/`
> 5. Foi movido de `components/stress-test/` para `components/composed/`
