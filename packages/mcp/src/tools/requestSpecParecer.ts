import { existsSync } from "fs";
import { resolve, isAbsolute, relative } from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const run = promisify(execFile);

/**
 * request_spec_parecer — Read-Only. NÃO É GATE.
 *
 * Devolve um ROTEIRO para o agente chamador ler a spec e emitir parecer
 * semântico. Não emite veredito, não reprova, não altera o resultado do
 * portão determinístico (validate_spec_readiness).
 *
 * ── Por que o DSS não chama um LLM aqui ─────────────────────────────────────
 * O MCP não faz nenhuma chamada de rede, e o MCP_READ_ONLY_CONTRACT §3 exige
 * que ele "observe e explique, mas nunca decida". Embutir juízo probabilístico
 * no DSS o tornaria criativo e não-reprodutível, e daria à opinião a aparência
 * de veredito da ferramenta. O agente que chama esta tool JÁ é um LLM lendo a
 * spec — o juízo mora nele, visivelmente do lado de fora do DSS.
 *
 * Contrato de resposta (imposto pelo roteiro): toda observação carrega CITAÇÃO
 * literal da spec. Sem âncora é opinião; com âncora, um humano confere em
 * segundos. Mesmo princípio do `verifiedBy` do contrato de componente.
 */

export interface SpecParecerInput {
  specPath?: string;
  specContent?: string;
}

export interface SpecParecerResult {
  found: boolean;
  source: string;
  isGate: false;
  roteiro?: unknown;
  notice: string;
  error?: string;
}

const isRemote = () => process.env.DSS_MCP_REMOTE === "1";

export async function requestSpecParecer(
  input: SpecParecerInput,
  dssRoot: string
): Promise<SpecParecerResult> {
  const { specPath, specContent } = input;

  if (!specPath && !specContent) {
    return {
      found: false,
      source: "",
      isGate: false,
      notice: NOTICE,
      error: "Informe specPath ou specContent.",
    };
  }

  if (specContent !== undefined) {
    return runScript(
      dssRoot,
      ["--stdin", "--label", specPath ?? "spec.md", "--json"],
      specContent,
      specPath ?? "(conteúdo enviado)"
    );
  }

  const abs = isAbsolute(specPath!) ? specPath! : resolve(dssRoot, specPath!);

  if (isRemote()) {
    const rel = relative(dssRoot, abs);
    if (rel.startsWith("..") || isAbsolute(rel)) {
      return {
        found: false,
        source: abs,
        isGate: false,
        notice: NOTICE,
        error:
          "Servidor remoto: caminho fora da raiz do DSS é recusado. Envie o markdown em specContent.",
      };
    }
  }

  if (!existsSync(abs)) {
    return {
      found: false,
      source: abs,
      isGate: false,
      notice: NOTICE,
      error: "Arquivo não encontrado.",
    };
  }

  return runScript(dssRoot, [abs, "--json"], undefined, abs);
}

/** Delega ao script — fonte única do roteiro. Esta tool não duplica perguntas. */
async function runScript(
  dssRoot: string,
  args: string[],
  stdin: string | undefined,
  label: string
): Promise<SpecParecerResult> {
  const script = resolve(dssRoot, "scripts/spec-parecer.mjs");
  if (!existsSync(script)) {
    return {
      found: false,
      source: label,
      isGate: false,
      notice: NOTICE,
      error: "scripts/spec-parecer.mjs não encontrado.",
    };
  }

  try {
    const pending = run("node", ["--", script, ...args], {
      cwd: dssRoot,
      maxBuffer: 20 * 1024 * 1024,
    });
    if (stdin !== undefined) pending.child.stdin?.end(stdin);
    const { stdout } = await pending;

    return {
      found: true,
      source: label,
      isGate: false,
      roteiro: JSON.parse(stdout),
      notice: NOTICE,
    };
  } catch (err) {
    return {
      found: true,
      source: label,
      isGate: false,
      notice: NOTICE,
      error: `Falha ao montar o roteiro: ${(err as Error).message}`,
    };
  }
}

const NOTICE = `
Roteiro de Parecer Semântico — NÃO É GATE

Isto NÃO reprova nada, NÃO emite veredito e NÃO altera o resultado de
validate_spec_readiness (esse sim é o portão determinístico).

O DSS monta o roteiro; QUEM RESPONDE É VOCÊ. O MCP não chama LLM: o
MCP_READ_ONLY_CONTRACT §3 exige que ele observe e explique, nunca decida.

REGRA DA RESPOSTA: toda observação exige CITAÇÃO literal da spec. Sem âncora,
é opinião e deve ser descartada. Com âncora, um humano confere em segundos.

NÃO responda sobre: correção da regra de negócio (se o prazo deveria ser 5 e
não 3 dias); nada que o portão determinístico já apontou por ausência.

Zero observações é resposta válida — e ausência de observações NÃO significa
que a spec está correta, apenas que nada foi notado.
`.trim();
