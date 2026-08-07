# DSS MCP — imagem portável
#
# O servidor MCP NÃO é uma aplicação sem estado: as tools leem o repositório em
# runtime (docs/, packages/core/components, packages/core/tokens, scripts/).
# Por isso o conteúdo viaja DENTRO da imagem — é o que torna o serviço
# executável em qualquer lugar (Lambda com container, ECS, VM, Kubernetes,
# máquina em rede interna) sem clonar nada.
#
# O DSS_MCP_FASE4_PLANO_TECNICO propõe Lambda + API Gateway e trata o servidor
# como stateless. Esta imagem resolve a parte que o plano não previu; a escolha
# de ONDE hospedar continua aberta.
#
# Build (a partir da RAIZ do repositório, não deste diretório):
#   docker build -f packages/mcp/Dockerfile \
#     --build-arg GIT_SHA=$(git rev-parse --short HEAD) \
#     --build-arg GIT_DATE=$(git log -1 --format=%cI) \
#     -t dss-mcp:$(git rev-parse --short HEAD) .
#
# Run:
#   docker run -p 3001:3001 -e DSS_MCP_TOKEN=<segredo> dss-mcp:<sha>

# ─── Estágio 1: build do bundle ───────────────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

# Só o necessário para instalar e compilar o MCP.
COPY package.json package-lock.json* ./
COPY packages/mcp/package.json ./packages/mcp/

# `npm ci` no workspace do MCP. `--ignore-scripts` evita que o `prepare` rode
# antes do código-fonte existir.
RUN npm ci --workspace=@sansys/dss-mcp --include-workspace-root --ignore-scripts \
    || npm install --workspace=@sansys/dss-mcp --ignore-scripts

COPY packages/mcp/ ./packages/mcp/
RUN npm run build --workspace=@sansys/dss-mcp

# ─── Estágio 2: runtime ───────────────────────────────────────────────────────
FROM node:22-alpine AS runtime

# Identidade da versão servida. Um MCP que responde sobre um DSS de três
# semanas atrás é pior que MCP nenhum — ele mente com confiança. O SHA é
# exposto em /health para que a defasagem seja visível, não suposta.
ARG GIT_SHA=unknown
ARG GIT_DATE=unknown
ENV DSS_BUILD_SHA=$GIT_SHA \
    DSS_BUILD_DATE=$GIT_DATE \
    NODE_ENV=production \
    DSS_HTTP_PORT=3001

WORKDIR /app

# Dependências de produção do MCP.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages/mcp/build ./packages/mcp/build
COPY packages/mcp/package.json ./packages/mcp/
COPY package.json ./

# ── Conteúdo lido em runtime ─────────────────────────────────────────────────
# Levantado a partir dos caminhos que as tools realmente abrem. Não é
# conveniência: sem estes diretórios as tools respondem "não encontrado".
COPY docs/ ./docs/
COPY packages/core/components/ ./packages/core/components/
COPY packages/core/tokens/ ./packages/core/tokens/
COPY packages/core/catalog.json ./packages/core/
COPY scripts/emit-spec.mjs scripts/spec-parecer.mjs ./scripts/
COPY CLAUDE.md ./

# Servidor exposto por rede: tools que leem disco recusam caminho fora da raiz,
# e as de ESCRITA se recusam a rodar sem DSS_MCP_TOKEN. Ver
# validateSpecReadiness.ts e o dispatch de record_audit_event.
ENV DSS_MCP_REMOTE=1

# Não rodar como root.
USER node

EXPOSE 3001

# /health é a única rota livre de autenticação — liveness não pode exigir token.
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.DSS_HTTP_PORT||3001)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "packages/mcp/build/sse-server.js"]
