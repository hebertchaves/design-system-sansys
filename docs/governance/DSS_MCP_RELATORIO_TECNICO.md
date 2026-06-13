# Relatório — MCP do Design System Sansys (DSS)

**Projeto:** Design System Sansys · **Documento:** Técnico-Gerencial · **Data:** 15 Abr 2026

---

## 1. O que é o MCP do DSS

**MCP** (Model Context Protocol) é um protocolo aberto criado pela Anthropic que permite que modelos de linguagem (LLMs) como o Claude se conectem a sistemas externos de forma padronizada — lendo dados, executando funções e recebendo contexto sem que isso precise ser hardcoded no prompt de cada conversa.

No contexto do DSS, o MCP é um **servidor autônomo** que roda localmente (`build/index.js`) e expõe toda a base de conhecimento e as regras de governança do Design System como ferramentas callable pelo Claude. Em vez de cada desenvolvedor precisar copiar manualmente as regras do `CLAUDE.md` para cada sessão, o Claude consulta o servidor MCP diretamente, em tempo real.

### Analogia operacional

> Pense no MCP como o **RH automatizado do DSS**: quando um desenvolvedor pergunta ao Claude "esse componente está em conformidade?", o MCP vai ao repositório, lê os arquivos reais, aplica as regras reais e devolve uma avaliação real — sem depender da memória do modelo ou de prompts longos.

### Princípio fundamental: Read-Only Contract

O MCP do DSS opera sob um contrato estrito: **nunca escreve, nunca modifica, nunca decide**. Toda ação destrutiva ou de criação permanece responsabilidade do desenvolvedor humano. O MCP observa, analisa e gera sugestões — nada além.

---

## 2. Vantagens e Ganhos

### 2.1 Consistência de governança sem esforço manual

Antes do MCP, aplicar as regras do DSS em cada conversa com o Claude exigia:
- Copiar trechos do `CLAUDE.md` no prompt
- Lembrar quais tokens existem e quais foram descontinuados
- Saber de cor quais componentes já foram selados

Com o MCP, o Claude consulta os arquivos reais do repositório a cada chamada. Se um token foi removido no sprint passado, o MCP já reflete isso — sem reescrever prompts.

### 2.2 Redução de não-conformidades na implementação

A ferramenta `validate_component_code` analisa estaticamente o SCSS e Vue de qualquer componente antes de ele ir para auditoria. Detecta:

| Violação | Regra DSS | Impacto sem MCP |
|---|---|---|
| Cor hexadecimal hardcoded | Princípio #1 Token First | NC detectada só na auditoria |
| `:deep()` / `::v-deep` | Gate de Composição v2.4 | Retrabalho de SCSS completo |
| Token de componente específico | Princípio #6 | Refatoração de token naming |
| Camada arquitetural ausente | 4-Layer Architecture | Bloqueio no Gate Estrutural |
| `dss.meta.json` ausente | Governança | Inelegível para selo |

Com o enriquecimento de Fase 3, cada violação de cor ou px agora vem acompanhada do token DSS mais próximo — o desenvolvedor não precisa mais consultar manualmente o `DSS_TOKEN_REFERENCE.md`.

### 2.3 Geração de boilerplate garantidamente correto

`generate_component_scaffold` gera todos os 17 arquivos da arquitetura obrigatória de uma vez — com estrutura de pastas correta, imports corretos entre camadas, tipos TypeScript, composable, orchestrador SCSS na ordem certa (L2→L3→L4), entry-point wrapper, `dss.meta.json` pré-configurado e documentação no Template 13.1.

Um desenvolvedor partindo do zero sem o MCP tem chance real de esquecer a camada `4-output/`, errar o import do orchestrador ou criar o componente principal dentro do wrapper ao invés de em `1-structure/` — erros que só aparecem na auditoria.

### 2.4 Onboarding acelerado de novos desenvolvedores

`generate_pre_prompt_template` gera o documento de pré-prompt completo com os 5 eixos obrigatórios, já populado com:
- Lições aprendidas de componentes anteriores (tokens inexistentes, padrões proibidos)
- Checklist pré-implementação
- Prompt de criação pronto para enviar ao Claude
- Links para os Golden References corretos

Um desenvolvedor novo tem acesso imediato a todo o conhecimento acumulado em 15+ ciclos de auditoria do DSS.

### 2.5 Rastreabilidade do estado do backlog

`get_todo_list_status` lê o `DSS_FASE2_TODO.md` em tempo real e retorna o estado atual de todos os componentes com filtros (`pending`, `sealed`, `blocked`). Nenhuma planilha paralela desatualizada.

---

## 3. Abrangência Operacional

### 3.1 Fases implementadas

| Fase | Nome | Foco | Status |
|---|---|---|---|
| **Fase 1** | Read-Only Foundation | Consulta e validação descritiva | ✅ Completa |
| **Fase 2** | Audit Assistant | Governança de backlog e pré-prompts | ✅ Completa |
| **Fase 3** | Co-Creator | Geração de scaffold e sugestão de tokens | ✅ Completa |

### 3.2 Ferramentas disponíveis (9 tools)

**Fase 1 — Consulta**

| Tool | Entrada | O que faz |
|---|---|---|
| `query_component` | `componentName` | Lê `dss.meta.json`, pré-prompt e documentação do componente. Retorna status, fase, Golden References, props, data de selo. |
| `query_token` | `tokenName?`, `category?` | Busca tokens no `DSS_TOKEN_REFERENCE.md` por nome exato ou categoria. |
| `check_compliance` | `context`, `ruleType` | Avalia texto/código descrito contra regras de composição, token ou acessibilidade. |

**Fase 2 — Auditoria**

| Tool | Entrada | O que faz |
|---|---|---|
| `get_todo_list_status` | `filter?` | Lê `DSS_FASE2_TODO.md` e retorna progresso filtrado (`all`/`pending`/`sealed`/`blocked`). |
| `validate_pre_prompt` | `componentName` | Verifica se o pré-prompt cobre os 5 eixos obrigatórios. Retorna eixos presentes/ausentes. |
| `validate_component_code` | `componentName` | Análise estática do SCSS/Vue: camadas, `:deep()`, cores hardcoded, tokens genéricos. Com sugestão de token por violação (Fase 3). |

**Fase 3 — Co-Creator**

| Tool | Entrada | O que faz |
|---|---|---|
| `suggest_token_replacement` | `value`, `property` | Recebe um valor hardcoded (hex, rgb, px, rem) e retorna o token DSS mais próximo com nível de confiança e alternativas. |
| `generate_component_scaffold` | `componentName`, `type?` | Gera os 17 arquivos do boilerplate DSS completo como JSON. O desenvolvedor aplica manualmente. |
| `generate_pre_prompt_template` | `componentName` | Gera documento markdown com os 5 eixos, auto-populado com dados do `dss.meta.json` se o componente já existir. |

### 3.3 Recursos (Resources — URIs `dss://`)

O MCP expõe os principais documentos normativos como recursos acessíveis por URI, sem necessidade de argumentos:

| URI | Documento |
|---|---|
| `dss://governance/claude` | `CLAUDE.md` — regras operacionais máximas |
| `dss://governance/faseamento` | `DSS_FASEAMENTO_COMPONENTES.md` |
| `dss://governance/tokens` | `DSS_TOKEN_REFERENCE.md` — catálogo completo |
| `dss://governance/golden-model` | `DSS_GOLDEN_COMPONENTS.md` |
| `dss://governance/criterios-fase2` | `DSS_CRITERIOS_AVALIACAO_FASE2.md` |
| `dss://todo/fase2` | `DSS_FASE2_TODO.md` |

### 3.4 Escopo de componentes cobertos

Qualquer componente em `components/base/` ou `components/composed/` é válido como entrada. O servidor normaliza automaticamente nomes como `"card"`, `"dss-card"` ou `"DssCard"` para o formato canônico `DssCard`.

---

## 4. Detalhes Técnicos

### 4.1 Arquitetura do servidor

```
DSS/mcp/
├── src/
│   ├── index.ts              ← Entrypoint (shebang node)
│   ├── server.ts             ← Instância do Server MCP (stdio transport)
│   ├── tools/
│   │   ├── index.ts          ← Registro de tools + schemas Zod
│   │   ├── queryComponent.ts
│   │   ├── queryToken.ts
│   │   ├── checkCompliance.ts
│   │   ├── getTodoListStatus.ts
│   │   ├── validatePrePrompt.ts
│   │   ├── validateComponentCode.ts   ← + enriquecimento de tokens (Fase 3)
│   │   ├── suggestTokenReplacement.ts ← Fase 3
│   │   ├── generateComponentScaffold.ts ← Fase 3
│   │   └── generatePrePromptTemplate.ts ← Fase 3
│   └── resources/
│       └── index.ts          ← URIs dss:// → arquivos do repositório
└── build/
    └── index.js              ← Bundle ESM compilado (tsup)
```

### 4.2 Stack tecnológico

| Componente | Tecnologia | Versão |
|---|---|---|
| Protocolo | `@modelcontextprotocol/sdk` | `^1.29.0` |
| Validação de input | `zod` | `^3.25.28` |
| Transport | `StdioServerTransport` | — |
| Compilação | `tsup` (bundle ESM) | `^8.0.0` |
| Linguagem | TypeScript strict | `^5.0.0` |
| Runtime | Node.js (ESM) | — |

### 4.3 Protocolo de comunicação

O servidor utiliza **transporte stdio** (Standard Input/Output). O cliente MCP (Claude Desktop, Claude Code, etc.) abre o processo `node build/index.js`, escreve JSON no stdin e lê respostas do stdout. Não há porta de rede, não há servidor HTTP — o processo vive apenas enquanto o cliente está conectado.

### 4.4 Validação de input (Zod)

Todos os inputs são validados com schemas Zod antes de chegarem ao handler. Entradas inválidas retornam erro de validação com mensagem descritiva — o processo nunca crashea por input malformado.

### 4.5 Análise de SCSS — algoritmo de detecção

`validateComponentCode` executa as seguintes etapas em ordem:

```
1. Coleta todos os .scss do diretório do componente (recursivo)
2. Coleta todos os .vue e extrai blocos <style>
3. Para cada arquivo:
   a. stripBlockComments()  — substitui /* ... */ por \n equivalentes
                              (preserva números de linha)
   b. Por linha: remove comentários // inline
   c. Aplica 4 verificações no código limpo:
      - :deep() / ::v-deep          → error GATE_COMPOSICAO_V2.4
      - hex/rgb/hsl hardcoded        → error TOKEN_FIRST
      - pixel hardcoded (>2px)       → warning TOKEN_FIRST
      - token específico de componente → error PRINCIPLE_6
4. Post-processing: suggestTokenReplacement() em paralelo
   para cada finding com _hardcodedValue
5. Strip de campos internos (_hardcodedValue, _cssProperty)
6. Cálculo de verdict: compliant / non-compliant / uncertain
```

### 4.6 Matching de tokens — algoritmo de sugestão

`suggestTokenReplacement` funciona em dois modos:

**Cores (hex/rgb):**
- Converte o valor de entrada para RGB `{r, g, b}`
- Filtra tokens por categoria via `PROPERTY_TO_CATEGORY` (ex: `color` → categorias `["color", "gray", "hub", ...]`)
- Calcula distância euclidiana RGB para cada token candidato: `√((r₁-r₂)² + (g₁-g₂)² + (b₁-b₂)²)`
- Classifica confiança: `exact` (Δ=0), `close` (Δ<15), `approximate` (Δ≥15)

**Comprimentos (px/rem):**
- Converte rem para px (×16) para comparação uniforme
- Filtra por categoria (ex: `padding` → `["spacing"]`)
- Ordena por `|valor_token_px - valor_input_px|`
- Confiança: `exact` (Δ=0), `close` (Δ≤2px), `approximate` (Δ>2px)

**Base de dados:** Parseada em tempo de execução do `DSS_TOKEN_REFERENCE.md` via regex de tabela markdown — sem banco de dados externo, sem cache em disco.

### 4.7 Build e deploy

```bash
# Compilar
npm run build
# Saída: DSS/mcp/build/index.js (ESM bundle, ~79KB)

# Iniciar manualmente
node build/index.js

# Configuração no Claude Desktop (claude_desktop_config.json)
{
  "mcpServers": {
    "dss": {
      "command": "node",
      "args": ["/caminho/para/DSS/mcp/build/index.js"]
    }
  }
}
```

### 4.8 Limites e restrições conhecidas

| Limitação | Detalhe |
|---|---|
| Sem cache de tokens | O `DSS_TOKEN_REFERENCE.md` é relido a cada chamada de `suggest_token_replacement`. Aceitável para uso interativo; para alta frequência, seria necessário cache em memória. |
| Parsing por regex | A análise de SCSS não usa AST — edge cases muito incomuns (ex: seletores multi-linha complexos) podem gerar falsos positivos ou falsos negativos. |
| Read-only por design | Nenhuma ferramenta cria arquivos. O `generate_component_scaffold` retorna JSON com conteúdo — o desenvolvedor aplica manualmente ou via script auxiliar. |
| `query_component` cobre apenas `base` | `validateComponentCode` cobre `base` e `composed`, mas `queryComponent` busca apenas em `components/base/`. |

---

## Síntese

O MCP do DSS transformou a governança do design system de um processo reativo (detectar erros na auditoria) para um processo preventivo (detectar erros no momento da escrita). As três fases cobrem o ciclo completo de vida de um componente: **consulta** → **auditoria** → **co-criação**. O modelo de Read-Only Contract garante que a automação amplia a capacidade humana sem substituir o julgamento técnico nas decisões de arquitetura.
