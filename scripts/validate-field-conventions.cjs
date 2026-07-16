#!/usr/bin/env node
/**
 * validate-field-conventions.cjs — Convenções visuais da família de CAMPO.
 *
 * A família QField-based (golden = DssInput) compartilha convenções que já
 * mordiram vários componentes na adequação (jul/2026):
 *   1. RADIUS do outlined = `--dss-radius-sm` (cantos sóbrios). `radius-md` = fora
 *      do padrão (achado em DssTextarea/DssField).
 *   2. FOCO do outlined SEM `box-shadow`: o anel de 1px duplicava a borda (o foco
 *      é só `border-width: md`). box-shadow no foco outlined = borda dupla (achado
 *      em DssField). [Botões PODEM ter shadow no foco — por isso o gate é escopado
 *      à família de campo, não geral.]
 *
 * Uso:
 *   node scripts/validate-field-conventions.cjs          # relatório
 *   node scripts/validate-field-conventions.cjs --gate   # exit 1 se violar
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'components');
const GATE = process.argv.slice(2).includes('--gate');

const FIELD_FAMILY = ['DssInput', 'DssSelect', 'DssTextarea', 'DssFile', 'DssField'];

function outlinedPath(comp) {
  for (const layer of ['base', 'composed']) {
    const p = path.join(COMPONENTS, layer, comp, '3-variants', '_outlined.scss');
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const results = [];
for (const comp of FIELD_FAMILY) {
  const f = outlinedPath(comp);
  if (!f) { results.push({ comp, errors: ['sem 3-variants/_outlined.scss'] }); continue; }
  const src = fs.readFileSync(f, 'utf8');
  const errors = [];

  // 1. radius do outlined: não pode ser md.
  const radii = [...src.matchAll(/border-radius:[^;]*--dss-radius-([a-z]+)/g)].map((m) => m[1]);
  if (radii.includes('md')) errors.push('radius-md no outlined (esperado radius-sm — paridade da família)');

  // 2. box-shadow dentro de um bloco `--focused { … }` (regras flat na família).
  for (const m of src.matchAll(/--focused[^{}]*\{([^{}]*)\}/g)) {
    if (/box-shadow/.test(m[1])) {
      errors.push('box-shadow no foco outlined (borda dupla — usar só border-width: md)');
      break;
    }
  }

  results.push({ comp, errors });
}

const failed = results.filter((r) => r.errors.length);
console.log('🔎 Convenções da família de campo (outlined: radius-sm + foco sem box-shadow)\n');
for (const r of results) {
  console.log(`${r.errors.length ? '❌' : '✅'} ${r.comp}`);
  for (const e of r.errors) console.log(`     ↳ ${e}`);
}
console.log(`\n${FIELD_FAMILY.length} componente(s) de campo · ${failed.length} com violação.`);

if (!failed.length) {
  console.log('✅ Convenções de campo: OK.');
  process.exit(0);
}
console.log('\n❌ Violações acima. Convenção em DSS_UI_ADEQUACAO_CHECKLIST.md.');
process.exit(GATE ? 1 : 0);
