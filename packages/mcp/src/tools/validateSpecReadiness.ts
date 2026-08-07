import { existsSync } from "fs";
import { resolve, isAbsolute } from "path";
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

export async function validateSpecReadiness(
  specPath: string,
  dssRoot: string
): Promise<SpecReadinessResult> {
  const abs = isAbsolute(specPath) ? specPath : resolve(dssRoot, specPath);

  if (!existsSync(abs)) {
    return {
      found: false,
      specPath: abs,
      notice: READ_ONLY_NOTICE,
      error:
        "Arquivo não encontrado. Informe o caminho do .md da especificação funcional.",
    };
  }

  const emitter = resolve(dssRoot, "scripts/emit-spec.mjs");
  if (!existsSync(emitter)) {
    return {
      found: false,
      specPath: abs,
      notice: READ_ONLY_NOTICE,
      error: "scripts/emit-spec.mjs não encontrado — o emissor é a fonte das regras.",
    };
  }

  try {
    const { stdout } = await run("node", [emitter, abs, "--json"], {
      cwd: dssRoot,
      maxBuffer: 20 * 1024 * 1024, // specs carregam imagens base64 grandes
    });

    const r = JSON.parse(stdout);

    return {
      found: true,
      specPath: abs,
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
      specPath: abs,
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
