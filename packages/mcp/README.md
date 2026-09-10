# @sansys/dss-mcp

> Servidor **MCP (Model Context Protocol)** do Design System Sansys. Expõe o conhecimento e os validadores do DSS como ferramentas consumíveis por agentes de IA (Claude e compatíveis).

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](../../LICENSE)

## O que é

Um servidor MCP que dá a agentes acesso programático à governança do DSS:
consulta de componentes e tokens, verificação de conformidade, geração de
scaffolds e validações. **Evita que o agente infira regras — ele as consulta.**

Esse é o argumento central: sem MCP, um agente perguntado "que token uso para
`#ef7a11`?" produz um nome plausível. Com MCP, ele recebe `--dss-hub-600`,
confiança `exact`, e as 3 alternativas mais próximas por distância de cor.

---

## ⚠️ Duas superfícies de documentação — este README é UMA delas

O que a **máquina** lê **não** é este arquivo. Um agente decide se e quando chamar
uma tool a partir do campo `description` do schema, em `src/tools/index.ts`
(e, no caso do `validate_visual_contract`, no próprio arquivo da tool):

| Superfície | Onde vive | Quem lê | Idioma |
|---|---|---|---|
| **Schema** (`description`, `inputSchema`) | `src/tools/index.ts` | o agente, em runtime | inglês |
| **Este README** | `packages/mcp/README.md` | pessoas — onboarding, apresentação | português |

**Consequência prática:** mudou o comportamento de uma tool? O schema é obrigatório
(o agente age errado sem ele). Este README é o que dá contexto humano — quando usar,
o que volta, por que existe.

**Este README não repete parâmetros de propósito.** Assinatura e tipos vivem no
schema; duplicá-los aqui garante divergência na primeira mudança. Para os
parâmetros exatos de uma tool, leia o schema.

---

## Contrato read-only — e a única exceção

Por `MCP_READ_ONLY_CONTRACT.md`, o MCP **observa e explica; não decide nem altera**.
15 das 16 tools não tocam em nenhum arquivo, e várias devolvem esse aviso no
próprio retorno.

> 🔴 **A exceção é `record_audit_event`** — é **escrita controlada**: grava em
> `auditHistory[]` do `dss.meta.json` do componente e, num selo concedido, também
> em `status`, `auditDate` e `seal`. Autorizada pelo contrato v0.2, restrita a
> esses campos, e **exige pedido humano explícito**. Nenhuma outra tool escreve.

---

## Ferramentas expostas (16)

### Consulta — o agente pergunta, o DSS responde

| Tool | Quando usar | O que volta |
|---|---|---|
| `query_component` | Antes de mexer num componente, para saber estado real em vez de supor | `meta` completo, pré-prompt, documentação e um `summary` legível |
| `query_token` | Para citar um token pelo nome exato, ou varrer uma categoria | A(s) seção(ões) correspondente(s) do `DSS_TOKEN_REFERENCE.md` |
| `suggest_token_replacement` | Achou valor hardcoded (hex, rgb, px, rem) e precisa do token equivalente | Melhor correspondência com confiança (`exact`/`close`/`approximate`) + até 3 alternativas |
| `describe_grid_inspector` | Para operar o Grid Inspector sem abrir a documentação dele | Manual operacional completo: 5 frentes, arquitetura e painéis |

### Validação — o agente submete algo, o DSS julga

| Tool | Quando usar | O que volta |
|---|---|---|
| `check_compliance` | Julgar um uso descrito em prosa contra a governança | Parecer descritivo por eixo (`composition` / `token` / `accessibility`) — nunca corretivo |
| `validate_component_code` | Revisar Vue + SCSS de um componente | Violações arquiteturais: 4 camadas ausentes, cor hardcoded, `:deep()`, token específico de componente |
| `validate_composition` | Validar uma árvore proposta (tela, seção, formulário) | Checagem contra `ui-rules.schema.json` — pega Quasar cru onde existe equivalente DSS |
| `validate_visual_contract` | Depois de alterar o SCSS, conferir se o visual bate com o contrato | Comparação do CSS computado com o `defaultPreview` do `meta` *(ver ressalva abaixo)* |
| `validate_grid_layout` | Validar configuração de grid/layout | Achados por severidade: tokens de spacing, sincronia overlay↔layout, colunas, responsivo |
| `validate_pre_prompt` | Antes de aceitar um pré-prompt como insumo do próximo componente | Cobertura dos 5 eixos obrigatórios da Fase 2 |
| `validate_spec_readiness` | Antes de começar a implementar a partir de uma spec do analista | Relatório de completude por regime, sobre o markdown que o analista já escreve |

> ⚠️ `validate_visual_contract` é **declarativa** (sem renderização real) até o
> pipeline de regressão visual da Fase 4 — não usar como critério de aceite.

### Geração — o DSS devolve conteúdo pronto para você aplicar

| Tool | Quando usar | O que volta |
|---|---|---|
| `generate_component_scaffold` | Criar componente novo já nas 4 camadas | JSON com caminho e conteúdo de cada arquivo. **O desenvolvedor aplica — o MCP não escreve** |
| `generate_pre_prompt_template` | Abrir o pré-prompt de um componente novo | Markdown cobrindo os 5 eixos de governança |

### Processo

| Tool | Quando usar | O que volta |
|---|---|---|
| `request_spec_parecer` | Complementar o portão determinístico com leitura semântica | Um **roteiro para o agente** ler a spec e emitir parecer. **Não é gate:** não reprova nem altera o `validate_spec_readiness` |
| `get_todo_list_status` | Saber onde a Fase 2 está sem abrir o arquivo | Selados, pendentes, em andamento e bloqueados, lidos do `DSS_FASE2_TODO.md` |

### Escrita controlada

| Tool | Quando usar | O que faz |
|---|---|---|
| `record_audit_event` | Registrar evento de auditoria ou conceder selo | **Escreve** em `dss.meta.json`: `auditHistory[]` sempre; `status`/`auditDate`/`seal` quando o selo é concedido. Exige pedido humano explícito |

---

## Resources expostos (6)

Resources são a outra metade do servidor: **documentos que o agente lê sob demanda**,
em vez de receber colados no prompt. A documentação normativa fica versionada com o
código e o agente puxa o trecho de que precisa.

| Resource | Para que serve |
|---|---|
| `DSS CLAUDE.md — Regras Normativas` | A Constituição e o Roteador — as regras vinculantes |
| `DSS Token Reference` | Catálogo oficial de tokens |
| `DSS Faseamento de Componentes` | Em que fase cada componente está e o que a fase exige |
| `DSS Golden Components` | Vocabulário Golden: Reference, Context e Sample |
| `DSS Critérios de Avaliação — Fase 2` | Critérios pelos quais um componente é julgado |
| `DSS Fase 2 — To-Do List` | Fila de trabalho da Fase 2 |

---

## Build não é versionado

`packages/mcp/build/` está no `.gitignore` e **não** é commitado. O bundle é gerado
por `npm run prepare`, que o npm executa automaticamente depois de `npm install`.

Antes disto, 5 arquivos de `build/` estavam rastreados por acidente histórico,
contradizendo o próprio `.gitignore` — e o `index.js` versionado importava um chunk
que nunca esteve no repositório. Ou seja: "clonar e rodar" já estava quebrado.
Com o build fora do git, o artefato deixa de gerar conflito entre frentes
trabalhando em paralelo, e o `prepare` devolve o clonar-e-rodar.

Se o MCP parecer desatualizado (tool nova não aparece, correção não vale em runtime),
o build está velho:

```bash
npm run build --workspace=@sansys/dss-mcp
```

> ℹ️ O cliente MCP carrega o bundle **ao iniciar a sessão**. Depois de rebuildar,
> a sessão em curso continua com o código antigo — é preciso reiniciar o cliente
> para ver a mudança.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run build` *(neste pacote)* ou `npm run mcp:build` *(raiz)* | Compila o servidor para `build/` |
| `npm run start` | Inicia o servidor MCP (stdio) |
| `npm run start:http` / `start:sse` | Variantes HTTP / SSE |
| `npm run typecheck` | Type-check do servidor |

## Configuração

A raiz do DSS é resolvida via variável de ambiente **`DSS_ROOT`** (ou inferida
do diretório do bundle). Defina `DSS_ROOT` apontando para a raiz do monorepo se
executar o servidor fora dela.

---

Software proprietário — © 2025–2026 JTECH - SOLUÇÕES EM INFORMÁTICA LTDA. Ver [LICENSE](../../LICENSE).
