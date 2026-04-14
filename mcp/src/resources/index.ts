import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// After tsup bundle: __dirname = mcp/build/ → go up 2 levels to reach DSS root
const DSS_ROOT = resolve(__dirname, "../..");

/**
 * Maps each dss:// URI to an absolute path in the DSS repository.
 * All paths are read-only — fs.readFileSync only.
 */
const RESOURCE_MAP: Record<
  string,
  { path: string; name: string; description: string; mimeType: string }
> = {
  "dss://governance/claude": {
    path: resolve(DSS_ROOT, "CLAUDE.md"),
    name: "DSS CLAUDE.md — Regras Normativas",
    description:
      "Regras normativas e arquitetura base do DSS. Documento de autoridade máxima para agentes de IA.",
    mimeType: "text/markdown",
  },
  "dss://governance/faseamento": {
    path: resolve(DSS_ROOT, "docs/reference/DSS_FASEAMENTO_COMPONENTES.md"),
    name: "DSS Faseamento de Componentes",
    description:
      "Classificação e fases de todos os componentes DSS (Fase 1, Fase 2, backlog).",
    mimeType: "text/markdown",
  },
  "dss://governance/tokens": {
    path: resolve(DSS_ROOT, "docs/reference/DSS_TOKEN_REFERENCE.md"),
    name: "DSS Token Reference",
    description:
      "Referência completa de todos os tokens de design do DSS com semântica e uso.",
    mimeType: "text/markdown",
  },
  "dss://governance/golden-model": {
    path: resolve(DSS_ROOT, "docs/governance/DSS_GOLDEN_COMPONENTS.md"),
    name: "DSS Golden Components",
    description:
      "Modelo de referência (Golden Reference e Golden Context) para auditoria de componentes.",
    mimeType: "text/markdown",
  },
  "dss://governance/criterios-fase2": {
    path: resolve(
      DSS_ROOT,
      "docs/governance/DSS_CRITERIOS_AVALIACAO_FASE2.md"
    ),
    name: "DSS Critérios de Avaliação — Fase 2",
    description:
      "Critérios formais de avaliação para componentes candidatos ao selo DSS v2.2.",
    mimeType: "text/markdown",
  },
  "dss://todo/fase2": {
    path: resolve(DSS_ROOT, "docs/reference/DSS_FASE2_TODO.md"),
    name: "DSS Fase 2 — To-Do List",
    description:
      "Estado atual do backlog e lista de tarefas pendentes para a Fase 2 do DSS.",
    mimeType: "text/markdown",
  },
};

export function registerResources(server: Server): void {
  // List all available resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: Object.entries(RESOURCE_MAP).map(([uri, meta]) => ({
        uri,
        name: meta.name,
        description: meta.description,
        mimeType: meta.mimeType,
      })),
    };
  });

  // Read a specific resource by URI
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;
    const resource = RESOURCE_MAP[uri];

    if (!resource) {
      throw new Error(
        `Resource not found: "${uri}". Available resources: ${Object.keys(RESOURCE_MAP).join(", ")}`
      );
    }

    // READ-ONLY: fs.readFileSync only — no write operations permitted
    let content: string;
    try {
      content = readFileSync(resource.path, "utf-8");
    } catch (err) {
      throw new Error(
        `Failed to read DSS file at "${resource.path}": ${(err as Error).message}`
      );
    }

    return {
      contents: [
        {
          uri,
          mimeType: resource.mimeType,
          text: content,
        },
      ],
    };
  });
}
