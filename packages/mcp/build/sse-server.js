#!/usr/bin/env node
import {
  createServer
} from "./chunk-VP5GV46V.js";
import "./chunk-AHFFMYGG.js";

// src/sse-server.ts
import { createServer as createServer2 } from "http";
import { randomUUID } from "crypto";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
var PORT = parseInt(process.env.DSS_HTTP_PORT ?? "3002", 10);
var CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, mcp-session-id, Accept",
  "Access-Control-Expose-Headers": "mcp-session-id"
};
var sessions = /* @__PURE__ */ new Map();
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
async function main() {
  const sseTransports = /* @__PURE__ */ new Map();
  const server = createServer2(async (req, res) => {
    const { method, url } = req;
    if (method === "OPTIONS") {
      res.writeHead(204, CORS_HEADERS);
      res.end();
      return;
    }
    if (method === "GET" && url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json", ...CORS_HEADERS });
      res.end(JSON.stringify({
        status: "ok",
        server: "dss-mcp",
        version: "1.0.0",
        transport: ["sse", "streamable-http"],
        port: PORT
      }));
      return;
    }
    if (method === "GET" && url === "/tools") {
      const toolNames = [
        "query_component",
        "query_token",
        "check_compliance",
        "get_todo_list_status",
        "validate_pre_prompt",
        "validate_component_code",
        "suggest_token_replacement",
        "generate_component_scaffold",
        "generate_pre_prompt_template",
        "record_audit_event",
        "validate_visual_contract",
        "describe_grid_inspector",
        "validate_grid_layout"
      ];
      res.writeHead(200, { "Content-Type": "application/json", ...CORS_HEADERS });
      res.end(JSON.stringify({ tools: toolNames, count: toolNames.length }));
      return;
    }
    if (method === "GET" && url === "/sse") {
      const mcpServer = await createServer();
      const transport = new SSEServerTransport("/messages", res);
      const sessionId = transport.sessionId;
      sseTransports.set(sessionId, transport);
      res.on("close", () => {
        sseTransports.delete(sessionId);
      });
      await mcpServer.connect(transport);
      return;
    }
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
    if (method === "POST" && url === "/mcp") {
      const body = await readBody(req);
      let parsed;
      try {
        parsed = JSON.parse(body.toString());
      } catch {
        res.writeHead(400, { "Content-Type": "application/json", ...CORS_HEADERS });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
        return;
      }
      const existingSessionId = req.headers["mcp-session-id"];
      if (existingSessionId && sessions.has(existingSessionId)) {
        const transport = sessions.get(existingSessionId);
        await transport.handleRequest(req, res, parsed);
        return;
      }
      if (parsed?.method === "initialize") {
        const sessionId = randomUUID();
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => sessionId,
          enableJsonResponse: false
        });
        sessions.set(sessionId, transport);
        transport.onclose = () => sessions.delete(sessionId);
        const mcpServer = await createServer();
        await mcpServer.connect(transport);
        await transport.handleRequest(req, res, parsed);
        return;
      }
      res.writeHead(400, { "Content-Type": "application/json", ...CORS_HEADERS });
      res.end(JSON.stringify({ error: "Missing mcp-session-id header or initialize method" }));
      return;
    }
    if (method === "GET" && url === "/mcp") {
      const sessionId = req.headers["mcp-session-id"];
      if (!sessionId || !sessions.has(sessionId)) {
        res.writeHead(404, { "Content-Type": "application/json", ...CORS_HEADERS });
        res.end(JSON.stringify({ error: "Session not found" }));
        return;
      }
      const transport = sessions.get(sessionId);
      await transport.handleRequest(req, res);
      return;
    }
    if (method === "DELETE" && url === "/mcp") {
      const sessionId = req.headers["mcp-session-id"];
      if (sessionId && sessions.has(sessionId)) {
        const transport = sessions.get(sessionId);
        await transport.close();
        sessions.delete(sessionId);
      }
      res.writeHead(204, CORS_HEADERS);
      res.end();
      return;
    }
    res.writeHead(404, { "Content-Type": "application/json", ...CORS_HEADERS });
    res.end(JSON.stringify({ error: `Route not found: ${method} ${url}` }));
  });
  server.listen(PORT, () => {
    console.log(`
\u{1F680} DSS MCP HTTP/SSE Server running on port ${PORT}`);
    console.log(`
  Endpoints:`);
    console.log(`    GET  /health       \u2192 Health check`);
    console.log(`    GET  /tools        \u2192 List all tools`);
    console.log(`    GET  /sse          \u2192 SSE stream (legacy clients)`);
    console.log(`    POST /messages     \u2192 SSE messages (legacy clients)`);
    console.log(`    POST /mcp          \u2192 Streamable HTTP (Manus/modern clients)`);
    console.log(`    GET  /mcp          \u2192 SSE stream (Streamable HTTP)`);
    console.log(`    DELETE /mcp        \u2192 Close session`);
    console.log(`
  DSS_ROOT: ${process.env.DSS_ROOT ?? "(auto-detected)"}`);
    console.log(`
  Ready to accept connections.
`);
  });
}
main().catch((err) => {
  console.error("DSS MCP SSE Server failed to start:", err);
  process.exit(1);
});
