# Revalidação Independente 3 — DssEmptyState (DSS v2.2) · quarta passagem

> **Protocolo:** `prompt_auditoria_v2.5.txt` + `prompt_emissao_selo_conformidade_v2.5.txt`,
> dirigidos por `prompt_revisao_independente_v1.0.md`
> **Carga:** `CARGA_REVALIDACAO_3.md` · **Commit auditado:** `3a388a4` (HEAD `07082a4`)
> **Data:** 2026-08-28 · **Fase:** 1 · **Classificação:** `Visual`
> **Auditor:** Claude Opus 5 — Auditor Independente
> **Relatórios anteriores (meus):** `REAUDIT` · `REVALIDACAO` · `REVALIDACAO_2`

---

## Veredito

**CONFORME — SELO DSS v2.2 CONCEDIDO.**

Zero não-conformidades. As duas NCs bloqueantes das rodadas anteriores estão corrigidas e foram
reverificadas por medição; o inventário de 21 itens se sustentou inteiro; e o quarto passo que a
Carga introduziu — **auditar a demo renderizada**, não só o fonte — é o que fechou o ciclo.

Selo emitido em `docs/Compliance/seals/DssEmptyState/DSSEMPTYSTATE_SELO_v2.2.md`, com **três
ressalvas não-bloqueantes** e nenhuma inventada.

> ⚠️ **Uma pendência operacional, consequência direta da selagem, está aberta e NÃO é do
> componente:** o gate `validate:portal-pages` ficou vermelho porque componente selado exige página
> no portal, e **o gerador que o próprio gate indica como remédio está quebrado**. Detalhe em V-11.

---

## 1. Primeiro: o risco que a Carga mandou verificar antes de tudo

Fechando o V-06, o construtor foi do caso para a classe e tocou **5 componentes já selados**
(`DssFile`, `DssIcon`, `DssInput`, `DssSelect`, `DssTextarea`). A Carga pediu que isso fosse
auditado primeiro. Foi.

**Veredito: o saneamento é seguro.** Verifiquei quatro coisas, nenhuma por relato:

| verificação | resultado |
|---|---|
| A prosa entre parênteses foi **apagada**? | **Não** — foi movida para o corpo do JSDoc (`Ilimitado.`, `Usa 0 por padrão.`, `24px.`, `Herda do contexto.`, `Standalone usa o token de size…`). Nada se perdeu |
| A prosa movida **deslocou** a `description` do contrato? | **Não** — `jsDocFirst()` pega a primeira linha; as descrições originais seguem intactas (`'Tamanho do icone via tokens DSS'`, `'Tabindex customizado'`, …) |
| Os defaults resultantes batem com o **runtime**? | **Sim, todos** — conferidos contra o `withDefaults` de cada SFC: `DssIcon.size` `'md'`, `DssIcon.inline` **boolean `false`** (era string), `maxFiles`/`maxFileSize`/`maxHeight` `undefined`, `tabindex` `null` nos quatro |
| Sobrou algum default corrompido nos 79 contratos? | **Não.** Varredura por espaço/aspa/parêntese devolveu 6 candidatos, todos **valores legítimos** — `'bottom left'`, `'top left'`, `'[0, 0]'` e três `aria-label` reais |

Somado a `validate:api-docs:gate` sem divergência, `emit-contract --all --strict` verde nos 79,
`type-check` limpo e **82/82 testes** (`DssEmptyState` + `DssIcon` + `DssFile`), a mudança
fora de escopo **não introduziu mentira em contrato de componente selado**.

**Correção de contagem:** o commit sanou **10** `@default`, não 9 — a Carga informa 9. Diferença
irrelevante para o mérito, registrada por precisão.

---

## 2. Os três itens que a Carga mandou medir

### 2.1 · A NC do quinto lugar — fechada, medida no **texto renderizado**

Não li o fonte: li o que o navegador mostra.

| | antes (rodada 3) | agora |
|---|---|---|
| título do tile | "Anuncia-se a leitores de tela" | **"Emite role=status e aria-live=polite"** |
| descrição | "…essa troca precisa ser anunciada." | **"Emitir os atributos NÃO garante que o leitor de tela anuncie: região inserida já preenchida não é anunciada de forma confiável. O anúncio exige um contêiner aria-live persistente no consumidor — ver DssEmptyState.md §8.1."** |

Varredura do **texto visível da página inteira**:
- blocos cujo título ou descrição reafirmam o anúncio: **0**
- ocorrências de "precisa ser anunciada" no `innerText`: **0**

### 2.2 · V-07 / R-07 — fechado, e o número da Carga confere

**37 blocos · 3 live regions** — exatamente o previsto. E as três restantes são as certas:

| bloco com `role="status"` | por que mantém |
|---|---|
| "Emite role=status e aria-live=polite" | é o tile que **demonstra** o `announce` |
| "Nenhuma solicitação" (`ariaLabel` + `announce`) | demonstra o rótulo chegando com `role` |
| "Nenhuma solicitação encontrada" (`example.vue` cenário 1) | busca sem resultado — **o que responde à ação do usuário**, exatamente o critério da §7.4 |

O `example.vue` — que vai no pacote e a página chama de "a verdade de uso" — agora pratica a §7.4,
com nota explicando que isoladamente cada cenário manteria o default. Trajetória: **34 → 8 → 3**.

### 2.3 · V-08 — o G-04 registrado, e a pergunta certa respondida

`defineSlots` aparece **4 vezes** no `DEBITO_ABERTO.md`. Fechado.

A Carga pergunta melhor do que "o G-04 está lá": *"qual é o próximo item que está só nas Cargas?"*
Respondo com uma varredura, e **há um** — ver V-09, que é justamente o irmão do G-02.

---

## 3. O sexto lugar

A Carga previu que houvesse um e apontou onde procurar (`example.vue`, README, portal,
`dss.meta.json`). Procurei nesses **e** fora deles. Nenhum dos apontados tem problema:
`tagline`, `category`, `demoContent` e `defaultPreview.props` estão limpos; não há página de portal.

**O sexto lugar está no pré-prompt** — ver **V-10**. É o único artefato que ainda carrega a
formulação anterior ao rebaixamento.

---

## ❌ NÃO-CONFORMIDADES

**Nenhuma não-conformidade encontrada.**

As duas NCs das rodadas anteriores foram corrigidas e reverificadas:

| NC | origem | verificação nesta passagem |
|---|---|---|
| **NC-01** | rodada 2 | `dss.contract.json` → `api.props.announce.description` = *"Emite `role="status"` + `aria-live="polite"` no elemento raiz."* · `types` traz a não-garantia explícita e a dependência do `ariaLabel` · §1 e §7.4 reescritas. **Contrato, tipo e prosa concordam** |
| **NC-02** | rodada 3 | texto **renderizado** do tile reescrito (§2.1) |

---

## ⚠️ GAPS / RISCOS FUTUROS

### V-09 · A âncora `verifiedBy: "test"` é tão vazia quanto a `aria` — e agora é ela que sustenta a claim principal deste componente

**Gravidade:** média · **Escopo:** **sistêmico** · **Achado novo** · não bloqueante

Não estou reabrindo o G-02: é **outra âncora**. `emit-contract.mjs:239-240`:

```js
} else if (c.verifiedBy === 'test') {
  verified = exists(path.join(compDir, `${path.basename(compDir)}.test.js`))
}
```

Verifica que **o arquivo existe**. Nunca que algum teste sustente a claim.

| medição | resultado |
|---|---|
| Claims ancoradas em `test` | **72**, em **72 componentes** — o dobro do alcance da `aria` (35 / 32) |
| Dessas, sem arquivo `.test.js` | **0** — nenhum falso-positivo ativo hoje |

**Por que importa aqui:** o rebaixamento da 4.1.3 moveu a claim de manchete deste componente de uma
âncora vazia (`aria`) para **outra âncora vazia** (`test`). Aplicando a mesma disciplina de escopo
que usei no G-02: *condição presente* (72 de 72 claims não são verificadas pela âncora que
declaram) e *dano hoje* (zero — todos têm o arquivo).

**A substância deste componente está intacta**, e verifiquei: `DssEmptyState.test.js` de fato assere
`role="status"`, `aria-live="polite"` e a remoção de ambos com `announce=false`. A claim é
verdadeira e testada — **o gate é que não é quem a torna verificada**. Registrado na ressalva
RES-SIST-01 do selo. **Cito, não corrijo.**

### V-10 · O sexto lugar: o pré-prompt mantém a claim retratada e a âncora antiga

**Gravidade:** baixa (produto) / média (para o próximo da família) · **Achado novo** · não bloqueante

`docs/governance/pre-prompts/pre_prompt_dss_empty_state.md`:

| linha | conteúdo |
|---|---|
| 241 | `| **4.1.3** Mensagens de status | AA | role="status" + aria-live="polite" quando announce | `**`aria`**` |` — âncora anterior; o componente moveu para `test` |
| 249 | "…e **essa troca precisa ser anunciada** a quem usa leitor de tela." — a frase retratada |

A nota de procedência no topo do arquivo cobre o fato de ser **retroativo** (G-05), não o
rebaixamento da 4.1.3.

**Por que é gap e não NC — critério do próprio protocolo.** O `prompt_auditoria_v2.5.txt`, Gate G,
diz textualmente que cobertura incompleta de pré-prompt é *"Gap documentável (**não bloqueante para
o componente**, mas bloqueante para o próximo componente da mesma família)"*. Não precisei arbitrar:
a régua já existia. E o pré-prompt é registro de intenção em ponto no tempo — a correção adequada é
**anotar**, não reescrever o histórico.

Registrado na ressalva RES-PROC-01 do selo.

### V-11 · O gate `validate:portal-pages` ficou vermelho, e o remédio que ele indica está quebrado

**Gravidade:** média (operacional) · **Escopo:** **sistêmico** · **Achado novo** · não é do componente

Selar aciona uma obrigação nova: componente selado precisa de página no portal. O gate falhou,
corretamente:

```
❌ SELADO SEM PÁGINA (1):  - DssEmptyState
   Gere as páginas faltantes: npm run portal:sync-docs
```

**Mas o remédio não roda:**

```
scripts/generate-portal-landing-pages.js:22
const fs = require('fs')
ReferenceError: require is not defined in ES module scope
```

O script é CommonJS; o `package.json` declara `"type": "module"`, e a extensão `.js` faz o Node
tratá-lo como ESM. **A quebra é pré-existente** — o script não é tocado desde 2026-06-01 e
simplesmente não havia selo novo que precisasse dele.

**Correção (uma linha):** renomear para `generate-portal-landing-pages.cjs` e ajustar o script
`portal:sync-docs` no `package.json`. Verifiquei que o gerador só escreve as páginas **faltantes**
(`missing.forEach`) e atualiza o `App.tsx`, então rodá-lo depois da correção produzirá apenas
`DssEmptyStatePage.tsx` e a rota — sem tocar nas outras 88.

**Por que não corrigi:** é defeito de sistema de passagem (§8) e infraestrutura compartilhada.
Contorná-lo com uma cópia `.cjs` temporária satisfaria o gate e **esconderia a quebra** — o próximo
componente selado bateria na mesma parede. O vermelho aqui é um sinal verdadeiro e deve ser
resolvido na origem.

### Ressalvas do selo — as três sustentadas, nenhuma inventada

| id no selo | conteúdo |
|---|---|
| **RES-A11Y-01** | Claim 4.1.3 rebaixada, sem teste de tecnologia assistiva (quatro passagens, nenhuma com leitor de tela) |
| **RES-PROC-01** | Pré-prompt retroativo — incluindo o sexto lugar (V-10) |
| **RES-SIST-01** | Dependências sistêmicas declaradas: âncora `aria` (G-02), **âncora `test` (V-09)**, `defineSlots` (G-04), `.bg-*` e `--dss-surface-*` (G-06), gate cego ao `@forward` |

---

## ✅ PONTOS CONFORMES

### Gates de comando — 12/12, mais contrato e MCP

`validate:structure:gate` · `validate:scss-tokens:gate` · `validate:api-docs:gate` ·
`validate:sfc-hygiene:gate` · `validate:variant-naming:gate` · `validate:demo-registry` ·
`validate:sandbox-tags` · `validate:barrel-ext` · `catalog:validate` · `validate:type-check` ·
`emit-contract --all --strict` (79 componentes, 0 âncora reprovada, **sem aviso de `sealPath`** após
a emissão) · MCP `validate_component_code` (`compliant`).

`validate:portal-pages` passou **antes** da selagem e ficou vermelho **por causa dela** — ver V-11.

**Testes: 82/82** (`DssEmptyState` 22, mais `DssIcon` e `DssFile`, os selados que o saneamento tocou).

### Gate visual — LIGHT e DARK

| verificação | LIGHT | DARK |
|---|---|---|
| Contraste título | **9,59:1** ✅ | **13,88:1** ✅ |
| Contraste descrição (elo mais fraco) | **4,74:1** ✅ | **10,21:1** ✅ |
| Contraste ícone (limiar 3,0) | **4,74:1** ✅ | **10,21:1** ✅ |
| Neutralidade de marca | 34 ícones, **1 cor** | 34 ícones, **1 cor** |
| Knobs = props + slots | **12** = 7 + 5 | idem |
| SFC real monta · console limpo | ✅ | ✅ |
| Knob reage e snippet reflete | `lg` → padding 48px 24px; `:announce="false"` coerente com o DOM | ✅ |
| Estouro em célula de 200px · overflow do documento | nenhum | — |

### Inventário de 21 itens — todos com situação verificada

As duas NCs corrigidas; `G-01` rebaixada com honestidade; `G-03`, `R-01`…`R-07`, `V-01`…`V-08`
fechados e reverificados ao longo das quatro passagens; `G-02`, `G-04`, `G-05`, `G-06` abertos por
decisão e **todos citados no `DEBITO_ABERTO.md`**.

### Qualidade do trabalho de correção

Quatro rodadas, e a curva foi consistentemente para cima: a correção da NC-01 foi feita **na origem**
(o `types`, dono do eixo) e não na prosa; a regressão que a própria correção anterior causou foi
consertada com o comentário explicando o porquê; e o fechamento do V-06 foi do caso para a classe
**preservando a informação** que a prosa carregava, em vez de apagá-la. É o que tornou esta
passagem barata.

---

## 🛠️ RECOMENDAÇÕES (priorizadas)

1. **V-11 — corrigir `generate-portal-landing-pages.js` → `.cjs`** e rodar `portal:sync-docs`. É o
   que devolve o `validate:portal-pages` ao verde. Bloqueia a rotina de selagem, não este componente.
2. **V-10 — anotar o pré-prompt** com o rebaixamento da 4.1.3 (âncora `aria` → `test`) **antes** do
   próximo componente da família, conforme o Gate G.
3. **V-09 — abrir item próprio** para a âncora `test` no `DEBITO_ABERTO`, ao lado do G-02. São o
   mesmo defeito em duas âncoras; juntos alcançam 107 claims.
4. Nada mais. Os demais abertos são sistêmicos declarados e seguem citados.

---

## 📊 RESUMO EXECUTIVO

| Métrica | Quantidade |
| --- | --- |
| Não-conformidades | **0** |
| Gaps abertos | **7** — 3 novos (V-09, V-10, V-11) · 4 carregados (G-02, G-04, G-05, G-06) |
| Itens do inventário verificados | **21 de 21** |
| Gates de comando | **12 / 12 ✅** (+ contrato + MCP) |
| Testes | **82 / 82 ✅** |
| Gate visual (LIGHT + DARK) | ✅ integral |
| Status Final | **✅ CONFORME — SELO CONCEDIDO** |

---

## Sobre a fronteira do selo — a decisão de governança que a Carga pediu que eu registrasse

Na rodada 3 classifiquei texto de sandbox como bloqueante e disse que, se a governança entendesse
o contrário, seria decisão legítima. A Carga pede minha opinião firme, como insumo. Ela é:

**A fronteira deve ser traçada pelo que o artefato afirma, não por onde ele mora.**

- Uma demo que **não cobre** parte da API é **gap** — foi assim que tratei o R-05, e mantenho.
- Uma demo que **afirma algo falso** sobre o componente é **bloqueante**, mesmo fora do pacote,
  porque a superfície de descoberta é onde a crença se forma. Um consumidor não sabe que
  `apps/sandbox` não é `packages/core`; ele lê a tela e implementa.

O critério prático que proponho: **se o texto pode ser lido como uma afirmação sobre o
comportamento do componente, ele está no alcance do selo — em qualquer arquivo.** Copy que descreve
o próprio tile, título de seção, nota de rodapé: dentro. Andaimes de layout, nomes de variável,
comentários de implementação: fora.

Isso não infla o escopo: nas quatro rodadas, exatamente **uma** ocorrência de sandbox cruzou essa
linha, e foram duas strings.

---

## Onde discordei — quarta passagem

1. **Da Carga, no número do saneamento:** foram **10** `@default` corrigidos, não 9.
2. **Da Carga, sobre onde estaria o sexto lugar:** ela apontou `example.vue`, README, portal e
   `dss.meta.json`; todos limpos. O sexto lugar está no **pré-prompt** (V-10).
3. **Do enquadramento do V-06 como "fechado e pronto":** fechado sim, mas a correção **criou uma
   obrigação nova que ninguém tinha como cumprir** — o gate de portal (V-11). Não é culpa do
   saneamento; é a selagem que revelou uma quebra pré-existente.
4. **De mim mesmo, por antecipação:** ao conceder o selo, verifiquei que não estava cedendo por
   cansaço de quatro rodadas. O teste que apliquei: *existe alguma afirmação falsa em algum
   artefato?* Não existe — medi contrato, tipo, prosa e tela. Os itens remanescentes ou são
   explicitamente não-bloqueantes pela régua do protocolo (V-10), ou são sistêmicos declarados
   (V-09), ou não são do componente (V-11).

---

*Revalidação independente, quarta passagem. Selo concedido. Nenhum defeito de sistema corrigido,
por determinação do §8 do protocolo.*
