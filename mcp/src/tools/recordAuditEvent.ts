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

  const componentDir = resolve(dssRoot, "components", "base", pascal);
  const metaPath = join(componentDir, "dss.meta.json");

  if (!existsSync(metaPath)) {
    return {
      success: false,
      componentName: pascal,
      event: null,
      auditHistory: [],
      statusUpdated: false,
      error: `dss.meta.json not found at: components/base/${pascal}/dss.meta.json`,
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
  if (phase === "seal-granted" && verdict === "compliant") {
    meta.status = "granted";
    meta.auditDate = today;
    if (!meta.seal) meta.seal = "DSS v2.2";
    statusUpdated = true;
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
    notice: AUDIT_WRITE_NOTICE,
  };
}
