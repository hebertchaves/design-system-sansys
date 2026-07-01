# Prompt de Execução — DSS MCP Fase 4 (Serviço Remoto)

**Instrução para o usuário:** Copie o bloco de texto abaixo e cole no Claude Code CLI (ou no chat do Claude) para que ele execute a implementação da Fase 4 do MCP.

---

```markdown
Você é o agente responsável por implementar a Fase 4 do servidor MCP do Design System Sansys (DSS).
O objetivo é transformar o servidor MCP atual (que usa transporte stdio) em um serviço HTTP remoto preparado para deploy no AWS Lambda via GitHub Actions.

Siga estritamente as etapas abaixo. Não altere a lógica das ferramentas existentes, apenas o mecanismo de transporte e a infraestrutura de deploy.

## ETAPA 1: Adaptação do Código para HTTP (Express)

1. No diretório `mcp/`, instale as dependências necessárias:
   `npm install express cors`
   `npm install -D @types/express @types/cors serverless-http`

2. Modifique `mcp/src/server.ts`:
   - Mantenha a função `createServer()` intacta.
   - Remova a função `startServer()` que usa `StdioServerTransport`.
   - Crie uma nova função `createExpressApp()` que:
     - Instancie o servidor MCP via `createServer()`.
     - Crie um app Express com middleware JSON e CORS.
     - Importe `SSEServerTransport` de `@modelcontextprotocol/sdk/server/sse.js`.
     - Crie dois endpoints:
       - `GET /mcp/sse`: Inicializa a conexão SSE e retorna o endpoint de mensagens.
       - `POST /mcp/messages`: Recebe as mensagens do cliente e repassa ao transporte.
     - Retorne o app Express.

3. Modifique `mcp/src/index.ts`:
   - Atualize para iniciar o servidor Express na porta 3000 (para uso local) ou exportar o handler para o Lambda.
   - Exemplo de estrutura:
     ```typescript
     import serverless from 'serverless-http';
     import { createExpressApp } from './server.js';
     
     const app = await createExpressApp();
     
     // Para uso local
     if (process.env.NODE_ENV !== 'production') {
       app.listen(3000, () => console.log('DSS MCP Server running on http://localhost:3000/mcp/sse'));
     }
     
     // Para AWS Lambda
     export const handler = serverless(app);
     ```

## ETAPA 2: Infraestrutura como Código (Serverless Framework)

1. Crie o arquivo `mcp/serverless.yml` com a seguinte configuração básica:
   ```yaml
   service: dss-mcp-server
   frameworkVersion: '3'
   
   provider:
     name: aws
     runtime: nodejs20.x
     region: us-east-1
     memorySize: 256
     timeout: 29
     environment:
       NODE_ENV: production
   
   functions:
     api:
       handler: build/index.handler
       events:
         - httpApi:
             path: '/{proxy+}'
             method: '*'
   ```

2. Atualize o `mcp/package.json`:
   - Adicione `serverless` nas `devDependencies`.
   - Garanta que o script de build (`tsup`) esteja gerando o `build/index.js` corretamente com o handler exportado.

## ETAPA 3: Pipeline de CI/CD (GitHub Actions)

1. Crie o arquivo `.github/workflows/deploy-mcp.yml`:
   - Trigger: `push` na branch `main` modificando arquivos no diretório `mcp/`.
   - Jobs:
     - `deploy`:
       - `runs-on: ubuntu-latest`
       - Checkout do código.
       - Setup Node.js 20.
       - `cd mcp && npm ci`
       - `npm run build`
       - Deploy usando a action `serverless/github-action@v3.2` ou rodando `npx serverless deploy`.
       - Configure as credenciais da AWS via secrets (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).

## REGRAS DE OURO
- NÃO modifique nenhuma ferramenta dentro de `mcp/src/tools/`.
- NÃO modifique nenhum recurso dentro de `mcp/src/resources/`.
- O código gerado deve compilar sem erros (`npm run build` e `npm run typecheck`).
- Após implementar, faça um commit com a mensagem: `feat(mcp): implement Phase 4 - HTTP transport and AWS Lambda deployment`.
```
