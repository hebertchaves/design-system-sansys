# Revalidação Independente 2 — DssEmptyState (DSS v2.2) · terceira passagem

> **Protocolo:** `prompt_auditoria_v2.5.txt`, dirigido por `prompt_revisao_independente_v1.0.md`
> **Carga:** `CARGA_REVALIDACAO_2.md` · **Commit auditado:** `e3839b5` (HEAD `ccca62d`)
> **Data:** 2026-08-28 · **Fase:** 1 · **Classificação:** `Visual` · **Status:** `draft`
> **Golden Context:** `DssBanner` · **Golden Reference:** `DssBadge`
> **Auditor:** Claude Opus 5 — Auditor Independente
> **Relatórios anteriores (meus):** `DSSEMPTYSTATE_REAUDIT_v2.2.md` · `DSSEMPTYSTATE_REVALIDACAO_v2.2.md`

---

## Veredito

**NÃO CONFORME — 1 NC bloqueante, estreita. Selo não concedido.**

A **NC-01 está genuinamente fechada**: contrato, `types` e prosa concordam, e eu comecei por onde a
Carga mandou — o derivado, não a prosa. Os 18 itens do inventário se sustentaram sob medição.

Mas a Carga pediu que eu procurasse **o quinto lugar**, "porque as duas rodadas anteriores mostraram
que sempre havia mais um". Havia. A afirmação retratada da 4.1.3 continua sendo **renderizada como
conteúdo** no Playground — no tile de acessibilidade, dentro de um `role="status"`.

É a correção mais barata das três rodadas: **duas strings, um arquivo.**

---

## Resposta direta aos três itens que a Carga mandou medir

### 1. NC-01 — a retratação chegou ao fim da cadeia? **Chegou. E há um quinto lugar.**

Ordem seguida: contrato → `types` → prosa.

| nível | conteúdo medido | veredito |
|---|---|---|
| `dss.contract.json` → `api.props.announce.description` | *"Emite `role="status"` + `aria-live="polite"` no elemento raiz."* | ✅ sem promessa |
| `types/empty-state.types.ts` (dono do eixo `api`) | *"Emite… **NÃO garante** que o leitor de tela anuncie… mantenha um contêiner `aria-live` PERSISTENTE… Só tem efeito sobre `ariaLabel` quando `true`."* | ✅ e mais completo que antes |
| `DssEmptyState.md` §1 (linha 29) | *"**Emite** `role="status"`… **Emitir ≠ ser anunciado**: ver §8.1"* | ✅ |
| `DssEmptyState.md` §7.4 | *"**Mas emitir os atributos não é o mesmo que ser anunciado**"* | ✅ |
| comentário do SFC | reescrito | ✅ |
| `README.md` · `DSSEMPTYSTATE_API.md` | consistentes | ✅ |

**Os três artefatos autoritativos concordam. A NC-01 está fechada.** → **NC-02 abaixo.**

### 2. V-02 — a regressão está corrigida nas duas pontas? **Sim, e ampliei.**

Fix medido: `v === (k.default ?? false)`. Verifiquei as duas pontas **e** estendi para além do que a
Carga pediu — quatro componentes, cobrindo as duas classes:

| componente | classe | medição | veredito |
|---|---|---|---|
| **DssChip** | boolean sem `@default` | repouso → **0** `:prop="false"` (antes: 7) | ✅ |
| **DssUploader** | idem (era 1 dos 6 afetados) | repouso → `<DssUploader />`, **0** bindings | ✅ |
| **DssEmptyState** | `@default true` | `announce` on → sem `announce` no snippet · off → `:announce="false"` **e** DOM sem `role` | ✅ |
| **DssMultiselectAutocomplete** | `@default true` | repouso → **0** bindings · `chipsRemovable` off → `:chipsRemovable="false"` | ✅ |

**As duas pontas coexistem.** O terceiro `@default true` do sistema (`DssBtnDropdown.closeOnEsc`) não
tem Preview Frame; a lógica é a mesma dos dois medidos.

**Um resíduo, latente (V-06 abaixo):** existe **um** caso que `?? false` não cobre —
`DssIcon.inline`, cujo contrato traz `default` como **string**.

### 3. R-07 / V-04 — coberto? **Na doc sim; na página, parcialmente. 8, não 3.**

- **Doc:** §7.4 ganhou o parágrafo — *"mantenha `announce` apenas naquele que responde à ação do
  usuário… num dashboard com múltiplos painéis vazios, o resto deve usar `:announce="false"`"*. ✅
- **Playground:** pratica — **18 de 21** com `:announce="false"`, exatamente como reportado. ✅
- **Medição da página:** live regions caíram de **34 → 8**. A Carga previa **3**.

A diferença não é erro de medida: a página renderiza **também** o `DssEmptyState.example.vue`, e
**ele não foi atualizado** (V-07 abaixo).

| arquivo | instâncias | com `:announce="false"` | live regions |
|---|---|---|---|
| `TestDssEmptyState.vue` | 21 | 18 | **3** ✅ |
| `DssEmptyState.example.vue` | 7 | 1 | **6** ❌ |

---

## ❌ NÃO-CONFORMIDADES

### NC-02 · O quinto lugar: o Playground **renderiza** a claim retratada, dentro de um `role="status"`

**Gravidade: BLOQUEANTE (estreita)** · **Escopo:** superfície de demonstração ·
**Referência:** `prompt_auditoria_v2.5.txt` §E (documentação que promete o que o componente não
entrega) · `CLAUDE.md` Constituição #6.

`apps/sandbox/src/TestDssEmptyState.vue:104-105`, seção **"Estados & Acessibilidade"**:

```vue
<DssEmptyState icon="check_circle" title="Anuncia-se a leitores de tela"
  description="O caso dominante é o vazio SUBSTITUIR um resultado após busca ou filtro
               — essa troca precisa ser anunciada." />
```

Contra o que a doc normativa do mesmo componente afirma, em `DssEmptyState.md` §7.4:

> **"Mas emitir os atributos não é o mesmo que ser anunciado"** — a condição de confiabilidade está
> em §8.1, e nenhuma das duas auditorias conseguiu testá-la com leitor de tela.

É a **frase original retratada, palavra por palavra** — "essa troca precisa ser anunciada" —
sobrevivendo como **conteúdo renderizado**, não como comentário. E há uma ironia operacional: este é
um dos **3 tiles que mantêm `announce` ligado**, então a afirmação falsa está dentro de uma live
region.

**Por que classifico como bloqueante — e onde admito que é julgamento.** O Playground vive em
`apps/sandbox`, fora do pacote do componente, e no meu próprio critério das rodadas anteriores
*"contrato = bloqueante, demo = gap"*. Mantenho esse critério para **cobertura** de demo (foi assim
que tratei o R-05). Mas aqui não é cobertura ausente: é **afirmação falsa sobre a propriedade de
acessibilidade que define este componente**, na superfície onde as pessoas efetivamente o conhecem.
Quem lê o tile conclui que pode contar com o `announce` sozinho — exatamente a crença que três
rodadas de revisão trabalharam para remover — e envia um estado vazio que não anuncia.

Selar enquanto a superfície mais visitada reafirma a claim esvaziaria o próprio exercício.

> **Ressalva de escopo, honesta:** se a governança decidir que texto de sandbox está **fora** do
> alcance do selo, é decisão legítima e não vou disputá-la — **e nesse caso o componente está
> pronto**, porque tudo o mais que medi está limpo. Reporto o que medi; o recorte é de quem governa.

**Correção:** reescrever `title` e `description` do tile no registro da §7.4 (ex.: *"Emite
`role=status` + `aria-live=polite`"* / *"Emitir os atributos não garante o anúncio — ver §8.1"*).
**Duas strings, um arquivo.**

---

## ⚠️ GAPS / RISCOS FUTUROS

### V-06 · `DssIcon.inline` tem `@default` malformado — o único caso que `?? false` não cobre

**Gravidade:** baixa · **Escopo:** sistêmico, **latente** · **Achado novo**

Varri o tipo do `default` das **286** props boolean de todos os contratos:

| tipo do `default` | quantidade | consequência |
|---|---|---|
| `bool` | 144 | coberto ✅ |
| ausente (`undefined`) | 141 | coberto pelo `?? false` ✅ |
| **`str`** | **1** | **vaza** ❌ |

O caso é `DssIcon.inline`, cujo JSDoc traz prosa dentro da tag:

```ts
/** @default false (standalone usa o token de size) */
inline?: boolean
```

O contrato guarda `default: "false (standalone usa o token de size)"`, e
`false === "false (standalone…)"` é falso — o snippet emitiria `:inline="false"` em repouso.

**Latente, não ativo:** `DssIcon` não tem Preview Frame. E a causa-raiz **não é o `PreviewFrame.vue`**
— é o `@default` malformado no `types` do DssIcon. Corrigir lá resolve na origem e melhora o contrato.
**Cito, não corrijo** (§8).

### V-07 · O `example.vue` não pratica a §7.4 — e é ele que a página chama de "a verdade de uso"

**Gravidade:** baixa · **Escopo:** este componente · **Achado novo**

O `DssEmptyState.example.vue` **não foi tocado** no `e3839b5`: 6 das 7 instâncias mantêm o
`announce` default, produzindo 6 live regions. É a diferença entre as **3** previstas e as **8**
medidas.

Importa mais do que o número porque o próprio Playground o apresenta assim:

> *"Arquivo `DssEmptyState.example.vue` — **a verdade de uso do componente**, renderizado aqui como
> está no pacote."*

O `example.vue` **é distribuído no pacote**; o Playground não. Hoje a §7.4 recomenda uma prática que
o artefato canônico de uso não segue.

**Contra-argumento que reconheço:** os 7 cenários do `example.vue` são *independentes* — cada um
ilustra um uso isolado, e nesse enquadramento o default é legítimo. A §7.4 fala de "vários estados
vazios **na mesma tela**", que é o que acontece só quando renderizados juntos. Por isso é gap e não
NC. Mas o efeito medido na página é real.

### V-08 · O `G-04` não está no `DEBITO_ABERTO` — a mesma fuga que a Carga foi escrita para impedir

**Gravidade:** média (processo) · **Escopo:** governança · **Achado novo**

A Carga afirma, sobre os itens abertos: *"Todos no `docs/governance/DEBITO_ABERTO.md`"*. Verifiquei
um a um:

| item | no `DEBITO_ABERTO`? |
|---|---|
| **G-02** — âncora `verifiedBy:"aria"` | ✅ citado (3 ocorrências) |
| **G-06a** — `.bg-*` fura a camada semântica | ✅ citado (🔴, com a medição das 3 marcas) |
| **G-06b** — `--dss-surface-*` invertida no dark | ✅ citado (🟡, com a tabela de valores) |
| gate estrutural que não vê o `@forward` | ✅ citado |
| **G-05** — pré-prompt retroativo | ➖ ausente do ledger, mas **declarado na nota de procedência do próprio pré-prompt** — aceitável: nada a corrigir |
| **G-04** — slots sem `defineSlots` | ❌ **ausente** — `grep -rin "defineSlots" docs/governance/ docs/reference/` só acha um erro de TS não relacionado num relatório de baseline |

O G-04 é sistêmico e não trivial: **37 de 57 componentes base**, incluindo os dois goldens deste
componente. Está declarado aberto há três rodadas e **não está em lugar nenhum do controle**.

É exatamente a falha que a Carga descreve na abertura — *"esta tabela existe porque o G-03 caiu do
controle"*. O mecanismo continua vazando; só mudou o item.

### Abertos por decisão — confirmados citados, não consertados

`G-02` (âncora) · `G-04` (`defineSlots`, **com a ressalva do V-08**) · `G-05` (pré-prompt
retroativo) · `G-06` (`.bg-*` e `--dss-surface-*`) · gate estrutural que não vê o `@forward`.

**G-02:** não reabri a discussão do número, conforme instruído. Os dois escopos ficam registrados
como acordados (35 claims / 32 componentes usam âncora que não checa o atributo — presente; 0
dependem do acidente de substring — latente). Nenhuma consequência nova encontrada nesta passagem.

---

## ✅ PONTOS CONFORMES

### Inventário de 19 itens — verificado item a item

| id | declarado | **verificado por mim** |
|---|---|---|
| **NC-01** | fechada | ✅ contrato + `types` + prosa concordam |
| **G-01** | rebaixada a requisito de uso | ✅ §8.1 honesta, `verifiedBy: test` sustentado pelo `.test.js` |
| **G-03** | fechado | ✅ `forced-color-adjust: auto` removido |
| **R-01** | fechado | ✅ remedido byte a byte |
| **R-02** | fechado | ✅ §8.2 precisa, inclusive a ressalva do axe |
| **R-03** | fechado | ✅ `_plain.scss` sem declaração, computado idêntico a `div` |
| **R-04** | fechado | ✅ e **nenhuma exceção nova**: `%`, `em`, `rem`, `calc()`, `vh/vw`, `ch`, `!important` → 0 |
| **R-05** | fechado | ✅ `ariaLabel` nas 2 configurações + slot `default` |
| **R-06** | fechado | ✅ §7.5 argumentada; markup segue `<p>`, como declarado |
| **R-07 ≡ V-04** | fechado | 🟡 doc ✅ · Playground ✅ (18/21) · `example.vue` ❌ (V-07) |
| **V-01** | fechado | ✅ ambas as no-op removidas, com o comentário explicativo mantido |
| **V-02** | fechado | ✅ verificado em **4** componentes, duas pontas (resíduo V-06) |
| **V-03** | fechado | ✅ §4 lista `{1,2,3,4,6,8,12,96,120}` e o README ganhou linha própria — **bate exatamente com o SCSS** |
| **V-05** | fechado | ✅ Playground usa `ariaLabel` |
| **G-02 · G-04 · G-05 · G-06** | abertos | ✅ seguem abertos e citados (ressalva V-08) |

> **Correção de um erro meu:** na revalidação anterior apontei o `--dss-spacing-1` (V-03) como
> ausente também do README. Estava certo então, mas meu `grep -c "dss-spacing-1\b"` desta vez
> retornou 0 para a §4 **porque a âncora `\b` não casa dentro de `{1,2,3,…}`** — a doc estava
> correta e eu quase reportei um falso positivo. Confirmei comparando os conjuntos.

### Gates de comando — 14/14 nesta passagem

`validate:structure:gate` · `validate:scss-tokens:gate` · `validate:api-docs:gate` ·
`validate:sfc-hygiene:gate` · `validate:variant-naming:gate` · `validate:demo-registry` ·
`validate:sandbox-tags` · `validate:portal-pages` · `validate:barrel-ext` · `catalog:validate` ·
`validate:type-check` · `emit-contract --all --strict` (79 componentes, 0 âncora reprovada) ·
MCP `validate_component_code` (`compliant`) · **`vitest` 22/22**.

### Gate visual — LIGHT e DARK

| verificação | LIGHT | DARK |
|---|---|---|
| Contraste título | **9,59:1** ✅ | **13,88:1** ✅ |
| Contraste descrição (elo mais fraco) | **4,74:1** ✅ | **10,21:1** ✅ |
| Contraste ícone (limiar 3,0) | **4,74:1** ✅ | **10,21:1** ✅ |
| Neutralidade de marca | 34 ícones, **1 cor** | 34 ícones, **1 cor** |
| Knobs = props + slots | **12** = 7 + 5 | idem |
| SFC real monta · console limpo | ✅ | ✅ |
| Snippet coerente com o DOM | ✅ | ✅ |
| Estouro em célula de 200px · overflow do documento | nenhum | — |

- **Arquitetura, composição e responsabilidade** reconferidas: 4 camadas · orquestrador L2→L3→L4 ·
  wrapper re-export puro · barrel · zero HTML nativo substituível · `DssIcon` pelo wrapper · zero
  `:deep()` · nenhum estado de filho capturado · sem lógica de negócio.
- **A qualidade do trabalho de correção subiu a cada rodada.** O `e3839b5` corrige a NC-01 **na
  origem** (o `types`, dono do eixo) em vez de na prosa, re-emite o contrato, e conserta a regressão
  que a própria correção anterior causou — com o comentário no código explicando o porquê, incluindo
  os números que eu havia medido. É o padrão que torna uma revisão independente barata.

---

## 🛠️ RECOMENDAÇÕES (priorizadas)

1. **Fechar a NC-02** — reescrever `title` e `description` do tile em
   `TestDssEmptyState.vue:104-105`. É o único item entre este componente e o selo.
2. **V-07** — decidir sobre o `example.vue`: ou aplicar `:announce="false"` nos cenários que não
   demonstram o `announce`, ou registrar em §7.4 por que os cenários independentes mantêm o default.
3. **V-08** — inscrever o **G-04** no `DEBITO_ABERTO`. O ledger é o mecanismo; um item aberto há três
   rodadas fora dele é o mesmo defeito do G-03, com outro nome.
4. **V-06** — corrigir o `@default` de `DssIcon.inline` no `types` (a prosa sai da tag). Resolve na
   origem e limpa o contrato. Item próprio, fora deste componente.
5. **Nada mais.** Os demais abertos são sistêmicos declarados e seguem citados.

---

## 📊 RESUMO EXECUTIVO

| Métrica | Quantidade |
| --- | --- |
| Não-conformidades **bloqueantes** | **1** (NC-02) |
| Não-conformidades não-bloqueantes | 0 |
| Gaps abertos | **7** — 3 novos (V-06, V-07, V-08) · 4 carregados (G-02, G-04, G-05, G-06) |
| Itens do inventário fechados e **reverificados** | **14 de 14** declarados fechados |
| Gates de comando | **14 / 14 ✅** |
| Testes unitários | **22 / 22 ✅** |
| Gate visual (LIGHT + DARK) | ✅ integral |
| Status Final | **🟡** |

**Leitura do 🟡 (e não 🔴):** ao contrário da rodada anterior, **nenhum artefato normativo do
componente contém afirmação falsa**. O contrato — que a Carga corretamente mandou auditar primeiro —
está limpo. O bloqueio é uma linha de texto numa superfície de demonstração, e é o item mais barato
que este componente já teve.

---

## Elegibilidade a selo

**Não elegível nesta passagem**, por NC-02.

**Elegível assim que as duas strings forem corrigidas** — e afirmo isso com mais base que na rodada
anterior, porque desta vez auditei na ordem certa (derivado → tipo → prosa) e o inventário inteiro
se sustentou.

Quando o selo for emitido, as **ressalvas não-bloqueantes** que sustento são exatamente três:

1. **Claim 4.1.3 rebaixada, sem teste de tecnologia assistiva** — três passagens tentaram; nenhuma
   tinha leitor de tela. O componente afirma apenas a emissão dos atributos.
2. **Pré-prompt retroativo** (G-05) — escrito depois do código, declarado no próprio artefato.
3. **Dependências sistêmicas declaradas** — G-02 (âncora `aria`), G-04 (`defineSlots`), G-06
   (`.bg-*` e `--dss-surface-*`), gate estrutural cego ao `@forward`.

Não sustento nenhuma ressalva além dessas.

---

## Onde discordei — terceira passagem

1. **Da Carga, no número do R-07:** ela prevê 3 live regions; medi **8**. Não é erro de contagem
   dela sobre o Playground (18/21 confere) — é que o `example.vue` também renderiza na página e não
   foi atualizado. **V-07.**
2. **Da Carga, sobre o rastreamento:** *"Todos no `DEBITO_ABERTO.md`"* não se sustenta para o
   **G-04**. **V-08.**
3. **Do escopo do V-02:** medi um resíduo que o fix não cobre (`DssIcon.inline`), e reatribuí a
   causa — o defeito é do `@default` no `types` do DssIcon, não do `PreviewFrame.vue`. **V-06.**
4. **De mim mesmo:** quase reportei o `--dss-spacing-1` como ainda ausente da §4. Era falha da
   âncora `\b` no meu grep contra a notação `{1,2,3,…}`. Verifiquei por comparação de conjuntos
   antes de escrever — registro porque a lição vale para as próximas passagens: **grep que não
   acha não é ausência**.
5. **Onde reconheço julgamento discutível:** classificar a NC-02 como bloqueante, sendo texto de
   sandbox. Explicitei o critério e a ressalva de escopo na própria NC.

---

*Revalidação independente, terceira passagem. Nenhum selo concedido. Nenhum defeito de sistema
corrigido, por determinação do §8 do protocolo.*
