# Onda de adequação de UI + DssEmptyState + governança de selagem

**55 commits · 305 arquivos · +24.457 / −15.125**

> ⚠️ MR grande, resultado de uma onda longa. A leitura mais rápida é pela seção
> **"Como revisar isto sem ler 55 commits"** no fim.

---

## 📌 Descrição

**Problema identificado.** Três frentes convergiram nesta branch:

1. A **onda de adequação de UI** (família de campos e controles de seleção) expôs defeitos
   visuais e de acessibilidade que os gates automáticos não alcançavam — anel de foco
   translúcido, bordas cinza-cru fora da camada semântica, altura de chip fora da escala.
2. O DSS **não tinha resposta para "não há dados"**: `estado_dado.vazio` aparecia 0 vez em 3 de 3
   specs medidas, e `empty` existia só como *slot* do `DssVirtualScroll` — cada tela inventava o
   seu.
3. O processo de selagem **institucionalizava a auto-certificação**: o prompt de passagem de
   bastão mandava o mesmo agente construir e selar, enquanto o prompt de selo proíbe exatamente
   isso.

**Solução proposta.** Adequação medida (não inspecionada) de DssChip/DssField/DssFile/DssInput;
criação do primitivo `DssEmptyState`; migração de cinza-cru para tokens semânticos; extensão dos
gates para `themes/`, `tokens/` e `utils/`; e separação de quem constrói de quem sela.

**Motivação.** Boa parte destes defeitos estava em produção há meses, invisível porque o CSS lia
como correto. O padrão que se repetiu: **medir ao vivo revela o que ler o SCSS esconde.**

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
| `refactor(chip)!` | Prop **`round`** removida do `DssChip` | Nenhuma ação: a prop era **inerte nas duas posições** — não produzia efeito visual. Quem a passava já não obtinha nada. |
| `refactor(utils)!` | **11 mixins** removidos de `utils/` | Nenhum tinha consumidor (verificado por varredura). Os mixins que **ficaram** e estavam quebrados foram consertados no mesmo commit. |

Nenhum dos dois altera comportamento observável de código que funcionava.

---

## 🎯 Impacto

- Produtos impactados: **Water · Waste · Hub** (mudanças em tokens semânticos atingem os três)
- Tipo de impacto:
  - [x] Visual — bordas, anel de foco, altura de chip, alinhamento de adornos
  - [x] Comportamental — anel de foco passa a ser `:focus-visible` (não aparece em clique de mouse)
  - [x] API pública — ver breaking changes acima
  - [x] Breaking change — 2, ambos sem migração necessária

---

## ♿ Acessibilidade — o que de fato mudou

Esta é a parte com maior impacto de produção:

| correção | antes → depois |
|---|---|
| **Anel de foco (WCAG 1.4.11)** | **49 de 60** combinações reprovavam por translucidez → **88 combinações medidas, 0 reprovam** |
| **Borda neutra no tema claro (1.4.11)** | contorno de campo em **1,48:1** → **4,74:1** |
| **Touch target (WCAG 2.5.5)** | docs citavam "48px", que **não existe na escala** e vinha do Material → alinhado em **44px** (`--dss-touch-target-md`) nos 5 normativos de Nível 1/2 |
| **`.bg-neutral` no dark** | chip `neutral` era ilegível → segue o tema |
| **Camada semântica em contexto aninhado** | tokens não recomputavam sob tema aninhado; o alto contraste falhava **em silêncio** no preview |

---

## 🎨 Tokens

- [x] Todos os valores visuais utilizam tokens DSS
- [x] Tokens novos/alterados estão documentados
- [x] Tokens de branding possuem fallback semântico
- [x] Não há valores hardcoded *(exceções declaradas: `brightness()` da tabela canônica,
      `forced-colors`, e `line-height: 1` no ícone do DssEmptyState — todas registradas)*

**115 usos de cinza-cru migrados** para a camada semântica (68 bordas + 47 fundos/textos).
Temas `hc`/`hcdark` adicionados **inertes** — nenhum efeito até alguém ligar.

---

## 🧱 Componentes

### Novo — `DssEmptyState` (Fase 1, base)

7 props · 5 slots · **0 eventos** · 3 tamanhos · 2 variantes · 22 testes.
Não interativo. Golden Context `DssBanner`, Golden Reference `DssBadge`.

> ✅ **SELO DSS v2.2 CONCEDIDO** — 89º componente selado.
>
> **Quatro passagens de auditoria, e o número é o dado mais útil:** auto-auditoria (0 NC, 6 gaps)
> → revisão independente por outro agente (7 gaps novos) → revalidação (1 NC) → revalidação 2
> (1 NC) → revalidação 3 (conforme). **21 itens distintos**, e a mesma afirmação falsa sobrevivendo
> em **5 lugares**, um por rodada. O que fechou o ciclo foi passar a auditar a **demo renderizada**,
> não o fonte — três rodadas corrigiram comentário, tipo, contrato e prosa sem olhar o texto que a
> tela exibe.
>
> **Três ressalvas constam do selo, e não somem com ele:**
> 1. **Claim WCAG 4.1.3 rebaixada sem teste de leitor de tela** — nenhuma das quatro passagens teve
>    NVDA/VoiceOver disponível. O componente afirma apenas que *emite* `role="status"`; o anúncio
>    confiável exige contêiner `aria-live` persistente no consumidor (`DssEmptyState.md` §8.1).
> 2. **Pré-prompt retroativo** — escrito depois do código, declarado no próprio documento.
> 3. **Dependências sistêmicas declaradas** — ver a seção de dívida.

### Adequados — `DssChip` · `DssField` · `DssFile` · `DssInput`

Playground + Preview Frame por componente; alinhamento de adornos medido (não inspecionado);
`DssFile` ganhou paridade com a família (`loading`, `required`, `before`/`after`/`label`).

---

## 📚 Documentação

- [x] Documentação criada ou atualizada
- [x] Estrutura segue o Template Oficial DSS (Seção 13)
- [x] Tokens utilizados estão listados
- [x] Estados centralizados
- [x] Anti-patterns documentados
- [x] Governança do componente definida

**Mudança de processo (a mais relevante para o time):** o prompt de passagem de bastão mandava um
único chat levar o componente *"do pré-prompt até o selo"* — o mesmo agente construindo e selando.
Isso agora termina em **"pronto para auditoria"**, e a selagem passou a exigir revisão por agente
independente (`docs/governance/prompt_revisao_independente_v1.0.md`). O roteador do `CLAUDE.md`
ganhou a linha de fechamento de base Fase 1/2, que não existia.

---

## 🔒 Gates

Todos verdes no `HEAD` da branch: estrutura · tokens SCSS · paridade API↔docs · higiene de SFC ·
grafia de variante · registry do DemoRenderer · tags do sandbox · páginas do portal · barrel ·
catálogo · type-check · contratos (`emit-contract --all --strict`).

Catálogo: **92 componentes, 89 selados**, 0 contradições status↔selo.

Dois gates **novos** nesta branch: token definido só em escopo condicional, e tema que re-aponta
primitivo sem recomputar o semântico.

**Uma quebra de infraestrutura consertada:** `npm run portal:sync-docs` lançava
`ReferenceError: require is not defined in ES module scope` — script CommonJS num pacote
`"type": "module"`. Quebra de jun/2026 que só apareceu agora, porque o selo do `DssEmptyState` foi
o primeiro a precisar do gerador desde a migração para ESM. Renomeado para `.cjs`, com o racional
no cabeçalho. ⚠️ Há outra worktree (`work/dss-a11y-contraste`) que recebeu a mesma tarefa — se ela
também a fizer, **espere conflito trivial no rename**.

---

## 🐛 Dívida que esta MR NÃO resolve — declarada, não escondida

Registrada em `docs/governance/DEBITO_ABERTO.md`:

| item | por que não foi resolvido aqui |
|---|---|
| 🔴 **58% das claims WCAG são "verificadas" por âncora que não verifica nada** — medido nos 185 claims dos 79 contratos: `css` 78 (verifica de verdade), `test` 72 (só checa se o arquivo existe), `aria` 35 (só checa se existe prop cujo nome casa `/aria\|required/`). **107 claims passam sem que nada olhe para a implementação** | Corrigir **reprova contratos hoje verdes**; exige onda própria. Ver a nota abaixo — este item contradiz material já apresentado |
| **Pré-prompt é superfície de retratação que ninguém varre** — ficou fora das 4 rodadas de correção do `DssEmptyState` | Caso corrigido; a **classe** fica: nenhuma checklist lista `docs/governance/pre-prompts/` |
| **A Regra de Ouro da Fase 1 exige "wrapper direto de UM único componente Quasar"** — e o `DssEmptyState` não tem base Quasar | Decisão de governança: a regra precisa distinguir **wrapper governado** de **primitivo nativo** |
| **`.bg-*` fura a camada semântica** (`utils/_colors.scss:40` usa o primitivo `--dss-primary`) — um `DssButton color="primary"` fica `#1F86DE` nas 3 marcas | Muda cor em todo o sistema; exige decisão, não conserto de passagem |
| **Escala `--dss-surface-*` inverte de sentido no dark** — texto secundário sobre `muted` cai a ~2,8:1 | Idem |
| **Âncora `verifiedBy:"aria"` não verifica o que afirma** — a regex casa "aria" dentro de "v**aria**nt" | Afeta 36 claims; corrigir pode reprovar contratos hoje verdes |
| **Gate estrutural não verifica o `@forward`** — um componente pode passar em 10 gates entregando zero CSS | Correção proposta no débito |
| **Contraste da paleta default (c1)** — `primary` 3,80:1 · `tertiary` 2,93:1 · `accent` 4,20:1 | Aguarda decisão de cor da equipe; nenhum hex alterado unilateralmente |

---

> ⚠️ **Correção de rumo que precisa chegar a quem viu a apresentação técnica.** O documento
> `docs/reference/APRESENTACAO_TECNICA.md` §5 afirma: *"cada claim com uma âncora verificável: o
> gate reprova afirmação que não fecha"*. **Isso vale hoje só para o terço ancorado em `css`.**
> A medição está no `DEBITO_ABERTO`; a apresentação **não foi alterada nesta MR** porque a
> correção do texto depende de decidir se a âncora será consertada ou se a promessa será
> reescrita — e essa decisão não é de quem abre a MR.

---

## Como revisar isto sem ler 55 commits

1. **`docs/governance/DEBITO_ABERTO.md`** — o quadro do que ficou aberto e por quê. **Comece pelo
   item das âncoras**: é o de maior alcance da MR e o único que contradiz material já apresentado.
2. **Suba o sandbox** (`npm run sandbox:dev`) e compare um componente adequado (DssChip, DssInput)
   em **LIGHT e DARK**, com `Tab` para ver o anel de foco — é onde a mudança visual se vê.
3. **`docs/Compliance/audits/DssEmptyState/`** — os dois relatórios (auto-auditoria e revisão
   independente) mostram o padrão de rigor que a onda adotou.
4. **Os 2 commits `!`** — são os únicos com impacto de API, e ambos removem código inerte.

---

## Autoria

Duas frentes trabalharam nesta branch em paralelo. Os commits de **tokens/a11y**
(`refactor(tokens)`, `fix(a11y,tokens)`, `feat(tokens,a11y)`, `fix(tokens,wcag-kit)`) vêm da
frente de contraste e alto contraste; os de **componente/governança**, da onda de adequação.
