# CARGA — DssEmptyState · **REVALIDAÇÃO 2 (terceira passagem)**

> Enviar junto com o corpo do `docs/governance/prompt_revisao_independente_v1.0.md`
> (seção "✂️ PROMPT — copiar daqui para baixo").
>
> **Fase do `record_audit_event`: `"revalidation"`.**

| Campo | Valor |
|---|---|
| Componente | `DssEmptyState` |
| Fase | **1** · Classificação: **Visual** · Status: **draft** |
| Golden Context | `DssBanner` · Golden Reference: `DssBadge` |
| Superfície da API | **7** props · **5** slots · **0** eventos *(inalterada)* |
| Dependências DSS internas | **`DssIcon`** (única) |
| Ambiente de teste visual | <http://localhost:5173> — **no ar, não subir outro** |
| Seus relatórios anteriores | `DSSEMPTYSTATE_REAUDIT_v2.2.md` · `DSSEMPTYSTATE_REVALIDACAO_v2.2.md` |
| Commit a auditar | **`e3839b5`** |

---

## ⚠️ Comece pelo CONTRATO EMITIDO, não pela documentação

Recomendação sua, adotada. Nas duas rodadas anteriores a doc foi corrigida e o
`dss.contract.json` ficou para trás — foi assim que a **NC-01** nasceu. A ordem desta passagem:

1. `dss.contract.json` (o derivado)
2. `types/*.types.ts` (o que o alimenta no eixo `api`)
3. só então a prosa

Se os três discordarem entre si em qualquer ponto, é NC — independentemente de qual esteja certo.

---

## Inventário completo — 19 itens, três rodadas, nenhum sem status

Esta tabela existe porque o **G-03 caiu do controle** entre a rodada 1 e a 2: foi empacotado numa
recomendação junto com o R-03 e sumiu da Carga anterior, nem como fechado nem como aberto. A culpa
de escrever a Carga foi do construtor.

> **Nota de numeração:** **`V-04` ≡ `R-07`** — mesmo item, renumerado ao ser carregado entre
> relatórios. Não são dois.

| id | origem | assunto | situação declarada |
|---|---|---|---|
| **NC-01** | revalidação | retratação da 4.1.3 não chegou ao `types`/contrato | **fechada** — corrigida na origem; contrato re-emitido |
| **G-01** | auditoria 1 | live region inserida com o conteúdo | **rebaixada** a requisito de uso (§8.1) — deixou de ser bloqueio |
| **G-02** | auditoria 1 | âncora `verifiedBy:"aria"` não checa o atributo | **aberto · sistêmico** — não corrigido por decisão |
| **G-03** | auditoria 1 | `forced-color-adjust: auto` é no-op | **fechado** (via V-01) — o item que havia sumido |
| **G-04** | auditoria 1 | slots sem `defineSlots` | **aberto · sistêmico** (37 de 57 base, inclui os goldens) |
| **G-05** | auditoria 1 | pré-prompt retroativo | **aberto · processo** — nada a corrigir no componente |
| **G-06** | auditoria 1 | `.bg-*` primitivo · `--dss-surface-*` invertida no dark | **abertos · sistêmicos** — citados, não corrigidos |
| **R-01** | reaudit | snippet não refletia `announce=false` | **fechado** — mas gerou o V-02, ver abaixo |
| **R-02** | reaudit | `ariaLabel` inerte com `announce=false` | **fechado** — documentado (§8.2) |
| **R-03** | reaudit | `_plain.scss` inteiramente no-op | **fechado** |
| **R-04** | reaudit | "Exceções: Nenhuma" era falso (`line-height: 1`) | **fechado** — declarado no `visualProperties` |
| **R-05** | reaudit | `ariaLabel` e slot `default` sem demo | **fechado** |
| **R-06** | reaudit | título é `<p>` sem decisão registrada | **fechado** — decisão registrada (§7.5) |
| **R-07** ≡ **V-04** | reaudit / revalidação | muitas live regions na mesma tela | **fechado agora** — ver abaixo |
| **V-01** | revalidação | regras mortas restantes | **fechado** — `forced-color-adjust` e `background-color: transparent` removidos |
| **V-02** | revalidação | **regressão** do fix do R-01 | **fechado** — ver abaixo, é o item mais importante |
| **V-03** | revalidação | `--dss-spacing-1` fora das tabelas | **fechado** |
| **V-05** | revalidação | demos escreviam `aria-label`, doc `ariaLabel` | **fechado** — unificado em `ariaLabel` |

---

## Os três que exigem medição sua

### 1. NC-01 — a retratação chegou ao fim da cadeia?

Corrigido em **4 lugares**: `types/empty-state.types.ts` (dono do eixo `api`), o comentário do
SFC, `DssEmptyState.md` §1 (linha 29, primeira tela) e §7.4. Contrato re-emitido.

**Meça:** `dss.contract.json` → `api.props.announce.description`. O construtor reporta que agora
diz *"Emite `role=status` + `aria-live=polite` no elemento raiz"*. **Procure o quinto lugar** — as
duas rodadas anteriores mostraram que sempre havia mais um.

### 2. V-02 — a regressão que o construtor causou, corrigida por ele mesmo

Fix aplicado: `k.default ?? false` em `PreviewFrame.vue`.

**Meça as duas pontas, porque elas competem:**

| caso | esperado |
|---|---|
| `DssChip` em repouso, sem tocar em knob | snippet **sem nenhum** `:prop="false"` |
| `DssEmptyState` com `announce` desmarcado | snippet **com** `:announce="false"` e DOM sem `role` |

O construtor mediu os dois e reporta que coexistem. **Foi ele quem introduziu o bug e ele quem o
corrigiu** — é o ponto onde a auto-verificação é menos confiável nesta rodada. Amplie: há outro
componente com boolean de default `true` (além de `announce`) que possa ter quebrado?

### 3. R-07 / V-04 — coberto nas duas pontas agora

- **Doc:** §7.4 ganhou parágrafo próprio — *"vários estados vazios na mesma tela: mantenha
  `announce` apenas naquele que responde à ação do usuário"*.
- **Playground:** passou a praticá-la — **18 das 21** instâncias com `:announce="false"`, sobrando
  só os tiles que demonstram o próprio `announce`, com nota explicando por quê.

**Meça a contagem de live regions na página.** Você mediu 34; deve ter caído para 3.

---

## G-02 — encerrado como divergência, mantido como débito

O construtor aceita o seu recuo no número **e** a distinção que você sustentou. Ficam registrados
os dois escopos:

- **35 claims em 32 componentes** usam uma âncora que **nunca checa o atributo** — presente
- **0 componentes** dependem do acidente de substring (`variant` casando `/aria/`) — latente

O seu exemplo neste componente entrou no registro: a claim **1.4.1** afirma que o ícone é
decorativo e passa porque existe uma prop chamada `ariaLabel`; nada olha para `decorative`.

**Não reabra a discussão do número.** Se encontrar consequência nova, é achado novo.

---

## Segue aberto — confirme que continuam citados, não conserte

`G-02` (âncora) · `G-04` (`defineSlots`) · `G-05` (pré-prompt retroativo) · `G-06` (`.bg-*`
primitivo e `--dss-surface-*` invertida no dark) · gate estrutural que não vê o `@forward`.

Todos no `docs/governance/DEBITO_ABERTO.md`.

---

## Se, na sua avaliação, estiver conforme

Você declarou na revalidação: *"fechada a NC-01, o componente fica elegível, com os gaps restantes
como ressalvas não-bloqueantes"*. **Isso não vincula esta passagem** — se algo novo aparecer, vale
o que você medir agora.

Caminho do selo no §7 do prompt: template literal · caminho canônico
`docs/Compliance/seals/DssEmptyState/DSSEMPTYSTATE_SELO_v2.2.md` · linha **"Dependências DSS
Internas" → `DssIcon`** · 7 pilares em PASS/CONFORME sem score · declaração explícita do Gate
Estrutural · e as **duas correções de caminho** (`DSS_FASE2_TODO.md` e
`DSS_FASEAMENTO_COMPONENTES.md` vivem em `docs/reference/`).

As ressalvas do selo devem incluir, no mínimo: a **claim 4.1.3 rebaixada sem teste de AT** e o
**pré-prompt retroativo**. Não invente ressalvas além das que sustentar.

Depois: `record_audit_event` com `phase:"seal-granted"`, então `node scripts/build-catalog.cjs` e
`npm run catalog:validate` (esperado: **0 contradições status↔selo**).

---

## Lembretes operacionais

- **Nunca `git add -A`** — mais de um agente nesta árvore.
- **WSL2/vitest:** ~60s com `environment 0ms` e "no tests" **não é falha** — é o dev privando o
  worker. Encerre a 5173, rode, **suba de novo** (o ambiente é do usuário).
- **CRLF:** editando por script Python, `open(..., newline="")`.
- Seus dois relatórios anteriores **já estão versionados** (`5ef37f6` e `e3839b5`).
