#!/usr/bin/env node
import { startServer } from "./server.js";

startServer().catch((err) => {
  console.error("DSS MCP Server failed to start:", err);
  process.exit(1);
});
