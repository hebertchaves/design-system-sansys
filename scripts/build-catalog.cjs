#!/usr/bin/env node
/**
 * build-catalog.cjs — Fonte canônica única do catálogo de componentes DSS.
 *
 * PROBLEMA (auditoria jun/2026): "selado" estava espalhado e divergente entre
 *   - dss.meta.json `status`   (taxonomia inconsistente: sealed/conformant/approved
 *                               usados misturados; 41 "sealed" vs 88 selos físicos)
 *   - dss.meta.json `seal`     (formato inconsistente: ora path c/ prefixo "DSS/"
 *                               quebrado, ora string "DSS v2.2", ora ausente)
 *   - docs/Compliance/seals/   (arquivo físico — a VERDADE objetiva)
 *   - CERTIFIED_COMPONENTS.md   (tabela mantida à mão)
 *   - MCP / DemoRenderer / portal (listas manuais)
 *
 * FONTE DE VERDADE de "selado": existência do arquivo físico em
 *   docs/Compliance/seals/<Component>/*.md  (não o campo status, que driftou).
 *
 * Gera packages/core/catalog.json (machine-readable) consumível por MCP, portal,
 * DemoRenderer e pela tabela CERTIFIED. Em --validate, falha em contradições.
 *
 * Uso:
 *   node scripts/build-catalog.cjs            # gera catalog.json
 *   node scripts/build-catalog.cjs --validate # gate: falha em contradição
 *   node scripts/build-catalog.cjs --json     # imprime o catálogo
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'packages', 'core', 'components');
const SEALS_DIR = path.join(ROOT, 'docs', 'Compliance', 'seals');
const OUT = path.join(ROOT, 'packages', 'core', 'catalog.json');

const argv = process.argv.slice(2);
const VALIDATE = argv.includes('--validate');
const JSON_OUT = argv.includes('--json');

// status que NÃO deveriam coexistir com selo físico (contradição clara)
const UNFINISHED = new Set(['in-progress', 'pending-audit', 'review', 'draft']);

function walk(dir, filterFn, acc = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(full, filterFn, acc); }
    else if (filterFn(full)) acc.push(full);
  }
  return acc;
}

function physicalSeal(component) {
  const dir = path.join(SEALS_DIR, component);
  try {
    const files = fs.readdirSync(dir).filter(f => /\.md$/i.test(f));
    if (files.length) return path.relative(ROOT, path.join(dir, files[0])).replace(/\\/g, '/');
  } catch { /* sem pasta */ }
  return null;
}

// ── coleta ────────────────────────────────────────────────────────────────────
const metaFiles = walk(COMPONENTS_DIR, f => path.basename(f) === 'dss.meta.json');
const catalog = [];

for (const mf of metaFiles) {
  let meta;
  try { meta = JSON.parse(fs.readFileSync(mf, 'utf8')); } catch { continue; }
  const component = meta.component || path.basename(path.dirname(mf));
  const sealFile = physicalSeal(component);
  catalog.push({
    component,
    dir: path.relative(ROOT, path.dirname(mf)).replace(/\\/g, '/'),
    phase: meta.phase ?? null,
    category: meta.category ?? null,
    status: meta.status ?? null,
    sealDate: meta.auditDate ?? meta.sealDate ?? null,
    sealField: meta.seal ?? null,
    sealed: !!sealFile,            // ← VERDADE objetiva (arquivo físico)
    sealFile,
    previewGroup: meta.previewGroup ?? null,
    goldenReference: meta.goldenReference ?? null,
    goldenContext: meta.goldenContext ?? null,
  });
}
catalog.sort((a, b) => a.component.localeCompare(b.component));

// ── drift / contradições ──────────────────────────────────────────────────────
const drift = [];
for (const c of catalog) {
  if (c.status === 'sealed' && !c.sealed)
    drift.push(`${c.component}: status="sealed" mas SEM selo físico em docs/Compliance/seals/${c.component}/`);
  if (c.sealed && UNFINISHED.has(c.status))
    drift.push(`${c.component}: tem selo físico mas status="${c.status}" (marcado como não-finalizado)`);
  // seal field que parece path mas não resolve (prefixo "DSS/" legado, etc.)
  if (c.sealField && c.sealField.includes('/')) {
    const norm = c.sealField.replace(/^DSS\//, '');
    if (!fs.existsSync(path.join(ROOT, norm)))
      drift.push(`${c.component}: campo seal="${c.sealField}" não resolve para um arquivo existente`);
  }
}

// ── cross-check com CERTIFIED_COMPONENTS.md (membership) ──────────────────────
const certPath = path.join(ROOT, 'docs', 'governance', 'CERTIFIED_COMPONENTS.md');
let certComponents = new Set();
if (fs.existsSync(certPath)) {
  const txt = fs.readFileSync(certPath, 'utf8');
  for (const m of txt.matchAll(/^\|\s*`(Dss[A-Za-z0-9]+)`\s*\|/gm)) certComponents.add(m[1]);
}
const sealedSet = new Set(catalog.filter(c => c.sealed).map(c => c.component));
const inCertNotSealed = [...certComponents].filter(c => !sealedSet.has(c));
const sealedNotInCert = [...sealedSet].filter(c => !certComponents.has(c));

// ── saída ─────────────────────────────────────────────────────────────────────
if (JSON_OUT) {
  console.log(JSON.stringify(catalog, null, 2));
  process.exit(0);
}

if (!VALIDATE) {
  fs.writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), total: catalog.length, sealed: sealedSet.size, components: catalog }, null, 2) + '\n');
  console.log(`✅ catalog.json gerado: ${catalog.length} componentes, ${sealedSet.size} selados (por arquivo físico).`);
}

// ── relatório de drift ────────────────────────────────────────────────────────
const certDrift = [
  ...inCertNotSealed.map(c => `CERTIFIED lista ${c} mas não há selo físico`),
  ...sealedNotInCert.map(c => `${c} tem selo físico mas NÃO está no CERTIFIED_COMPONENTS.md`),
];
const allDrift = [...drift, ...certDrift];

if (VALIDATE || allDrift.length) {
  console.log(`\n🔎 Catálogo: ${catalog.length} componentes · ${sealedSet.size} selados (físico)`);
  console.log(`Contradições status↔selo: ${drift.length} · Drift CERTIFIED↔selo: ${certDrift.length}\n`);
  for (const d of allDrift) console.log('  - ' + d);
  if (!allDrift.length) console.log('  ✅ Nenhuma contradição.');
  console.log('');
}

if (VALIDATE && allDrift.length) {
  console.error(`❌ Gate: ${allDrift.length} divergência(s) de catálogo/selo.`);
  process.exit(1);
}
