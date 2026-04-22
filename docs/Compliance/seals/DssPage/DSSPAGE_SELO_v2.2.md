# 🏆 SELO DSS v2.2 — DssPage

> **Status:** ✅ CONFORME
> **Data de emissão:** 22 Abr 2026
> **Auditor:** Claude Code Assistant (Modo Auditor DSS v2.5)
> **Versão DSS auditada:** v2.2
> **Ciclo de auditoria:** Criação → Auditoria Formal → Correção de 1 NC + 3 GAPs → Selo

---

## Identificação do Componente

| Campo | Valor |
|---|---|
| **Componente** | DssPage |
| **Versão** | 1.0.0 |
| **Fase** | 2 — Layout Global (Terminal da hierarquia de layout) |
| **Classificação** | Container de conteúdo estrutural não-interativo de Nível 4 — terminal da hierarquia de layout |
| **Categoria** | Layout Global — Container de conteúdo principal com min-height dinâmica |
| **Path** | `DSS/components/base/DssPage/` |
| **Dependência base** | QPage (Quasar Framework) |
| **Dependências DSS Internas** | Nenhuma |

---

## Modelo Golden

| Campo | Componente | Justificativa |
|---|---|---|
| **Golden Reference** | DssBadge | Golden Reference oficial para componentes não-interativos (DSS_GOLDEN_COMPONENTS.md §1.1). DssPage não possui touch target, estados interativos ou role ativo — mesma categoria de DssBadge. |
| **Golden Context** | DssLayout | Baseline de auditoria: componente estrutural raiz com provide/inject, mesmo padrão de wrapper direto sobre primitivo Quasar de layout (EXC-01). Selado anteriormente. Ancestral obrigatório do DssPage. |
| **Contexto Estrutural** | DssPageContainer | Container pai semântico direto do DssPage. Gerencia os offsets externos que permitem o cálculo de min-height. Selado anteriormente (22 Abr 2026). |

---

## Ciclo de Auditoria

| Fase | Data | Resultado |
|---|---|---|
| Criação do componente (19 arquivos) | 22 Abr 2026 | Scaffold completo, status `pre-audit` |
| Auditoria formal (5 gates) | 22 Abr 2026 | 1 NC não-bloqueante, 3 GAPs identificados |
| Correções (NC-01, GAP-02, GAP-03) | 22 Abr 2026 | `withDefaults` corrigido; `<style>` adicionado; campo `accessibility` removido |
| **Emissão do Selo** | **22 Abr 2026** | **✅ CONFORME** |

---

## Não-Conformidades (NCs)

### NC-01 — RESOLVIDA ✅

| Campo | Detalhe |
|---|---|
| **ID** | NC-01 |
| **Severidade** | Não-bloqueante |
| **Gate** | Gate de Composição — Paridade com Golden Context |
| **Localização** | `1-structure/DssPage.ts.vue` — `withDefaults` |
| **Descrição** | `withDefaults` declarava `styleFn: undefined` explicitamente. O Golden Context (DssLayout) inclui apenas defaults com valor não-trivial. Props opcionais sem default significativo são omitidas. `styleFn?: PageStyleFn` já implica `undefined` — a declaração era redundante e divergia do padrão estabelecido. |
| **Resolução** | `styleFn: undefined` removido de `withDefaults`. Defaults agora: `{ padding: false }` — idêntico ao padrão DssLayout. |
| **Status** | ✅ Resolvida |

**Total de NCs:** 1 | **Bloqueantes:** 0 | **Não-bloqueantes:** 1 | **Resolvidas:** 1

---

## Gaps Resolvidos

### GAP-01 — CONFIRMADO EXISTENTE ✅

**Localização:** `docs/governance/pre-prompts/pre_prompt_dss_page.md`

**Status:** Confirmado pelo responsável — arquivo já existia na base. Pré-prompt cobre os 5 eixos obrigatórios: Classificação, Risco Arquitetural, API, Tokens e Acessibilidade/Estados.

### GAP-02 — RESOLVIDO ✅

**Localização:** `1-structure/DssPage.ts.vue`

**Problema:** Ausência de bloco `<style>` para importar `DssPage.module.scss`. O CSS funcional `.dss-page--padding { padding: var(--dss-container-padding) }` dependia de carregamento global para ser aplicado. Com a prop `padding=true`, a classe seria adicionada ao elemento mas o padding seria silenciosamente ignorado em ambientes sem carregamento global do module.scss.

**Resolução:** Adicionado bloco `<style lang="scss" scoped> @import '../DssPage.module.scss'; </style>` seguindo o padrão do Golden Context (DssLayout). O CSS agora é explicitamente bundlado com o componente, independente de carregamento global.

### GAP-03 — RESOLVIDO ✅

**Localização:** `dss.meta.json`

**Problema:** Campo `"accessibility"` não-padrão com subcampos `role`, `roleJustification` e `roleOverridable` — fora do schema DSS estabelecido pelos componentes selados.

**Resolução:** Campo removido. A informação sobre `role="main"` foi integrada em dois itens de `compositionRecommendations`: recomendação de manutenção do padrão e restrição de unicidade por documento.

---

## Exceções Formais

| ID | Gate Violado | Localização | Justificativa | Aprovação |
|---|---|---|---|---|
| EXC-01 | Gate de Composição v2.4 — Regra 1 | `1-structure/DssPage.ts.vue` | Wrapper direto de `<q-page>`. QPage recebe estilos inline dinâmicos (min-height) calculados via JavaScript pelo QLayout pai (provide/inject). Envolver em `<div>` aplicaria o min-height ao wrapper sem expandir o `<q-page>` interno — quebrando o comportamento sticky footer. | Precedente DssLayout EXC-01 + DssPageContainer EXC-01 — 2026-04-22 |
| EXC-02 | Uso de `!important` em `@media print` | `4-output/_states.scss` | Necessário para garantir que o print override sobrescreva a especificidade de `.dss-page--padding`. Padrão canônico DSS v2.2. | Padrão canônico DSS v2.2 — 2026-04-22 |
| EXC-03 | Token First | `4-output/_states.scss` — `@media print` | `#fff` e `#000` hardcoded. Tokens de marca não são adequados em impressão. Padrão canônico DSS — precedente em DssLayout, DssPageContainer. | Padrão canônico DSS v2.2 — 2026-04-22 |

---

## Gates de Conformidade

| Pilar | Resultado | Observações |
|---|---|---|
| **Tokens** | ✅ CONFORME | `tokensUsed: ["--dss-container-padding"]` coerente com SCSS. CSS compilado: `.dss-page--padding { padding: var(--dss-container-padding) }`. Zero valores hardcoded fora de EXC-02/EXC-03 em `@media print`. SCSS compila sem erros. |
| **Touch Target** | ✅ CONFORME | Não aplicável — Option B (componente estritamente não-interativo). `touchTarget: "NOT_APPLICABLE"` declarado em `dss.meta.json`. Sem hover, focus, active, disabled. Precedente: DssBadge (Golden Reference). |
| **Arquitetura** | ✅ CONFORME | Gate Estrutural aprovado: 4 camadas completas; orquestrador `DssPage.module.scss` com `@use` L2→L3→L4 na ordem correta; Entry Point Wrapper `DssPage.vue` é re-export puro; `index.js` exporta componente + composables + types; `<style lang="scss" scoped>` no `.ts.vue` bundla o CSS com o componente (padrão DssLayout). `defineOptions({ name: 'DssPage', inheritAttrs: false })` + `v-bind="$attrs"` + `defineSlots<PageSlots>()`. `withDefaults` com apenas defaults não-triviais (`padding: false`) — paridade com DssLayout. |
| **Estados** | ✅ CONFORME | 7 estados não-interativos declarados como não-aplicáveis com justificativa individual. Estados adaptativos: `prefers-contrast: more` → herança do DssLayout (sem override); `forced-colors: active` → `Canvas/CanvasText`; `print` → `padding: 0 !important` + EXC-02/EXC-03; `prefers-reduced-motion` → sem override (sem animações). Dark mode por cascata do DssLayout. |
| **Acessibilidade** | ✅ CONFORME | `role="main"` aplicado por padrão — landmark WCAG 2.4.1. Sobrescritível via `$attrs` (ordem no template garante precedência de `$attrs.role`). Touch target Option B. Contraste via herança do DssLayout. `forced-colors: Canvas/CanvasText`. Comportamento documentado em todas as camadas: `.md` §5, `DSSPAGE_API.md`, `compositionRecommendations` do `dss.meta.json`. |
| **Documentação** | ✅ CONFORME | `DssPage.md` com 14 seções (Template 13.1 completo). `DSSPAGE_API.md` com Props, Slots, Eventos, Forwarding, Tokens, Estados, Exceções, Paridade. `README.md` com quick start, hierarquia, props, tokens, sticky footer explicado. 3 cenários de exemplo com Playground dinâmico (sticky footer demo). 13 testes unitários. `dss.meta.json` com todos os campos normativos — schema padrão sem campos não-canônicos. Pré-prompt confirmado existente com cobertura 5/5. |

---

## Tokens Utilizados

| Token | Propriedade | Condição |
|---|---|---|
| `--dss-container-padding` | `padding` | `padding=true` (classe `.dss-page--padding`) |

**Tokens herdados (via cascata do DssLayout):**

| Token | Propriedade |
|---|---|
| `--dss-surface-muted` | background-color |
| `--dss-text-body` | color |

---

## Contribuição Arquitetural

`DssPage` é o componente que **completa a hierarquia de Layout Global do DSS**:

```
DssLayout (selado) → DssPageContainer (selado) → DssPage (selado)
```

Além de fechar a cadeia estrutural, introduz a única melhoria de acessibilidade sobre o Quasar nativo em toda a família: `role="main"` por padrão, tornando a landmark de navegação principal um contrato DSS — não uma responsabilidade do consumidor.

---

## Declaração de Conformidade

O componente **DssPage v1.0.0** foi auditado conforme o protocolo **DSS Modo Auditor v2.5** e encontra-se em conformidade com:

- ✅ Gate Estrutural DSS v2.2
- ✅ Gate de Composição v2.4 (EXC-01 formalizado — precedente DssLayout + DssPageContainer)
- ✅ Gate de Responsabilidade v2.4
- ✅ Gate de Tokens DSS v2.2 (`--dss-container-padding` verificado)
- ✅ Gate Documental DSS v2.2
- ✅ WCAG 2.1 AA (`role="main"` landmark, forced-colors, contraste via herança)
- ✅ Token First (zero valores hardcoded fora de exceções formalizadas)
- ✅ Arquitetura de 4 Camadas (completa, `<style scoped>` explícito)
- ✅ Entry Point Wrapper (re-export puro)
- ✅ Golden Reference Model (DssBadge + DssLayout como baseline)

**1 NC não-bloqueante resolvida. 3 GAPs resolvidos. 3 exceções formalizadas. 1 token verificado.**

---

## 🏆 SELO DSS v2.2 CONCEDIDO

```
╔══════════════════════════════════════════════════════╗
║         DESIGN SYSTEM SANSYS — CONFORMIDADE          ║
║                                                      ║
║   Componente : DssPage v1.0.0                        ║
║   Fase       : 2 — Layout Global                     ║
║   Protocolo  : DSS Modo Auditor v2.5                 ║
║   Gates      : 5/5 APROVADOS                         ║
║   Tokens     : 1 verificado (--dss-container-padding)║
║   NCs        : 1 resolvida (não-bloqueante)          ║
║   GAPs       : 3 resolvidos                          ║
║   Status     : ✅ CONFORME                           ║
║   Data       : 22 Abr 2026                           ║
║                                                      ║
║        🏆  SELO DSS v2.2 CONCEDIDO  🏆              ║
╚══════════════════════════════════════════════════════╝
```

**Caminho canônico do arquivo:** `DSS/docs/Compliance/seals/DssPage/DSSPAGE_SELO_v2.2.md`

> ⚠️ Este arquivo é histórico e imutável. Não pode ser editado após emissão.
> Alterações no componente invalidam este selo. Nova auditoria → novo selo → novo arquivo.

**Próxima revisão obrigatória:** DSS v2.3 ou quando QPage do Quasar atualizar API pública.
**Pré-requisito desbloqueado:** Hierarquia Layout Global completa — `DssLayout → DssPageContainer → DssPage`. Qualquer componente de Nível 5 que represente conteúdo de página (seções, painéis, dashboards) pode referenciar DssPage como Golden Context estrutural.

**Responsável pela emissão:** Claude Code Assistant — Modo Auditor DSS v2.5
