# Prompt de Correção — Falso Positivo no Validator

**Objetivo:** Este prompt deve ser enviado ao Claude local para corrigir o bug de falso positivo na tool `validate_component_code` do servidor MCP.

---

## Copie o texto abaixo e envie ao Claude:

Você precisa corrigir um bug na tool `validate_component_code` do servidor MCP do Design System Sansys (DSS).

**O Problema:**
A tool está reportando um falso positivo de violação do Gate de Composição v2.4 no componente `DssBtnGroup`. O erro reportado é:
`[error] GATE_COMPOSICAO_V2.4: ':deep()' or '::v-deep' selector detected.`

No entanto, o código do componente **não usa** `:deep()`. A palavra `::v-deep` aparece apenas dentro de um **comentário CSS** no arquivo `2-composition/_base.scss` explicando por que o componente *não* usa esse seletor.

A regex atual na tool `validate_component_code` é muito simples e está capturando a string dentro de comentários.

**A Tarefa:**
1. Abra o arquivo `mcp/src/tools/validateComponentCode.ts`.
2. Localize a função `checkScssFile` ou onde a regex de `:deep()` está sendo aplicada.
3. Refatore a lógica para **ignorar comentários CSS** (`/* ... */` e `// ...`) antes de aplicar a regex que busca por `:deep(` ou `::v-deep`.
4. Uma abordagem segura é usar uma regex para remover todos os comentários do conteúdo do arquivo antes de fazer as verificações de regras (tanto para `:deep` quanto para cores hardcoded).
5. Após corrigir, recompile o servidor com `pnpm build` dentro da pasta `mcp/`.

Não altere o componente `DssBtnGroup`. O componente está correto. A falha é exclusiva da ferramenta de validação do MCP.
