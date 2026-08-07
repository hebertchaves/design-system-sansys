import { existsSync } from "fs";
import { resolve, isAbsolute, relative } from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const run = promisify(execFile);

/**
 * validate_spec_readiness — Read-Only
 *
 * Portão de prontidão da especificação funcional. Lê o markdown que o analista
 * JÁ escreve e devolve o relatório de completude por regime.
 *
 * Delega ao emissor `scripts/emit-spec.mjs` em vez de reimplementar as regras:
 * duplicar a lógica criaria duas fontes de verdade que divergem em silêncio —
 * exatamente o modo de falha que esta frente inteira existe para combater.
 *
 * NÃO é instrumento de fiscalização do analista. Descoberta e Solução são
 * construção conjunta de designer + analista; o relatório diz à DUPLA quando a
 * spec está pronta para atravessar para a Entrega.
 *
 * Mode: descriptive only — never corrective, never mutating.
 * Per MCP_READ_ONLY_CONTRACT.md §3.
 */

export interface SpecReadinessResult {
  found: boolean;
  specPath: string;
  verdict?: string;
  genre?: string;
  ontologyVersion?: string;
  blocking?: unknown;
  warnings?: unknown;
  horizon?: unknown;
  inventory?: unknown;
  extractorHealth?: unknown;
  limits?: string[];
  notice: string;
  error?: string;
}

export interface SpecReadinessInput {
  specPath?: string;
  specContent?: string;
}

/**
 * O servidor exposto por HTTP marca DSS_MCP_REMOTE=1. Nesse modo, aceitar
 * caminho arbitrário seria LEITURA DE ARQUIVO ARBITRÁRIO no host — a versão
 * anterior aceitava qualquer caminho absoluto. Cliente remoto usa specContent.
 */
const isRemote = () => process.env.DSS_MCP_REMOTE === "1";

export async function validateSpecReadiness(
  input: SpecReadinessInput | string,
  dssRoot: string
): Promise<SpecReadinessResult> {
  const { specPath, specContent } =
    typeof input === "string" ? { specPath: input, specContent: undefined } : input;

  if (!specPath && !specContent) {
    return { found: false, specPath: "", notice: READ_ONLY_NOTICE, error: "Informe specPath ou specContent." };
  }

  if (specContent !== undefined) {
    return runEmitter(dssRoot, ["--stdin", "--label", specPath ?? "spec.md", "--json"], specContent, specPath ?? "(conteúdo enviado)");
  }

  const abs = isAbsolute(specPath!) ? specPath! : resolve(dssRoot, specPath!);

  if (isRemote()) {
    const rel = relative(dssRoot, abs);
    if (rel.startsWith("..") || isAbsolute(rel)) {
      return {
        found: false,
        specPath: abs,
        notice: READ_ONLY_NOTICE,
        error: "Servidor remoto: caminho fora da raiz do DSS é recusado. Envie o markdown em specContent.",
      };
    }
  }

  if (!existsSync(abs)) {
    return {
      found: false,
      specPath: abs,
      notice: READ_ONLY_NOTICE,
      error: "Arquivo não encontrado. Informe o caminho do .md da especificação funcional.",
    };
  }

  return runEmitter(dssRoot, [abs, "--json"], undefined, abs);
}

/** Executa o emissor — fonte ÚNICA das regras. Esta tool não reimplementa nada. */
async function runEmitter(
  dssRoot: string,
  args: string[],
  stdin: string | undefined,
  label: string
): Promise<SpecReadinessResult> {
  const emitter = resolve(dssRoot, "scripts/emit-spec.mjs");
  if (!existsSync(emitter)) {
    return {
      found: false,
      specPath: label,
      notice: READ_ONLY_NOTICE,
      error: "scripts/emit-spec.mjs não encontrado — o emissor é a fonte das regras.",
    };
  }

  try {
    // `run` é promisify(execFile): devolve PromiseWithChild, então dá para
    // escrever no stdin do processo e ainda assim aguardar o resultado.
    const pending = run("node", ["--", emitter, ...args], {
      cwd: dssRoot,
      maxBuffer: 20 * 1024 * 1024, // specs carregam imagens base64 grandes
    });
    if (stdin !== undefined) pending.child.stdin?.end(stdin);
    const { stdout } = await pending;

    const r = JSON.parse(stdout);

    return {
      found: true,
      specPath: label,
      verdict: r.veredito,
      genre: r.genero,
      ontologyVersion: r.ontologiaVersao,
      blocking: {
        secoesAusentes: r.faltamObrigatorias,
        naoDeclarado: r.lacunas?.bloqueantes,
      },
      warnings: r.lacunas?.avisos,
      horizon: r.lacunas?.horizonte,
      inventory: r.inventario,
      extractorHealth: r.saudeDoExtrator,
      limits: r.limites,
      notice: READ_ONLY_NOTICE,
    };
  } catch (err) {
    return {
      found: true,
      specPath: label,
      notice: READ_ONLY_NOTICE,
      error: `Falha ao executar o emissor: ${(err as Error).message}`,
    };
  }
}

const READ_ONLY_NOTICE = `
Spec Readiness — Read-Only Mode

Fonte das regras: docs/governance/dss.ontology.json (v0.2.0), derivada de 3 specs
reais. O relatório é emitido por scripts/emit-spec.mjs — esta tool não duplica
nenhuma regra.

Regimes:
- obrigatorio → ausência REPROVA a passagem para a Entrega
- recomendado → aponta, não bloqueia
- horizonte   → registra como débito, NUNCA reprova (acessibilidade mora aqui,
                por decisão explícita do dono do DSS; não afrouxa a Constituição
                #4, que segue vinculante no nível do COMPONENTE)

Verdicts: pronta · pronta-com-ressalvas · incompleta · inconclusivo

"inconclusivo" NÃO é aprovação: significa que os padrões de controle do extrator
não bateram e o resultado não é confiável.

Limites: verifica COMPLETUDE e coerência estrutural, nunca a correção da regra de
negócio. Entidades semânticas (campo, comando, máquina de estado) não são
extraídas — exigem leitura de significado, que é parecer probabilístico e por
isso não vira gate.

This evaluation is strictly descriptive per MCP_READ_ONLY_CONTRACT.md.
`.trim();
