import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, join } from "path";

export type AuditPhase =
  | "initial-audit"
  | "correction"
  | "revalidation"
  | "seal-granted";

export type AuditVerdict = "compliant" | "non-compliant" | "pending";

export interface AuditEvent {
  date: string;
  phase: AuditPhase;
  verdict: AuditVerdict;
  ncs: number;
  gaps: number;
  auditor: string;
  notes: string;
}

interface RecordAuditEventResult {
  success: boolean;
  componentName: string;
  event: AuditEvent | null;
  auditHistory: AuditEvent[];
  statusUpdated: boolean;
  newStatus?: string;
  error?: string;
  notice: string;
}

const AUDIT_WRITE_NOTICE = [
  "Controlled write — authorized under MCP_READ_ONLY_CONTRACT.md v0.2.",
  "Scope: auditHistory[] + status/auditDate/seal fields in dss.meta.json only.",
  "Requires explicit human request. No autonomous triggering permitted.",
].join(" ");

export async function recordAuditEvent(
  componentName: string,
  phase: AuditPhase,
  verdict: AuditVerdict,
  ncs: number,
  gaps: number,
  notes: string,
  auditor: string,
  dssRoot: string
): Promise<RecordAuditEventResult> {
  // Normalize to PascalCase with Dss prefix
  const pascal = /^[Dd]ss[A-Z]/.test(componentName)
    ? componentName.charAt(0).toUpperCase() + componentName.slice(1)
    : `Dss${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}`;

  // Componentes vivem em três grupos. Fixar "base" tornava a tool inútil para a
  // Fase 3 INTEIRA — todo composto mora em "composed/" e falhava com
  // "meta.json not found". Descoberto ao fechar o DssMultiselectAutocomplete.
  const GROUPS = ["base", "composed", "stress-test"] as const;
  let metaPath = "";
  for (const group of GROUPS) {
    const candidate = join(resolve(dssRoot, "packages/core/components", group, pascal), "dss.meta.json");
    if (existsSync(candidate)) { metaPath = candidate; break; }
  }

  if (!metaPath) {
    return {
      success: false,
      componentName: pascal,
      event: null,
      auditHistory: [],
      statusUpdated: false,
      error: `dss.meta.json not found for ${pascal} in packages/core/components/{${GROUPS.join(",")}}/`,
      notice: AUDIT_WRITE_NOTICE,
    };
  }

  let meta: Record<string, unknown>;
  try {
    meta = JSON.parse(readFileSync(metaPath, "utf-8"));
  } catch {
    return {
      success: false,
      componentName: pascal,
      event: null,
      auditHistory: [],
      statusUpdated: false,
      error: "Failed to parse dss.meta.json — invalid JSON.",
      notice: AUDIT_WRITE_NOTICE,
    };
  }

  const today = new Date().toISOString().split("T")[0]!;

  const event: AuditEvent = {
    date: today,
    phase,
    verdict,
    ncs,
    gaps,
    auditor: auditor || "Claude Code — Auditor DSS v2.5",
    notes: notes || "",
  };

  const currentHistory: AuditEvent[] = Array.isArray(meta.auditHistory)
    ? (meta.auditHistory as AuditEvent[])
    : [];

  const updatedHistory = [...currentHistory, event];
  meta.auditHistory = updatedHistory;

  let statusUpdated = false;
  let sealRefusal = "";
  if (phase === "seal-granted" && verdict === "compliant") {
    // O SELO É O ARQUIVO FÍSICO. build-catalog.cjs deriva "selado" da existência
    // de docs/Compliance/seals/<Comp>/ e reprova `status="sealed"` sem ele. Sem
    // esta guarda a tool produziria justamente o estado que o gate proíbe.
    const sealDir = resolve(dssRoot, "docs/Compliance/seals", pascal);
    if (existsSync(sealDir)) {
      // "sealed" — vocabulário real do repo (52 componentes). "granted" não
      // existia em lugar nenhum E escapava do gate de drift, que checa
      // `status === 'sealed'`: era um selo que a máquina não conseguia auditar.
      meta.status = "sealed";
      meta.auditDate = today;
      if (!meta.seal) meta.seal = "DSS v2.2";
      statusUpdated = true;
    } else {
      // A auditoria é registrada mesmo assim — recusar o selo não pode apagar o
      // trabalho de verificação. Só a promoção de status é que fica de fora.
      sealRefusal =
        `Seal not granted: no physical seal at docs/Compliance/seals/${pascal}/. ` +
        `The seal document is the source of truth — status follows it, never the reverse. ` +
        `The audit event WAS recorded in auditHistory[]; only the status promotion was skipped.`;
    }
  }

  try {
    writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf-8");
  } catch (err) {
    return {
      success: false,
      componentName: pascal,
      event,
      auditHistory: updatedHistory,
      statusUpdated: false,
      error: `Failed to write dss.meta.json: ${String(err)}`,
      notice: AUDIT_WRITE_NOTICE,
    };
  }

  return {
    success: true,
    componentName: pascal,
    event,
    auditHistory: updatedHistory,
    statusUpdated,
    newStatus: meta.status as string,
    // Presente só quando o selo foi pedido e recusado por falta do documento
    // físico — o registro da auditoria, esse, foi gravado.
    ...(sealRefusal ? { error: sealRefusal } : {}),
    notice: AUDIT_WRITE_NOTICE,
  };
}
