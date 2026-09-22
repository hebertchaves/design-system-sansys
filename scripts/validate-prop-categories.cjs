#!/usr/bin/env node
/**
 * validate-prop-categories.cjs — toda prop tem categoria de PAPEL resolvida.
 *
 * O painel do Preview Frame agrupa os controles por papel (Conteúdo · Aparência ·
 * Estado · Comportamento · Acessibilidade). A categoria é DERIVADA no
 * emit-contract a partir de, nesta ordem: api.json do Quasar → nome de a11y →
 * CSS do componente → vModel → exceção declarada.
 *
 * Quando nenhuma resolve, a prop cai em 'Outros' — e é isso que este gate pega.
 *
 * POR QUE GATEAR: 'Outros' não quebra nada. O painel continua renderizando, o
 * contrato continua válido, e a prop simplesmente vira imprevisível para quem
 * procura — que é exatamente o problema que a categorização veio resolver. Sem
 * gate, o balde genérico volta a crescer em silêncio.
 *
 * Prop nova sem categoria geralmente significa uma destas:
 *   - é prop própria do DSS   → declare em scripts/lib/prop-category.mjs
 *   - o componente não tem âncora Quasar correta → ajuste ANCHOR no mesmo arquivo
 *
 * Uso:
 *   node scripts/validate-prop-categories.cjs          # relatório
 *   node scripts/validate-prop-categories.cjs --gate   # exit 1 se houver 'Outros'
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'components');
const GATE = process.argv.slice(2).includes('--gate');

function contratos() {
  const out = [];
  for (const grupo of fs.readdirSync(COMPONENTS)) {
    const dg = path.join(COMPONENTS, grupo);
    if (!fs.statSync(dg).isDirectory()) continue;
    for (const comp of fs.readdirSync(dg)) {
      const f = path.join(dg, comp, 'dss.contract.json');
      if (fs.existsSync(f)) out.push({ comp, f });
    }
  }
  return out;
}

const porCategoria = {};
const porFonte = {};
const semCategoria = [];
const emOutros = [];
let total = 0;

for (const { comp, f } of contratos()) {
  let d;
  try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch { continue; }
  for (const p of d.api?.props || []) {
    total++;
    if (!p.category) { semCategoria.push(`${comp}.${p.name}`); continue; }
    porCategoria[p.category] = (porCategoria[p.category] || 0) + 1;
    porFonte[p.categorySource || '—'] = (porFonte[p.categorySource || '—'] || 0) + 1;
    if (p.category === 'Outros') emOutros.push(`${comp}.${p.name}`);
  }
}

console.log('🔎 Categoria de papel das props — agrupamento do painel do Preview Frame\n');
console.log(`   props: ${total}`);
for (const [k, v] of Object.entries(porCategoria).sort((a, b) => b[1] - a[1])) {
  console.log(`   ${String(v).padStart(4)} ${(v / total * 100).toFixed(1).padStart(5)}%  ${k}`);
}
console.log(`\n   derivada de: ${Object.entries(porFonte).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}=${v}`).join(' · ')}`);

const falhas = [...semCategoria, ...emOutros];
if (!falhas.length) {
  console.log('\n✅ Todas as props têm categoria resolvida — nenhuma em "Outros".');
  process.exit(0);
}

if (semCategoria.length) {
  console.log(`\n❌ ${semCategoria.length} prop(s) SEM o campo category — contrato desatualizado:`);
  for (const x of semCategoria) console.log('  - ' + x);
  console.log('  Reemita: node scripts/emit-contract.mjs --all --write');
}
if (emOutros.length) {
  console.log(`\n❌ ${emOutros.length} prop(s) em "Outros" — nenhuma fonte resolveu:`);
  for (const x of emOutros) console.log('  - ' + x);
  console.log('\n  Declare em scripts/lib/prop-category.mjs (EXCECOES), ou corrija a');
  console.log('  âncora Quasar do componente (ANCHOR) se ele tiver uma base errada.');
}

process.exit(GATE ? 1 : 0);
