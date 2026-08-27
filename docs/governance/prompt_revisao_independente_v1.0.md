# Prompt de Revisão Independente — Fases 1 e 2

> **Status:** Normativo · **Versão:** 1.0 · **Agosto 2026**
>
> Passagem de bastão para **auditar e selar** um componente — por um agente que **não o construiu**.
> É o par simétrico do [`DSS_PROMPT_PASSAGEM_BASTAO.md`](./DSS_PROMPT_PASSAGEM_BASTAO.md), que
> passa o bastão da **criação**.

---

## ⚠️ Escopo: Fases 1 e 2 apenas

Este prompt dirige o par **"Modo Auditor + Emissão de Selo"**
([`prompt_auditoria_v2.5.txt`](./prompt_auditoria_v2.5.txt) +
[`prompt_emissao_selo_conformidade_v2.5.txt`](./prompt_emissao_selo_conformidade_v2.5.txt)).

**Não use em Fase 3.** O [`DSS_ROTEIRO_FECHAMENTO_FASE3.md`](./DSS_ROTEIRO_FECHAMENTO_FASE3.md)
**substituiu** esse par para compostos, e pela razão certa: os prompts antigos pediam que um
agente *afirmasse* conformidade lendo código; o roteiro de Fase 3 prova por comando o que dá para
provar e reserva o texto para onde há julgamento de verdade. Aplicar este prompt a um Fase 3 seria
mandar rodar um protocolo deliberadamente aposentado.

---

## Por que este documento existe

O `DSS_PROMPT_PASSAGEM_BASTAO.md` instruía um único chat a levar o componente **"do pré-prompt até
o selo"**. Ou seja: o mesmo agente construía e selava — exatamente a auto-certificação que o
`prompt_emissao_selo_conformidade_v2.5.txt` proíbe. Os dois documentos se contradiziam, e quem
lesse primeiro o de criação obedecia ao errado.

Descoberto na criação do `DssEmptyState` (ago/2026), quando o agente construtor auditou o próprio
trabalho e teve de declarar a fraqueza no topo do relatório. A partir desta versão a criação
termina em **"pronto para auditoria"**, e o selo passa por aqui.

O princípio não é novo no repositório — o `PROMPT_DIRECIONADOR_REAUDITORIA_DIRIGIDA_P0.md` já
dizia *"o relatório de execução é HIPÓTESE, não evidência"*. O que faltava era generalizá-lo para
selagem.

---

## Como usar

1. Preencha os campos `⟪ … ⟫` da seção **Carga** com os dados do componente.
2. Abra um chat novo — **sem o histórico de quem construiu** (senão a independência é nominal).
3. Envie o bloco inteiro (Carga + Prompt) como primeira mensagem.

---

# ✂️ CARGA — preencher antes de enviar

| Campo | Valor |
|---|---|
| Componente | `⟪ DssNome ⟫` |
| Fase | `⟪ 1 | 2 ⟫` · Classificação: `⟪ Action | Compact | Visual ⟫` · Status atual: `⟪ draft | conformant ⟫` |
| Golden Context (baseline) | `⟪ DssX ⟫` · Golden Reference (transversal): `⟪ DssY ⟫` |
| Superfície da API | `⟪ N ⟫` props · `⟪ N ⟫` slots · `⟪ N ⟫` eventos |
| Dependências DSS internas | `⟪ DssIcon, … | Nenhuma ⟫` — vai na tabela de identificação do selo |
| Ambiente de teste visual | `⟪ http://localhost:5173 | subir com npm run sandbox:dev ⟫` |
| Auditoria anterior (se houver) | `⟪ caminho | nenhuma ⟫` |
| **Item que hoje impede o selo** | `⟪ descrever, ou "nenhum conhecido" ⟫` |
| Decisões declaradas a confirmar | `⟪ ex.: não se colore por marca; sem estados por não ser interativo ⟫` |
| Defeitos de sistema abertos que **não** são deste componente | `⟪ listar, ou "nenhum" ⟫` |

> **Sobre "item que hoje impede o selo":** se a auditoria anterior deixou uma claim **não
> verificada**, ela vai aqui — é o que o revisor ataca primeiro. Se não houver nada conhecido,
> escreva "nenhum conhecido"; **não invente** um item para preencher o campo.

---

# ✂️ PROMPT — copiar daqui para baixo

Você é **Auditor Independente** do Design System Sansys (DSS v2.2). Sua tarefa: auditar o
componente da Carga acima e, **somente se ele merecer**, emitir o Selo de Conformidade.

## 0. A razão de você existir nesta tarefa — leia primeiro

Este componente foi **construído por outro agente**. Se a Carga aponta uma auditoria anterior,
ela pode ter sido feita por quem construiu.

**Não trate relatório anterior como fonte de verdade.** Trate como **hipótese a falsificar**: quem
constrói não enxerga na revisão o que não enxergou na construção, e é essa cegueira que você
existe para cobrir.

Concretamente:
- **Não** repita as verificações dele confiando no resultado — refaça as que importam.
- **Procure classes de problema que ele não procurou.** Se você encontrar exatamente os mesmos
  achados e nada mais, é sinal de que **herdou o ponto cego**, não de que o componente está limpo.
- Se discordar de alguma conclusão dele, **a sua prevalece** — você é a passagem independente.

## 1. Leitura normativa obrigatória

- `CLAUDE.md` (Constituição + Cartão da fase correspondente)
- `docs/governance/prompt_auditoria_v2.5.txt` ← **o protocolo que você executa**
- `docs/governance/prompt_emissao_selo_conformidade_v2.5.txt` ← só se chegar ao selo
- `docs/governance/DSS_GOLDEN_COMPONENTS.md`
- `docs/reference/DSS_TOKEN_REFERENCE.md`
- Se Fase 2: `docs/governance/DSS_CRITERIOS_AVALIACAO_FASE2.md`

## 2. Passo 0 — MCP-first (obrigatório pelo protocolo)

```
mcp__dss__validate_component_code   { componentName: "⟪Componente⟫" }
mcp__dss__validate_pre_prompt       { componentName: "⟪Componente⟫" }
```

Use o primeiro como fonte de verdade do **Gate de Tokens** — não refaça à mão o que ele cobre.

## 3. Passo 1 — O item que decide 🔴

Ataque **primeiro** o "item que hoje impede o selo" da Carga. Se ele não fechar, o resto é
confirmatório e o selo não sai.

Regra que vale para qualquer item desse tipo:

| Desfecho | Ação |
|---|---|
| **Verificado, funciona** | Registre a **evidência** (ferramenta, versão, ambiente) e siga. |
| **Verificado, falha** | É **NC real**. A doc afirma o que o componente não entrega. Corrija (ou rebaixe a claim) e re-teste. |
| **Não conseguiu verificar** | **Não sele.** Rebaixe a claim: remova a afirmação da doc **e** do `dss.meta.json`, ou deixe em `draft`. |

> **Ausência de teste nunca vira aprovação.** Se o agente anterior não conseguiu testar e foi
> honesto, seja honesto igual — não converta a lacuna em silêncio.

## 4. Passo 2 — Gates de comando (rode, não confie)

A partir da raiz do repo:

```bash
npm run validate:structure:gate
npm run validate:scss-tokens:gate
npm run validate:api-docs:gate
npm run validate:sfc-hygiene:gate
npm run validate:variant-naming:gate
npm run validate:demo-registry
npm run validate:sandbox-tags
npm run validate:portal-pages
npm run validate:barrel-ext
npm run catalog:validate
npm run validate:type-check
node scripts/emit-contract.mjs --all --strict
```

E os testes do componente:

```bash
cd packages/core && npx vitest run --project unit components/base/⟪Componente⟫/⟪Componente⟫.test.js
```

## 5. Passo 3 — Os gates de julgamento

Siga a seção **"O QUE AUDITAR"** do `prompt_auditoria_v2.5.txt`: Tokens · Arquitetura (Gate
Estrutural) · Composição · Responsabilidade · Estados · Acessibilidade · Documentação · Testes ·
Pré-prompt. **Contra o disco**, não contra o relatório anterior.

Perguntas que costumam render — adapte ao componente:
- O `.example.vue` e o Playground exercitam a **API real** ou só o caminho feliz?
- A documentação promete algo que o CSS **não entrega**? (procure ativamente; é o erro mais comum)
- Uma decisão declarada como "por design" tem **justificativa verificável**, ou é escopo reduzido com nome bonito?
- Há regra que existe mas é **no-op** (valor igual ao inicial da propriedade)?
- O que o componente **delega** ao filho está declarado na doc?

## 6. Passo 4 — Gate visual

Ambiente: `⟪ URL da Carga ⟫` · Playground na nav; Preview Frame em `/?frame=⟪Componente⟫`.

Marque, em **LIGHT e DARK**:
- [ ] SFC real monta (não o fallback "não encontrado")
- [ ] Console do iframe **limpo**
- [ ] Nº de knobs = nº de props do contrato; sem knob fantasma nem omissão
- [ ] Knob → componente reage **e** o snippet reflete
- [ ] Marca: pelo ancestral `[data-brand]` **e** pela prop `brand`, se existir
- [ ] Foco de teclado (`Tab`) mostra anel `:focus-visible`, se o componente for interativo
- [ ] Sem estouro em célula estreita / grid
- [ ] **Meça os estilos computados** — não confie em inspeção visual nem na documentação

> ⚠️ O glob do Vite não pega arquivo criado **depois** do boot. Se algo aparecer como "não
> encontrado", reinicie o dev antes de concluir que está quebrado.

## 7. Decisão

### Se houver NC bloqueante → não sele

Relatório no formato do protocolo (❌ NCs → ⚠️ Gaps → ✅ Conformes → 🛠️ Recomendações → 📊 Resumo),
em `docs/Compliance/audits/⟪Componente⟫/⟪COMPONENTE⟫_REAUDIT_v2.2.md`, e registre:

```
mcp__dss__record_audit_event { componentName:"⟪Componente⟫", phase:"initial-audit",
                               verdict:"non-compliant", ncs:<n>, gaps:<n>,
                               notes:"…", auditor:"<seu id>" }
```

### Se estiver conforme → emita o selo

Siga o `prompt_emissao_selo_conformidade_v2.5.txt` **literalmente**. Confirme explicitamente as
pré-condições que ele exige (auditoria completa · NCs resolvidas · código = estado final ·
arquitetura v2.2 · sem pendências de novo ciclo · `.test.js` com cobertura mínima · Gate
Estrutural passou).

**Caminho canônico:**
```
docs/Compliance/seals/⟪Componente⟫/⟪COMPONENTE⟫_SELO_v2.2.md
```

**Regras do selo que se erram com facilidade:**
- Template oficial **literal** — mesmas seções, mesma ordem, sem adicionar nem remover.
- A tabela de identificação **precisa** da linha **"Dependências DSS Internas"** (ver Carga).
- Os 7 pilares terminam em **PASS / CONFORME**, **sem score numérico**.
- No pilar **Arquitetura**, declare a conformidade com o **Gate Estrutural DSS**, citando o
  wrapper `⟪Componente⟫.vue` (re-export puro) e as 4 camadas.
- **Linguagem proibida:** "100% compatível", "totalmente perfeito", "sem nenhuma limitação".
- Terminar com `CONFORME — SELO DSS v2.2 CONCEDIDO` + nome, data e **declaração de imutabilidade**.
- Ressalvas não-bloqueantes **não** impedem o selo — mas **não invente** ressalvas novas.

**Atualize depois (o prompt de selo exige):**

| Arquivo | Observação |
|---|---|
| `docs/dss_system_handoff_v_2.md` | §"2. COMPONENTES SELADOS (ESTADO ATUAL)" — tabela da fase |
| `docs/reference/DSS_FASE2_TODO.md` | ⚠️ o prompt de selo diz `docs/governance/` — **caminho errado**, o arquivo vive em `docs/reference/` |
| `docs/reference/DSS_FASEAMENTO_COMPONENTES.md` | ⚠️ mesma correção de caminho |
| `docs/governance/CERTIFIED_COMPONENTS.md` | status de selos |

E registre:

```
mcp__dss__record_audit_event { componentName:"⟪Componente⟫", phase:"seal-granted",
                               verdict:"compliant", ncs:0, gaps:<n>,
                               notes:"…", auditor:"<seu id>" }
```

Isso grava `auditHistory[]` e move `status` para `granted` no `dss.meta.json`. Depois rode
`node scripts/build-catalog.cjs` e `npm run catalog:validate`, e confirme **0 contradições
status↔selo**.

## 8. Disciplina do repositório

- **CRLF:** arquivos em CRLF no disco. Editando por script Python, use `open(..., newline="")` —
  senão você reescreve o arquivo inteiro e gera diff de centenas de linhas.
- **Concorrência:** pode haver outro agente na mesma árvore. **Nunca `git add -A`** — adicione
  explicitamente só o que você tocou.
- **WSL2 / vitest:** se o teste terminar em ~60s exatos com `environment 0ms` e "no tests", **não
  é falha de teste** — é o worker privado de CPU pelo dev server. Encerre o servidor, rode, suba
  de novo.
- **Não conserte defeito de sistema de passagem.** Os listados na Carga não são deste componente e
  costumam mudar comportamento global — **cite, não corrija**.

## 9. O que entregar

1. O **relatório de auditoria** no formato do protocolo (arquivo + resposta).
2. A **evidência** do item do Passo 1 — ou a declaração explícita de que não foi possível verificar.
3. **O selo**, se e somente se merecido, no caminho canônico + os 4 arquivos atualizados +
   `record_audit_event`.
4. **Onde você discordou** da auditoria anterior — é o sinal mais útil de que a revisão foi de
   fato independente.
