# Revisão Independente — DssEmptyState (DSS v2.2)

> **Protocolo:** `prompt_auditoria_v2.5.txt`, dirigido por `prompt_revisao_independente_v1.0.md`
> **Data:** 2026-08-28 · **Componente:** `DssEmptyState` · **Fase:** 1 · **Status:** `draft`
> **Classificação:** `Visual` · **Golden Context:** `DssBanner` · **Golden Reference:** `DssBadge`
> **Auditor:** Claude Opus 5 — Auditor Independente (chat sem o histórico de construção)
> **Auditoria anterior:** `DSSEMPTYSTATE_AUDITORIA_v2.2.md` (feita por quem construiu) — tratada
> como **hipótese a falsificar**, não como fonte de verdade.

---

## Veredito

**NÃO CONFORME PARA SELO — o componente permanece `draft`.**

Não por defeito: **zero não-conformidades**, 16/16 gates de comando passando. O selo não sai
porque o **item que decide (G-01) continua não verificado**, e o protocolo é explícito:
*"Não conseguiu verificar → **Não sele**"*. Ausência de teste não vira aprovação.

Além disso, esta passagem encontrou **7 gaps que a auditoria anterior não encontrou** — o que é
o sinal esperado de uma revisão independente, e não teria aparecido se eu tivesse me limitado a
reconferir os achados dela.

---

## 1. Passo 1 — O item que decide (G-01)

**Claim auditada:** `DssEmptyState.md` §7.4, `README.md` e `dss.meta.json` (a11y 4.1.3) afirmam
que o bloco **anuncia** a troca quando o vazio substitui um resultado após busca, filtro ou
exclusão.

### 1.1 O que consegui verificar

| # | Verificação | Ferramenta | Resultado |
|---|---|---|---|
| 1 | A premissa estrutural do risco | Chrome DevTools (CDP) sobre o SFC real em `localhost:5173` | **CONFIRMADA** |
| 2 | Emissão dos atributos | idem | `role="status"` + `aria-live="polite"` presentes |
| 3 | Mapeamento na árvore de a11y | árvore de acessibilidade do Chrome | `status … atomic live="polite" relevant="additions text"` |

A região e o texto **entram no DOM no mesmo commit**: o `<div role="status">` é renderizado pela
mesma função de render que emite o `<p class="dss-empty-state__title">`, e o DOM renderizado
mostra os dois simultaneamente. Não existe caminho em que a região seja inserida vazia e
preenchida depois. **A condição frágil descrita no G-01 está de fato presente.**

### 1.2 O que NÃO consegui verificar — e por quê

**O comportamento de anúncio em tecnologia assistiva real não foi testado.** Ambiente medido:

```
NVDA (host Windows)  : ausente — nem "C:/Program Files/NVDA" nem "C:/Program Files (x86)/NVDA"
orca                 : ausente        speech-dispatcher : ausente
espeak / espeak-ng   : ausente        at-spi2-registryd : ausente
AT_SPI_BUS           : vazio
```

VoiceOver exigiria macOS. **axe-core não substitui o teste**: é análise estática e não avalia se
uma live region anuncia — confirmei rodando axe 4.12.0 contra o componente (0 violações nas três
configurações), o que **não** é evidência a favor da claim.

> **Declaração explícita, conforme o protocolo:** não afirmo que está quebrado nem que funciona.
> Afirmo que o padrão de inserção é reconhecidamente frágil, que a claim **não foi testada contra
> AT real** por esta auditoria nem pela anterior, e que por isso **o selo não pode sair**.

### 1.3 O caminho de saída

Duas opções, ambas legítimas:

- **(a) Testar** com NVDA (Windows) e/ou VoiceOver (macOS). Cenário: lista com itens → filtro que
  zera o resultado → o `DssEmptyState` monta. O título é anunciado?
- **(b) Rebaixar a claim** e selar sem ela: remover a afirmação de anúncio de `DssEmptyState.md`
  §7.4, `README.md` e do `dss.meta.json` (a11y 4.1.3), e documentar em §8 que o **consumidor**
  deve manter um contêiner com `aria-live` persistente. É a correção mais barata e não toca no
  componente.

---

## ❌ NÃO-CONFORMIDADES

**Nenhuma.** Refiz contra o disco os gates bloqueantes — não confiei no relatório anterior.

### Gates de comando (rodados, não afirmados)

| Gate | Resultado |
|---|---|
| `validate:structure:gate` | ✅ 92 componentes · 0 violações |
| `validate:scss-tokens:gate` | ✅ 0 token fantasma **novo** |
| `validate:api-docs:gate` | ✅ 92 analisados · 0 divergências |
| `validate:sfc-hygiene:gate` | ✅ 642 arquivos · 0 import cruzado |
| `validate:variant-naming:gate` | ✅ 12 componentes · 0 violações |
| `validate:demo-registry` | ✅ |
| `validate:sandbox-tags` | ✅ |
| `validate:portal-pages` | ✅ |
| `validate:barrel-ext` | ✅ |
| `catalog:validate` | ✅ 0 contradições status↔selo |
| `validate:type-check` | ✅ exit 0 |
| `emit-contract --all --strict` | ✅ 79 componentes · schema ok · 0 âncora reprovada |
| `vitest` do componente | ✅ **22/22** |
| MCP `validate_component_code` | ✅ `compliant`, `findings: []` |
| MCP `validate_pre_prompt` | ✅ `compliant`, 0 eixo ausente |
| Gate Estrutural (4 camadas · wrapper · orquestrador · barrel) | ✅ |

### Verificações de julgamento refeitas por medição

- **Neutralidade de marca — remedida do zero.** 3 marcas × 2 temas, no Playground real: os **33
  ícones** da página resolvem para **uma única cor** (`--dss-text-secondary`), sem virar
  `--dss-hub-600` (#ef7a11). Light: ícone `#737373`, título `#454545` sob `hub`, `water` e
  `waste`. Dark: `#d4d4d4` / `#f5f5f5`. **A decisão declarada se sustenta** — e o seletor de
  especificidade (0,3,0) na camada 2 é o que a sustenta.
- **Contraste WCAG 1.4.3 — medido, não inferido.** Light: título **9,59:1**, descrição **4,74:1**,
  ícone **4,74:1** (limiar 3,0 por ser ≥24px). Dark: **13,88:1** / **10,21:1** / **10,21:1**.
  **Todos passam AA** nos dois temas.
- **Não-estouro em célula estreita.** Célula de 200px: bloco 198px, `scrollWidth == clientWidth`,
  sem overflow horizontal no documento. ✅
- **Ausência de estados é real, não alegada.** Zero regras `:hover/:focus/:active/:focus-visible`
  nas folhas carregadas; raiz sem `tabindex` e não focável. ✅
- **Tokens existem.** Os 24 tokens `--dss-*` consumidos estão todos definidos — inclusive
  `--dss-spacing-120` (480px) e `--dss-spacing-96` (384px). Zero fantasma. ✅

---

## ⚠️ GAPS / RISCOS FUTUROS

### R-01 · O snippet do Preview Frame **não reflete** `announce=false` — o gate visual falha aqui

**Gravidade:** média · **Escopo:** **sistêmico** (harness) · **Achado novo**

O item do gate visual é *"knob → componente reage **e o snippet reflete**"*. Medido, isolando a
variável (`ariaLabel` limpo, só `announce` alternado):

| `announce` | `role` no DOM do iframe | snippet gerado |
|---|---|---|
| `true` | `status` | `<DssEmptyState icon="inbox" title="…" description="…" size="lg" variant="bordered" />` |
| `false` | `null` | **idêntico** — byte a byte |

O componente reage corretamente; **o snippet mente**. Quem copiar o snippet obtém um componente
**com** live region, diferente do que vê na tela.

**Causa localizada** — `apps/sandbox/src/preview/PreviewFrame.vue:333`:

```js
if (v === k.default || v === '' || v == null || v === false) continue   // descarta TODO false
```

O caminho irmão que alimenta o componente (`postState()`, ~linha 276) trata o caso corretamente e
até o comenta: *"Se o default é `true` (ex.: chipsRemovable), o `false` é um override
SIGNIFICATIVO"*. O gerador de snippet **não** recebeu o mesmo tratamento.

**Alcance:** 3 componentes têm prop boolean com `@default true` — `DssBtnDropdown`,
`DssEmptyState`, `DssMultiselectAutocomplete`. **Não é defeito deste componente**; ele é apenas o
primeiro em que o item do gate visual foi de fato exercido. **Cito, não corrijo** (§8 do protocolo:
defeito de harness muda comportamento de outros componentes).

### R-02 · `ariaLabel` + `announce=false` produz `aria-label` num elemento `generic`

**Gravidade:** média · **Escopo:** este componente · **Achado novo**

As duas props são independentes na API, e nada na documentação as acopla. Com `announce=false`, o
template não emite `role`, e o resultado medido no componente real é:

```html
<div class="dss-empty-state dss-empty-state--lg dss-empty-state--bordered"
     aria-label="Lista de solicitacoes vazia"> … </div>
```

Árvore de acessibilidade do Chrome para essa forma: **`generic "Lista de solicitacoes vazia"`**.
A ARIA 1.2 lista `aria-label` como **atributo proibido** no papel `generic`, e um `generic`
nomeado não é anunciado por leitores de tela — **a prop é inerte nessa configuração**.

**Calibragem honesta do achado** (medi antes de afirmar): axe-core 4.12.0 **implementa** a regra
`aria-prohibited-attr`, mas só reprova quando o elemento **não tem conteúdo textual**. Sondagem
controlada:

| caso | axe |
|---|---|
| `<div aria-label="rotulo"><p>texto</p></div>` | não reprova |
| `<div aria-label="rotulo"></div>` (sem conteúdo) | **reprova** `aria-prohibited-attr` |
| `<div role="status" aria-live="polite" aria-label="rotulo"><p>texto</p></div>` | não reprova |

Ou seja: no uso comum (com título) a ferramenta não acusa, mas **o rótulo não chega ao usuário**.
No caso sem conteúdo — que o próprio Preview Frame produz por padrão — vira violação detectável.

**Onde resolver:** documentar que `ariaLabel` só tem efeito com `announce=true`; ou emitir
`role="group"`/`role="region"` quando houver `ariaLabel` sem `announce`. A escolha é de
governança — não a tomo aqui.

### R-03 · A varredura de regras mortas foi incompleta — `_plain.scss` é **inteiramente** no-op

**Gravidade:** baixa · **Escopo:** este componente · **Achado novo (estende o G-03 anterior)**

A auditoria anterior encontrou **uma** declaração no-op (`forced-color-adjust: auto`, que de fato
é o valor inicial da propriedade). Procurando a **classe** do problema em vez do caso, a variante
`plain` inteira é morta:

```scss
.dss-empty-state--plain { border: none; background-color: transparent; }
```

Ambos são o valor inicial de uma `<div>`. Estilos computados medidos no navegador, no bloco
`--plain` real: `border-style: none` · `border-width: 0px` · `background-color: rgba(0, 0, 0, 0)`
— idênticos ao de uma `div` sem regra alguma. `--bordered` repete o `background-color:
transparent` no-op.

Não quebra nada; é intenção sem entrega, exatamente o motivo pelo qual o G-03 foi aberto. Se o
G-03 se justifica, este se justifica pelo mesmo critério.

### R-04 · `DssEmptyState.md` §4 afirma "Exceções: **Nenhuma**" — e há uma

**Gravidade:** baixa · **Escopo:** este componente · **Achado novo**

§4 declara: *"Exceções documentadas (valores sem token): **Nenhuma.** Todo valor dimensional vem
de `var(--dss-*)`."* No disco, `2-composition/_base.scss:63`:

```scss
.dss-empty-state__icon { line-height: 1; }
```

`1` não vem de token, e a escala `--dss-line-height-*` **não tem** membro adimensional igual a 1
(os disponíveis são `tight: 1.25`, `snug: 1.375`, `normal: 1.5`, `relaxed: 1.625`, `loose: 1.75`,
mais os de px). A declaração é legítima e provavelmente necessária — o problema é a doc afirmar
que não existe.

Isto também **contradiz um ✅ da auditoria anterior** ("Regime de exceções: zero, e verdadeiro").
Aquela verificação procurou `px`/hex e concluiu ausência de exceção; `line-height: 1` não casa
nesse grep e passou. **É o ponto cego herdado que a revisão independente existe para cobrir.**

**Onde resolver:** ou §4 passa a declarar a exceção (com o motivo: não há token adimensional), ou
cria-se `--dss-line-height-none: 1`. A primeira é mais barata e cabe na regra de ouro do
`CLAUDE.md` — *documenta, não omite*.

### R-05 · `ariaLabel` e o slot `default` nunca são exercitados nas demos

**Gravidade:** baixa · **Escopo:** este componente · **Achado novo**

Resposta direta à pergunta do protocolo (*"exercitam a API real ou só o caminho feliz?"*):

| superfície | `.example.vue` (7 cenários) | Playground (9 seções) | Preview Frame |
|---|---|---|---|
| props `icon` `title` `description` `size` `variant` `announce` | ✅ | ✅ | ✅ |
| prop **`ariaLabel`** | ❌ | ❌ (0 de 34 blocos) | ✅ knob |
| slots `icon` `action` | ✅ | ✅ | ✅ |
| slots `title` `description` | ❌ | ✅ | ✅ |
| slot **`default`** | ❌ | ❌ | ✅ knob |

**2 dos 12 membros da API** (`ariaLabel`, slot `default`) não aparecem em nenhuma demo estática.
Ambos têm cobertura em teste unitário e knob no Preview Frame — por isso é gap, não NC. Vale
notar que R-02 (o defeito real de `ariaLabel`) **só não foi visto antes porque nada o exercitava**.

### R-06 · O título é um `<p>`, sem semântica de cabeçalho e sem decisão registrada

**Gravidade:** baixa · **Escopo:** este componente · **Achado novo**

Medido: em todos os 34 blocos da página, `.dss-empty-state__title` é `<P>`. Visualmente é um
cabeçalho (`--dss-font-size-lg`, `--dss-font-weight-semibold`), e num estado vazio de página
inteira (`size="lg"`) costuma ser o título principal da região — mas não há semântica de heading
nem prop (`titleTag`, `headingLevel`) para o consumidor fornecê-la.

Pode muito bem ser a decisão certa: um heading dentro de `role="status"` tem efeitos próprios, e
`<p>` evita impor nível de cabeçalho ao consumidor. **O gap não é a escolha — é o silêncio.**
Nem `DssEmptyState.md` §3/§8 nem o pré-prompt mencionam a alternativa. Pela regra de ouro do
`CLAUDE.md`, decisão implícita se documenta.

### R-07 · `announce: true` por padrão gera muitas live regions numa mesma página

**Gravidade:** baixa a média · **Escopo:** este componente · **Achado novo (medido)**

Contagem no Playground: **34 blocos, 32 live regions** simultâneas. É página de demonstração e
portanto pior caso — mas dashboards com vários painéis vazios são cenário real e o padrão os
transforma em `role="status"` por omissão.

A doc §7.4 justifica **por que** o default é `true` (o caso dominante é substituir um resultado) e
diz quando desligar, mas não trata do caso "vários na mesma tela". Risco: anúncios `polite`
enfileirados e verbosidade em atualização simultânea.

**Onde resolver:** uma frase em §7.4/§8 — quando houver mais de um estado vazio na mesma tela,
manter `announce` apenas naquele que responde à ação do usuário.

### Carregados da auditoria anterior — reconferidos, seguem abertos

| id | assunto | situação nesta passagem |
|---|---|---|
| **G-01** | live region inserida com o conteúdo | **aberto** — decide o selo; ver §1 |
| **G-02** | âncora `verifiedBy:"aria"` não verifica o que afirma | **confirmado e agravado** — ver abaixo |
| **G-04** | slots sem `defineSlots` | aberto · sistêmico (37 de 57 base, inclui os goldens) |
| **G-05** | pré-prompt retroativo | aberto · processo; nada a corrigir neste componente |
| **G-06** | 2 defeitos de sistema (`.bg-*` primitivo · `--dss-surface-*` invertida no dark) | abertos · **citados, não corrigidos** (§8) |

**Sobre o G-02 — confirmo e agravo.** A âncora é:

```js
verified = (api.props || []).some(p => /aria|required/i.test(p.name))
```

Testando o alcance real: além de `ariaLabel`, a prop **`variant` também satisfaz a âncora** — a
regex casa a substring "**aria**" dentro de "v-**aria**-nt". Um componente sem nenhuma prop de
acessibilidade, mas com uma prop `variant`, passa o gate em qualquer claim ancorada em `aria`.

**Alcance medido:** **32 componentes · 36 claims WCAG** ancoradas em `aria`.

Consequência direta para esta auditoria: o ✅ do `emit-contract --all --strict` sobre a claim
4.1.3 **não é evidência** de que a live region funciona. Foi por isso que não o aceitei como
verificação do G-01. Defeito sistêmico — **cito, não corrijo**.

---

## ✅ PONTOS CONFORMES

- **Estrutura íntegra.** 4 camadas · orquestrador L2→L3→L4 na ordem · wrapper `DssEmptyState.vue`
  re-export puro (sem `<template>`, `<style>` ou lógica) · barrel exportando o wrapper.
- **Composição limpa.** Zero HTML nativo substituível; `DssIcon` importado pelo wrapper
  (`../../DssIcon/DssIcon.vue`), nunca por `1-structure`; zero `:deep()`.
- **Responsabilidade correta.** Nenhum estado de filho capturado por CSS; zero lógica de negócio
  por produto; limites documentados em §2 e §7.
- **Ausência de estados é decisão, não escopo reduzido** — e é verificável: raiz não focável, zero
  regras de interação, `loading`/`error` remetidos ao componente certo por semântica.
- **Neutralidade de marca sustentada sob medição independente** (3 marcas × 2 temas, 33 ícones).
- **Contraste AA folgado nos dois temas**, inclusive no elo mais fraco (descrição secundária).
- **Preview Frame fiel na superfície de API:** exatamente **12 knobs** = 7 props + 5 slots, sem
  knob fantasma nem omissão; SFC real monta; **console limpo**; knob→componente reage em todos os
  casos testados (`size`→padding 48/24px, `variant`→borda tracejada, `ariaLabel`→atributo).
- **Testes honestos.** 22 casos cobrindo render, props, slots, precedência slot↔prop, a11y — e a
  **ausência** de eventos testada explicitamente, de modo que uma emissão futura acidental reprova.
- **Golden Context aplicado sem reinterpretação.** `DssBanner` como baseline, `DssBadge` como
  verificação transversal; nenhum Golden alterado.
- **A auditoria anterior declarou a própria fraqueza** em vez de escondê-la, e registrou a
  correção de uma afirmação falsa sobre marca. Isso é postura correta e merece registro.

---

## 🛠️ RECOMENDAÇÕES (priorizadas)

1. **Resolver o G-01 — decide o selo.** Testar com NVDA/VoiceOver **ou** rebaixar a claim (doc +
   `dss.meta.json` a11y 4.1.3) e documentar o requisito de contêiner `aria-live` persistente em §8.
   Enquanto nenhuma das duas acontecer, o componente fica em `draft`.
2. **Acoplar `ariaLabel` e `announce` (R-02)** — documentar a dependência, no mínimo; idealmente
   emitir um papel válido quando houver rótulo sem anúncio.
3. **Corrigir §4 da doc normativa (R-04)** — declarar `line-height: 1` como exceção. É a única
   afirmação **falsa** que sobrou na documentação; custo de uma linha.
4. **Remover as regras mortas (R-03 + G-03)** — `_plain.scss` inteiro e `forced-color-adjust: auto`.
5. **Registrar as decisões silenciosas (R-06, R-07)** — `<p>` no título e o caso "vários estados
   vazios na mesma tela".
6. **Cobrir `ariaLabel` e o slot `default` nas demos (R-05).**
7. **Abrir itens próprios, fora deste componente**, para R-01 (snippet do Preview Frame, 3
   componentes) e G-02 (âncora `aria`, 32 componentes / 36 claims). **Não corrigir aqui.**

---

## 📊 RESUMO EXECUTIVO

| Métrica | Quantidade |
| --- | --- |
| Não-conformidades bloqueantes | **0** |
| Não-conformidades não-bloqueantes | **0** |
| Gaps abertos | **12** — 7 novos (R-01…R-07) · 5 carregados (G-01, G-02, G-04, G-05, G-06) |
| Gaps do componente · sistêmicos · processo | 7 · 4 · 1 |
| Gates de comando executados | **16 / 16 ✅** |
| Testes unitários | 22 / 22 ✅ |
| Status Final | **🟡** |

**Leitura do 🟡:** o componente é sólido — nenhuma não-conformidade, todos os gates passando,
decisões de design que se sustentam sob medição independente. O amarelo é integralmente devido a
**G-01 não verificado**, e secundariamente à correção de documentação R-04.

---

## Elegibilidade a selo

**Não elegível nesta passagem.** O motivo é único e não é negociável pelo volume de acertos:

> A documentação e o `dss.meta.json` afirmam um comportamento de acessibilidade (WCAG 4.1.3) que
> **nem a auditoria anterior nem esta conseguiram testar**, e cujo ✅ no gate automático se apoia
> numa âncora que, medida, não verifica o que afirma (G-02). Selar aqui seria exatamente o que a
> cadeia de âncoras existe para impedir.

O caminho mais curto para o selo **não** é testar com leitor de tela: é **rebaixar a claim**
(opção (b) da §1.3). O componente não perde nada de real com isso — perde uma afirmação que hoje
não é sustentada por evidência.

---

## Onde discordei da auditoria anterior

Registro exigido pelo `prompt_revisao_independente_v1.0.md` §9.4 — é o sinal de que a revisão foi
de fato independente.

1. **"Regime de exceções: zero, e verdadeiro" (✅ dela) está errado.** Há uma exceção real
   (`line-height: 1`), e a doc afirma que não há. A verificação anterior procurou `px` e hex —
   grep que não alcança valores adimensionais. **R-04.**
2. **O G-03 identificou o caso, não a classe.** Havia mais regra morta do que uma linha: a
   variante `plain` é integralmente no-op, medida por estilo computado. **R-03.**
3. **O gate visual foi dado por cumprido sem exercitar o item do snippet.** Exercitado, ele
   **falha** para `announce`. **R-01.**
4. **A lista de "pontos conformes" não distingue o que foi medido do que foi lido.** Vários ✅
   (paridade API↔doc, tokens do meta) vêm de leitura cruzada de arquivos. Remedi por medição os
   que dependiam de runtime — marca, contraste, estouro, estados — e todos se confirmaram; mas a
   distinção importa para quem for confiar no relatório.
5. **Concordo com o G-02 e o levo adiante:** a âncora não só é fraca, é satisfeita pela substring
   "aria" dentro de `variant` — e alcança 32 componentes / 36 claims.

**Onde a auditoria anterior estava certa e eu confirmei por medição própria:** ausência de NCs;
neutralidade de marca (3×2); ausência justificada de estados; integridade estrutural; e o próprio
G-01 como o item que impede o selo.

---

*Relatório emitido por auditoria independente. Nenhum selo concedido. Nenhum defeito de sistema
corrigido nesta passagem, por determinação do §8 do protocolo de revisão independente.*
