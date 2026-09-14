# Adequação de UI, brandabilidade, contraste e governança de selagem

**139 commits · 463 arquivos · +38.855 / −23.280**

> ⚠️ MR grande, resultado de uma onda longa com duas frentes em paralelo. A leitura mais
> rápida é pela seção **"Como revisar isto sem ler 139 commits"** no fim.

---

## 📌 Descrição

**Problema identificado.** A onda começou como adequação visual de uma família de componentes
e, a cada medição, encontrou defeito que os gates automáticos não alcançavam. O padrão se
repetiu tantas vezes que virou o método: **medir ao vivo revela o que ler o SCSS esconde.**

**Seis frentes compõem esta MR.** São independentes entre si e podem ser revisadas separadamente:

| # | Frente | O que resolve |
|---|---|---|
| 1 | **Adequação de UI** | Defeitos visuais e de a11y da família de campos e controles de seleção |
| 2 | **Brandabilidade** | As cores das 3 marcas não chegavam aos componentes |
| 3 | **Contraste e cinzas** | Textos e controles reprovando WCAG; cores fora da camada semântica |
| 4 | **Estado de hover** | Efeito genérico de brilho substituído pela rampa de cor |
| 5 | **`DssEmptyState`** | O DSS não tinha resposta para "não há dados" |
| 6 | **Governança e ferramental** | Quem constrói não sela; gates novos; sandbox; MCP |

---

## 🧩 Tipo de Mudança

- [x] Token (criação / ajuste)
- [x] Componente Básico DSS (wrapper Quasar)
- [ ] Componente Composto DSS
- [x] Documentação
- [x] Correção / Refino técnico

---

## ⚠️ Breaking changes (2)

| commit | o que muda | migração |
|---|---|---|
| `refactor(chip)!` | Prop **`round`** removida do `DssChip` | Nenhuma ação: a prop era **inerte nas duas posições** — não produzia efeito visual. |
| `refactor(utils)!` | **11 mixins** removidos de `utils/` | Nenhum tinha consumidor (verificado por varredura). Os que **ficaram** e estavam quebrados foram consertados no mesmo commit. |

Nenhum dos dois altera comportamento observável de código que funcionava.

---

## 🎯 Impacto

- Produtos impactados: **Water · Waste · Hub** (mudanças em tokens semânticos atingem os três)
- Tipo de impacto:
  - [x] Visual — bordas, anel de foco, hover, altura de chip, alinhamento de adornos
  - [x] Comportamental — anel de foco passa a ser `:focus-visible`; hover deixa de escurecer o label
  - [x] API pública — ver breaking changes acima
  - [x] Breaking change — 2, ambos sem migração necessária

---

## 1. Adequação de UI

`DssChip` · `DssField` · `DssFile` · `DssInput` · `DssButton`

Playground + Preview Frame por componente; alinhamento de adornos **medido**, não inspecionado.
`DssFile` ganhou paridade com a família (`loading`, `required`, `before`/`after`/`label`).
O `DssChip` teve o visual de `selected` alinhado ao Quasar — três invenções sem justificativa
removidas — e o ícone de remoção trocado de `cancel` para `close`, porque o primeiro
rasterizava achatado.

Dois defeitos de contenção apareceram na medição: o overlay de hover **vazava do componente**
(resolvido com `isolation: isolate`) e a sombra do botão não seguia o padrão de mercado,
com a variante `glossy` sendo apagada pelo shorthand.

---

## 2. Brandabilidade — as marcas não chegavam ao componente

Dois defeitos independentes impediam Hub, Water e Waste de exibirem suas cores. **Atingiam
produção, não só o ambiente de testes.**

| defeito | causa | efeito medido |
|---|---|---|
| Utilitárias `.bg-*`/`.text-*` | apontavam o **primitivo**, que não se move por marca | mesmo botão com cor diferente entre Playground e produção |
| Ponte `--q-*` | declarada só em `:root`; custom property resolve **no elemento onde é declarada** | `[data-brand]` em subárvore **não brandeava** |

> 📌 O primeiro item vale como registro de método: o verbete original no `DEBITO_ABERTO`
> **culpava o token errado**. A investigação mostrou que o core compilado estava correto e que
> quem divergia era o bundle de dev. O verbete foi mantido na íntegra, com a retratação, porque
> o **erro de diagnóstico** é a parte reaproveitável.

Além disso, a prop `brand` e o atributo `[data-brand]` **não eram caminhos equivalentes** — só
o atributo é escopo de token. Corrigido; os dois entregam a mesma cor.

---

## 3. Contraste e cinzas → camada semântica

Frente conduzida em worktree isolada e integrada ao final (merge sem conflito, zero arquivos
em comum entre as pernas).

| correção | antes → depois |
|---|---|
| **Anel de foco (WCAG 1.4.11)** | **49 de 60** combinações reprovavam por translucidez → **88 medidas, 0 reprovam** |
| **Borda neutra no tema claro (1.4.11)** | contorno de campo em **1,48:1** → **4,74:1** |
| **Texto em `gray-500` (1.4.3)** | **2,52:1** em Checkbox, Radio e Uploader → **4,74:1** |
| **Manípulo de scroll e alça de splitter (1.4.11)** | arrastáveis, em **1,48** e **2,52** → família nova `--dss-control-*`, ≥ 3:1 nos 4 temas |
| **`.bg-neutral` no dark** | chip `neutral` era ilegível → segue o tema |
| **Camada semântica aninhada** | tokens não recomputavam sob tema aninhado; o alto contraste falhava **em silêncio** |

**Placar dos cinzas crus: 201 → 59** declarações, das quais **47 são isentas por contexto
legítimo** (`--standout`, `prefers-contrast`, `print`, tooltip). Resíduo real: ~12, triados.

> **Lição de método registrada no débito:** migração em lote lê a *propriedade* e erra o *papel*.
> Um `color: var(--dss-gray-400)` virou `--dss-text-muted` porque a propriedade era `color` —
> mas era o `currentColor` do trilho desligado, consumido translúcido. Revertido.

---

## 4. Estado de hover pela rampa de cor

A tabela de cores já definia os níveis `-hover` e `-deep` para as 8 cores, e **nenhum
componente os consumia**. O mecanismo anterior era um filtro de brilho sobre o elemento
inteiro — que escurecia o **texto** junto com o fundo.

O hover piorava a legibilidade em vez de melhorá-la:

| marca | contraste do label, repouso → hover |
|---|---|
| default | 3,80 → **7,89:1** |
| hub | 2,81 → **6,52:1** |
| water | 3,71 → **7,37:1** |
| waste | 4,90 → **8,14:1** |

Aplicado ao `DssButton` e, após medir os 12 componentes já adequados um a um, ao `DssChip` —
o único que precisava. Os demais usavam o efeito de forma legítima (sem texto dentro).
O padrão foi incorporado ao checklist de adequação.

⚠️ **Decisão estética exposta, não tomada:** no dark, o chip `filled` agora escurece no hover em
vez de clarear. O número mostra que escurecer preserva a legibilidade; se a direção visual
quiser clarear, o degrau certo é um `-light` da rampa, não brilho.

---

## 5. Novo componente — `DssEmptyState` (Fase 1, base)

7 props · 5 slots · **0 eventos** · 3 tamanhos · 2 variantes · 22 testes.
Não interativo. Golden Context `DssBanner`, Golden Reference `DssBadge`.

> ✅ **SELO DSS v2.2 CONCEDIDO** — 89º componente selado.
>
> **Quatro passagens de auditoria, e o número é o dado mais útil:** auto-auditoria (0 NC, 6 gaps)
> → revisão independente por outro agente (7 gaps novos) → revalidação (1 NC) → revalidação 2
> (1 NC) → revalidação 3 (conforme). **21 itens distintos**, e a mesma afirmação falsa sobrevivendo
> em **5 lugares**, um por rodada. O que fechou o ciclo foi passar a auditar a **demo renderizada**,
> não o fonte.
>
> **Três ressalvas constam do selo e não somem com ele:**
> 1. **Claim WCAG 4.1.3 rebaixada sem teste de leitor de tela** — nenhuma das quatro passagens teve
>    NVDA/VoiceOver disponível. O componente afirma apenas que *emite* `role="status"`.
> 2. **Pré-prompt retroativo** — escrito depois do código, declarado no próprio documento.
> 3. **Dependências sistêmicas declaradas** — ver a seção de dívida.

---

## 6. Governança e ferramental

**Quem constrói não sela.** O prompt de passagem de bastão mandava um único chat levar o
componente *"do pré-prompt até o selo"* — o mesmo agente construindo e certificando, enquanto o
prompt de selo proíbe exatamente isso. Agora termina em **"pronto para auditoria"**, e a selagem
exige revisão por agente independente.

**Gates novos nesta branch:**

- token definido só em escopo condicional (não resolve no contexto default)
- tema que re-aponta primitivo sem recomputar o semântico
- §L/§M do checklist de adequação — "lembrar na adequação" passou a ser cobrado
- cobertura do README do MCP × primitivos expostos no código

**Sandbox.** Playground do `DssUploader` e Preview Frame do `DssButton`, zerando o grupo que só
podia ser inspecionado por uma das duas superfícies. As páginas de teste passaram a consumir um
template comum em vez de reimplementar o layout.

**MCP.** O `query_component` se contradizia no próprio retorno — o bloco `meta` trazia o selo e o
campo `summary`, no mesmo JSON, imprimia `not sealed` para **32 dos 92** componentes. Causa: o
corpus de `dss.meta.json` tem duas grafias para os mesmos fatos e o leitor conhecia uma.
Corrigido tolerando ambas. O README documentava 13 de 22 primitivos (faltavam 3 tools e a
categoria inteira de *resources*) e não distinguia a superfície humana da que a máquina consome.

**Higiene de documentação.** A alegação de touch target de **48px** — valor que vem do Material
Design e **não existe na escala do DSS** (32/36/44/52/64) — aparecia em 42 linhas de 26 arquivos,
incluindo contratos. Alinhada em 44px. Junto apareceu `--dss-touch-target-min`, **token que nunca
existiu**, citado em docs e num `meta.json`; o `themes/` já o havia removido em agosto com nota
explicando que não existe, e a doc de componente seguiu citando por mais de um mês.

**Uma quebra de infraestrutura consertada:** `npm run portal:sync-docs` lançava
`ReferenceError: require is not defined in ES module scope` — script CommonJS num pacote
`"type": "module"`. Quebra de jun/2026 que só apareceu porque o selo do `DssEmptyState` foi o
primeiro a precisar do gerador desde a migração para ESM.

---

## 🎨 Tokens

- [x] Todos os valores visuais utilizam tokens DSS
- [x] Tokens novos/alterados estão documentados
- [x] Tokens de branding possuem fallback semântico
- [x] Não há valores hardcoded *(exceções declaradas: `brightness()` da tabela canônica,
      `forced-colors`, e `line-height: 1` no ícone do `DssEmptyState` — todas registradas)*

**115 usos de cinza-cru migrados** para a camada semântica (68 bordas + 47 fundos/textos), mais
a fatia da frente de contraste. Família nova `--dss-control-*` para controles operáveis.
Temas `hc`/`hcdark` adicionados **inertes** — nenhum efeito até alguém ligar.

---

## 📚 Documentação

- [x] Documentação criada ou atualizada
- [x] Estrutura segue o Template Oficial DSS (Seção 13)
- [x] Tokens utilizados estão listados
- [x] Estados centralizados
- [x] Anti-patterns documentados
- [x] Governança do componente definida

---

## 🔒 Gates

Todos verdes no `HEAD` da branch: estrutura · tokens SCSS · escopos de tema · paridade API↔docs ·
higiene de SFC · grafia de variante · registry do DemoRenderer · tags do sandbox · páginas do
portal · barrel · catálogo · type-check · contratos (`emit-contract --all --strict`) ·
cobertura de doc do MCP.

Catálogo: **92 componentes, 89 selados**, 0 contradições status↔selo.
Testes: **92 arquivos, 2.706 casos**, todos passando.

---

## 🐛 Dívida que esta MR NÃO resolve — declarada, não escondida

Registrada em `docs/governance/DEBITO_ABERTO.md`:

| item | por que não foi resolvido aqui |
|---|---|
| 🔴 **58% das claims WCAG são "verificadas" por âncora que não verifica nada** — dos 185 claims dos 79 contratos: `css` 78 (verifica de verdade), `test` 72 (só checa se o arquivo existe), `aria` 35 (só checa se existe prop cujo nome casa `/aria\|required/`). **107 claims passam sem que nada olhe para a implementação** | Corrigir **reprova contratos hoje verdes**; exige onda própria. Ver a nota abaixo — contradiz material já apresentado |
| 🔴 **Dois sistemas de dark convivem** — 8 componentes pintam por `@media (prefers-color-scheme: dark)`, fora do eixo `[data-theme]`. A doutrina já está escrita no repo e três componentes a documentaram; os outros não receberam o recado | O usuário com SO claro e app em dark não recebe o dark desses componentes. Migrar pode expor blocos que existiam para compensar valor hardcoded — pede onda própria |
| 🟡 **Brandabilidade passa por fora da camada de token** — 92 componentes pintam marca com o primitivo cru no `4-output/_brands.scss`. **577 usos** contra 175 do semântico | Medida, não iniciada. O alto contraste alcança `[data-brand]` e **não** alcança a prop `brand` |
| 🟡 **`dss.meta.json` tem duas grafias para os mesmos fatos** (`dssVersion`/`version`, `sealDate`/`seal`+`auditDate`) | O leitor do MCP foi corrigido; normalizar o corpus é decisão de governança — o arquivo é fonte de verdade de outras cadeias |
| 🟡 **Escala `--dss-surface-*` inverte de sentido no dark** — texto secundário sobre `muted` cai a ~2,8:1 | Precisa de decisão de cor |
| 🟡 **Pré-prompt é superfície de retratação que ninguém varre** | Caso corrigido; a **classe** fica: nenhuma checklist lista `docs/governance/pre-prompts/` |
| 🟡 **A Regra de Ouro da Fase 1 exige "wrapper direto de UM único componente Quasar"** — e o `DssEmptyState` não tem base Quasar | A regra precisa distinguir **wrapper governado** de **primitivo nativo** |
| ⏳ **Contraste da paleta default (c1)** — `primary` 3,80:1 · `tertiary` 2,93:1 · `accent` 4,20:1 | Aguarda decisão de cor da equipe; nenhum hex alterado unilateralmente. Metade das 8 cores fecha **sem trocar hex** |

---

> ⚠️ **Correção de rumo que precisa chegar a quem viu a apresentação técnica.** O documento
> `docs/reference/APRESENTACAO_TECNICA.md` §5 afirma: *"cada claim com uma âncora verificável: o
> gate reprova afirmação que não fecha"*. **Isso vale hoje só para o terço ancorado em `css`.**
> A medição está no `DEBITO_ABERTO`; a apresentação **não foi alterada nesta MR** porque a
> correção do texto depende de decidir se a âncora será consertada ou se a promessa será
> reescrita — e essa decisão não é de quem abre a MR.

---

## Como revisar isto sem ler 139 commits

1. **`docs/governance/DEBITO_ABERTO.md`** — o quadro do que ficou aberto e por quê. **Comece pelo
   item das âncoras**: é o de maior alcance e o único que contradiz material já apresentado.
2. **Suba o sandbox** (`npm run sandbox:dev`) e compare um componente adequado (DssChip, DssInput,
   DssButton) em **LIGHT e DARK**, com `Tab` para o anel de foco e o mouse parado sobre o botão
   para o hover — é onde a mudança visual se vê.
3. **Troque a marca** com o seletor do Playground: as três devem mudar de cor, inclusive no hover.
   Era exatamente isso que não funcionava.
4. **`docs/Compliance/audits/DssEmptyState/`** — os relatórios mostram o padrão de rigor adotado.
5. **Os 2 commits `!`** — os únicos com impacto de API, ambos removendo código inerte.

---

## Autoria

Duas frentes trabalharam nesta branch em paralelo, parte do tempo em worktrees separadas. Os
commits de **tokens/a11y** (`refactor(tokens)`, `fix(a11y,tokens)`, `feat(tokens,a11y)`) vêm da
frente de contraste e alto contraste; os de **componente/governança**, da onda de adequação.
