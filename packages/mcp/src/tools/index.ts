import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { queryComponent } from "./queryComponent.js";
import { queryToken } from "./queryToken.js";
import { checkCompliance } from "./checkCompliance.js";
import { getTodoListStatus } from "./getTodoListStatus.js";
import { validatePrePrompt } from "./validatePrePrompt.js";
import { validateComponentCode } from "./validateComponentCode.js";
import { suggestTokenReplacement } from "./suggestTokenReplacement.js";
import { generateComponentScaffold } from "./generateComponentScaffold.js";
import { generatePrePromptTemplate } from "./generatePrePromptTemplate.js";
import { recordAuditEvent } from "./recordAuditEvent.js";
import { validateGridLayout } from "./validateGridLayout.js";
import { validateComposition } from "./validateComposition.js";
import { validateSpecReadiness } from "./validateSpecReadiness.js";
import { requestSpecParecer } from "./requestSpecParecer.js";
import { describeGridInspector } from "./describeGridInspector.js";
import { validateVisualContract, validate_visual_contract_schema } from "./validateVisualContract.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
// After tsup bundle: __dirname = packages/mcp/build/ → go up 3 levels to reach DSS root
const DSS_ROOT = resolve(__dirname, "../../..");

// ─── Input Schemas (Zod) ──────────────────────────────────────────────────────

const QueryComponentSchema = z.object({
  componentName: z
    .string()
    .describe(
      'Name of the DSS component (e.g. "DssCard", "DssButton", "card"). Case-insensitive, Dss prefix optional.'
    ),
});

const QueryTokenSchema = z.object({
  tokenName: z
    .string()
    .optional()
    .describe(
      'Exact token name (e.g. "--dss-color-brand-primary", "--dss-spacing-md"). Takes precedence over category.'
    ),
  category: z
    .string()
    .optional()
    .describe(
      'Token category to search (e.g. "color", "spacing", "radius", "typography", "shadow", "motion", "border").'
    ),
});

const CheckComplianceSchema = z.object({
  context: z
    .string()
    .describe(
      'Description of the usage to evaluate (e.g. "Using DssCard with border-radius of 8px hardcoded").'
    ),
  ruleType: z
    .enum(["composition", "token", "accessibility"])
    .describe(
      '"composition" — layer structure, pseudo-elements, SCSS patterns. "token" — token usage, hardcoded values. "accessibility" — WCAG rules, touch target, ARIA.'
    ),
});

const GetTodoListStatusSchema = z.object({
  filter: z
    .enum(["all", "pending", "sealed", "blocked"])
    .optional()
    .default("all")
    .describe(
      'Filter results: "all" returns everything, "pending" returns only actionable items, "sealed" returns completed items, "blocked" returns blocked items.'
    ),
});

const ValidatePrePromptSchema = z.object({
  componentName: z
    .string()
    .describe(
      'Name of the DSS component whose pre-prompt should be validated (e.g. "DssBtnGroup", "DssTab"). Case-sensitive, Dss prefix required.'
    ),
});

const ValidateComponentCodeSchema = z.object({
  componentName: z
    .string()
    .describe(
      'Name of the DSS component to validate (e.g. "DssCard", "DssButton", "card"). Case-insensitive, Dss prefix optional.'
    ),
});

// ── Phase 3 schemas ────────────────────────────────────────────────────────

const SuggestTokenReplacementSchema = z.object({
  value: z
    .string()
    .describe(
      'The hardcoded CSS value to find a token for (e.g. "#FF5722", "rgb(0,0,0)", "16px", "1rem").'
    ),
  property: z
    .string()
    .describe(
      'The CSS property where this value is used (e.g. "color", "background-color", "padding", "border-radius"). Used to filter relevant token categories.'
    ),
});

const GenerateComponentScaffoldSchema = z.object({
  componentName: z
    .string()
    .describe(
      'Name of the new DSS component (e.g. "DssCard", "card", "dss-card"). Case-insensitive, Dss prefix optional.'
    ),
  type: z
    .enum(["base", "composed"])
    .optional()
    .default("base")
    .describe(
      '"base" for atomic/base components (components/base/). "composed" for composite components (components/composed/). Defaults to "base".'
    ),
});

const GeneratePrePromptTemplateSchema = z.object({
  componentName: z
    .string()
    .describe(
      'Name of the DSS component to generate a pre-prompt for (e.g. "DssBtnGroup", "DssTab"). Case-insensitive, Dss prefix optional.'
    ),
});

// ── Phase 5 schemas ────────────────────────────────────────────────────────

const GridSpacingSchema = z.object({
  x: z.number().describe("Horizontal spacing in pixels."),
  y: z.number().describe("Vertical spacing in pixels."),
});

const ValidateGridLayoutSchema = z.object({
  overlay: z
    .object({
      columns: z.number().int().positive().describe("Number of grid columns (e.g. 4, 8, 12, 16, 24)."),
      gutter: GridSpacingSchema,
      margin: GridSpacingSchema,
      padding: GridSpacingSchema,
    })
    .optional()
    .describe("Grid overlay configuration (visual grid layer)."),
  layout: z
    .object({
      gutter: GridSpacingSchema,
      margin: GridSpacingSchema,
      padding: GridSpacingSchema,
      autoColumnWidth: z.boolean().optional().describe("Whether columns should auto-size."),
    })
    .optional()
    .describe("Layout configuration (functional grid layer)."),
  viewportWidth: z
    .number()
    .optional()
    .describe("Viewport width in pixels (used for breakpoint-aware suggestions)."),
  brand: z
    .enum(["hub", "water", "waste"])
    .optional()
    .describe("DSS brand context."),
  theme: z
    .enum(["light", "dark"])
    .optional()
    .describe("Theme context."),
});

// ── Composition schema (ui-rules.schema.json consumer) ─────────────────────

interface CompositionNodeInput {
  component: string;
  variant?: string;
  props?: Record<string, unknown>;
  states?: string[];
  children?: CompositionNodeInput[];
}

const CompositionNodeSchema: z.ZodType<CompositionNodeInput> = z.lazy(() =>
  z.object({
    component: z
      .string()
      .describe(
        'Component or element name: "DssCard", "q-checkbox", "text", "div".'
      ),
    variant: z
      .string()
      .optional()
      .describe('Variant in use (e.g. "elevated") — used by variant-qualified rules.'),
    props: z
      .record(z.unknown())
      .optional()
      .describe("Props declared on this node — checked against required_props."),
    states: z
      .array(z.string())
      .optional()
      .describe(
        'States this node declares (e.g. ["empty", "loading", "error"]). Tables and lists must declare "empty" and "loading".'
      ),
    children: z.array(CompositionNodeSchema).optional(),
  })
);

const ValidateCompositionSchema = z.object({
  tree: CompositionNodeSchema.describe(
    "Root node of the proposed component tree."
  ),
  context: z
    .string()
    .optional()
    .describe('Screen context for the report (e.g. "Atender Solicitações — listagem").'),
});

const ValidateSpecReadinessSchema = z
  .object({
    specPath: z
      .string()
      .optional()
      .describe(
        'Caminho do .md da spec. Em servidor REMOTO só é aceito dentro da raiz do DSS — para arquivo do analista use specContent.'
      ),
    specContent: z
      .string()
      .optional()
      .describe(
        'Conteúdo do markdown da spec. Use esta forma quando o MCP estiver hospedado: o arquivo do analista não existe no servidor.'
      ),
  })
  .refine((v) => !!(v.specPath || v.specContent), {
    message: "Informe specPath ou specContent.",
  });

const RequestSpecParecerSchema = z
  .object({
    specPath: z.string().optional().describe("Caminho do .md da spec (em servidor remoto, só dentro da raiz do DSS)."),
    specContent: z.string().optional().describe("Conteúdo do markdown da spec. Use quando o MCP estiver hospedado."),
  })
  .refine((v) => !!(v.specPath || v.specContent), { message: "Informe specPath ou specContent." });

// ── Phase 4 schemas ────────────────────────────────────────────────────────

const RecordAuditEventSchema = z.object({
  componentName: z
    .string()
    .describe(
      'Name of the DSS component (e.g. "DssPageSticky", "DssButton"). Case-insensitive, Dss prefix optional.'
    ),
  phase: z
    .enum(["initial-audit", "correction", "revalidation", "seal-granted"])
    .describe(
      '"initial-audit" — first audit pass. "correction" — after NC/GAP fixes. "revalidation" — MCP re-check after correction. "seal-granted" — final seal emission; also sets status=granted in dss.meta.json.'
    ),
  verdict: z
    .enum(["compliant", "non-compliant", "pending"])
    .describe(
      '"compliant" — zero violations. "non-compliant" — violations found. "pending" — corrections in progress.'
    ),
  ncs: z
    .number()
    .int()
    .min(0)
    .default(0)
    .describe("Number of non-conformities (NCs) found or resolved in this phase."),
  gaps: z
    .number()
    .int()
    .min(0)
    .default(0)
    .describe("Number of gaps found or resolved in this phase."),
  notes: z
    .string()
    .optional()
    .default("")
    .describe("Free-text notes about the audit phase (e.g. which NCs were fixed)."),
  auditor: z
    .string()
    .optional()
    .default("Claude Code — Auditor DSS v2.5")
    .describe('Auditor identity. Defaults to "Claude Code — Auditor DSS v2.5".'),
});

// ─── Tool Definitions ─────────────────────────────────────────────────────────

export const TOOL_DEFINITIONS = [
  // ── Phase 1 Tools ──────────────────────────────────────────────────────────
  {
    name: "query_component",
    description:
      "Returns detailed information about a specific DSS component: compliance status, phase, golden references, props, pre-prompt and documentation. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        componentName: {
          type: "string",
          description:
            'Name of the DSS component (e.g. "DssCard", "DssButton", "card"). Case-insensitive, Dss prefix optional.',
        },
      },
      required: ["componentName"],
    },
  },
  {
    name: "query_token",
    description:
      "Searches DSS_TOKEN_REFERENCE.md for a specific token or token category. Returns the matching section(s) with full documentation. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        tokenName: {
          type: "string",
          description:
            'Exact token name (e.g. "--dss-color-brand-primary"). Optional if category is provided.',
        },
        category: {
          type: "string",
          description:
            'Token category (e.g. "color", "spacing", "radius", "typography", "shadow", "motion", "border").',
        },
      },
    },
  },
  {
    name: "check_compliance",
    description:
      "Evaluates whether a described usage is compliant with DSS governance rules. Strictly descriptive — never corrective. Per MCP_READ_ONLY_CONTRACT.md, the MCP observes and explains but never decides or changes.",
    inputSchema: {
      type: "object" as const,
      properties: {
        context: {
          type: "string",
          description:
            'Description of the usage to evaluate (e.g. "Using brightness(0.93) for hover state in DssButton").',
        },
        ruleType: {
          type: "string",
          enum: ["composition", "token", "accessibility"],
          description:
            '"composition" — layers, pseudo-elements, SCSS. "token" — token usage, hardcoded values. "accessibility" — WCAG, touch target, ARIA.',
        },
      },
      required: ["context", "ruleType"],
    },
  },
  // ── Phase 2 Tools ──────────────────────────────────────────────────────────
  {
    name: "get_todo_list_status",
    description:
      "Returns the current progress of the DSS Phase 2 implementation by parsing DSS_FASE2_TODO.md. Shows sealed, pending, in-progress and blocked components. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        filter: {
          type: "string",
          enum: ["all", "pending", "sealed", "blocked"],
          description:
            'Filter results: "all" (default), "pending" (actionable), "sealed" (completed), "blocked".',
        },
      },
    },
  },
  {
    name: "validate_pre_prompt",
    description:
      "Verifies whether a DSS component pre-prompt covers all 5 mandatory axes required by Phase 2 criteria: (1) Classification, (2) Main Architectural Risk, (3) Mapped API, (4) Tokens, (5) Accessibility & States. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        componentName: {
          type: "string",
          description:
            'Name of the DSS component (e.g. "DssBtnGroup", "DssTab"). Dss prefix required.',
        },
      },
      required: ["componentName"],
    },
  },
  {
    name: "validate_component_code",
    description:
      "Analyzes the source code of a DSS component (Vue + SCSS) and checks for architectural violations: missing 4-layer structure, hardcoded colors (Token First), :deep() usage (Gate de Composição v2.4), and component-specific tokens. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        componentName: {
          type: "string",
          description:
            'Name of the DSS component to validate (e.g. "DssCard", "card"). Case-insensitive.',
        },
      },
      required: ["componentName"],
    },
  },
  // ── Phase 3 Tools ──────────────────────────────────────────────────────────
  {
    name: "suggest_token_replacement",
    description:
      "Analyzes a hardcoded CSS value and suggests the closest DSS design token from DSS_TOKEN_REFERENCE.md. Supports hex colors (#rrggbb), rgb/rgba(), pixel values (px), and rem values. Returns the best match with confidence level (exact/close/approximate) and up to 3 alternatives. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        value: {
          type: "string",
          description:
            'The hardcoded CSS value to find a token for (e.g. "#FF5722", "16px", "1rem", "rgb(0,0,0)").',
        },
        property: {
          type: "string",
          description:
            'The CSS property where this value is used (e.g. "color", "padding", "border-radius"). Used to filter relevant token categories.',
        },
      },
      required: ["value", "property"],
    },
  },
  {
    name: "generate_component_scaffold",
    description:
      "Generates the complete 4-layer boilerplate for a new DSS component (Vue + SCSS + types + composables + documentation). Returns a JSON with all file paths and their content. The developer must apply the files manually — the MCP never writes files. Follows DSS architectural constraints strictly.",
    inputSchema: {
      type: "object" as const,
      properties: {
        componentName: {
          type: "string",
          description:
            'Name of the new DSS component (e.g. "DssCard", "card"). Case-insensitive, Dss prefix optional.',
        },
        type: {
          type: "string",
          enum: ["base", "composed"],
          description:
            '"base" for atomic/base components (components/base/). "composed" for composite components (components/composed/). Defaults to "base".',
        },
      },
      required: ["componentName"],
    },
  },
  {
    name: "generate_pre_prompt_template",
    description:
      "Generates a pre-prompt markdown document for a new DSS component, covering all 5 mandatory governance axes: (1) Classification, (2) Main Architectural Risk, (3) Mapped API, (4) Required Tokens, (5) Accessibility & States. If the component directory exists, auto-populates known data from dss.meta.json. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        componentName: {
          type: "string",
          description:
            'Name of the DSS component to generate a pre-prompt for (e.g. "DssBtnGroup", "DssTab"). Case-insensitive, Dss prefix optional.',
        },
      },
      required: ["componentName"],
    },
  },
  // ── Phase 5 Tools ──────────────────────────────────────────────────────────
  validate_visual_contract_schema,
  {
    name: "describe_grid_inspector",
    description:
      "Returns the complete operational manual of the Grid Inspector tool: its 5 operational fronts (Visual Debugger, Layout Editor, Token Validator, Brand Switcher, CI Reporter), architecture (Overlay Grid vs Layout Grid), all 5 panel descriptions, canonical breakpoints, valid DSS spacing tokens, CSS variables written to :root, MCP integration details, CI Gate usage (validate-grid-ci.mjs), and key concepts (Selection Mode, Density Mode, Bookmarklet). CALL THIS TOOL FIRST before using validate_grid_layout or performing any grid inspection task. No input required.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "validate_grid_layout",
    description:
      "Validates a grid/layout configuration against DSS spacing tokens and best practices. Checks: (1) spacing uses DSS tokens (CRITICAL), (2) overlay vs layout sync (CRITICAL), (3) column count conventions (HIGH), (4) responsive optimization (INFO). Returns verdict, violations and suggestions. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        overlay: {
          type: "object",
          description: "Grid overlay configuration (visual grid layer).",
          properties: {
            columns: { type: "number", description: "Number of grid columns (e.g. 4, 8, 12, 16, 24)." },
            gutter: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] },
            margin: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] },
            padding: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] },
          },
          required: ["columns", "gutter", "margin", "padding"],
        },
        layout: {
          type: "object",
          description: "Layout configuration (functional grid layer).",
          properties: {
            gutter: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] },
            margin: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] },
            padding: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } }, required: ["x", "y"] },
            autoColumnWidth: { type: "boolean", description: "Whether columns should auto-size." },
          },
          required: ["gutter", "margin", "padding"],
        },
        viewportWidth: {
          type: "number",
          description: "Viewport width in pixels for breakpoint-aware suggestions.",
        },
        brand: {
          type: "string",
          enum: ["hub", "water", "waste"],
          description: "DSS brand context.",
        },
        theme: {
          type: "string",
          enum: ["light", "dark"],
          description: "Theme context.",
        },
      },
    },
  },
  {
    name: "validate_composition",
    description:
      "Validates a proposed component tree (a screen, a section, a form) against the DSS composition contract in docs/guides/ui-rules/ui-rules.schema.json. Checks: (1) every node is a real DSS component — catches raw Quasar with a DSS equivalent and invented component names (CRITICAL), (2) forbidden/allowed children and forbidden contexts (CRITICAL/HIGH), (3) self-nesting such as dialog over dialog (CRITICAL), (4) Matryoshka hierarchy inversion (MEDIUM), (5) required props (HIGH), (6) tables and lists must declare empty and loading states (HIGH), (7) form field density (MEDIUM). CALL THIS TOOL BEFORE generating screen or Phase 3 composed-component code. Returns verdict, violations with tree paths, and schemaIntegrity — the schema's own vocabulary existence-checked against the real catalog. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        tree: {
          type: "object",
          description:
            'Root node of the proposed component tree. Each node: { component, variant?, props?, states?, children? }. Use "text" for text nodes. Declare states like ["empty","loading"] on tables and lists.',
          properties: {
            component: { type: "string", description: 'Component or element name (e.g. "DssCard", "q-checkbox", "text").' },
            variant: { type: "string", description: 'Variant in use (e.g. "elevated").' },
            props: { type: "object", description: "Props declared on this node." },
            states: { type: "array", items: { type: "string" }, description: 'Declared states (e.g. ["empty","loading","error"]).' },
            children: { type: "array", items: { type: "object" }, description: "Child nodes, same shape." },
          },
          required: ["component"],
        },
        context: {
          type: "string",
          description: 'Screen context for the report (e.g. "Atender Solicitações — listagem").',
        },
      },
      required: ["tree"],
    },
  },
  {
    name: "validate_spec_readiness",
    description:
      "Portão de prontidão da ESPECIFICAÇÃO FUNCIONAL do analista. Lê o markdown que o analista já escreve (nada precisa ser reescrito em outro formato) e devolve um relatório de completude por regime: (a) detecta o GÊNERO do documento — especificação funcional completa vs lista de requisitos de mudança — e só cobra o que aquele gênero exige; (b) lista as seções obrigatórias ausentes; (c) lista o que a spec NÃO DIZ e bloqueia a passagem para a fase de Entrega (estado vazio, estado de carregamento, estado de erro, veículo da mensagem, superfície da tela); (d) aponta recomendados sem bloquear (volume esperado, responsividade); (e) registra acessibilidade como débito de HORIZONTE, que nunca reprova. CHAME ANTES de gerar qualquer código ou protótipo a partir de uma spec. Verifica COMPLETUDE, nunca a correção da regra de negócio. Read-Only.",
    inputSchema: {
      type: "object" as const,
      properties: {
        specPath: {
          type: "string",
          description:
            "Caminho do .md da spec. Em servidor remoto só vale dentro da raiz do DSS.",
        },
        specContent: {
          type: "string",
          description:
            "Conteúdo do markdown da spec. Use esta forma quando o MCP estiver hospedado.",
        },
      },
    },
  },
  {
    name: "request_spec_parecer",
    description:
      "Devolve um ROTEIRO para VOCÊ (agente) ler a especificação funcional e emitir um parecer semântico. NÃO É GATE: não reprova, não emite veredito e não altera o resultado de validate_spec_readiness. Complementa o portão determinístico — enquanto aquele verifica se a spec MENCIONA algo, este roteiro pergunta se o que ela DIZ é coerente: contradição interna, referência órfã, cobertura entre regra/cenário/critério, vagueza que decide comportamento de tela, termo inconsistente, estado sem transição, caminho infeliz sem contrapartida visual, e escopo negativo furado pelo corpo. REGRA OBRIGATÓRIA da sua resposta: toda observação carrega CITAÇÃO literal da spec — sem âncora é opinião e deve ser descartada. NÃO opine sobre a correção da regra de negócio nem repita o que o portão já apontou. Zero observações é resposta válida. Read-Only.",
    inputSchema: {
      type: "object" as const,
      properties: {
        specPath: { type: "string", description: "Caminho do .md da spec." },
        specContent: { type: "string", description: "Conteúdo do markdown da spec (use quando hospedado)." },
      },
    },
  },
  // ── Phase 4 Tools ──────────────────────────────────────────────────────────
  {
    name: "record_audit_event",
    description:
      "Records an audit event in the auditHistory[] of a component's dss.meta.json. When phase='seal-granted' and verdict='compliant', also sets status='granted', auditDate, and seal fields. CONTROLLED WRITE — authorized by MCP_READ_ONLY_CONTRACT.md v0.2. Only modifies auditHistory, status, auditDate and seal fields. Requires explicit human request.",
    inputSchema: {
      type: "object" as const,
      properties: {
        componentName: {
          type: "string",
          description:
            'Name of the DSS component (e.g. "DssPageSticky", "DssButton"). Case-insensitive, Dss prefix optional.',
        },
        phase: {
          type: "string",
          enum: ["initial-audit", "correction", "revalidation", "seal-granted"],
          description:
            '"initial-audit" — first audit pass. "correction" — after NC/GAP fixes. "revalidation" — MCP re-check after correction. "seal-granted" — final seal; also sets status=granted.',
        },
        verdict: {
          type: "string",
          enum: ["compliant", "non-compliant", "pending"],
          description:
            '"compliant" — zero violations. "non-compliant" — violations found. "pending" — corrections in progress.',
        },
        ncs: {
          type: "number",
          description: "Number of non-conformities in this phase. Default: 0.",
        },
        gaps: {
          type: "number",
          description: "Number of gaps in this phase. Default: 0.",
        },
        notes: {
          type: "string",
          description: "Free-text notes about this audit phase.",
        },
        auditor: {
          type: "string",
          description: 'Auditor identity. Default: "Claude Code — Auditor DSS v2.5".',
        },
      },
      required: ["componentName", "phase", "verdict"],
    },
  },
];

// ─── Handler Registration ─────────────────────────────────────────────────────

export function registerTools(server: Server): void {
  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: TOOL_DEFINITIONS };
  });

  // Execute a tool call
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      // ── Phase 1 ────────────────────────────────────────────────────────────
      case "query_component": {
        const input = QueryComponentSchema.parse(args);
        const result = await queryComponent(input.componentName, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "query_token": {
        const input = QueryTokenSchema.parse(args);
        const result = await queryToken(DSS_ROOT, input.tokenName, input.category);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "check_compliance": {
        const input = CheckComplianceSchema.parse(args);
        const result = await checkCompliance(
          input.context,
          input.ruleType as "composition" | "token" | "accessibility",
          DSS_ROOT
        );
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      // ── Phase 2 ────────────────────────────────────────────────────────────
      case "get_todo_list_status": {
        const input = GetTodoListStatusSchema.parse(args ?? {});
        const result = await getTodoListStatus(DSS_ROOT);

        // Apply filter if requested
        if (input.filter && input.filter !== "all") {
          result.all_items = result.all_items.filter(
            (i) => i.status === input.filter
          );
        }

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "validate_pre_prompt": {
        const input = ValidatePrePromptSchema.parse(args);
        const result = await validatePrePrompt(input.componentName, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "validate_component_code": {
        const input = ValidateComponentCodeSchema.parse(args);
        const result = await validateComponentCode(input.componentName, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      // ── Phase 3 ────────────────────────────────────────────────────────────
      case "suggest_token_replacement": {
        const input = SuggestTokenReplacementSchema.parse(args);
        const result = await suggestTokenReplacement(input.value, input.property, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "generate_component_scaffold": {
        const input = GenerateComponentScaffoldSchema.parse(args ?? {});
        const result = await generateComponentScaffold(
          input.componentName,
          input.type as "base" | "composed"
        );
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "generate_pre_prompt_template": {
        const input = GeneratePrePromptTemplateSchema.parse(args);
        const result = await generatePrePromptTemplate(input.componentName, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      // ── Phase 5 ──────────────────────────────────────────────────────────────────
      case "validate_visual_contract": {
        return await validateVisualContract(args);
      }

      case "describe_grid_inspector": {
        const result = await describeGridInspector();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "validate_grid_layout": {
        const input = ValidateGridLayoutSchema.parse(args ?? {});
        const result = await validateGridLayout(input, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "validate_composition": {
        const input = ValidateCompositionSchema.parse(args ?? {});
        const result = await validateComposition(input, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "validate_spec_readiness": {
        const input = ValidateSpecReadinessSchema.parse(args ?? {});
        const result = await validateSpecReadiness(input, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "request_spec_parecer": {
        const input = RequestSpecParecerSchema.parse(args ?? {});
        const result = await requestSpecParecer(input, DSS_ROOT);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

      // ── Phase 4 ────────────────────────────────────────────────────────────
      case "record_audit_event": {
        // Única tool que ESCREVE em disco (auditHistory do dss.meta.json).
        // Num servidor exposto por rede sem autenticação, qualquer um poderia
        // mutar o histórico de auditoria do repositório. Fail-safe: recusa.
        if (process.env.DSS_MCP_REMOTE === "1" && !process.env.DSS_MCP_TOKEN) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                error:
                  "record_audit_event é uma tool de ESCRITA e está desabilitada: " +
                  "o servidor está exposto por rede (DSS_MCP_REMOTE=1) sem DSS_MCP_TOKEN. " +
                  "Defina um token para habilitar, ou use o servidor local via stdio.",
              }, null, 2),
            }],
          };
        }
        const input = RecordAuditEventSchema.parse(args ?? {});
        const result = await recordAuditEvent(
          input.componentName,
          input.phase,
          input.verdict,
          input.ncs,
          input.gaps,
          input.notes,
          input.auditor,
          DSS_ROOT
        );
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      default:
        throw new Error(
          `Unknown tool: "${name}". Available tools: ${TOOL_DEFINITIONS.map((t) => t.name).join(", ")}`
        );
    }
  });
}
