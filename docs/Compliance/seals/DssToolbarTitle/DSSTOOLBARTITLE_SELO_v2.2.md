# 🏆 SELO DSS v2.2 — DssToolbarTitle

> **Status:** ✅ CONFORME
> **Data de emissão:** 21 Abr 2026
> **Auditor:** Claude Code Assistant (Modo Auditor DSS v2.5)
> **Versão DSS auditada:** v2.2
> **Ciclo de auditoria:** Criação → Auditoria Formal → Correções (Chat Estratégico + Chat de Execução) → Selo

---

## Identificação do Componente

| Campo | Valor |
|---|---|
| **Componente** | DssToolbarTitle |
| **Versão** | 1.0.0 |
| **Fase** | 2 — Estrutura de Página (Composição de Primeiro Grau) |
| **Classificação** | Elemento tipográfico estrutural não-interativo — wrapper DSS governado sobre QToolbarTitle |
| **Categoria** | Estrutura de Página — Tipografia de barra de ferramentas |
| **Path** | `DSS/components/base/DssToolbarTitle/` |
| **Dependência base** | QToolbarTitle (Quasar Framework) |
| **Dependências DSS Internas** | Nenhuma |

---

## Modelo Golden

| Campo | Componente | Justificativa |
|---|---|---|
| **Golden Reference** | DssBadge | Golden Reference oficial para componentes não-interativos (DSS_GOLDEN_COMPONENTS.md §1.1). DssToolbarTitle não possui touch target, estados interativos ou role ativo — mesma categoria de DssBadge. |
| **Golden Context** | DssItemLabel | Baseline de auditoria principal: componente tipográfico, não-interativo, wrapper de Quasar com EXC-01 de sobrescrita de tipografia nativa via seletor composto. Proximidade semântica/funcional máxima. Selado em 2026-04-20. |
| **Contexto Estrutural** | DssToolbar | Container pai semântico e único contexto de uso válido do DssToolbarTitle. Gerencia brand e propaga `[data-brand]` para herança de cores. Não é Golden Context arquitetural. |

---

## Ciclo de Auditoria

| Fase | Data | Resultado |
|---|---|---|
| Criação do componente (19 arquivos) | 21 Abr 2026 | Scaffold completo, status `pre-audit` |
| Auditoria formal (5 gates) | 21 Abr 2026 | 1 NC bloqueante, 2 NCs não-bloqueantes, 4 GAPs identificados |
| Correções Chat Estratégico (NC-01, NC-02, GAP-04) | 21 Abr 2026 | `goldenReference` → DssBadge; `goldenContext` → DssItemLabel; `line-height` 1.3 → 1.2 |
| Correções Chat de Execução (NC-03, GAP-01, GAP-03) | 21 Abr 2026 | Seção 13 renomeada; EXC-01 cobre Regra 1; `approvedBy`/`approvedDate` adicionados |
| **Emissão do Selo** | **21 Abr 2026** | **✅ CONFORME** |

---

## Não-Conformidades (NCs)

### NC-01 — RESOLVIDA ✅

| Campo | Detalhe |
|---|---|
| **ID** | NC-01 |
| **Severidade** | Bloqueante |
| **Gate** | Governança Golden |
| **Localização** | `dss.meta.json` — campo `goldenReference` |
| **Descrição** | O campo `goldenReference` declarava `"DssItemLabel"`. DssItemLabel não é um Golden Reference oficial — é um componente certificado elegível a Golden Context. Os únicos Golden References oficiais são DssChip (interativo) e DssBadge (não-interativo), conforme DSS_GOLDEN_COMPONENTS.md §1.1. O erro tinha origem no pré-prompt, que também declarava incorretamente DssItemLabel como Golden Reference. |
| **Resolução** | `goldenReference` → `"DssBadge"`; `goldenContext` → `"DssItemLabel"`; `goldenContextSecondary` → `"DssToolbar"` adicionado. Pré-prompt corrigido pelo Chat Estratégico. |
| **Status** | ✅ Resolvida |

### NC-02 — RESOLVIDA ✅

| Campo | Detalhe |
|---|---|
| **ID** | NC-02 |
| **Severidade** | Não-bloqueante |
| **Gate** | Gate Documental |
| **Localização** | `README.md`, `DSSTOOLBARTITLE_API.md`, `DssToolbarTitle.md` — tabelas de tokens |
| **Descrição** | O token `--dss-heading-4-line-height` era documentado com valor de referência `1.3`. O valor correto conforme `DSS_TOKEN_REFERENCE.md` (linha 1049) é `1.2`. O SCSS utilizava o token via `var()` (correto), mas a documentação referenciava o valor errado, propagado do pré-prompt. |
| **Resolução** | Valor corrigido para `1.2` em todos os arquivos de documentação. Pré-prompt corrigido pelo Chat Estratégico. |
| **Status** | ✅ Resolvida |

### NC-03 — RESOLVIDA ✅

| Campo | Detalhe |
|---|---|
| **ID** | NC-03 |
| **Severidade** | Não-bloqueante |
| **Gate** | Gate Documental |
| **Localização** | `DssToolbarTitle.md` — Seção 13 |
| **Descrição** | A seção 13 era intitulada "Paridade com Golden Reference (DssItemLabel)". DssItemLabel é o Golden Context, não o Golden Reference. A nomenclatura incorreta propagava a confusão de NC-01 para a documentação markdown, podendo induzir auditores futuros a tratar DssItemLabel como referência normativa global. |
| **Resolução** | Seção renomeada para "Paridade com Golden Context (DssItemLabel)". |
| **Status** | ✅ Resolvida |

**Total de NCs:** 3 | **Bloqueantes:** 1 | **Não-bloqueantes:** 2 | **Resolvidas:** 3

---

## Gaps Resolvidos

### GAP-01 — RESOLVIDO ✅
**Localização:** `dss.meta.json` — EXC-01, campo `gatesViolated`
**Problema:** EXC-01 cobria apenas Gate de Composição v2.4 — Regra 2. O uso direto de `<q-toolbar-title>` no template também viola a Regra 1 (uso de Quasar diretamente). O precedente DssItemLabel (EXC-01) cobre explicitamente ambas as regras.
**Resolução:** Regra 1 adicionada ao array `gatesViolated` de EXC-01 com justificativa de wrapper de Nível 1 Independente.

### GAP-02 — RESOLVIDO ✅ (pelo Chat Estratégico)
**Localização:** `pre_prompt_dss_toolbar_title.md` §4
**Problema:** Pré-prompt registrava `--dss-heading-4-line-height` = 1.3, valor incorreto. Risco de propagação do erro para futuras implementações da família de Estrutura de Página.
**Resolução:** Valor corrigido para 1.2 no pré-prompt.

### GAP-03 — RESOLVIDO ✅
**Localização:** `dss.meta.json` — EXC-01
**Problema:** EXC-01 não possuía campos `approvedBy` e `approvedDate`, exigidos por `DSS_CRITERIOS_AVALIACAO_FASE2.md` §3 para que a exceção constitua aprovação formal.
**Resolução:** Campos `approvedBy` ("Precedente DssItemLabel EXC-01 — Selado 2026-04-20") e `approvedDate` ("2026-04-21") adicionados a EXC-01.

### GAP-04 — RESOLVIDO ✅ (pelo Chat Estratégico)
**Localização:** `pre_prompt_dss_toolbar_title.md` §1
**Problema:** Pré-prompt declarava Golden Reference como DssItemLabel e Golden Context como DssToolbar — inversão dos papéis que originou NC-01 e NC-03.
**Resolução:** Pré-prompt corrigido para Golden Reference = DssBadge, Golden Context = DssItemLabel, Contexto Estrutural = DssToolbar.

---

## Exceções Formais

| ID | Gate Violado | Localização | Justificativa | Aprovação |
|---|---|---|---|---|
| EXC-01 | Gate de Composição v2.4 — Regra 1 e Regra 2 | `1-structure/DssToolbarTitle.ts.vue`, `2-composition/_base.scss` | Wrapper direto de `<q-toolbar-title>` (Nível 1 Independente). QToolbarTitle aplica `font-size: 21px`, `font-weight: normal`, `letter-spacing: 0.01em` hardcoded via `.q-toolbar__title`. Sobrescrita via seletor composto `.dss-toolbar-title.q-toolbar__title` é a única forma de aplicar tokens DSS. | Precedente DssItemLabel EXC-01 — Selado 2026-04-20 |
| EXC-02 | Valores hardcoded em forced-colors | `4-output/_states.scss` | `ButtonText` — system color keyword obrigatório em `@media (forced-colors: active)`. Tokens CSS são ignorados pelo navegador neste modo. Padrão canônico DSS. | Padrão DSS v2.2 — precedente em todos os componentes selados |

---

## Gates de Conformidade

| Pilar | Resultado | Observações |
|---|---|---|
| **Tokens** | ✅ CONFORME | 4 tokens tipográficos verificados no `DSS_TOKEN_REFERENCE.md`. SCSS compila sem erros. Zero valores hardcoded fora de EXC-01 (valores estruturais `flex: 0 0 auto` não são px/rem/hex/rgb). Token First respeitado. |
| **Touch Target** | ✅ CONFORME | Não aplicável (Option B — componente não-interativo). Decisão documentada em `dss.meta.json` (`touchTarget: "NOT_APPLICABLE"`) e em todas as seções de documentação. Precedente: DssItemLabel, DssBadge. |
| **Arquitetura** | ✅ CONFORME | Gate Estrutural DSS aprovado conforme CLAUDE.md: 4 camadas completas (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`); orquestrador `DssToolbarTitle.module.scss` importa L2 → L3 → L4 na ordem correta; Entry Point Wrapper `DssToolbarTitle.vue` é re-export puro da Layer 1 (sem `<template>`, sem `<style>`, sem lógica própria); `index.js` exporta o wrapper como entry point principal com composables e types. `defineOptions({ name: 'DssToolbarTitle', inheritAttrs: false })` presente. `v-bind="$attrs"` explícito. EXC-01 cobre Gates de Composição Regra 1 e Regra 2. |
| **Estados** | ✅ CONFORME | 7 estados não-interativos declarados como não-aplicáveis com justificativa individual. Estados adaptativos passivos implementados: `prefers-contrast: more` → `color: inherit`; `forced-colors: active` → `ButtonText` (EXC-02); `print` → ellipsis desativado. Dark mode por herança do DssToolbar pai — justificado e documentado. `prefers-reduced-motion` omitido corretamente (sem animações no componente). |
| **Acessibilidade** | ✅ CONFORME | Touch target Option B documentado. Sem `role` adicional — semântica definida pelo consumidor via slot. `text-overflow: ellipsis` preserva texto completo no DOM para leitores de tela. Orientação para `<h1>` via slot documentada. `color: ButtonText` em forced-colors. Cor herdada do DssToolbar garante contraste WCAG 2.1 AA. |
| **Documentação** | ✅ CONFORME | `DssToolbarTitle.md` com 14 seções (supera Template 13.x). `DSSTOOLBARTITLE_API.md` com paridade Golden Context documentada. `README.md` com quick start, props, slots, tokens, exemplos. 5 cenários de exemplo (supera os 4 obrigatórios do pré-prompt). 11 testes unitários. Playground com 4 controles. Anti-patterns e Matriz de Composição documentados. `dss.meta.json` com todos os campos normativos preenchidos. |

---

## Tokens Utilizados (4)

| Categoria | Tokens |
|---|---|
| Tipografia — família | `--dss-font-family-sans` |
| Tipografia — escala Heading 4 | `--dss-heading-4-size`, `--dss-heading-4-weight`, `--dss-heading-4-line-height` |

**Tokens herdados (não aplicados diretamente):**

| Token | Origem da herança |
|---|---|
| `--dss-text-body` | DssToolbar pai (sem brand ativa) |
| `--dss-text-inverse` | DssToolbar pai (com brand colorida ativa) |

---

## Declaração de Conformidade

O componente **DssToolbarTitle v1.0.0** foi auditado conforme o protocolo **DSS Modo Auditor v2.5** e encontra-se em conformidade com:

- ✅ Gate Estrutural DSS v2.2
- ✅ Gate de Composição v2.4 (EXC-01 formalizado — precedente DssItemLabel)
- ✅ Gate de Responsabilidade v2.4
- ✅ Gate de Tokens DSS v2.2
- ✅ Gate Documental DSS v2.2
- ✅ WCAG 2.1 AA (contraste via herança, forced-colors, reduced-motion)
- ✅ Token First (zero valores hardcoded fora de exceções formalizadas)
- ✅ Arquitetura de 4 Camadas (completa, orquestrador limpo)
- ✅ Entry Point Wrapper (re-export puro)
- ✅ Golden Reference Model (DssBadge + DssItemLabel como baseline)

**1 NC bloqueante resolvida. 2 NCs não-bloqueantes resolvidas. 4 GAPs resolvidos. 2 exceções formalizadas. 4 tokens verificados.**

---

## 🏆 SELO DSS v2.2 CONCEDIDO

```
╔══════════════════════════════════════════════════════╗
║         DESIGN SYSTEM SANSYS — CONFORMIDADE          ║
║                                                      ║
║   Componente : DssToolbarTitle v1.0.0                ║
║   Fase       : 2 — Estrutura de Página               ║
║   Protocolo  : DSS Modo Auditor v2.5                 ║
║   Gates      : 5/5 APROVADOS                         ║
║   Tokens     : 4 verificados                         ║
║   NCs        : 3 resolvidas (1 bloqueante)           ║
║   Status     : ✅ CONFORME                           ║
║   Data       : 21 Abr 2026                           ║
║                                                      ║
║        🏆  SELO DSS v2.2 CONCEDIDO  🏆              ║
╚══════════════════════════════════════════════════════╝
```

**Caminho canônico do arquivo:** `DSS/docs/compliance/seals/DssToolbarTitle/DSSTOOLBARTITLE_SELO_v2.2.md`

> ⚠️ Este arquivo é histórico e imutável. Não pode ser editado após emissão.
> Alterações no componente invalidam este selo. Nova auditoria → novo selo → novo arquivo.

**Próxima revisão obrigatória:** DSS v2.3 ou quando QToolbarTitle do Quasar atualizar API pública.
**Pré-requisito desbloqueado:** Componentes da família Estrutura de Página que referenciem DssToolbarTitle como Golden Context (ex: DssPageHeader, DssAppBar).

**Responsável pela emissão:** Claude Code Assistant — Modo Auditor DSS v2.5
