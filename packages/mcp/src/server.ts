import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerResources } from "./resources/index.js";
import { registerTools } from "./tools/index.js";

/**
 * DSS MCP Server — Phase 1: Read-Only Foundation
 *
 * Operates strictly in Read-Only mode per MCP_READ_ONLY_CONTRACT.md.
 * No tool may write, modify or delete any file.
 */
export async function createServer(): Promise<Server> {
  const server = new Server(
    {
      name: "dss-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    }
  );

  registerResources(server);
  registerTools(server);

  return server;
}

export async function startServer(): Promise<void> {
  const server = await createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
