# CARGA — DssEmptyState · **REVALIDAÇÃO 3 (quarta passagem)**

> Enviar junto com o corpo do `docs/governance/prompt_revisao_independente_v1.0.md`
> (seção "✂️ PROMPT — copiar daqui para baixo").
>
> **Fase do `record_audit_event`: `"revalidation"`.**

| Campo | Valor |
|---|---|
| Componente | `DssEmptyState` |
| Fase | **1** · Classificação: **Visual** · Status: **draft** |
| Golden Context | `DssBanner` · Golden Reference: `DssBadge` |
| Superfície da API | **7** props · **5** slots · **0** eventos *(inalterada em 4 rodadas)* |
| Dependências DSS internas | **`DssIcon`** (única) |
| Ambiente de teste visual | <http://localhost:5173> — **no ar, não subir outro** |
| Seus relatórios | `REAUDIT` · `REVALIDACAO` · `REVALIDACAO_2` (todos versionados) |
| Commit a auditar | **`3a388a4`** |

**Ordem de verificação:** contrato → `types` → prosa → **demo renderizada**. O quarto passo é
novo: a NC da rodada passada estava no texto que a demo *exibe*, e as três rodadas anteriores
nunca olharam para lá.

---

## ⚠️ O maior risco desta rodada: escopo que saiu do componente

Fechando o **V-06**, o construtor foi do **caso** (que você achou) para a **classe** — e a classe
alcança **5 componentes fora do DssEmptyState**.

Você achou: `DssIcon.inline` com `@default false (standalone usa o token de size)` — prosa dentro
da tag, o único **booleano** afetado.

Ele mediu a classe: **9 ocorrências em 5 componentes**, com o contrato publicando defaults
corrompidos:

| era | virou |
|---|---|
| `DssIcon.size = "md' (24px)"` *(aspa de abertura comida pelo parser)* | `'md'` |
| `DssFile.maxFiles = 'undefined (ilimitado)'` | `undefined` |
| `DssIcon.inline` = string | `false` (boolean) |

**Componentes tocados fora do escopo:** `DssFile` · `DssIcon` · `DssInput` · `DssSelect` ·
`DssTextarea`. Todos da **família de campos**, que já é selada.

**Verifique isso primeiro.** É mudança só de docstring, sem efeito de runtime — mas foi feita por
quem estava auditando outro componente, e toca contrato de componente já selado. Se um `@default`
ficou errado no saneamento, o contrato de um componente selado passa a mentir de outra forma.

Ele reporta: `contracts:gate` verde nos 79, `validate:api-docs:gate` sem divergência,
`type-check` limpo, 82/82 testes (EmptyState, Icon, File).

---

## Inventário — 21 itens distintos, quatro rodadas

> **`V-04` ≡ `R-07`** — mesmo item renumerado. Não são dois.

| id | assunto | situação |
|---|---|---|
| **NC (5º lugar)** | claim retratada **renderizada** em `TestDssEmptyState.vue:104-105` | **fechada** — título e descrição reescritos |
| **G-01** | live region inserida com o conteúdo | rebaixada a requisito de uso (§8.1) |
| **G-02** | âncora `verifiedBy:"aria"` não checa o atributo | **aberto · sistêmico** — encerrado como divergência, não reabrir |
| **G-03** | `forced-color-adjust: auto` no-op | fechado (via V-01) |
| **G-04** | slots sem `defineSlots` | **aberto · sistêmico** — agora **registrado** no `DEBITO_ABERTO` (V-08) |
| **G-05** | pré-prompt retroativo | aberto · processo |
| **G-06** | `.bg-*` primitivo · `--dss-surface-*` invertida no dark | abertos · sistêmicos |
| **R-01** | snippet não refletia `announce=false` | fechado (gerou o V-02, também fechado) |
| **R-02** · **R-03** · **R-04** · **R-05** · **R-06** | ver rodadas anteriores | fechados e reverificados por você |
| **R-07** ≡ **V-04** | muitas live regions na mesma tela | **fechado** — ver abaixo |
| **V-01** · **V-03** · **V-05** | regras mortas · `--dss-spacing-1` · grafia | fechados e reverificados por você |
| **V-02** | regressão do fix do R-01 | fechado — você ampliou para 4 componentes |
| **V-06** | `@default` malformado | **fechado, ampliado para 9 em 5 componentes** — ver acima |
| **V-07** | `example.vue` não praticava a §7.4 | **fechado** — ver abaixo |
| **V-08** | `G-04` fora do `DEBITO_ABERTO` | **fechado** — registrado, com a lição no verbete |

---

## Os três a medir

### 1. A NC do quinto lugar

`TestDssEmptyState.vue` — o tile de `announce` agora traz
`title="Emite role=status e aria-live=polite"` e uma descrição que afirma a **não-garantia**.

**Meça o texto renderizado**, não o fonte. E **procure o sexto lugar**: quatro rodadas, cinco
lugares encontrados, um por rodada. O padrão sugere que a busca por superfície ainda não se
esgotou — `.example.vue`, README, portal, `dss.meta.json` (`tagline`, `demoContent`,
`defaultPreview.props`).

### 2. V-07 / R-07 — o `example.vue`, que vai no pacote

Era ele que explicava a diferença entre as 3 live regions previstas e as 8 que você mediu: 6 das 7
instâncias mantinham o default, e ele **não tinha sido tocado** em nenhuma rodada.

Agora pratica a §7.4 — `announce` só no cenário 1 (busca sem resultado, o que responde à ação do
usuário), com nota dizendo que isoladamente cada cenário manteria o default.

**Medido pelo construtor: 37 blocos, 3 live regions.** Confirme.

### 3. V-08 — o G-04 registrado

Está em `docs/governance/DEBITO_ABERTO.md`, com a lição escrita dentro do verbete: *"citar numa
Carga não é registrar"*.

**Verifique os outros do mesmo tipo.** Você conferiu G-02, `.bg-*`, `--dss-surface-*` e o gate do
`@forward`. Falta alguém? A pergunta certa não é "o G-04 está lá" — é **"qual é o próximo item que
está só nas Cargas"**.

---

## Uma decisão de governança pendente — não sua, mas declare como a leu

Você classificou o texto de sandbox como **bloqueante** e escreveu que, se a governança entender
que texto de sandbox está fora do alcance do selo, é decisão legítima.

O construtor corrigiu de qualquer modo, então a NC não está de pé. **Mas a fronteira segue
indefinida** e vai voltar no próximo componente. Se tiver opinião firme sobre onde ela deve cair,
registre no relatório — vira insumo para a decisão, não para esta selagem.

---

## Se estiver conforme

As três ressalvas que você sustentou na rodada passada — **claim 4.1.3 rebaixada sem teste de AT**,
**pré-prompt retroativo**, **dependências sistêmicas declaradas** — devem constar do selo. Não
invente ressalvas além das que sustentar, e não omita essas três.

Caminho no §7 do prompt: template literal · `docs/Compliance/seals/DssEmptyState/DSSEMPTYSTATE_SELO_v2.2.md` ·
linha **"Dependências DSS Internas" → `DssIcon`** · 7 pilares em PASS/CONFORME sem score ·
declaração explícita do Gate Estrutural · as **duas correções de caminho** (`DSS_FASE2_TODO.md` e
`DSS_FASEAMENTO_COMPONENTES.md` vivem em `docs/reference/`).

Depois: `record_audit_event` com `phase:"seal-granted"`, `node scripts/build-catalog.cjs` e
`npm run catalog:validate` (esperado: **0 contradições status↔selo**).

---

## Lembretes operacionais

- **Nunca `git add -A`** — mais de um agente nesta árvore.
- **WSL2/vitest:** ~60s com `environment 0ms` e "no tests" **não é falha** — encerre a 5173, rode,
  **suba de novo** (o ambiente é do usuário).
- **CRLF:** editando por script Python, `open(..., newline="")`.
- Seus três relatórios anteriores estão versionados.
