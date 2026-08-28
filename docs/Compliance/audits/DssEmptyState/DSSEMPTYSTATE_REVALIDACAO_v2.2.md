# Revalidação Independente — DssEmptyState (DSS v2.2)

> **Protocolo:** `prompt_auditoria_v2.5.txt`, dirigido por `prompt_revisao_independente_v1.0.md`
> **Carga:** `CARGA_REVALIDACAO.md` · **Commit auditado:** `5ef37f6` (HEAD `c16906d`)
> **Data:** 2026-08-28 · **Fase:** 1 · **Classificação:** `Visual` · **Status:** `draft`
> **Golden Context:** `DssBanner` · **Golden Reference:** `DssBadge`
> **Auditor:** Claude Opus 5 — Auditor Independente
> **Relatório de referência:** `DSSEMPTYSTATE_REAUDIT_v2.2.md` — **meu**, da rodada anterior.

---

## Nota de método — a inversão desta rodada

Nas rodadas anteriores o relatório a falsificar era de outro agente. **Nesta, é o meu.** A Carga
pede explicitamente que eu refaça a varredura de regras mortas *porque quem varreu da segunda vez
tinha o ponto cego* — e o mesmo vale para mim: minhas conclusões de ontem não são evidência hoje.

Refiz por medição tudo o que decide, inclusive coisas que eu mesmo dei por resolvidas. Foi o que
produziu os dois achados mais graves desta passagem: **a varredura de regras mortas continua
incompleta** e **a correção do R-01 introduziu uma regressão mais larga que o bug original** — os
dois em território que eu havia declarado fechado ou encaminhado.

---

## Veredito

**NÃO CONFORME — 1 NC bloqueante. Selo não concedido; o componente permanece `draft`.**

O rebaixamento da claim 4.1.3 foi feito com honestidade intelectual em §8.1 e no `dss.meta.json`,
mas **não alcançou todos os artefatos**. A afirmação retratada sobrevive em quatro lugares — um
deles é o arquivo que **é dono do eixo `api`** na cadeia de fonte única, e por isso a promessa sem
lastro **está dentro do `dss.contract.json` emitido**.

A Carga fixou o critério: *"Se ainda houver promessa sem lastro, é NC."* Há.

---

## ❌ NÃO-CONFORMIDADES

### NC-01 · O rebaixamento da claim 4.1.3 é parcial — a promessa retratada sobrevive no contrato

**Gravidade: BLOQUEANTE** · **Escopo:** este componente · **Referência normativa:** `CLAUDE.md`
Constituição #6 (fonte de verdade) e Regra de Ouro · `prompt_auditoria_v2.5.txt` §E
("API documentada ≠ API real ❌") · critério da própria Carga.

§8.1 e o `dss.meta.json` passaram a afirmar **apenas** que os atributos são emitidos, e dizem com
todas as letras: *"**Não** é garantia de que o leitor de tela anuncie"*. Correto e verificável.

**Mas a afirmação antiga continua em pé em quatro artefatos:**

| # | arquivo | linha | texto sobrevivente |
|---|---|---|---|
| 1 | `types/empty-state.types.ts` | 112 | "**Anuncia o bloco a leitores de tela quando ele aparece.**" |
| 2 | `types/empty-state.types.ts` | 116 | "…o caso dominante é o estado vazio SUBSTITUIR um resultado —, e **essa troca precisa ser anunciada**." |
| 3 | `DssEmptyState.md` §1 | 29 | "3. **Anuncia-se por padrão** — `role="status"` + `aria-live="polite"`, desligável." |
| 4 | `DssEmptyState.md` §7.4 | 225-226 | "…e **essa troca precisa ser anunciada**. O padrão serve ao caso dominante." |

*(também no comentário do SFC, `1-structure/DssEmptyState.ts.vue:7` — mesma frase; menor gravidade
por ser comentário de código.)*

**Por que o item 1 é o que torna isto bloqueante.** `emit-contract.mjs` declara os donos por eixo:
`api ← types/*.types.ts`. Medido no contrato emitido:

```
dss.contract.json → api.props.announce.description
  = "Anuncia o bloco a leitores de tela quando ele aparece."
```

O contrato derivado — o artefato que a cadeia de fonte única define como verdade e que as
ferramentas a jusante consomem — **afirma exatamente o que a §8.1 retrata**. Os dois artefatos do
mesmo componente se contradizem, e o que ganha em qualquer leitura automatizada é o contrato.

O item 3 agrava por posição: "Anuncia-se por padrão" está nas **Características principais**, na
primeira tela do documento normativo. Quem lê a doc de cima para baixo encontra a promessa antes
da retratação, 240 linhas depois.

**Não é discordância sobre a decisão** — o rebaixamento foi a escolha certa e está bem
argumentado. É execução incompleta de uma decisão correta.

**Correção:** reescrever os quatro trechos no mesmo registro da §8.1 (o componente *emite*; o
anúncio depende do contêiner persistente do consumidor) e **re-emitir o contrato**
(`node scripts/emit-contract.mjs DssEmptyState --write`). É trabalho de minutos.

> **Por que eu não corrijo.** O protocolo autoriza o auditor a corrigir a claim no Passo 1, mas
> corrigir e em seguida selar o que corrigi é auto-certificação no ponto exato que decide o selo —
> o que este documento existe para impedir. Reporto; a correção é de quem constrói.

---

## ⚠️ GAPS / RISCOS FUTUROS

### V-01 · A varredura de regras mortas **ainda** está incompleta — e o G-03 sumiu do controle

**Gravidade:** baixa (produto) / média (processo) · **Escopo:** este componente

A Carga pergunta se a varredura está completa agora. **Não.** Duas declarações no-op sobrevivem:

| arquivo | linha | declaração | por que é no-op |
|---|---|---|---|
| `4-output/_states.scss` | 61 | `forced-color-adjust: auto` | `auto` é o valor **inicial** da propriedade |
| `3-variants/_bordered.scss` | 14 | `background-color: transparent` | valor **inicial** de uma `<div>` |

`_plain.scss` foi de fato esvaziado — confirmei por estilo computado no navegador
(`border-style: none` · `border-width: 0px` · `background-color: rgba(0,0,0,0)`, idêntico a uma
`div` sem regra), e o arquivo ficou com a explicação, o que está correto.

**O achado de processo é maior que o de produto:** o `forced-color-adjust: auto` é o **G-03**, aberto
pela auto-auditoria do construtor na primeira rodada. A `CARGA_REVALIDACAO.md` **não o menciona
nenhuma vez** — não está na tabela de fechados nem na de abertos por decisão (`grep -c "G-03"` → 0).
Ele não foi decidido: **caiu do controle** entre rodadas. Um item some do ledger e sobrevive a duas
revisões — vale mais corrigir o mecanismo de carry-forward do que a linha de CSS.

O `background-color: transparent` do `--bordered` eu havia citado no relatório anterior, dentro do
R-03; a correção tratou só o `_plain.scss`.

### V-02 · A correção do R-01 regrediu o snippet para 6 componentes — mais largo que o bug original

**Gravidade:** média · **Escopo:** **sistêmico (harness)** · **Achado novo**

**Primeiro, o que funcionou.** Remedi o R-01 byte a byte, como a Carga pede:

| `announce` | DOM no iframe | snippet |
|---|---|---|
| `true` | `role="status"` `aria-live="polite"` | `… size="md" variant="plain" />` |
| `false` | `role=null` `aria-live=null` | `… size="md" variant="plain" **:announce="false"** />` |

**R-01 está corrigido** para o DssEmptyState. ✅

**Mas a correção trocou um bug estreito por um largo.** O patch removeu `|| v === false` do guarda
e passou a emitir `:prop="false"` sempre que o valor difere do default. O problema é que, para
prop boolean **sem `@default` declarado**, o contrato traz `default: undefined` — e
`false === undefined` é falso, então o guarda não dispara.

**Medido no DssChip, em repouso, sem tocar em nenhum knob:**

```
<DssChip label="Chip" variant="filled" color="primary" size="md"
         :square="false" :selected="false" :disable="false" :clickable="false"
         :removable="false" :dense="false" :ripple="false"> … </DssChip>
```

Sete bindings espúrios, todos iguais ao default. O snippet existe para ser copiado; agora ensina
ruído.

**Alcance — medido com as duas leituras separadas:**

| leitura | número |
|---|---|
| Componentes afetados **hoje** (têm Preview Frame **e** boolean sem `@default`) | **6** — DssCheckbox, DssChip, DssField, DssMultiselectAutocomplete, DssRadio, DssUploader (34 props) |
| Componentes com a condição no contrato, **sem** Preview Frame hoje (latente) | **35** |
| Bug original que a correção resolveu | **3** componentes |

Confirmei por leitura do diff que o caso `default: false` **explícito** continua correto
(`v === k.default` curto-circuita antes) — a falha é só no `default` ausente.

**Correção sugerida:** tratar `undefined` como `false` para prop boolean —
`const def = k.default ?? false; if (v === false && def !== true && def !== 'true') continue;`.
O caminho irmão `postState()` já testa `def === true || def === 'true'`, reconhecendo que o default
chega às vezes como string; o caminho do snippet não replicou isso.

**Defeito de harness, fora do componente — cito, não corrijo** (§8). Não bloqueia o selo do
DssEmptyState, cujo gate visual passa.

### V-03 · `--dss-spacing-1` é usado e não aparece em nenhuma das duas tabelas de tokens

**Gravidade:** baixa · **Escopo:** este componente · **Achado novo**

`2-composition/_base.scss:126` usa `margin-top: var(--dss-spacing-1)` no `.dss-empty-state__action`.
O token **não** está na lista da §4 (`--dss-spacing-{2,3,4,6,8,12,96,120}`) nem na tabela
"Tokens consumidos" do `README.md` — que a §4 chama de *"Tabela completa"*.

É a mesma classe do R-04 (a doc afirma completude que não tem), noutro eixo. Encontrado porque
desta vez comparei o conjunto **usado no SCSS** contra o **listado na doc**, em vez de reler a lista.

### V-04 · R-07 continua aberto — e o número piorou

**Gravidade:** baixa a média · **Escopo:** este componente

A Carga pede que eu julgue se a §8.1 nova cobre o R-07. **Cobre parcialmente, e só quem adotar o
padrão recebe o benefício.**

- **A favor:** o padrão da §8.1 (contêiner `aria-live` persistente + `:announce="false"` no bloco
  interno) elimina a live region interna. Quem seguir a §8.1 à risca não acumula regiões.
- **Contra:** `announce` continua `true` por padrão, e a §8.1 é apresentada como requisito de
  **confiabilidade do anúncio**, não como orientação para **vários blocos na mesma tela**. Nenhum
  artefato menciona o caso: `grep -iE "vários|múltipl|mais de um|mesma tela"` nos três documentos
  → **zero ocorrências** relevantes.
- **Medido:** o Playground foi de 32 para **34 live regions** (37 blocos), porque as demos novas do
  R-05 acrescentaram blocos com o default.

**Segue aberto.** A recomendação original permanece: uma frase em §7.4 ou §8 dizendo que, havendo
mais de um estado vazio na mesma tela, `announce` fica só no que responde à ação do usuário.

### V-05 · As demos escrevem `aria-label`; toda a documentação escreve `ariaLabel`

**Gravidade:** muito baixa · **Escopo:** este componente · **Achado novo**

As duas demos novas do R-05 usam `<DssEmptyState aria-label="…">` (kebab-case). **Funciona** — o
Vue cameliza nomes de atributo ao casar com props declaradas, então a prop `ariaLabel` é de fato
exercitada, e foi assim que confirmei o R-05 fechado. Mas `README`, `DssEmptyState.md`,
`DSSEMPTYSTATE_API.md`, `types` e o contrato escrevem `ariaLabel`; quem copiar do Playground
aprende a outra grafia.

### G-02 · Reescopado — concedo o ponto do construtor sobre o número (ver seção própria abaixo)

### Carregados, reconferidos, seguem abertos por decisão

| id | situação confirmada |
|---|---|
| **G-04** | slots sem `defineSlots` — aberto · sistêmico (37 de 57 base, inclui os goldens) |
| **G-05** | pré-prompt retroativo — aberto · processo; nada a corrigir no componente |
| **G-06** | `.bg-*` usa primitivo `--dss-primary` · escala `--dss-surface-*` invertida no dark — abertos, **citados e não corrigidos** |

---

## 🔍 O ponto de discordância — qual número eu sustento no G-02

A Carga pede que eu refaça a medição com critério próprio e decida. Fiz, e o resultado é
**parcialmente contra mim**.

**Meu critério.** Quebrei cada nome de prop em palavras (camelCase/snake) e classifiquei como
*genuína* a prop que contém a palavra `aria` ou `required` — assim `addAriaLabel` e
`uploadAriaLabel` contam como genuínas (foi exatamente onde o `startswith` do construtor errou), e
`variant` não conta.

| medição | resultado |
|---|---|
| Componentes com ≥1 claim ancorada em `aria` | **32** |
| Claims WCAG ancoradas em `aria` | **35** *(eram 36; o DssEmptyState moveu a 4.1.3 para `test`)* |
| Componentes que passam **só** pelo acidente de substring | **0** |
| Componentes com prop `aria*`/`required` genuína | **32** (todos) |
| Prop acidental que satisfaz a âncora | `variant`, em **10** componentes |

**O construtor está certo, e eu estava impreciso.** Nenhum componente hoje depende do acidente.
Meu "32 componentes / 36 claims" era uma afirmação sobre **alcance de uma âncora vazia**, mas
apresentada de um jeito que se lê como "36 claims passam falsamente" — o que eu não medi e não é
verdade. **A refinação dele procede e a prioridade relativa do conserto cai.**

**Onde eu não recuo.** "Não está produzindo falso-positivo hoje" é verdadeiro sobre o *acidente de
substring* e falso se lido como *"as claims ancoradas estão verificadas"*. A âncora **nunca** checa
o atributo emitido — para nenhuma das 35. Exemplo neste próprio componente: a claim **1.4.1**
afirma que *"o ícone é emitido como decorativo e não é anunciado"*, e a âncora a aprova porque
existe uma prop chamada `ariaLabel`. Nada no gate olha para `decorative`. A claim é verdadeira —
verifiquei o SFC — mas **não é a âncora que a torna verificada**.

**Os dois números que eu sustento, cada um com seu escopo:**

- **35 claims em 32 componentes usam uma âncora que não verifica o que afirmam.** É a medida do
  alcance do defeito, e é o que justifica consertá-lo.
- **0 componentes passam hoje apenas pelo acidente de substring.** É a medida do dano presente, e é
  o que coloca a prioridade abaixo de qualquer defeito com falso-positivo ativo.

Latente quanto ao acidente; **presente quanto à vacuidade**. As duas coisas são verdadeiras ao
mesmo tempo, como a própria Carga antecipou.

*(Registro que apliquei a mesma régua ao meu achado V-02: separei "6 afetados hoje" de "35
latentes" em vez de reportar o total agregado.)*

---

## ✅ PONTOS CONFORMES

### Fechados — reverificados por medição, não aceitos por relato

| id | como verifiquei | resultado |
|---|---|---|
| **G-01** *(parcial)* | leitura de §8.1 + `implementation` no meta + `verifiedBy` | **Honesto onde chegou.** A claim afirma só a emissão, o `.test.js` a sustenta, e a §8.1 dá o requisito de uso com exemplo de código. O rebaixamento é correto — **mas incompleto (NC-01)** |
| **R-01** | Preview Frame, byte a byte, DOM × snippet | **Corrigido** ✅ (com a regressão V-02) |
| **R-02** | §8.2 contra a medição da árvore de a11y da rodada anterior | **Documentado com precisão** — inclusive a ressalva de que o axe não acusa no uso comum |
| **R-03** | estilo computado do `--plain` no navegador | **Corrigido** ✅ (varredura ainda incompleta — V-01) |
| **R-04** | `visualProperties` + §4 + varredura de novas classes de valor | **Corrigido** ✅ e **nenhuma exceção nova**: `%`, `em`, `rem`, `calc()`, `vh/vw`, `ch`, `!important` → **0 ocorrências** |
| **R-05** | contagem no Playground vivo | **Corrigido** ✅ — `ariaLabel` nas duas configurações (2 blocos, 1 deles sem `role`) e slot `default` exercitado |
| **R-06** | §7.5 + tag do título no DOM | **Registrado** ✅ — decisão argumentada (nível de heading é da página hospedeira; saída é o slot `title`); markup segue `<p>`, como declarado |

### Gates de comando — 16/16, rodados nesta passagem

`validate:structure:gate` · `validate:scss-tokens:gate` · `validate:api-docs:gate` ·
`validate:sfc-hygiene:gate` · `validate:variant-naming:gate` · `validate:demo-registry` ·
`validate:sandbox-tags` · `validate:portal-pages` · `validate:barrel-ext` · `catalog:validate` ·
`validate:type-check` · `emit-contract --all --strict` (79 componentes, 0 âncora reprovada) ·
MCP `validate_component_code` (`compliant`) · MCP `validate_pre_prompt` (`compliant`) ·
Gate Estrutural · **`vitest` 22/22**.

### Medições visuais — LIGHT e DARK

| verificação | LIGHT | DARK |
|---|---|---|
| Contraste título | **9,59:1** ✅ | **13,88:1** ✅ |
| Contraste descrição (elo mais fraco) | **4,74:1** ✅ | **10,21:1** ✅ |
| Contraste ícone (limiar 3,0) | **4,74:1** ✅ | **10,21:1** ✅ |
| Neutralidade de marca | 34 ícones, **1 cor** | 34 ícones, **1 cor** |
| Knobs = props + slots | **12** = 7 + 5, sem fantasma | idem |
| SFC real monta · console limpo | ✅ | ✅ |
| Estouro em célula estreita | sem overflow | — |

- **Arquitetura íntegra:** 4 camadas · orquestrador L2→L3→L4 · wrapper re-export puro · barrel.
- **Composição e responsabilidade:** zero HTML nativo substituível · `DssIcon` pelo wrapper · zero
  `:deep()` · nenhum estado de filho capturado · sem lógica de negócio.
- **A honestidade da mensagem do commit `5ef37f6`** merece registro: declara que os 7 achados
  procedem, separa o que foi decisão do responsável, e **antecipa a própria discordância** sobre o
  alcance do G-02 em vez de silenciá-la. Foi o que tornou esta revalidação rápida.

---

## 🛠️ RECOMENDAÇÕES (priorizadas)

1. **Fechar a NC-01** — reescrever os 4 trechos (2 no `types.ts`, §1 e §7.4 da doc; e o comentário
   do SFC) no registro da §8.1, e **re-emitir o contrato**. É o único item que separa este
   componente do selo.
2. **Terminar a varredura de regras mortas (V-01)** — remover `forced-color-adjust: auto` e o
   `background-color: transparent` do `--bordered`. E **reincorporar o G-03 ao controle**: um item
   aberto não pode desaparecer da Carga sem decisão registrada.
3. **Corrigir a regressão do snippet (V-02)** — item próprio, fora deste componente. Tratar
   `default` ausente como `false` para boolean. **Prioridade acima do G-02**, porque produz ruído
   observável hoje em 6 componentes.
4. **Completar as tabelas de tokens (V-03)** — incluir `--dss-spacing-1`.
5. **Fechar o R-07 (V-04)** com uma frase em §7.4/§8.
6. **Uniformizar a grafia nas demos (V-05)** — `ariaLabel`.
7. **G-02** — segue no `DEBITO_ABERTO` com o escopo corrigido: *35 claims em 32 componentes usam
   âncora que não verifica; 0 dependem do acidente de substring hoje*.

---

## 📊 RESUMO EXECUTIVO

| Métrica | Quantidade |
| --- | --- |
| Não-conformidades **bloqueantes** | **1** (NC-01) |
| Não-conformidades não-bloqueantes | 0 |
| Gaps abertos | **9** — 5 novos (V-01…V-05) · 4 carregados (G-02 reescopado, G-04, G-05, G-06) |
| Achados da rodada anterior **fechados e reverificados** | **6 de 7** (R-01…R-06) |
| Gates de comando | **16 / 16 ✅** |
| Testes unitários | **22 / 22 ✅** |
| Status Final | **🔴** |

**Leitura do 🔴:** o vermelho é estreito e barato de apagar. Não há defeito de implementação: o
componente passa em tudo que se mede por comando, e as decisões de design se sustentaram sob
medição independente pela segunda vez. O bloqueio é **uma retratação que não chegou a quatro
lugares** — um deles o contrato derivado.

---

## Elegibilidade a selo

**Não elegível.** O `prompt_emissao_selo_conformidade_v2.5.txt` exige *"NCs resolvidas"* como
pré-condição, e há uma.

O caminho é curto e não depende de leitor de tela: **fechar a NC-01 e re-emitir o contrato**. Feito
isso, o componente fica sem nenhuma NC conhecida e — na minha avaliação — **elegível ao selo**, com
os gaps remanescentes como ressalvas não-bloqueantes, dos quais só o V-01 é do componente e
V-02/G-02/G-04/G-06 são sistêmicos declarados.

Registro para a próxima passagem: se a NC-01 for fechada, **a verificação a refazer é o contrato
emitido**, não a documentação — foi a doc que foi corrigida da última vez enquanto o contrato ficou
para trás.

---

## Onde discordei — e onde recuei

Exigido pelo §9.4 do protocolo. Nesta rodada o relatório de referência era **meu**, então a lista
corta para os dois lados.

**Onde mantenho e aprofundo:**
1. **A varredura de regras mortas não estava completa** — nem na versão do construtor (que pegou o
   caso), nem depois da correção (que pegou o `_plain` e deixou dois). **V-01.**
2. **A vacuidade da âncora `aria` é condição presente**, não latente: 35 de 35 claims não são
   verificadas pela âncora que declaram.

**Onde recuo:**
3. **Concedo o G-02 no número que importa para prioridade.** Não há componente dependendo do
   acidente de substring — medi com critério próprio, mais rigoroso que o `startswith` que falhou
   com o construtor, e deu **0**. Minha formulação anterior induzia a leitura errada.

**Onde discordo da Carga:**
4. **A §8.1 não cobre o R-07.** A Carga sugere que pode cobrir; medi que não — o número de live
   regions **subiu** de 32 para 34, e nenhum artefato trata do caso de vários blocos na mesma tela.
5. **A Carga omite o G-03.** Não está em nenhuma das duas tabelas. Não é erro de julgamento — é um
   item que caiu do controle, e o `forced-color-adjust: auto` continua no disco por causa disso.

**Onde meu próprio trabalho anterior falhou:**
6. Recomendei "remover as regras mortas (R-03 + G-03)" numa linha só. Ao empacotar dois itens numa
   recomendação, facilitei que metade fosse fechada e a outra sumisse. Achado devidamente
   separado é achado que sobrevive ao carry-forward.

---

*Revalidação independente. Nenhum selo concedido. Nenhum defeito de sistema corrigido nesta
passagem, por determinação do §8 do protocolo.*
