import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const validate_visual_contract_schema = {
  name: "validate_visual_contract",
  description: "Validates if a component's actual computed CSS values match its declared defaultPreview contract in dss.meta.json. CALL THIS TOOL to verify visual fidelity after modifying a component's SCSS.",
  inputSchema: {
    type: "object",
    properties: {
      componentName: {
        type: "string",
        description: "The exact name of the DSS component to validate (e.g., 'DssButton', 'DssCard').",
      },
    },
    required: ["componentName"],
  },
};

// Raiz do monorepo: DSS_ROOT (env) ou relativo ao bundle. Após o tsup,
// __dirname = packages/mcp/build/ → 3 níveis até a raiz (mesmo padrão de
// resources/index.ts). O bug anterior usava process.cwd() relativo,
// quebrando fora do diretório esperado (achado A12; Onda P2/G4.3).
const DSS_ROOT = process.env.DSS_ROOT ?? path.resolve(__dirname, "../../..");
const COMPONENT_GROUPS = ["base", "composed", "stress-test"];

export async function validateVisualContract(args: any) {
  const { componentName } = args;

  let actualMetaPath: string | null = null;
  for (const group of COMPONENT_GROUPS) {
    const candidate = path.join(DSS_ROOT, "packages", "core", "components", group, componentName, "dss.meta.json");
    if (fs.existsSync(candidate)) {
      actualMetaPath = candidate;
      break;
    }
  }

  if (actualMetaPath === null) {
    return {
      content: [
        {
          type: "text",
          text: `Error: Component ${componentName} not found or missing dss.meta.json (searched ${COMPONENT_GROUPS.join(", ")} under ${DSS_ROOT}).`,
        },
      ],
      isError: true,
    };
  }

  try {
    const metaContent = fs.readFileSync(actualMetaPath, "utf8");
    const meta = JSON.parse(metaContent);

    if (!meta.defaultPreview) {
      return {
        content: [
          {
            type: "text",
            text: `Error: Component ${componentName} does not have a defaultPreview contract defined in its dss.meta.json.`,
          },
        ],
        isError: true,
      };
    }

    // Em uma implementação real, isso usaria Puppeteer/Playwright para renderizar o componente
    // e extrair os valores computados reais via window.getComputedStyle().
    // Para o escopo atual, retornamos um relatório simulado indicando que a infraestrutura
    // de teste visual contínuo está sendo preparada.

    const report = `
# Visual Contract Validation Report: ${componentName}

**Status:** ⚠️ PENDING INFRASTRUCTURE — resposta DECLARATIVA, sem renderização real. NÃO usar como critério de aceite (A12/Onda P2).
**Contract Found:** Yes

## Declared Contract (defaultPreview)
\`\`\`json
${JSON.stringify(meta.defaultPreview, null, 2)}
\`\`\`

## Validation Strategy
This tool is currently a placeholder for the Phase 4 Visual Regression Pipeline.
When fully implemented, it will:
1. Mount ${componentName} in a headless browser using the props defined in \`defaultPreview.props\`.
2. Extract actual computed dimensions (height, width) and compare against \`defaultPreview.computedDimensions\`.
3. Extract actual computed tokens (padding, gap, radius) and compare against \`defaultPreview.visualProperties\`.

**Action Required for Agents:**
Until the headless browser infrastructure is merged, you MUST manually verify that the SCSS in \`2-composition/_base.scss\` explicitly implements the tokens declared in the \`defaultPreview.visualProperties\` array above.
Note: \`computedTokens\` was deprecated in DSS v2.4.0 — use \`visualProperties\` as the authoritative source.
`;

    return {
      content: [
        {
          type: "text",
          text: report,
        },
      ],
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error reading or parsing dss.meta.json for ${componentName}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}
