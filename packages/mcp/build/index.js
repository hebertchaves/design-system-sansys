#!/usr/bin/env node
import {
  startServer
} from "./chunk-3CEX5LT3.js";
import "./chunk-AHFFMYGG.js";

// src/index.ts
startServer().catch((err) => {
  console.error("DSS MCP Server failed to start:", err);
  process.exit(1);
});
