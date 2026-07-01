# 🔌 INTEGRAÇÃO: validate_grid_layout no MCP DSS

## 📁 Arquivos a criar no repositório DSS

### 1. `/mcp/src/tools/validateGridLayout.ts`

✅ **JÁ CRIADO** - Arquivo principal da tool de validação de grid.

### 2. Atualizar `/mcp/src/tools/index.ts`

Adicionar as seguintes linhas:

#### A. Imports (no início do arquivo)

```typescript
import { validateGridLayout } from "./validateGridLayout.js";
```

#### B. Schema Zod (na seção "Input Schemas")

```typescript
const ValidateGridLayoutSchema = z.object({
  config: z.object({
    overlay: z
      .object({
        columns: z.number().int().min(1),
        gutter: z.object({ x: z.number(), y: z.number() }),
        margin: z.object({ x: z.number(), y: z.number() }),
        padding: z.object({ x: z.number(), y: z.number() }),
      })
      .optional()
      .describe(
        "Grid overlay configuration (visual reference). All spacing values should use DSS tokens."
      ),
    layout: z
      .object({
        gutter: z.object({ x: z.number(), y: z.number() }),
        margin: z.object({ x: z.number(), y: z.number() }),
        padding: z.object({ x: z.number(), y: z.number() }),
        autoColumnWidth: z
          .boolean()
          .optional()
          .describe("Whether columns adapt to viewport width"),
      })
      .optional()
      .describe(
        "Real component layout configuration (applied to actual components)."
      ),
    viewportWidth: z
      .number()
      .optional()
      .describe(
        "Current viewport width in pixels (for breakpoint-specific suggestions)"
      ),
    brand: z
      .enum(["hub", "water", "waste"])
      .optional()
      .describe("DSS brand (for brand-specific validation)"),
    theme: z
      .enum(["light", "dark"])
      .optional()
      .describe("Theme mode (for contrast validation)"),
  }).describe("Complete grid configuration to validate"),
});
```

#### C. Tool Definition (na array `TOOL_DEFINITIONS`)

```typescript
{
  name: "validate_grid_layout",
  description:
    "Validates grid/layout configuration against DSS spacing tokens and best practices. Checks: (1) Spacing values use DSS tokens [CRITICAL], (2) Overlay vs Layout sync [CRITICAL], (3) Column count conventions [HIGH], (4) Responsive optimization suggestions [INFO]. Returns violations with severity levels and actionable suggestions. Read-Only — no files are modified.",
  inputSchema: {
    type: "object" as const,
    properties: {
      config: {
        type: "object",
        description: "Complete grid configuration to validate",
        properties: {
          overlay: {
            type: "object",
            description: "Grid overlay configuration (visual reference)",
            properties: {
              columns: { type: "number", description: "Number of columns" },
              gutter: {
                type: "object",
                properties: {
                  x: { type: "number", description: "Horizontal gutter (px)" },
                  y: { type: "number", description: "Vertical gutter (px)" },
                },
                required: ["x", "y"],
              },
              margin: {
                type: "object",
                properties: {
                  x: { type: "number", description: "Horizontal margin (px)" },
                  y: { type: "number", description: "Vertical margin (px)" },
                },
                required: ["x", "y"],
              },
              padding: {
                type: "object",
                properties: {
                  x: { type: "number", description: "Horizontal padding (px)" },
                  y: { type: "number", description: "Vertical padding (px)" },
                },
                required: ["x", "y"],
              },
            },
            required: ["columns", "gutter", "margin", "padding"],
          },
          layout: {
            type: "object",
            description: "Real component layout configuration",
            properties: {
              gutter: {
                type: "object",
                properties: {
                  x: { type: "number", description: "Horizontal gutter (px)" },
                  y: { type: "number", description: "Vertical gutter (px)" },
                },
                required: ["x", "y"],
              },
              margin: {
                type: "object",
                properties: {
                  x: { type: "number", description: "Horizontal margin (px)" },
                  y: { type: "number", description: "Vertical margin (px)" },
                },
                required: ["x", "y"],
              },
              padding: {
                type: "object",
                properties: {
                  x: { type: "number", description: "Horizontal padding (px)" },
                  y: { type: "number", description: "Vertical padding (px)" },
                },
                required: ["x", "y"],
              },
              autoColumnWidth: {
                type: "boolean",
                description: "Whether columns adapt to viewport width",
              },
            },
            required: ["gutter", "margin", "padding"],
          },
          viewportWidth: {
            type: "number",
            description: "Current viewport width in pixels",
          },
          brand: {
            type: "string",
            enum: ["hub", "water", "waste"],
            description: "DSS brand",
          },
          theme: {
            type: "string",
            enum: ["light", "dark"],
            description: "Theme mode",
          },
        },
      },
    },
    required: ["config"],
  },
},
```

#### D. Handler (no switch statement de `CallToolRequestSchema`)

Adicionar case **ANTES** do `default`:

```typescript
// ── Grid Validation ────────────────────────────────────────────────────
case "validate_grid_layout": {
  const input = ValidateGridLayoutSchema.parse(args);
  const result = await validateGridLayout(input.config, DSS_ROOT);
  return {
    content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
  };
}
```

---

## 🧪 TESTE MANUAL

Após integrar, testar localmente:

### 1. Build do MCP Server

```bash
cd mcp
npm run build
```

### 2. Teste com config válido

Criar arquivo `test-grid-valid.json`:
```json
{
  "config": {
    "overlay": {
      "columns": 12,
      "gutter": { "x": 24, "y": 24 },
      "margin": { "x": 16, "y": 16 },
      "padding": { "x": 24, "y": 24 }
    },
    "layout": {
      "gutter": { "x": 24, "y": 24 },
      "margin": { "x": 16, "y": 16 },
      "padding": { "x": 24, "y": 24 },
      "autoColumnWidth": false
    },
    "viewportWidth": 1440
  }
}
```

Chamar via MCP:
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"validate_grid_layout","arguments":'$(cat test-grid-valid.json)'}}' | node build/index.js
```

**Resultado esperado:**
```json
{
  "verdict": "compliant",
  "summary": { "critical": 0, "high": 0, "medium": 0, "low": 0, "info": 0, "total": 0 },
  "violations": [],
  "suggestions": []
}
```

### 3. Teste com config inválido

Criar arquivo `test-grid-invalid.json`:
```json
{
  "config": {
    "overlay": {
      "columns": 10,
      "gutter": { "x": 15, "y": 16 },
      "margin": { "x": 16, "y": 16 },
      "padding": { "x": 24, "y": 24 }
    },
    "layout": {
      "gutter": { "x": 24, "y": 24 },
      "margin": { "x": 16, "y": 16 },
      "padding": { "x": 24, "y": 24 }
    },
    "viewportWidth": 1440
  }
}
```

**Resultado esperado:**
```json
{
  "verdict": "non-compliant",
  "summary": { "critical": 2, "high": 1, "medium": 0, "low": 0, "info": 0, "total": 3 },
  "violations": [
    {
      "severity": "critical",
      "category": "spacing",
      "message": "overlay.gutter.x deve usar token DSS",
      "context": {
        "property": "overlay.gutter.x",
        "actual": 15,
        "suggestion": { "value": 16, "token": "--dss-spacing-4" }
      }
    },
    {
      "severity": "critical",
      "category": "sync",
      "message": "⚠️ Inconsistência detectada: Overlay e Layout desincronizados em gutter.x"
    },
    {
      "severity": "high",
      "category": "columns",
      "message": "10 colunas não segue convenção comum",
      "context": {
        "property": "overlay.columns",
        "actual": 10,
        "suggestion": 12
      }
    }
  ]
}
```

---

## 📊 EXEMPLO DE USO EM OUTROS PROJETOS

### Via MCP Client (quando HTTP server estiver pronto)

```typescript
// Em qualquer projeto React/Vue
import { McpClient } from '@modelcontextprotocol/sdk/client';

const client = new McpClient({
  url: 'http://dss-mcp-server.sansys.com/mcp'
});

// Validar configuração de grid
const result = await client.callTool('validate_grid_layout', {
  config: {
    overlay: { columns: 12, gutter: { x: 24, y: 24 }, ... },
    layout: { gutter: { x: 24, y: 24 }, ... },
    viewportWidth: window.innerWidth
  }
});

if (result.verdict !== 'compliant') {
  console.error('Violations:', result.violations);
  // Exibir alertas na UI
}
```

### Via Grid Inspector (projeto atual)

```typescript
// src/observability/dss-signals.ts (modificar sendToMcp)
async function sendToMcp(signal: DssSignal): Promise<void> {
  if (signal.signal === 'grid_compliance_check') {
    // Chamar validate_grid_layout via MCP
    const result = await mcpClient.callTool('validate_grid_layout', {
      config: {
        overlay: signal.data.context.overlay,
        layout: signal.data.context.layout,
        viewportWidth: window.innerWidth
      }
    });

    // Emitir resultado como evento
    window.dispatchEvent(new CustomEvent('mcp-validation', {
      detail: { signal, result }
    }));
  }
}
```

---

## ✅ CHECKLIST DE INTEGRAÇÃO

- [x] Copiar `validateGridLayout.ts` para `mcp/src/tools/`
- [ ] Adicionar import no `index.ts`
- [ ] Adicionar Schema Zod
- [ ] Adicionar Tool Definition
- [ ] Adicionar Handler no switch
- [ ] Build: `npm run build`
- [ ] Testar com config válido
- [ ] Testar com config inválido
- [ ] Commit e push para GitHub
- [ ] Atualizar CHANGELOG.md do DSS
- [ ] (Futuro) Expor via HTTP server

---

## 📚 REFERÊNCIAS

- `GRID_INSPECTOR_MCP_CONTRACT_v0.1.md` - Contrato original
- `mcp/src/tools/checkCompliance.ts` - Padrão de validação
- `mcp/src/tools/index.ts` - Registro de tools
- Material Design Grid Specification

---

**Tool pronta para integração no MCP Server DSS v1.0**
