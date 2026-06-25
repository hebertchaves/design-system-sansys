#!/usr/bin/env node
/**
 * validate-barrel-ext.cjs — Extensão canônica do barrel export = index.ts.
 *
 * Decisão de governança (jun/2026): o barrel export de componente é index.ts
 * (não index.js). O código havia driftado (115 .ts vs 35 .js) sem nenhum gate
 * que garantisse a extensão — daí a divergência com a CLAUDE.md. Migrado 100%
 * para .ts; este gate impede a reintrodução de index.js.
 *
 * Regra: nenhum `index.js` em packages/core (árvore de componentes + entry raiz).
 * O barrel de cada componente e os agregadores são index.ts.
 *
 * Uso:
 *   node scripts/validate-barrel-ext.cjs          # relatório
 *   node scripts/validate-barrel-ext.cjs --gate   # exit 1 se houver index.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CORE = path.join(ROOT, 'packages', 'core');

const GATE = process.argv.slice(2).includes('--gate');

function walk(dir, acc = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== 'dist') walk(full, acc);
    } else if (e.name === 'index.js') {
      acc.push(path.relative(ROOT, full).replace(/\\/g, '/'));
    }
  }
  return acc;
}

const offenders = walk(CORE);

if (!offenders.length) {
  console.log('✅ Barrels: nenhum index.js em packages/core (convenção index.ts mantida).');
  process.exit(0);
}

console.log(`❌ index.js encontrado(s) em packages/core (${offenders.length}) — barrel deve ser index.ts:`);
for (const f of offenders) console.log('  - ' + f);
console.log('\n  Renomeie: git mv <dir>/index.js <dir>/index.ts');
console.log('  e torne extensionless os imports (from \'...index\' em vez de \'...index.js\').');

process.exit(GATE ? 1 : 0);
