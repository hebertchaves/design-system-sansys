# Selo DSS v2.2 — DssBreadcrumbs

**Status:** ✅ CONFORME  
**Data de Emissão:** 11 de Abril de 2026  
**Número do Selo:** DSS-SEAL-v2.2-DssBreadcrumbs-2026-04-11  
**Ciclo de Auditoria:** Ciclo 1 (1 re-auditoria)

---

## Identificação do Componente

| Atributo | Valor |
|---|---|
| **Componente** | `DssBreadcrumbs` |
| **Classificação** | Container Orquestrador de Navegação (Breadcrumb Trail) |
| **Fase** | 2 — Componente Composto de Primeiro Grau |
| **Path** | `DSS/components/base/DssBreadcrumbs/` |
| **Golden Reference** | DssBtnGroup |
| **Golden Context** | DssCard |

---

## Resultado da Auditoria

### Ciclo de Auditoria

| Ciclo | NCs Encontradas | NCs Resolvidas | Status |
|---|---|---|---|
| Auditoria Inicial | 2 NCs + 5 GAPs | — | Reprovado — pendências |
| Ciclo 1 (Correções) | — | 2 NCs + 4 GAPs | Aprovado |

### NCs Resolvidas

| ID | Descrição | Resolução |
|---|---|---|
| **NC-01** | `dss.meta.json` sem `gateExceptions.compositionGateV24.templateStructure` para uso de `<q-breadcrumbs>` como elemento raiz | Adicionado bloco `templateStructure` com justificativa WCAG 1.3.1 + `role="navigation"` + separadores automáticos. Aprovado pelo Chat Estratégico DSS em 2026-04. |
| **NC-02** | `--dss-text-disabled` listado em `tokensUsed` sem estar documentado no `DSS_TOKEN_REFERENCE.md` | Token formalizado pelo Chat Estratégico DSS. Removido de `tokensUsed` (token apenas no Vue computed, não no SCSS). |

### GAPs Resolvidos

| ID | Descrição | Resolução |
|---|---|---|
| **GAP-03** | Precedência `brand > separatorColor` não documentada na prop `separatorColor` | Nota de precedência adicionada na descrição da prop em `DssBreadcrumbs.md`. |
| **GAP-04** | Tabela de paridade sem linha crítica: `DssBtnGroup <div>` vs `DssBreadcrumbs <q-breadcrumbs>` | Linha adicionada com referência ao `GATE-EXC-templateStructure`. |
| **GAP-05** | `3-variants/_gutter.scss` com blocos CSS vazios (confusão de manutenção) | Blocos removidos; substituídos por comentário arquitetural explicando separação BEM/CSS custom property. Mesmo padrão adicionado ao composable `useBreadcrumbsClasses.ts`. |

### GAPs Isentos / Não Bloqueantes

| ID | Descrição | Decisão |
|---|---|---|
| **GAP-01** | Arquivo `pre_prompt_dss_breadcrumbs.md` ausente em `docs/governance/pre-prompts/` | Isenção — instrução explícita "não recriar" no Ciclo 1. |
| **GAP-02** | Dark mode hover não coberto para separadores (estado inativo de fundo escuro) | Não bloqueante — DssBreadcrumbs é container sem estados interativos; dark mode dos tokens semânticos (`--dss-text-subtle`) já cobre a variação automaticamente via cascata. |

---

## Exceções CSS Formalizadas

| ID | Valor | Justificativa |
|---|---|---|
| **EXC-01** | Seletor descendente `.dss-breadcrumbs .q-breadcrumbs__separator` | Única forma de governar separadores injetados pelo QBreadcrumbs (não acessíveis via props/slots). Registrado no pré-prompt oficial. |
| **EXC-02** | Seletor composto `.dss-breadcrumbs.q-breadcrumbs` | Especificidade controlada para override de layout Quasar sem `!important`. Precedente: DssBreadcrumbsEl EXC-01. |
| **EXC-03** | `GrayText` (system color keyword) | Forced-colors mode — tokens CSS são ignorados pelo browser. Padrão canônico DSS. |
| **EXC-04** | `--dss-line-height-sm` em vez de `--dss-line-height-md` | Token `--dss-line-height-md` inexistente no catálogo DSS. Par canônico de `--dss-font-size-sm` é `--dss-line-height-sm`. Precedente: DssTooltip NC-01. |

---

## Exceções Gate de Composição v2.4

| ID | Local | Justificativa |
|---|---|---|
| **GATE-EXC-templateStructure** | `1-structure/DssBreadcrumbs.ts.vue` | QBreadcrumbs obrigatório como root por: (1) injeta `role="navigation"` e `aria-label` nativamente; (2) gerencia separadores automáticos; (3) wrapper `<div>` externo violaria WCAG 1.3.1. Aprovado pelo Chat Estratégico DSS em 2026-04. |

---

## Reservas Não Bloqueantes

| ID | Descrição | Impacto |
|---|---|---|
| **RES-01** | QBreadcrumbs `gutter` override via CSS custom property pode conflitar com updates Quasar | Baixo — seletor EXC-02 tem especificidade suficiente |
| **RES-02** | `aria-current="page"` não injetado automaticamente — responsabilidade do consumidor | Baixo — documentado com exemplos |
| **RES-03** | Sem unit tests em v1.0.0 | Baixo — lógica mínima |
| **RES-04** | `separatorColor` sem validação em runtime | Baixo — fallback CSS garante visual correto |

---

## Gate Estrutural DSS — Checklist Final

| Gate | Item | Status |
|---|---|---|
| **Estrutural** | 4 camadas em completude | ✅ |
| **Estrutural** | Entry Point Wrapper (re-export puro) | ✅ |
| **Estrutural** | Orchestrador SCSS (L2 → L3 → L4) | ✅ |
| **Estrutural** | Barrel export (`index.js`) | ✅ |
| **Estrutural** | `dss.meta.json` com Golden Reference e Golden Context | ✅ |
| **Técnico** | Token First (nenhum valor hardcoded) | ✅ |
| **Técnico** | Cores via tokens / CSS custom properties | ✅ |
| **Técnico** | SCSS compila sem erros | ✅ |
| **Técnico** | Gate de Responsabilidade v2.4 respeitado | ✅ |
| **Técnico** | Acessibilidade WCAG 2.1 AA | ✅ (`role="navigation"` nativo, `aria-hidden` nos separadores) |
| **Documental** | `DssBreadcrumbs.md` Template 13.1 completo | ✅ |
| **Documental** | `DSSBREADCRUMBS_API.md` completo | ✅ |
| **Documental** | `DssBreadcrumbs.example.vue` (5 cenários) | ✅ |
| **Documental** | `README.md` completo | ✅ |
| **Documental** | Tokens listados com nomes exatos | ✅ |

---

## Assinatura

**Auditor:** Claude Code Assistant (claude-sonnet-4-6)  
**Aprovado por:** Chat Estratégico DSS  
**Data:** 11 de Abril de 2026  
**Versão DSS:** 2.2
