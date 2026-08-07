# @sansys/dss-mcp

> Servidor **MCP (Model Context Protocol)** do Design System Sansys. Expõe o conhecimento e os validadores do DSS como ferramentas consumíveis por agentes de IA (Claude e compatíveis).

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](../../LICENSE)


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

## O que é

Um servidor MCP que dá a agentes acesso programático à governança do DSS:
consulta de componentes e tokens, verificação de conformidade, geração de
scaffolds e validações. Evita que o agente infira regras — ele as consulta.

## Ferramentas expostas

| Tool | Função |
|---|---|
| `query_component` | Lê metadados, pré-prompt e documentação de um componente |
| `query_token` | Consulta um token `--dss-*` no catálogo |
| `check_compliance` | Verifica conformidade de um componente com as regras DSS |
| `validate_component_code` | Valida trechos de código contra os princípios DSS |
| `validate_visual_contract` | Compara o `defaultPreview` do meta ao CSS *(declarativa — ver nota)* |
| `validate_grid_layout` | Valida um layout de grid |
| `validate_pre_prompt` | Valida um pré-prompt de componente |
| `generate_component_scaffold` | Gera a estrutura de 4 camadas de um novo componente |
| `generate_pre_prompt_template` | Gera o template de pré-prompt |
| `suggest_token_replacement` | Sugere token DSS para um valor hardcoded |
| `describe_grid_inspector` | Descreve o utilitário grid-inspector |
| `get_todo_list_status` | Status da lista de pendências de governança |
| `record_audit_event` | Registra um evento de auditoria |

> ⚠️ `validate_visual_contract` é **declarativa** (sem renderização real) até o
> pipeline de regressão visual da Fase 4 — não usar como critério de aceite.

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
