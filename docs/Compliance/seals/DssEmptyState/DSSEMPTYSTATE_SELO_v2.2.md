# Selo Final de Conformidade DSS v2.2

**Componente:** DssEmptyState
**Versao DSS:** v2.2
**Golden Reference:** DssBadge (componente nao interativo)
**Golden Context:** DssBanner (bloco informativo de superficie com icone, texto e acao)
**Classificacao:** Visual — Nao interativo — Fase 1 — Familia: Estado de dado
**Motor Quasar:** Nenhum — HTML proprio do DSS, sem componente Quasar subjacente
**Dependencias DSS Internas:** DssIcon
**Data da Auditoria Final:** 28/08/2026
**Modo:** Auditor Final DSS v2.5 — Emissao de Selo de Conformidade

---

## Declaracao de Conformidade

Todas as nao-conformidades identificadas nas auditorias foram corrigidas antes da emissao deste selo:

| NC | Descricao | Correcao Aplicada |
|----|-----------|-------------------|
| NC-01 | O rebaixamento da claim WCAG 4.1.3 nao alcancou `types/empty-state.types.ts` — dono do eixo `api` — nem a §1 e §7.4 da doc normativa. Consequencia medida: `dss.contract.json` publicava `api.props.announce.description = "Anuncia o bloco a leitores de tela quando ele aparece"`, exatamente o que a §8.1 retratava | Os quatro trechos reescritos na origem (types, comentario do SFC, §1, §7.4) e contrato re-emitido. Verificado: `api.props.announce.description = "Emite role=status + aria-live=polite no elemento raiz"` |
| NC-02 | A frase retratada sobrevivia **renderizada como conteudo** no Playground (`TestDssEmptyState.vue`), no tile de acessibilidade e dentro de um `role="status"` | Titulo e descricao reescritos. Verificado no texto renderizado: `"Emite role=status e aria-live=polite"` / `"Emitir os atributos NAO garante que o leitor de tela anuncie"` |

Ambas as nao-conformidades foram de natureza **bloqueante** e corrigidas em ciclos sucessivos, sob revisao independente conduzida por agente distinto do construtor.

---

## Ressalvas Documentadas

| ID | Descricao | Mitigacao |
|----|-----------|-----------|
| RES-A11Y-01 | **Claim WCAG 4.1.3 rebaixada, sem teste de tecnologia assistiva.** O componente afirma apenas que **emite** `role="status"` + `aria-live="polite"`; nao afirma que o anuncio ocorre. Quatro passagens tentaram verificar o comportamento em leitor de tela e nenhuma dispunha de um (sem NVDA no host Windows, sem `orca`/`speech-dispatcher`/`at-spi` na WSL; `axe-core` e analise estatica e nao avalia anuncio) | A condicao de confiabilidade esta documentada em `DssEmptyState.md` §8.1 como **requisito de uso**: o consumidor mantem um conteiner `aria-live` persistente em volta da area que troca, com `:announce="false"` no bloco interno. A claim so voltara a afirmar o anuncio mediante evidencia anexada |
| RES-PROC-01 | **Pre-prompt retroativo.** `pre_prompt_dss_empty_state.md` foi escrito depois da implementacao, o que esta declarado na nota de procedencia do proprio arquivo. Alem disso ele ainda registra a claim 4.1.3 na formulacao anterior ao rebaixamento (ancora `aria` e a frase "essa troca precisa ser anunciada") | O artefato e registro de intencao em ponto no tempo, nao superficie de consumo. Conforme `prompt_auditoria_v2.5.txt` Gate G, cobertura incompleta de pre-prompt e **nao bloqueante para o componente**, mas bloqueante para o proximo componente da mesma familia — a anotacao retroativa deve preceder o proximo membro |
| RES-SIST-01 | **Dependencias sistemicas declaradas, fora do escopo deste componente.** (a) Ancora `verifiedBy: "aria"` do `emit-contract.mjs` nunca checa o atributo emitido — 35 claims em 32 componentes; (b) ancora `verifiedBy: "test"` verifica apenas a existencia do arquivo `.test.js`, nao que algum teste sustente a claim — 72 claims em 72 componentes, e a claim 4.1.3 deste componente repousa nela; (c) 37 de 57 componentes base nao usam `defineSlots`, incluindo os dois goldens deste componente; (d) `.bg-*` usa o primitivo `--dss-primary` em vez do semantico `--dss-action-primary`; (e) escala `--dss-surface-*` inverte de sentido no dark; (f) o gate estrutural nao verifica o `@forward` em `components/index.scss` | Todos registrados em `docs/governance/DEBITO_ABERTO.md`. Nenhum produz afirmacao falsa neste componente: a claim 4.1.3 e verdadeira e efetivamente coberta pelo `DssEmptyState.test.js`, que assere `role`, `aria-live` e a remocao de ambos com `announce=false` — a fragilidade esta no gate, nao no fato |

> Todas as ressalvas sao nao-bloqueantes, objetivas e verificaveis.
> Nenhuma ressalva impede a concessao do selo.

---

## Tabela Final de Criterios

| Criterio | Status | Observacao |
|----------|--------|------------|
| Token First | PASS | Nenhum valor hardcoded de cor ou dimensao. Varredura de `%`, `em`, `rem`, `calc()`, `vh/vw`, `ch` e `!important`: zero ocorrencias |
| Excecao de valor declarada | PASS | `line-height: 1` no icone, unica excecao, declarada em `visualProperties` e em `DssEmptyState.md` §4 com justificativa |
| Arquitetura 4 camadas | PASS | `1-structure` + `2-composition` + `3-variants` + `4-output` presentes e completas |
| Entry Point Wrapper | PASS | `DssEmptyState.vue` como re-export puro de `1-structure/DssEmptyState.ts.vue`, sem `<template>`, `<style>` ou logica. Gate Estrutural DSS (CLAUDE.md) CONFORME |
| Orchestrador SCSS | PASS | `DssEmptyState.module.scss` importa L2 → L3 → L4 na ordem |
| Barrel Export | PASS | `index.ts` exporta componente, types e composables |
| `dss.meta.json` | PASS | `goldenReference`, `goldenContext`, `previewGroup`, `defaultPreview.demoSlots`, `classification`, `tagline` e bloco `a11y` declarados |
| `dss.contract.json` | PASS | Emitido, schema-valido, 0 gaps, ancoras a11y aprovadas no `emit-contract --all --strict` |
| withDefaults | PASS | Declarado para as 7 props |
| defineEmits | PASS | N/A — componente nao emite eventos; a ausencia e testada explicitamente |
| Variantes de conteiner | PASS | `plain` (sem regra, por decisao registrada) e `bordered` (moldura tracejada) |
| Escala de tamanho | PASS | `sm` / `md` / `lg` ligadas a contextos de uso, medidas no Preview Frame (`lg` → padding 48px 24px) |
| Precedencia slot sobre prop | PASS | `icon`, `title` e `description` — coberto por teste unitario |
| ARIA role / aria-live | PASS | `role="status"` + `aria-live="polite"` quando `announce`; ambos removidos com `announce=false` |
| Brandabilidade | PASS | Neutralidade por decisao registrada; medida em 3 marcas x 2 temas — 34 icones resolvem para uma unica cor |
| Dark mode | PASS | Resolvido pela cascata global de tokens de texto, sem override proprio |
| prefers-contrast: more | PASS | Descricao e icone sobem para `--dss-text-primary`; moldura de `bordered` vira solida |
| forced-colors: active | PASS | `border-color: CanvasText` para a moldura nao desaparecer |
| prefers-reduced-motion | PASS | N/A declarado — zero `transition`, `animation` ou `@keyframes` |
| Touch target | PASS | N/A — bloco nao clicavel. Raiz sem `tabindex` e nao focavel, verificado em runtime. O `DssButton` do slot `action` traz o proprio alvo |
| Acessibilidade WCAG 2.1 AA | PASS | Contraste medido: LIGHT 9,59:1 / 4,74:1 / 4,74:1 · DARK 13,88:1 / 10,21:1 / 10,21:1 |
| Regras mortas | PASS | Varredura completa: nenhuma declaracao com valor igual ao inicial da propriedade |
| Teste vitest | PASS | `DssEmptyState.test.js` — 22 casos, 22 passando |
| Documentacao normativa | PASS | `DssEmptyState.md` com Template 13.1 |
| API Reference | PASS | `DSSEMPTYSTATE_API.md` completo |
| Example.vue | PASS | `DssEmptyState.example.vue` com 7 cenarios, praticando a §7.4 |
| README.md | PASS | Quando usar / quando nao usar, API, tokens, estados, brandabilidade, regra editorial |
| Paridade contrato / types / prosa | PASS | Os tres artefatos verificados na ordem derivado → tipo → prosa, sem divergencia |
| Gate visual (Preview Frame) | PASS | SFC real monta; console limpo; 12 knobs = 7 props + 5 slots; knob reage e snippet reflete; LIGHT e DARK corretos |
| Golden Reference validado | PASS | DssBadge (nao interativo) — verificacao transversal |
| Golden Context validado | PASS | DssBanner — baseline de bloco informativo, com a diferenca de papel documentada |

---

## Conformidades Confirmadas

### Tokens
- 24 tokens `--dss-*` consumidos, todos definidos — zero token fantasma.
- Espacamento: `--dss-spacing-{1,2,3,4,6,8,12,96,120}`.
- Tipografia: `--dss-font-family-sans`, `--dss-font-size-{sm,md,lg,xl}`, `--dss-font-weight-{normal,semibold}`, `--dss-line-height-{normal,relaxed}`.
- Texto: `--dss-text-primary`, `--dss-text-secondary`. `--dss-text-muted` deliberadamente evitado — aponta para `--dss-dark-disable`.
- Icone: `--dss-icon-size-{md,lg,xl}`.
- Borda: `--dss-border-width-thin`, `--dss-border-default`, `--dss-radius-lg`.
- Nenhum token especifico de componente.
- Uma unica excecao de valor sem token (`line-height: 1`), declarada e justificada.

**PASS / CONFORME**

### Touch Target
- Nao se aplica: o bloco nao e alvo clicavel. WCAG 2.5.5 governa o `DssButton` do slot `action`, que traz o proprio alvo de 44px.
- Verificado em runtime: raiz sem `tabindex`, nao focavel, `outline: none`, e zero regras `:hover` / `:focus` / `:active` / `:focus-visible` nas folhas carregadas.
- Declaracao alinhada ao Golden Reference DssBadge (nao interativo).

**PASS / CONFORME**

### Arquitetura
- Implementacao completa da Arquitetura de 4 Camadas DSS.
- **Gate Estrutural DSS (CLAUDE.md) CONFORME:** as 4 camadas (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`) estao presentes e completas; o wrapper `DssEmptyState.vue` na raiz e re-export puro de `1-structure/DssEmptyState.ts.vue`, sem `<template>`, sem `<style>` e sem logica propria; o orquestrador `DssEmptyState.module.scss` importa L2 → L3 → L4 na ordem; o barrel `index.ts` exporta o wrapper como entry point principal, mais types e composables.
- `1-structure/`: SFC canonico com Composition API e TypeScript; sem motor Quasar.
- `2-composition/`: layout, escala de tamanho e cores de texto, apenas com tokens genericos.
- `3-variants/`: `plain` sem declaracao por decisao registrada, `bordered` com moldura tracejada.
- `4-output/`: `_brands.scss` deliberadamente sem regra, com a justificativa no arquivo; `_states.scss` com alto contraste e forced-colors.
- Composable `useEmptyStateClasses` isola a logica de classes; types em `types/empty-state.types.ts`.
- Zero HTML nativo substituivel; `DssIcon` importado pelo wrapper, nunca por `1-structure`; zero `:deep()`.

**PASS / CONFORME**

### Estados
- **hover / active / focus / disabled:** nao existem, por decisao de arquitetura declarada — o bloco nao e clicavel. O unico elemento focavel e o que o consumidor coloca no slot `action`, e ele traz os proprios estados.
- **loading e error:** fora de escopo por definicao semantica — vazio significa que a operacao funcionou e o resultado e zero. A doc §2 aponta o componente correto para cada caso.
- **dark mode:** resolvido pela cascata global de tokens semanticos de texto, sem override proprio.
- **prefers-contrast: more:** descricao e icone sobem para `--dss-text-primary`; moldura de `bordered` vira solida.
- **forced-colors: active:** moldura recebe `CanvasText`.
- Ausencia de estados verificada em runtime, nao apenas declarada.

**PASS / CONFORME**

### Acessibilidade
- **WCAG 4.1.3 (AA):** o componente emite `role="status"` + `aria-live="polite"` quando `announce`. A claim afirma a emissao, nao o anuncio — ver RES-A11Y-01 e `DssEmptyState.md` §8.1.
- **WCAG 1.4.1 (A):** a informacao vive no texto do titulo, nunca apenas no icone; o icone e emitido como `decorative`.
- **WCAG 1.4.3 (AA):** contraste medido no navegador, no elo mais fraco (descricao secundaria) — LIGHT 4,74:1 e DARK 10,21:1, ambos acima do limiar de 4,5:1; titulo 9,59:1 e 13,88:1; icone 4,74:1 e 10,21:1 contra limiar de 3,0:1.
- **WCAG 2.5.5:** nao se aplica, sem alvo clicavel.
- **`ariaLabel` depende de `announce`:** documentado em §8.2 — com `announce=false` o rotulo cai em elemento de papel `generic`, onde a ARIA 1.2 proibe `aria-label`, e a prop fica inerte. Medido na arvore de acessibilidade do Chrome.
- **Multiplos blocos na mesma tela:** §7.4 orienta manter `announce` apenas no bloco que responde a acao do usuario; o Playground e o `example.vue` praticam a orientacao.
- Sem estouro em celula estreita: medido em pai de 200px, sem overflow.

**PASS / CONFORME**

### Documentacao
- `DssEmptyState.md` seguindo Template 13.1, com decisoes de design registradas em §7 — incluindo a neutralidade de marca (§7.2), o uso de `--dss-text-secondary` em vez de `--dss-text-muted` (§7.3), o default de `announce` (§7.4) e o titulo como `<p>` (§7.5).
- `DSSEMPTYSTATE_API.md` com referencia tecnica completa.
- `README.md` com quando usar e quando nao usar, API, tokens com nomes exatos, estados, brandabilidade e regra editorial de conteudo.
- `DssEmptyState.example.vue` com 7 cenarios.
- Props ausentes (`color`, `brand`, `loading`, `error`, `clickable`) documentadas como decisao, com motivo — nao ficam como lacuna interpretavel.
- Secoes de procedencia registram o que foi retratado e por que, em vez de reescrever o historico.

**PASS / CONFORME**

### Testes
- `DssEmptyState.test.js` presente na raiz do componente — 22 casos, 22 passando.
- Cobertura: renderizacao base, classes de `size` e `variant`, as 7 props, os 5 slots, precedencia de slot sobre prop, e acessibilidade (`role`, `aria-live`, `aria-label`, e a remocao de `role` e `aria-live` com `announce=false`).
- A **ausencia de eventos** e testada explicitamente, de modo que uma emissao acidental futura reprova o gate.

**PASS / CONFORME**

---

## Status Final

**APROVADO — Selo DSS v2.2**

O componente **DssEmptyState** esta em conformidade com o Design System Sansys v2.2, nos termos verificados nesta auditoria e com as ressalvas nao-bloqueantes acima registradas.

**Selo de Conformidade DSS v2.2 emitido em 28/08/2026.**

---

## Notas de Auditoria

### Ciclos de auditoria
- Total de passagens: 4 — uma auto-auditoria do construtor e tres revisoes independentes conduzidas por agente sem o historico de construcao.
- NCs identificadas: 2, ambas bloqueantes. NCs corrigidas: 2 de 2.
- Gaps identificados ao longo das quatro passagens: 21 itens distintos, todos com situacao declarada; os que permanecem abertos estao registrados em `docs/governance/DEBITO_ABERTO.md` e refletidos nas ressalvas.
- Gates de comando na passagem final: 12 de 12, mais `emit-contract --all --strict` sobre 79 componentes e as duas validacoes MCP.

### Por que a claim 4.1.3 foi rebaixada em vez de testada
Nenhuma das quatro passagens dispos de leitor de tela. Em vez de selar uma afirmacao sem lastro, a claim foi reduzida ao que e verificavel — a emissao dos atributos, que o teste unitario assere — e a condicao de confiabilidade virou requisito de uso documentado. O padrao de insercao permanece o reconhecidamente fragil: regiao e texto entram no DOM no mesmo commit no uso canonico com `v-if`.

### Neutralidade de marca
`4-output/_brands.scss` existe sem regra, por decisao registrada: o estado vazio e informacao neutra e nao chama para uma acao de marca. A neutralidade foi medida de forma independente em 3 marcas x 2 temas. Ela depende de um seletor de especificidade (0,3,0) na camada 2, necessario porque a regra global de brand do `DssIcon` casa direto no elemento e venceria a cor herdada do wrapper — mesmo mecanismo ja documentado em DssChip e DssCheckbox.

### Variantes sem declaracao
Tanto `3-variants/_plain.scss` quanto `4-output/_brands.scss` existem sem nenhuma declaracao CSS, cada um com a justificativa dentro do arquivo. Em ambos os casos a ausencia e deliberada e nao omissao: `plain` e a ausencia de tratamento, e as duas variantes sao classes mutuamente exclusivas que nunca coexistem.

---

Caminho canonico deste arquivo:
`DSS/docs/Compliance/seals/DssEmptyState/DSSEMPTYSTATE_SELO_v2.2.md`

Este arquivo e um registro historico imutavel. Nao pode ser editado apos a emissao. Alteracoes no componente apos esta data invalidam o selo e requerem nova auditoria completa, que produz um novo selo em novo arquivo.

**Design System Sansys — Governanca DSS v2.2**
