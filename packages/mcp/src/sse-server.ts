#!/usr/bin/env node
/**
 * DSS MCP — HTTP/SSE Server
 *
 * Exposes all DSS MCP tools via HTTP with dual transport support:
 *   - GET  /sse          → SSE stream (legacy MCP clients)
 *   - POST /messages     → SSE message endpoint (legacy)
 *   - POST /mcp          → Streamable HTTP (modern MCP clients, Manus)
 *   - GET  /health       → Health check
 *   - GET  /tools        → Lists all registered tools (human-readable)
 *
 * Usage:
 *   node build/sse-server.js
 *   DSS_HTTP_PORT=3002 node build/sse-server.js
 */

import { createServer, IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "crypto";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer as createMCPServer } from "./server.js";
import { TOOL_DEFINITIONS } from "./tools/index.js";

const PORT = parseInt(process.env.DSS_HTTP_PORT ?? "3002", 10);

// ─── CORS Headers ─────────────────────────────────────────────────────────────
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, mcp-session-id, Accept",
  "Access-Control-Expose-Headers": "mcp-session-id",
};

// ─── Session Store (Streamable HTTP — stateful) ───────────────────────────────
const sessions = new Map<string, StreamableHTTPServerTransport>();

// ─── Body Reader ──────────────────────────────────────────────────────────────
function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

// ─── Main Server ──────────────────────────────────────────────────────────────

// Servidor exposto por rede: tools que leem disco passam a recusar caminho
// fora da raiz do DSS. Ver validateSpecReadiness.
process.env.DSS_MCP_REMOTE = "1";

async function main() {
  // Legacy SSE transport (one per connection)
  const sseTransports = new Map<string, SSEServerTransport>();

  const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    // Autenticação opcional. Quando DSS_MCP_TOKEN está definido, toda rota
    // exceto /health exige Bearer. Sem token definido o servidor segue aberto
    // (uso local), mas as tools de ESCRITA se recusam a rodar — ver
    // record_audit_event em tools/index.ts.
    const expected = process.env.DSS_MCP_TOKEN;
    if (expected && req.url !== "/health" && req.method !== "OPTIONS") {
      const got = (req.headers["authorization"] ?? "").toString();
      if (got !== `Bearer ${expected}`) {
        res.writeHead(401, { "Content-Type": "application/json", ...CORS_HEADERS });
        res.end(JSON.stringify({ error: "Unauthorized" }));
        return;
      }
    }

    const { method, url } = req;

    // CORS preflight
    if (method === "OPTIONS") {
      res.writeHead(204, CORS_HEADERS);
      res.end();
      return;
    }

    // ── Health check ──────────────────────────────────────────────────────────
    if (method === "GET" && url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json", ...CORS_HEADERS });
      res.end(JSON.stringify({
        status: "ok",
        server: "dss-mcp",
        version: "1.0.0",
        transport: ["sse", "streamable-http"],
        port: PORT,
        // Identidade do CONTEÚDO servido, não só do código. O MCP responde a
        // partir do repositório embutido na imagem; sem expor o commit, um
        // serviço defasado mente com confiança e ninguém percebe.
        content: {
          sha: process.env.DSS_BUILD_SHA ?? "dev",
          builtAt: process.env.DSS_BUILD_DATE ?? null,
        },
        remote: process.env.DSS_MCP_REMOTE === "1",
        authRequired: !!process.env.DSS_MCP_TOKEN,
      }));
      return;
    }

    // ── Tools list (human-readable) ───────────────────────────────────────────
    if (method === "GET" && url === "/tools") {
      // Derivado de TOOL_DEFINITIONS. Era um array escrito à mão e JÁ tinha
      // driftado: anunciava 13 tools enquanto o servidor registrava 15
      // (validate_composition e validate_spec_readiness ficaram de fora).
      // Endpoint de descoberta que mente é pior que endpoint ausente.
      const toolNames = TOOL_DEFINITIONS.map((t) => t.name);
      res.writeHead(200, { "Content-Type": "application/json", ...CORS_HEADERS });
      res.end(JSON.stringify({ tools: toolNames, count: toolNames.length }));
      return;
    }

    // ── Legacy SSE: GET /sse ──────────────────────────────────────────────────
    if (method === "GET" && url === "/sse") {
      const mcpServer = await createMCPServer();
      const transport = new SSEServerTransport("/messages", res);
      const sessionId = transport.sessionId;
      sseTransports.set(sessionId, transport);

      res.on("close", () => {
        sseTransports.delete(sessionId);
      });

      await mcpServer.connect(transport);
      return;
    }

    // ── Legacy SSE: POST /messages ────────────────────────────────────────────
    if (method === "POST" && url?.startsWith("/messages")) {
      const sessionId = new URL(url, `http://localhost`).searchParams.get("sessionId") ?? "";
      const transport = sseTransports.get(sessionId);
      if (!transport) {
        res.writeHead(404, { "Content-Type": "application/json", ...CORS_HEADERS });
        res.end(JSON.stringify({ error: `Session not found: ${sessionId}` }));
        return;
      }
      const body = await readBody(req);
      await transport.handlePostMessage(req, res, body);
      return;
    }

    // ── Streamable HTTP: POST /mcp (initialize) ───────────────────────────────
    if (method === "POST" && url === "/mcp") {
      const body = await readBody(req);
      let parsed: any;
      try {
        parsed = JSON.parse(body.toString());
      } catch {
        res.writeHead(400, { "Content-Type": "application/json", ...CORS_HEADERS });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
        return;
      }

      const existingSessionId = req.headers["mcp-session-id"] as string | undefined;

      // Resume existing session
      if (existingSessionId && sessions.has(existingSessionId)) {
        const transport = sessions.get(existingSessionId)!;
        await transport.handleRequest(req, res, parsed);
        return;
      }

      // New session (initialize request)
      if (parsed?.method === "initialize") {
        const sessionId = randomUUID();
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => sessionId,
          enableJsonResponse: false,
        });

        sessions.set(sessionId, transport);
        transport.onclose = () => sessions.delete(sessionId);

        const mcpServer = await createMCPServer();
        await mcpServer.connect(transport);
        await transport.handleRequest(req, res, parsed);
        return;
      }

      res.writeHead(400, { "Content-Type": "application/json", ...CORS_HEADERS });
      res.end(JSON.stringify({ error: "Missing mcp-session-id header or initialize method" }));
      return;
    }

    // ── Streamable HTTP: GET /mcp (SSE stream for existing session) ───────────
    if (method === "GET" && url === "/mcp") {
      const sessionId = req.headers["mcp-session-id"] as string | undefined;
      if (!sessionId || !sessions.has(sessionId)) {
        res.writeHead(404, { "Content-Type": "application/json", ...CORS_HEADERS });
        res.end(JSON.stringify({ error: "Session not found" }));
        return;
      }
      const transport = sessions.get(sessionId)!;
      await transport.handleRequest(req, res);
      return;
    }

    // ── Streamable HTTP: DELETE /mcp (close session) ──────────────────────────
    if (method === "DELETE" && url === "/mcp") {
      const sessionId = req.headers["mcp-session-id"] as string | undefined;
      if (sessionId && sessions.has(sessionId)) {
        const transport = sessions.get(sessionId)!;
        await transport.close();
        sessions.delete(sessionId);
      }
      res.writeHead(204, CORS_HEADERS);
      res.end();
      return;
    }

    // ── 404 ───────────────────────────────────────────────────────────────────
    res.writeHead(404, { "Content-Type": "application/json", ...CORS_HEADERS });
    res.end(JSON.stringify({ error: `Route not found: ${method} ${url}` }));
  });

  server.listen(PORT, () => {
    console.log(`\n🚀 DSS MCP HTTP/SSE Server running on port ${PORT}`);
    console.log(`\n  Endpoints:`);
    console.log(`    GET  /health       → Health check`);
    console.log(`    GET  /tools        → List all tools`);
    console.log(`    GET  /sse          → SSE stream (legacy clients)`);
    console.log(`    POST /messages     → SSE messages (legacy clients)`);
    console.log(`    POST /mcp          → Streamable HTTP (Manus/modern clients)`);
    console.log(`    GET  /mcp          → SSE stream (Streamable HTTP)`);
    console.log(`    DELETE /mcp        → Close session`);
    console.log(`\n  DSS_ROOT: ${process.env.DSS_ROOT ?? "(auto-detected)"}`);
    console.log(`\n  Ready to accept connections.\n`);
  });
}

main().catch((err) => {
  console.error("DSS MCP SSE Server failed to start:", err);
  process.exit(1);
});
