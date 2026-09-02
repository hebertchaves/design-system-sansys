# CLAUDE.md — Design System Sansys (DSS)

Guia oficial e **normativo** para agentes de IA (Claude Code e similares) ao trabalhar no **Design System Sansys (DSS)**. O não cumprimento de qualquer regra aqui descrita invalida o componente criado.

---

## 📌 Contexto do Projeto

O **DSS** é uma camada corporativa de design e engenharia construída **sobre o Quasar Framework** — **não** é uma biblioteca standalone. Fornece: tokens semânticos, brandabilidade, governança visual/técnica, acessibilidade WCAG 2.1 AA e padronização de componentes Vue.

**Produtos suportados:** Sansys **Hub** (laranja) · Sansys **Water** (azul) · Sansys **Waste** (verde).

---

## ⚖️ Como este documento funciona (leia antes de tudo)

Este arquivo é **vinculante**. As regras NÃO são sugestões; o agente NÃO deve inferir, resumir ou reinterpretar requisitos.

O documento tem quatro zonas, cada uma com um papel operacional distinto:

| Zona | Quando vale | Papel |
|---|---|---|
| **🏛️ Constituição** | SEMPRE, em toda edição | Os 6 invariantes universais. Únicos marcados `VINCULANTE`. |
| **🧭 Roteador por Tarefa** | Ao começar uma tarefa | Diz o que ler *just-in-time* (não releia tudo toda vez). |
| **📇 Cartões de Invariantes** | Só na tarefa que os aciona | Checklists por fase (base / composto), com gates. |
| **✅ Definition of Done** | Antes de fechar/selar | Sequência de comandos que você **roda** — o disco é o árbitro. |

### 🚫 Regra anti-delírio (a mais importante para não fugir do padrão)

O DSS é um **desvio deliberado** do Quasar/Vue genérico. Seu conhecimento prévio de Quasar **não é autoridade aqui**.

> **Quando você não souber como algo deve se comportar ou se parecer: PARE.**
> Não gere um valor plausível. Consulte o CSS do componente e o doc nomeado no Roteador. Se ainda assim não encontrar em poucas tentativas, **pergunte** — nunca interpole do prior genérico.

### 🧱 Regra anti-acreção (para este documento não voltar a inchar)

Todo invariante novo entra por **uma** de duas portas: (a) **universal** → Constituição, obrigatoriamente com auto-check; (b) **condicional** → Cartão de fase ou doc externo, referenciado pelo Roteador. **Proibido** empilhar item novo numa lista plana no topo. **Um fato, um lar**: se a regra já vive num doc de Nível 1/2, aqui se **aponta**, não se reescreve.

---

## 🏛️ Constituição DSS — 6 invariantes universais (VINCULANTE, sempre)

Valem para **toda edição, todo arquivo**. Cada um traz seu **auto-check**.

**1. Token First.** Nenhum valor hardcoded (px, rem, hex, rgb) — sempre `var(--dss-*)`. Cores nunca no SCSS: via classes utilitárias (`bg-*`, `text-*`) e computed no Vue.
   `❯ grep -rEn "#[0-9a-fA-F]{3,6}|[0-9]+px" 2-composition 3-variants 4-output` → **scan de candidatos, revisar cada um** (não espere zero).
   **Exceções legítimas conhecidas** (não são violação): `px` em `@media`/comentário; hex de fallback em `var(--dss-token, #hex)`; `#000`/`#fff` de forced-colors/alto contraste em `4-output/_states.scss`. Qualquer hex/px **fora** dessas exceções deve virar `var(--dss-*)`.

**2. Sass Module System.** `@import` é **proibido**. Use `@use … as alias;` e `@forward …` em orquestradores.
   `❯ grep -rnE "^[^/]*@import" **/*.scss` → 0 (forma comment-aware; ignora `//` e `/* */`).

**3. Isolamento via Cascade Layers.** CSS de terceiros (Quasar, fontes, libs) **sempre** dentro de `@layer vendor { … }`; CSS DSS **nunca** em layer — o escopo unlayered vence qualquer regra layered, mesmo `!important`.
   *(detalhe: DSS_ARCHITECTURE.md — Princípio #13)*

**4. Acessibilidade WCAG 2.1 AA.** Não é opcional: focus visível, touch target ≥ **44px** (`--dss-touch-target-md`), navegação por teclado. Altura visual ≠ touch target (documentar separadamente).
   *(ago/2026 — era "≥ 48px". Corrigido para o que o sistema de fato entrega e para o que a norma pede: 44×44 é o mínimo do WCAG 2.5.5, e a escala do DSS é 32/36/44/52/64 — **não existe token de 48px**. Os 48 vinham do Material Design, não do WCAG, e a divergência estava mascarada por comentários `/* 48px */` escritos ao lado de `var(--dss-touch-target-md)`, que vale 44. Quem precisar de alvo maior usa `-lg` (52px).)*

**5. Brandabilidade.** Componentes reagem a `[data-brand="hub|water|waste"]`; tokens de brand com fallback semântico. Nunca listar cores hex por brand.

**6. Fonte de verdade = CSS do componente + docs DSS.** A cadeia é **CSS → `meta.json` → `DSS_REFERENCIA_VISUAL_ANALISE.md`**: toda documentação é derivada, toda alteração começa no CSS. O Figma é ferramenta integrável (MCP), **não** árbitro visual. Nunca inferir dimensão/espaçamento/cor sem consultar o CSS real. *(Ativa a regra anti-delírio acima.)*

---

## 🧭 Roteador por Tarefa (Progressive Disclosure)

Leia o **NÚCLEO** sempre; consulte o **CONDICIONAL** só pelo que a tarefa exige.

**NÚCLEO (sempre):** este `CLAUDE.md` (Constituição + Roteador) · `docs/AGENT_QUICKSTART.md` (mapa de navegação).

### Bifurcação por fase — comece por aqui

| Vou trabalhar em… | Cartão | + Docs condicionais |
|---|---|---|
| **Adequar UI de componente BASE** (Fase 1/2) — *foco da onda atual* | **Cartão Base** ↓ | `DSS_UI_ADEQUACAO_CHECKLIST.md` *(rode o Gate de adequação, LIGHT e DARK)* |
| **Criar componente BASE do zero** *(só após adequação da base)* | **Cartão Base** ↓ | `PRD_DSS.md`, `DSS_ARCHITECTURE.md`, `DSS_COMPONENT_ARCHITECTURE.md`, `DSS_IMPLEMENTATION_GUIDE.md` |
| **Criar / adequar COMPOSTO** (Fase 3) | **Cartão Composto** ↓ | `DSS_GUIA_COMPOSICAO_FASE3.md`, `DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md` |
| **Fechar / auditar BASE** (Fase 1/2) | — | `prompt_auditoria_v2.5.txt` + `prompt_emissao_selo_conformidade_v2.5.txt`, dirigidos por **`prompt_revisao_independente_v1.0.md`** *(quem constrói NÃO sela — a auditoria é de outro agente)* |
| **Fechar / auditar COMPOSTO** (Fase 3) | — | `DSS_ROTEIRO_FECHAMENTO_FASE3.md` *(4 etapas; substitui o par "Modo Auditor + Selo" das Fases 1/2)* |

### Condicional por assunto

| Vou… | Leia ANTES |
|---|---|
| Usar/citar tokens | `docs/reference/DSS_TOKEN_REFERENCE.md` |
| Importar SCSS/JS entre pacotes | `docs/governance/DSS_MONOREPO_PATH_MAP.md` |
| Mexer no aspecto visual default | `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md` |
| Mexer em preview / sandbox | `docs/governance/DSS_DEFAULT_PREVIEW_WORKFLOW.md` |
| Renderizar/alterar ícone | `docs/governance/DSS_ICON_COMPOSITION_CONTRACT.md` |
| Nomear/citar variante `outline`/`outlined` | `docs/governance/DSS_VARIANT_NAMING.md` *(espelha o Quasar; gate `validate:variant-naming`)* |
| Abrir PR | `.github/pull_request_template.md` |
| Consultar status de selos | `docs/governance/CERTIFIED_COMPONENTS.md` |
| Saber se um componente já foi **adequado** (≠ selado) | `docs/governance/DSS_ESTADO_ADEQUACAO_UI.md` |

### Histórico (arquivado — só se investigar decisão de fase anterior)

- `docs/archive/reports/dss_governanca_e_documentacao_de_componentes_basios_fase_1.md`
- `docs/archive/reports/dss_governanca_e_documentacao_de_componentes_compostos_fase_2.md`

> ⚠️ Nunca inferir padrões observando um componente existente. O **DssButton é Golden Sample de _documentação_**, não fonte única de verdade arquitetural.

---

## 📇 Cartões de Invariantes

Leia o cartão **apontado pelo Roteador** para a sua tarefa. As regras condicionais vivem aqui (não na Constituição); o detalhe profundo vive nos docs de Nível 1/2 linkados.

### 📇 Cartão Base — Componente Fase 1/2

**Estrutura (4 camadas, nenhuma omitível):**
```
components/base/DssNomeComponente/
├── 1-structure/DssNomeComponente.ts.vue    ← Vue + TS (implementação canônica)
├── 2-composition/_base.scss                ← estilos base (só tokens genéricos)
├── 3-variants/  (_variant.scss + index.scss)
├── 4-output/    (_states.scss + _brands.scss + index.scss)
├── composables/useXxxClasses.ts
├── types/xxx.types.ts
├── DssNomeComponente.vue                    ← ENTRY POINT WRAPPER: re-export puro
├── DssNomeComponente.module.scss            ← ORQUESTRADOR: importa L2 → L3 → L4 (nessa ordem)
├── DssNomeComponente.md / DSSNOMECOMPONENTE_API.md / README.md / *.example.vue / *.test.js
├── dss.meta.json                            ← goldenReference, goldenContext, previewGroup, defaultPreview.demoSlots
└── index.ts                                 ← barrel: componente + types + composables
```
- **Entry Point Wrapper** obrigatório — re-export puro, sem `<template>`/`<style>`/lógica:
  ```vue
  <script>
  import DssNomeComponente from './1-structure/DssNomeComponente.ts.vue'
  export default DssNomeComponente
  </script>
  ```

**Regras técnicas condicionais (com gate):**
- **Alturas de controles compactos:** sempre `--dss-compact-control-height-{xs,sm,md,lg}`. Nunca token específico (`--dss-chip-height-*`, `--dss-badge-size-*`).
- **Pseudo-elementos:** `::before` = **RESERVADO** a touch target (WCAG 2.5.5); `::after` = efeitos visuais (hover/active/selected). Nunca `::before` para efeito visual.
- **Brightness (valores não-tokenizados):** só a tabela canônica — `0.85 · 0.90 · 0.92 · 0.95` (light) · `1.10 · 1.20` (dark). Valor novo exige justificativa e aprovação.
- **Ícone:** único primitivo é o `DssIcon`. Todo prop de ícone renderiza `<DssIcon :name inline decorative />`; slot nomeado tem precedência sobre o prop. Nunca `font-family: 'Material Icons'` em SCSS de componente.
  `❯ grep -rn "Material Icons" packages/core/components/base/DssNomeComponente/**/*.scss` → 0.

**Auditoria (vocabulário Golden — declarar antes de auditar):**
- **Golden Reference** = governança global da categoria (**DssChip** interativo · **DssBadge** não interativo).
- **Golden Context** = baseline específico do componente auditado (ex.: DssCheckbox p/ DssRadio).
- **Golden Sample** = referência de *documentação* / Template 13.1 (**DssButton**).
- 📖 `docs/governance/DSS_GOLDEN_COMPONENTS.md`.

**Escopo funcional mínimo ≠ documentação mínima.** É o menor conjunto de funcionalidades para cumprir o papel semântico/visual/comportamental/acessível — com **todas** as responsabilidades documentadas (o que faz, o que NÃO faz, o que assume). Não autoriza doc superficial, omissão de estados, redução de exemplos nem falta de contratos.

**Piso mínimo de documentação (README):** descrição (quando usar / quando NÃO usar) · API completa (props+tipos, slots — mesmo que só `default`, events — mesmo que "nenhum") · estados (hover/focus/active/disabled/loading ou justificar ausência) · tokens com nomes exatos `--dss-*` · exemplos (mín. 3, ideal 5–7, com brand e contexto real). Se algo não existe, **declare explicitamente**.

📖 Detalhe: `DSS_COMPONENT_ARCHITECTURE.md` (camadas, pseudo-elementos, brightness, wrapper) · `DSS_TOKEN_REFERENCE.md` §7.13 (alturas) · `DSS_ICON_COMPOSITION_CONTRACT.md`.

### 📇 Cartão Composto — Componente Fase 3

> **Status:** a governança de Fase 3 está em nível inicial (teste) e permanece **como está**. A criação de compostos ocorrerá **após** a adequação da base (Fase 1/2). Este cartão **aponta** para a governança existente — não a substitui.

Ao criar/adequar composto, os invariantes de composição são (detalhe integral nos docs abaixo):
- `inheritAttrs: false` + `v-bind="$attrs"` explícito no nó DSS correto.
- **Proibição absoluta de `:deep()` para layout** — layout mora no pai (wrapper/grid), nunca injetando CSS no filho.
- Estado global do bloco via `provide/inject` **tipado** (não prop drilling).
- Brand/contexto visual via `data-*` + cascata de CSS var (não inject).
- **Não reimplementar primitivos** — compor DSS; nunca QComponent cru no template.
- Adequação: rodar o checklist de composto **por peça interna**.

📖 `docs/governance/DSS_GUIA_COMPOSICAO_FASE3.md` (5 padrões + riscos overlay/overflow) · `DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md` (delta por peça) · `DSS_ESTRATEGIA_FASE3_COMPLEXIDADE_IA.md` (visão) · **`DSS_ROTEIRO_FECHAMENTO_FASE3.md`** (como FECHAR: o que é provado por comando e o que sobra para julgamento).

---

## ✅ Definition of Done (executável — rode, não afirme)

O componente só é válido — e elegível a selo — quando **todos** os gates passam. Estes são comandos que você **executa** e vê passar; não é uma lista para autodeclarar.

```bash
# a partir de packages/core
npx sass <Comp>.module.scss                 # compila sem erro
npx vitest run --project unit               # testes: renderização, props, eventos, slots
grep -rnE "^[^/]*@import" **/*.scss          # = 0  (Constituição #2, comment-aware)
grep -rn "Material Icons" **/*.scss          # = 0  (Cartão Base — ícone)
grep -rEn "#[0-9a-fA-F]{3,6}|[0-9]+px" 2-composition 3-variants 4-output   # scan de candidatos (Constituição #1: exceções = media/fallback/forced-colors)

# a partir da RAIZ do repo — contrato derivado (cadeia de fonte única)
node scripts/emit-contract.mjs <Comp> --write   # emite + valida schema + verifica âncoras a11y
node scripts/emit-contract.mjs --all --strict    # gate: exit 0 (nenhum contrato inválido/âncora reprovada)
```

**Checklist de fechamento (bloqueante):**
- [ ] **Estrutural:** 4 camadas completas · wrapper re-export puro · orquestrador L2→L3→L4 · `index.ts` (componente+types+composables) · `dss.meta.json` com `goldenReference`/`goldenContext`/`previewGroup`/`defaultPreview.demoSlots`.
- [ ] **Técnico:** zero hardcode · cores via classe · estados (hover/focus/active/disabled) implementados e documentados · a11y validada (AA, touch target, ARIA, teclado) · SCSS compila.
- [ ] **Documental:** tokens com nomes exatos · README completo · doc normativa (Template 13.1) · API Reference atualizada · example (mín. 3 cenários).
- [ ] **Testes:** `DssNomeComponente.test.js` existe com cobertura mínima (render base, props, eventos, slots) — **gate de build bloqueante**. Cobertura atual: 89/89 componentes. `DssCadrisCard` e `DssTestPageComplexity` são fixtures/páginas de teste — fora do escopo por decisão de governança (jun/2026).
- [ ] **Contrato:** `dss.contract.json` emitido, schema-válido, 0 gaps, âncoras `a11y.wcag[].verifiedBy` passam (o gate reprova claim que não fecha). `dss.meta.json` backfillado com `classification` (enum `Action`|`Compact`|`Visual`), `tagline` (≤120c) e bloco `a11y`. Detalhe da cadeia (tiers verificáveis): [DSS_BLUEPRINT_CADEIA_FONTE_UNICA.md §4.2](docs/governance/DSS_BLUEPRINT_CADEIA_FONTE_UNICA.md).
- [ ] **Visual (fechamento da adequação):** o componente renderiza **fiel** no **Preview Frame** (iframe sobre o SFC real + knobs derivados do contrato) — SFC real monta, console limpo, knob→reação, LIGHT/DARK e Brand corretos dentro do iframe. Consome o contrato (passo anterior). Gate integral no checklist de adequação (base e composto).

> Auditorias verificam este gate **antes** de qualquer análise detalhada. Nenhum componente recebe selo DSS v2.2 sem passá-lo.

---

## 🥇 Precedência em caso de conflito

Isto **não** é uma lista de leitura (isso é o Roteador). É a ordem de autoridade quando dois documentos divergem.

**Nível 1 — Normativos Vinculantes (Hard Rules), precedência máxima:**
1. **CLAUDE.md** — regras operacionais para agentes de IA.
2. **PRD_DSS.md** — papel estratégico, governança, critérios de qualidade.
3. **DSS_ARCHITECTURE.md** — estrutura do sistema, tokens, integração Quasar.
4. **DSS_COMPONENT_ARCHITECTURE.md** — 4 camadas, padrões, anti-patterns.
5. **DSS_REFERENCIA_VISUAL_ANALISE.md** — contrato visual canônico (auto-gerado do `meta.json`; nunca editar a região `AUTO-GENERATED`). Em conflito visual, **o CSS do componente prevalece** (Constituição #6).
6. **DSS_ICON_COMPOSITION_CONTRACT.md** — autoridade sobre renderização de ícone.

**Nível 2 — Guias Técnicos Normativos (obrigatórios por especialidade):**
7. **DSS_TOKEN_REFERENCE.md** — catálogo oficial (tokens citados com nome exato).
8. **DSS_IMPLEMENTATION_GUIDE.md** — como aplicar tokens, classes, estados, a11y.
9. **DSS_ARCHITECTURE_GUIDE.md** — decisões arquiteturais e racional.
10. **DSS_MONOREPO_PATH_MAP.md** — caminhos canônicos e imports entre pacotes.

**Regra de Ouro:** se um comportamento/token/estado está implícito num guia normativo mas não explícito, o agente **documenta**, não omite.

---

## 📌 Regra Final

> Na dúvida entre **simplificar demais** ou **explicitar melhor**, escolha **explicitar melhor**. Mas explicitar é dar sinal de alta qualidade — não empilhar regra redundante (ver Regra anti-acreção).

Documentação clara hoje evita refatoração massiva amanhã.
