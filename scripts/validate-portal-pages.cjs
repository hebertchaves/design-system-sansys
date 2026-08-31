#!/usr/bin/env node
/**
 * validate-portal-pages.cjs — Drift "selado ↔ página do portal".
 *
 * Consome packages/core/catalog.json (fonte canônica de "selado" = arquivo físico
 * de selo). Regra dura: todo componente SELADO precisa ter página de documentação
 * em apps/docs-portal/src/pages/components/<Component>Page.tsx (gerada por
 * generate-portal-landing-pages.cjs / npm run portal:sync-docs).
 *
 * Aviso (não bloqueante): páginas Dss*Page.tsx órfãs (sem componente no catálogo),
 * tirando a allowlist de fixtures/demos conhecidos.
 *
 * Uso:
 *   node scripts/validate-portal-pages.cjs          # relatório
 *   node scripts/validate-portal-pages.cjs --gate   # exit 1 se houver selado sem página
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CATALOG = path.join(ROOT, 'packages', 'core', 'catalog.json');
const PAGES_DIR = path.join(ROOT, 'apps', 'docs-portal', 'src', 'pages', 'components');

const GATE = process.argv.slice(2).includes('--gate');

// Páginas Dss* que legitimamente NÃO correspondem a um componente do catálogo
// (fixtures/demos de composição). Mantidas à mão, com justificativa.
const ORPHAN_ALLOWLIST = new Set([
  'DssTestCadris', // página-fixture de composição complexa (não é componente de uso)
]);

if (!fs.existsSync(CATALOG)) {
  console.error('❌ catalog.json ausente — rode: npm run catalog:build');
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
const sealed = catalog.components.filter(c => c.sealed).map(c => c.component);
const known = new Set(catalog.components.map(c => c.component));

const pages = new Set(
  fs.readdirSync(PAGES_DIR)
    .filter(f => /Page\.tsx$/.test(f))
    .map(f => f.replace(/Page\.tsx$/, ''))
);

const sealedNoPage = sealed.filter(c => !pages.has(c));
const orphanPages = [...pages].filter(
  p => p.startsWith('Dss') && !known.has(p) && !ORPHAN_ALLOWLIST.has(p)
);

console.log(`🔎 Portal: ${sealed.length} selados · ${pages.size} páginas Dss*.`);

if (sealedNoPage.length) {
  console.log(`\n❌ SELADO SEM PÁGINA (${sealedNoPage.length}):`);
  for (const c of sealedNoPage) console.log('  - ' + c);
  console.log('\n  Gere as páginas faltantes: npm run portal:sync-docs');
} else {
  console.log('✅ Todo componente selado tem página no portal.');
}

if (orphanPages.length) {
  console.log(`\n⚠️  PÁGINA ÓRFÃ (sem componente no catálogo) (${orphanPages.length}):`);
  for (const p of orphanPages) console.log('  - ' + p + 'Page.tsx');
  console.log('  → duplicata legada/renomeada? Remova a página+rota ou adicione à allowlist.');
}

if (GATE && sealedNoPage.length) {
  console.error(`\n❌ Gate: ${sealedNoPage.length} componente(s) selado(s) sem página.`);
  process.exit(1);
}
process.exit(0);
