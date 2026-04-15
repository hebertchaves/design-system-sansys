# DSS MCP — Plano Técnico da Fase 3 (Co-Creator)

## 1. Visão Geral

Este documento detalha a implementação técnica da **Fase 3** do servidor MCP (Model Context Protocol) para o Design System Sansys (DSS).

Enquanto a Fase 1 estabeleceu a fundação de leitura (Resources) e a Fase 2 introduziu a validação ativa (Validator), a Fase 3 eleva o MCP ao status de **Co-Creator**. O objetivo é permitir que o MCP não apenas aponte erros, mas **gere artefatos estruturais** e **sugira correções** baseadas no contexto do projeto, acelerando o workflow de criação de componentes.

**Importante:** A Fase 3 continua operando sob o `MCP_READ_ONLY_CONTRACT.md`. O MCP pode gerar código e sugerir correções, mas **nunca** deve escrever diretamente nos arquivos do repositório. A aplicação das sugestões continua sendo responsabilidade do agente de execução (Claude/Manus).

---

## 2. Arquitetura e Evolução

A Fase 3 expande a pasta `/mcp` mantendo a compatibilidade com as Fases 1 e 2.

- **Novas Dependências:** Nenhuma dependência externa nova é estritamente necessária.
- **Transporte:** Continua usando `stdio`.
- **Integração:** O servidor continuará sendo compilado via `tsup` para um único arquivo ESM.

---

## 3. Novas Capacidades Expostas (Tools)

A Fase 3 adiciona três novas ferramentas focadas em geração de artefatos e sugestão de correções.

### 3.1 Tool: `generate_component_scaffold`

- **Descrição:** Gera a estrutura de diretórios e o boilerplate inicial (arquivos `.vue`, `.scss`, `dss.meta.json`) para um novo componente, seguindo estritamente a arquitetura de 4 camadas do DSS.
- **Input Schema:**
  - `componentName` (string, required): Nome do componente (ex: `DssAvatar`).
  - `family` (string, required): Família do componente (ex: `Mídia e Visualização`).
- **Comportamento:**
  1. Valida o nome do componente (deve começar com `Dss`).
  2. Gera o conteúdo boilerplate para `1-structure`, `2-composition`, `3-variants`, `4-output` e `dss.meta.json`.
  3. Retorna um JSON contendo os caminhos virtuais e o conteúdo de cada arquivo gerado.
  4. **Não escreve no disco.** O agente consumidor deve usar o retorno para criar os arquivos.

### 3.2 Tool: `suggest_token_replacement`

- **Descrição:** Analisa um valor CSS hardcoded (ex: `#FF0000`, `16px`) e sugere o token DSS mais apropriado para substituí-lo.
- **Input Schema:**
  - `value` (string, required): O valor CSS hardcoded.
  - `property` (string, required): A propriedade CSS onde o valor está sendo usado (ex: `color`, `margin`).
- **Comportamento:**
  1. Lê o `DSS_TOKEN_REFERENCE.md`.
  2. Mapeia a propriedade CSS para a categoria de token correspondente (ex: `margin` -> `spacing`).
  3. Busca o token cujo valor mais se aproxima do valor fornecido.
  4. Retorna a sugestão de token e a justificativa.

### 3.3 Tool: `generate_pre_prompt_template`

- **Descrição:** Gera um template preenchido parcialmente para o pré-prompt de um novo componente, baseado no `DSS_CRITERIOS_AVALIACAO_FASE2.md`.
- **Input Schema:**
  - `componentName` (string, required): Nome do componente.
- **Comportamento:**
  1. Gera a estrutura Markdown com os 5 eixos obrigatórios.
  2. Preenche automaticamente a seção de Classificação baseada no nome do componente (buscando no To Do list).
  3. Retorna o conteúdo Markdown gerado.

---

## 4. Evolução das Tools Existentes (Fase 2 → Fase 3)

- **Melhoria no `validate_component_code`:**
  - Em vez de apenas apontar "Cores hardcoded detectadas", a tool deve integrar-se internamente com a lógica do `suggest_token_replacement` para retornar: "Cor hardcoded `#FFF` detectada. Sugestão: usar `--dss-color-white`".

---

## 5. Guia de Implementação Passo a Passo

Para o agente que for executar a construção da Fase 3, o fluxo deve ser:

**Step 1 — Setup:**
- Criar os novos arquivos em `mcp/src/tools/`: `generateComponentScaffold.ts`, `suggestTokenReplacement.ts`, `generatePrePromptTemplate.ts`.
- Atualizar `mcp/src/tools/index.ts` para exportar as novas tools.

**Step 2 — Implementar `suggest_token_replacement`:**
- Escrever a lógica de parsing do `DSS_TOKEN_REFERENCE.md` para extrair os valores reais dos tokens.
- Implementar uma função de similaridade (ex: distância de cor para hex/rgb, diferença numérica para px/rem).

**Step 3 — Implementar `generate_component_scaffold`:**
- Criar templates de string para os arquivos da arquitetura de 4 camadas.
- Estruturar o retorno JSON.

**Step 4 — Implementar `generate_pre_prompt_template`:**
- Criar o template Markdown baseado nos 5 eixos.
- Integrar com a lógica de leitura do To Do list para preencher a classificação.

**Step 5 — Atualizar o Servidor (`src/server.ts`):**
- Registrar as novas tools no handler `ListToolsRequestSchema`.
- Adicionar os cases no switch do handler `CallToolRequestSchema`.

**Step 6 — Build e Teste:**
- Compilar com `pnpm build`.
- Validar com o MCP Inspector testando as 3 novas tools.

---

## 6. Critérios de Aceite da Fase 3

A Fase 3 será considerada concluída quando todos os critérios abaixo forem atendidos:

| Critério | Validação |
|---|---|
| Servidor compila sem erros | `pnpm build` sem erros |
| `generate_component_scaffold` funciona | Retorna JSON com a estrutura de 4 camadas e `dss.meta.json` |
| `suggest_token_replacement` funciona | Retorna `--dss-spacing-4` para o input `16px` e `margin` |
| `generate_pre_prompt_template` funciona | Retorna Markdown com os 5 eixos obrigatórios |
| Contrato Read-Only mantido | Nenhuma tool realiza mutações no sistema de arquivos |

---

## 7. Integração com o Workflow do DSS

Com a Fase 3 concluída, o agente de execução (Claude/Manus) passará a atuar muito mais como um **revisor e aplicador** do que como um gerador do zero. O MCP fornecerá o boilerplate, os templates e as sugestões de correção, reduzindo drasticamente o tempo de criação de cada componente e garantindo consistência arquitetural absoluta.
