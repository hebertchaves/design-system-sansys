#!/usr/bin/env node
import {
  validateGridLayout
} from "./chunk-AHFFMYGG.js";

// src/http-server.ts
import { createServer } from "http";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
var __dirname = dirname(fileURLToPath(import.meta.url));
var DSS_ROOT = resolve(__dirname, "../..");
var PORT = parseInt(process.env.DSS_HTTP_PORT ?? "3001", 10);
var CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
function readBody(req) {
  return new Promise((resolve2, reject) => {
    let body = "";
    req.on("data", (chunk) => body += chunk);
    req.on("end", () => resolve2(body));
    req.on("error", reject);
  });
}
async function handleValidateGridLayout(req, res) {
  try {
    const raw = await readBody(req);
    const config = raw ? JSON.parse(raw) : {};
    const result = await validateGridLayout(config, DSS_ROOT);
    res.writeHead(200, { "Content-Type": "application/json", ...CORS_HEADERS });
    res.end(JSON.stringify(result));
  } catch (err) {
    const message = err instanceof SyntaxError ? `Invalid JSON: ${err.message}` : String(err);
    res.writeHead(400, { "Content-Type": "application/json", ...CORS_HEADERS });
    res.end(JSON.stringify({ error: message }));
  }
}
var server = createServer(async (req, res) => {
  const { method, url } = req;
  if (method === "OPTIONS") {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }
  if (method === "POST" && url === "/api/validate-grid-layout") {
    await handleValidateGridLayout(req, res);
    return;
  }
  res.writeHead(404, { "Content-Type": "application/json", ...CORS_HEADERS });
  res.end(JSON.stringify({ error: `Route not found: ${method} ${url}` }));
});
server.listen(PORT, () => {
  console.log(`DSS Grid Validation HTTP server \u2192 http://localhost:${PORT}`);
  console.log(`  POST /api/validate-grid-layout`);
  console.log(`  DSS_ROOT: ${DSS_ROOT}`);
});
