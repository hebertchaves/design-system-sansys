# CARGA — DssEmptyState · **REVALIDAÇÃO**

> Enviar junto com o corpo do `docs/governance/prompt_revisao_independente_v1.0.md`
> (seção "✂️ PROMPT — copiar daqui para baixo").
>
> **Fase do `record_audit_event`: `"revalidation"`** (não `initial-audit`).

| Campo | Valor |
|---|---|
| Componente | `DssEmptyState` |
| Fase | **1** · Classificação: **Visual** · Status atual: **draft** |
| Golden Context | `DssBanner` · Golden Reference: `DssBadge` |
| Superfície da API | **7** props · **5** slots · **0** eventos *(inalterada)* |
| Dependências DSS internas | **`DssIcon`** (única) |
| Ambiente de teste visual | <http://localhost:5173> — **no ar, não subir outro** |
| Auditoria de referência | `docs/Compliance/audits/DssEmptyState/DSSEMPTYSTATE_REAUDIT_v2.2.md` — **sua**, revisão independente |
| Commit a auditar | **`5ef37f6`** — *"fecha 5 achados da revisão independente"* |

---

## O que mudou desde o seu relatório

O construtor **verificou cada um dos seus 7 achados antes de aceitar** e reportou que todos
procedem. Cinco foram fechados; dois seguem abertos por decisão do responsável.

### Fechados — reverifique, não aceite

| id | o que foi feito | onde conferir |
|---|---|---|
| **G-01** | **Claim 4.1.3 rebaixada.** Passou a afirmar só que os atributos **são emitidos** (o que o `.test.js` checa). O requisito de uso virou seção própria: contêiner `aria-live` **persistente** no consumidor, com `:announce="false"` no bloco interno. `verifiedBy`: `aria` → **`test`** | `dss.meta.json` · `DssEmptyState.md` §8.1 |
| **R-01** | Snippet do Preview Frame corrigido (`PreviewFrame.vue`, caminho do snippet). O construtor mediu: com `announce` desmarcado, o DOM perde `role`/`aria-live` **e** o snippet passa a trazer `:announce="false"` | `apps/sandbox/src/preview/PreviewFrame.vue` |
| **R-02** | Documentado (decisão: documentar, **não** mudar comportamento). `ariaLabel` declarado como inerte com `announce=false` | `DssEmptyState.md` §8.2 · `README` · `_API.md` |
| **R-03** | `_plain.scss` esvaziado das 2 declarações no-op; ficou só a explicação de por que `plain` não tem regra | `3-variants/_plain.scss` |
| **R-04** | `line-height: 1` declarado no `visualProperties` (precedente DssBadge) e a afirmação "Exceções: **Nenhuma**" corrigida, com nota de por que o grep não a pegou | `dss.meta.json` · `DssEmptyState.md` §4 |
| **R-05** | `ariaLabel` (nas **duas** configurações de `announce`) e slot `default` agora exercitados no Playground | `apps/sandbox/src/TestDssEmptyState.vue` |
| **R-06** | Decisão do `<p>` **registrada** (não mudou o markup): o componente não sabe o nível de heading da página hospedeira; quem precisar usa o slot `title` | `DssEmptyState.md` §7.5 |

### Abertos por decisão — **não conserte, confirme que continuam citados**

| id | situação |
|---|---|
| **G-02** (âncora `verifiedBy:"aria"`) | **Não corrigido, por decisão do responsável.** Segue no `DEBITO_ABERTO`. |
| **G-04** (slots sem `defineSlots`) | Aberto · sistêmico (37 de 57 base, inclui os goldens) |
| **G-05** (pré-prompt retroativo) | Aberto · processo; nada a corrigir no componente |
| **G-06** (`.bg-*` primitivo · `--dss-surface-*` invertida no dark) | Abertos · citados, não corrigidos |
| **R-07** (muitas live regions na mesma página) | ⚠️ **NÃO endereçado.** A sua recomendação era uma frase em §7.4/§8 sobre manter `announce` só no bloco que responde à ação. **Confirme se a §8.1 nova cobre isso ou se o gap continua de pé** — o construtor não o tratou explicitamente. |

---

## Um ponto onde o construtor DISCORDA de você — julgue

Sobre o alcance do **G-02**. Ele confirma o mecanismo (`variant` satisfaz `/aria|required/i` por
substring — verificou, dá `true`) e confirma que a âncora nunca checa o atributo. **Mas contesta o
número:**

> *"Medi que hoje **nenhum** componente depende só desse acidente: todos os 36 claims ancorados em
> `aria` têm também prop genuinamente `aria-*`. O bug é **latente**, não está produzindo
> falso-positivo hoje."*

O script que ele usou classificou `DssUploader` como "acidental" e depois ele mesmo notou que a
classificação estava errada — `addAriaLabel`/`uploadAriaLabel` são props aria legítimas que não
*começam* com "aria", e o teste dele era `startswith`.

**Refaça a medição com critério próprio.** As duas leituras podem ser verdadeiras ao mesmo tempo
("36 claims usam uma âncora que não verifica" ≠ "36 claims passam falsamente"), e a diferença
muda a prioridade do conserto. Diga qual número você sustenta.

---

## O que reverificar (mínimo)

1. **A claim 4.1.3 rebaixada é honesta**, ou apenas move a afirmação de lugar? Leia
   `DssEmptyState.md` §8.1 e o `implementation` no `dss.meta.json`. Se ainda houver promessa sem
   lastro, é NC.
2. **R-01 de fato coerente** — meça você, no Preview Frame: alterne `announce` e compare o snippet
   com o DOM, byte a byte, como fez antes.
3. **R-04 — procure mais exceções não declaradas.** Você achou `line-height` porque o grep do
   construtor era cego a adimensional. **Há outras classes de valor que nenhum dos dois greps
   alcança?** (percentuais, `em`, palavras-chave como `none`/`auto` com efeito real, `calc()`).
4. **R-03 — a varredura de regras mortas está completa agora?** Foi corrigida a partir do seu
   apontamento, mas quem varreu foi quem tinha o ponto cego.
5. **R-05 — as demos novas exercitam de verdade**, ou só existem?
6. **R-07 — foi coberto?** Ver tabela acima.
7. **Os gates de comando e os 22 testes** — o construtor reporta verdes; reconfira.

---

## Se, na sua avaliação, o componente estiver conforme

O caminho do selo está no §7 do prompt (`prompt_revisao_independente_v1.0.md`): template literal,
caminho canônico `docs/Compliance/seals/DssEmptyState/DSSEMPTYSTATE_SELO_v2.2.md`, linha
**"Dependências DSS Internas" → `DssIcon`**, os 7 pilares em PASS/CONFORME sem score, declaração
explícita do Gate Estrutural, e os 4 arquivos a atualizar (atenção às **duas correções de caminho**
que o prompt registra — `DSS_FASE2_TODO.md` e `DSS_FASEAMENTO_COMPONENTES.md` vivem em
`docs/reference/`, não em `docs/governance/`).

Depois: `record_audit_event` com `phase:"seal-granted"`, e então
`node scripts/build-catalog.cjs` + `npm run catalog:validate` (esperado: **0 contradições
status↔selo**).

**Se não estiver conforme**, `phase:"revalidation"` com o veredito que você sustentar — inclusive
`"pending"` de novo, se for o caso. Você já argumentou por que `pending` cabe melhor que
`non-compliant` com `ncs=0`; o responsável não pediu para reverter, então mantenha o seu critério.

---

## Lembretes operacionais

- **Nunca `git add -A`** — há mais de um agente nesta árvore.
- **WSL2/vitest:** teste terminando em ~60s com `environment 0ms` e "no tests" **não é falha** — é
  o dev server privando o worker. Encerre a 5173, rode, e **suba de novo** (o ambiente é do
  usuário).
- **CRLF:** editando por script Python, `open(..., newline="")`.
- **Nada foi commitado por você da última vez** — o construtor commitou o seu relatório junto com
  as correções, em `5ef37f6`. Ele está versionado.
