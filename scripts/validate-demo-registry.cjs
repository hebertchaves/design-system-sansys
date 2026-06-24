#!/usr/bin/env node
/**
 * validate-demo-registry.cjs — Drift "componente base ↔ registry do DemoRenderer".
 *
 * O sandbox renderiza componentes via registry MANUAL em
 * apps/sandbox/src/DemoRenderer.vue (imports + registro interno). Um componente
 * base novo/selado esquecido no registry não aparece no DemoRenderer — mesma
 * classe de drift silencioso da regressão Avatar/Badge, num nível acima.
 *
 * Regra: todo componente em packages/core/components/base/ (via catalog.json)
 * deve estar importado no DemoRenderer, exceto a allowlist de exclusões
 * deliberadas (dependências indisponíveis no sandbox).
 *
 * Uso:
 *   node scripts/validate-demo-registry.cjs          # relatório
 *   node scripts/validate-demo-registry.cjs --gate   # exit 1 se faltar base no registry
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CATALOG = path.join(ROOT, 'packages', 'core', 'catalog.json');
const DEMO = path.join(ROOT, 'apps', 'sandbox', 'src', 'DemoRenderer.vue');

const GATE = process.argv.slice(2).includes('--gate');

// Exclusões deliberadas: componentes base que NÃO entram no registry do sandbox
// por dependência indisponível. Manter sincronizado com o comentário no DemoRenderer.
const EXCLUDED = new Set([
  'DssRouteTab', // requer vue-router, indisponível no sandbox
]);

if (!fs.existsSync(CATALOG)) {
  console.error('❌ catalog.json ausente — rode: npm run catalog:build');
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
const base = catalog.components.filter(c => /\/base\//.test(c.dir)).map(c => c.component);

const src = fs.readFileSync(DEMO, 'utf8');
const registered = new Set();
for (const m of src.matchAll(/import\s+(Dss[A-Za-z0-9]+)\b/g)) registered.add(m[1]);
for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from/g))
  for (const p of m[1].split(',')) {
    const t = p.trim().match(/^(Dss[A-Za-z0-9]+)$/);
    if (t) registered.add(t[1]);
  }

const missing = base.filter(c => !registered.has(c) && !EXCLUDED.has(c));

console.log(`🔎 DemoRenderer: ${base.length} base no catálogo · ${registered.size} registrados · ${EXCLUDED.size} excluído(s) deliberadamente.`);

if (!missing.length) {
  console.log('✅ Todo componente base está no registry do DemoRenderer.');
  process.exit(0);
}

console.log(`\n❌ BASE AUSENTE do DemoRenderer (${missing.length}):`);
for (const c of missing) console.log('  - ' + c);
console.log("\n  Adicione o import em DemoRenderer.vue, ex.:");
console.log("    import DssX from '@components/base/DssX/DssX.vue'");
console.log('  (ou, se for exclusão deliberada, registre em EXCLUDED com justificativa.)');

process.exit(GATE ? 1 : 0);
